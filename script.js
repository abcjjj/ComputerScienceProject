/**
 * 
 */

/**
 * 
 */
function Menu() {
    var startButton;
    var quitButton;
    var title;
    
    function setStartButton() {
        startButton = document.getElementById("start");
    }// end mutator
    
    function getStartButton() {
        return startButton;
    }// end accessor
    
    function setQuitButton() {
        quitButton = document.getElementById("quit");
    }// end mutator
    
    function getQuitButton() {
        return quitButton;
    }// end acessor
    
    function setTitle() {
        title = document.getElementById("title");
    }// end mutator
    
    function getTitle() {
        return title;
    }// end accessor
    
    function quitGame() {
    // needs a BBUI function
    }// end quitGame
    
    function showMenu() {
        document.getElementbyId("menu").style.visibility = "visible";
    }// end showMenu
    
    function hideMenu() {
        document.getElementbyId("menu").style.visibility = "hidden";
    }// end hideMenu
    
    function startGame() {
        this.hideMenu();
        
    }// end startGame
    
}// end Constructor
