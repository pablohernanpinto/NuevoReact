import React, { useState } from 'react';
import { StyleSheet, Text, View,TextInput } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import InputText from '../elements/inputText';
import { MultipleSelectList } from 'react-native-dropdown-select-list'

export default function Uno(){


  const [text, onChangeText] = React.useState('');
  const elementosIzq1 = ['Lote Nr.','Lote Nr','Nr de Envases','Patente Camión', 'Cliente','Peso neto', 'Peso bruto','Tara'];

  
  const [mostrarInputOtro, setMostrarInputOtro] = React.useState(false);
  const [Envio, setEnvio] = React.useState("");
  const TipoDeEnvio = [
      {key:'1', value:'Retiro Planta', },
      {key:'2', value:'Embarque'},
      {key:'3', value:'Otro'},
  ]

  const [mostrarInputOtroProducto, setMostrarInputOtroProducto] = React.useState(false);
  const [producto, setProducto] = React.useState("");
  const Producto = [
      {key:'1', value:'JCManzana', },
      {key:'2', value:'JCPera'},
      {key:'3', value:'JCFrambuesa'},
      {key:'4', value:'JCDurazno'},
      {key:'5', value:'Aroma'},
      {key:'6', value:'Manz Cloudy'},
      {key:'7', value:'JCFrutilla'},
      {key:'8', value:'Otro'},

  ]
  
  const [TipoDeEnvase, setTipoDeEnvase] = React.useState("");
  const Envase = [
      {key:'1', value:'T. Métalico', },
      {key:'2', value:'B. Plástico'},
      {key:'3', value:'Tote Bins'},
      {key:'4', value:'Flexi/Iso Bag'},
  ]

  const [capacidadEnGals, setCapacidadEnGals] = React.useState("");
  const capGals = [
      {key:'1', value:'51,8', },
      {key:'2', value:'52'},
      {key:'3', value:'53,7'},
      {key:'4', value:'54.7'},
      {key:'5', value:'55', },
      {key:'6', value:'60'},
      {key:'7', value:'300'},
      {key:'8', value:'Flexi'},
      {key:'9', value:'Otro', },
  ]

  const [SelectMulti, setSelectMulti] = React.useState([]);
  const SelectMultilist = [
      {key:'1', value:'REVISION PESO ETIQUETA DE ENVASADO', },
      {key:'2', value:'REVISION FECHA ETIQUETA DE ENVASADO'},
  ]


  return(
      <View style= {styles.firstContainer}>
          <View style = {styles.containerDrop}>           
            <Text style = {styles.titulo}>
                  Tipo de Envio
            </Text>
            <SelectList 
              boxStyles={styles.box}
              dropdownStyles={styles.box}
              setSelected={(val) => {setEnvio(val);
                if(val === 'Otro') {
                  setMostrarInputOtro(true);
                } 
                else {
                  setMostrarInputOtro(false);
                }
                }} 
              data={TipoDeEnvio} 
              save="value"
              />            

          
          {mostrarInputOtro && (<TextInput
              style={styles.inputOtros}
              onChangeText={onChangeText}
              value={text}
              placeholder="Especifique otro tipo de envio "
              placeholderTextColor="#a9a9a9"
              />
            )}
          </View>
            
          <View style = {styles.containerDrop}>

          <Text style = {styles.titulo}>Producto</Text>
          <SelectList 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            setSelected={(val) => {setProducto(val);
              if(val === 'Otro') {
                setMostrarInputOtroProducto(true);
              } 
              else {
                setMostrarInputOtroProducto(false);
              }
            }}        
            data={Producto} 
            save="value"
          />

          
          {mostrarInputOtroProducto && (
            <TextInput
              style={styles.inputOtros}
              onChangeText={onChangeText}
              value={text}
              placeholder="Especifique otro producto "
              placeholderTextColor="#a9a9a9"
              />
          )}
          </View>


          <View style = {{flexDirection: 'column'}}>
              {elementosIzq1.map((elementosIzq1, index) => (
              <InputText key={index} nombre={elementosIzq1} ancho={"90%"} place={undefined} />
              ))}

          <View style = {[styles.containerDrop, {paddingBottom:'1%'}]}>

          <Text style = {styles.titulo}>Tipo de envase</Text>
          <SelectList 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            setSelected={(val) => setTipoDeEnvase(val)}        
            data={Envase} 
            save="value"
          />
          </View>
        </View>


        <View style = {styles.containerDrop}>           
            <Text style = {styles.titulo}>
              Capacidad en gals
            </Text>
            <SelectList 
              boxStyles={styles.box}
              dropdownStyles={styles.box}
              setSelected={(val) => {setCapacidadEnGals(val);
                if(val === 'Otro') {
                  setMostrarInputOtro(true);
                } 
                else {
                  setMostrarInputOtro(false);
                }
                }} 
              data={capGals} 
              save="value"
              />            

          
          {mostrarInputOtro && (<TextInput
              style={styles.inputOtros}
              onChangeText={onChangeText}
              value={text}
              placeholder="Especifique otro tipo gals "
              placeholderTextColor="#a9a9a9"
              />
            )}
          </View>

          <View style = {styles.containerDrop}>  
            <Text style = {styles.titulo}>
              Revision
            </Text>
          <View style = {styles.containerDrop}>           
          <MultipleSelectList 
          setSelected={(val) => setSelectMulti(val)} 
          boxStyles={styles.box}
          dropdownStyles={styles.box}
          data={SelectMultilist} 
          save="value"
          label="revision"
          />
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