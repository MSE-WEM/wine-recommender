import {
    Autocomplete,
    Box, Card, CardContent, CardHeader,
    Checkbox,
    Drawer, TextField, Switch,
    Toolbar, FormControlLabel, Grid,
} from '@mui/material';
import React from 'react';
import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon } from '@mui/icons-material';

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;
const drawerWidth = 400;
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


export const FilterDrawer: React.FC = () => {
    const [isRedWine, setIsRedWine] = React.useState(true);
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            }}
        >
            <Toolbar/>
            <Box sx={{overflow: 'auto'}}>
                <Box sx={{ml: 3}}>
                    <h2>Filtres</h2>
                </Box>
                <Card sx={{pl: 4}}>
                    <CardHeader title="Filtrer les recettes"/>
                    <CardContent>
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
                    </CardContent>
                </Card>
                <Card sx={{pl: 4}}>
                    <CardHeader title="Filtrer les vins"/>
                    <CardContent>
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
                    </CardContent>
                </Card>
            </Box>
        </Drawer>
    );
}
