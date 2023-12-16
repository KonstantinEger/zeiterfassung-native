import {Animated, RefreshControl, View} from "react-native";
import {Divider, FAB, List, Text} from "react-native-paper";
import React, {useEffect, useState} from "react";
import ScrollView = Animated.ScrollView;
import {VacationCard, VacationData, vacationState, vacationType} from "./VacationCard";
import {dimens, styles} from "./Styles";
import {fetchVacationData} from "./api";
import {LinearLayout} from "../../components/LinearLayout";

export type VacationStatistics = {
    availableVacationDays: number;
    totalVacationDays: number;
    overhours: number;
}

export  function VacationPlanning(): React.JSX.Element {

    const [loading, setLoading] = useState<boolean>(true);
    const [vacationStatistics, setVacationStatistics] = useState<VacationStatistics>({availableVacationDays: 0, totalVacationDays: 0, overhours: 0})
    const [vacations, setVacations] = useState<VacationData[]>([])
    const [tmpNameNumber, incTmpNameNumber] = useState(0)

    useEffect(() => {
        if (!loading) return;

        fetchVacationData()
            .then(data => {
                setLoading(false);
                setVacationStatistics(data.statistics);
                setVacations(data.vacations);
            });
        //todo handle error
    });

    function defaultData(i :number): VacationData {
        return {
            title: "Unbenannter Urlaub " + i,
            start: new Date(Date.now()),
            end: new Date(Date.now() + 24 * 60 * 60 * 1000),
            type: vacationType.vacation,
            overtimeAmount: 0,
            vacationtimeAmount: ((new Date("10.11.2023").getTime() - new Date("10.10.2023").getTime()) / (1000 * 60 * 60 * 24)),
            state: vacationState.notSubmitted,
            agent: "Fabian Meier", /*todo get self*/
            id: 0
        }
    }

    const addVacation = () => {
        incTmpNameNumber(tmpNameNumber+1)
        setVacations([defaultData(tmpNameNumber), ...vacations]);
    };

    return (
    <View style={{ flex: 1 }}>
        <View style={styles.informationWrapper}>
            <LinearLayout>
                <Text style={{ ...styles.label, marginBottom: dimens.px8 }}>Verfügbarer Urlaub:</Text>
                <Text>{vacationStatistics.availableVacationDays} / {vacationStatistics.totalVacationDays}</Text>
            </LinearLayout>
            <LinearLayout>
                <Text style={{ ...styles.label, marginBottom: dimens.px8 }}>Überstunden:</Text>
                <Text>{vacationStatistics.overhours}</Text>
            </LinearLayout>
            {/*
            <Text style={{ ...styles.label, marginBottom: dimens.px8 }}>
                Verfügbarer Urlaub: <Text style={styles.text}>{vacationStatistics.availableVacationDays} / {vacationStatistics.totalVacationDays}</Text>
            </Text>
            <Text style={styles.label}>
                Überstunden: <Text style={styles.text}>{vacationStatistics.overhours}</Text>
            </Text>
            <Divider style={styles.divider} />
            <Text style={styles.label}>Urlaube</Text>
            */}

            <Divider style={styles.divider} />
            <Text style={styles.label}>Urlaube</Text>
        </View>

        <ScrollView style={{ flex: 1}} refreshControl={<RefreshControl refreshing={loading} onRefresh={() => setLoading(true)} />}>
            <List.Section>
                {vacations.map((card, index) => (
                    <View key={index} style={styles.cardWrapper}>
                        {/* Add vertical padding to each VacationCard */}
                        <VacationCard  {...{
                            vacationData: card,
                            onDeleteClicked: () => {setVacations(vacations.filter(item => item !== card))},
                        }}  />
                    </View>
                ))}
            </List.Section>
        </ScrollView>

        <FAB
            style={styles.actionButton}
            icon="plus"
            onPress={addVacation}
        />
    </View>
    );
}