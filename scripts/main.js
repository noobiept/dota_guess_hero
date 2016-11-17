/// <reference path="../libraries/utilities.1.9.0.d.ts" />
window.onload = function () {
    Main.init();
};
window.onkeyup = function (event) {
    return Main.keyboardShortcuts(event);
};
var Main;
(function (Main) {
    var HERO_LIST; // list with all the heroes (what its used to guess the current hero)
    var AUDIO; // plays the hero phrases
    var INPUT; // search input element (to limit the hero list)
    var CORRECT_SOUND; // plays a sound whenever a correct guess is made
    var SELECTED; // selected element from the hero search
    var HEROES_LEFT; // has all the heroes that haven't been played yet
    var CURRENT_HERO; // current hero that we're trying to guess
    function init() {
        AUDIO = document.getElementById('Audio');
        INPUT = document.getElementById('Search');
        CORRECT_SOUND = new Audio('./sounds/coins.mp3');
        CORRECT_SOUND.volume = 0.3;
        CORRECT_SOUND.load();
        // build the hero list
        buildHeroList(document.getElementById('StrengthHeroes'), Heroes.Strength);
        buildHeroList(document.getElementById('AgilityHeroes'), Heroes.Agility);
        buildHeroList(document.getElementById('IntelligenceHeroes'), Heroes.Intelligence);
        HERO_LIST = document.querySelectorAll('.hero img');
        AUDIO.volume = 0.3;
        INPUT.oninput = inputListener;
        var help = document.getElementById('Help');
        help.onclick = helpPlayer;
        Dialog.init();
        Message.init();
        Score.init();
        start();
        // show the list after its been loaded
        var listContainer = document.getElementById('HeroList');
        listContainer.classList.remove('hidden');
    }
    Main.init = init;
    /**
     * Build the hero list based on the heroes data.
     */
    function buildHeroList(container, heroData) {
        // each array here is a sub-group
        for (var a = 0; a < heroData.length; a++) {
            var group = heroData[a];
            var ul = document.createElement('ul');
            ul.className = 'heroGroup';
            for (var b = 0; b < group.length; b++) {
                var info = group[b];
                var li = document.createElement('li');
                li.className = 'hero';
                var img = document.createElement('img');
                img.setAttribute('data-name', info.name);
                img.src = 'http://cdn.dota2.com/apps/dota2/images/heroes/' + info.image;
                img.onclick = function () {
                    guess(this);
                };
                if (info.alternateName) {
                    img.setAttribute('data-alternate-name', info.alternateName);
                }
                var tooltip = document.createElement('span');
                tooltip.className = 'tooltip';
                tooltip.textContent = info.name;
                li.appendChild(img);
                li.appendChild(tooltip);
                ul.appendChild(li);
            }
            container.appendChild(ul);
        }
    }
    /**
     * Returns the first valid hero in the list.
     */
    function getFirstHero() {
        for (var a = 0; a < HERO_LIST.length; a++) {
            var hero = HERO_LIST[a];
            if (!hero.classList.contains('invalid')) {
                return hero;
            }
        }
        return null;
    }
    /**
     * Filter the list based on the search text.
     */
    function inputListener(event) {
        var value = event.target.value;
        search(value);
    }
    /**
     * Clear the selected hero.
     */
    function clearSelected() {
        if (SELECTED) {
            SELECTED.classList.remove('selected');
        }
        SELECTED = null;
    }
    /**
     * Updates the list with the heroes that match the search text.
     */
    function search(value) {
        try {
            var re = new RegExp('^' + value, 'i');
        }
        catch (error) {
            return;
        }
        for (var a = 0; a < HERO_LIST.length; a++) {
            var element = HERO_LIST[a];
            if (!element.hasAttribute('data-already-selected')) {
                if (re.test(element.getAttribute('data-name')) ||
                    re.test(element.getAttribute('data-alternate-name'))) {
                    element.classList.remove('invalid');
                }
                else {
                    element.classList.add('invalid');
                }
            }
        }
        // clear the previous selected element
        clearSelected();
        // only select the first element if there's an actual search value
        if (value !== '') {
            // add a different styling for the first element (the one that is going to be guessed if 'enter' is pressed)
            selectHero(getFirstHero());
        }
    }
    /**
     * Select an hero in the list (add a different styling to it).
     */
    function selectHero(hero) {
        // clear the previous selected element
        clearSelected();
        SELECTED = hero;
        if (hero) {
            hero.classList.add('selected');
        }
    }
    /**
     * Start a new game.
     */
    function start() {
        HEROES_LEFT = Heroes.getAll();
        getNextHero();
        focusInputEntry();
        // reset the selected heroes property from all list elements
        for (var a = 0; a < HERO_LIST.length; a++) {
            var hero = HERO_LIST[a];
            hero.removeAttribute('data-already-selected');
        }
        clearSelected();
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
        if (element.hasAttribute('data-already-selected')) {
            return;
        }
        var heroName = element.getAttribute('data-name');
        if (heroName === CURRENT_HERO.name) {
            Score.correctGuess();
            // mark this element has already selected, so it doesn't show on the list anymore
            element.setAttribute('data-already-selected', '');
            CORRECT_SOUND.currentTime = 0;
            CORRECT_SOUND.play();
            Message.correct();
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
            Message.incorrect();
        }
    }
    /**
     * Reset the list search (show all the possible heroes).
     */
    function resetList() {
        INPUT.value = '';
        focusInputEntry();
        clearSelected();
        for (var a = 0; a < HERO_LIST.length; a++) {
            var element = HERO_LIST[a];
            // don't show the heroes that have already been selected
            if (element.hasAttribute('data-already-selected')) {
                element.classList.add('invalid');
            }
            else {
                element.classList.remove('invalid');
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
        focusInputEntry();
        search(firstLetters);
        Score.helpUsed();
    }
    /**
     * Put the focus on the input entry.
     * If the device has a small width (possible a touch mobile device) then we don't focus, so that it doesn't trigger a virtual keyboard to appear.
     */
    function focusInputEntry() {
        if (window.screen.width > 1000) {
            INPUT.focus();
        }
    }
    /**
     * Select the next/previous valid hero in the hero list.
     */
    function moveSelection(next) {
        // select the first
        if (!SELECTED) {
            selectHero(getFirstHero());
        }
        else {
            // find the current position
            for (var position = 0; position < HERO_LIST.length; position++) {
                if (HERO_LIST[position] === SELECTED) {
                    break;
                }
            }
            if (next === true) {
                for (var a = position + 1; a < HERO_LIST.length; a++) {
                    var hero = HERO_LIST[a];
                    if (!hero.classList.contains('invalid')) {
                        selectHero(hero);
                        return;
                    }
                }
            }
            else {
                for (var a = position - 1; a >= 0; a--) {
                    var hero = HERO_LIST[a];
                    if (!hero.classList.contains('invalid')) {
                        selectHero(hero);
                        return;
                    }
                }
            }
        }
    }
    /**
     * Global keyboard shortcuts.
     */
    function keyboardShortcuts(event) {
        var key = event.keyCode;
        switch (key) {
            case Utilities.KEY_CODE.leftArrow:
            case Utilities.KEY_CODE.upArrow:
                moveSelection(false);
                break;
            case Utilities.KEY_CODE.rightArrow:
            case Utilities.KEY_CODE.downArrow:
                moveSelection(true);
                break;
            case Utilities.KEY_CODE.enter:
                if (SELECTED) {
                    guess(SELECTED);
                }
                break;
        }
    }
    Main.keyboardShortcuts = keyboardShortcuts;
})(Main || (Main = {}));
