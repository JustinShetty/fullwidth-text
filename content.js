chrome.runtime.onMessage.addListener(function (request) {
    replaceSelection(document.activeElement, request.text);
});

// directly modifying the contents of an element is problematic on certain sites (facebook, gmail, etc.) that use editable <div>s rather 
// than <input>s and <textarea>s, a TextEvent is used to simulate the text being entered as it normally would be, just with the
// modified text passed by the onclick handler in background.js

function replaceSelection(elem, text) { 
    var te = document.createEvent('TextEvent'); 
    te.initTextEvent('textInput', true, true, window, text);
    elem.dispatchEvent(te); 
}

// function replaceSelection(elem, text) {
// 	setTextDiv(elem, text);
// 	if(elem.tagName == "DIV"){
// 		????
// 	}
// 	else{
// 		var start = elem.selectionStart;
// 	    var end = elem.selectionEnd;
// 	    elem.value = elem.value.slice(0, start) + text + elem.value.substr(end);
// 	    elem.selectionStart = start + text.length;
// 	    elem.selectionEnd = elem.selectionStart;
// 	}
// }

