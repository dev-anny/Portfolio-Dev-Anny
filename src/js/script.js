const projectsData = [
    {
        title: "Atlas Cósmico",
        img: "./src/img/atlas-cosmico.png",
        desc: "Uma enciclopédia interativa desenvolvida para aproximar o público das maravilhas do espaço, utilizando dados oficiais em tempo real.",
        tags: ["Tailwind CSS", "Vanilla JS", "APIs REST"],
        repoLink: "https://github.com/dev-anny/Atlas-Cosmico",
        demoLink: "https://atlas-cosmico.vercel.app"
    },
    {
        title: "Acerto Fácil",
        img: "./src/img/acerto-facil.png",
        desc: "Simulador de rescisão com inteligência contábil embutida. Sem jargões e sem cálculos complexos manuais. Apenas regras exatas da CLT de forma transparente.",
        tags: ["Tailwind CSS", "Vanilla JS ES6+",],
        // --- ATENÇÃO: É AQUI QUE VOCÊ ALTERA OS LINKS DO SEGUNDO PROJETO ---
        repoLink: "https://github.com/dev-anny/Acerto-Facil",
        demoLink: "https://acerto-facil.vercel.app/"
    },
    {
        title: "Toon Snacks",
        isToonSnacks: true,
        repoLink: "https://github.com/dev-anny/Toon-Snacks"
    }
];

// Funções do Modal
function openModal(index) {
    const project = projectsData[index];

    // Toon Snacks abre o modal especial
    if (project.isToonSnacks) {
        const toonOverlay = document.getElementById('modal-toon');
        toonOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        return;
    }

    const modal = document.getElementById('project-modal');

    // Preencher dados
    document.getElementById('modal-img').src = project.img;
    document.getElementById('modal-title').innerText = project.title;
    document.getElementById('modal-desc').innerText = project.desc;
    document.getElementById('modal-repo').onclick = () => window.open(project.repoLink, '_blank');
    document.getElementById('modal-demo').onclick = () => window.open(project.demoLink, '_blank');

    // Limpar e criar tags
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = '';
    project.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = "bg-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-700 text-gray-300 shadow-sm";
        span.innerText = tag;
        tagsContainer.appendChild(span);
    });

    // Mostrar modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // Bloquear scroll do body
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    // Fechar modal padrão
    const modal = document.getElementById('project-modal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');

    // Fechar modal Toon Snacks
    const toonOverlay = document.getElementById('modal-toon');
    toonOverlay.style.display = 'none';

    // Liberar scroll do body
    document.body.style.overflow = 'auto';
}

// --- FUNÇÕES NOVAS PARA O FORMULÁRIO (AJAX) ---

function resetForm() {
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');

    form.reset();
    form.classList.remove('hidden');
    statusDiv.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica de Envio de Formulário via AJAX ---
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const originalBtnContent = submitBtn.innerHTML;

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Impede o redirecionamento padrão

            // UI de carregamento
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Solicita resposta JSON do Formcarry
                }
            })
                .then(response => response.json())
                .then(data => {
                    // Sucesso (Formcarry retorna code 200)
                    if (data.code === 200) {
                        form.classList.add('hidden');
                        statusDiv.classList.remove('hidden');
                        statusDiv.classList.add('scroll-reveal', 'visible'); // Animação
                    } else {
                        // Erro específico do formcarry
                        alert('Ocorreu um erro ao enviar. Por favor, tente novamente ou use o e-mail/WhatsApp.');
                    }
                })
                .catch(error => {
                    // Erro de rede
                    console.error('Erro:', error);
                    alert('Erro de conexão. Verifique sua internet.');
                })
                .finally(() => {
                    // Restaura o botão
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                });
        });
    }


    // --- Animação de estrelas no canvas ---
    const canvas = document.getElementById('star-canvas');

    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        let numStars = 200;

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            numStars = Math.floor(window.innerWidth * window.innerHeight / 10000);
        }

        class Star {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.2;
                this.speedY = (Math.random() - 0.5) * 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.random() * 0.8 + ')';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initStars() {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push(new Star());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
                star.update();
                star.draw();
            });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            setCanvasSize();
            initStars();
        });

        setCanvasSize();
        initStars();
        animate();
    }

    // --- Menu móvel ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Smooth scroll para links âncora ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // --- Animação de Scroll reveal ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(el => {
            observer.observe(el);
        });
    }

    // --- Fundo do header fixo ao rolar ---
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'var(--bg-color)';
            } else {
                header.style.backgroundColor = 'transparent';
            }
        });
    }

    // --- Lógica para o botão do WhatsApp travar no footer ---
    const whatsappBtn = document.querySelector('.whatsapp-float');
    const footer = document.querySelector('#main-footer'); // Seleciona o footer pelo ID que adicionei

    function checkWhatsappPosition() {
        if (!whatsappBtn || !footer) return;

        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Margem padrão (definida no CSS como bottom: 30px)
        const defaultBottom = 30;

        // Se o topo do footer estiver visível na tela (menor que a altura da janela)
        if (footerRect.top < windowHeight) {
            // Calcula a sobreposição: quanto do footer está visível
            const overlap = windowHeight - footerRect.top;

            // Define o novo bottom: margem padrão + o tamanho da sobreposição
            // Isso empurra o botão para cima exatamente na mesma velocidade que o scroll
            whatsappBtn.style.bottom = `${defaultBottom + overlap}px`;
        } else {
            // Se o footer não está visível, mantém a posição fixa padrão
            whatsappBtn.style.bottom = `${defaultBottom}px`;
        }
    }

    // Adiciona o evento de scroll e redimensionamento
    window.addEventListener('scroll', checkWhatsappPosition);
    window.addEventListener('resize', checkWhatsappPosition);
    // Chama uma vez para garantir a posição inicial correta
    checkWhatsappPosition();

    // Fechar com tecla ESC (Modal)
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });
});
