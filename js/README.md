addjs:

```js
function addjs(url, callback=null) {
	var new_element = document.createElement("script"); 
	new_element.setAttribute("type","text/javascript"); 
	new_element.setAttribute("src",url);
	if(callback != null) {
		new_element.onload = callback;
	}
	document.body.appendChild(new_element);
}
```

addcss:

```js
function addcss(url) {
	var head=document.getElementsByTagName('head')[0];
	var link=document.createElement('link');
	link.rel="stylesheet";
	link.href=url;
	head.appendChild(link);
}
```



## 一些问题

### For MathJax

	I dont't konw why I put the initalization code:
	MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
	before <script src="https://cdn.bootcss.com/mathjax/2.7.3/MathJax.js?config=TeX-AMS_HTML""></script>,
	it still works. But for highlight.js, it doesn't work.
	but if i call initalization code right here, it caused not initialized error.
	so i was wondering whether if the oder <script></script> in the html matters.	
few examples:

Works:

```js
var new_element1 = document.createElement("script");
new_element1.setAttribute("type","text/x-mathjax-config");
new_element1.innerHTML = "MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\\\(','\\\\)']]}});";
document.body.appendChild(new_element1);
addjs("https://cdn.bootcss.com/mathjax/2.7.3/MathJax.js?config=TeX-AMS_HTML");
```

Works:

```js
addjs("https://cdn.bootcss.com/mathjax/2.7.3/MathJax.js?config=TeX-AMS_HTML");
var new_element1 = document.createElement("script");
new_element1.setAttribute("type","text/x-mathjax-config");
new_element1.innerHTML = "MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\\\(','\\\\)']]}});";
document.body.appendChild(new_element1);
```

Works:

```js
addjs("https://cdn.bootcss.com/mathjax/2.7.3/MathJax.js?config=TeX-AMS_HTML"),callback=function(){MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});});
```

Error:

```js
addjs("https://cdn.bootcss.com/mathjax/2.7.3/MathJax.js?config=TeX-AMS_HTML");
MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\\\(','\\\\)']]}});
```

Error:

```js
MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\\\(','\\\\)']]}});
addjs("https://cdn.bootcss.com/mathjax/2.7.3/MathJax.js?config=TeX-AMS_HTML");
```

### For highlight

```
I don't know why even i put initialization node:
<script>hljs.initHighlightingOnLoad();</script>
below node <script src=https://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js"></script>
it still doesn't work, which make me have to use callback functions.
```

few examples:

Works:

```js
addcss("https://cdn.bootcss.com/highlight.js/9.12.0/styles/default.min.css");
addjs("https://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js", callback=function(){hljs.initHighlightingOnLoad();});
```

Error:

```js
addcss("https://cdn.bootcss.com/highlight.js/9.12.0/styles/default.min.css");
addjs("https://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js");
hljs.initHighlightingOnLoad();
```

Error:

```js
addcss("https://cdn.bootcss.com/highlight.js/9.12.0/styles/default.min.css");
hljs.initHighlightingOnLoad();
addjs("https://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js");
```

Error:

```js
addcss("https://cdn.bootcss.com/highlight.js/9.12.0/styles/default.min.css");
var new_element1 = document.createElement("script");
new_element1.setAttribute("type","text/javascript");
new_element1.innerHTML = "hljs.initHighlightingOnLoad();";
document.body.appendChild(new_element1);
addjs("https://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js");
```

Error:

```js
addcss("https://cdn.bootcss.com/highlight.js/9.12.0/styles/default.min.css");
addjs("https://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js");
var new_element1 = document.createElement("script");
new_element1.setAttribute("type","text/javascript");
new_element1.innerHTML = "hljs.initHighlightingOnLoad();"
document.body.appendChild(new_element1);
```



### 分析

why

```html
<script type="text/x-mathjax-config">MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});</script>
```

before

```html
<script src="https://cdn.bootcss.com/mathjax/2.7.3/MathJax.js?config=TeX-AMS_HTML""></script>
```

, it still works?

because ```type="text/x-mathjax-config"``` is not ```type="text/javascript"```. So the order doesn't matter, because only after mathjax loads,  code in text/x-mathjax-config will be executed by mathjax, otherwise ignores by javascript engine.



why

```html
<script type="text/javascript">hljs.initHighlightingOnLoad();</script>
```

after

```html
<script type="text/javascript" src="https://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js"></script>
```

, it still doesn't work?

it seems the broswer doesn't executed the script by order.

Actually, for the broswer, it loads multiple javascript simultaneously, which one loads complete first, which one execute first. So we shouldn't make any assumption about the execution order of different javascript.

But usually script in the head load earlier then script in the body, this is what is usually utilized by programmer.



```js
// add jquery by default
addjs(https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js, callback=parse);
// I don't know why this one doesn't work?
// addjs(root+"/js/jquery-3.3.1.min.js", callback=parse);
// with error Failed to load resource: the server responded with a status of 404 (Not Found)
// may be exhibited by the server, or something.
```




## RegExp问题



```js
var equs = new Array();
function equation(args) {
	var i = equs.length;
	equs[i] = capture;
	return "njjequ"+i+"uqejjn";
}


function md_cb() {
	var converter = new showdown.Converter();  
    var text = artice.innerHTML;
	// handle for mathjax
	text = text.replace(/(\$\$.+?\$\$)/g, equation("$1"));
	text = text.replace(/(\$.+?\$)/g, equation("$1"));
    text = converter.makeHtml(text);
	text = text.replace(/njjequ(\w+)uqejjn/g, equs[parseInt("$1")]);
	artice.innerHTML = text;
	module['md'] = 0;
	module_handle();
}
```

这个代码不会work，因为上面的equation("\$1")其实只会执行一次，为什么，因为"\$1"其实是常字符串，而不是你认为的，会被replace替换成匹配后的字符串，所以，其实编译器发现equation("\$1")这句话的执行逻辑其实同一逻辑，那么这个函数就只会被执行一次而已。那么什么时候"\$1"会被replace解析成匹配后的字符串呢？答：当最终返回的字符串完全确定的时候。也就是说，如果上面的equation函数，最后返回的字符串中含有"\$1"，那么这时候才会发生解析，不会再传入参数的时候解析。所以我觉得奇怪，为什么equation("\$1")执行后equs数组的大小只有1，我一开始以为是js正则表达式多线程搜索造成的，后来一想，不对啊，js肯定是单线程啊！那么为什么equation("\$1")只执行了一次，原因只有一个，那就是被编译器优化了！

然后，如果想要再传入参数的时候，字符串"\$1"的替换就已经完成，那得这么写，而且这时候，由于每次传入的参数已经不同了，所以函数的执行结果是不同的，那么也就不会被编译器优化掉了，确保了每次都是执行的。

```js
function md_cb() {
	var converter = new showdown.Converter();  
    var text = artice.innerHTML;
	// handle for mathjax
	var equs = new Array();
	text = text.replace(/(\$\$.+?\$\$)/g, function(match, capture){
		var i = equs.length;
		equs[i] = capture;
		return "njjequ"+i+"uqejjn";
	});
	text = text.replace(/(\$.+?\$)/g, function(match, capture){
		var i = equs.length;
		equs[i] = capture;
		return "njjequ"+i+"uqejjn";
	});
    text = converter.makeHtml(text);
	text = text.replace(/njjequ(\w+)uqejjn/g, function(match, capture){return equs[parseInt(capture)];});
	artice.innerHTML = text;
	module['md'] = 0;
	module_handle();
}
```

