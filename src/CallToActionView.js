import React, { useCallback, useContext, useEffect, useRef } from "react";
import {
  findNodeHandle,
  Platform,
  requireNativeComponent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeAdContext } from "./context";
import { TouchableOpacity } from "react-native-gesture-handler";
const CallToActionView = ({
  style,
  allowFontScaling = true,
  textStyle,
  allCaps,
  buttonAndroidStyle,
}) => {
  const { nativeAd, nativeAdView } = useContext(NativeAdContext);
  const callToActionRef = useRef();
  const _onLayout = useCallback(() => {
    if (!nativeAdView) return;

    nativeAdView.setNativeProps({
      callToAction: findNodeHandle(callToActionRef.current),
    });
  }, [nativeAdView, callToActionRef]);

  useEffect(() => {
    _onLayout();
  }, [nativeAd, nativeAdView]);

  const renderText = (
    <Text allowFontScaling={allowFontScaling} style={textStyle}>
      {nativeAd
        ? allCaps
          ? nativeAd.callToAction?.toUpperCase()
          : nativeAd.callToAction
        : null}
    </Text>
  );

  return (
    <View style={styles.container}>
      <ButtonView
        style={style}
        activeOpacity={0.85}
        buttonAndroidStyle={
          Platform.OS === "android" ? buttonAndroidStyle : null
        }
        ref={callToActionRef}
        onLayout={_onLayout}
      >
        {Platform.OS !== "android" && renderText}
      </ButtonView>

      {Platform.OS === "android" && (
        <View
          style={[
            styles.textwrapper,
            {
              elevation: 0,
            },
          ]}
          pointerEvents="none"
        >
          {renderText}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textwrapper: {
    position: "absolute",
    zIndex: 10,
  },
});

const ButtonView = TouchableOpacity;

export default CallToActionView;
