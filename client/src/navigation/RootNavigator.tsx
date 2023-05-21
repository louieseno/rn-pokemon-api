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
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { userSelectors } from 'src/app/features/userSlice';
import jwt_decode from "jwt-decode";
import { login } from 'src/app/features/userSlice';

export type RootStackParamList = {
  [Screens.Auth]: NavigatorScreenParams<AuthStackParamList>;
  [Screens.App]: NavigatorScreenParams<AppStackParamList>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const isLoggedIn = useAppSelector(userSelectors.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const token = await secureStorage.getValueFor('token');
      if (token) {
        const decoded:{email: string, exp: number,iat: string, sub: string} = jwt_decode(token);
        const {email, sub} = decoded
        dispatch(login({email, id: Number(sub)}))
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        {isLoggedIn ? (
          <Stack.Screen name={Screens.App} component={AppStack} />
        ) : (
          <Stack.Screen name={Screens.Auth} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
