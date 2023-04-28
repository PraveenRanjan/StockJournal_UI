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

const renderCustomizedLabelClosed = (props) => {
  const { content, ...rest } = props;
  var position = "center";

  if (props.value < 0) {
    position = "bottom";

  }
  return <Label {...rest} position={position}
  // fontSize='small' fill="blue" fontWeight="Bold" angle="-90"
  />;
};

export default function SummaryReturnBarClosed2(props) {
  const { summaryData } = props;


  return (
    <div> Closed Positions:
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
        <XAxis dataKey="symbol" angle={-90} interval={0} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis type="number" angle={-70} unit="%" tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis type="number" angle={-70} yAxisId="profit" orientation="left" tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
        <YAxis type="number" angle={70} yAxisId="sellValue" orientation="right" tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px", fontSize: 'small', fontWeight: 'bold' }} />
        <ReferenceLine y={0} stroke="#000" />

        <Bar dataKey="pctReturn" fill="#f78da7" stackId="stack" name="Sold%">
          <LabelList
            dataKey="pctReturn"
            angle="-90"
            fill="blue"
            fontSize='x-small'
            fontWeight="Bold"
            content={renderCustomizedLabelClosed}
          />
        </Bar>

        <Line yAxisId="sellValue" type="monotone" dataKey="sellValue" name="Sold Value" stroke="#2196f3" legendType="star" />
        <Line yAxisId="profit" type="monotone" dataKey="profit" name="Profit" stroke="#1a237e" legendType="star" />
      </ComposedChart>
    </div>
  );
}