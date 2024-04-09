let squares ; 
let scoreDisplay ; 
document.addEventListener("DOMContentLoaded" , function(){
    const gridDisplay = document.querySelector('.grid') ; 
     scoreDisplay = document.querySelector('#score') ; 
    const resultDisplay = document.getElementById('result') ; 
    function createBoard(){
        for( var i = 0 ; i<16 ; i++){
            var tile =  document.createElement('div') ; 
            tile.innerHTML = 0 ; 
            tile.classList.add('zero') ; 
            gridDisplay.appendChild(tile) ; 
         }
         squares = document.querySelectorAll('.grid div') ;
         generate() ; 
         generate() ; 
         decolor_board() ; 
         color_board() ; 
         
    }
    createBoard() ; 
    detectswipe('grid',myfunction);
    
}); 


function generate(){
    var randomNumber = Math.round(Math.random()*16) ;
    if (randomNumber == 16)  randomNumber = 15 ; 
    number_to_be_generated = (Math.floor(Math.random()*2)+1)*2 ; 
    if( squares[randomNumber].innerHTML == 0 ){
        squares[randomNumber].innerHTML = number_to_be_generated ; 
       //  squares[randomNumber].classList.add('two') ; 
    }else{
        generate() ; 
    }
}



function moveRight(){
    for( let i = 0 ; i<16 ; i++ ){
        if( i%4 ===0 ){
            let totalOne = parseInt(squares[i].innerHTML) ;
            let totaltwo = parseInt(squares[i+1].innerHTML) ; 
            let totalThree = parseInt(squares[i+2].innerHTML) ; 
            let totalFour = parseInt(squares[i+3].innerHTML) ; 
            let row = [ totalOne , totaltwo , totalThree , totalFour] ;
            let filteredRow = row.filter( num => num ) ; 
            let missing = 4 - filteredRow.length ; 
            let zeros = Array(missing).fill(0) ; 
            let newRow = zeros.concat(filteredRow) ; 
            squares[i].innerHTML = newRow[0] ; 
            squares[i+1].innerHTML = newRow[1] ; 
            squares[i+2].innerHTML = newRow[2] ; 
            squares[i+3].innerHTML = newRow[3] ; 

        }

    }

}

function moveLeft(){
    for( let i = 0 ; i<16 ; i++ ){
        if( i%4 ===0 ){
            let totalOne = parseInt(squares[i].innerHTML) ;
            let totaltwo = parseInt(squares[i+1].innerHTML) ; 
            let totalThree = parseInt(squares[i+2].innerHTML) ; 
            let totalFour = parseInt(squares[i+3].innerHTML) ; 
            let row = [ totalOne , totaltwo , totalThree , totalFour] ;
            let filteredRow = row.filter( num => num ) ; 
            let missing = 4 - filteredRow.length ; 
            let zeros = Array(missing).fill(0) ; 
            let newRow = filteredRow.concat(zeros) ; 
            squares[i].innerHTML = newRow[0] ; 
            squares[i+1].innerHTML = newRow[1] ; 
            squares[i+2].innerHTML = newRow[2] ; 
            squares[i+3].innerHTML = newRow[3] ; 

        }
    }
}

function moveDown(){
    for( let i = 0 ; i<4 ; i++ ){
        let totalOne = parseInt(squares[i].innerHTML) ;
        let totaltwo = parseInt(squares[i+4].innerHTML) ; 
        let totalThree = parseInt(squares[i+8].innerHTML) ; 
        let totalFour = parseInt(squares[i+12].innerHTML) ; 
        let column = [ totalOne , totaltwo , totalThree , totalFour] ;
        let filteredCol = column.filter( num => num ) ; 
        let missing = 4 - filteredCol.length ; 
        let zeros = Array(missing).fill(0) ; 
        let newCol = zeros.concat(filteredCol) ; 
        squares[i].innerHTML = newCol[0] ; 
        squares[i+4].innerHTML = newCol[1] ; 
        squares[i+8].innerHTML = newCol[2] ; 
        squares[i+12].innerHTML = newCol[3] ; 
    }
}
function moveUp(){
    for( let i = 0 ; i<4 ; i++ ){
        let totalOne = parseInt(squares[i].innerHTML) ;
        let totaltwo = parseInt(squares[i+4].innerHTML) ; 
        let totalThree = parseInt(squares[i+8].innerHTML) ; 
        let totalFour = parseInt(squares[i+12].innerHTML) ; 
        let column = [ totalOne , totaltwo , totalThree , totalFour] ;
        let filteredCol = column.filter( num => num ) ; 
        let missing = 4 - filteredCol.length ; 
        let zeros = Array(missing).fill(0) ; 
        let newCol = filteredCol.concat(zeros) ; 
        squares[i].innerHTML = newCol[0] ; 
        squares[i+4].innerHTML = newCol[1] ; 
        squares[i+8].innerHTML = newCol[2] ; 
        squares[i+12].innerHTML = newCol[3] ; 
    }
}

function combineRowRight(){
    for (let i =15 ; i>=0 ; i-- ){
        if(i%4!=3){
            if( squares[i].innerHTML == squares[i+1].innerHTML){
                let cobminedtotal = 2*parseInt(squares[i].innerHTML) ; 
                squares[i+1].innerHTML = cobminedtotal ; 
                squares[i].innerHTML = 0 ; 
                scoreDisplay.innerHTML = parseInt(scoreDisplay.innerHTML) + cobminedtotal ; 
            }
    }
 }
}
function combineRowLeft(){
    for (let i = 0  ; i<16 ; i++ ){
        if(i%4!=3){
            if( squares[i].innerHTML == squares[i+1].innerHTML){
                let cobminedtotal = 2*parseInt(squares[i].innerHTML) ; 
                squares[i+1].innerHTML = 0 ; 
                squares[i].innerHTML = cobminedtotal  ; 
                scoreDisplay.innerHTML = parseInt(scoreDisplay.innerHTML) + cobminedtotal ; 
            }
    }
  }
}

function combineRowUp(){
    for (let i = 0  ; i<12 ; i++ ){
            if( squares[i].innerHTML == squares[i+4].innerHTML){
                let cobminedtotal = 2*parseInt(squares[i].innerHTML) ; 
                squares[i+4].innerHTML = 0 ; 
                squares[i].innerHTML = cobminedtotal  ; 
                scoreDisplay.innerHTML = parseInt(scoreDisplay.innerHTML) + cobminedtotal ; 
            }
  }
}
function combineRowDown(){
    for (let i = 11 ; i>=0 ; i-- ){
            if( squares[i].innerHTML == squares[i+4].innerHTML){
                let cobminedtotal = 2*parseInt(squares[i].innerHTML) ; 
                squares[i+4].innerHTML = cobminedtotal ; 
                squares[i].innerHTML = 0  ; 
                scoreDisplay.innerHTML = parseInt(scoreDisplay.innerHTML) + cobminedtotal ; 
            }

  }
}



function control(e){
    if(e.keyCode === 39 ){
        decolor_board() ; 
        moveRight() ; 
        combineRowRight() ; 
        moveRight() ; 
        if(!board_complete())generate() ; 
        color_board() ; 
    }else if( e.keyCode === 37 ){
        decolor_board() ;
        moveLeft() ; 
        combineRowLeft() ; 
        moveLeft() ; 
        if(!board_complete())generate() ;  
        color_board() ; 
    }else if ( e.keyCode === 38 ){
        decolor_board() ; 
        moveUp() ; 
        combineRowUp() ; 
        moveUp() ; 
        if(!board_complete())generate() ; 
        color_board() ; 
    }else if(e.keyCode === 40){
        decolor_board() ; 
        moveDown() ; 
        combineRowDown()  ; 
        moveDown() ; 
        if(!board_complete())generate() ; 
        color_board() ; 
    }
    if(board_complete() && no_move_possible() ){
        document.querySelector('#result').innerHTML = "Game Over ! " ; 
    }
}

document.addEventListener('keyup' , control ) ; 
// function class_from_number( number ){
//     if(number==0) return 'zero' ; 
//     else if( number == 2) return 'two' ; 
//     else if( number ==4 ) return 'four' ; 

// }
function decolor_board(){
    for( let i = 0 ; i<16 ; i++){
        var number = parseInt(squares[i].innerHTML) ; 
        if(number == 0 ){
            squares[i].classList.remove('zero') ; 
        }
        if(number == 2 ){
            squares[i].classList.remove('two') ; 
        }
        if(number == 4 ){
            squares[i].classList.remove('four') ; 
        }
        if(number == 8 ){
            squares[i].classList.remove('eight') ; 
        }
        if( number == 16 ){
            squares[i].classList.remove('sixteen') ; 
        }
        if( number == 32) {
            squares[i].classList.remove('thirtytwo') ; 
        }
        if( number == 64) {
            squares[i].classList.remove('sixtyfour') ; 
        }
        if( number == 128 ) {
            squares[i].classList.remove('onetwentyeight') ; 
        }
        if( number == 256 ) {
            squares[i].classList.remove('twofiftysix') ; 
        }
        if( number == 512 ) {
            squares[i].classList.remove('fivetwelve') ; 
        }
        if( number == 1024 ) {
            squares[i].classList.remove('thousand') ; 
        }
        if( number == 2048 ) {
            squares[i].classList.remove('twothousand') ; 
        }
    }
}
function color_board(){
    for( let i = 0 ; i<16 ; i++){
        var number = parseInt(squares[i].innerHTML) ; 
        if(number == 0 ){
            squares[i].classList.add('zero') ; 
        }
        if(number == 2 ){
            squares[i].classList.add('two') ; 
        }
        if(number == 4 ){
            squares[i].classList.add('four') ; 
        }
        if(number == 8 ){
            squares[i].classList.add('eight') ; 
        }
        if( number == 16 ){
            squares[i].classList.add('sixteen') ; 
        }
        if( number == 32) {
            squares[i].classList.add('thirtytwo') ; 
        }
        if( number == 64) {
            squares[i].classList.add('sixtyfour') ; 
        }
        if( number == 128 ) {
            squares[i].classList.add('onetwentyeight') ; 
        }
        if( number == 256 ) {
            squares[i].classList.add('twofiftysix') ; 
        }
        if( number == 512 ) {
            squares[i].classList.add('fivetwelve') ; 
        }
        if( number == 1024 ) {
            squares[i].classList.add('thousand') ; 
        }
        if( number == 2048 ) {
            squares[i].classList.add('twothousand') ; 
        }
        
    }
}

function board_complete(){
  for( var i = 0 ; i<16 ; i++ ){
      if(squares[i].innerHTML==0) return false ; 
  }   
   return true ; 
}

function no_move_possible(){
    for( var i = 0 ; i<12 ; i++ ){
        if(squares[i].innerHTML == squares[i+4].innerHTML) return false; 
    }
    for( var i = 0 ; i<16 ; i++ ){
        if(i%4!=3){
            if( squares[i].innerHTML == squares[i+1].innerHTML){
                return false ; 
            }
        }
    }
    return true ; 
}





//----------mobile devices 


function detectswipe(el,func) {
    swipe_det = new Object();
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
    var min_x = 30;  //min x swipe for horizontal swipe
    var max_x = 30;  //max x difference for vertical swipe
    var min_y = 50;  //min y swipe for vertical swipe
    var max_y = 60;  //max y difference for horizontal swipe
    var direc = "";
    ele = document.getElementById(el);
    ele.addEventListener('touchstart',function(e){
      var t = e.touches[0];
      swipe_det.sX = t.screenX; 
      swipe_det.sY = t.screenY;
    },false);
    ele.addEventListener('touchmove',function(e){
      e.preventDefault();
      var t = e.touches[0];
      swipe_det.eX = t.screenX; 
      swipe_det.eY = t.screenY;    
    },false);
    ele.addEventListener('touchend',function(e){
      //horizontal detection
      if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
        if(swipe_det.eX > swipe_det.sX) direc = "r";
        else direc = "l";
      }
      //vertical detection
      else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
        if(swipe_det.eY > swipe_det.sY) direc = "d";
        else direc = "u";
      }
  
      if (direc != "") {
        if(typeof func == 'function') func(el,direc);
      }
      direc = "";
      swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
    },false);  
  }
  
  function myfunction(el,d) {
    if(d=='u'){
        decolor_board() ; 
        moveUp() ; 
        combineRowUp() ; 
        moveUp() ; 
        if(!board_complete())generate() ; 
        color_board() ; 
    }else if(d=='r'){
        decolor_board() ; 
        moveRight() ; 
        combineRowRight() ; 
        moveRight() ; 
        if(!board_complete())generate() ; 
        color_board() ; 
    }else if(d=='d'){
        decolor_board() ; 
        moveDown() ; 
        combineRowDown()  ; 
        moveDown() ; 
        if(!board_complete())generate() ; 
        color_board() ; 
    }else if(d=='l'){
        decolor_board() ;
        moveLeft() ; 
        combineRowLeft() ; 
        moveLeft() ; 
        if(!board_complete())generate() ;  
        color_board() ; 
    }
    if(board_complete() && no_move_possible() ){
        document.querySelector('#result').innerHTML = "Game Over ! " ; 
    }
  }
