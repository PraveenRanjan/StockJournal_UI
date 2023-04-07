import React from "react";

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Line,
} from "recharts";
import { roundNumber } from '../util'

function CustomizedLabel(props) {
  const { x, y, fill, value } = props;
  return (<text
    x={x}
    y={y}
    fontSize='x-small'
    fontWeight='bold'
    fill='purple'
    textAnchor="start">{value}</text>
  )
};

function PercentLabel(props) {
  const { x, y, fill, value, total } = props;
  return (<text
    x={x}
    y={y}
    fontSize='x-small'
    fontWeight='bold'
    fill='blue'
    textAnchor="start">{roundNumber(value / total * 100)}</text>
  )
};

export default function SummarySymbolContributionBar(props) {
  const { summaryList } = props;
  const total = summaryList?.reduce((result, entry) => (result + entry.totalCurrValue), 0);

  return (
    <div>
      <ComposedChart
        layout="vertical"
        width={500}
        height={600}
        data={summaryList}
        barSize={1}
        margin={{
          top: 10,
          right: 20,
          bottom: 5,
          left: 40
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="symbol" type="category" interval={0} scale="point" tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px" }} />
        <Bar dataKey="totalCurrValue" barSize={12} fill="#cddc39" name={`Current Value-${total}`} label={<CustomizedLabel />} />
        <Line dataKey="totalCurrValue" stroke="#ff7300" name="%Contribution" label={<PercentLabel total={total} />} />
      </ComposedChart>
    </div>
  );
}