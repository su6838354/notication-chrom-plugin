

// // Conditionally initialize the options.
// if (!localStorage.isInitialized) {
//   localStorage.isActivated = true;   // The display activation.
//   localStorage.frequency = 1;        // The display frequency, in minutes.
//   localStorage.isInitialized = true; // The option initialization.
// }

// // Test for notification support.
// if (window.Notification) {
//   // While activated, show notifications at the display frequency.
//   if (JSON.parse(localStorage.isActivated)) { show(); }

//   var interval = 0; // The display interval, in minutes.

//   setInterval(function() {
//     interval++;

//     if (
//       JSON.parse(localStorage.isActivated) &&
//         localStorage.frequency <= interval
//     ) {
//       show();
//       interval = 0;
//     }
//   }, 60000);
// }


function show(msg, port){
  var values = msg.values;
  // var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  // var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  // var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  // new Notification(
  //   '来自' + values.from + '的消息     ' + hour + time[2] + ' ' + period,
  // {
  //   icon: 'no_log.png',
  //   body: values.msg
  // });
  var title = values.from;
  var closeTime = values.closeTime;
  var body = values.msg;
  var icon_url = values.icon_url;

  var start = new Date(); 
  var notification = undefined; 
  var openNotify = function(){
    notification = new Notification(
      title,
      { 
        body: body, 
        icon: icon_url,
      }); 
    notification.onclose = function(){ 
      const d = new Date(); 
      if( ((d-start)<closeTime) && (23000<(d-start)) && ((d-start)<27000) ){ 
        openNotify(); 
      } 
    }; 
    notification.onclick = function () { 
      port.postMessage({type: 'clickNotication', title:title, body:body});
      notification.close();
    }; 
  }; 
  openNotify(); 
  setTimeout(function(){notification.close()},closeTime);
} 

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