// // next
// import Image from 'next/image';

// import useMediaQuery from '@mui/material/useMediaQuery';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';

// // assets
// const Auth0 = '/assets/images/icons/auth0.svg';
// const Cognito = '/assets/images/icons/aws-cognito.svg';
// const Google = '/assets/images/icons/google.svg';

// // ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

// export default function FirebaseSocial() {
//   const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

//   return (
//     <Stack
//       direction="row"
//       spacing={{ xs: 1, sm: 2 }}
//       justifyContent={{ xs: 'space-around', sm: 'space-between' }}
//       sx={{ '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 }, ml: { xs: 0, sm: -0.5 } } }}
//     >
//       <Button
//         variant="outlined"
//         color="secondary"
//         fullWidth={!downSM}
//         startIcon={<Image src={Google} alt="Twitter" width={16} height={16} style={{ maxWidth: '100%', height: 'auto' }} />}
//       >
//         {!downSM && 'Google'}
//       </Button>
//       <Button
//         variant="outlined"
//         color="secondary"
//         fullWidth={!downSM}
//         startIcon={<Image src={Auth0} alt="Twitter" width={16} height={16} style={{ maxWidth: '100%', height: 'auto' }} />}
//       >
//         {!downSM && 'Auth0'}
//       </Button>
//       <Button
//         variant="outlined"
//         color="secondary"
//         fullWidth={!downSM}
//         startIcon={<Image src={Cognito} alt="Twitter" width={16} height={16} style={{ maxWidth: '100%', height: 'auto' }} />}
//       >
//         {!downSM && 'Cognito'}
//       </Button>
//     </Stack>
//   );
// }
import Image from 'next/image';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// assets
const Google = '/assets/images/icons/google.svg';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

export default function FirebaseSocial() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 }, ml: { xs: 0, sm: -0.5 } } }}
    >
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<Image src={Google} alt="Google" width={16} height={16} style={{ maxWidth: '70%', height: 'auto' }} />}
      >
        Google
      </Button>
    </Stack>
  );
}
