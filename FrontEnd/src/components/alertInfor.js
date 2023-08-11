import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertInformation() {

    return (
        <Stack className='mt-1' sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error" style={{ fontFamily: "Montserrat" }}>Cập nhật đơn hàng!</Alert>
        </Stack>
    );
}