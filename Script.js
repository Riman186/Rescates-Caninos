// Scroll suave al hacer clic en los enlaces de la barra de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Funcionalidad de las tarjetas de perros
document.querySelectorAll('.tarjeta-perro').forEach(tarjeta => {
    const btnVerMas = tarjeta.querySelector('.btn-ver-mas');
    const btnVolver = tarjeta.querySelector('.btn-volver');
    
    btnVerMas.addEventListener('click', () => {
        tarjeta.classList.add('volteada');
    });
    
    btnVolver.addEventListener('click', () => {
        tarjeta.classList.remove('volteada');
    });
    
    // Opcional: Cerrar al hacer clic fuera en versión móvil
    tarjeta.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && e.target === tarjeta && tarjeta.classList.contains('volteada')) {
            tarjeta.classList.remove('volteada');
        }
    });
});

// Carrusel de integrantes
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.carrusel-slides');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.carrusel-prev');
    const nextBtn = document.querySelector('.carrusel-next');
    let currentIndex = 0;
    const totalSlides = document.querySelectorAll('.carrusel-slide').length;
    let autoSlideInterval;

    // Función para mostrar slide específico
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentIndex = index;
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar thumbnails activos
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }

    // Navegación con thumbnails
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            goToSlide(index);
            resetAutoSlide();
        });
    });

    // Botones de anterior/siguiente
    prevBtn.addEventListener('click', function() {
        goToSlide(currentIndex - 1);
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', function() {
        goToSlide(currentIndex + 1);
        resetAutoSlide();
    });

    // Auto-desplazamiento
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 3000); // Cambia cada 3 segundos
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Iniciar carrusel
    startAutoSlide();

    // Pausar al interactuar
    slides.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slides.addEventListener('mouseleave', startAutoSlide);
});

// Animación de aparición para las secciones
const sections = document.querySelectorAll('section');

const showSection = () => {
    const triggerHeight = window.innerHeight / 1.3;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerHeight) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
};

window.addEventListener('scroll', showSection);
showSection();

// WhatsApp Report System - Versión Funcional
document.getElementById('form-reporte').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validación
    const nombre = document.getElementById('nombre').value.trim();
    const ubicacion = document.getElementById('ubicacion').value.trim();
    
    if (!nombre || !ubicacion) {
        alert("Por favor completa los campos obligatorios");
        return;
    }

    // Construir mensaje
    const telefono = document.getElementById('telefono').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    
    const mensaje = `*Nuevo Reporte de Perro*%0A%0A` +
                   `*Nombre:* ${nombre}%0A` +
                   (telefono ? `*Teléfono:* ${telefono}%0A` : '') +
                   `*Ubicación:* ${ubicacion}%0A` +
                   `*Descripción:*%0A${descripcion || "No especificada"}`;

    // Abrir WhatsApp
    window.open(`https://wa.me/50582383261?text=${mensaje}`, '_blank');
    
    // Opcional: Resetear el formulario después de 1 segundo
    setTimeout(() => {
        this.reset();
    }, 1000);
});
// Botón Banpro con feedback mejorado
document.addEventListener('DOMContentLoaded', function() {
    // Banpro
    const contenedor = document.getElementById('contenedor-btn-banpro');
    if (contenedor) {
        const btnBanpro = document.createElement('button');
        btnBanpro.className = 'btn-banpro';
        btnBanpro.innerHTML = 'Abrir Billetera Banpro';
        btnBanpro.onclick = function() {
            window.location.href = 'banpro://transfer?phone=50584647890';
            setTimeout(() => {
                window.open('https://www.banpro.com.ni/billetera-movil', '_blank');
            }, 500);
        };
        contenedor.appendChild(btnBanpro);
    }
});

    // Funcionalidad para copiar con feedback visual
    document.querySelectorAll('.btn-copiar').forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.getAttribute('data-text');
            navigator.clipboard.writeText(text).then(() => {
                const confirm = this.querySelector('.confirmacion');
                confirm.style.display = 'inline';
                setTimeout(() => {
                    confirm.style.display = 'none';
                }, 2000);
            });
        });
    });
// PayPal Integration
const script = document.createElement('script');
script.src = 'https://www.paypal.com/sdk/js?client-id=AQL0llzqQ0x5JukQfX2zgfq96hLoVPhn6iPUYIzrwsOY6UceYZgPldnI4BPkCDjreXhtXZ3gU7p_xpHF&currency=USD';
script.onload = function() {
    // Selector de montos
    const amountButtons = document.querySelectorAll('.btn-monto');
    let selectedAmount = '10.00';
    
    amountButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            selectedAmount = this.getAttribute('data-monto');
            amountButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal'
        },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: selectedAmount // Usa el monto seleccionado
                    },
                    description: 'Donación a Rescate Canino'
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Mensaje mejorado
                const thankYouMsg = `
                    ¡Gracias por tu donación de $${selectedAmount}, ${details.payer.name.given_name}!
                    Tu apoyo ayuda a salvar vidas caninas.
                `;
                alert(thankYouMsg);
                
                // Opcional: Redirigir o mostrar mensaje en página
            document.getElementById('donation-thankyou').style.display = 'block';
            });
        },
        onError: function(err) {
            console.error("Error en PayPal:", err);
            alert("Ocurrió un error. Por favor intenta nuevamente o usa otro método de pago.");
        }
    }).render('#paypal-button-container');
};
document.body.appendChild(script);
;