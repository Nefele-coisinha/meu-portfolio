document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ANO AUTOMÁTICO
    // =====================================

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =====================================
    // MENU MOBILE
    // =====================================

    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        if (!menuButton || !navigation) return;

        menuButton.classList.remove("open");
        navigation.classList.remove("open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menu");
    }

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {
            const isOpen = !navigation.classList.contains("open");

            navigation.classList.toggle("open", isOpen);
            menuButton.classList.toggle("open", isOpen);

            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", (event) => {
            const clickedMenu = navigation.contains(event.target);
            const clickedButton = menuButton.contains(event.target);

            if (!clickedMenu && !clickedButton) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 600) {
                closeMenu();
            }
        });
    }


    // =====================================
    // DESTAQUE DA SEÇÃO ATUAL
    // =====================================

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const sectionId = entry.target.id;

                    navLinks.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === `#${sectionId}`;

                        link.classList.toggle("active", isActive);
                    });
                });
            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }


    // =====================================
    // ANIMAÇÕES AO ROLAR A PÁGINA
    // =====================================

    const revealElements = document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }


    // =====================================
    // FECHAR MENU COM A TECLA ESC
    // =====================================

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

});