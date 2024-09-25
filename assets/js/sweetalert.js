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

    agregarProducto(producto, cantidad) {
        Swal.fire(`${cantidad} - ${producto.nombre} agregado al carrito.`);
        this.productos.push({ producto, cantidad });
    }

    calcularTotal() {
        return this.productos.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
    }

    // Mostrar detalles y confirmar la compra con SweetAlert
    async mostrarDetallesConTotal() {
        let detalles = "";
        this.productos.forEach(item => {
            detalles += `${item.cantidad} x ${item.producto.nombre} - $${(item.producto.precio * item.cantidad)}\n`;
        });
        const total = this.calcularTotal();
        detalles += `\nEl total de la compra es: $${total}`;

        // Mostrar los detalles en un cuadro de diálogo de SweetAlert
        await Swal.fire({
            title: 'Detalles de la compra',
            imageUrl: "https://images2.imgbox.com/5a/71/4l0YNaKz_o.jpg",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Webmart",
            text: detalles,
            confirmButtonText: 'Ok'
        });

        // Confirmar la compra con SweetAlert
        const resultado = await Swal.fire({
            title: 'Confirmar compra',
            imageUrl: "https://images2.imgbox.com/5a/71/4l0YNaKz_o.jpg",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Webmart",
            text: '¿Deseas confirmar la compra?',
            showCancelButton: true,
            confirmButtonText: 'Sí, comprar',
            cancelButtonText: 'Cancelar'
        });

        if (resultado.isConfirmed) {
            Swal.fire('Compra realizada', '', 'success');
        } else {
            Swal.fire('Compra cancelada', '', 'error');
        }
    }
}

// Función principal para gestionar el proceso de compra
async function gestionarCarrito() {
    const carrito = new Carrito();
    let seguirAgregando = true;

    while (seguirAgregando) {
        // Pedir selección de producto usando SweetAlert
        const seleccion = await Swal.fire({
            title: 'Bienbenido a Webmart \nSelecciona un producto',
            imageUrl: "https://images2.imgbox.com/5a/71/4l0YNaKz_o.jpg",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Webmart",
            input: 'select',
            inputOptions: {
                1: 'Leche - $1000',
                2: 'Pan de Molde - $2000',
                3: 'Queso - $1200',
                4: 'Mermeladas - $890',
                5: 'Azúcar - $1300'
            },
            inputPlaceholder: 'Selecciona un producto',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Debes seleccionar un producto';
                }
            }
        });

        if (seleccion.isDismissed) {
            break;
        }

        const cantidad = await Swal.fire({
            title: 'Ingresa la cantidad',
            imageUrl: "https://images2.imgbox.com/5a/71/4l0YNaKz_o.jpg",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Webmart",
            input: 'number',
            inputAttributes: {
                min: 1,
                step: 1
            },
            inputValue: 1,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value || value <= 0) {
                    return 'Ingresa una cantidad válida';
                }
            }
        });

        if (cantidad.isDismissed) {
            break;
        }

        const productoSeleccionado = productosDisponibles[parseInt(seleccion.value) - 1];
        carrito.agregarProducto(productoSeleccionado, parseInt(cantidad.value));

        // Preguntar si desea seguir agregando productos
        const continuar = await Swal.fire({
            title: '¿Deseas agregar otro producto?',
            imageUrl: "https://images2.imgbox.com/5a/71/4l0YNaKz_o.jpg",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Webmart",
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        });

        seguirAgregando = continuar.isConfirmed;
    }

    // Llamar a mostrarDetallesConTotal para mostrar los productos y confirmar la compra
    if (carrito.productos.length > 0) {
        await carrito.mostrarDetallesConTotal();
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

// Ejecutar el proceso de compra
gestionarCarrito();
