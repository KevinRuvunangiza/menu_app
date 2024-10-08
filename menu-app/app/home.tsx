import React, { useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet, ScrollView, StatusBar, RefreshControl } from "react-native";
import Course from "../components/course";
import NavBar from "@/components/NavBar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Link } from "expo-router";

export default function Home() {
  const [courses, setCourses] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:40,
    },
    view: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: 20, // Ensure padding is consistent
    },
    title: {
      fontSize: 32,
      fontWeight: "700",
      marginBottom: 20,
      marginTop: 20,
      alignSelf: 'center', // Align title to the center
    },
    scrollView: {
      width: '100%', // Ensure ScrollView takes full width
      paddingTop: 10,
    },
    courseContainer: {
      width: '100%', // Ensure each Course takes full width
      alignItems: 'center', // Center items in the course container
      marginBottom: 10, // Add some margin for separation
    },
  });

  const loadCourses = async () => {
    try {
      const savedCourses = await AsyncStorage.getItem('courses');
      if (savedCourses !== null) {
        setCourses(JSON.parse(savedCourses));
      } else {
        console.log("No courses found.");
      }
    } catch (error) {
      console.error("Failed to load courses", error);
    }
  };

  const saveCourses = async (courses: any[]) => {
    try {
      await AsyncStorage.setItem('courses', JSON.stringify(courses));
    } catch (error) {
      console.error("Failed to save courses", error);
    }
  };

  const handleDelete = (index: number) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    saveCourses(updatedCourses);
  };

  const handleRefresh = async () => {
    setRefreshing(true); // Start refreshing
    await loadCourses(); // Reload the courses
    setRefreshing(false); // Stop refreshing
  };

  useEffect(() => {
    loadCourses();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCourses();
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <View style={styles.view}>
        <Text style={styles.title}>MENU</Text>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing} // Set the refreshing state
              onRefresh={handleRefresh} // Call the handleRefresh function on pull down
            />
          }
        >
          {courses.map((course, index) => (
            <Link
              href={{
                pathname: '/details',
                params: {
                  name: course.name,
                  price: course.price,
                  description: course.description,
                  tag: course.tag,
                  image: course.image,
                },
              }}
              key={index}
            >
              <View style={styles.courseContainer}>
                <Course
                  name={course.name}
                  price={"R" + course.price}
                  description={course.description}
                  tag={course.tag}
                  image={course.image} // Pass the image URI as a prop
                  onDelete={() => handleDelete(index)} // Pass delete handler
                />
              </View>
            </Link>
          ))}
        </ScrollView>
      </View>

      <NavBar />
    </View>
  );
}
