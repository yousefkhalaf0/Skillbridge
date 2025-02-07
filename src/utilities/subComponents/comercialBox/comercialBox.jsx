import React, { useRef, useEffect, useState } from 'react';
import { Box, useMediaQuery } from '../../muiComponents.js';
import { useSelector } from 'react-redux';
import '../comercialBox/comercialBox.css';
import zapier from '../../../assets/icons/zapier.svg';
import zoom from '../../../assets/icons/zoom.svg';
import notion from '../../../assets/icons/notion.svg';
import netflix from '../../../assets/icons/netflix.svg';
import amazon from '../../../assets/icons/amazon.svg';
import spotify from '../../../assets/icons/spotify.svg';
import adobe from '../../../assets/icons/adobe.svg';

const logos = [
    { src: zapier, alt: 'zapier' },
    { src: zoom, alt: 'zoom' },
    { src: amazon, alt: 'amazon' },
    { src: adobe, alt: 'adobe' },
    { src: notion, alt: 'notion' },
    { src: spotify, alt: 'spotify' },
    { src: netflix, alt: 'netflix' },
];

export default function ComercialBox() {
    const theme = useSelector((state) => state.themeReducer);
    const logoContainerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    const isXs = useMediaQuery('(max-width:600px)');
    const isSm = useMediaQuery('(max-width:900px)');
    const isMd = useMediaQuery('(max-width:1200px)');
    const visibleLogos = isXs ? logos.slice(0, 3) : isSm ? logos.slice(0, 4) : isMd ? logos.slice(0, 5) : logos;

    const duplicatedLogos = [...visibleLogos, ...visibleLogos];

    useEffect(() => {
        if (logoContainerRef.current) {
            const width = logoContainerRef.current.scrollWidth / 2;
            setContainerWidth(width);
        }
    }, [visibleLogos]);

    return (
        <Box className={`comercialBox ${theme}ComercialBox`} sx={{ overflow: 'hidden' }}>
            <Box
                ref={logoContainerRef}
                className="logoContainer"
                style={{ '--container-width': `${containerWidth}px` }} >
                {duplicatedLogos.map((logo, index) => (
                    <Box key={`${logo.alt}-${index}`} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            className={`${theme}ComercialBoxLogos`}
                            component="img"
                            src={logo.src}
                            alt={logo.alt}
                            sx={{ height: '30px', width: 'auto' }} />
                        {index !== duplicatedLogos.length - 1 && (
                            <Box
                                sx={{
                                    width: '1px',
                                    height: '50px',
                                    backgroundColor: 'silver',
                                    marginLeft: '45px',
                                    marginRight: '45px',
                                }} />
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}