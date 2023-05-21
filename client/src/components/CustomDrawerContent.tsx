import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Icon, Text } from '@ui-kitten/components';
import { Image, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { logout, userSelectors } from 'src/app/features/userSlice';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { secureStorage } from 'src/services/secure-storage';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(userSelectors.getUser);

  const logoutUser = async () => {
    await secureStorage.deleteValueFor('token');
    dispatch(logout());
  };

  return (
    <View style={{ flex: 1, borderWidth: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('assets/pokemon/profile.png')}
          style={styles.profile}
          resizeMode="contain"
        />
        <Text style={{ marginVertical: 10 }} category="label">
          {email}
        </Text>
        
      </View>

      <View style={styles.divider}>
        <TouchableOpacity onPress={logoutUser} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon style={styles.logoutIcon} 
            fill="black"
            name="log-out-outline" 
            />
            <Text category="s1">Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderRadius: 100,
  },
  divider: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  logoutIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
