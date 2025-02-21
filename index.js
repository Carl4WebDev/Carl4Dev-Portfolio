
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




// other projects modal
const openModalBtn = document.getElementById('openOtherProjects');
const modal = document.getElementById('otherProjectsModal');
const closeModal = document.querySelector('.other-projects-close');

// Open Modal
openModalBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Close Modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close on Outside Click
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});


document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".poll-btn");
    const resultsDiv = document.querySelector(".poll-results");

    // Load existing counts from localStorage
    const counts = {
      love: parseInt(localStorage.getItem("poll-love")) || 0,
      good: parseInt(localStorage.getItem("poll-good")) || 0,
      work: parseInt(localStorage.getItem("poll-work")) || 0,
    };

    const updateResults = () => {
      document.getElementById("love-count").textContent = counts.love;
      document.getElementById("good-count").textContent = counts.good;
      document.getElementById("work-count").textContent = counts.work;
      resultsDiv.style.display = "block";
    };

    updateResults();

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const option = btn.getAttribute("data-option");
        counts[option]++;
        localStorage.setItem(`poll-${option}`, counts[option]);
        updateResults();
      });
    });
  });