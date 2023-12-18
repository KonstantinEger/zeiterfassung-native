import React, { useState, useEffect } from 'react';
import {View, FlatList} from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { api, Request as LocalRequest } from './api';

export function RequestViewPage() {
    const [requests, setRequests] = useState<LocalRequest[]>([]);

    useEffect(() => {
        api.getRequests().then((data) => setRequests(data));
    }, []);

    const handleApproveReject = (id: number, action: 'approve' | 'reject') => {
        api.updateRequestStatus(id, action).then((updatedRequest) => {
            if (updatedRequest) {
                setRequests((prevRequests) =>
                    prevRequests.map((request) => (request.id === updatedRequest.id ? updatedRequest : request))
                );
            }
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={requests}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.elementCard}>
                        <Card.Content>
                            <Text>{item.details}</Text>
                            <Text>Status: {item.status}</Text>
                        </Card.Content>
                        {item.type === 'vacation' && item.status === 'pending' && (
                            <Card.Actions>
                                <Button mode="contained" onPress={() => handleApproveReject(item.id, 'approve')}>
                                    Genehmigen
                                </Button>
                                <Button mode="contained" onPress={() => handleApproveReject(item.id, 'reject')}>
                                    Ablehnen
                                </Button>
                            </Card.Actions>
                        )}
                    </Card>
                )}
            />
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        padding: 16,
    },
    elementCard: {
        marginBottom: 16,
    },
};
