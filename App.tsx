import React, { useState, useEffect } from 'react';
import {ActivityIndicator, View, Text, StyleSheet, Button, Modal, TextInput, Image, ScrollView, Alert,useColorScheme, Appearance } from 'react-native';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import XLSX from 'xlsx';
import { readFile } from "react-native-fs";

export default function App({navigation}) {

  /* 
function Navigation() {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => {
      subscription.remove();
    };
  }, []);
 */
  const [theme, setTheme] = useState(Appearance.getColorScheme());

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
  
        ModalOpcionesCargaVisilidad(3000);
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
      await createJsonFile(String(indexMasGrande+1), { fecha: Dia+'/'+Mes+'/'+Anio, index: Number(indexMasGrande)+1,excel: false, rebp06:false });
    } catch (error) { 
      await createJsonFile('0', { fecha: Dia+'/'+Mes+'/'+Anio, index: 0 , excel: false, rebp06:false });
      //console.error('Error al crear el archivo JSON:', error);
    }
  }; 

  const createJsonFile = async (fileName: string, content: {fecha:string,index:Number, excel: boolean, rebp06:boolean}) => {
    
    const path = RNFS.DocumentDirectoryPath + `/${fileName}.json`;

    try {
      await RNFS.writeFile(path, JSON.stringify(content), 'utf8');
      loadJsonFiles();
    } catch (error) { 
      console.error(error);
    }
  };

  const deleteJsonFile = async (fileName: string) => {
    const path = RNFS.DocumentDirectoryPath + `/${fileName}`;

    try {
      await RNFS.unlink(path); 
      loadJsonFiles();
    } catch (error) {
      console.error(`Error al eliminar el archivo ${fileName}:`, error);
    }
  };

 

  const Tarjeta = ({nombre, fecha, index,path,dataExcel }: { nombre: string; fecha: any; index: any; path: string; dataExcel:object}) => {
    return (
      <View style={styles.tarjeta}>
        
        <Text style = {styles.texto}>{`Fecha: ${fecha}`}</Text> 
        <Text></Text> 
        <Button title="Ingresar"  onPress={() => ModalOpciones(nombre, fecha, index,path,dataExcel)} />
        <View style = {{paddingTop:5}}></View>
        <Button color={'red'} title="Eliminar" onPress={() => deleteJsonFile(nombre)}/>
        {/* <Button color={'red'} title="imprimir" onPress={() => imprimir()}/>  */}
        <View style = {{paddingTop:5}}></View>
        <Button title="Imprimir Data" onPress={() => prueba(index)} /> 

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
    console.log(objetoEncontrado)
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


  const prueba = async (index:any) => {
    const objetoEncontrado = data.find(item => item.index === index);
    const updatedContentAfterWrite = await RNFS.readFile(objetoEncontrado!.path);
    console.log('contenido actualizado:', updatedContentAfterWrite);
  }

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
