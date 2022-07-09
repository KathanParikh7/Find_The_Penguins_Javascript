$(document).ready( function() {
    let _score = 0;
    let _highScore =0;
    let _isClicked = [];
    let _isWin = false;
    let _isEnd = false;    
    
    let _arrayPy = ['<div class="penguin" id="penguin_1"></div>',
                    '<div class="penguin" id="penguin_2"></div>',
                    '<div class="penguin" id="penguin_3"></div>',
                    '<div class="penguin" id="penguin_4"></div>',
                    '<div class="penguin" id="penguin_5"></div>',
                    '<div class="penguin" id="penguin_6"></div>',
                    '<div class="penguin" id="penguin_7"></div>',
                    '<div class="penguin" id="penguin_8"></div>',
                    '<div id="yeti"></div>'];
    
    if(sessionStorage.getItem("highScore") === null){
        document.getElementById('highScore').innerHTML = '0';
    }
    else{
        document.getElementById('highScore').innerHTML = sessionStorage.getItem("highScore");
    }
    
    $("#startGame").click(function(event) {
        document.getElementById('preBG').play();
        
        shufflePenguins();
        
        $(".penguin").mousedown(function(event) {
            document.getElementById('penguine').play();
            
            clickPenguin(event);
        });
    
        $("#yeti").mousedown(function() {
            document.getElementById('gameOver').play();

            for(let h=0;h<20;h++){
                $("#penguin_"+h).css('background-image','url("/images/mound_'+h+'.png"');
            }    
            _isEnd = true;    
        
            endGame();
        });
        
    });
    
    function shufflePenguins(){
        _score = 0;
        let i,_random,_temp;
        for(i=0;i<_arrayPy.length;i++){
            _random = Math.floor(Math.random() * 10);
            _temp = _arrayPy[i];
            _arrayPy[i] = _arrayPy[_random];
            _arrayPy[_random] = _temp;
        }
        console.log(_arrayPy);
        $("#gameholder").append(_arrayPy); 
        $("#prePlay").css('display','none');
        $("#inGame").css('display','block');
        $("#gameholder").css('display','block');
        
        if(sessionStorage.getItem("highScore") === null){
            document.getElementById('highScoreIn').innerHTML = '0';
        }
        else{
            document.getElementById('highScoreIn').innerHTML = sessionStorage.getItem("highScore");
        }
    }
    
    function clickPenguin(event){
        $("#"+event.target.id).css('background-image','url("/images/'+event.target.id+'.png"');
        
        if(_isClicked.includes(event.target.id) || _isEnd == true){}
        else{
            _isClicked.push(event.target.id);
            _score = _score + 1;
            if(_score == 8){
                _isWin = true;
                document.getElementById('win').play();
                endGame();
            }
        }
        //console.log(_isClicked);
        //console.log(_isEnd);
        //console.log(_score);
        document.getElementById('score').innerHTML = _score;
    }
    
    function endGame(){
        if(_score > sessionStorage.getItem("highScore")){
            _highScore = _score;
            if(typeof(Storage) !== "undefined") {
              sessionStorage.setItem("highScore", _highScore);
            } else {
              document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
            }    
        }
        $("#"+event.target.id).css('background-image','url("/images/'+event.target.id+'.png"');
        setTimeout(function(){
            if(_isWin == true){   
                alert("congratulations !!!\nYour Score is : "+_score);
            }
            else{
                alert("You Are Dead !!!\nYour Score is : "+_score);
            }
        },1500);
        document.getElementById('highScore').innerHTML = sessionStorage.getItem("highScore");
        setTimeout(function(){
            document.getElementById('preBG').pause();
            location.reload(true); 
        },2500);
    }
});