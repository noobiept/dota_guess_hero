module Score
{
var SCORE_ELEMENT: HTMLElement;         // UI element that shows the current score

var SCORE = 0;                          // current score
var INCORRECT_GUESSES = 0;              // number of incorrect guesses so far
var HELP_USED = 0;                      // number of times the help was used

var INITIAL_SCORE = 1000;
var CORRECT_SCORE = 100;
var INCORRECT_PENALTY = 100;
var HELP_PENALTY = 100;


export function init()
    {
    SCORE_ELEMENT = document.getElementById( 'Score' );
    }


/**
 * Update UI element with the current score.
 */
function updateScore()
    {
    SCORE_ELEMENT.innerHTML = SCORE.toString();
    }


/**
 * Reset the score (when a new game has started).
 */
export function reset()
    {
    SCORE = INITIAL_SCORE;
    INCORRECT_GUESSES = 0;
    HELP_USED = 0;

    updateScore();
    }


export function correctGuess()
    {
    SCORE += CORRECT_SCORE;
    updateScore();
    }


export function incorrectGuess()
    {
    INCORRECT_GUESSES++;
    SCORE -= INCORRECT_PENALTY;

    updateScore();
    }


export function helpUsed()
    {
    HELP_USED++;
    SCORE -= HELP_PENALTY;

    updateScore();
    }


export function getCurrentScore()
    {
    return {
            score: SCORE,
            incorrect: INCORRECT_GUESSES,
            help: HELP_USED
        };
    }
}