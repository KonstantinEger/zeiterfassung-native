import { createDrawerNavigator } from "@react-navigation/drawer";
import { TimeTrackingPage } from "../pages/TimeTracking";
import { TimeOverviewPage } from "../pages/TimeOverview";

const Drawer = createDrawerNavigator();

export function AppDrawer() {
    // TODO: Material UI styling
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Zeiterfassung" component={TimeTrackingPage} />
            <Drawer.Screen name="Zeit Überblick" component={TimeOverviewPage} />
        </Drawer.Navigator>
    )
}
