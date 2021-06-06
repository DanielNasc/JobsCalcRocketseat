module.exports = {
    reamaingDaysCalcul(job){
        const remaingDays = (job["total-hours"]/job["daily-hours"]).toFixed()
    
        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remaingDays)
        const dueDate = createdDate.setDate(dueDay)
    
        const reamingTimeInMs = dueDate - Date.now()
        //MS em Dias
        const dayInMs = 1000 * 60 * 60 * 24
        const daysDiff = Math.ceil(reamingTimeInMs/dayInMs)
    
        return daysDiff
    },
    jobBudget: (jobe, jobValue) => jobe["total-hours"] * jobValue
 }