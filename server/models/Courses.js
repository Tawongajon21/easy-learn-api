const mongoose= require('mongoose');

const CoursesSchema=({
    name:{
        type:String,
        required:[true,'course  name must be provided']
    },
    price:
    {type:Number,
    required:[true,'course  price must be provided']
    },
   
    introductoryVideo:
    {
        type:String,
    
        required:[true,' Introductory Video must be provided']

    },
    videos:
    {
        type:[{videoName:String,videoDescription:String,video:String}],
        required:[true,'  Videos must be provided']
      
    },
    rating:
    {type:Number,
        default:4.5
    },
    description:{
        type:String,
      
        required:[true,'   Description must be provided']
    },
    featured:{
        type:Boolean,
        default:false
    }
   
,
examType:{
    type:String,
    required:[true,'   Exam Type  must be provided']
},
category:{
    type:String,
    enum:{
        values:['Information Technology','Graphics Design','Journalism','sciences','shona','commercials'],
        message:`{VALUE} is not supported`
    }
}
,
views:{
    type:Number,
    default:0
},
createdAt:{
    type:Date,
    default:Date.now()
}
}

);

const Courses= mongoose.model('CoursesSchema',CoursesSchema);

module.exports= Courses;