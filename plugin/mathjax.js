addjs(cdn_prefix+"/mathjax/2.7.3/MathJax.js?config=TeX-AMS_HTML", callback=function(){MathJax.Hub.Config({
	tex2jax: {
		inlineMath: [['$','$'], ["\\(","\\)"]],
		displayMath: [ ['$$','$$'], ["\\[","\\]"]]
	}
});});