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
    Button,
    Typography,
    Select,
    OutlinedInput,
    Chip,
    MenuItem,
    SelectChangeEvent,
    InputLabel,
    FormControl,
    CircularProgress,
    Slider
} from '@mui/material';
import React from 'react';
import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon } from '@mui/icons-material';
import { remove_first_stop_word } from '../../utils/functions';
import { getRecipes } from '../../utils/api';

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;
const isSmartphone = (): boolean => {
    return window.innerWidth < 600;
}
const drawerWidth = isSmartphone() ? '100%' : 500;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export const FilterDrawer: React.FC<{
    mobileOpen: boolean,
    handleOpen: any,
    recipes: any[],
    setRecipes: any,
    ingredients: any[],
    areIngredientsReady: boolean,
    recipe: any,
    setRecipe: any,
    selectedIngredients: string[],
    setSelectedIngredients: any,
    isRedWine: boolean,
    setIsRedWine: any,
    countries: string[],
    selectedCountries: string[],
    setSelectedCountries: any,
    priceMin: number,
    priceMax: number,
    priceRange: number[],
    setPriceRange: any,
    resetFilters: any,
}> = ({
          mobileOpen,
          handleOpen,
          recipes,
          setRecipes,
          ingredients,
          areIngredientsReady,
          recipe,
          setRecipe,
          selectedIngredients,
          setSelectedIngredients,
          isRedWine,
          setIsRedWine,
          countries,
          selectedCountries,
          setSelectedCountries,
          priceMin,
          priceMax,
          priceRange,
          setPriceRange,
          resetFilters,
      }) => {
    const [open, setOpen] = React.useState(false);
    const loading = open && recipes.length === 0;

    const randomUUID = () => {
        return Math.random().toString(36).substring(7);
    }

    const handleChangePrice = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
    }

    const handleChangeCountries = (event: SelectChangeEvent<typeof countries>) => {
        const {
            target: {value},
        } = event;
        setSelectedCountries(
            typeof value === 'string' ? value.split(',') : value,
        );
        handleOpen();
    };

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const recipesList = await getRecipes(selectedIngredients);

            if (active) {
                setRecipes(recipesList);
            }
        })();

        return () => {
            active = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setRecipes([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const drawer = (
        <>
            <Toolbar/>
            <Box sx={{overflow: 'auto'}}>
                <Box sx={{ml: 4}}>
                    <h2>Filtres</h2>
                </Box>
                <Box sx={{mx: 4, pb: 2}}>
                    <Typography
                        component={"h6"}
                        variant={"h6"}
                        color={"inherit"}
                        noWrap
                        sx={{flexGrow: 1, pb: 2}}
                    >
                        Recettes
                    </Typography>
                    <Autocomplete
                        id={"recipe-filter"}
                        options={recipes}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        size={"small"}
                        loading={loading}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={"Recette"}
                                placeholder={"Recette"}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color={"inherit"} size={20}/> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option.name + randomUUID()}>
                                    {option.name}
                                </li>
                            )
                        }}
                        value={recipe}
                        onChange={(event, value) => {
                            setRecipe(value);
                            handleOpen();
                        }}
                    />
                    <Autocomplete
                        multiple
                        disabled={recipe !== null}
                        sx={{mt: 2}}
                        id={"ingredients-filter"}
                        size={"small"}
                        options={ingredients}
                        loading={!areIngredientsReady}
                        disableCloseOnSelect
                        getOptionLabel={(option) => remove_first_stop_word(option._id)}
                        renderOption={(props, option, {selected}) => (
                            <li {...props} key={option._id}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    color={"primary"}
                                    value={option._id}
                                    style={{marginRight: 8}}
                                    checked={selected}
                                />
                                {remove_first_stop_word(option._id)}
                            </li>
                        )}
                        value={selectedIngredients || []}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={"Ingrédients"}
                                placeholder={"Ingrédients"}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {!areIngredientsReady ? <CircularProgress color={"inherit"} size={20}/> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                        onChange={(event, value) => {
                            setSelectedIngredients(value);
                        }}
                    />
                    <Divider sx={{mt: 2, mb: 1}}>
                        ○
                    </Divider>
                    <Typography
                        component={"h6"}
                        variant={"h6"}
                        color={"inherit"}
                        noWrap
                        sx={{flexGrow: 1, pb: 1}}
                    >
                        Vins
                    </Typography>
                    <Grid component={"label"} container alignItems={"center"} spacing={1}>
                        <Grid item>Vin blanc</Grid>
                        <Grid item>
                            <Switch
                                checked={isRedWine}
                                onChange={() => {
                                    setIsRedWine(!isRedWine);
                                    handleOpen();
                                }}
                                value={"checkedA"}
                            />
                        </Grid>
                        <Grid item>Vin rouge</Grid>
                    </Grid>
                    <FormControl sx={{mt: 2}} size={"small"} fullWidth>
                        <InputLabel id={"countries-label"}>Pays</InputLabel>
                        <Select
                            label={"Pays"}
                            labelId={"countries-label"}
                            id={"countries"}
                            multiple
                            fullWidth
                            value={selectedCountries}
                            onChange={handleChangeCountries}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                            renderValue={(selected) => (
                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                    {selected.map((value: any) => (
                                        <Chip key={value} label={value}/>
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {countries.map((country) => (
                                <MenuItem
                                    key={country}
                                    value={country}
                                >
                                    {country}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{mt: 3}}>
                        <Typography id={"range-price-slider-label"} gutterBottom>
                            Fourchette de prix (CHF)
                        </Typography>
                        <Box sx={{px: 1}}>
                            <Slider
                                value={priceRange}
                                onChange={handleChangePrice}
                                valueLabelDisplay={"auto"}
                                aria-labelledby={"range-price-slider"}
                                getAriaValueText={() => "Fourchette de prix"}
                                step={5}
                                min={priceMin}
                                max={priceMax}
                                marks={[
                                    {
                                        value: priceMin,
                                        label: priceMin,
                                    },
                                    {
                                        value: priceMax,
                                        label: priceMax,
                                    },
                                ]}
                            />
                        </Box>
                    </Box>
                    <Divider sx={{mt: 4, mb: 2, mx: -4}} variant={"fullWidth"}/>
                    <Button
                        sx={{mt: 2}}
                        variant={"contained"}
                        color={"secondary"}
                        fullWidth
                        size={"large"}
                        onClick={() => {
                            resetFilters();
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
            component={"nav"}
            sx={{width: {md: drawerWidth}, flexShrink: {md: 0}}}
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                variant={"temporary"}
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
                variant={"permanent"}
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
