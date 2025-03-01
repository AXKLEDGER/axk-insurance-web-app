'use client';

import { List, ListItem, ListItemAvatar, ListItemText, Typography, Avatar } from '@mui/material';
import MainCard from 'components/MainCard';

const mockTransactions = [
    { id: 1, type: 'Onramp', amount: '+$1,000', status: 'Completed' },
    { id: 2, type: 'Offramp', amount: '-$500', status: 'Pending' },
    { id: 3, type: 'Marketplace', amount: '+$300', status: 'Completed' },
];

export default function RecentActivity() {
    return (
        <MainCard title="Recent Activity">
            <List>
                {mockTransactions.map((tx) => (
                    <ListItem key={tx.id}>
                        <ListItemAvatar>
                            <Avatar>{tx.type[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${tx.type} Transaction`}
                            secondary={`Amount: ${tx.amount} | Status: ${tx.status}`}
                        />
                    </ListItem>
                ))}
            </List>
        </MainCard>
    );
}
