import { Text } from '@ui-kitten/components';
import { View } from 'react-native';

type Props = {
  message?: string;
};
export default function InputError({ message }: Props) {
  if (message) {
    return (
      <Text
        status="danger"
        style={{
          fontSize: 10,
          fontStyle: 'italic',
          marginTop: 6,
        }}
      >
        {message}
      </Text>
    );
  }
  return null;
}
