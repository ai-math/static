var pattern = "leegoudan";
var root = "http://leegoudan.gitee.io";

function addjs(url, callback) {
	var new_element = document.createElement("script"); 
	new_element.setAttribute("type","text/javascript"); 
	new_element.setAttribute("src",url);
	if(callback !== undefined && callback != null) {
		// callback after script loaded.
		new_element.onload = callback;
	}
	document.body.appendChild(new_element);
}

function addcss(url) {
	var head=document.getElementsByTagName('head')[0];
	var link=document.createElement('link');
	link.rel="stylesheet";
	link.href=url;
	head.appendChild(link);
}

function getPar(url, par){
    var local_url = url; 
    var get = local_url.indexOf(par+"=");
    if(get == -1){
        return "";   
    }   
    var get_par = local_url.slice(par.length + get + 1);
    var nextPar = get_par.indexOf("&");
    if(nextPar != -1){
        get_par = get_par.slice(0, nextPar);
    }
    return get_par;
}

function parse() {
	var local_url = "";
	var a = document.getElementsByTagName("script");
	for(var i=0;i<a.length;i++) {
		var a1 = a[i].src;
		if(a1.indexOf(pattern)!=-1) {
			local_url = a1;
		}
	}

	var config = getPar(local_url, "js");
	config = config.split(",");
	for(var i=0;i<config.length;i++) {
		if(config[i]!="") {
			addjs(root+"/plugin/"+config[i]+".js");
		}
	}

	var config1 = getPar(local_url, "css");
	config1 = config1.split(",");
	for(var i=0;i<config1.length;i++) {
		if(config1[i]!="") {
			addcss(root+"/css/"+config1[i]+".css");
		}
	}
}

function md_cb() {
	var converter = new showdown.Converter();  
    var text = document.body.innerHTML;
    document.body.innerHTML = converter.makeHtml(text);
	addjs("https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js", callback=parse);
}

addjs("https://cdn.bootcss.com/showdown/1.8.6/showdown.js",callback=md_cb)

// add jquery by default

// I don't know why this one doesn't work?
// addjs(root+"/js/jquery-3.3.1.min.js", callback=parse);