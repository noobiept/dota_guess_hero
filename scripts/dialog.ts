module Dialog
{
var CONTAINER: HTMLElement;
var MESSAGE: HTMLElement;
var OVERLAY: HTMLElement;

var ON_CLOSE: () => any;


export function init()
    {
    CONTAINER = document.getElementById( 'Dialog' );
    MESSAGE = document.getElementById( 'DialogMessage' );
    OVERLAY = document.getElementById( 'DialogOverlay' );
    OVERLAY.onclick = close;

    var ok = document.getElementById( 'DialogOk' );
    ok.onclick = close;
    }


export function open( message: string, onClose: () => any )
    {
    ON_CLOSE = onClose;
    MESSAGE.innerHTML = message;

    CONTAINER.classList.remove( 'hidden' );
    OVERLAY.classList.remove( 'hidden' );
    }


export function close()
    {
    CONTAINER.classList.add( 'hidden' );
    OVERLAY.classList.add( 'hidden' );

    if ( ON_CLOSE )
        {
        ON_CLOSE();
        }
    }
}