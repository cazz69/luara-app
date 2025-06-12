// index.js
const authRoutes = require('./routes/auth.routes');
const authMiddleware = require('./middlewares/auth.middleware');

app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes); // protegido

const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
require('dotenv').config();

// Middlewares
app.use(express.json());

// Rotas da aplicação
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

// Rota principal (homepage)
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

