class ErrorHandler extends Error{
    constructor(msg,statuscode){
        super(msg)
        this.statuscode=statuscode


        Error.captureStackTrace(this,this.constructor)
    }
}
module.exports=ErrorHandler