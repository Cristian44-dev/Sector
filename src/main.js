const d = document;
const options = {
    rootMargin: "0px",
    threshold: .8,
};
let des = 0;
const $navegacion = d.querySelectorAll("[data-section]");
const $navegacion__barra = d.querySelector(".barra");
const $icons = d.querySelectorAll(".icons i");
const $navegacion__ul = d.querySelector('.navegacion__container ul')
const observer = new IntersectionObserver(desplazamiento, options);
$navegacion.forEach((item) => observer.observe(item));

function desplazamiento(entries) {
    const section_active = d.querySelector("[data-active]");
    const section_active_number = d.querySelector("[data-active]").dataset.section;
    entries.forEach((element) => {            
        if (element.isIntersecting) {
            const section = element.target;
            const section_number = parseInt(element.target.dataset.section);
            if (section_number >= 1) {
                $navegacion__barra.style.backgroundColor = "var(--color-accent)";
                $navegacion__ul.style.color = "white";
                $icons.forEach((elem) => elem.style.color="white");
            }else{
                $navegacion__barra.style.backgroundColor = "var(--color-bg)";
                $navegacion__ul.style.color = "var(--color-bg)";
                $icons.forEach((elem) => elem.style.color="var(--color-bg)");
            }
            if (section_number > section_active_number) {
                section.setAttribute("data-active", "");
                section_active.removeAttribute("data-active");
                $navegacion__barra.style.transform = `translateY(${(des += 4.5)}rem)`;
            } else if (section_number < section_active_number) {
                section.setAttribute("data-active", "");
                section_active.removeAttribute("data-active");
                $navegacion__barra.style.transform = `translateY(${(des -= 4.5)}rem)`;
            }
        }
    });
}
