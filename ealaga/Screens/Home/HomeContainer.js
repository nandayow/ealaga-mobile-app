import { useCallback, useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, Text, ScrollView } from "react-native";

import Colors from "../../Shared/Color";
import Header from "../../Shared/Header";
import FunctionList from "../Home/FunctionList";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeContainer = (props) => {
  const context = useContext(AuthGlobal);
  const [hours, setHours] = useState("");
  const [greeting, setGreeting] = useState("Good Morning!");
  const [username, setUserame] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  useEffect(() => {
    var oras = moment().hours(); //Current Hours

    setHours(oras);
    if (hours < 12) {
      setGreeting("Good Morning!");
    } else if (hours > 12 && hours < 18) {
      setGreeting("Good Afternoon!");
    } else {
      setGreeting("Good Evening!");
    }
  }, [hours]);

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("User");
      }
      setUserame(context.stateUser.user.username);
      setFirstname(context.stateUser.user.firstname);
      setLastname(context.stateUser.user.lastname);

      // console.log(context.stateUser.user)
      return () => {
        setUserame();
      };
    }, [context.stateUser.isAuthenticated, username, firstname, lastname])
  );

  // console.log(context.stateUser.user.account_verified);

  return (
    <View>
      <Header navigation={props.navigation} />
      <View style={styles.container}>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.username}>
          {firstname} {lastname}
        </Text>
        <ScrollView>
          <FunctionList navigation={props.navigation} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: windowWidth,
    height: windowHeight,
    backgroundColor: Colors.main,
  },
  greeting: {
    fontSize: 34,
    color: Colors.TextColor,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
    font: 30,
  },
  username: {
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "bold 100",
    marginLeft: 20,
    color: Colors.gray,
  },
});

export default HomeContainer;
