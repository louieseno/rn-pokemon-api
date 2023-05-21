import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Icon, Text } from '@ui-kitten/components';
import { Image, View } from 'react-native';
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
        dispatch(logout())
    }

    return (
        <View style={{ flex: 1, borderWidth: 1 }}>
        <View style={{ alignItems: 'center' }}>
            <Image
            source={require('assets/pokemon/profile.png')}
            style={{ width: 200, height: 200, borderWidth: 1, borderRadius: 100 }}
            />
            <Text>{email}</Text>
        </View>

        <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
            <TouchableOpacity
            onPress={logoutUser}
            style={{ paddingVertical: 15 }}
            >
            <View style={{ flexDirection: 'row' }}>
                <Icon
                style={{
                    width: 20,
                    height: 20,
                    marginRight: 10,
                }}
                name="log-out-outline"
                />
                <Text category="s1">Log Out</Text>
            </View>
            </TouchableOpacity>
        </View>
        </View>
    );
}
