var temp = null;
var convertedText = "";
var editableID = null;

window.onload = function(){
	var context1 = chrome.contextMenus.create({"title": "WIDEN", "contexts": ["editable"], "onclick": clickHandle});
}

function clickHandle(info){

	console.log(window.getSelection());

	// console.log("info: " + JSON.stringify(info));
	editableID = info.frameId;
	temp = info;
	var text = info["selectionText"];
	// console.log(text);
	if(text != null){
		convertText(text);
		replaceSelection(convertText);
	}
}

function convertText(raw){ //adds 0xFEE0 (0xFF00 - 0x20) to the input character to shift it into fullwidth
	convertedText = "";
	for(var i = 0 ; i < raw.length ; i++){
		var hexCode = raw.charCodeAt(i);
  		if (hexCode > 0x0000 && hexCode <= 0xFF00) {
           hexCode = 0xFF00 + (hexCode - 0x20);
        }
        convertedText += String.fromCharCode(hexCode);
	}
	console.log(convertedText);
	return convertedText;
}

function replaceSelection(replacementText) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        var activeElement = document.activeElement;
        if (activeElement.nodeName == "TEXTAREA" ||
           (activeElement.nodeName == "INPUT" && activeElement.type.toLowerCase() == "text")) {
               var val = activeElement.value, start = activeElement.selectionStart, end = activeElement.selectionEnd;
               activeElement.value = val.slice(0, start) + replacementText + val.slice(end);
          //alert("in text area");
        } else {
          if (sel.rangeCount) {
              range = sel.getRangeAt(0);
              range.deleteContents();
              range.insertNode(document.createTextNode(replacementText));
          } else {
              sel.deleteFromDocument();
          }
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
}