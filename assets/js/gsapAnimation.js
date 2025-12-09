(function ($) {
    ("use strict");
    // DOM Ready

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(SplitText);
    var changetext = function () {
        if ($(".text-color-change").length) {
            $(".text-color-change").each(function () {
                const $el = $(this)[0];

                $el.wordSplit?.revert();
                $el.charSplit?.revert();

                $el.wordSplit = new SplitText($el, {
                    type: "words",
                    wordsClass: "word-wrapper",
                });
                $el.charSplit = new SplitText($el.wordSplit.words, {
                    type: "chars",
                    charsClass: "char-wrapper",
                });

                gsap.set($el.charSplit.chars, { color: "#525252" });

                gsap.to($el.charSplit.chars, {
                    color: "#ffffff",
                    stagger: { each: 0.03, from: "start" },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: $el,
                        start: "top 90%",
                        end: "bottom 35%",
                        scrub: 1.5,
                        toggleActions: "play none none reverse",
                    },
                });
            });
        }
        if ($(".text-color-change-2").length) {
            $(".text-color-change-2").each(function () {
                const $el = $(this)[0];

                $el.wordSplit?.revert();
                $el.charSplit?.revert();

                $el.wordSplit = new SplitText($el, {
                    type: "words",
                    wordsClass: "word-wrapper",
                });
                $el.charSplit = new SplitText($el.wordSplit.words, {
                    type: "chars",
                    charsClass: "char-wrapper",
                });

                gsap.set($el.charSplit.chars, { color: "#707070" });

                gsap.to($el.charSplit.chars, {
                    color: "#111111",
                    stagger: { each: 0.03, from: "start" },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: $el,
                        start: "top 90%",
                        end: "bottom 35%",
                        scrub: 1.5,
                        toggleActions: "play none none reverse",
                    },
                });
            });
        }
        if ($(".text-color-change-3").length) {
            $(".text-color-change-3").each(function () {
                const $el = $(this)[0];

                $el.wordSplit?.revert();
                $el.charSplit?.revert();

                $el.wordSplit = new SplitText($el, {
                    type: "words",
                    wordsClass: "word-wrapper",
                });
                $el.charSplit = new SplitText($el.wordSplit.words, {
                    type: "chars",
                    charsClass: "char-wrapper",
                });

                gsap.set($el.charSplit.chars, { color: "#BBBBBB" });

                gsap.to($el.charSplit.chars, {
                    color: "#1A1A1A",
                    stagger: { each: 0.03, from: "start" },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: $el,
                        start: "top 90%",
                        end: "bottom 35%",
                        scrub: 1.5,
                        toggleActions: "play none none reverse",
                    },
                });
            });
        }
        if ($(".scroll-down").length) {
            gsap.set(".progress-line", {
                height: "0%",
            });
            gsap.to(".progress-line", {
                height: "100%",
                duration: 2,
                scrollTrigger: {
                    trigger: ".scroll-down",
                    start: "top 25%",
                    end: "bottom 0%",
                    scrub: true,
                },
            });
        }
    };
    var paraScroll = () => {
        if ($(".wg-icon-2,.testimonial-v05,.work-item-d7.v2").length > 0) {
            function initParallax() {
                ScrollTrigger.getAll().forEach((st) => {
                    if (
                        st.trigger &&
                        (st.trigger.matches(".wg-icon-2") ||
                            st.trigger.matches(".testimonial-v05") ||
                            st.trigger.matches(".work-item-d7.v2"))
                    ) {
                        st.kill();
                    }
                });

                gsap.utils
                    .toArray(".wg-icon-2,.testimonial-v05,.work-item-d7.v2")
                    .forEach((el) => {
                        gsap.fromTo(
                            el,
                            { y: 100, opacity: 0.1, scale: 0.8 },
                            {
                                y: 0,
                                opacity: 1,
                                // duration: 5,
                                scale: 1,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: el,
                                    start: "top 90%",
                                    end: "top 20%",
                                    scrub: 1.5,
                                },
                            }
                        );
                    });

                ScrollTrigger.refresh();
            }

            initParallax();
        }
    };
    var featureAnimation = () => {
        const initFeature = () => {
            const section = document.querySelector(".section-feature");
            if (!section) return;

            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === section) trigger.kill();
            });

            const features = section.querySelectorAll(".feature-item");
            const images = section.querySelectorAll(".image-set .image");

            if (window.innerWidth < 768) {
                gsap.killTweensOf([features, images]);
                gsap.set(features, { clearProps: "all" });
                gsap.set(images, { clearProps: "all" });
                return;
            }

            if (!features.length || !images.length) return;

            gsap.set(features[0], { opacity: 1, y: 0 });
            gsap.set(images[0], { opacity: 1, y: 0 });

            gsap.set([...features].slice(1), { opacity: 0, y: 50 });
            gsap.set([...images].slice(1), { opacity: 0, y: 50 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () =>
                        `+=${(features.length - 1) * window.innerHeight * 0.7}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 0.1,
                    invalidateOnRefresh: true,
                },
            });

            for (let i = 1; i < features.length; i++) {
                const prevFeature = features[i - 1];
                const prevImg = images[i - 1];
                const feature = features[i];
                const img = images[i];

                tl.to(
                    [prevFeature, prevImg],
                    { opacity: 0, y: -40, duration: 0.5, ease: "power1.inOut" },
                    "+=0.1"
                ).to(
                    [feature, img],
                    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
                    "<"
                );
            }
        };

        let resizeTimeout;
        window.addEventListener("resize", () => {
            if (window.innerWidth <= 991) return;
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(initFeature, 300);
        });

        initFeature();
    };
    var businessAnimation = () => {
        if ($(".section-business-about").length > 0) {
            const section = document.querySelector(".section-business-about");
            const imgIcon = section.querySelector(".img-icon img");
            const nameSection = section.querySelector(".name-section");
            const title1 = section.querySelector(".title-1");
            const title2 = section.querySelector(".title-2");
            const wgAbout = section.querySelectorAll(".wg-about");
            const titleSection = section.querySelector(
                ".business-title-section"
            );

            const getInitialYPercent = () =>
                window.innerWidth <= 425 ? 50 : 100;

            gsap.set([title2, wgAbout], { opacity: 0, y: 40 });
            gsap.set([nameSection, title1], { opacity: 1 });
            gsap.set(imgIcon, { opacity: 0, scale: 0.85, yPercent: 10 });
            gsap.set(titleSection, {
                yPercent: getInitialYPercent(),
                opacity: 0.8,
            });

            gsap.to(imgIcon, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 50%",
                    end: "top top",
                    scrub: true,
                },
                opacity: 1,
                scale: 1,
                yPercent: 0,
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=4000",
                    scrub: true,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });

            tl.to(title1, { opacity: 0, scale: 0.96 }, "+=0.2")
                .to(title2, { opacity: 1, scale: 1, y: 0 }, "<")
                .to(imgIcon, { yPercent: -30, opacity: 0, scale: 1.1 }, "+=0.2")
                .to(titleSection, { yPercent: 0, opacity: 1 }, "<")
                .to(wgAbout, { opacity: 1, y: 0, stagger: 0.1 }, "<");

            const handleResize = () => {
                gsap.set(titleSection, { yPercent: getInitialYPercent() });
                ScrollTrigger.refresh();
            };

            window.addEventListener("resize", handleResize);
        }
    };

    var changeTextV2 = () => {
        function initTextColorLine() {
            document.querySelectorAll(".text-color-line").forEach((el) => {
                ScrollTrigger.getAll().forEach((trigger) => {
                    if (
                        trigger.trigger === el ||
                        el.contains(trigger.trigger)
                    ) {
                        trigger.kill();
                    }
                });

                el.lineSplit?.revert();
                el.wordSplit?.revert();
                el.charSplit?.revert();

                el.lineSplit = new SplitText(el, {
                    type: "lines",
                    linesClass: "line-wrapper",
                });
                el.wordSplit = new SplitText(el.lineSplit.lines, {
                    type: "words",
                    wordsClass: "word-wrapper",
                });
                el.charSplit = new SplitText(el.wordSplit.words, {
                    type: "chars",
                    charsClass: "char-wrapper",
                });

                gsap.set(el.charSplit.chars, { color: "#7e7b79" });

                el.lineSplit.lines.forEach((line) => {
                    gsap.to(line.querySelectorAll(".char-wrapper"), {
                        color: "#ffffff",
                        stagger: { each: 0.03, from: "start" },
                        ease: "none",
                        scrollTrigger: {
                            trigger: line,
                            start: "top 85%",
                            end: "bottom 40%",
                            scrub: 1.5,
                            toggleActions: "play none none reverse",
                            // markers: true,
                        },
                    });
                });
            });
        }

        initTextColorLine();

        let resizeTimer;
        window.addEventListener("resize", () => {
            if (window.innerWidth <= 425) return;
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                initTextColorLine();
                ScrollTrigger.refresh();
            }, 300);
        });
    };
    var paralaxImage = () => {
        if ($(".parallax-main").length > 0) {
            const isMobile = window.innerWidth < 767;
            gsap.utils.toArray(".parallax-main").forEach((section) => {
                const animations = [
                    {
                        cls: ".sc-fadeIn",
                        from: { opacity: 1 },
                        to: { opacity: 0 },
                    },
                    {
                        cls: ".parallax-scale",
                        from: { scale: 1 },
                        to: { scale: 1.2 },
                    },
                    {
                        cls: ".parallax-scale-in",
                        from: { scale: 1 },
                        to: { scale: 1.3 },
                    },
                    {
                        cls: ".parallax-scale-out",
                        from: { scale: 1.3 },
                        to: { scale: 1 },
                    },
                    {
                        cls: ".parallax-scaleIn-large",
                        from: { y: 100, scale: 1 },
                        to: { y: -100, scale: 1.3 },
                    },
                    {
                        cls: ".parallax-scaleInUp-large",
                        from: { y: -75, scale: 1 },
                        to: { y: 75, scale: 1.2 },
                    },
                    {
                        cls: ".parallax-x",
                        from: { xPercent: 10, scale: 1.2 },
                        to: { xPercent: -10 },
                    },
                    {
                        cls: ".parallax-x-reverse",
                        from: { xPercent: 10, scale: 1.2 },
                        to: { xPercent: -10 },
                    },
                    {
                        cls: ".parallax-y",
                        from: { yPercent: -10, scale: 1.2 },
                        to: { yPercent: 10 },
                    },
                    {
                        cls: ".parallax-y-reverse",
                        from: { yPercent: 10, scale: 1.2 },
                        to: { yPercent: -10 },
                    },
                    {
                        cls: ".parallax-y-large",
                        from: { y: -100, scale: 1.3 },
                        to: { y: 100 },
                    },
                    {
                        cls: ".parallax-top-bottom",
                        from: { y: -50 },
                        to: { y: 50 },
                    },
                    {
                        cls: ".parallax-bottom-top--20",
                        from: { yPercent: 20 },
                        to: { yPercent: -20 },
                    },
                    {
                        cls: ".prl-scale",
                        from: { scale: 1, yPercent: 0, opacity: 1 },
                        to: { scale: 0.5, yPercent: 600, opacity: 0 },
                    },
                    {
                        cls: ".prl-scale-2",
                        from: { scale: 1, yPercent: 0, opacity: 1 },
                        to: { scale: 0.7, yPercent: 100, opacity: 0 },
                    },
                    {
                        cls: ".prl-x-right",
                        from: { xPercent: 0 },
                        to: { xPercent: 30 },
                    },
                    {
                        cls: ".prl-x-left",
                        from: { xPercent: 0 },
                        to: { xPercent: -50 },
                    },
                    {
                        cls: ".prl-y-top-opa",
                        from: { yPercent: 0, opacity: 1 },
                        to: { yPercent: -50, opacity: 0.1 },
                    },
                ];

                animations.forEach(({ cls, from, to }) => {
                    const elements = section.querySelectorAll(cls);
                    if (!elements.length) return;

                    if (isMobile) {
                        if (cls === ".prl-x-right") to.xPercent = 10;
                        if (cls === ".prl-x-left") to.xPercent = -10;
                    }

                    elements.forEach((el) => {
                        let startPos = "top bottom";
                        let endPos = "bottom top";

                        if (el.classList.contains("pos-start-1")) {
                            startPos = "top 15%";
                        } else if (el.classList.contains("pos-start-2")) {
                            startPos = "top 30%";
                        } else if (el.classList.contains("pos-start-3")) {
                            startPos = "top 50%";
                        }

                        gsap.fromTo(el, from, {
                            ...to,
                            ease: "none",
                            scrollTrigger: {
                                trigger: section,
                                start: startPos,
                                end: endPos,
                                scrub: 0.5,
                                invalidateOnRefresh: true,
                                // markers: true,
                            },
                        });
                    });
                });
            });
        }
    };
    var processAnimation = () => {
        const initProcess = () => {
            const section = document.querySelector(".section-process");
            if (!section) return;

            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === section) trigger.kill();
            });

            const numbers = section.querySelectorAll(
                ".g-number-order .number-order"
            );
            const titles = section.querySelectorAll(".g-title .title");
            const descs = section.querySelectorAll(".g-desc .desc");
            const screens = section.querySelectorAll(
                ".simulator-iphone .screen"
            );
            const iphone = section.querySelector(".simulator-iphone");
            const pagItems = section.querySelectorAll(".pag-process .pag-item");

            if (
                !numbers.length ||
                !titles.length ||
                !descs.length ||
                !screens.length ||
                !iphone ||
                !pagItems.length
            )
                return;

            gsap.set([...numbers, ...titles, ...descs, ...screens], {
                opacity: 0,
                y: 50,
            });
            gsap.set([numbers[0], titles[0], descs[0], screens[0]], {
                opacity: 1,
                y: 0,
            });
            let baseRotation = 8;
            gsap.set(iphone, {
                rotation: baseRotation,
                transformOrigin: "center center",
            });

            pagItems.forEach((item) => item.classList.remove("active"));
            pagItems[0].classList.add("active");

            const totalSteps = Math.max(
                numbers.length,
                titles.length,
                descs.length,
                screens.length
            );

            for (let i = 1; i < totalSteps; i++) {
                const prevStep = [
                    numbers[i - 1],
                    titles[i - 1],
                    descs[i - 1],
                    screens[i - 1],
                ];
                const currStep = [numbers[i], titles[i], descs[i], screens[i]];

                ScrollTrigger.create({
                    trigger: section,
                    start: () => `top+=${i * window.innerHeight * 0.7} top`,
                    end: () => `top+=${(i + 1) * window.innerHeight * 0.7} top`,
                    scrub: 1,
                    onEnter: () => {
                        gsap.to(prevStep, {
                            opacity: 0,
                            y: -40,
                            duration: 0.5,
                            ease: "power1.inOut",
                        });
                        gsap.to(currStep, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: "power2.out",
                        });
                        baseRotation += 1;
                        gsap.to(iphone, {
                            rotation: baseRotation,
                            duration: 0.6,
                            ease: "power2.out",
                        });

                        pagItems.forEach((item) =>
                            item.classList.remove("active")
                        );
                        if (pagItems[i]) pagItems[i].classList.add("active");
                    },
                    onLeaveBack: () => {
                        gsap.to(currStep, {
                            opacity: 0,
                            y: 40,
                            duration: 0.5,
                            ease: "power1.inOut",
                        });
                        gsap.to(prevStep, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: "power2.out",
                        });
                        baseRotation -= 1;
                        gsap.to(iphone, {
                            rotation: baseRotation,
                            duration: 0.6,
                            ease: "power2.out",
                        });

                        pagItems.forEach((item) =>
                            item.classList.remove("active")
                        );
                        if (pagItems[i - 1])
                            pagItems[i - 1].classList.add("active");
                    },
                });
            }

            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: `+=${totalSteps * window.innerHeight * 0.7}`,
                pin: section,
                scrub: true,
                anticipatePin: 0,
                invalidateOnRefresh: true,
            });
        };

        let resizeTimeout;
        window.addEventListener("resize", () => {
            // clearTimeout(resizeTimeout);
            // resizeTimeout = setTimeout(initProcess, 300);
            if (window.innerWidth <= 991) return;
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(initProcess, 300);
        });

        initProcess();
    };
    var evolutionAnimation = () => {
        if ($(".context-wrap").length) {
            const contextWrap = document.querySelector(".context-wrap");
            const progressLine = document.querySelector(".progress-line");
            const boxes = document.querySelectorAll(".box-context");

            boxes[0].classList.add("active");

            const firstBoxHeight = boxes[0].offsetTop + boxes[0].offsetHeight;
            gsap.set(progressLine, { height: firstBoxHeight + "px" });

            gsap.fromTo(
                progressLine,
                { height: firstBoxHeight + "px" },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: boxes[1],
                        start: "top 40%",
                        scrub: true,
                    },
                }
            );

            boxes.forEach((box, index) => {
                if (index === 0) return;

                ScrollTrigger.create({
                    trigger: box,
                    start: "top 40%",
                    onEnter: () => box.classList.add("active"),
                    onLeaveBack: () => box.classList.remove("active"),
                });
            });
        }
    };
    var scrollMarqee = () => {
        if ($(".tp-item-anime").length > 0) {
            gsap.set(".tp-item-anime.marque", {
                x: "25%",
            });
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".tp-item-anime-area ",
                    start: "-1000 10%",
                    end: "bottom 20%",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            }).to(".tp-item-anime.marque ", {
                x: "-100%",
            });
        }
        if ($(".tp-item-anime-2").length > 0) {
            gsap.set(".tp-item-anime-2", {
                x: "25%",
            });
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".tp-item-anime-area",
                    start: "-1000 10%",
                    end: "bottom 20%",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            }).to(".tp-item-anime-2 ", {
                x: "-25%",
            });
        }
    };

    var hoverScaleText = () => {
        if (!$(".text-scale").length > 0) return;
        const headings = document.querySelectorAll(".text-scale");
        headings.forEach((heading) => {
            const textNodes = [];

            heading.childNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent
                        .split(" ")
                        .forEach((word, index, array) => {
                            const wordSpan = document.createElement("span");
                            wordSpan.classList.add("tp-word-span");
                            word.split("").forEach((letter) => {
                                const letterSpan =
                                    document.createElement("span");
                                letterSpan.classList.add("tf-letter");
                                letterSpan.textContent = letter;
                                wordSpan.appendChild(letterSpan);
                            });
                            textNodes.push(wordSpan);
                            if (index < array.length - 1) {
                                textNodes.push(document.createTextNode(" "));
                            }
                        });
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    textNodes.push(node.cloneNode(true));
                }
            });

            heading.innerHTML = "";
            textNodes.forEach((node) => heading.appendChild(node));

            const letters = heading.querySelectorAll(".tf-letter");
            letters.forEach((letter) => {
                $(letter).on("mouseenter", () => {
                    gsap.to(letter, {
                        scaleY: 1.3,
                        y: "-14%",
                        duration: 0.2,
                        ease: "sine",
                    });
                });

                $(letter).on("mouseleave", () => {
                    gsap.to(letter, {
                        scaleY: 1,
                        y: "0%",
                        duration: 0.2,
                        ease: "sine",
                    });
                });
            });
        });
    };

    const imageParallax = () => {
        $(".parallax-container").each(function (index) {
            const $container = $(this);
            const $mediaInner = $container.find(".image-inner, .video-inner");

            if ($mediaInner.length) {
                gsap.to($mediaInner[0], {
                    yPercent: 40,
                    ease: "none",
                    scrollTrigger: {
                        trigger: $container[0],
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                        markers: false,
                        id: `parallax-${index}`,
                    },
                });
            }
        });
    };

    const handleScrollFade = () => {
        if ($(".scrollFadeOpacity").length) {
            gsap.to(".scrollFadeOpacity", {
                opacity: 0,
                scrollTrigger: {
                    trigger: ".scrollFadeOpacity",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }
    };

    const handleScrollScale = () => {
        if ($(".scrollScale").length) {
            gsap.to(".scrollScale", {
                scale: 0.8,
                y: -100,
                scrollTrigger: {
                    trigger: ".scrollScale",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: true,
                    pinSpacing: false,
                },
            });
        }
    };
    var processD6 = () => {
        $(".process-main-d6").each(function () {
            var $main = $(this);
            var $line = $main.find(".line-prc_scroll");
            var $sections = $main.find(".wg-process-d6");

            if ($line.length) {
                gsap.set($line, { height: 0 });
                gsap.to($line, {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: $main,
                        start: "top 120px",
                        end: "bottom 120px",
                        scrub: true,
                        // markers: true,
                    },
                });
            }

            $sections.each(function () {
                var $section = $(this);

                ScrollTrigger.create({
                    trigger: $section,
                    start: "top 120px",
                    end: "bottom 120px",
                    onEnter: () => $section.addClass("active"),
                    onLeaveBack: () => $section.removeClass("active"),
                    // markers: true
                });
            });
        });
    };

    var boxProblemD6 = () => {
        if ($(".wg-problem-d6").length) {
            const boxes = [...document.querySelectorAll(".wg-problem-d6")];
            const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
            const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

            async function runCycle() {
                const order1 = shuffle([...boxes]);
                for (let box of order1) {
                    await phase1(box);
                }
                await sleep(3000);

                const order2 = shuffle([...boxes]);
                for (let box of order2) {
                    await phase2(box);
                }
                await sleep(2000);
                runCycle();
            }

            function phase1(box) {
                return new Promise((resolve) => {
                    const item1 = box.querySelector(".item-1");
                    const item2 = box.querySelector(".item-2");

                    gsap.timeline({ onComplete: resolve })
                        .to(item1, {
                            y: "-100%",
                            opacity: 0,
                            filter: "blur(18px)",
                            ease: "power2.inOut",
                        })
                        .to(
                            item2,
                            {
                                y: "0%",
                                opacity: 1,
                                filter: "blur(0)",
                                ease: "power2.inOut",
                            },
                            "<"
                        );
                });
            }
            function phase2(box) {
                return new Promise((resolve) => {
                    const item1 = box.querySelector(".item-1");
                    const item2 = box.querySelector(".item-2");

                    gsap.timeline({ onComplete: resolve })
                        .to(item2, {
                            y: "100%",
                            opacity: 0,
                            filter: "blur(18px)",
                            ease: "power2.inOut",
                        })
                        .to(
                            item1,
                            {
                                y: "0%",
                                opacity: 1,
                                filter: "blur(0)",
                                ease: "power2.inOut",
                            },
                            "<"
                        );
                });
            }
            runCycle();
        }
    };

    var scrlCoreValue = () => {
        if (window.innerWidth < 991) return;
        if ($(".pin-core-scroll").length) {
            const items = gsap.utils.toArray(".pag-prg_line");
            const titleElement = document.querySelector(
                ".col-left_top .text-sub-head"
            );
            const descElement = document.querySelector(".col-left_top .desc");
            const numberElement = document.querySelector(
                ".col-left_bottom .number"
            );
            const descNumberElement = document.querySelector(
                ".col-left_bottom .desc-number"
            );
            const boxRights = gsap.utils.toArray(".box-right");

            const contents = [
                {
                    title: "Customer-Centric Innovation",
                    desc: "We build solutions that matter, driven by your feedback and success.",
                    number: "500+",
                    descNumber: "Companies hiring",
                },
                {
                    title: "Simplicity & Clarity",
                    desc: "We believe in straightforward solutions that everyone can understand and use.",
                    number: "70%",
                    descNumber: "Interview rate",
                },
                {
                    title: "Radical Transparency",
                    desc: "Open communication and honesty in everything we do builds trust.",
                    number: "3x",
                    descNumber: "Faster to hire",
                },
                {
                    title: "Continuous Improvement",
                    desc: "We never stop learning, adapting, and evolving to serve you better.",
                    number: "98%",
                    descNumber: "Satisfaction rate",
                },
            ];

            // Set initial state
            gsap.set(items[0], { width: 64 });
            gsap.set(boxRights[0], { opacity: 1, x: 0 });
            gsap.set(boxRights.slice(1), { opacity: 0, x: 80 });

            // Set nội dung ban đầu
            titleElement.textContent = contents[0].title;
            descElement.textContent = contents[0].desc;
            numberElement.textContent = contents[0].number;
            descNumberElement.textContent = contents[0].descNumber;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".pin-core-scroll",
                    start: "center center",
                    end: "+=2000",
                    scrub: true,
                    pin: true,
                },
            });

            let currentBoxIndex = 0;
            let isAnimating = false;
            let boxAnimationTl = null;

            items.forEach((item, i) => {
                const bar = item.querySelector(".prg-run");

                if (i !== 0) {
                    tl.set(item, { width: 8 });
                }

                tl.to(item, { width: 64, duration: 0.001, ease: "none" });

                tl.add(() => { }, "progress-" + i);

                tl.fromTo(
                    bar,
                    { width: "0%" },
                    { width: "100%", duration: 1, ease: "none" },
                    "progress-" + i
                );

                if (i < items.length - 1) {
                    tl.to(item, {
                        width: 8,
                        duration: 0.001,
                        ease: "none",
                        background: "var(--primary)",
                    });
                    tl.set(bar, { width: "0%" });
                }
            });

            // ScrollTrigger riêng để trigger animation box-right
            ScrollTrigger.create({
                trigger: ".pin-core-scroll",
                start: "center center",
                end: "+=2000",
                onUpdate: (self) => {
                    const progress = self.progress;
                    const totalItems = items.length;
                    const itemProgress = progress * totalItems;
                    let activeIndex = Math.floor(itemProgress);

                    if (activeIndex >= totalItems) {
                        activeIndex = totalItems - 1;
                    }

                    // Chỉ chuyển box-right khi index thay đổi
                    if (activeIndex !== currentBoxIndex && !isAnimating) {
                        isAnimating = true;

                        // Kill animation cũ nếu còn chạy
                        if (boxAnimationTl) {
                            boxAnimationTl.kill();
                        }

                        const isScrollingDown = activeIndex > currentBoxIndex;

                        // Animation chuyển box-right với timeline riêng (không scrub)
                        boxAnimationTl = gsap.timeline({
                            onComplete: () => {
                                isAnimating = false;
                            }
                        });

                        if (isScrollingDown) {
                            // Scroll xuống: box cũ sang trái, box mới từ phải vào
                            boxAnimationTl.to(boxRights[currentBoxIndex], {
                                opacity: 0,
                                x: -50,
                                scale: 0.95,
                                duration: 0.5,
                                ease: "power3.inOut",
                            }, 0);

                            boxAnimationTl.fromTo(
                                boxRights[activeIndex],
                                { opacity: 0, x: 80, scale: 0.95 },
                                {
                                    opacity: 1,
                                    x: 0,
                                    scale: 1,
                                    duration: 0.5,
                                    ease: "power3.out",
                                },
                                0
                            );
                        } else {
                            // Scroll lên: box cũ sang phải, box mới từ trái vào
                            boxAnimationTl.to(boxRights[currentBoxIndex], {
                                opacity: 0,
                                x: 80,
                                scale: 0.95,
                                duration: 0.5,
                                ease: "power3.inOut",
                            }, 0);

                            boxAnimationTl.fromTo(
                                boxRights[activeIndex],
                                { opacity: 0, x: -50, scale: 0.95 },
                                {
                                    opacity: 1,
                                    x: 0,
                                    scale: 1,
                                    duration: 0.5,
                                    ease: "power3.out",
                                },
                                0
                            );
                        }

                        // Cập nhật text
                        boxAnimationTl.call(() => {
                            titleElement.textContent = contents[activeIndex].title;
                            descElement.textContent = contents[activeIndex].desc;
                            numberElement.textContent = contents[activeIndex].number;
                            descNumberElement.textContent = contents[activeIndex].descNumber;
                        }, null, 0);

                        currentBoxIndex = activeIndex;
                    }
                },
            });
        }
    };

    const handleSlideHolder = () => {
        if ($(".tf-slider-holder").length > 0) {
            const snapSliderHolder =
                document.querySelector(".tf-slider-holder");
            const snapSlides = gsap.utils.toArray(".tf-snap-slide");
            const snapSlidesImgMask = gsap.utils.toArray(
                ".tf-snap-slide .img-mask"
            );
            const snapThumbsWrapper = document.querySelector(
                ".tf-snap-slider-thumbs"
            );
            const snapThumbs = gsap.utils.toArray(".thumb-slide");

            gsap.fromTo(
                snapSlidesImgMask,
                { opacity: 0.1 },
                {
                    duration: 1,
                    opacity: 1,
                    ease: "sine.out",
                    scrollTrigger: {
                        trigger: snapSliderHolder,
                        start: "top 100%",
                        end: "+=100%",
                        scrub: true,
                    },
                }
            );

            gsap.fromTo(
                snapSlidesImgMask,
                { opacity: 1 },
                {
                    duration: 1,
                    opacity: 0.1,
                    ease: "sine.out",
                    scrollTrigger: {
                        trigger: snapSliderHolder,
                        start: "bottom 100%",
                        end: "+=100%",
                        scrub: true,
                    },
                }
            );

            // Pin and animate thumbnails
            ScrollTrigger.create({
                trigger: snapSlides,
                start: "top top",
                end: () => "+=" + innerHeight * (snapSlides.length - 1),
                pin: snapThumbsWrapper,
                scrub: true,
            });

            gsap.fromTo(
                snapThumbs,
                { y: 0 },
                {
                    y: -snapThumbs[0].offsetHeight * (snapThumbs.length - 1),
                    scrollTrigger: {
                        trigger: snapSliderHolder,
                        scrub: true,
                        start: "top top",
                        end: "+=" + innerHeight * (snapSlides.length - 1),
                    },
                    ease: "none",
                }
            );

            // Animate image transitions within slides
            snapSlides.forEach((slide, i) => {
                const imageWrappers = slide.querySelectorAll(".img-mask");
                const isLastSlide = i === snapSlides.length - 1;
                const isFirstSlide = i === 0;

                gsap.fromTo(
                    imageWrappers,
                    { y: isFirstSlide ? 0 : -window.innerHeight },
                    {
                        y: isLastSlide ? 0 : window.innerHeight,
                        scrollTrigger: {
                            trigger: slide,
                            scrub: true,
                            start: isFirstSlide ? "top top" : "top bottom",
                            end: isLastSlide ? "top top" : undefined,
                        },
                        ease: "none",
                    }
                );
            });
        }
    };

    /* scrollTransform
    -------------------------------------------------------------------------------------*/
    const scrollTransform = () => {
        document
            .querySelectorAll(".scroll-transform")
            .forEach(function (element) {
                const direction = element.dataset.direction || "up";
                const distance = element.dataset.distance || "10%";
                const rotateValue = element.dataset.rotate;
                const rotateOnly = element.dataset.rotateOnly === "true";

                let animationProperty;
                switch (direction.toLowerCase()) {
                    case "left":
                        animationProperty = { x: `-${distance}` };
                        break;
                    case "right":
                        animationProperty = { x: `${distance}` };
                        break;
                    case "up":
                        animationProperty = { y: `-${distance}` };
                        break;
                    case "down":
                        animationProperty = { y: `${distance}` };
                        break;
                    default:
                        animationProperty = { y: `-${distance}` };
                }

                if (!rotateOnly) {
                    gsap.to(element, {
                        ...animationProperty,
                        scrollTrigger: {
                            trigger: element,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 3,
                        },
                    });
                }

                if (rotateValue !== undefined) {
                    gsap.to(element, {
                        rotate: rotateValue,
                        scrollTrigger: {
                            trigger: element,
                            start: "top 60%",
                            end: "bottom top",
                            scrub: 2,
                        },
                    });
                }
            });
    };

    /* animation_text
  -------------------------------------------------------------------------*/
    const animation_text = () => {
        const $splitText = $(".split-text");
        if (!$splitText.length) return;
        gsap.registerPlugin(SplitText);
        const makeScrollTrigger = (target, extra = {}) => ({
            trigger: target,
            start: "top 86%",
            toggleActions: "play none none reverse",
            once: true,
            ...extra,
        });

        $splitText.each((_, el) => {
            const $el = $(el);
            const $target = $el.find("p, a").get(0) || el;
            const hasClass = $el.hasClass.bind($el);

            const pxl_split = new SplitText($target, {
                type: "words, chars",
                lineThreshold: 0.5,
                linesClass: "split-line",
            });
            let splitSet = pxl_split.chars;

            gsap.set($target, { perspective: 400 });

            // Base settings
            const settings = {
                scrollTrigger: makeScrollTrigger($target),
                duration: 0.9,
                stagger: 0.02,
                ease: "power3.out",
            };

            if (hasClass("effect-fade")) {
                Object.assign(settings, { opacity: 0 });
            }
            if (hasClass("effect-right")) {
                Object.assign(settings, { opacity: 0, x: 50 });
            }
            if (hasClass("effect-left")) {
                Object.assign(settings, { opacity: 0, x: -50 });
            }
            if (hasClass("effect-up")) {
                Object.assign(settings, { opacity: 0, y: 20 });
            }
            if (hasClass("effect-down")) {
                Object.assign(settings, { opacity: 0, y: -80 });
            }
            if (hasClass("effect-rotate")) {
                Object.assign(settings, { opacity: 0, rotateX: "50deg" });
            }
            if (hasClass("effect-scale")) {
                Object.assign(settings, { opacity: 0, scale: 0.5 });
            }
            if (
                hasClass("split-lines-transform") ||
                hasClass("split-lines-rotation-x")
            ) {
                pxl_split.split({
                    type: "lines",
                    lineThreshold: 0.5,
                    linesClass: "split-line",
                });
                splitSet = pxl_split.lines;
                Object.assign(settings, { opacity: 0, stagger: 0.2 });

                if (hasClass("split-lines-rotation-x")) {
                    Object.assign(settings, {
                        rotationX: -120,
                        transformOrigin: "top center -50",
                    });
                } else {
                    Object.assign(settings, { yPercent: 100, autoAlpha: 0 });
                }
            }
            if (hasClass("split-words-scale")) {
                pxl_split.split({ type: "words" });
                splitSet = pxl_split.words;

                splitSet.forEach((elw, i) => {
                    gsap.set(elw, {
                        opacity: 0,
                        scale: i % 2 === 0 ? 0 : 2,
                        force3D: true,
                    });
                });

                gsap.to(splitSet, {
                    scrollTrigger: makeScrollTrigger(el),
                    rotateX: 0,
                    scale: 1,
                    opacity: 1,
                    ease: "power3.out",
                    stagger: 0.05,
                });
                return;
            }

            if (hasClass("effect-blur-fade")) {
                pxl_split.split({ type: "words" });
                splitSet = pxl_split.words;

                gsap.fromTo(
                    splitSet,
                    { opacity: 0, filter: "blur(10px)", y: 20 },
                    {
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: makeScrollTrigger($target),
                    }
                );
                return;
            }
            gsap.from(splitSet, settings);
        });
    };

    const animationGrow = () => {
        if (!$(".grow")) return;
        var grow = document.querySelectorAll(".grow");
        grow.forEach((item) => {
            gsap.to(item, {
                width: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    scrub: 2,
                    start: "top 90%",
                    end: "top center",
                },
            });
        });
    };

    const moving_text = () => {
        if ($(".moving-text").length > 0) {
            gsap.utils.toArray(".moving-text").forEach((section, index) => {
                const w = section.querySelector(".wrapper-text");
                const [x, xEnd] =
                    index % 2
                        ? [section.offsetWidth - w.scrollWidth, 0]
                        : [0, section.offsetWidth - w.scrollWidth];
                gsap.fromTo(
                    w,
                    { x },
                    {
                        x: xEnd,
                        scrollTrigger: {
                            trigger: section,
                            scrub: 0.1,
                        },
                    }
                );
            });
        }
    };

    $(function () {
        featureAnimation();
        processAnimation();
        businessAnimation();
        paraScroll();
        changetext();
        changeTextV2();
        evolutionAnimation();
        scrollMarqee();
        paralaxImage();
        hoverScaleText();
        imageParallax();
        handleScrollFade();
        handleScrollScale();
        boxProblemD6();
        scrlCoreValue();
        processD6();
        handleSlideHolder();
        scrollTransform();
        animation_text();
        animationGrow();
        moving_text();
    });
})(jQuery);
