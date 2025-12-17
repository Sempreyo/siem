document.addEventListener("DOMContentLoaded", () => {
	const sectionHero = document.querySelector(".hero");
	const sectionAdvantages = document.querySelector(".advantages");
	const video = document.querySelector(".video video");
	const videoPoster = document.querySelector(".video .video__poster");

	if (video) {
		videoPoster.addEventListener("click", (e) => {
			e.currentTarget.setAttribute("hidden", "true");
			video.play();
		});
	}

	const animateSection = (section, cb) => {
		if (section) {
			const observerSection = new IntersectionObserver((entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						section.classList.remove("animate");

						if (cb != undefined) {
							cb();
						}
					}
				});
			}, { threshold: 0.2 });

			observerSection.observe(section);
		}
	}

	animateSection(sectionHero, () => {
		/* Разделить строку на символы */
		const splitText = new SplitType(".split-title", {
			types: "chars"
		});

		sectionHero.querySelector(".split-title").classList.add("visible");
		const chars = sectionHero.querySelectorAll(".split-title .char");

		chars.forEach((el, index) => {
			setTimeout(() => {
				el.style.transform = 'translateX(0)';
			}, 50 * index + 700);
		});
	});

	animateSection(sectionAdvantages);
});
