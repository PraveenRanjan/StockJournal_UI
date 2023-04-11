import axios from "axios";



export const getTransectionData = async (userId) => {
    try {
        const transectionData = await axios({
            url: '/journal/transactions',
            method: 'get',
            headers: { 'userId': userId }
        })
        // console.log('tx data--> ', transectionData.data);
        return transectionData?.data;
    } catch (e) {
        console.error('Error getting transaction data: ', e)
    }

}

export const getSummaryData = async (userId) => {
    try {
        const summaryData = await axios({
            url: '/journal/transactions/summary',
            method: 'get',
            headers: { 'userId': userId }
        })
        // console.log('tx data--> ', transectionData.data);
        return summaryData?.data;
    } catch (e) {
        console.error('Error getting transaction summary data: ', e)
    }

}


export const uploadFile = async (userId, type, file, cash, newFund) => {
    // console.log('uploadFile - ', type);
    const data = new FormData();
    data.append('file', file);
    data.append('cash', cash);
    data.append('newFundAdded', newFund);
    try {
        const upload = await axios({
            url: `/journal/${type}/upload`,
            method: 'post',
            headers: { 'userId': userId, "Content-Type": "multipart/form-data" },
            data
        })

    } catch (e) {
        console.error('Error uploading file: ', e)
    }
}

export const getHoldingData = async (userId) => {
    try {
        const holdingData = await axios({
            url: '/journal/holdings',
            method: 'get',
            headers: { 'userId': userId }
        })
        // console.log('tx data--> ', transectionData.data);
        return holdingData?.data;
    } catch (e) {
        console.error('Error getting holding data: ', e)
    }
}

export const getWeeklyHoldingData = async (userId) => {
    try {
        const holdingData = await axios({
            url: '/journal/week/holdings',
            method: 'get',
            headers: { 'userId': userId }
        })
        // console.log('tx data--> ', transectionData.data);
        return holdingData?.data;
    } catch (e) {
        console.error('Error getting holding data: ', e)
    }

}


