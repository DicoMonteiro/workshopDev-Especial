function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")
}

//Validando os campos deixado em branco ou vazio

function checkFields(event) {

    const valuesToCheck = [
        "image",
        "title",
        "category",
        "description",
        "link"
    ]

    const isEmpty = valuesToCheck.find(function(value){
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if (checkIfIsString && checkIfIsEmpty){
            return true 
        }
    }) 

    if (isEmpty) {
        event.preventDefault()
        alert("Por favor, preencha todos os campos")
    }

    // for (let value of valuesToCheck) {
    //     console.log(event.target[value].value)
    // }

    // if (event.target["title"].value )

    // event.target.

    // console.log(event)
    
}


// function valida_form() {

//     if(document.getElementsByName("title").value == ""){
//         alert('Por favor, preencha o campo');
//         document.getElementsByName("title").focus();
//         return false
//     }
    
//     if(document.getElementsByName("category").value == ""){
//         alert('Por favor, preencha o campo');
//         document.getElementsByName("category").focus();
//         return false
//     }

//     if(document.getElementsByName("image").value == ""){
//         alert('Por favor, preencha o campo');
//         document.getElementsByName("image").focus();
//         return false
//     }

//     if(document.getElementsByName("description").value == ""){
//         alert('Por favor, preencha o campo');
//         document.getElementsByName("description").focus();
//         return false
//     }

//     if(document.getElementsByName("link").value == ""){
//         alert('Por favor, preencha o campo');
//         document.getElementsByName("link").focus();
//         return false
//     }
// }

// document
//     .querySelector("button.fat")
//     .addEventListener("click", function(){
//         document
//             .querySelector("footer")
//             .classList
//             .toggle("hide")
//     })

// document
//     .querySelector("button.plus")
//     .addEventListener("click", function() {
//         document
//             .querySelector("#modal")
//             .classList
//             .toggle("hide")
//     }) 

// document
//     .querySelector("button.salve")
//     .addEventListener("click", function(){
//         document
//             .querySelector("#container")
//             .classList
//             .toggle("hide")
//     }) 