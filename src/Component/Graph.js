import React, { Component } from 'react'
import { ForceGraphVR, ForceGraph2D, ForceGraph3D } from 'react-force-graph';
export default class Graph extends Component {
    render() {
        console.log(this.props.myGraph)
        return (
            // <div style={
            //     {
            //         border: '2px solid black'
            //     }
            // }>

            <ForceGraph3D
                graphData={this.props.myGraph}
                // backgroundColor='dark'
                nodeId='id'
                // nodeAutoColorBy='sentiment'
                // width={this.props.width}
                // height={this.props.height}
                nodeVal={3}
                nodeLabel='val'
            // ref={this.divRef}
            />
            // </div >
        )
    }
}
