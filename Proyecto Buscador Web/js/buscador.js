//creando selectores
const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color')
const resultado = document.querySelector('#resultado')

//Creando objeto
const datoBusqueda ={
    marca:'',
    year:'',
    minimo:'',
    maximo:'',
    puertas:'',
    transmision:'',
    color:''

}

//funcion para las opciones de filtro de año (la empresa no vende autos de 10 año o menos(en este caso))
const max = new Date().getFullYear()
//año actual "min"
const min = max-10
for(let i=max;i>min;i--){
    //console.log(i)
    //creando etiqueta "option"
    const opcion = document.createElement('option')
    Option.value=i //option con valor de "i" (FOR) 
    opcion.textContent =i //Agg option al html
    year.appendChild(opcion) //donde se agg etiqueta de html desde java
}

//Evento al cargar el DOM
document.addEventListener('DOMContentLoaded',()=>{
    //Va mostrar todo lo que hay en el archivo Db.js en ('resultados')
    mostrarAutos(autos)
})

//función 
function mostrarAutos (arregloAutos){
    //console.log(arregloAutos)
    limpiarHtml();//llamado de función para cuando selecciones no muestre todos si no lo que seleccionas
    arregloAutos.forEach(i=>{
        const{marca,modelo,year,precio,puertas,color,transmision} =i
        //imprimiendo
        const autoHTML = document.createElement('p')
        autoHTML.textContent = `${marca}-${modelo}- Año: ${year} Precio:
        ${precio}$ - Puertas: ${puertas} Color: ${color}- transmision: ${transmision}`
        //mandando a imprimir en el HTML
        resultado.appendChild(autoHTML)
    });
}

//Creando evento para cuando seleccionas marca(objeto de arriba)
//"change" detecta cuando seleccione
marca.addEventListener('change', e=>{
    //console.log(e.target.value) //para detectar lo que hace "change"
    //guardar en el objeto
    datoBusqueda.marca = e.target.value;
    //console.log(datoBusqueda)
    filtraAuto();
});

//Evento para cuando seleccionas año (similar al de marca):
year.addEventListener('change', e=>{
    //console.log(e.target.value)
    datoBusqueda.year =Number(e.target.value);//(Number ya que recibes string y necesitas numero(Año)) <= "e.target.value" toma el evento 'e'y el html 'target' y su valor en etiqueta 'option'
   //console.log(datoBusqueda)// <= verificando que se guarde en el objeto en el campo de year
    filtraAuto();//<=llamando a la función
})

//Evento para cuando seleccionas el minimo de precio
minimo.addEventListener('change', e=>{
    //console.log(e.target.value)// si ingresa verificando 
    datoBusqueda.minimo =Number(e.target.value);//Guardando en datos búsqueda y recibiendo string y pasando a Number
    //console.log(datoBusqueda)
    filtraAuto();
})

//Evento para cuando seleccionas el máximo de precio
maximo.addEventListener('change', e=>{
    //console.log(e.target.value);
    datoBusqueda.maximo =Number(e.target.value);
   // console.log(datoBusqueda);
    filtraAuto();
})
//Evento para cuando seleccionas puertas
puertas.addEventListener('change', e=>{
   // console.log(e.target.value);
    datoBusqueda.puertas =Number(e.target.value);
    //console.log(datoBusqueda);
    filtraAuto();
})

//Evento para cuando seleccionas transmision
transmision.addEventListener('change', e=>{
   // console.log(e.target.value);
    datoBusqueda.transmision = e.target.value;
    console.log(datoBusqueda);
    filtraAuto();
})

//(=== compara tipos de datos mas valor es decir false ya que es string y el otro Number) y '=' o '==' compara sin importar el tipo de dato
//Evento para cuando seleccionas color
color.addEventListener('change', e=>{
   // console.log(e.target.value);
    datoBusqueda.color = e.target.value;
    //console.log(datoBusqueda);
    filtraAuto();
})




//Función para filtrar
function filtraAuto(){
     const resultado1 =
      autos.filter(filtrarMarca).filter(filtrarYear)
      .filter(filtrarMinimo).filter(filtrarMaximo)
      .filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);//<=agg filtrar year//<= agg filtrar minimo
       //<=agg filtrar maximo//<=agg filtrar transmision
       //<=agg filtrar color// <= agg filtrar puertas

     //console.log(resultado);

     //comentado ya que se necesita que ingrese a esa función después del "if" "mostrarAutos(resultado)";
     
     //Mensaje si no encuentra criterio de búsqueda// los log son para verificar donde va ingresando 
       // console.log(resultado.length)
       // console.log(resultado)
     if(resultado1.length === 0){
        //console.log('No hay resultados')
        const noResult = document.createElement('p');
        //Se usó "textcontet" porque solo permite texto. "inneHTML" permite texto(dentro de la etiqueta)pero en especial es para etiquetas HTML
        noResult.textContent = 'No hay resultados para su búsqueda';
        //Agg clase de css "noResult.classList.add('alerta')"
        noResult.classList.add('alerta','error'); //<= clases asignadas de css
        limpiarHtml();//<= limpiando html para mostrar solo el mensaje de noResult
        resultado.appendChild(noResult);//<= impimiendo mensaje de noResult
     }else{
        mostrarAutos(resultado1)//<= Este es la funcion que antes estaba fuera del "if" ('se cambió a resultado1 para evitar confusion por otro con ese nombre o algo asi')
     }
}
//Función para limpiar HTMl cuando seleccionas marca (ya que al cargar aparecen todos los resultados)
function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}
// función Filtro de marca
function filtrarMarca(auto){
    if(datoBusqueda.marca){
        return auto.marca === datoBusqueda.marca
    }
    return auto;
}
//Función filtro de year
function filtrarYear(auto){
    if(datoBusqueda.year){
        return auto.year === datoBusqueda.year
    }
    return auto;
}

//Función filtro de minimo
function filtrarMinimo(auto){
    if(datoBusqueda.minimo){
        return auto.precio >= datoBusqueda.minimo; //('>=' mayor o igual al seleccionar precio mínimo //se puso (auto.precio) porque no existe mínimo ni máximo en el otro archivo Js
    }
    return auto;
}


//Función filtro de maximo
function filtrarMaximo(auto){
    if(datoBusqueda.maximo){
        return auto.precio <= datoBusqueda.maximo; //('<=' menor o igual al seleccionar precio máximo //se puso (auto.precio) porque no existe mínimo ni máximo en el otro archivo Js
    }
    return auto;
}



//Función filtro de puertas
function filtrarPuertas(auto){
    if(datoBusqueda.puertas){
        return auto.puertas === datoBusqueda.puertas; 
    }
    return auto;
}



//Función filtro de transmision
function filtrarTransmision(auto){
    if(datoBusqueda.transmision){
        return auto.transmision === datoBusqueda.transmision; 
    }
    return auto;
}

function filtrarColor(auto){
    if(datoBusqueda.color){
        return auto.color === datoBusqueda.color; 
    }
    return auto;
}