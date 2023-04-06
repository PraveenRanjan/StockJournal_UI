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
  ReferenceLine
} from "recharts";


const data = [
  {
    "symbol" : "ABB",
    "unrealizedProfitPct" : 1.8,
    "pctReturn" : 12,
},
{
    "symbol" : "INFY",
    "unrealizedProfitPct" : 2.8,
    "pctReturn" : -2,
},
{
    "symbol" : "WIPRO",
    "unrealizedProfitPct" : 5.8,
    "pctReturn" : 2,
},
{
    "symbol" : "SONATA",
    "unrealizedProfitPct" : 10.8,
    "pctReturn" : 4,
},
{
    "symbol" : "ASAN",
    "unrealizedProfitPct" : 15.8,
    // "pctReturn" : 5,
},
];

const renderLabel = (prop, dataKey) => {
  const index = prop.index;
  const target = data[index];
  // console.log('index = ',index)
  // console.log('target = ',target)
  // return target[dataKey];
  return (
    <g>
      <span>
        abc
      </span>
    </g>
  );
};

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  console.log('value, y-->', value, y);
  return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{value || ""}</text>;
  // return "100";
};

export default function SummaryReturnBar(props) {
  const { summaryData } = props;

  // const renderLabel1 = (prop, dataKey) => {
  //   const index = prop.index;
  //   const target = summaryData[index];
  //   // console.log('index = ',target[dataKey])
  //   return target[dataKey];
  // };
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
          <XAxis dataKey="symbol" angle={-50} interval={0} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
          <YAxis unit="%"/>
          <Tooltip />
			<Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px" }} />
          <ReferenceLine y={0} stroke="#000" />

          <Bar dataKey="unrealizedProfitPct" stackId="stack" fill='green'
            label={{
              position: "insideBottom", angle: -60,fill: "blue",offset: 25
            }} 
          >
            {/* <LabelList dataKey="unrealizedProfitPct" /> */}
          {/* {
            summaryData?.map((entry, index) => (
              <Cell key={`cell-${index}`} 
                fill={entry?.unrealizedProfitPct > 0? 'green': 'red'}
              />
            ))
          } */}
          </Bar>
          <Bar dataKey="pctReturn" fill="#f78da7" stackId="stack"
            // label={{
            //   position: "insideBottom",
            //   angle: -60,
            //   fill: "black",
            //   offset: 25
            // }} 
          >
          <LabelList dataKey="pctReturn" fill="red" position="center" content={renderCustomBarLabel}/>
          </Bar>
        </BarChart>

    </div>
  );
}