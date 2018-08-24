export class ViewPlot{
    constructor(model){
        this.model = model;
        this.host = document.getElementById('plot');
        this.onCheckedCallback = null;
        this.layout=null;
    }
    plot(){
        this.layout = {
            autosize: true,
            width: document.getElementById('plot').getBoundingClientRect().width,
            height: document.getElementById('plot').getBoundingClientRect().height,
            margin: {
                l: 30,
                r: 20,
                b: 30,
                t: 20,
                pad: 4
            }
        };
        Plotly.newPlot(this.host, this.model.data, this.layout);
        this.host.on('plotly_relayout', e => this.onChecked(e['xaxis.range[0]'], e['xaxis.range[1]']));
    }
    onChecked(firstX,lastX) {
        if (typeof (this.onCheckedCallback) === 'function') {
            this.onCheckedCallback(firstX, lastX);
        }
    }
}