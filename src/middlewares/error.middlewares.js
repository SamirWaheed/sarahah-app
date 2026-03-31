export default  function errorHandler (err,req,res,next){
    console.log(err);

    res.status(err?.cause?.status|| 500).json({
        message:err.message ?? "Internal Server Error",
        success: false
    })

}