// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useRoute } from "@react-navigation/native";

// const OTPVerificationScreen = ({ navigation }) => {
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const inputRefs = useRef([]);
//   const route = useRoute();
//   const email = route.params?.email || "";

//   const handleOtpChange = (value, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Move focus to next input
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

//   const handleVerifyOtp = async () => {
//     const enteredOtp = otp.join(""); // Concatenate the OTP digits into one string
//     if (enteredOtp.length < 4) {
//       alert("Please enter a valid 4-digit OTP");
//       return;
//     }

//     try {
//       // Send OTP to your backend for verification
//       const response = await fetch("http://192.168.1.9:3000/verify-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email, // Replace with the actual email from navigation params
//           otp: enteredOtp,
//         }),
//       });

//       const data = await response.json();

//       if (response.status === 200) {
//         alert("OTP Verified Successfully!");
//         navigation.reset({
//         index: 0,
//         routes: [{ name: "LoginScreen", params: { email: navigation.getParam("email", ""), // Get email from navigation params
//  otpVerified: true } }],
//       }); // Navigate to the Home screen after successful verification
//       } else {
//         alert(data.message || "OTP verification failed");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       alert("An error occurred while verifying the OTP");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>WELCOME TO LOGO</Text>
//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             style={[styles.otpInput, digit ? styles.filledInput : null]}
//             value={digit}
//             onChangeText={(value) => handleOtpChange(value, index)}
//             onKeyPress={(event) => handleKeyPress(event, index)}
//             keyboardType="numeric"
//             maxLength={1}
//             ref={(ref) => (inputRefs.current[index] = ref)}
//           />
//         ))}
//       </View>
//       <Text style={styles.infoText}>OTP has been sent to your email.</Text>
//       <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
//         <Text style={styles.verifyText}>Verify OTP</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5F0E6",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "600",
//     fontFamily: "serif",
//     color: "#3A3A3A",
//     marginBottom: 20,
//   },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: 10,
//     marginBottom: 15,
//   },
//   otpInput: {
//     width: 50,
//     height: 50,
//     borderWidth: 1.5,
//     borderColor: "#C2C2C2",
//     borderRadius: 8,
//     textAlign: "center",
//     fontSize: 20,
//     backgroundColor: "#F9F6F1",
//     color: "#3A3A3A",
//   },
//   filledInput: {
//     borderColor: "#2E4A3D",
//   },
//   infoText: {
//     fontSize: 14,
//     color: "#3A3A3A",
//     marginBottom: 20,
//   },
//   verifyButton: {
//     backgroundColor: "#000",
//     paddingVertical: 12,
//     width: "80%",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   verifyText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default OTPVerificationScreen;


// // import React, { useState, useRef } from "react";
// // import {
// //   View,
// //   StyleSheet,
// //   Alert,
// //   Keyboard,
// //   TouchableWithoutFeedback,
// //   KeyboardAvoidingView,
// //   Platform,
// //   Modal,
// //   TouchableOpacity,
// //   TextInput as RNTextInput,
// // } from "react-native";
// // import { TextInput, Button, Text } from "react-native-paper";

// // const LoginScreen = ({ navigation, route }) => {
// //   const [email, setEmail] = useState(route.params?.email || "");
// //   const [password, setPassword] = useState("");
// //   const [otpVerified, setOtpVerified] = useState(
// //     route.params?.otpVerified || false
// //   );
// //   const [loading, setLoading] = useState(false);
// //   const [showOtpModal, setShowOtpModal] = useState(false);
// //   const [otp, setOtp] = useState(["", "", "", ""]);
// //   const inputRefs = useRef([]);

// //   const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
// //   const [showOtpButton, setShowOtpButton] = useState(validateEmail(email));

// //   const handleEmailChange = (value) => {
// //     setEmail(value);
// //     setShowOtpButton(validateEmail(value));
// //   };

// //   const handleVerifyOtp = async () => {
// //     if (!email) {
// //       Alert.alert("Error", "Please enter a valid email address");
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       const response = await fetch("http://192.168.1.9:3000/send-otp", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email }),
// //       });
// //       const data = await response.json();
// //       if (response.status === 200) {
// //         Alert.alert("OTP Verification", "OTP sent to your email.");
// //         setShowOtpModal(true);
// //       } else {
// //         Alert.alert("Error", data.message);
// //       }
// //     } catch (error) {
// //       Alert.alert("Error", "An error occurred while sending the OTP");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleOtpChange = (value, index) => {
// //     const newOtp = [...otp];
// //     newOtp[index] = value;
// //     setOtp(newOtp);
// //     if (value && index < 3) {
// //       inputRefs.current[index + 1].focus();
// //     }
// //   };

// //   const handleVerifyOtpSubmission = async () => {
// //     const enteredOtp = otp.join("");
// //     if (enteredOtp.length < 4) {
// //       Alert.alert("Error", "Please enter a valid 4-digit OTP");
// //       return;
// //     }
// //     try {
// //       const response = await fetch("http://192.168.1.9:3000/verify-otp", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, otp: enteredOtp }),
// //       });
// //       const data = await response.json();
// //       if (response.status === 200) {
// //         Alert.alert("Success", "OTP Verified Successfully!");
// //         setOtpVerified(true);
// //         setShowOtpModal(false);
// //       } else {
// //         Alert.alert("Error", data.message);
// //       }
// //     } catch (error) {
// //       Alert.alert("Error", "An error occurred while verifying the OTP");
// //     }
// //   };

// //   return (
// //     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
// //       <KeyboardAvoidingView
// //         behavior={Platform.OS === "ios" ? "padding" : "height"}
// //         style={styles.container}
// //       >
// //         <Text style={styles.title}>Welcome Back</Text>
// //         <TextInput
// //           label="Email"
// //           value={email}
// //           onChangeText={handleEmailChange}
// //           keyboardType="email-address"
// //           autoCapitalize="none"
// //           style={styles.input}
// //         />
// //         {otpVerified && <Text style={styles.verifiedText}>✔ Verified</Text>}
// //         {showOtpButton && (
// //           <Button
// //             mode="outlined"
// //             onPress={handleVerifyOtp}
// //             style={styles.otpButton}
// //           >
// //             {loading ? "Sending..." : "Verify OTP"}
// //           </Button>
// //         )}
// //         <TextInput
// //           label="Password"
// //           value={password}
// //           onChangeText={setPassword}
// //           secureTextEntry
// //           style={styles.input}
// //         />
// //         <Button
// //           mode="contained"
// //           onPress={() => Alert.alert("Success", "Login Successful")}
// //           style={styles.button}
// //         >
// //           Login
// //         </Button>

// //         <Modal visible={showOtpModal} animationType="slide" transparent>
// //           <View style={styles.modalContainer}>
// //             <View style={styles.modalContent}>
// //               <Text style={styles.title}>Enter OTP</Text>
// //               <View style={styles.otpContainer}>
// //                 {otp.map((digit, index) => (
// //                   <RNTextInput
// //                     key={index}
// //                     style={styles.otpInput}
// //                     value={digit}
// //                     onChangeText={(value) => handleOtpChange(value, index)}
// //                     keyboardType="numeric"
// //                     maxLength={1}
// //                     ref={(ref) => (inputRefs.current[index] = ref)}
// //                   />
// //                 ))}
// //               </View>
// //               <Button mode="contained" onPress={handleVerifyOtpSubmission}>
// //                 Verify OTP
// //               </Button>
// //               <TouchableOpacity onPress={() => setShowOtpModal(false)}>
// //                 <Text style={styles.closeButton}>Close</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </Modal>
// //       </KeyboardAvoidingView>
// //     </TouchableWithoutFeedback>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     padding: 24,
// //     backgroundColor: "#F5F0E6",
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     marginBottom: 20,
// //   },
// //   input: { marginBottom: 15, backgroundColor: "#F9F6F1", borderRadius: 10 },
// //   otpButton: { marginBottom: 15 },
// //   button: {
// //     marginTop: 10,
// //     backgroundColor: "#2E4A3D",
// //     paddingVertical: 10,
// //     borderRadius: 10,
// //   },
// //   modalContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "rgba(0,0,0,0.5)",
// //   },
// //   modalContent: {
// //     backgroundColor: "white",
// //     padding: 20,
// //     borderRadius: 10,
// //     width: "80%",
// //     alignItems: "center",
// //   },
// //   otpContainer: {
// //     flexDirection: "row",
// //     justifyContent: "center",
// //     marginBottom: 15,
// //   },
// //   otpInput: {
// //     width: 50,
// //     height: 50,
// //     textAlign: "center",
// //     fontSize: 20,
// //     borderWidth: 1,
// //     borderRadius: 5,
// //   },
// //   closeButton: { marginTop: 10, color: "red", textAlign: "center" },
// // });

// // export default LoginScreen;