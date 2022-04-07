/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('client', (table) => {
    table.string('numCompte').primary();
    table.string('nomClient').notNullable();
    table.integer('solde').notNullable();
    })
    .createTable('user', (table) => {
      table.string('username').primary();
      table.string('user_id');
      table.string('name');
      table.string('password');
      table.string('type');
    })
    .createTable('versement', (table) => {
      table.increments('numVersement');
      table.string('numCheck');
      table.string('numCompte');
      table.integer('montant');
      table.date('date');
      table.foreign('numCompte').references('client.numCompte').onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('retrait', (table) => {
      table.increments('numRetrait');
      table.string('numCheck');
      table.string('numCompte');
      table.integer('montant');
      table.date('date');
      table.foreign('numCompte').references('client.numCompte').onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('audit_operation', (table) => {
      table.increments('id');
      table.string('ops');
      table.date('date');
      table.string('numCheck');
      table.string('numCompte');
      table.integer('montant');
      table.string('username');
    })
    .createTable('audit_retrait', (table) => {
      table.increments('id');
      table.string('ops');
      table.date('date');
      table.string('numRetrait');
      table.string('numCompte');
      table.integer('anc_montant');
      table.integer('n_montant');
      table.string('username');
    })
    .createTable('audit_versement', (table) => {
      table.increments('id');
      table.string('ops');
      table.date('date');
      table.string('numVersement');
      table.string('numCompte');
      table.integer('anc_montant');
      table.integer('n_montant');
      table.string('username');
    })
    .createTable('audit_compte', (table) => {
      table.increments('id');
      table.string('ops');
      table.date('date');
      table.string('numCompte');
      table.integer('anc_solde');
      table.integer('n_solde');
      table.string('username');
    })

  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
return knex.schema 
           .dropTable('user')
           .dropTable('versement')
           .dropTable('retrait')
           .dropTable('client')
           .dropTable('audit_operation')
           .dropTable('audit_retrait')
           .dropTable('audit_versement')
           .dropTable('audit_compte');
};
