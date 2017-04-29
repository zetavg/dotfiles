setTimeout(function () {
  var prevTitle;
  new MutationObserver(function (mutations) {
    if (prevTitle == document.title) return
    document.title = document.title.replace(/ \[Unsupported\]$/, "").replace(/ - /, " — ")
    prevTitle = document.title
  }).observe(document.querySelector("title"), { childList: true });
}, 5000);
