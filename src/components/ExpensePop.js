import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CatList from "../utilities/CatList";
import { addExpense } from "./Api";

const ExpensePop = ({setValid}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [spentOn, setSpentOn] = useState("");
  const [description, setDescription] = useState("");
  const categories = CatList;
  const handleSave = () => {
    const newItem = {
      "user": "1",
      "amount": amount,
      "category": spentOn,
      "description": description,
    }
    fetch('http://192.168.1.36:3000/api/expense' ,{
      method:'POST',
      headers:{'content-Type':'application/json'},
      body: JSON.stringify(newItem)
    })
    addExpense(newItem)
    setModalVisible(false)
    setValid(true)
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={() => setModalVisible(true)}>
          add
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.backWrap}>
            <View style={styles.popWrap}>
              <TextInput
                style={styles.input}
                placeholder="add amount"
                keyboardType="numeric"
                onChangeText={(text) => setAmount(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={(text) => setDescription(text)}
              />
              <View style={styles.pickWrap}>
                <Picker
                  selectedValue={spentOn}
                  onValueChange={(itemValue, itemIndex) => setSpentOn(itemValue)}
                  style={[styles.picker]}
                  itemStyle={[{ textAlign: "center" }, { fontSize: 20 }]}
                >
                  <Picker.Item label="Select Category" value="" />
                  {categories.map((category, index) => (
                    <Picker.Item label={category} value={category} key={index}/>
                  ))}
                </Picker>
              </View>
              <View style={styles.endButtons}>
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(!modalVisible)}
                />
                <Button 
                  title="Save"
                  onPress={handleSave}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    width: 50,
    height: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    alignSelf: "center",
  },
  backWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popWrap: {
    backgroundColor: "white",
    width: "75%",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  pickWrap: {
    borderRadius: 5,
    overflow: "hidden", // Clip content inside
    marginBottom: 10,
    borderColor: "grey",
  },
  picker: {
    height: 100,
    justifyContent: "center",
  },
  endButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default ExpensePop;
