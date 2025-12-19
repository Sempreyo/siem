document.addEventListener("DOMContentLoaded", () => {
	const sectionHero = document.querySelector(".hero");
	const sectionAdvantages = document.querySelector(".advantages");
	const solutionCards = document.querySelectorAll("[data-solution-order]");
	const sectionReason = document.querySelector(".reason");
	const sectionRules = document.querySelectorAll(".rules__group");
	const sectionCases = document.querySelector(".cases");
	const video = document.querySelector(".video video");
	const videoPoster = document.querySelector(".video .video__poster");
	const tooltip = document.querySelector(".solutions__tooltip");

	/* Разделить строку на символы */
	/*const splitText = new SplitType(".split-title", {
		types: "chars"
	});*/

	if (video) {
		videoPoster.addEventListener("click", (e) => {
			e.currentTarget.setAttribute("hidden", "true");
			video.play();
		});
	}

	/* Установить высоту флип карточек по самой высокой стороне */
	const updateCardHeight = () => {
		let maxHeight;

		solutionCards.forEach(card => {
			const frontHeight = card.querySelector(".solutions-card__front").scrollHeight;
			const backHeight = card.querySelector(".solutions-card__back").scrollHeight;
			maxHeight = Math.max(frontHeight, backHeight);
		});

		solutionCards.forEach(card => {
			const front = card.querySelector(".solutions-card__front");
			const back = card.querySelector(".solutions-card__back");

			card.style.height = `${maxHeight}px`;
			front.style.height = `${maxHeight}px`;
			back.style.height = `${maxHeight}px`;
		});
	}

	updateCardHeight();

	window.addEventListener("resize", updateCardHeight);

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

	/*animateSection(sectionHero, () => {
		sectionHero.querySelector(".split-title").classList.add("visible");
		const chars = sectionHero.querySelectorAll(".split-title .char");

		chars.forEach((el, index) => {
			setTimeout(() => {
				el.style.transform = 'translateX(0)';
			}, 50 * index + 300);
		});
	});*/

	animateSection(sectionAdvantages);

	solutionCards.forEach(solution => {
		animateSection(solution);

		/* Смена карточек при клике */
		solution.addEventListener("click", (e) => {
			const flippedPart = e.currentTarget.querySelectorAll(".flipped")[e.currentTarget.querySelectorAll(".flipped").length - 1];

			if (flippedPart.nextElementSibling) {
				flippedPart.classList.remove("flipped");
				flippedPart
					.nextElementSibling
					.classList
					.add("flipped");
			} else {
				flippedPart.parentElement.querySelector(".solutions-card__bg-wrapper").classList.add("flipped");
				flippedPart.classList.remove("flipped");
			}
		});

		/* Тултип при ховере на карточку */
		solution.addEventListener("mouseover", () => {
			tooltip.classList.add("visible");
		});

		solution.addEventListener("mousemove", (e) => {
			const top = e.pageY - tooltip.offsetHeight - 10;
			const left = e.pageX - tooltip.offsetWidth / 2;
			const viewportWidth = window.innerWidth;

			if (e.pageX + tooltip.offsetWidth / 2 + 15 > viewportWidth) {
				tooltip.style.left = `calc(100% - ${tooltip.offsetWidth})`;
			} else if (left < 0) {
				tooltip.style.left = `0`;
			} else {
				tooltip.style.left = `${left}px`;
			}

			tooltip.style.top = `${top}px`;
		});

		solution.addEventListener("mouseleave", () => {
			tooltip.classList.remove("visible");
		});
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
