const loggerMiddleware = (req, res, next) => {


    console.log('loggerMiddleware');
    next()
}
export default loggerMiddleware