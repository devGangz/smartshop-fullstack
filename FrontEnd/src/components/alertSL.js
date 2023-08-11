import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertSL() {

    return (
        <Stack className='mt-1' sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">Kiểm tra số lượng !!!</Alert>
        </Stack>
    );
}