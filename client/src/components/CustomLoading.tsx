import { Spinner } from '@ui-kitten/components';
import { View } from 'react-native';

export default function CustomLoading() {
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          alignSelf: 'center',
        },
      ]}
    >
      <Spinner />
    </View>
  );
}
