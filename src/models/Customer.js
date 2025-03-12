const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bill_to_customer_code: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  bill_to_customer_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ar_ac_nbr: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  bill_currency: {
    type: DataTypes.STRING(3),
    allowNull: true
  },
  business_reg_nbr: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  tax_reg_nbr: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  tax_office: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  contact_person: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  tel_nbr: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  fax_nbr: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  billing_address1: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  billing_address2: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  billing_address3: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  postal_code: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  payment_term_code: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'customers',
  timestamps: false
});

module.exports = Customer;