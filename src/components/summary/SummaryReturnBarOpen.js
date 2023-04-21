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
  ReferenceLine, Label, ComposedChart, Line
} from "recharts";

const renderCustomizedLabel = (props) => {
  const { content, ...rest } = props;

  var position = "center";
  if (props.value < 0) {
    console.log('less than 0');
    position = "bottom";
  }
  return <Label {...rest} fontSize='x-small' fill="purple" fontWeight="Bold" angle="-90" position={position} />;
};

// const renderCustomBarLabelClosed = ({ payload, x, y, width, height, value }) => {
//   return <text x={x + width / 2} y={y} fill="blue" position="center" textAnchor="middle" fontSize='small' dy={-6}>{value || ""}</text>;
// };

export default function SummaryReturnBarOpen(props) {
  const { summaryData } = props;


  return (
    <div>
      <ComposedChart
        width={1450} height={400}
        data={summaryData}
        barSize={14}
        margin={{
          top: 5,
          right: 30,
          left: 5,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="symbol" angle={-70} interval={0} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis type="number" unit="%" tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis type="number" yAxisId="profit" orientation="left" tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis type="number" yAxisId="currValue" orientation="right" tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px", fontSize: 'small', fontWeight: 'bold' }} />
        <ReferenceLine y={0} stroke="#000" />

        <Bar dataKey="unrealizedProfitPct" stackId="stack" fill='#8bc34a' name="% Profit">
          {/* {
            data?.map((entry, index) => (
              <Cell fill={entry.unrealizedProfitPct > 0 ? '#8bc34a' : '#e57373'} />
            ))
          } */}

          <LabelList
            dataKey="unrealizedProfitPct"
            position="bottom"
            angle="-90"
            fill="blue"
            fontSize='x-small'
            fontWeight="Bold"
            content={renderCustomizedLabel}
          />

        </Bar>
        <Line yAxisId="currValue" type="monotone" dataKey="totalCurrValue" name="Current Value" stroke="#1a237e" />
        <Line yAxisId="profit" type="monotone" dataKey="unrealizedProfit" name="Profit" stroke="#2196f3" legendType="star" />
      </ComposedChart>
    </div>
  );
}