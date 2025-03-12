const Customer = require("../models/Customer");

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Add new customer
const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding customer" });
  }
};

// Update customer
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Customer.update(req.body, {
      where: { id },
      returning: true
    });
    if (updated === 0) return res.status(404).json({ error: "Customer not found" });
    const customer = await Customer.findByPk(id);
    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating customer" });
  }
};

// Delete customer
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    await customer.destroy();
    res.json({ message: "Customer deleted", deletedCustomer: customer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting customer" });
  }
};

module.exports = { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer };