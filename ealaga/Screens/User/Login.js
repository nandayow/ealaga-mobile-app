import { View } from "native-base";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Shared
import Colors from "../../Shared/Color";
import FormContainer from "../../Shared/Form/FormContainer";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Error from "../../Shared/Error";
import Header from "../../Shared/Header";

// Dimensions
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";

function LoginContainer(props) {
  const context = useContext(AuthGlobal);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      // props.navigation.navigate("Home");
    }
  }, []);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill correct email and password");
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <SafeAreaProvider style={[styles.safeprovider]}>
      <View style={styles.headerbottom}>
        <Header navigation={props.navigation} />
      </View>

      <FormContainer title={"Login"}>
        <TextInput
          style={[styles.input]}
          left={
            <TextInput.Icon
              icon={require("../../assets/avatar.png")}
              color={Colors.TextColor}
              style={[styles.loginicon]}
            />
          }
          spellCheck={false}
          autoCorrect={false}
          placeholder={"Enter Email"}
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <TextInput
          style={[styles.input]}
          left={
            <TextInput.Icon
              icon="lock"
              color={Colors.TextColor}
              style={[styles.loginicon]}
            />
          }
          secureTextEntry={passwordVisible}
          placeholder={"Enter Password"}
          name={"password"}
          id={"password"}
          value={password}
          onChangeText={(text) => [setPassword(text)]}
          // Icon eye
          right={
            password !== "" ? (
              <TextInput.Icon
                id="passwordVisible"
                color={Colors.TextColor}
                style={[styles.loginicon]}
                name={passwordVisible ? "eye" : "eye-off"}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            ) : null
          }
        />
        <TouchableOpacity
          style={styles.appButtonContainerLogin}
          onPress={() => props.navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.Newuser}>
            Forgot password?
            <Text style={styles.Clickhere}> Click here</Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
          <EasyButton
            large
            style={styles.ButtonBorder}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.ButtonText}>LOG IN</Text>
          </EasyButton>

          <Text style={styles.Newuser}>
            New User?
            <Text
              style={styles.Clickhere}
              onPress={() => props.navigation.navigate("Register")}
            >
              Click here
            </Text>
          </Text>
        </View>
      </FormContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeprovider: {
    // marginTop:15,
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Colors.main,
  },

  headerbottom: {
    marginBottom: 60,
  },

  buttonGroup: {
    width: "80%",
    alignItems: "center",
    marginTop: 60,
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },

  ButtonBorder: {
    borderColor: "red",
    borderWidth: 2,
  },
  ButtonText: {
    color: Colors.TextColor,
    fontWeight: "bold",
  },
  Clickhere: {
    color: Colors.TextColor,
    fontStyle: "italic",
  },
  Newuser: {
    fontSize: 12,
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "white",
    margin: 10,
    // borderRadius: 8,
    padding: 10,
    borderBottomWidth: 2,
    borderColor: Colors.underline,
  },
  loginicon: {
    position: "absolute",
    bottom: -20,
  },
  logincontainer: {
    marginTop: 20,
  },
});

export default LoginContainer;
