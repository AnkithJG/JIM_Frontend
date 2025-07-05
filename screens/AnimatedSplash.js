import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");

export default function AnimatedSplash({ onContinue }) {
  const logoScale = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(logoScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 80,
      }),
      Animated.timing(textFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Pressable style={styles.container} onPress={onContinue}>
      <Animated.Image
        source={require("../assets/copy.png")}
        style={[
          { width: '100%', height: 115, resizeMode: 'contain' },
          { transform: [{ scale: logoScale }] },
        ]}
        resizeMode="contain"
      />
      <Animated.Text style={[styles.text, { opacity: textFade }]}>
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
