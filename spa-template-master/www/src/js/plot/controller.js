export class ControllerPlot{
    constructor(model, view){
        this.view = view;
        let self = this;
        model.changeCallback = function() {
            self.renderView();
        };
        model.recalculate(-10,10);
        view.onCheckedCallback = function(firstX,lastX) {
            model.recalculate(firstX,lastX);
        }
    }
    renderView() {
        this.view.plot();
    }
}