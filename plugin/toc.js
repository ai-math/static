addcss(root+"/css/toc.css")

var new_element = document.createElement("div"); 
new_element.setAttribute("id","toc"); 
document.body.appendChild(new_element);

addjs(root+"/lib/toc.js");

window.onload=function(){$('#toc').toc();};
//document.addEventListener("DOMContentLoaded", function(){$('#toc').toc();});