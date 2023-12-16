import {Animated, View} from "react-native";
import {FAB, List, Text} from "react-native-paper";
import React, {useState} from "react";
import ScrollView = Animated.ScrollView;
import {VacationCard, VacationProps, vacationState, vacationType} from "../components/VacationCard";

export  function VacationPlanning(): React.JSX.Element {

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [listData, setListData] = useState<VacationProps[]>([]);
    const [i, inc] = useState(0)

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

    const addItemToList = () => {
        inc(i+1)
        setListData([testData(i), ...listData]);
    };

    return (
    <View style={{ flex: 1 }}>
        {/* Top Section */}
        <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Label 1: {text1}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Label 2: {text2}</Text>
        </View>

        {/* Middle Section - List View */}
        <ScrollView style={{ flex: 1 }}>
            <List.Section>
                <List.Subheader>List View</List.Subheader>
                {listData.map((card) => (
                    <VacationCard {...card}></VacationCard>
                ))}
            </List.Section>
        </ScrollView>

        {/* Floating Action Button */}
        <FAB
            style={{ position: 'absolute', margin: 16, right: 16, bottom: 16 }}
            icon="plus"
            onPress={addItemToList}
        />
    </View>
    );
}