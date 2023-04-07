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
  console.log('value, y-->', value, y);
  return <text x={x + width / 2} y={y} fill="black" position="center" textAnchor="middle" dy={-6}>{value || ""}</text>;
};

const data = [
  {
    name: "Page A",
    uv: 590,
    pv: 800,
    amt: 1400,
    cnt: 490
  },
  {
    name: "Page B",
    uv: 868,
    pv: 967,
    amt: 1506,
    cnt: 590
  },
  {
    name: "Page C",
    uv: 1397,
    pv: 1098,
    amt: 989,
    cnt: 350
  },
  {
    name: "Page D",
    uv: 1480,
    pv: 1200,
    amt: 1228,
    cnt: 480
  },
  {
    name: "Page E",
    uv: 1520,
    pv: 1108,
    amt: 1100,
    cnt: 460
  },
  {
    name: "Page F",
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380
  }
];
export default function SummarySymbolContributionBar(props) {
  const { summaryList } = props;
  console.log('summaryList =', summaryList);

  return (
    <div>
          <BarChart
          layout="vertical"
          width={500}
          height={600}
          data={summaryList}
          barSize={2}
          margin={{
            top: 10,
            right: 20,
            bottom: 5,
            left: 40
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="symbol" type="Number" interval={0} scale="point" tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
          <Tooltip />
          <Legend />
          {/* <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
          <Bar dataKey="totalCurrValue" barSize={12} fill="#413ea0" 
          label={{
              position: "right", fill: "red",offset: 25, fontSize: 'x-small', fontWeight: 'bold'
            }}/>
          {/* <Line dataKey="uv" stroke="#ff7300" /> */}
        </BarChart>
    </div>
  );
}