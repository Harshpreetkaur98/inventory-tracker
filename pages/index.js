'use client'
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import "@/styles/page.css"; // Ensure this path is correct

export default function LandingPage() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/home'); // Navigate to the home page
  };

  return (
    <Box className="landing-container">
      <Typography variant="h2" color="#333">Welcome to Our Inventory Management System</Typography>
      <Image src="/landing-image.jpg" alt="Landing Image" width={600} height={400} />
      <Button variant="contained" onClick={handleNavigate}>
        Go to Inventory
      </Button>
    </Box>
  );
}
