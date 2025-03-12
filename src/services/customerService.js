const Customer = require('../models/Customer');

class CustomerService {
  async getAllCustomers() {
    try {
      return await Customer.findAll();
    } catch (error) {
      throw new Error('Error fetching customers: ' + error.message);
    }
  }

  async getCustomerById(id) {
    try {
      const customer = await Customer.findByPk(id);
      if (!customer) {
        const error = new Error('Customer not found');
        error.name = 'NotFoundError';
        throw error;
      }
      return customer;
    } catch (error) {
      throw error;
    }
  }

  async createCustomer(customerData) {
    try {
      return await Customer.create(customerData);
    } catch (error) {
      throw new Error('Error creating customer: ' + error.message);
    }
  }

  async updateCustomer(id, customerData) {
    try {
      const [updated] = await Customer.update(customerData, {
        where: { id },
        returning: true
      });
      if (updated === 0) {
        const error = new Error('Customer not found');
        error.name = 'NotFoundError';
        throw error;
      }
      return await Customer.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteCustomer(id) {
    try {
      const customer = await Customer.findByPk(id);
      if (!customer) {
        const error = new Error('Customer not found');
        error.name = 'NotFoundError';
        throw error;
      }
      await customer.destroy();
      return customer;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CustomerService();