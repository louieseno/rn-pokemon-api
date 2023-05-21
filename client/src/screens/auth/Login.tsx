import { StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import CustomButton from "src/components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "src/navigation/AuthStack";
import { Screens } from "src/constants/enums";
import  LogoWrapper, { FormContext } from "src/screens/auth/components/LogoWrapper";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

type Props = NativeStackScreenProps<AuthStackParamList, Screens.Login>;

const Content = () => {
  const {isValid, isSubmitting} = useContext(FormContext);
  const navigation = useNavigation<Props['navigation']>();
  const navigateScreen = () => navigation.replace(Screens.Register);
 
  return (
    <>
      <CustomButton
        style={styles.button}
        appearance='outline'
        disabled={!isValid}
        loading={isSubmitting}
      >
        Login
      </CustomButton>
      <Text>New to the app? <Text status='primary' onPress={navigateScreen}>Register</Text></Text>
    </>
  )
}

export default function Login() {
  return (
    <LogoWrapper>
      <Content/>
    </LogoWrapper>)
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    marginVertical: 30,
  }
});