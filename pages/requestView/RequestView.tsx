import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';

interface Request {
    id: number;
    type: 'vacation' | 'scheduleChange';
    status: 'pending' | 'approved' | 'rejected';
    details: string;
}

export function RequestViewPage() {
    const [requests, setRequests] = useState<Request[]>([]);

    useEffect(() => {
        // Hier sollte die Logik stehen, um die Anfragen aus Ihrer Datenquelle zu laden
        // z.B., von einem API-Endpunkt
        const mockRequests: Request[] = [
            { id: 1, type: 'vacation', status: 'pending', details: 'Urlaubsantrag für Juni' },
            { id: 2, type: 'scheduleChange', status: 'pending', details: 'Arbeitszeitänderung für nächste Woche' },
        ];

        setRequests(mockRequests);
    }, []);

    const handleApproveReject = (id: number, action: 'approve' | 'reject') => {
        // Hier sollte die Logik stehen, um den Urlaubsantrag zu genehmigen/ablehnen
        // z.B., einen API-Aufruf, um den Status in der Datenquelle zu aktualisieren
        const updatedRequests = requests.map(request =>
            request.id === id ? { ...request, status: action === 'approve' ? 'approved' : 'rejected' } : request
        );

    };

    return (
        <View>
            <FlatList
                data={requests}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card>
                        <Card.Content>
                            <Text>{item.details}</Text>
                            <Text>Status: {item.status}</Text>
                        </Card.Content>
                        {item.type === 'vacation' && item.status === 'pending' && (
                            <Card.Actions>
                                <Button onPress={() => handleApproveReject(item.id, 'approve')}>Genehmigen</Button>
                                <Button onPress={() => handleApproveReject(item.id, 'reject')}>Ablehnen</Button>
                            </Card.Actions>
                        )}
                    </Card>
                )}
            />
        </View>
    );
}
