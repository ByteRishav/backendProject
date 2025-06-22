class ApiResponse{
    constructor(statusCode , data , message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    // search for all statuscode on chrome how are these just overview
        }
}