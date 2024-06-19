import Tabs from "./src/components/Tabs"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import ChatRoom from './src/screens/ChatRoom'

const Stack = createStackNavigator()

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
      
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name = "Tabs" component = {Tabs} />

        <Stack.Screen name = "ChatRoom" component={ChatRoom} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}



export default App