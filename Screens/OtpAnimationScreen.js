import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";

const OtpAnimationScreen = ({ navigation, route }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("LoginScreen", {
        showOtpModal: true,
        email: route.params.email,
      });
    }, 1200);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/animations/character_animation.json")}
        autoPlay
        loop={false}
        style={styles.animation}
      />
      <Text style={styles.text}>Sending OTP...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F0E6",
  },
  animation: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
});

export default OtpAnimationScreen;
