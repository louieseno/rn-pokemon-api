import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack, { AuthStackParamList } from 'src/navigation/AuthStack';
import { Screens } from 'src/constants/enums';


export type RootStackParamList = {
    [Screens.Auth]: NavigatorScreenParams<AuthStackParamList>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
          <Stack.Screen name={Screens.Auth} component={AuthStack} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default RootNavigator;