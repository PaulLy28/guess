function SecretCode(){
    var random_num = Math.floor((Math.random() * 10) + 1),
        self = this,
        mushrooms = 3;

    this.secretNum = function() {
        return random_num;
    };

    this.guessNum = function(num) {
        if (mushrooms == 1 && num != random_num) {
            $("#response").text("Game Over!");
            $("#lives img:first-child").remove();
            $("#mario").css({"left":"70%" , "top":"70%"});
            setTimeout(function(){
            $("#mario").attr("id", "mario_dies");},500);
            $(".bullet").attr("id", "bullet").css("display", "inline");
        }
        else if (num == random_num) {
            $("#response").text("winner");
            return "Win";
        }
        else if (num > random_num) {
            //return "lower";
            mario_drop("lower");
            /*console.log("mushrooms remaining", mushrooms);*/

        }
        else if (num < random_num) {
            //return "higher";
            mario_drop("higher");
            /*console.log("mushrooms remaining", mushrooms);*/
        }

    };
    //mario drop
        //number hint
        //mushroom life removal
        //number of mushroom count
        //mario sprite position
    function mario_drop(text) {
        $("#response").text(text);
        $("#lives img:first-child").remove();
        mushrooms--;
        $("#mario").css({"left":"15%" , "top":"15%"});
        if (mushrooms == 1) {
            $("#mario").css({"left":"35%" , "top":"25%"});
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
        $("#bullet").removeAttr("id","bullet");
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
                text: "Hint"
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
            /*console.log("secret num: " + self.secretNum());*/
            self.guessButton();
        });

        /*reset button click function*/
        $("#reset_btn").click(function(){
            self.resetGame();
        });
    };

}

$(document).ready(function(){

    //calls the function and dom creation
    var secret = new SecretCode();
    secret.domObjects();
});
