import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput, Image, ScrollView } from 'react-native';
import RNFS from 'react-native-fs';

export default function App() {
  const [data, setData] = useState([]);
  
  /* modal */
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  /* input */

  const [Dia, setDia] = React.useState('');
  const [Mes, setMes] = React.useState('');
  const [Anio, setAnio] = React.useState('');


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
          const parsedContent = JSON.parse(content);
          dataArray.push({nombre: fileName, fecha: parsedContent.fecha, index: parsedContent.index });
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


  const handleCreateJson = async () => {
    //console.log(data)
    const indexMasGrande = data.reduce((maxIndex, elemento) => {
      return elemento.index > maxIndex ? elemento.index : maxIndex;
    }, -1);
    try {
      await createJsonFile(indexMasGrande+1, { fecha: Dia+'/'+Mes+'/'+Anio, index: Number(indexMasGrande)+1 });
    } catch (error) {
      await createJsonFile('0', { fecha: Dia+'/'+Mes+'/'+Anio, index: 0 });
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

  const Tarjeta = ({nombre, fecha, index }) => {
    return (
      <View style={styles.tarjeta}>
        <Text>{`Nombre: ${nombre}`}</Text>
        <Text>{`Fecha: ${fecha}`}</Text>
        <Text>{`Index: ${index}`}</Text>
        <Button color={'red'} title="Eliminar" onPress={() => deleteJsonFile(nombre)}/>
      </View>
    );
  };


  return (
    
    <View style={styles.container}>
        <View style={{flex:1, alignItems: 'center',paddingTop:'3%'}}> 
            <Image source={require('./assets/logo-patagoniafresh.png')} />
        </View>
        
        <ScrollView>


      {data.map((elemento, index) => (
        <Tarjeta key={index} nombre = {elemento.nombre}  fecha={elemento.fecha} index={elemento.index} />
        
      ))}
        </ScrollView>
         <View style={styles.botonAgregar}>
    
          <Button title="Agregar formulario" onPress={toggleModal} />
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
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                onChangeText={setMes}
                value={Mes}
                placeholder="Mes"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                onChangeText={setAnio}
                value={Anio}
                placeholder="Año"
                keyboardType="numeric"
              />
            </View >
            <View style= {{paddingVertical:'5%'}}>
            <Button title="Crear formulario" onPress={handleCreateJson} />
            
            <Button title="Cerrar" onPress={toggleModal} />
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
    backgroundColor:'white',
    borderWidth: 1,
    borderColor: 'black',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro para el modal
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
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
  tinyLogo: {
    width: 100,
    height: 100,
  },

});
