const job = require('../model/job')
const jobUtils = require('../utils/jobUtils')
const Profile = require('../model/Profile') 

module.exports = {
    async index(req, res) {
        const profile  = await Profile.get()
        const jobs =  await job.get()

        const statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0

        const updatedJob = jobs.map((jobe)=>{
            const remaing = jobUtils.reamaingDaysCalcul(jobe)
            const status = remaing <= 0? 'done': 'progress'

            statusCount[status]++

            jobTotalHours = status == 'progress'? jobTotalHours + Number(jobe['daily-hours']): jobTotalHours

            return {
                ...jobe,
                remaing,
                status,
                budget: jobUtils.jobBudget(jobe, profile["hourValue"] )
            }
        })

        /*const jobsInProgress = updatedJob.filter(j => j.status == 'progress')

        const arrayJobTotalHours = jobsInProgress.map((job)=>{
            return  Number( job['daily-hours'])
        })

        const reducer = (param1, param2) => param1 + param2

        const jobTotalHours =  (()=>{
            if(arrayJobTotalHours != []){
                return arrayJobTotalHours.reduce(reducer)
            }
                return 0      
        })(); */
        

        const freeHours = profile['hours-per-day'] - jobTotalHours
    
        return res.render('index', {jobs: updatedJob, profile, status: statusCount, freeHours})
    
    }
}