'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(191),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(191),
        allowNull: true
      },
      number: {
        type: Sequelize.STRING(191),
        allowNull: true
      },
      password: {
        type: Sequelize.STRING(191),
        allowNull: true
      },
      rolId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'rols', // Nombre de la tabla de roles
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },  
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: true, 
        references: {
          model: 'groupsTable', // Nombre de la tabla de grupos
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      token: {
        type: Sequelize.STRING(191),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
