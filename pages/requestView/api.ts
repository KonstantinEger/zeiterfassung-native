export interface State {
    key: number;
    value: string;
}

export async function requestState(): Promise<State> {
    return new Promise((resolve, reject) => {
        const testDataMap = new Map<number, string>([
            [1, "Testwert1"],
            [2, "Testwert2"],
            [3, "Testwert3"],
        ]);

    });
}
