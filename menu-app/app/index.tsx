import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Link } from "expo-router";

const Index: React.FC = () => {
  const colors = {
    mainColor: "#1E1E1E",
    secondaryColor: "#FFFFFF",
  };

  const styles = StyleSheet.create({
    view: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      marginTop: 40,
      backgroundColor: colors.mainColor,
      padding: 20,
      paddingHorizontal: 60,
      borderRadius: 25,
    },
    buttonTxt: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.secondaryColor,
    },
    logo: {
      width: 300,
      height: 300,
    },
  });

  return (
    <View style={styles.view}>
      <Image
        source={require("../assets/images/app-logo.png")}
        style={styles.logo}
      />
      <Pressable style={styles.button}>
      <Link href="/home">
        <Text style={styles.buttonTxt}>GET STARTED</Text>
      </Link>
      </Pressable>
    </View>
  );
};

export default Index;