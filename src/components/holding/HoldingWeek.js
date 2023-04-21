import { useEffect, useState } from 'react';
import HoldingBarWeek from './HoldingBarWeek';
import { getWeeklyHoldingData } from '../../api';

export default function HoldingDaily(props) {
  const { userId } = props;
  const [holdingData, setHoldingData] = useState();


  useEffect(() => {
    getWeeklyHoldingData(userId).then(data => {
      console.log('Holding data--> ', data);
      setHoldingData(data);
    });
  }, [userId]);
  return (
    <HoldingBarWeek holdingData={holdingData} />
  );
}