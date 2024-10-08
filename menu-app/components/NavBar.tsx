import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import Menu from "../app/menu";

export default function NavBar() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  const colors = {
    mainColor: "#1E1E1E",
    secondaryColor: "#FFFFFF",
    accentColor: "#FFC107",
  };

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.mainColor,
    },
    view: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingVertical: 10,
      paddingBottom: 25,
    },
    navItem: {
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      width: 24,
      height: 24,
      marginBottom: 5,
    },
    navText: {
      color: colors.secondaryColor,
      fontSize: 12,
    },
  });

  return (
    <View style={styles.container}>
      {/* Pass the function to close the modal */}
      <Menu isVisible={isVisible} closeModal={() => setIsVisible(false)} />

      <View style={styles.view}>
        <Pressable
          style={styles.navItem}
          onPress={() => setIsVisible(true)}
        >
          <Image
            source={require("../assets/images/restaurant-icon.png")}
            style={styles.icon}
          />
          <Text style={styles.navText}>Menu</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => router.replace("/home")} // Use replace instead of push
        >
          <Image
            source={require("../assets/images/home-icon.png")}
            style={styles.icon}
          />
          <Text style={styles.navText}>Home</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => router.replace("/search")} // Use replace instead of push
        >
          <Image
            source={require("../assets/images/search-icon.png")}
            style={styles.icon}
          />
          <Text style={styles.navText}>Search</Text>
        </Pressable>
      </View>
    </View>
  );
}
