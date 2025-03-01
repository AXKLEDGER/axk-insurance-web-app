'use client';

// material-ui
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { motion } from 'framer-motion';

// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';
import { ExportSquare } from 'iconsax-react';

// Assets
const exploreMarketplace = '/assets/images/widget/marketplace.png'; // Afrikabal marketplace placeholder
const blockchainIntegration = '/assets/images/widget/blockchain.png'; // Blockchain placeholder

const AfrikabalFeatures = [
  {
    icon: exploreMarketplace,
    title: 'Explore Marketplace',
    description: 'Discover an extensive range of produce and land listings, empowering businesses and farmers alike.',
    preview: '/marketplace'
  },
  {
    icon: blockchainIntegration,
    title: 'Blockchain Integration',
    description: 'Harness the power of blockchain for secure, transparent, and efficient transactions.',
    preview: '/blockchain'
  }
];

// ==============================|| AFRIKABAL - COMBO PAGE ||============================== //

export default function ComboPage() {
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
                <Typography variant="h2">Afrikabal Features</Typography>
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
                  Afrikabal provides cutting-edge tools and features for farmers, traders, and businesses to thrive in a blockchain-powered
                  ecosystem.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {AfrikabalFeatures.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <FadeInWhenVisible>
                  <MainCard>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <CardMedia
                        component="img"
                        image={feature.icon}
                        alt={feature.title}
                        sx={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: 2,
                          mb: 2
                        }}
                      />
                      <Typography variant="h4" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography sx={{ mb: 3 }}>{feature.description}</Typography>
                      <Button
                        variant="contained"
                        color="success"
                        size="large"
                        startIcon={<ExportSquare />}
                        component={Link}
                        href={feature.preview}
                        sx={{
                          fontWeight: 500,
                          bgcolor: '#2aa1af',
                          color: 'white',
                          '&:hover': { bgcolor: '#79b963' }
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </MainCard>
                </FadeInWhenVisible>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
