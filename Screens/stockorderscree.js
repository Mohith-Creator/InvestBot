import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Switch } from "react-native";

const StockOrderScreen = () => {
  const [isMarketPrice, setIsMarketPrice] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Overnight");

  return (
    <View style={styles.container}>

      {/* Order Option Selection */}
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === "Overnight" && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption("Overnight")}
        >
          
        </TouchableOpacity>
      </View>

      {/* Quantity and Price */}
      <View style={styles.inputContainer}>
        <Text>Quantity</Text>
        <TextInput
          style={styles.input}
          defaultValue="1"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Price</Text>
        <TextInput
          style={[
            styles.input,
            isMarketPrice && styles.disabledInput, // Apply disabled style
          ]}
          defaultValue="1694.95"
          keyboardType="numeric"
          editable={!isMarketPrice} // Disable when Market Price is enabled
          selectTextOnFocus={!isMarketPrice} // Prevent selecting text when disabled
        />
      </View>

      {/* Market Price Toggle */}
      <View style={styles.switchContainer}>
        <Text>Market Price</Text>
        <Switch value={isMarketPrice} onValueChange={setIsMarketPrice} />
      </View>

      {/* Buy Button at Bottom */}
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  orderType: {
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
  disabledInput: {
    backgroundColor: "#e0e0e0", // Light gray background when disabled
    color: "#a0a0a0", // Gray text color
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  buyButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default StockOrderScreen;
