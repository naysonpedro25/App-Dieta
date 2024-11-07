import { PrismaClient, User} from "@prisma/client"
import { getPrismaInstance } from "../PrismaInstance";
import UserDTO from '../DTOs/UserDTO'
export class UserRepository{

    private db : PrismaClient = getPrismaInstance();
    static userRepositorySingleton: UserRepository;
    
    static getUserRepository() {
    if (!this.userRepositorySingleton)this.userRepositorySingleton = new UserRepository();
        return this.userRepositorySingleton;
    }
    
    async createUser(user:UserDTO ): Promise<User | null > {
        return (await this.db.user.create({ data: (user as User) })) ;
    }

    async findUserByEmail(email: string): Promise<User | null >{
        return ( await this.db.user.findUnique({where: {email: email}}));

    }
    async findUserById(id: number): Promise<User | null>{
        return (await this.db.user.findUnique({where: {id: id}}));
        
    }

    async getAllUsers() {
        return  (await this.db.user.findMany());

    }


}