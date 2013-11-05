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

// @TO DO: add the followings to the above:

/**
 * generates a random opeeration sign in an expression that will be generated
 * @ return a random opertation sign that might be +, -, *, or /
 */
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

/**
 * generates a random 1-digit or 2-digit natrual number
 * @ return the number generated
 */
function generateRandomNatrualNumber() {
    if(Math.floor(Math.random()*2)===1)
        return "" + Math.round(Math.random()*100);// 2 digits
    else // 1 digit
        return "" + Math.round(Math.random()*10);
}// end generateRandomSign

/**
 * a function that creates a power (i.e. 2^3)
 * base and exponent should be 1-digit; base could be 10
 * @ return a string in the form of base^exponent
 */
function generateRandomPower() {
    return Math.round(Math.random()*10) + "^" + Math.floor(Math.random()*10);
}// end generateRandomPower

/**
 * turns a power into an integer
 * @ param power is the power that is to be transformed
 * @ return the transformed integer
 */
function turnPowerIntoNumber(power) {
    return Math.pow(parseInt(power.charAt(0)), power.charAt(2)); //at index 0 is the base, at index 1 is '^', and at index 2 is the exponent
}// end turnPowerIntoNumber
    
//var answer = 0;
/**
 * creates the an expression that the user will evaluate
 * @ param term how many terms there will be in the expression
 * @ param type what type of terms will exsist within the expression
 * @ return the question randomly generated according to the parameters
 */
function createQuestion(term, type){
    var questionString = "";// would mainly consists of the expression
    var terms = term; // should be set to 2 for now
    var numbers = new Array();

    for(var i=0; i<terms; i++) {
        if(type==="noPower") {
            numbers[i] = generateRandomNatrualNumber();
            questionString += numbers[i];
        }
        else if(type==="hasPower") {
            if(Math.floor(Math.random()*2)===0) {   // 0 would lead to no exponent, 1 would lead to a power
                number[i] = generateRandomNaturalNumber();
                questionString += number[i];
                number[i] = turnPowerIntoNumber(number[i]);
            }
            else {  // ===1
                number[i] = generateRandomPower();
                questionString += number[i];
                number[i] = turnPowerIntoNumber(number[i]);
            }// end if-else
        }
        else {
            return "Please select a type";
        }// end if-else
        
        if(i==0)
              battle.setAnswer(numbers[i]);
        else {
            if(questionString.charAt(questionString.length-numbers[i].length-2)==='+')
                battle.setAnswer(parseInt(battle.answer)+parseInt(numbers[i]));
            if(questionString.charAt(questionString.length-numbers[i].length-2)==='-')
                battle.setAnswer(parseInt(battle.answer)-parseInt(numbers[i]));
            if(questionString.charAt(questionString.length-numbers[i].length-2)==='*')
                battle.setAnswer(parseInt(battle.answer)*parseInt(numbers[i]));
            if(questionString.charAt(questionString.length-numbers[i].length-2)==='/')// should round to 1-decimal place
                battle.setAnswer(parseInt(battle.answer)/parseInt(numbers[i]));
        }// end if-else
        if(i!==terms-1)
            questionString += generateRandomSign();
    }// end for
    
    return questionString + " = ?";
}// end createQuestion

/**
 * checks whether if the answer from the user is right
 * @ decimal how many decimal places the generated answer is rounded to
 * @ return whether if the answer is correct
 */
function checkAnswer(decimal) {
    return $("#inputAnswer").val() === Math.round(battle.answer*(Math.pow(10, decimal))/(Math.pow(10, decimal));
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





