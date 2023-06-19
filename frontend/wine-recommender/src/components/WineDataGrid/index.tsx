import * as React from 'react';
import { DataGrid, gridClasses, frFR, useGridApiRef, GridFooter } from '@mui/x-data-grid';
import {
    Box,
    Container,
    FormControl,
    IconButton,
    InputLabel,
    LinearProgress,
    MenuItem,
    Modal,
    Select
} from '@mui/material';
import {
    Close,
    OpenInNew,
    Star,
    StarHalf,
    StarOutline,
    SentimentDissatisfied,
    SentimentVeryDissatisfied,
    SentimentNeutral,
    SentimentSatisfied,
    SentimentSatisfiedAlt
} from '@mui/icons-material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid',
    borderColor: 'primary.main',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
    width: 'auto',
    overflow: 'auto' as 'auto',
};

const isSmartphone = (): boolean => {
    return window.innerWidth < 600;
}
const width = isSmartphone() ? '100%' : '200px';

const roundToHalf = (num: number) => {
    return Math.round(num * 2) / 2;
}

const toPercentage = (num: number) => {
    // round to 2 decimal places
    return `${(num * 100).toFixed(2)}%`;
}

const randomUUID = () => {
    return Math.random().toString(36).substring(7);
}


export const WineDataGrid: React.FC<{
    wines: any[],
    loading: boolean,
    recipe: any,
    nbWines: number,
    setNbWines: any
}> = ({wines, loading, recipe, nbWines, setNbWines}) => {
    const [imgUrl, setImgUrl] = React.useState<string>('');
    const [imgLabel, setImgLabel] = React.useState<string>('');
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    let height = nbWines === 1 ? (recipe ? 183 : 143) : nbWines === 5 ? (recipe ? 400 : 371) : (recipe ? 650 : 631);
    //height += recipe ? 0 : 90;
    console.log('height', height);

    const apiRef = useGridApiRef();

    const handleNbWinesChange = (value: number) => {
        setNbWines(value);
        apiRef.current.setPageSize(value);
    }

    const CustomSelect = () => {
        return (
            <Box flexGrow={1} sx={{display: 'flex', justifyContent: 'flex-end', p: 2}}>
                <FormControl variant={"outlined"} size={"small"} sx={{width: width}}>
                    <InputLabel id={"select-wines-label"}>Nombre de vins proposés</InputLabel>
                    <Select
                        labelId={"select-wines-label"}
                        id={"select-wines"}
                        value={nbWines}
                        label={"Nombre de vins proposés"}
                        onChange={(event: any) => handleNbWinesChange(event.target.value)}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        );
    }

    React.useEffect(() => {
        if (!recipe) {
            handleNbWinesChange(10);
        }
    }, [recipe]);

    return (
        <Box sx={{height: 'auto'}}>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Container sx={style}>
                    <IconButton size="small" sx={{position: 'absolute', top: '0', right: '0'}}
                                onClick={() => setIsModalOpen(false)}>
                        <Close/>
                    </IconButton>
                    <Box>
                        <img src={imgUrl} alt={imgLabel} title={imgLabel}/>
                    </Box></Container>
            </Modal>
            <DataGrid
                onPaginationModelChange={(params) => {
                    if (params.pageSize) {
                        handleNbWinesChange(params.pageSize);
                    }
                }}
                apiRef={apiRef}
                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                getRowId={() => randomUUID()}
                sx={{
                    height: `${height}px`,
                    maxWidth: '100%', overflowX: 'scroll', overflowY: 'auto',
                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                        outline: 'none',
                    },
                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                        {
                            outline: 'none',
                        },
                }}
                loading={loading}
                slots={{loadingOverlay: LinearProgress, footer: recipe ? CustomSelect : GridFooter}}
                initialState={{
                    pagination: {paginationModel: {pageSize: nbWines}},
                    columns: {
                        columnVisibilityModel: {
                            _id: false,
                            type: false
                        }
                    }
                }}
                hideFooterPagination={!!recipe}
                pageSizeOptions={[5, 10, 20]}
                columns={[
                    {field: '_id', headerName: 'id', width: 70},
                    {
                        field: 'img_url', headerName: '', width: 20, align: 'center',
                        renderCell: (params: any) => {
                            return (
                                <>
                                    <IconButton size="small" sx={{maxWidth: '20px'}} onClick={() => {
                                        setImgUrl(params.value);
                                        setImgLabel(params.row.name + ' - ' + params.row.vintage + ' - ' + params.row.winery);
                                        setIsModalOpen(true);
                                    }}>
                                        <img src={params.value} alt={params.value} width={50}
                                             height={50}/>
                                    </IconButton>

                                </>
                            );
                        }
                    },
                    {flex: 1, field: 'name', headerName: 'Nom', minWidth: 200},
                    {flex: 1, field: 'winery', headerName: 'Cave', minWidth: 150},
                    {field: 'vintage', headerName: 'Millésime', width: 80, align: 'center'},
                    {field: 'type', headerName: 'Type', width: 80,},
                    {
                        field: 'price', headerName: 'Prix', width: 100,
                        valueFormatter: (params: any) => {
                            return params.value ? `CHF ${params.value}` : '';
                        }
                    },
                    {field: 'country', headerName: 'Pays', width: 80},
                    {field: 'grapes', headerName: 'Cépage(s)', width: 120},
                    {
                        field: 'average_rating', headerName: 'Note', width: 150,
                        renderCell: (params: any) => {
                            const rating = roundToHalf(params.value);
                            const stars = [];
                            for (let i = 0; i < 5; i++) {
                                if (i === Math.ceil(rating) - 1 && rating % 1 !== 0) {
                                    stars.push(<StarHalf style={{color: 'goldenrod'}} key={i}/>);
                                } else if (i < rating) {
                                    stars.push(<Star style={{color: 'goldenrod'}} key={i}/>);
                                } else {
                                    stars.push(<StarOutline style={{color: 'goldenrod'}} key={i}/>);
                                }
                            }
                            return (
                                <div style={{display: 'flex', justifyContent: 'center'}}
                                     title={params.value}>
                                    {stars}
                                </div>
                            );
                        }
                    },
                    {
                        field: 'sentiment', headerName: 'Sentiment', width: 100, align: 'center',
                        renderCell: (params: any) => {
                            let sentiment;
                            if (params.value < 0.2) {
                                sentiment = <SentimentVeryDissatisfied style={{color: 'red'}}/>;
                            } else if (params.value < 0.4) {
                                sentiment = <SentimentDissatisfied style={{color: 'orange'}}/>;
                            } else if (params.value < 0.6) {
                                sentiment = <SentimentNeutral style={{color: 'gold'}}/>;
                            } else if (params.value < 0.8) {
                                sentiment = <SentimentSatisfied style={{color: 'limegreen'}}/>;
                            } else {
                                sentiment = <SentimentSatisfiedAlt style={{color: 'green'}}/>;
                            }
                            return (
                                <div style={{display: 'flex', justifyContent: 'center'}}
                                     title={toPercentage(params.value)}>
                                    {sentiment}
                                </div>
                            );
                        }
                    },
                    {
                        field: 'url', headerName: 'URL', align: 'center', width: 10,
                        renderCell: (params: any) => (
                            <IconButton href={params.value} target={"_blank"} color={"primary"}
                                        title={"Voir sur Vivino"}
                            >
                                <OpenInNew/>
                            </IconButton>
                        )
                    },
                ]} rows={wines}/></Box>
    );
}
