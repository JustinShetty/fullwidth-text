var temp = null;
var convertedText = "";

window.onload = function(){
	var context1 = chrome.contextMenus.create({"title": "test", "contexts": ["editable"],
										    "onclick": clickHandle});
}

function clickHandle(info){
	// console.log("info: " + JSON.stringify(info));
	temp = info;
	var text = info["selectionText"];
	// console.log(text);
	convertText(text);
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