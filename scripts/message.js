var Message;
(function (Message) {
    var MESSAGE;
    var TIMEOUT_ID = null;
    function init() {
        MESSAGE = document.getElementById('Message');
    }
    Message.init = init;
    function show(message) {
        if (TIMEOUT_ID !== null) {
            window.clearTimeout(TIMEOUT_ID);
        }
        MESSAGE.innerHTML = message;
        MESSAGE.classList.remove('noOpacity');
        TIMEOUT_ID = window.setTimeout(function () {
            MESSAGE.classList.add('noOpacity');
            TIMEOUT_ID = null;
        }, 1000);
    }
    Message.show = show;
})(Message || (Message = {}));
