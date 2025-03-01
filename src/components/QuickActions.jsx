'use client';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// assets/icons
import { ArrowUp, ArrowDown, Wallet3 } from 'iconsax-react';

export default function QuickActions() {
    return (
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Button variant="outlined" startIcon={<ArrowUp />}>Add Cash</Button>
            <Button variant="contained" startIcon={<ArrowDown />}>Withdraw</Button>
            <Button variant="outlined" startIcon={<Wallet3 />}>View Wallet</Button>
        </Stack>
    );
}
