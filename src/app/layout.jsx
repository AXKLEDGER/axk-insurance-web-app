import PropTypes from 'prop-types';

import './globals.css';

// project-imports
import ProviderWrapper from './ProviderWrapper';

export const metadata = {
  title:
    'AXK Insurance | Revolutionizing Insurance with Blockchain Technology, Offering Transparency, Efficiency, and Secure Claims Processing for a Better Future.',
  description:
    'AXK Insurance leverages blockchain technology to bring transparency, efficiency, and secure claims processing to the insurance industry, ensuring trust and a seamless experience for all stakeholders.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}

RootLayout.propTypes = { children: PropTypes.node };
