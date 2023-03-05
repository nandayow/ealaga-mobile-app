import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

//  Screens
import VisitorViewContainer from "../Screens/Visitors/VisitorViewContainer";
import LoginContainer from "../Screens/User/Login";
import Register from "../Screens/User/Register";
import ForgotPassword from "../Screens/User/ForgotPassword";
import AuthGlobal from "../Context/store/AuthGlobal";

const Stack = createStackNavigator();

function MyStack() {
  const context = useContext(AuthGlobal);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Visitor"
        component={VisitorViewContainer}
        options={{
          headerShown: false,
        }}
      />
      {/* {context.stateUser.isAuthenticated === true ? ( */}
      <Stack.Screen
        name="Login"
        component={LoginContainer}
        options={{
          headerShown: false,
        }}
      />

      {/* ) : ( null )}    */}

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function UserNavigator() {
  return <MyStack />;
}
