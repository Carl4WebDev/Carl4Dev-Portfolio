
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;
const maxDistance = 120;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 3 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x > canvas.width || this.x < 0) this.vx *= -1;
        if (this.y > canvas.height || this.y < 0) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ff4444';
        ctx.fill();
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 68, 68, ${1 - distance / maxDistance})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
}

function init() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    animate();
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();


document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    let fbPageId = "61571030908344"; // Replace with your actual Facebook Page ID
    let flavor = document.getElementById("flavor").value;
    let size = document.getElementById("size").value;
    let message = document.getElementById("message").value;

    let text = `Hello! I'd like to order a ${size} ${flavor} cake. Custom message: "${message}".`;
    
    let messengerUrl = `https://m.me/${fbPageId}?text=${encodeURIComponent(text)}`;

    window.location.href = messengerUrl; // Redirect user to Messenger
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var form = event.target;
    
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            document.getElementById("success-message").style.display = "block";
            form.reset();
        } else {
            alert("Something went wrong. Please try again.");
        }
    }).catch(error => alert("Error: " + error));
});





// Modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('projectModal');
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.getElementById('closeModal');
  
    openBtn.addEventListener('click', () => {
      modal.classList.add('show');
    });
  
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('show');
    });
  });
  