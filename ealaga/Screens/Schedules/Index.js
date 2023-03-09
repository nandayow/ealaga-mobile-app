import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

// Shared
import Header from "../../Shared/Header";
import Colors from "../../Shared/Color";
import ScheduleCard from "./ScheduleCard"; 

// Dimensions
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ScheduleContainer = (props) => {
  return (
    <View>
      <Header navigation={props.navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>My Schedule</Text>
        <ScheduleCard navigation={props.navigation} />  
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Colors.main,
    borderBottomWidth: 200,
    borderBottomColor: Colors.main,
  },
  title: {
    fontSize: 30,
    color: Colors.TextColor,
    fontWeight: "bold",
    textAlign: "center",
    height: 100,
    textAlignVertical: "center",
  },
  scrollView: {
    margin: 5,
    paddingBottom: 50,
    // backgroundColor: 'pink',
  },
  refreshColor: {
    tintColor: Colors.red,
    backgroundColor: "green",
  },
});

export default ScheduleContainer;
