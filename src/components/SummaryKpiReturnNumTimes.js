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

export default function SummaryKpiReturnNumTimes(props) {
    const { stockData } = props;


    return (
        <div>Gain/Loss by How many Times%
            <BarChart
                layout="vertical"
                width={350}
                height={160}
                data={stockData}
                barSize={8}
                stackOffset="sign"
                margin={{
                    top: 25,
                    right: 20,
                    bottom: 5,
                    left: 3,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />

                <XAxis type="number" unit="%" tick={{ fontSize: 'small', fontWeight: 'bold' }}/>
                <YAxis dataKey="type" name="Open" type="category" angle={-15} tick={{ fontSize: 'small', fontWeight: 'bold' }}/>
                <Legend wrapperStyle={{ lineHeight: "10px" , fontSize: 'small', fontWeight: 'bold'}}/>
                <Tooltip />
                <ReferenceLine x={0} stroke="#e65100" />
                <Bar dataKey="gainTimesPct" fill='green' stackId="stack"  name="Win% Times" />
                <Bar dataKey="lossTimesPct" fill="#f78da7" stackId="stack" name="Loss% Times" />
            </BarChart>
        </div>
    );
}