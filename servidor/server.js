const express = require('express')
const inventario = require('../inventario.json')

const listarInventario = (req, res) => {
    res.send(inventario)
}

const listarEspecifico = (req, resp) => {
    const id = req.params.id
    let status = 0
    let itemEncontrado = null

    inventario.forEach((item) => {
        if (item.id == id) {
            item.status = 1
            itemEncontrado = item
            status = 1
        }
    })

    if (status == 1) {
        resp.send(itemEncontrado)
    } else {
        resp.status(404).send("Item não encontrado :( (Erro 404)")
    }
}

const atualizarInventario = (req, resp) => {
    const id = req.params.id
    const dados = req.body
    let status = 0

    inventario.forEach((item) => {
        if(item.id == id) {
            status = 1
            item.item = dados.item
            item.local = dados.local
            item.dataRegistro = dados.dataRegistro
            item.valor = dados.valor
            item.patrimonio = dados.patrimonio
        }
    })

    if(status == 1) {
        resp.send("Item atualizado com Sucesso !")
    } else {
        resp.status(404).send("Item não encontrado :(")
    }
}

const excluirItem = (req, resp) => {
    const id = req.params.id;
    let status = 0
    inventario.forEach((item, indice) => {
        if (item.id == id) {
            inventario.splice(indice, 1)
            status = 1
        }
    })

    if (status == 1) {
        resp.send("Item Excluido com Sucesso")
    } else {
        resp.status(404).send("Item não encontrado :(")
    }
}

const novoItem = (req, resp)=>{
    if(req.body){
        inventario.push(req.body)
        resp.send("Item adicionado com sucesso!")
    }else{
        resp.status(400).send("Erro ao adicionar item")
    }
}

const porta = 3000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.get("/inventario", listarInventario)
app.get("/inventario/:id", listarEspecifico)
app.put("/inventario/:id", atualizarInventario)
app.delete("/inventario/:id", excluirItem)
app.post("/inventario", novoItem)
app.listen(porta, () => {
    console.log(`Servidor http://127.0.0.1:${porta}`)
    console.log(`Cliente http://127.0.0.1:5500/inventario/`)
})