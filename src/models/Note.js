import { v4 as generateID } from 'uuid';

export default class Note 
{
    constructor(type, content='', opacity=0.8) 
    {
        this.id = generateID()
        this.type = type
        this.content = content
        
        this.opacity = opacity

        this.x = 0
        this.y = 0
        this.width = 230
        this.height = 230

        this.offsetX = null
        this.offsetY = null

        this.pinned = false     // ЗАКРЕПЛЕНИЕ ЗАМЕТКИ
        this.drag = false       // ПЕРЕТАСКИВАНИЕ ЗАМЕТКИ  ЗАЧЕМ?
        this.moved = false      // БЫЛА ЛИ ПЕРЕМЕЩЕНА (ДЛЯ КЛИКОВ)
    }
}