import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Platform,
} from "react-native";

import ViewTransformer from "react-native-easy-view-transformer";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import Header from "./components/Header";
import Task from "./components/Task";
import AddTask from "./components/AddTask";

export default function App() {
  const [messageDelete, setMessageDelete] = useState(false);
  const [addTasks, setAddTasks] = useState(false);
  const [type, setType] = useState("");
  const [tasks, setTasks] = useState([
    { task: "expo", done: true, id: uuidv4() },
    { task: "react", done: true, id: uuidv4() },
    { task: "react native", done: true, id: uuidv4() },
    { task: "javaScript", done: false, id: uuidv4() },
  ]);

  // Add Task
  const addTask = (text) => {
    if (!text) {
      Alert.alert("No tasks?", "Please add a task");
    } else {
      setTasks((prevTasks) => {
        return [{ task: text, id: uuidv4(), done: true }, ...prevTasks];
      });
    }
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== id);
    });
  };

  // Done
  const taskDone = (id) => {
    const curTasks = [...tasks].map((el) => {
      if (el.id === id) {
        el.done = !el.done;
        return el;
      }
      return el;
    });
    setTasks(curTasks);
  };

  // Show Message Delete
  const showMessageDelete = (ty) => {
    setMessageDelete(!messageDelete);
    setType(ty);
  };
  // Show Message Add
  const showMessageAdd = (ty) => {
    setAddTasks(!addTasks);
    setType(ty);
  };

  useEffect(() => {
    if (messageDelete) {
      setTimeout(() => {
        setType("");
        setMessageDelete(!messageDelete);
      }, 1500);
    }
    if (addTasks) {
      setTimeout(() => {
        setType("");
        setAddTasks(!addTasks);
      }, 1500);
    }
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTask addTask={addTask} showMessageAdd={showMessageAdd} />
          {tasks.length > 0 ? (
            <View style={styles.list}>
              <FlatList
                data={tasks}
                renderItem={({ item }) => (
                  <Task
                    deleteTask={deleteTask}
                    taskDone={taskDone}
                    showMessageDelete={showMessageDelete}
                    item={item}
                  />
                )}
              />
            </View>
          ) : (
            <View style={styles.notTasks}>
              <Image
                style={styles.image}
                source={require("./assets/clip-somplete-purchases.png")}
              />
              <Text style={styles.textError}>Not Tasks, add a tasks</Text>
            </View>
          )}
        </View>
        <ViewTransformer
          maxScale={5}
          style={
            type === "add"
              ? addTasks
                ? styles.allMessage
                : styles.showMessage
              : type === "delete"
              ? messageDelete
                ? styles.allMessage
                : styles.showMessage
              : tasks.done === false
              ? styles.allMessage
              : styles.showMessage
          }
        >
          {Platform.OS === "ios" ? (
            <Text style={styles.allMessageTextIOS}>
              {type === "add" && "Add Task"}
              {type === "delete" && "Delete..."}
              {tasks.done === false && "Done"}
            </Text>
          ) : (
            <Text style={styles.allMessageText}>
              {type === "add" && "Add Task"}
              {type === "delete" && "Delete..."}
              {tasks.done === false && "Done"}
            </Text>
          )}
        </ViewTransformer>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0001",
    position: "relative",
  },
  content: {
    flex: 1,
    padding: 30,
  },
  list: {
    flex: 1,
    marginTop: 30,
  },
  notTasks: {
    alignItems: "center",
    marginTop: 40,
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: "center",
  },
  textError: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "400",
    paddingTop: 5,
    color: "#0016",
  },
  allMessage: {
    position: "absolute",
    right: 125,
    bottom: 0,
    marginBottom: 12,
    opacity: 1,
    zIndex: 1000,
  },
  showMessage: {
    opacity: 0,
  },

  allMessageText: {
    textAlign: "center",
    backgroundColor: "#0008",
    paddingHorizontal: 25,
    paddingVertical: 9,
    borderRadius: 50,
    color: "#fff",
    fontWeight: "400",
  },
  allMessageTextIOS: {
    textAlign: "center",
    backgroundColor: "#0008",
    paddingHorizontal: 25,
    paddingVertical: 9,
    borderRadius: 18,
    color: "#fff",
    fontWeight: "400",
    overflow: "hidden",
  },
});
