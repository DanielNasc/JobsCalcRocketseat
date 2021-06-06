const config = require('./config')

const initDb = {
    async init(){

        const db = await config()

        await db.exec(`CREATE TABLE profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            hours_per_day INT,
            days_per_week INT,
            vacation_per_year INT,
            hourValue INT
        );`)

        await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        );

        `)

        await db.run(`INSERT INTO profile (name, avatar, monthly_budget, hours_per_day, days_per_week, vacation_per_year, hourValue) VALUES (
            'cccounte', "https://avatars.githubusercontent.com/u/82983962?v=4", 10000, 10, 5, 6, 50
        );`)

        await db.run(`INSERT INTO jobs (name, daily_hours, total_hours, created_at) VALUES (
            "Projeto 1", 5, 3, 1622833536734 
        );`)

        await db.run(`INSERT INTO jobs (name, daily_hours, total_hours, created_at) VALUES (
            "Projeto 2", 3, 30, 1622833536734 
        );`)

        await db.close()

        
        
    }
}

initDb.init()