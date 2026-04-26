const memoriesGalleryGrid = document.querySelector(".gallery-grid");
const memoryImages = [
    "Happy Birthday_files/Pictures/ML/The First Picture.jpeg",
    "Happy Birthday_files/Pictures/ML/Kayaking.jpeg",
    "Happy Birthday_files/Pictures/ML/four smiles & vidhan soudha.jpg",
    "Happy Birthday_files/Pictures/ML/Birthday Glow.jpg",
    "Happy Birthday_files/Pictures/ML/Chaos and Fun.jpg",
    "Happy Birthday_files/Pictures/ML/Sigma smiles.jpg",
    "Happy Birthday_files/Pictures/ML/Bengaluru Fort.jpg",
    "Happy Birthday_files/Pictures/ML/Godavari gattu.jpg",
    "Happy Birthday_files/Pictures/ML/sweet truffles.jpg",
    "Happy Birthday_files/Pictures/ML/US!!.jpg",
    "Happy Birthday_files/Pictures/ML/two life jackets zero worries.jpeg",
    "Happy Birthday_files/Pictures/ML/Tales of HYD.jpg",
    "Happy Birthday_files/Pictures/ML/2k25 cake.jpg",
    "Happy Birthday_files/Pictures/ML/Bhadrachala ramuni blessings.jpg",
    "Happy Birthday_files/Pictures/ML/Dosa with the best person.jpg",
    "Happy Birthday_files/Pictures/ML/Caught in the moment.jpg",
    "Happy Birthday_files/Pictures/ML/Smiles at Mysuru.jpg",
    "Happy Birthday_files/Pictures/ML/PET Master achievements.jpg",
    "Happy Birthday_files/Pictures/ML/shared kunafa and smiles.jpg",
    "Happy Birthday_files/Pictures/ML/Marina Days.jpg",
    "Happy Birthday_files/Pictures/ML/Nandi Hill rides.jpg",
    "Happy Birthday_files/Pictures/ML/Dog Love.jpeg",
    "Happy Birthday_files/Pictures/ML/sweet 24.jpg",
    "Happy Birthday_files/Pictures/ML/Badminton Teamspirit.jpg",
    "Happy Birthday_files/Pictures/ML/Smash the shuttle.jpg",
    "Happy Birthday_files/Pictures/ML/Smiles that stayed.jpg",
    "Happy Birthday_files/Pictures/ML/Forum Plans big memories.jpg"
];
const revealDelayClasses = ["", "delay-1", "delay-2"];

const prettifyMemoryLabel = (imagePath) => {
    const filename = imagePath.split("/").pop() || "memory";
    return filename
        .replace(/\.[^.]+$/, "")
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
};

const randomCardRotation = () => {
    const magnitude = 2 + Math.floor(Math.random() * 4);
    return `${Math.random() < 0.5 ? -magnitude : magnitude}deg`;
};

let lightboxTriggers = [];

const bindLightboxTriggers = () => {
    lightboxTriggers = Array.from(document.querySelectorAll("[data-gallery-image], .polaroid img"));

    lightboxTriggers.forEach((trigger, index) => {
        trigger.onclick = () => openLightboxAt(index);
    });
};

if (memoriesGalleryGrid) {
    const galleryMarkup = document.createDocumentFragment();

    memoryImages.forEach((imagePath, index) => {
        const label = prettifyMemoryLabel(imagePath);
        const article = document.createElement("article");
        const button = document.createElement("button");
        const image = document.createElement("img");
        const caption = document.createElement("p");
        const delayClass = revealDelayClasses[index % revealDelayClasses.length];

        article.className = `gallery-card reveal${delayClass ? ` ${delayClass}` : ""}`;
        article.style.setProperty("--card-rotate", randomCardRotation());

        button.className = "gallery-shot";
        button.type = "button";
        button.dataset.galleryImage = "";
        button.dataset.fullSrc = imagePath;
        button.dataset.alt = label;
        button.dataset.caption = label;

        image.src = imagePath;
        image.alt = label;
        image.loading = "lazy";
        image.decoding = "async";

        caption.textContent = label;

        button.appendChild(image);
        article.append(button, caption);
        galleryMarkup.appendChild(article);
    });

    memoriesGalleryGrid.replaceChildren(galleryMarkup);
    bindLightboxTriggers();
}

const scrollIndicator = document.getElementById("scrollIndicator");
const memoriesSection = document.getElementById("memories");
const revealItems = document.querySelectorAll(".reveal");
const letterLines = document.querySelectorAll(".letter-line");
const heartsLayer = document.getElementById("heartsLayer");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeLightboxMedia = lightboxImage;
const lightboxCaption = document.createElement("p");
let activeLightboxIndex = -1;

lightboxCaption.className = "lightbox-caption";
lightboxCaption.style.margin = "14px 0 0";
lightboxCaption.style.color = "#fff7f0";
lightboxCaption.style.textAlign = "center";
lightboxCaption.style.fontSize = "0.95rem";
lightboxCaption.style.lineHeight = "1.45";

const scrollToMemories = () => {
    if (!memoriesSection) {
        return;
    }

    memoriesSection.scrollIntoView({
        behavior: prefersReducedMotion.matches ? "auto" : "smooth",
        block: "start"
    });
};

if (scrollIndicator) {
    scrollIndicator.addEventListener("click", scrollToMemories);
}

let autoScrollTriggered = false;

letterLines.forEach((line, index) => {
    line.style.setProperty("--line-delay", `${0.18 + (index * 0.16)}s`);
});

window.addEventListener("wheel", () => {
    if (autoScrollTriggered || window.scrollY > 20 || prefersReducedMotion.matches) {
        return;
    }

    autoScrollTriggered = true;
    scrollToMemories();
}, { passive: true });

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.18
    });

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (heartsLayer && !prefersReducedMotion.matches) {
    const heartSymbols = ["♥", "♡"];
    const heartCount = 16;

    for (let index = 0; index < heartCount; index += 1) {
        const heart = document.createElement("span");
        heart.className = "heart";
        heart.textContent = heartSymbols[index % heartSymbols.length];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${10 + Math.random() * 10}s`;
        heart.style.animationDelay = `${Math.random() * 8}s`;
        heart.style.setProperty("--drift", `${-40 + Math.random() * 80}px`);
        heart.style.fontSize = `${12 + Math.random() * 18}px`;
        heartsLayer.appendChild(heart);
    }
}

const setLightboxImage = (trigger) => {
    if (!lightbox || !activeLightboxMedia) {
        return null;
    }

    const caption = trigger.dataset?.caption || trigger.dataset?.alt || trigger.alt || "";
    const imageSrc = trigger.dataset?.fullSrc || trigger.currentSrc || trigger.src || "";
    const nextMedia = document.createElement("img");

    nextMedia.src = imageSrc;
    nextMedia.alt = caption;

    nextMedia.className = "lightbox-image";
    nextMedia.id = "lightboxImage";
    activeLightboxMedia.replaceWith(nextMedia);
    activeLightboxMedia = nextMedia;
    lightboxCaption.textContent = caption;

    if (!lightboxCaption.isConnected) {
        activeLightboxMedia.after(lightboxCaption);
    }

    return activeLightboxMedia;
};

const updateLightboxNavState = () => {
    if (!lightboxPrev || !lightboxNext) {
        return;
    }

    const hasGallery = lightboxTriggers.length > 1;
    lightboxPrev.hidden = !hasGallery;
    lightboxNext.hidden = !hasGallery;
};

const openLightboxAt = (index) => {
    const trigger = lightboxTriggers[index];

    if (!trigger || !lightbox) {
        return;
    }

    activeLightboxIndex = index;
    setLightboxImage(trigger);
    updateLightboxNavState();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
};

const moveLightbox = (direction) => {
    if (!lightbox.classList.contains("is-open") || lightboxTriggers.length === 0) {
        return;
    }

    const nextIndex = (activeLightboxIndex + direction + lightboxTriggers.length) % lightboxTriggers.length;
    openLightboxAt(nextIndex);
};

const closeLightbox = () => {
    if (!lightbox || !activeLightboxMedia) {
        return;
    }

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    activeLightboxMedia.removeAttribute("src");
    activeLightboxMedia.removeAttribute("alt");
    lightboxCaption.textContent = "";
    activeLightboxIndex = -1;
    document.body.style.overflow = "";
};

if (lightbox) {
    lightbox.addEventListener("click", (event) => {
        if (event.target instanceof HTMLElement && event.target.hasAttribute("data-lightbox-close")) {
            closeLightbox();
        }
    });
}

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => moveLightbox(-1));
}

if (lightboxNext) {
    lightboxNext.addEventListener("click", () => moveLightbox(1));
}

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox?.classList.contains("is-open")) {
        closeLightbox();
        return;
    }

    if (!lightbox?.classList.contains("is-open")) {
        return;
    }

    if (event.key === "ArrowLeft") {
        moveLightbox(-1);
    }

    if (event.key === "ArrowRight") {
        moveLightbox(1);
    }
});
