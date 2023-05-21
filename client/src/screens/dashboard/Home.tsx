import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {View, Text, Button} from 'react-native';
import { Screens } from 'src/constants/enums';
import { AppStackParamList } from 'src/navigation/AppStack';

type Props = NativeStackScreenProps<AppStackParamList, Screens.Home>;

export default function Home({navigation}:Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      {/* <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} /> */}
    </View>
  )
}
