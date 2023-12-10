import { StyleSheet, View, Button } from "react-native";
import { Snackbar } from "react-native-paper";
import CircularProgress from "react-native-circular-progress-indicator";
import { useEffect, useState } from "react";
import { EVENT_STARTED, State, requestState, sendStartStop } from "./api";
import React from "react";

const BTN_TITLE_START = "Start";
const BTN_TITLE_STOP = "Stop";

// Set this to the actually bounds of 8h
const BOUNDS_SECONDS = 60;

// Converts seconds into a time string
function progressFormatterWorklet(seconds: number): string {
    'worklet';
    const date = new Date(seconds * 1000);
    return date.toISOString().substring(11, 19);
};

export function TimeTrackingPage() {

    const [snackbarVisible, setSnackbarVisible] = React.useState<boolean>(false);
    const [snackbarContent, setSnackbarContent] = React.useState<string>("");

    const [initialState, setInitialState] = useState<State>();

    const [progress, setProgress] = useState<number>(0);
    const [timerRunning, setTimerRunning] = useState<boolean>(false);
    const [btnTitle, setBtnTitle] = useState<string>(BTN_TITLE_START);

    // Requests the current state from the server after the first loading
    useEffect(() => {
        if (!initialState)
            requestState().then((state) => {
                setInitialState(state);
                setProgress(state.time);
                setTimerRunning(state.event === EVENT_STARTED);
                setBtnTitle(EVENT_STARTED === state.event ? BTN_TITLE_STOP : BTN_TITLE_START);
            }).catch((err) => {
                setSnackbarContent(err);
                setSnackbarVisible(true);
            });
    }, [initialState]);

    // Increments the timer every second
    let timeoutID: NodeJS.Timeout;
    if (timerRunning)
        timeoutID = setTimeout(() => setProgress(progress + 1), 1000);

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
                    />
            </View>

            {/* Start/stop btn stuff */}
            <View style={styles.element}>
                <Button
                    onPress={(e) => {
                        sendStartStop().then(() => {
                            clearTimeout(timeoutID);
                            setBtnTitle(timerRunning ? BTN_TITLE_START : BTN_TITLE_STOP);
                            setTimerRunning(!timerRunning);
                        }).catch((err) => {
                            setSnackbarContent(err);
                            setSnackbarVisible(true);
                        });
                    }}
                    title={btnTitle}
                />
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