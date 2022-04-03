/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('client', (table) => {
    table.increments('id');
    table.string('nom').notNullable();
    table.string('prenom');
    table.integer('solde').notNullable();
    })
    .createTable('versement', (table) => {
      table.increments('num_versement');
      table.string('num_cheque');
      table.string('num_compte');
      table.integer('montant');
    })
    .createTable('retrait', (table) => {
      table.increments('num_retrait');
      table.string('num_cheque');
      table.string('num_compte');
      table.integer('montant');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
return knex.schema 
           .dropTable('client')
           .dropTable('versement')
           .dropTable('retrait');
};
