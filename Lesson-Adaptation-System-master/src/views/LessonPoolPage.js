import React, { useState } from "react";
import { Button, Paper, List, ListItem, Grid } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Copyright from "../components/Copyright";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import BarChartIcon from "@material-ui/icons/BarChart";
import logo from "../logo/FSMVU-TR-5.png";
import { func } from "prop-types";
import axios from 'axios';


const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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

export default function LessonPoolPage() {
    const dizi = []
    //This array is main array.
    const ListeElemanlari = [];

    //Teacher datas that comes from database
    const [teachers, setTeachers] = React.useState([
        { title: 'Musa Aydın', id: '' },
        // { title: 'Berna Kiraz' },
        // { title: 'Ali Nizam', },
    ]);
    //Term datas.
    const [term, setTerm] = React.useState([
        { term: 'Guz' },
        { term: 'Bahar' },
        //{ term: 'Yaz', },
    ]);
    React.useEffect(() => {
        axios.get('http://localhost:3004/ogretimElemanlari').then(response => {
            //dizi=[]
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].unvan && response.data[i].soyad) {
                    dizi.push({ title: response.data[i].unvan + response.data[i].ad + response.data[i].soyad, id: response.data[i].id })
                }
                else {
                    dizi.push({ title: response.data[i].ad, id: response.data[i].id })
                }
            }
            setTeachers(dizi)
        }).catch(err => console.log(err));
    }, []);
    //Subject datas that comes from database.
    const [subjects, setSubjects] = React.useState([
        //{ name: 'Veri Yapıları' },
        //{ name: 'Bilgisayar Programlama I' },
        // { name: 'Veri Bilimi',},
        // { name: 'Veri Yapıları1'},
        // { name: 'Bilgisayar Programlama I1'},
        // { name: 'Veri Bilimi1'},
        // { name: 'Veri Yapıları2'},
        // { name: 'Bilgisayar Programlama I2'},
        // { name: 'Veri Bilimi2'},
    ]);
    React.useEffect(() => {
        axios.get('http://localhost:3004/dersler').then(response => {
            //console.log(response.data);
            //response.data veri tabanından gelen ders adlarının olduğu liste
            //subjects=[{},]// ilk baştaki boşluğu silmesi için
            for (let i = 0; i < response.data.length; i++) {
                subjects.push({ name: response.data[i].dersAd })
                //setSubjects({ name: response.data[i].dersAd })
                ListeElemanlari[i] = { name: subjects[i].name, box: 0, selected: false };
            }

        }).catch(err => console.log(err));

    }, []);

    //This loop converts data which comes from database to our format.
    // for (let x = 0; x<subjects.length; x++){
    //     ListeElemanlari[x] = {name:subjects[x].name,box:0, selected:false};
    // }

    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const mainListItems = (
        <div>
            <RouterLink style={{ textDecoration: 'none' }} to="/dashboard">
                <ListItem button >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText style={{ textDecoration: 'none' }} primary="İntibak Başvuruları" />
                </ListItem>
            </RouterLink>
            <RouterLink style={{ textDecoration: 'none' }} to="/dashboard/akademisyenduzenle">
                <ListItem button >
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Akademisyen Düzenleme" />
                </ListItem>
            </RouterLink>
            <RouterLink style={{ textDecoration: 'none' }} to="/dashboard/dersduzenle">
                <ListItem button>
                    <ListItemIcon>
                        <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ders Düzenleme" />
                </ListItem>
            </RouterLink>
            <RouterLink style={{ textDecoration: 'none' }} to="/dashboard/dershavuzu">
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ders Havuzu" />
                </ListItem>
            </RouterLink>
        </div>
    );

    const [items, setItems] = useState(ListeElemanlari);

    function generateMarkUp(iitems) {
        return (
            <Paper style={{ height: '50vh', overflow: 'auto' }}>
                <List>
                    {iitems.map(item => <ListItem><Checkbox onChange={() => handleCheckboxChange(item)} checked={item.selected} /><span>{item.name}</span></ListItem>)}
                </List>
            </Paper>
        );
    }

    const [leftside, rightside] = items.reduce((acc, cur) => {
        cur.box === 0 ? acc[0].push(cur) : acc[1].push(cur);
        return acc;
    }, [[], []]
    );

    function handleCheckboxChange(item) {
        const newItems = [...items];
        const index = items.findIndex(i => i === item);
        newItems[index].selected = !newItems[index].selected;
        setItems(newItems);
    }

    function moveRight() {
        const newItems = items.map(item => ({ ...item, box: item.selected ? 1 : item.box }));
        setItems(newItems);
    }

    function moveLeft() {
        const newItems = items.map(item => ({ ...item, box: item.selected ? 0 : item.box }));
        setItems(newItems);
    }

    const [value, setValue] = useState("");
    //let gonderilecekObje=[{}]
    function lastPhase() {
        //gonderilecekObje
        //Veritabanına kayıt işlemi bu fonksiyonda yapılacak.

        /*
        value.title = selectedTeacher;
        value.term = selectedTerm;
        value.subjects  = rightside;
        */
    }
let dersler = [{},]
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [selectedTerm, setSelectedTerm] = useState("");
    let [controlState, setControlState] = useState(0);
    let [hocaDersi, setHocaDersi] = useState([]);
    //const [raporFlag, setRaporFlag] = React.useState(true)

    function dersleriGetir() {
        if (selectedTeacher === "") {
            alert("Lütfen Hoca Bilgisini Seçiniz.")

        }
        else if (selectedTerm === "") {
            alert("Lütfen Dönem Bilgisini Seçiniz.")
        }
        else {
            //controlState=controlState + 1
            setControlState(controlState + 1);
            console.log(controlState);
        }

    }

    React.useEffect(() => {
        if (selectedTeacher !== "" && selectedTerm !== "") {
        axios.get(`http://localhost:3004/ogretimElemaniDersleri/${selectedTeacher}/${selectedTerm}`).then(response => {
            console.log(response.data);
            
            for (let i = 0; i < response.data.length; i++) {
                dersler.push({ name: response.data[i].dersAd })
                setHocaDersi(dersler)
            }
            console.log(hocaDersi);
            //setHocaDersi(dersler)

        }).catch(err => console.log(err));
    }
        
    

        for (let b = 0; b <= items.length - 1; b++) {
            items[b].box = 0;
            items[b].selected = false;
        }

        //This algorithm works to seperate classes as right and left.
        for (let a = 0; a <= hocaDersi.length - 1; a++) {
            for (let b = 0; b <= items.length - 1; b++) {
                if (hocaDersi[a].name === items[b].name) {
                    items[b].box = 1;
                    items[b].selected = true;
                }
            }
        }
   
    }, [controlState]);

    React.useEffect(() => {
        console.log(rightside);

         }, [rightside]);


    const [searchable, setSearchable] = useState("");

    function searchArea(e) {
        let s = e.target.value;
        setSearchable(s);
    }
  
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" style={{ backgroundColor: "#a5876a" }} className={clsx(classes.appBar, open && classes.appBarShift)}>
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
                    <img src={logo} style={{ width: '6vh' }} alt="Logo" />
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
            <Drawer
                variant="permanent"
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
                <Container style={{ padding: '2vw' }} maxWidth="lg" className={classes.container}>
                    <Paper variant="outlined" style={{ backgroundColor: '#f3efec' }}>
                        <Grid container style={{ padding: '2vw' }}>
                            <Grid item xs={12} style={{ height: '8vh', textAlign: 'left', fontSize: '22px', fontWeight: '900' }}>
                                Ders Havuzu Düzenleme
                        </Grid>
                            <Grid item xs={12} md={5} style={{ display: 'grid', alignItems: 'center', height: '56px', marginTop: '10px' }}>
                                <Autocomplete
                                    id="teacher"
                                    options={teachers}
                                    getOptionLabel={(option) => option.title}
                                    style={{ width: "85%", backgroundColor: 'white' }}
                                    onChange={(event, value) => { (value) ? setSelectedTeacher(value.id) : setSelectedTeacher("") }}
                                    renderInput={(params) => <TextField {...params} label="Öğretim Görevlisi Seçiniz" variant="outlined" />}
                                /><br />
                            </Grid>
                            <Grid item xs={12} md={5} style={{ display: 'grid', alignItems: 'center', height: '56px', marginTop: '10px' }}>
                                <Autocomplete
                                    id="term"
                                    options={term}
                                    getOptionLabel={(option) => option.term}
                                    style={{ width: "85%", backgroundColor: 'white' }}
                                    onChange={(event, v) => { (v) ? setSelectedTerm(v.term) : setSelectedTerm("") }}
                                    renderInput={(params) => <TextField {...params} label="Dönem Seçiniz" variant="outlined" />}
                                /><br /><br />
                            </Grid>
                            <Grid item xs={12} md={2} style={{ display: 'grid', alignItems: 'center', height: '50px', marginTop: '10px' }}>
                                <Button variant="contained" color="primary" size="medium"
                                    onClick={                          
                                        dersleriGetir
                                    }>
                                    Dersleri Getir
                                </Button>
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "5vh", marginBottom: '2vh' }}>
                                <TextField style={{ float: 'left', width: "18vw", backgroundColor: 'white' }}
                                    onKeyUp={(event) => searchArea(event)}
                                    id="outlined-basic" label="Outlined" variant="outlined" label="Arama" /><br /><br />
                            </Grid>
                            <Grid item xs={5}>
                                {
                                    generateMarkUp(leftside.filter(item => item.name.substring(0, searchable.length).toLowerCase() === searchable.toLocaleLowerCase()))
                                }
                            </Grid>
                            <Grid item xs={2} container direction="column" justify="center">
                                <Button onClick={moveRight}>{'>'}</Button>
                                <Button onClick={moveLeft}>{'<'}</Button>
                            </Grid>
                            <Grid item xs={5}>
                                {generateMarkUp(rightside)}
                            </Grid>
                            <Grid item xs={12}>
                                <Button style={{ marginLeft: "0%", width: '8%' }} variant="contained" color="primary" onClick={lastPhase}>Kaydet</Button>
                            </Grid>
                            <Grid style={{ marginTop: '4vh' }} xs={12} lg={12} sm={12} md={12}>
                                <div style={{ float: 'right' }}>
                                    <Button variant="contained" color="primary" size="medium">
                                        Rapor Al
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}
