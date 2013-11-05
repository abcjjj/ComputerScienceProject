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
    this.startButton = document.getElementById("start");
    this.quitButton= document.getElementById("quit");
    this.title= document.getElementById("title");
    
    function quitGame() {
    // needs a BBUI function
    }// end quitGame
    
    function startGame() {
        document.getElementbyId("menu").style.visibility = "hidden";
        document.getElementbyId("transition").style.visibility = "visible";
        var character = new Character();
    }// end startGame
    
}// end Constructor

//Menu
//initializes menu
var menu = new Menu();

// action events
menu.startButton.onclick = menu.startGame();
menu.quitButton.onclick = menu.quitGame();


/**
 * the character that the user controls
 */
function Character() {
    this.money = 0;
    
    function setMoney(money) {
        this.money = money;
    }// end mutatorbe
    
}// end Constructor

//initializes character 
    //(should go to another place?)

// action events
    // none (so far)


/**
 * the Transition Screen
 * elements become visible accordingly
 */
function Transition() {
    this.instructions = document.getElementById("instructions");
    this.chooseToSkip = document.getElementById("chooseToSkip");
    this.win = document.getElementById("win");
    this.toNextSreen = this.toNextScreen = document.getElementById("toNextSccreen");
    
    function typeDisplayed(type) {
        if(type==="instructions")
            this.getanswerInstructions().style.visibility = "visible";
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

// action events
transition.chooseToSkip.onclick = transition.proceed("instructions");

//proceed to different screens accordingly
if($("#instructions").css("visibility")==="visible")
    transition.getToNextScreen.onclick = transition.proceed("instructions");

if($("#win").css("visibility")==="visible")
    transition.getToNextScreen.onclick = transition.proceed("win");


/**
 * the battle screen
 */
function Battle() {
    this.answer = -1;
    this.isCharacterDead = false;
    this.background = document.getElementById("backgroundCave");
    this.question = document.getElementById("question");
    this.inputAnswer = document.getElementById("inputAnswer");
    this.monster = document.getElementById("monster");
    this.toShopButton = document.getElementById("toShop");
    this.moneyValue = document.getElementById("showMoney");
    
    function setAnswer(answer) {
        this.answer = answer;
    }// end mutator
    
    function setIsCharacterKilled(dead) {
        this.isCharacterDead = dead;
    }// end mutator

    function createMonster(type) {
        // some code to change the monster...
    }// end createMonster
    
    function death() {
        // when something (?) is dead
    }// end death
    
    function toShop() {
        document.getElementById("battleScreen").style.visibility = "hidden";
        document.getElementById("shop").style.visibility = "visible";
    }// end toShop
    
    function answerSubmitted(isCorrect) {
        if(isCorrect) {
            character.money += 500;
            
        }
        else {
            this.death();
        }// end if-else
    }
    
    // make question
    
}// end Constructor

//initializes battle screen 
var battleScreen = new Battle();

// @TO DO: add the followings to the above:q
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
    if(Math.floor(Math.random()*2)===1)
        return "" + Math.round(Math.random()*100);// 2digits
    else // 1digit
        return "" + Math.round(Math.random()*10);
}// end generateRandomSign
    
//var answer = 0;
function createQuestion(){
    var questionString = "";
    var terms = 2;
    var numbers = new Array();
    for(var i=0; i<terms; i++) {
        numbers[i] = generateRandomNatrualNumber();
        questionString += numbers[i];
        if(i==0)
           battle.setAnswer(numbers[i]);
        else {
            if(questionString.charAt(questionString.length-numbers[i].length-2)==='+')
                battle.setAnswer(parseInt(battle.answer)+parseInt(numbers[i]));
            if(questionString.charAt(questionString.length-numbers[i].length-2)==='-')
                battle.setAnswer(parseInt(battle.answer)-parseInt(numbers[i]));
            if(questionString.charAt(questionString.length-numbers[i].length-2)==='*')
                battle.setAnswer(parseInt(battle.answer)*parseInt(numbers[i]));
            if(questionString.charAt(questionString.length-numbers[i].length-2)==='/')// should round?
                battle.setAnswer(parseInt(battle.answer)/parseInt(numbers[i]));
        }// end if-else
        if(i!==terms-1)
            questionString += generateRandomSign();
    }
    return questionString + " =";
}// end createQuestion

function checkAnswer() {
    return $("#inputAnswer").val() === battle.answer;
}// end checkAnswer

// action events
battle.toShopButton.onclick = battle.toShop();

//need a submit in a form
$("#submit").click(checkAnswer());




/**
 * the shop
 */
function Shop() {
    var itemsDisplayed = document.getElementById("itemsDisplayed");// for now,this only includes the key
    var returnToBattle = document.getElementById("returnToBattle");// Yet to be included
    var isKeyBought = false;
    var isGameWon = false;
    
    function setIsKeyBought(bought) {
        isKeyBought = is;
    }// end mutator
    
    function setIsGameWon(won) {
        isGameWon = won;
    }// end mutator
    
    function gameWon() {
        $("#shop").css("visibility", "hidden");
        transition.proceed("win");
    }// end gameWon
    
    function returnToBattleScreen() {
        $("#shop").css("visibility", "hidden");
        $("#battle".css("visibility", "visible");)
    }// end returnToBattle
    
}// end constructor

// initialize Shop
var shop = new Shop();

// actions events
shop.returnToBattle.onclick = shop.returnToBattleScreen();

if(character.money>==1000)//temp.
    shop.itemDisplayed.onclick = shop.setIsKeyBought(true);
// there could be intermediate steps
if(shop.isKeyBought===true)
    shop.setIsGameWon(true);
if(shop.isGameWon===true)
    shop.gameWon();












