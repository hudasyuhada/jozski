
/* =========================================
   HUDA SYUHADA - PERSONAL WEBSITE
   JAVASCRIPT
========================================= */


/* =========================================
   1. INTERACTIVE HERO PHOTO
========================================= */

const heroPhoto = document.getElementById("heroPhoto");
const photoHint = document.getElementById("photoHint");

if (heroPhoto) {

    heroPhoto.addEventListener("click", function () {

        const isRevealed =
            heroPhoto.classList.toggle("is-revealed");

        heroPhoto.setAttribute(
            "aria-pressed",
            isRevealed
        );

        if (photoHint) {
            photoHint.textContent = isRevealed
                ? "CLICK AGAIN TO RETURN ↙"
                : "CLICK MY PHOTO TO REVEAL MY NAME ↗";
        }

    });

}


/* =========================================
   2. DIGITAL CLOCK
========================================= */

function updateClock() {

    const clock = document.getElementById("digitalClock");
    const date = document.getElementById("currentDate");

    const now = new Date();

    if (clock) {

        clock.textContent = now.toLocaleTimeString(
            "en-MY",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            }
        );

    }

    if (date) {

        date.textContent = now.toLocaleDateString(
            "en-MY",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    }

}

updateClock();

setInterval(updateClock, 1000);


/* =========================================
   3. GREETING MESSAGE
========================================= */

function updateGreeting() {

    const greeting = document.getElementById("greeting");

    if (!greeting) return;

    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {

        greeting.textContent = "Good morning, welcome!";

    } else if (hour >= 12 && hour < 18) {

        greeting.textContent = "Good afternoon, welcome!";

    } else {

        greeting.textContent = "Good evening, welcome!";

    }

}

updateGreeting();


/* =========================================
   4. SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(function (element) {

        element.classList.add("active");

    });

}


/* =========================================
   5. COLLECTION SEARCH
========================================= */

const searchInput = document.getElementById("collectionSearch");
const collectionCards = document.querySelectorAll(".collection-card");
const noResults = document.getElementById("noResults");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchValue = searchInput.value
            .toLowerCase()
            .trim();

        let visibleCount = 0;

        collectionCards.forEach(function (card) {

            const searchText = (
                card.textContent + " " +
                (card.dataset.search || "")
            ).toLowerCase();

            const isMatch = searchText.includes(searchValue);

            card.style.display = isMatch ? "" : "none";

            if (isMatch) {
                visibleCount++;
            }

        });

        if (noResults) {

            noResults.style.display =
                visibleCount === 0 ? "block" : "none";

        }

    });

}


/* =========================================
   6. MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", function () {

        navigation.classList.toggle("show");

        const isOpen = navigation.classList.contains("show");

        menuToggle.textContent = isOpen ? "✕" : "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    // Close menu after selecting a section

    const navigationLinks = navigation.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navigation.classList.remove("show");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================
   7. BACKGROUND MUSIC
========================================= */

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

if (backgroundMusic && musicButton) {

    musicButton.addEventListener("click", async function () {

        if (backgroundMusic.paused) {

            try {

                await backgroundMusic.play();

                musicButton.textContent = "♫ Music On";

            } catch (error) {

                musicButton.textContent = "♫ Try Again";

                console.log("Music could not be played:", error);

            }

        } else {

            backgroundMusic.pause();

            musicButton.textContent = "♫ Play Music";

        }

    });

}
