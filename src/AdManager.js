import {NativeModules} from 'react-native';

const RNAdmobNativeAdsManager = NativeModules.RNAdmobNativeAdsManager;

async function setRequestConfiguration(config) {
  return RNAdmobNativeAdsManager.setRequestConfiguration(config);
}

async function isTestDevice() {
  return RNAdmobNativeAdsManager.isTestDevice();
}

export default {
  setRequestConfiguration,
  isTestDevice
}
