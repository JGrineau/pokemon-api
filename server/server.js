require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const db = require('./config/database');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: flase}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// Test database connection
db.getConnection()
  .then(connection => {
    console.log('Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

  // app.get('/', (req, res) => {
  //   db.query("INSERT INTO signup (name, email, password) VALUES ('John Doe', 'lU2XK@example.com', 'password123')", (err, results) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(results)
  //     }
  //   })
  // });

  app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const [results] = await db.query("INSERT INTO signup (username, email, password) VALUES (?, ?, ?)", [username, email, password]);
      console.log(results);
      res.send({username: username});
    } catch (err) {
      console.error(err);
      res.status(500).send('Error inserting user');
    }
  });

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
