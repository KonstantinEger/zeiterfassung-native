import 'react-native-gesture-handler';

import { NavigationContainer, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { PaperProvider, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { AppDrawer } from './components/AppDrawer';

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};

export default function App() {
  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        <AppDrawer />
      </NavigationContainer>
    </PaperProvider>
  );
}
