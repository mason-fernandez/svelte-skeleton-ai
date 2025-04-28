import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const staticDir = path.join(process.cwd(), 'static');
    
    try {
        const files = fs.readdirSync(staticDir);
        const imageFiles = files.filter(file => 
            file.match(/\.(png|jpg|jpeg|gif)$/i) && 
            !file.includes('favicon')
        );
        
        return json(imageFiles);
    } catch (error) {
        console.error('Error reading avatar images:', error);
        return json([]);
    }
}