(function(name,factory){

    if (typeof dwfis !== "undefined" && typeof dwfis.define === "function") {
		module.exports = factory()
	} else {
		return window[name] = factory();
	}

})('storage',function(){
    var userData = function(){
        var o;
        //userData for IE: http://msdn.microsoft.com/zh-cn/vstudio/ms531424
        //As userData has the PATH rules, we need to break the rules in order to use it in all the current domain
        //So we need an iframe
        try{
            var htmlfile = new ActiveXObject('htmlfile'),doc,o;
            htmlfile.open();
            htmlfile.write('<iframe src="/favicon.ico"></iframe>');
            htmlfile.close();
            doc = htmlfile.frames[0].document;
            o = doc.createElement('div');
            doc.appendChild(o);
            o.addBehavior('#default#userData');
        }catch(e){}

        return {
            get: function(name){
                var value;
                o.load(name);

                value = o.getAttribute(name);
                try{value = JSON.parse(value)}catch(e){}
                return value;
            },
            set: function(name,value,seconds){
                if(seconds){
                    var d = new Date();
                    d.setTime(d.getTime() + seconds*1000);
                    o.expires = d.toUTCString();
                }
                o.setAttribute(name,JSON.stringify(value));
                o.save(name);
            },
            remove: function(name){
                o.removeAttribute(name);
                o.save(name);
            }
        }
    };

    var _localStorage = function(){
        //Clear the outdated data
        var d = new Date().getTime();
        for(key in localStorage){
            var v = localStorage.getItem(key);
            //If you add storage throw localStorage.setItem("abc","abcvalue") not Storage.set("abc","abcvalue"),it will catch an error when parse the value "abcvalue" 
            try{v = JSON.parse(v)}catch(e){};
            if(Object.prototype.toString.call(v).toLowerCase().indexOf('array') > 0){
                var expires = v[0].expires;
                if(expires && /^\d{13,}$/.test(expires) && expires <= d) localStorage.removeItem(key);
            }
        }
        return {
            get: function(name){
                var v = localStorage.getItem(name);
                if(!v) return null;
                try{v = JSON.parse(v)}catch(e){};
                if(typeof v != 'object') return v;
                //If the first element is an object with "expires" property, it may be an expiring date(number at least 13 digits) of the current data. 
                var expires = v[0].expires;
                if(expires && /^\d{13,}$/.test(expires)){
                    var d = new Date().getTime();
                    if(expires <= d){
                        localStorage.removeItem(name);
                        return null;
                    }
                    v.shift();
                }
                return v[0];
            },
            set: function(name,value,seconds){
                var v = [];
                if(seconds){
                    var d = new Date().getTime();
                    v.push({"expires":(d + seconds*1000)});
                }
                v.push(value);
                localStorage.setItem(name,JSON.stringify(v));
            },
            remove: function(name){
                localStorage.removeItem(name);
            }
        }
    }
    var cookie = {
        get: function(name){
            var v = document.cookie,result;
            var start = v.indexOf(name + '='),end = v.indexOf(';',start);
            if(end == -1) end = v.length;
            if(start > -1){
                result = v.substring(start + name.length + 1,end);
                try{result = JSON.parse(result)}catch(e){};
                return result;
            }else{
                return null;
            }
        },
        set: function(name,value,seconds,path,domain){
            var path = path || '/',expires = '';
            if(seconds){
                //IE:expires,Others:max-age
                if(window.ActiveXObject){
                    var d = new Date();
                    d.setTime(d.getTime() + seconds*1000);
                    expires = 'expires=' + d.toGMTString();
                }else{
                    expires = 'max-age=' + seconds;
                }
            }
            document.cookie = name + '=' + JSON.stringify(value) + ';' + expires + ';path=' + path + ';' + (domain ? ('domain=' + domain):'');
        },
        remove: function(name,path,domain){
            this.set(name,'',-1,path,domain);
        }
    }

    var adapter;
    if(!window.localStorage){
        adapter = userData();
    }else{
        adapter = _localStorage();
    }

    return {
        get:adapter.get,
        set:adapter.set,
        remove:adapter.remove,
        cookie:cookie
    }
})