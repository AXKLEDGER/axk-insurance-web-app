// next
import Link from 'next/link';

// material-ui
import Links from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ==============================|| MAIN LAYOUT - FOOTER ||============================== //

export default function Footer() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
      <Typography variant="caption">
        &copy; {new Date().getFullYear()} { }
        <Links
          component={Link}
          href="https://afrikabal.org"
          target="_blank"
          color="text.primary"
          sx={{ color: 'primary.main', fontWeight: 'bold' }}
        >
          Afrikabal
        </Links>
        . All rights reserved.
      </Typography>
      {/* <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
        <Links component={Link} href="https://afrikabal.org" target="_blank" variant="caption" color="text.primary">
          Home
        </Links>

        <Links component={Link} href="mailto:support@afrikabal.org" target="_blank" variant="caption" color="text.primary">
          Support
        </Links>
      </Stack> */}
    </Stack>
  );
}
