import { ContextFunction } from '@apollo/server';

export interface ResolverArgument {
  parent: any;
  data: any;
  context: ContextFunction;
}

export type profileUpdateInput= {
  user_id: number;
  f_name: string;
  l_name: string;
  age: number;
  description: string;
}

// export type
