import { Repository } from '../../base/baseRepository';
import { User } from './userSchema';
import { profileUpdateInput } from '../../types';
import { createUser } from './dto/createUser.dto';

function logMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  console.log('original methods',originalMethod)
  descriptor.value = function (...args: any[]) {
    console.log(
      `Calling ${propertyKey} with arguments: ${JSON.stringify(args)}`
    );
    const result = originalMethod.apply(this, args);
    console.log(`Result of ${propertyKey}: ${result}`);
    return result;
  };

  return descriptor;
}

 function logMethods(target: any) {
  // Get all property names of the class prototype
  console.log(target.prototype, Object.getOwnPropertyNames(target.prototype));
  const propertyNames = Object.getOwnPropertyNames(target.prototype);
  for (const propertyName of propertyNames) {
    const descriptor = Object.getOwnPropertyDescriptor(
      target.prototype,
      propertyName
    );

    console.log("descriptor",descriptor)

    // Check if the property is a method and not the constructor
    if (
      descriptor &&
      typeof descriptor.value === 'function' &&
      propertyName !== 'constructor'
    ) {
      Object.defineProperty(
        target.prototype,
        propertyName,
        logMethod(target.prototype, propertyName, descriptor)
      );
    }
  }
}

@logMethods 
export class UserRepository extends Repository {
  async createUser(user: createUser) {
    let newuser = new User();
    newuser.email = user.email;
    newuser.password = user.password;
    await newuser.save();
    return newuser;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.query(
      `SELECT *  from user where email="${email}";`
    );
    return user[0];
  }

  async findUserById(id: number, all = true): Promise<User> {
    console.log('id fro', id);
    let user;
    if (all) {
      // return address, profile and all details of users
      user = await this.query(
        `SELECT *  from user left join profile ON profile.user_id=user.id where user.id="${id}";`
      );
      console.log('inside all');
    } else {
      user = await this.query(`SELECT *  from user where id="${id}";`);
    }
    return user[0];
  }

  async updateUserProfile(profileUpdateInput: profileUpdateInput) {
    //@ts-ignore
    const data = [
      profileUpdateInput.f_name,
      profileUpdateInput.l_name,
      profileUpdateInput.age,
      profileUpdateInput.description,
      profileUpdateInput.user_id,
    ];
    const query = `INSERT INTO profile(f_name,l_name,age,description,user_id) values(?,?,?,?,?) ON DUPLICATE KEY UPDATE f_name=VALUES(f_name),l_name=VALUES(l_name),age=VALUES(age),description=VALUES(description);`;
    const result = await this.paramaterizedQuery(query, data);
    console.log('resultgf', result);
    return data;
  }
}

export default new UserRepository();
