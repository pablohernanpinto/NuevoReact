import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, ScrollView } from 'react-native'; // Asegúrate de tener ScrollView importado
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';


export default function REBP01({navigate}) {
  const [data, setData] = useState([{ key: '1', values: ['', '', '', '', ''] }]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [, setOpciones] = React.useState("");
  const opcionesList = [
    {key:'1', value:'Hongos'},
    {key:'2', value:'Boquilla cerrada'},
    {key:'3', value:'Boquilla limpia'},
    {key:'4', value:'Bolsas limpias'},
    {key:'5', value:'Bolsas sin rotura'},
    {key:'6', value:'*Revisado'},
  ];

  const navigation = useNavigation();
  const columnPlaceholders = ['Lote', 'Pallet', 'N# TB', 'Peso Neto', 'Sello'];

  const addRow = (numRows) => {
    const newRows = Array.from({ length: numRows }, (_, i) => ({
      key: String(Date.now() + i), // Asigna una key única usando Date.now() y un índice
      values: ['', '', '', '', '']
    }));
  
    setData([...data, ...newRows]);
  };
  
  const handleChangeText = (text, rowIndex, colIndex) => {
    const updatedData = data.map((row, i) => {
      if (i === rowIndex) {
        const updatedValues = [...row.values];
        updatedValues[colIndex] = text;
        return { ...row, values: updatedValues };
      }
      return row;
    });
    setData(updatedData);
  };

  const handleButtonPress = (rowIndex) => {
    setModalContent(
      <View>
        <Text style={[styles.titulo, {fontSize: 18}]}>Observaciones</Text>
        <View>
          <MultipleSelectList 
            setSelected={(val) => setOpciones(val)} 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            data={opcionesList} 
            save="value"
            label="revision"
          />
        </View>
      </View>
    );
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item, index }) => (
    <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
      <Text>{index + 1}. </Text>
      {item.values.map((value, colIndex) => (
        <TextInput
          key={`${item.key}-${colIndex}`}
          style={{ height: '90%', borderColor: 'gray', borderWidth: 1, margin: 2, flex: 1, textAlign: 'center' }}
          onChangeText={(text) => handleChangeText(text, index, colIndex)}
          value={value}
          placeholder={columnPlaceholders[colIndex]}
        />
      ))}
      <Button title="Detalle" onPress={() => handleButtonPress(index)} />
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <ScrollView>
        {data.map((item, index) => renderItem({ item, index }))}
      </ScrollView>

      <View style = {{flexDirection:'row',display:'flex'}}>
        <Button title="Agregar 10 Filas" onPress={() => addRow(10)} />

        <Button color={'green'} title="Ingresar" onPress={() =>  navigation.navigate('REBP-06')}/>


      </View>
      

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            {modalContent}
            <Text></Text>
            <Button title="Cerrar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex:1,
  },
  firstContainer:{
    borderWidth:1,
    width:'97%',
    margin:"1.5%"
  },
  box:{
    backgroundColor:'white',
    width: '95%',
  },
  titulo: {
    fontWeight: 'bold', 
    fontSize: 17,
    paddingLeft:'1%',
    paddingBottom: 10,
    paddingRight:4,
  },
  inputOtros: {
    width: "90%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius:10,
    borderColor:'red',
  },
  selectList:{
    backgroundColor:'white',
    width: '95%',
  }
});
