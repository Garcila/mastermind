'use strict';

$(document).ready(function() {

  // Define colors available to create puzzle
  const PALETTE = ['#f9be33', '#f77e82', '#9edf89', '#21d2c5', '#147c87', '#793060'];
  var puzzle = [];
  var guess = ['#ffffff','#ffffff','#ffffff','#ffffff'];

  //function to create the puzzle
  var createPuzzle = function() {
    while(puzzle.length < 4) {
      var random = Math.floor(Math.random() * PALETTE.length);
      puzzle.push(PALETTE[random]);
    }
    return puzzle;
  };

  createPuzzle();
  console.log(puzzle);
  console.log(guess);

  //Reset game
  $('button').on('click', function() {
    location.reload();
  });

  // Highlight row currently on play
    // Auto highlight first row at start of game and disable rows
  $('.row').addClass('avoid-clicks').find('.check-evaluate').addClass('hide-until-complete');
  $('.col1 .row:nth-child(1)').toggleClass('highlited avoid-clicks');

  // hightlight next row and remove highlight from previos after presing evaluate button also reset guess array
  $('.check-evaluate').on('click', function() {
    var self = $(this);
    function compareArrays() {
      var compared = [];
      if (JSON.stringify(puzzle) === JSON.stringify(guess)) {
        $('.col1').find('.you-win').removeClass('hidden');
        }
      for (var i = 0; i < puzzle.length; i++) {
        // var random = Math.floor(Math.random() * 4);
        var random = i+1;
        if (guess.indexOf(puzzle[i]) !== -1) {
          if(puzzle[i] === guess[i]) {
            $(self).closest('.row').find('.result div:nth-child('+random+')').addClass('is-correct-position')
            compared.push(3) //meaning same position in both arrays
          } else {
            $(self).closest('.row').find('.result div:nth-child('+random+')').addClass('is-wrong-position')
            compared.push(1) //meaning it exists in the array
          }
        } else {
          $(self).closest('.row').find('.result div:nth-child('+random+')').addClass('is-not')
          compared.push(0) //meaning it does not exist in the array
        }
      }
      console.log(compared);
    };
    compareArrays();

    $(this).closest('.row').next().toggleClass('highlited avoid-clicks');
    $(this).closest('.row').toggleClass('highlited avoid-clicks');
    guess = ['#ffffff','#ffffff','#ffffff','#ffffff'];
  });

  // Pick color from PALETTE to paint selection
  var brushColor = '';
  $('.col2 div').click( function() {
      var x = $(this).css('backgroundColor');
      hexc(x);
    })

    // transform rgb colors into hex
    function hexc(colorval) {
        var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete(parts[0]);
        for (var i = 1; i <= 3; ++i) {
            parts[i] = parseInt(parts[i]).toString(16);
            if (parts[i].length == 1) parts[i] = '0' + parts[i];
        }
        brushColor = '#' + parts.join('');
    }

    // paint clicked circle with current color in brush
    $('.circle').on('click', function() {
      $(this).css({'background-color':brushColor});
    // include selected color in guess array
      guess.splice(($(this).index()), 1, brushColor)
      if($.inArray('#ffffff', guess) === -1) {
        $(this).closest('.row').find('.evaluate').removeClass('hide-until-complete');
        $(this).closest('.row').find('.check-evaluate').removeClass('hide-until-complete');
      }
  });

  // show evaluate button when all four selection circles are filled

});
