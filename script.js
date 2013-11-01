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
    this.startButton = -1;
    this.quitButton= -1;
    this.title= -1;
    
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
        // make new character (?)
        var character = new Character();
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
    // none (so far)


/**
 * the Transition Screen
 * elements become visible accordingly
 */
function Transition() {
    this.instructions = -1;
    this.chooseToSkip = -1;
    this.win = -1;
    this.toNextSreen = -1;
    
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
        if(type==="win")
            document.getElementById("menu").style.visibility = "visible";
        document.getElementById("transitionScreens").style.visibility = "hidden";
    }// end proceed
    
}// end Constructor

//Transition
//initializes transition
var transition = new Transition();
transistion.setInstructions();
transistion.setWin();
transistion.setChooseToSkip();
transistion.setToNextScreen();

// action events
transition.getChooseToSkip.onclick = transition.proceed("instructions");

// if(transition.getInstructions().getAttribute("visibility")==="visible")
//     transition.getToNextScreen.onclick = transition.proceed("instructions");

// if(transition.getWin().getAttribute("visibility")==="visible")
//     transition.getToNextScreen.onclick = transition.proceed("win");


/**
 * the character that the user controls
 */
function Battle() {
    this.answer = -1;
    this.isCharacterDead = false;
    this.background = -1;
    this.question = -1;
    this.inputAnswer = -1;
    this.monster = -1;
    this.toShopButton = -1;
    this.moneyValue = -1;
    
    function getAnswer() {
        return this.answer;
    }// end accessor
    
    function setAnswer(answer) {
        this.answer = answer;
    }// end mutator
    
    function getIsCharacterKilled() {
        return this.isCharacterDead;
    }// end accessor
    
    function setIsCharacterKilled(dead) {
        this.isCharacterDead = dead;
    }// end mutator
    
    function getBackground() {
        return this.background;
    }// end accessor
    
    function setBackground() {
        this.background = document.getElementById("backgroundCave");
    }// end mutator
    
    function getQuestion() {
        return this.question;
    }// end accessor
    
    function setQuestion() {
        this.question = document.getElementById("question");
    }// end mutator
    
    function getInputAnswer() {
        return this.inputAnswer;
    }// end accessor
    
    function setInputAnswer() {
        this.inputAnswer = document.getElementById("inputAnswer");
    }// end mutator
    
    function getMonster() {
        return this.monster;
    }// end accessor
    
    function setMonster() {
        this.monster = document.getElementById("monster");
    }// end mutator
    
    function getToShopButton() {
        return this.toShopButton;
    }// end accessor
    
    function setToShopButton() {
        this.toShopButton = document.getElementById("toShop");
    }// end mutator
    
    function getMoneyValue() {
        return this.moneyValue;
    }// end accessor
    
    function setMoneyValue() {
        this.moneyValue = document.getElementById("showMoney");
    }// end mutator
    
    function createMonster(type) {
        // some code to change the monster...
    }// end createMonster
    
    function createQuestion(){
        var questionString = "";
        var terms = 2;
        var numbers = new Array();
        for(var i=0; i<terms; i++) {
            numbers[i] = generateRandomNatrualNumber();
            questionString += numbers[i];
            if(i===0)
                this.setAnswer(numbers[i]);
            else {
                if(questionString.charAt(questionString.length-2)==='+')
                    this.setAnswer(this.getAnswer()+numbers[i]);
                if(questionString.charAt(questionString.length-2)==='-')
                    this.setAnswer(this.getAnswer()-numbers[i]);
                if(questionString.charAt(questionString.length-2)==='*')
                    this.setAnswer(this.getAnswer()*numbers[i]);
                if(questionString.charAt(questionString.length-2)==='/')
                    this.setAnswer(Math.round(this.getAnswer()/numbers[i]));// round to ones
            }// end if-else
            if(i!==terms-1)
                questionString += this.generateRandomSign();
        }
        return questionString + " = ?";
    }// end createQuestion
    
    function generateRandomSign() {
        // random sign:
        var randomSign = Math.floor(Math.random()*4);
        if(randomSign == 0)
            return " + ";
        else if(randomSign == 1)
            return " - ";
        else if(randomSign == 2)
            return " * ";
        else //if(randomSign == 3)
            return " / ";  
    }// end generateRandomSign
    
    function generateRandomNatrualNumber() {
        return "" + Math.round(Math.random()*100);
    }// end generateRandomSign
    
    function isAnswerCorrect(input) {
        return input===this.getAnswer();
    }// end isAnswerCorrect
    
    function death() {
        // when something (?) is dead
    }// end death
    
    function toShop() {
        document.getElementById("battleScreen").style.visibility = "hidden";
        document.getElementById("shop").style.visibility = "visible";
    }// end toShop
    
}// end Constructor

//initializes battle screen 


// action events

// @TO DO: modify the above to the followings:
    function generateRandomSign() {
        // random sign:
        var randomSign = Math.floor(Math.random()*4);
        if(randomSign == 0)
            return " + ";
        else if(randomSign == 1)
            return " - ";
        else if(randomSign == 2)
            return " * ";
        else //if(randomSign == 3)
            return " / ";  
    }// end generateRandomSign
    function generateRandomNatrualNumber() {
        return "" + Math.round(Math.random()*100);// 2 digits - should provide a wider range
    }// end generateRandomSign
    
    var answer = 0;
    function createQuestion(){
        var questionString = "";
        var terms = 2;
        var numbers = new Array();
        for(var i=0; i<terms; i++) {
            numbers[i] = generateRandomNatrualNumber();
            questionString += numbers[i];
            if(i==0)
               answer = numbers[i];
            else {
                if(questionString.charAt(questionString.length-numbers[i].length-2)==='+')
                   answer = (parseInt(answer)+parseInt(numbers[i]));
                if(questionString.charAt(questionString.length-numbers[i].length-2)==='-')
                   answer = (parseInt(answer)-parseInt(numbers[i]));
                if(questionString.charAt(questionString.length-numbers[i].length-2)==='*')
                   answer = (parseInt(answer)*parseInt(numbers[i]));
                if(questionString.charAt(questionString.length-numbers[i].length-2)==='/')
                   answer = (parseInt(answer)/parseInt(numbers[i]));
            }// end if-else
            if(i!==terms-1)
                questionString += generateRandomSign();
        }
        return questionString + " =";
    }// end createQuestion
























