// Constantes y Variables

const HANDLING = 5;                                             // Cargo por manejo en Aduanas (USD 5.00)
const postalRate = (shipping) => shipping * 0.1;                // Tasa Postal Universal (10% del valor del flete)
const iva = (shipping) => shipping * 0.0066;                    // IVA para importaciones (0,66% del valor del flete)
const unfranchised = (shipping) => shipping * 0.6;              // Cargo por importación sin franquicias (60% del valor del flete)
let franchise, destination;                                     // Uso de franquicia para exonerar impuestos, y destino a enviar
let postalTax, shippingTax, unfranchisedTax;                    // Impuestos en base al costo del flete
let globalShipping, localShipping, totalShipping;               // Costos de envío al país, al departamento, y costo total
let productsPrice, productsType, productsWeight;                // Precio, Tipo y Peso del compendio de productos a importar
let runCalculator = true;                                       // Ejecución de la calculadora

// Funciones

//      Tipo de producto
function TypeOfProduct(number){
    switch(number){
        case "1":
            return "Correspondencia y revistas";
        case "2":
            return "CD's y DVD's (no videojuegos)";
        case "3":
            return "Libros";
        case "4":
            return "Otros";
        default:
            return "Otros";
    }
}


//      Definir si necesita franquicia
function UsesFranchise(type){
    if(type === "1"){
        return false;       // Correspondencia y revistas nunca utilizan franquicias y no pagan manejo
    }
    else{
        let answer = prompt("¿Deseas utilizar una franquicia? (Si/No)");
        answer = answer.toLowerCase()
        if(answer === "si"){
            return true;
        }
        return false;
    }
}


// Calcular el envío local
function CalculateLocal(location){
    location = location.toLowerCase();
    if(location === "montevideo"){
        return 2;
    }
    else if((location === "san josé") || (location === "canelones")){
        return 4;
    }
    else{
        return 6;
    }
}

//      Calcular envío global
function CalculateGlobal(weight, type){
    console.log(`Peso --> ${weight}`);
    if(type === "1"){
        return 10;
    }
    else if((0 < weight) && (weight <= 5)){
        return 22;
    }
    else if((5 < weight) && (weight <= 10)){
        return 20;
    }
    else if((10 < weight) && (weight <= 20)){
        return 18;
    }
    else if(20 < weight){
        return 16;
    }
}


//      Calcular total
function CalculateTotal(type, franchise, globalShipp, localShipp, postal, tax, unfranchise){
    if(type === "1"){
        return globalShipp + localShipp + postal + tax;
    }
    else{
        if(franchise === true){
            return globalShipp + localShipp + postal + tax + HANDLING;
        }
        return globalShipp + localShipp + postal + tax + HANDLING + unfranchise;
    }
}


//      Control de ejecución
function restartCalculator(){
    let restart = prompt("¿Desea realizar otro cálculo? (Si/No)");
    restart = restart.toLowerCase()
    if(restart === "si"){
        return true;
    }
    return false;
}


//      Ejecución de la calculadora
while(runCalculator){
    
    alert("\nBienvenido a la Calculadora de Costos de Importación\n");
    // Inserción de datos
    productsPrice = prompt("Ingrese el precio final de los productos");
    productsType = prompt("Ingrese el número de opción del tipo de los productos\n   1: Correspondencia\n   2: CD's y DVD's (no videojuegos)\n   3: Libros\n   4: Otros");
    productsWeight = prompt("Ingrese el peso total de los productos (kilogramos)");
    franchise = UsesFranchise(productsType);
    destination = prompt("Ingrese el departamento a ser enviados los productos");

    // Cálculos
    localShipping = parseFloat(CalculateLocal(destination));
    globalShipping = parseFloat(CalculateGlobal(productsWeight, productsType));
    postalTax = parseFloat(postalRate(globalShipping));
    shippingTax = parseFloat(iva(globalShipping));
    if(!(franchise)){
        unfranchisedTax = parseFloat(unfranchised(globalShipping));
    }
    totalShipping = parseFloat(CalculateTotal(productsType, franchise, globalShipping, localShipping, postalTax, shippingTax, unfranchisedTax));
    totalShipping = totalShipping.toFixed(2);

    // Muestreo
    console.log("-------------------- PRODUCTOS --------------------");
    console.log(`   PRECIO: USD ${productsPrice}\n   TIPO:   ${TypeOfProduct(productsType)}\n   PESO:   ${productsWeight} kg`);
    if(franchise){
        console.log(`   Franquicia?: SI\n   Destino: ${destination}`);
    }
    else{
        console.log(`   Franquicia?: NO\n   Destino: ${destination}`);
    }
    console.log("----------------- TOTAL DEL ENVÍO -----------------");
    console.log(`   Desde EEUU hacia Uruguay: USD ${globalShipping}`);
    console.log(`   Envío a ${destination}: ${localShipping}`);
    console.log(`   Tasa Postal Universal (10%): USD ${postalTax}`);
    if(productsType !== "1"){
        console.log(`   Manejo de Aduanas: USD ${HANDLING}`);
        if(!(franchise)){
            console.log(`   Régimen sin franquicia (60%): USD ${unfranchisedTax}`); 
        }
    }
    console.log(`   IVA (0,66%): USD ${shippingTax}`);
    console.log(`            TOTAL: USD ${totalShipping}`);
    console.log("---------------------------------------------------");

    // Reiniciar/Detener ejecución
    runCalculator = restartCalculator();
}
console.log("¡Hasta pronto!");
