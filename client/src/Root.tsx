import { Platform, SafeAreaView, StatusBar as RNStatusbar, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from 'src/navigation/RootNavigator';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Provider } from 'react-redux';
import { store } from './app/store';

export default function Root() {
  return (
    <SafeAreaView style={styles.container}>
       <StatusBar style='auto' />
       <ApplicationProvider {...eva} theme={eva.light}>
          <Provider store={store}>
            <RootNavigator />
          </Provider>
        </ApplicationProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:
      Platform.OS === 'android' ? (RNStatusbar?.currentHeight ?? 0) + 5 : 0,
  },
});
