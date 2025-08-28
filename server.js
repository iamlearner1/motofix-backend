import express from 'express';
import cors from 'cors';
import { env } from './src/config/envConfig.js';
import { connectDB } from './src/config/db.js';
import { errorHandler } from './src/middleware/errorHandlerMiddleware.js';

// --- Route Imports ---
import authRoutes from './src/modules/auth/authRoutes.js';
import userRoutes from './src/modules/users/userRoutes.js';
import vehicleRoutes from './src/modules/vehicles/vehicleRoutes.js';
import locationRoutes from './src/modules/locations/locationRoutes.js';
import serviceRoutes from './src/modules/services/serviceRoutes.js';
import bookingRoutes from './src/modules/bookings/bookingRoutes.js';

const app = express();
const PORT = env.PORT || 8000;

// --- Core Middleware ---
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// --- Database Connection ---
connectDB();

// --- API Routes ---
const apiRouter = express.Router();
app.use('/api/v1', apiRouter);

apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/vehicles', vehicleRoutes);
apiRouter.use('/locations', locationRoutes);
apiRouter.use('/services', serviceRoutes);
apiRouter.use('/bookings', bookingRoutes);

// --- Health Check Route ---
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'MotoFix API is running!' });
});

// --- Centralized Error Handler ---
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});