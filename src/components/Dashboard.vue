<template>
    <div class="dashboard">
        <h1>Мои доски</h1>
        <div class="dashboard-list">

            <div v-for="(board, index) in boards" :key="index" :id="board.id" class="board" @click="openBoard(index,$event)">
                <span class="notes-count">Заметок: {{ board.notes.length }}</span>
                <textarea v-model="board.name" @input="updateStorage()" class="title"></textarea>
                <div class="btn-del" @click.stop="deleteBoard(boards[index].id)">
                    <img src="../assets/images/del.png">
                </div>
            </div>

            <div class="btn-add" @click="createBoard()">
                <div class="btn-add-background"></div>
                <span>+</span>
            </div>
        </div>
    </div>

</template>

<script>

    export default
    {
        props:
        {
            boards:
            {
                type: Array,
                required: true,
            },
            createBoard:
            {
                type: Function,
                required: true,
            },
            openBoard:
            {
                type: Function,
                required: true,
            },
            deleteBoard:
            {
                type: Function,
                required: true,
            },
            updateStorage:
            {
                type: Function,
                required: true,
            }
        }
    }
</script>

<style scoped>
    *
    {
        /* outline: 1px dashed black; */
    }
    .dashboard
    {
        padding: 10vw 100px;
    }

    h1
    {
        margin-bottom: 18px;
    }

    .dashboard-list
    {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    }

    .board
    {
        position: relative;
        border: 1px solid black;
        cursor: alias;
        flex-grow: 1;
        min-width: 340px;
        height: 210px;
        border-radius: 8px;

        padding:20px;
        background-color: var(--note-blue);
    }
    .btn-add
    {
        position: relative;
        border: 1px solid black;
        cursor: pointer;
        height: 210px;
        border-radius: 8px;

        display: flex;
        justify-content: center;
        align-items: center;
        padding:20px;
        font-size: 48px;
    }
    .btn-add-background
    {
        transition: .3s ease;

        z-index: -1;
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
        background-image: radial-gradient(circle, #c5c5c5 1px, transparent 1px);
        background-size: 10px 10px;
        opacity: 0;
    }
    .btn-add:hover .btn-add-background
    {
        opacity: 1;
    }
    .board textarea::-webkit-scrollbar
    {
        display: none;
    }
    .board .title
    {
        width: 100%;
        font-size: 24px;
        border: none;
        resize: none;
        outline: none;
        background-color: transparent;
        overflow-wrap: break-word;
        word-break: break-word;
    }
    .board .notes-count
    {
        text-align: left;
        font-size: 14px;
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: rgba(0,0,0,0.4);
    }
    .board:hover .btn-del
    {
        display: flex;
    }
    .btn-del
    {
        z-index: 1;
        cursor: pointer;
        background-color: #222;
        padding: 8px 8px;
        border-radius: 6px;
        position: absolute;
        top: 10px;
        right: 10px;

        display: none;
        justify-content: center;
        align-items: center;
    }

</style>
