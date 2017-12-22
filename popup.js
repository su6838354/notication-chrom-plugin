var listA = document.getElementsByClassName('item');
for(var i=0;i<listA.length;i++){
  var index = i;
  listA[i].onclick = function () {
    chrome.tabs.create({url: listA[index].getAttribute('href')});
  }
}