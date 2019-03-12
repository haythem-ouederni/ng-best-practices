import {PathEnv} from './models';

export interface ConnectionLibEnv extends PathEnv {
  connection: {
    api: any;
  };
}
export const dev: ConnectionLibEnv = {
  basePath: 'connection',
  connection: {
    api: 'path-to-api/in/dev',
  },
};

export const prod: ConnectionLibEnv = {
  basePath: 'connection',
  connection: {
    api: 'path-to-api/in/prod',
  },
};
