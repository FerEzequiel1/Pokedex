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
        <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}" class="imagen-pokemon">
        <p>#${id}</p>
        <div class="datos">
        <h5 class="nombre">${data.name}</h5>
        <div class="razas">
        ${tipo}
        </div>
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

