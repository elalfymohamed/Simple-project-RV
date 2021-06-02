import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Mobile Tasks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2E67ED",
    height: 80,
    paddingTop: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
  },
});

export default Header;
