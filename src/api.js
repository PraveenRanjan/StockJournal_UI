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
        console.error('Error getting transection data: ', e)
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
        console.error('Error getting transection data: ', e)
    }

}


export const uploadFile = async (userId, type, file, cash) => {
    // console.log('uploadFile - ', type);
    const data = new FormData();
    data.append('file', file);
    data.append('cash', cash);
    try {
        const upload = await axios({
            url: `/journal/${type}/upload`,
            method: 'post',
            headers: { 'userId': userId, "Content-Type": "multipart/form-data" },
            data
        })

    } catch (e) {
        console.error('Error getting transection data: ', e)
    }
}

