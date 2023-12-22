import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Modal, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';


const REBRP61COMP = ({route}) =>{
  const { objetoEncontrado } = route.params;
  const navigation = useNavigation();
  const [ModalOpcionesValorCarga, setModalOpcionesCarga] = useState(false);

  
  useEffect(() => { 
    
  }, []);
 
 
  const AñadirAjson = async (formulario: number, editedData: any) => {
    console.log(editedData, ' este es editedData ');
    try {
      // Lee el contenido actual del archivo JSON 
      const currentContent = await RNFS.readFile(objetoEncontrado.path);
   
      // Analiza el contenido para convertirlo en un objeto JavaScript
      const currentData = JSON.parse(currentContent);
  
      // Agrega nueva información al objeto
      if (formulario === 1) {
        currentData.rebp06R1 = editedData.RecuadroUno;
      } else if (formulario === 2) {
        currentData.rebp06R2 = editedData.RecuadroDos;
      } else if (formulario === 3) {
        currentData.rebp06R3 = editedData.RecuadroTres;
      } else if (formulario === 4) {
        currentData.rebp06R4 = editedData.RecuadroCuatro; 
      }
  
      currentData.rebp06 = 'true';
  
      // Convierte el objeto actualizado en una cadena JSON
      const updatedContent = JSON.stringify(currentData);
  
      // Escribe la cadena JSON actualizada en el archivo
      await RNFS.writeFile(objetoEncontrado.path, updatedContent, 'utf8');
  
      // Vuelve a cargar los archivos JSONs 
      ModalOpcionesCargaVisilidad(500,false);
    } catch (error) {
      console.error(error);
    }
  };
  

  const ModalOpcionesCargaVisilidad = (tiempo: number,salir:boolean) => {
    setModalOpcionesCarga(true);
  
    setTimeout(() => {
      setModalOpcionesCarga((prevValue) => !prevValue);
      if(salir){
        navigation.navigate('Formularios')
      }
    }, tiempo);
  };
    ////////////////////////////////primer formulario

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
      AñadirAjson(1,RecuadroUnoAgregar)
      //console.log(RecuadroUnoAgregar)
    };



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
       AñadirAjson(2,RecuadroDosAgregar)
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
          RecuadroTres: {
            InspeccionCamion: camion,
            InspeccionContendedor: inspeccionContendedor,
            ObservacionesR3:observacionesR3,
          },
        };
        AñadirAjson(3,RecuadroTresAgregar)
        console.log(RecuadroTresAgregar)
      };
        
    const [camion, setCamion] = React.useState("");
    const [inspeccionContendedor, setInspeccionContendedor] = React.useState("");
    const [observacionesR3, setObservacionesR3] = React.useState('');


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

///////////////fin formulario 3

///////////////////formulario 4

    const agregarJson04 = () => {
      const RecuadroCuatroAgregar = {
        RecuadroCuatro: {
          dataLimpieza: dataLimpieza,
          pallets: pallets,
          fumigacionMaterial:fumigacionMaterial,
          estadoEnvases: estadoEnvases,
          cheks: cheks,
          observacionesR4:observacionesR4,
          cargaAsociadaGD: cargaAsociadaGD,
          observacionesOSAP: observacionesOSAP,
          muestraInteriorContenedor:muestraInteriorContenedor,
          despachoEnPallet: despachoEnPallet,
          selladoDeNaviera: selladoDeNaviera,
          estadoDelTiempo:estadoDelTiempo,
          
        },
      };
        AñadirAjson(4,RecuadroCuatroAgregar)
        console.log(RecuadroCuatroAgregar)
    };

    const [dataLimpieza, setDataLimpieza] = React.useState([]);
    const [pallets, setPallets] = React.useState([]);
    const [fumigacionMaterial, setFumigacionMaterial] = React.useState([]);
    const [estadoEnvases, setEstadoEnvases] = React.useState([]);
    const [cheks,setChecks] = React.useState([]);

    const [observacionesR4,setObservacionesR4] = React.useState('')
    const [cargaAsociadaGD,setCargaAsociadaGD] = React.useState('')
    const [observacionesOSAP,setObservacionesOSAP] = React.useState('')
    const [muestraInteriorContenedor,setMuestraInteriorContenedor] = React.useState('')
    const [despachoEnPallet,setDespachoEnPallet] = React.useState('')
    const [selladoDeNaviera,setSelladoDeNaviera] = React.useState('')
    const [estadoDelTiempo,setEstadoDelTiempo] = React.useState('')

    const Limpieza = [
      {key:'1', value:'Tapas', },
      {key:'2', value:'Envases'},
      {key:'3', value:'Pallets'},
      ]

    const FumigacionMaterial = [
      {key:'1', value:'Maderas'},
      {key:'2', value:'Zunchos'},
      {key:'3',value:'Pallets'}
      ]

    const EstadoEnvases = [
      {key:'1',value:'Abolladura Si'},
      {key:'2',value:'Abolladura No'},
      {key:'3',value:'Nr. Envases'}
      ]

    const Pallets = [
      {key:'1', value:'Rotura si'},
      {key:'2', value:'Rotura no'},
      {key:'3', value:'Cambio'},
      ]

    const Checks = [
      {key:'1', value:'Totes con sellos descriptivos entodo los zunchos'},
      {key:'2', value:'Verificacion de perdidas de jugo internas'},
      {key:'3', value:'Revision sellos conforme registros envadasado (jugos)'},
      {key:'4', value:'Instalacion sellos conforme - pastas y pulpas'},
      {key:'5', value:'Cambio de sellos'},
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
                    <Button  title="Guardar Primer recuadro" onPress={() => agregarJson01()} />
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
            <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Observaciones Respecto a Camion'}</Text>
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

{/* -----------------------------Formulario 4----------------------------------------- */}
{/* -----------------------------Formulario 4----------------------------------------- */}
{/* -----------------------------Formulario 4----------------------------------------- */}
{/* -----------------------------Formulario 4----------------------------------------- */}


<View style= {styles.firstContainer}>

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
            setSelected={(e) => setPallets(e)} 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            data={Pallets} 
            save="value"
            label="Pallets"
            />
          </View>
          <View style = {styles.containerDrop}> 
            <Text style = {styles.titulo}>
              Estado Envases
            </Text>
            <MultipleSelectList 
            setSelected={(e) => setEstadoEnvases(e)} 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            data={EstadoEnvases} 
            save="value"
            label="Estado Envases"
            />

          </View>
          <View style = {styles.containerDrop}> 
            <Text style = {styles.titulo}>
              Fumigación Material
            </Text>
            <MultipleSelectList 
            setSelected={(e) => setFumigacionMaterial(e)} 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            data={FumigacionMaterial} 
            save="value"
            label="Fumigacion_Material"
            />
          </View>

          <View style = {styles.containerDrop}> 
            <Text style = {styles.titulo}>
              Checks en base a pallets
            </Text>
            <MultipleSelectList 
            setSelected={(e) => setChecks(e)} 
            boxStyles={styles.box}
            dropdownStyles={styles.box}
            data={Checks} 
            save="value"
            label="Fumigacion_Material"
            />
          </View>


{/* const places =[
  {elem:'Observaciones', place:''},{elem:'Carga Asociada GD',place:'336883'},{elem:'Observaciones OSAP',place:'2111416702'},{elem:'Muestras en interior de Contenedor',place:'No'},{elem:'Despacho en Pallet',place:'Bajo y Sellos amarillos'},{elem:'Sellado de Naviera',place:''},{elem:'Estado del tiempo',place:'Nublado'},
] */}


        <View style={styles.body}>
            <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Observaciones respecto a estado de envases'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setObservacionesR4}
              value={observacionesR4}
              placeholder={'Escribe aqui...'}
              placeholderTextColor="#a9a9a9"
            />
        </View> 
        
        <View style={styles.body}>
            <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Carga asociada GD'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCargaAsociadaGD}
              value={cargaAsociadaGD}
              placeholder={'Escribe aqui...'}
              placeholderTextColor="#a9a9a9"
            />
        </View> 

        <View style={styles.body}>
            <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Observaciones OSAP'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setObservacionesOSAP}
              value={observacionesOSAP}
              placeholder={'Escribe aqui...'}
              placeholderTextColor="#a9a9a9"
            />
        </View> 

        <View style={styles.body}>
            <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Muestra al interior del contenedor'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setMuestraInteriorContenedor}
              value={muestraInteriorContenedor}
              placeholder={'Escribe aqui...'}
              placeholderTextColor="#a9a9a9"
            />
        </View> 

        <View style={styles.body}>
            <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Despacho en pallet'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDespachoEnPallet}
              value={despachoEnPallet}
              placeholder={'Escribe aqui...'}
              placeholderTextColor="#a9a9a9"
            />
        </View> 

        <View style={styles.body}>
            <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Sellado de naviera'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setSelladoDeNaviera}
              value={selladoDeNaviera}
              placeholder={'Escribe aqui...'}
              placeholderTextColor="#a9a9a9"
            />
        </View> 


        <View style={styles.body}>
            <Text style={[styles.styText, { width: "90%", textAlign: 'left' }]}>{'Estado del tiempo'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEstadoDelTiempo}
              value={estadoDelTiempo}
              placeholder={'Escribe aqui...'}
              placeholderTextColor="#a9a9a9"
            />
        </View> 

        <View>
          <Button  title="Guardar Cuarto recuadro" onPress={agregarJson04} />
        </View>
      </View>


{/* -----------------------------Formulario 4 fin----------------------------------------- */}
{/* -----------------------------Formulario 4 fin----------------------------------------- */}
{/* -----------------------------Formulario 4 fin----------------------------------------- */}
{/* -----------------------------Formulario 4 fin----------------------------------------- */}

        <View>
            <Button  title="Guardar y salir" onPress={() => ModalOpcionesCargaVisilidad(500,true)} />
        </View>         
      </View>

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
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      },
  });