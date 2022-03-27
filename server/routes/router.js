const express= require(`express`);

const router= express.Router();


const {getCourses, createCourses} = require('../controllers/Controller')



/**
 * @description Root Route 
 * @method GET
 */
router.get('/',getCourses);



/**
 * @description Create Course Route 
 * @method POST
 */

router.post('/create-course',createCourses);


module.exports= router