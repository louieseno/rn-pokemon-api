import { Controller, useForm } from 'react-hook-form';
import { Image, ImageProps, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Layout from 'src/components/Layout';
import { AuthFormType, FormContextValuesType } from '../types';
import { yupResolver } from '@hookform/resolvers/yup';
import { authFormValidationSchema } from '../validation';
import CustomInput from 'src/components/CustomInput';
import InputError from 'src/components/InputError';
import { createContext, useState } from 'react';
import { Icon } from '@ui-kitten/components';

const FormContextValue: FormContextValuesType = {
  isValid: false,
  isSubmitting: false,
};

export const FormContext = createContext(FormContextValue);

type Props = {
  children: React.ReactNode;
};

export default function LogoWrapper({ children }: Props) {
  const {
    handleSubmit,
    control,
    setFocus,
    formState: { errors, isValid, isSubmitting },
  } = useForm<AuthFormType>({
    resolver: yupResolver(authFormValidationSchema),
    reValidateMode: 'onChange',
    mode: 'onChange',
    shouldFocusError: true,
    criteriaMode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props?:Partial<ImageProps>): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        {...props}
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
  );

  const focusNext = (key: keyof AuthFormType) => () => setFocus(key);

  return (
    <FormContext.Provider
      value={{
        isValid,
        isSubmitting,
        handleSubmit,
      }}
    >
      <Layout customViewStyle={styles.container}>
        <Image
          source={require('assets/pokemon/logo.png')}
          resizeMode="contain"
          style={{ width: '100%', height: '60%' }}
        />
        <Controller
          name="email"
          rules={{ required: true }}
          control={control}
          render={({ field: { onChange, onBlur, ref } }) => (
            <CustomInput
              ref={ref}
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={'Email Address'}
              keyboardType="email-address"
              caption={<InputError message={errors.email?.message} />}
              maxLength={50}
              returnKeyType="next"
              blurOnSubmit={false}
              autoCapitalize="none"
              onSubmitEditing={focusNext('password')}
            />
          )}
        />
        <Controller
          name="password"
          rules={{ required: true }}
          control={control}
          render={({ field: { onChange, onBlur, ref } }) => (
            <CustomInput
              ref={ref}
              style={styles.inputField}
              secureTextEntry={secureTextEntry}
              accessoryRight={renderIcon}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={'Password'}
              caption={<InputError message={errors.password?.message} />}
              maxLength={50}
              returnKeyType="default"
              blurOnSubmit
            />
          )}
        />
        {children}
      </Layout>
    </FormContext.Provider>
  );
}

const styles = StyleSheet.create({
  inputField: {
    marginTop: 20,
  },
  container: {
    alignItems: 'center',
    marginHorizontal: 30,
  },
});
