const images = document.querySelectorAll(".duo-gallery img");
const diaporama = document.getElementById("diaporama");
const diaporamaImg = document.querySelector(".diaporama-img");
const closeBtn = document.querySelector(".diaporama-close");
const nextBtn = document.querySelector(".diaporama-next");
const prevBtn = document.querySelector(".diaporama-prev");

let currentIndex = 0;

images.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        showImage();
        diaporama.classList.remove("hidden");
        requestAnimationFrame(() => {
            diaporama.classList.add("show");
        })
    });
});

function showImage() {
    diaporamaImg.src = images[currentIndex].src;
}

function closeDiaporamaBox() {
    diaporama.classList.remove("show");
    setTimeout(() => {
        diaporama.classList.add("hidden");
    }, 300);
}

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
});

closeBtn.addEventListener("click",closeDiaporamaBox);

diaporama.addEventListener("click", (e) => {
    if (e.target === diaporama) {
        closeDiaporamaBox;
    }
});
