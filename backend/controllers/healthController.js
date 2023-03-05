const Health = require('../models/health')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../models/user')

exports.newHealth = catchAsyncErrors(async(req,res,next) => {
	// console.log(req.body);
    try {
	const health = await Health.create(req.body);
	res.status(201).json({
		success:true,
		health 
	})}  catch (error) {
        if (error.name === "ValidationError") {
          let errors = {};
    
          Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
          });
          
          console.log(errors)
    
          return res.status(400).send(errors);
        }
        res.status(500).send("Something went wrong");
      }
})

exports.getHealth = catchAsyncErrors(async (req, res, next) => {
  const health = await Health.find();

  // console.log(user)
  res.json({health});

})

exports.readHealth = catchAsyncErrors(async(req,res,next) => {

  const { id } = req.params;
  const health = await Health.findById(id);
  const user = await User.find({'health_id': id});
  const totalUser = user.length;
  res.json({health,totalUser});

})

exports.updateHealth = catchAsyncErrors(async(req,res,next) => {
	
  try{
      const disease = await Health.findByIdAndUpdate(req.params.id,req.body,{
          new: true,
          runValidators:true,
          useFindandModify:false
      })
      res.status(200).json({
          success:true,
          disease
      })
  }catch(err){
      res.status(400).json({
          message: "Disease not found"
      })
  }    
})


exports.deleteHealth= catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.id)
  try{
  const health = await Health.findById(req.params.id);

  await health.remove();

  res.status(200).json({
      success: true,
      message: 'health is deleted.'
  })
  }catch(err){
      res.status(400).json({
          message: "health not found"
      })
  }

})