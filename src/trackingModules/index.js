import paletteTracking from './palette';
import popupMenuTracking from './popupMenu';
import selectionTracking from './selection';

export default {
  __depends__: [
    paletteTracking,
    popupMenuTracking,
    selectionTracking
  ]
};