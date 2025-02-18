import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <LottieView
          source={require("../assets/animations/stocks.json")} // Your Lottie file
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.title}>GenAI Financial Assistant</Text>
        <Text style={styles.subtitle}>
          Smarter investing, personalized for you.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.secondaryButtonText}>
            I ALREADY HAVE AN ACCOUNT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between", padding: 24, backgroundColor: "#F5F0E6" },
  innerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  animation: { width: 200, height: 200,}, // Adjust size as needed
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#3A3A3A", marginBottom: 5 },
  subtitle: { fontSize: 16, color: "#7f8c8d", textAlign: "center", marginBottom: 30 },
  buttonContainer: { paddingBottom: 20 },
  button: { backgroundColor: "#2E4A3D", paddingVertical: 14, borderRadius: 10, alignItems: "center", marginBottom: 15 },
  buttonText: { color: "#F5F0E6", fontSize: 16, fontWeight: "bold" },
  secondaryButton: { paddingVertical: 14, borderRadius: 10, borderWidth: 1, borderColor: "#2E4A3D", alignItems: "center" },
  secondaryButtonText: { color: "#2E4A3D", fontSize: 16, fontWeight: "bold" },
});

export default WelcomeScreen;
