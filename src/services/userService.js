const User = require('../models/User');

class UserService {
  async getAllUsers() {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  async createUser(userData) {
    try {
      return await User.create(userData);
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  async updateUser(id, userData) {
    try {
      const [updatedRowsCount, updatedUsers] = await User.update(userData, {
        where: { id },
        returning: true
      });

      if (updatedRowsCount === 0) {
        const error = new Error('User not found');
        error.name = 'NotFoundError';
        throw error;
      }

      return updatedUsers[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        const error = new Error('User not found');
        error.name = 'NotFoundError';
        throw error;
      }

      await user.destroy();
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();