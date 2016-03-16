function navigator() {
  var col, n, rancol;

  col = new Array('#F5F5DC beige', '#FFE4C4 bisque', '#FFEBCD blanchedalmond', '#D2691E chocolate', '#FF7F50 coral', '#FFF8DC cornsilk', '#E9967A darksalmon', '#FFB6C1 lightpink', '#FFA07A lightsalmon', '#FAF0E6 linen', '#FFE4E1 mistyrose', '#FFE4B5 moccasin', '#FFDEAD navajowhite', '#FFEFD5 papayawhip', '#FFDAB9 peachpuff', '#FAA460 sandybrown', '#FF6347 tomato', '#F5DEB3 wheat');

  rancol = function() {
    var rand;
    rand = Math.floor(col.length * Math.random());
    return col[rand].split(' ')[1];
  };

  n = 0;

  $('.section').on({
    "click": function(e) {
      var lf;
      console.log(e);
      lf = e.screenX > $(window).width() / 2;
      if (lf && n < $('.section').length) {
        n += 1;
      }
      if (!lf && n) {
        n -= 1;
      }
      $('body').animate({
        scrollLeft: $('body').width() * n
      }, 750);
    },
    'wheel': function(){
      if($(this).attr('yet')){
      }else{
        $(this).attr('yet', "1");
        var me  = $(this);
        $.get('/g/shtat.html', function(data){
          me.find('.bod').html(data);
        })
      }
    }
  });

  $('.section').each(function() {
    $(this).css('background', rancol);
  });

  $('.query').on('click', function() {
    var mypre;
    mypre = $(this).attr('Aid');
    $.get($(this).text(), function(data) {
      $('pre').each(function() {
        if ($(this).attr('preid') === mypre) {
          $(this).html(JSON.stringify(data, null, '\t'));
        }
      });
    });
  });

  $('.simple').on('click', function() {
    var mypre, sup;
    mypre = $(this).attr('Aid');
    sup = '';
    $('.query').each(function() {
      if ($(this).attr('Aid') === mypre) {
        sup = $(this).text();
      }
    });
    return $.get(sup, function(data) {
      return $('.section').each(function() {
        if ($(this).attr('preid') === mypre) {
          $(this).html(JSON.stringify(data, null, '\t'));
        }
      });
    });
  });
}
