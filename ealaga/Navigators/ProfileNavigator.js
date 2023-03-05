import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import ProfileInfoNavigator from "./ProfileInfoNavigator";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileInfo"
        component={ProfileInfoNavigator}
        options={{
          title: "Profile Settings",
        }}
      />
    </Stack.Navigator>
  );
}

export default function ProfileNavigator() {
  return <MyStack />;
}
