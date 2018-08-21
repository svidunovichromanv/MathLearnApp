    const v1 = document.querySelector('.column-one');
    const v2 = document.querySelector('.column-two');
    const r1_lr_handle = document.querySelector('.button-resize');
    document.addEventListener('DOMContentLoaded', theory);

    const area = document.querySelector('.area');
    let page = 0;
    const path = document.location.href;

    function theory() {
        const xhr = new XMLHttpRequest;
        xhr.open('GET', ''+page+'.json', true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                let text = JSON.parse(this.responseText);
                parseText(text);
            }
        };
    }

     function checkAnswer() {
         const xhr = new XMLHttpRequest;
         xhr.open('GET', ''+page+'.json', true);
         xhr.send();
         xhr.onreadystatechange = function() {
             if(this.readyState === 4 && this.status === 200) {
                let text = JSON.parse(this.responseText);
                let answer = text.answer;
                console.log(answer);
                formula.data.shift();
                let check = formula.data.join('');
                console.log(check);
                if(answer == check){
                showLike();
                parseText(text);
            }
            else{
               showDislike();
            } 
             }
         };

     }

     function parseText(text) {
         let output = '';
         let arr = text["theory"].split('\n');
         let equations = text["equation"];
         output += '<h2>'+text["title"]+'</h2>';

         arr.forEach(function(i){
             output += '<p>'+i+'</p>';
         });
         area.innerHTML = output;
         let button = document.createElement('input');
         button.value = "ДАЛЕЕ";
         button.id = 'btn-next';
         button.type = 'button';
         area.appendChild(button);
         button.addEventListener('click', checkAnswer);
         page ++;
         if (page === 8) {
             page = 0;
         }
     }


    const keypad = document.getElementById('calculator'); //кнопка скрыть показать экранную клавиатуру

    function calculatorHidden(e) {
        const buttonKeypad = e.currentTarget;
        keypad.classList.toggle('calculator-visible');
        buttonKeypad.classList.toggle('close');
        setTimeout(function () {
            let icon = buttonKeypad.querySelector('.fas');
            icon.classList.toggle('fa-sort-down');
            icon.classList.toggle('fa-sort-up');
            buttonKeypad.classList.toggle('open');
        },0)
    }

var mouseStartPosition = {};
    var v1StartWidth;
    var v2StartWidth;

    r1_lr_handle.addEventListener("mousedown", mousedownR1RL);

function mousedownR1RL(e) {
  v1StartWidth = v1.offsetWidth;
  v2StartWidth = v2.offsetWidth;
  mouseStartPosition.x = e.pageX;
  mouseStartPosition.y = e.pageY;

  console.log('start... x:', mouseStartPosition.x, 'y:', mouseStartPosition.y);


  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);
}

function mousemove(e) {

  var diff = mouseStartPosition.x - e.pageX;
    v1.style.flexBasis = v1StartWidth + -1*diff + 'px';
    v2.style.flexBasis = v2StartWidth + diff + 'px';
}

function mouseup(e) {
  window.removeEventListener("mousemove", mousemove);
  window.removeEventListener("mouseup", mouseup);
}






//кнопка показать меню

    const menu = document.getElementById('side-menu');

    function showSideMenu(e){
     let btn = null;

     if(!e){
         btn = document.querySelector('.fa-times');
     }
     else{
         btn = e.target;
     }

        menu.classList.toggle('hidden');
        const widthMenu = menu.offsetWidth;
        btn.setAttribute('style', 'transform:translateX('+ (widthMenu - btn.offsetWidth) +'px);');
        btn.classList.toggle('fa-bars');
        btn.classList.toggle('fa-times');
 }
//показать галочку за правильное решшение;
 function showLike() {
   const like = document.querySelector('.like');
    like.style.display = 'flex';
     setTimeout(function () {
         like.querySelector('i').style.fontSize = '800px';
     },10);
     setTimeout(function () {
         like.querySelector('i').style.fontSize = '80px';
         like.style.display = 'none';
     },1500);
 }

function showDislike() {
    const dislike = document.querySelector('.dislike');
    dislike.style.display = 'flex';
    setTimeout(function () {
         dislike.querySelector('i').style.fontSize = '800px';
     },10);
     setTimeout(function () {
         dislike.querySelector('i').style.fontSize = '80px';
         dislike.style.display = 'none';
     },1500);

}
