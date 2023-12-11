import { StyleSheet, View } from "react-native";
import { Snackbar, Button } from "react-native-paper";
import CircularProgress from "react-native-circular-progress-indicator";
import { useEffect, useState } from "react";
import { EVENT_STARTED, State, requestState, sendStartStop } from "./api";

const BTN_TITLE_START = "Start";
const BTN_TITLE_STOP = "Stop";

// Bounds of whole circle
const BOUNDS_SECONDS = 60 * 60 * 8;

// Converts seconds into a time string
function progressFormatterWorklet(seconds: number): string {
    'worklet';
    const date = new Date(seconds * 1000);
    return date.toISOString().substring(11, 19);
};

export function TimeTrackingPage() {

    const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
    const [snackbarContent, setSnackbarContent] = useState<string>("");

    const [progress, setProgress] = useState<number>(0);
    const [timerRunning, setTimerRunning] = useState<boolean>(false);
    const [btnTitle, setBtnTitle] = useState<string>(BTN_TITLE_START);

    const [intervalID, setIntervalID] = useState<NodeJS.Timeout>();

    // Requests the current state from the server after the first loading
    useEffect(() => {
        requestState().then((state) => {
            setProgress(state.time);
            setTimerRunning(state.event === EVENT_STARTED);
            setBtnTitle(EVENT_STARTED === state.event ? BTN_TITLE_STOP : BTN_TITLE_START);
        }).catch((err) => {
            setSnackbarContent(err);
            setSnackbarVisible(true);
        });
    }, []);

    // Manages the interval for incrementing the progress
    useEffect(() => {
        if (!timerRunning) {
            clearInterval(intervalID);
            return;
        }
        let lastUpdateTime = Date.now();
        setIntervalID(setInterval(() => {
            let newTime = Date.now();
            let passedTime = (newTime - lastUpdateTime) / 1000;
            setProgress(progress => progress + passedTime);
            lastUpdateTime = newTime;
        }, 1000));
    }, [timerRunning]);

    return (
        <View style={styles.container}>

            {/* The circular time display */}
            <View style={styles.element}>
                <CircularProgress
                    value={progress}
                    maxValue={BOUNDS_SECONDS}
                    duration={1000}
                    radius={120}
                    progressValueFontSize={36}
                    progressFormatter={progressFormatterWorklet}
                    activeStrokeColor={timerRunning ? "green" : "lightgrey"}
                    progressValueColor="black"
                />
            </View>

            {/* Start/stop btn stuff */}
            <View style={styles.element}>
                <Button
                    mode="contained"
                    textColor="black"
                    onPress={(e) => {
                        sendStartStop().then(() => {
                            setBtnTitle(timerRunning ? BTN_TITLE_START : BTN_TITLE_STOP);
                            setTimerRunning(!timerRunning);
                        }).catch((err) => {
                            setSnackbarContent(err);
                            setSnackbarVisible(true);
                        });
                    }}>
                    {btnTitle}
                </Button>
            </View>

            {/* Snackbar for error logs */}
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}>
                {snackbarContent}
            </Snackbar>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center"
    },
    element: {
        padding: 50
    }
});