import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const protect = require('static-auth');
const safeCompare = require('safe-compare');

const USER_NAME = 'user';
const PASSWORD = 'password';

const app = protect(
  '/',
  (username, password) => {
    return safeCompare(username, USER_NAME) && safeCompare(password, PASSWORD)
  },
  {
    directory: `${ __dirname }/public`,
    onAuthFailed: (res) => {
      res.end('Authentication failed.')
    },
  }
);

module.exports = app;