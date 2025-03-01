import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// project-imports
import RegistrationCard from './RegistrationCard';

// assets
import AuthBackground from '../../../public/assets/images/auth/AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapperRegistrationForm({ children }) {
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <AuthBackground />
            <Grid container direction="column" justifyContent="center" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
                    >
                        <Grid item>
                            <RegistrationCard>{children}</RegistrationCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

AuthWrapperRegistrationForm.propTypes = { children: PropTypes.node };
