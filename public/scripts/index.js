// ================================================== \\

// ~~ Importa recursos.
import { db, collection, getDocs } from '../firebase/firebase-config.js';

// ================================================== \\

// ~~ Classe que manipula as animações da página.
class PageController {

    // ================================================== \\

    // ~~ Lista de sessoes que irão ser monitoradas para reset de animação.
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
                { classe: ".comunicados-carrousel", animacao: "animate-fade-in-2" }
            ]
        },
        {
            sessao: "#postagens",
            dados: [
                { classe: ".titulo-postagens", animacao: "animate-fade-in-1" },
                { classe: ".postagens-carrousel", animacao: "animate-fade-in-2" }
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

    // ~~ Lista com elementos para carrousel.
    carrousels = [
        { classe: ".historia-swiper", autoplay: true },
        { classe: ".equipe-swiper", autoplay: true },
        { classe: ".comunicados-swiper", autoplay: false },
        { classe: ".postagens-swiper", autoplay: false }
    ];

    // ================================================== \\

    // ~~ Função que irá resetar as animações.
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

    // ================================================== \\

    // ~~ Inicia carrossel.
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

    // ================================================== \\

    // ~~ Método para coletar comunicados do Firebase.
    async carregarComunicados() {
        const container = document.querySelector('.comunicados-swiper .swiper-wrapper');
        const querySnapshot = await getDocs(collection(db, 'comunicados'));
        querySnapshot.forEach(doc => {
            const data = doc.data();
            const imagensHTML = (data.imagens || []).map(imagem => `
                <div class="swiper-slide">
                    <img src="${imagem}" class="w-full h-64 object-cover border-4 border-[rgb(255,155,175)] shadow" />
                </div>
            `).join('');
            const comunicadoHTML = `
                <div class="swiper-slide flex justify-center">
                    <div class="bg-white rounded-2xl p-8 w-72 sm:w-80 md:w-[28rem] lg:w-[36rem] xl:w-[30rem] flex flex-col items-center text-center">
                        <div class="swiper comunicados-imagens-swiper w-full mb-6 overflow-hidden">
                            <div class="swiper-wrapper">
                                ${imagensHTML}
                            </div>
                            <div class="swiper-pagination mt-2"></div>
                        </div>
                        <h3 class="font-semibold text-xl">${data.titulo}</h3>
                        <p class="text-base text-gray-600 mt-2">${data.data}</p>
                        <p class="text-base text-gray-600 mt-2">${data.descricao}</p>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', comunicadoHTML);
        });
        document.querySelectorAll('.comunicados-imagens-swiper').forEach(swiperEl => {
            new Swiper(swiperEl, {
                loop: true,
                grabCursor: true,
                spaceBetween: 20,
                slidesPerView: 1,
                pagination: {
                    el: swiperEl.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false
                }
            });
        });
    }

    // ================================================== \\

    // ~~ Método para coletar postagens do Firebase.
    async carregarPostagens() {
        const container = document.querySelector('.postagens-swiper .swiper-wrapper');
        const querySnapshot = await getDocs(collection(db, 'postagens'));
        querySnapshot.forEach(doc => {
            const data = doc.data();
            const imagensHTML = (data.imagens || []).map(imagem => `
                <div class="swiper-slide">
                    <img src="${imagem}" class="w-full h-64 object-cover border-4 border-[rgb(255,155,175)] shadow" />
                </div>
            `).join('');
            const comunicadoHTML = `
                <div class="swiper-slide flex justify-center">
                    <div class="bg-white rounded-2xl p-8 w-72 sm:w-80 md:w-[28rem] lg:w-[36rem] xl:w-[30rem] flex flex-col items-center text-center">
                        <div class="swiper postagens-imagens-swiper w-full mb-6 overflow-hidden">
                            <div class="swiper-wrapper">
                                ${imagensHTML}
                            </div>
                            <div class="swiper-pagination mt-2"></div>
                        </div>
                        <h3 class="font-semibold text-xl">${data.titulo}</h3>
                        <p class="text-base text-gray-600 mt-2">${data.data}</p>
                        <p class="text-base text-gray-600 mt-2">${data.descricao}</p>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', comunicadoHTML);
        });
        document.querySelectorAll('.postagens-imagens-swiper').forEach(swiperEl => {
            new Swiper(swiperEl, {
                loop: true,
                grabCursor: true,
                spaceBetween: 20,
                slidesPerView: 1,
                pagination: {
                    el: swiperEl.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false
                }
            });
        });
    }

    // ================================================== \\

}

// ================================================== \\

// ~~ Cria instância.
const pageController = new PageController();

// ~~ Inicia funções.
pageController.carregarComunicados();
pageController.carregarPostagens();
pageController.resetarAnimacoes();
pageController.initCarrossel();

// ================================================== \\