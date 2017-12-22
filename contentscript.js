// chrome.extension.sendRequest({greeting: "hello"}, function(response) {
//   console.log(response.farewell);
// });

var port = chrome.extension.connect({name: "chat"});

port.onDisconnect.addListener(function() {
    console.log('port onDisconnect');
    port = null;
});
document.addEventListener('chatReceiveMsgEvent', function(event) {
    port.postMessage({type: "chatReceiveMsgType", values: event.detail});
});


port.onMessage.addListener(function(msg) {
  if (msg.type == "clickNotication") {
    const event = new CustomEvent('chatClickNotication', {'detail': msg});
    document.dispatchEvent(event);
  }
    
});