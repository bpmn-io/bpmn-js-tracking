import contextPadTracking from './context-pad';
import elementTemplates from './element-templates';
import feelPopupTracking from './feel-popup';
import modelingTracking from './modeling';
import paletteTracking from './palette';
import popupMenuTracking from './popup-menu';
import refactoringsTracking from './refactorings';
import selectionTracking from './selection';

export default {
  __depends__: [
    contextPadTracking,
    elementTemplates,
    feelPopupTracking,
    modelingTracking,
    paletteTracking,
    popupMenuTracking,
    refactoringsTracking,
    selectionTracking
  ]
};