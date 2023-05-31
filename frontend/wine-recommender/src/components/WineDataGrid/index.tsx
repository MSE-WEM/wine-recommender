import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export const WineDataGrid: React.FC = () => {

    return (
        <DataGrid sx={{maxWidth: '100%'}} autoHeight={true}
                  columns={[
                      {flex: 1, field: 'name', headerName: 'Name'},
                      {flex: 1, field: 'cellar', headerName: 'Cellar'},
                      {flex: 1, field: 'year', headerName: 'Year'},
                      {flex: 1, field: 'price', headerName: 'Price'},
                      {flex: 1, field: 'country', headerName: 'Country'},
                      {flex: 1, field: 'grapes', headerName: 'Grapes'},
                      {flex: 1, field: 'link', headerName: 'Link'}
                  ]} rows={[
            {
                id: 1,
                name: 'Château de la Tour',
                cellar: 'Château de la Tour',
                year: 2018,
                price: 15,
                country: 'France',
                grapes: 'Merlot',
                link: 'https://www.vivino.com/fr/chateau-de-la-tour-2018/w/2086668?year=2018&s=20'
            },
            {
                id: 2,
                name: 'Château des Bormettes',
                cellar: 'Château des Bormettes',
                year: 2018,
                price: 15,
                country: 'France',
                grapes: 'Merlot',
                link: 'https://www.vivino.com/fr/chateau-des-bormettes-2018/w/2086668?year=2018&s=20'
            },
            {
                id: 3,
                name: 'Château de la Tour',
                cellar: 'Château de la Tour',
                year: 2018,
                price: 15,
                country: 'France',
                grapes: 'Merlot',
                link: 'https://www.vivino.com/fr/chateau-de-la-tour-2018/w/2086668?year=2018&s=20'
            },
            {
                id: 4,
                name: 'Château des Bormettes',
                cellar: 'Château des Bormettes',
                year: 2018,
                price: 15,
                country: 'France',
                grapes: 'Merlot',
                link: 'https://www.vivino.com/fr/chateau-des-bormettes-2018/w/2086668?year=2018&s=20'
            },
        ]}/>
    );
}
