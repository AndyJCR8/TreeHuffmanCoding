import { ChangeEvent, MouseEvent, useState, useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import '../Sass/App.scss';
import HuffTree from './HuffTree';
import { RawNodeDatum } from 'react-d3-tree/lib/types/types/common';

interface huffFrecuency {
  char: string,
  frequency: number
}

interface Node {
  left?: Node,
  right?: Node,
  char?: string,
  frequency: number
}

function getFrequencies(fileData: string): huffFrecuency[] {

  let data = fileData.split("");
  let fr: Record<string, number> = {};
  let res: huffFrecuency[] = [];
  
  //PRIMER CICLO PARA CONTAR LOS CARACTERES REPETIDOS
  for(let val of data) {
    if(val.charCodeAt(0) > 31)
      fr[val] = (fr[val] || 0) + 1;
    /*
      fr[val]

      fr['a'] = 1
      ==
      fr = {
        'a': 1,
        'c': 2,
        '8': 2,
        'I': 2
      }
      fr[I] // 2
    */
  }
  //SEGUNDO CICLO PARA ADJUNTAR EN UN ARRAY TODAS LAS FRECUENCIAS
  for(let key of Object.keys(fr)) {
    res.push({
      char: key,         //'8'
      frequency: fr[key] // 2
    });
  }

  return res.sort((x, y) => x.frequency - y.frequency == 0 ? x.char < y.char ? -1 : 1 : x.frequency - y.frequency);
}

function getTree(frequencies: huffFrecuency[]): Node | undefined {
  //LISTA DE NODOS
  const leafNodes: Node[] = frequencies.map((freq) => ({
    char: freq.char,
    frequency: freq.frequency,
  }));
  console.log([...leafNodes]);
  while (leafNodes.length > 1) {
    //ORDENANDO LOS NODOS POR FRECUENCIA
    leafNodes.sort((x, y) => x.frequency - y.frequency);

    const leftNode = leafNodes.shift()!;
    const rightNode = leafNodes.shift()!;

    //NUEVO NODO CON LA SUMA DE LAS DOS PRIMERAS FRECUENCIAS
    const parentNode: Node = {
      left: leftNode,
      right: rightNode,
      frequency: leftNode.frequency + rightNode.frequency,
    };
    console.log([...leafNodes]);
    //AGREGANDO EL NUEVO NODO A LA LISTA DE HOJAS
    leafNodes.push(parentNode);
  }
  console.log(leafNodes);
  //DEVOLVIENDO EL ÚNICO NODO DE LA LISTA
  return leafNodes[0];
}

function App() {

  const [data, setData] = useState<RawNodeDatum | RawNodeDatum[]>([]);
  const [frequencies, setFrequencies] = useState<huffFrecuency[]>([]);
  
  const fileLoaded = (e: ChangeEvent<HTMLInputElement>) => {
    
    const fileList = e.target.files;
    //console.log(fileList);
    if(fileList !== null)
    {
      let fileData: string = "";

      for(let file of fileList) {
        const reader = new FileReader();
        reader.addEventListener('load', e => {
          //console.log(e.target?.result);
          fileData = e!.target!.result!.toString();
          document.getElementById("content")!.innerHTML = fileData;
          setFrequencies(getFrequencies(fileData));
          
        });
        reader.readAsText(file);
      }
    }
  };

  useEffect(() => {
    console.log(getTree(frequencies));

  }, [frequencies]);

  useEffect(() => {
    
    setData([
        {
          name: 'a',
          children: [
            {
              name: 'b',
              children: [
                {
                  name: 'd'
                }
              ]
            },
            {
              name: 'c'
            }
          ]
        }
      ]
    )
  }, []);
  
  
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
      <HuffTree data={data}/>
      <footer>
        Ammi Getzaida González Enriquez [202008008]<br/>
        Andy de Jesús Cáceres Ramírez   [202008032]
      </footer>
    </div>
  )
}

export default App
