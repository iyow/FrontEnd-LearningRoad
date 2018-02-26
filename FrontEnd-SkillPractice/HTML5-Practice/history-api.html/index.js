(function () {
  // 获取所有需要操作的DOM对象
  var list = document.querySelector('#list');
  var content = document.querySelector('#content');
  // 先展示数据
  for (var title in data) {
    var liElement = document.createElement('li');
    liElement.setAttribute('data-title', title);
    liElement.innerHTML = title;
    list.appendChild(liElement);

    // 为每个li注册点击事件
    liElement.addEventListener('click', function (e) {
      content.innerHTML = data[this.dataset.title];
      if (window.history && history.pushState) {
        // 支持历史状态操作
        history.pushState(this.dataset.title, 'title useless', '?t=' + this.dataset.title);
      }
    });
  }

  // 在历史状态中前进后退触发该事件
  window.addEventListener('popstate', function (e) {
    console.log(e.state);
    if (e.state) {
      content.innerHTML = data[e.state];
    }
    else {
      content.innerHTML = '选首歌吧';
    }
  });



  //第请求时获取url中的t
  var title = decodeURI(window.location.search.split('=')[1]);
  if (title) {
    content.innerHTML = data[title];
  }



  // var title = decodeURI(window.location.search.split('=')[1]);
  // console.log(title);
  // console.log(document.querySelectorAll('li[data-title="' + title + '"]'));
  // var e = document.createEvent('MouseEvents');
  // e.initEvent('click', true, true);
  // document.querySelectorAll('li[data-title="' + title + '"]')[0].dispatchEvent(e);

})();