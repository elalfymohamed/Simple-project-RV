import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

const AddTask = ({ addTask, showMessageAdd }) => {
  const [text, setText] = useState("");
  const changeHandler = (vel) => {
    setText(vel);
  };

  const changeHandlerText = (ty) => {
    if (text) {
      showMessageAdd(ty);
    }
    setText("");
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Add new task"
        onChangeText={changeHandler}
        value={text}
      />

      <Button
        title="Add task"
        color="#2e67ed"
        onPress={() => addTask(text) || changeHandlerText("add")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingLeft: 5,
  },
});

export default AddTask;
