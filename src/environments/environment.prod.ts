import * as common from '@general/environments/env.common';
import * as connection from '@general/environments/env.connection';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  ...common.prod,
  connection: connection.prod,
};
