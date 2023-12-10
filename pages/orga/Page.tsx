import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Banner, Divider, List, Text } from "react-native-paper";
import { OrgaUnit, fetchAllOrgaUnits, findRootOrgaUnit, childUnits, pathFromRootUnit } from "./api";
import { Breadcrumbs } from "../../components/Breadcrumbs";

export function OrganizationsPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [allUnits, setAllUnits] = useState<OrgaUnit[]>([]);
    const [currentUnit, setCurrentUnit] = useState<OrgaUnit | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!loading) return;

        fetchAllOrgaUnits()
            .then(units => {
                setLoading(false);
                setAllUnits(units);
                if (currentUnit === null) {
                    setCurrentUnit(findRootOrgaUnit(units));
                }
            }).catch(error => {
                console.error(error);
                setLoading(false);
                setError("Laden der Organisationseinheiten fehlgeschlagen.");
            });
    });

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={() => setLoading(true)} />}>
            <Banner
                visible={error !== null}
                actions={[{
                    label: "WIEDERHOLEN",
                    onPress: () => {
                        setError(null);
                        setLoading(true);
                    },
                }]}
            >
                <Text>Error: {error}</Text>
            </Banner>
            <View style={styles.pageContainer}>
                {loading
                    ? (<ActivityIndicator />)
                    : currentUnit && <OrgaUnitView allUnits={allUnits} currentUnit={currentUnit} setCurrentUnit={setCurrentUnit} />
                }
            </View>
        </ScrollView>
    )
}

type OrgaUnitVewProps = {
    allUnits: OrgaUnit[],
    currentUnit: OrgaUnit,
    setCurrentUnit: (unit: OrgaUnit) => void,
};

function OrgaUnitView({ allUnits, currentUnit, setCurrentUnit }: OrgaUnitVewProps) {
    const DEFAULT_EXPANDED = false;
    const [childUnitExpanded, setChildUnitExpanded] = useState(DEFAULT_EXPANDED);
    const [membersExpanded, setMembersExpanded] = useState(DEFAULT_EXPANDED);

    const currentChildUnits = childUnits(allUnits, currentUnit);

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
            <Breadcrumbs path={pathFromRootUnit(allUnits, currentUnit)} onClick={onBreadcrumbClicked} containerStyle={styles.breadcrumbs} />
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
    }
});