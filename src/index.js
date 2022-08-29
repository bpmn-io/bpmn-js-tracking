import BpmnJSTracking from 'src/BpmnJSTracking';
import trackingModules from 'src/trackingModules';

export default {
  __depends__: [
    trackingModules
  ],
  __init__: [
    'bpmnJSTracking'
  ],
  bpmnJSTracking: [ 'type', BpmnJSTracking ]
};
