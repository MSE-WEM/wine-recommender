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
    CircularProgress,
    Slider,
    Stack
} from '@mui/material';
import React from 'react';
import {
    CheckBox as CheckBoxIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    HighlightOffTwoTone,
    KitchenTwoTone,
    MenuBookTwoTone,
    PaymentsTwoTone,
    PublicTwoTone,
    WineBarTwoTone
} from '@mui/icons-material';
import { remove_first_stop_word } from '../../utils/functions';
import { getRecipes } from '../../utils/api';
import { useSelector } from 'react-redux';

const icon = <CheckBoxOutlineBlankIcon fontSize={"small"}/>;
const checkedIcon = <CheckBoxIcon fontSize={"small"}/>;
const isSmartphone = (): boolean => {
    return window.innerWidth < 600;
}
const drawerWidth = isSmartphone() ? '100%' : 500;

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
    const colorMode = useSelector((state: any) => state.colorMode.value);
    const iconColor = colorMode === 'light' ? 'primary' : 'secondary';

    const randomUUID = () => {
        return Math.random().toString(36).substring(7);
    };

    const handleChangePrice = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
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
                                    ), startAdornment: (
                                        <>
                                            <MenuBookTwoTone color={iconColor}/>
                                            {params.InputProps.startAdornment}
                                        </>
                                    )
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
                        isOptionEqualToValue={(option, value) => option.name === value.name}
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
                        filterSelectedOptions
                        getOptionLabel={(option) => remove_first_stop_word(option)}
                        renderOption={(props, option, {selected}) => (
                            <li {...props} key={option}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    color={"primary"}
                                    value={option}
                                    style={{marginRight: 8}}
                                    checked={selected}
                                />
                                {remove_first_stop_word(option)}
                            </li>
                        )}
                        value={selectedIngredients || []}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={"Ingrédients"}
                                placeholder={selectedIngredients.length > 0 ? "" : "Ingrédients"}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <>
                                            <KitchenTwoTone color={iconColor}/>
                                            {params.InputProps.startAdornment}
                                        </>
                                    ),
                                    endAdornment: (
                                        <React.Fragment>
                                            {!areIngredientsReady ?
                                                <CircularProgress color={"inherit"} size={20}/> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    )
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
                        <Grid item sx={{mt: 2}}>
                            <Typography component={Stack} direction={"row"} alignItems={"center"} paragraph>
                                <WineBarTwoTone/>
                                Vin blanc
                            </Typography>
                        </Grid>
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
                        <Grid item sx={{mt: 2}}>
                            <Typography component={Stack} direction={"row"} alignItems={"center"} paragraph>
                                Vin rouge
                                <WineBarTwoTone color={"primary"}/>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Autocomplete
                        multiple
                        sx={{mt: 2}}
                        id={"countries-filter"}
                        size={"small"}
                        options={countries}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option}
                        renderOption={(props, option, {selected}) => (
                            <li {...props} key={option}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    color={"primary"}
                                    value={option}
                                    style={{marginRight: 8}}
                                    checked={selected}
                                />
                                {option}
                            </li>
                        )}
                        value={selectedCountries || []}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={"Pays"}
                                placeholder={selectedCountries.length > 0 ? "" : "Pays"}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <>
                                            <PublicTwoTone color={iconColor}/>
                                            {params.InputProps.startAdornment}
                                        </>
                                    )
                                }}
                            />
                        )}
                        onChange={(event, value) => {
                            setSelectedCountries(value);
                        }}
                    />
                    <Box sx={{mt: 3, mx: 1}}>
                        <Typography id={"range-price-slider-label"} gutterBottom component={Stack} direction={"row"}
                                    alignItems={"center"}>
                            <PaymentsTwoTone color={iconColor} sx={{mr: 1}}/>
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
                        endIcon={<HighlightOffTwoTone color={"primary"}/>}
                        sx={{mt: 2}}
                        variant={"contained"}
                        color={"secondary"}
                        fullWidth
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
