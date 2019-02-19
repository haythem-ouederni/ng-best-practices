// importing jest-preset-angular is very important else we can have the following error
// TypeError: Cannot read property 'getComponentFromError' of null
import 'jest-preset-angular';
import './jestGlobalMocks'; // browser mocks globally available for every test
