import { GraphQLFormattedError } from "graphql";
import { QueryFailedError, TypeORMError } from "typeorm";


export function formatError(formatError:GraphQLFormattedError,error:any):any{
  //  console.log('format error', formatError, error,Object.entries(error) );
  //  console.log(formatError.message)
 if (error?.message.startsWith('QueryFailedError')) {
   console.log('typeorm error');
 }
 return formatError
}