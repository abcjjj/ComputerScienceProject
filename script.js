/**
 * JavaScript for Math Monsters
 * @authors: John and Jordan
 * @since: Wednesday, October 30, 2013
 */

/**
 * the Menu Screen
 */
function Menu() {
    this.startButton;
    this.quitButton;
    this.title;
    
    function setStartButton() {
        this.startButton = document.getElementById("start");
    }// end mutator
    
    function getStartButton() {
        return this.startButton;
    }// end accessor
    
    function setQuitButton() {
        this.quitButton = document.getElementById("quit");
    }// end mutator
    
    function getQuitButton() {
        return this.quitButton;
    }// end acessor
    
    function setTitle() {
        this.title = document.getElementById("title");
    }// end mutator
    
    function getTitle() {
        return this.title;
    }// end accessor
    
    function quitGame() {
    // needs a BBUI function
    }// end quitGame
    
    function startGame() {
        document.getElementbyId("menu").style.visibility = "hidden";
        document.getElementbyId("transition").style.visibility = "visible";
        // make new character?
        
    }// end startGame
    
}// end Constructor

//Menu
//initializes menu
var menu = new Menu();
menu.setTitle();
menu.setQuitButton();
menu.setStartButton();

// action events
menu.getStartButton().onclick = menu.startGame();
menu.getQuitButton().onclick = menu.quitGame();


/**
 * the character that the user controls
 */
function Character() {

    
}// end Constructor

//initializes character (should be at another place?)

// action events




/**
 * the Transition Screen
 */
function Transition() {

    
}// end Constructor

//Transition
//initializes transition
var transition = new Transition();

// action events
























