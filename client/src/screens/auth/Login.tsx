import { Image, StyleSheet } from "react-native";
import Layout from "src/components/Layout";
import { useForm, Controller } from "react-hook-form";
import { Button, Text } from "@ui-kitten/components";
import InputError from "src/components/InputError";
import CustomInput from "src/components/CustomInput";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email address required'),
  password: yup
    .string()
    .required('Password required')
    .min(8, 'Minimum of 8 characters')
    .max(50, 'Maximum of 50 characters'),
});

type LoginFormData = {
  email: '';
  password: '';
};

export default function Login() {

  const {
    handleSubmit,
    control,
    setFocus,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'onChange',
    shouldFocusError: true,
    criteriaMode: 'all',
  });

  const focusNext = (key: keyof LoginFormData) => () => setFocus(key);

  return (
    <Layout customViewStyle={styles.container}>
      <Image 
        source={require('assets/pokemon/logo.png')} 
        resizeMode="contain"
        style={{width: '100%', height: '60%'}}
      />
      <Controller
        name='email'
        rules={{ required: true }}
        control={control}
        render={({ field: { onChange, onBlur, ref } }) => (
          <CustomInput
            ref={ref}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={'Email Address'}
            keyboardType='email-address'
            caption={<InputError message={errors.email?.message}/>}
            maxLength={50}
            returnKeyType='next'
            blurOnSubmit={false}
            autoCapitalize='none'
            onSubmitEditing={focusNext('password')}
          />
        )}
      />
      <Controller
        name='password'
        rules={{ required: true }}
        control={control}
        render={({ field: { onChange, onBlur, ref } }) => (
          <CustomInput
            ref={ref}
            style={styles.inputField}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={'Password'}
            caption={<InputError message={errors.password?.message}/>}
            maxLength={50}
            returnKeyType='default'
            blurOnSubmit
            onSubmitEditing={()=>console.log('submit')}
          />
        )}
      />
      <Button
        style={styles.loginBtn}
        appearance='outline'
        disabled={!isValid}
      >
        Login
      </Button>

      <Text>New to the app? Register</Text>
    </Layout>
  )
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 30,
  },
  inputField: {
    marginTop: 20
  },
  loginBtn: {
    alignSelf: 'stretch',
    marginVertical: 30,
  }
});