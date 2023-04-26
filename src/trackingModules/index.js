import contextPadTracking from './contextPad';
import modelingTracking from './modeling';
import paletteTracking from './palette';
import popupMenuTracking from './popupMenu';
import selectionTracking from './selection';

export default {
  __depends__: [
    contextPadTracking,
    modelingTracking,
    paletteTracking,
    popupMenuTracking,
    selectionTracking
  ]
};