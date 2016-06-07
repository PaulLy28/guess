function SecretCode(){
    var random_num = Math.floor((Math.random() * 10) + 1),
        self = this,
        mushrooms = 3;

    this.secretNum = function() {
        return random_num;
    };

    this.guessNum = function(num) {
        if (mushrooms == 1 && num != random_num) {
            $("#response").text("loser");
            $("#lives img:first-child").remove();
            $("#mario").css({"left":"80%" , "top":"60%"});
            setTimeout(function(){
            $("#mario").attr("id", "mario_dies");},500)
        }
        else if (num == random_num) {
            $("#response").text("winner");
            return "Win";
        }
        else if (num > random_num) {
            //return "lower";
            mario_drop("lower");
            /*$("#response").text("lower");
            $("#lives img:first-child").remove();
            mushrooms--;*/
            console.log("mushrooms remaining", mushrooms);

        }
        else if (num < random_num) {
            //return "higher";
            mario_drop("higher");
            /*$("#response").text("higher");
            $("#lives img:first-child").remove();
            mushrooms--;*/
            console.log("mushrooms remaining", mushrooms);
        }

    };

    function mario_drop(text) {
        $("#response").text(text);
        $("#lives img:first-child").remove();
        mushrooms--;
        $("#mario").css({"left":"20%" , "top":"20%"});
        if (mushrooms == 1) {
            $("#mario").css({"left":"60%" , "top":"60%"});
        }
    }
    /*clears input when guess is correct*/
    this.guessButton = function() {
        var num = $("#guess_num").val();
        if (num) {
            if ("Win" == self.guessNum(num)) {
                $("#guess_num").val("");
            }
        }

    };
    /*reset game*/
    this.resetGame = function() {
        random_num = Math.floor((Math.random() * 10) + 1);
        mushrooms = 3;
        $('.game_area').html("");
        self.domObjects();
        $("#mario").css({"left":"5%" , "top":"5%"});
        $("#mario_dies").attr("id", "mario").css({"left":"5%" , "top":"5%"});
    };

    //dom creation
    this.domObjects = function() {
        var input = $("<input>", {
                type: "number",
                id: "guess_num",
                placeholder: "Enter a number"
        }),

            button = $("<input>", {
                type: "button",
                id: "guess_btn",
                value: "Guess"
        }),

            reset = $("<input>", {
                type: "button",
                id: "reset_btn",
                value: "Reset"
        }),

            answer = $("<div>", {
                id: "response",
                text: "Make a Guess "
        }),

            life = $("<div>", {
                id: "lives",
                html:
                "<img src='images/green_mushroom.png'>" +
                "<img src='images/green_mushroom.png'>" +
                "<img src='images/green_mushroom.png'>"
        });

        /*append dom objects*/
        $(".game_area").append(input, button, reset, answer, life);

        /*guess button click function*/
        $("#guess_btn").click(function(){
            //console log below used for testing
            console.log("secret num: " + self.secretNum());
            self.guessButton();
        });

        /*reset button click function*/
        $("#reset_btn").click(function(){
            self.resetGame();
        });
    };

    this.paraMove = function() {
        var background = $("#background1");
        var background_position = background.offset();
        /*console.log(background_position.left);*/
        /*background.css("left", 15 + background_position.left + "px");*/
        requestAnimationFrame(self.paraMove());
    }

}

$(document).ready(function(){

    //calls the function and dom creation
    var secret = new SecretCode();
    secret.domObjects();

    /*secret.paraMove();*/

});
