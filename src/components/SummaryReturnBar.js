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
  ReferenceLine,
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
        {/* <ReferenceLine x={0} /> */}
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="unrealizedProfitPct" stackId="stack" fill='green' name="Unrealized%">
          <LabelList dataKey="unrealizedProfitPct" position="center" content={renderCustomBarLabel} />
        </Bar>
        <Bar dataKey="pctReturn" fill="#f78da7" stackId="stack" name="Sold%">
          <LabelList dataKey="pctReturn" position="center" content={renderCustomBarLabel} />
        </Bar>
      </BarChart>
    </div>
  );
}