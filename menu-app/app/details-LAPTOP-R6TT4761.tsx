import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons'; // Import for star icon
import NavBar from "../components/NavBar";

export default function Detail() {
  const { name, price, description, image } = useLocalSearchParams(); // Retrieve parameters from the URL
  const router = useRouter();

  const colors = {
    mainColor: "#1E1E1E",
    secondaryColor: "#FFFFFF",
    accentColor: "#FFC107",
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.secondaryColor,
    
    },
    imageContainer: {
      alignItems: "center",
      marginBottom: 20,
      marginTop:40,
    },
    courseImage: {
      width: 250,
      height: 250,
      borderRadius: 20,
      overflow: "hidden",
      marginTop: 20,
    },
   
    textContainer: {
      alignItems: 'flex-start',
    },
    courseName: {
      fontSize: 28,
      fontWeight: "700",
      textAlign: "left",
      marginVertical: 10,
    },
    coursePrice: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.mainColor,
      textAlign: "left",
      marginVertical: 5,
    },
    courseDescription: {
      fontSize: 16,
      textAlign: "left",
      color: "#666",
      marginVertical: 10,
      paddingHorizontal: 0,
    },
    orderButton: {
      backgroundColor: colors.mainColor,
      paddingVertical: 20,
      paddingHorizontal: 60,
      borderRadius: 30,
      alignItems: "center",
      marginVertical: 20,
      alignSelf: 'center',
      marginTop: 40,
    },
    orderButtonText: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.secondaryColor,
    },
  });

  return (
    <View style={styles.container}>
      {/* Course image with a star icon on top */}
      <View style={styles.imageContainer}>
        <Image
          source={image ? { uri: image } : require('../assets/images/placeholder.jpg')}
          style={styles.courseImage}
        />
        
      </View>

      {/* Text container for course details */}
      <View style={styles.textContainer}>
        <Text style={styles.courseName}>{name}</Text>
        <Text style={styles.coursePrice}>R{price}</Text>
        <Text style={styles.courseDescription}>{description}</Text>
      </View>

      {/* Back button to navigate to the home page */}
      <TouchableOpacity style={styles.orderButton} onPress={() => router.push('/home')}>
        <Text style={styles.orderButtonText}>GO BACK</Text>
      </TouchableOpacity>

      {/* Navigation Bar */}
      <NavBar />
    </View>
  );
}
