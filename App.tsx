import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import XLSX from 'xlsx';
import { readFile } from "react-native-fs";
import deleteJsonFile from "./src/components/funciones/DeleteJson"

export default function App({navigation}) {
  const [data, setData] = useState([]);
  
  /* modal */
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const [ModalOpcionesValor, setModalOpciones] = useState(false);

  const [fecha, setFecha] = useState('');
  const [Index, setIndex] = useState(Number);
  const [nombre, setNombre] = useState(Number);
  const ModalOpciones = (fecha:string,Index:number,nombre:string) => {
    setFecha(fecha);
    setIndex(Index); 
    setNombre(nombre);

    setModalOpciones(!ModalOpcionesValor);
  };

  /* input */

  const [Dia, setDia] = React.useState('');
  const [Mes, setMes] = React.useState('');
  const [Anio, setAnio] = React.useState('');

  /* archivos de excel */

  const [excel,setExcel] = React.useState({})

  useEffect(() => {
    loadJsonFiles();
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
          console.log(content)
          const parsedContent = JSON.parse(content);
          dataArray.push({nombre: fileName, fecha: parsedContent.fecha, index: parsedContent.index, path: path});
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


const pickDocument = async (nombre:string) => {
  try {
    console.log(nombre)
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
      setExcel(valoresOrganizados)
      agregarJson(excel,nombre)
    } else {
      console.log('Selección de archivo cancelada');
    }
  } catch (err) {
    console.error('Error al seleccionar el archivo:', err);
  }
};

  const agregarJson = (excel:object,nombre:string) =>{
    console.log(excel,nombre)
  }

  const handleCreateJson = async () => {
    //console.log(data)
    const indexMasGrande = data.reduce((maxIndex, elemento) => {
      return elemento.index > maxIndex ? elemento.index : maxIndex;
    }, -1);
    try {
      await createJsonFile(indexMasGrande+1, { fecha: Dia+'/'+Mes+'/'+Anio, index: Number(indexMasGrande)+1,excel: false });
    } catch (error) {
      await createJsonFile('0', { fecha: Dia+'/'+Mes+'/'+Anio, index: 0 , excel: false });
      //console.error('Error al crear el archivo JSON:', error);
    }
  }; 

  const createJsonFile = async (fileName: string, content: { mensaje: string }) => {
    const path = RNFS.DocumentDirectoryPath + `/${fileName}.json`;

    try {
      await RNFS.writeFile(path, JSON.stringify(content), 'utf8');
      console.log(`Archivo ${fileName}.json creado en ${RNFS.DocumentDirectoryPath}`);
      // Actualizar la lista de archivos después de crear uno nuevo
      loadJsonFiles();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteJsonFile = async (fileName: string) => {
    const path = RNFS.DocumentDirectoryPath + `/${fileName}`;

    try {
      await RNFS.unlink(path); 
      //console.log(`Archivo ${fileName} eliminado`);
      // Actualizar la lista de archivos después de eliminar uno
      loadJsonFiles();
    } catch (error) {
      console.error(`Error al eliminar el archivo ${fileName}:`, error);
    }
  };

  
  const imprimir = () => {
    console.log(excel)
  }

  const Tarjeta = ({nombre, fecha, index,path }) => {
    return (
      <View style={styles.tarjeta}>
        
        <Text style = {styles.texto}>{`Fecha: ${fecha}`}</Text>
        {/* <Text>{`Index: ${index}`}</Text> */}
        <Button color={'green'} title="Ingresar"  onPress={() => ModalOpciones(fecha,index,nombre)} />
        <Button color={'red'} title="Eliminar" onPress={() => deleteJsonFile(nombre)}/>
        <Button color={'red'} title="imprimir" onPress={() => imprimir()}/>
      </View>
    );
  };


  return (
    
    <View style={styles.container}>

        
        <ScrollView >
        <View>

    </View>
        <View style={{flex:1, alignItems: 'center',paddingTop:'3%',backgroundColor:'#f9fdee',width:'100%'}}> 
            <Image source={require('./assets/logo-patagoniafresh.png')} />
        </View>
          <View style = {styles.scroll}>

          {data
            .sort((a, b) => b.index - a.index)
            .map((elemento, index) => (
              <Tarjeta key={index} nombre={elemento.nombre} fecha={elemento.fecha} index={elemento.index} path={elemento.path} />
            ))}
          </View>

        </ScrollView>


         <View style={styles.botonAgregar}>
    
          <Button title="Agregar formulario" onPress={() => toggleModal()} />
          </View>

{/*modal */}
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
            <Button title="Crear formulario" onPress={() =>{ handleCreateJson();setAnio(null);setDia(null);setMes(null);toggleModal()}} />
            
            <Button title="Cerrar" onPress={() => toggleModal()} />
            </View>

          </View>
        </View>
      </Modal>



{/* modal de opciones */}

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
            
            <Button color={'green'} title="REBP-01" onPress={() => { navigation.navigate('REBP-01'); ModalOpciones(null,null); }} />
            <Text></Text>
            <Button color={'green'} title="REBP-06" onPress={() =>  {navigation.navigate('REBP-06'); ModalOpciones(null,null); }}/>
            <Text>{nombre}</Text>
            <Button title="Seleccionar Excel" onPress={() => pickDocument(nombre)} />

            </View >
            <View style= {{paddingVertical:'5%'}}>

              <Button title="Cerrar" onPress={() => ModalOpciones(null,null)} />
              
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#f9fdee',
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

  }

});
