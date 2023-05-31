import {
    Box,
    Container,
    Typography,
    Toolbar,
} from '@mui/material';
import React from 'react';
import { FilterDrawer } from '../../components/FilterDrawer';
import { WineDataGrid } from '../../components/WineDataGrid';

const isSmartphone = (): boolean => {
    return window.innerWidth < 600;
}
const maxWidth = isSmartphone() ? '100%' : 600;

const Home: React.FC<{ mobileOpen: boolean, handleOpen: any }> = ({mobileOpen, handleOpen}) => {
    return (
        <Box sx={{display: 'flex'}}>
            <FilterDrawer mobileOpen={mobileOpen} handleOpen={handleOpen}/>
            <Box component="main" sx={{flexGrow: 1, p: 2, pt: 4, pb: 3}}>
                <Toolbar/>
                <Container>
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
                <Container sx={{py: 4, maxWidth: maxWidth}}>
                    <WineDataGrid/>
                </Container>
            </Box>
        </Box>

    );
}


export default Home;
