import { createDrawerNavigator } from "@react-navigation/drawer";
import { TimeTrackingPage } from "../pages/timeTracking/TimeTracking";
import { TimeOverviewPage } from "../pages/TimeOverview";
import {RequestViewPage} from "../pages/requestView/RequestView";

const Drawer = createDrawerNavigator();

export function AppDrawer() {
    // TODO: Material UI styling
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Zeiterfassung" component={TimeTrackingPage} />
            <Drawer.Screen name="Zeit Überblick" component={TimeOverviewPage} />
            <Drawer.Screen name="Anfragen" component={RequestViewPage} />
        </Drawer.Navigator>
    )
}
