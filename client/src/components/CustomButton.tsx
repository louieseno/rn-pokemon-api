import { Button, ButtonProps, Spinner } from '@ui-kitten/components';
import { View } from 'react-native';

interface Props extends ButtonProps {
  loading?: boolean;
}

const LoadingIndicator = () => (
  <View>
    <Spinner size="small" />
  </View>
);

export default function CustomButton({ loading, ...props }: Props) {
  return (
    <Button
      {...props}
      {...(loading && { accessoryRight: LoadingIndicator, disabled: true })}
    />
  );
}
