import * as migration_20261026_204415_initial from './20261026_204415_initial';
import * as migration_20261026_210816_users_sso from './20261026_210816_users_sso';
import * as migration_20261027_195756_s3_storage from './20261027_195756_s3_storage';
import * as migration_20261028_105229_globals from './20261028_105229_globals';

export const migrations = [
  {
    up: migration_20261026_204415_initial.up,
    down: migration_20261026_204415_initial.down,
    name: '20261026_204415_initial',
  },
  {
    up: migration_20261026_210816_users_sso.up,
    down: migration_20261026_210816_users_sso.down,
    name: '20261026_210816_users_sso',
  },
  {
    up: migration_20261027_195756_s3_storage.up,
    down: migration_20261027_195756_s3_storage.down,
    name: '20261027_195756_s3_storage',
  },
  {
    up: migration_20261028_105229_globals.up,
    down: migration_20261028_105229_globals.down,
    name: '20261028_105229_globals'
  },
];
