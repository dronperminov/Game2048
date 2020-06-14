function Field(canvas, n = 4) {
    this.canvas = canvas // запоминаем картинку
    this.n = n // запоминаем количество клеток на поле
    this.ctx = this.canvas.getContext("2d")

    this.cellSize = 100 // размер клетки
    this.size = this.cellSize * this.n // размер поля
    this.paddingTop = 10 // отсутп сверху
    this.paddingBottom = 10 // отступ снизу
    this.paddingHor = 10 // отсупы по бокам
    
    this.canvas.width = this.size + this.paddingHor * 2 // задаём ширину картинки
    this.canvas.height = this.size + this.paddingTop + this.paddingBottom // задаём высоту картинки

    this.fieldColor = "#bdaca0" // цвет поля
    this.colors = [ 
        "#cdc2b3", "#efe5da", "#ece0c8", "#f0b17d", "#f19867", "#f07e63",
        "#f46141", "#eacf78", "#edcd66", "#ecc75b", "#e8c256", "#e9be4c",
    ]

    this.InitCells() // создаём клетки
    this.AddCell(1) // добавляем двойку
    this.AddCell(Math.random() < 0.75 ? 1 : 2) // добавляем 2 или 4
}

// инициализация ячеек
Field.prototype.InitCells = function() {
    this.cells = []

    for (let i = 0; i < this.n; i++) {
        this.cells[i] = []

        for (let j = 0; j < this.n; j++)
            this.cells[i][j] = 0
    }
}

// добавление новой клетки на поле
Field.prototype.AddCell = function(value) {
    let availablePoints = [] // список пустых клеток

    for (let i = 0; i < this.n; i++)
        for (let j = 0; j < this.n; j++)
            if (this.cells[i][j] == 0) // если клетка пустая
                availablePoints.push({ i: i, j: j }) // добавляем её

    if (availablePoints.length == 0)
        return false // нельзя добавить элемент

    let point = availablePoints[Math.floor(Math.random() * availablePoints.length)]
    this.cells[point.i][point.j] = value // добавляем ячейку
    return true // добавление было
}

// отрисовка одной ячееки
Field.prototype.DrawCell = function(i, j) {
    let value = this.cells[i][j]
    let x = this.paddingHor + j * this.cellSize
    let y = this.paddingTop + i * this.cellSize

    this.ctx.fillStyle = this.colors[value]
    this.ctx.fillRect(x + 3, y + 3, this.cellSize - 6, this.cellSize - 6)
    
    if (value == 0)
        return

    this.ctx.fillStyle = value < 3 ? this.fieldColor : "#fff"
    this.ctx.fillText(1 << value, x + this.cellSize / 2, y + this.cellSize / 2)
    this.ctx.fillRect(x + this.cellSize / 2 - 2, y + this.cellSize / 2 - 2, 4, 4)
}

// отрисовка ячеек
Field.prototype.DrawCells = function() {
    this.ctx.font = this.cellSize / 1.8 +"px Arial"
    this.ctx.textAlign = "center"
    this.ctx.textBaseline = "middle"

    for (let i = 0; i < this.n; i++)
        for (let j = 0; j < this.n; j++)
            this.DrawCell(i, j)
}

// отрисовка поля
Field.prototype.Draw = function() {
    this.ctx.beginPath()
    this.ctx.strokeStyle = "#000"
    this.ctx.fillStyle = this.fieldColor
    this.ctx.rect(this.paddingHor, this.paddingTop, this.size, this.size)
    this.ctx.stroke()
    this.ctx.fill()

    this.DrawCells()
}