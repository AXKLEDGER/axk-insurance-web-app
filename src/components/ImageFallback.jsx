import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box } from '@mui/material';

const ImageWithFallback = ({ src, alt, ...props }) => {
    const [error, setError] = useState(false);

    return (
        <Box
            component="img"
            src={error ? '/assets/images/placeholder.svg' : src}
            alt={alt}
            onError={() => setError(true)}
            {...props}
        />
    );
};

ImageWithFallback.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
};

export default ImageWithFallback;