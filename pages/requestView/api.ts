export interface Request {
    id: number;
    type: 'vacation' | 'scheduleChange';
    status: 'pending' | 'approved' | 'rejected';
    details: string;
}

const generateSampleRequests = (): Request[] => {
    const names = ['John Doe', 'Jane Smith', 'Alice Johnson'];
    const types = ['vacation', 'scheduleChange'];
    const statuses = ['pending', 'approved', 'rejected'];

    const requests: Request[] = [];

    for (let i = 1; i <= 5; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        const type = types[Math.floor(Math.random() * types.length)] as 'vacation' | 'scheduleChange'; // Explicit casting
        const status = statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'approved' | 'rejected'; // Explicit casting
        const details = type === 'vacation' ?
            `Urlaubsantrag für ${name} (${i})` :
            `Arbeitszeitänderung für ${name} (${i})`;

        const request: Request = {
            id: i,
            type,
            status,
            details,
        };

        requests.push(request);
    }

    return requests;
};



export const api = {
    getRequests: (): Promise<Request[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const sampleRequests = generateSampleRequests();
                resolve(sampleRequests);
            }, 1000);
        });
    },

    updateRequestStatus: (id: number, action: 'approve' | 'reject'): Promise<Request | null> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const sampleRequests = generateSampleRequests();
                const updatedRequestIndex = sampleRequests.findIndex((request) => request.id === id);

                if (updatedRequestIndex !== -1) {
                    const updatedRequest = { ...sampleRequests[updatedRequestIndex] };
                    updatedRequest.status = action === 'approve' ? 'approved' : 'rejected';

                    const updatedRequests = [...sampleRequests];
                    updatedRequests[updatedRequestIndex] = updatedRequest;

                    resolve(updatedRequest);
                } else {
                    resolve(null);
                }
            }, 500);
        });
    },
};
