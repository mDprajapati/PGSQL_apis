const pool = require("../config/db");

// ✅ GET all users
const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ POST: Add new user
const createUser = async (req, res) => {
  const { username, email, age } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (username, email, age) VALUES ($1, $2, $3) RETURNING *",
      [username, email, age]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding user" });
  }
};

// ✅ PUT: Update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, age } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET username = $1, email = $2, age = $3 WHERE id = $4 RETURNING *",
      [username, email, age, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating user" });
  }
};

// ✅ DELETE: Remove user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted", deletedUser: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
