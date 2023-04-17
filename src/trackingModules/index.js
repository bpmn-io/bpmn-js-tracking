import controlsTracking from './controls/popupMenu';
import diagramTracking from './diagram';
import popupMenuTracking from './popupMenu';

export default {
  __depends__: [
    controlsTracking,
    diagramTracking
    popupMenuTracking,
  ]
};