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
                $(".storySkip").css("visibility", "visible");
        });
});
$(function(){
        $("#howtoplay").click(function() {
                $(".instructions").css("visibility", "visible");
                $(".menu").css("visibility", "hidden");
        });
});
$(function(){
        $("#settings").click(function() {
                $(".settings").css("visibility", "visible");
                $(".menu").css("visibility", "hidden");
        });
});
$(function(){
        $("#savedgames").click(function() {
                $(".savedgames").css("visibility", "visible");
                $(".menu").css("visibility", "hidden");
        });
});


/**
 * the instructions screen
 */
$(function(){
        $("#instructionstoMenu").click(function() {
                $(".instructions").css("visibility", "hidden");
                $(".menu").css("visibility", "visible");
        });
});
/**
 * the settings screen
 */
$(function(){
        $("#settingstoMenu").click(function() {
                $(".settings").css("visibility", "hidden");
                $(".menu").css("visibility", "visible");
        });
});
/**
 * the saved games screen
 */
$(function(){
        $("#savedgamestoMenu").click(function() {
                $(".savedgames").css("visibility", "hidden");
                $(".menu").css("visibility", "visible");
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
                $(".storySkip").css("visibility", "hidden");
                $(".story").css("visibility", "visible");
                $("#question").text(createQuestion(2, "noPower"));                        
        });
        $("#noView").click(function() {
                $(".storySkip").css("visibility", "hidden");
                $(".battle").css("visibility", "visible");
                $("#question").text(createQuestion(2, "noPower"));                
        });
});
$(function(){
        $("#ok").click(function() {
                $(".story").css("visibility", "hidden");
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
    document.write("Game Over");
}// end death

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
//var answer = 0;
/**
 * creates the an expression that the user will evaluate
 * @ param term how many terms there will be in the expression
 * @ param type what type of terms will exsist within the expression
 * @ return the question randomly generated according to the parameters
 */
//@TO DO make it fit the Grade-4 expectations; nedd to rewrite the function through using the new rationale
function createQuestion(term){
    var questionString = "";// would mainly consists of the expression
    var terms = term; // should only be set to 2 or 3; not really necessary
    var numbers = new Array();

    for(var i=0; i<terms; i++) {
        if(questionString.charAt(questionString.length-2)!=='/')
                numbers[i] = generateRandomNatrualNumber();
        else {
                numbers[i] = generateRandomNatrualNumber();
                while(number[i]===0)// this should prevent a 0 divisor
                        numbers[i] = generateRandomNatrualNumber();                
        }// end if-else
        questionString += numbers[i];
        if(i==0)
              answer=(numbers[i]);
        else {
            if(questionString.charAt(questionString.length-numbers[i].length-2)==='+')
                answer=(parseInt(answer)+parseInt(numbers[i]));
            if(questionString.charAt(questionString.length-numbers[i].length-2)==='-') {
                answer=(parseInt(answer)-parseInt(numbers[i]));
                if(answer<0) { // some substring stuff doesn't work...
                        var temp1 = questionString.substring(questionString.length-(numbers[i].length));
                        var temp2 = questionString.substring(questionString.length-numbers[i].length-4-numbers[i-1].length,questionString.length-numbers[i].length-4);
                        questionString = questionString.substring(0, questionString.length-numbers[i].length-4-numbers[i-1]) + temp1 + " - " + temp2;
                        answer = answer + 2*(numbers[i] - numbers[i-1]);
                }// prevent a possible negative answer by switching the minuend and the subtractor; the answer is changed accordingly
            }
            // problems with multiplication and division
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
                        $("#question").text(createQuestion(2));        
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







