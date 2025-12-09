$(window).on("load", function () {
    $(".tf-swiper").each(function (index, element) {
        var $this = $(element);
        var laptop = $this.data("laptop") || 1;
        var preview = $this.data("preview") || 1;
        var tablet = $this.data("tablet") || 1;
        var mobile = $this.data("mobile") || 1;
        var mobileSm =
            $this.data("mobile-sm") !== undefined
                ? $this.data("mobile-sm")
                : mobile;

        // Spacing
        var spacing = $this.data("space");
        var spacingMd = $this.data("space-md");
        var spacingLg = $this.data("space-lg");
        var spacingXxl = $this.data("space-xxl");

        if (
            spacing !== undefined &&
            spacingMd === undefined &&
            spacingLg === undefined
        ) {
            spacingMd = spacing;
            spacingLg = spacing;
        } else if (
            spacing === undefined &&
            spacingMd !== undefined &&
            spacingLg === undefined
        ) {
            spacing = 0;
            spacingLg = spacingMd;
        }
        spacing = spacing || 0;
        spacingMd = spacingMd || 0;
        spacingLg = spacingLg || 0;
        spacingXxl = spacingXxl || 1;

        var perGroup = $this.data("pagination") || 1;
        var perGroupSm = $this.data("pagination-sm") || 1;
        var perGroupMd = $this.data("pagination-md") || 1;
        var perGroupLg = $this.data("pagination-lg") || 1;
        var gridRows = $this.data("grid") || 1;
        var cursorType = $this.data("cursor") ?? false;
        var loop = $this.data("loop") ?? false;
        var loopMd = $this.data("loop-md") ?? false;
        var effect = $this.data("effect") || "slide";
        var atPlay = $this.data("auto"); // True || False
        var speed = $this.data("speed") || 800;
        var delay = $this.data("delay") || 1000;
        var direction = $this.data("direction") || "horizontal";
        var centered = $this.data("center") ?? false;
        var init = $this.data("init") || 0;
        var typePag = $this.data("type-pagination") || "bullets";
        // Custom
        var paginationEl =
            $this.find(".tf-sw-pagination")[0] ||
            $this.closest(".tf-pag-swiper").find(".tf-sw-pagination")[0];
        // var shouldRenderBullet = $(paginationEl).hasClass("render-number");

        var swiperT = new Swiper($this[0], {
            direction: direction,
            speed: speed,
            centeredSlides: centered,
            slidesPerView: mobile,
            spaceBetween: spacing,
            slidesPerGroup: perGroup,
            grabCursor: cursorType,
            loop: loop,
            effect: effect,
            initialSlide: init,
            autoplay: atPlay
                ? {
                    delay: delay,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }
                : false,
            grid: {
                rows: gridRows,
                fill: "row",
            },
            pagination: {
                el: paginationEl,
                clickable: true,
                ...(($this
                    .find(".tf-sw-pagination")
                    .hasClass("render-number") ||
                    $this
                        .closest(".tf-pag-swiper")
                        .find(".tf-sw-pagination")
                        .hasClass("render-number")) && {
                    renderBullet: function (index, className) {
                        return (
                            '<span class="pag-bullet-number ' +
                            className +
                            '">' +
                            (index + 1) +
                            "</span>"
                        );
                    },
                }),
                type: `${typePag}`,
            },
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: [
                    $this
                        .closest(".tf-btn-swiper-main")
                        .find(".nav-next-swiper")[0],
                    $this
                        .closest(".container")
                        .find(".swiper-action-group .nav-next-swiper")[0],
                ],
                prevEl: [
                    $this
                        .closest(".tf-btn-swiper-main")
                        .find(".nav-prev-swiper")[0],
                    $this
                        .closest(".container")
                        .find(".swiper-action-group .nav-prev-swiper")[0],
                ],
            },
            breakpoints: {
                575: {
                    slidesPerView: mobileSm,
                    spaceBetween: spacing,
                    slidesPerGroup: perGroupSm,
                    grid: {
                        rows: gridRows,
                        fill: "row",
                    },
                },
                768: {
                    slidesPerView: tablet,
                    spaceBetween: spacingMd,
                    slidesPerGroup: perGroupMd,
                    grid: {
                        rows: gridRows,
                        fill: "row",
                    },
                },
                1200: {
                    slidesPerView: preview,
                    spaceBetween: spacingLg,
                    slidesPerGroup: perGroupLg,
                    grid: {
                        rows: gridRows,
                        fill: "row",
                    },
                },
                1600: {
                    slidesPerView: laptop === 1 ? preview : laptop,
                    spaceBetween: spacingXxl === 1 ? spacingLg : spacingXxl,
                    slidesPerGroup: perGroupLg,
                    grid: {
                        rows: gridRows,
                        fill: "row",
                    },
                },
            },
        });

        /*-- Hover Change Slide --*/
        var $wrap = $this.closest(".swiper-action-wrap");

        $wrap.find(".swiper-button").on("mousemove", function () {
            var slideIndex = $(this).data("slide");
            swiperT.slideTo(slideIndex, 500, false);
        });

        /*-- Scroll Change Slide --*/
        if ($this.hasClass("swiper-scroll")) {
            let scrolling = false;

            $(window).on("wheel", function (e) {
                if (scrolling) return;
                if (!isInViewport($this[0])) return;

                scrolling = true;
                if (e.originalEvent.deltaY > 0) {
                    swiperT.slideNext();
                } else {
                    swiperT.slidePrev();
                }

                setTimeout(() => {
                    scrolling = false;
                }, 100);
            });

            function isInViewport(el) {
                var rect = el.getBoundingClientRect();
                return (
                    rect.top < window.innerHeight * 0.8 &&
                    rect.bottom > window.innerHeight * 0.2
                );
            }
        }
    });
});

if ($(".slider-thumb-wrap").length > 0) {
    const contentThumbSlider = new Swiper(".slider-content-thumb", {
        slidesPerView: 1,
        loop: true,
        grabCursor: true,
        speed: 800,
        spaceBetween: 10,
        on: {
            slideChange: function () {
                const activeIndex = this.realIndex;
                $(".btn-thumbs").removeClass("active");
                $(".btn-thumbs").eq(activeIndex).addClass("active");
            },
        },
    });
    $(".btn-thumbs").on("click", function () {
        const index = $(this).index();
        $(".btn-thumbs").removeClass("active");
        $(this).addClass("active");
        contentThumbSlider.slideToLoop(index);
    });
}
if ($(".swiper-max-1200").length > 0) {
    let swiperMax1200 = null;

    const initSwiper = () => {
        if (window.matchMedia("(max-width: 1199px)").matches) {
            if (!swiperMax1200) {
                swiperMax1200 = new Swiper(".swiper-max-1200", {
                    slidesPerView: 1,
                    spaceBetween: 16,
                    loop: true,
                    pagination: {
                        el: ".tf-sw-pagination",
                        clickable: true,
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                        },
                    },
                });
            }
        } else {
            if (swiperMax1200) {
                swiperMax1200.destroy(true, true);
                swiperMax1200 = null;
            }
        }
    };

    initSwiper();

    window.addEventListener("resize", initSwiper);
}

if ($(".tf-sw-thumbs").length > 0) {
    var thumbSwiper = new Swiper(".sw-thumb", {
        slidesPerView: 1,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        speed: 800,
        spaceBetween: 15,
        centeredSlides: true,
    });

    var mainSwiper = new Swiper(".sw-main-thumb", {
        grabCursor: true,
        spaceBetween: 15,
        speed: 800,
        navigation: {
            nextEl: ".tf-sw-thumbs .nav-next-swiper",
            prevEl: ".tf-sw-thumbs .nav-prev-swiper",
        },
        pagination: {
            el: ".sw-pg-thumb",
            clickable: true,
        },
    });
    thumbSwiper.controller.control = mainSwiper;
    mainSwiper.controller.control = thumbSwiper;
}

if ($(".slider-hero-wrap").length > 0) {
    var thumbSwiper = new Swiper(".swiper-hero-thumb", {
        slidesPerView: 1,
        grabCursor: true,
        speed: 800,
        // loop: true,
        spaceBetween: 16,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: ".slider-hero-wrap .tf-sw-pagination",
            clickable: true,
        },
        on: {
            slideChange: function () {
                const activeIndex = this.realIndex;
                $(".img-thumbs").removeClass("active");
                $(".img-thumbs").eq(activeIndex).addClass("active");
            },
        },
    });
    var mainSwiper = new Swiper(".swiper-hero-main-thumb", {
        grabCursor: true,
        speed: 800,
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
    });
    thumbSwiper.controller.control = mainSwiper;
    mainSwiper.controller.control = thumbSwiper;
}

if ($(".swiper-best").length > 0) {
    var swiperBest = new Swiper(".swiper-best", {
        slidesPerView: "auto",
        spaceBetween: 0,
        centeredSlides: true,
        initialSlide: 2,
        loop: true,
        slideToClickedSlide: true,
    });
}

if ($(".swiper-best-2").length > 0) {
    var swiperBest = new Swiper(".swiper-best-2", {
        slidesPerView: "1",
        spaceBetween: 0,
        centeredSlides: true,
        initialSlide: 2,
        loop: true,
        slideToClickedSlide: true,
        breakpoints: {
            0: {
                slidesPerView: 1.1,
            },
            550: {
                slidesPerView: 1.5,
                spaceBetween: 0,
            },
            767: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 2.7,
                spaceBetween: 0,
            },
        },
    });
}

$(".flat-thumbs-tes").each(function (index, container) {
    const $container = $(container);

    const $thumb = $container.find(".tf-thumb-tes");
    const $main = $container.find(".tf-tes-main");
    const fractionEl = $container.find(".sw-fraction-layout")[0] || null;

    if ($thumb.length && $main.length) {
        const spaceThumbLg = $thumb.data("space-lg");
        const spaceThumb = $thumb.data("space");
        const effect = $thumb.data("effect") || "slide";

        const spaceTesLg = $main.data("space-lg");
        const spaceTes = $main.data("space");
        const effect2 = $main.data("effect") || "slide";

        const swThumb = new Swiper($thumb[0], {
            speed: 800,
            spaceBetween: spaceThumb,
            effect: effect,
            fadeEffect: effect === "fade" ? { crossFade: true } : undefined,
            breakpoints: {
                768: {
                    spaceBetween: spaceThumbLg,
                },
            },
        });

        const swTesMain = new Swiper($main[0], {
            speed: 800,
            navigation: {
                nextEl: $container.find(".nav-next-tes")[0],
                prevEl: $container.find(".nav-prev-tes")[0],
            },
            pagination: {
                el: $container.find(".sw-pagination-tes")[0],
                clickable: true,
            },
            effect: effect2,
            fadeEffect: effect2 === "fade" ? { crossFade: true } : undefined,
            spaceBetween: spaceTes,
            breakpoints: {
                768: {
                    spaceBetween: spaceTesLg,
                },
            },
        });

        // Link controllers
        swThumb.controller.control = swTesMain;
        swTesMain.controller.control = swThumb;

        // Handle fraction pagination
        if (fractionEl) {
            const updateFraction = () => {
                const current = String(swTesMain.realIndex + 1).padStart(2, "0");
                const totalSlides = String(
                    $main.find(".swiper-slide:not(.swiper-slide-duplicate)").length
                ).padStart(2, "0");
                fractionEl.innerHTML = `<span class="current">${current}</span> / <span class="total">${totalSlides}</span>`;
            };

            swTesMain.on("init", updateFraction);
            swTesMain.on("slideChange", updateFraction);
            updateFraction(); // Initial update
        }
    }
});

if (document.querySelector(".slider-testimonial")) {
    var swiper = new Swiper(".slider-testimonial", {
        slidesPerView: 1,
        spaceBetween: 100,
        centeredSlides: true,
        effect: "cards",
        grabCursor: true,
        loop: true,
        initialSlide: 1,
        cardsEffect: {
            slideShadows: false,
            rotate: 10,
            perSlideOffset: 90,
            perSlideRotate: 10,
        },
        pagination: {
            el: ".testimonial-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            550: {
                slidesPerView: 1.5,
                spaceBetween: 0,
            },
            767: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 2.8,
                spaceBetween: 0,
            },
        },
    });

    const thumbs = document.querySelectorAll(".member-thumbs .image-item");
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", function () {
            swiper.slideTo(index);

            thumbs.forEach((t) => t.classList.remove("active"));
            this.classList.add("active");
        });
    });

    swiper.on("slideChange", function () {
        thumbs.forEach((t) => t.classList.remove("active"));
        let activeIndex = swiper.realIndex;
        if (thumbs[activeIndex]) {
            thumbs[activeIndex].classList.add("active");
        }
    });
}

if ($(".sw-thumbs-pagi").length > 0 && $(".sw-single").length > 0) {
    var preview = $(".sw-thumbs-pagi").data("preview");
    var spacing = $(".sw-thumbs-pagi").data("space");
    var mobile = $(".sw-thumbs-pagi").data("mobile");
    var mobileSm = $(".sw-thumbs-pagi").data("mobile-sm");
    var autoplay = $(".sw-thumbs-pagi").data("auto-play") || false;
    var loop = $(".sw-thumbs-pagi").data("loop") || false;
    var parallaxEnable = $(".sw-single").data("parallax") || false;
    var effectType = $(".sw-single").data("effect");
    var autoplay = $(".sw-single").data("autoplay");

    var pagithumbs = new Swiper(".sw-thumbs-pagi", {
        spaceBetween: spacing,
        slidesPerView: preview,
        freeMode: true,
        watchSlidesProgress: true,
        loop: loop,

        navigation: {
            clickable: true,
            nextEl: ".sw-pagi-next",
            prevEl: ".sw-pagi-prev",
        },
        breakpoints: {
            375: {
                slidesPerView: 4,
                spaceBetween: spacing,
            },
            500: {
                slidesPerView: mobileSm,
            },
        },
    });

    var swiperSingle = new Swiper(".sw-single", {
        loop: loop,
        speed: 1500,
        effect: effectType,
        fadeEffect: {
            crossFade: true,
        },
        thumbs: {
            swiper: pagithumbs,
        },
        autoplay: autoplay
            ? {
                delay: 3000,
                disableOnInteraction: false,
            }
            : false,
        parallax: parallaxEnable,
        navigation: {
            clickable: true,
            nextEl: ".sw-thumbs-next",
            prevEl: ".sw-thumbs-prev",
        },
        on: {
            init: function () {
                var swiper = this;

                if (document.querySelector(".progress-bars")) {
                    initializeProgressBars(this);
                }

                if (parallaxEnable) {
                    for (var i = 0; i < swiper.slides.length; i++) {
                        $(swiper.slides[i])
                            .find(".tf-showcase-slider")
                            .attr({
                                "data-swiper-parallax": 0.75 * swiper.width,
                            });
                    }
                }
            },
            slideChange: function () {
                if (document.querySelector(".progress-bars")) {
                    updateProgress(this.activeIndex);
                }
            },
            resize: function () {
                this.update();
            },
        },
    });

    function initializeProgressBars(swiperInstance) {
        const progressContainer = document.querySelector(".progress-bars");
        const totalSlides = swiperInstance.slides.length;

        progressContainer.innerHTML = "";
        for (let i = 0; i < totalSlides; i++) {
            const bar = document.createElement("div");
            bar.className = "progress-bar" + (i === 0 ? " active" : "");
            bar.innerHTML = '<div class="progress-fill"></div>';
            progressContainer.appendChild(bar);
        }

        updateProgress(swiperInstance.realIndex || 0);
    }

    function updateProgress(activeIndex) {
        const progressBars = document.querySelectorAll(".progress-bar");

        if (progressBars.length === 0) return;

        progressBars.forEach((bar, index) => {
            bar.classList.remove("active", "viewed");

            if (index < activeIndex) {
                bar.classList.add("viewed");
            } else if (index === activeIndex) {
                bar.classList.add("active");
            }
        });
    }
}
