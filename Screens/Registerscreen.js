import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button, Text, IconButton } from "react-native-paper";

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const [secureVerifyPassword, setSecureVerifyPassword] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password || !verifyPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    } else {
      setEmailError("");
    }
    if (password !== verifyPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    Alert.alert("Success", "Registration Successful");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.title}>Create an Account</Text>
        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          theme={{ colors: { primary: "#3A3A3A" } }}
        />
        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          theme={{ colors: { primary: "#3A3A3A" } }}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (!validateEmail(text)) {
              setEmailError("Invalid email format");
            } else {
              setEmailError("");
            }
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          theme={{ colors: { primary: "#3A3A3A" } }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={securePassword}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={securePassword ? "eye-off" : "eye"}
              onPress={() => setSecurePassword(!securePassword)}
            />
          }
          theme={{ colors: { primary: "#3A3A3A" } }}
        />
        <TextInput
          label="Verify Password"
          value={verifyPassword}
          onChangeText={setVerifyPassword}
          secureTextEntry={secureVerifyPassword}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={secureVerifyPassword ? "eye-off" : "eye"}
              onPress={() => setSecureVerifyPassword(!secureVerifyPassword)}
            />
          }
          theme={{ colors: { primary: "#3A3A3A" } }}
        />
        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Register
        </Button>
        <Text
          style={styles.login}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          Already have an account? <Text style={styles.loginBold}>Login</Text>
        </Text>
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
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#2E4A3D",
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F5F0E6",
  },
  login: {
    marginTop: 20,
    textAlign: "center",
    color: "#3A3A3A",
    fontSize: 14,
  },
  loginBold: {
    fontWeight: "bold",
    color: "#2E4A3D",
  },
});

export default RegisterScreen;




// import React, { useState, useEffect, useRef } from "react";
// import LottieView from "lottie-react-native";
// import {
//   View,
//   StyleSheet,
//   Alert,
//   Keyboard,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
//   Platform,
//   Modal,
//   TouchableOpacity,
//   TextInput as RNTextInput,
// } from "react-native";
// import { TextInput, Button, Text } from "react-native-paper";
// import { StatusBar } from "react-native";
// import { getStatusBarHeight } from "react-native-status-bar-height";

// const LoginScreen = ({ navigation, route }) => {
//   const [email, setEmail] = useState(route.params?.email || "");
//   const [password, setPassword] = useState("");
//   const [otpVerified, setOtpVerified] = useState(
//     route.params?.otpVerified || false
//   );
//   const [loading, setLoading] = useState(false);
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [showAnimation, setShowAnimation] = useState(false);
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     if (route?.params?.email) {
//       setEmail(route.params.email);
//     }
//     if (route?.params?.otpVerified) {
//       setOtpVerified(true); // Set OTP verified flag
//     }
//     setPassword(""); // Clear password when navigating back
//   }, [route?.params?.email, route?.params?.otpVerified]);

//   useEffect(() => {
//     if (showOtpModal) {
//       // Blending the status bar with the background of the modal
//       StatusBar.setBarStyle("dark-content"); // Set dark content for light background
//       StatusBar.setBackgroundColor("#F5F0E6"); // Set it to the modal's background color
//       StatusBar.setTranslucent(false); // Make it non-translucent
//     } else {
//       StatusBar.setBarStyle("dark-content"); // Set dark content for normal background
//       StatusBar.setBackgroundColor("#F5F0E6"); // This should match your default screen background
//       StatusBar.setTranslucent(false); // Make it non-translucent when modal is closed
//     }
//   }, [showOtpModal]);

//   const validateEmail = (value) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(value);
//   };

//   const [showOtpButton, setShowOtpButton] = useState(
//     validateEmail(email) && !otpVerified
//   );

//   const handleEmailChange = (value) => {
//     setEmail(value);
//     setShowOtpButton(validateEmail(value) && !otpVerified);
//   };

//   const handleVerifyOtp = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://192.168.1.16:3000/send-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();
//       if (response.status === 200) {
//         setShowOtpModal(true);
//       } else {
//         Alert.alert("Error", data.message);
//       }
//     } catch (error) {
//       console.log("Error:", error);
//       Alert.alert("Error", "An error occurred while sending the OTP");
//     } finally {
//       setLoading(false); // Stop loading once the API call is complete
//     }
//   };

//   const handleOtpChange = (value, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 3) {
//       inputRefs.current[index + 1].focus();
//     }
//   };
//   const handleKeyPress = (event, index) => {
//     if (event.nativeEvent.key === "Backspace") {
//       if (index === 0 && otp[0] === "") {
//         // If first input is empty, clear all OTP fields instantly
//         setOtp(["", "", "", ""]);
//       } else if (otp[index] === "") {
//         // Move focus to previous input and clear it
//         if (index > 0) {
//           inputRefs.current[index - 1].focus();
//           const newOtp = [...otp];
//           newOtp[index - 1] = "";
//           setOtp(newOtp);
//         }
//       }
//     }
//   };
//   const handleVerifyOtpSubmission = async () => {
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length < 4) {
//       Alert.alert("Error", "Please enter a valid 4-digit OTP");
//       return;
//     }
//     try {
//       const response = await fetch("http://192.168.1.16:3000/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp: enteredOtp }),
//       });
//       const data = await response.json();
//       if (response.status === 200) {
//         Alert.alert("Success", "OTP Verified Successfully!");
//         setOtpVerified(true);
//         setShowOtpModal(false);
//         setShowOtpButton(false);
//       } else {
//         Alert.alert("Error", data.message);
//       }
//     } catch (error) {
//       Alert.alert("Error", "An error occurred while verifying the OTP");
//     }
//   };
//   const handleLogin = () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please enter both email and password");
//       return;
//     }
//     setShowAnimation(true); // Show animation first

//     setTimeout(() => {
//       setShowAnimation(false);
//       navigation.replace("Home"); // Navigate after animation
//     }, 1000);
//     // Alert.alert("Success", "Login Successful");
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.container}
//       >
//         {/* If animation is playing, show animation instead of login form */}
//         {showAnimation ? (
//           <View style={styles.animationContainer}>
//             <LottieView
//               source={require("../assets/animations/Animation - 1739111906766.json")} // Lottie animation
//               autoPlay
//               loop={false}
//               style={{ width: 250, height: 250 }}
//             />
//           </View>
//         ) : (
//           <View>
//             <Text style={styles.title}>Welcome Back</Text>
//             <TextInput
//               label="Email"
//               value={email}
//               onChangeText={handleEmailChange}
//               keyboardType="email-address"
//               autoCapitalize="none"
//               style={styles.input}
//               theme={{ colors: { primary: "#3A3A3A" } }}
//             />
//             {otpVerified && <Text style={styles.verifiedText}>✔ Verified</Text>}

//             {showOtpButton && (
//               <Button
//                 mode="outlined"
//                 onPress={handleVerifyOtp}
//                 style={styles.otpButton}
//                 labelStyle={styles.otpButtonText}
//               >
//                 {loading ? "Sending..." : "Verify OTP"}
//               </Button>
//             )}

//             {!otpVerified && !validateEmail(email) && (
//               <Text style={styles.errorText}>
//                 Please enter a valid email address.
//               </Text>
//             )}

//             <TextInput
//               label="Password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//               style={styles.input}
//               theme={{ colors: { primary: "#3A3A3A" } }}
//             />
//             <Button
//               mode="contained"
//               onPress={handleLogin}
//               style={styles.button}
//               labelStyle={styles.buttonText}
//             >
//               Login
//             </Button>

//             <Modal visible={showOtpModal} animationType="slide" transparent>
//               <View style={styles.modalContainer}>
//                 <View style={styles.modalContent}>
//                   <Text style={styles.title}>Enter OTP</Text>
//                   <View style={styles.otpContainer}>
//                     {otp.map((digit, index) => (
//                       <RNTextInput
//                         key={index}
//                         style={[
//                           styles.otpInput,
//                           digit ? styles.filledInput : null,
//                         ]}
//                         value={digit}
//                         onChangeText={(value) => handleOtpChange(value, index)}
//                         onKeyPress={(event) => handleKeyPress(event, index)}
//                         keyboardType="numeric"
//                         maxLength={1}
//                         ref={(ref) => (inputRefs.current[index] = ref)}
//                       />
//                     ))}
//                   </View>
//                   <Text style={styles.infoText}>
//                     OTP has been sent to your email.
//                   </Text>
//                   <Button mode="contained" onPress={handleVerifyOtpSubmission}>
//                     Verify OTP
//                   </Button>
//                   <TouchableOpacity onPress={() => setShowOtpModal(false)}>
//                     <Text style={styles.closeButton}>Close</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </Modal>
//             <Text
//               style={styles.register}
//               onPress={() => navigation.navigate("RegisterScreen")}
//             >
//               Don't have an account?{" "}
//               <Text style={styles.registerBold}>Sign Up</Text>
//             </Text>
//           </View>
//         )}
//       </KeyboardAvoidingView>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 24,
//     backgroundColor: "#F5F0E6",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     fontFamily: "serif",
//     textAlign: "center",
//     marginBottom: 30,
//     color: "#3A3A3A",
//   },
//   input: {
//     marginBottom: 15,
//     backgroundColor: "#F9F6F1",
//     borderRadius: 10,
//   },
//   otpButton: {
//     // borderColor: "#2E4A3D",
//     // borderWidth: 1.5,
//     // paddingVertical: 8,
//     // borderRadius: 10,
//     marginBottom: 15,
//   },
//   otpButtonText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#2E4A3D",
//   },

//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)", // Slightly softened black overlay
//   },
//   modalContent: {
//     backgroundColor: "white", // Muted beige (old-money luxury feel)
//     padding: 20,
//     borderRadius: 10,
//     width: "80%",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 5, // Soft shadow for a premium feel
//   },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
//   infoText: {
//     fontSize: 14,
//     color: "#3A3A3A",
//     marginBottom: 15,
//   },
//   otpInput: {
//     width: 50,
//     height: 50,
//     textAlign: "center",
//     fontSize: 20,
//     fontWeight: "500", // Gives a refined look
//     // color: "#4A4A4A", // Dark grey for a timeless feel
//     borderWidth: 1,
//     // borderColor: "#C2B280", // Soft gold/taupe border
//     borderRadius: 5,
//     // backgroundColor: "#FAF9F6", // Off-white for an elegant touch
//     marginHorizontal: 5, // Adds space between OTP boxes
//   },
//   closeButton: {
//     marginTop: 15,
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#8B0000", // Deep red, refined and subtle
//     textAlign: "center",
//   },
//   verifiedText: {
//     color: "green",
//     fontSize: 14,
//     fontWeight: "bold",
//     marginTop: 5,
//     marginBottom: 10,
//     alignSelf: "flex-start",
//   },
//   button: {
//     marginTop: 10,
//     backgroundColor: "#2E4A3D",
//     paddingVertical: 10,
//     borderRadius: 10,
//   },
//   errorText: {
//     color: "red",
//     fontSize: 12,
//     textAlign: "center",
//     marginBottom: 11,
//   },

//   buttonText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#F5F0E6",
//   },
//   register: {
//     marginTop: 20,
//     textAlign: "center",
//     color: "#3A3A3A",
//     fontSize: 14,
//   },
//   registerBold: {
//     fontWeight: "bold",
//     color: "#2E4A3D",
//   },
// });

// export default LoginScreen;