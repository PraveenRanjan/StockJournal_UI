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
  return <text x={x + width / 2} y={y} fill="purple" position="center" textAnchor="middle" fontSize='small' dy={-6}>{value || ""}</text>;
};

const renderCustomBarLabelClosed = ({ payload, x, y, width, height, value }) => {
  return <text x={x + width / 2} y={y} fill="blue" position="center" textAnchor="middle" fontSize='small' dy={-6}>{value || ""}</text>;
};

export default function SummaryReturnBar(props) {
  const { summaryData } = props;


  return (
    <div>
      <BarChart
        width={1450} height={450}
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
        <XAxis dataKey="symbol" angle={70} interval={0} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis unit="%" tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px" , fontSize: 'small', fontWeight: 'bold'}} />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="unrealizedProfitPct" stackId="stack" fill='green' name="Unrealized%">
         {/* label={{fontSize: 'small', fontWeight: 'bold'}} */}
          <LabelList dataKey="unrealizedProfitPct" position="center" content={renderCustomBarLabel} />
        </Bar>
        <Bar dataKey="pctReturn" fill="#f78da7" stackId="stack" name="Sold%">
          <LabelList dataKey="pctReturn" position="center" content={renderCustomBarLabelClosed} />
        </Bar>
      </BarChart>
    </div>
  );
}