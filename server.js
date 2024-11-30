const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // или указание конкретных доменов
  methods: 'GET,POST,PUT,DELETE',
}));
app.use(express.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Пример маршрута для регистрации
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // Логика регистрации (создание пользователя в базе данных)
  res.send({ message: 'User registered successfully!' });
});

// Обслуживание статических файлов (фронтенд)
app.use(express.static(path.join(__dirname, 'public')));

// Обработка всех маршрутов (отдача фронтенда)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});