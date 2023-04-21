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
  ReferenceLine,
} from "recharts";
import { roundNumber, formatNumber } from '../../util';

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


const renderCustomizedLabel = (props) => {
  const { content, ...rest } = props;
  var position = "center";
  return <Label {...rest} fontSize='x-small' fill="purple" fontWeight="Bold" angle="-90" position={position} />;
};

const renderCustomizedLabelPct = (props) => {
  const { content, ...rest } = props;
  return <Label {...rest} fontSize='x-small' fill="purple" fontWeight="Bold"  />;
};

export default function SymbolContributionOpen(props) {
  const { summaryList } = props;
  const [total, setTotal] = useState(0);
  console.log('summaryList in open contribution = ', summaryList );

  useEffect(() => {
    const totalValue = summaryList?.reduce((result, entry) => (result + entry.totalCurrValue), 0);
    if (totalValue) {
      setTotal(roundNumber(totalValue));
    }
  }, [summaryList]);

  return (
    <div>
      <ComposedChart
        // layout="vertical"
        width={1450} height={450}
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
        <YAxis type="number" angle={-45} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} orientation="left" />
        <XAxis dataKey="symbol" angle={-15} interval={0} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <XAxis dataKey="symbol" type="category" xAxisId="profit" hide />
        <YAxis type="number" angle={75} yAxisId="%profit" orientation="right" tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />

        <ReferenceLine x={0} stroke="#e65100" />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px", fontSize: 'small', fontWeight: 'bold' }} />
        <Line yAxisId="%profit" type="monotone" dataKey="unrealizedProfitPct" name="%Profit" stroke="#00796b" />
        <Bar dataKey="totalCurrValue" barSize={12} fill="#b098ea" name={`Current Value: ${roundNumber(total)}`} 
        // label={<CustomizedLabel />} 
        >
            <LabelList
            dataKey="totalCurrValue"
            // position="bottom"
            angle="-90"
            fill="blue"
            fontSize='x-small'
            fontWeight="Bold"
            content={renderCustomizedLabel}
          />
            <LabelList
            dataKey="unrealizedProfitPct"
            position="right"
            fill="#263238"
            fontSize='x-small'
            fontWeight="Bold"
            content={renderCustomizedLabelPct}
          />
          </Bar>

        <Bar dataKey="unrealizedProfit" barSize={8} xAxisId="profit" fill="#0693e3" name="Profit"
         >
        </Bar>
        <Line dataKey="totalCurrValue" stroke="#ff7300" name="%Contribution" label={<PercentLabel total={total} />} />
      </ComposedChart>
    </div>
  );
}