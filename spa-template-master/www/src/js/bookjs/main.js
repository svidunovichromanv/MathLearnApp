
import { formula } from "../input/index.js";


    document.addEventListener('DOMContentLoaded', theory);
    const area = document.querySelector('.area');
    let hash = window.location.hash.charAt(1);
    let answer;
    const sideMenu =document.getElementById('side-menu');
    sideMenu.addEventListener('click', goToNextPage);


    window.addEventListener("hashchange", goToNextPage);

    function goToNextPage(e) {
        let menu = document.querySelector('.side-menu');
        let xhr = new XMLHttpRequest;
        let id = e.target.id;
        if(!id) return false;
        xhr.open('GET', id + '.json', true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let text = JSON.parse(this.responseText);
                parseText(text);
                answer = text.answer;
                formula.setData(text["equation"]);
                if(!menu.classList.contains('hidden')){
                    document.querySelector('.side-menu').classList.add('hidden');
                    document.querySelector('.button-burger-menu').classList.toggle('fa-bars');
                    document.querySelector('.button-burger-menu').classList.toggle('fa-times');
                }
            }
        }
    }

    function theory() {
        if(!window.location.hash){
            window.location.hash = 1;
        }
        const xhr = new XMLHttpRequest;
        console.log(hash);
        xhr.open('GET', ''+hash+'.json', true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                let text = JSON.parse(this.responseText);
                answer = text.answer;
                parseText(text);
                formula.setData(text["equation"]);
            }
        };
    }


export function checkAnswer(e){
    hash = window.location.hash.charAt(1);
    const xhr = new XMLHttpRequest;
    const data = formula.getData();
    xhr.open('GET', ''+hash+'.json', true);
    xhr.send();
    let btn = e.target;
    hash++;
    if(hash == 9){
        hash = 8;
    }
    xhr.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            let text = JSON.parse(this.responseText);
            if( isTrueAnswer(data, answer) ){
                showLike();

                window.location.hash = hash;
                answer = text.answer;
                parseText(text);
                formula.setData(text["equation"]);
            }
            else if(btn.id == 'btn-next'){
                showDislike();
                window.location.hash = hash;
                answer = text.answer;
                parseText(text);
                formula.setData(text["equation"]);
            }
            else{
                showDislike();
            }
        }
    };

    function isTrueAnswer(result, answer) {
        let answerFromData = getAnswerFromData(result);
        console.log(answerFromData);
        console.log(answer);
        if(answerFromData.length !== answer.length)return false;
        for(let i=0;i<answerFromData.length;i++){
            if(answerFromData[i].localeCompare(answer[i]) !== 0){
                return false;
            }
        }
        return true;
    }

    function getAnswerFromData(data){
        let result = [];
        for(let i=0;i<data.length;i++){
            let key = Object.keys(data[i]);
            result.push(data[i][key].join(''));
        }
        return result;
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

     }

//показать галочку за правильное решшение;
function getFontSize() {

    if(window.innerWidth < 1245 && window.innerWidth > 600){
        return  60;
    }
    else if(window.innerWidth < 600){
        return 40;
    }
    else if(window.innerWidth < 300){
        return 25;
    }
    return 100;
}

 function showLike() {
   const like = document.querySelector('.like');
   const message = generateMessage('like');
   let fontSizeForLike = getFontSize();
     like.querySelector('p').innerHTML = message;
    like.style.display = 'flex';
     setTimeout(function () {
         like.querySelector('i').style.fontSize = fontSizeForLike +'px';
         like.style.fontSize = fontSizeForLike +'px';
     },10);
     setTimeout(function () {
         like.querySelector('i').style.fontSize = '1px';
         like.style.display = 'none';
     },1500);
 }

function showDislike() {

    let fontSizeForLike = getFontSize();
    const dislike = document.querySelector('.dislike');
    const message = generateMessage();
    dislike.querySelector('p').innerHTML = message;
    dislike.style.display = 'flex';
    setTimeout(function () {
         dislike.querySelector('i').style.fontSize = fontSizeForLike +'px';
        dislike.style.fontSize = fontSizeForLike +'px';
     },10);
     setTimeout(function () {
         dislike.querySelector('i').style.fontSize = '1px';
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
         messages = ['В другой раз получиться!','Ты можешь лучше!','Попробуй еще раз!','Надо сосредоточиться!','Мы в тебя верим!','Тяжело в ученье\n легко в бою!'];
         quantityOfMessages = messages.length-1;

     }
    number = getRandomInt(0,quantityOfMessages);
     return messages[number];

}


function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

