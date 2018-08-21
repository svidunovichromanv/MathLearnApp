export class FormulaController {
    constructor(formula, formulaViewInput,keypadView) {
        this.formula = formula;
        this.formulaViewInput = formulaViewInput;
        //this.formulaViewValidatorData = formulaViewValidatorData;
        this.memberItem = '';
        formulaViewInput.on('edit', this.editField.bind(this));
        formulaViewInput.on('keydownBackspace', this.deleteItemFromInput.bind(this));
        formulaViewInput.on('keypress', this.addData.bind(this));
        formulaViewInput.on('click', this.addNewInput.bind(this));
        formulaViewInput.on('delete', this.deleteInput.bind(this));
        formulaViewInput.on('clean', this.cleanInput.bind(this));
        formulaViewInput.on('keydownArrow', this.moveCaret.bind(this));
        //formulaViewInput.show(formula.state);
        keypadView.on('click', this.addData.bind(this));
    }
    moveCaret(direction){
        this.formulaViewInput.moveCaret(direction);
    }
    cleanInput(id){
        this.formula.cleanItem(id);
        this.formulaViewInput.cleanInput();
    }
    addNewInput(){
        if(this.formula.data.length === 5)return false;
        let idInput = Date.now();
        let newData ={};
        newData[idInput] = [];
        this.formula.addItem(newData);
        this.formulaViewInput.addNewInput(idInput);
    }
    deleteInput(id){
        if(id === 'line-input'){
            return false;
        }
        this.formula.deleteItem(id);
        this.formulaViewInput.deleteInput(id);
    }

    addData(data) {
        if(data === '^'){
            this.memberItem +=data;
            return false;
        }
        if(this.memberItem){
            this.memberItem +=data;
            data = this.memberItem;
            this.memberItem ='';
        }
        if(/\$/.test(data)){
            switch (data){
                case '$backspace':{
                    this.formulaViewInput.handlePressKeypad({which:8});
                    break;
                }
                case '$enter':{
                    this.addNewInput();
                    break;
                }
                case '$^2':{
                    this.formulaViewInput.handleAddItem({key:'^'});
                    this.formulaViewInput.handleAddItem({key:'2'});
                    break;
                }
                case '$left':{
                    this.moveCaret('left');
                    break;
                }
                case '$right':{
                    this.moveCaret('right');
                    break;
                }
            }
        }
        else{
            let id = document.querySelector('.activeField').id;
            let index = this.formulaViewInput.getNextIndexItem();

            const result = this.formula.addDataInItem(id,index, data);
            if (result) {
                this.formulaViewInput.addDataInItem(id,index, data);
            }
        }

    }

    editField(event) {
        this.formulaViewInput.editField(event);
    }

    deleteItemFromInput(obj) {  //{id:index}
        this.formula.deleteDataFromItem(obj);
        this.formulaViewInput.deleteDataFromItem(obj);
    }
}