import contextPadTracking from './contextPad';
import paletteTracking from './palette';
import popupMenuTracking from './popupMenu';
import selectionTracking from './selection';

export default {
  __depends__: [
    contextPadTracking,
    paletteTracking,
    popupMenuTracking,
    selectionTracking
  ]
};