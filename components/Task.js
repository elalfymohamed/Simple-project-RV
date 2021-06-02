import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Task = ({ item, deleteTask, taskDone, showMessageDelete }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => taskDone(item.id)}>
      <Text style={item.done ? styles.notDone : styles.done}>{item.task}</Text>

      <MaterialIcons
        name="delete"
        size={24}
        color="red"
        onPress={() => deleteTask(item.id) || showMessageDelete("delete")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 15,
    borderStyle: "solid",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  done: {
    color: "black",
    fontSize: 17,
    textDecorationLine: "line-through",
  },
  notDone: {
    color: "black",
    fontSize: 17,
    maxWidth: 250,
  },
});

export default Task;
