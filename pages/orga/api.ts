export type OrgaUnit = {
    id: string;
    parentUnit: string | null;
    name: string;
    users: User[];
};

export type User = {
    id: string;
    name: string;
    role: "MEMBER" | "LEAD" | "HR";
}

export async function fetchAllOrgaUnits(): Promise<OrgaUnit[]> {
    // TODO: load from server
    const result: OrgaUnit[] = [{
        id: "1",
        parentUnit: null,
        name: "HSZG",
        users: [{
            id: "a",
            name: "Max Mustermann",
            role: "HR",
        }],
    }, {
        id: "2",
        parentUnit: "1",
        name: "F-EI",
        users: [],
    }, {
        id: "3",
        parentUnit: "1",
        name: "F-MK",
        users: [],
    }, {
        id: "4",
        parentUnit: "2",
        name: "Informatik",
        users: [],
    }, {
        id: "5",
        parentUnit: "2",
        name: "Elektrotechnik",
        users: [],
    }];
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() < 0.3 ? reject() : resolve(result);
        }, 1000);
    })
}

export function findRootOrgaUnit(units: OrgaUnit[]): OrgaUnit | null {
    const maybeUndefined = units.find(u => u.parentUnit === null);
    return maybeUndefined === undefined ? null : maybeUndefined;
}

export function pathFromRootUnit(allUnits: OrgaUnit[], child: OrgaUnit): OrgaUnit[] {
    const result = [];

    let ptr: OrgaUnit | null = child;
    while (ptr !== null) {
        result.unshift(ptr);
        const nextIdx = allUnits.findIndex(u => u.id === ptr!.parentUnit);
        ptr = nextIdx !== -1 ? allUnits[nextIdx] : null;
    }
    return result;
}

export function childUnits(allUnits: OrgaUnit[], parent: OrgaUnit): OrgaUnit[] {
    return allUnits.filter(u => u.parentUnit === parent.id);
}
