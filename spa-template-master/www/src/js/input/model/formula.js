import { EventEmitter } from '../helpers.js';
import { Validator } from './validator.js';



 export class Formula extends EventEmitter{
    constructor(validator) {
        super();
        this.data = [{'line-input':[]}];
        this.maxlength = 18;
        this.id = Date.now();
        this.stateData = false;
        this.isPower = false;
        this.isNumber = false;
        if (validator instanceof Validator) {
            this.validator = validator;
        }
    }

    getStateData(){
        return this.stateData;
    }

    validateItem(item) {
        this.validator.validate(item);
        this.stateData = this.validator.validItem;
    }

    addItem(item) {
        if(this.data.length > this.maxlength){
            return false;   //проверяем чтобы не было переполнение массива
        }
        this.validateItem(item); //проверяем введенные данные и если они true добавляем в массив

        if(this.stateData){
            if(this.isNumber && (/[0-9]/.test(item))){
                this.data[this.data.length -1] +=  '' +item;
                return this.generateWrapForItem(item); //генерируем узел для HTML и возвращаем в контроллер
            }
            else{
                this.data.push(item);
                return this.generateWrapForItem(item); //генерируем узел для HTML и возвращаем в контроллер
            }

        }
        else return false;
    }

    generateWrapForItem(item){
        const letters = /[a-z]/;
        const digit = /[0-9]/;
        const signMultiply =  /\*/;
        const signPower = /\^/;
        let node = null;
        if(this.isPower && digit.test(item)){
            this.isPower = false;
            node = document.createElement('sup');
            node.textContent = item;
        }
        else if(letters.test(item) ){
            this.isNumber = false;
            node = document.createElement('var');
            node.textContent = item + ' ';
        }
        else if(signMultiply.test(item)){
            this.isNumber = false;
            node = document.createElement('sup');
            node.textContent = item + ' ';

        }
        else if(signPower.test(item)){
            this.isPower = true;
            this.isNumber = false;
        }
        else if(digit.test(item)){
            node = document.createElement('span');
            node.textContent = item + ' ';
            this.isNumber = true;
        }
        else{
            this.isNumber = false;
            node = document.createElement('span');
            node.textContent = item + ' ';
        }
        if(node){
            node.setAttribute('data-index', this.data.length-1);
        }
        return node;
    }

    deleteItem(node) {
        if(this.data.length > 0){
            let nodeIndex = parseInt(node.getAttribute('data-index'));

            this.data.splice(nodeIndex,1);
        }

    }

    addNewInput(data){
        this.data.push(data);
        console.log('добавился новый массив, данные формулы обновились');
        console.log(this.data);
    }


    deleteInput(id) {
        for(let i = 0;i < this.data.length;i++){
            for(let k in this.data[i]){
                if(k === id){
                    this.data.splice(i, 1);
                    break;
                }
            }
        }
        console.log('удалили массив, данные формулы обновились');
        console.log(this.data);
    }

}












