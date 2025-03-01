'use client';

// material-ui
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { motion } from 'framer-motion';

// project-imports
import FadeInWhenVisible from './Animation';

// Placeholder partner logos
const partner1 = '/assets/images/partners/partner1.jpeg';
const partner2 = '/assets/images/partners/partner2.png';
const partner3 = '/assets/images/partners/partner3.png';
const partner4 = '/assets/images/partners/partner4.png';
const partner5 = '/assets/images/partners/partner5.jpg';
const partner6 = '/assets/images/partners/partner6.png';
// const partner7 = '/assets/images/partners/partner7.png';
// const partner8 = '/assets/images/partners/partner8.png';

// ==============================|| AFRIKABAL - Partner Page ||============================== //
export default function PartnerPage() {
  const items = [
    { image: partner1 },
    { image: partner2 },
    { image: partner3 },
    { image: partner4 },
    { image: partner5 },
    { image: partner6 }
    // { image: partner7 },
    // { image: partner8 }
  ];

  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 3 }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2
                }}
              >
                <Typography variant="h2">Our Partners</Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4
                }}
              >
                <Typography>
                  Afrikabal collaborates with innovative organizations and businesses to empower farmers and traders across the globe.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            {items.map((item, index) => (
              <Grid item key={index}>
                <FadeInWhenVisible>
                  <Box
                    sx={{
                      '& img': {
                        transition: 'all 0.3s ease-in-out',
                        filter: 'grayscale(1)',
                        opacity: 0.4,
                        cursor: 'pointer'
                      },
                      '&:hover img': { filter: 'grayscale(0)', opacity: 1 }
                    }}
                  >
                    <CardMedia component="img" image={item.image} sx={{ width: 120, height: 'auto' }} />
                  </Box>
                </FadeInWhenVisible>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
