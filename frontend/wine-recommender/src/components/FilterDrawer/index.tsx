import {
    Autocomplete,
    Box,
    Checkbox,
    Drawer,
    TextField,
    Switch,
    Toolbar,
    Grid,
    Divider,
    Button, Typography
} from '@mui/material';
import React from 'react';
import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon } from '@mui/icons-material';

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;
const isSmartphone = (): boolean => {
    return window.innerWidth < 600;
}
const drawerWidth = isSmartphone() ? '100%' : 500;
const recipes = [
    {
        id: 1,
        label: 'Poulet au curry',
    },
    {
        id: 2,
        label: 'Boeuf bourguignon',
    }
];

const ingredients = [
    {
        id: 1,
        title: 'Riz',
    },
    {
        id: 2,
        title: 'Poulet',
    },
    {
        id: 3,
        title: 'Curry',
    },
    {
        id: 4,
        title: 'Boeuf',
    }
];


export const FilterDrawer: React.FC<{
    mobileOpen: boolean,
    handleOpen: any,
}> = ({
          mobileOpen,
          handleOpen,
      }) => {

    const [isRedWine, setIsRedWine] = React.useState(true);

    const drawer = (
        <>
            <Toolbar/>
            <Box sx={{overflow: 'auto'}}>
                <Box sx={{ml: 4}}>
                    <h2>Filtres</h2>
                </Box>
                <Box sx={{mx: 4, pb: 2}}>
                    <Typography
                        component="h6"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1, pb: 2}}
                    >
                        Recette
                    </Typography>
                    <Autocomplete
                        id="recipe-filter"
                        options={recipes}
                        size={"small"}
                        renderInput={
                            (params) => <TextField {...params} label="Recette"/>
                        }
                    />
                    <Autocomplete
                        multiple
                        sx={{mt: 2}}
                        size={"small"}
                        id="checkboxes-tags-demo"
                        options={ingredients}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.title}
                        renderOption={(props, option, {selected}) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{marginRight: 8}}
                                    checked={selected}
                                />
                                {option.title}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} label="Ingrédients" placeholder="Ingrédients"/>
                        )}
                    />
                    <Divider sx={{mt: 2, mb: 1}}>
                        ○
                    </Divider>
                    <Typography
                        component="h6"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1, pb: 1}}
                    >
                        Vin
                    </Typography>
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>Vin blanc</Grid>
                        <Grid item>
                            <Switch
                                checked={isRedWine}
                                onChange={() => setIsRedWine(!isRedWine)}
                                value="checkedA"
                            />
                        </Grid>
                        <Grid item>Vin rouge</Grid>
                    </Grid>
                    <Button
                        sx={{mt: 2}}
                        variant={"contained"}
                        color={"secondary"}
                        fullWidth
                        size={"large"}
                        onClick={() => {
                            handleOpen();
                        }}
                    >
                        Réinitialiser les filtres
                    </Button>
                </Box>
            </Box>
        </>
    );

    return (
        <Box
            component="nav"
            sx={{width: {md: drawerWidth}, flexShrink: {md: 0}}}
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: {xs: 'block', md: 'none'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: {xs: 'none', md: 'block'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}
