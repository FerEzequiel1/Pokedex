const URL = "https://pokeapi.co/api/v2/pokemon/";
const CONTAINER = document.querySelector(".pokemon-container");
const BOTONES = document.querySelectorAll(".btn");

for (let i = 1; i < 151; i++) {
    fetch(URL+i)
        .then(respose => respose.json())
        .then((data) => 
                mostrarPokemones(data) )
}

function mostrarPokemones(data){
    let tipo = data.types.map((type) => 
    `<span class="${type.type.name} span-raza">${type.type.name}</span>`
    )
    tipo = tipo.join("");

    let id = data.id.toString();

    if(id.length === 1){
            id="00"+id;
        }
    else if (id.length ===2){
                id = "0" + id;
            }

    const div = document.createElement("div")
    div.classList.add("tarjeta")
    div.innerHTML=`
        <div class="contenido ">
            <div class="contender-imagen">
                <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}" class="imagen-pokemon">
            </div>
            <div class="datos">
                <p>#${id}</p>
                <h2 class="nombre">${data.name}</h2>
            </div> 
            <div class="razas">
                ${tipo}
            </div>
    `
    CONTAINER.append(div)
}

BOTONES.forEach(boton => boton.addEventListener("click",(e) =>{
    const botonID = e.currentTarget.id;
    CONTAINER.innerHTML=""

    for (let i = 1; i < 151; i++) {
    fetch(URL+i)
        .then(respose => respose.json())
        .then((data) => {
                const tipo = data.types.map(type =>type.type.name);

                if(tipo.some(tipo => tipo.includes(botonID))){
                    mostrarPokemones(data)
                }
                else if (botonID == "ver-todos"){
                    mostrarPokemones(data)
                }
                }
            )
    }

}))


const BTN_MENU = document.querySelector("#btn-nav-abrir");
const btn_cerrar = document.querySelector("#btn-cerrar");
const UL = document.querySelector("#lista-clases");

BTN_MENU.addEventListener("click",()=>{
    btn_cerrar.classList.add("visible")
    UL.classList.add("visible")
})

btn_cerrar.addEventListener("click",()=>{
    btn_cerrar.classList.remove("visible")
    UL.classList.remove("visible")
    btn_cerrar.classList.add("escondido")
    UL.classList.add("escondido")
})

