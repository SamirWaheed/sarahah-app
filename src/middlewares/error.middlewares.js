 const errorHandler = (err, req, res, next) => {
    console.error("FULL ERROR:", err);
    console.error("STACK:", err?.stack);

    // err itself might be undefined
    const statusCode = err?.statusCode ?? err?.cause?.statusCode ?? 500;
    const message = err?.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        data: null,
    });
};

export default errorHandler;