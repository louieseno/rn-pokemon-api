import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Suspense, lazy } from 'react';
import {Text} from 'react-native';
import { Screens } from 'src/constants/enums';

export type AuthStackParamList = {
    [Screens.Register]: undefined;
    [Screens.Login]:  undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
    return (
       <Suspense fallback={<Text>Loading</Text>}>
            <Stack.Navigator 
             screenOptions={{ headerShown: false }}
            initialRouteName={Screens.Login}>
                <Stack.Screen
                    name={Screens.Register}
                    component={lazy(() => import('src/screens/auth/Register'))}
                />
                <Stack.Screen
                    name={Screens.Login}
                    component={lazy(() => import('src/screens/auth/Login'))}
                />
            </Stack.Navigator>
        </Suspense>
    );
}

export default AuthStack;