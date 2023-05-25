# bpmn-js-tracking

An extension for [bpmn-js](https://github.com/bpmn-io/bpmn-js) to track user interaction.


## Installation

Install via [npm](http://npmjs.com/).

```
npm install bpmn-js-tracking
```


## Usage

Add as additional module to [bpmn-js](https://github.com/bpmn-io/bpmn-js).

```javascript
import {
  BpmnJSTracking,
  BpmnJSTrackingModules
 } from 'bpmn-js-tracking';

const bpmnJS = new BpmnJS({
  additionalModules: [
    BpmnJSTracking,
    BpmnJSTrackingModules
  ]
})

const bpmnJsTracking = bpmnJS.get('bpmnJsTracking');

bpmnJsTracking.on('tracking.enabled', function(event) {
  // opt into tracking platform
});

bpmnJsTracking.on('tracking.event', function(event) {
  // send to tracking platform
  // event: { name, data }
});

bpmnJsTracking.on('tracking.disabled', function(event) {
  //  opt out of tracking platform
});
```

Alternatively, you can import specific tracking modules:

```javascript
import popupMenuTracking from 'bpmn-js-tracking/lib/features/popup-menu';
```

## Tracked events

### Context pad events

| Event Name | Structure |
| :--- | :--- |
| `contextPad.trigger`| <ul><li>entryId</li><li>entryGroup</li><li>entryTitle</li><li>selection</li><li>triggerType: ["click", "drag", "keyboard"]</li></ul>|

### Modeling events

| Event Name | Structure |
| :--- | :--- |
| `modeling.appendElement`| <ul><li>element</li><li>sourceElement</li></ul>|
| `modeling.createElements`| <ul><li>elements</li></ul>|
| `modeling.replaceElement`| <ul><li>oldElement</li><li>newElement</li></ul>|

### Palette events

| Event Name | Structure |
| :--- | :--- |
| `palette.trigger`| <ul><li>entryId</li><li>entryGroup</li><li>entryTitle</li><li>selection</li><li>triggerType: ["click", "drag", "keyboard"]</li></ul>|
### Popup menu events

| Event Name | Structure |
| :--- | :--- |
| `popupMenu.open`| <ul><li>selection</li></ul>|
| `popupMenu.trigger`| <ul><li>entryId</li><li>entryGroup</li><li>entryLabel</li><li>triggerType: ["click", "drag", "keyboard"]</li></ul>|

### Selection events

| Event Name | Structure |
| :--- | :--- |
| `selection.select`| <ul><li>oldSelection</li><li>newSelection</li></ul>|