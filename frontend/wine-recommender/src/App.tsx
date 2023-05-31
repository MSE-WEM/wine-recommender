import React from 'react';
import {
    AppBar,
    Grid,
    IconButton,
    Link,
    PaletteMode,
    Toolbar,
    Tooltip
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toggleColorMode } from './utils/reducers/colorModeSlice';
import {
    LightMode,
    DarkMode,
    Menu as MenuIcon,
    MenuOpen as CloseIcon
} from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import Home from './pages/Home';

function App() {
    const lightgrey = grey[300];
    const darkgrey = grey[900];
    const dispatch = useDispatch();
    const colorMode = useSelector((state: any) => state.colorMode.value);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const getDesignTokens = (mode: PaletteMode) => ({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    // palette values for light mode
                    primary: {
                        main: '#800000',
                    },
                    secondary: {
                        main: '#83d6de'
                    },
                    background_color: {
                        main: lightgrey,
                    }
                }
                : {
                    // palette values for dark mode
                    primary: {
                        main: '#800000'
                    },
                    secondary: {
                        main: '#83d6de'
                    },
                    background_color: {
                        main: darkgrey,
                    }
                }),
        },
        typography: {
            fontFamily: ["Neue Haas Grotesk Display Pro, sans-serif", "Helvetica now, sans-serif"].join(','),
        }
    });


    const theme = React.useMemo(
        () =>
            createTheme(getDesignTokens(colorMode)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [colorMode],
    );

    return (
        <ThemeProvider theme={theme}>

            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline/>
            {/* End CssBaseline */}

            {/* Header navbar */}
            <AppBar position="fixed"
                    elevation={1}
                    sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {md: 'none'}}}
                    >
                        {mobileOpen ? <CloseIcon/> : <MenuIcon/>}
                    </IconButton>
                    <Grid container justifyContent={"space-between"} alignItems={"center"} sx={{height: "100%"}}>
                        <Grid item>
                            <Link color={"inherit"} href={"/"} underline={"none"}>
                                <img src={colorMode === 'light' ? "/logo512_light.png" : "/logo512.png"}
                                     alt={"Wine Recommender"} height={"30px"}
                                     style={{marginRight: "10px", marginTop: "5px", borderRadius: "4px"}}/>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Tooltip title={"Toggle dark / light mode"}>
                                <IconButton sx={{marginLeft: "auto"}} color={"inherit"} size={"large"}
                                            onClick={() => dispatch(toggleColorMode())}>
                                    {colorMode === 'light' ? <LightMode/> : <DarkMode/>}
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {/* End Header navbar */}

            {/* Main content */}
            <Router>
                <Routes>
                    <Route path={"*"}
                           element={<Home mobileOpen={mobileOpen} handleOpen={handleDrawerToggle}/>}/>
                </Routes>
            </Router>
            {/* End Main content */}

        </ThemeProvider>
    );
}

export default App;
