import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Icon, Text } from '@ui-kitten/components';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { userSelectors } from 'src/app/features/userSlice';
import { useAppSelector } from 'src/app/hooks';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const { email } = useAppSelector(userSelectors.getUser);
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
          onPress={() => console.log('e')}
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
