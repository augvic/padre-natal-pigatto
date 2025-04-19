// ================================================== \\

// ~~ Classe que manipula as animações da página.
class AnimationsController {

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
                { classe: ".titulo-comunicados", animacao: "animate-fade-in-1" }
            ]
        },
        {
            sessao: "#postagens",
            dados: [
                { classe: ".titulo-postagens", animacao: "animate-fade-in-1" }
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
        ".historia-swiper",
        ".equipe-swiper"
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

    // ~~ Inicia carrossel.
    initCarrossel() {
        this.carrousels.forEach(carrousel => {
            const swiper = new Swiper(carrousel, {
                loop: true,
                grabCursor: true,
                spaceBetween: 20,
                slidesPerView: 1,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        });

    }

    // ================================================== \\

}

// ================================================== \\

// ~~ Cria instância.
const animationsController = new AnimationsController();

// ~~ Inicia função.
animationsController.resetarAnimacoes();
animationsController.initCarrossel();

// ================================================== \\