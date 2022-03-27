require('dotenv').config();
const connectDB= require('./db/connect')
const Course= require('./models/Courses');


const jsonCourses= require('./courses.json');
const Courses = require('./models/Courses');


const start=async ()=>{
    try {
        await connectDB(process.env.ConnectionString);
      await Course.deleteMany();

      await Course.create(jsonCourses)
      
        console.log(`success `)
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start()