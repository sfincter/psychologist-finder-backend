const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Импорт маршрутов
const authRoutes = require('./routes/auth');

// Создание приложения
const app = express();

// Настройка CORS
app.use(cors({
    origin: 'https://ваш-домен.netlify.app', // Замените на URL вашего фронтенда
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Если нужны куки или авторизация
}));

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

app.use((err, req, res, next) => {
  console.error(err.stack); // Логи в консоль Railway
  res.status(500).send('Something broke!');
});

