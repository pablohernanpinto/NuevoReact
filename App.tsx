import React, { useState, useEffect } from 'react';
import { View, Button, Text,Modal, FlatList,TextInput,StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';
import DatePicker from 'react-native-date-picker'
import DocumentPicker from 'react-native-document-picker';

export default function App() {
  const [contador, setContador] = useState(1);
  const [selectedJsonContent, setSelectedJsonContent] = useState(null);
  const [jsonFiles, setJsonFiles] = useState(['0.json']);

  const [lista, setLista] = useState ([])


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
    // Cargar la lista de archivos JSON al inicio 
    loadJsonFiles();
  }, []); // La dependencia vacía asegura que se ejecute solo una vez al montar el componente

  const loadJsonFiles = async () => {
    try {
      const files = await RNFS.readdir(RNFS.DocumentDirectoryPath);
      const jsonFiles = files.filter(file => file.endsWith('.json'));

      setJsonFiles(jsonFiles.reverse());
       for (let i = 0; i<jsonFiles.length;i++){
        const aux = jsonFiles[i].split('.')
        lista.push(Number(aux[0]))
      }
      setContador(Math.max(...lista))
      console.log(contador,'de la primera') 

    } catch (error) {

      console.error('Error al cargar la lista de archivos JSON:', error);
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
      console.log(`Archivo ${fileName} eliminado`);
      // Actualizar la lista de archivos después de eliminar uno
      loadJsonFiles();
    } catch (error) {
      console.error(`Error al eliminar el archivo ${fileName}:`, error);
    }
  };


  const handleCreateJson = async () => {

    try {
      console.log(jsonFiles, 'este')
      const nombre = jsonFiles[0].split('.')
      //console.log(Math.max(...jsonFiles))

      
      await createJsonFile(contador+1, { fecha: Dia+'/'+Mes+'/'+Anio, index: Number(nombre[0])+1 });
    } catch (error) {
      
      await createJsonFile(0, { fecha: Dia+'/'+Mes+'/'+Anio, index: 0 });

      //console.error('Error al crear el archivo JSON:', error);
      // Puedes manejar el error de alguna manera, dependiendo de tus requisitos.
    }
  }; 


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {/* Contenedor de la lista de archivos */}
    <FlatList
  horizontal={false}
  numColumns={2}
  data={jsonFiles}
  keyExtractor={(item) => item}
  renderItem={({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.dateText}>{'Fecha de registro:'}</Text>
      <Text style={styles.fileNameText}>{item} </Text>

      <View>
        
      <Button title="Ingresar" onPress={() => deleteJsonFile(item)}/>
      <Button color={'red'} title="Eliminar" onPress={() => deleteJsonFile(item)}/>
    
      </View>
    
    </View>
      )}
    />

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
      {/* fin modal */}


    {/* Botón "Crear Archivo JSON" en la parte inferior derecha */}
    <View style={styles.botonAgregar}>
    
    {/* <Button title="Agregar formulario" onPress={handlePickDocument} />
     */}  
     <Button title="Agregar formulario" onPress={toggleModal} />
    </View>

    {/* Otro contenido de la aplicación (si es necesario) */}
    {selectedJsonContent && <Text>{selectedJsonContent}</Text>}
  </View>
);
}



const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#61dafb',
  },
  listItem: {
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  botonAgregar:{
    position: 'absolute', 
    bottom: 10, 
    right: 10 
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '9%',
    margin: '1%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 14,
    marginBottom: 5,
  },
  fileNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deleteButton: {
    marginLeft: 10,
    alignSelf: 'flex-end',
  },
});