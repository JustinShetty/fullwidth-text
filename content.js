chrome.runtime.onMessage.addListener(function (request) {
    // replaceSelection(document.activeElement, request.text);
    setTextDiv(document.activeElement, request.text);
});

function setTextDiv(el, text) { 
    var te = document.createEvent('TextEvent'); 
    te.initTextEvent('textInput', true, true, window, text);
    el.dispatchEvent(te); 
}

// function replaceSelection(elem, text) {
// 	setTextDiv(elem, text);
// 	if(elem.tagName == "DIV"){
// 		setTextDiv(elem, text);
// 	}
// 	else{
// 		var start = elem.selectionStart;
// 	    var end = elem.selectionEnd;
// 	    elem.value = elem.value.slice(0, start) + text + elem.value.substr(end);
// 	    elem.selectionStart = start + text.length;
// 	    elem.selectionEnd = elem.selectionStart;
// 	}
    
// }

