function navigator() {
  var col, n, rancol;

  col = new Array('#F5F5DC beige', '#FFE4C4 bisque', '#FFEBCD blanchedalmond', '#D2691E chocolate', '#FF7F50 coral', '#FFF8DC cornsilk', '#E9967A darksalmon', '#FFB6C1 lightpink', '#FFA07A lightsalmon', '#FAF0E6 linen', '#FFE4E1 mistyrose', '#FFE4B5 moccasin', '#FFDEAD navajowhite', '#FFEFD5 papayawhip', '#FFDAB9 peachpuff', '#FAA460 sandybrown', '#FF6347 tomato', '#F5DEB3 wheat');

  rancol = function() {
    var rand;
    rand = Math.floor(col.length * Math.random());
    return col[rand].split(' ')[1];
  };

  var n = 0, me, tout;

  function change(){
    $('.anm').css('opacity', '0');
    tout = setTimeout(function(){
      console.log(n);
      $('#otdim').attr('src', '../' + items[n].img );
      if(items[n].file){
        $.get('/g/'+ items[n].file , function(data){
          $('#section').find('.bod').html(data);
        })
      }else{
          $('#section').find('.bod').html('');
      }
      $('.anm').css('opacity', '1');
      $('.anm').animateCss('zoomInRight');
    },100)
  }


  $('#section').on({
    "mouseup": function() {
      n<items.length - 1?n++:n=0;
      $('.anm').animateCss('zoomOutLeft', change );
    }
  });

  $('.section').each(function() {
    $(this).css('background', rancol);
  });
}
