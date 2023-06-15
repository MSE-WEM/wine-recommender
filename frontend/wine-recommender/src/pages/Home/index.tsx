import {
    Box,
    Container,
    Typography,
    Toolbar,
    Card,
    Chip,
} from '@mui/material';
import React from 'react';
import { FilterDrawer } from '../../components/FilterDrawer';
import { WineDataGrid } from '../../components/WineDataGrid';
import { getWines, getIngredients, getWineCountries, getWinePriceRange } from '../../utils/api';
import { remove_first_stop_word } from '../../utils/functions';

const Home: React.FC<{ mobileOpen: boolean, handleOpen: any }> = ({mobileOpen, handleOpen}) => {
    const [isRedWine, setIsRedWine] = React.useState(true);
    const [wines, setWines] = React.useState<any[]>([]);
    const [countries, setCountries] = React.useState<any[]>([]);
    const [selectedCountries, setSelectedCountries] = React.useState<string[]>([]);
    const [areWinesReady, setAreWinesReady] = React.useState(false);
    const [recipe, setRecipe] = React.useState<any>(null);
    const [recipes, setRecipes] = React.useState<any[]>([]);
    const [ingredients, setIngredients] = React.useState<any[]>([]);
    const [selectedIngredients, setSelectedIngredients] = React.useState<string[]>([]);
    const [priceMin, setPriceMin] = React.useState(0);
    const [priceMax, setPriceMax] = React.useState(1000);
    const [priceRange, setPriceRange] = React.useState<number[]>([0, 1000]);

    const resetFilters = () => {
        setRecipe(null);
        setSelectedIngredients([]);
        setIsRedWine(true);
        setSelectedCountries([]);
        setPriceRange([priceMin, priceMax]);
    }

    const fetchCountries = async () => {
        const countriesList = await getWineCountries(isRedWine);
        if (countries) {
            checkSelectedCountries(countriesList);
        }
    }

    const fetchWines = async () => {
        const winesList = await getWines(isRedWine, priceRange, selectedCountries);
        if (winesList) {
            setWines(winesList);
            setAreWinesReady(true);
        }
    }

    const fetchWinePriceRange = async () => {
        const priceRange = await getWinePriceRange();
        if (priceRange) {
            setPriceMin(priceRange.min);
            setPriceMax(priceRange.max);
        }
    }

    const fetchIngredients = async () => {
        const ingredientsList = await getIngredients();
        if (ingredientsList) {
            setIngredients(ingredientsList);
        }
    }

    const checkSelectedCountries = (countriesList: string[]) => {
        setCountries(countriesList);
        // if selected countries is not a subset of the new countries list, remove the ones that are not in the list anymore
        if (selectedCountries.length > 0 && !selectedCountries.every((c: any) => countriesList.find((cl: any) => cl === c))) {
            // remove countries that are not in the list anymore
            const newSelectedCountries = selectedCountries.filter((c: any) => countriesList.find((cl: any) => cl === c));
            setSelectedCountries(newSelectedCountries);
        }
    }

    React.useEffect(() => {
        // on filter change, use listElements to update the list only if the user stopped typing for 1000ms
        const timeout = setTimeout(() => {
            setAreWinesReady(false);
            fetchWines();
        }, 300);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceRange]);

    React.useEffect(() => {
        setAreWinesReady(false);
        fetchWines();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipe, isRedWine, selectedCountries]);

    React.useEffect(() => {
        fetchCountries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRedWine]);

    React.useEffect(() => {
        fetchIngredients();
        fetchCountries();
        fetchWinePriceRange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box sx={{display: 'flex'}}>
            <FilterDrawer mobileOpen={mobileOpen}
                          handleOpen={handleOpen}
                          recipes={recipes}
                          setRecipes={setRecipes}
                          ingredients={ingredients}
                          recipe={recipe}
                          setRecipe={setRecipe}
                          selectIngredients={selectedIngredients}
                          setSelectIngredients={setSelectedIngredients}
                          isRedWine={isRedWine}
                          setIsRedWine={setIsRedWine}
                          countries={countries}
                          selectedCountries={selectedCountries}
                          setSelectedCountries={setSelectedCountries}
                          priceMin={priceMin}
                          priceMax={priceMax}
                          priceRange={priceRange}
                          setPriceRange={setPriceRange}
                          resetFilters={resetFilters}
            />
            <Box component={"main"} sx={{flexGrow: 1, p: 2, pt: 4, pb: 4}} width={1}>
                <Toolbar/>
                <Container>
                    <Typography
                        component="h1"
                        variant="h3"
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
                {recipe ? (
                    <Container>
                        <Card sx={{p: 2}}>
                            <Typography variant="h5" align="justify" color="text.secondary" paragraph>
                                {recipe.name}
                            </Typography>
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                                {recipe.ingredients.map((ingredient: any, index: number) => (
                                    <Chip color={"primary"} label={remove_first_stop_word(ingredient)}
                                          key={ingredient + index}/>
                                ))}
                            </Box>
                        </Card>
                    </Container>
                ) : null}
                <Container sx={{py: 2}}>
                    <WineDataGrid wines={wines} loading={!areWinesReady}/>
                </Container>
            </Box>
        </Box>

    );
}


export default Home;
