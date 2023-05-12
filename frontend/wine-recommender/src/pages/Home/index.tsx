import {
    Box,
    Container,
    Typography,
    Toolbar,
} from '@mui/material';
import React from 'react';
import { FilterDrawer } from '../../components/FilterDrawer';


const Home: React.FC = () => {
    return (
        <Box sx={{display: 'flex'}}>
            <FilterDrawer />
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <Container maxWidth="lg">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Wine Recommender
                    </Typography>
                    <Typography variant="h5" align="justify" color="text.secondary" paragraph>
                        Wine Recommender est un site de recommandation de vin basé sur les données de Vivino et les
                        recettes de Marmiton.
                    </Typography>
                </Container>
            </Box>
        </Box>

    )
        ;
}


export default Home;
