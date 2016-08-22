/// <reference path="../libraries/utilities.1.9.0.d.ts" />
window.onload = function () {
    Main.init();
};
var Main;
(function (Main) {
    var HERO_LIST; // container of all the hero entries (what its used to guess the current hero)
    var AUDIO; // plays the hero phrases
    var INPUT; // search input element (to limit the hero list)
    var CORRECT_SOUND; // plays a sound whenever a correct guess is made
    var HEROES_LEFT; // has all the heroes that haven't been played yet
    var CURRENT_HERO; // current hero that we're trying to guess
    function init() {
        HERO_LIST = document.getElementById('HeroList');
        AUDIO = document.getElementById('Audio');
        INPUT = document.getElementById('Search');
        CORRECT_SOUND = new Audio('sounds/coins.mp3');
        CORRECT_SOUND.volume = 0.3;
        // build the hero list
        for (var a = 0; a < HEROES.length; a++) {
            HERO_LIST.appendChild(addListItem(HEROES[a]));
        }
        AUDIO.volume = 0.3;
        INPUT.onkeyup = inputKeyUp;
        var help = document.getElementById('Help');
        help.onclick = helpPlayer;
        Dialog.init();
        Message.init();
        Score.init();
        start();
    }
    Main.init = init;
    /**
     * Add a new hero to the list.
     */
    function addListItem(hero) {
        var figure = document.createElement('figure');
        figure.className = 'Hero';
        figure.setAttribute('data-name', hero.name);
        figure.onclick = function () {
            guess(figure);
        };
        var figcaption = document.createElement('figcaption');
        figcaption.innerText = hero.name;
        var img = document.createElement('img');
        img.src = 'http://cdn.dota2.com/apps/dota2/images/heroes/' + hero.image;
        figure.appendChild(figcaption);
        figure.appendChild(img);
        return figure;
    }
    /**
     * Called when a key is pressed on the search input element. Checks if its the `enter` key and if so then it tries to guess the first hero on the list. Otherwise just limit the list based on the search text.
     */
    function inputKeyUp(event) {
        var key = event.keyCode;
        var value = event.target.value;
        // try to guess the first hero
        if (key === Utilities.KEY_CODE.enter) {
            var first = HERO_LIST.querySelector('.Hero:not(.hidden)');
            if (first) {
                guess(first);
            }
            return;
        }
        search(value);
    }
    /**
     * Updates the list with the heroes that match the search text.
     */
    function search(value) {
        var re = new RegExp(value, 'i');
        var listElements = HERO_LIST.children;
        for (var a = 0; a < listElements.length; a++) {
            var element = listElements[a];
            if (!element.hasAttribute('data-already-selected') &&
                re.test(element.getAttribute('data-name'))) {
                element.classList.remove('hidden');
            }
            else {
                element.classList.add('hidden');
            }
        }
    }
    /**
     * Start a new game.
     */
    function start() {
        HEROES_LEFT = HEROES.concat();
        getNextHero();
        INPUT.focus();
        // reset the selected heroes property from all list elements
        var listElements = HERO_LIST.children;
        for (var a = 0; a < listElements.length; a++) {
            listElements[a].removeAttribute('data-already-selected');
        }
        resetList();
        Score.reset();
    }
    /**
     * Get a new random hero to guess (one that hasn't been picked yet).
     */
    function getNextHero() {
        if (HEROES_LEFT.length === 0) {
            return false;
        }
        var heroPosition = Utilities.getRandomInt(0, HEROES_LEFT.length - 1);
        CURRENT_HERO = HEROES_LEFT.splice(heroPosition, 1)[0];
        // have a random starting position, so that it doesn't always play the same order
        var soundPosition = Utilities.getRandomInt(0, CURRENT_HERO.sounds.length - 1);
        AUDIO.src = CURRENT_HERO.sounds[soundPosition];
        AUDIO.onended = function () {
            soundPosition++;
            // play the sounds continuously
            if (soundPosition >= CURRENT_HERO.sounds.length) {
                soundPosition = 0;
            }
            AUDIO.src = CURRENT_HERO.sounds[soundPosition];
        };
        AUDIO.oncanplay = function () {
            AUDIO.play();
        };
        return true;
    }
    /**
     * Try to guess the current hero. If its correct we move on to the next one.
     */
    function guess(element) {
        var heroName = element.getAttribute('data-name');
        if (heroName === CURRENT_HERO.name) {
            Score.correctGuess();
            // mark this element has already selected, so it doesn't show on the list anymore
            element.setAttribute('data-already-selected', '');
            CORRECT_SOUND.currentTime = 0;
            CORRECT_SOUND.play();
            Message.show('Correct!');
            resetList();
            if (!getNextHero()) {
                AUDIO.pause();
                INPUT.blur();
                Score.stopScoring();
                Dialog.open(endGameMessage(), start);
            }
        }
        else {
            Score.incorrectGuess();
            Message.show('Incorrect :(');
        }
    }
    /**
     * Reset the list search (show all the possible heroes).
     */
    function resetList() {
        INPUT.value = '';
        INPUT.focus();
        var listElements = HERO_LIST.children;
        for (var a = 0; a < listElements.length; a++) {
            var element = listElements[a];
            // don't show the heroes that have already been selected
            if (element.hasAttribute('data-already-selected')) {
                element.classList.add('hidden');
            }
            else {
                element.classList.remove('hidden');
            }
        }
    }
    /**
     * Get the message to be shown at the end of the game.
     */
    function endGameMessage() {
        var message = "Game Over!";
        var score = Score.getCurrentScore();
        if (score.incorrect !== 0) {
            message += "<br />You've guessed incorrectly " + score.incorrect + " times.";
        }
        if (score.help !== 0) {
            message += "<br />You've used the help " + score.help + " times.";
        }
        if (score.incorrect === 0 && score.help === 0) {
            message += '<br />Perfect!';
        }
        message += "<br />Final score: " + score.score;
        return message;
    }
    /**
     * Help the player guess the hero, by searching for the initial letters of the hero (thus limiting the hero possibilities).
     */
    function helpPlayer() {
        var firstLetters = CURRENT_HERO.name.slice(0, 2);
        INPUT.value = firstLetters;
        INPUT.focus();
        search(firstLetters);
        Score.helpUsed();
    }
})(Main || (Main = {}));
