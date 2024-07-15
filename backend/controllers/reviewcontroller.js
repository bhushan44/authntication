const review=require("../models/review")
async function getReviews(req,res){
    try{
        // console.log(req.params.id)
        const data=await review.find({tour:req.params.id})
        console.log(data,"da")
        res.json({
            status:"success",
            data
        })


    }
    catch(e){
        res.json({
            message:e.message,
            status:"fail"
        })
    }


}
function createReview(){

}
module.exports={getReviews,createReview}