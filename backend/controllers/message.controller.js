import * as messageService from '../services/message.service.js';
import { validationResult } from 'express-validator';

export const createMessage = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { content, fileTree } = req.body;
        const projectId = req.params.projectId;
        const senderId = req.user._id;

        const message = await messageService.createMessage({
            projectId,
            senderId,
            content,
            fileTree
        });

        res.status(201).json({ message });
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const messages = await messageService.getMessagesByProjectId(projectId);
        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteMessages = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        await messageService.deleteMessagesByProjectId(projectId);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error deleting messages:', error);
        res.status(500).json({ error: error.message });
    }
};