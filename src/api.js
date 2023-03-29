import axios from "axios";



export const getTransectionData = async (userId) => {
    try {
        const transectionData = await axios({
            url: 'journal/transactions',
            method: 'get',
            headers: { 'userId': 'ar' }
        })
        // console.log('tx data--> ', transectionData.data);
        return transectionData?.data;
    } catch (e) {
        console.error('Error getting transection data: ', e)
    }
    
}

export const uploadFile = async (file) => {
    const data = new FormData(); 
        data.append('file', file);
        try {
            const upload = await axios({
                url: 'journal/transactions/upload',
                method: 'post',
                headers: { 'userId': 'ar', "Content-Type": "multipart/form-data" },
                data
            })
            // console.log('file upload msg--> ', upload);
            
        } catch (e) {
            console.error('Error getting transection data: ', e)
        }    
       

}
    
