import contextPadTracking from './context-pad';
import elementTemplates from './element-templates';
import modelingTracking from './modeling';
import paletteTracking from './palette';
import popupMenuTracking from './popup-menu';
import selectionTracking from './selection';

export default {
  __depends__: [
    contextPadTracking,
    elementTemplates,
    modelingTracking,
    paletteTracking,
    popupMenuTracking,
    selectionTracking
  ]
};