<template>
    <Dashboard 
        v-if="actualBoard === null" 
        :createBoard="createBoard" 
        :openBoard="openBoard" 
        :deleteBoard="deleteBoard" 
        :updateStorage="updateStorage"
        :boards="boards"/>
    <Board 
        v-else 
        :board="getBoard(actualBoard)" 
        :backToDashboard="backToDashboard"
        :updateStorage="updateStorage"/>
</template>

<script>
    import NoteModel from './models/Note.js'
    import BoardModel from './models/Board.js'
    import Dashboard from './components/Dashboard.vue'
    import Board from './components/Board.vue'

    export default
    {
        components: { Dashboard, Board },
        data() 
        {
            return {
                boards: this.getBoards(),
                actualBoard: this.getActualBoard(),
            }
        },
        methods:
        {
            createBoard()
            {
                const board = new BoardModel('Название')
                this.boards.push(board)
                this.updateStorage()
            },
            openBoard(index, event)
            {
                if(event.target.id !== this.boards[index].id) return
                this.actualBoard = index
                localStorage.setItem('actualBoard', index)
            },
            deleteBoard(deleteID)
            {   
                this.boards = this.boards.filter(board => board.id !== deleteID)
                this.updateStorage()
            },
            backToDashboard()
            {
                this.actualBoard = null
                localStorage.setItem('actualBoard', null)
            },
            getBoard(index)
            {
                return this.boards[index]
            },
            getBoards()
            {
                const data = localStorage.getItem('boards')
                if(data) return JSON.parse(data)
                else 
                {
                    const boards = [new BoardModel('Студия Артемия Лебедева'), new BoardModel('Английский язык (обучение)')]

                    // СТУДИЯ
                    const noteDefault1_1 = new NoteModel('note-red')
                    noteDefault1_1.content = 'Хороший дизайнер управляет людьми с помощью своих произведений, плохому нужна плетка-семихвостка.\n\n\n\n\n\nКоводство. § 0'
                    noteDefault1_1.opacity = 1
                    noteDefault1_1.x = 200
                    noteDefault1_1.y = 90
                    const noteDefault1_2 = new NoteModel('note-blue')
                    noteDefault1_2.content = 'Виноват всегда дизайнер. Нет смысла его защищать, заказчик не обязан быть утонченным гурманом. Надо сказать спасибо, что заказчик не сам все нарисовал.\n\n\n\nКоводство. § 86'
                    noteDefault1_2.opacity = 1
                    noteDefault1_2.pinned = true
                    noteDefault1_2.x = 650
                    noteDefault1_2.y = 360
                    boards[0].notes.push(noteDefault1_1)
                    boards[0].notes.push(noteDefault1_2)

                    // АНГЛИЙСКИЙ
                    const noteDefault2_1 = new NoteModel('note-yellow')
                    noteDefault2_1.content = 'Слова и их перевод:\n- Appreciate — ценить, оценить\n- Challenge — вызов, трудность\n- Reputable — авторитетный, уважаемый\n- Complicated — сложный, запутанный\n- Occasionally — иногда, изредка'
                    noteDefault2_1.opacity = 1
                    noteDefault2_1.pinned = true
                    noteDefault2_1.x = 150
                    noteDefault2_1.y = 140
                    const noteDefault2_2 = new NoteModel('note-yellow')
                    noteDefault2_2.content = 'Фразы:\n- I look forward to — я с нетерпением жду (например: I look forward to meeting you)\n- Take care — береги себя (используется в конце письма или при прощании)\n- By the way — кстати (например: By the way, did you hear the news?)'
                    noteDefault2_2.opacity = 1
                    noteDefault2_2.x = 400
                    noteDefault2_2.y = 330
                    const noteDefault2_3 = new NoteModel('note-red')
                    noteDefault2_3.content = 'wear (носить)\nexactly (точно)\nparticularly (особенно)\nflavour (вкус)\ngenerous (щедрый)\nfaint (тошнит)\nin here (здесь)\nhere (сюда)\nnecessary (необходимо)\napologise (извиняться)'
                    noteDefault2_3.opacity = 1
                    noteDefault2_3.pinned = true
                    noteDefault2_3.x = 800
                    noteDefault2_3.y = 130
                    boards[1].notes.push(noteDefault2_1)
                    boards[1].notes.push(noteDefault2_2)
                    boards[1].notes.push(noteDefault2_3)

                    localStorage.setItem('boards', JSON.stringify(boards))
                    return boards
                }
            },
            getActualBoard()
            {
                const data = localStorage.getItem('actualBoard')
                return data === 'null' || data === null ? null : data
            },
            updateStorage()
            {
                localStorage.setItem('boards', JSON.stringify(this.boards))
            }
        }
    }
</script>

<style scoped>
   
</style>
