/// <reference path="../libraries/utilities.1.8.0.d.ts" />
window.onload = function () {
    Main.init();
};
var Main;
(function (Main) {
    var HERO_LIST;
    var AUDIO;
    var INPUT;
    var HEROES_LEFT;
    var CURRENT_HERO;
    function init() {
        HERO_LIST = document.getElementById('HeroList');
        AUDIO = document.getElementById('Audio');
        INPUT = document.getElementById('Search');
        // build the hero list
        for (var a = 0; a < HEROES.length; a++) {
            HERO_LIST.appendChild(addListItem(HEROES[a]));
        }
        AUDIO.volume = 0.5;
        INPUT.onkeyup = search;
        Dialog.init();
        Message.init();
        start();
    }
    Main.init = init;
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
    function search(event) {
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
    }
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
            // play the sounds continously
            if (soundPosition >= CURRENT_HERO.sounds.length) {
                soundPosition = 0;
            }
            AUDIO.src = CURRENT_HERO.sounds[soundPosition];
            AUDIO.play();
        };
        AUDIO.play();
        return true;
    }
    function guess(element) {
        var heroName = element.getAttribute('data-name');
        if (heroName === CURRENT_HERO.name) {
            // mark this element has already selected, so it doesn't show on the list anymore
            element.setAttribute('data-already-selected', '');
            Message.show('Correct!');
            resetList();
            if (!getNextHero()) {
                AUDIO.pause();
                INPUT.blur();
                Dialog.open('Game Over! Score: ---', start);
            }
        }
        else {
            Message.show('Incorrect :(');
        }
    }
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
})(Main || (Main = {}));
