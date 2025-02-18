import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import StepIndicator from "react-native-step-indicator";

const labels = ["Processing", "Analyzing", "Generating", "Done"];
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#4CAF50",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#4CAF50",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#4CAF50",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#4CAF50",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ff9800",
  stepIndicatorLabelFontSize: 14,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: "#ffffff",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#666666",
  labelSize: 13,
  currentStepLabelColor: "#4CAF50",
};

export default function RecommendationScreen({ route, navigation }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (route.params?.submitted) {
      let step = 0;
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < labels.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval); // Stop interval when reaching the last step
            return prev;
          }
        });
      }, 1500);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [route.params?.submitted]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Stock & Asset Recommendations</Text>

      {/* Centering Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Enter Your Details"
          onPress={() => navigation.navigate("Details")}
          color="#4CAF50"
        />
      </View>

      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentStep}
        labels={labels}
        stepCount={labels.length} // Ensure only 4 steps are shown
        direction="vertical"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start", // Align everything to the left
    justifyContent: "flex-start", // Start from the top
    backgroundColor: "#f8f9fa",
    paddingLeft: 20, // Ensure space from the left
    paddingTop: 20,
    width: "100%", // Takes full width
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center", // Centers text inside the element
    alignSelf: "center", // Centers the heading within the parent view
    width: "100%", // Ensures full-width so text-align works properly
  },
  buttonContainer: {
    alignSelf: "center", // Centers the button on the screen
  },
});
