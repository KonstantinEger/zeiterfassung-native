import * as React from "react";
import { Card, Menu, Text, IconButton, Button, IconButtonProps } from 'react-native-paper';
import {LinearLayout} from "../../components/LinearLayout";
import {styles} from "./Styles";

//demo props maybe changed later for api complience
export type VacationData = {
    title: String;
    type: vacationType;
    start: Date;
    end: Date;
    vacationtimeAmount: Number;
    overtimeAmount: Number;
    id: Number;
    state: vacationState;
    agent: String;
}

export type VacationCardProps  = {
    vacationData: VacationData;
    onDeleteClicked: () => void;
}

export enum vacationType {
    vacation = "Urlaub",
    overtime = "Überstunden",
    hybrid = "Gemischt"
}

export enum vacationState {
    notSubmitted = "Nicht Eingereicht",
    approved = "Genehmigt",
    pending = "Ausstehend",
    declined = "Abgelehnt"
}

export function VacationCard(props: VacationCardProps) {
    const [menuVisible, setMenuVisible] = React.useState(false);
    function openMenu() { setMenuVisible(true) }
    function closeMenu() { setMenuVisible(false) }
    
    function editCard(){
    }

    function deleteCard(){
        props.onDeleteClicked();
    }

    return (
        <Card mode="elevated" >
            <Card.Title
                title={props.vacationData.title}
                right={(props) => (
                    <Menu
                        visible={menuVisible}
                        onDismiss={closeMenu}
                        anchor={<IconButton {...props} icon="dots-vertical" onPress={openMenu} />}>
                        <Menu.Item onPress={editCard} title="Bearbeiten" leadingIcon="pencil"/>
                        <Menu.Item onPress={deleteCard} title="Löschen" leadingIcon="delete" />
                    </Menu>
                )}
            />
            <Card.Content>
                <LinearLayout>
                    <Text variant="bodyMedium" style={styles.label}>Von: </Text>
                    <Text variant="bodyMedium">{props.vacationData.start.toLocaleString()}</Text>
                </LinearLayout>

                <LinearLayout>
                    <Text variant="bodyMedium" style={styles.label}>Bis: </Text>
                    <Text variant="bodyMedium">{props.vacationData.end.toLocaleString()}</Text>
                </LinearLayout>

                <LinearLayout>
                    <Text variant="bodyMedium" style={styles.label}>Typ: </Text>
                    <Text variant="bodyMedium">{props.vacationData.type}</Text>
                </LinearLayout>

                <LinearLayout>
                    <Text variant="bodyMedium" style={styles.label}>Status: </Text>
                    <Text variant="bodyMedium" style={{ color: getVacationStateColor(props.vacationData.state) }}>{props.vacationData.state}</Text>
                </LinearLayout>

                <LinearLayout>
                    <Text variant="bodyMedium" style={styles.label}>Vertreter: </Text>
                    <Text variant="bodyMedium">{props.vacationData.agent}</Text>
                </LinearLayout>
                {/*

                <Text>
                    <Text variant="bodyMedium">Von: </Text>
                    <Text variant="bodyMedium">{props.vacationData.start.toLocaleString()}</Text>
                </Text>
                <Text>
                    <Text variant="bodyMedium">Bis: </Text>
                    <Text variant="bodyMedium">{props.vacationData.end.toLocaleString()}</Text>
                </Text>
                <Text>
                    <Text variant="bodyMedium">Typ: </Text>
                    <Text variant="bodyMedium">{props.vacationData.type}</Text>
                </Text>
                <Text>
                    <Text variant="bodyMedium">Status: </Text>
                    <Text variant="bodyMedium" style={{ color: getVacationStateColor(props.vacationData.state) }}>{props.vacationData.state}</Text>
                </Text>
                <Text>
                    <Text variant="bodyMedium">Vertreter: </Text>
                    <Text variant="bodyMedium">{props.vacationData.agent}</Text>
                </Text>
                */}
            </Card.Content>
        </Card>
    );
}

function getVacationStateColor(state: vacationState) {
    switch (state) {
        case vacationState.notSubmitted:
            return "purple";
        case vacationState.approved:
            return "green";
        case vacationState.declined:
            return "red";
        case vacationState.pending:
            return "orange";
    }
}