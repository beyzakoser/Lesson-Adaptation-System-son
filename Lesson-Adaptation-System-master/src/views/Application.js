import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from "@material-ui/lab/Autocomplete";
import Copyright from '../components/Copyright';

import ApplicationLessonTable from '../components/ApplicationLessonTable'
import MaterialTable from "material-table";
import {useHistory} from "react-router";
import axios from 'axios'
export default function Application() {
  /*Bu kısım açılır buton içindir*/
  const [open, setOpen] = React.useState(false);

  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [Mail, setMail] = React.useState("");
  const [University, setUniversity] = React.useState("");
  const [Faculty, setFaculty] = React.useState("");
  const [Year, setYear] = React.useState("");
  const [Department, setDepartment] = React.useState("");
  const [ApplicationType, setApplicationType] = React.useState("");
  const [ApplicationDepartment, setApplicationDepartment] = React.useState("");
  
  const gelisNeden = [
    { title: 'Yatay Geçiş'},
    { title: 'Dikey Geçiş'},
    { title: 'Diğer'},
  ];

  const basvurulanBolumler = [
        { name: 'Bilgisayar Mühendisliği'},
        { name: 'Biyomedikal Mühendisliği'},
        { name: 'Elektrik Elektronik Mühendisliği'},
        { name: 'İnşaat Mühendisliği'},
    ];

    const [state, setState] = React.useState({
        columns: [
            { title: 'Ders Kodu', field: 'dersKodu' },
            { title: 'Ders Adı', field: 'dersAdi' },
            { title: 'Kredi', field: 'kredi' },
            { title: 'AKTS', field: 'akts' },
            { title: 'Başarı Notu', field: 'basariNotu' },
        ],
        data: [
            { dersKodu: 'MAT207', dersAdi: 'Calculus I', kredi: "5", akts: "7", basariNotu: "BA", },
            { dersKodu: 'MAT208', dersAdi: 'Calculus II', kredi: "5", akts: "7", basariNotu: "AA", },
            // { dersKodu: 'FZ101', dersAdi: 'Physic I', kredi:"5", akts:"7", basariNotu:"CC", },
            // { dersKodu: 'FZ102', dersAdi: 'Physic II', kredi:"5", akts:"7", basariNotu:"CB", },
        ],
    });

  const date = new Date();
  var dateTime = date.toISOString().slice(0, 10);
  const person = {
      ogrenciAd: FirstName,
      ogrenciSoyad: LastName,
      ogrenciMail: Mail,
      universiteAdi: University,
      ogrenciFakulte: Faculty,
      girisYil: Year,
      ogrenciBolum: Department,
      basvuruTur: ApplicationType,
      talepTarih: dateTime,
      ogrencidersleri: state.data,
      basvurduguBolum:ApplicationDepartment
  }

  const history = useHistory();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //ilk harfleri büyük göndermek için yazmıştık sonradan ekleyeceğiz.
  function capital_letter(str) {
    console.log(str);
    if (str) {
        str = str.split(" ");
        if (str !=="" && str !==null) {
        for (var i = 0, x = str.length; i < x; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }
        return str.join(" ");
    }}
}

  const submitControl = () => {

      if( (FirstName !== "") && (LastName !== "") && (Mail !== "") && (University !== "") && 
      (Faculty !== "") && (Year !== "") && (Department !== "") && (ApplicationType !== "") && (ApplicationDepartment !== "") ) {
        axios.post('http://localhost:3004/basvuru', person).then(response => {
            console.log(response.data)
        }).catch(err => console.log(err))
        handleClose()
          history.push("/applicationconfirmed");
      }else {
          alert("Lütfen boş alan bırakmayın.")
      }

      setOpen(false);
  }

  /*Bu kısım açılır buton içindir*/


  return (
    <React.Fragment>
      <Container maxWidth="md" style={{marginTop:"5%", marginBottom:"5vh"}}>
         <Grid style={{marginTop:'10vh'}} container spacing={3}>
            <Grid item xs={12} sm={12} style={{marginBottom:'4vh'}}>
              <Typography style={{fontWeight:'800'}} variant="h4" gutterBottom>
                  Öğrenci İntibak Başvuru Ekranı
              </Typography><br/>
          </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="isim"
                    name="isim"
                    label="Ad"
                    fullWidth
                    autoComplete="given-name"
                    onChange={e => setFirstName(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="soyad"
                    name="soyad"
                    label="Soyad"
                    fullWidth
                    autoComplete="family-name"
                    onChange={e => setLastName(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="mail"
                    name="mail"
                    label="Mail Adresiniz"
                    fullWidth
                    autoComplete="shipping address-level2"
                    onChange={e => setMail(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                required
                id="universite"
                name="universite"
                label="Kayıtlı Olduğunuz Üniversite"
                fullWidth
                autoComplete="shipping postal-code"
                onChange={e => setUniversity(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="enstitu"
                    name="enstitu"
                    label="Enstitü/Fakülte"
                    fullWidth
                    autoComplete="shipping address-line1"
                    onChange={e => setFaculty(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="bolum"
                    name="bolum"
                    label="Bölüm/Program"
                    fullWidth
                    autoComplete="shipping address-line2"
                    onChange={e => setDepartment(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                required
                id="university-year"
                label="Üniversitenize Giriş Yılınız"
                fullWidth
                onChange={e => setYear(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{marginTop:'2vh'}} >
                <Autocomplete
                    id="application-type-combo"
                    options={gelisNeden}
                    getOptionLabel={(option) => option.title}
                    fullWidth
                    renderInput={(params) => <TextField {...params} label="Başvuru Türü" variant="outlined" />}
                    onChange={(e,val) => {(val) ? setApplicationType(val.title) : setApplicationType("") } }
                />
            </Grid>
             <Grid item xs={12} sm={6} style={{marginTop:'2vh'}} >
                 <Autocomplete
                     id="application-department"
                     options={basvurulanBolumler}
                     getOptionLabel={(option) => option.name}
                     fullWidth
                     renderInput={(params) => <TextField {...params} label="Başvurulan Bölüm" variant="outlined" />}
                     onChange={(e,val) => {(val) ? setApplicationDepartment(val.name) : setApplicationDepartment("") }}
                 />
             </Grid>

            <Grid style={{marginTop:'8vh', fontWeight:'500', fontFamily:'Roboto'}} item xs={12}>
              <p>Lütfen aşağıdaki tabloya kendi üniversitenizde almış olduğunuz dersleri giriniz. Tablonun sağ üstündeki + butonuna basarak ders ekleyebilirsiniz. Buna ek olarak Transkriptinizi de eklemeyi lütfen unutmayın.</p>
            </Grid>
             <Grid item xs={12}>
                 <Grid container spacing={3}>
                     <Grid item xs={12}>
                         <div className="App">
                             <MaterialTable
                                 title="Öğrenci Ders Listesi"
                                 columns={state.columns}
                                 data={state.data}
                                 options={{
                                     headerStyle: {
                                         backgroundColor: '#01579b',
                                         color: '#FFF',
                                         textAlign:'left'
                                     },
                                     cellStyle: {
                                         textAlign: 'left',
                                         fontFamily:'roboto'
                                     }
                                 }}
                                 editable={{
                                     onRowAdd: (newData) =>
                                         new Promise((resolve) => {
                                             setTimeout(() => {
                                                 resolve();
                                                 setState((prevState) => {
                                                     const data = [...prevState.data];
                                                     data.push(newData);
                                                     return { ...prevState, data };
                                                 });
                                             }, 600);
                                         }),
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
                             />
                         </div>
                     </Grid>
                 </Grid>
             </Grid>
             <Grid style={{marginTop:'5vh'}} item xs={12} sm={6}>
                 <div style={{float:'left'}}>
                     <label>Transkript Yükle : </label><input type="file" color="primary"></input>
                 </div>
             </Grid>
             <Grid style={{marginTop:'5vh'}} item xs={12} sm={6}>
                 <div style={{float:'right'}}>
                     <Button variant="contained" color="primary" onClick={handleClickOpen}>
                         Başvuruyu Tamamla
                     </Button>
                     <Dialog
                         fullScreen={fullScreen}
                         open={open}
                         onClose={handleClose}
                         aria-labelledby="responsive-dialog-title"
                     >
                         <DialogTitle id="responsive-dialog-title">{"Değişiklikler Kaydedilsin mi?"}</DialogTitle>
                         <DialogContent>
                             <DialogContentText>
                                 Bilgileri doğru girdiğinizden emin misiniz? Daha sonra verdiniğiz bilgiler üzerinde değişim yapmanız <b>mümkün olmayacaktır</b>.
                             </DialogContentText>
                         </DialogContent>
                         <DialogActions>
                             <Button autoFocus variant="outlined" onClick={handleClose} color="primary">
                                 İptal
                             </Button>
                             <Button variant="outlined" onClick={submitControl} color="primary" autoFocus>
                                 Gönder
                             </Button>
                         </DialogActions>
                     </Dialog>
                 </div>
             </Grid>
             <Grid style={{marginTop:'5vh'}} item xs={12} sm={12}>
                 <Copyright/>
             </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
