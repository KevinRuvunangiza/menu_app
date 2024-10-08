import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // For delete icon

const colors = {
  mainColor: "#1E1E1E",
  secondaryColor: "#FFFFFF",
};

const styles = StyleSheet.create({
  view: {
    flexDirection: "row", // Align items horizontally
    justifyContent: "space-between", // Spread elements across the row
    alignItems: "flex-start", // Top-align the image and text
    marginBottom: 20, // Space between each item
    paddingHorizontal: 15, // Padding to the sides for layout consistency
  },

  leftSection: {
    flexDirection: "row", // Align image and text side by side
    alignItems: "center",
    flex: 1,
  },

  imageContainer: {
    position: "relative", // Allow positioning of the tag over the image
  },

  coursePic: {
    width: 107,
    height: 107,
    borderRadius: 20,
  },

  tag: {
    position: "absolute", // Position tag relative to image
    top: 8, // Distance from the top of the image
    left: 7, // Distance from the left of the image
    backgroundColor: "#e0e0e0", // Light gray for the tag
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 8,
    fontWeight: "600",
  },

  tagtxt: {
    fontSize: 8,
    fontWeight: "600",
  },

  courseInfo: {
    marginLeft: 15, // Space between image and text
    flex: 1, // Ensure the text takes up available space
  },

  courseName: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Montserrat",
  },

  coursePrice: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Montserrat",
    marginTop: 5,
  },

  courseDescription: {
    fontSize: 12,
    fontFamily: "Montserrat",
    marginTop: 10, // Space between the price and description
    color: "#666", // Softer color for the description
  },

  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});

interface CourseProps {
  image?: string;
  tag?: string;
  name: string;
  price: string;
  description: string;
  onDelete: () => void; // Update prop type
}

export default function Course(props: CourseProps) {
  return (
    
    <View style={styles.view}>
      {/* Left section with image and info */}
      <View style={styles.leftSection}>
        {/* Image container with tag on top */}
        <View style={styles.imageContainer}>
          <Image 
            source={props.image ? { uri: props.image } : require('../assets/images/placeholder.jpg')} 
            style={styles.coursePic}
          />
          <View style={styles.tag}>
            <Text style={styles.tagtxt}>{props.tag}</Text>
          </View>
        </View>
        <View style={styles.courseInfo}>
          <Text style={styles.courseName}>{props.name}</Text>
          <Text style={styles.coursePrice}>{props.price}</Text>
          <Text style={styles.courseDescription}>{props.description}</Text>
        </View>
      </View>

      {/* Delete Button */}
      <TouchableOpacity onPress={props.onDelete} style={styles.deleteButton}>
        <Ionicons name='trash' size={24} color={colors.mainColor} />
      </TouchableOpacity>
    </View>
  );
}
