(function(){
  window.tooltip = d3.select("body")
    .append("div").attr('class', 'tooltip')
    .text("a simple tooltip");

  window.fullinfopanel = d3.select("body")
    .append("div").attr('class', 'fullinfopanel frame')
    .html('<img src="http://placehold.it/2000x1200" class="photo"/>\
  <div class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <span class="red">Ut enim ad minim veniam</span>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\
    <div class="block">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>\
    <div class="block">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>\
  </div>');

  window.clickpos = function(x, y) {
    var w = $(window).width(),
        h = $(window).height();
    return [Math.round(x / w), Math.round(y / h)];
  }
})();
