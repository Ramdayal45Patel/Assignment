import { Router } from "express";
import { UserController } from "../controller/userController";

class UserRoutes {
userController:UserController 
router:Router
  constructor() {
 this.router= Router({mergeParams:true})
 this.userController=new UserController()

this.userRoutes()
}

  // User Routes
  private userRoutes() {
    this.router.route("/api/v1/user").post(this.userController.create)
    this.router.route("/api/v1/user/login").post(this.userController.Login)
    this.router.route("/api/v1/user/logout").post(this.userController.Logout)
  }
}
export default new UserRoutes().router;