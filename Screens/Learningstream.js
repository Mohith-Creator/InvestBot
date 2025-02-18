import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "react-native";

const modules = [
  { id: 1, name: "Stock Market Basics", progress: 0.1, icon: "chart-line" },
  { id: 2, name: "Technical Analysis", progress: 0.2, icon: "chart-area" },
  { id: 3, name: "Fundamental Analysis", progress: 0.3, icon: "balance-scale" },
  { id: 4, name: "Personal Finance", progress: 0.4, icon: "wallet" },
  {
    id: 5,
    name: "Markets and Taxation",
    progress: 0.5,
    icon: "file-invoice-dollar",
  },
  {
    id: 6,
    name: "Risk Management",
    progress: 0.6,
    icon: "exclamation-triangle",
  },
  { id: 7, name: "Trading Systems", progress: 0.7, icon: "robot" },
  { id: 8, name: "F&O Trading", progress: 0.8, icon: "exchange-alt" },
  { id: 9, name: "Commodities & Securities", progress: 0.9, icon: "coins" },
  { id: 10, name: "Coming Soon", progress: 1.0, icon: "hourglass-half" },
];

export default function UserDashboard() {
  const navigation = useNavigation();
  const [scaleValue] = useState(new Animated.Value(1));
  const [search, setSearch] = useState("");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const filteredModules = modules.filter((module) =>
    module.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePress = (module) => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate("modulescreen", {
        moduleId: module.id,
        moduleName: module.name,
      });
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />

      <LinearGradient
        colors={isDarkMode ? ["#1E1E1E", "#121212"] : ["#F8F9FA", "#E9ECEF"]}
        style={styles.container}
      >
        <View
          style={[
            styles.searchContainer,
            isDarkMode && styles.darkSearchContainer,
          ]}
        >
          <FontAwesome5
            name="search"
            size={18}
            color={isDarkMode ? "#B0B0B0" : "#6C757D"}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search Modules..."
            placeholderTextColor={isDarkMode ? "#B0B0B0" : "#6C757D"}
            style={[styles.searchInput, isDarkMode && styles.darkInput]}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={[styles.header, isDarkMode && styles.darkText]}>
            Learn & Grow
          </Text>
          <View style={styles.modulesContainer}>
            {filteredModules.length === 0 ? (
              <Text style={[styles.noResults, isDarkMode && styles.darkText]}>
                No modules found
              </Text>
            ) : (
              filteredModules.map((module) => (
                <TouchableOpacity
                  key={module.id}
                  style={[styles.moduleCard, isDarkMode && styles.darkCard]}
                  onPress={() => handlePress(module)}
                >
                  <View style={styles.moduleTop}>
                    <FontAwesome5
                      name={module.icon}
                      size={24}
                      color="#343A40"
                    />
                    <Text
                      style={[
                        styles.moduleNumber,
                        isDarkMode && styles.darkText,
                      ]}
                    >
                      {module.id}
                    </Text>
                  </View>
                  <View style={styles.moduleBottom}>
                    <View style={styles.moduleTitleContainer}>
                      <Text
                        style={styles.moduleTitle}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {module.name}
                      </Text>
                    </View>
                    {/* <Text
                      style={[
                        styles.moduleTitle,
                        isDarkMode && styles.darkText,
                      ]}
                    >
                      {module.name}
                    </Text> */}
                    <View style={styles.progressContainer}>
                      <View
                        style={[
                          styles.progressBar,
                          { width: `${module.progress * 100}%` },
                          module.progress === 1 && styles.completedProgress,
                        ]}
                      />
                    </View>
                    {module.progress === 1 && (
                      <Text
                        style={[
                          styles.completedText,
                          isDarkMode && styles.darkText,
                        ]}
                      >
                        ✔ Completed
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flexGrow: 1, padding: 20 },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#343A40",
    textAlign: "center",
    marginBottom: 20,
    // marginTop: 25,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 55,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  darkSearchContainer: {
    backgroundColor: "#333",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#343A40",
  },
  darkInput: {
    backgroundColor: "#333",
    color: "#FFF",
  },
  modulesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  moduleCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 8,
  },
  darkCard: {
    backgroundColor: "#222",
  },
  moduleTop: {
    backgroundColor: "#FFC107",
    padding: 20,
    alignItems: "center",
  },
  moduleBottom: {
    padding: 20,
    alignItems: "center",
  },
  moduleNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343A40",
    marginTop: 5,
  },
  moduleTitleContainer: {
    height: 45, // Adjust this value to ensure all titles align
    justifyContent: "center",
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#495057",
    textAlign: "center",
    marginTop: -10,
  },
  progressContainer: {
    height: 6,
    width: "100%",
    backgroundColor: "#E9ECEF",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#28A745",
  },
  completedProgress: {
    backgroundColor: "#007BFF",
  },
  completedText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#007BFF",
  },
  noResults: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#6C757D",
  },
  darkText: {
    color: "#FFF",
  },
});
