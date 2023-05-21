import {
  Platform,
  SafeAreaView,
  StatusBar as RNStatusbar,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from 'src/navigation/RootNavigator';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { Provider } from 'react-redux';
import { store } from './app/store';

export default function Root() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <IconRegistry icons={EvaIconsPack} />
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
