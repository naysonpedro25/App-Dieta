import IUser from '../entity/UserInterface'
import {User} from '@prisma/client'
import {UserRepository} from '../repository/UserRepository'

export class UserService {

    repo: UserRepository;

    constructor() {

        this.repo = UserRepository.getUserRepository();
    }

    async create(user: IUser): Promise<IUser | null | undefined> {
        try {
            return await this.repo.createUser(user as User)
        } catch (err) {
            console.log(err);
        }
    }

    async findUserByEmail(email: string): Promise<IUser | null | undefined> {
        try {
            return this.repo.findUserByEmail(email);
        } catch (err) {
            console.log(err);
        }
    }


}