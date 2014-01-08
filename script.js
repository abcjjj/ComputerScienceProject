/**
 * JavaScript for Math Monsters
 * @author: Xu, John and Jordan Larock
 * @since: Wednesday, October 30, 2013
 */

/**
 * This object directs what questions the question generator object will generate
 */
function TypeControl() {
	// the stages
	var isEasy = false;
	var isMedium = false;
	var isHard = false;
	var isCrzay = false;// describes the difficulty of the current stage
	
	// the operation of the question
	var operation = -1;
	const ADD = 1;// constants matching the types of operations in the generator
	const SUBTRACT = 2;
	const MULTIPLY = 3;
	const DIVIDE = 4;
	const MIX = 5;
	
	//accessor mutator functions; they allow access to the type of the current hub, or corresponding question
	this.setIsEasy = function(e) {
		isEasy = e;
	};// end mutator
	this.getIsEasy = function() {
		return isEasy;
	};// end accessor
	this.setIsMedium = function(m) {
		isMedium = m;
	};// end mutator
	this.getIsMedium = function() {
		return isMedium;
	};// end accessor	
	this.setIsHard = function(h) {
		isHard = h;
	};// end mutator
	this.getIsHard = function() {
		return isHard;
	};// end accessor	
	this.setIsCrazy = function(c) {
		isCrazy = c;
	};// end mutator
	this.getIsCrazy = function() {
		return isCrazy;
	};// end accessor	
	
	//operation accessor and mutator
	/**
	 * switches the current operation by converting the string
	 * of the type to the corresponding constant 
	 * @param o the string that indicates the type
	 */
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
	};// end mutator
	/**
	 * returns the current operation
	 * @return the consant of the operation that matches the types
	 * in the question genertator
	 */
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
	};// end accessor	
		
}// end constructor
//initialize the type control
var typeControl = new TypeControl();

/**
 * This object keeps tract of what stages are unlocked
 */
function StageControl() {
	var isMediumUnlocked = false;// these properties indicate what stages are unlocked by the user,
	var isHardUnlocked = false;// which they can access
	var isCrazyUnlocked = false;
	var bossAppear = -1;// this variable triggers the boss by counting how many monsters are defeated
	const MONSTER_TO_BEAT = 5;// this constant represents how many monsters the user needs to defeat to encounter the next boss
	
	/**
	 * mutator and accessor functions for checking which stages are unlocked
	 * @param whether or not the stage is unlocked
	 * @return if the stage is unlocked or not 
	 */
	this.setIsCrazyUnlocked = function(c) {
		isCrazyUnlocked = c;
		if(isCrazyUnlocked)// for the mutators, the functions also seek to lock or unlock the stage, according to the parameter
			unlockCrazy();
		else// is not unlocked
			$("#stage4").prop("disabled", true);	
	};// end mutator
	this.getIsCrazyUnlocked = function() {
		return isCrazyUnlocked;
	};// end accessor	
	this.setIsHardUnlocked = function(h) {
		isHardUnlocked = h;
		if(isHardUnlocked)
			unlockHard();
		else// is not unlocked
			$("#stage3").prop("disabled", true);	
	};// end mutator
	this.getIsHardUnlocked = function() {
		return isHardUnlocked;
	};// end accessor	
	this.setIsMediumUnlocked = function(m) {
		isMediumUnlocked = m;
		if(isMediumUnlocked)
			unlockMedium();
		else// is not unlocked
			$("#stage2").prop("disabled", true);	
	};// end mutator
	this.getIsMediumUnlocked = function() {
		return isMediumUnlocked;
	};// end accessor		
	this.setBossAppear = function(b) {
		bossAppear = b;
	};// end mutator
	this.getBossAppear = function() {
		return bossAppear;
	};// end accessor				
	
	this.setBoss = function() {
		if(isCharacterReady()&&isCurrentStage()) {
			monster.setType("boss");// force the monster type into boss
			monster.setTotalLP(monster.getTotalLP()*5);// 5 times the life points
			monster.setMoneyGive(monster.getMoneyGive()*5);// 5 times the reward
			alert("Behold, the boss of this stage!");
			typeControl.setOperation("boss");// which is the default mix
		}
	};// end setBoss
	/**
	 * determines whether if the user is in currently most difficult hub, which
	 * is necessary for the boss to appear
	 * @return if the user is challanging the hardest stage 
	 */
	function isCurrentStage() {
		if(isMediumUnlocked==false)
			return true;// the user can only challange the easy stage
		else if(isHardUnlocked==false)
			return typeControl.getIsMedium();// medium comes before hard
		else if(isCrazyUnlocked==false)
			return typeControl.getIsHard();// hard comes before crazy
		else // default
			return true; // when the user has completed the stages, the boss can randomly appear
	}
	/**
	* determines whether if the boss is to appear 
	* @return if the boss is to appear or not
	*/
	function isCharacterReady() {
		if(bossAppear==MONSTER_TO_BEAT)// this happens when the user beats 50 monsters after starting the game or completing a stage
			return true;
		return false;
	}// end setBoss
	
	/**
	 * carry out tasks when the stage is cleared: the user is directed to the stage selection screen,
	 * and is informed of clearing the stage 
	 */
	this.clearStage = function() {
		if(monster.getType()==="boss") { 
		// checks if the monster defeated was a boss	
			alert("Wow, you've defeated the boss!");
			$(".hub").css("visibility", "hidden");// directs back
			$(".stageSelection").css("visibility", "visible");
			alert("You can now proceed to the next stage!");
			unlockNextStage();
		}
	};// end clearStage
	/**
	 * allows the user to access the next stages after beating the boss;
	 * this function is called in the clearStage function 
	 */
	function unlockNextStage() {
		bossAppear=0;// reset counter
		if(isMediumUnlocked==false) {
			isMediumUnlocked=true;
			unlockMedium();
		}
		else if(isHardUnlocked==false) {
			isHardUnlocked=true;
			unlockHard();
		}
		else if(isCrazyUnlocked==false) {
			isCrazyUnlocked=true;
			unlockCrazy();
		}
		else 
			alert("Actually, you've unlocked all 4 stages!\nNow your goal should be set for the key.");
	}// end unlockNextStage
	
	/**
	 * these functions allow the user to select the next stages and remove the lock images
	 */
	function unlockMedium() {
		$("#stage2").prop("disabled", false);
		$("#lock2").removeClass("stageSelection");	
		$("#lock2").css("visibility", "hidden");	
	}// end unlockMedium
	function unlockHard() {
		$("#stage3").prop("disabled", false);
		$("#lock3").removeClass("stageSelection");
		$("#lock3").css("visibility", "hidden");
	}// end unlockHard
	function unlockCrazy() {
		$("#stage4").prop("disabled", false);
		$("#lock4").removeClass("stageSelection");	
		$("#lock4").css("visibility", "hidden");	
	}// end unlockCrazy	
	
}// end constructor
// initialize the stage control
var stageControl = new StageControl();

// action events
$(function(){
	// a sound effect for all buttons
	$("button").click(function() {
		document.getElementById("buttonSound").play();			
    });
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

    $("#loadGame").click(function() {
            // $(".savedgames").css("visibility", "visible");
            // $(".menu").css("visibility", "hidden");
            if(confirm("The last gane would be loaded"))
            	readGame();
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
    	if($("#femaleRadio").is(':checked')||$("#maleRadio").is(':checked')) {
        	$(".customization").css("visibility", "hidden");
            $(".stageSelection").css("visibility", "visible");
            if($("#femaleRadio").is(':checked')) {
            	character.setGender("female");
            	setFemaleImage();
            }
            if($("#maleRadio").is(':checked'))
            	character.setGender("male");       
            character.setLifePoints(5);// every relevant variable is reinitialized manually
            character.clearCharacterLPCanvas();
            character.setMoney(500);
            character.setClockNumber(0);
            character.setBrainNumber(0);
            character.setShieldUpgrade(0);
            character.setWeaponUpgrade(0);
            stageControl.setIsMediumUnlocked(false);
            stageControl.setIsHardUnlocked(false);
            stageControl.setIsCrazyUnlocked(false);
            stageControl.setBossAppear(0);
            shield.setShieldPrice(500);
            weapon.setWeaponPrice(500);
    	}
    	else 
    		alert("What is your gender???");
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
            monster.setType("snail");
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
            monster.setType("snake");
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
            monster.setType("heugh");
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
            monster.setType("jack");
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
    		monster.setType("robot");
            typeControl.setOperation("mix");               
    });        
    $("#travelAddition, #travelSubtraction, #travelMultiplication, #travelDivision, #travelCombined").click(function() {    
            if(typeControl.getIsEasy()||typeControl.getIsHard())
            	timer.setTotalTime(30);
            else // medium or crazy stage
            	timer.setTotalTime(15);
            stageControl.setBoss();
            $(".hub").css("visibility", "hidden");
            $(".battle").css("visibility", "visible"); 		
            startBattle();		
    		monster.setLifePointsMonster(monster.getTotalLP());                 
    });  
          
    $("#hubToStage").click(function() {
            $(".hub").css("visibility", "hidden");
            $(".stageSelection").css("visibility", "visible");
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
            if(character.money>=10000) {
            	if(confirm("Escape from the cave!")) {
               		character.setMoney(character.getMoney()-=10000);
                    $(".shop").css("visibility", "hidden");
                    $(".won").css("visibility", "visible");
            	}
            }
            else
            	alert("You don't have enough money!");
    });  
		
    $("#buyHeart").click(function() {
		heart.heartBuy();
		$("#showMoney").text("Money: $" + character.getMoney());
    });
    $("#buyFist").click(function() {
		weapon.weaponBuy();
		$("#showMoney").text("Money: $" + character.getMoney());
		$("#buyFist").text("Upgrade: " + weapon.getWeaponPrice() + "$");// the price changes
    });           
    $("#buyClock").click(function() {        	
		clock.clockBuy();
		$("#showMoney").text("Money: $" + character.getMoney());
    }); 
    $("#buyShield").click(function() {
		shield.shieldBuy();
		$("#showMoney").text("Money: $" + character.getMoney());
		$("#buyShield").text("Upgrade: " + shield.getShieldPrice() + "$");// the price changes
    }); 
    $("#buyBrain").click(function() {
		brain.brainBuy();
		$("#showMoney").text("Money: $" + character.getMoney());
    });         
    
    $("#saveButton").click(function() {
		if(confirm("Do you wish the save your current progress?"))
			saveGame();
    });    
    
    $("#submitAnswer").click(function() {
    	clearInterval(timeInterval);
        if(checkAnswer()) { 
			alert("Correct: You hit the monster!");
			monster.loseLifeMonster();
			if(weapon.isCritical()) {
				alert("And that was a critical hit!");
				monster.loseLifeMonster();
			}
			if(monster.getLifePointsMonster()<=0) { // checks if the monster is dead
				alert("You defeated the monster!\n You earned $" + monster.getMoneyGive());
				character.setMoney(character.getMoney()+monster.getMoneyGive());
				$(".battle").css("visibility", "hidden");
				$(".ASDF").css("visibility", "hidden");
                $(".hub").css("visibility", "visible");
                stageControl.setBossAppear(stageControl.getBossAppear()+1);
                stageControl.clearStage();
                monster.resetMonsterType();  
                removeContent();                  
			}
			else
				startBattle();
        }
        else {
        	alert("Wrong answer: The monster hits you!");
        	if(shield.isEvaded() == false){	     
        		character.loseLife();       	
        		if(character.getLifePoints()<=0) { // check if the character is dead
            		alert("Oh no! You are defeated by the monster!");
            		character.death();
            		removeContent(); 
            	}
            	else
            		startBattle();
            }
            else {
            	alert("But you evaded the hit!");
            }// end if-else
        }// end if-else
    });
    $("#item1").click(function() {
		clock.clockUse();
		clock.showClockNumber();
    });
    $("#item2").click(function() {
		brain.brainUse();
		brain.showBrainNumber();
    });            

	$(window).keydown(function(event){
	    if(event.keyCode == 13) {
	      event.preventDefault();
	      return false;
	    }
	});   // this prevents the user from pressing enter, which will relaod the screen                     
	  
});// end document ready

/**
 * this function stores the current process of the game locally
 */
function saveGame() {
	localStorage.isMediumUnlocked = stageControl.getIsMediumUnlocked();
	localStorage.isHardUnlocked = stageControl.getIsHardUnlocked();
	localStorage.isCrazyUnlocked = stageControl.getIsCrazyUnlocked();	
	localStorage.bossAppear = stageControl.getBossAppear();	
	localStorage.money = character.getMoney();
	localStorage.gender = character.getGender();
	localStorage.lifePoints = character.getLifePoints();
	localStorage.weaponUpgrade = character.getWeaponUpgrade();
	localStorage.shieldUpgrade = character.getShieldUpgrade();
	localStorage.brainNumber = character.getBrainNumber();
	localStorage.clockNumber = character.getClockNumber();
	localStorage.weaponPrice = weapon.getWeaponPrice();
	localStorage.shieldPrice = shield.getShieldPrice();
	alert(localStorage.isCrazyUnlocked);
}// end saveGame
/**
 * this function loads the saved process of the game
 */
function readGame() {
	if(localStorage.isMediumUnlocked==="true")
		stageControl.setIsMediumUnlocked(true);
	else
		stageControl.setIsMediumUnlocked(false);
	if(localStorage.isHardUnlocked==="true")
		stageControl.setIsHardUnlocked(true);
	else
		stageControl.setIsHardUnlocked(false);
	if(localStorage.isCrazyUnlocked==="true")
		alert(stageControl.getIsCrazyUnlocked());
	else
		stageControl.setIsCrazyUnlocked(false);		
	stageControl.setBossAppear(localStorage.bossAppear);	
	character.setMoney(localStorage.money);
	character.setGender(localStorage.gender);
	character.setLifePoints(localStorage.lifePoints);
	character.clearCharacterLPCanvas();	
	character.setWeaponUpgrade(localStorage.weaponUpgrade);
	character.setShieldUpgrade(localStorage.shieldUpgrade);
	character.setBrainNumber(localStorage.brainNumber);
	character.setClockNumber(localStorage.clockNumber);
	weapon.setWeaponPrice(localStorage.weaponPrice);
	shield.setShieldPrice(localStorage.shieldPrice);	
	
	//redirects the user to the stage selection screen
	$(".menu").css("visibility", "hidden");
	$(".stageSelection").css("visibility", "visible");
	setFemaleImage();
	
}// end readGame
/**
 * removes the contents of the canvas when they are not supposed to show up
 */
function removeContent() {
	character.clearCharacterLPCanvas();
	monster.clearMonsterLPCanvas();
}// end removeContent
/**
 * moves the girl character to the left of the screen 
 */
function setFemaleImage() {
	$("#girlSprite").css("left", 50);
}// end setFemaleImage
/**
 * sets up the scene for a battle
 */
function startBattle() {
	// setting usable items
	clock.showClockNumber();
	brain.showBrainNumber();
	// setting HTML elements around the centre of the screen
	character.setImage();	
	monster.setImageMonster();
    questionGenerator.createQuestion(typeControl.getOperation(), typeControl.getIsEasy()||typeControl.getIsMedium());
    // starting timer
    $("#question").text(questionGenerator.getQuestion());                  
	$("#timer").text("Time remaining: " + timer.getTotalTime()); // reset timing
	timer.setCurrentTime(timer.getTotalTime());
	timer.countDown();
}// end startBattle
/**
 * checks whether if the answer from the user is right
 * @return whether if the answer is correct
 */
function checkAnswer() {
	var temp = $("#userAnswer").val();
	if(typeControl.getIsHard()||typeControl.getIsCrazy()) {
		if(typeControl.getOperation()==4)// check for remainders in the more difficult divisions
			return temp.substring(0, temp.indexOf(' ')) == questionGenerator.getAnswer() && 
			temp.substring(temp.indexOf(' ')) == questionGenerator.getRemainder() ;// the quotient and the remainder are separated by a space
	}
	return temp == questionGenerator.getAnswer();
}// end checkAnswer

var timeInterval = -1;// an interval object that can be cleared by the timer object
/**
 * The timer object
 */
function Timer() {
	currentTime=-1;
	totalTime=-1;
	
	this.countDown = function() {
	    timeInterval=setInterval(function(){
	    	if(this.currentTime!==0) {
		    	currentTime--;
		    	$("#timer").text("Time remaining: " + currentTime);
	    	}
	    	else {// currentTime == 0
	    		clearInterval(timeInterval);
	    		alert("Time Up! The monster hits you!");
	    		character.loseLife();
	    		startBattle();
    		    if(character.getLifePoints()<=0) {
            		alert("Oh no! You are defeated by the monster!");
            		character.death();
            		removeContent(); 
            	}
	    	}// end if-else	    	
	    },1000);
    };// end countDown
    this.getTotalTime = function() {
    	return totalTime;
    };// end accessor
    this.setTotalTime = function(time) {
    	totalTime = time;
    };// end mutator
    this.getCurrentTime = function() {
    	return currentTime;
    };// end accessor
    this.setCurrentTime = function(t) {
    	currentTime = t;
    };// end mutator
}// end constructor
// initialize timer
var timer = new Timer();

function Monster() {
    type = "";// 6 types: snake, snail, heugh, 'jack'(chimaera), robot, and boss
    totalLP = -1;// LP = life points
    lifePointsMonster = -1;
    moneyGive = -1;
    
    this.setType = function(t) {
        type = t;
    };// end mutator
    this.getType = function() {
        return type;
    };// end accessor    
    this.setTotalLP = function(tLP) {
        totalLP = tLP;
    };// end mutator
    this.getTotalLP = function() {
        return totalLP;
    };// end accessor        
    this.setLifePointsMonster = function(points) {
        lifePointsMonster = points;
        changeMonsterLives();
    };// end mutator
    this.getLifePointsMonster = function() {
        return lifePointsMonster;
    };// end accessor       
	this.setMoneyGive = function(m) {
		moneyGive = m;
	};// end mutator
	this.getMoneyGive = function() {
		return moneyGive;
	};// end accessor
    
    this.loseLifeMonster = function(){
    	lifePointsMonster --;
		changeMonsterLives();
    };// end loseLife
    
    this.setImageMonster = function() {
    	switch(type) {
    		case "snail":
    			$("#monsterA").css("visibility", "visible");
    			break;
    		case "snake":
    			$("#monsterC").css("visibility", "visible");
    			break;
    		case "heugh":
    			$("#monsterB").css("visibility", "visible");
    			break;
    		case "jack":
    			$("#monsterE").css("visibility", "visible");
    			break;
    		case "robot":
    			$("#monsterD").css("visibility", "visible");
    			break;
    		case "boss":
    			$("#monsterF").css("visibility", "visible");
    			break;
    		default:
    			$("#monster").css("visibility", "visible");// <- the original doge
    		changeMonsterLives();
    	}// end switch case
    	
    };// end setImage
    
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
    this.clearMonsterLPCanvas = function() {
    	var canvas = document.getElementById("monsterLives");
    	var context = canvas.getContext('2d');
    	context.clearRect(0,0,canvas.width,canvas.height);	
    };// end clearMonsterLPCanvas
    
	/**
	 * resets the monster type after a forced conversion into robot or boss 
	 */
	this.resetMonsterType = function() {
		if(typeControl.getIsEasy())
			type = "snail";
		if(typeControl.getIsMedium())
			type = "snake";
		if(typeControl.getIsHard())
			type = "heugh";
		if(typeControl.getIsCrazy())
			type = "jack";						
	};// end resetMonsterType
	
}// end createMonster
// initialize monster
var monster = new Monster();

/**
 * the character that the user controls
 */
function Character() {
    // customization attributes
    isMale = false;

    // battle attributes
    money = -1;
    lifePoints = -1;
    weaponUpgrade = -1;
    shieldUpgrade = -1;
    clockNumber = -1;
    brainNumber = -1;
    
    // customization attributes
    this.setGender = function(gender) {
        if(gender==="male")
            isMale = true;
        else // is not male -> female
            isMale = false;
    };// end mutator
    this.getGender = function() {
        if(isMale)
            return "male";
        else // is not male -> female
            return "female";
    };// end accessor
    this.setImage = function() {   	
    	if(isMale)
    		$("#girlSprite").css("visibility", "hidden");// hide girl for boy, and vice versa
    	else// is female
    		$("#boySprite").css("visibility", "hidden");
    	changeCharacterLives();
    };// end setImage   
    
    // battle-related functions
    this.setMoney = function(m) {
        money = m;
    };// end mutator
    this.getMoney = function() {
        return money;
    };// end accessor
    this.setLifePoints = function(lp) {
        lifePoints = lp;
        changeCharacterLives();
    };// end mutator
    this.getLifePoints = function() {
        return lifePoints;
    };// end accessor    
    this.setWeaponUpgrade = function(level) {
        weaponUpgrade = level;
    };// end mutator
   this.getWeaponUpgrade = function() {
        return weaponUpgrade;
    };// end accessor    
    this.setShieldUpgrade = function(level) {
        shieldUpgrade = level;
    };// end mutator
   this.getShieldUpgrade = function() {
        return shieldUpgrade;
    };// end accessor    
    this.setClockNumber = function(amount) {
        clockNumber = amount;
    };// end mutator
    this.getClockNumber = function() {
        return clockNumber;
    };// end accessor
    this.setBrainNumber = function(amount) {
        brainNumber = amount;
    };// end mutator
    this.getBrainNumber = function() {
        return brainNumber;
    };// end accessor 
	
	this.loseLife = function() {
		lifePoints --;
		changeCharacterLives();
	};// end loseLife
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
    this.clearCharacterLPCanvas = function() {
    	var canvas = document.getElementById("characterLives");
    	var context = canvas.getContext('2d');
    	context.clearRect(0,0,canvas.width,canvas.height);	
    };// end clearMonsterLPCanvas
	
	this.death = function() {
	    // when character is dead
	    $(".ASDF").css("visibility", "hidden");
	    $(".battle").css("visibility", "hidden");
	    $(".gameOver").css("visibility", "visible");
	    $("#loseToMenu").click(function(){
	                $(".gameOver").css("visibility", "hidden");
	                $(".menu").css("visibility", "visible");
	    });
	};// end death
}// end Constructor
// initialize character
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
					numbersUsed[1] = makeThousands()+makeHundreds()+makeTens()+makeOnes();
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
// initialize question generator
var questionGenerator = new QuestionGenerator();

//shop items
/**
 *	The clock item that is sold in the shop: when it is used in battle,
 *  it gives the user 10 extra seconds to answer the question 
 */
function Clock() {
	const CLOCK_PRICE = 25;
	/**
	 * used in the battle screen;
	 * adjusts the timer so that there are 10 extra seconds
	 */
	this.clockUse = function() {
		if(character.getClockNumber()>0) {
			clearInterval(timeInterval);
			var temp = character.getClockNumber() - 1;
			character.setClockNumber(temp);// 1 clock comsumed
			temp = timer.getCurrentTime() + 10 + 1;
			timer.setCurrentTime(temp);// give 10 extra seconds
			timer.countDown();
		}
	};// end clockUsed
	this.getClockPrice = function() {
		return CLOCK_PRICE;
	};// end accessor
	/**
	 * triggered when a clock is bought in the shop 
	 */
	this.clockBuy = function() {
		if(character.getMoney()>=CLOCK_PRICE) {
			if(confirm("Are you sure?")) {
				var temp = character.getClockNumber() + 1 ;
				character.setClockNumber(temp);
				temp = character.getMoney() - CLOCK_PRICE;
				character.setMoney(temp);
			}
		}
		else
			alert("You don't have enough money!");// <- could let the shop guy say it instead?
	};// end buyHeart
	/**
	 * displays the remaining amount of clock items in the battle screen 
	 */
	this.showClockNumber = function() {
		$("#item1").text("Clock * " + character.getClockNumber());
	};// end showClockNumber
}// end constructor
// initialize shop item
var clock = new Clock();

/**
 * The heart item that is sold in the shop: when it is bought the user gains an 
 * extra life point
 */
function Heart() {
	const HEART_PRICE = 75;// constant price
	/**
	 * the accessor to the price of the heart
	 * @ return the price of the heart 
	 */
	this.getHeartPrice = function() {
		return HEART_PRICE;
	};// end accessor
	/**
	 * triggered when a heart is bought in the shop; the user gains another life point (chance) in the battle (answering questions)
	 */	
	this.heartBuy = function() {
		if(character.getMoney()>=HEART_PRICE) {
			if(confirm("Are you sure?")) {
				var temp = character.getLifePoints() + 1 ; // add 1 life point
				character.setLifePoints(temp);
				temp = character.getMoney() - HEART_PRICE;
				character.setMoney(temp);
			}
		}
		else
			alert("You don't have enough money!");// <- could let the shop guy say it instead?
	};// end heartBuy
}// end constructor
// initialize shop item
var heart = new Heart();

/**
 * The shield object that is sold in the shop: when it is used in battle, 
 * it gives the character a chance to evade an attack from the monster
 */
function Shield() {
	var shieldPrice = 500;// initial price
	/**
	 * accessor and mutator to the variable price of the shield
	 * @param {number} p the price of the shield
	 * @return the current price of the shield
	 */	
	this.getShieldPrice = function() {
		return shieldPrice;
	};// end accessor
	this.setShieldPrice = function(p) {
	    shieldPrice = p;
	};// end mutator	
	/**
	 * triggered when the shield upgrade is bought in the shop 
	 */
	this.shieldBuy = function() {
		if(character.getMoney()>=shieldPrice) {
			if(confirm("Are you sure?")) {
				var temp = character.getShieldUpgrade() + 1;
				character.setShieldUpgrade(temp);				
				temp = character.getMoney() - shieldPrice;				
				character.setMoney(temp);
				shieldPrice += 500;// the price goes up
			}
		}
		else
			alert("You don't have enough money!");// <- could let the shop guy say it instead?
	};// end shieldBuy
	/**
	 * Determines whether the user evades the monster's attack upon giving a wrong answer 
	 * @return whether the hit was evaded or not
	 */
	this.isEvaded = function() {
		var temp1 = Math.random();
		var temp2 = 0.5-0.5*Math.pow(0.5, character.getShieldUpgrade());
		//alert(temp1 + " < " + temp2);
		if(temp1<temp2)
			return true;// P(s) = 0.5 - 0.5^(s+1), where P represents the probability of an evasion, and s represent the level of the shield upgrade
		else
			return false;
	};// end shield 
}// end constructor
// initialize shop item
var shield = new Shield();

/**
 * The weapon, or fist, that is sold in the shop: when it is used
 * in battle, it gives the character a chance to critical-hit
 * (reducing 2 life points at once) the monster
 */
function Weapon() {
	var weaponPrice = 500;// initial price
	/**
	 * accessor and mutator to the variable price of the weapon
	 * @param {number} p the price of the weapon
	 * @return the current price of the weapon
	 */
	this.getWeaponPrice = function() {
		return weaponPrice;
	};// end accessor
	this.setWeaponPrice = function(p) {
	    weaponPrice = p;
	};// end mutator
	/**
	 * triggered when the weapon is bought 
	 */
	this.weaponBuy = function() {
		if(character.getMoney()>=weaponPrice) {
			if(confirm("Are you sure?")) {
				var temp = character.getWeaponUpgrade() + 1;
				character.setWeaponUpgrade(temp);
				temp = character.getMoney() - weaponPrice;
				character.setMoney(temp);
				weaponPrice += 500; // price goes up
			}
		}
		else
			alert("You don't have enough money!");// <- could let the shop guy say it instead?
	};// end weaponBuy
	/**
	 * Determines whether the user hits the monster with a cirtical hit
	 * @return whether if the hit was cirtical
	 */
	this.isCritical = function() {
		var temp1 = Math.random();
		var temp2 = 0.5-0.5*Math.pow(0.5, character.getWeaponUpgrade());
		if(temp1<temp2)
			return true;// P(s) = 0.5 - 0.5^(s+1), where P represents the probability of a critical hit, and s represent the level of the weapon (fist) upgrade
		else
			return false;
	};// end isCritical
	
}// end constructor
// initialize shop item
var weapon = new Weapon();

/**
 * The brain item that is sold in the shop: when it is used in battle, it
 * will give the user a hint to the current question aksed by the monster (or question generator)
 */
function Brain() {
	const BRAIN_PRICE = 50; // constant price of the brain
	/**
	 * triggered when a brain is bought in the shop 
	 */
	this.brainBuy = function() {
		if(character.getMoney()>=BRAIN_PRICE) {
			if(confirm("Are you sure?")) {
				var temp = character.getBrainNumber() + 1;
				character.setBrainNumber(temp);
				temp = character.getMoney() - BRAIN_PRICE;
				character.setMoney(temp);
			}
		}
		else
			alert("You don't have enough money!");// <- could let the shop guy say it instead?
	};// end brainBuy
	/**
	 * triggered when the user uses a brain in the battle  
	 */
	this.brainUse = function() {
		// has to be greater than nothing
		if(character.getBrainNumber()>0) {
			var temp = character.getBrainNumber() - 1;
			character.setBrainNumber(temp);
			hint();
		}
	};// end brainUse
	/**
	 * gives the user a hint by making the question a multiple-choice one
	 */
	function hint() {
		var temp = questionGenerator.getAnswer();
		var wrongChoice1 = temp + Math.round(Math.random()*10);
		var wrongChoice2 = -1;
		while(wrongChoice2<0)//<- ensures that it would not be negative
			wrongChoice2 = temp - Math.round(Math.random()*10);
		// the following switch case shuffles the order of the choices so that the correct one does not always appear at the same place
		switch(Math.floor(Math.random()*3)) {
			case 0:
				alert("Hint: The answer is either " + temp + " or " + wrongChoice1 + " or " + wrongChoice2);
				break;
			case 1:
				alert("Hint: The answer is either " + wrongChoice1 + " or " + temp + " or " + wrongChoice2);
				break;
			case 2:
				alert("Hint: The answer is either " + wrongChoice2 + " or " + wrongChoice1 + " or " + temp);
				break;
			default:
				alert("Cheat: The answer is " + temp);
		}// end switch case
	}// end hint
	/**
	 * this function changes the text that indicates the brain number in the battle screen 
	 */
	this.showBrainNumber = function() {
		$("#item2").text("Brain * " + character.getBrainNumber());			
	};// end showBrainNumber
}// end constructor
// initialize shop item
var brain = new Brain();

