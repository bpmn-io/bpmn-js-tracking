export function isTrackingModuleEnabled(config, module) {

  // if no config, is allowed
  if (! config) {
    return true;
  }

  // if in blacklist, module is not allowed
  if (config.blacklist && config.blacklist.indexOf(module) !== -1) {
    return false;
  }

  // if whitelist is not set, module is allowed
  // if whitelist is set, module is allowed if it is in the list
  return !config.whitelist || config.whitelist.indexOf(module) !== -1;
}