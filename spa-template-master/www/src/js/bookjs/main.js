
import { formula } from "../input/index.js";


/*const wrapper = document.querySelector('.columns');
    var one = document.querySelector('.column-one');
    const resizeBtn = document.querySelector('.button-resize');*/

    document.addEventListener('DOMContentLoaded', theory);
    const area = document.querySelector('.area');
    let page = 0;
    const path = document.location.href;
    let hash = window.location.hash.charAt(1);
    const sideMenu =document.getElementById('side-menu');
    sideMenu.addEventListener('click', myFunction);


    window.addEventListener("hashchange", myFunction);

    function myFunction(e) {
    let link = e.target;
    console.log(link);
    var hash = window.location.hash.charAt(1);
    const xhr = new XMLHttpRequest;
        xhr.open('GET', ''+hash+'.json', true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                let text = JSON.parse(this.responseText);
                parseText(text);
                formula.setData(text["equation"]);

            }
        };
}

    function theory() {
        window.location.hash = 1;
        const xhr = new XMLHttpRequest;
        xhr.open('GET', ''+hash+'.json', true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                let text = JSON.parse(this.responseText);
                parseText(text);
                formula.setData(text["equation"]);
            }
        };
    }

     /*function checkAnswer() {
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

     }*/

export function checkAnswer(e){
    const xhr = new XMLHttpRequest;
    const data = formula.getData();
    let check = getAnswerFromData(data);
    xhr.open('GET', ''+hash+'.json', true);
    xhr.send();
    let btn = e.target;
    xhr.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            let text = JSON.parse(this.responseText);
            let answer = text.answer;
            console.log(answer);
            console.log(check);
            if(answer == check){
                showLike();
                hash++;
                window.location.hash = hash;
                parseText(text);
                formula.setData(text["equation"]);
            }
            else{
                showDislike();
            }
            if(btn.id == 'btn-next'){
                showDislike();
                hash++;
                window.location.hash = hash;
                parseText(text);
                formula.setData(text["equation"]);
            }
        }
    };

    function getAnswerFromData(data){
        let firstItem = data[0];
        let key = Object.keys(firstItem);
        let formula = firstItem[key].join('');
        return formula
    }

}
     function parseText(text) {
         let output = '';
         let arr = text["theory"].split('\n');
         output += '<h2>'+text["title"]+'</h2>';

         arr.forEach(function(i){
             output += '<p>'+i+'</p>';
         });
         let titleTask = '<h2>Выполните задание:</h2>';
         output += titleTask;
         let task = text['task'];
         output += '<p class ="task">' + task + '</p>';
         area.innerHTML = output;
         let btnCheck = document.createElement('input');
         btnCheck.value = "ПРОВЕРИТЬ";
         btnCheck.id = 'btn-check';
         btnCheck.type = 'button';
         area.appendChild(btnCheck);
         btnCheck.addEventListener('click', checkAnswer);
         let btnNext = document.createElement('input');
         btnNext.value = "СДАЮСЬ";
         btnNext.id = 'btn-next';
         btnNext.type = 'button';
         area.appendChild(btnNext);
         btnNext.addEventListener('click', checkAnswer);
         // page ++;
         if (page === 8) {
             page = 0;
         }
     }


    /*let buttonResize = null;
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


    var mouseStartPosition = {};
    var v1StartWidth;
    var v2StartWidth;

    r1_lr_handle.addEventListener("mousedown", mousedownR1RL);

function mousedownR1RL(e) {
  // get v1 width
  v1StartWidth = v1.offsetWidth;
  v2StartWidth = v2.offsetWidth;
  // get mouse position
  mouseStartPosition.x = e.pageX;
  mouseStartPosition.y = e.pageY;


  // add listeners for mousemove, mouseup
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);
}

function mousemove(e) {
  // console.log('mouse move... x:', e.pageX, 'y:', e.pageY);
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
 }*/
//показать галочку за правильное решшение;
 function showLike() {
   const like = document.querySelector('.like');
   const message = generateMessage('like');
     like.querySelector('p').innerHTML = message;
    like.style.display = 'flex';
     setTimeout(function () {
         like.querySelector('i').style.fontSize = '150px';
         like.style.fontSize = '100px';
     },10);
     setTimeout(function () {
         like.querySelector('i').style.fontSize = '20px';
         like.style.display = 'none';
     },1500);
 }

function showDislike() {
    const dislike = document.querySelector('.dislike');
    const message = generateMessage();
    dislike.querySelector('p').innerHTML = message;
    dislike.style.display = 'flex';
    console.log(message);
    setTimeout(function () {
         dislike.querySelector('i').style.fontSize = '150px';
        dislike.style.fontSize = '100px';
     },10);
     setTimeout(function () {
         dislike.querySelector('i').style.fontSize = '20px';
         dislike.style.display = 'none';
     },1500);

}

function generateMessage(type) {
    let messages,
        quantityOfMessages,
        number;
     if(type == 'like'){
         messages = ['Молодец!','Правильно!','Так держать!','Отлично!','Верно!','Твои успехи радуют!'];
         quantityOfMessages = messages.length-1;

     }
     else{
         messages = ['В другой раз получиться!','Ты можешь лучше!','Попробуй еще раз!','Надо сосредоточиться!','Мы в тебя верим!','Тяжело в ученье , легко в бою!'];
         quantityOfMessages = messages.length-1;

     }
    number = getRandomInt(0,quantityOfMessages);
     return messages[number];

}


function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

