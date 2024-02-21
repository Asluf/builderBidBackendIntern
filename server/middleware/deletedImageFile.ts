import fs from 'fs';

export const deleteUploadedFile = async (filePath: string) => {
    try {
      await fs.unlinkSync(filePath);
    } catch (error) {
      console.error('Error deleting uploaded file:', error);
    }
};