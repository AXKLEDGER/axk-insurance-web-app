'use client';

import { Card, CardContent, Typography, Stack } from '@mui/material';

export function TransactionSummaryCard() {
    return (
        <Card sx={{ borderRadius: 4, p: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" mb={2}>
                    Transaction Summary
                </Typography>
                <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                            Onramp Transactions
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600}>
                            +$8,500
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                            Offramp Transactions
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600}>
                            -$3,200
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                            Pending Transactions
                        </Typography>
                        <Typography variant="subtitle1" color="warning.main" fontWeight={600}>
                            2 Transactions
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
