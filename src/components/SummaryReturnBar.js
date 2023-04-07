import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  Label,
  ReferenceLine,
  Brush
} from "recharts";

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return <text x={x + width / 2} y={y} fill="black" position="center" textAnchor="middle" dy={-6}>{value || ""}</text>;
};

export default function SummaryReturnBar(props) {
  const { summaryData } = props;


  return (
    <div>

      <BarChart
        width={1450} height={300}
        data={summaryData}
        barSize={12}
        margin={{
          top: 5,
          right: 30,
          left: 5,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="symbol" angle={-50} interval={0} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis unit="%" />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px" }} />
        {/* <Brush dataKey="symbol" height={30} stroke="#8884d8" /> */}
        <ReferenceLine y={0} stroke="#000" />

        <Bar dataKey="unrealizedProfitPct" stackId="stack" fill='green' name="Unrealized%"
        // label={{
        //   position: "insideBottom", angle: -60,fill: "blue",offset: 25
        // }} 
        >
          <LabelList dataKey="unrealizedProfitPct" position="center" content={renderCustomBarLabel} />
          {/* <LabelList dataKey="unrealizedProfitPct" /> */}
          {/* {
            summaryData?.map((entry, index) => (
              <Cell key={`cell-${index}`} 
                fill={entry?.unrealizedProfitPct > 0? 'green': 'red'}
              />
            ))
          } */}
        </Bar>
        <Bar dataKey="pctReturn" fill="#f78da7" stackId="stack" name="Sold%"
        // label={{
        //   position: "insideBottom",
        //   angle: -60,
        //   fill: "black",
        //   offset: 25
        // }} 
        >
          <LabelList dataKey="pctReturn" position="center" content={renderCustomBarLabel} />
        </Bar>
      </BarChart>

    </div>
  );
}