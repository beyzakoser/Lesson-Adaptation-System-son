import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ApplicationReviewTable from "../components/ApplicationReviewTable";
import Box from "@material-ui/core/Box";
import Copyright from "../components/Copyright";
import React, {useEffect, Component} from "react";
import {useHistory,
        Link as RouterLink} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import BarChartIcon from "@material-ui/icons/BarChart";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from '@material-ui/core/TextField';
import logo from "../logo/FSMVU-TR-5.png";
import MaterialTable from "material-table";
import {func} from "prop-types";
import ReactExport from "react-export-excel";
import axios from 'axios'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor:'#f3efec'
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        marginLeft: '20vm',
        marginRight: '20vm'
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

function ExportData(multiData){
   // console.log(multiData)
    return (
        <div>
            <ExcelFile element={<button>Download Data With Styles</button>}>
                <ExcelSheet dataSet={multiData} name="Organization"/>
            </ExcelFile>
        </div>
    );
}

function format(){

}

export default function ApplicationReviewPage(){
    const history = useHistory();

    const [applicantInfo, setApplicantInfo] = React.useState({
        ogrenciAd: '',
        ogrenciSoyad: '',
        girisYil: '',
        ogrenciBolum: '',
        basvurduguBolum: '',
        universiteAdi: '',
        basvuruTur: ''
    }
    )
    const [universityInfo, setUniversityInfo] = React.useState("");

    const [state, setState] = React.useState({
        columns: [
            { title: 'Dersin Kodu', field: 'dersKodu' },
            { title: 'Dersin Adı', field: 'dersAdi' },
            { title: 'Kredi', field: 'kredi', type: 'numeric' },
            { title: 'AKTS', field: 'akts', type: 'numeric' },
            { title: 'Başarı Notu', field: 'basariNotu' },
            { title: 'FSMVU Dersin Kodu', field: 'fsmvuDersKodu' },
            { title: 'FSMVU Dersin Grubu', field: 'fsmvuDersGrubu' },
            { title: 'FSMVU Dersin Adı', field: 'fsmvuDersinAdi' },
            { title: 'FSMVU Kredi', field: 'fsmvuKredi', type: 'numeric' },
            { title: 'FSMVU AKTS', field: 'fsmvuAkts', type: 'numeric' },
            { title: 'FSMVU Başarı Notu', field: 'fsmvuBasariNotu' },

        ],
        data: [
            {
                id: '',
                dersKodu: '',
                dersAdi: ' ',
                kredi: '',
                akts: '',
                basariNotu: '',
                fsmvuDersId: '',
                fsmvuDersKodu: '',
                fsmvuDersGrubu: '',
                fsmvuDersinAdi: '',
                fsmvuKredi: '',
                fsmvuAkts: '',
            },
        ],
    });

    const [multiDataSet, setMultiDataSet] = React.useState(
        [
            {
                columns: [state.columns[0].title, state.columns[1].title, state.columns[2].title, state.columns[3].title, state.columns[4].title, state.columns[5].title, state.columns[6].title, state.columns[7].title, state.columns[8].title, state.columns[9].title, state.columns[10].title],
                data: [

                ]
            }
        ]
    )

    const mainListItems = (
        <div>
            <RouterLink style={{textDecoration:'none'}} to="/dashboard">
                <ListItem button >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="İntibak Başvuruları" />
                </ListItem>
            </RouterLink>
            <RouterLink style={{textDecoration:'none'}} to="/dashboard/akademisyenduzenle">
                <ListItem button >
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Akademisyen Düzenleme" />
                </ListItem>
            </RouterLink>
            <RouterLink style={{textDecoration:'none'}} to="/dashboard/dersduzenle">
                <ListItem button>
                    <ListItemIcon>
                        <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ders Düzenleme" />
                </ListItem>
            </RouterLink>
            <RouterLink style={{textDecoration:'none'}} to="/dashboard/dershavuzu">
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ders Havuzu" />
                </ListItem>
            </RouterLink>
        </div>
    );

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [saveDialogOpen, setSaveDialogOpen] = React.useState(false);


    const dialogOpen = () => {
        setSaveDialogOpen(true);
    }

    const dialogClose = () => {
        setSaveDialogOpen(false);
    }

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    //Rapor al butonu disabled kontrolü
    const [flag, setFlag] = React.useState(true)

    const [dbLessons, setDbLessons] = React.useState({
        lessons: [
            {
                id: '',
                dersKodu: '',
                grupBilgisi: '',
                dersAd: '',
                kredi: '',
                akts: '',

            },
        ],
    });
    React.useEffect(() => {
        axios.all([
            axios.get(`http://localhost:3004/basvuruIncele/${history.location.state.applicationId}`),
            axios.get(`http://localhost:3004/universiteAdi/${history.location.state.applicationId}`),
            axios.get("http://localhost:3004/mufredatDersleriListele")
        ])
            .then(axios.spread((...responses) => {
                console.log(responses);
                //console.log(responses[0].data);
                setApplicantInfo(responses[1].data)
                setUniversityInfo(responses[1].data.universiteAdi);
                //setFlag(responses[1].data.intibakDurumu)
                //for (let i = 0; i < responses[0].data.length; i++) {
                    setState({
                        columns: [
                            { title: universityInfo + ' Dersin Kodu', field: 'dersKodu' },
                            { title: universityInfo + ' Dersin Adı', field: 'dersAdi' },
                            { title: universityInfo + ' Kredi', field: 'kredi', type: 'numeric' },
                            { title: universityInfo + ' AKTS', field: 'akts', type: 'numeric' },
                            { title: universityInfo + ' Başarı Notu', field: 'basariNotu' },
                            { title: 'FSMVU Dersin Kodu', field: 'fsmvuDersKodu' },
                            { title: 'FSMVU Dersin Grubu', field: 'fsmvuDersGrubu' },
                            { title: 'FSMVU Dersin Adı', field: 'fsmvuDersinAdi' },
                            { title: 'FSMVU Kredi', field: 'fsmvuKredi', type: 'numeric' },
                            { title: 'FSMVU AKTS', field: 'fsmvuAkts', type: 'numeric' },
                            { title: 'FSMVU Başarı Notu', field: 'fsmvuBasariNotu' },


                        ],
                        data: responses[0].data//intibağı yapılması istenen dersler

                    })
                //}
                setDbLessons({
                    lessons: responses[2].data,
                })

            })).catch(err => console.log(err));

    }, [universityInfo], [applicantInfo], [dbLessons]);


    useEffect(() => {

        for (let i = 0; i < state.data.length; i++) {
            for (let k = 0; k < dbLessons.lessons.length; k++) {
                if (state.data[i].fsmvuDersKodu === dbLessons.lessons[k].dersKodu) {
                    state.data[i].fsmvuDersGrubu = dbLessons.lessons[k].grupBilgisi;
                    state.data[i].fsmvuDersinAdi = dbLessons.lessons[k].dersAd;
                    state.data[i].fsmvuAkts = dbLessons.lessons[k].akts;
                    state.data[i].fsmvuKredi = dbLessons.lessons[k].kredi;
                    state.data[i].fsmvuDersId = dbLessons.lessons[k].id;

                }
            }

        }

    }, [state]);
    let gonderilecekObje = [{}]
    gonderilecekObje = { intibakDurumu: 1, ogrencidersleri: state.data, id: history.location.state.applicationId }
    console.log(state.data);
   //console.log(history.location.state.applicationId)
    return(
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" style={{backgroundColor: "#a5876a"}} className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={logo} style={{width:'6vh'}} alt="Logo"/>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        FSMVÜ İntibak, Akademisyen ve Ders Yönetim Sistemi
                    </Typography>
                    <IconButton color="inherit">
                        <Badge color="secondary">
                            <ExitToAppIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="xl" className={classes.container}>
                    <Grid container spacing={0}>
                        <Grid xs={6} md={4} style={{marginBottom:'3vh'}}>
                            <TextField
                                style={{backgroundColor:'white', width:'80%'}}
                                disabled
                                id="outlined-disabled"
                                label="Öğrencinin Adı Soyadı" value={applicantInfo.ogrenciAd + " " + applicantInfo.ogrenciSoyad}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid xs={6} md={4} style={{marginBottom:'3vh'}}>
                            <TextField
                                style={{backgroundColor:'white', width:'80%'}}
                                disabled
                                id="outlined-disabled"
                                label="Kayıtlı Olduğu Üniversite" value={applicantInfo.universiteAdi}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid xs={6} md={4} style={{marginBottom:'3vh'}}>
                            <TextField
                                style={{backgroundColor:'white', width:'80%'}}
                                disabled
                                id="outlined-disabled"
                                label="Kayıtlı Olduğu Bölüm" value={applicantInfo.ogrenciBolum}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid xs={6} md={4} style={{marginBottom:'5vh'}}>
                            <TextField
                                style={{backgroundColor:'white', width:'80%'}}
                                disabled
                                id="outlined-disabled"
                                label="Geçerli Öğretim Yılı" value={applicantInfo.girisYil}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid xs={6} md={4} style={{marginBottom:'5vh'}}>
                            <TextField
                                style={{backgroundColor:'white', width:'80%'}}
                                disabled
                                id="outlined-disabled"
                                label="Başvurduğu Bölüm" value={applicantInfo.basvurduguBolum}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid xs={6} md={4} style={{marginBottom:'5vh'}}>
                            <TextField
                                style={{backgroundColor:'white', width:'80%'}}
                                disabled
                                id="outlined-disabled"
                                label="Geçiş Türü" value={applicantInfo.basvuruTur}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sm={12} md={12}>
                            <Paper>
                                <MaterialTable
                                    title="İntibak Tablosu"
                                    columns={[
                                        {
                                            title: state.columns[0].title,
                                            field: 'dersKodu',
                                            cellStyle: {

                                            },
                                            headerStyle: {
                                                backgroundColor: '#40739e',
                                                color:'white'
                                            }
                                        },
                                        {
                                            title: state.columns[1].title,
                                            field: 'dersAdi',
                                            headerStyle: {
                                                backgroundColor: '#40739e',
                                                color:'white'
                                            }
                                        },
                                        {
                                            title: state.columns[2].title,
                                            field: 'kredi',
                                            type: 'numeric',
                                            headerStyle: {
                                                backgroundColor: '#40739e',
                                                color:'white'
                                            }
                                        },
                                        {
                                            title: state.columns[3].title,
                                            field: 'akts',
                                            type:'numeric',
                                            headerStyle: {
                                                backgroundColor: '#40739e',
                                                color:'white'
                                            }
                                        },
                                        {
                                            title: state.columns[4].title,
                                            field: 'basariNotu',
                                            headerStyle: {
                                                backgroundColor: '#40739e',
                                                color:'white'
                                            }
                                        },
                                        {
                                            title: state.columns[5].title,
                                            field: 'fsmvuDersKodu',
                                            headerStyle: {
                                                backgroundColor: '#6D214F',
                                                color:'white'
                                            }
                                        },
                                        {
                                            title: state.columns[6].title,
                                            field: 'fsmvuDersGrubu',
                                            headerStyle: {
                                                backgroundColor: '#6D214F',
                                                color:'white'
                                            }
                                        },
                                        {
                                            title: state.columns[7].title,
                                            field: 'fsmvuDersinAdi',
                                            headerStyle: {
                                                backgroundColor: '#6D214F',
                                                color:'white'
                                            }
                                        },
                                        {
                                            title: state.columns[8].title,
                                            field: 'fsmvuKredi',
                                            type:'numeric',
                                            headerStyle: {
                                                backgroundColor: '#6D214F',
                                                color:'white'
                                            }
                                        },
                                        {
                                            title: state.columns[9].title,
                                            field: 'fsmvuAkts',
                                            type:'numeric',
                                            headerStyle: {
                                                backgroundColor: '#6D214F',
                                                color:'white'
                                            }
                                        },
                                        {
                                            title: state.columns[10].title,
                                            field: 'fsmvuBasariNotu',
                                            headerStyle: {
                                                backgroundColor: '#6D214F',
                                                color:'white'
                                            }
                                        }
                                    ]}
                                    data={state.data}
                                    editable={{
                                        onRowUpdate: (newData, oldData) =>
                                            new Promise((resolve) => {
                                                setTimeout(() => {
                                                    resolve();
                                                    if (oldData) {
                                                        setState((prevState) => {
                                                            const data = [...prevState.data];
                                                            data[data.indexOf(oldData)] = newData;
                                                            return { ...prevState, data };
                                                        });
                                                    }
                                                }, 600);
                                            }),
                                        onRowDelete: (oldData) =>
                                            new Promise((resolve) => {
                                                setTimeout(() => {
                                                    resolve();
                                                    setState((prevState) => {
                                                        const data = [...prevState.data];
                                                        data.splice(data.indexOf(oldData), 1);
                                                        return { ...prevState, data };
                                                    });
                                                }, 600);
                                            }),
                                    }}
                                    options={{
                                        rowStyle: {

                                        },
                                        cellStyle:{

                                        },
                                        headerStyle:{

                                        }
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid style={{marginTop:'4vh'}} xs={12} lg={6} sm={6} md={6}>
                            <div style={{float:'left'}}>
                                <ExcelFile element={<Button variant="contained" disabled={flag} onClick={() => {

                                    multiDataSet[0].data = [];

                                    for(let i = 0; i<state.data.length; i++){
                                        let array = []

                                        array.push(state.data[i].dersKodu);
                                        array.push(state.data[i].dersAdi);
                                        array.push(state.data[i].kredi);
                                        array.push(state.data[i].akts);
                                        array.push(state.data[i].basariNotu);
                                        array.push(state.data[i].fsmvuDersKodu);
                                        array.push(state.data[i].fsmvuDersGrubu);
                                        array.push(state.data[i].fsmvuDersinAdi);
                                        array.push(state.data[i].fsmvuKredi);
                                        array.push(state.data[i].fsmvuAkts);
                                        array.push(state.data[i].fsmvuBasariNotu);

                                        multiDataSet[0].data.push(array)
                                        array = [];
                                    }
                                } } color="primary" size="medium">
                                        Rapor Al
                                        </Button>}>
                                    <ExcelSheet dataSet={multiDataSet} name="Organization"/>
                                </ExcelFile>

                            </div>
                        </Grid>
                        <Grid style={{marginTop:'4vh'}} xs={12} lg={6} sm={6} md={6}>
                            <div style={{float:'right'}}>
                                <Button variant="contained" color="primary" size="medium" onClick={dialogOpen}>
                                    İntİbakı Tamamla
                                </Button>
                                <Dialog
                                    fullScreen={fullScreen}
                                    open={saveDialogOpen}
                                    onClose={dialogClose}
                                    aria-labelledby="responsive-dialog-title"
                                >
                                    <DialogTitle id="responsive-dialog-title">{"Değişiklikler Kaydedilsin mi?"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Kaydetmek istediğinize emin misiniz?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button autoFocus variant="outlined" onClick={dialogClose} color="primary">
                                            İptal
                                        </Button>
                                        <Button variant="outlined" 
                                        //onClick={dialogClose} 
                                        color="primary" autoFocus
                                        onClick={
                                            () => {


                                                axios.put('http://localhost:3004/intibakTamamla', gonderilecekObje).then(response => {
                                                    console.log(response)
                                                }).catch(err => console.log(err))
                                                dialogClose()
                                            }

                                        }
                                        >
                                            Kaydet
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </Grid>
                    </Grid>
                    <Box style={{marginTop:'8vh'}} pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    )
}
