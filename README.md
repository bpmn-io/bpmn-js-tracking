> This extension is a work in progress.

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

## Tracked events

### Diagram events

| Event Name | Structure |
| :--- | :--- |
| `diagram.select`| <ul><li>oldSelection</li><li>newSelection</li></ul>|

### Controls Events

| Event Name | Structure |
| :--- | :--- |
| `controls.popupMenu.open`| <ul><li>selection</li></ul>|
| `controls.popupMenu.trigger`| <ul><li>triggerType: ["click", "drag", "keyboard"]</li><li>entryLabel</li></ul>|
