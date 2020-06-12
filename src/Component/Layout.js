import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ForceGraph2D, ForceGraphVR, ForceGraph3D } from 'react-force-graph';
import axios from 'axios';

import Header from './Header';
// import TrendingTopics from './TrendingTopics'
// import BarChart from './BarChart'
// import LineChart from './LineChart'
import Table from './Table.js';
import ScorePanel from './ScorePanel';
// import CircularProgress from '@material-ui/core/CircularProgress'


export class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            links: [],
            layOutForm: '2D',
            trendingTopics: []
        };
        this.graph2DRef = React.createRef();
        this.graph3DRef = React.createRef();
        this.graphVRRef = React.createRef();
    }
    componentDidMount() {

    }
    handleSearchSubmit = () => {
        axios
            .get('/new_data.json')
            .then(res => this.setState({ nodes: res.data.nodes, links: res.data.links, trendingTopics: res.data.trendingTopics }));
    };
    handleRowClick = (node) => {

        switch (this.state.layOutForm) {
            case '2D':
                this.graph2DRef.current.centerAt(node.x, node.y, 1000);
                this.graph2DRef.current.zoom(8, 2000);
                break;
            case '3D':
                // console.log('Hello from 3D');
                if (this.graph3DRef) {
                    const distance = 40;
                    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

                    this.graph3DRef.current.cameraPosition(
                        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
                        node, // lookAt ({ x, y, z })
                        3000  // ms transition duration
                    );
                }
                break;
            default:
                this.graph2DRef.current.centerAt(node.x, node.y, 1000);
                this.graph2DRef.current.zoom(8, 2000);
                break;

        }

    };

    switch2D = () => {
        // console.log('hi');
        this.setState({ ...this.state, layOutForm: '2D', });
    };
    switch3D = () => {
        // console.log('hi');
        this.setState({ ...this.state, layOutForm: '3D', });
    };
    switchVR = () => {
        // console.log('hi');
        this.setState({ ...this.state, layOutForm: 'VR', });
    };
    whichToRender() {
        switch (this.state.layOutForm) {
            case '2D':
                return <ForceGraph2D
                    graphData={{ nodes: this.state.nodes, links: this.state.links }}
                    nodeId='id'
                    nodeAutoColorBy='sentiment'
                    width={window.innerWidth * 0.8}
                    height={window.innerHeight * 0.7}
                    nodeVal={3}
                    nodeLabel='val'
                    ref={this.graph2DRef}
                />;
            case '3D':
                return <ForceGraph3D
                    graphData={{ nodes: this.state.nodes, links: this.state.links }}
                    nodeId='id'
                    nodeAutoColorBy='sentiment'
                    width={window.innerWidth * 0.8}
                    height={window.innerHeight * 0.7}
                    nodeVal={3}
                    nodeLabel='val'
                    ref={this.graph3DRef}
                // linkAutoColorBy={d => gData.nodes[d.source].id % GROUPS}
                // linkWidth={2}
                />;
            case 'VR':
                return <ForceGraphVR
                    graphData={{ nodes: this.state.nodes, links: this.state.links }}
                    nodeId='id'
                    nodeAutoColorBy='sentiment'
                    width={window.innerWidth * 0.8}
                    height={window.innerHeight * 0.7}
                    nodeVal={3}
                    nodeLabel='val'
                    ref={this.graphVRRef}

                />;
            default:
                return <ForceGraph2D
                    graphData={{ nodes: this.state.nodes, links: this.state.links }}
                    nodeId='id'
                    nodeAutoColorBy='sentiment'
                    width={window.innerWidth * 0.8}
                    height={window.innerHeight * 0.7}
                    nodeVal={3}
                    nodeLabel='val'
                    ref={this.graph2DRef}
                />;


        }
    }
    render() {
        // console.log(this.graphRef);
        return (
            <React.Fragment>
                <Header
                    switch2D={this.switch2D}
                    switch3D={this.switch3D}
                    switchVR={this.switchVR}
                    handleSearchSubmit={this.handleSearchSubmit}
                />

                <Grid container direction='row'>
                    <Grid item lg={10}>
                        <Grid item lg={12}>
                            <Paper>{this.whichToRender()}</Paper>
                        </Grid>
                        <Grid item lg={12}>
                            <Table nodes={this.state.nodes} links={this.state.links} onClick={this.handleRowClick} />
                        </Grid>
                    </Grid>
                    <Grid item lg={2}>
                        <Grid item lg={12}>
                            <ScorePanel />
                        </Grid>
                        <Grid item lg={12}>
                            <Paper>Two</Paper>
                        </Grid>
                    </Grid>

                </Grid>
            </React.Fragment>
        );
    }
}

export default Layout;
// <Table nodes={this.state.nodes} links={this.state.links} onClick={this.handleRowClick} />