import { getEventType } from '../Util';

export default class ContextPadTracking {
  constructor(eventBus, bpmnJSTracking, selection) {
    this._eventBus = eventBus;
    this._bpmnJSTracking = bpmnJSTracking;
    this._selection = selection;

    this._eventBus.on('contextPad.trigger', this.trackTrigger.bind(this));
  }

  trackTrigger(e) {
    const { entry, event } = e;
    const { target } = event;

    const entryAction = target.getAttribute('data-action');

    const type = getEventType(event);

    this._bpmnJSTracking.track({
      name: 'contextPad.trigger',
      data: {
        entryId: entryAction,
        entryGroup: entry.group || 'default',
        entryTitle: entry.title,
        selection: this._selection.get(),
        triggerType: type
      }
    });
  }
}

ContextPadTracking.$inject = [
  'eventBus',
  'bpmnJSTracking',
  'selection'
];
