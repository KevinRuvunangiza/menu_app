import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import Course from "../components/course";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Link } from "expo-router";
import NavBar from "@/components/NavBar";

export default function Search() {
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = ["Entry", "Main", "Dessert"]; // Define tags

  // Load courses from AsyncStorage
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

  // Delete course function
  const handleDelete = async (index: number) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    setFilteredCourses(updatedCourses);
    await AsyncStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  // Filter courses based on search query and selected tag
  useEffect(() => {
    let filtered = courses.filter((course) => 
      course.name.toLowerCase().includes(search.toLowerCase()) && 
      (!selectedTag || course.tag === selectedTag)
    );
    setFilteredCourses(filtered);
  }, [search, selectedTag, courses]);

  useFocusEffect(
    useCallback(() => {
      loadCourses();
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <Text style={styles.title}>Search Screen</Text>

      {/* Search input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />

      {/* Tag filter buttons */}
      <View style={styles.tagContainer}>
        {tags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tagButton,
              selectedTag === tag ? styles.activeTag : null,
            ]}
            onPress={() => setSelectedTag(selectedTag === tag ? null : tag)}
          >
            <Text style={[styles.tagText,
            selectedTag===tag? styles.activeTagTxt:null]}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filtered course list */}
      <ScrollView style={styles.scrollView}>
        {filteredCourses.map((course, index) => (
          <View key={index} style={styles.courseContainer}>
            {/* Course details wrapped in Link */}
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
              asChild
            >
              <TouchableOpacity>
                <Course
                  name={course.name}
                  price={"R" + course.price}
                  description={course.description}
                  tag={course.tag}
                  image={course.image} // Pass the image URI as a prop
                  onDelete={() => handleDelete(index)}
                />
              </TouchableOpacity>
            </Link>

            {/* Delete button */}
            
          </View>
        ))}
      </ScrollView>
      <NavBar />
    </View>
  );
}

const colors = {
  mainColor: "#1E1E1E",
  secondaryColor: "#FFFFFF",
  placeholderColor: "#000", // Black placeholder
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginTop:0,
    paddingTop:50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    placeholderTextColor: colors.placeholderColor,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tagButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activeTag: {
    backgroundColor:colors.mainColor,
    color:colors.secondaryColor,
    fontWeight:'700'
    
  },

  activeTagTxt: {
    color:colors.secondaryColor,
    fontWeight:'700'
    
  },
  tagText: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  courseContainer: {
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
