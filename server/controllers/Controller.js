const { query } = require('express');
const mongoose= require(`mongoose`);
const { insertMany } = require('../models/Courses');
const Courses= require('../models/Courses');


exports.getCourses= async(req,res)=>{
const {featured,category,name,examType,sort,fields,priceFilters}= req.query;

//Query Object contains possible filtering options the user Have from Category,name,exam type,price ,featured or Not and THe Price and Rating
const queryObject= {};

if (featured) {
    queryObject.featured=featured==='true'? true:false
}
if (category) {
    queryObject.category= {$regex:category,$options:'i'}
}
if (name) {
    queryObject.name= {$regex:name,$options:'i'}
}
if (examType) {
    queryObject.examType={$regex:examType,$options:'i'}
}
 
if (priceFilters) {
    const operatorMap={
        '>':"$gt",
        '>=':"$gte",
        '=':"$eq",
        '<':"$lt",
        '<=':"$lte",

    }
const regEx= /\b(<|>|>=|=|<|<=)\b/g;
let filters=priceFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`);
 const options  = ['price','rating'];
  filters= filters.split(',').forEach((item)=>{
      const [field,operator,value]= item.split('-');
      if (options.includes(field)) {
          queryObject[field]={[operator]:Number(value)}
      }
  })
console.log(filters);
console.log(priceFilters);



 
}





console.log(queryObject);






    let result=  Courses.find(queryObject);

try {
    if (sort) {
      console.log(sort);

      const sortList= sort.split(',').join(' ');
      result= result.sort(sortList)
    }
    else{
        result=result.sort('createdAt')
    }
if (fields) {
    const fieldsList= fields.split(',').join(' ');
    result= result.select(fieldsList)
}

/*
How to Implement Pagination on Our Pages
The Default Page Number is 1 however it can change when the user change the page number 
*/


const page=Number(req.query.page)|| 1;
const limit= Number(req.query.limit)||10;
const skip= (page-1)*limit;
result= result.skip(skip).limit(limit);






 const courses=await result;
  res.status(200).json({totalNumber:courses.length,msg:'Courses Loaded Successfully',courses:courses});
} catch (error) {
    console.log(error)
}
};




exports.createCourses=async(req,res)=>{
    if (!req.body) {
        res.status(500).send({message:"Cannot Submit an Empty Course"});
        return 
    }
const newCourse=  new Courses({
  name:req.body.name,
  price:req.body.price,
  introductoryVideo:req.body.introductoryVideo,
  videos: 
  [{videoName:req.body.courseName,videoDescription:req.body.videoDescription,video:req.body.courseName}],
  rating:5,
  description:req.body.description,
  examType:req.body.examType,
  category:req.body.category,

})


//Add New Course To The Database
newCourse.save(newCourse)
.then(data=>{
    res.send(data)
})
.catch(error=>{
    res.status(500).send({
        message:error.message||'Error Occured While Creating The Course'
    })
})


}





