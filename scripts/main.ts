/// <reference path="../libraries/utilities.1.8.0.d.ts" />


window.onload = function()
{
Main.init();
};


module Main
{
var HERO_LIST: HTMLElement;
var AUDIO: HTMLAudioElement;
var INPUT: HTMLInputElement;

var HEROES_LEFT: Hero[];
var CURRENT_HERO: Hero;


export function init()
    {
    HERO_LIST = document.getElementById( 'HeroList' );
    AUDIO = <HTMLAudioElement> document.getElementById( 'Audio' );
    INPUT = <HTMLInputElement> document.getElementById( 'Search' );

        // build the hero list
    for (var a = 0 ; a < HEROES.length ; a++)
        {
        HERO_LIST.appendChild( addListItem( HEROES[ a ] ) );
        }

    AUDIO.volume = 0.5;
    INPUT.onkeyup = search;

    Dialog.init();
    Message.init();
    start();
    }


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
        if ( first )
            {
            guess( first.getAttribute( 'data-name' ) );
            }

        return;
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

    INPUT.focus();
    }


function getNextHero()
    {
    if ( HEROES_LEFT.length === 0 )
        {
        return false;
        }

    var heroPosition = Utilities.getRandomInt( 0, HEROES_LEFT.length - 1 );
    var soundPosition = 0;

    CURRENT_HERO = HEROES_LEFT.splice( heroPosition, 1 )[ 0 ];
    AUDIO.src = CURRENT_HERO.sounds[ soundPosition ];
    AUDIO.onended = function()
        {
        soundPosition++;

            // play the sounds continously
        if ( soundPosition >= CURRENT_HERO.sounds.length )
            {
            soundPosition = 0;
            }

        AUDIO.src = CURRENT_HERO.sounds[ soundPosition ];
        AUDIO.play();
        };
    AUDIO.play();

    return true;
    }


function guess( heroName: string )
    {
    if ( heroName === CURRENT_HERO.name )
        {
        Message.show( 'Correct!' );
        resetList();

        if ( !getNextHero() )
            {
            AUDIO.pause();
            INPUT.blur();

            Dialog.open( 'Game Over! Score: ---', start )
            }
        }

    else
        {
        Message.show( 'Incorrect :(' );
        }
    }


function resetList()
    {
    if ( INPUT.value === '' )
        {
        return;
        }

    INPUT.value = '';
    INPUT.focus();

    var listElements = HERO_LIST.children;

    for (var a = 0 ; a < listElements.length ; a++)
        {
        listElements[ a ].classList.remove( 'hidden' );
        }
    }
}
