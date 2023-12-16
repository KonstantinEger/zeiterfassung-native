import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { AppDrawer } from './components/AppDrawer';

export default function App() {
  return (
    <PaperProvider>
      <AppDrawer></AppDrawer>
    </PaperProvider>
  );
}
