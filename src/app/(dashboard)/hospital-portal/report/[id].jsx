import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const ReportPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const reportData = {
        'user-reports': (
            <FormattedMessage id="user-reports" defaultMessage="User Reports Content" />
        ),
        'financial-reports': (
            <FormattedMessage id="financial-reports" defaultMessage="Financial Reports Content" />
        ),
        'activity-reports': (
            <FormattedMessage id="activity-reports" defaultMessage="Activity Reports Content" />
        ),
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                {reportData[id] || (
                    <FormattedMessage id="not-found" defaultMessage="Report Not Found" />
                )}
            </Typography>
        </Box>
    );
};

export default ReportPage;