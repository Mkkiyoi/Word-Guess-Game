(function () {
    'use strict';

    var MAX_GUESSES = 12;

    var game = {
        letters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
        guessesLeft: MAX_GUESSES,
        words: ['apple', 'banana', 'orange', 'strawberry', 'blueberry', 'blackberry', 'grapes'],
        previousWords: [],
        wordChosen: '',
        currentWord: [],
        lettersGuessed: [],
        wins: 0,
        images: [],

        resetGame: function() {
            // Reset variables
            this.guessesLeft = MAX_GUESSES;
            this.wordChosen = this.words[Math.floor(Math.random() * this.words.length)];
            this.currentWord = [];
            this.lettersGuessed = [];

            for (var i = 0; i < this.wordChosen.length; i++) {
                this.currentWord.push('-');
            }
            document.getElementById('letters-guessed').innerHTML = '';
            this.updateGuessesRemaining(MAX_GUESSES);
            this.displayWordGuess();
        },

        guess: function(event) {
            var letter = event.key;
            if (this.letters.includes(letter) && !this.lettersGuessed.includes(letter)) {
                this.updateLettersGuessed(letter);
                if (this.wordChosen.includes(letter)) {
                    this.updateWordGuess(letter);
                }
                this.guessesLeft -= 1;
                this.updateGuessesRemaining(this.guessesLeft);
            }
            if (this.isGameOver()) {
                this.resetGame();
            }
        },

        updateGuessesRemaining: function(guesses) {
            document.getElementById('guesses-remaining').innerHTML = guesses;
        },

        updateWordGuess: function(letter) {
            var length = this.wordChosen.length;
            for (var i = 0; i < length; i++) {
                if (this.wordChosen.charAt(i) === letter) {
                    this.currentWord[i] = letter;
                }
            }
            this.displayWordGuess();
        },

        displayWordGuess: function () {
            var length = this.wordChosen.length;
            var result = '';
            for (var i = 0; i < (length - 1); i++) {
                result = result + this.currentWord[i] + ' ';
            }
            result = result + this.currentWord[length - 1];
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
                    result = result + this.lettersGuessed[i] + ', ';
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

    window.onload = function() {
        game.resetGame();
        document.onkeyup = function(event) {
            game.guess(event);
        }
    };
})();