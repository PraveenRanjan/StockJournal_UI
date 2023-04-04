import React from "react";

import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell,
    Label,
    LabelList,
    ResponsiveContainer
  } from "recharts";

export default function SummaryReturnBar (props) {
    const {summaryData} = props;
    console.log(' summaryData = ' , summaryData)
      return (
        <div>
        <BarChart
          width={1450} height={300}
          data={summaryData}
          barSize ={12}
          margin={{
            top: 5,
            right: 30,
            left: 5,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="symbol" angle={-60} interval={0} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />

          <YAxis unit="%"/>
          <Tooltip />
        
          {<Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px" }} /> }
          {<ReferenceLine y={0} stroke="#000" /> }
          {/* <Brush dataKey="name" height={30} stroke="#8884d8" /> */}
          { <Bar dataKey="unrealizedProfitPct" fill="#82ca9d"  label={{ position: 'top' }}>
          {
            summaryData?.map((entry, index) => (
              <Cell key={`cell-${index}`} 
                fill={
                  entry?.unrealizedProfitPct > 0
                    ? 'green'
                    : 'red'
                }
              />
            ))
          }
          </Bar>  }
        </BarChart>
        </div>
      );
}