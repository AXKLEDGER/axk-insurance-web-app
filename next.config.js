/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}'
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}'
    }
  },
  images: {
    domains: ['flagcdn.com']
  },
  transpilePackages: ['react-syntax-highlighter'],
  env: {
    NEXT_APP_VERSION: 'v1.0.0',
    NEXTAUTH_SECRET: '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',
    NEXTAUTH_URL: 'http://localhost:3000/',
    REACT_APP_GOOGLE_MAPS_API_KEY: 'AIzaSyAXv4RQK39CskcIB8fvM1Q7XCofZcLxUXw',
    NEXT_APP_MAPBOX_ACCESS_TOKEN: 'pk.eyJ1IjoicmFrZXNoLW5ha3JhbmkiLCJhIjoiY2xsNjNkZm0yMGhvcDNlb3phdjF4dHlzeiJ9.ps6azYbr7M3rGk_QTguMEQ',
    NEXT_APP_API_URL: 'https://webapp-client-api.vercel.app/',
    NEXT_APP_JWT_SECRET: 'ikRgjkhi15HJiU78-OLKfjngiu',
    NEXT_APP_JWT_TIMEOUT: '86400',
    NEXTAUTH_SECRET_KEY: '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'
  }
};

module.exports = nextConfig;
