
import userServices from './userServices'


export const updateProfile=async(_parent:any,data:any,context:any)=>{
   console.log('data for ',data)
  return await userServices.updateUser(data.profileInput);
}