import { Router } from 'express';
import { body } from 'express-validator';
import * as messageController from '../controllers/message.controller.js';
import * as authMiddleWare from '../middleware/auth.middleware.js';

const router = Router();

// Create a new message
router.post('/:projectId/create',
    authMiddleWare.authUser,
    [
        body('content').optional().isString().withMessage('Content must be a string'),
        body('fileTree').optional().isObject().withMessage('File tree must be an object')
    ],
    messageController.createMessage
);

// Get all messages for a project
router.get('/:projectId',
    authMiddleWare.authUser,
    messageController.getMessages
);

// Delete all messages for a project
router.delete('/:projectId',
    authMiddleWare.authUser,
    messageController.deleteMessages
);

export default router;