import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from 'src/components/CustomDrawerContent';

import { Screens } from 'src/constants/enums';

// Screens
import Home from 'src/screens/dashboard/Home';

export type AppStackParamList = {
  [Screens.Home]: undefined;
};

const Drawer = createDrawerNavigator<AppStackParamList>();

const AuthStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name={Screens.Home} component={Home} />
    </Drawer.Navigator>
  );
};

export default AuthStack;
