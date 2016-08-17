module Message
{
var MESSAGE: HTMLElement;
var TIMEOUT_ID: number = null;


export function init()
    {
    MESSAGE = document.getElementById( 'Message' );
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
}