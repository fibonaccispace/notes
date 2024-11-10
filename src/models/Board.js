import { v4 as generateID } from 'uuid';

export default class Board 
{
    constructor(name) 
    {
        this.id = generateID()
        this.name = name
        this.notes = []
    }
}