var convertedText = "";

chrome.tabs.executeScript(null,{file:"contentscript.js"});
var context1 = chrome.contextMenus.create({
	"title": "WIDEN", 
	"contexts": ["editable"], 
	"onclick": clickHandle});

function clickHandle(info, tab){
	var raw = info["selectionText"];
	if(raw!= null){
		convertText(raw);
	}
	chrome.tabs.sendMessage(tab.id, {text: convertedText});
	convertedText = "";
}

function convertText(raw){ //adds 0xFEE0 (0xFF00 - 0x20) to the input character to shift it into fullwidth
	convertedText = "";
	for(var i = 0 ; i < raw.length ; i++){
		var hexCode = raw.charCodeAt(i);
  		if (hexCode > 0x0020 && hexCode <= 0xFF00) {
           hexCode = 0xFF00 + (hexCode - 0x20);
        }
        if (hexCode == 0x0020){ //space cant be shifted, it has to be replaced with U+3000 (ideographic space)
        	hexCode = 0x3000;
        }
        convertedText += String.fromCharCode(hexCode);
	}
	// console.log(convertedText);
	return convertedText;
}