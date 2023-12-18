import { ReactNode, createContext, useContext, useEffect, useState } from "react";

// TODO: remove, only needed as long as backend not implemented
const ERROR_POSSIBILITY = 0.0;

export type UUID = string;
export type Role = "HR" | "LEAD" | "EMPLOYEE";

export type OrgaUnit = {
    id: UUID,
    name: string,
    parentUnitID: UUID | null,
    users: User[],
};

export type User = {
    id: UUID,
    name: string,
    role: Role,
};

// **************************************
// *                                    *
// *           ORGA CONTEXT             *
// *                                    *
// **************************************

// type ContextState = {
//     units: OrgaUnit[],
//     setUnits: (units: OrgaUnit[]) => void,
// };
// 
// const OrgaContext = createContext<ContextState>({
//     units: [],
//     setUnits: () => { }
// });
// 
// export type OrgaProviderProps = {
//     children: ReactNode,
// };
// 
// export function OrgaProvider({ children }: OrgaProviderProps) {
//     const [units, setUnits] = useState<OrgaUnit[]>([]);
// 
//     return (
//         <OrgaContext.Provider value={{ units, setUnits }}>
//             {children}
//         </OrgaContext.Provider>
//     );
// }

// **************************************
// *                                    *
// *           USE ORGA STATE           *
// *                                    *
// **************************************

export function useOrgaUnits() {
    const [units, setUnits] = useState<OrgaUnit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!loading) { return; }
        const abortCtl = new AbortController();

        fetchAllOrgaUnits(abortCtl.signal)
            .then(units => {
                setLoading(false);
                setError(null);
                setUnits(units);
            })
            .catch(e => {
                setLoading(false);
                setError(`${e}`);
            })

        return () => abortCtl.abort();
    }, [loading]);

    function reload() {
        setUnits([]);
        setError(null);
        setLoading(true);
    }

    function addUnit(name: string, parent?: OrgaUnit) {
        postNewUnit(name, parent)
            .then(newUnit => {
                setError(null);
                setUnits([...units, newUnit]);
            }).catch(e => setError(`${e}`));
    }

    return {
        units,
        loading,
        error,
        reload,
        addUnit,
    };
}

// **************************************
// *                                    *
// *          UTIL FUNCTIONS            *
// *                                    *
// **************************************

export function getChildUnits(allUnits: OrgaUnit[], parent: OrgaUnit): OrgaUnit[] {
    return allUnits.filter(u => u.parentUnitID === parent.id);
}

export function getPathFromRootToUnit(allUnits: OrgaUnit[], leaf: OrgaUnit): OrgaUnit[] {
    const result = [];

    let ptr: OrgaUnit | null = leaf;
    while (ptr !== null) {
        result.unshift(ptr);
        const nextIdx = allUnits.findIndex(u => u.id === ptr!.parentUnitID);
        ptr = nextIdx !== -1 ? allUnits[nextIdx] : null;
    }
    return result;
}

export function findRootOrgaUnit(units: OrgaUnit[]): OrgaUnit | null {
    const maybeUndefined = units.find(u => u.parentUnitID === null);
    return maybeUndefined === undefined ? null : maybeUndefined;
}

function postNewUnit(name: string, parent?: OrgaUnit): Promise<OrgaUnit> {
    // TODO: post to server
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() < ERROR_POSSIBILITY
                ? reject()
                : resolve({
                    id: Math.random().toString(),
                    name,
                    parentUnitID: parent?.id || null,
                    users: []
                });
        }, 500);
    });
}

async function fetchAllOrgaUnits(signal: AbortSignal): Promise<OrgaUnit[]> {
    // TODO: load from server
    const result: OrgaUnit[] = [{
        id: "1",
        parentUnitID: null,
        name: "HSZG",
        users: [{
            id: "a",
            name: "Max Mustermann",
            role: "HR",
        }],
    }];
    return new Promise((resolve, reject) => {
        const id = setTimeout(() => {
            Math.random() < ERROR_POSSIBILITY ? reject() : resolve(result);
        }, 1000);

        signal.addEventListener("abort", () => clearTimeout(id));
    });
}
