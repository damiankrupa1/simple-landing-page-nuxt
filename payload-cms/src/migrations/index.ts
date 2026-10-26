import * as migration_20261026_204415_initial from './20261026_204415_initial';

export const migrations = [
  {
    up: migration_20261026_204415_initial.up,
    down: migration_20261026_204415_initial.down,
    name: '20261026_204415_initial'
  },
];
