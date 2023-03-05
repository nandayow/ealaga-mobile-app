import React, { useContext } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Colors from "./Color";

const Header = (props) => {
  return (
    <SafeAreaView style={styles.header}>
      {/* <Image
        source={require("../assets/osca-logo.png")}
        resizeMode="contain"
        style={styles.image}
      /> */}
      <Image
        source={require("../assets/ealaga.png")}
        resizeMode="contain"
        style={{ height: 60 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    // marginTop:20,
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    paddingTop: 20,
    borderBottomWidth: 3,
    backgroundColor: "#ffc0cb",
    borderBottomColor: Colors.rose_300,
    shadowOpacity: 2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  image: {
    height: 50,
    width: 50,
    position: "absolute",
    left: 15,
    bottom: 1,
    backgroundColor: "transparent",
    borderRadius: 50,
  },
  touchableOpacity: {
    position: "absolute",
    left: 10,
    bottom: 1,
  },
});
export default Header;
