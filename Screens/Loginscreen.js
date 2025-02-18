import React, { useState, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import {
  View,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableOpacity,
  TextInput as RNTextInput,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { StatusBar } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState(route.params?.email || "");
  const [password, setPassword] = useState("");
  const [otpVerified, setOtpVerified] = useState(
    route.params?.otpVerified || false
  );
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showAnimation, setShowAnimation] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (route?.params?.email) {
      setEmail(route.params.email);
    }
    if (route?.params?.otpVerified) {
      setOtpVerified(true);
    }
    if (route?.params?.showOtpModal && !showOtpModal) {
      setShowOtpModal(true);
    }
    setPassword("");
  }, [
    route?.params?.email,
    route?.params?.otpVerified,
    route?.params?.showOtpModal,
  ]);

  useEffect(() => {
    if (showOtpModal) {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("#F5F0E6");
      StatusBar.setTranslucent(false);
    } else {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("#F5F0E6");
      StatusBar.setTranslucent(false);
    }
  }, [showOtpModal]);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const [showOtpButton, setShowOtpButton] = useState(
    validateEmail(email) && !otpVerified
  );

  const handleEmailChange = (value) => {
    setEmail(value);
    setShowOtpButton(validateEmail(value) && !otpVerified);
  };

  const handleVerifyOtp = async () => {
    navigation.navigate("OtpAnimationScreen", { email }); // Navigate to animation screen first

    try {
      const response = await fetch("http://192.168.1.11:5005/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", "An error occurred while sending the OTP");
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === "Backspace") {
      if (index === 0 && otp[0] === "") {
        setOtp(["", "", "", ""]);
      } else if (otp[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
          const newOtp = [...otp];
          newOtp[index - 1] = "";
          setOtp(newOtp);
        }
      }
    }
  };

  const handleVerifyOtpSubmission = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      Alert.alert("Error", "Please enter a valid 4-digit OTP");
      return;
    }
    try {
      const response = await fetch("http://192.168.1.11/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setOtpVerified(true);
        setShowOtpModal(false);
        setShowOtpButton(false);
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while verifying the OTP");
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    setShowAnimation(true);

    setTimeout(() => {
      setShowAnimation(false);
      navigation.replace("DashboardScreen");
    }, 1000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {showAnimation ? (
          <View style={styles.animationContainer}>
            <LottieView
              source={require("../assets/animations/Animation - 1739111906766.json")}
              autoPlay
              loop={false}
              style={styles.animation}
            />
          </View>
        ) : (
          <View style={styles.innerContainer}>
            <LottieView
              source={require("../assets/animations/Animation - 1739111906766.json")} // Add your character animation here
              autoPlay
              loop
              style={styles.characterAnimation}
            />
            <Text style={styles.title}>Welcome Back</Text>
            <TextInput
              label="Email"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              theme={{ colors: { primary: "#3A3A3A" } }}
            />
            {otpVerified && <Text style={styles.verifiedText}>✔ Verified</Text>}

            {showOtpButton && (
              <Button
                mode="outlined"
                onPress={handleVerifyOtp}
                style={styles.otpButton}
                labelStyle={styles.otpButtonText}
              >
                {loading ? "Sending..." : "Verify OTP"}
              </Button>
            )}

            {!otpVerified && !validateEmail(email) && (
              <Text style={styles.errorText}>
                Please enter a valid email address.
              </Text>
            )}

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              theme={{ colors: { primary: "#3A3A3A" } }}
            />
            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              Login
            </Button>

            <Modal visible={showOtpModal} transparent>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.title}>Enter OTP</Text>
                  <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                      <RNTextInput
                        key={index}
                        style={[
                          styles.otpInput,
                          digit ? styles.filledInput : null,
                        ]}
                        value={digit}
                        onChangeText={(value) => handleOtpChange(value, index)}
                        onKeyPress={(event) => handleKeyPress(event, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                      />
                    ))}
                  </View>
                  <Text style={styles.infoText}>
                    OTP has been sent to your email.
                  </Text>
                  <Button mode="contained" onPress={handleVerifyOtpSubmission}>
                    Verify OTP
                  </Button>
                  <TouchableOpacity onPress={() => setShowOtpModal(false)}>
                    <Text style={styles.closeButton}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Text
              style={styles.register}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              Don't have an account?{" "}
              <Text style={styles.registerBold}>Sign Up</Text>
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F5F0E6",
  },
  innerContainer: {
    alignItems: "center",
  },
  animationContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  characterAnimation: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "center",
    marginBottom: 30,
    color: "#3A3A3A",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#F9F6F1",
    borderRadius: 10,
    width: "100%",
  },
  otpButton: {
    marginBottom: 15,
  },
  otpButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E4A3D",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#3A3A3A",
    marginBottom: 15,
  },
  otpInput: {
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  closeButton: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "500",
    color: "#8B0000",
    textAlign: "center",
  },
  verifiedText: {
    color: "green",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#2E4A3D",
    paddingVertical: 10,
    borderRadius: 10,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 11,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F5F0E6",
  },
  register: {
    marginTop: 20,
    textAlign: "center",
    color: "#3A3A3A",
    fontSize: 14,
  },
  registerBold: {
    fontWeight: "bold",
    color: "#2E4A3D",
  },
});

export default LoginScreen;
