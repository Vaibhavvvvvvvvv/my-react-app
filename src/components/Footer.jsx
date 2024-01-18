import React from 'react';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

const FooterContainer = styled('footer')({
  backgroundColor: (theme) => theme.palette.background.paper,
  padding: (theme) => theme.spacing(6),
});

const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="h6" align="center" gutterBottom>
        Your Footer Title
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary">
        Your footer description goes here.
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
