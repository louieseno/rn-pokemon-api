import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack, { AuthStackParamList } from 'src/navigation/AuthStack';
import { Screens } from 'src/constants/enums';
import AppStack, { AppStackParamList } from './AppStack';
import { useEffect, useState } from 'react';
import { secureStorage } from 'src/services/secure-storage';

export type RootStackParamList = {
  [Screens.Auth]: NavigatorScreenParams<AuthStackParamList>;
  [Screens.App]: NavigatorScreenParams<AppStackParamList>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const token = await secureStorage.getValueFor('token');
      if (token) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        {isAuthorized ? (
          <Stack.Screen name={Screens.App} component={AppStack} />
        ) : (
          <Stack.Screen name={Screens.Auth} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
