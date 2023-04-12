
export const formatNumber = (number) => {
    return new Intl.NumberFormat("en-IN").format(number);
}

export const roundNumber = (input) => {
    if (input) {
        try {
            return Number(input).toFixed(2);;
        } catch (e) {
            console.log('Error in roundNumber--> ', e);
        }
    }
    return input;

}