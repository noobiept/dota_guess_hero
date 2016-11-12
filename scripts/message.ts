module Message
{
var MESSAGE: HTMLElement;
var TIMEOUT_ID: number | null = null;


export function init()
    {
    MESSAGE = document.getElementById( 'Message' )!;
    }


export function show( message: string )
    {
    if ( TIMEOUT_ID !== null )
        {
        window.clearTimeout( TIMEOUT_ID );
        }

    MESSAGE.innerHTML = message;
    MESSAGE.classList.remove( 'noOpacity' );

    TIMEOUT_ID = window.setTimeout( function()
        {
        MESSAGE.classList.add( 'noOpacity' );
        TIMEOUT_ID = null;
        }, 1000 );
    }


export function correct()
    {
    MESSAGE.classList.remove( 'incorrect' );
    MESSAGE.classList.add( 'correct' );

    return show( 'Correct!' );
    }


export function incorrect()
    {
    MESSAGE.classList.remove( 'correct' );
    MESSAGE.classList.add( 'incorrect' );

    return show( 'Incorrect :(' );
    }
}