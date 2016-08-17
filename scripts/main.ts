/// <reference path="../libraries/utilities.1.8.0.d.ts" />

interface Hero {
    name: string;
    image: string;
    sounds: string[];
}


var HEROES: Hero[] = [
    { name: 'Abaddon', image: 'abaddon_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b4/Abad_begin_01.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/bd/Abad_begin_02.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/f/fc/Abad_move_11.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/d/dc/Abad_attack_05.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/f/fe/Abad_cast_02.mp3' ] },
    { name: 'Alchemist', image: 'alchemist_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/0/0c/Alch_battlebegins_01.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b2/Alch_battlebegins_02.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/9/98/Alch_move_05.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b5/Alch_move_14.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/0/02/Alch_attack_03.mp3' ] },
    { name: 'Ancient Apparition', image: 'ancient_apparition_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/3/35/Appa_battlebegins_01.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/2/2a/Appa_spawn_03.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/1/18/Appa_move_08.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/0/04/Appa_ability_touch_02.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/a/ae/Appa_level_02.mp3' ] },
    { name: 'Anti-Mage', image: 'antimage_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/7/7f/Anti_attack_03.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/e/ec/Anti_spawn_03.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/c/cb/Anti_move_07.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/3/3d/Anti_attack_01.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/5/5b/Anti_kill_06.mp3' ] },
    { name: 'Arc Warden', image: 'arc_warden_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/a/a7/Arcwar_battlebegins_03.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/6/6c/Arcwar_spawn_03.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/7/71/Arcwar_move_18.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/5/59/Arcwar_attack_06.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/0/0a/Arcwar_magnetic_field_05.mp3' ] },
    { name: 'Axe', image: 'axe_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/c/c1/Axe_spawn_08.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/c/c1/Axe_spawn_02.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b9/Axe_move_02.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/5/54/Axe_move_08.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/d/da/Axe_deny_16.mp3' ] },

    { name: 'Bane', image: 'bane_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/7/7a/Bane_spawn_06.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/1/12/Bane_spawn_07.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/f/fe/Bane_move_10.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/8/87/Bane_level_03.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/7/7b/Bane_ability_nightmare_01.mp3' ] },
    { name: 'Batrider', image: 'batrider_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/9/9e/Bat_battlebegins_01.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b0/Bat_battlebegins_02.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/e/e0/Bat_move_13.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/a/af/Bat_move_17.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/0/07/Bat_attack_03.mp3' ] },
    { name: 'Beastmaster', image: 'beastmaster_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/c/c4/Beas_spawn_05.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/a/a0/Beas_move_10.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/1/15/Beas_attack_05.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/1/16/Beas_ability_summonsbird_05.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/1/1c/Beas_level_01.mp3' ] },
    { name: 'Bloodseeker', image: 'bloodseeker_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/6/62/Blod_spawn_03.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/f/f7/Blod_move_05.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/b/be/Blod_attack_08.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/8/80/Blod_level_03.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/d/d5/Blod_ability_thirst_03.mp3' ] },
    { name: 'Bounty Hunter', image: 'bounty_hunter_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/3/30/Bount_battlebegins_01.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/0/05/Bount_move_02.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/e/e1/Bount_move_06.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/5/50/Bount_attack_02.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/c/c7/Bount_ability_windwalk_04.mp3' ] },
    { name: 'Bristleback', image: 'bristleback_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/7/7d/Bristle_begin_03.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/e/e9/Bristle_move_04.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/3/3f/Bristle_move_14.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/7/71/Bristle_attack_01.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/a/a7/Bristle_attack_18.mp3' ] },
    { name: 'Broodmother', image: 'broodmother_sb.png', sounds: [ 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/e/eb/Broo_battlebegins_01.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/1/18/Broo_move_06.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/1/1c/Broo_move_09.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/e/e2/Broo_attack_10.mp3', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/4/41/Broo_ability_spawn_10.mp3' ] },
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