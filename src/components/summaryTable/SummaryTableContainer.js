import React, { useEffect, useState } from 'react';
import SummaryTable from "./SummaryTable";
import { getSummaryData } from '../../api';
export default function SummaryTableContainer(props) {
    const { userId } = props;
    const [summaryData, setSummaryData] = useState();

    useEffect(() => {
      getSummaryData(userId).then(data => {
        setSummaryData(data.summaryList);
      });
    }, [userId]);
    return (
      <SummaryTable userId={userId} data={summaryData} />
  );
}
