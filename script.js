document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CONTROLE DE ACESSIBILIDADE (FONTE E ALTO CONTRASTE)
       ========================================================================== */
    let currentFontSize = 16;
    const btnIncreaseFont = document.getElementById('btn-increase-font');
    const btnDecreaseFont = document.getElementById('btn-decrease-font');
    const btnToggleContrast = document.getElementById('btn-toggle-contrast');

    if (btnIncreaseFont && btnDecreaseFont) {
        btnIncreaseFont.addEventListener('click', () => {
            if (currentFontSize < 24) {
                currentFontSize += 2;
                document.documentElement.style.fontSize = `${currentFontSize}px`;
            }
        });

        btnDecreaseFont.addEventListener('click', () => {
            if (currentFontSize > 12) {
                currentFontSize -= 2;
                document.documentElement.style.fontSize = `${currentFontSize}px`;
            }
        });
    }

    if (btnToggleContrast) {
        btnToggleContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
        });
    }

    /* ==========================================================================
       2. NAVEGAÇÃO DE ABAS (TABS)
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabTarget = button.getAttribute('data-tab');

            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            
            const targetElement = document.getElementById(tabTarget);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       3. CARROSSEL DE DEPOIMENTOS (ARRAY DE OBJETOS)
       ========================================================================== */
    const testimonialsData = [
        {
            text: '"A implantação das palestras e a caixa de denúncias anônimas mudaram completamente o clima da nossa escola. Os alunos se sentem protegidos."',
            author: 'Profª Maria Rita',
            role: 'Diretora Pedagógica'
        },
        {
            text: '"Eu sofria calado na internet e não sabia a quem recorrer. Com o material de orientação, entendi meus direitos e recebi ajuda dos meus pais."',
            author: 'Lucas S., 14 anos',
            role: 'Estudante do Ensino Fundamental'
        },
        {
            text: '"Como pai, é confortante saber que a escola tem um protocolo claro para combater a discriminação antes que ela se torne um trauma."',
            author: 'Carlos Eduardo',
            role: 'Pai de Aluno'
        }
    ];

    const carouselContainer = document.getElementById('carousel-container');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    let currentSlide = 0;

    function renderCarousel() {
        if (!carouselContainer) return;
        
        carouselContainer.innerHTML = testimonialsData.map((item, index) => `
            <div class="testimonial-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                <p class="testimonial-text">${item.text}</p>
                <div class="testimonial-author">${item.author}</div>
                <div class="testimonial-role">${item.role}</div>
            </div>
        `).join('');
    }

    function showSlide(index) {
        const slides = document.querySelectorAll('.testimonial-item');
        if (slides.length === 0) return;

        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === currentSlide);
        });
    }

    if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', () => showSlide(currentSlide - 1));
        btnNext.addEventListener('click', () => showSlide(currentSlide + 1));
    }

    renderCarousel();

    /* ==========================================================================
       4. ACORDEÃO DE DÚVIDAS - FAQ (ARRAY DE OBJETOS)
       ========================================================================== */
    const faqData = [
        {
            question: 'Qual é a diferença entre brincadeira e bullying?',
            answer: 'O bullying é caracterizado pela intencionalidade de ferir, repetição contínua e desequilíbrio de poder entre as partes. Brincadeiras são consensuais e divertidas para todos os envolvidos.'
        },
        {
            question: 'Existe alguma legislação específica sobre o tema?',
            answer: 'Sim, a Lei Federal nº 13.185/2015 institui o Programa de Combate à Intimidação Sistemática (Bullying) em todo o território nacional, obrigando estabelecimentos de ensino a adotarem medidas de prevenção.'
        },
        {
            question: 'Como a escola garante o anonimato das denúncias?',
            answer: 'Oferecemos formulários protegidos sem necessidade de identificação e caixas físicas de acolhimento mantidas sob responsabilidade restrita da orientação pedagógica.'
        },
        {
            question: 'O que caracteriza o cyberbullying?',
            answer: 'É a prática de intimidação, humilhação, exposição não autorizada de fotos ou disseminação de boatos utilizando meios virtuais, como redes sociais e aplicativos de mensagem.'
        }
    ];

    const accordionContainer = document.getElementById('accordion-container');

    function renderAccordion() {
        if (!accordionContainer) return;

        accordionContainer.innerHTML = faqData.map((item, index) => `
            <div class="accordion-item">
                <button class="accordion-header" data-accordion="${index}">
                    <span>${item.question}</span>
                    <span class="accordion-icon">&#9660;</span>
                </button>
                <div class="accordion-body">
                    <p>${item.answer}</p>
                </div>
            </div>
        `).join('');

        const headers = accordionContainer.querySelectorAll('.accordion-header');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const parent = header.parentElement;
                const isActive = parent.classList.contains('active');

                // Fecha todos os itens
                document.querySelectorAll('.accordion-item').forEach(item => {
                    item.classList.remove('active');
                });

                // Alterna o atual
                if (!isActive) {
                    parent.classList.add('active');
                }
            });
        });
    }

    renderAccordion();

    /* ==========================================================================
       5. TRATAMENTO DO FORMULÁRIO DE CONTATO
       ========================================================================== */
    const mainForm = document.getElementById('main-form');
    if (mainForm) {
        mainForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensagem enviada com sucesso e total segurança! Nossa equipe entrará em contato se solicitado.');
            mainForm.reset();
        });
    }
});