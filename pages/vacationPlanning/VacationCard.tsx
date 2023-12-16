import * as React from "react";
import { Card, Menu, Text, IconButton, Button, IconButtonProps } from 'react-native-paper';

//demo props maybe changed later for api complience
export type VacationProps = {
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

export enum vacationType {
    vacation = "Urlaub",
    overtime = "Überstunden",
    hybrid = "Gemischt"
}

export enum vacationState {
    approved = "Genehmigt",
    pending = "Ausstehend",
    declined = "Abgelehnt"
}

export function VacationCard(props: VacationProps) {
    const [menuVisible, setMenuVisible] = React.useState(false);
    function openMenu() { setMenuVisible(true) }
    function closeMenu() { setMenuVisible(false) }
    
    function editCard(){

    }
    
    function deleteCard(){

    }
    
    return (
        <Card mode="elevated" >
            <Card.Title
                title={props.title}
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
                <Text>
                    <Text variant="bodyMedium">Von: </Text>
                    <Text variant="bodyMedium">{props.start.toLocaleString()}</Text>
                </Text>
                <Text>
                    <Text variant="bodyMedium">Bis: </Text>
                    <Text variant="bodyMedium">{props.end.toLocaleString()}</Text>
                </Text>
                <Text>
                    <Text variant="bodyMedium">Typ: </Text>
                    <Text variant="bodyMedium">{props.type}</Text>
                </Text>
                <Text>
                    <Text variant="bodyMedium">Status: </Text>
                    <Text variant="bodyMedium" style={{ color: getVacationStateColor(props.state) }}>{props.state}</Text>
                </Text>
                <Text>
                    <Text variant="bodyMedium">Vertreter: </Text>
                    <Text variant="bodyMedium">{props.agent}</Text>
                </Text>
            </Card.Content>
        </Card>
    );
}

function getVacationStateColor(state: vacationState) {
    switch (state) {
        case vacationState.approved:
            return "green";
        case vacationState.declined:
            return "red";
        case vacationState.pending:
            return "orange";
    }
}