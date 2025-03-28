document.addEventListener("DOMContentLoaded", function () {
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    dropdownBtn.addEventListener("click", function (event) {
        event.preventDefault();
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
        if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});







document.querySelectorAll(".slider").forEach((slider) => {
    const slides = slider.querySelector(".slides");
    const slidesArray = slider.querySelectorAll(".slide");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");

    let index = 0;

    function updateSlideWidth() {
        const slideWidth = slider.offsetWidth; // Обновляем ширину
        slides.style.width = `${slidesArray.length * slideWidth}px`;
        slidesArray.forEach(slide => slide.style.width = `${slideWidth}px`);
        showSlide(index, false);
    }

    function showSlide(i, animate = true) {
        const slideWidth = slider.offsetWidth;
        slides.style.transition = animate ? "transform 0.5s ease-in-out" : "none";
        slides.style.transform = `translateX(${-index * slideWidth}px)`;

        // Отключаем кнопки, если находимся в начале или конце
        prevBtn.style.opacity = index === 0 ? "0.5" : "1";
        prevBtn.style.pointerEvents = index === 0 ? "none" : "auto";
        nextBtn.style.opacity = index === slidesArray.length - 1 ? "0.5" : "1";
        nextBtn.style.pointerEvents = index === slidesArray.length - 1 ? "none" : "auto";
    }

    nextBtn.addEventListener("click", () => {
        if (index < slidesArray.length - 1) {
            index++;
            showSlide(index);
        }
    });

    prevBtn.addEventListener("click", () => {
        if (index > 0) {
            index--;
            showSlide(index);
        }
    });

    // Поддержка свайпа
    let startX = 0;
    slides.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    slides.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        if (startX > endX + 50 && index < slidesArray.length - 1) {
            index++;
        } else if (startX < endX - 50 && index > 0) {
            index--;
        }
        showSlide(index);
    });

    // Автообновление ширины при изменении экрана
    window.addEventListener("resize", updateSlideWidth);
    updateSlideWidth(); // Инициализация размеров
});






