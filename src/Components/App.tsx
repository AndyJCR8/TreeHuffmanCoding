import { ChangeEvent, MouseEvent, useState } from 'react'
import reactLogo from '../assets/react.svg'
import '../Sass/App.scss';

interface EventTarget {
  files?: FileList
}

function App() {
  
  const fileLoaded = (e: ChangeEvent<HTMLInputElement>) => {
    
    const fileList = e.target.files;
    //console.log(fileList);
    if(fileList !== null)
    {
      for(let file of fileList) {
        const reader = new FileReader();
        reader.addEventListener('load', e => {
          //console.log(e.target?.result);
          document.getElementById("content")!.innerHTML = e!.target!.result!.toString();
        });
        reader.readAsText(file);
      }
    }
  };
  
  return (
    <div className="App">
      <div className='title'>
        <h2>Ingreso de archivo de texto</h2>
      </div>
      <div className='input-container'>
        <label htmlFor='file-selector'>Seleccionar archivo</label>
        <input onClick={(e) => { const target = e.target as HTMLInputElement; target.value = ""; }} onChange={fileLoaded} id='file-selector' type="file" accept='text/plain'/>
      </div>
      <div className='content-container'>
        <div className='textContainer'>
          <div className='content-text'>
            <p>Contenido del archivo seleccionado</p>
          </div>
          <textarea readOnly id='content' className='content' rows={12}></textarea>
        </div>
        <div className='textContainer'>
          <div className='content-text'>
            <p>Resultados de codificación</p>
          </div>
          <textarea readOnly id='results' className='content' rows={12}></textarea>
        </div>
      </div>
      <footer>
        Andy de Jesús Cáceres Ramírez   [202008032]
        Ammi Getzaida González Enriquez [202008008]
      </footer>
    </div>
  )
}

export default App
