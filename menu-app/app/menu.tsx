import React, { useState } from "react";
import { StyleSheet, View, Pressable, Text, TextInput, ScrollView, Modal, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

export default function Menu({ isVisible, closeModal }: any) {
  const [courseName, setCourseName] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseTag, setCourseTag] = useState("Entry");
  const [courseDescription, setCourseDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for selected image

  const colors = {
    mainColor: "#1E1E1E",
    secondaryColor: "#FFFFFF",
    placeholderColor: "#000", // Black placeholder
  };

  const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: colors.secondaryColor,
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    header: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.mainColor,
      marginBottom: 20,
      textAlign: "left", // Align to top-left
    },
    imagePlaceholder: {
      width: 120,
      height: 120,
      backgroundColor: "#E0E0E0",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      borderRadius: 10,
      marginBottom: 30,
    },
    imageText: {
      color: "#888",
      fontSize: 40,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.mainColor,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: "#CCC",
      padding: 15,
      borderRadius: 10,
      fontSize: 16,
      color: colors.mainColor,
      backgroundColor: "#F9F9F9",
      placeholderTextColor: colors.placeholderColor,
      marginTop: 10, // Adjust marginTop to avoid space issues
    },
    picker: {
      borderWidth: 1,
      borderColor: "#CCC",
      borderRadius: 10,
      backgroundColor: "#F9F9F9",
      marginTop: 10,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    button: {
      flex: 1,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginHorizontal: 5,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    doneButton: {
      backgroundColor: "#E0E0E0",
    },
    doneButtonText: {
      color: "#000",
    },
    addButton: {
      backgroundColor: colors.mainColor,
    },
    addButtonText: {
      color: colors.secondaryColor,
    },
  });

  // Function to open image picker
  const openImagePicker = async () => {
    // Ask for permission to access gallery
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    // Pick an image
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5, // You can adjust the quality as needed
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri); // Set the selected image URI
    }
  };

  // Function to save course data to AsyncStorage
  const saveCourse = async () => {
    try {
      const newCourse = {
        name: courseName,
        price: coursePrice,
        tag: courseTag,
        description: courseDescription,
        image: selectedImage, // Add image URL to the saved course
      };

      // Retrieve existing courses
      const existingCourses = await AsyncStorage.getItem('courses');
      const courses = existingCourses ? JSON.parse(existingCourses) : [];

      // Add new course
      courses.push(newCourse);

      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem('courses', JSON.stringify(courses));
      console.log("Course saved successfully!");
      alert("Course added successfully!");
      closeModal(); // Close modal after saving
    } catch (error) {
      console.error("Failed to save course", error);
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.view}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
          <Text style={styles.header}>Create a course</Text>
          {/* Display selected image or placeholder */}
          <Pressable onPress={openImagePicker}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.imagePlaceholder} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>+</Text>
              </View>
            )}
          </Pressable>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Course Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter course name"
              placeholderTextColor={colors.placeholderColor}
              value={courseName}
              onChangeText={setCourseName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Course Price</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter course price"
              placeholderTextColor={colors.placeholderColor}
              value={coursePrice}
              onChangeText={setCoursePrice}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tag</Text>
            <Picker
              style={styles.picker}
              selectedValue={courseTag}
              onValueChange={(itemValue) => setCourseTag(itemValue)}
            >
              <Picker.Item label="Entry" value="Entry" />
              <Picker.Item label="Main" value="Main" />
              <Picker.Item label="Dessert" value="Dessert" />
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, { height: 120 }]}
              placeholder="Create a description"
              multiline
              placeholderTextColor={colors.placeholderColor}
              value={courseDescription}
              onChangeText={setCourseDescription}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Pressable style={[styles.button, styles.doneButton]} onPress={saveCourse}>
              <Text style={[styles.buttonText, styles.doneButtonText]}>Done</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.addButton]} onPress={saveCourse}>
              <Text style={[styles.buttonText, styles.addButtonText]}>Add</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
