import {PathEnv} from '@general/environments/models';

export interface ConnectionLibEnv extends PathEnv {
  connection: {
    api: any;
  };
}
export const dev: ConnectionLibEnv = {
  basePath: 'connection',
  connection: {
    api: null,
  },
};

export const prod: ConnectionLibEnv = {
  basePath: 'connection',
  connection: {
    api: null,
  },
};
