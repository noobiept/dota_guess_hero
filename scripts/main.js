/// <reference path="../libraries/utilities.1.8.0.d.ts" />
var HEROES = [
    { name: 'Abaddon', image: 'abaddon_sb.png', sounds: ['https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b4/Abad_begin_01.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/bd/Abad_begin_02.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/f/fc/Abad_move_11.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/d/dc/Abad_attack_05.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/f/fe/Abad_cast_02.mp3'] },
    { name: 'Alchemist', image: 'alchemist_sb.png', sounds: ['https://hydra-media.cursecdn.com/dota2.gamepedia.com/0/0c/Alch_battlebegins_01.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b2/Alch_battlebegins_02.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/9/98/Alch_move_05.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b5/Alch_move_14.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/0/02/Alch_attack_03.mp3'] },
];
var HERO_LIST;
var AUDIO;
var HEROES_LEFT;
var CURRENT_HERO;
window.onload = function () {
    HERO_LIST = document.getElementById('HeroList');
    AUDIO = document.getElementById('Audio');
    // build the hero list
    for (var a = 0; a < HEROES.length; a++) {
        var hero = HEROES[a];
        var figure = document.createElement('figure');
        figure.className = 'Hero';
        figure.setAttribute('data-name', hero.name);
        var figcaption = document.createElement('figcaption');
        figcaption.innerText = hero.name;
        var img = document.createElement('img');
        img.src = 'http://cdn.dota2.com/apps/dota2/images/heroes/' + hero.image;
        figure.appendChild(figcaption);
        figure.appendChild(img);
        HERO_LIST.appendChild(figure);
    }
    var input = document.getElementById('Search');
    input.oninput = search;
    start();
};
function search(event) {
    var value = event.target.value;
    var re = new RegExp(value, 'i');
    var listElements = HERO_LIST.children;
    for (var a = 0; a < listElements.length; a++) {
        var element = listElements[a];
        if (re.test(element.getAttribute('data-name'))) {
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
}
function getNextHero() {
    var position = Utilities.getRandomInt(0, HEROES_LEFT.length - 1);
    CURRENT_HERO = HEROES_LEFT.splice(position, 1)[0];
    AUDIO.src = CURRENT_HERO.sounds[0];
    AUDIO.play();
}