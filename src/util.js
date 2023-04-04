
export const formatNumber = (number) => {
    return new Intl.NumberFormat("en-IN").format(number);
}

export const roundNumber = (number) => {
    return Number(new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 2 }).format(number));
}