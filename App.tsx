import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { AppDrawer } from './components/AppDrawer';
import { VacationCard, VacationProps, vacationType, vacationState } from './components/VacationCard';
import {VacationPlanning} from "./pages/VacationPlanning";

const testData: VacationProps = {
  title: "Sommer Urlaub",
  start: new Date("10.10.2023"),
  end: new Date("10.11.2023"),
  type: vacationType.vacation,
  overtimeAmount: 0,
  vacationtimeAmount: ((new Date("10.11.2023").getTime() - new Date("10.10.2023").getTime()) / (1000*60*60*24)),
  state: vacationState.pending,
  agent: "Fabian Meier",
  id: 0
}

export default function App() {
  return (
    <PaperProvider>
      <VacationPlanning></VacationPlanning>
    </PaperProvider>
  );
}
      // <NavigationContainer>
      //  <AppDrawer />
      // </NavigationContainer>
