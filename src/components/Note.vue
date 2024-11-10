<template>

    <div 
    :class="['note', note.type, { active: activeNote }]"
    :style="{width:`${note.width}px`, height:`${note.height}px`, top:`${note.y}px`,left:`${note.x}px`, opacity:note.opacity}"
    @mousedown="actionNote($event)">

    <textarea 
    placeholder="Пустая заметка" 
    spellcheck="false" 
    :id="note.id" 
    :style="
    {
        pointerEvents:note.drag?'none':'auto'
    }" 
    v-model="note.content"
    v-bind:readonly="!editNote" 
    @input="saveContent"></textarea>
        <div class="note-buttons" :style="{opacity:editNote?1:0, pointerEvents:editNote?'auto':'none'}">
			<img src="../assets/images/pin.png" @click="pinNote()">
			<img src="../assets/images/del.png" @click="deleteHandler(note.id)">
		</div>
		<div class="pinned" ref="sticker" :style="{opacity:note.pinned?1:0}"></div>
    </div>
   
</template>

<script>
    export default
    {
        props:
        {
            note:
            {
                type: Object,
                required: true,
            },
            deleteNote:
            {
                type: Function,
                required: true,
            },
            updateNote:
            {
                type: Function,
                required: true,
            }
        },
        data()
        {
            return{
                editNote: false,   
                activeNote: false,
            }
        },
        methods:
        {
            deleteHandler(noteID)
            {
                this.deleteNote(noteID)
                this.activeNote = false
            },
            actionNote(event)
            {
                this.activeNote = true
                this.note.offsetX = event.offsetX
                this.note.offsetY = event.offsetY

                const mousemoveNote = (event) => 
                {
                    if(!this.editNote && !this.note.pinned)
                    {
                        this.note.drag = true
                        this.note.moved = true
                        this.note.x = event.pageX - this.note.offsetX
                        this.note.y = event.pageY - this.note.offsetY
                    }
                }
                
                const mouseupNote = () => 
                {
                    if(!this.note.moved)
                    {
                        this.editNote = true
                    }
                    this.note.drag = false
                    this.note.moved = false
                    this.updateNote()
                    window.removeEventListener('mousemove', mousemoveNote)
                    window.removeEventListener('mouseup', mouseupNote)
                }

                document.addEventListener('mousedown', this.cancelActive)
                window.addEventListener('mousemove', mousemoveNote)
                window.addEventListener('mouseup', mouseupNote)
            },
            pinNote()
            {
                this.note.pinned = !this.note.pinned
                this.updateNote()
            },
            saveContent()    
            {
                this.updateNote()
            },
            cancelActive(event)
            {
                const noteIdSelector = `#${CSS.escape(this.note.id)}`
                const buttonsSelector = '.note-buttons'

                if (!event.target.closest(noteIdSelector) && !event.target.closest(buttonsSelector))
                {
                    this.clearStateNote(this.note)
                    document.removeEventListener('mousedown', this.cancelActive)
                }
            },
            clearStateNote(note)
            {
                this.activeNote = false
                this.editNote = false
                note.drag = false
                note.moved = false
            },
        }
    }
</script>

<style scoped>
    .note
    {
        position: absolute;
    }
    .note textarea::-webkit-scrollbar
    {
        display: none;
    }
    .note textarea
    {
        transition: .2s ease;
        cursor: pointer;
        padding: 20px;
        color: black;
        width: 100%;
        height: 100%;
        background-color: transparent;

        outline: none;
        border: none;
        resize: none;
    }
    .active textarea
    {
        box-shadow: 0px 20px 20px 0px rgba(0,0,0,0.1)
    }

    .note-buttons
    {
        transition: .2s ease-out;
        display: flex;
        align-items: center;

        padding: 6px 8px;
        gap: 12px;
        background-color: #222;
        border-radius: 6px;

        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%,calc(-100% - 10px));
        z-index: 1;
    }
    .note-buttons img
    {
        cursor: pointer;
    }
    .pinned
    {
        transition: .2s ease-out;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%,calc(-50% - 7px));

        width: 120px;
        height: 30px;
        background-color: #DBCDFF;
        border: 3px solid white;
    }
    .active .note-buttons
    {
        display: flex;
    }
</style>
