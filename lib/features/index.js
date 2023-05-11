import contextPadTracking from './context-pad';
import modelingTracking from './modeling';
import paletteTracking from './palette';
import popupMenuTracking from './popup-menu';
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