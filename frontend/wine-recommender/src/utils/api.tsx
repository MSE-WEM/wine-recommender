const API_URL = process.env.REACT_APP_API_URL;
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
};

export const getWines = async (isRedWine: boolean, priceRange: number[], countries: string[]) => {
    const type = isRedWine ? 'red' : 'white';
    let query = `${API_URL}/api/wines/type/${type}`;

    if (priceRange.length > 0) {
        query += `?priceMin=${priceRange[0]}&priceMax=${priceRange[1]}`;
    }
    if (countries.length > 0) {
        query += `&countries=${countries.join(',')}`;
    }

    const response = await fetch(query, {headers: HEADERS});
    if (response.status === 200) {
        return await response.json();
    }
    return [];
}

export const getWinesByPairing = async (pairing: number[], isRedWine: boolean, priceRange: number[], countries: string[], nbWines: number) => {
    const type = isRedWine ? 'red' : 'white';
    let query = `${API_URL}/api/wines/pairing/type/${type}?nbWines=${nbWines}`;

    if (priceRange.length > 0) {
        query += `&priceMin=${priceRange[0]}&priceMax=${priceRange[1]}`;
    }
    if (countries.length > 0) {
        query += `&countries=${countries.join(',')}`;
    }
    if (pairing) {
        query += `&pairing=${pairing.join(',')}`;
    }

    const response = await fetch(query, {headers: HEADERS});
    if (response.status === 200) {
        return await response.json();
    }
    return [];
}

export const getRecipes = async (ingredients: any[]) => {
    let query = `${API_URL}/api/recipes`;
    if (ingredients.length > 0) {
        query += `?ingredients=${ingredients.join(',')}`;
    }

    const response = await fetch(query, {headers: HEADERS});
    if (response.status === 200) {
        return await response.json();
    }
    return [];
}

export const getIngredients = async (selectedIngredients: any[]) => {
    let query = `${API_URL}/api/recipes/ingredients`;
    if (selectedIngredients.length > 0) {
        query += `?ingredients=${selectedIngredients.join(',')}`;
    }
    const response = await fetch(query, {headers: HEADERS});
    if (response.status === 200) {
        return await response.json();
    }
    return [];
}

export const getWineCountries = async (isRedWine: boolean) => {
    const type = isRedWine ? 'red' : 'white';
    const response = await fetch(`${API_URL}/api/wines/countries?type=${type}`, {headers: HEADERS});
    if (response.status === 200) {
        return await response.json();
    }
    return [];
}

export const getWinePriceRange = async () => {
    const response = await fetch(`${API_URL}/api/wines/price`, {headers: HEADERS});
    if (response.status === 200) {
        return await response.json();
    }
    return [];
}
