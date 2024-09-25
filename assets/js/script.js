
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    //agregar producto al arreglo productos
    agregarProducto(producto, cantidad) {
        this.productos.push({ producto, cantidad });
    }

    //calcular total de la compra
    calcularTotal() {
        return this.productos.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
    }

    mostrarDetalles() {

        let detalles = "Detalles de la compra:\n";
        this.productos.forEach(item => {
            detalles += `${item.cantidad} x ${item.producto.nombre} - $${(item.producto.precio * item.cantidad)}\n`;
        });
        const total = this.calcularTotal();
        detalles += `\nEl total de la compra es: $${total}`;

        // Mostrar todo en una alerta al finalizar
            alert(detalles);

        
    }
    // Preguntar al usuario si desea confirmar la compra
    finalizarCompra() {
        const total = this.calcularTotal();
        const confirmar = confirm(`¿Deseas confirmar la compra por $${total}?`);
        if (confirmar) {
            alert("Compra realizada");
        } else {
            alert("Compra cancelada");
        }
    }

}

// Productos disponibles
const productosDisponibles = [
    new Producto('Leche', 1000),
    new Producto('Pan de Molde', 2000),
    new Producto('Queso', 1200),
    new Producto('Mermelada', 890),
    new Producto('Azúcar', 1300)
];

// Función principal para gestionar el proceso de compra
function gestionarCarrito() {
    const carrito = new Carrito();
    let seguirAgregando = true;

    while (seguirAgregando) {
        // mostrarProductos al momento de comprar y volver a mostrar si comete algun error

        let seleccion = parseInt(prompt("Ingresa el número del producto que deseas comprar: \n--- Productos Disponibles ---\n1. Leche - $1000\n2. Pan de Molde - $2000\n3. Queso - $1200\n4. Mermeladas - $890\n5. Azúcar - $1300"));
        while (isNaN(seleccion) || seleccion < 1 || seleccion > productosDisponibles.length) {
            seleccion = parseInt(prompt("Selección inválida. Ingresa el número del producto que deseas comprar:\n Productos Disponibles ---\n1. Leche - $1000\n2. Pan de Molde - $2000\n3. Queso - $1200\n4. Mermeladas - $890\n5. Azúcar - $1300"));
        }

        let cantidad = parseInt(prompt("Ingresa la cantidad que deseas comprar:"));
        while (isNaN(cantidad) || cantidad <= 0) {
            cantidad = parseInt(prompt("Cantidad inválida. Ingresa la cantidad que deseas comprar:"));
        }

        // seleccion - 1 = numero elegido es 1 mayor a la posicion del arreglo
        var productoSeleccionado = productosDisponibles[seleccion - 1];
        carrito.agregarProducto(productoSeleccionado, cantidad);

        //seguir comprando?
        seguirAgregando = confirm(`${productoSeleccionado.nombre} x ${cantidad} agregado al carrito.\n¿Deseas agregar otro producto?`);
    }

    carrito.mostrarDetalles();
    carrito.finalizarCompra();

}

// Ejecutar el proceso de compra
gestionarCarrito();
