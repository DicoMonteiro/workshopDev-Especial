// usei o express para criar e configurar o servidor
const express = require("express")
const server = express()

const db = require("./db")

// console.log (express)

// variavel ideas contendo uma lista de elementos(objetos), no caso ideias
// const ideas = [
//     {
//         title: "Cursos de Programação",
//         category: "Estudo",
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         title: "Exercícios",
//         category: "Saúde",
//         img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         title: "Meditação",
//         category: "Mentalidade",
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         title: "Karaokê",
//         category: "Diversão em família",
//         img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         title: "Pintura",
//         category: "Criatividade",
//         img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         title: "Recortes",
//         category: "Criatividade",
//         img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
//         url: "https://rocketseat.com.br"
//     }
// ]


// configurar os arquivos estáticos (css, scripts, imagens, etc) na qual o express consegue enxergar e executar os mesmos
server.use(express.static("public"))


// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))


// configuranco o nunjucks, que tem como função orquestrar as aplicacoes html para que o server consiga enxergar 
// e se comunicar com o back-end, o "view" é o mesmo nome dado a pasta no projeto para enxergar os arquivos html
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, //boolean - Server esse noCache para ficar limpando o mesmo na execução de desenvolvimento de uma aplicação
})

// criei uma rota /index
// e capturo o pedido do cliente para responder
server.get("/", function(request, response) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        // if (err) return console.log(err)
        if (err) {
            console.log(err)
            return response.send("Erro no bando de dados!")
        }

        const reversedIdeas = [...rows].reverse()
        let lastIdeas = []
        for (let idea of reversedIdeas){
        // console.log(idea)
        // length é a quantiadde de itens dentro da variavel
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }
        return response.render("index.html", {ideas: lastIdeas})
    })

    // os ... denomina que o conteudo de "ideas" vai ser inserida em algum lugar na variavel "reverseIdeas" colocando os ultimos para serem os primeiros
    // const reversedIdeas = [...ideas].reverse()
    // let lastIdeas = []
    // for (let idea of reversedIdeas){
    //     // console.log(idea)
    //     // length é a quantiadde de itens dentro da variavel
    //     if (lastIdeas.length < 2) {
    //         lastIdeas.push(idea)
    //     }

    // }

    // Reverse é utilizado para mudar as posições da ultima para primeira
    // lastIdeas = lastIdeas.reverse()

    // console.log("cheguei")
    // return response.send("Resposta do Servidor")
    // return response.json({
    //     evento: 'Semana Omnistack 11.0',
    //     aluno: 'Adriano Almeida'
    // })
    
    // usando o sendFile, tem que ter o caminho absoluto, usando o recurso __dirname
    // return response.sendFile(__dirname + "/index.html")

    // usando o render do nunjucks para facilitar e organizar os arquivos html na utilizacao
    // const h1 = 'OI DO BACK-END' // passando uma variavel para o HTML
    // return response.render("index.html", { title: h1 }) // passando a variavel h1 para o HTML
    
    // return response.render("index.html", {ideas: lastIdeas}) // passando a varial de ideas para o index.html

});

// criei uma rota /ideias
// e capturo o pedido do cliente para responder
server.get("/ideias", function(request, response) { 
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return response.send("Erro no bando de dados!")
        }

        const reversedIdeas = [...rows].reverse()
    
        return response.render("ideias.html", { ideas: reversedIdeas})
    })

    // const reversedIdeas = [...ideas].reverse()
    // return response.sendFile(__dirname + "/ideias.html")
    
    // return response.render("ideias.html", { ideas: reversedIdeas})
});



server.post("/", function(req, res) {

    //Inserir dados na tabela
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    `
    
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]
        
    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no bando de dados!")
        }
    
        // console.log(this)
        return res.redirect("/ideias")
    })

});


// Fica ouvindo o servidor na porta especificada, ligando servidor na porta 4000
server.listen(4000)