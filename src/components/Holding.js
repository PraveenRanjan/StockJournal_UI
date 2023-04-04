import react, { useEffect, useState } from 'react';
import HoldingBarChart from './HoldingBarChart';
import { getHoldingData } from '../api';



export default function Holding(props) {
    
  const { userId } = props;
  const [holdingData, setHoldingData] = useState();


  useEffect(() => {
    getHoldingData(userId).then(data => {
      console.log('Holding data--> ', data);
      setHoldingData(data);
    });
  }, [userId]);
  return (

    <HoldingBarChart holdingData={holdingData} />
  );
}