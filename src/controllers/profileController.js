const Profile = require('../model/Profile')

module.exports = {
    async index(req, res){
        return res.render('profile', {profilew: await Profile.get()})
    }
    ,async update(req, res){

        const profile = await Profile.get()

        //pegar os dados com o req.body
        const data = req.body
        //quantas semanas tem um ano
        const weeksPerYear = 52
        //remover as ferias, remober as semanas de ferias
        const weeksPerMonth = (weeksPerYear - profile["vacation-per-year"])/12
        //horas por semana
        const HoursPerWeek = data["hours-per-day"] * data["days-per-week"]
        //horas por mes
        const hoursPerMonth = HoursPerWeek * weeksPerMonth
        //valor da hora
        const valorHora = data["monthly-budget"]/hoursPerMonth

        await Profile.update({
            ...profile,
            ...req.body,
            hourValue: valorHora
        })
        

        return res.redirect('/profile')

        
    }
 }