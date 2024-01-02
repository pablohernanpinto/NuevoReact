import React, { useState, useEffect } from 'react';
import {ActivityIndicator, View, Text, StyleSheet, Button, Modal, TextInput, Image, ScrollView, Alert,useColorScheme, Appearance } from 'react-native';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import XLSX from 'xlsx';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';

import { readFile } from "react-native-fs";

export default function App({navigation}) {
  const [pathPDF, setPathPDF] = React.useState();
const [theme, setTheme] = useState(Appearance.getColorScheme());

const [urlImage,setUrlImage] = useState('./assets/logo-patagoniafresh.png')

const [data, setData] = useState<{
  nombre: string;
  fecha: any;
  index: any;
  path: string;
  excel: any;
  dataExcel:object,
  rebp06:any,
}[]>([]);
  
  /* modal */
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const [ModalOpcionesValor, setModalOpciones] = useState(false);


  const [fecha, setFecha] = useState('');
  const [index, setIndex] = useState<Number | null>(null);
  const [nombre, setNombre] = useState<String | null>(null);
  const [path, setPath] = useState<String | null>(null);
  const [dataExcel, setDataExcel] = useState({});


  
  const ModalOpciones = (nombre: String, fecha:any, index:Number,path:String,dataExcel:any) => {
    setFecha(fecha);
    setIndex(index); 
    setNombre(nombre);
    setPath(path);
    setDataExcel(dataExcel)

    setModalOpciones(!ModalOpcionesValor);
  };


  const [ModalOpcionesValorCarga, setModalOpcionesCarga] = useState(false);

  const ModalOpcionesCargaVisilidad = (tiempo: number) => {
    setModalOpcionesCarga(true);
  
    setTimeout(() => {
      setModalOpcionesCarga((prevValue) => !prevValue);
    }, tiempo);
  };
  

  /* input */

  const [Dia, setDia] = React.useState('');
  const [Mes, setMes] = React.useState('');
  const [Anio, setAnio] = React.useState('');

  /* archivos de excel */

  const [excel,setExcel] = React.useState({})

  useEffect(() => {
    loadJsonFiles();
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const loadJsonFiles = async () => {
    try {
      const files = await RNFS.readdir(RNFS.DocumentDirectoryPath);
      const jsonFiles = files.filter(file => file.endsWith('.json'));

      const dataArray = [];

      for (let i = 0; i < jsonFiles.length; i++) {
        const fileName = jsonFiles[i];
        const path = RNFS.DocumentDirectoryPath + `/${fileName}`;

        try {
          const content = await RNFS.readFile(path, 'utf8');
          const parsedContent = JSON.parse(content);
/*           console.log('------------------')
          console.log(parsedContent,'this') */
          dataArray.push({nombre: fileName,
            fecha: parsedContent.fecha,
            index: parsedContent.index,
            path: path,
            excel: parsedContent.excel,
            dataExcel : parsedContent.dataExcel||{},
            rebp06:parsedContent.rebp06,
            rebp06R1:parsedContent.rebp06R1||{},
            rebp06R2:parsedContent.rebp06R2||{},
            rebp06R3:parsedContent.rebp06R3||{},
            rebp06R4:parsedContent.rebp06R4||{},
          });
        } catch (error) { 
          console.error(`Error al leer el archivo ${fileName}:`, error);
        }  
      } 
      setData(dataArray); 
      //console.log(data)  
    } catch (error) {
      console.error('Error al cargar la lista de archivos JSON:', error);
    }
  };


  const pickDocument = async (nombre: String | null, path: String | null) => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx],
      });
  
      if (result) {
        const bstr = await readFile(result[0].uri, "ascii");
        const workbook = XLSX.read(bstr, { type: "binary" });
        const sheet1 = workbook.Sheets.Sheet1;
        const keys = Object.keys(sheet1).filter((key) => /^[A-Za-z]/.test(key));
        const valoresOrganizados: Record<string, any> = {};
  
        keys.forEach((key) => {
          const rowData = sheet1[key];
          const rowIndex = key.slice(1);
  
          if (!valoresOrganizados[rowIndex]) {
            valoresOrganizados[rowIndex] = [];
          }
          valoresOrganizados[rowIndex].push(rowData.w);
        });
  
        const transformedData = Object.keys(valoresOrganizados).map((key) => {
          const originalArray = valoresOrganizados[key];
          return {
            ID: originalArray[0],
            Fecha: originalArray[1],
            Tipo: originalArray[2],
            Numero: originalArray[3],
            Valor: originalArray[4],
            Material: originalArray[5],
          };
        });
  
        // Utiliza la versión actualizada del estado
        setExcel(transformedData);
  
        // Llama a agregarJson con la versión actualizada del estado
        await agregarJson(transformedData, nombre, path);
  
        // Llama a loadJsonFiles después de agregarJson
        loadJsonFiles();
  
        ModalOpcionesCargaVisilidad(2000);
      } else {
        console.log("Selección de archivo cancelada");
      }
    } catch (err) {
      console.error("Error al seleccionar el archivo:", err);
    }
  };
  

 
  const agregarJson = async (excel:object,nombre:any,path:any) => {

    try {
      // Lee el contenido actual del archivo JSON
      const currentContent = await RNFS.readFile(path);
  
      // Analiza el contenido para convertirlo en un objeto JavaScript
      const currentData = JSON.parse(currentContent);
  
      // Agrega nueva información al objeto (por ejemplo, un nuevo campo 'gato')
      currentData.dataExcel = excel;
      currentData.excel  = 'true'
  
      // Convierte el objeto actualizado en una cadena JSON
      const updatedContent = JSON.stringify(currentData);
      
      // Escribe la cadena JSON actualizada en el archivo  
      await RNFS.writeFile(path, updatedContent, 'utf8'); 
  
      // Vuelve a cargar los archivos JSONs
      loadJsonFiles();
      
    } catch (error) {
      console.error(error);
    } 
  };

  const handleCreateJson = async () => {
    //console.log(data)
    const indexMasGrande = data.reduce((maxIndex, elemento) => {
      return elemento.index > maxIndex ? elemento.index : maxIndex;}, -1);
    try {
      await createJsonFile(String(indexMasGrande+1), { fecha: Dia+'/'+Mes+'/'+Anio, index: Number(indexMasGrande)+1,excel: false, rebp06:false,rebp06R1:{},rebp06R2:{},rebp06R3:{},rebp06R4:{} });
    } catch (error) { 
      await createJsonFile('0', { fecha: Dia+'/'+Mes+'/'+Anio, index: 0 , excel: false, rebp06:false, rebp06R1:{},rebp06R2:{},rebp06R3:{},rebp06R4:{} });
      //console.error('Error al crear el archivo JSON:', error);
    }
  }; 

  const createJsonFile = async (fileName: string, content: {fecha:string,index:Number, excel: boolean, rebp06:boolean,rebp06R1:any,rebp06R2:any,rebp06R3:any,rebp06R4:any}) => {
    
    const path = RNFS.DocumentDirectoryPath + `/${fileName}.json`;

    try {
      await RNFS.writeFile(path, JSON.stringify(content), 'utf8');
      loadJsonFiles();
    } catch (error) { 
      console.error(error);
    }
  };

  const deleteJsonFile = async (fileName: string) => {
    Alert.alert(
      'Alerta!',
      '¿Desea borrar el formulario?',
      [
        { 
          text: 'Eliminar',
          onPress: async () => {
            const path = RNFS.DocumentDirectoryPath + `/${fileName}`;

            try {
              await RNFS.unlink(path); 
              loadJsonFiles();
            } catch (error) {
              console.error(`Error al eliminar el archivo ${fileName}:`, error);
            }

          },
        },
        { 
          text: 'Cancelar',
        },
        
      ],
      { cancelable: false }
    );

  };

 

  const Tarjeta = ({nombre, fecha, index,path,dataExcel }: { nombre: string; fecha: any; index: any; path: string; dataExcel:object}) => {
    return (
      <View style={styles.tarjeta}>
        
        <Text style = {styles.texto}>{`Fecha: ${fecha}`}</Text> 
        <Text></Text> 
        <Button title="Formularios"  onPress={() => ModalOpciones(nombre, fecha, index,path,dataExcel)} />
        <View style = {{paddingTop:5}}></View>
        <Button title="Generar PDF" onPress={() => prueba(index)} /> 
        <View style = {{paddingTop:5}}></View>
        <Button color={'red'} title="Eliminar" onPress={() => deleteJsonFile(nombre)}/>
        {/* <Button color={'red'} title="imprimir" onPress={() => imprimir()}/>  */}


      </View> 
    );  
  };


  const AbrirREBP01 = (index:any) =>{  
    const objetoEncontrado = data.find(item => item.index === index);

    if ((objetoEncontrado?.excel)=== 'true') {
      navigation.navigate('REBP-01',{objetoEncontrado})  

    }
    else{
      Alert.alert(
        'Error',
        'No se ha seleccionado ningun archivo excel.',
        [
          { 
            text: 'Aceptar',
            onPress: () => console.log('Aceptar presionado'),
          },
        ],
        { cancelable: false }
      );
    }
  } 


  const AbrirREBP06 = (index: any) => {
    const objetoEncontrado = data.find(item => item.index === index);
/*     console.log((objetoEncontrado?.rebp06 )== false) */
/*     console.log(objetoEncontrado) */
    if(objetoEncontrado?.rebp06 === false){
      navigation.navigate('REBP-06',{objetoEncontrado});
    }
    else{
      Alert.alert(
        'Alerta!',
        'Ya a sido creado un formulario REBP-06, ¿Desea continuar?',
        [
          { 
            text: 'Continuar',
            onPress: () => navigation.navigate('REBP-06',{objetoEncontrado}),
          },
          { 
            text: 'Volver',
          },
          
        ],
        { cancelable: false }
      );

    }
  }

  
  const generatePDF = async (updatedContentAfterWrite:any) => {
    const htmlContent = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice</title>
        <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
        <style>
        ${htmlStyles}
    
        </style>
      </head>
     <body>

     <h2>REBP-06</h2>
     <img class="watermark" src="https://empresasiansa.cl/patagoniafresh/wp-content/uploads/sites/6/2020/03/logo-patagoniafresh.svg" alt="logo">

    <table border="1" style="width:100%">
      <tr>
        <th>Planta</th>
        <td>Área</td>
        
      </tr>
      <tr>
        <th>Ciudad</th>
        <td>CHECK LIST EMBARQUES: INSPECCION DE CAMIONES, CONTENEDORES Y ENVASES</td>
      </tr>
      <tr>
      <th>Fecha</th>
      <td>${updatedContentAfterWrite.fecha}</td>
    </tr>
    </table>
      


    <br>
    <table border="1" style="width:100%">
      <tr>
        <th>Tipo de retiro</th>
        <th>Producto/s</th>
        <th>Lote Nr</th>
        <th>Nr de Envases</th>
      </tr>
      <tr>
        <td>${updatedContentAfterWrite.rebp06R1.TipoDeEnvio}</td>
        <td>${updatedContentAfterWrite.rebp06R1.Producto}</td>
        <td>${updatedContentAfterWrite.rebp06R1.LoteNr}</td>
        <td>${updatedContentAfterWrite.rebp06R1.NrdeEnvases}</td>
      </tr>
    </table>
    <br>
    <table border="1" style="width:100%">
      <tr>
          <th>Patente Camión</th>
          <th>Cliente</th>
          <th>Peso neto</th>
          <th>Peso bruto</th>
      </tr>
      <tr>
          <td>${updatedContentAfterWrite.rebp06R1.PatenteCamion}</td>
          <td>${updatedContentAfterWrite.rebp06R1.Cliente}</td>
          <td>${updatedContentAfterWrite.rebp06R1.PesoNeto}</td>
          <td>${updatedContentAfterWrite.rebp06R1.PesoBruto}</td>
      </tr>
    </table>
    <br>
    <table border="1" style="width:100%">
      <tr>
          <th>Tara</th>
          <th>Tipo de Envases</th>
          <th>Capacidad en Gals</th>
          <th>Revisiones</th>
      </tr>
      <tr>
          <td>${updatedContentAfterWrite.rebp06R1.Tara}</td>
          <td>${updatedContentAfterWrite.rebp06R1.TipodeEnvases}</td>
          <td>${updatedContentAfterWrite.rebp06R1.CapacidadEnGals}</td>
          <td>${updatedContentAfterWrite.rebp06R1.Revision ? updatedContentAfterWrite.rebp06R1.Revision.map((item:any) => item + '<br>').join('') : ''}</td>
      </tr>
    </table>
    

   

    <h4>Llenar solo en el Embarque ( Durante el mismo)</h4>

    <table border="1" style="width:100%; ">
      <tr>
          <th>Marcas en los Envases</th>

      </tr>
      <tr>
          <td >${updatedContentAfterWrite.rebp06R2.MarcaEnLosEnvases ? updatedContentAfterWrite.rebp06R2.MarcaEnLosEnvases.map((itemMarcaEnLosEnvases:any) => itemMarcaEnLosEnvases + '<br>').join('') : ''}</td>
      </tr>
    </table>

    <h4>Termoregistrador</h4>
    <table border="1" style="width:100%">
      <tr>
          <th>Crop</th>
          <th>Tipo de Envases</th>
          <th>Capacidad en Gals</th>
          <th>Dia Producc.</th>
          <th>Container Nr.</th>
      </tr>

      <tr>
          <td>${updatedContentAfterWrite.rebp06R2.crop}</td>
          <td>${updatedContentAfterWrite.rebp06R2.loteNrR2}</td>
          <td>${updatedContentAfterWrite.rebp06R2.envaseNr}</td>
          <td>${updatedContentAfterWrite.rebp06R2.diaProducc}</td>
          <td>${updatedContentAfterWrite.rebp06R2.containerNr}</td>
      </tr>
    </table>

    <br>
    <table border="1" style="width:100%">
      <tr>
          <th>Contramuestras</th>
          <th>Requerimientos de cliente</th>

      </tr>

      <tr>
          <td>${updatedContentAfterWrite.rebp06R2.contramuestras ? updatedContentAfterWrite.rebp06R2.contramuestras.map((itemContramuestras:any) => itemContramuestras + '<br>').join('') : ''}</td>
          <td>${updatedContentAfterWrite.rebp06R2.RequerimientosDeCliente ? updatedContentAfterWrite.rebp06R2.RequerimientosDeCliente.map((itemRequerimientosDeCliente:any) => itemRequerimientosDeCliente + '<br>').join('') : ''}</td>

      </tr>
    </table>
    <div style="page-break-before: always;"></div>
    <br>
    <table border="1" style="width:100%">
      <tr>
          <th>Inspeccion de camion</th>
          <th>Inspeccion contendedor</th>

      </tr>

      <tr>
          <td>${updatedContentAfterWrite.rebp06R3.InspeccionCamion ? updatedContentAfterWrite.rebp06R3.InspeccionCamion.map((itemInspeccionCamion:any) => itemInspeccionCamion + '<br>').join('') : ''}</td>
          <td>${updatedContentAfterWrite.rebp06R3.InspeccionContendedor ? updatedContentAfterWrite.rebp06R3.InspeccionContendedor.map((itemInspeccionContendedor:any) => itemInspeccionContendedor + '<br>').join('') : ''}</td>

      </tr>
    </table>
    <br>
    <table border="1" style="width:100%">
      <tr>
          <th>Observaciones</th>

      </tr>

      <tr>
          <td>${updatedContentAfterWrite.rebp06R3.ObservacionesR3}</td>

      </tr>
    </table>

    <br>
    <table border="1" style="width:100%">
      <tr>
          <th>Inspeccion de camion</th>
          <th>Inspeccion contendedor</th>
          <th>Estado de envases</th>
          <th>Fumigacion material</th>
      </tr>

      <tr>
          <td>${updatedContentAfterWrite.rebp06R4.dataLimpieza ? updatedContentAfterWrite.rebp06R4.dataLimpieza.map((itemDataLimpieza:any) => itemDataLimpieza + '<br>').join('') : ''}</td>
          <td>${updatedContentAfterWrite.rebp06R4.pallets ? updatedContentAfterWrite.rebp06R4.pallets.map((itemPallets:any) => itemPallets + '<br>').join('') : ''}</td>
          <td>${updatedContentAfterWrite.rebp06R4.estadoEnvases ? updatedContentAfterWrite.rebp06R4.estadoEnvases.map((itemEstadoEnvases:any) => itemEstadoEnvases + '<br>').join('') : ''}</td>
          <td>${updatedContentAfterWrite.rebp06R4.fumigacionMaterial ? updatedContentAfterWrite.rebp06R4.fumigacionMaterial.map((itemFumigacionMaterial:any) => itemFumigacionMaterial + '<br>').join('') : ''}</td>

      </tr>
    </table>
  
    <br>
    <table border="1" style="width:100%">
      <tr>
          <th>Checks</th>
          <th>Despacho en pallet</th>
          <th>Estado del tiempo</th>
          <th>Muestra al interior del contenedor</th>
      </tr>

      <tr>
          <td>${updatedContentAfterWrite.rebp06R4.cheks ? updatedContentAfterWrite.rebp06R4.cheks.map((itemCheks:any) => itemCheks + '<br>').join('') : ''}</td>
          <td>${updatedContentAfterWrite.rebp06R4.despachoEnPallet}</td>
          <td>${updatedContentAfterWrite.rebp06R4.estadoDelTiempo}</td>
          <td>${updatedContentAfterWrite.rebp06R4.muestraInteriorContenedor}</td>

      </tr>
    </table>

    <br>
    <table border="1" style="width:100%">
      <tr>
          <th>Carga asociada GD</th>
          <th>Observaciones OSAP</th>
          <th>Sellado de naviera</th>
          <th>Observaciones</th>
      </tr>

      <tr>
          <td>${updatedContentAfterWrite.rebp06R4.cargaAsociadaGD}</td>
          <td>${updatedContentAfterWrite.rebp06R4.observacionesOSAP}</td>
          <td>${updatedContentAfterWrite.rebp06R4.selladoDeNaviera}</td>
          <td>${updatedContentAfterWrite.rebp06R4.observacionesR4}</td>

      </tr>
    </table>
  
    <div style="margin-top: 20px; margin-bottom: 20px; page-break-before: always;"></div>

    <h2>REBP-01</h2>
    <table border="1" style="width:100%">
      <tr>
        <th>ID</th>
        <th>Lote</th>
        <th>Pallet</th>
        <th>N# TB</th>
        <th>Peso Neto</th>
        <th>Sello</th>
        <th>Sello Observaciones</th>
      </tr>

      ${updatedContentAfterWrite.dataExcel.map((item:any, index:any) => `
        <tr>
          <td>${item.ID}</td>
          <td>${item.Fecha}</td>
          <td>${item.Tipo}</td>
          <td>${item.Numero}</td>
          <td>${item.Valor}</td>
          <td>${item.Material}</td>
          <td>${item.Observaciones ? item.Observaciones.map((itemObservaciones:any) => itemObservaciones + '<br>').join('') : ''}</td>

        </tr>
      `).join('')}

    </table>

      
      </body>
    </html>
    `;
    
    const nuevoFormato = updatedContentAfterWrite.fecha.replace(/\//g, '-');

    const options = {
      html: htmlContent,
      fileName: String(nuevoFormato),
      directory: 'Document',
    };

    try {
      const pdf = await RNHTMLtoPDF.convert(options);
      viewPDF(pdf);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }

  };


  const viewPDF = async (pdf:any) => {
    try {
      const pdfPath = pdf?.filePath;
      const fileExists = await RNFS.exists(pdfPath);
 
      if (fileExists) {
        await FileViewer.open(pdfPath, { showOpenWithDialog: true, onDismiss: () => {} });
      } else {
        console.error('El archivo PDF no existe.');
      }
    } catch (error) {
      console.error('Error al abrir el PDF:', error);
    }
  };
  
  const prueba = async (index: any) => {
    const objetoEncontrado = data.find(item => item.index === index);
    const updatedContentAfterWrite = await RNFS.readFile(objetoEncontrado!.path);
    const jsonData = JSON.parse(updatedContentAfterWrite);

    //console.log(jsonData,urlImage)
    if (JSON.stringify(jsonData.rebp06R1) === '{}' || JSON.stringify(jsonData.rebp06R2) === '{}' || JSON.stringify(jsonData.rebp06R3) === '{}' || JSON.stringify(jsonData.rebp06R4) === '{}' || jsonData.excel === false){
      
      Alert.alert(
        'Alerta!',
        'No se han completado todos los formularios',
        [
          { 
            text: 'Aceptar',
          },
          
        ],
        { cancelable: false }
      );
    }
    else{
      try {
    
        await generatePDF(jsonData);
  
      } catch (error) {
        console.error('Error en la función prueba:', error);
      }
    }

  };
  
  

{/* ------------------------------------------------------------------------ */}
{/* ------------------------------------------------------------------------ */}
{/* ------------------------------------------------------------------------ */}
{/* ------------------------------------------------------------------------ */}
{/* ------------------------------------------------------------------------ */}
{/* ------------------------------------------------------------------------ */}
{/* ------------------------------------------------------------------------ */}
{/* ------------------------------------------------------------------------ */}

  return (
    
    <View style={styles.container}>

{/* pagina de inicio con las tarjetas en pantalla */}
        <ScrollView >
        <View>

        </View>
          <View style={{flex:1, alignItems: 'center',paddingTop:'3%',backgroundColor:'#fcfdf8',width:'100%'}}> 
            <Image source={require('./assets/logo-patagoniafresh.png')} />

          </View>
          <View style = {styles.scroll}>

            {data
              .sort((a, b) => b.index - a.index)
              .map((elemento, index) => (
                <Tarjeta key={index} nombre={elemento.nombre} fecha={elemento.fecha} index={elemento.index} path={elemento.path} dataExcel = {elemento.dataExcel} />
              ))}
          </View>

        </ScrollView>


{/* Boton de agregar tajetas */}
         <View style={styles.botonAgregar}>
    
          <Button title="Agregar formulario" onPress={() => toggleModal()} />

          </View>

{/*modal de agregar tarjeta */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Ingrese fecha de formulario</Text>
            <View style = {styles.fecha}>
              <TextInput
                
                style={styles.input}
                onChangeText={setDia}
                value={Dia}
                placeholder="Dia"
                placeholderTextColor='grey'
                keyboardType="numeric"
              />
              <TextInput

                style={styles.input}
                onChangeText={setMes}
                value={Mes}
                placeholder="Mes"
                placeholderTextColor='grey'
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                onChangeText={setAnio}
                value={Anio}
                placeholder="Año"
                placeholderTextColor='grey'
                keyboardType="numeric"
              />
               
            </View >
            <View style= {{paddingVertical:'5%'}}>
            <Button title="Crear formulario" onPress={() =>{ handleCreateJson();setAnio('');setDia('');setMes('');toggleModal()}} />
            <View style = {{paddingTop:5}}></View>
            <Button title="Cerrar" onPress={() => toggleModal()} />
            </View>

          </View>
        </View>  
      </Modal>



{/* modal de opciones para formularios y cargar excel */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalOpcionesValor}
        onRequestClose={ModalOpciones}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Fecha: {fecha}</Text>
            <View>

            <Button  title="REBP-01" onPress={() => { AbrirREBP01(index);ModalOpciones('',0,0,'','');}} />
            <Text></Text>
            <Button  title="REBP-06" onPress={() =>  { AbrirREBP06(index); ModalOpciones('',0,0,'',''); }}/>

            <Text></Text>



            <Button title="Seleccionar Excel" onPress={() => pickDocument(nombre,path)} />

            </View >
            <View style= {{paddingVertical:'5%'}}>

              <Button title="Cerrar" onPress={() => ModalOpciones('',0,0,'',null)} />
              
            </View>

          </View> 
        </View>
      </Modal> 

{/* modal de pantalla de carga */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalOpcionesValorCarga}
        onRequestClose={ModalOpcionesCargaVisilidad}
      >
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style = {{color:'white'}}>Cargando...</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fcfdf8',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tarjeta: {
    display: 'flex',
    backgroundColor:'white',
    borderWidth: 1,
    borderColor: 'black',
    width:'44.9%',
    padding: 10,
    margin: 10,
  },
  botonAgregar:{
    position: 'absolute', 
    bottom: 10, 
    right: 10 
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    color:'black',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    margin: 2,
    borderWidth: 1,
    padding: 10,
    color:'black',
  },
  fecha: {
    flexDirection: 'row'
  },

  scroll:{
    flexDirection:'row',
    flexWrap: 'wrap'
  }
  ,
  texto:{
    color: 'black'

  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },

});



const htmlStyles = `
.recuadroInfo {
 
  display: flex;
  flex-direction: row;
  border: 2px solid black; 
}

.recuadroInfo img {
  width: 200px; 
}

.recuadroInfo div {
  border-right: 2px solid black; 
  display: flex;
  flex-direction: column;
}

.recuadroInfo div:last-child {
  border-right: none; 
}

.recuadroInfo div h4 {
  margin-bottom: 5px;
  border-bottom: 2px solid black;
  
}
.recuadroInfo div .sinLinea {
  border-bottom: none;
}
.watermark {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 10px; /* Margen para darle un espacio desde los bordes */
  opacity: 0.3; /* Ajusta la opacidad según tus necesidades */
  pointer-events: none; /* Permite que la imagen no interfiera con la interacción del usuario */
}
`;


/*     <div style="display: flex; flex-direction: row;">
    <div style="flex: 1;">
    <h4>Contramuestras</h4>
      <table border="1" style="width: 100%;">
        <tr>
          <th>Crop</th>
          <th>Tipo de Envases</th>
        </tr> 
        <tr>
        <td>${updatedContentAfterWrite.rebp06R2.contramuestras ? updatedContentAfterWrite.rebp06R2.contramuestras.map((itemContramuestras:any) => itemContramuestras + '<br>').join('') : ''}</td>
        <td>${updatedContentAfterWrite.rebp06R2.loteNrR2}</td>
        </tr>
      </table>
    </div>
  
    <div style="flex: 1; padding-left: 10px;">
      <h4>Contramuestras</h4>

      <table border="1" style="width: 100%;">
        <tr>
          <th>Crop</th>
          <th>Tipo de Envases</th>
        </tr>
        <tr>
          <td>${updatedContentAfterWrite.rebp06R2.crop}</td>
          <td>${updatedContentAfterWrite.rebp06R2.loteNrR2}</td>
        </tr>
      </table>
    </div>
  </div> */