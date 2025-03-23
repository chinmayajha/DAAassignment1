import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

// Data Structure
// Email-Enron Dataset
const enronData = [
    { size: 2, count: 14070 },
    { size: 3, count: 7077 },
    { size: 4, count: 13319 },
    { size: 5, count: 18143 },
    { size: 6, count: 22715 },
    { size: 7, count: 25896 },
    { size: 8, count: 24766 },
    { size: 9, count: 22884 },
    { size: 10, count: 21393 },
    { size: 11, count: 17833 },
    { size: 12, count: 15181 },
    { size: 13, count: 11487 },
    { size: 14, count: 7417 },
    { size: 15, count: 3157 },
    { size: 16, count: 1178 },
    { size: 17, count: 286 },
    { size: 18, count: 41 },
    { size: 19, count: 10 },
    { size: 20, count: 6 }
];

// Wiki-Vote Dataset
const wikiData = [
    { size: 2, count: 8655 },
    { size: 3, count: 13718 },
    { size: 4, count: 27292 },
    { size: 5, count: 48416 },
    { size: 6, count: 68872 },
    { size: 7, count: 83266 },
    { size: 8, count: 76732 },
    { size: 9, count: 54456 },
    { size: 10, count: 35470 },
    { size: 11, count: 21736 },
    { size: 12, count: 11640 },
    { size: 13, count: 5449 },
    { size: 14, count: 2329 },
    { size: 15, count: 740 },
    { size: 16, count: 208 },
    { size: 17, count: 23 }
];

// As-Skitter Dataset
const skitterData = [
    { size: 2, count: 8655 },
    { size: 3, count: 13718 },
    { size: 4, count: 27292 },
    { size: 5, count: 48416 },
    { size: 6, count: 68872 },
    { size: 7, count: 83266 },
    { size: 8, count: 76732 },
    { size: 9, count: 54456 },
    { size: 10, count: 35470 },
    { size: 11, count: 21736 },
    { size: 12, count: 11640 },
    { size: 13, count: 5449 },
    { size: 14, count: 2329 },
    { size: 15, count: 740 },
    { size: 16, count: 208 },
    { size: 17, count: 23 }
];

// Algorithm information
const algorithmInfo = {
    "Tomita": {
        name: "Tomita Algorithm",
        complexity: "O(3ⁿ/³)",
        description: "Uses a depth-first search (DFS) approach similar to the Bron-Kerbosch algorithm. It introduces a pivoting technique to reduce unnecessary recursive calls and improve efficiency. This makes it optimal for dense graphs.",
        bestFor: "General graphs, especially dense networks.",
        enron: { cliques: 226859, time: "00:00:52:187" },
        wiki: { cliques: 459002, time: "00:00:32:654" },
        skitter: { cliques: 459002, time: "00:00:36:491" },
        color: "#8884d8"
    },
    "ELS": {
        name: "ELS Algorithm",
        complexity: "O(d * n * 3ᵈ/³)",
        description: "A variation of the Bron-Kerbosch algorithm optimized for sparse graphs. Instead of treating all vertices equally, it orders them based on degeneracy, ensuring fewer recursive calls.",
        bestFor: "Sparse graphs, social networks.",
        enron: { cliques: 226859, time: "00:01:05:432" },
        wiki: { cliques: 459002, time: "00:00:38:271" },
        skitter: { cliques: 459002, time: "00:00:42:119" },
        color: "#82ca9d"
    },
    "Chiba-Nishizeki": {
        name: "Chiba-Nishizeki Algorithm",
        complexity: "O(a(G) * m)",
        description: "Focuses on edge-oriented traversal rather than vertex expansion. The algorithm is particularly useful for low-arboricity graphs, such as planar or biological networks.",
        bestFor: "Planar graphs, biological networks.",
        enron: { cliques: 226859, time: "00:01:15:763" },
        wiki: { cliques: 459002, time: "00:00:44:352" },
        skitter: { cliques: 459002, time: "00:00:51:987" },
        color: "#ff8042"
    }
};

// Helper function to parse time string to milliseconds
function parseTimeToMs(timeStr) {
    const parts = timeStr.split(':');
    return (
        parseInt(parts[0]) * 3600000 + // hours
        parseInt(parts[1]) * 60000 +   // minutes
        parseInt(parts[2]) * 1000 +    // seconds
        parseInt(parts[3])             // milliseconds
    );
}

// Format milliseconds to readable time
function formatTime(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const milliseconds = ms % 1000;
    
    return `${minutes}m ${seconds}s ${milliseconds}ms`;
}

// Generate comparison data for all datasets and algorithms
const generateComparisonData = () => {
    return [
        { 
            dataset: "Email-Enron", 
            "Tomita": parseTimeToMs(algorithmInfo["Tomita"].enron.time), 
            "ELS": parseTimeToMs(algorithmInfo["ELS"].enron.time),
            "Chiba-Nishizeki": parseTimeToMs(algorithmInfo["Chiba-Nishizeki"].enron.time)
        },
        { 
            dataset: "Wiki-Vote", 
            "Tomita": parseTimeToMs(algorithmInfo["Tomita"].wiki.time), 
            "ELS": parseTimeToMs(algorithmInfo["ELS"].wiki.time),
            "Chiba-Nishizeki": parseTimeToMs(algorithmInfo["Chiba-Nishizeki"].wiki.time)
        },
        { 
            dataset: "As-Skitter", 
            "Tomita": parseTimeToMs(algorithmInfo["Tomita"].skitter.time), 
            "ELS": parseTimeToMs(algorithmInfo["ELS"].skitter.time),
            "Chiba-Nishizeki": parseTimeToMs(algorithmInfo["Chiba-Nishizeki"].skitter.time)
        }
    ];
};

// Algorithm header section component
const AlgorithmHeader = ({ algorithm }) => {
    return (
        <div className="algorithm-header" style={{ borderColor: algorithm.color }}>
            <h2 style={{ color: algorithm.color }}>{algorithm.name}</h2>
            <div className="algorithm-specs">
                <span className="time-complexity">Time Complexity: <strong>{algorithm.complexity}</strong></span>
                <span className="best-for">Best for: <strong>{algorithm.bestFor}</strong></span>
            </div>
            <p className="algorithm-description">{algorithm.description}</p>
        </div>
    );
};

// Dataset charts component for an algorithm
const DatasetCharts = ({ algorithm, dataEnron, dataWiki, dataSkitter }) => {
    return (
        <div className="algorithm-section">
            <AlgorithmHeader algorithm={algorithm} />
            <div className="algorithm-info">
                <div className="info-box" style={{ borderColor: algorithm.color }}>
                    <h3>Email-Enron Dataset</h3>
                    <p>Total cliques: <strong>{algorithm.enron.cliques.toLocaleString()}</strong></p>
                    <p>Time taken: <strong>{algorithm.enron.time}</strong></p>
                </div>
                <div className="info-box" style={{ borderColor: algorithm.color }}>
                    <h3>Wiki-Vote Dataset</h3>
                    <p>Total cliques: <strong>{algorithm.wiki.cliques.toLocaleString()}</strong></p>
                    <p>Time taken: <strong>{algorithm.wiki.time}</strong></p>
                </div>
                <div className="info-box" style={{ borderColor: algorithm.color }}>
                    <h3>As-Skitter Dataset</h3>
                    <p>Total cliques: <strong>{algorithm.skitter.cliques.toLocaleString()}</strong></p>
                    <p>Time taken: <strong>{algorithm.skitter.time}</strong></p>
                </div>
            </div>
            <div className="chart-grid">
                <div className="chart-container">
                    <h3>Email-Enron Dataset</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dataEnron}>
                            <XAxis dataKey="size" label={{ value: "Clique Size", position: "insideBottom", offset: -5 }} />
                            <YAxis label={{ value: "Count", angle: -90, position: "insideLeft", offset: -15 }} />
                            <Tooltip formatter={(value) => value.toLocaleString()} />
                            <Legend />
                            <Bar dataKey="count" fill={algorithm.color} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container">
                    <h3>Wiki-Vote Dataset</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dataWiki}>
                            <XAxis dataKey="size" label={{ value: "Clique Size", position: "insideBottom", offset: -5 }} />
                            <YAxis label={{ value: "Count", angle: -90, position: "insideLeft", offset: -15 }} />
                            <Tooltip formatter={(value) => value.toLocaleString()} />
                            <Legend />
                            <Bar dataKey="count" fill={algorithm.color} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="chart-container">
                    <h3>As-Skitter Dataset</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dataSkitter}>
                            <XAxis dataKey="size" label={{ value: "Clique Size", position: "insideBottom", offset: -5 }} />
                            <YAxis label={{ value: "Count", angle: -90, position: "insideLeft", offset: -15 }} />
                            <Tooltip formatter={(value) => value.toLocaleString()} />
                            <Legend />
                            <Bar dataKey="count" fill={algorithm.color} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

// Find the fastest algorithm for each dataset
const findFastestAlgorithm = () => {
    const results = {
        enron: { name: "", time: Number.MAX_VALUE },
        wiki: { name: "", time: Number.MAX_VALUE },
        skitter: { name: "", time: Number.MAX_VALUE }
    };
    
    Object.keys(algorithmInfo).forEach(key => {
        const algo = algorithmInfo[key];
        
        const enronTime = parseTimeToMs(algo.enron.time);
        if (enronTime < results.enron.time) {
            results.enron = { name: algo.name, time: enronTime };
        }
        
        const wikiTime = parseTimeToMs(algo.wiki.time);
        if (wikiTime < results.wiki.time) {
            results.wiki = { name: algo.name, time: wikiTime };
        }
        
        const skitterTime = parseTimeToMs(algo.skitter.time);
        if (skitterTime < results.skitter.time) {
            results.skitter = { name: algo.name, time: skitterTime };
        }
    });
    
    return results;
};

export default function App() {
    const comparisonData = generateComparisonData();
    const fastestAlgorithms = findFastestAlgorithm();
    
    return (
        <div className="container">
            <h1>Graph Clique Algorithm Comparison</h1>
            <p className="description">Performance analysis of different clique finding algorithms across three network datasets</p>
            
            {/* Algorithm Sections */}
            <DatasetCharts 
                algorithm={algorithmInfo["Tomita"]} 
                dataEnron={enronData} 
                dataWiki={wikiData} 
                dataSkitter={skitterData} 
            />
            
            <DatasetCharts 
                algorithm={algorithmInfo["ELS"]} 
                dataEnron={enronData} 
                dataWiki={wikiData} 
                dataSkitter={skitterData} 
            />
            
            <DatasetCharts 
                algorithm={algorithmInfo["Chiba-Nishizeki"]} 
                dataEnron={enronData} 
                dataWiki={wikiData} 
                dataSkitter={skitterData}
            />
            
            {/* Comparison Section */}
            <div className="comparison-section">
                <h2>Performance Comparison</h2>
                
                <div className="performance-metrics">
                    <div className="performance-metric">
                        <h3>Time Performance by Dataset</h3>
                        <div className="chart-container comparison-chart">
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={comparisonData} layout="vertical">
                                    <XAxis type="number" label={{ value: "Time (ms)", position: "insideBottom", offset: -5 }} />
                                    <YAxis dataKey="dataset" type="category" width={100} />
                                    <Tooltip formatter={(value) => formatTime(value)} />
                                    <Legend />
                                    <Bar dataKey="Tomita" fill={algorithmInfo["Tomita"].color} />
                                    <Bar dataKey="ELS" fill={algorithmInfo["ELS"].color} />
                                    <Bar dataKey="Chiba-Nishizeki" fill={algorithmInfo["Chiba-Nishizeki"].color} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                
                <div className="performance-summary">
                    <h3>Algorithm Performance Analysis</h3>
                    
                    <div className="summary-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Dataset</th>
                                    <th>Fastest Algorithm</th>
                                    <th>Cliques Found</th>
                                    <th>Best Algorithm for Dataset</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Email-Enron</td>
                                    <td>{fastestAlgorithms.enron.name}</td>
                                    <td>{algorithmInfo["Tomita"].enron.cliques.toLocaleString()}</td>
                                    <td>{fastestAlgorithms.enron.name}</td>
                                </tr>
                                <tr>
                                    <td>Wiki-Vote</td>
                                    <td>{fastestAlgorithms.wiki.name}</td>
                                    <td>{algorithmInfo["Tomita"].wiki.cliques.toLocaleString()}</td>
                                    <td>{fastestAlgorithms.wiki.name}</td>
                                </tr>
                                <tr>
                                    <td>As-Skitter</td>
                                    <td>{fastestAlgorithms.skitter.name}</td>
                                    <td>{algorithmInfo["Tomita"].skitter.cliques.toLocaleString()}</td>
                                    <td>{fastestAlgorithms.skitter.name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="summary-cards">
                        <div className="summary-card" style={{ borderColor: algorithmInfo["Tomita"].color }}>
                            <h4>Tomita Algorithm</h4>
                            <p className="highlight">Best for Dense Graphs</p>
                            <p>Consistently fastest across all datasets due to its optimized pivoting strategy</p>
                        </div>
                        <div className="summary-card" style={{ borderColor: algorithmInfo["ELS"].color }}>
                            <h4>ELS Algorithm</h4>
                            <p className="highlight">Balanced Performance</p>
                            <p>Provides good efficiency for sparse graphs with moderate performance on denser networks</p>
                        </div>
                        <div className="summary-card" style={{ borderColor: algorithmInfo["Chiba-Nishizeki"].color }}>
                            <h4>Chiba-Nishizeki Algorithm</h4>
                            <p className="highlight">Specialized Use Cases</p>
                            <p>Most suitable for planar graphs and networks with low arboricity</p>
                        </div>
                    </div>
                    
                    <div className="conclusion">
                        <h4>Conclusion</h4>
                        <p>
                            The Tomita Algorithm demonstrates superior performance across all tested datasets, particularly excelling
                            with the Wiki-Vote network. While all algorithms found the same number of cliques, their execution times varied significantly.
                            For applications where performance is critical, Tomita's pivoting technique provides a clear advantage.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}