import React, { useEffect, useState } from "react";

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Line,
  LabelList,
  Label,
} from "recharts";
import { roundNumber, formatNumber } from '../util'

function CustomizedLabel(props) {
  // const { content, ...rest } = props;
  const { x, y, fill, value } = props;
  // return <Label {...rest} fontSize='x-small' fill="purple" fontWeight="Bold" position="top"/>;
  return (
  <text
    x={x}
    y={y}
    fontSize='x-small'
    fontWeight='bold'
    fill='purple'
    textAnchor="start">{value}</text>
  
  )
};

function CustomizedLabelBuyValue(props) {
  const { x, y, fill, value } = props;
  return (<text
    x={x}
    y={y}
    fontSize='x-small'
    fontWeight='bold'
    fill='purple'
    position='right'
    textAnchor="end">{value}</text>
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
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalValue = summaryList?.reduce((result, entry) => (result + entry.totalCurrValue), 0);

    if (totalValue) {
      setTotal(roundNumber(totalValue));
    }

  }, [summaryList]);

  return (
    <div>
      <ComposedChart
        layout="vertical"
        width={500}
        height={750}
        data={summaryList}
        barSize={12}
        margin={{
          top: 10,
          right: 20,
          bottom: 5,
          left: 40
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis dataKey="symbol" type="category" angle={-15} interval={0} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis dataKey="symbol" type="category" yAxisId="profit" hide />

        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px", fontSize: 'small', fontWeight: 'bold' }} />
        <Bar dataKey="totalCurrValue" barSize={12} fill="#b098ea" name={`Current Value: ${roundNumber(total)}`} 
        label={<CustomizedLabel />} 
        >
          {/* <LabelList
            dataKey="totalCurrValue"
            position="center"
            // position="insideLeft"
            dy={1}
            offset="5"
            // angle="-90"
            fill="purple"
            fontSize='x-small'
            fontWeight='bold'
          /> */}
          </Bar>
        {/* <Bar dataKey="totalCurrValue" barSize={10} fill="#cddc39" name={`Current Value: ${total}`} label={<CustomizedLabel />} /> */}
        <Bar dataKey="unrealizedProfit" barSize={8} yAxisId="profit" fill="#0693e3" name="Profit"
        //  label={<CustomizedLabelBuyValue />} 
         >
          {/* <LabelList
            dataKey="unrealizedProfit"
            position="right"
            dy={1}
            offset="5"
            // angle="-90"
            fill="black"
            fontSize='x-small'
            fontWeight='bold'
          /> */}
        </Bar>
        <Line dataKey="totalCurrValue" stroke="#ff7300" name="%Contribution" label={<PercentLabel total={total} />} />
      </ComposedChart>
    </div>
  );
}