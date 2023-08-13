import { Request,Response } from "express";
import  UserService from "../service/userService";
import userService from "../service/userService";
export class UserController{
    constructor(){
this.create=this.create.bind(this)
this.Login   = this.Login.bind(this)
this.Logout = this.Logout.bind(this)
    }

    async create(req:Request,res:Response){
        try {
            let {body}=req
           let data = await UserService.create(body)
           res.send(data)
        } catch (error) {
             console.log("Error in create account",error)
        }
    }

    //Method to handle Login from web 
    async Login(req: Request, res: Response) {
        try {
            let {flag,username,password}:any =req
            console.log(req.body)
            let response = await userService.login(req.body)
                res.send(response)        
        } catch (error) {
           res.send("Not Found")
        }
    }



     //Method to handle Login from web 
     async Logout(req: Request, res: Response) {
        try {
            let {flag,username,password,body}:any =req
            let response:any
          response= await userService.logout(body)
           res.send(response)
        } catch (error) {
           return Promise.reject(error) 
        }
    }
}

export  default new UserController()