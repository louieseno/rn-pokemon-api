import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack, { AuthStackParamList } from 'src/navigation/AuthStack';
import { Screens } from 'src/constants/enums';
import AppStack, { AppStackParamList } from './AppStack';


export type RootStackParamList = {
    [Screens.Auth]: NavigatorScreenParams<AuthStackParamList>;
    [Screens.App]: NavigatorScreenParams<AppStackParamList>
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
          {/* <Stack.Screen name={Screens.Auth} component={AuthStack} /> */}
          <Stack.Screen name={Screens.App} component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default RootNavigator;