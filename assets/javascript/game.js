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
            var letter = event.key.toLowerCase();

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

        /* 
         * Displays the current guess for the word.
         * Letters are either displayed as the correct letter or as '-'
         */ 
        displayWordGuess: function () {
            
            // Joins together all of the elements of the currentWord array separated by spaces.
            // Then sets the text content of the current-word div.
            document.getElementById('current-word').textContent = this.currentWord.join(' ');;
        },

        /* Updates the current letters that have been guessed and displays those letters. */
        updateLettersGuessed: function(letter) {
            
            // Add the guessed letter to the current letters guessed
            this.lettersGuessed.push(letter);

            // Get the span to display the letters
            var lettersGuessedContainer = document.getElementById('letters-guessed');

            // Get the length of the lettersGuessed array
            var length = this.lettersGuessed.length;
            
            // If there is only one letter display only that letter.
            // Otherwise display letters separated by a comma and space.
            if (length === 1) {
                lettersGuessedContainer.textContent = letter;
            } else {
                lettersGuessedContainer.textContent = this.lettersGuessed.join(', ');
            }
        },

        /* Checks the state of the game:
         * - If there are 0 guesses left, the player has lost and the game is over.
         * - If the word has been completely guessed the game is over.
         */
        isGameOver: function() {
            // Check if there are 0 guesses left.
            if (this.guessesLeft === 0) {
                // Log the game is over.
                console.log('Game over');

                // Return boolean flag true (indicates the game is over.)
                return true;

            } else {

                // Join the letters in the current guess to get the word.
                var word = this.currentWord.join('');

                // Check if the guessed word is the same as the chosen word.
                if (this.wordChosen === word) {

                    // Log that the player is the winner.
                    console.log('Winner');

                    // Increment wins by 1
                    this.wins += 1;

                    // Display the current number of wins.
                    document.getElementById('wins').innerHTML = this.wins;

                    // Get the image container
                    var imageContainer = document.getElementById('image');

                    // Reset the current picture.
                    imageContainer.innerHTML = '';

                    // Create a new image element
                    var gameImage = document.createElement('img');

                    // Set the image to be the corresponding image to the chosen word in images array
                    gameImage.setAttribute('src', 'assets/images/' + this.images[this.words.indexOf(word)]);
                    
                    // Give the image the Bootstrap responsive image class
                    gameImage.setAttribute('class', 'img-responsive');

                    // Append the image to the image container.
                    imageContainer.appendChild(gameImage);

                    // Return boolean flag true (indicates the game is over.)
                    return true;
                }
            }
            // Since the game is not over, return boolean flag false.
            return false;
        }
    }

    /* Run Javascript code only after the window has fully loaded. */
    window.onload = function() {

        // Create a new game.
        game.resetGame();
        
        // Listen for user key press.
        document.onkeyup = function(event) {
            
            // After user key press, make a guess with the key that was pressed.
            game.guess(event);
        }
    };
})();