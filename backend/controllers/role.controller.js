// controllers/role.controller.js
const prisma = require('../prisma/client');

exports.getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roles.' });
  }
};

exports.createRole = async (req, res) => {
  const { name } = req.body;
  if (!name || !/^[A-Za-z]+$/.test(name)) {
    return res.status(400).json({ error: 'Role name is required and must contain only letters.' });
  }

  try {
    const role = await prisma.role.create({ data: { name } });
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: 'Role name must be unique.' });
  }
};
