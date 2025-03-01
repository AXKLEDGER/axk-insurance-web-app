// material-ui
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| DRAWER CONTENT - NAV CARD ||============================== //

export default function NavCard() {
  return (
    <Box mt={4}>
      <MainCard sx={{ bgcolor: '#F4F7F6', m: 3, border: '1px solid #D9E2E1', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}> {/* Refined background color */}
        <Stack alignItems="center" spacing={2.5}>
          <Stack alignItems="center">
            <Typography variant="h5" color="text.primary">
              Need Help?
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Swift and Reliable Support
            </Typography>
          </Stack>
          <AnimateButton>
            <Button
              variant="contained"
              size="medium"
              component={Link}
              href="mailto:support@afrikabal.org"
              target="_blank"
              sx={{
                backgroundColor: '#2aa1af',
                color: '#FFFFFF',
                border: '1px solid #2aa1af',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontWeight: 600,
                maxWidth: '200px',
                width: '100%',
                textAlign: 'center',
                '&:hover': {
                  backgroundColor: '#8BBF5C',
                  borderColor: '#8BBF5C',
                  boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              Contact Us
            </Button>
          </AnimateButton>
        </Stack>
      </MainCard>
    </Box>
  );
}

// import { Box, Stack, Typography, LinearProgress } from '@mui/material';
// import MainCard from 'components/MainCard';

// export default function NavCard() {
//   const progress = 70; // Example progress value

//   return (
//     <Box mt={4}>
//       <MainCard
//         sx={{
//           bgcolor: '#F4F7F6',
//           m: 3,
//           border: '1px solid #D9E2E1',
//           boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Stack spacing={2} alignItems="center">
//           <Typography variant="h5" color="text.primary">
//             Your Progress
//           </Typography>
//           <LinearProgress
//             variant="determinate"
//             value={progress}
//             sx={{
//               width: '100%',
//               height: 10,
//               borderRadius: 5,
//               backgroundColor: '#D9E2E1',
//               '& .MuiLinearProgress-bar': {
//                 backgroundColor: '#2aa1af',
//               },
//             }}
//           />
//           <Typography variant="body2" color="text.secondary">
//             {progress}% Completed
//           </Typography>
//         </Stack>
//       </MainCard>
//     </Box>
//   );
// }

