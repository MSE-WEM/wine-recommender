import * as React from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Box, Container, IconButton, LinearProgress, Modal } from '@mui/material';
import { Close, Link, Star, StarHalf, StarOutline } from '@mui/icons-material';

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

const roundToHalf = (num: number) => {
    return Math.round(num * 2) / 2;
}

export const WineDataGrid: React.FC<{ wines: any[], loading: boolean }> = ({wines, loading}) => {
    const [imgUrl, setImgUrl] = React.useState<string>('');
    const [imgLabel, setImgLabel] = React.useState<string>('');
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    return (
        <>
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
                sx={{
                    maxWidth: '100%', overflowX: 'scroll',
                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                        outline: 'none',
                    },
                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                        {
                            outline: 'none',
                        },
                }} autoHeight
                loading={loading}
                slots={{loadingOverlay: LinearProgress}}
                initialState={{
                    pagination: {paginationModel: {pageSize: 10}},
                }}
                pageSizeOptions={[5, 10, 25]}
                columns={[
                    {
                        field: 'img_url', headerName: 'Img', width: 20, align: 'center',
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
                    {field: 'type', headerName: 'Type', width: 80},
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
                                     title={rating.toString()}>
                                    {stars}
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
                                <Link/>
                            </IconButton>
                        )
                    },
                ]} rows={wines}/></>
    );
}
