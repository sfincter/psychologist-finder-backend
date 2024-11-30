const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Импорт маршрутов
const authRoutes = require('./routes/auth');

// Создание приложения
const app = express();

// Мидлвэры
app.use(cors());
app.use(bodyParser.json());

// Подключение маршрутов
app.use('/auth', authRoutes);

// Обработка ошибок для несуществующих маршрутов
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/psychologists', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Запуск сервера
app.listen(5000, () => console.log('Server is running on port 5000'));
