// controllers/user.controller.js
const prisma = require('../prisma/client');

function isAlpha(str) {
  return /^[A-Za-z]+$/.test(str);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ include: { role: true } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, roleId } = req.body;

  if (!name || !email || !roleId) {
    return res.status(400).json({ error: 'Name, email, and roleId are required.' });
  }

  if (!isAlpha(name)) {
    return res.status(400).json({ error: 'Name must contain only ASCII letters.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  try {
    const user = await prisma.user.create({
      data: { name, email, roleId },
      include: { role: true }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Invalid request or email already in use.' });
  }
};