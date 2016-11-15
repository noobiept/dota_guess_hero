var Dialog;
(function (Dialog) {
    var CONTAINER;
    var MESSAGE;
    var OVERLAY;
    var ON_CLOSE;
    function init() {
        CONTAINER = document.getElementById('Dialog');
        MESSAGE = document.getElementById('DialogMessage');
        OVERLAY = document.getElementById('DialogOverlay');
        var ok = document.getElementById('DialogOk');
        ok.onclick = close;
    }
    Dialog.init = init;
    function open(message, onClose) {
        ON_CLOSE = onClose;
        MESSAGE.innerHTML = message;
        CONTAINER.classList.remove('hidden');
        OVERLAY.classList.remove('hidden');
    }
    Dialog.open = open;
    function close() {
        CONTAINER.classList.add('hidden');
        OVERLAY.classList.add('hidden');
        if (ON_CLOSE) {
            ON_CLOSE();
        }
    }
    Dialog.close = close;
})(Dialog || (Dialog = {}));
