# notication-chrom-plugin

为了解决notication在http下无法弹出，通过chrome 插件的background 进程处理弹notication

- 页面--->插件 content.js

    // content.js 添加一个适当的事件监听器  
    `
    obj.addEventListener("chatReceiveMsgEvent", function(e) { process(e.detail) })
    `

    // 页面创建并分发事件  
    `
    var event = new CustomEvent("chatReceiveMsgEvent", {"detail":{"hazcheeseburger":true}})
    obj.dispatchEvent(event)
    `

- 插件content.js--->插件background.js 

    // content.js var port = chrome.extension.connect({name: "chat"});
    `
    port.postMessage({type: "chatReceiveMsgType", values: event.detail});
    `


    // background.js
    `
    chrome.extension.onConnect.addListener(
      function(port) {
        if(port.name == 'chat') {
          port.onMessage.addListener(
            function(msg) {
              if (msg.type == "chatReceiveMsgType") {
                  show(msg, port);
              }
            }
          );
        }
      }
    );
`
