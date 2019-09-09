(function () {

    'use strict';

    // Global variable containing the maximum number of guesses allowed in each game.
    var MAX_GUESSES = 12;

    // Game object. Runs a word guessing game (hangman).
    var game = {

        /* ------------------ Game Object Properties ------------------ */

        // Array containing all letters of the English alphabet
        letters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
        
        // Store current guesses left
        guessesLeft: MAX_GUESSES,

        // Array of words that can be guessed.
        words: ['apple', 'banana', 'orange', 'strawberry', 'blueberry', 'blackberry', 'grapes'],

        // Words already used in the game.
        previousWords: [],

        // Current word being guessed.
        wordChosen: '',

        // Array which holds both placeholder '-' and letters already guessed in the word.
        // Used to display the word in '- - - - - -' format.
        currentWord: [],

        // Array containing the letters already guessed by the player.
        lettersGuessed: [],

        // Tracks number of wins.
        wins: 0,

        // Array contains the images associated with the words being guessed.
        // Used to display images at the end of each game.
        images: ['apple.jpg', 'banana.jpg', 'orange.jpg', 'strawberry.jpg', 'blueberry.jpg', 'blackberry.jpg', 'grapes.jpg'],

        /* ------------------ Game Object Methods ------------------ */

        /* Resets the necessary html content and game properties to begin a new game. */
        resetGame: function() {

            // Reset game object properties
            this.guessesLeft = MAX_GUESSES;
            this.wordChosen = this.words[Math.floor(Math.random() * this.words.length)];
            this.currentWord = [];
            this.lettersGuessed = [];

            // Reset displayed word to be of form '- - - - -'
            for (var i = 0; i < this.wordChosen.length; i++) {
                this.currentWord.push('-');
            }

            // Displays the newly chosen word in the form '- - - - -'
            this.displayWordGuess();

            // Resets the html displaying letters already guessed.
            document.getElementById('letters-guessed').innerHTML = '';

            // Resets the html displaying number of guesses left.
            this.updateGuessesRemaining(MAX_GUESSES);

        },

        /* Core method to make a guess of a letter the user has chosen. */
        guess: function(event) {

            // Get the key that was pressed.
            var letter = event.key;

            // Check if the key pressed is a letter and if it was guessed yet.
            if (this.letters.includes(letter) && !this.lettersGuessed.includes(letter)) {

                // Update letters that have been pressed and display newly used letter.
                this.updateLettersGuessed(letter);

                // Check if the letter is in the chosen word.
                if (this.wordChosen.includes(letter)) {

                    // Update the letters guessed correctly and update HTML accordingly.
                    this.updateWordGuess(letter);

                }

                // Decrement the bumber of guesses left by 1.
                this.guessesLeft -= 1;

                // Update HTML showing how many guesses the player has left.
                this.updateGuessesRemaining(this.guessesLeft);

            }
            // Check if the game is over
            if (this.isGameOver()) {

                // Start new game since the current game is over.
                this.resetGame();

            }

        },

        /* Updates the HTML showing how many guesses the player has left. */
        updateGuessesRemaining: function(guesses) {

            // Change the innerHTML to reflect the remaining guess.
            document.getElementById('guesses-remaining').innerHTML = guesses;

        },

        /* 
         *  Updates the array containing the letters that were guessed correctly and
         *  letters yet to be guessed. 
         */
        updateWordGuess: function(letter) {
            
            // Get length of the chosen word. 
            var length = this.wordChosen.length;

            // Update correctly guessed letters to be displayed.
            for (var i = 0; i < length; i++) {

                // Check if the letter guess matches the letter in the word at index i.
                if (this.wordChosen.charAt(i) === letter) {

                    // Update the letter at index i in currentWord to the guessed letter.
                    this.currentWord[i] = letter;

                }

            }

            // Update HTML to reflect newly guessed letter.
            this.displayWordGuess();

        },

        // 
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
                    var imageContainer = document.getElementById('image');
                    imageContainer.innerHTML = '';
                    var gameImage = document.createElement('img');
                    gameImage.setAttribute('src', 'assets/images/' + this.images[this.words.indexOf(word)]);
                    gameImage.setAttribute('class', 'img-responsive');
                    document.getElementById('image').appendChild(gameImage);
                    imageContainer.appendChild(gameImage);
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