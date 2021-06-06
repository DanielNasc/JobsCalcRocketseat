const job = require('../model/job')
const jobUtils = require('../utils/jobUtils')
const Profile = require('../model/Profile') 

module.exports = {

    create(req, res){
        return res.render('job') 
    },
    async save(req, res){
        await job.create(
            {
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"], 
            created_at: Date.now(),
        })

        return res.redirect('/')
    },
    async show(req, res){
        const Jobs = await job.get()

        const profile = await Profile.get()
        
        const jobId = req.params.id

        const Job = Jobs.find((j) => j.id == jobId)

        if(!Job){
            return res.send('job not found')
        }

        Job.budget = jobUtils.jobBudget(Job, profile["hourValue"] )


        res.render('job-edit',{Job})
    },
    async update(req, res){
        const Jobs = await job.get()
        
        const jobId = req.params.id

        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]  
        }

        await job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId)
    },
    async delete(req, res){
        
        const jobId = req.params.id
        
        await job.delete(jobId)

        res.redirect('/')
    }
 }