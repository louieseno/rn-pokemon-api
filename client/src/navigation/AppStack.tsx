import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Suspense } from 'react';
import { Screens } from 'src/constants/enums';
import CustomLoading from 'src/components/CustomLoading';

// Screens
import Home from 'src/screens/dashboard/Home';

export type AppStackParamList = {
    [Screens.Home]: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AuthStack = () => {
    return (
       <Suspense fallback={<CustomLoading/>}>
            <Stack.Navigator 
                screenOptions={{ headerShown: false }}
                initialRouteName={Screens.Home}
            >
                <Stack.Screen
                    name={Screens.Home}
                    component={Home}
                />
            </Stack.Navigator>
        </Suspense>
    );
}

export default AuthStack;