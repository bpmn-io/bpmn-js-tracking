import BpmnJSTracking from 'src/BpmnJSTracking';
import trackingModules from 'src/trackingModules';

export default {
  __init__: [
    'bpmnJSTracking',
    'trackingModules'
  ],
  bpmnJSTracking: [ 'type', BpmnJSTracking ],
  trackingModules: [ 'type', trackingModules ]
};