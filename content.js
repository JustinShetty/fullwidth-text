chrome.runtime.onMessage.addListener(function (request) {
    replaceSelection(document.activeElement, request.text);
});

function replaceSelection(elem, text) {
	console.log(elem);
	console.log(elem.tagName)
	console.log(text);
	// copyTextToClipboard(text);
	if(elem.tagName == "DIV"){
		var target = elem.children;
		while(target.length){
			target = target.children;
		}
		console.log(target);
	}
	else{
		var start = elem.selectionStart;
	    var end = elem.selectionEnd;
	    elem.value = elem.value.slice(0, start) + text + elem.value.substr(end);
	    elem.selectionStart = start + text.length;
	    elem.selectionEnd = elem.selectionStart;
	    console.log("succeeded!");
	}
    
}

function copyTextToClipboard(text) {
	var dummy = document.createElement('textarea');
	dummy.style.height = "200px";
    dummy.value = text;
    document.body.appendChild(dummy);
    setTimeout(function(){ dummy.select(); }, 100);
    document.execCommand('copy');
  // document.body.removeChild(dummy);
}