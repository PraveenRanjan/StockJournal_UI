import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Journal from './components/Journal'




export default function App() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Journal />
        {/* <ProTip /> */}
        {/* <Transections /> */}

      </Box>
    </Container>
  );
}
