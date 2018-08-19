
import { ModelPlot } from './model.js';
import { ViewPlot } from './view.js';
import { ControllerPlot } from './controller.js';

const modelPlot = new ModelPlot();
const viewPlot = new ViewPlot(modelPlot);
const controllerPlot = new ControllerPlot(modelPlot,viewPlot);
