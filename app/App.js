import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from './src/screens/Home';
import Settings from './src/screens/Settings';
import ChatRoom from './src/screens/ChatRoom';
import CreateChat from "./src/screens/CreateChat";
import Header from "./src/components/Header";
import RoomHeader from "./src/components/RoomHeader";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          header: () => {
            if (route.name === "ChatRoom") {
              return (
                <RoomHeader
                  title={route.name}
                  navigation={navigation}
                  route = {route}
                />
              );
            } else {
              return (
                <Header
                  title={route.name}
                  navigation={navigation}
                />
              );
            }
          },
        })}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="CreateChat" component={CreateChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
