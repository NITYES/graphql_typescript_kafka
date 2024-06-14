import { BaseClass } from '../../base/baseclass';
import { createJwtToken } from '../../utilities/jwt';
import userRepository, { UserRepository } from '../userModule/userRepository';
import { User } from '../userModule/userSchema';


class AuthService extends BaseClass {

  private repository: UserRepository;
  constructor(userRepository: UserRepository) {
    super();
    this.repository = userRepository;
  }

  async login(email:string,password:string):Promise<{token: string,user: User}>{
    // find user 
    const user=await this.repository.findUserByEmail(email);
    if(!user) throw new Error('User not found')
    if(user?.password !== password) throw new Error('Invalid Password');
    const token= await createJwtToken({email,id:user.id})
    return {token,user}
  }

 
}

export default new AuthService(userRepository);
