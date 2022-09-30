

function setDateValues() {
    let date_ = document.querySelector("#due")
    let date_update = document.querySelector("#due-update")

    const min_date = new Date 
    const year = min_date.getFullYear()
    let day = min_date.getDate()
    let month = min_date.getMonth() + 1
    if (month < 10) {
        if (month < 10) 
            month = "0" + month;
        if (day < 10) 
            day = "0" + day;
    }
    date_.min = `${year}-${month}-${day}`
    date_.value = `${year}-${month}-${day}`
    date_update.min = `${year}-${month}-${day}`
    date_update.value= `${year}-${month}-${day}`

}



export { setDateValues }