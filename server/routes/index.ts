// index.ts
import express, {Request,Response} from 'express';
import { router as userRoutes } from './UserRoutes'; // Import the named export

const router = express.Router();

router.get('/', function(req:Request, res:Response){    
    res.json({ message: "Welcome to API!" });
});

// Use the imported userRoutes
router.use('/user', userRoutes);

export { router };