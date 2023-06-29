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
    Rectangle, LabelList,
} from "recharts";

export default function SummaryKpiReturn51(props) {
    const { stockData } = props;
    // console.log('stockData--> ', stockData);


    return (
        <div>Gain/Loss by %
            {/* <BarChart
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
                <Bar dataKey="avgGainingPct" fill='green' stackId="stack"  name="Win%" />
                <Bar dataKey="avgLossingPct" fill="#f78da7" stackId="stack" name="Loss%" />
                <Bar dataKey="avgOverallGainPct" fill="blue" stackId="stack" name="Overall%" />
            </BarChart> */}

            {stockData && <BarChart
                width={350}
                height={160}
                data={stockData}
                stackOffset="sign"
                margin={{
                    top: 25,
                    right: 20,
                    bottom: 5,
                    left: 3,
                }}
                barSize={12}
            >
                <CartesianGrid horizontal={false} vertical={false} />
                <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fontSize: 'small', fontWeight: 'bold' }}/>
                <YAxis hide={true} dy={4} />

                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar
                    dataKey="avgLossingPct"
                    fill="#ff9800"
                    isAnimationActive={false}
                    shape={<Rectangle radius={[12, 12, 12, 12]} />}
                    minPointSize={20}
                    barSize={20}
                >
                    <LabelList
                        dataKey="avgLossingPct"
                        position="center"
                        dy={1}
                        offset="15"
                        angle="-90"
                        fill="#b80000"
                        fontSize='small'
                        fontWeight= 'bold'
                    />
                </Bar>
                <Bar
                    dataKey="avgGainingPct"
                    fill="green"
                    isAnimationActive={false}
                    shape={<Rectangle radius={[12, 12, 12, 12]} />}
                    minPointSize={20}
                    barSize={20}
                >
                    <LabelList
                        dataKey="avgGainingPct"
                        position="center"
                        dy={11}
                        offset="11"
                        angle="-90"
                        fill="#FFF"
                        fontSize='small'
                        fontWeight= 'bold'
                    />
                </Bar>
                
                <Bar
                    dataKey="avgOverallGainPct"
                    fill="blue"
                    isAnimationActive={false}
                    shape={<Rectangle radius={[12, 12, 12, 12]} />}
                    minPointSize={20}
                    barSize={20}
                >
                    <LabelList
                        dataKey="avgOverallGainPct"
                        position="outside"
                        dy={11}
                        offset="11"
                        angle="-90"
                        fill="#FFF"
                        fontSize='small'
                        fontWeight= 'bold'
                    />
                </Bar>
            </BarChart>}
        </div>
    );
}