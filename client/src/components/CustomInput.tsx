import { Input, InputProps } from '@ui-kitten/components';
import { forwardRef, Ref } from 'react';
import { View } from 'react-native';

const CustomInput = forwardRef((props: InputProps, ref: Ref<Input>) => {
  return (
    <View style={{ alignSelf: 'stretch' }}>
      <Input ref={ref} {...props} />
    </View>
  );
});
export default CustomInput;
