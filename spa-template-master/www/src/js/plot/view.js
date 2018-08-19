export class ViewPlot{
    constructor(model){
        this.model = model;
        this.host = document.getElementById('plot');
        this.onCheckedCallback = null;
    }
    plot(){
        Plotly.newPlot(this.host, this.model.data);
        this.host.on('plotly_relayout', e => this.onChecked(e['xaxis.range[0]'], e['xaxis.range[1]']));
    }
    onChecked(firstX,lastX) {
        if (typeof (this.onCheckedCallback) === 'function') {
            this.onCheckedCallback(firstX, lastX);
        }
    }
}