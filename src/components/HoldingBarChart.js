import React from "react";

import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ComposedChart,
    Line
  } from "recharts";

export default function HoldingBarChart (props) {
    const {holdingData} = props;

      return (
        <>
        <ComposedChart
          width={500}
          height={400}
          data={holdingData}
          barSize ={15}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" scale="band"/>
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
          <ReferenceLine y={0} stroke="#000" />
          <Brush dataKey="name" height={30} stroke="#8884d8" />
          <Bar dataKey="totalBuyValue" fill="#82ca9d" name="Buy Value"/>
          <Bar dataKey="totalPortfolioValue" fill="#8884d8" name="Portfolio Value"/>
          <Line type="monotone" dataKey="totalPortfolioValue" stroke="#0693e3" name="Portfolio"/>

      </ComposedChart>
        <BarChart
        width={500}
        height={400}
        data={holdingData}
        barSize ={15}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
        <ReferenceLine y={0} stroke="#000" />
        <Brush dataKey="name" height={30} stroke="#8884d8" />
        <Bar dataKey="dayChange" fill="#82ca9d" />
        <Bar dataKey="dayChgPct" fill="#8884d8" />
        {/* <Line type="monotone" dataKey="dayChgPct" stroke="#ff7300" /> */}

      </BarChart>
      </>
      );
}