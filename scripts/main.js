var HEROES = [
    { name: 'Abaddon', image: 'abaddon_sb.png' },
    { name: 'Alchemist', image: 'alchemist_sb.png' },
    { name: 'Ancient Apparition', image: 'ancient_apparition_sb.png' },
    { name: 'Anti-Mage', image: 'antimage_sb.png' },
    { name: 'Arc Warden', image: 'arc_warden_sb.png' },
    { name: 'Axe', image: 'axe_sb.png' },
    { name: 'Bane', image: 'bane_sb.png' },
    { name: 'Batrider', image: 'batrider_sb.png' },
    { name: 'Beastmaster', image: 'beastmaster_sb.png' },
    { name: 'Bloodseeker', image: 'bloodseeker_sb.png' },
    { name: 'Bounty Hunter', image: 'bounty_hunter_sb.png' },
    { name: 'Bristleback', image: 'bristleback_sb.png' },
    { name: 'Broodmother', image: 'broodmother_sb.png' },
];
var HERO_LIST;
window.onload = function () {
    HERO_LIST = document.getElementById('HeroList');
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
