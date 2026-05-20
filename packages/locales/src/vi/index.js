import merge from 'lodash/merge';

import action from './action';
import activity from './activity';
import core from './core';
import error from './error';
import login from './login';

export default {
  language: 'vi',
  country: 'vn',
  name: 'Tiếng Việt',
  embeddedLocale: merge(action, activity, core, error, login),
  flags: ['VN'],
};
