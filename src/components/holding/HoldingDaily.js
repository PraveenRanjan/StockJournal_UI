import { useEffect, useState } from 'react';
import HoldingBarDaily from './HoldingBarDaily';
import { getHoldingData } from '../../api';

export default function HoldingDaily(props) {
  const { userId } = props;
  const [holdingData, setHoldingData] = useState();


  useEffect(() => {
    getHoldingData(userId).then(data => {
      console.log('Holding data--> ', data);
      setHoldingData(data);
    });
  }, [userId]);
  return (
    <HoldingBarDaily holdingData={holdingData} />
  );
}