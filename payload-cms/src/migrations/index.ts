import * as migration_20261026_204415_initial from './20261026_204415_initial';
import * as migration_20261026_210816_users_sso from './20261026_210816_users_sso';

export const migrations = [
  {
    up: migration_20261026_204415_initial.up,
    down: migration_20261026_204415_initial.down,
    name: '20261026_204415_initial',
  },
  {
    up: migration_20261026_210816_users_sso.up,
    down: migration_20261026_210816_users_sso.down,
    name: '20261026_210816_users_sso'
  },
];
