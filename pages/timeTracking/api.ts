export const EVENT_STARTED = "STARTED";
export const EVENT_STOPPED = "STOPPED";

export interface State {
    event: string, // EVENT_STARTED or EVENT_STOPPED on the server
    time: number // time in seconds the time tracking was active
}

export async function requestState(): Promise<State> {
    return new Promise((resolve, reject) => {

        // Test state object
        setTimeout(() => resolve({
            event: EVENT_STARTED,
            time: 30
        }), 50);

    });
}

export async function sendStartStop(): Promise<void> {
    return new Promise((resolve, reject) => {
        // TODO send start/stop click info

        // After a little bit of RTT...
        setTimeout(() => resolve(), 50);
    });
}