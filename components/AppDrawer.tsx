import { createDrawerNavigator } from "@react-navigation/drawer";
import { TimeTrackingPage } from "../pages/TimeTracking";
import { TimeOverviewPage } from "../pages/TimeOverview";
import { View } from "react-native";

const Drawer = createDrawerNavigator();

export function AppDrawer() {
    return (
        <View>
            {/* TODO: Material Design styling */}
            <Drawer.Navigator>
                <Drawer.Screen name="Zeiterfassung" component={TimeTrackingPage} />
                <Drawer.Screen name="Zeit Überblick" component={TimeOverviewPage} />
            </Drawer.Navigator>
        </View>
    )
}
