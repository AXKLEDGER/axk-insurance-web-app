'use client';

import { useRef, useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import FadeInWhenVisible from './Animation';
import { ThemeDirection } from 'config';

// third-party
import Slider from 'react-slick';

// Assets
const featureMarketplace = '/assets/images/widget/marketplace-feat.png';
const featureBlockchain = '/assets/images/widget/Blockchain-Concept.jpg';
const featureFintech = '/assets/images/widget/fintech-feat.jpeg';
const featureTraceability = '/assets/images/widget/traceability.jpg';

const AfrikabalApps = [
  {
    image: featureMarketplace,
    title: 'Marketplace',
    href: 'marketplace',
    description: 'Connect farmers and businesses to a seamless blockchain-powered marketplace for produce and land.'
  },
  {
    image: featureBlockchain,
    title: 'Blockchain Transactions',
    href: 'blockchain',
    description: 'Secure, transparent transactions powered by Afrikabal’s blockchain integration.'
  },
  {
    image: featureFintech,
    title: 'Fintech Solutions',
    href: 'fintech',
    description: 'Empower your financial operations with advanced fintech capabilities.'
  },
  {
    image: featureTraceability,
    title: 'Traceability',
    href: 'traceability',
    description: 'Ensure product authenticity and transparency with Afrikabal’s traceability tools.'
  }
];

// ==============================|| AFRIKABAL - Apps Page ||============================== //

export default function AppsPage() {
  const theme = useTheme();
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef(null);

  const goToSlide = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
    setSlideIndex(index);
  };

  const settings = {
    autoplay: true,
    fade: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => setSlideIndex(next)
  };

  return (
    <Box sx={{ bgcolor: '#2aa1af', overflow: 'hidden', pt: { md: 10, xs: 5 } }}>
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 3 }}>
              <Grid item xs={12}>
                <Typography variant="h2" color="white">
                  Empowering Applications
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography color="white">
                  Discover Afrikabal’s suite of applications designed to enhance productivity, transparency, and growth.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ pt: { md: 10, xs: 2.5 } }}>
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="start">
              <Grid item xs={12} md={6}>
                <Box pb={{ xs: 0, md: 10 }}>
                  <Grid container spacing={1.5} alignItems="center">
                    {AfrikabalApps.map((app, index) => (
                      <Grid item xs={12} key={index}>
                        <FadeInWhenVisible>
                          <Button
                            onClick={() => goToSlide(index)}
                            role="link"
                            href={`#${app.href}`}
                            sx={{
                              p: 3,
                              borderRadius: 1.5,
                              textAlign: 'left',
                              backgroundColor: slideIndex === index ? alpha(theme.palette.secondary.lighter, 0.2) : 'transparent',
                              boxShadow: slideIndex === index ? theme.customShadows.z1 : 'none',
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.secondary.lighter, 0.2),
                                boxShadow: theme.customShadows.z1
                              }
                            }}
                            variant="light"
                          >
                            <Grid container textAlign="start" spacing={2}>
                              <Grid item xs={12}>
                                <Typography variant="h4" color="white">
                                  {app.title}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography color="white">{app.description}</Typography>
                              </Grid>
                            </Grid>
                          </Button>
                        </FadeInWhenVisible>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    transform: 'scale(1.56)',
                    transformOrigin: 'top left',
                    mt: 3,
                    width: '100%',
                    pointerEvents: 'none',
                    ...(theme.direction === ThemeDirection.RTL && {
                      '& .slick-slider > .slick-list > .slick-track > .slick-slide': { float: 'right !important' }
                    })
                  }}
                >
                  <Slider ref={sliderRef} {...settings}>
                    {AfrikabalApps.map((app, index) => (
                      <Box key={index}>
                        <CardMedia
                          component="img"
                          image={app.image}
                          sx={{
                            width: '100%',
                            minHeight: '100%',
                            borderRadius: 2,
                            objectFit: 'cover'
                          }}
                        />
                      </Box>
                    ))}
                  </Slider>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
