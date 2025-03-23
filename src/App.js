import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./styles.css";

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

// Wiki-Vote Dataset (Replace with actual values)
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

export default function App() {
    return (
        <div className="container">
            <h1>Maximal Clique Enumeration Results</h1>

            <div className="dataset-info">
                <div className="info-box">
                    <h2>Email-Enron Dataset</h2>
                    <p>Total cliques: <strong>226,859</strong></p>
                    <p>Time taken: <strong>00:01:17:271</strong></p>
                </div>
                <div className="info-box">
                    <h2>Wiki-Vote Dataset</h2>
                    <p>Total cliques: <strong>459,002</strong></p>
                    <p>Time taken: <strong>00:00:40:228</strong></p>
                </div>
            </div>

            <div className="chart-grid">
                <div className="chart-container">
                    <h3>Email-Enron Dataset</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={enronData}>
                            <XAxis dataKey="size" label={{ value: "Clique Size", position: "insideBottom", offset: -5 }} />
                            <YAxis label={{ value: "Count", angle: -90, position: "insideLeft",offset: -20 }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container">
                    <h3>Wiki-Vote Dataset</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={wikiData}>
                            <XAxis dataKey="size" label={{ value: "Clique Size", position: "insideBottom", offset: -5 }} />
                            <YAxis label={{ value: "Count", angle: -90, position: "insideLeft",offset: -20 }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
