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
import BpmnJSTracking from 'bpmn-js-tracking';

const bpmnJS = new BpmnJS({
  additionalModules: [
    BpmnJSTracking
  ]
})
```
## Configuration
Customize this extension via the bpmnJSTracking config:

| Property | | Description |
| :--- | :--- |:--- |
| `track` | optional | Callback to send events to tracking tool |

## Tracked events

### Canvas Events

| Event Name | Structure |
| :--- | :--- |
| `canvas.contextPad.click` <br> `canvas.contextPad.dragstart`| <ul><li>name</li><li>data-action</li><li>selection</li></ul>|
| `canvas.palette.click` <br> `canvas.palette.dragstart`| <ul><li>name</li><li>data-action</li><li>selection</li></ul>|
| `canvas.popupMenu.click` | <ul><li>name</li><li>data-id</li><li>selection</li></ul>|

