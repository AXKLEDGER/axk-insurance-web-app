import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';
import MessageCard from 'components/cards/statistics/MessageCard';
import { ThemeMode } from 'config';

// assets
import { Add, NotificationStatus } from 'iconsax-react';

const message1 = '/assets/images/widget/message/message1.svg';
const message2 = '/assets/images/widget/message/message2.svg';
const message3 = '/assets/images/widget/message/message3.svg';

// ==============================|| HEADER CONTENT - CUSTOMIZATION (AFRIKABAL) ||============================== //

export default function Customization() {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'background.paper' : '#2aa1af'; // Afrikabal green
  const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : '#EAF6E9'; // Lighter Afrikabal green

  return (
    <>
      <Box sx={{ flexShrink: 0, ml: 0.75 }}>
        <IconButton
          color="secondary"
          variant="light"
          onClick={handleToggle}
          aria-label="settings toggler"
          size="large"
          sx={{ color: '#044A29', bgcolor: open ? iconBackColorOpen : iconBackColor, p: 1 }}
        >
          <NotificationStatus variant="Bulk" />
        </IconButton>
      </Box>
      <Drawer sx={{ zIndex: 2001 }} anchor="right" onClose={handleToggle} open={open} PaperProps={{ sx: { width: { xs: 350, sm: 474 } } }}>
        {open && (
          <MainCard content={false} sx={{ border: 'none', borderRadius: 0, height: '100vh' }}>
            <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
              <Box sx={{ p: 2.5 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5}>
                  <Typography variant="h5" sx={{ color: '#044A29' }}>
                    What’s new in Afrikabal?
                  </Typography>
                  <IconButton color="secondary" sx={{ p: 0 }} onClick={handleToggle}>
                    <Add size={28} style={{ transform: 'rotate(45deg)' }} />
                  </IconButton>
                </Stack>
                <Grid container spacing={1.5} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Today</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <MessageCard
                      status={{ label: 'New Feature', color: 'success' }}
                      time="just now"
                      title="Tokenize Your Produce"
                      message="You can now tokenize your agricultural produce for secure and transparent trading on Afrikabal."
                      src={message1}
                      actions={[
                        {
                          label: 'Learn More',
                          button: {
                            variant: 'outlined',
                            color: 'secondary',
                            fullWidth: true
                          }
                        },
                        {
                          label: 'Try It Now',
                          button: {
                            variant: 'contained',
                            fullWidth: true
                          }
                        }
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MessageCard
                      status={{ label: 'Event', color: 'warning' }}
                      time="2 min ago"
                      title="Afrikabal Farmers Webinar"
                      message="Join our live session to learn about blockchain technology and its impact on farming."
                      src={message2}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ my: 1.25 }}>
                    <Typography variant="h6">Yesterday</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <MessageCard
                      status={{ label: 'Improvement', color: 'primary' }}
                      time="2 hours ago"
                      title="Wallet Performance Upgrade"
                      message="Afrikabal wallets are now faster and more secure than ever."
                      src={message3}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <MessageCard
                      status={{ label: 'Coming Soon', color: 'primary' }}
                      time="1 day ago"
                      title="AXK Coin Staking"
                      message="Earn rewards by staking your AXK Coins. Launching next week!"
                      src={message4}
                    />
                  </Grid> */}
                </Grid>
              </Box>
            </SimpleBar>
          </MainCard>
        )}
      </Drawer>
    </>
  );
}
