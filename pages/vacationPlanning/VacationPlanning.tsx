import {Animated, RefreshControl, View} from "react-native";
import {Divider, FAB, List, Text} from "react-native-paper";
import React, {useEffect, useState} from "react";
import ScrollView = Animated.ScrollView;
import {VacationCard, VacationProps, vacationState, vacationType} from "./VacationCard";
import {dimens, styles} from "./Styles";
import {fetchVacationData} from "./api";

export type VacationStatistics = {
    availableVacationDays: number;
    totalVacationDays: number;
    overhours: number;
    vacations: VacationProps[];
}

export  function VacationPlanning(): React.JSX.Element {

    const [loading, setLoading] = useState<boolean>(true);
    const [vacationData, setVacationData] = useState<VacationStatistics>({vacations :[], availableVacationDays: 0, totalVacationDays: 0, overhours: 0})
    const [i, inc] = useState(0)

    useEffect(() => {
        if (!loading) return;

        fetchVacationData()
            .then(data => {
                setLoading(false);
                setVacationData(data);
            });
        //todo handle error
    });


    function testData(i :number): VacationProps {
        return {
            title: "Sommer Urlaub " + i,
            start: new Date("10.10.2023"),
            end: new Date("10.11.2023"),
            type: vacationType.vacation,
            overtimeAmount: 0,
            vacationtimeAmount: ((new Date("10.11.2023").getTime() - new Date("10.10.2023").getTime()) / (1000 * 60 * 60 * 24)),
            state: vacationState.pending,
            agent: "Fabian Meier",
            id: 0
        }
    }

    const addVacation = () => {
        inc(i+1)
        //setListData([testData(i), ...listData]);
        vacationData.vacations = [testData(i), ...vacationData.vacations];
        //setVacationData(vacationData)
    };

    return (
    <View style={{ flex: 1 }}>
        <View style={styles.informationWrapper}>
            <Text style={{ ...styles.mainText, marginBottom: dimens.px8 }}>
                Verfügbarer Urlaub: <Text>{vacationData.availableVacationDays} / {vacationData.totalVacationDays}</Text>
            </Text>
            <Text style={styles.mainText}>
                Überstunden: <Text>{vacationData.overhours}</Text>
            </Text>
            <Divider style={styles.divider} />
            <Text style={styles.mainText}>Urlaube</Text>
        </View>

        <ScrollView style={{ flex: 1}} refreshControl={<RefreshControl refreshing={loading} onRefresh={() => setLoading(true)} />}>
            <List.Section>
                {vacationData.vacations.map((card, index) => (
                    <View key={index} style={styles.cardWrapper}>
                        {/* Add vertical padding to each VacationCard */}
                        <VacationCard {...card} />
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