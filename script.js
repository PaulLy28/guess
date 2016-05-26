function SecretCode(){
    var random_num = Math.floor((Math.random() * 10) + 1),
        self = this,
        mushrooms = 3;

    this.secretNum = function() {
        return random_num;
    };

    this.guessNum = function(num) {
        if (mushrooms === 1 && num !== random_num) {
            console.log("loser");
            $("#lives img:first-child").remove();
        }
        else if (num == random_num) {
            $("#response").text("winner");
            /*self.resetGame();*/
            return "Win";
        }
        else if (num > random_num) {
            //return "lower";
            $("#response").text("lower");
            $("#lives img:first-child").remove();
            mushrooms--;
            console.log("mushrooms remaining", mushrooms);

        }
        else if (num < random_num) {
            //return "higher";
            $("#response").text("higher");
            $("#lives img:first-child").remove();
            mushrooms--;
            console.log("mushrooms remaining", mushrooms);
        }

    };

    //dom creation
    this.domObjects = function() {
        var input = $("<input>", {
            type: "number",
            id: "guess_num"
        });

        var button = $("<input>", {
            type: "button",
            id: "guess_btn",
            value: "Guess"
        });

        var reset = $("<input>", {
            type: "button",
            id: "reset_btn",
            value: "Reset"
        });

        var answer = $("<div>", {
            id: "response",
            text: "Make a Guess "
        });

        var life = $("<div>", {
            id: "lives",
            html:
            "<img src='http://www.mariowiki.com/images/thumb/2/20/NSMBU-1_Up_Mushroom.png/120px-NSMBU-1_Up_Mushroom.png' id='life1'>" +
            "<img src='http://www.mariowiki.com/images/thumb/2/20/NSMBU-1_Up_Mushroom.png/120px-NSMBU-1_Up_Mushroom.png' id='life2'>" +
            "<img src='http://www.mariowiki.com/images/thumb/2/20/NSMBU-1_Up_Mushroom.png/120px-NSMBU-1_Up_Mushroom.png' id='life3'>"
        });

        $("div").append(input, button, reset, answer, life);

        $("#guess_btn").click(function(){
            //console log below used for testing
            console.log("secret num: " + self.secretNum());
            self.guessButton();
        });

        $("#reset_btn").click(function(){
            self.resetGame();
        });
    };

    this.resetGame = function() {
        random_num = Math.floor((Math.random() * 10) + 1);
        mushrooms = 3;
        $('.game_area').html("");
        self.domObjects();
    };

    this.guessButton = function() {
        var num = $("#guess_num").val();
        if ("Win" === self.guessNum(num)){
            $("#guess_num").val("");
        }

    };

/*    this.resetButton = function() {
        console.log("reset clicked");
        self.resetGame();
        self.domObjects();
    };*/

}

$(document).ready(function(){

    //calls the function and dom creation
    var secret = new SecretCode();
    secret.domObjects();

/*    $("#guess_btn").click(function(){
        //console log below used for testing
        console.log("secret num: " + secret.secretNum());
        secret.guessButton();
    });

    $("#reset_btn").click(function(){
         secret.resetButton();
    });*/


});
