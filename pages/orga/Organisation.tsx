import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Banner, Button, Dialog, Divider, FAB, HelperText, List, Portal, Text, TextInput } from "react-native-paper";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { OrgaUnit, getChildUnits, getPathFromRootToUnit, useOrgaUnits, findRootOrgaUnit } from "./OrgaState";

export function OrganizationsPage() {
    const [currentUnit, setCurrentUnit] = useState<OrgaUnit | null>(null);
    const [fabOpen, setFabOpen] = useState(false);
    const [addChildUnitDialogOpen, setAddChildUnitDialogOpen] = useState(false);
    const orga = useOrgaUnits();

    console.log(orga);

    useEffect(() => {
        if (currentUnit !== null) { return; }
        setCurrentUnit(findRootOrgaUnit(orga.units));
    }, [orga.units]);

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={orga.loading} onRefresh={orga.reload} />}>
            <Banner
                visible={orga.error !== null}
                actions={[{
                    label: "WIEDERHOLEN",
                    onPress: orga.reload,
                }]}
            >
                <Text>Error: {orga.error}</Text>
            </Banner>
            <View style={styles.pageContainer}>
                {
                    !orga.loading && currentUnit && <OrgaUnitView allUnits={orga.units} currentUnit={currentUnit} setCurrentUnit={setCurrentUnit} />
                }
            </View>
            <Portal>
                {/* Actions for adding users / units */}
                <FAB.Group
                    open={fabOpen}
                    visible
                    icon="plus"
                    actions={[
                        {
                            icon: "cube-outline",
                            label: "Unterorganisation",
                            onPress: () => {
                                setFabOpen(false);
                                setAddChildUnitDialogOpen(true);
                            }
                        },
                        {
                            icon: "account",
                            label: "Mitarbeiter",
                            onPress: () => { }
                        }
                    ]}
                    onStateChange={({ open }) => setFabOpen(open)}
                />

                <AddChildUnitDialog
                    visible={addChildUnitDialogOpen}
                    onDismis={result => {
                        setAddChildUnitDialogOpen(false);
                        if (result.status !== "SUCCESS") { return; }
                        orga.addUnit(result.state.newUnitName, currentUnit ?? undefined);
                    }}
                />
            </Portal>
        </ScrollView>
    )
}

type AddChildUnitDialogState = {
    newUnitName: string,
};

type AddChildUnitDialogResult = { status: "SUCCESS", state: AddChildUnitDialogState } | { status: "ABORTED" };

type AddChildUnitDialogProps = {
    onDismis: (result: AddChildUnitDialogResult) => void,
    visible: boolean,
};

function AddChildUnitDialog(props: AddChildUnitDialogProps) {
    const [state, setState] = useState<AddChildUnitDialogState>({ newUnitName: "" });

    function closeAsAborted() {
        props.onDismis({ status: "ABORTED" });
        setState(prev => ({ ...prev, newUnitName: "" }));
    }

    function closeAsSuccess() {
        props.onDismis({ status: "SUCCESS", state });
        setState(prev => ({ ...prev, newUnitName: "" }));
    }

    const validationError = state.newUnitName.trim().length < 1
        ? "Muss mindestens 1 nicht-whitespace enthalten."
        : null;

    return (
        <Dialog
            visible={props.visible}
            onDismiss={closeAsAborted}
        >
            <Dialog.Title>Untereinheit hinzufügen</Dialog.Title>
            <Dialog.Content>
                <TextInput
                    label="Name"
                    value={state.newUnitName}
                    onChangeText={text => setState(prev => ({ ...prev, newUnitName: text }))}
                />
                <HelperText type="error" visible={validationError !== null}>
                    Error: {validationError}
                </HelperText>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={closeAsAborted}>Abbrechen</Button>
                <Button mode="contained" onPress={closeAsSuccess} disabled={validationError !== null}>Speichern</Button>
            </Dialog.Actions>
        </Dialog>
    );
}

type OrgaUnitVewProps = {
    allUnits: OrgaUnit[],
    currentUnit: OrgaUnit,
    setCurrentUnit: (unit: OrgaUnit) => void,
};

function OrgaUnitView({ allUnits, currentUnit, setCurrentUnit }: OrgaUnitVewProps) {
    const DEFAULT_EXPANDED = true;
    const [childUnitExpanded, setChildUnitExpanded] = useState(DEFAULT_EXPANDED);
    const [membersExpanded, setMembersExpanded] = useState(DEFAULT_EXPANDED);

    const currentChildUnits = getChildUnits(allUnits, currentUnit);

    function onBreadcrumbClicked(unitId: string) {
        const unitIndex = allUnits.findIndex(u => u.id === unitId);
        if (unitIndex !== -1) {
            setChildUnitExpanded(DEFAULT_EXPANDED);
            setMembersExpanded(DEFAULT_EXPANDED);
            setCurrentUnit(allUnits[unitIndex]);
        }
    }

    function onChildUnitClicked(unit: OrgaUnit) {
        setChildUnitExpanded(DEFAULT_EXPANDED);
        setMembersExpanded(DEFAULT_EXPANDED);
        setCurrentUnit(unit);
    }

    return (
        <View>
            <Breadcrumbs path={getPathFromRootToUnit(allUnits, currentUnit)} onClick={onBreadcrumbClicked} containerStyle={styles.breadcrumbs} />
            <Text style={styles.heading} variant="headlineMedium" >{currentUnit.name}</Text>
            <Divider />
            <List.Accordion
                title={`Untereinheiten (${currentChildUnits.length})`}
                expanded={childUnitExpanded}
                onPress={() => setChildUnitExpanded(!childUnitExpanded)}
                left={props => <List.Icon {...props} icon="cube-outline" />}
            >
                {currentChildUnits.map(u => (
                    <List.Item key={u.id} onPress={() => onChildUnitClicked(u)} title={u.name} />
                ))}
            </List.Accordion>
            <Divider />
            <List.Accordion
                title={`Mitarbeiter (${currentUnit.users.length})`}
                expanded={membersExpanded}
                onPress={() => setMembersExpanded(!membersExpanded)}
                left={props => <List.Icon {...props} icon="account" />}
            >
                {currentUnit.users.map(user => (
                    <List.Item key={user.id} title={user.name} />
                ))}
            </List.Accordion>
            <Divider />
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        paddingTop: 5,
    },
    breadcrumbs: {
        marginVertical: 5,
        marginHorizontal: 10,
    },
    heading: {
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 10,
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        margin: 15,
    }
});
