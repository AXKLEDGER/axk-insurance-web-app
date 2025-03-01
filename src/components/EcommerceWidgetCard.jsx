import PropTypes from 'prop-types';
import { Grid, Stack, Typography, Avatar, Box } from '@mui/material';

export default function EcommerceWidgetCard({ title, count, percentage, isLoss, color, isActive }) {
    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: isActive ? color.light : 'background.default',
                border: `1px solid ${color.main}`,
                boxShadow: isActive ? `0px 4px 8px ${color.main}` : 'none',
                cursor: 'pointer'
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Stack>
                        <Typography variant="h6">{title}</Typography>
                        <Typography variant="h4">{count}</Typography>
                        <Typography
                            variant="caption"
                            color={isLoss ? 'error.main' : 'success.main'}
                        >
                            {isLoss ? '-' : '+'}
                            {percentage}%
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Avatar sx={{ bgcolor: color.main, width: 48, height: 48 }}>
                        {title[0]}
                    </Avatar>
                </Grid>
            </Grid>
        </Box>
    );
}

EcommerceWidgetCard.propTypes = {
    title: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
    isLoss: PropTypes.bool.isRequired,
    color: PropTypes.object.isRequired,
    isActive: PropTypes.bool
};
