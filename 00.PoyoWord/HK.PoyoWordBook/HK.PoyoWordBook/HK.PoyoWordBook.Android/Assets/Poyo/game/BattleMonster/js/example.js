(function() {
  var body = document.body;
  var loading = document.createElement('class');
  loading.className = 'loading';
  body.insertBefore(loading, body.firstChild);
})();

var status = (function() {
  var el = null;
  return function(msg) {
    if (el === null) {
      var el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.color = 'black';
      el.style.background = 'white';
      el.style.zIndex = 999;
      el.style.top = '5px';
      el.style.right = '5px';
      el.style.padding = '1px 5px';
      document.body.appendChild(el);
    }
    el.innerHTML = msg;
  };
})();
