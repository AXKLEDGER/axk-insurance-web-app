'use client';
import PropTypes from 'prop-types';

// next
import { SessionProvider } from 'next-auth/react';

// project-imports
import ThemeCustomization from 'themes';
import { ConfigProvider } from 'contexts/ConfigContext';
import RTLLayout from 'components/RTLLayout';
import Locales from 'components/Locales';
import ScrollTop from 'components/ScrollTop';

import Notistack from 'components/third-party/Notistack';
import Snackbar from 'components/@extended/Snackbar';
import Customization from 'components/customization/index';
import ThemeToggler from 'components/customization/ThemeToggler';
import { AuthProvider } from 'contexts/AuthProvider';

// ==============================|| PROVIDER WRAPPER  ||============================== //

export default function ProviderWrapper({ children }) {
  return (
    <AuthProvider>
      <ConfigProvider>
        <ThemeCustomization>
          <RTLLayout>
            <Locales>
              <ScrollTop>
                {/* <SessionProvider refetchInterval={0}> */}
                <Notistack>
                  <Snackbar />
                  {children}
                  {/* <Customization /> */}
                  <ThemeToggler />
                </Notistack>
                {/* </SessionProvider> */}
              </ScrollTop>
            </Locales>
          </RTLLayout>
        </ThemeCustomization>
      </ConfigProvider>
    </AuthProvider>
  );
}

ProviderWrapper.propTypes = { children: PropTypes.node };
