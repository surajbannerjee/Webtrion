/**
 * Header Stick
 * Infinite Slide
 * Counter Odo
 * Active Accordion
 * Handle Mobile Menu
 * Select Image
 * Color Swatch Product
 * Handle Footer
 * Parallaxie
 * Change Value
 * Handle Sidebar Filter
 * Total Price Variant
 * Mouse Hover
 * Video Popup
 * Indicator Item
 * Anime Cycle
 * Variant Picker
 * Checked Plan
 * Card Btn Active
 * Click Change Image
 * Option Active
 * Reveal
 * Anime Line
 * Button Quantity
 * Delete File
 * Estimate Shipping
 * Handle Progress
 * Play Video
 * Header Fixed
 * Static Is Active
 * Init Spline
 * Preload
 * Get Data Image
 * Hover Active
 * Cursor Custom
 **/

(function ($) {
    ("use strict");
    /* Header Sticky
    -------------------------------------------------------------------------*/
    var headerSticky = function () {
        const skipClass = ["tf-header", "tf-header-d6", "tf-header-5"];
        if (skipClass.some((c) => $("header").hasClass(c))) {
            return;
        }

        let lastScrollTop = 0;
        let delta = 5;
        let navbarHeight = $("header").outerHeight();
        let didScroll = false;

        $(window).scroll(function () {
            didScroll = true;
        });

        function handleHeader() {
            let st = $(window).scrollTop();
            navbarHeight = $("header").outerHeight();

            const $header = $("header");
            const $stickyTop = $(".sticky-top, .sticky-lg-top,.sticky-md-top");

            const $hideSection = $(".scroll-hide-head");
            let isInHideSection = false;

            if (st === 0) {
                // $header.removeClass("header-fixed");
                // $stickyTop.css("top", "15px");
                // lastScrollTop = st;
                // return;
            }

            $hideSection.each(function () {
                const offsetTop = $(this).offset().top;
                const offsetBottom = offsetTop + $(this).outerHeight();
                if (st + navbarHeight > offsetTop && st < offsetBottom) {
                    isInHideSection = true;
                    return false;
                }
            });

            if (isInHideSection) {
                $header.css("top", `-${navbarHeight}px`);
                $stickyTop.css("top", "15px");
                return;
            }

            const specialHeaders = [
                "tf-header-landing",
                "tf-header-3",
                "tf-header-4",
            ];
            const isSpecialHeader = specialHeaders.some((cls) =>
                $header.hasClass(cls)
            );

            if (isSpecialHeader) {
                if (st > navbarHeight) {
                    $header.addClass("header-fixed").css("top", "0");
                    $stickyTop.css("top", `${15 + navbarHeight}px`);
                } else {
                    $header
                        .removeClass("header-fixed")
                        .css("top", `-${navbarHeight}px`);
                    $stickyTop.css("top", "15px");
                }
            } else {
                if (st > navbarHeight) {
                    if (st > lastScrollTop + delta) {
                        $header.css("top", `-${navbarHeight}px`);
                        $stickyTop.css("top", "15px");
                    } else if (st < lastScrollTop - delta) {
                        $header.css("top", "0").addClass("header-sticky");
                        $stickyTop.css("top", `${15 + navbarHeight}px`);
                    }
                } else {
                    $header.css("top", "unset").removeClass("header-sticky");
                    $stickyTop.css("top", "15px");
                }
            }

            lastScrollTop = st;
        }

        handleHeader();

        setInterval(function () {
            if (didScroll) {
                handleHeader();
                didScroll = false;
            }
        }, 250);
    };

    /* Infinite Slide 
    -------------------------------------------------------------------------*/
    var infiniteSlide = function () {
        if ($(".infiniteSlide").length > 0) {
            $(".infiniteSlide").each(function () {
                var $this = $(this);
                var style = $this.data("style") || "left";
                var clone = $this.data("clone") || 2;
                var speed = $this.data("speed") || 50;
                var pauseonhover = $this.data("pause") || true;
                $this.infiniteslide({
                    speed: speed,
                    direction: style,
                    clone: clone,
                    pauseonhover: pauseonhover,
                });
            });
        }
    };
    /* Counter Odo
    -------------------------------------------------------------------------*/
    var counterOdo = () => {
        function isElementInViewport($el) {
            var top = $el.offset().top;
            var bottom = top + $el.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            return bottom > viewportTop && top < viewportBottom;
        }

        function runCounterIfInView() {
            $(".wg-counter").each(function () {
                var $counter = $(this);
                if (
                    isElementInViewport($counter) &&
                    !$counter.hasClass("counted")
                ) {
                    $counter.addClass("counted");
                    var targetNumber = $counter
                        .find(".odometer")
                        .data("number");

                    setTimeout(function () {
                        $counter.find(".odometer").text(targetNumber);
                    }, 500);
                }
            });
        }

        if ($(".counter-scroll").length > 0) {
            runCounterIfInView();

            $(window).on("scroll", function () {
                runCounterIfInView();
            });
        }
    };
    /* Active Accordion
    -------------------------------------------------------------------------*/
    const activeAccordion = () => {
        $(".faq-accordion .faq-accordion_item ").on("click", function () {
            const $this = $(this);

            if ($this.hasClass("active")) {
                $this.removeClass("active");
            } else {
                $(".faq-accordion .faq-accordion_item").removeClass("active");
                $this.addClass("active");
            }
        });
        $(".accordion-action").on("click", function () {
            const $parent = $(this).closest(".accordion-active");

            if ($parent.hasClass("active")) {
                $parent.removeClass("active");
            } else {
                $(".accordion-active").removeClass("active");
                $parent.addClass("active");
            }
        });
    };
    /* Handle Mobile Menu
    -------------------------------------------------------------------------*/
    var handleMobileMenu = function () {
        const $desktopMenu = $(".box-nav-menu:not(.not-append)").clone();
        $desktopMenu.find(".list-ver, .list-hor,.mn-none").remove();

        const $mobileMenu = $('<ul class="nav-ul-mb"></ul>');

        // const $iconArrow = "icon-arrow-caret-down";

        $desktopMenu.find("> li.menu-item").each(function (i, menuItem) {
            const $item = $(menuItem);
            const iconArrow = "icon-arrow-caret-down";
            const text = $item
                .find("> a.item-link")
                .clone()
                .children()
                .remove()
                .end()
                .text()
                .trim();
            const submenu = $item.find("> .sub-menu");
            const id = "dropdown-menu-" + i;
            const isActive = $item.find("> a.item-link").hasClass("active");

            if (submenu.length > 0) {
                const $li = $(`
                <li class="nav-mb-item">
                    <a href="#${id}" class="collapsed mb-menu-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="${id}">
                        <span>${text}</span>
                        <span class="icon ${iconArrow}"></span>
                    </a>
                    <div id="${id}" class="collapse"></div>
                </li>
            `);

                const $subNav = $('<ul class="sub-nav-menu"></ul>');

                submenu.find(".mega-menu-item").each(function (j) {
                    const heading = $(this).find(".menu-heading").text().trim();
                    const subId = `${id}-group-${j}`;
                    const $group = $(`
                    <li>
                        <a href="#${subId}" class="collapsed sub-nav-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="${subId}">
                            <span>${heading}</span>
                            <span class="icon ${iconArrow}"></span>
                        </a>
                        <div id="${subId}" class="collapse">
                            <ul class="sub-nav-menu sub-menu-level-2"></ul>
                        </div>
                    </li>
                `);

                    $(this)
                        .find(".sub-menu_list a")
                        .each(function () {
                            const $link = $(this);
                            const linkHref = $link.attr("href") || "#";
                            const title = $link.text().trim();
                            const isActive = $link.hasClass("active");

                            if (title !== "") {
                                const activeClass = isActive ? "active" : "";
                                $group
                                    .find(".sub-menu-level-2")
                                    .append(
                                        `<li><a href="${linkHref}" class="sub-nav-link ${activeClass}">${title}</a></li>`
                                    );
                            }
                        });

                    $subNav.append($group);
                });

                if ($subNav.children().length === 0) {
                    submenu.find("a").each(function () {
                        const link = $(this).attr("href") || "#";
                        const title = $(this).text().trim();
                        const isActive = $(this).hasClass("active");
                        if (title !== "") {
                            const activeClass = isActive ? "active" : "";
                            $subNav.append(
                                `<li><a href="${link}" class="sub-nav-link ${activeClass}">${title}</a></li>`
                            );
                        }
                    });
                }
                $li.find(`#${id}`).append($subNav);
                $mobileMenu.append($li);
            } else {
                const activeClass = isActive ? "active" : "";
                $mobileMenu.append(
                    `<li class="nav-mb-item"><a href="${$item
                        .find("a")
                        .attr(
                            "href"
                        )}" class="mb-menu-link ${activeClass}"><span>${text}</span></a></li>`
                );
            }
        });

        $("#wrapper-menu-navigation").empty().append($mobileMenu.html());
    };
    /* Select Image
    -------------------------------------------------------------------------*/
    var dropdownSelect = function () {
        if ($(".tf-dropdown-select").length > 0) {
            const selectIMG = $(".tf-dropdown-select");

            selectIMG.find("option").each((idx, elem) => {
                const selectOption = $(elem);
                const imgURL = selectOption.attr("data-thumbnail");
                if (imgURL) {
                    selectOption.attr(
                        "data-content",
                        `<img src="${imgURL}" alt="Country" /> ${selectOption.text()}`
                    );
                }
            });
            selectIMG.selectpicker();
        }
    };
    /* Color Swatch Product
  -------------------------------------------------------------------------*/
    var swatchColor = function () {
        if ($(".card-product").length > 0) {
            $(".color-swatch").on("click mouseover", function () {
                var $swatch = $(this);
                var swatchColor = $swatch
                    .find("img:not(.swatch-img)")
                    .attr("src");
                var imgProduct = $swatch
                    .closest(".card-product")
                    .find(".img-product");
                var colorLabel = $swatch.find(".color-label").text().trim();
                imgProduct.attr("src", swatchColor);
                $swatch
                    .closest(".card-product")
                    .find(".quickadd-variant-color .variant-value")
                    .text(colorLabel);
                $swatch
                    .closest(".card-product")
                    .find(".color-swatch.active")
                    .removeClass("active");
                $swatch.addClass("active");
            });
        }
    };
    /* Handle Footer
    -------------------------------------------------------------------------*/
    var handleFooter = function () {
        var footerAccordion = function () {
            var args = { duration: 250 };
            $(".footer-heading-mobile").on("click", function () {
                var $parent = $(this).parent(".footer-col-block");
                var $content = $(this).next();

                $parent.toggleClass("open");

                if (!$parent.hasClass("open")) {
                    $content.slideUp(args);
                } else {
                    $content.slideDown(args);
                }
            });
        };

        function handleAccordion() {
            if (
                window.matchMedia("only screen and (max-width: 575px)").matches
            ) {
                if (
                    !$(".footer-heading-mobile").data("accordion-initialized")
                ) {
                    footerAccordion();
                    $(".footer-heading-mobile").data(
                        "accordion-initialized",
                        true
                    );
                }
            } else {
                $(".footer-heading-mobile")
                    .off("click")
                    .removeData("accordion-initialized")
                    .each(function () {
                        $(this)
                            .parent(".footer-col-block")
                            .removeClass("open")
                            .end()
                            .next()
                            .removeAttr("style");
                    });
            }
        }

        handleAccordion();
        $(window).on("resize", handleAccordion);
    };
    /* Parallaxie 
    -------------------------------------------------------------------------*/
    var parallaxie = function () {
        var $window = $(window);

        if ($(".parallaxie").length) {
            function initParallax() {
                if ($(".parallaxie").length && $window.width() > 991) {
                    $(".parallaxie").parallaxie({
                        speed: 0.55,
                        offset: 0,
                    });
                }
            }

            initParallax();

            $window.on("resize", function () {
                if ($window.width() > 991) {
                    initParallax();
                }
            });
        }
    };
    /* Change Value
    -------------------------------------------------------------------------*/
    var changeValue = function () {
        if ($(".tf-dropdown-sort").length > 0) {
            $(".select-item").on("click", function (event) {
                $(this)
                    .closest(".tf-dropdown-sort")
                    .find(".text-sort-value")
                    .text($(this).find(".text-value-item").text());

                $(this)
                    .closest(".dropdown-menu")
                    .find(".select-item.active")
                    .removeClass("active");

                $(this).addClass("active");

                var color = $(this).data("value-color");
                $(this)
                    .closest(".tf-dropdown-sort")
                    .find(".btn-select")
                    .find(".current-color")
                    .css("background", color);
            });
        }
    };
    /* Handle Sidebar Filter 
    -------------------------------------------------------------------------*/
    var handleSidebarFilter = function () {
        $("#filterShop,.sidebar-btn").on("click", function () {
            if ($(window).width() <= 1200) {
                $(".sidebar-filter,.overlay-filter").addClass("show");
            }
        });
        $(".close-filter,.overlay-filter").on("click", function () {
            $(".sidebar-filter,.overlay-filter").removeClass("show");
        });
    };
    /* Total Price Variant
    -------------------------------------------------------------------------*/
    var totalPriceVariant = function () {
        $(".tf-product-info-wrap").each(function () {
            var productItem = $(this);
            var quantityInput = productItem.find(".quantity-product");

            productItem.find(".unit-btn").on("click", function () {
                var rawPrice = $(this).attr("data-price");
                var newPrice =
                    parseFloat(rawPrice.replace(/,/g, "")) || basePrice;
                quantityInput.val(1);
                productItem
                    .find(".price-on-sale")
                    .text(
                        `$${newPrice.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                        })}`
                    )
                    .data("price", newPrice);
                updateTotalPrice(newPrice, productItem);
            });

            productItem.find(".btn-increase").on("click", function () {
                var currentQuantity = parseInt(quantityInput.val(), 10);
                quantityInput.val(currentQuantity + 1);
                updateTotalPrice(null, productItem);
            });

            productItem.find(".btn-decrease").on("click", function () {
                var currentQuantity = parseInt(quantityInput.val(), 10);
                if (currentQuantity > 1) {
                    quantityInput.val(currentQuantity - 1);
                    updateTotalPrice(null, productItem);
                }
            });

            function updateTotalPrice(price, scope) {
                var currentPrice =
                    price ||
                    parseFloat(scope.find(".price-on-sale").data("price"));
                var quantity = parseInt(
                    scope.find(".quantity-product").val(),
                    10
                );
                var totalPrice = currentPrice * quantity;
                scope.find(".price-add").text(
                    `$${totalPrice.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                    })}`
                );
            }
        });
    };
    /* Mouse Hover
    -------------------------------------------------------------------------*/
    /* Mouse Hover
    -------------------------------------------------------------------------*/
    var mouseHover = () => {
        $(".main-mouse-hover").each(function () {
            const $container = $(this);
            const $mouseEl = $container.find(".tf-mouse");

            let currentX, currentY, targetX, targetY;
            let animationFrame;

            // Khởi tạo vị trí nếu không thuộc mode-2
            if (!$mouseEl.hasClass("mode-2")) {
                currentX = $container.width() / 2;
                currentY = $container.height() / 2;
                targetX = currentX;
                targetY = currentY;

                $mouseEl.css({ left: currentX + "px", top: currentY + "px" });
            }

            $container.on("mouseenter", function () {
                if ($mouseEl.hasClass("mode-2")) {
                    $mouseEl.css({ opacity: 1 });
                }
            });

            $container.on("mousemove", function (e) {
                const rect = this.getBoundingClientRect();
                targetX = e.clientX - rect.left;
                targetY = e.clientY - rect.top;

                if ($mouseEl.hasClass("mode-2") && currentX == null) {
                    currentX = targetX;
                    currentY = targetY;
                }

                if (!animationFrame) animate();
            });

            $container.on("mouseleave", function () {
                if ($mouseEl.hasClass("mode-2")) {
                    $mouseEl.css({ opacity: 0 });
                } else {
                    targetX = $container.width() / 2;
                    targetY = $container.height() / 2;
                    if (!animationFrame) animate();
                }
            });

            function animate() {
                currentX += (targetX - currentX) * 0.1;
                currentY += (targetY - currentY) * 0.1;

                $mouseEl.css({ left: currentX + "px", top: currentY + "px" });

                if (
                    Math.abs(targetX - currentX) > 0.5 ||
                    Math.abs(targetY - currentY) > 0.5
                ) {
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    animationFrame = null;
                }
            }
        });
    };
    /* Video Popup
    -------------------------------------------------------------------------*/
    var videoPopup = function () {
        if ($("div").hasClass("video-wrap")) {
            $(".popup-youtube").magnificPopup({
                type: "iframe",
            });
        }
    };
    /* Indicator Item
    -------------------------------------------------------------------------*/
    var indicatorItem = () => {
        const wrappers = document.querySelectorAll(".indicator-main");

        wrappers.forEach((wrapper) => {
            const indicator = document.createElement("div");
            indicator.classList.add("indicator");
            wrapper.appendChild(indicator);

            const items = wrapper.querySelectorAll(".indicator-item");

            const moveIndicator = (el) => {
                const { offsetLeft, offsetWidth } = el;
                indicator.style.left = offsetLeft + "px";
                indicator.style.width = offsetWidth + "px";
                indicator.style.opacity = 1;
            };

            items.forEach((item) => {
                item.addEventListener("mouseenter", () => {
                    moveIndicator(item);
                });

                item.addEventListener("click", () => {
                    wrapper
                        .querySelectorAll(".indicator-item.current")
                        .forEach((el) => el.classList.remove("current"));

                    item.classList.add("current");
                    moveIndicator(item);
                });
            });

            wrapper.addEventListener("mouseleave", () => {
                const current = wrapper.querySelector(
                    ".indicator-item.current"
                );
                if (current) {
                    moveIndicator(current);
                } else {
                    indicator.style.opacity = 0;
                }
            });

            const current = wrapper.querySelector(".indicator-item.current");
            if (current) {
                moveIndicator(current);
            }
        });
    };
    /* Anime Cycle
  -------------------------------------------------------------------------------------*/
    var animateCycle = function () {
        const $container = $(".circle-container");
        if (!$container.length) return;

        const $outerElements = $(".outer-element");
        const $innerElements = $(".inner-element");

        let angle = 0,
            innerAngle = 0;
        const rotationSpeed = 2,
            innerRotationSpeed = -0.002;

        let outerPaused = false;
        let innerPaused = false;
        let running = false;
        let frameId = null;

        function updateElementWidth() {
            $container.css(
                "--circle-container-width",
                $container.outerWidth() + "px"
            );
        }

        function updatePositions() {
            const containerWidth = $container.outerWidth();
            const containerHeight = $container.outerHeight();

            const scale = Math.min(
                (containerWidth / 772) * 1.3,
                (containerHeight / 460) * 1.3
            );

            const outerWidth = 772 * scale;
            const outerHeight = 460 * scale;

            const innerWidth = 416 * scale;
            const innerHeight = 206 * scale;

            if (!outerPaused) {
                $outerElements.each(function (index) {
                    const avatarAngle =
                        angle + index * ((2 * Math.PI) / $outerElements.length);
                    const x = Math.cos(avatarAngle) * (outerWidth / 2);
                    const y = Math.sin(avatarAngle) * (outerHeight / 2);
                    $(this).css("transform", `translate(${x}px, ${y}px)`);
                });
            }

            if (!innerPaused) {
                $innerElements.each(function (index) {
                    const elemAngle =
                        innerAngle +
                        index * ((2 * Math.PI) / $innerElements.length);
                    const x = Math.cos(elemAngle) * (innerWidth / 2);
                    const y = Math.sin(elemAngle) * (innerHeight / 2);
                    $(this).css("transform", `translate(${x}px, ${y}px)`);
                });
            }
        }

        function animate() {
            if (!outerPaused) angle += rotationSpeed;
            if (!innerPaused) innerAngle += innerRotationSpeed;
            updatePositions();
            frameId = requestAnimationFrame(animate);
        }

        function startAnimation() {
            if (running) return;
            running = true;
            updateElementWidth();
            updatePositions();
            animate();
            $(window).trigger("ellipseAnimationStarted");
        }

        function stopAnimation() {
            running = false;
            if (frameId) {
                cancelAnimationFrame(frameId);
                frameId = null;
            }

            $outerElements.each(function () {
                this.style.transform = "";
            });
            $innerElements.each(function () {
                this.style.transform = "";
            });

            angle = 0;
            innerAngle = 0;

            $(window).trigger("ellipseAnimationStopped");
        }

        $outerElements.hover(
            function () {
                outerPaused = true;
            },
            function () {
                outerPaused = false;
            }
        );

        $innerElements.hover(
            function () {
                innerPaused = true;
            },
            function () {
                innerPaused = false;
            }
        );

        $(window).on("resize", function () {
            if (window.innerWidth >= 1200) {
                startAnimation();
            } else {
                stopAnimation();
            }
        });

        if (window.innerWidth >= 1200) {
            startAnimation();
        }

        return {
            start: startAnimation,
            stop: stopAnimation,
        };
    };
    /* Variant Picker
    -------------------------------------------------------------------------*/
    var variantPicker = function () {
        if ($(".variant-picker-item").length) {
            $(".unit-btn").on("click", function (e) {
                var value = $(this).data("unit");
                $(".value-currentUnit").text(value);

                $(this)
                    .closest(".variant-picker-values")
                    .find(".unit-btn")
                    .removeClass("active");
                $(this).addClass("active");
            });
        }
    };
    /* Checked Plan
    -------------------------------------------------------------------------*/
    var checkedPlan = () => {
        const allSwitches = document.querySelectorAll(
            ".wg-pricing .billing-toggle input[type='checkbox']"
        );

        allSwitches.forEach((switchEl) => {
            switchEl.addEventListener("change", function () {
                const wrapper = switchEl.closest(".wg-pricing");
                const priceEl = wrapper.querySelector(".plan-price");

                if (!priceEl) return;

                priceEl.classList.toggle("active-annual", switchEl.checked);
            });

            switchEl.dispatchEvent(new Event("change"));
        });
    };
    /* Card Btn Active
    -------------------------------------------------------------------------*/
    var cardBtnActive = () => {
        $(".action-shop-list").on("mouseenter click", function (e) {
            e.stopPropagation();
            $(this).addClass("active");
        });

        $(".card-product").on("mouseleave", function () {
            $(this).find(".action-shop-list").removeClass("active");
        });

        $(".tf-header-d8 .burger-menu").on("click", function (e) {
            $(this).toggleClass("active");
        });
    };
    /* Hover Category
    -------------------------------------------------------------------------*/
    var hoverCate = () => {
        const $items = $(".section-category .img-abs");
        const $cates = $(".section-category .cate-item");
        const $cateList = $(".section-category .cate-list");

        function setItemClass($el, num) {
            $el.removeClass(function (i, cls) {
                return (cls.match(/\bitem-\d+\b/g) || []).join(" ");
            }).addClass("item-" + num);
        }

        function rotateBy(index) {
            $items.each(function (i) {
                const newNum = ((index + i) % 4) + 1;
                setItemClass($(this), newNum);
            });
        }

        function resetDefault() {
            $cates.removeClass("active").first().addClass("active");
            rotateBy(0);
        }

        resetDefault();

        $cates.on("mouseenter", function () {
            const idx = $(this).index();
            $cates.removeClass("active");
            $(this).addClass("active");
            rotateBy(idx);
        });

        $cateList.on("mouseleave", function () {
            resetDefault();
        });
    };
    /* Click Change Image
    -------------------------------------------------------------------------*/
    var clickChangeImage = () => {
        $(document).on("click", "[data-stt][data-img]", function () {
            const stt = $(this).data("stt"); // ví dụ: "pf-6"
            const newImg = $(this).data("img"); // ví dụ: "assets/images/demo/new.jpg"

            // tìm đến .picture-frame có class trùng với stt
            const frame = $(".picture-frame." + stt);

            // thay đổi src ảnh trong .picture img
            frame.find(".picture img").attr("src", newImg);
        });
    };

    /* Option Active
    -------------------------------------------------------------------------*/
    var optionActive = () => {
        function checkWgOptionInView() {
            const options = document.querySelectorAll(".wg-option");
            const windowHeight = window.innerHeight;
            const activeLimit = windowHeight * 0.75;

            options.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const elementCenter = rect.top + rect.height / 2;

                if (elementCenter >= 0 && elementCenter <= activeLimit) {
                    el.classList.add("active");
                } else {
                    el.classList.remove("active");
                }
            });
        }

        window.addEventListener("scroll", checkWgOptionInView);
        window.addEventListener("resize", checkWgOptionInView);
        document.addEventListener("DOMContentLoaded", checkWgOptionInView);
        checkWgOptionInView();
    };
    /* Reveal
    -------------------------------------------------------------------------*/
    const reveal = () => {
        // if (!config || !config.reveal || !config.reveal.enable) {
        //     return;
        // }

        const $reveals = $(".reveal");

        // if ($reveals.length === 0) {
        //     console.log("Reveal is not working because no items found.");
        //     return;
        // } else {
        //     console.log("Reveal is working");
        // }

        if ($(window).width() > 768) {
            $(window).on("scroll", function () {
                $reveals.each(function () {
                    const $el = $(this);
                    const windowHeight = $(window).height();
                    const revealTop = this.getBoundingClientRect().top;
                    const elHeight = $el.outerHeight();
                    const revealPoint = 150;
                    const posPoint = 20;

                    // Parent styles
                    $el.parent().css({
                        perspective: "700px",
                        transformStyle: "preserve-3d",
                        perspectiveOrigin: "100% 0%",
                    });

                    // Node styles
                    $el.css({
                        transformOrigin: "50% 0",
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transition: "all .35s ease",
                    });

                    if (revealTop > windowHeight - revealPoint) {
                        $el.css({
                            opacity: "0",
                            transform: `rotateX(-${posPoint}deg)`,
                        });
                    }

                    if (revealTop < windowHeight - revealPoint) {
                        if (revealTop > -50) {
                            const schemas = Math.abs(1 - revealTop / elHeight);
                            const opacity = Math.min(
                                Math.abs(1 - (revealTop - 350) / elHeight),
                                1
                            );
                            const rotate = Math.min(
                                posPoint * schemas - (posPoint - 10),
                                0
                            );

                            $el.css({
                                opacity: opacity,
                                transform: `translate3d(0px,0px,0px) rotateX(${rotate}deg)`,
                            });
                        } else {
                            $el.css({
                                transform: `translate(0,0)`,
                            });
                        }
                    }
                });
            });
        }
    };
    /* Anime Line
    -------------------------------------------------------------------------*/
    var animateLineBreak = () => {
        document.querySelectorAll(".tf-break-wrap").forEach((el) => {
            const line = el.querySelector(".line");
            const count = parseInt(el.getAttribute("data-line")) || 1;
            const totalTime = 12; // tổng thời gian
            const delayStep = totalTime / count;

            // clear span cũ
            line.innerHTML = "";

            // render span mới + chia delay đều
            for (let i = 0; i < count; i++) {
                const span = document.createElement("span");
                span.style.setProperty("--delay", `${delayStep * i}s`);
                line.appendChild(span);
            }
        });
    };
    /* Button Quantity
   -------------------------------------------------------------------------*/
    var btnQuantity = function () {
        $(".minus-btn").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            var $input = $this.closest("div").find("input");
            var value = parseInt($input.val(), 10);

            if (value > 1) {
                value = value - 1;
            }
            $input.val(value);
        });

        $(".plus-btn").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            var $input = $this.closest("div").find("input");
            var value = parseInt($input.val(), 10);

            if (value > -1) {
                value = value + 1;
            }
            $input.val(value);
        });
    };

    /* Delete File 
    -------------------------------------------------------------------------*/
    var deleteFile = function (e) {
        function updateCount() {
            var count = $(".list-file-delete .file-delete").length;
            $(".prd-count").text(count);
        }

        function updateTotalPrice() {
            var total = 0;

            $(".list-file-delete .tf-mini-cart-item").each(function () {
                var priceText = $(this)
                    .find(".tf-mini-card-price")
                    .text()
                    .replace("$", "")
                    .replace(",", "")
                    .trim();
                var price = parseFloat(priceText);
                if (!isNaN(price)) {
                    total += price;
                }
            });

            var formatted = total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
            $(".tf-totals-total-value").text(formatted);
        }

        function updatePriceEach() {
            $(".each-prd").each(function () {
                var priceText = $(this)
                    .find(".each-price")
                    .text()
                    .replace("$", "")
                    .replace(",", "")
                    .trim();
                var price = parseFloat(priceText);
                var quantity = parseInt(
                    $(this).find(".quantity-product").val(),
                    10
                );
                if (!isNaN(price) && !isNaN(quantity)) {
                    var subtotal = price * quantity;
                    var formatted = subtotal.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    });
                    $(this).find(".each-subtotal-price").text(formatted);
                }
            });
        }

        function updateTotalPriceEach() {
            var total = 0;

            $(".each-list-prd .each-prd").each(function () {
                var priceText = $(this)
                    .find(".each-subtotal-price")
                    .text()
                    .replace("$", "")
                    .replace(",", "")
                    .trim();
                var price = parseFloat(priceText);
                var quantity = parseInt(
                    $(this).find(".quantity-product").val(),
                    10
                );

                if (!isNaN(price) && !isNaN(quantity)) {
                    total += price * quantity;
                }
            });

            var formatted = total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
            $(".each-total-price").text(formatted);
        }

        function checkListEmpty() {
            $(".wrap-empty_text").each(function () {
                var $listEmpty = $(this);
                var $textEmpty = $listEmpty.find(".box-text_empty");
                var $otherChildren = $listEmpty
                    .find(".list-empty")
                    .children()
                    .not(".box-text_empty");
                var $boxEmpty = $listEmpty.find(".box-empty_clear");
                if ($otherChildren.length > 0) {
                    $textEmpty.hide();
                } else {
                    $textEmpty.show();
                    $boxEmpty.hide();
                }
            });
        }

        if ($(".main-list-clear").length) {
            $(".main-list-clear").each(function () {
                var $mainList = $(this);

                $mainList.find(".clear-list-empty").on("click", function () {
                    $mainList
                        .find(".list-empty")
                        .children()
                        .not(".box-text_empty")
                        .remove();
                    checkListEmpty();
                });
            });
        }
        function ortherDel() {
            $(".container .orther-del").remove();
        }
        $(".list-file-delete").on("input", ".quantity-product", function () {
            updateTotalPrice();
        });

        $(".list-file-delete,.each-prd").on(
            "click",
            ".minus-quantity, .plus-quantity",
            function () {
                var $quantityInput = $(this).siblings(".quantity-product");
                var currentQuantity = parseInt($quantityInput.val(), 10);

                if ($(this).hasClass("plus-quantity")) {
                    $quantityInput.val(currentQuantity + 1);
                } else if (
                    $(this).hasClass("minus-quantity") &&
                    currentQuantity > 1
                ) {
                    $quantityInput.val(currentQuantity - 1);
                }

                updateTotalPrice();
                updatePriceEach();
                updateTotalPriceEach();
            }
        );

        $(".remove").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.closest(".file-delete").remove();
            updateCount();
            updateTotalPrice();
            checkListEmpty();
            updateTotalPriceEach();
            ortherDel();
        });

        $(".clear-file-delete").on("click", function (e) {
            e.preventDefault();
            $(this).closest(".list-file-delete").find(".file-delete").remove();
            updateCount();
            updateTotalPrice();
            checkListEmpty();
        });
        checkListEmpty();
        updateCount();
        updateTotalPrice();
        updatePriceEach();
        updateTotalPriceEach();
    };
    /* Estimate Shipping
-------------------------------------------------------------------------*/
    var estimateShipping = function () {
        if ($(".estimate-shipping").length) {
            const $countrySelect = $("#shipping-country-form");
            const $provinceSelect = $("#shipping-province-form");
            const $zipcodeInput = $("#zipcode");
            const $zipcodeMessage = $("#zipcode-message");
            const $zipcodeSuccess = $("#zipcode-success");
            const $shippingForm = $("#shipping-form");

            function updateProvinces() {
                const selectedCountry = $countrySelect.val();
                const $selectedOption = $countrySelect.find("option:selected");
                const provincesData = $selectedOption.attr("data-provinces");

                const provinces = JSON.parse(provincesData);
                $provinceSelect.empty();

                if (provinces.length === 0) {
                    $provinceSelect.append($("<option>").text("------"));
                } else {
                    provinces.forEach(function (province) {
                        $provinceSelect.append(
                            $("<option>").val(province[0]).text(province[1])
                        );
                    });
                }
            }

            $countrySelect.on("change", updateProvinces);

            function validateZipcode(zipcode, country) {
                let regex;

                switch (country) {
                    case "Australia":
                    case "Austria":
                    case "Belgium":
                    case "Denmark":
                        regex = /^\d{4}$/;
                        break;
                    case "Canada":
                        regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
                        break;
                    case "Czech Republic":
                    case "Finland":
                    case "France":
                    case "Germany":
                    case "Mexico":
                    case "South Korea":
                    case "Spain":
                    case "Italy":
                        regex = /^\d{5}$/;
                        break;
                    case "United States":
                        regex = /^\d{5}(-\d{4})?$/;
                        break;
                    case "United Kingdom":
                        regex = /^[A-Za-z]{1,2}\d[A-Za-z\d]? \d[A-Za-z]{2}$/;
                        break;
                    case "India":
                    case "Vietnam":
                        regex = /^\d{6}$/;
                        break;
                    case "Japan":
                        regex = /^\d{3}-\d{4}$/;
                        break;
                    default:
                        return true;
                }

                return regex.test(zipcode);
            }

            $shippingForm.on("submit", function (event) {
                const zipcode = $zipcodeInput.val().trim();
                const country = $countrySelect.val();

                if (!validateZipcode(zipcode, country)) {
                    $zipcodeMessage.show();
                    $zipcodeSuccess.hide();
                    event.preventDefault();
                } else {
                    $zipcodeMessage.hide();
                    $zipcodeSuccess.show();
                    event.preventDefault();
                }
            });

            $(window).on("load", updateProvinces);
        }
    };
    /* Handle Progress
    -------------------------------------------------------------------------*/
    var handleProgress = function () {
        if ($(".progress-cart").length > 0) {
            var progressValue = $(".progress-cart .value").data("progress");
            setTimeout(function () {
                $(".progress-cart .value").css("width", progressValue + "%");
            }, 800);
        }

        function handleProgressBar(showEvent, hideEvent, target) {
            $(target).on(hideEvent, function () {
                $(".tf-progress-bar .value").css("width", "0%");
            });

            $(target).on(showEvent, function () {
                setTimeout(function () {
                    var progressValue = $(".tf-progress-bar .value").data(
                        "progress"
                    );
                    $(".tf-progress-bar .value").css(
                        "width",
                        progressValue + "%"
                    );
                }, 600);
            });
        }

        if ($(".offcanvas-shop-cart").length > 0) {
            handleProgressBar(
                "show.bs.offcanvas",
                "hide.bs.offcanvas",
                ".offcanvas-shop-cart"
            );
        }

        if ($(".offcanvas-shop-cart").length > 0) {
            handleProgressBar(
                "show.bs.modal",
                "hide.bs.modal",
                ".offcanvas-shop-cart"
            );
        }
    };
    /* Play Video
    -------------------------------------------------------------------------*/
    var playVideo = () => {
        $(".btn-view-video").on("click", function (e) {
            e.preventDefault();

            const video = $("#showreel").get(0);
            if (video.paused) {
                video.play();
                $(this).css("opacity", 0);
            } else {
                video.pause();
                $(this).css("opacity", 1);
            }
        });
    };
    /* Header Fixed
    -------------------------------------------------------------------------*/
    var headerFixed = () => {
        const header = document.querySelector(
            ".tf-header, .tf-header-d6, .tf-header-5"
        );
        const headerBlock = document.querySelector(".tf-header-block-height");

        if (!header || !headerBlock) return;

        const stickySelectors = ".sticky-top, .sticky-md-top, .sticky-lg-top";

        function updateStickyTop(headerHeight) {
            document.querySelectorAll(stickySelectors).forEach((el) => {
                el.style.top = headerHeight + 15 + "px";
            });
        }

        function setHeaderHeight() {
            header.style.position = "relative";
            const headerHeight = header.offsetHeight;
            header.style.position = "";

            headerBlock.style.height = headerHeight + "px";

            updateStickyTop(headerHeight);

            if (!header.classList.contains("header-fixed")) {
                header.classList.add("header-fixed");
            }
        }

        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        function checkScrollHideSection() {
            const scrollHideSections =
                document.querySelectorAll(".scroll-hide-head");
            const scrollPos = window.scrollY;

            if (scrollPos > 10) {
                header.classList.add("scrolling");
            } else {
                header.classList.remove("scrolling");
            }

            const headerHeight = header.offsetHeight;
            updateStickyTop(headerHeight);

            let shouldHideHeader = false;

            scrollHideSections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (
                    scrollPos + headerHeight >= sectionTop &&
                    scrollPos <= sectionBottom
                ) {
                    shouldHideHeader = true;
                }
            });

            if (shouldHideHeader) {
                header.classList.add("header-hidden");
            } else {
                header.classList.remove("header-hidden");
            }
        }

        setHeaderHeight();
        checkScrollHideSection();

        const handleResize = debounce(function () {
            setHeaderHeight();
            checkScrollHideSection();
        }, 400);

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", checkScrollHideSection);
    };

    /* Footer Fixed
    -------------------------------------------------------------------------*/
    var footerFixed = () => {
        const footerBlock = document.querySelector(".tf-footer-block-height");
        const footer = document.querySelector(".tf-footer-d6");
        if (!footerBlock || !footer) return;

        const updateHeight = () => {
            if (window.innerWidth < 991) {
                footerBlock.style.height = "";
                return;
            }
            const height = footer.offsetHeight;
            footerBlock.style.height = height + "px";
        };

        updateHeight();
        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateHeight, 300);
        });
    };

    /* Static Is Active
    -------------------------------------------------------------------------*/
    var staticIsActive = () => {
        var $accordionItems = $(".static-accordion .item");
        var $imgStatics = $(".img-static-list .img-static");

        function activateInView() {
            var windowHeight = $(window).height();
            var windowWidth = $(window).width();

            if (windowWidth < 576) {
                $accordionItems.removeClass("is-active");
                $imgStatics.removeClass("is-active");
                return;
            }

            var triggerPoint = windowHeight * 0.5;

            $accordionItems.each(function (index) {
                var $item = $(this);
                var rect = $item[0].getBoundingClientRect();

                var itemCenter = rect.top + rect.height / 2;

                if (
                    itemCenter >= triggerPoint - 50 &&
                    itemCenter <= triggerPoint + 50
                ) {
                    $accordionItems.removeClass("is-active");
                    $imgStatics.removeClass("is-active");

                    $item.addClass("is-active");
                    $imgStatics.eq(index).addClass("is-active");
                }
            });
        }

        activateInView();
        $(window).on("scroll resize", activateInView);
    };

    /* Init Spline
    -------------------------------------------------------------------------*/
    var initSpline = () => {
        const iframes = document.querySelectorAll(".spline-embed");
        if (!iframes.length) return;

        iframes.forEach((iframe) => {
            iframe.dataset.src = iframe.src;
        });

        function toggleSplines() {
            const isMobile = window.innerWidth < 850;
            iframes.forEach((iframe) => {
                if (isMobile) {
                    iframe.removeAttribute("src");
                } else {
                    if (!iframe.src && iframe.dataset.src) {
                        iframe.src = iframe.dataset.src;
                    }
                }
            });
        }

        toggleSplines();
        window.addEventListener("resize", toggleSplines);
    };
    /* Preload
    -------------------------------------------------------------------------*/
    var preload = () => {
        const preloader = document.getElementById("preloader");
        if (!preloader) return;
        const source = document.getElementById("preload-text");
        const text = source ? source.textContent.trim() : "";
        const container = document.getElementById("letters");
        container.innerHTML = "";

        const chars = text.split("");

        chars.forEach((char, i) => {
            const span = document.createElement("span");
            span.textContent = char;
            span.classList.add("letter");

            const isDot = char === ".";
            const isLastThreeDots = isDot && i >= chars.length - 3;

            if (isLastThreeDots) {
                span.classList.add("loading-dot");
            }

            span.style.animationDelay = i * 0.05 + "s";
            container.appendChild(span);
        });

        const letters = document.querySelectorAll(".letter");
        let pageLoaded = false;
        let animationInComplete = false;

        const totalIn = text.length * 50 + 200;

        const checkPageLoad = () => {
            if (document.readyState === "complete") {
                pageLoaded = true;
                if (animationInComplete) {
                    startOutAnimation();
                }
            }
        };

        const startOutAnimation = () => {
            const lastOutTotal = (text.length - 1) * 40 + 200;

            letters.forEach((span, i) => {
                span.style.animation = "none";
                span.style.opacity = "1";
                span.style.transform = "translateX(0)";
                void span.offsetWidth;

                span.style.animation = `letterOut 0.3s ease forwards`;
                span.style.animationDelay = i * 0.04 + "s";
            });

            setTimeout(() => {
                preloader.classList.add("preloader-hidden");
                document.body.style.overflow = "auto";
                if (window.WOW) {
                    new WOW().init();
                }
            }, lastOutTotal);
        };

        setTimeout(() => {
            animationInComplete = true;
            if (pageLoaded) {
                startOutAnimation();
            }
        }, totalIn);

        if (document.readyState === "complete") {
            pageLoaded = true;
        } else {
            window.addEventListener("load", checkPageLoad);
        }

        setTimeout(() => {
            if (!preloader.classList.contains("preloader-hidden")) {
                startOutAnimation();
            }
        }, 5000);
    };

    /* getDataImage
  -------------------------------------------------------------------------------------*/
    const getDataImage = () => {
        if (!$("[data-background]").length) return;
        $("[data-background]").each(function () {
            $(this).css(
                "background-image",
                "url(" + $(this).attr("data-background") + ")"
            );
        });
    };

    /* Direct Action
    -------------------------------------------------------------------------*/
    var directAction = () => {
        $(".form-log-d2.forgot, .form-log-d5.forgot").on(
            "submit",
            function (e) {
                e.preventDefault();

                let email = $("#ip-email").val().trim();

                if (email === "") {
                    alert("Please enter your email");
                    return;
                }
                let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regex.test(email)) {
                    alert("Invalid email address");
                    return;
                }
                window.location.href = "reset-password.html";
            }
        );
    };

    /* dot_hover
    -------------------------------------------------------------------------------------*/
    const dot_hover = () => {
        if ($(".dot-hover-d8").length) {
            function initDotsBackground(heroEl) {
                const bg = heroEl.querySelector(".dots-bg");
                const title = heroEl.querySelector(".dot-title");
                const isDark = heroEl.classList.contains("type-dark");

                const app = new PIXI.Application({
                    resizeTo: heroEl,
                    backgroundAlpha: 0,
                    antialias: true,
                });
                bg.appendChild(app.view);

                const container = new PIXI.Container();
                app.stage.addChild(container);

                let dots = [];
                const spacing = 12;
                const baseRadius = 1.4;
                const hoverRadius = 80;

                function createDots() {
                    container.removeChildren();
                    dots = [];

                    const width = app.renderer.width;
                    const height = app.renderer.height;

                    const cols = Math.ceil(width / spacing) + 2;
                    const rows = Math.ceil(height / spacing) + 2;

                    for (let y = 0; y < rows; y++) {
                        for (let x = 0; x < cols; x++) {
                            const dot = new PIXI.Graphics();
                            dot.beginFill(
                                isDark ? 0xffffff : 0x666666,
                                isDark ? 0.3 : 0.35
                            );
                            dot.drawCircle(0, 0, baseRadius);
                            dot.endFill();

                            dot.x = x * spacing;
                            dot.y = y * spacing;

                            dot.baseScale = 1;
                            dot.targetScale = 1;
                            dot.baseAlpha = 0.35;
                            dot.targetAlpha = 0.35;

                            dot.scale.set(dot.baseScale);
                            dot.alpha = dot.baseAlpha;

                            container.addChild(dot);
                            dots.push(dot);
                        }
                    }

                    container.x = (width - (cols - 1) * spacing) / 2;
                    container.y = (height - (rows - 1) * spacing) / 2;
                }

                createDots();
                app.renderer.on("resize", createDots);

                app.ticker.add(() => {
                    dots.forEach((dot) => {
                        dot.scale.x += (dot.targetScale - dot.scale.x) * 0.15;
                        dot.scale.y = dot.scale.x;
                        dot.alpha += (dot.targetAlpha - dot.alpha) * 0.12;
                    });
                });

                let titleOffsetX = 0;
                let targetOffsetX = 0;

                function lerp(a, b, t) {
                    return a + (b - a) * t;
                }

                if (title) {
                    function animateTitle() {
                        titleOffsetX = lerp(titleOffsetX, targetOffsetX, 0.12);
                        title.style.transform = `translateX(${titleOffsetX}px)`;
                        requestAnimationFrame(animateTitle);
                    }
                    animateTitle();
                }

                heroEl.addEventListener("mousemove", (e) => {
                    const rect = heroEl.getBoundingClientRect();
                    const mx = e.clientX - rect.left;
                    const my = e.clientY - rect.top;
                    const width = rect.width;

                    dots.forEach((dot) => {
                        const dx = dot.x + container.x - mx;
                        const dy = dot.y + container.y - my;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < hoverRadius) {
                            const t = 1 - dist / hoverRadius;
                            dot.targetScale = 1 + t * 3.2;
                            dot.targetAlpha = 0.35 + t * 2;
                        } else {
                            dot.targetScale = 1;
                            dot.targetAlpha = 0.35;
                        }
                    });

                    if (title) {
                        const maxShift = width * 0.2;
                        const percent = mx / width;
                        targetOffsetX = (percent - 0) * 2 * maxShift;
                    }
                });

                heroEl.addEventListener("mouseleave", () => {
                    dots.forEach((dot) => {
                        dot.targetScale = 1;
                        dot.targetAlpha = 0.35;
                    });

                    if (title) {
                        targetOffsetX = 0;
                    }
                });
            }

            document
                .querySelectorAll(".dot-hover-d8")
                .forEach(initDotsBackground);
        }
    };

    /* scroll_bar
    -------------------------------------------------------------------------------------*/
    const scroll_bar = () => {
        if ($(".left-scroll-wrapper-d8").length) {
            const track = document.querySelector(".left-scroll-track");
            const line = document.querySelector(".left-scroll-line");
            const knob = document.querySelector(".left-scroll-knob");

            let currentP = 0;
            let targetP = 0;

            function updateTarget() {
                const scrollTop = window.scrollY || window.pageYOffset;
                const maxScroll =
                    document.documentElement.scrollHeight - window.innerHeight;

                let p = maxScroll > 0 ? scrollTop / maxScroll : 0;
                targetP = Math.max(0, Math.min(1, p));
            }

            function animateKnob() {
                currentP += (targetP - currentP) * 0.15;

                const trackRect = track.getBoundingClientRect();
                const lineRect = line.getBoundingClientRect();

                const lineTopInTrack = lineRect.top - trackRect.top;
                const lineHeight = lineRect.height;
                const knobHeight = knob.offsetHeight;

                const moveRange = lineHeight - knobHeight;

                const knobTop = lineTopInTrack + currentP * moveRange;

                knob.style.top = knobTop + "px";

                requestAnimationFrame(animateKnob);
            }

            window.addEventListener("scroll", updateTarget);
            window.addEventListener("resize", updateTarget);

            updateTarget();
            animateKnob();

            const darkSections = document.querySelectorAll(".dark-section");

            const observer = new IntersectionObserver(
                (entries) => {
                    let activeDark = false;

                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            activeDark = true;
                        }
                    });

                    if (activeDark) {
                        track.classList.add("dark-mode");
                    } else {
                        track.classList.remove("dark-mode");
                    }
                },
                {
                    threshold: 0.3,
                }
            );

            darkSections.forEach((sec) => observer.observe(sec));
        }
    };
    /* Test Hover
    -------------------------------------------------------------------------*/
    var testHover = () => {
        document.querySelectorAll(".br2-tes").forEach((card) => {
            const hoverEl = card.querySelector(".test-hover");

            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                hoverEl.style.left = x + "px";
                hoverEl.style.top = y + "px";
            });

            card.addEventListener("mouseenter", () => {
                hoverEl.style.opacity = 1;
            });

            card.addEventListener("mouseleave", () => {
                hoverEl.style.opacity = 0;
            });
        });
    };

    /* Cursor Image Hover
    ---------------------------------------------------------- */
    var hoverImgCursor = function () {
        let offsetX = 20;
        let offsetY = 20;
        $(".hover-cursor-img").on("mousemove", function (e) {
            let hoverImage = $(this).find(".hover-image");
            hoverImage.css({
                top: e.clientY + offsetY + "px",
                left: e.clientX + offsetX + "px",
            });
        });

        $(".hover-cursor-img").on("mouseenter", function () {
            let hoverImage = $(this).find(".hover-image");
            hoverImage.css({
                transform: "scale(1)",
                opacity: 1,
            });
        });

        $(".hover-cursor-img").on("mouseleave", function () {
            let hoverImage = $(this).find(".hover-image");
            hoverImage.css({
                transform: "scale(0)",
                opacity: 0,
            });
        });
    };

    /* reel
    -------------------------------------------------------------------------------------*/
    const reel = () => {
        if ($(".hero__reel-wrap").length) {
            gsap.registerPlugin(ScrollTrigger);

            const reel = document.getElementById("reel");
            const reelWrap = document.getElementById("reelWrap");
            const scrollArea = document.getElementById("scrollArea");

            /* =========================
               1. Small reel entrance
            ========================= */
            gsap.to(reel, {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 1.2,
                delay: 0.3,
                ease: "power3.out"
            });

            /* =========================
               2. Inside HERO:
                  reel stays at bottom-right,
                  only scales up gradually
            ========================= */
            let growTL = gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            growTL.to(reelWrap, {
                scale: 1.0,         // scale up but still anchored to bottom-right
                ease: "power2.out"
            }, 0);

            growTL.to(reel, {
                borderRadius: 12,
                ease: "power2.out"
            }, 0);

            /* =========================
               3. SCROLL-AREA behavior:
                  reel becomes fixed + fullscreen
                  ONLY visible within scroll-area
            ========================= */
            let fullTL = gsap.timeline({
                scrollTrigger: {
                    trigger: scrollArea,
                    start: "top bottom",   // scroll-area starts entering viewport
                    end: "bottom top",     // scroll-area fully leaves viewport
                    scrub: true,

                    onEnter: () => {
                        // when scroll-area starts → set reel as fixed
                        reelWrap.style.position = "fixed";
                        reelWrap.style.right = "40px";
                        reelWrap.style.bottom = "40px";
                        reelWrap.style.display = "flex";
                    },
                    onLeaveBack: () => {
                        // when scrolling back up → restore reel position
                        reelWrap.style.position = "fixed";
                        reelWrap.style.right = "40px";
                        reelWrap.style.bottom = "40px";
                        reelWrap.style.display = "flex";
                    },
                    onLeave: () => {
                        // when completely past scroll-area → hide reel
                        reelWrap.style.display = "none";
                    },
                    onEnterBack: () => {
                        // scrolling back down into scroll-area → show reel again
                        reelWrap.style.display = "flex";
                        reelWrap.style.position = "fixed";
                        reelWrap.style.right = "40px";
                        reelWrap.style.bottom = "40px";
                    }
                }
            });

            /* inside scroll-area:
               from scale ~1 at end of hero → scale to fullscreen */
            fullTL.fromTo(reelWrap,
                { width: 329, height: 220, scale: 1 },
                {
                    width: "90vw",
                    height: "90vh",
                    scale: 1,
                    ease: "power2.out"
                },
                0
            );

            fullTL.to(reel, {
                borderRadius: 0,
                boxShadow: "0 0 0 rgba(0,0,0,0)",
                ease: "power2.out"
            }, 0);

            /* slight fade-out near the end of scroll-area (optional) */
            fullTL.to(reelWrap, {
                opacity: 0.0,
                ease: "power1.out"
            }, 0.7);   // 0.7 ≈ near the end of scroll-area
        }
    }
    /* hoverActive 
  -------------------------------------------------------------------------------------*/
    var hoverActive = function () {
        $(".wrap-box-hover-active").each(function (index) {
            var $container = $(this);
            var containerId = `hover-container-${index}`;
            $container.attr("data-hover-id", containerId);
            var $hoverItems = $container.find(".item-hover");
            if (
                $container.find(".item-hover.is-active").length === 0 &&
                $hoverItems.length > 0
            ) {
                $hoverItems.first().addClass("is-active");
            }
            $container.on("mouseenter", ".item-hover", function () {
                var $activeItem = $container.find(".item-hover.is-active");
                if ($activeItem.length > 0 && $activeItem[0] !== this) {
                    $activeItem.removeClass("is-active");
                }
                $(this).addClass("is-active");
            });
        });
    };

    /* cursorCustom 
  ------------------------------------------------------------------------------------- */
    var cursorCustom = function () {
        if ($(".custom-cursor").length > 0) {
            $(".cursor-wrapper").each(function () {
                var $wrapper = $(this);
                var $cursor = $wrapper.find(".custom-cursor");
                var $title = $wrapper.find(".process-title");
                var $area = $wrapper.find(".area-cursor-custom");

                if ($cursor.length && $area.length) {
                    function moveCursor(e) {
                        var left = $area.offset().left;
                        var top = $area.offset().top - $(window).scrollTop();

                        $cursor.css({
                            top: e.clientY - top - 60 + "px",
                            left: e.clientX - left - 60 + "px",
                            opacity: 1,
                            transform: "scale(1)",
                        });
                    }

                    $area.on("mousemove pointermove", moveCursor);
                    $area.on("mouseleave", () => {
                        $cursor.css({
                            opacity: 0,
                            transform: "scale(0.3)",
                        });
                    });

                    $title.on({
                        mouseenter: () => $cursor.addClass("disable"),
                        mouseleave: () => $cursor.removeClass("disable"),
                    });
                }
            });
        }
    };

    // Dom Ready
    $(function () {
        headerSticky();
        infiniteSlide();
        counterOdo();
        activeAccordion();
        handleMobileMenu();
        dropdownSelect();
        swatchColor();
        handleFooter();
        parallaxie();
        changeValue();
        handleSidebarFilter();
        totalPriceVariant();
        mouseHover();
        videoPopup();
        indicatorItem();
        animateCycle();
        variantPicker();
        checkedPlan();
        cardBtnActive();
        hoverCate();
        clickChangeImage();
        optionActive();
        reveal();
        animateLineBreak();
        btnQuantity();
        deleteFile();
        estimateShipping();
        handleProgress();
        playVideo();
        headerFixed();
        footerFixed();
        staticIsActive();
        initSpline();
        getDataImage();
        directAction();
        dot_hover();
        scroll_bar();
        testHover();
        hoverImgCursor();
        reel();
        hoverActive();
        cursorCustom();

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", preload);
        } else {
            preload();
        }
    });
})(jQuery);
