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
/**
 * generates a random 3-digit or 4-digit natrual number
 * @ return the number generated
 */
function generateBigNumber() {
    if(Math.floor(Math.random()*2)===1)
        return "" + Math.round(Math.random()*1000);// 2 digits
    else // 1 digit
        return "" + Math.round(Math.random()*10000);
}// end generateBigNumber
//var answer = 0;
/**
 * creates the an expression that the user will evaluate
 * @ param term how many terms there will be in the expression
 * @ param type what type of terms will exsist within the expression
 * @ return the question randomly generated according to the parameters
 */
//Met->@TO DO make it fit the Grade-4 expectations; nedd to rewrite the function through using the new rationale
function createQuestion(term){
    var questionString = "";// would mainly consist of the expression
    var numbers = new Array();
    var addOrMultiply = Math.round(Math.random());// 0 -> *, 1 -> + or -
    
    for(var i=0; i<term; i++) {
    	
        if(answer!=='/') {
            if((answer==='*'&&term>=3)||addOrMultiply===0) {
                 numbers[i]=Math.round(Math.random()*10);// only want small integers for multiplication involving many numbers
            }
            else
            	numbers[i] = generateRandomNaturalNumber();               
        }
        else {
                numbers[i] = Math.floor(Math.random()*10)+1;//preventing a negative and making the number as small as required               
        }// end if-else
        questionString += numbers[i];
        if(answer==='-') {
            numbers[i] = parseInt(numbers[i])*(-1);
        }
        if(answer==='*') {
        	numbers[i]=parseInt(numbers[i])*parseInt(numbers[i-1]);
        	numbers[i-1]=0;
        }
        if(answer==='/') {
        	numbers[i]=parseInt(numbers[i])/parseInt(numbers[i-1]);
        	numbers[i-1]=0;
        }

        //since the curriculum has certain expectations that restricts the types of question, 
        // more conditions will be added to fit with them
        if(i!==term-1) {
        	if(term===2) {
                questionString += generateRandomSign();// any operation would be ok        		
        	}
        	else if(term>2) {
        		if(addOrMultiply===0) // just *
                    questionString += " * ";
                else { // + or -
                	if(Math.round(Math.random())===1)
                	    questionString += " + ";
                    else
                        questionString += " - ";
                }// end if-else, special conditions that fits the curriculum 
        	}
        	else// this should not be reached as the term cannot be 1 and the students have not learned orders of operation
                questionString += generateRandomSign();
            answer=questionString.charAt(questionString.length-2);// use answer to temporarily record the operation
        }
    //	alert(numbers[i]);
    }// end for
    answer = 0;
    for(var i=0; i<numbers.length; i++) {
    	answer = parseInt(answer) + parseInt(numbers[i]);
    }// end for
    // checks for negative answers
    if(answer<0) {
        var temp = 0;// default
        for(var i=0; i<numbers.length; i++) {
            if(numbers[i]!==0) {
                temp = numbers[i];
                break;
            }
        }// end for
        answer = answer*-1 + 2*temp;
        questionString = questionString.replace(/-/gi, "+");
    }
    alert(answer);
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







