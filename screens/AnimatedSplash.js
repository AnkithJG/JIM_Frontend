import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";


import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  sequence,
  Easing,
  withDelay
} from "react-native-reanimated";

const { height } = Dimensions.get("window");

export default function AnimatedSplash({ onContinue }) {
  const imageScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    imageScale.value = withTiming(1, {
      duration: 700,
      easing: Easing.bounce,
    });

    textOpacity.value = withDelay(
      500,
      withTiming(1, {
        duration: 500,
        easing: Easing.linear,
      })
    );
  }, []);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <Pressable style={styles.container} onPress={onContinue}>
      <Animated.Image
        source={require("../assets/copy.png")}
        style={[{ width: '100%', height: 130, resizeMode: 'contain' }, imageStyle]}
      />
      <Animated.Text style={[styles.text, textStyle]}>
        Tap anywhere to continue
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff5b7a",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#444",
    fontWeight: "500",
    marginTop: 20,     
    marginLeft: 20,    
  },
});
