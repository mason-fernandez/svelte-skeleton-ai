import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import fs from 'fs/promises'
import path from 'path'

export const GET: RequestHandler = async () => {
    try {
        const staticDir = path.join(process.cwd(), 'static')
        const files = await fs.readdir(staticDir)
        
        // Filter for image files and exclude the thumbnails directory
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase()
            return ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext) && 
                   !file.startsWith('.') && 
                   file !== 'thumbnails'
        })

        return json({ images: imageFiles })
    } catch (error) {
        console.error('Error reading static directory:', error)
        return json({ images: [] }, { status: 500 })
    }
}