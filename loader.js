var ver = {script: Date.now(), style: Date.now()},
    loader = () => {
        return `function load(type, ver){
            var ls = !localStorage[type] ? {ver: 0, text: ""} : JSON.parse(localStorage[type]),
                ele = document.createElement(type);
            document.head.appendChild(ele);
            if(ls.ver === ver){ele.textContent = ls.text; return}
            var req = new XMLHttpRequest();
            req.addEventListener("load", function(){
                ele.textContent = this.responseText;
                localStorage[type] = JSON.stringify({ver: ver, text: this.responseText});
            });
            req.open("GET", "/" + type);
            req.send();
        }
        load("script", ${ver.script});
        load("style", ${ver.style});
        document.body.removeChild(document.getElementById("loader"));`;
    };