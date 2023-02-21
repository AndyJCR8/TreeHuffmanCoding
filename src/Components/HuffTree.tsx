import React from 'react'
import Tree from 'react-d3-tree'
import "../Sass/HuffTree.scss"
const data = [
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


export default function HuffTree() {
  return (
    <div className="TreeContainer">
      <p className='title'>Árbol de codificación - Huffman</p>
      <Tree
      orientation='vertical'
      data={data}
      rootNodeClassName='node-root'
      branchNodeClassName='node-branch'
      leafNodeClassName='node-leaf'
      pathClassFunc={() => 'node-link'}
      svgClassName='svg-styles'/>
    </div>
  )
}
