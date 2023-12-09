import { StyleSheet, View, Button } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { useState } from "react";

const BTN_TITLE_START = "Start";
const BTN_TITLE_STOP = "Stop";

const BOUNDS_SECONDS = 60; // 60 * 60 * 8

const progressFormatter = (seconds: number) => {
    const date = new Date(seconds * 1000);
    return date.toISOString().substring(11, 19);
};

export function TimeTrackingPage() {

    const initialTimeSeconds = 0; // TODO to be provided as arg

    const [progress, setProgress] = useState<number>(initialTimeSeconds);
    const [timerRunning, setTimerRunning] = useState<boolean>(false);
    const [btnTitle, setBtnTitle] = useState<string>(timerRunning ? BTN_TITLE_STOP : BTN_TITLE_START);

    let timeoutID: NodeJS.Timeout;
    if (timerRunning)
        timeoutID = setTimeout(() => {
            setProgress(progress + 1);
        }, 1000);

    return (
        <View style={styles.container}>
            <View style={styles.element}>
                <CircularProgress
                    value={progress}
                    maxValue={BOUNDS_SECONDS}
                    duration={1000}
                    radius={120}
                    progressValueFontSize={36}
                    progressFormatter={progressFormatter} />
            </View>
            <View style={styles.element}>
                <Button
                    onPress={(e) => {
                        clearTimeout(timeoutID);
                        setBtnTitle(btnTitle === BTN_TITLE_START ? BTN_TITLE_STOP : BTN_TITLE_START);
                        setTimerRunning(!timerRunning);
                    }}
                    title={btnTitle}
                />
            </View>
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