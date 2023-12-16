/**
 * Temp until the api exists
 */
import {VacationStatistics} from "./VacationPlanning";
import {VacationData, vacationState, vacationType} from "./VacationCard";

export type VacationQuery = {
    statistics: VacationStatistics,
    vacations: VacationData[],
}

export async function fetchVacationData(): Promise<VacationQuery> {
    const response : VacationQuery = {
        statistics : {
            availableVacationDays: 10,
            totalVacationDays: 30,
            overhours: 24,
        },

        vacations: [
            {
                title: "Sommer Urlaub ",
                start: new Date("10.8.2023"),
                end: new Date("10.9.2023"),
                type: vacationType.vacation,
                overtimeAmount: 0,
                vacationtimeAmount: ((new Date("10.8.2023").getTime() - new Date("10.9.2023").getTime()) / (1000 * 60 * 60 * 24)),
                state: vacationState.pending,
                agent: "Fabian Meier",
                id: 0
            },

            {
                title: "Winter Urlaub ",
                start: new Date("10.11.2023"),
                end: new Date("10.12.2023"),
                type: vacationType.vacation,
                overtimeAmount: 0,
                vacationtimeAmount: ((new Date("10.11.2023").getTime() - new Date("10.12.2023").getTime()) / (1000 * 60 * 60 * 24)),
                state: vacationState.pending,
                agent: "Julian Kirsch",
                id: 1
            }
        ]
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() < 0.3 ? reject() : resolve(response);
        }, 1000);
    })

}