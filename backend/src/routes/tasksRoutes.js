import express from 'express'
const router = express.Router()
import { getAllTasks,createTasks,deleteTasks,updateTasks} from '../controllers/tasksControllers.js';
//Lay tat ca danh sach cong viec
router.get('/',getAllTasks);
//Tao task moi 
router.post('/', createTasks);
//Update task
router.put('/:id',updateTasks);
//Xoa task
router.delete('/:id',deleteTasks);
export default router