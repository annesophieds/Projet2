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
document.addEventListener("keydown", (e) => {
    if (diaporama.classList.contains("hidden")) return;

    if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % images.length;
        showImage();
    }

    if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage();
    }

    if (e.key === "Escape") {
        closeDiaporamaBox();
    }
});

/* Support tactile (swipe mobile) */
let startX = 0;

diaporama.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

diaporama.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            currentIndex = (currentIndex + 1) % images.length;
        } else {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }
        showImage();
    }
});

/* Préchargement des images */
images.forEach(img => {
    const preload = new Image();
    preload.src = img.src;
});
