import React from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
} from "recharts";

export default function SummaryKpiReturn(props) {
    const { stockData } = props;


    return (
        <div>
            <BarChart
                layout="vertical"
                width={350}
                height={160}
                data={stockData}
                barSize={4}
                stackOffset="sign"
                // stackOffset="expand"
                margin={{
                    top: 25,
                    right: 10,
                    bottom: 5,
                    left: 5,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />

                <XAxis type="number" />
                <YAxis dataKey="type" name="Open" type="category" axisLine="false" />
                <Legend />
                <Tooltip />
                <ReferenceLine x={0} stroke="#e65100" />
                <Bar dataKey="avgGainingPct" fill='green' stackId="stack"  name="Win%" />
                <Bar dataKey="avgLossingPct" fill="#f78da7" stackId="stack" name="Loss%" />
                <Bar dataKey="avgOverallGainPct" fill="blue" stackId="stack" name="Overall%" />
            </BarChart>
        </div>
    );
}