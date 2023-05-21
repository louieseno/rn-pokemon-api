import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Suspense, lazy } from 'react';
import { Screens } from 'src/constants/enums';
import CustomLoading from 'src/components/CustomLoading';

// Screens
import Login from 'src/screens/auth/Login';
const Register = lazy(() => import('src/screens/auth/Register'));

export type AuthStackParamList = {
  [Screens.Register]: undefined;
  [Screens.Login]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Suspense fallback={<CustomLoading />}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Screens.Login}
      >
        <Stack.Screen name={Screens.Register} component={Register} />
        <Stack.Screen name={Screens.Login} component={Login} />
      </Stack.Navigator>
    </Suspense>
  );
};

export default AuthStack;
