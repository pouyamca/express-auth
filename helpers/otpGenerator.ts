const otpGen = (len: number): number => {
    return Math.floor(Math.pow(10, len - 1) + Math.random() * (Math.pow(10, len) - Math.pow(10, len - 1) - 1));


}