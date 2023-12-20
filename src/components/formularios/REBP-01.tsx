import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, ScrollView,TouchableHighlight, Image, ActivityIndicator } from 'react-native'; // Asegúrate de tener ScrollView importado
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';


export default function REBP01({route}) {

  const orderedColumns = ["ID", "Fecha", "Material", "Numero", "Tipo", "Valor"];
  const { objetoEncontrado } = route.params;


  const [ModalOpcionesValorCarga, setModalOpcionesCarga] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [originalData, setOriginalData] = useState(objetoEncontrado.dataExcel);
  const [editedData, setEditedData] = useState([...objetoEncontrado.dataExcel]);

  // Calcular el índice de inicio y fin de las filas para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToShow = editedData.slice(startIndex, endIndex);

  const navigation = useNavigation();

  const ModalOpcionesCargaVisilidad = (tiempo: number) => {
    setModalOpcionesCarga(true);
  
    setTimeout(() => {
      navigation.navigate('Formularios')
      setModalOpcionesCarga((prevValue) => !prevValue);
    }, tiempo);
  };

  const imprimirInfo = async () => {

    try {
      // Lee el contenido actual del archivo JSON
      const currentContent = await RNFS.readFile(objetoEncontrado.path);
  
      // Analiza el contenido para convertirlo en un objeto JavaScript
      const currentData = JSON.parse(currentContent);
  
      // Agrega nueva información al objeto (por ejemplo, un nuevo campo 'gato')
      currentData.dataExcel = editedData;
      currentData.excel  = 'true'
  
      // Convierte el objeto actualizado en una cadena JSON
      const updatedContent = JSON.stringify(currentData);
      
      // Escribe la cadena JSON actualizada en el archivo  
      await RNFS.writeFile(objetoEncontrado.path, updatedContent, 'utf8'); 
  
      // Vuelve a cargar los archivos JSONs
      ModalOpcionesCargaVisilidad(2000)
      
    } catch (error) {
      console.error(error);
    } 
  };


  useEffect(() => {
    // Actualiza los datos originales cuando cambia la página
    setOriginalData(objetoEncontrado.dataExcel);
    // Restablece los datos editados a los originales al cambiar de página
    setEditedData([...objetoEncontrado.dataExcel]);
  }, [currentPage, objetoEncontrado.dataExcel]);

  return (
    <View style={{ backgroundColor: '#fcfdf8', flex: 1, justifyContent: 'center', padding: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {/* Renderizar la primera fila con los nombres de las columnas */}
          <View style={styles.row}>
            {orderedColumns.map(column => (
              <Text  key={column} style={styles.cell}>
                {column}
              </Text>
            ))}
          </View>

          {/* Renderizar las filas correspondientes a la página actual */}
          {dataToShow.map((item, rowIndex) => (
            <View style={styles.row} key={item.ID}>
              {orderedColumns.map(column => (
                <View key={column} style={styles.cell}>
                  {column === 'Material' ? (
                    <TextInput
                      style={styles.input}
                      value={item[column]}
                      onChangeText={newValue => {
                        // Actualiza el valor en el objeto clonado
                        const newData = [...editedData];
                        newData[startIndex + rowIndex][column] = newValue;
                        setEditedData(newData);
                      }}
                    />
                  ) : (
                    <Text>{item[column]}</Text>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.botonAgregar}>
        <Button  title="Guardar" onPress={imprimirInfo} />
        <Text style={{ paddingLeft: 10 }}></Text>


      </View>

      {/* Agregar controles de paginación */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10,bottom:10 }}>
        <Button
          title="Anterior"
          onPress={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        />
        <Text style={{ marginHorizontal: 10,fontWeight:'bold',fontSize:20 }}>{`Página ${currentPage}`}</Text>
        <Button
          title="Siguiente"
          onPress={() => setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(originalData.length / itemsPerPage)))}
          disabled={endIndex >= originalData.length}
        />
      </View>

      {/* modal de pantalla de carga */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalOpcionesValorCarga}
        onRequestClose={ModalOpcionesCargaVisilidad}
      >
        <View style={styles.modalContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
          <Text style = {{color:'white'}}>Guardando...</Text>
        </View>
      </Modal>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
    
  },
  cell: {
    fontSize:15,
    fontWeight:'bold',
    flex: 1,
    textAlign: 'center',
    alignItems:'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 5, // Ajusta el espaciado horizontal del TextInput
  },
  botonAgregar:{
    position: 'absolute', 
    bottom: 50, 
    right: 20, 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
});
