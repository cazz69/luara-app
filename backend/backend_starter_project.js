/// Estrutura básica de backend usando Node.js + Express + Prisma (TypeScript opcional)

// index.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
require('dotenv').config();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);

module.exports = router;

// routes/role.routes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');

router.get('/', roleController.getRoles);
router.post('/', roleController.createRole);

module.exports = router;

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

// prisma/client.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;

// .env
DATABASE_URL="postgresql://luara:growagarden01%40root@31.97.64.221/petshop"

// prisma/schema.prisma
model Role {
  id    Int    @id @default(autoincrement())
  name  String @unique
  users User[]
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  roleId    Int
  role      Role     @relation(fields: [roleId], references: [id])
  createdAt DateTime @default(now())
}

// Após isso, rode:
// npx prisma generate
// npx prisma migrate dev --name add-roles
