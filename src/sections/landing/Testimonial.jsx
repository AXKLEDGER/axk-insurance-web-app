'use client';
import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';

// assets
import Avatar from 'components/@extended/Avatar';
const Avatar1 = '/assets/images/users/avatar-1.png';
const Avatar2 = '/assets/images/users/avatar-2.png';
const Avatar3 = '/assets/images/users/avatar-3.png';
const Avatar4 = '/assets/images/users/avatar-4.png';
const Avatar5 = '/assets/images/users/avatar-1.png';
const Avatar6 = '/assets/images/users/avatar-2.png';
const Avatar7 = '/assets/images/users/avatar-3.png';
const Avatar8 = '/assets/images/users/avatar-4.png';
const Avatar9 = '/assets/images/users/avatar-3.png';
const Avatar10 = '/assets/images/users/avatar-4.png';

// ================================|| SLIDER - ITEMS ||================================ //

function Item({ item }) {
  return (
    <MainCard sx={{ width: { xs: '300px', md: '420px' }, cursor: 'pointer', my: 0.2, mx: 1.5 }}>
      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <Avatar alt="Avatar" size="lg" src={item.image}></Avatar>
        <Stack>
          <Typography>{item.text}</Typography>
          <Typography>
            <small>{item.name}</small> -{' '}
            <Box component="span" color="text.secondary">
              {item.designation}
            </Box>
          </Typography>
        </Stack>
      </Stack>
    </MainCard>
  );
}

// ==============================|| AFRIKABAL - TestimonialPage ||============================== //

export default function TestimonialPage() {
  const items = [
    {
      image: Avatar1,
      text: '“Afrikabal’s blockchain integration has revolutionized our transactions. 🚀 Never imagined such speed and transparency!“',
      name: 'John Doe',
      designation: 'Business Owner'
    },
    {
      image: Avatar2,
      text: '“The marketplace feature is a game changer for farmers like me. 🌾 Afrikabal is creating a brighter future for agriculture!“',
      name: 'Jane Smith',
      designation: 'Farmer'
    },
    {
      image: Avatar3,
      text: '“Transparency and security at its best! Thank you Afrikabal for redefining trust in trade. 🔒“',
      name: 'Michael Brown',
      designation: 'Trader'
    },
    {
      image: Avatar4,
      text: '“I’ve never felt more connected to opportunities. 🌍 Afrikabal is opening doors for entrepreneurs like never before!“',
      name: 'Emily Davis',
      designation: 'Entrepreneur'
    },
    {
      image: Avatar5,
      text: '“Afrikabal AI is the ultimate game changer! 🤖 From tailored recommendations to real-time insights, this is the future of commerce!“',
      name: 'Sophia White',
      designation: 'Tech Enthusiast'
    },
    {
      image: Avatar6,
      text: '“The Afrikabal AI assistant has been a lifesaver. 💡 It’s like having a personal consultant for all my business needs!“',
      name: 'Liam Johnson',
      designation: 'Startup Founder'
    },
    {
      image: Avatar7,
      text: '“Afrikabal brings empowerment to a whole new level. 🌟 With blockchain and AI, the possibilities feel endless!“',
      name: 'Amara Okoro',
      designation: 'Youth Leader'
    },
    {
      image: Avatar8,
      text: '“From secure transactions to AI-driven insights, Afrikabal is more than a platform—it’s a partner in growth. 🌱“',
      name: 'Daniel Carter',
      designation: 'Investor'
    },
    {
      image: Avatar9,
      text: '“Afrikabal has bridged the gap between technology and accessibility. 💻 Everyone deserves this level of innovation!“',
      name: 'Grace Mburu',
      designation: 'Social Entrepreneur'
    },
    {
      image: Avatar10,
      text: '“I didn’t believe AI could be so practical until Afrikabal showed me otherwise. 🤯 It’s revolutionizing how I run my farm!“',
      name: 'Ethan Patel',
      designation: 'Farmer'
    }
  ];

  return (
    <>
      <Box sx={{ mt: { md: 15, xs: 2.5 } }}>
        <Container>
          <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 4 }}>
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
                <Typography variant="h2">
                  See what our{' '}
                  <Box component="span" sx={{ color: '#2aa1af' }}>
                    users{' '}
                  </Box>
                  say about Afrikabal
                </Typography>
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
                  Our platform empowers farmers, businesses, and individuals, and the feedback we receive drives us to deliver excellence.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ mb: { md: 10, xs: 2.5 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <FadeInWhenVisible>
              <Marquee pauseOnHover gradient={false}>
                {items.map((item, index) => (
                  <Item key={index} item={item} />
                ))}
              </Marquee>
            </FadeInWhenVisible>
          </Grid>
          <Grid item xs={12}>
            <FadeInWhenVisible>
              <Marquee pauseOnHover direction="right" gradient={false}>
                {items.map((item, index) => (
                  <Item key={index} item={item} />
                ))}
              </Marquee>
            </FadeInWhenVisible>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

Item.propTypes = { item: PropTypes.object };
