import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import InputText from '../elements/inputText';

 const REBRP61COMP = ({route}) =>{
  const { informacionObtenida } = route.params;

    ////////////////////////////////primer formulario

    const [dataREBP06Num02, setDataREBP06Num02] = useState<{
      RecuadroDos: {
        MarcaEnLosEnvases: any;
        RequerimientosDeCliente: any;
        crop:any;
        loteNrR2:any;
        envaseNr:any;
        diaProducc:any;
        containerNr:any;
        contramuestras:any;
      };
    }[]>([]);
  
    const agregarJson01 = () => {
      const RecuadroUnoAgregar = {
        RecuadroUno: {
          TipoDeEnvio: Envio,
          Producto: producto,
          LoteNr: loteNr,
          NrdeEnvases: nrEnvases,
          PatenteCamion: patenteCamion,
          Cliente: cliente,
          PesoNeto: pesoNeto,
          PesoBruto: pesoBruto,
          Tara: tara,
          TipodeEnvases: TipoDeEnvase,
          CapacidadEnGals: capacidadEnGals,
          Revision: revision,
        },
      };
  
      console.log(RecuadroUnoAgregar)
    };

  
    useEffect(() => {
      // Esta función se ejecutará después de que dataREBP06 se haya actualizado
      console.log();
      
    }, []);

    const [loteNr, setLoteNr] = React.useState('');
    const [nrEnvases, setNrEnvases] = React.useState('');
    const [patenteCamion, setPatenteCamion] = React.useState('');
    const [cliente, setCliente] = React.useState('');
    const [pesoNeto, setPesoNeto] = React.useState('');
    const [pesoBruto, setPesoBruto] = React.useState('');
    const [tara, setTara] = React.useState('');
    
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

    const [mostrarInputOtro, setMostrarInputOtro] = React.useState(false);
    const [Envio, setEnvio] = React.useState("");
    const TipoDeEnvio = [
        {key:'1', value:'Retiro Planta', },
        {key:'2', value:'Embarque'},
        {key:'3', value:'Otro'},
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
  
    const [revision, setRevision] = React.useState([]);
    const SelectMultilist = [
        {key:'1', value:'REVISION PESO ETIQUETA DE ENVASADO', },
        {key:'2', value:'REVISION FECHA ETIQUETA DE ENVASADO'},
    ]
  
    ///////////////////////////////////final formulario


    //////////////////////////////////formulario Dos

    
    const agregarJson02 = () => {
      const RecuadroDosAgregar = {
        RecuadroDos: {
          MarcaEnLosEnvases: marcaEnLosEnvases,
          RequerimientosDeCliente: RequerimientosDeCliente,
          crop:crop,
          loteNrR2:loteNrR2,
          envaseNr:envaseNr,
          diaProducc:diaProducc,
          containerNr:containerNr,
          contramuestras:opciones,
        },
      };
  
      console.log(RecuadroDosAgregar)
    };

    const [crop, setCrop] = React.useState('');
    const [loteNrR2, setLoteNrR2] = React.useState('');
    const [envaseNr, setEnvaseNr] = React.useState('');
    const [diaProducc, setDiaProducc] = React.useState('');
    const [containerNr, setContainerNr] = React.useState('');
    

    const [opciones, setOpciones] = React.useState("");
    const opcionesList = [
        {key:'1', value:'Retiro de Muestras', },
        {key:'2', value:'Análisis de muestras'},
    ]
  
  
    const [marcaEnLosEnvases, setMarcaEnLosEnvases] = React.useState("");
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


        //////////////////////////////////formulario Dos Final

      //////////////////////////////////formulario tres     

      const agregarJson03 = () => {
        const RecuadroTresAgregar = {
          RecuadroDos: {
            InspeccionCamion: camion,
            InspeccionContendedor: inspeccionContendedor,
            ObservacionesR3:observacionesR3,
          },
        };
    
        console.log(RecuadroTresAgregar)
      };
        
    const [camion, setCamion] = React.useState("");
    const [inspeccionContendedor, setInspeccionContendedor] = React.useState("");
    const [observacionesR3, setObservacionesR3] = React.useState('');

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



  return (
    <ScrollView> 
      <View style = {styles.fondo}>
        <View style= {styles.firstContainer}>
                  <View style = {styles.containerDrop}>           
                    <Text style = {styles.titulo}>Tipo de Envio</Text>

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
                      onChangeText={setEnvio}
                      value={Envio}
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
                      onChangeText={setProducto}
                      value={producto}
                      placeholder="Especifique otro producto "
                      placeholderTextColor="#a9a9a9"
                      />
                  )}
                  </View>


                  <View style={styles.body}>
                      <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Lote Nr.'}</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={setLoteNr}
                        value={loteNr}
                        placeholder={'Escribe aqui...'}
                        placeholderTextColor="#a9a9a9"
                      />
                  </View> 

                  <View style={styles.body}>
                      <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Nr. de Envases'}</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={setNrEnvases}
                        value={nrEnvases}
                        placeholder={'Escribe aqui...'}
                        placeholderTextColor="#a9a9a9"
                      />
                  </View> 

                  <View style={styles.body}>
                      <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Patente Camión'}</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={setPatenteCamion}
                        value={patenteCamion}
                        placeholder={'Escribe aqui...'}
                        placeholderTextColor="#a9a9a9"
                      />
                  </View> 
                  
                  <View style={styles.body}>
                      <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Cliente'}</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={setCliente}
                        value={cliente}
                        placeholder={'Escribe aqui...'}
                        placeholderTextColor="#a9a9a9"
                      />
                  </View> 

                  <View style={styles.body}>
                      <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Peso Neto'}</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={setPesoNeto}
                        value={pesoNeto}
                        placeholder={'Escribe aqui...'}
                        placeholderTextColor="#a9a9a9"
                      />
                  </View> 
                  
                  <View style={styles.body}>
                      <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Peso Bruto'}</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={setPesoBruto}
                        value={pesoBruto}
                        placeholder={'Escribe aqui...'}
                        placeholderTextColor="#a9a9a9"
                      />
                  </View> 

                  <View style={styles.body}>
                      <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Tara'}</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={setTara}
                        value={tara}
                        placeholder={'Escribe aqui...'}
                        placeholderTextColor="#a9a9a9"
                      />
                  </View> 

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
                        onChangeText={setCapacidadEnGals}
                        value={capacidadEnGals}
                        placeholder="Especifique otro tipo gals "
                        placeholderTextColor="#a9a9a9"
                        />
                      )}
                  </View>

                  <View style = {styles.containerDrop}>  
                    <Text style = {styles.titulo}>
                      Revision
                    </Text>
        
                    <MultipleSelectList 
                      setSelected={(val) => setRevision(val)} 
                      boxStyles={styles.box}
                      dropdownStyles={styles.box}
                      data={SelectMultilist} 
                      save="value"
                      label="revision"
                    />

                  </View>
 
                  <View>
                    <Button  title="Guardar Primer recuadro" onPress={agregarJson01} />
                  </View>
                 
              </View>


{/* -----------------------------Formulario 1 fin----------------------------------------- */}
{/* -----------------------------Formulario 1 fin----------------------------------------- */}
{/* -----------------------------Formulario 1 fin----------------------------------------- */}
{/* -----------------------------Formulario 1 fin----------------------------------------- */}


{/* -----------------------------Formulario 2----------------------------------------- */}
{/* -----------------------------Formulario 2----------------------------------------- */}
{/* -----------------------------Formulario 2----------------------------------------- */}

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
            setSelected={(val) => setMarcaEnLosEnvases(val)} 
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


          <View style={styles.body}>
            <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Crop.'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCrop}
              value={crop}
              placeholder={'Escribe aqui...'}
              placeholderTextColor="#a9a9a9"
            />
          </View> 
          
          <View style={styles.body}>
            <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Lote Nr.'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setLoteNrR2}
              value={loteNrR2}
              placeholder={'Escribe aqui...'}
              placeholderTextColor="#a9a9a9"
            />
          </View> 

          <View style={styles.body}>
            <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Envase Nr.'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEnvaseNr}
              value={envaseNr}
              placeholder={'Escribe aqui...'}
              placeholderTextColor="#a9a9a9"
            />
          </View> 

          <View style={styles.body}>
            <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Dia Producc'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDiaProducc}
              value={cliente}
              placeholder={'Escribe aqui...'}
              placeholderTextColor="#a9a9a9"
            />
          </View> 
          
          <View style={styles.body}>
            <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Container Nr.'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setContainerNr}
              value={containerNr}
              placeholder={'Escribe aqui...'}
              placeholderTextColor="#a9a9a9"
            />
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
          <View>
            <Button  title="Guardar Segundo recuadro" onPress={agregarJson02} />
          </View>

      </View>

{/* -----------------------------Formulario 2 fin----------------------------------------- */}
{/* -----------------------------Formulario 2 fin----------------------------------------- */}
{/* -----------------------------Formulario 2 fin----------------------------------------- */}
{/* -----------------------------Formulario 2 fin----------------------------------------- */}


{/* -----------------------------Formulario 3----------------------------------------- */}
{/* -----------------------------Formulario 3----------------------------------------- */}
{/* -----------------------------Formulario 3----------------------------------------- */}

<View style= {styles.firstContainer}>
        <View>
          <Text style = {[styles.titulo,{fontSize:17}]}>Llenar solo en el Embarque ( Durante el mismo)</Text>
        </View>
        <View style = {styles.containerDrop}> 
            <Text style = {styles.titulo}>
              Inspección Camión
            </Text>
            <MultipleSelectList 
            setSelected={(e) => setCamion(e)} 
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
            setSelected={(e) => setInspeccionContendedor(e)} 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            data={inspConte} 
            save="value"
            label="Categories"
            />
        </View>


        <View style={styles.body}>
            <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Observaciones'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setObservacionesR3}
              value={observacionesR3}
              placeholder={'Escribe aqui...'}
              placeholderTextColor="#a9a9a9"
            />
        </View> 

        <View>
          <Button  title="Guardar Tercer recuadro" onPress={agregarJson03} />
        </View>
      </View>

{/* -----------------------------Formulario 3 fin----------------------------------------- */}
{/* -----------------------------Formulario 3 fin----------------------------------------- */}
{/* -----------------------------Formulario 3 fin----------------------------------------- */}
{/* -----------------------------Formulario 3 fin----------------------------------------- */}


{/* 

            <View >
              <Cuatro></Cuatro>
            </View>
         */}



        <View>
            <Button  title="Guardar" onPress={agregarJson01} />
        </View>         
      </View>
    </ScrollView> 
  )}


export default REBRP61COMP;

  const styles = StyleSheet.create({
    fondo:{
      backgroundColor:'#fcfdf8',
    },
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
    },


    input: {
      width: "90%",
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'white',
      borderRadius:10,
    },
      styText:{
        width: "90%",
        paddingRight:4,
        fontSize: 15,
        paddingLeft: 15,
        fontWeight: 'bold', 
  
      },
  
      body:{
        flexDirection: 'column',
      }
  });