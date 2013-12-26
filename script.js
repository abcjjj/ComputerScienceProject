/**
 * JavaScript for Math Monsters
 * @author: John and Jordan
 * @since: Wednesday, October 30, 2013
 */

// this object directs what questions the question generator object will generate
function TypeControl() {
	// the stages
	var isEasy = false;
	var isMedium = false;
	var isHard = false;
	var isCrzay = false;// describes the difficulty of the stage
	
	// the operation of the question
	var operation = -1;
	const ADD = 1;// constants matching the types of operations in the generator
	const SUBTRACT = 2;
	const MULTIPLY = 3;
	const DIVIDE = 4;
	const MIX = 5;
	
	this.setIsEasy = function(e) {
		isEasy = e;
	}// end mutator
	this.getIsEasy = function() {
		return isEasy;
	}// end accessor
	this.setIsMedium = function(m) {
		isMedium = m;
	}// end mutator
	this.getIsMedium = function() {
		return isMedium;
	}// end accessor	
	this.setIsHard = function(h) {
		isEHard = h;
	}// end mutator
	this.getIsHard = function() {
		return isHard;
	}// end accessor	
	this.setIsCrazy = function(c) {
		isCrazy = c;
	}// end mutator
	this.getIsCrazy = function() {
		return isCrazy;
	}// end accessor	
	
	//operation
	this.setOperation = function(o) {
		switch(o) {
			case "add":
				operation = ADD;
				break;
			case "subtract":
				operation = SUBTRACT;
				break;
			case "multiply":
				operation = MULTIPLY;
				break;
			case "divide":
				operation = DIVIDE;
				break;
			default:
				operation = MIX;
		}// end switch		
	}// end mutator
	this.getOperation = function() {
		switch(operation) {
			case ADD:
				return ADD;
			case SUBTRACT:
				return SUBTRACT;
			case MULTIPLY:
				return MULTIPLY;
			case DIVIDE:
				return DIVIDE;
			default:
				return MIX;
		}// end switch	
	}// end accessor
	
		
}// end constructor
var typeControl = new TypeControl();

function Clock() {
	const CLOCK_PRICE = 25;
	this.clockUse = function() {
		if(character.getClockNumber()>0) {
			character.setClcckNumber(character.getClockNumber()--);// 1 clock comsumed
			timer.setCurrentTime(timer.getCurrentTime()+=10);// give 10 extra seconds
		}
	}// end clockUsed
	this.getClockPrice = function() {
		return CLOCK_PRICE;
	}// end accessor
	this.clockBuy = function() {
		if(character.getMoney()>=25) {
			if(confirm("Are you sure?")) {
				character.setClockNumber(character.getClockNumber()++);
				character.setMoney(character.getMoney()-=CLOCK_PRICE);
			}
		}
		else
			alert("You don't have enough money!");// <- could let the shop guy say it instead?
	}// end buyHeart
}// end constructor
var clock = new Clock();

function Heart() {
	const HEART_PRICE = 75;
	this.getHeartPrice = function() {
		return HEART_PRICE;0
	}// end accessor
	this.heartBuy = function() {
		if(character.getMoney()>=75) {
			if(confirm("Are you sure?")) {
				character.setLifePoints(character.getLifePoints()++);
				character.setMoney(character.getMoney()-=HEART_PRICE);
			}
		}
		else
			alert("You don't have enough money!");// <- could let the shop guy say it instead?
	}// end heartBuy
}// end constructor
var heart = new Heart();

function Shield() {
	var shieldPrice = 500;
	this.shieldBuy = function() {
		if(character.getMoney()>=shieldPrice) {
			if(confirm("Are you sure?")) {
				character.setLifePoints(character.getShieldUpgrade()++);
				character.setMoney(character.getMoney()-=shieldPrice);
				shieldPrice += 500;// the price goes up
			}
		}
		else
			alert("You don't have enough money!");// <- could let the shop guy say it instead?
	}// end shieldBuy
	/**
	 *Determines whether the user envades the monster's attack upon giving a wrong answer 
	 */
	this.isEnvaded = function() {
		if(Math.floor(Math.random())<0.5-0.5*Math.pow(0.5, character.getShieldUpgrade()))
			return true;// P(s) = 0.5 - 0.5^(s+1), where P represents the probability of an envasion, and s represent the level of the shield upgrade
		else
			return false;
	}// end shield 
}// end constructor
var shield = new Shield();

function Weapon() {
	var weaponPrice = 500;
	this.weaponBuy = function() {
		if(character.getMoney()>=weaponPrice) {
			if(confirm("Are you sure?")) {
				character.setWeaponUpgrade(character.getWeaponUpgrade()++);
				character.setMoney(character.getMoney()-=weaponPrice);
			}
		}
		else
			alert("You don't have enough money!");// <- could let the shop guy say it instead?
	}// end weaponBuy
	
	/*
	 *how should this affect the battle?
	 */
	
}// end constructor
var weapon = new Weapon();

function Brain() {
	const BRAIN_PRICE = 50;
	this.brainBuy = function() {
		if(character.getMoney()>=BRAIN_PRICE) {
			if(confirm("Are you sure?")) {
				character.setBrainNumber(character.getBrainNumber()++);
				character.setMoney(character.getMoney()-=BRAIN_PRICE);
			}
		}
		else
			alert("You don't have enough money!");// <- could let the shop guy say it instead?
	}// end brainBuy
	this.brainUse = function() {
		if(character.getBrainNubmer()>0) {
			character.setBrainNumber(character.getBrainNumber()--);
			hint();
		}
	}// end brainUse
	function hint() {
		// what type(s) of hints should be given?
	}// end hint
}// end constructor
var brain = new Brain();

// action events
$(function(){
	
	/*
	 * The menu screens
	 */
        $("#start").click(function() {
                $(".menu").css("visibility", "hidden");
                $(".storySkip").css("visibility", "visible");
        });

        $("#howtoplay").click(function() {
                $(".instructions").css("visibility", "visible");
                $(".menu").css("visibility", "hidden");
        });

        $("#settings").click(function() {
                $(".settings").css("visibility", "visible");
                $(".menu").css("visibility", "hidden");
        });

        $("#savedgames").click(function() {
                $(".savedgames").css("visibility", "visible");
                $(".menu").css("visibility", "hidden");
        });

        $("#instructionstoMenu").click(function() {
                $(".instructions").css("visibility", "hidden");
                $(".menu").css("visibility", "visible");
        });

        $("#settingstoMenu").click(function() {
                $(".settings").css("visibility", "hidden");
                $(".menu").css("visibility", "visible");
        });

        $("#savedgamestoMenu").click(function() {
                $(".savedgames").css("visibility", "hidden");
                $(".menu").css("visibility", "visible");
        });
                
        $("#backToMenu").click(function() {
                $(".won").css("visibility", "hidden");
                $(".menu").css("visibility", "visible");
        });
        
    /*
     * The transition/information screens
     */
        $("#yesView").click(function() {
                $(".storySkip").css("visibility", "hidden");
                $(".story").css("visibility", "visible");                        
        });
        $("#noView").click(function() {
                $(".storySkip").css("visibility", "hidden");
                $(".customization").css("visibility", "visible");
        });
        
        $("#ok").click(function() {
                $(".story").css("visibility", "hidden"); 
                $(".customization").css("visibility", "visible");
        });

        $("#doneCus").click(function() {
                $(".customization").css("visibility", "hidden");
                $(".stageSelection").css("visibility", "visible");       
                character.setLifePoints(5);      
        });           
      
    /*
     * The battle, action, and stage selection screens
     */  
        $("#backToBattle").click(function() {
                $(".won").css("visibility", "hidden");
                $(".battle").css("visibility", "visible");
        });       
        
        $("#stage1").click(function() {
                $(".stageSelection").css("visibility", "hidden");
                $(".hub").css("visibility", "visible");
                typeControl.setIsEasy(true);
                typeControl.setIsMedium(false);
                typeControl.setIsHard(false);
                typeControl.setIsCrazy(false);
                monster.setTotalLP(1);
                monster.setMoneyGive(5);
        });  
        $("#stage2").click(function() {
                $(".stageSelection").css("visibility", "hidden");
                $(".hub").css("visibility", "visible");
                typeControl.setIsMedium(true);
                typeControl.setIsEasy(false);
                typeControl.setIsHard(false);
                typeControl.setIsCrazy(false);
                monster.setTotalLP(3);
                monster.setMoneyGive(10);
        });  
        $("#stage3").click(function() {
                $(".stageSelection").css("visibility", "hidden");
                $(".hub").css("visibility", "visible");
                typeControl.setIsHard(true);
                typeControl.setIsEasy(false);
                typeControl.setIsMedium(false); 
                typeControl.setIsCrazy(false);
                monster.setTotalLP(3);
                monster.setMoneyGive(20);
        });          
        $("#stage4").click(function() {
                $(".stageSelection").css("visibility", "hidden");
                $(".hub").css("visibility", "visible");
                typeControl.setIsCrazy(true);
                typeControl.setIsEasy(false);
                typeControl.setIsMedium(false); 
                typeControl.setIsHard(false);
                monster.setTotalLP(5);
                monster.setMoneyGive(50);
        });                     
                         
        $("#travelAddition").click(function() {
                typeControl.setOperation("add");
        });  
        $("#travelSubtraction").click(function() {
                typeControl.setOperation("subtract");               
        });  
        $("#travelMultiplication").click(function() {
                typeControl.setOperation("multiply");               
        });  
        $("#travelDivision").click(function() {
                typeControl.setOperation("divide");               
        });           
        $("#travelCombined").click(function() {
                typeControl.setOperation("mix");               
        });        
        $("#travelAddition, #travelSubtraction, #travelMultiplication, #travelDivision, #travelCombined").click(function() {   
        		monster.setLifePointsMonster(monster.getTotalLP());  
                if(typeControl.getIsEasy()||typeControl.getIsHard())
                	timer.setTotalTime(30);
                else // medium or crazy stage
                	timer.setTotalTime(15);
				startBattle();
                $(".hub").css("visibility", "hidden");
                $(".battle").css("visibility", "visible"); 				
        });  
          
                         
        $("#hubToShop").click(function() {
        		$("#showMoney").text("Money: $" + character.getMoney());
                $(".hub").css("visibility", "hidden");
                $(".shop").css("visibility", "visible");
                
        });        
        
        $("#toHub").click(function() {
                $(".shop").css("visibility", "hidden");
                $(".hub").css("visibility", "visible");
        });
        
        $("#key").click(function() {
                if(character.money>=500) {
                	character.setMoney(character.getMoney()-=500);
                    $(".shop").css("visibility", "hidden");
                    $(".won").css("visibility", "visible");
                }
        });  
        
        $("#submitAnswer").click(function() {
                if(checkAnswer(1)) {                  
					alert("Correct: You hit the monster!");
					monster.loseLifeMonster();
					if(monster.getLifePointsMonster()<=0) { // checks if the monster is dead
						clearInterval(timeInterval);
						alert("You defeated the monster!\n You earned $" + monster.getMoneyGive());
						character.setMoney(character.getMoney()+monster.getMoneyGive());
						$(".battle").css("visibility", "hidden");
	                    $(".hub").css("visibility", "visible");
					}	    
                }
                else {
                	alert("Wrong answer: You are hit!");
                	character.loseLife();
                	if(character.getLifePoints()<=0) { // check if the character is dead
                		alert("Oh no! You are defeated by the monster!");
                		character.death();
                	}
                }// end if-else
                startBattle();
        });
        
	$(window).keydown(function(event){
	    if(event.keyCode == 13) {
	      event.preventDefault();
	      return false;
	    }
	  });   // this prevents the user from pressing enter, which will relaod the screen                     
	  
	});

/**
 * sets up the scene for a battle
 */
function startBattle() {
    questionGenerator.createQuestion(typeControl.getOperation(), typeControl.getIsEasy()||typeControl.getIsMedium());
    $("#question").text(questionGenerator.getQuestion());                  
	$("#timer").text("Time remaining: " + timer.getTotalTime()); 
	timer.countDown();	
}// end startBattle
/**
 * checks whether if the answer from the user is right
 * @ decimal how many decimal places the generated answer is rounded to
 * @ return whether if the answer is correct
 */
function checkAnswer(decimal) {
    return parseFloat($("#userAnswer").val()) === Math.floor(questionGenerator.getAnswer()*(Math.pow(10, decimal)))/(Math.pow(10, decimal));
}// end checkAnswer

var timeInterval = -1;// an interval object that can be cleared by the timer object
/**
 * The timer object
 */
function Timer() {
	currentTime=-1;
	totalTime=-1;
	
	this.countDown = function() {
		currentTime = totalTime;
	    timeInterval=setInterval(function(){
	    	if(this.currentTime!==0) {
		    	currentTime = document.getElementById("timer").textContent;
		    	currentTime = parseInt(currentTime.substring(currentTime.length-2));
		    	currentTime--;
		    	$("#timer").text("Time remaining: " + currentTime);
	    	}
	    	else {// currentTime == 0
	    		clearInterval(timeInterval);
	    		alert("Time Up! The monster hits you!");
	    		character.loseLife();
	    		startBattle();
	    		    if(character.getLifePoints()==0) {
                		alert("Oh no! You are defeated by the monster!");
                		character.death();
                	}
	    	}// end if-else	    	
	    },1000);
		$("#submitAnswer").click(function() {
	        clearInterval(timeInterval);
		});
    };// end countDown
    this.getTotalTime = function() {
    	return totalTime;
    }// end accessor
    this.setTotalTime = function(time) {
    	totalTime = time;
    }// end mutator
    this.getCurrentTime = function() {
    	return currentTime;
    }// end accessor
    this.setCurrentTime = function(t) {
    	currentTime = t;
    }// end mutator
}// end constructor
var timer = new Timer();

function Monster() {
    type = "";// 6 types: worm, snail, bird, chimaera, robot, and boss
    totalLP = -1;// LP = life points
    lifePointsMonster = -1;
    moneyGive = -1;
    
    this.setType = function(t) {
        type = t;
    }// end mutator
    this.getType = function() {
        return type;
    }// end accessor    
    this.setTotalLP = function(tLP) {
        totalLP = tLP;
    }// end mutator
    this.getTotalLP = function() {
        return totalLP;
    }// end accessor        
    this.setLifePointsMonster = function(points) {
        lifePointsMonster = points;
        changeMonsterLives();
    }// end mutator
    this.getLifePointsMonster = function() {
        return lifePointsMonster;
    }// end accessor       
	this.setMoneyGive = function(money) {
		moneyGive = money;
	}// end mutator
	this.getMoneyGive = function() {
		return moneyGive;
	}// end accessor
    
    this.loseLifeMonster = function(){
    	lifePointsMonster --;
		changeMonsterLives();
    }// end loseLife
    
    this.setImageMonster = function() {
    	// @TO DO:  change the image
    }// end setImage
    
	function changeMonsterLives() {
	    var canvas = document.getElementById("monsterLives");
	    var context = canvas.getContext('2d');
	    var imageObj = new Image();
	    context.clearRect(0,0,canvas.width,canvas.height);
	    imageObj.src = "images/heart.png";
	    imageObj.onload = function() {
	        for(var i=0; i<lifePointsMonster; i++)
	            context.drawImage(imageObj, 20*i, 0);
	    };
	}// end changeMonsterLives
    
}// end createMonster
var monster = new Monster();

/**
 * the character that the user controls
 */
function Character() {
    // customization attributes
    isMale = false;

    // battle attributes
    money = 0;
    lifePoints = -1;
    weaponUpgrade = 0;
    shieldUpgrade = 0;
    clockNumber = 0;
    brainNumber = 0;
    foodNumber = 0;
    
    // customization attributes
    this.setGender = function(gender) {
        if(gender==="male")
            isMale = true;
        else // is not male -> female
            isMale = false;
    }// end mutator
    this.getGender = function(gender) {
        if(isMale)
            return "Male";
        else // is not male -> female
            return "Female";
    }// end accessor
    this.setImage = function() {
    	// @TO DO:  change the image
    }// end setImage
    
    
    // battle-related functions
    this.setMoney = function(m) {
        money = m;
    }// end mutator
    this.getMoney = function() {
        return money;
    }// end accessor
    this.setLifePoints = function(lp) {
        lifePoints = lp;
        changeCharacterLives();
    }// end mutator
    this.getLifePoints = function() {
        return lifePoints;
    }// end accessor    
    this.setWeaponUpgrade = function(level) {
        weaponUpgrade = level;
    }// end mutator
   this.getWeaponUpgrade = function() {
        return weaponUpgrade;
    }// end accessor    
    this.setShieldUpgrade = function(level) {
        shieldUpgrade = level;
    }// end mutator
   this.getShieldUpgrade = function() {
        return shieldUpgrade;
    }// end accessor    
    this.setClockNumber = function(amount) {
        clockNumber = amount;
    }// end mutator
   this.getClockNumber = function() {
        return clockNumber;
    }// end accessor
    this.setBrainNumber = function(amount) {
        brainNumber = amount;
    }// end mutator
    this.getBrainNumber = function() {
        return brainNumber;
    }// end accessor    
    this.setFoodNumber = function(amount) {
        foodNumber = amount;
    }// end mutator 
    this.getFoodNumber = function() {
        return foodNumber;
    }// end accessor    

	this.loseLife = function() {
		lifePoints --;
		changeCharacterLives();
	}// end loseLife
    function changeCharacterLives() {
		var canvas = document.getElementById("characterLives");
	    var context = canvas.getContext('2d');
	    var imageObj = new Image();
	    context.clearRect(0,0,canvas.width,canvas.height);
	    imageObj.src = "images/heart.png";
	    imageObj.onload = function() {
	        for(var i=0; i<lifePoints; i++)
	            context.drawImage(imageObj, 20*i, 0);
	    };
	}// end changeCharacterLives
	
	this.death = function() {
	    // when character is dead
	    $(".battle").css("visibility", "hidden");
	    $(".gameOver").css("visibility", "visible");
	    $("#loseToMenu").click(function(){
	                $(".gameOver").css("visibility", "hidden");
	                $(".menu").css("visibility", "visible");
	    });
	}// end death
}// end Constructor
var character = new Character();

/**
 * The question generator object
 */
function QuestionGenerator() {
	var answer=-1; // answer of the question generated
	var question=""; // the question generated
	var numbersUsed = new Array(); // an array of numbers that are to be used in generating the question
	var remainder = -1; // in the harder case of divisions, this variable is used to record the calculated remainder 
	
	/**
	 * allows access to the question generated
	 * @return the current question stored in the generator
	 */
	this.getQuestion = function() {
		return question;
	};// end accessor
	/**
	 * allows access to the answer corresponding to the question
	 * @return the corresponding answer to the curent question
	 */
	this.getAnswer = function() {
		return answer;
	};// end accessor	
	/**
	 * allows access to the remainder corresponding to the division
	 * @return the corresponding remainder to the curent question
	 */
	this.getRemainder = function() {
		return remainder;
	};// end accessor		
	/**
	 * creates a question according to the specifications in the parameters
	 * @param {number} type an integer, ranging from 1 to 5, that indicates the type of the question: 
	 * "1" creates addition; "2" creates subtraction; "3" creates multiplicaction; 
	 * "4" creates division; case "5" is a mix of the above; when the parameter type matches none 
	 * of the above, a default "1+1" question is created
	 * @param {boolean} isEasy determines whether or not the question should be easy relative
	 * to "hard," which is related to the stage level the user is at
	 */
	this.createQuestion = function(type, isEasy) {
		switch(type) {
			case 1: // case of "+"
                createAddition(isEasy);
				break;
			case 2: // case of "-"
		        createSubtraction(isEasy);
				break;
			case 3: // case of "*"
	            createMultiplication(isEasy);
				break;
			case 4: // case of "/"
	            createDivision(isEasy);
				break;	
			case 5: // case of a mix
			    numbersUsed[0]=Math.floor(Math.random()*4);
			    if(numbersUsed[0]==0)
			        createAddition(isEasy);
			    else if(numbersUsed[0]==1)
			    	createSubtraction(isEasy);
			    else if(numbersUsed[0]==2)
			    	createMultiplication(isEasy);
			    else // ==3
			    	createDivision(isEasy);// an equal chance for any type
			    break;	
			default:
				question = "1 + 1 = ?";
				answer = 2;// a default 1 + 1 question
		}// end switch case
	};// end createQuestion
	
	/**
	* generates a random 1-digit number including zero
	* @return the number generated
	*/
	function makeOnes() {
	    return Math.floor(Math.random()*10);
	}// end makeOnes
    /**
	* generates a random 2-digit number or zero
	* @return the number generated
	*/
	function makeTens() {
	    return Math.floor(Math.random()*100);
	}// end makeTens
	/**
	* generates a random 3-digit number or zero
	* @return the number generated
	*/
	function makeHundreds() {
	    return Math.floor(Math.random()*1000);
	}// end makeHundreds
	/**
	* generates a random 4-digit number or zero
	* @return the number generated
	*/
	function makeThousands() {
	    return Math.floor(Math.random()*10000);
	}// end makeThousands
	
	/**
	 * creates a Math question with addition operation(s)
     * @param {boolean} isEasy the question should be easy or not
	 */
	function createAddition(isEasy) {
		switch(isEasy) {
			case true:
				if(Math.round(Math.random())===0) {
					numbersUsed[0] = makeOnes();// a combination of ones and tens
					numbersUsed[1] = makeTens();
				}
				else {
					numbersUsed[0] = makeTens();// both numbers are tens
					numbersUsed[1] = makeTens()+makeOnes();							
				}// end if-else
				question = numbersUsed[1] + " + " + numbersUsed[0] + " = ?";
				answer = numbersUsed[0] + numbersUsed[1];// add the numbers together
				break;
			case false:
			    numbersUsed[0] = Math.floor(Math.random()*4);
				if(numbersUsed[0]===0||numbersUsed[0]===1) {
					numbersUsed[0] = makeTens()+makeOnes();// a combination of hundreds and tens
					numbersUsed[1] = makeHundreds()+makeTens()+makeOnes();
					numbersUsed[2] = 0;
					question = numbersUsed[1] + " + " + numbersUsed[0] + " = ?";
				}
				else if(numbersUsed[0]===2) {
					numbersUsed[0] = makeHundreds()+makeTens()+makeOnes();// a combination of hundreds and thousands (digits)
					numbersUsed[1] = makeThousands()+makeHunreds()+makeTens()+makeOnes();
					numbersUsed[2] = 0;
					question = numbersUsed[1] + " + " + numbersUsed[0] + " = ?";							
				}
				else {
					numbersUsed[0] = makeTens()+makeOnes();// a combination of 3 tens
					numbersUsed[1] = makeTens();
					numbersUsed[2] = makeTens()+makeOnes();
					question = numbersUsed[2] + " + " + numbersUsed[1] + " + " + numbersUsed[0] + " = ?";	
				}// end if-else
				answer = numbersUsed[0] + numbersUsed[1] + numbersUsed[2];					    
				break;
			default:
			    question = "1 + 1 = ?";
			    answer = 2;// a default 1 + 1 question					
		}// end switch case
	}// end createAddition
	
	/**
	 * creates a Math question with minus operation only
     * @param {boolean} isEasy the question should be easy or not
	 */
	function createSubtraction(isEasy) {
		switch(isEasy) {
			case true:
				if(Math.round(Math.random())===0) {
					numbersUsed[0] = makeTens()+makeOnes();// a tens subtracted by ones
					numbersUsed[1] = makeTens()+makeOnes(); 
				}
				else {
					numbersUsed[0] = (makeTens()+makeOnes())*10+makeOnes();// an expanded version of the above (with an extra 0)
					numbersUsed[1] = makeTens()*10+makeOnes()*10;							
				}// end if-else						
				break;
			case false:
				if(Math.round(Math.random())===0) {
					numbersUsed[0] = makeThousands()+makeHundreds()+makeTens();// more digits
					numbersUsed[1] = makeThousands()*(Math.round(Math.random()))+makeHundreds()+makeTens();// either in the thousands or in the hundreds
				}
				else {
					numbersUsed[0] = (makeThousands()+makeHundreds()+makeTens())*10;// more digits
					numbersUsed[1] = (makeThousands()*(Math.round(Math.random()))+makeHundreds()+makeTens())*10;// either in the thousands or in the hundreds				
				}// end if-else			
				break;
			default:
			    question = "1 - 1 = ?";
			    answer = 0;// a default 1 - 1 question					
		}// end switch case	
		answer = numbersUsed[0] - numbersUsed[1];// subtract the numbers 				
		if(answer<0) {
			answer*=-1; //invert the two numbers
			numbersUsed[2]=numbersUsed[0];
			numbersUsed[0]=numbersUsed[1];
			numbersUsed[1]=numbersUsed[2];
		}// end if
		question = numbersUsed[0] + " - " + numbersUsed[1] + " = ?";	
	}// end createSubtraction

	/**
	 * creates a Math question with multimply operations only
     * @param {boolean} isEasy the question should be easy or not
	 */	
	function createMultiplication(isEasy) {
		switch(isEasy) {
			case true:
				if(Math.round(Math.random())===0) {
					numbersUsed[0] = makeOnes();// simple multiplication facts
					numbersUsed[1] = makeOnes();
				}
				else {
					numbersUsed[0] = makeOnes()*10;// an expanded version of the above (with 2 extra zeros)
					numbersUsed[1] = makeOnes()*10;							
				}// end if-else	
				answer = numbersUsed[0] * numbersUsed[1];// subtract the numbers 	
		        question = numbersUsed[0] + " * " + numbersUsed[1] + " = ?";								
				break;
			case false:
				if(Math.round(Math.random())===0) {
					numbersUsed[0] = makeTens()+makeOnes();// 2 digits
					numbersUsed[1] = makeTens()+makeOnes();
					numbersUsed[2] = 1;
		            question = numbersUsed[0] + " * " + numbersUsed[1] + " = ?";					
				}
				else {
					numbersUsed[0] = makeOnes();// 3 numbers multiplied
					numbersUsed[1] = makeOnes();
					numbersUsed[2] = makeOnes();	
				    question = numbersUsed[0] + " * " + numbersUsed[1] + " * " + numbersUsed[2] + " = ?";						
				}// end if-else	
				answer = numbersUsed[0] * numbersUsed[1] * numbersUsed[2];// subtract the numbers 				
				break;
			default:
			    question = "1 * 1 = ?";
			    answer = 1;// a default 1 * 1 question					
		}// end switch case				
	}// end createMultiplication

	/**
	 * creates a Math question with divide operation only
     * @param {boolean} isEasy the question should be easy or not
	 */	
	function createDivision(isEasy) {
		switch(isEasy) {
			case true:
			    do {
			        numbersUsed[0]=makeOnes();
			    } while(numbersUsed[0]===0);// checks for zero divisors
			    numbersUsed[1]=numbersUsed[0]*makeOnes();// to ensure that it will be divisible
			    if(Math.floor(Math.random()*4)<1) {
			    	numbersUsed[2]=Math.floor(Math.random()*3)+1;// {1, 2, 3}
			    	numbersUsed[1]=numbersUsed[1]*Math.pow(10, numbersUsed[2]);
			    	numbersUsed[0]=Math.pow(10, numbersUsed[2]);// create some large numbers that end with zeros
			    }// end if
			    question = numbersUsed[1] + " / " + numbersUsed[0] + " = ?"; // always tens divided by ones
				break;
			case false:
			    do {
			        numbersUsed[0]=makeTens()+makeOnes();
			    } while(numbersUsed[0]===0);// checks for zero divisors
			    numbersUsed[1]=makeHundreds()+makeTens()+makeOnes();// unlike the easy ones, this one is completely random
			    question = numbersUsed[1] + " / " + numbersUsed[0] + " = ? , remainder = ?"; // asks for the remainder	
				break;
			default:
			    question = "1 / 1 = ?";
			    numbersUsed[1] = 1;
			    numbersUsed[0] = 1;// a default 1 / 1 question					
		}// end switch case			
	    answer=Math.floor(numbersUsed[1]/numbersUsed[0]);
	    remainder=numbersUsed[1]%numbersUsed[0];				
	}// end createDivision
	
}// end constructor
var questionGenerator = new QuestionGenerator();






