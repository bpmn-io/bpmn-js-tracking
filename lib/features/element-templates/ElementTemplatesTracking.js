export default class ElementTemplatesTracking {
  constructor(eventBus, bpmnJSTracking, selection) {
    this._eventBus = eventBus;
    this._bpmnJSTracking = bpmnJSTracking;
    this._selection = selection;

    this._eventBus.on('elementTemplates.select', this.trackTemplateSelect.bind(this));
    this._eventBus.on('elementTemplates.update', this.trackTemplateUpdate.bind(this));
    this._eventBus.on('elementTemplates.unlink', this.trackTemplateUnlink.bind(this));
    this._eventBus.on('elementTemplates.remove', this.trackTemplateRemove.bind(this));
  }

  trackTemplateSelect(e) {
    const { element } = e;

    this._bpmnJSTracking.track({
      name: 'elementTemplates.select',
      data: {
        element
      }
    });
  }

  trackTemplateUpdate(e) {
    const { element, newTemplate } = e;

    this._bpmnJSTracking.track({
      name: 'elementTemplates.update',
      data: {
        element,
        newTemplate
      }
    });
  }

  trackTemplateUnlink(e) {
    const { element } = e;

    this._bpmnJSTracking.track({
      name: 'elementTemplates.unlink',
      data: {
        element
      }
    });
  }

  trackTemplateRemove(e) {
    const { element } = e;

    this._bpmnJSTracking.track({
      name: 'elementTemplates.remove',
      data: {
        element
      }
    });
  }

}

ElementTemplatesTracking.$inject = [
  'eventBus',
  'bpmnJSTracking',
  'selection'
];
