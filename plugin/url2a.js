var alla = document.getElementsByTagName('a');
for(var i=0;i<alla.length;i++) {
	var k = alla[i];
	if(k.innerText=="") {
		k.innerText = k.href;
	}
}