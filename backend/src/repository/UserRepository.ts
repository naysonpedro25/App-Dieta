import { PrismaClient, User} from "@prisma/client"

export class UserRepository{
    private db : PrismaClient;
    constructor(){
        this.db = new PrismaClient();
    }
    
    async createUser(dataUser : User): Promise<User> {
        const newUser = await this.db.user.create({data: dataUser})
        return newUser;
    }

    async findUserByEmail(email: string): Promise<User | null >{
        const userWithEmail = await this.db.user.findUnique({where: {email: email}});
        return userWithEmail;
    }

    async getAllUsers() {
        const allUsers = await this.db.user.findMany();
        return allUsers;
    }


}