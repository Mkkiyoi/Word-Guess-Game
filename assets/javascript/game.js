(function () {
    'use strict';

    var MAX_GUESSES = 12;

    var game = {
        letters: ['a','b','c','d','e','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
        guessesLeft: MAX_GUESSES,
        words: ['apple', 'banana', 'orange', 'strawberry', 'blueberry', 'blackberry', 'grapes'],
        previousWords: [],
        wordChosen = '',
        currentWord = [],
        lettersGuessed: [],
        wins: 0,
        images: [],

        resetGame: function() {
            this.wordChosen = this.words[Math.floor(Math.random() * this.words.length)];
            this.wordChosen.forEach(function() {
                this.currentWord.push('-');
            });
            lettersGuessed = [];
            document.getElementById('letters-guessed').innerHTML = '';
        },

        guess: function(event) {
            var letter = event.keyCode;
            if (!this.letters.includes(letter)) {
                this.updateLettersGuessed(letter);
                if (this.wordChosen.includes(letter)) {
                    this.updateWordGuess
                }
                this.guessesLeft -= 1;
            }
            if (this.isGameOver()) {
                this.resetGame();
            }
        },

        updateWordGuess: function(letter) {
            var length = this.wordChosen.length;
            for (var i = 0; i < length; i++) {
                if (this.wordChosen.charAt(i) === letter) {
                    this.currentWord[i] = letter;
                }
            }
            var result = '';
            for (var i = 0; i < (length - 1); i++) {
                result + this.currentWord[i] + ' ';
            }
            result = result + this.lettersGuessed[length - 1];
            document.getElementById('current-word').innerHTML = result;
        },

        updateLettersGuessed: function(letter) {
            this.lettersGuessed.push(letter);

            var lettersGuessedContainer = document.getElementById('letters-guessed');
            var length = this.lettersGuessed.length;
            
            if (length === 1) {
                lettersGuessedContainer.innerHTML = letter;
            } else {
                var result = '';
                for (var i = 0; i < (length - 1); i++) {
                    result + this.lettersGuessed[i] + ', ';
                }
                result = result + this.lettersGuessed[length - 1];
                lettersGuessedContainer.innerHTML = result;
            }
        },

        isGameOver: function() {
            if (this.guessesLeft === 0) {
                console.log('Game over')
                return true;
            } else {
                var word = '';
                this.currentWord.forEach(function (letter) {
                    word = word + letter;
                });
                if (this.wordChosen === word) {
                    console.log('Winner');
                    this.wins += 1;
                    document.getElementById('wins').innerHTML = this.wins;
                    return true;
                }
            }
            return false;
        }
    }

    document.onload( function() {

    });
})();