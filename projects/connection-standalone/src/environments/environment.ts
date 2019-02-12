import {commonEnv} from '@general/environements/env.common';
import {connectionEnv} from '@general/environements/env.connection';

export const environment = {
  ...commonEnv.dev,
  ...connectionEnv.dev,
};
