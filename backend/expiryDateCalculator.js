const getExpiryDate = (currentDate, expireAfter) => {
    //expiry date is calculated as current date plus expiresAfter including currentDate and at last plus one
    const currentYear = currentDate.split('-')[0];
    const currentMonth = currentDate.split('-')[1];
    const currentDay = currentDate.split('-')[2];
    const date = new Date(`${currentYear}-${currentMonth}-${currentDay}`)
    let month = date.getMonth() < 10 ? 0 + '' + (date.getMonth() + 1) : (date.getMonth() + 1)
    let year = date.getFullYear()
    let totalDays = new Date(currentYear, currentMonth, 0).getDate();
    console.log('total days are', totalDays)
    const expiryTime = totalDays - (date.getDate() + expireAfter)
    let day = ''
    if (expiryTime > 0) {
        day = date.getDate() + expireAfter
    }
    else if (expiryTime < 0) {
        day = Math.abs(expiryTime)
        if (month == '12') {
            year++
            month = 1
        }
        else if (month < '12') {
            month++
        }
    }
    const expiryDate = year + '-' + month + '-' + day
    console.log(expiryDate)
return expiryDate
}
module.exports={
    getExpiryDate
}
