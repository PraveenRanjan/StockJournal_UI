import { useEffect, useState } from 'react';
import HoldingBarMonth from './HoldingBarWeek';
import { getMonthlyHoldingData } from '../../api';

export default function HoldingDaily(props) {
  const { userId } = props;
  const [holdingData, setHoldingData] = useState();


  useEffect(() => {
    getMonthlyHoldingData(userId).then(data => {
      console.log('Holding data--> ', data);
      setHoldingData(data);
    });
  }, [userId]);
  return (
    <HoldingBarMonth holdingData={holdingData} />
  );
}