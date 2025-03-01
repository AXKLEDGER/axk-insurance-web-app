'use client';

// next
import Link from 'next/link';

// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { motion } from 'framer-motion';

// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';

// assets
import { ExportSquare } from 'iconsax-react';

// ==============================|| AFRIKABAL - TECHNOLOGIES PAGE ||============================== //

export default function TechnologiesPage() {
  const technologies = [
    {
      label: 'Blockchain Integration',
      description: 'Empowering secure, transparent transactions with blockchain technology.',
      image: '/assets/images/widget/blockchain.png',
      url: '/blockchain',
      target: '_self',
      free: true
    },
    {
      label: 'Fintech Solutions',
      description: 'Revolutionizing financial services with cutting-edge technology.',
      image: '/assets/images/widget/fintech.jpg',
      url: '/fintech',
      target: '_self',
      free: true
    },
    {
      label: 'Marketplace Platform',
      description: 'Connecting buyers and sellers in an efficient, modern marketplace.',
      image: '/assets/images/widget/marketplace.png',
      url: '/marketplace',
      target: '_self',
      free: null
    }
  ];

  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ textAlign: 'center', marginBottom: 3 }}>
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
                <Typography variant="h2">Afrikabal Technologies</Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
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
                <Typography>Explore the cutting-edge technologies powering Afrikabal&#39;s ecosystem.</Typography>
                {/* `&#39;` */}
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            {technologies.map((tech, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FadeInWhenVisible>
                  <MainCard>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <CardMedia
                        component="img"
                        image={tech.image}
                        alt={tech.label}
                        sx={{
                          width: '100%',
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: 2,
                          mb: 2,
                          cursor: 'default', // Disable pointer effect
                          pointerEvents: 'none' // Prevents interaction
                        }}
                      />
                      <Typography variant="h4" gutterBottom>
                        {tech.label}
                      </Typography>
                      <Typography sx={{ mb: 3 }}>{tech.description}</Typography>
                      <Button
                        variant="contained"
                        color="success"
                        size="large"
                        startIcon={<ExportSquare />}
                        component={Link}
                        href={tech.url}
                        target={tech.target}
                        sx={{
                          fontWeight: 500,
                          bgcolor: '#2aa1af',
                          color: 'white',
                          '&:hover': { bgcolor: '#79b963' },
                          cursor: 'default', // Disable pointer effect
                          pointerEvents: 'none' // Prevents interaction
                        }}
                      >
                        Learn More
                      </Button>
                      {/* {!(tech.free == null) && (
                        <IconButton
                          size="large"
                          shape="rounded"
                          color="success"
                          component={Link}
                          href={tech.url}
                          sx={{
                            bgcolor: '#2aa1af',
                            color: 'white',
                            '&:hover': { color: '#79b963', bgcolor: 'white' },
                            ml: 2,
                            cursor: 'default', // Disable pointer effect
                            pointerEvents: 'none' // Prevents interaction
                          }}
                        >
                          <DocumentDownload />
                        </IconButton>
                      )} */}
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
