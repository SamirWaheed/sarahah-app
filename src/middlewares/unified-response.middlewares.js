export const unifiedResponse = (handler)=>{

    return  async (req,res,next)=>{

        const result = await handler(req,res,next)
        if (res.headerssent) return;
        return res.status(result.meta.statusCode).json({
            success:true,
            message: result.message ?? "Success",
            data: result.data?? result,
            meta: result.meta ?? {}
        })
    }
}