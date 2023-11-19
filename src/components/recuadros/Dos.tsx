import React, { useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import InputText from '../elements/inputText';
import { MultipleSelectList } from 'react-native-dropdown-select-list'

export default function Dos(){
  const TermoList = ['Crop.','Lote Nr.','Envase Nr.','Día Producc', 'Container Nr.'];

  const [opciones, setOpciones] = React.useState("");
  const opcionesList = [
      {key:'1', value:'Retiro de Muestras', },
      {key:'2', value:'Análisis de muestras'},
  ]


  const [Revision, setRevision] = React.useState("");
  const RevisionList = [
      {key:'1', value:'Nombre del Producto', },
      {key:'2', value:'Nombre y Dirección del Manufacturador'},
      {key:'3', value:'Simbología de Almacenaje y Manipulación'},
      {key:'4', value:'Acidez'},
      {key:'5', value:'Brix'},
      {key:'6', value:'Color'},
      {key:'7', value:'Capacidad'},
      {key:'9', value:'Alcohol'},
      {key:'10', value:'Fold'},
  ]

  const [RequerimientosDeCliente, setRequerimientosDeCliente] = React.useState("");
  const RequerimientosDeClienteList = [
      {key:'1', value:'Marcas Requeridas por el Cliente', },
      {key:'2', value:'Bandas Requeridas por el Cliente'},
      {key:'3', value:'Etiquetas Requeridas por el Cliente'},

  ]

  return(
      <View style= {styles.firstContainer}>
          <View>
            <Text style = {[styles.titulo,{fontSize:17}]}>
              Llenar solo en el Embarque (Durante el mismo)
            </Text>
            <Text style = {[styles.titulo]}>
              Marcas en los Envases 
            </Text>
          </View>

          <View style = {styles.containerDrop}> 
            <Text style = {styles.titulo}>
              Revision del estado
            </Text>
      
            <MultipleSelectList 
            setSelected={(val) => setRevision(val)} 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            data={RevisionList} 
            save="value"
            label="Categories"
            />
          </View> 

          <View style = {styles.containerDrop}> 
            <Text style = {styles.titulo}>
              Requerimientos de clientes
            </Text>
      
            <MultipleSelectList 
            setSelected={(val) => setRequerimientosDeCliente(val)} 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            data={RequerimientosDeClienteList} 
            save="value"
            label="Categories"
            />
          </View> 

          
          <Text style = {[styles.titulo,{fontSize:18}]}>
              Termoregistrador
          </Text>

          <View style = {{flexDirection: 'column'}}>
              {TermoList.map((TermoList, index) => (
              <InputText key={index} nombre={TermoList} ancho={"90%"} place={undefined} />
              ))}
          </View>


                    
          <Text style = {[styles.titulo,{fontSize:18}]}>
              Contramuestras
          </Text>

          <View style = {styles.containerDrop}>           
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