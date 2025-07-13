import express from 'express';
import router from './routes/app.js';
import errorHandler from './middleware/errorHandler.middleware.js';
import templateEngineConfis from './config/templateEngine.config.js';
import 'dotenv/config';
import { connectDB } from './config/db.config.js'; 

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', router);
templateEngineConfis(app);
app.use(errorHandler);

(async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
})();
