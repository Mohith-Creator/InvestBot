import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";

export default function DetailsScreen({ navigation }) {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [timeHorizon, setTimeHorizon] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [debtLiability, setDebtLiability] = useState(false);
  const [debtAmount, setDebtAmount] = useState("");
  const [healthInsurance, setHealthInsurance] = useState("");
  const [taxConsiderations, setTaxConsiderations] = useState("");
  const [emergencyFund, setEmergencyFund] = useState("");
  const [futureGoals, setFutureGoals] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalTime, setGoalTime] = useState("");
  const [rebalancePortfolio, setRebalancePortfolio] = useState("");

  const togglePreference = (preference) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(
        selectedPreferences.filter((p) => p !== preference)
      );
    } else {
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };

  const addGoal = () => {
    if (goalName && goalAmount && goalTime) {
      setFutureGoals([...futureGoals, { goalName, goalAmount, goalTime }]);
      setGoalName("");
      setGoalAmount("");
      setGoalTime("");
    }
  };

  const handleSubmit = () => {
    const userDetails = {
      investmentAmount,
      selectedPreferences,
      timeHorizon,
      riskTolerance,
      debtLiability: debtLiability ? debtAmount : "No Debt",
      healthInsurance,
      taxConsiderations,
      emergencyFund,
      futureGoals,
      rebalancePortfolio,
    };

    console.log("User Data Submitted:", userDetails);

    navigation.navigate("Recommendation", { submitted: true, userDetails });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Investment Details</Text>

      {/* Investment Amount */}
      <View style={styles.card}>
        <Text style={styles.label}>Investment Amount per Month</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={investmentAmount}
          onChangeText={setInvestmentAmount}
        />
      </View>

      {/* Rebalance Portfolio */}
      <View style={styles.card}>
        <Text style={styles.label}>Rebalance Portfolio</Text>
        <Picker
          selectedValue={rebalancePortfolio}
          onValueChange={setRebalancePortfolio}
          style={styles.picker}
        >
          <Picker.Item label="Select Option" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
        </Picker>
      </View>

      {/* Investment Preferences */}
      <View style={styles.card}>
        <Text style={styles.label}>Investment Preferences</Text>
        {["Stocks", "Bonds", "Mutual Funds"].map((option) => (
          <View key={option} style={styles.checkboxContainer}>
            <Checkbox
              value={selectedPreferences.includes(option)}
              onValueChange={() => togglePreference(option)}
              color={selectedPreferences.includes(option) ? "#007bff" : "#ccc"}
            />
            <Text style={styles.checkboxLabel}>{option}</Text>
          </View>
        ))}
      </View>

      {/* Time Horizon */}
      <View style={styles.card}>
        <Text style={styles.label}>Time Horizon</Text>
        <Picker
          selectedValue={timeHorizon}
          onValueChange={setTimeHorizon}
          style={styles.picker}
        >
          <Picker.Item label="Select Time Horizon" value="" />
          <Picker.Item label="1 Year" value="1" />
          <Picker.Item label="2 Years" value="2" />
          <Picker.Item label="3 Years" value="3" />
          <Picker.Item label="4 Years" value="4" />
          <Picker.Item label="More than 5 Years" value="5+" />
        </Picker>
      </View>

      {/* Risk Tolerance */}
      <View style={styles.card}>
        <Text style={styles.label}>Risk Tolerance</Text>
        <Picker
          selectedValue={riskTolerance}
          onValueChange={setRiskTolerance}
          style={styles.picker}
        >
          <Picker.Item label="Select Risk Tolerance" value="" />
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
        </Picker>
      </View>

      {/* Future Goals */}
      <View style={styles.card}>
        <Text style={styles.label}>Future Goals</Text>
        <TextInput
          style={styles.input}
          placeholder="Goal Name"
          value={goalName}
          onChangeText={setGoalName}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={goalAmount}
          onChangeText={setGoalAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Time in Years"
          keyboardType="numeric"
          value={goalTime}
          onChangeText={setGoalTime}
        />
        <TouchableOpacity style={styles.addButton} onPress={addGoal}>
          <Text style={styles.addButtonText}>+ Add Goal</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginTop: 5,
  },
  picker: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 35,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
