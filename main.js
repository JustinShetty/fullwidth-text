var temp = null;
function clickHandle(info){
	console.log("info: " + JSON.stringify(info));
	temp = info;
	// temp = JSON.parse($temp);
	var text = info["selectionText"];
	console.log(text);
	convertText(text);
	console.log(convertedText);
}

window.onload = function(){
	var context1 = chrome.contextMenus.create({"title": "test", "contexts": ["editable"],
										    "onclick": clickHandle});
}

var convertedText = "";
function convertText(raw){
	convertedText = "";
	for(var i = 0 ; i < raw.length ; i++){
		var hexCode = raw.charCodeAt(i);
		if (hexCode >= 0xFF00 && hexCode <= 0xFFEF) {
           hexCode =0xFF & (hexCode - 0x20);
        }
        console.log(hecCode);
        convertedText += String.fromCharCode(hexCode);
	}
	return convertedText;
}