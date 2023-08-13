import { Op } from "sequelize"
import User from "../model/userModel"
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

export class UserService {
    constructor() {
        this.login = this.login.bind(this)
        this.create = this.create.bind(this)
        this.logout = this.logout.bind(this)
    }

    async create(body: any) {
        try {
            console.log(body)
            body.password = await this.encryptPassword(body.password)
            console.log(body.password)
            console.log(body)
            let data = await User.create(body)
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error)
        }
    }


    async login(body: any) {
        let { username, password, flag } = body
        try {
            let findUser = await User.findOne({ where: { [Op.or]: [{ email: username }, { mobileNumber: username }] } })

            if (!findUser) {
                console.error("User dose not exist.")
            }
            else {
                let userData = {
                    userId: findUser.userId,
                    fullName: findUser.firstName.concat(findUser.lastName),
                    email: findUser.email,
                    role: findUser.role,
                    flag
                }
                let matchPassword = await bcrypt.compare(password, findUser?.password);
                if (matchPassword) {
                    let authToken = JWT.sign(
                        { payload: userData },
                        "dummy",
                        {
                            expiresIn: "1d",
                        }
                    );
                    if (flag == "web") {
                        await User.update({ webAuth: authToken }, { where: { userId: findUser?.userId } })
                    }
                    if (flag == "mobile") {
                        await User.update({ mobileAuth: authToken }, { where: { userId: findUser.userId } })
                    }
                    return Promise.resolve({ it_token: authToken, userId: findUser?.userId, role: findUser?.role })
                }
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }


    async logout(body: any) {
        try {
            let { authToken } = body
            let userId:any
            let flag:any
            if (authToken) {
                let JwtError = ['TokenExpiredError', 'jwt expired']
                JWT.verify(authToken,  "dummy",(err: any, decode: any) => {
                    if (err) {
                        return err
                    }   
        
                      userId=decode.payload.userId
                     flag=decode.payload.flag
                      delete decode.payload.userId
                       delete decode.payload.fullName,
                        delete decode.payload.lastName,
                        delete decode.payload.role,
                        delete decode.payload.email,
                        delete decode.payload.mobileNumber

                        console.log(decode)
                })

                if(userId!=undefined || userId !=null){
                    if(flag=="mobile"){
                        await User.update({mobileAuth:""},{where:{userId:userId}})
                    }
                    if(flag=="web"){
                        await User.update({webAuth:""},{where:{userId:userId}})
                    }
                }
            }
            return Promise.resolve({ message: "Successfully logout." })
        } catch (error) {
            return Promise.reject(error)
        }
    }



    async encryptPassword(password: any) {

        let dataValiadtion = [undefined, null, ""]
        if (dataValiadtion.includes(password)) {
            return true
        }
        else {
            const salt = bcrypt.genSaltSync(10)
            return bcrypt.hashSync(password, salt)
        }
    }
}

export default new UserService()