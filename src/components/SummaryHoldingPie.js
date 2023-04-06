import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


export default function SummaryHoldingPie(props) {
    const { summaryData } = props;
    console.log(' holding pie = ' , summaryData)
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return(
    <div>
        <div>Test123</div>
    <PieChart width={400} height={400}>
        <Pie
            data={summaryData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="currentValue"
        >
            {/* {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))} */}
        </Pie>
        
    </PieChart>
    {/* <PieChart width={400} height={400}>
        <Pie data={summaryData} dataKey="currentValue" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
    </PieChart> */}
    </div>
    );
}