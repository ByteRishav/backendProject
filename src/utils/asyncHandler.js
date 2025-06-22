// Async errors in Express are not automatically caught and passed to the error handler.
// You must manually catch them using try/catch and call next(err), or use a utility like asyncHandler that does this for you.


const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) => next(err))
    }
}

export {asyncHandler} 


// const asyncHandler = (fn) => async(req,res,next) =>{
//     try {
//         await fn(req,res,next);
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success : false,
//             message : err.message
//         })
//     }

// }