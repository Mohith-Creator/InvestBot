import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const features = [
  { title: "Learning Stream", image: require("../assets/learning (3).png") },
  { title: "Virtual Portfolio", image: require("../assets/portfolio.png") },
  { title: "Financial Chatbot", image: require("../assets/chatbot (1).png") },
  {
    title: "Financial Check-Up",
    image: require("../assets/healthscore (3).png"),
  },
  { title: "Financial Tools", image: require("../assets/tools.png") },
  {
    title: "Real World Simulation",
    image: require("../assets/realworld (1).png"),
  },
  { title: "News", image: require("../assets/news.png") },
  { title: "Recommendation", image: require("../assets/news.png") },
];

const DashboardScreen = () => {
  const navigation = useNavigation();

  // Shared values for animations
  const headerTranslateY = useSharedValue(-100);
  const cardTranslateX = useSharedValue(-100);

  // Animate header (Y-Axis)
  useEffect(() => {
    headerTranslateY.value = withTiming(0, { duration: 700 });
  }, []);

  // Animate feature cards (X-Axis)
  useEffect(() => {
    cardTranslateX.value = withSpring(0);
  }, []);

  // Animated styles
  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: cardTranslateX.value }],
  }));

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        {/* Animated Header */}
        <Animated.View style={[styles.header, headerStyle]}>
          <TouchableOpacity onPress={() => console.log("Profile Clicked")}>
            <Image
              source={require("../assets/profile.png")}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          <View style={styles.profileContainer}>
            <Text style={styles.welcomeText}>Good Morning,</Text>
            <Text style={styles.userName}>Mani</Text>
          </View>

          <TouchableOpacity
            onPress={() => console.log("Notifications Clicked")}
          >
            <Icon
              name="notifications"
              size={28}
              color="black"
              style={styles.notificationIcon}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* Animated Feature Cards */}
        <FlatList
          data={features}
          numColumns={2}
          keyExtractor={(item) => item.title}
          renderItem={({ item, index }) => (
            <Animated.View style={[styles.card, cardStyle]}>
              <TouchableOpacity
                onPress={() => {
                  if (item.title === "News") {
                    handleNavigation("News");
                  } else if (item.title === "Recommendation") {
                    handleNavigation("Recommendation");
                  } else if (item.title === "Learning Stream") {
                    handleNavigation("UserDashboard");
                  } else {
                    console.log("Feature not yet implemented: ", item.title);
                  }
                }}
              >
                <Image source={item.image} style={styles.cardImage} />
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
          scrollEnabled={false} // Disable FlatList scrolling since it's inside ScrollView
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0ECE7",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#D0ECE7",
    marginBottom: 10,
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 18,
  },
  notificationIcon: {
    marginLeft: "auto",
  },
  welcomeText: {
    color: "black",
    fontSize: 16,
    opacity: 0.8,
  },
  userName: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
    marginTop: 2,
  },
  cardImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  card: {
    width: "45%",
    aspectRatio: 1,
    margin: 10,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5,
  },
  cardOverlay: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 5,
    borderRadius: 5,
  },
  cardText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: -5,
  },
});

export default DashboardScreen;
