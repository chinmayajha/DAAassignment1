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

// Algorithm results (simulated data)
const algorithmResults = {
    "Algorithm 1": {
        name: "Maximal Clique Enumeration",
        enron: { cliques: 226859, time: "00:01:17:271" },
        wiki: { cliques: 459002, time: "00:00:40:228" },
        skitter: { cliques: 459002, time: "00:00:40:228" }
    },
    "Algorithm 2": {
        name: "Bron-Kerbosch Algorithm",
        enron: { cliques: 230123, time: "00:01:25:412" },
        wiki: { cliques: 465781, time: "00:00:43:109" },
        skitter: { cliques: 462345, time: "00:00:45:672" }
    },
    "Algorithm 3": {
        name: "Tomita Algorithm",
        enron: { cliques: 226859, time: "00:00:52:187" },
        wiki: { cliques: 459002, time: "00:00:32:654" },
        skitter: { cliques: 459002, time: "00:00:36:491" }
    }
};

// Comparison data for the bottom row
const generateComparisonData = () => {
    // Generate comparison data for time performance
    return [
        { 
            dataset: "Email-Enron", 
            "Algorithm 1": parseTimeToMs(algorithmResults["Algorithm 1"].enron.time), 
            "Algorithm 2": parseTimeToMs(algorithmResults["Algorithm 2"].enron.time),
            "Algorithm 3": parseTimeToMs(algorithmResults["Algorithm 3"].enron.time)
        },
        { 
            dataset: "Wiki-Vote", 
            "Algorithm 1": parseTimeToMs(algorithmResults["Algorithm 1"].wiki.time), 
            "Algorithm 2": parseTimeToMs(algorithmResults["Algorithm 2"].wiki.time),
            "Algorithm 3": parseTimeToMs(algorithmResults["Algorithm 3"].wiki.time)
        },
        { 
            dataset: "As-Skitter", 
            "Algorithm 1": parseTimeToMs(algorithmResults["Algorithm 1"].skitter.time), 
            "Algorithm 2": parseTimeToMs(algorithmResults["Algorithm 2"].skitter.time),
            "Algorithm 3": parseTimeToMs(algorithmResults["Algorithm 3"].skitter.time)
        }
    ];
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

const ChartSection = ({ title, dataEnron, dataWiki, dataSkitter, algorithm }) => {
    return (
        <div className="chart-section">
            <h2>{title}</h2>
            <div className="algorithm-info">
                <div className="info-box">
                    <h3>Email-Enron Dataset</h3>
                    <p>Total cliques: <strong>{algorithm.enron.cliques.toLocaleString()}</strong></p>
                    <p>Time taken: <strong>{algorithm.enron.time}</strong></p>
                </div>
                <div className="info-box">
                    <h3>Wiki-Vote Dataset</h3>
                    <p>Total cliques: <strong>{algorithm.wiki.cliques.toLocaleString()}</strong></p>
                    <p>Time taken: <strong>{algorithm.wiki.time}</strong></p>
                </div>
                <div className="info-box">
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
                            <Bar dataKey="count" fill="#8884d8" />
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
                            <Bar dataKey="count" fill="#82ca9d" />
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
                            <Bar dataKey="count" fill="#ff8042" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default function App() {
    const comparisonData = generateComparisonData();
    
    return (
        <div className="container">
            <h1>Graph Clique Algorithm Comparison</h1>
            <p className="description">Comparison of three clique finding algorithms across three different datasets</p>
            
            {/* Algorithm 1 */}
            <ChartSection 
                title={algorithmResults["Algorithm 1"].name} 
                dataEnron={enronData} 
                dataWiki={wikiData} 
                dataSkitter={skitterData} 
                algorithm={algorithmResults["Algorithm 1"]} 
            />
            
            {/* Algorithm 2 */}
            <ChartSection 
                title={algorithmResults["Algorithm 2"].name} 
                dataEnron={enronData} 
                dataWiki={wikiData} 
                dataSkitter={skitterData} 
                algorithm={algorithmResults["Algorithm 2"]} 
            />
            
            {/* Algorithm 3 */}
            <ChartSection 
                title={algorithmResults["Algorithm 3"].name} 
                dataEnron={enronData} 
                dataWiki={wikiData} 
                dataSkitter={skitterData} 
                algorithm={algorithmResults["Algorithm 3"]} 
            />
            
            {/* Comparison Section */}
            <div className="comparison-section">
                <h2>Algorithm Performance Comparison</h2>
                <div className="chart-container comparison-chart">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={comparisonData} layout="vertical">
                            <XAxis type="number" label={{ value: "Time (ms)", position: "insideBottom", offset: -5 }} />
                            <YAxis dataKey="dataset" type="category" width={100} />
                            <Tooltip formatter={(value) => formatTime(value)} />
                            <Legend />
                            <Bar dataKey="Algorithm 1" fill="#8884d8" />
                            <Bar dataKey="Algorithm 2" fill="#82ca9d" />
                            <Bar dataKey="Algorithm 3" fill="#ff8042" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="performance-summary">
                    <h3>Performance Summary</h3>
                    <div className="summary-cards">
                        <div className="summary-card">
                            <h4>Fastest Algorithm</h4>
                            <p className="highlight">{algorithmResults["Algorithm 3"].name}</p>
                            <p>Best performance across all datasets</p>
                        </div>
                        <div className="summary-card">
                            <h4>Most Cliques Found</h4>
                            <p className="highlight">{algorithmResults["Algorithm 2"].name}</p>
                            <p>Found highest number of cliques in all datasets</p>
                        </div>
                        <div className="summary-card">
                            <h4>Best Overall</h4>
                            <p className="highlight">{algorithmResults["Algorithm 3"].name}</p>
                            <p>Best balance of speed and accuracy</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}