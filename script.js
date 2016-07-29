function SecretCode(){
    var random_num = Math.floor((Math.random() * 10) + 1),
        self = this,
        mushrooms = 3;

    this.secretNum = function() {
        return random_num;
    };

    this.guessNum = function(num) {
        if (mushrooms == 1 && num != random_num) {
            /*$("#response").text("Game Over!");*/
            $("#response").html("<img src='images/game_over1.png'>");
            $("#game_over").css({"display" : "block"});
            $("#lives img:first-child").remove();
            $("#mario").css({"left":"35%" , "top":"70%"});
            setTimeout(function(){
            $("#mario").attr("id", "mario_dies");},1000);
            $(".bullet").attr("id", "bullet").css("display", "inline");
        }
        else if (num == random_num) {
            /*$("#response").text("winner");*/
            $("#response").html("<img src='images/winner1.png'>");
            $("#game_winning").css({"display": "block"});
            return "Win";
        }
        else if (num > random_num) {
            //return hint "lower";

            /*mario_drop("lower");*/
            mario_drop("<img src='images/lower1.png'>");

            /*console.log("mushrooms remaining", mushrooms);*/

        }
        else if (num < random_num) {
            //return hint "higher";

            /*mario_drop("higher");*/

            mario_drop("<img src='images/higher1.png'>");

            /*console.log("mushrooms remaining", mushrooms);*/
        }

    };
    //mario drop
        //number hint
        //mushroom life removal
        //number of mushroom count
        //mario sprite position
    function mario_drop(image_hint) {
        /*$("#response").text(text); shows text*/
        $("#response").html(image_hint);
        $("#lives img:first-child").remove();
        mushrooms--;
        $("#mario").css({"left":"15%" , "top":"15%"});
        if (mushrooms == 1) {
            $("#mario").css({"left":"25%" , "top":"50%"});
        }
    }
    //clears input when guess is correct
    this.guessButton = function() {
        var num = $("#guess_num").val();
        if (num) {
            if ("Win" == self.guessNum(num)) {
                $("#guess_num").val("");
            }
        }
    };
    //reset game
    this.resetGame = function() {
        random_num = Math.floor((Math.random() * 10) + 1);
        mushrooms = 3;
        $('.game_area').html("");
        self.domObjects();
        $("#mario").css({"left":"5%" , "top":"5%"});
        $("#mario_dies").attr("id", "mario").css({"left":"5%" , "top":"5%"});
        $("#bullet").removeAttr("id","bullet");
        $("#game_winning").css({"display": "none"});
        $("#game_over").css({"display": "none"});
    };

    //dom creation
    this.domObjects = function() {
        var input = $("<input>", {
                type: "text",
                id: "guess_num",
                width: 30,
                height: 20,
                placeholder: " #"
        }),

            button = $("<input>", {
                type: "image",
                id: "guess_btn",
                value: "Guess",
                src: "images/guess_btn.png"
        }),

            reset = $("<input>", {
                type: "image",
                id: "reset_btn",
                value: "Reset",
                src: "images/reset_btn.png"
        }),

            hint = $("<div>", {
                id: "response",
                /*text: "Hint"*/
                html: "<img src='images/hint1.png'>"
        }),

            life = $("<div>", {
                id: "lives",
                html:
                "<img src='images/green_mushroom.png'>" +
                "<img src='images/green_mushroom.png'>" +
                "<img src='images/green_mushroom.png'>"
        });

        //append dom objects
        $(".game_area").append(input, button, reset, hint, life);

        //guess button click function
        $("#guess_btn").click(function(){
            //console log below used for testing
            /*console.log("secret num: " + self.secretNum());*/
            self.guessButton();
        });

        //reset button click function
        $("#reset_btn").click(function(){
            self.resetGame();
        });
    };

}

$(document).ready(function(){
    //calls the function and dom creation
    var secret = new SecretCode();
    secret.domObjects();
    document.body.addEventListener('touchstart',function(){},false);
});
