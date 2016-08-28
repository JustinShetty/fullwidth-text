var goFlag = true;

chrome.runtime.onMessage.addListener(function (request) {
    replaceSelection(document.activeElement, request.text);
});

// directly modifying the contents of an element is problematic on certain sites (facebook, gmail, etc.) that use editable <div>s rather 
// than <input>s and <textarea>s, a TextEvent is used to simulate the text being entered as it normally would be, just with the
// modified text passed by the onclick handler in background.js

function replaceSelection(elem, text) { 
    if(goFlag){
    	goFlag = false;
	    var te = document.createEvent('TextEvent'); 
	    te.initTextEvent('textInput', true, true, window, text);
	    elem.dispatchEvent(te);
	}
	setTimeout(function(){goFlag = true;}, 200); //prevents converted text from being typed too many times when onMessage triggers multiple times
}