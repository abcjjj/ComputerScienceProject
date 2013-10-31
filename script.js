/**
 * JavaScript for Math Monsters
 * @authors: John and Jordan
 * @since: Wednesday, October 30, 2013
 */

/**
 * the Menu Screen
 * all elements are visible initially
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
    this.money = 0;
    
    function getMoney() {
        return this.money;
    }// end accessor
    
    function setMoney(money) {
        this.money = money;
    }// end mutator
    
}// end Constructor

//initializes character 
    //(should be at another place?)

// action events
    // none


/**
 * the Transition Screen
 * elements become visible accordingly
 */
function Transition() {
    this.instructions;
    this.chooseToSkip;
    this.win;
    this.toNextSreen;
    
    function getInstructions() {
        return this.instructions;
    }// end accessor
    
    function setInstructions() {
        this.instructions = document.getElementById("instructions");
    }// end mutator
    
    function getChooseToSkip() {
        return this.chooseToSkip;
    }// end accessor
    
    function setChooseToSkip() {
        this.chooseToSkip = document.getElementById("chooseToSkip");
    }// end mutator
    
    function getWin() {
        return this.win;
    }// end accessor
    
    function setWin() {
        this.win = document.getElementById("win");
    }// end mutator
    
    function getToNextScreen() {
        return this.toNextScreen
    }// end accessor
    
    function setToNextScreen() {
        this.toNextScreen = document.getElementById("toNextSccreen");
    }// end mutator
    
    function typeDisplayed(type) {
        if(type==="instructions")
            this.getInstructions().style.visibility = "visible";
        if(type==="before instructions")
            this.getChooseToSkip().style.visibility = "visible";
        if(type==="win")
            this.getWin().style.visibility = "visible";
        this.getToNextScreen().style.visibility = "visible";
    }// end typeDisplayed
    
    function proceed(type) {
        if(type==="instructions")
            document.getElementById("battle").style.visibility = "visible";
        if(type==="before instructions")
            document.getElementById("battle").style.visibility = "visible";
        if(type==="win")
            document.getElementById("menu").style.visibility = "visible";
    }// end proceed
    
}// end Constructor

//Transition
//initializes transition
var transition = new Transition();

// action events
























