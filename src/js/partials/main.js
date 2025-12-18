document.addEventListener("DOMContentLoaded", () => {
	const sectionHero = document.querySelector(".hero");
	const sectionAdvantages = document.querySelector(".advantages");
	const sectionSolution = Array.from(document.querySelectorAll("[data-solution-order]")).sort((a, b) => {
		return a.dataset.solutionOrder - b.dataset.solutionOrder;
	});
	const sectionReason = document.querySelector(".reason");
	const sectionRules = document.querySelectorAll(".rules__group");
	const sectionCases = document.querySelector(".cases");
	const video = document.querySelector(".video video");
	const videoPoster = document.querySelector(".video .video__poster");

	/* Разделить строку на символы */
	const splitText = new SplitType(".split-title", {
		types: "chars"
	});

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
						if (section.classList.contains("animate")) {
							section.classList.remove("animate");
						}

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
		sectionHero.querySelector(".split-title").classList.add("visible");
		const chars = sectionHero.querySelectorAll(".split-title .char");

		chars.forEach((el, index) => {
			setTimeout(() => {
				el.style.transform = 'translateX(0)';
			}, 50 * index + 300);
		});
	});

	animateSection(sectionAdvantages);

	sectionSolution.forEach(solution => {
		animateSection(solution);
	});

	animateSection(sectionReason, () => {
		const item = sectionReason.querySelectorAll(".reason__item:not(.reason__item--accent)");
		const itemAccent = sectionReason.querySelectorAll(".reason__item--accent");

		itemAccent.forEach((el, index) => {
			setTimeout(() => {
				el.classList.remove("animate-single");
			}, 200 * index);
		});

		setTimeout(() => {
			item.forEach((el, index) => {
				setTimeout(() => {
					el.classList.remove("animate-single");
				}, 200 * index);
			});
		}, 800);
	});

	sectionRules.forEach(rules => {
		animateSection(rules);
	});

	animateSection(sectionCases);
});
