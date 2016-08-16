/// <reference path="../libraries/utilities.1.8.0.d.ts" />

interface Hero {
    name: string;
    image: string;
    sounds: string[];
}


var HEROES: Hero[] = [
    { name: 'Abaddon', image: 'abaddon_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b4/Abad_begin_01.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/bd/Abad_begin_02.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/f/fc/Abad_move_11.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/d/dc/Abad_attack_05.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/f/fe/Abad_cast_02.mp3' ] },
    { name: 'Alchemist', image: 'alchemist_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/0/0c/Alch_battlebegins_01.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b2/Alch_battlebegins_02.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/9/98/Alch_move_05.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b5/Alch_move_14.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/0/02/Alch_attack_03.mp3' ] },
    /*{ name: 'Ancient Apparition', image: 'ancient_apparition_sb.png' },
    { name: 'Anti-Mage', image: 'antimage_sb.png' },
    { name: 'Arc Warden', image: 'arc_warden_sb.png' },
    { name: 'Axe', image: 'axe_sb.png' },

    { name: 'Bane', image: 'bane_sb.png' },
    { name: 'Batrider', image: 'batrider_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/9/9e/Bat_battlebegins_01.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b0/Bat_battlebegins_02.mp3' ] },
    { name: 'Beastmaster', image: 'beastmaster_sb.png' },
    { name: 'Bloodseeker', image: 'bloodseeker_sb.png' },
    { name: 'Bounty Hunter', image: 'bounty_hunter_sb.png' },
    { name: 'Bristleback', image: 'bristleback_sb.png' },
    { name: 'Broodmother', image: 'broodmother_sb.png' },*/
];
var HERO_LIST: HTMLElement;
var AUDIO: HTMLAudioElement;
var HEROES_LEFT: Hero[];
var CURRENT_HERO: Hero;


window.onload = function()
{
HERO_LIST = document.getElementById( 'HeroList' );
AUDIO = <HTMLAudioElement> document.getElementById( 'Audio' );

    // build the hero list
for (var a = 0 ; a < HEROES.length ; a++)
    {
    HERO_LIST.appendChild( addListItem( HEROES[ a ] ) );
    }

var input = document.getElementById( 'Search' );
input.onkeyup = search;

start();
};


function addListItem( hero: Hero )
{
var figure = document.createElement( 'figure' );
figure.className = 'Hero';
figure.setAttribute( 'data-name', hero.name );
figure.onclick = function()
    {
    guess( hero.name );
    };

var figcaption = document.createElement( 'figcaption' );
figcaption.innerText = hero.name;

var img = document.createElement( 'img' );
img.src = 'http://cdn.dota2.com/apps/dota2/images/heroes/' + hero.image;

figure.appendChild( figcaption );
figure.appendChild( img );

return figure;
}


function search( event: KeyboardEvent )
{
var key = event.keyCode;
var value = (<HTMLInputElement> event.target).value;

    // try to guess the first hero
if ( key === Utilities.KEY_CODE.enter )
    {
    var first = HERO_LIST.querySelector( '.Hero:not(.hidden)' );
    guess( first.getAttribute( 'data-name' ) );
    }

var re = new RegExp( value, 'i' );
var listElements = HERO_LIST.children;

for (var a = 0 ; a < listElements.length ; a++)
    {
    var element = listElements[ a ];

    if ( re.test( element.getAttribute( 'data-name' ) ) )
        {
        element.classList.remove( 'hidden' );
        }

    else
        {
        element.classList.add( 'hidden' );
        }
    }
}


function start()
{
HEROES_LEFT = HEROES.concat();
getNextHero();
}


function getNextHero()
{
if ( HEROES_LEFT.length === 0 )
    {
    return false;
    }

var position = Utilities.getRandomInt( 0, HEROES_LEFT.length - 1 );

CURRENT_HERO = HEROES_LEFT.splice( position, 1 )[ 0 ];
AUDIO.src = CURRENT_HERO.sounds[ 0 ];
AUDIO.play();

return true;
}


function guess( heroName: string )
{
if ( heroName === CURRENT_HERO.name )
    {
    if ( !getNextHero() )
        {
        console.log( 'Game Over! Restarting..' );
        start();
        }
    }

else
    {
    console.log( 'Incorrect :(' );
    }
}