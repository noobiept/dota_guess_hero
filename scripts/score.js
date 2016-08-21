var Score;
(function (Score) {
    var SCORE_ELEMENT; // UI element that shows the current score
    var TIMER; // as time passes, the score is decreased
    var SCORE = 0; // current score
    var INCORRECT_GUESSES = 0; // number of incorrect guesses so far
    var HELP_USED = 0; // number of times the help was used
    var INITIAL_SCORE = 1000;
    var CORRECT_SCORE = 100;
    var INCORRECT_PENALTY = 100;
    var HELP_PENALTY = 100;
    var TIME_PENALTY = 1;
    function init() {
        SCORE_ELEMENT = document.getElementById('Score');
        TIMER = new Utilities.Timer();
    }
    Score.init = init;
    /**
     * Update UI element with the current score.
     */
    function updateScore() {
        SCORE_ELEMENT.innerHTML = SCORE.toString();
    }
    /**
     * Reset the score (when a new game has started).
     */
    function reset() {
        SCORE = INITIAL_SCORE;
        INCORRECT_GUESSES = 0;
        HELP_USED = 0;
        TIMER.start({
            tickCallback: function () {
                timePasses();
            }
        });
        updateScore();
    }
    Score.reset = reset;
    function timePasses() {
        SCORE -= TIME_PENALTY;
        updateScore();
    }
    function stopScoring() {
        TIMER.stop();
    }
    Score.stopScoring = stopScoring;
    function correctGuess() {
        SCORE += CORRECT_SCORE;
        updateScore();
    }
    Score.correctGuess = correctGuess;
    function incorrectGuess() {
        INCORRECT_GUESSES++;
        SCORE -= INCORRECT_PENALTY;
        updateScore();
    }
    Score.incorrectGuess = incorrectGuess;
    function helpUsed() {
        HELP_USED++;
        SCORE -= HELP_PENALTY;
        updateScore();
    }
    Score.helpUsed = helpUsed;
    function getCurrentScore() {
        return {
            score: SCORE,
            incorrect: INCORRECT_GUESSES,
            help: HELP_USED
        };
    }
    Score.getCurrentScore = getCurrentScore;
})(Score || (Score = {}));
