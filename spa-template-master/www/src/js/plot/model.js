export class ModelPlot{
    constructor(){
        this.xValues = null;
        this.expr = null;
        this.yValuesAll = null;
        this.yValues = null;
        this.expression = null;
        this.xValuesAll=null;
        this.trace1=null;
        this.data = null;
        this.changeCallback = null;
    }
    recalculate(firstX,lastX){
        this.data = [];
        this.expression = { 66583:["2","*","x","^","2"],185886589:["x","=","2"], 874888558:["/"]};
        for (let id in this.expression){
            try {
                this.expr = math.compile(this.expression[id].join(""));
                if (this.expression[id][0]==="x" && this.expression[id][1]==="="){
                    this.yValues = math.range(firstX, lastX, 0.1).toArray();
                    this.xValuesAll = this.yValues.map((y) => {return this.expr.eval({y: y})});
                    this.xValues = this.xValuesAll.map((x) => {return x>=firstX&&x<=lastX?x:false});
                    this.trace1 = {
                        x: this.xValues,
                        y: this.yValues,
                        type: 'scatter'
                    };
                    this.data.push(this.trace1);
                }else{
                    this.xValues = math.range(firstX, lastX, 0.1).toArray();
                    this.yValuesAll = this.xValues.map((x) => {return this.expr.eval({x: x})});
                    this.yValues = this.yValuesAll.map((y) => {return y>=firstX&&y<=lastX?y:false});
                    this.trace1 = {
                        x: this.xValues,
                        y: this.yValues,
                        type: 'scatter'
                    };
                    this.data.push(this.trace1);
                }

            }
            catch (e){
                console.log(`err in id = ${id}`);
            }
        }

        if (typeof (this.changeCallback) === 'function'){
            this.changeCallback();
        }
    };
}