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

// Após isso, rode:
// npx prisma generate
// npx prisma migrate dev --name add-roles
