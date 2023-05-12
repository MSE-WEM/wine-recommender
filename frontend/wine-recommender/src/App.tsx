import React from 'react';
import './App.css';
import {
    AppBar,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    IconButton,
    Link,
    PaletteMode,
    ThemeProvider,
    Toolbar, Tooltip
} from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toggleColorMode } from './utils/reducers/colorModeSlice';
import { LightMode, DarkMode, WineBarTwoTone as WineBar } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import Home from './pages/Home';
import { useNotification } from './utils/useNotification';

declare module '@mui/material/styles' {
    interface Palette {
        background_color: Palette['primary'];
    }

    interface PaletteOptions {
        background_color: PaletteOptions['primary'];
    }
}

// declare module to extend the theme colors
declare module '@mui/material/AppBar' {
    interface AppBarPropsColorOverrides {
        background_color: true;
    }
}

function App() {
    const lightgrey = grey[300];
    const darkgrey = grey[900];
    const dispatch = useDispatch();
    const colorMode = useSelector((state: any) => state.colorMode.value);

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
            <AppBar color={"primary"} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Grid container justifyContent={"space-between"} alignItems={"center"} sx={{height: "100%"}}>
                        <Grid item>
                            <Link color={"inherit"} href={"/"} underline={"none"}>
                                {/*<img src={colorMode === "light" ? "/logo_full.png" : "/logo_full_white.png"}
                                     alt={"Logo"} height={"40px"}
                                     style={{marginRight: "10px", marginTop: "2px"}}/>*/}
                                <WineBar sx={{color: "white", marginRight: "10px", fontSize: "30px"}}/>
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

            <Container>
                {/* Main content */}
                <Router>
                    <Routes>
                        <Route path={"*"} element={<Home/>}/>
                    </Routes>
                </Router>
                {/* End Main content */}
            </Container>

        </ThemeProvider>
    );
}

export default App;
