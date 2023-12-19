import RNFS from 'react-native-fs';
import {loadJsonFiles} from './../../../App'


const imprimir = async (fileName:string) => {
    const path = RNFS.DocumentDirectoryPath + `/${fileName}`;

    try {
      await RNFS.unlink(path); 
      //console.log(`Archivo ${fileName} eliminado`);
      // Actualizar la lista de archivos después de eliminar uno
      loadJsonFiles();
    } catch (error) {
      console.error(`Error al eliminar el archivo ${fileName}:`, error);
    }
  }
export default imprimir;