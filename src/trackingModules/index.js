import CanvasTracking from './CanvasTracking';
import SelectionTracking from './SelectionTracking';

export default {
  __init__: [
    'canvasTracking',
    'selectionTracking'
  ],
  canvasTracking: [ 'type', CanvasTracking ],
  selectionTracking: [ 'type', SelectionTracking ]
};