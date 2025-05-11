import Message from '../models/message.model.js';
import Project from '../models/project.model.js';

export const createMessage = async ({ projectId, senderId, content, fileTree = null }) => {
    try {
        const message = new Message({
            projectId,
            sender: senderId,
            content,
            fileTree
        });
        
        await message.save();
        
        // Update the project's updatedAt timestamp
        await Project.findByIdAndUpdate(projectId, { updatedAt: new Date() });
        
        return await message.populate('sender', 'email name');
    } catch (error) {
        throw new Error(`Failed to create message: ${error.message}`);
    }
};

export const getMessagesByProjectId = async (projectId) => {
    try {
        return await Message.find({ projectId })
            .populate('sender', 'email name')
            .sort({ createdAt: 1 });
    } catch (error) {
        throw new Error(`Failed to get messages: ${error.message}`);
    }
};

export const deleteMessagesByProjectId = async (projectId) => {
    try {
        await Message.deleteMany({ projectId });
        return { success: true };
    } catch (error) {
        throw new Error(`Failed to delete messages: ${error.message}`);
    }
};