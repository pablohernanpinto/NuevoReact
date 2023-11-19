import React, { useState } from 'react';
import { StyleSheet, Text, View,TextInput } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import InputText from '../elements/inputText';
import { MultipleSelectList } from 'react-native-dropdown-select-list'

export default function Tres(){

  const [dataCamion, setDataCamion] = React.useState("");
  const [data_InspCont, setData_InspCont] = React.useState("");

  const elem1=['Observaciones'];
  const inspCamion = [
    {key:'1', value:'Olores', },
    {key:'2', value:'Residuos'},
    {key:'3', value:'Alergenos'},
    {key:'4', value:'Capacidad'},
    {key:'5', value:'Carpa Camión', }
]
const inspConte = [
  {key:'1', value:'Olores', },
  {key:'2', value:'Residuos'},
  {key:'3', value:'Alergenos'},
  {key:'4', value:'Capacidad'},
  {key:'5', value:'Pisos'},
  {key:'6', value:'Paredes'},
  {key:'7', value:'Puertas'},
  {key:'8', value:'Fumigación Contenedor'},
  {key:'9', value:'Dry'},
  {key:'10', value:'Reefer'},
  {key:'11', value:'T°'}
  
]
  return(
      <View style= {styles.firstContainer}>
        <View>
          <Text style = {[styles.titulo,{fontSize:17}]}>Llenar solo en el Embarque ( Durante el mismo)</Text>
        </View>
        <View style = {styles.containerDrop}> 
            <Text style = {styles.titulo}>
              Inspección Camión
            </Text>
            <MultipleSelectList 
            setSelected={(e) => setDataCamion(e)} 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            data={inspCamion} 
            save="value"
            label="Categories"
            />
          </View> 
          <View style = {styles.containerDrop}> 
            <Text style = {styles.titulo}>
              Inspección Contenedor
            </Text>
            <MultipleSelectList 
            setSelected={(e) => setData_InspCont(e)} 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            data={inspConte} 
            save="value"
            label="Categories"
            />
          </View>
          <View>
          <View style = {{flexDirection: 'column'}}>
          {elem1.map((elem1, index) => (
              <InputText key={index} nombre={elem1} ancho ={"90%"} place={''}/>
              ))}
          </View>
          </View>
      </View>
  )
}


const styles = StyleSheet.create({
  Container: {
    flex:1,
  },
  containerDrop:{
    paddingLeft: 10,
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