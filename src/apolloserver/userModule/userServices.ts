import { BaseClass } from '../../base/baseclass';
import { profileUpdateInput } from '../../types';
import emailHelper from '../../utilities/emailHelper';
import { createUser } from './dto/createUser.dto';
import userRepository, { UserRepository } from './userRepository';
import { User } from './userSchema';

class UserService extends BaseClass {
  private repository: UserRepository;
  constructor(userRepository: UserRepository) {
    super();
    this.repository = userRepository;
  }

  async createUser(user: createUser) {
    this.logger.info('create user service called');
    await this.repository.createUser(user);
    emailHelper.addEmailToQueqe({
      email: 'nitesh.chaurasiya@antiersolutions.com',
      subject: 'Registeration',
      context: 'i am sending email',
    });
  }

  async getUser(id: number): Promise<User> {
    const user = await this.repository.findUserById(id);
    return user;
  }

  async updateUser(profileData: profileUpdateInput) {
    const profiledata = await this.repository.updateUserProfile(profileData);
    // if created then send email, if failed revert the transaction
    return profileData;
  }
}

export default new UserService(userRepository);
