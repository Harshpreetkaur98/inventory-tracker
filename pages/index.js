'use client'
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import "@/styles/page.css"; // Ensure this path is correct

export default function LandingPage() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/inventory'); // Navigate to the inventory page
  };

  return (
    <Box className="landing-container">
      <Box className="image-container">
        <Image src="/images/landing-image.jpg" alt="Landing Image" layout="fill" objectFit="cover" />
        <Typography variant="h2" className="overlay-text">Welcome to Our Inventory Management System</Typography>
        <Button variant="contained" className="overlay-button" onClick={handleNavigate}>
          Go to Inventory
        </Button>s
      </Box>
    </Box>
  );
}
