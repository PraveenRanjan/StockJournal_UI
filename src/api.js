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

export const exportCsv =  (userId, type, startDate, endDate) => {
    // console.log('exportCsv--> ', type, startDate, endDate);
    try {
        const transectionData =  axios({
            url: `/journal/${type}/exportCsv/${startDate}/${endDate}`,
            method: 'get',
            headers: { 'userId': userId },
            responseType: 'blob',
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'transactions.csv');
            document.body.appendChild(link);
            link.click();
        });
        
    } catch (e) {
        console.error('Error exporting csv: ', e)
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


export const uploadFile = async (userId, type, file, txDate, cash, newFund) => {
    console.log('uploadFile txDate - ', txDate);
    const data = new FormData();
    data.append('file', file);
    data.append('transactionDate', txDate)
    data.append('cash', cash);
    data.append('newFundAdded', newFund);

    try {
        const upload = await axios({
            url: `/journal/${type}/upload/${txDate}`,
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

export const updateSummaryLTP = async (userId) => {
    try {
        const updateSummaryLTP = await axios({
            url: '/journal/transactions/summary/LTP/update',
            method: 'get',
            headers: { 'userId': userId }
        })
        console.log("updated")
        return "Updated";
    } catch (e) {
        console.error('Error updating LTP for transaction summary data ', e)
    }
}

export const resetSummaryData = async (userId) => {
    try {
        const resetSummaryData = await axios({
            url: '/journal/transactions/summary/resetLatestData',
            method: 'get',
            headers: { 'userId': userId }
        })
        console.log("updated")
        return "Data reset";
    } catch (e) {
        console.error('Error resetting transaction summary data to previous day ', e)
    }
}

export const updateStopLossData = async (userId, transaction) => {
    console.log('transaction - ', transaction);
    try {
        const upload = await axios({
            url: '/journal/transactions/summary/update/Stoploss',
            method: 'post',
            headers: { 'userId': userId },
            data: transaction
        })

    } catch (e) {
        console.error('updateStopLossData: ', e)
    }
}


export const exportSummaryCsv =  (userId, type) => {
    // console.log('exportCsv--> ', type, startDate, endDate);
    try {
        const summaryData =  axios({
            url: `/journal/transactions/summary/exportCsv/${type}`,
            method: 'get',
            headers: { 'userId': userId },
            responseType: 'blob',
        }).then(response => {
            console.log(response);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${type}-transactions-summary.csv`);
            document.body.appendChild(link);
            link.click();
        });
        
    } catch (e) {
        console.error('Error exporting csv: ', e)
    }

}