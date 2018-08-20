const wrapper = document.querySelector('.columns')
    var one = document.querySelector('.column-one');
    const resizeBtn = document.querySelector('.button-resize');
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

    let buttonResize = null;
    let columnLeft = null;
    let columnRight = null;
    let cursorCoordX = 0;
    let flexBoxValueColumnLeft = 0;
    let flexBoxValueColumnRight = 0;
    const columns = document.querySelector('.columns');

    columns.ondragstart = function (){return false;};

    columns.onmousedown = function startResizeColumns(e) {

        if(e.target.classList.contains('button-resize')){
            buttonResize = e.target;
            columnLeft = buttonResize.previousElementSibling;
            columnRight = buttonResize.nextElementSibling;
            flexBoxValueColumnLeft = parseFloat(window.getComputedStyle(columnLeft).webkitFlexGrow);
            flexBoxValueColumnRight = parseFloat(window.getComputedStyle(columnRight).webkitFlexGrow);
            cursorCoordX = e.clientX;
            document.body.style.cursor = 'col-resize';
        }
        else{
            return false;
        }

    };
//кнопка изменения размеров блоков
    columns.onmousemove = function resizeColumns(e) {

        if (buttonResize) {
            if(flexBoxValueColumnLeft + (e.clientX - cursorCoordX)/850 < 0.06588275882352941 || flexBoxValueColumnLeft + (e.clientX - cursorCoordX)/850 > 1.257){
                stopResize();
                return false;
            }
            columnLeft.setAttribute('style', '-webkit-box-flex: ' + ( flexBoxValueColumnLeft + (e.clientX - cursorCoordX) / 850) + '; flex: ' + (flexBoxValueColumnLeft + (e.clientX - cursorCoordX) / 850) + ' 1 0%');
            columnRight.setAttribute('style', '-webkit-box-flex: ' + ( flexBoxValueColumnRight - (e.clientX - cursorCoordX) / 850) + '; flex: ' + (flexBoxValueColumnRight - (e.clientX - cursorCoordX) / 850) + ' 1 0%');
        }
        else return false;

    };

    columns.onmouseup = stopResize();

        function stopResize() {
            columnLeft = null;
            columnRight = null;
            buttonResize = null;
            cursorCoordX = 0;
            document.body.style.cursor = 'auto';
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
