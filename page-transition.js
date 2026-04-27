(function() {
    // Garante que o corpo da página comece invisível para a transição
    document.body.style.opacity = "0";

    window.addEventListener('load', () => {
        // Ativa o efeito de entrada
        document.body.classList.add('page-visible');
        document.body.style.opacity = "1";
    });

    document.addEventListener('DOMContentLoaded', () => {
        const links = document.querySelectorAll('a');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Verifica se é um link interno para aplicar a transição
                const isInternal = href && 
                                 !href.startsWith('http') && 
                                 !href.startsWith('#') && 
                                 !href.startsWith('mailto:') && 
                                 !href.startsWith('tel:') && 
                                 !link.target;

                if (isInternal) {
                    e.preventDefault();
                    
                    // Aplica o efeito de saída
                    document.body.classList.remove('page-visible');
                    document.body.classList.add('page-leaving');
                    
                    // Navega após o tempo da animação
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500);
                }
            });
        });
    });
})();
