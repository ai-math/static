//var pattern = "leegoudan";
var pattern = "adv_dev1.js";
var root = "";
// restore body content
var global_text = ""
// module
var module = new Array();
// fetch url
var local_url = "";
var artice = document.getElementsByTagName('article')[0];
var cdn_prefix = "https://cdnjs.cloudflare.com/ajax/libs"; // "https://cdn.bootcss.com"

var a = document.getElementsByTagName("script");
for(var i=0;i<a.length;i++) {
	var a1 = a[i].src;
	if(a1.indexOf(pattern)!=-1) {
		local_url = a1;
    // https://xxx/js/adv_dev.js
    if(a1.indexOf("/js/")!=-1) {
      root = a1.slice(0,a1.indexOf("/js/"));
    } else if(a1("js/")==0) {
      root = ".";
    }
    else {
      root = "..";
    }
		break;
	}
}

function addjs(url, callback) {
	var new_element = document.createElement("script"); 
	new_element.setAttribute("type","text/javascript");
  //new_element.defer = true;
  //new_element.async = true;
	new_element.setAttribute("src",url);
	if(callback !== undefined && callback != null) {
		// callback after script loaded.
		new_element.onload = callback;
	}
	document.body.appendChild(new_element);
  return new_element;
}

function addheadjs(url, callback) {
	var head=document.getElementsByTagName('head')[0];
  var new_element = document.createElement("script"); 
	new_element.setAttribute("type","text/javascript");
	new_element.setAttribute("src",url);
	if(callback !== undefined && callback != null) {
		new_element.onload = callback;
	}
	head.appendChild(new_element);
  return new_element;
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
    var nextPar = get_par.indexOf(";");
    if(nextPar != -1){
        get_par = get_par.slice(0, nextPar);
    }
    return get_par;
}

function parse() {
	var config = getPar(local_url, "js");
	config = config.split(",");
	for(var i=0;i<config.length;i++) {
		if(config[i]!="") {
			addjs(root+"/plugin/"+config[i]+".local.js");
		}
	}

	config = getPar(local_url, "css");
	config = config.split(",");
	for(var i=0;i<config.length;i++) {
		if(config[i]!="") {
			addcss(root+"/css/"+config[i]+".css");
		}
	}
}

// 
function decode_html_entity(str) {
  var dhe_div = document.createElement('textarea');
  dhe_div.innerHTML = str
  return dhe_div.firstChild.nodeValue;
}

function module_handle() {
	if(module['crypt'] == 1) {
		global_text = artice.innerHTML;
		artice.innerHTML = "";
		addjs(root+"/lib/crypto-js.min.js", callback=crypt_cb)
	}
	else if(module['md'] == 1) {
    addjs(root+"/lib/katex/katex.min.js",callback=function(){addjs(root+"/lib/showdown.min.js",callback=md_cb);})
	}
	else {
		addjs(root+"/lib/jquery.min.js", callback=parse);
	}
}

function crypt_cb() {
	var pwd = prompt("input password", "");
	if(pwd != null && pwd != "") { // Decrypt
		try {
			var bytes  = CryptoJS.AES.decrypt(global_text.replace(/[\r\n]/g,""), pwd);
			artice.innerHTML = bytes.toString(CryptoJS.enc.Utf8);
		} catch( e ) {
			artice.innerHTML = "lueluelue";
			return;
		}
		module['crypt'] = 0;
		module_handle();
	}
}

function md_cb() {
	var converter = new showdown.Converter();  
  var text = artice.innerHTML;
	// handle for mathjax
	var equs = new Array();
	text = text.replace(/(\$\$.+?\$\$)/g, function(match, capture){
		var i = equs.length;
		equs[i] = katex.renderToString(decode_html_entity(capture.slice(2,-2)),{ 
      displayMode: true
    });
		return "njjequ"+i+"uqejjn";
	});
	text = text.replace(/(\$.+?\$)/g, function(match, capture){
		var i = equs.length;
		equs[i] = katex.renderToString(decode_html_entity(capture.slice(1,-1)),{
      displayMode: false
    });
		return "njjequ"+i+"uqejjn";
	});
  text = converter.makeHtml(text);
	text = text.replace(/njjequ(\w+)uqejjn/g, function(match, capture){
    return equs[parseInt(capture)];
  });
	artice.innerHTML = text;
  //renderMathInElement(document.body);
	module['md'] = 0;
	module_handle();
}

// parse mod
var config = getPar(local_url, "mod");
config = config.split(",");
for(var i=0;i<config.length;i++) {
	if(config[i]!="") {
		module[config[i]] = 1;
	}
}

module_handle();

// I don't know why this one doesn't work?
// addjs(root+"/js/jquery-3.3.1.min.js", callback=parse);