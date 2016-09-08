
$(document).ready(function() {
  'use strict';

  // Define colors available to create puzzle
  const PALETTE = ['#f9be33', '#f77e82', '#9edf89', '#21d2c5', '#147c87', '#793060'];
  var puzzle = [];
  var guess = ['#ffffff','#ffffff','#ffffff','#ffffff'];
  var brushColor = '';
  console.log(puzzle);

  //function to create the puzzle
  var createPuzzle = function() {
    while(puzzle.length < 4) {
      var random = Math.floor(Math.random() * PALETTE.length);
      puzzle.push(PALETTE[random]);
    }
    return puzzle;
  };

  //Restrict clicks, hide evaluate checkbutton, and enable play on the first row
  var setGame = function() {
    createPuzzle();
    $('.row').addClass('avoid-clicks').find('.check-evaluate').addClass('hide-until-complete');
    $('.row:nth-child(1)').toggleClass('highlighted avoid-clicks');
    gameRules();
  }

  // Pick color from PALETTE to paint selection
  var pickColor = function() {
    $('.col2 div').click( function() {
        var x = $(this).css('backgroundColor');
        hexc(x);
      })
  };

  // transform rgb colors into hex
  var hexc = function(colorval) {
      var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      delete(parts[0]);
      for (var i = 1; i <= 3; ++i) {
          parts[i] = parseInt(parts[i]).toString(16);
          if (parts[i].length == 1) parts[i] = '0' + parts[i];
      }
      brushColor = '#' + parts.join('');
  }

  // paint clicked circle with current color in brush
  var paintCircle = function() {
    $('.circle').on('click', function() {
        $(this).css({'background-color':brushColor});
      // include selected color in guess array
      guess.splice(($(this).index()), 1, brushColor)
      if($.inArray('#ffffff', guess) === -1) {
        $(this).closest('.row').find('.evaluate').removeClass('hide-until-complete');
        $(this).closest('.row').find('.check-evaluate').removeClass('hide-until-complete');
      }
    })
  };

  // hightlight next row and remove highlight from previos after presing evaluate button also reset guess array
  //Compare arrays
  var compareArrays = function() {
    $('.check-evaluate').on('click', function() {
      var $self = $(this).closest('.row');
      var compared = [];
      winGame();
      hintCreation($self, compared);
      $self.next().toggleClass('highlighted avoid-clicks');
      $self.toggleClass('highlighted avoid-clicks');
      resetGuess();
    });
  };

  var winGame = function() {
    if (JSON.stringify(puzzle) === JSON.stringify(guess)) {
      $('.col1').find('.you-win').removeClass('hidden');
    }
  }

  //Create and display hint color circles
  var hintCreation = function($self, compared) {
    for (var i = 0; i < puzzle.length; i++) {
      var position = i+1;
      if (guess.indexOf(puzzle[i]) !== -1) {
        if(puzzle[i] === guess[i]) {
          $self.find('.result div:nth-child('+position+')').addClass('is-correct-position')
          compared.push(3) //meaning same position in both arrays
        } else {
          $self.find('.result div:nth-child('+position+')').addClass('is-wrong-position')
          compared.push(1) //meaning it exists in the array
        }
      } else {
        $self.find('.result div:nth-child('+position+')').addClass('is-not')
        compared.push(0) //meaning it does not exist in the array
      }
    }
  }

  var resetGuess = function() {
    guess = ['#ffffff','#ffffff','#ffffff','#ffffff'];
  }

  var gameRules = function() {
    $('.show_rules').on('click', function() {
      $('.rules').toggleClass('hidden');
    })
  };

  //Reset game
  $('.play_again').on('click', function() {
    document.location.reload();
  });

  var play = function() {
    setGame();
    paintCircle();
    pickColor();
    compareArrays();

  }

  play();

});
