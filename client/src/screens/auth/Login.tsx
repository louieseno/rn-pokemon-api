import { Alert, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import CustomButton from 'src/components/CustomButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from 'src/navigation/AuthStack';
import { Screens } from 'src/constants/enums';
import LogoWrapper, {
  FormContext,
} from 'src/screens/auth/components/LogoWrapper';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthFormType } from './types';
import { useLoginMutation } from 'src/app/api/apiSlice';
import { secureStorage } from 'src/services/secure-storage';
import { useAppDispatch } from 'src/app/hooks';
import { login } from 'src/app/features/userSlice';

type Props = NativeStackScreenProps<AuthStackParamList, Screens.Login>;

const Content = () => {
  const { isValid, isSubmitting, handleSubmit } = useContext(FormContext);
  const navigation = useNavigation<Props['navigation']>();
  const navigateScreen = () => navigation.replace(Screens.Register);
  const dispatch = useAppDispatch();
  const [loginUser] = useLoginMutation();

  const onSubmit = (formData: AuthFormType) => {
    loginUser(formData)
      .unwrap()
      .then(async (response) => {
        const { accessToken, user } = response;
        await secureStorage.save('token', accessToken);
        dispatch(login({ email: user.email, id: user.id }));
      })
      .catch((error) => {
        Alert.alert(
          'Registration Error:',
          error?.data ?? 'Something Went Wrong! Please contact developer.'
        );
      });
  };

  return (
    <>
      <CustomButton
        style={styles.button}
        appearance="outline"
        disabled={!isValid}
        loading={isSubmitting}
        onPress={handleSubmit!(onSubmit)}
      >
        Login
      </CustomButton>
      <Text>
        New to the app?{' '}
        <Text status="primary" onPress={navigateScreen}>
          Register
        </Text>
      </Text>
    </>
  );
};

export default function Login() {
  return (
    <LogoWrapper>
      <Content />
    </LogoWrapper>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    marginVertical: 30,
  },
});
