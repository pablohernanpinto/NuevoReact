import React, { useState } from 'react';
import { StyleSheet, Text, View,TextInput } from 'react-native';
import InputText from '../elements/inputText';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import CheckBox from '@react-native-community/checkbox';

export default function Cuatro(){

  const [dataLimpieza, setDataLimpieza] = React.useState("");
  const [dataRotura, setDataRotura] = React.useState("");
  const [dataEstadoE,setDataEstadoE] = React.useState("");
  const [text, onChangeText] = React.useState('');
  const [isSelected, setSelection] = useState(false);

  const places =[
  {elem:'Observaciones', place:''},{elem:'Carga Asociada GD',place:'336883'},{elem:'Observaciones OSAP',place:'2111416702'},{elem:'Muestras en interior de Contenedor',place:'No'},{elem:'Despacho en Pallet',place:'Bajo y Sellos amarillos'},{elem:'Sellado de Naviera',place:''},{elem:'Estado del tiempo',place:'Nublado'},
  ]

const Limpieza = [{key:'1', value:'Tapas', },{key:'2', value:'Envases'},{key:'3', value:'Pallets'},]
const Rotura = [{key:'1', value:'Maderas', },{key:'2', value:'Zunchos'},{key:'3',value:'Pallets'}]
const EstadoE = [{key:'1',value:'Abolladura Si'},{key:'2',value:'Abolladura No'},{key:'3',value:'Nr. Envases'}]
return(
      <View style= {styles.firstContainer}>
        <View>
          <Text style = {[styles.titulo,{fontSize:17}]}>Llenar solo en el Embarque ( Durante el mismo)</Text>
        </View>
        <View style = {styles.containerDrop}> 
            <Text style = {styles.titulo}>
              Limpieza Envases
            </Text>
            <MultipleSelectList 
            setSelected={(e) => setDataLimpieza(e)} 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            data={Limpieza} 
            save="value"
            label="Limpieza_Envases"
            />
          </View> 
          <View style = {styles.containerDrop}> 
            <Text style = {styles.titulo}>
              Pallets
            </Text>
            <MultipleSelectList 
            setSelected={(e) => setDataRotura(e)} 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            data={Rotura} 
            save="value"
            label="Pallets"
            />
          </View>
          <View style = {styles.containerDrop}> 
            <Text style = {styles.titulo}>
              Estado Envases
            </Text>
            <MultipleSelectList 
            setSelected={(e) => setDataRotura(e)} 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            data={EstadoE} 
            save="value"
            label="Estado Envases"
            />

          </View>
          <View style = {styles.containerDrop}> 
            <Text style = {styles.titulo}>
              Fumigación Material
            </Text>
            <MultipleSelectList 
            setSelected={(e) => setDataRotura(e)} 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            data={Rotura} 
            save="value"
            label="Fumigacion_Material"
            />
          </View>
          <View style = {{flexDirection: 'column'}}>
            {places.map((datos, index) => (
                <InputText key={index} nombre={datos.elem} ancho ={"90%"}  place={datos.place}/>
                ))}
          </View>
          <View>
          <Text style={styles.titulo}>Totes con sellos descriptivos en todos los zunchos</Text>
          <Text>AQUI VA CHECKBOX</Text>
          </View>
          <View>
            <Text style={styles.titulo}>Verificacion de perdidas de jugo internas</Text>
            <Text>AQUI VA CHECKBOX</Text>
          </View>
          <View>
            <Text style={styles.titulo}>Registros en base a Verificacion</Text>

            <TextInput
                style={styles.inputOtros}
                onChangeText={onChangeText}
                value={text}
                placeholder="Escriba aqui.."
                />
                <TextInput
                style={styles.inputOtros}
                onChangeText={onChangeText}
                value={text}
                placeholder="Escriba aqui.."
                />
        </View>
        <View>
        <Text style={styles.titulo}>Cambio Sellos</Text>
           <Text>AQUI VA CHECKBOX</Text>
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
  check:{

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
    borderColor:'black',
  },
  selectList:{
    backgroundColor:'white',
    width: '95%',
  }
});