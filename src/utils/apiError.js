class ApiError extends Error{
    constructor(
        statusCode,
        errors=[],
        message="Something Really Went Wrong",
        stack=""
    ){
        super(message)
        this.message=message
        this.errors=errors
        this.statusCode=statusCode
        this.data=null //reset data state,indicating error state
        this.success=false
        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}


export {ApiError}