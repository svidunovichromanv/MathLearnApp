import {formula} from "../input/index.js";

export class ModelPlot{
    constructor() {
        this.xValues = null;
        this.expr = null;
        this.yValuesAll = null;
        this.yValues = null;
        this.expression = null;
        this.xValuesAll = null;
        this.trace1 = null;
        this.data = null;
        this.changeCallback = null;
    }
    recalculate(firstX,lastX,expression){
        if (!expression){
            expression=this.expression;
        }else{
            this.expression=expression;
        }
        this.data = [];
        for (let i = 0; i<this.expression.length; i++) {
            for (let key in this.expression[i]) {
                try {
                    let temp = 2;
                    for (let j = 0; j <= this.expression[i][key].length; j++){
                        if (this.expression[i][key][j] === "|"){
                            if(temp%2===0){
                                this.expression[i][key][j]="abc(";
                            }else{
                                this.expression[i][key][j]=")";
                            }
                        }
                    }
                    this.expr = math.compile(this.expression[i][key].join(""));
                    if (this.expression[i][key][0] === "x" && this.expression[i][key][1] === "=") {
                        this.yValues = math.range(firstX, lastX, 0.1).toArray();
                        this.xValuesAll = this.yValues.map((y) => {
                            return this.expr.eval({y: y})
                        });
                        this.xValues = this.xValuesAll.map((x) => {
                            return x >= firstX && x <= lastX ? x : false
                        });

                    } else {
                        this.xValues = math.range(firstX, lastX, 0.1).toArray();
                        this.yValuesAll = this.xValues.map((x) => {
                            return this.expr.eval({x: x})
                        });
                        this.yValues = this.yValuesAll.map((y) => {
                            return y >= firstX && y <= lastX ? y : false
                        });
                    }
                    this.trace1 = {
                        x: this.xValues,
                        y: this.yValues,
                        type: 'scatter'
                    };
                    this.data.push(this.trace1);

                }
                catch (e) {
                    console.log(`err in id = ${key}`);
                }
            }
        }
        if (typeof (this.changeCallback) === 'function'){
            this.changeCallback();
        }
    };
}