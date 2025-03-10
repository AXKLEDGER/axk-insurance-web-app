// material-ui
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import Avatar from 'components/@extended/Avatar';

// third-party
import Slider from 'react-slick';

// assets
const Avatar1 = '/assets/images/users/avatar-1.png';
const Avatar2 = '/assets/images/users/avatar-2.png';
const Avatar3 = '/assets/images/users/avatar-3.png';
const Avatar4 = '/assets/images/users/avatar-4.png';

// ==============================|| AFRIKABAL AUTH BLUR BACK SVG ||============================== //

export default function AuthBackground() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const usercomment = [
    {
      image: Avatar1,
      name: 'Kwizera Aime',
      designation: '@aime_kwizera',
      rating: 5,
      comment:
        'Afrikabal transformed the way I connect with buyers for my produce. The blockchain-based transactions bring trust and transparency. Highly recommended!'
    },
    {
      image: Avatar2,
      name: 'Mbabazi Chantal',
      designation: '@chantal_mbabazi',
      rating: 4,
      comment:
        'The Afrikabal platform helped me secure better deals for my farm’s produce. The user experience is smooth and reliable. Keep up the great work!'
    },
    {
      image: Avatar3,
      name: 'Mugisha Samuel',
      designation: '@samuel_mugisha',
      rating: 4,
      comment:
        'As a wholesale trader, Afrikabal made bulk buying effortless. The credit scoring system is an absolute game-changer for evaluating trustworthiness.'
    },
    {
      image: Avatar4,
      name: 'Uwase Delphine',
      designation: '@uwase_delphine',
      rating: 5,
      comment:
        'The traceability features in Afrikabal assure my customers of quality produce. It’s incredible to see technology working for the agricultural sector!'
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        '&:before': {
          content: `" "`,
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
          background: 'linear-gradient(338deg, rgba(0, 0, 0, 0.3), transparent)'
        }
      }}
    >
      <Box
        sx={{
          width: 500,
          m: '0 auto',
          color: 'common.white',
          '& .slick-dots': {
            bottom: '-45px',
            '& li': {
              width: 'auto',
              margin: 0,
              '& button': {
                width: 'auto',
                '&:before': {
                  position: 'relative',
                  display: 'inline-block',
                  content: '""',
                  width: 6,
                  height: 6,
                  borderRadius: 1,
                  bgcolor: 'common.white'
                }
              },
              '&.slick-active button:before': {
                width: 30
              }
            }
          }
        }}
      >
        <Slider {...settings}>
          {usercomment.map((item, index) => (
            <Box key={index} sx={{ width: '100%', textAlign: 'center' }}>
              <Grid container spacing={3} direction="column">
                <Grid item>
                  <Avatar alt="User 1" src={item.image} variant="circular" size="lg" sx={{ m: '0 auto' }} />
                </Grid>
                <Grid item>
                  <Typography variant="h5">{item.name}</Typography>
                  <Typography variant="body2">{item.designation}</Typography>
                </Grid>
                <Grid item>
                  <Rating name="disabled" value={item.rating} readOnly />
                </Grid>
                <Grid item>
                  <Typography variant="body1">{item.comment}</Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
