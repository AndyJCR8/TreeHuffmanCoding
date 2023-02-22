import React from 'react'
import Tree from 'react-d3-tree'
import "../Sass/HuffTree.scss"
import { RawNodeDatum } from 'react-d3-tree/lib/types/types/common'



export default function HuffTree({data}: {data: RawNodeDatum | RawNodeDatum[]}) {
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
