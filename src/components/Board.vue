<template>

    <div class="board-wrapper">
        <div class="board">
            <div class="menu-wrapper">
                <div class="menu">
                    <div class="btn-back" @click="backToDashboard()">Назад</div>
                </div>
                <div class="menu">
                    <div class="menu-item note-red" @click="createNote('note-red',$event)"></div>
                    <div class="menu-item note-blue" @click="createNote('note-blue',$event)"></div>
                    <div class="menu-item note-yellow" @click="createNote('note-yellow',$event)"></div>
                </div>
            </div>
        </div>
        <Note 
            v-for="(note, index) in board.notes" 
            :key="index" 
            :note="note" 
            :updateNote="updateNote"
            :deleteNote="deleteNote"/>
    </div>

</template>

<script>
    import NoteModel from '../models/Note.js'
    import Note from './Note.vue'

    export default
    {
        components: { Note },
        props:
        {
            board:
            {
                type: Object,
                required: true,
            },
            backToDashboard:
            {
                type: Function,
                required: true,
            },
            updateStorage:
            {
                type: Function,
                required: true,
            },
        },
        methods:
        {
            createNote(type,event)
            {
                const note = new NoteModel(type)
                note.x = event.pageX - note.width/2
                note.y = event.pageY - note.height/2
                this.board.notes.push(note)
                const n = this.board.notes.at(-1)

                const moveNewNote = (event) => 
                {
                    n.x = event.pageX - n.width/2
                    n.y = event.pageY - n.height/2
                }

                const setNewNote = (event) => 
                {
                    window.removeEventListener('mousemove', moveNewNote)
                    window.removeEventListener('mouseup', setNewNote)
                    n.opacity = 1
                    this.updateStorage()
                }

                window.addEventListener('mousemove', moveNewNote)
                window.addEventListener('mouseup', setNewNote)
            },
            updateNote()
            {
                this.updateStorage()
            },
            deleteNote(deleteID)
            {
                this.board.notes = this.board.notes.filter(note => note.id !== deleteID);
                this.updateStorage()
            }  
        },
    }
</script>

<style scoped>
    *
    {
        /* outline: 1px dashed black; */
    }

    .board-wrapper
    {
        width: 100vw;
        height: 100vh;
        background-color: white;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .board
    {
        position: relative;
        width: calc(100vw - var(--board-margin) - var(--board-margin));
        height: calc(100vh - var(--board-margin) - var(--board-margin));
        border-radius: 20px;

        background-color: #F6F6F6;
        background-image: radial-gradient(circle, #D9D9D9 2px, transparent 2px);
        background-size: 20px 20px;
        box-shadow: 0px 4px 20px 10px #00000017;
    }
    .menu-wrapper
    {
        z-index: 1;
        position: absolute;
        left: 32px;
        bottom: 32px;
        display: flex;
        gap: 20px;
    }
    .menu
    {
        background-color: #FAFAFA;
        border: 1px solid #D9D9D9;
        padding: 16px 24px;
        border-radius: 10px;

        display: flex;
        gap: 20px;
    }
    .menu-item
    {
        transition: .2s ease;
        cursor: pointer;
        width: 34px;
        height: 34px;
    }
    .menu-item:hover, .btn-back:hover
    {
        transform: translateY(-2px);
    }
    .btn-back
    {
        transition: .2s ease;

        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #222;
    }
</style>
