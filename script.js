/**
 * JavaScript for Math Monsters
 * @authors: John and Jordan
 * @since: Wednesday, October 30, 2013
 */


/**
 * the Menu Screen
 * all elements are visible initially
 */
function quitGame() {
	// needs a BBUI function
}// end quitGame
// action events
$(function(){
	$("#start").click(function() {
		$(".menu").css("visibility", "hidden");
		$(".transitionSkip").css("visibility", "visible");
	});
});
$(function(){
	$("#quit").click(function() {
		//needs BBUI function
	});
});

/**
 * the character that the user controls
 */
function Character() {
    this.money = 0;
    function setMoney(money) {
        this.money = money;
    }// end mutatorbe
}// end Constructor
var character = new Character();

/**
 * the Transition Screen
 * elements become visible accordingly
 */
$(function(){
	$("#yesView").click(function() {
		$(".transitionSkip").css("visibility", "hidden");
		$(".instruction").css("visibility", "visible");
		$("#question").text(createQuestion(2));			
	});
	$("#noView").click(function() {
		$(".transitionSkip").css("visibility", "hidden");
		$(".battle").css("visibility", "visible");
		$("#question").text(createQuestion(2));		
	});
});
$(function(){
	$("#ok").click(function() {
		$(".instruction").css("visibility", "hidden");
		$(".battle").css("visibility", "visible");
	});
});
$(function(){
	$("#backToMenu").click(function() {
		$(".won").css("visibility", "hidden");
		$(".menu").css("visibility", "visible");
	});
});

/**
 * the battle screen
 */
var answer = -1;
var isCharacterDead = false;
function setIsCharacterKilled(dead) {
    this.isCharacterDead = dead;
}// end mutator
function createMonster(type) {
    // some code to change the monster...
}// end createMonster
function death() {
    // when something (?) is dead
    document.write("Game Over");// temp.
}// end death

//@TO DO: fix problems with the power terms
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
    return Math.floor(Math.random()*10) + "^" + Math.floor(Math.random()*10);
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
//@TO DO make it fit the Grade-4 expectations
function createQuestion(term){
    var questionString = "";// would mainly consists of the expression
    var terms = term; // should be set to 2 for now
    var numbers = new Array();

    for(var i=0; i<terms; i++) {
        numbers[i] = generateRandomNatrualNumber();
        questionString += numbers[i];
        if(i==0)
              answer=(numbers[i]);
        else {
            if(questionString.charAt(questionString.length-numbers[i].length-2)==='+')
                answer=(parseInt(answer)+parseInt(numbers[i]));
            if(questionString.charAt(questionString.length-numbers[i].length-2)==='-')
                answer=(parseInt(answer)-parseInt(numbers[i]));
            if(questionString.charAt(questionString.length-numbers[i].length-2)==='*')
                answer=(parseInt(answer)*parseInt(numbers[i]));
            if(questionString.charAt(questionString.length-numbers[i].length-2)==='/')// should round to 1-decimal place
                answer=(parseInt(answer)/parseInt(numbers[i]));
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
    return parseFloat($("#userAnswer").val()) === Math.round(answer*(Math.pow(10, decimal))/(Math.pow(10, decimal)));
}// end checkAnswer
$(function(){
	$("#submitAnswer").click(function() {
		alert(checkAnswer(1));
		if(checkAnswer(1)) {
			character.money += 500;
			$("#showMoney").text("Money: $" + character.money);
			$("#question").text(createQuestion(2, "noPower"));	
		}
		else
			death();
	});
});

/**
 * the shop
 */
$(function(){
	$("#toShop").click(function() {
		$(".battle").css("visibility", "hidden");
		$(".shop").css("visibility", "visible");
	});
	$("#toBattle").click(function() {
		$(".shop").css("visibility", "hidden");
		$(".battle").css("visibility", "visible");
	});
	$("#key").click(function() {
		if(character.money>=500) {
			$(".shop").css("visibility", "hidden");
			$(".won").css("visibility", "visible");
		}
	});
});

