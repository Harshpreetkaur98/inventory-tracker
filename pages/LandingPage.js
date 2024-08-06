'use client'
import {useRouter} from 'next/router';
import { Box, Button, Typorgraphy } from '@mui/material';
import Image from 'next/image';
import '@/styles/page.css';

export default function LandingPage() {
    const router = useRouter();

    const handleNavigate = () => {
        router.push('/home');
    };

    return (
        <Box className="landing-container">
            <Typography variant = "h2" color="#333">Welcome to our Inventory System</Typography>
            <Image src="/landing-image.png" alt="inventory" width={600} height={400}/>
            <Button variant="contained" onClick={handleNavigate}>Go to Inventory</Button>
        </Box>
    );
}