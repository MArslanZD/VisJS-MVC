$(document).ready(function () {

    var LENGTH_MAIN = 350,
        LENGTH_SERVER = 150,
        LENGTH_SUB = 50,
        WIDTH_SCALE = 2,
        GREEN = 'green',
        RED = '#C5000B',
        ORANGE = 'orange',
        //GRAY = '#666666',
        GRAY = 'gray',
        BLACK = '#2B1B17';

    var nodes = new vis.DataSet([
        { id: 1, label: 'VisJs', group: 'server', value: 10 },
        { id: 2, label: 'Color', color: { background: '#2B7CE9' }, value: 10, shape: 'dot' },
        { id: 3, label: 'Popup', group: 'switch', value: 10 }
    ]);

    var edges = new vis.DataSet([
        { id: 1, from: 1, to: 2, length: LENGTH_MAIN, width: WIDTH_SCALE * 6, label: 'Green Color Change' },
        { id: 2, from: 1, to: 3, length: LENGTH_MAIN, width: WIDTH_SCALE * 4, label: 'Show Popup' }
    ]);

    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        nodes: {
            scaling: {
                min: 16,
                max: 32
            },
        },
        edges: {
            color: GRAY,
            smooth: false
        },
        physics: {
            barnesHut: { gravitationalConstant: -30000 },
            stabilization: { iterations: 2500 }
        },
        groups: {
            'switch': {
                shape: 'triangle',
                color: '#FF9900' // orange
            },
            desktop: {
                shape: 'dot',
                color: "#2B7CE9" // blue
            },
            mobile: {
                shape: 'dot',
                color: "#5A1E5C" // purple
            },
            server: {
                shape: 'square',
                color: "#C5000B" // red
            },
            internet: {
                shape: 'square',
                color: "#109618" // green
            }
        }
    };

    var container = document.getElementById('visualization');
    var network = new vis.Network(container, data, options);
    var isOnFlag = false;
    network.on("click", function (params) {

        debugger;
        var nodeID = params['nodes']['0'];
        var edgeID = params['edges']['0'];
        if (nodeID == 3) {
            alert("Alert Popup is Generated...");
            var clickedNode = nodes.get(nodeID);
            clickedNode.color = {
                border: '#000000',
                background: '#000000',
                highlight: {
                    border: '#2B7CE9',
                    background: '#D2E5FF'
                }
            }
            nodes.update(clickedNode);
        }
        else if (nodeID == 2) {
            debugger;

            var clickedNode = nodes.get(nodeID);
            if (isOnFlag) {
                clickedNode.color = {
                    highlight: {
                        border: 'black',
                        background: 'green'
                    }
                }
                isOnFlag = false;
            }
            else {
                clickedNode.color = {
                    highlight: {
                        border: 'black',
                        background: 'red'
                    }
                }
                isOnFlag = true;
            }
            nodes.update(clickedNode);
        }
        // counter measures for Node color not reset to default.  
        else if (edgeID == 1) {
            nodes.update({ id: 2, color: "green" });
        }
        else if (edgeID == 2) {
            nodes.update({ id: 2, color: "green" });
        }

    });

});