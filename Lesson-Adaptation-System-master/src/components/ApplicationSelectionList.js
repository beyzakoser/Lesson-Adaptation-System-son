import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router";
import axios from 'axios'
const columns = [
    { id: 'intibakDurumu', label: 'intibak Durumu', minWidth: 30, align: 'center'},
    { id: 'ogrenciAd', label: 'Ad', minWidth: 80, align: 'center'},
    { id: 'ogrenciSoyad', label: 'Soyad', minWidth: 80, align: 'center' },
    { id: 'universiteAdi', label: 'Üniversite', minWidth: 100, align: 'center'},
    { id: 'ogrenciFakulte', label: 'Fakülte', minWidth: 150, align: 'center'},
    { id: 'ogrenciBolum', label: 'Bölüm', minWidth: 150, align: 'center'},
    { id: 'girisYil', label: 'Giriş Yılı', minWidth: 70, align: 'center'},
    { id: 'basvuruTur', label: 'Giriş Türü', minWidth: 70, align: 'center'},
    { id: 'talepTarih', label: 'Tarih', minWidth: 120, align: 'center'},
    { id: 'ogrenciMail', label: 'Öğrenci Mail', minWidth: 60, align: 'center'},
    { id: 'id', label: 'Detay', minWidth: 50, align: 'center'},

];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '70vh',
    },
});

export default function ApplicationSelectionList() {
    const history = useHistory();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    let veriler;

    const [rows,setRows] = React.useState([
        {ogrenciAd:'Adem', ogrenciSoyad:'Deneme',universiteAdi:'Fatih Sultan Mehmet Vakıf Üni.', ogrenciBolum:'bilgisayar müh.', girisYil:2015 ,
       talepTarih:'2020-09-01',basvuruTur:'Diğer',ogrenciMail:'abc@gmail.com',ogrenciFakulte:'mühendislik fakültesi', id:0},

    ]);

    React.useEffect(() => {
    axios.get('http://localhost:3004/basvurulistesi').then(response => {
        veriler = response.data          
        //console.log(response.data);
        setRows(veriler)
    }).catch(err => console.log(err));
}, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    function returnButton(id) {

        return(
            <Button onClick={ () => {history.push('/dashboard/basvuruincele',{isAuthanticated:true, applicationId:id})} } id={id} style={{height:'60px'}} variant="contained" color="primary">
                Başvuru Detay
            </Button>
        );
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, backgroundColor:'#6c757d',color:'white'}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === "id" ? returnButton(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
