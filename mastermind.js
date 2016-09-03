'use strict';

$(document).ready(function() {

  var palette = ['#f9be33', '#f77e82', '#9edf89', '#21d2c5', '#147c87', '#793060'];

  var puzzle = function() {
    palette.forEach(function(color) {
      
    })
  }

  $('.col1 .row:nth-child(1)').css({'backgroundColor':'#f1ecef'});

  var brushColor = '';
  $('.col2 div').click( function(e) {
      var x = $(this).css('backgroundColor');
      hexc(x);
    })

    function hexc(colorval) {
        var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete(parts[0]);
        for (var i = 1; i <= 3; ++i) {
            parts[i] = parseInt(parts[i]).toString(16);
            if (parts[i].length == 1) parts[i] = '0' + parts[i];
        }
        brushColor = '#' + parts.join('');
    }

    $('.circle').on('click', function() {
      $(this).css({'background-color':brushColor});
    });


});
