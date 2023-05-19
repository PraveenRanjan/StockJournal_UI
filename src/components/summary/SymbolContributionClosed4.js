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
  return <Label {...rest} fontSize='x-small' fontWeight="Bold"  />;
};

export default function SymbolContributionClosed4(props) {
  const { summaryList } = props;
  console.log('summaryList in closed contribution = ', summaryList );

  const [totalProfit, setTotalProfit] = useState(0);


  useEffect(() => {
    const totalProfit = summaryList?.reduce((result, entry) => (result + entry.profit), 0);
    if (totalProfit) {
      setTotalProfit(roundNumber(totalProfit));
    }
  }, [summaryList]);


  return (
    <div> Closed Positions:
      <ComposedChart
        // layout="vertical"
        width={1700} height={450}
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
        <XAxis dataKey="symbol" angle={-90} interval={1} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <XAxis dataKey="symbol" type="category" xAxisId="profit" hide />
        <YAxis type="number" angle={75} yAxisId="%profit" orientation="right" tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />

        <ReferenceLine x={0} stroke="#e65100" />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px", fontSize: 'small', fontWeight: 'bold' }} />
        <Bar dataKey="profit" barSize={0} fill="#3f51b5" name={`Total Profit: ${totalProfit}`} legendType="star"/>
        <Line yAxisId="%profit" type="monotone" dataKey="pctReturn" name="%Profit" stroke="#00796b" />

        <Bar dataKey="sellValue" barSize={12} fill="#b098ea" name='Sell Value' 
        // label={<CustomizedLabel />} 
        >
            <LabelList
            dataKey="sellValue"
            // position="bottom"
            angle="-90"
            fill="blue"
            fontSize='x-small'
            fontWeight="Bold"
            content={renderCustomizedLabel}
          />
            <LabelList
            dataKey="pctReturn"
            position="insideStart"
            // angle="45"
            fill="#00796b"
            fontSize='x-small'
            fontWeight="Bold"
            content={renderCustomizedLabelPct}
          />
          <LabelList
            dataKey="profit"
            position="top"
            angle="-90"
            fill="#0693e3"
            fontSize='x-small'
            fontWeight="Bold"
            content={renderCustomizedLabelPct}
          />
          </Bar>

        <Bar dataKey="profit" barSize={8} xAxisId="profit" fill="#0693e3" name="Profit"
         >
        </Bar>
      </ComposedChart>
    </div>
  );
}