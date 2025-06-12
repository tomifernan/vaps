const carrito = []

function actualizarCarrito() {
  const lista = document.getElementById("listaCarrito")
  const total = document.getElementById("total")
  const botonFlotante = document.getElementById("botonCarritoFlotante")

  lista.innerHTML = ""
  let suma = 0

  carrito.forEach((producto, index) => {
    const li = document.createElement("li")
    li.textContent = `${producto.nombre} - $${producto.precio}`

    const eliminarIcono = document.createElement("i")
    eliminarIcono.classList.add("fa", "fa-trash-alt", "eliminar")
    eliminarIcono.onclick = () => eliminarDelCarrito(index)

    li.appendChild(eliminarIcono)
    lista.appendChild(li)

    suma += producto.precio
  })

  total.textContent = suma

  // 🔄 Actualizamos el texto del botón flotante con el total
  if (botonFlotante) {
    botonFlotante.textContent = `🛒 Ver carrito ($${suma})`
  }
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1) // Eliminar el producto del carrito
  actualizarCarrito()
}

function enviarPorWhatsApp() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.")
    return
  }

  let mensaje = "Hola! Quisiera pedir:\n"
  carrito.forEach((producto) => {
    mensaje += `- ${producto.nombre} $${producto.precio}\n`
  })
  const total = carrito.reduce((sum, p) => sum + p.precio, 0)
  mensaje += `Total: $${total}`

  const url = `https://wa.me/3364106761?text=${encodeURIComponent(mensaje)}`
  window.open(url, "_blank")
}

function enviarDatosYPedido() {
  // Obtener datos del formulario
  const nombre = document.getElementById("nombre").value.trim()
  const apellido = document.getElementById("apellido").value.trim()
  const provincia = document.getElementById("provincia").value.trim()
  const ciudad = document.getElementById("ciudad").value.trim()
  const direccion = document.getElementById("direccion").value.trim()
  const comprobante = document.getElementById("comprobante").files[0]

  // Validar campos
  if (!nombre || !apellido || !provincia || !ciudad || !direccion || !comprobante) {
    alert("Por favor completá todos los campos y subí el comprobante de pago.")
    return
  }

  // Validar productos en el carrito
  const listaItems = document.querySelectorAll("#listaCarrito li")
  if (listaItems.length === 0) {
    alert("Tu carrito está vacío.")
    return
  }

  // Construir mensaje
  let mensaje = `Nuevo pedido de numb.splashvt\n`
  mensaje += `Cliente: ${nombre} ${apellido}\n`
  mensaje += `Dirección: ${direccion}, ${ciudad}, ${provincia}\n`
  mensaje += `Productos:\n`

  listaItems.forEach((item) => {
    mensaje += `- ${item.textContent}\n`
  })

  const total = document.getElementById("total").textContent
  mensaje += `Total: ${total}\n`
  mensaje += `Comprobante: el cliente lo enviará como imagen.`

  const numero = "3364106761"

  // Confirmación al usuario
  alert("Se abrirá WhatsApp. Por favor, adjuntá el comprobante de pago como imagen en el chat.")

  // Abrir WhatsApp con mensaje
  const url = `https://wa.me/3364106761${numero}?text=${encodeURIComponent(mensaje)}`
  window.open(url, "_blank")
}

function toggleMenu() {
  const nav = document.querySelector(".navbar nav")
  const overlay = document.querySelector(".menu-overlay")
  const body = document.body

  if (!overlay) {
    // Crear overlay si no existe
    const newOverlay = document.createElement("div")
    newOverlay.className = "menu-overlay"
    newOverlay.onclick = () => toggleMenu()
    document.body.appendChild(newOverlay)
  }

  const currentOverlay = document.querySelector(".menu-overlay")

  nav.classList.toggle("active")
  currentOverlay.classList.toggle("active")
  body.classList.toggle("menu-abierto")

  // Agregar botón de cerrar si no existe
  if (!nav.querySelector(".menu-close")) {
    const closeBtn = document.createElement("button")
    closeBtn.className = "menu-close"
    closeBtn.innerHTML = "×"
    closeBtn.onclick = () => toggleMenu()
    nav.appendChild(closeBtn)
  }
}

document.querySelectorAll(".ver-ingredientes").forEach((button) => {
  button.addEventListener("click", () => {
    const ingredientes = button.nextElementSibling
    ingredientes.classList.toggle("mostrar")
    button.textContent = ingredientes.classList.contains("mostrar") ? "Ocultar ingredientes" : "Ver ingredientes"
  })
})

document.querySelectorAll(".navbar nav a").forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.querySelector(".navbar nav")
    const overlay = document.querySelector(".menu-overlay")
    const body = document.body

    nav.classList.remove("active")
    if (overlay) overlay.classList.remove("active")
    body.classList.remove("menu-abierto")
  })
})

function irAlCarrito() {
  const carrito = document.querySelector(".carrito")
  if (carrito) {
    carrito.scrollIntoView({ behavior: "smooth" })
  }
}

document.querySelectorAll(".seleccionar-sabor-btn").forEach((boton) => {
  boton.addEventListener("click", () => {
    const lista = boton.nextElementSibling
    lista.classList.toggle("oculto")
  })
})

document.querySelectorAll(".agregar").forEach((boton) => {
  boton.addEventListener("click", () => {
    const producto = boton.closest(".producto")
    const nombre = boton.getAttribute("data-nombre")
    const precio = Number.parseFloat(boton.getAttribute("data-precio"))
    const saborSelect = producto.querySelector(".select-sabor")
    const sabor = saborSelect ? saborSelect.value : null

    // Validar sabor solo si existe selector
    if (saborSelect && !sabor) {
      alert("Por favor seleccioná un sabor antes de agregar al carrito.")
      return
    }

    let nombreCompleto = nombre
    if (sabor) {
      nombreCompleto += ` (Sabor: ${sabor})`
    }

    carrito.push({ nombre: nombreCompleto, precio })
    actualizarCarrito()

    // Opcional: ocultar select después de agregar
    if (saborSelect) {
      saborSelect.parentElement.classList.add("oculto")
    }

    console.log(`Agregado al carrito: ${nombreCompleto} - $${precio}`)
  })
})

// Función para manejar el estado activo de los enlaces del menú (SIMPLIFICADA)
function manejarEnlaceActivo() {
  const enlaces = document.querySelectorAll(".navbar nav a")

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      // Remover clase activa de todos los enlaces
      enlaces.forEach((link) => link.classList.remove("active"))

      // Agregar clase activa al enlace clickeado
      this.classList.add("active")

      // Cerrar el menú móvil
      const nav = document.querySelector(".navbar nav")
      const overlay = document.querySelector(".menu-overlay")
      const body = document.body

      nav.classList.remove("active")
      if (overlay) overlay.classList.remove("active")
      body.classList.remove("menu-abierto")
    })
  })
}

// Inicializar solo cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  manejarEnlaceActivo()

  // Marcar el primer enlace como activo por defecto
  const primerEnlace = document.querySelector(".navbar nav a")
  if (primerEnlace) {
    primerEnlace.classList.add("active")
  }
})


function buscarProductos() {
  const texto = document.getElementById("busqueda").value.toLowerCase()
  const productos = document.querySelectorAll(".producto")

  productos.forEach(producto => {
    const nombre = producto.querySelector("h3").textContent.toLowerCase()
    if (nombre.includes(texto)) {
      producto.style.display = "block"
    } else {
      producto.style.display = "none"
    }
  })
}

function reiniciarBusqueda() {
  document.getElementById("busqueda").value = "" // limpia el input
  const productos = document.querySelectorAll(".producto")
  productos.forEach(producto => {
    producto.style.display = "block"
  })
}
