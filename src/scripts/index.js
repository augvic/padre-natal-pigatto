class PageController {
    
    sessoes = [
        {
            sessao: "#inicio",
            dados: [
                { classe: ".titulo-inicio", animacao: "animate-fade-in-1" },
                { classe: ".subtitulo-inicio", animacao: "animate-fade-in-2" },
            ]
        },
        {
            sessao: "#comunicados",
            dados: [
                { classe: ".titulo-comunicados", animacao: "animate-fade-in-1" },
                { classe: ".calendario-comunicados", animacao: "animate-fade-in-2" }
            ]
        },
        {
            sessao: "#postagens",
            dados: [
                { classe: ".titulo-postagens", animacao: "animate-fade-in-1" },
                { classe: ".postagens-lista", animacao: "animate-fade-in-2" }
            ]
        },
        {
            sessao: "#equipe",
            dados: [
                { classe: ".titulo-equipe", animacao: "animate-fade-in-1" },
                { classe: ".equipe-carrousel", animacao: "animate-fade-in-2" }
            ]
        },
        {
            sessao: "#contato",
            dados: [
                { classe: ".titulo-contato", animacao: "animate-fade-in-1" }
            ]
        },
        {
            sessao: "#historia",
            dados: [
                { classe: ".historia-titulo", animacao: "animate-fade-in-1" },
                { classe: ".historia-paragrafo", animacao: "animate-fade-in-2" },
                { classe: ".historia-carrousel", animacao: "animate-fade-in-3" },
            ]
        }
    ];
    carrousels = [
        { classe: ".historia-swiper", autoplay: true },
        { classe: ".equipe-swiper", autoplay: true },
    ];
    
    resetarAnimacoes() {
        this.sessoes.forEach(sessao => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        sessao.dados.forEach(dado => {
                            let elemento = document.querySelector(dado.classe);
                            elemento.classList.remove(dado.animacao);
                            void elemento.offsetWidth;
                            elemento.classList.add(dado.animacao);
                        });
                    }
                });
            }, { threshold: 0.1 });
            const elementoSessao = document.querySelector(sessao.sessao);
            if (elementoSessao) observer.observe(elementoSessao);
        });
    }
    
    initCarrossel() {
        this.carrousels.forEach(carrousel => {
            const config = {
                loop: true,
                grabCursor: true,
                spaceBetween: 20,
                slidesPerView: 1,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            };
            if (carrousel.autoplay) {
                config.autoplay = {
                    delay: 4000,
                    disableOnInteraction: false
                };
            }
            new Swiper(carrousel.classe, config);
        });
    }
    
    async carregarComunicados() {
        const eventos = [];
        const querySnapshot = [{titulo: "titulo", data: "data", descricao: "descricao", imagens: []}];
        querySnapshot.forEach(data => {
            if (data.data) {
                eventos.push({
                    title: data.titulo,
                    date: data.data,
                    extendedProps: {
                        descricao: data.descricao,
                        imagens: data.imagens || []
                    }
                });
            }
        });
        const calendarioEl = document.getElementById('calendario');
        const calendar = new FullCalendar.Calendar(calendarioEl, {
            initialView: 'dayGridMonth',
            locale: 'pt-br',
            height: 'auto',
            events: eventos,
            noEventsContent: 'Nenhum evento para exibir.',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,listMonth'
            },
            buttonText: {
                today: 'Hoje',
                month: 'Mês',
                list: 'Lista'
            },
            dateClick: function(info) {
                const dataSelecionada = info.dateStr;
                const eventosDoDia = eventos.filter(ev => ev.date === dataSelecionada);
                if (eventosDoDia.length === 0) return;
                const modalTitulo = document.getElementById('modalTitulo');
                const modalImagens = document.getElementById('modalImagens');
                modalTitulo.textContent = `Comunicados para o dia ${new Date(dataSelecionada).toLocaleDateString('pt-BR')}`;
                modalTitulo.style.textAlign = "center";
                modalImagens.innerHTML = '';
                eventosDoDia.forEach((ev, index) => {
                    const bloco = document.createElement('div');
                    bloco.className = 'bg-gray-50 p-4 rounded-xl shadow border border-[rgb(155,182,255)]';
                    const titulo = `<h3 class="text-xl font-bold mb-2">${ev.title}</h3>`;
                    const descricao = `<p class="text-gray-600 mb-4">${ev.extendedProps.descricao || ''}</p>`;
                    let imagensHTML = '';
                    if ((ev.extendedProps.imagens || []).length > 0) {
                        imagensHTML = `
                            <div class="swiper swiper-comunicado-${index} w-full">
                                <div class="swiper-wrapper">
                                    ${ev.extendedProps.imagens.map(img => `
                                        <div class="swiper-slide">
                                            <img src="${img}" class="w-full h-64 object-contain rounded border border-[rgb(155,182,255)] bg-white p-1" />
                                        </div>
                                    `).join('')}
                                </div>
                                <div class="swiper-pagination mt-2"></div>
                            </div>
                        `;
                    }
                    bloco.innerHTML = titulo + descricao + imagensHTML;
                    modalImagens.appendChild(bloco);
                });
                setTimeout(() => {
                    eventosDoDia.forEach((_, index) => {
                        new Swiper(`.swiper-comunicado-${index}`, {
                            loop: true,
                            grabCursor: true,
                            slidesPerView: 1,
                            spaceBetween: 20,
                            pagination: {
                                el: `.swiper-comunicado-${index} .swiper-pagination`,
                                clickable: true,
                            },
                            autoplay: {
                                delay: 4000,
                                disableOnInteraction: false
                            }
                        });
                    });
                }, 0);
                document.getElementById('modalComunicado').classList.remove('hidden');
            },
            eventClick: function(info) {
                const evento = info.event;
                const { title, extendedProps } = evento;
                const imagensHTML = (extendedProps.imagens || []).map(img => `
                    <div class="swiper-slide">
                        <img src="${img}" class="w-full h-64 object-contain rounded-xl border border-[rgb(155,182,255)] shadow" />
                    </div>
                `).join('');
                const carrosselHTML = imagensHTML ? `
                    <div class="swiper comunicados-swiper w-full mb-4">
                        <div class="swiper-wrapper">
                            ${imagensHTML}
                        </div>
                        <div class="swiper-pagination mt-2"></div>
                    </div>
                ` : '';
                const modalContent = document.getElementById('comunicadoModalContent');
                modalContent.innerHTML = `
                    <h2 class="text-xl font-bold mb-2">${title}</h2>
                    <p class="text-gray-600 mb-4">${extendedProps.descricao || ''}</p>
                    ${carrosselHTML}
                `;
                document.getElementById('comunicadoModal').classList.remove('hidden');
                if (imagensHTML) {
                    new Swiper('.comunicados-swiper', {
                        loop: true,
                        grabCursor: true,
                        spaceBetween: 20,
                        slidesPerView: 1,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        autoplay: {
                            delay: 4000,
                            disableOnInteraction: false
                        }
                    });
                }
            }
        });
        calendar.render();
    }
    
    async carregarPostagens() {
        const container = document.querySelector('.postagens-lista');
        container.innerHTML = '';
        window.postagensStore = [];
        try {
            const querySnapshot = [{imagens: null, titulo: "Título", data: "Data", index: 1}];
            querySnapshot.forEach((data) => {
                const primeiraImagem = data.imagens?.[0] || null;
                const postHTML = `
                    <div class="cursor-pointer flex items-center gap-4 bg-white p-4 rounded-xl shadow border border-blue-300 hover:bg-blue-50 transition"
                        onclick="window.pageController.abrirModalPostagem()">
                        ${primeiraImagem
                            ? `<img src="${primeiraImagem}" class="w-24 h-24 object-cover rounded-lg border border-blue-200" />`
                            : `<div class="w-24 h-24 flex items-center justify-center bg-blue-100 rounded-lg text-blue-600 font-semibold">Sem imagem</div>`
                        }
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">${data.titulo}</h3>
                            <p class="text-sm text-gray-500">Postado em: ${data.data}</p>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', postHTML);
                window.postagensStore.push(data);
            });
        } catch (error) {
            console.error('Erro ao carregar postagens:', error);
            container.innerHTML = `<p class="text-red-500">Erro ao carregar postagens. Tente novamente mais tarde.</p>`;
        }
    }
    
    abrirModalPostagem() {
        document.getElementById('modalPostagemTitulo').textContent = "Título";
        document.getElementById('modalPostagemData').textContent = `Postado em: Data`;
        document.getElementById('modalPostagemDescricao').textContent = "Descrição" || '';
        const swiperWrapper = document.querySelector('#modalPostagemSwiper .swiper-wrapper');
        swiperWrapper.innerHTML = ([]).map(img => `
            <div class="swiper-slide">
                <img src="${img}" class="w-full h-64 object-contain rounded border border-blue-200 bg-white p-2" />
            </div>
        `).join('');
        if (window.modalPostagemSwiper && typeof window.modalPostagemSwiper.destroy === 'function') {
            window.modalPostagemSwiper.destroy(true, true);
        }
        setTimeout(() => {
            window.modalPostagemSwiper = new Swiper('#modalPostagemSwiper', {
                loop: true,
                grabCursor: true,
                spaceBetween: 20,
                slidesPerView: 1,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false
                }
            });
        }, 0);
        document.getElementById('modalPostagem').classList.remove('hidden');
    }
    
}

const pageController = new PageController();
window.pageController = pageController;
pageController.carregarComunicados();
pageController.carregarPostagens();
pageController.resetarAnimacoes();
pageController.initCarrossel();
