# Changelog

All notable changes to [@bpmn-io/bpmn-js-tracking](https://github.com/bpmn-io/bpmn-js-tracking) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

## 0.6.0

* `FEAT`: track `@bpmn-io/refactorings` ([#40](https://github.com/bpmn-io/bpmn-js-tracking/pull/40))

## 0.5.0

* `FEAT`: do not track process meta-data

### Breaking Changes

* Only a limited set of properties from elements are submitted to the tracking backend. This ensures no sensitive information is submitted.

## 0.4.0

* `FEAT`: track popup menu usage

## 0.3.3

* `FIX`: check for empty events in `contextPad.trigger` and `palette.trigger`

## 0.3.2

* `FIX`: correctly retrieve `data-action` from palette and context pad entries

## 0.3.1

* `FIX`: include `elementTemplatesTracking` module in `BpmnJSTrackingModules` ([#33](https://github.com/bpmn-io/bpmn-js-tracking/pull/33))

## 0.3.0

* `FEAT`: handle invalid events ([#27](https://github.com/bpmn-io/bpmn-js-tracking/pull/27))
* `FEAT`: add tracking for `elementTemplates.select`, `elementTemplates.update`, `elementTemplates.remove`, `elementTemplates.unlink` events ([#29](https://github.com/bpmn-io/bpmn-js-tracking/pull/29))

## 0.2.0

* `FIX`: correctly retrieve entry id from `popupMenu.trigger` events ([#23](https://github.com/bpmn-io/bpmn-js-tracking/pull/23))
* `CHORE`: do not bundle library ([#24](https://github.com/bpmn-io/bpmn-js-tracking/pull/24))
* `CHORE`: rename `trackingModules` dir to `features` ([#26](https://github.com/bpmn-io/bpmn-js-tracking/pull/26))
* `DEPS`: update to `bpmn-js@13.0.5`

### Breaking Changes

* CJS and ESM bundles are no longer exported. Instead, modules are exposed in `@bpmn-io/bpmn-js-tracking/lib`.

## 0.1.0

__Initial release__
