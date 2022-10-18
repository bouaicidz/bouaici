  let mainColors = localStorage.getItem("color_option");
        if (mainColors !== null) {
            document.documentElement.style.setProperty('--cl', localStorage.getItem("color_option"));
            document.querySelectorAll(".colors-list li").forEach(element => {
                element.classList.remove("active");
                if (element.dataset.color === mainColors) {
                    element.classList.add("active");
                }
            });
        }
        const colorsLi = document.querySelectorAll(".colors-list li"); colorsLi.forEach(li => {
            li.addEventListener("click", (e) => {
                document.documentElement.style.setProperty('--cl', e.target.dataset.color);
                localStorage.setItem("color_option", e.target.dataset.color);
                e.target.parentElement.querySelectorAll(".active").forEach(element => {
                    element.classList.remove("active");
                });
                e.target.classList.add("active");
            });
        });
        let mainColor = localStorage.getItem("color"); null !== mainColor && (document.documentElement.style.setProperty("--cl2", localStorage.getItem("color")));
        const colorLi = document.querySelectorAll(".colors-list li"); colorLi.forEach(e => {
            e.addEventListener("click", e => {
                document.documentElement.style.setProperty("--cl2", e.target.dataset.colors), localStorage.setItem("color", e.target.dataset.colors)
            })
        }); document.querySelector(".settings-box .toggle-settings .fa-gear").onclick = function () {
            this.classList.toggle("fa-spin");
            document.querySelector(".settings-box").classList.toggle("open")
        };
        if ($(".card-header").length > 0) {
            $(".card-header").click(function () {
                if ($(this).next(".card-body").hasClass("active")) {
                    $(this).next(".card-body").removeClass("active").slideUp();
                    $(this).children("span").removeClass("fa-minus").addClass("fa-plus");
                } else {
                    $(".card .card-body").removeClass("active").slideUp();
                    $(".card .card-header span").removeClass("fa-minus").addClass("fa-plus");
                    $(this).next(".card-body").addClass("active").slideDown();
                    $(this).children("span").removeClass("fa-plus").addClass("fa-minus");
                }
            });
        }

        function loadCSS(e, t, n) {
            "use strict";
            var i = window.document.createElement("link");
            var o = t || window.document.getElementsByTagName("script")[0];
            i.rel = "stylesheet";
            i.href = e;
            i.media = "only x";
            o.parentNode.insertBefore(i, o);
            setTimeout(function () {
                i.media = n || "all"
            })
        }
        loadCSS("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css");
        var didScroll = false; window.onscroll = () => didScroll = true; setTimeout(() => {
            if (!didScroll) {
                window.scrollTo({
                    top: 1,
                    behavior: 'smooth'
                })
            }
        }, 5000); $(document).ready(function () {
            (function ($) {
                $.fn.theiaStickySidebar = function (options) {
                    var defaults = {
                        'containerSelector': '',
                        'additionalMarginTop': 0,
                        'additionalMarginBottom': 0,
                        'updateSidebarHeight': true,
                        'minWidth': 0,
                        'disableOnResponsiveLayouts': true,
                        'sidebarBehavior': 'modern',
                        'defaultPosition': 'relative',
                        'namespace': 'TSS'
                    };
                    options = $.extend(defaults, options);
                    options.additionalMarginTop = parseInt(options.additionalMarginTop) || 0;
                    options.additionalMarginBottom = parseInt(options.additionalMarginBottom) || 0;
                    tryInitOrHookIntoEvents(options, this);

                    function tryInitOrHookIntoEvents(options, $that) {
                        var success = tryInit(options, $that);
                        if (!success) {
                            console.log('TSS: Body width smaller than options.minWidth. Init is delayed.');
                            $(document).on('scroll.' + options.namespace, function (options, $that) {
                                return function (evt) {
                                    var success = tryInit(options, $that);
                                    if (success) {
                                        $(this).unbind(evt)
                                    }
                                }
                            }(options, $that));
                            $(window).on('resize.' + options.namespace, function (options, $that) {
                                return function (evt) {
                                    var success = tryInit(options, $that);
                                    if (success) {
                                        $(this).unbind(evt)
                                    }
                                }
                            }(options, $that))
                        }
                    }

                    function tryInit(options, $that) {
                        if (options.initialized === true) {
                            return true
                        }
                        if ($('body').width() < options.minWidth) {
                            return false
                        }
                        init(options, $that);
                        return true
                    }

                    function init(options, $that) {
                        options.initialized = true;
                        var existingStylesheet = $('#theia-sticky-sidebar-stylesheet-' + options.namespace);
                        if (existingStylesheet.length === 0) {
                            $('head').append($('<style id="theia-sticky-sidebar-stylesheet-' + options.namespace + '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'))
                        }
                        $that.each(function () {
                            var o = {};
                            o.sidebar = $(this);
                            o.options = options || {};
                            o.container = $(o.options.containerSelector);
                            if (o.container.length == 0) {
                                o.container = o.sidebar.parent()
                            }
                            o.sidebar.parents().css('-webkit-transform', 'none');
                            o.sidebar.css({
                                'position': o.options.defaultPosition,
                                'overflow': 'visible',
                                '-webkit-box-sizing': 'border-box',
                                '-moz-box-sizing': 'border-box',
                                'box-sizing': 'border-box'
                            });
                            o.stickySidebar = o.sidebar.find('.theiaStickySidebar');
                            if (o.stickySidebar.length == 0) {
                                var javaScriptMIMETypes = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                                o.sidebar.find('script').filter(function (index, script) {
                                    return script.type.length === 0 || script.type.match(javaScriptMIMETypes)
                                }).remove();
                                o.stickySidebar = $('<div>').addClass('theiaStickySidebar').append(o.sidebar.children());
                                o.sidebar.append(o.stickySidebar)
                            }
                            o.marginBottom = parseInt(o.sidebar.css('margin-bottom'));
                            o.paddingTop = parseInt(o.sidebar.css('padding-top'));
                            o.paddingBottom = parseInt(o.sidebar.css('padding-bottom'));
                            var collapsedTopHeight = o.stickySidebar.offset().top;
                            var collapsedBottomHeight = o.stickySidebar.outerHeight();
                            o.stickySidebar.css('padding-top', 1);
                            o.stickySidebar.css('padding-bottom', 1);
                            collapsedTopHeight -= o.stickySidebar.offset().top;
                            collapsedBottomHeight = o.stickySidebar.outerHeight() - collapsedBottomHeight - collapsedTopHeight;
                            if (collapsedTopHeight == 0) {
                                o.stickySidebar.css('padding-top', 0);
                                o.stickySidebarPaddingTop = 0
                            } else {
                                o.stickySidebarPaddingTop = 1
                            }
                            if (collapsedBottomHeight == 0) {
                                o.stickySidebar.css('padding-bottom', 0);
                                o.stickySidebarPaddingBottom = 0
                            } else {
                                o.stickySidebarPaddingBottom = 1
                            }
                            o.previousScrollTop = null;
                            o.fixedScrollTop = 0;
                            resetSidebar();
                            o.onScroll = function (o) {
                                if (!o.stickySidebar.is(":visible")) {
                                    return
                                }
                                if ($('body').width() < o.options.minWidth) {
                                    resetSidebar();
                                    return
                                }
                                if (o.options.disableOnResponsiveLayouts) {
                                    var sidebarWidth = o.sidebar.outerWidth(o.sidebar.css('float') == 'none');
                                    if (sidebarWidth + 50 > o.container.width()) {
                                        resetSidebar();
                                        return
                                    }
                                }
                                var scrollTop = $(document).scrollTop();
                                var position = 'static';
                                if (scrollTop >= o.sidebar.offset().top + (o.paddingTop - o.options.additionalMarginTop)) {
                                    var offsetTop = o.paddingTop + options.additionalMarginTop;
                                    var offsetBottom = o.paddingBottom + o.marginBottom + options.additionalMarginBottom;
                                    var containerTop = o.sidebar.offset().top;
                                    var containerBottom = o.sidebar.offset().top + getClearedHeight(o.container);
                                    var windowOffsetTop = 0 + options.additionalMarginTop;
                                    var windowOffsetBottom;
                                    var sidebarSmallerThanWindow = (o.stickySidebar.outerHeight() + offsetTop + offsetBottom) < $(window).height();
                                    if (sidebarSmallerThanWindow) {
                                        windowOffsetBottom = windowOffsetTop + o.stickySidebar.outerHeight()
                                    } else {
                                        windowOffsetBottom = $(window).height() - o.marginBottom - o.paddingBottom - options.additionalMarginBottom
                                    }
                                    var staticLimitTop = containerTop - scrollTop + o.paddingTop;
                                    var staticLimitBottom = containerBottom - scrollTop - o.paddingBottom - o.marginBottom;
                                    var top = o.stickySidebar.offset().top - scrollTop;
                                    var scrollTopDiff = o.previousScrollTop - scrollTop;
                                    if (o.stickySidebar.css('position') == 'fixed') {
                                        if (o.options.sidebarBehavior == 'modern') {
                                            top += scrollTopDiff
                                        }
                                    }
                                    if (o.options.sidebarBehavior == 'stick-to-top') {
                                        top = options.additionalMarginTop
                                    }
                                    if (o.options.sidebarBehavior == 'stick-to-bottom') {
                                        top = windowOffsetBottom - o.stickySidebar.outerHeight()
                                    }
                                    if (scrollTopDiff > 0) {
                                        top = Math.min(top, windowOffsetTop)
                                    } else {
                                        top = Math.max(top, windowOffsetBottom - o.stickySidebar.outerHeight())
                                    }
                                    top = Math.max(top, staticLimitTop);
                                    top = Math.min(top, staticLimitBottom - o.stickySidebar.outerHeight());
                                    var sidebarSameHeightAsContainer = o.container.height() == o.stickySidebar.outerHeight();
                                    if (!sidebarSameHeightAsContainer && top == windowOffsetTop) {
                                        position = 'fixed'
                                    } else if (!sidebarSameHeightAsContainer && top == windowOffsetBottom - o.stickySidebar.outerHeight()) {
                                        position = 'fixed'
                                    } else if (scrollTop + top - o.sidebar.offset().top - o.paddingTop <= options.additionalMarginTop) {
                                        position = 'static'
                                    } else {
                                        position = 'absolute'
                                    }
                                }
                                if (position == 'fixed') {
                                    var scrollLeft = $(document).scrollLeft();
                                    o.stickySidebar.css({
                                        'position': 'fixed',
                                        'width': getWidthForObject(o.stickySidebar) + 'px',
                                        'transform': 'translateY(' + top + 'px)',
                                        'left': (o.sidebar.offset().left + parseInt(o.sidebar.css('padding-left')) - scrollLeft) + 'px',
                                        'top': '0px'
                                    })
                                } else if (position == 'absolute') {
                                    var css = {};
                                    if (o.stickySidebar.css('position') != 'absolute') {
                                        css.position = 'absolute';
                                        css.transform = 'translateY(' + (scrollTop + top - o.sidebar.offset().top - o.stickySidebarPaddingTop - o.stickySidebarPaddingBottom) + 'px)';
                                        css.top = '0px'
                                    }
                                    css.width = getWidthForObject(o.stickySidebar) + 'px';
                                    css.left = '';
                                    o.stickySidebar.css(css)
                                } else if (position == 'static') {
                                    resetSidebar()
                                }
                                if (position != 'static') {
                                    if (o.options.updateSidebarHeight == true) {
                                        o.sidebar.css({
                                            'min-height': o.stickySidebar.outerHeight() + o.stickySidebar.offset().top - o.sidebar.offset().top + o.paddingBottom
                                        })
                                    }
                                }
                                o.previousScrollTop = scrollTop
                            };
                            o.onScroll(o);
                            $(document).on('scroll.' + o.options.namespace, function (o) {
                                return function () {
                                    o.onScroll(o)
                                }
                            }(o));
                            $(window).on('resize.' + o.options.namespace, function (o) {
                                return function () {
                                    o.stickySidebar.css({
                                        'position': 'static'
                                    });
                                    o.onScroll(o)
                                }
                            }(o));
                            if (typeof ResizeSensor !== 'undefined') {
                                new ResizeSensor(o.stickySidebar[0], function (o) {
                                    return function () {
                                        o.onScroll(o)
                                    }
                                }(o))
                            }

                            function resetSidebar() {
                                o.fixedScrollTop = 0;
                                o.sidebar.css({
                                    'min-height': '1px'
                                });
                                o.stickySidebar.css({
                                    'position': 'static',
                                    'width': '',
                                    'transform': 'none'
                                })
                            }

                            function getClearedHeight(e) {
                                var height = e.height();
                                e.children().each(function () {
                                    height = Math.max(height, $(this).height())
                                });
                                return height
                            }
                        })
                    }

                    function getWidthForObject(object) {
                        var width;
                        try {
                            width = object[0].getBoundingClientRect().width
                        } catch (err) {}
                        if (typeof width === "undefined") {
                            width = object.width()
                        }
                        return width
                    }
                    return this
                }
            })(jQuery);
        }); ! function (a) {
            a.fn.menuBouaici = function () {
                return this.each(function () {
                    var $t = a(this),
                        b = $t.find('.LinkList ul > li').children('a'),
                        c = b.length;
                    for (var i = 0; i < c; i++) {
                        var d = b.eq(i),
                            h = d.text();
                        if (h.charAt(0) !== '_') {
                            var e = b.eq(i + 1),
                                j = e.text();
                            if (j.charAt(0) === '_') {
                                var m = d.parent();
                                m.append('<ul class="sub-menu m-sub"/>');
                            }
                        }
                        if (h.charAt(0) === '_') {
                            d.text(h.replace('_', ''));
                            d.parent().appendTo(m.children('.sub-menu'));
                        }
                    }
                    for (var i = 0; i < c; i++) {
                        var f = b.eq(i),
                            k = f.text();
                        if (k.charAt(0) !== '_') {
                            var g = b.eq(i + 1),
                                l = g.text();
                            if (l.charAt(0) === '_') {
                                var n = f.parent();
                                n.append('<ul class="sub-menu2 m-sub"/>');
                            }
                        }
                        if (k.charAt(0) === '_') {
                            f.text(k.replace('_', ''));
                            f.parent().appendTo(n.children('.sub-menu2'));
                        }
                    }
                    $t.find('.LinkList ul li ul').parent('li').addClass('has-sub');
                });
            }
        }(jQuery); ! function (a) {
            a.fn.tabBouaici = function (b) {
                b = jQuery.extend({
                    onHover: false,
                    animated: true,
                    transition: 'fadeInUp'
                }, b);
                return this.each(function () {
                    var e = a(this),
                        c = e.children('[tab-Bouaici]'),
                        d = 0,
                        n = 'tab-animated',
                        k = 'tab-active';
                    if (b.onHover == true) {
                        var event = 'mouseenter'
                    } else {
                        var event = 'click'
                    }
                    e.prepend('<ul class="select-tab"></ul>');
                    c.each(function () {
                        if (b.animated == true) {
                            a(this).addClass(n)
                        }
                        e.find('.select-tab').append('<li><a href="javascript:;">' + a(this).attr('tab-Bouaici') + '</a></li>')
                    }).eq(d).addClass(k).addClass('tab-' + b.transition);
                    e.find('.select-tab a').on(event, function () {
                        var f = a(this).parent().index();
                        a(this).closest('.select-tab').find('.active').removeClass('active');
                        a(this).parent().addClass('active');
                        c.removeClass(k).removeClass('tab-' + b.transition).eq(f).addClass(k).addClass('tab-' + b.transition);
                        return false
                    }).eq(d).parent().addClass('active')
                })
            }
        }(jQuery); ! function (a) {
            a.fn.lazyBouaici = function () {
                return this.each(function () {
                    var t = a(this),
                        dImg = t.attr('data-image'),
                        iWid = Math.round(t.width()),
                        iHei = Math.round(t.height()),
                        iSiz = '/w' + iWid + '-h' + iHei + '-p-k-no-nu',
                        img = '';
                    if (dImg.match('s72-c')) {
                        img = dImg.replace('/s72-c', iSiz);
                    } else if (dImg.match('w72-h')) {
                        img = dImg.replace('/w72-h72-p-k-no-nu', iSiz);
                    } else {
                        img = dImg;
                    }
                    a(window).on('load resize scroll', lazyOnScroll);

                    function lazyOnScroll() {
                        var wHeight = a(window).height(),
                            scrTop = a(window).scrollTop(),
                            offTop = t.offset().top;
                        if (scrTop + wHeight > offTop) {
                            var n = new Image();
                            n.onload = function () {
                                t.attr('style', 'background-image:url(' + this.src + ')').addClass('lazyBouaici');
                            }, n.src = img;
                        }
                    }
                    lazyOnScroll();
                });
            }
        }(jQuery);
        (function ($) {
            $.fn.replaceText = function (b, a, c) {
                return this.each(function () {
                    var f = this.firstChild,
                        g, e, d = [];
                    if (f) {
                        do {
                            if (f.nodeType === 3) {
                                g = f.nodeValue;
                                e = g.replace(b, a);
                                if (e !== g) {
                                    if (!c && /</.test(e)) {
                                        $(f).before(e);
                                        d.push(f)
                                    } else {
                                        f.nodeValue = e
                                    }
                                }
                            }
                        } while (f = f.nextSibling)
                    }
                    d.length && $(d).remove()
                })
            }
        })(jQuery); $('#Bouaici-main-menu').menuBouaici(); $('#Bouaici-main-menu .widget').addClass('show-menu'); $('.search-toggle').on('click', function () {
            $('body').toggleClass('search-active')
        }); $('.blog-posts-title a.more,.related-title a.more').each(function () {
            var $t = $(this),
                $smt = viewAllText;
            if ($smt != '') {
                $t.text($smt)
            }
        }); $('#sidebar-tabs').tabBouaici(); $('.post-body strike').each(function () {
            var $t = $(this),
                $mtc = $t.text().trim();
            if ($mtc == '$ads={1}') {
                $t.replaceWith('<div id="Bouaici-new-before-E3lan"/>')
            }
            if ($mtc == '$ads={2}') {
                $t.replaceWith('<div id="Bouaici-new-after-E3lan"/>')
            }
        }); $('#Bouaici-new-before-E3lan').each(function () {
            var $t = $(this);
            if ($t.length) {
                $('#before-E3lan').appendTo($t)
            }
        }); $('#Bouaici-new-after-E3lan').each(function () {
            var $t = $(this);
            if ($t.length) {
                $('#after-E3lan').appendTo($t)
            }
        }); $('#HTML200').each(function () {
            var $t = $(this);
            if ($t.length) {
                $t.appendTo($('#before-E3lan'))
            }
        }); $('#HTML300').each(function () {
            var $t = $(this);
            if ($t.length) {
                $t.appendTo($('#after-E3lan'))
            }
        }); $('.avatar-image-container img').attr('src', function ($this, i) {
            i = i.replace('//resources.blogblog.com/img/blank.gif', '//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s35-r/avatar.jpg');
            i = i.replace('//img1.blogblog.com/img/blank.gif', '//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s35-r/avatar.jpg');
            return i
        }); $('.post-body a').each(function () {
            var $this = $(this),
                type = $this.text().trim(),
                sp = type.split('/'),
                txt = sp[0],
                ico = sp[1],
                color = sp.pop();
            if (type.match('button')) {
                $this.addClass('button').text(txt);
                if (ico != 'button') {
                    $this.addClass(ico)
                }
                if (color != 'button') {
                    $this.addClass('colored-button').css({
                        'background-color': color
                    })
                }
            }
        }); $('.post-body strike').each(function () {
            var $this = $(this),
                type = $this.text().trim(),
                html = $this.html();
            if (type.match('contact-form')) {
                $this.replaceWith('<div class="contact-form"/>');
                $('.contact-form').append($('#ContactForm1'))
            }
            if (type.match('alert-success')) {
                $this.replaceWith('<div class="alert-message alert-success short-b">' + html + '</div>')
            }
            if (type.match('alert-info')) {
                $this.replaceWith('<div class="alert-message alert-info short-b">' + html + '</div>')
            }
            if (type.match('alert-warning')) {
                $this.replaceWith('<div class="alert-message alert-warning short-b">' + html + '</div>')
            }
            if (type.match('alert-error')) {
                $this.replaceWith('<div class="alert-message alert-error short-b">' + html + '</div>')
            }
            if (type.match('left-sidebar')) {
                $this.replaceWith('<style>.item #main-wrapper{float:right}.item #sidebar-wrapper{float:left}</style>')
            }
            if (type.match('right-sidebar')) {
                $this.replaceWith('<style>.item #main-wrapper{float:left}.item #sidebar-wrapper{float:right}</style>')
            }
            if (type.match('full-width')) {
                $this.replaceWith('<style>.item #main-wrapper{width:100%}.item #sidebar-wrapper{display:none}</style>')
            }
            if (type.match('code-box')) {
                $this.replaceWith('<pre class="code-box short-b">' + html + '</pre>')
            }
            var $sb = $('.post-body .short-b').find('b');
            $sb.each(function () {
                var $b = $(this),
                    $t = $b.text().trim();
                if ($t.match('alert-success') || $t.match('alert-info') || $t.match('alert-warning') || $t.match('alert-error') || $t.match('code-box')) {
                    $b.replaceWith("")
                }
            })
        }); $('.Bouaici-share-links .window-Bouaici,.entry-share .window-Bouaici').on('click', function () {
            var $this = $(this),
                url = $this.data('url'),
                wid = $this.data('width'),
                hei = $this.data('height'),
                wsw = window.screen.width,
                wsh = window.screen.height,
                mrl = Math.round(wsw / 2 - wid / 2),
                mrt = Math.round(wsh / 2 - hei / 2),
                win = window.open(url, '_blank', 'scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=' + wid + ',height=' + hei + ',left=' + mrl + ',top=' + mrt);
            win.focus()
        }); $('.Bouaici-share-links').each(function () {
            var $t = $(this),
                $b = $t.find('.show-hid a');
            $b.on('click', function () {
                $t.toggleClass('show-hidden')
            })
        }); $('.about-author .author-description span a').each(function () {
            var $this = $(this),
                cls = $this.text().trim(),
                url = $this.attr('href');
            $this.replaceWith('<li class="' + cls + '"><a href="' + url + '" title="' + cls + '" target="_blank"/></li>');
            $('.description-links').append($('.author-description span li'));
            $('.description-links').addClass('show')
        });

        function msgError() {
            return '<span class="no-posts">' + no_post + '</span>'
        }

        function beforeLoader() {
            return '<div class="loader"/>'
        }

        function getFeedUrl(type, num, label) {
            var furl = '';
            switch (label) {
            case 'recent':
                furl = '/feeds/posts/summary?alt=json&max-results=' + num;
                break;
            case 'comments':
                if (type == 'list') {
                    furl = '/feeds/comments/summary?alt=json&max-results=' + num
                } else {
                    furl = '/feeds/posts/summary/-/' + label + '?alt=json&max-results=' + num
                }
                break;
            default:
                furl = '/feeds/posts/summary/-/' + label + '?alt=json&max-results=' + num;
                break
            }
            return furl
        }

        function getPostLink(feed, i) {
            for (var x = 0; x < feed[i].link.length; x++)
                if (feed[i].link[x].rel == 'alternate') {
                    var link = feed[i].link[x].href;
                    break
                } return link
        }

        function getPostTitle(feed, i) {
            var n = feed[i].title.$t;
            return n
        }

        function getPostImage(feed, i) {
            if ('media$thumbnail' in feed[i]) {
                var src = feed[i].media$thumbnail.url.replace(/s72|w640-h408/gi, "w366-h280-c").replace("default", "hqdefault");
                if (src.match('img.youtube.com')) {
                    src = src.replace('/default.', '/0.')
                }
                var img = src
            } else {
                img = '' + DefaultPostImage + ''
            }
            return img
        }

        function getPostAuthor(feed, i) {
            var n = feed[i].author[0].name.$t,
                b = messages.postAuthorLabel,
                e = '';
            if (b != '') {
                e = '<span class="by">' + b + '</span>'
            } else {
                e = ''
            }
            if (messages.postAuthor == 'true') {
                var code = '<span class="entry-author"><span class="author">' + n + '</span></span>'
            } else {
                var code = ''
            }
            return code
        }

        function getPostDate(feed, i) {
            var c = feed[i].published.$t,
                d = c.substring(0, 4),
                f = c.substring(5, 7),
                m = c.substring(8, 10),
                h = monthFormat[parseInt(f, 10) - 1] + ' ' + m + ', ' + d;
            if (messages.postDate == 'true') {
                var code = '<span class="entry-time"><time class="published" datetime="' + c + '">' + h + '</time></span>'
            } else {
                code = ''
            }
            return code
        }

        function getPostMeta(author, date) {
            if (messages.postAuthor == 'true' && messages.postDate == 'true') {
                var long = '<div class="entry-meta m-1">' + author + date + '</div>'
            } else if (messages.postAuthor == 'true') {
                long = '<div class="entry-meta m-2">' + author + '</div>'
            } else if (messages.postDate == 'true') {
                long = '<div class="entry-meta m-2">' + date + '</div>'
            } else {
                long = ''
            }
            if (messages.postDate == 'true') {
                var small = '<div class="entry-meta m-2">' + date + '</div>'
            } else {
                small = ''
            }
            var code = [long, small];
            return code
        }

        function getPostLabel(feed, i) {
            if (feed[i].category != undefined) {
                var tag = feed[i].category[0].term,
                    code = '<span class="entry-category">' + tag + '</span>'
            } else {
                code = ''
            }
            return code
        }

        function getPostComments(feed, i, link) {
            var n = feed[i].author[0].name.$t,
                e = feed[i].author[0].gd$image.src.replace('/s113', '/w55-h55-p-k-no-nu'),
                h = feed[i].title.$t;
            if (e.match('//img1.blogblog.com/img/blank.gif') || e.match('//img1.blogblog.com/img/b16-rounded.gif')) {
                var img = '//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/w55-h55-p-k-no-nu/avatar.jpg'
            } else {
                var img = e
            }
            var code = '<article class="custom-item item-' + i + '"><a class="entry-image-link cmm-avatar" href="' + link + '"><span class="entry-thumb" data-image="' + img + '"/></a><h3 class="entry-title"><a href="' + link + '">' + n + '</a></h3><p class="cmm-snippet excerpt">' + h + '</p></article>';
            return code
        }

        function getCustomStyle(type, label, color, lClass) {
            lClass = label.replace(' ', '-');
            if (color != false) {
                if (type == 'featured') {
                    var code = '.id-' + type + '-' + lClass + ' .entry-category{background-color:' + color + ';color:#fff}.id-' + type + '-' + lClass + ' .loader:after{border-color:' + color + ';border-right-color:rgba(155,155,155,0.2)}'
                } else {
                    code = '.id-' + type + '-' + lClass + ' .entry-category{background-color:' + color + ';color:#fff}.id-' + type + '-' + lClass + ' .title-wrap > h3,.id-' + type + '-' + lClass + ' .title-wrap > a.more:hover,.id-' + type + '-' + lClass + ' .entry-header:not(.entry-info) .entry-title a:hover,.id-' + type + '-' + lClass + ' .entry-header:not(.entry-info) .entry-meta span.author{color:' + color + '}.id-' + type + '-' + lClass + ' .loader:after{border-color:' + color + ';border-right-color:rgba(155,155,155,0.2)}'
                }
            } else {
                code = ''
            }
            return code
        }

        function getAjax($this, type, num, label, color) {
            switch (type) {
            case 'msimple':
            case 'megatabs':
            case 'featured1':
            case 'featured2':
            case 'featured3':
            case 'block1':
            case 'col-left':
            case 'col-right':
            case 'grid1':
            case 'grid2':
            case 'videos':
            case 'gallery':
            case 'list':
            case 'related':
                if (label == false) {
                    label = 'geterror404'
                }
                var furl = getFeedUrl(type, num, label);
                $.ajax({
                    url: furl,
                    type: 'GET',
                    dataType: 'json',
                    cache: true,
                    beforeSend: function (data) {
                        var style = getCustomStyle(type, label, color),
                            lClass = label.replace(' ', '-');
                        switch (type) {
                        case 'featured1':
                        case 'featured2':
                        case 'featured3':
                            $('#page-skin-2').prepend(style);
                            $this.html(beforeLoader()).parent().addClass('type-' + type + ' id-' + type + '-' + lClass + ' show-Bouaici lazyBouaici');
                            break;
                        case 'block1':
                        case 'grid1':
                        case 'grid2':
                        case 'videos':
                        case 'gallery':
                            $('#page-skin-2').prepend(style);
                            $this.html(beforeLoader()).parent().addClass('type-' + type + ' id-' + type + '-' + lClass + ' show-Bouaici lazyBouaici');
                            break;
                        case 'col-left':
                        case 'col-right':
                            $('#page-skin-2').prepend(style);
                            $this.html(beforeLoader()).parent().addClass('type-' + type + ' block-column id-' + type + '-' + lClass + ' show-Bouaici lazyBouaici');
                            break;
                        case 'list':
                            $this.html(beforeLoader());
                            break;
                        case 'related':
                            $this.html(beforeLoader()).parent().addClass('show-Bouaici lazyBouaici');
                            break
                        }
                    },
                    success: function (data) {
                        var html = '';
                        switch (type) {
                        case 'msimple':
                        case 'megatabs':
                            html = '<ul class="mega-widget">';
                            break;
                        case 'featured1':
                        case 'featured2':
                        case 'featured3':
                            html = '<div class="featured-posts ' + type + '">';
                            break;
                        case 'block1':
                            html = '<div class="content-block-1">';
                            break;
                        case 'col-left':
                        case 'col-right':
                            html = '<div class="column-block">';
                            break;
                        case 'grid1':
                            html = '<div class="grid-block-1 total-' + num + '">';
                            break;
                        case 'grid2':
                            html = '<div class="grid-block-2">';
                            break;
                        case 'videos':
                            html = '<div class="videos-block total-' + num + '">';
                            break;
                        case 'gallery':
                            html = '<div class="gallery-block total-' + num + '">';
                            break;
                        case 'list':
                            html = '<div class="custom-widget">';
                            break;
                        case 'related':
                            html = '<div class="related-posts total-' + num + '">';
                            break
                        }
                        var entry = data.feed.entry;
                        if (entry != undefined) {
                            for (var i = 0, feed = entry; i < feed.length; i++) {
                                var link = getPostLink(feed, i),
                                    title = getPostTitle(feed, i, link),
                                    image = getPostImage(feed, i, link),
                                    author = getPostAuthor(feed, i),
                                    date = getPostDate(feed, i),
                                    meta = getPostMeta(author, date),
                                    tag = getPostLabel(feed, i);
                                var content = '';
                                switch (type) {
                                case 'msimple':
                                case 'megatabs':
                                    content += '<article class="mega-item"><div class="mega-content"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                                    break;
                                case 'featured1':
                                case 'featured2':
                                case 'featured3':
                                    switch (i) {
                                    case 0:
                                        content += '<article class="featured-item item-' + i + '"><div class="featured-item-inner"><a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a>' + tag + '<div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></div></article><div class="featured-scroll">';
                                        break;
                                    default:
                                        content += '<article class="featured-item item-' + i + '"><div class="featured-item-inner"><a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a>' + tag + '<div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></div></article>';
                                        break
                                    }
                                    break;
                                case 'block1':
                                    switch (i) {
                                    case 0:
                                        content += '<article class="block-item item-' + i + '"><div class="block-inner">' + tag + '<a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></div></article>';
                                        break;
                                    default:
                                        content += '<article class="block-item item-' + i + '"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                                        break
                                    }
                                    break;
                                case 'col-left':
                                case 'col-right':
                                    switch (i) {
                                    case 0:
                                        content += '<article class="column-item item-' + i + '"><div class="column-inner">' + tag + '<a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></div></article>';
                                        break;
                                    default:
                                        content += '<article class="column-item item-' + i + '"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                                        break
                                    }
                                    break;
                                case 'grid1':
                                    content += '<article class="grid-item item-' + i + '"><div class="entry-image"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a></div><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                                    break;
                                case 'grid2':
                                    content += '<article class="grid-item item-' + i + '"><div class="entry-image">' + tag + '<a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a></div><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></article>';
                                    break;
                                case 'videos':
                                    switch (i) {
                                    case 0:
                                        content += '<article class="videos-item item-' + i + '"><div class="videos-inner">' + tag + '<a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/><span class="video-icon"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></div></article>';
                                        break;
                                    default:
                                        content += '<article class="videos-item item-' + i + '"><div class="videos-inner"><a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/><span class="video-icon"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2></div></div></article>';
                                        break
                                    }
                                    break;
                                case 'gallery':
                                    switch (i) {
                                    case 0:
                                        content += '<article class="gallery-item item-' + i + '"><div class="gallery-inner">' + tag + '<a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/><span class="gallery-icon"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></div></article>';
                                        break;
                                    default:
                                        content += '<article class="gallery-item item-' + i + '"><div class="gallery-inner"><a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/><span class="gallery-icon"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2></div></div></article>';
                                        break
                                    }
                                    break;
                                case 'list':
                                    switch (label) {
                                    case 'comments':
                                        var code = getPostComments(feed, i, link);
                                        content += code;
                                        break;
                                    default:
                                        content += '<article class="custom-item item-' + i + '"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header"><h3 class="entry-title"><a href="' + link + '">' + title + '</a></h3>' + meta[1] + '</div></article>';
                                        break
                                    }
                                    break;
                                case 'related':
                                    content += '<article class="related-item post item-' + i + '"><div class="entry-image"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a></div><div class="entry-header"><h3 class="entry-title"><a href="' + link + '">' + title + '</a></h3>' + meta[1] + '</div></article>';
                                    break
                                }
                                html += content
                            }
                        } else {
                            switch (type) {
                            case 'msimple':
                            case 'megatabs':
                                html = '<ul class="mega-widget">' + msgError() + '</ul>';
                                break;
                            default:
                                html = msgError();
                                break
                            }
                        }
                        switch (type) {
                        case 'msimple':
                            html += '</ul>';
                            $this.append(html).addClass('msimple');
                            $this.find('a:first').attr('href', function ($this, href) {
                                switch (label) {
                                case 'recent':
                                    href = href.replace(href, '/search');
                                    break;
                                default:
                                    href = href.replace(href, '/search/label/' + label);
                                    break
                                }
                                return href
                            });
                            break;
                        case 'featured1':
                        case 'featured2':
                        case 'featured3':
                            html += '</div></div>';
                            $this.html(html);
                            break;
                        case 'block1':
                        case 'grid1':
                        case 'grid2':
                        case 'col-left':
                        case 'col-right':
                        case 'videos':
                        case 'gallery':
                            html += '</div>';
                            $this.html(html);
                            break;
                        default:
                            html += '</div>';
                            $this.html(html);
                            break
                        }
                        $this.find('span.entry-thumb').lazyBouaici()
                    },
                    error: function () {
                        switch (type) {
                        case 'msimple':
                        case 'megatabs':
                            $this.append('<ul>' + msgError() + '</ul>');
                            break;
                        default:
                            $this.html(msgError());
                            break
                        }
                    }
                })
            }
        }

        function ajaxMega($this, type, num, label, mtc) {
            if (mtc.match('getmega')) {
                if (type == 'msimple' || type == 'megatabs' || type == 'mtabs') {
                    return getAjax($this, type, num, label)
                } else {
                    $this.append('<ul class="mega-widget">' + msgError() + '</ul>')
                }
            }
        }

        function ajaxFeatured($this, type, num, label, mtc, color) {
            if (mtc.match('getfeatured')) {
                if (type == 'featured1' || type == 'featured2' || type == 'featured3') {
                    return getAjax($this, type, num, label, color)
                } else {
                    $this.html(beforeLoader()).parent().addClass('show-Bouaici lazyBouaici');
                    setTimeout(function () {
                        $this.html(msgError())
                    }, 500)
                }
            }
        }

        function ajaxBlock($this, type, num, label, mtc, color) {
            if (mtc.match('getblock')) {
                if (type == 'block1' || type == 'col-left' || type == 'col-right' || type == 'grid1' || type == 'grid2' || type == 'videos' || type == 'gallery') {
                    var moreText = viewAllText,
                        text = '';
                    if (moreText != '') {
                        text = moreText
                    } else {
                        text = messages.viewAll
                    }
                    $this.parent().find('.widget-title').append('<a class="more" href="/search/label/' + label + '">' + text + '</a>');
                    return getAjax($this, type, num, label, color)
                } else {
                    $this.html(msgError()).parent().addClass('show-Bouaici lazyBouaici')
                }
            }
        }

        function ajaxWidget($this, type, num, label, mtc) {
            if (mtc.match('getwidget')) {
                if (type == 'list') {
                    return getAjax($this, type, num, label)
                } else {
                    $this.html(msgError())
                }
            }
        }

        function ajaxRelated($this, type, num, label, mtc) {
            if (mtc.match('getrelated')) {
                return getAjax($this, type, num, label)
            }
        }

        function shortCodeBouaici(a, b, c) {
            var d = a.split('$'),
                e = /[^{\}]+(?=})/g;
            for (var i = 0; i < d.length; i++) {
                var f = d[i].split('=');
                if (f[0].trim() == b) {
                    c = f[1];
                    if (c.match(e) != null) {
                        return String(c.match(e)).trim()
                    } else {
                        return false
                    }
                }
            }
            return false
        }

        function megaTabs($this, type, label, mtc) {
            if (type == 'mtabs') {
                if (label != undefined) {
                    var lLen = label.length,
                        code = '<ul class="complex-tabs">';
                    for (var i = 0; i < lLen; i++) {
                        var tag = label[i];
                        if (tag) {
                            code += '<div class="mega-tab" tab-Bouaici="' + tag + '"/>'
                        }
                    }
                    code += '</ul>';
                    $this.addClass('mega-tabs mtabs').append(code);
                    $this.find('> a:first').attr('href', 'javascript:;');
                    $('.mega-tab').each(function () {
                        var $this = $(this),
                            label = $this.attr('tab-Bouaici');
                        ajaxMega($this, 'megatabs', 4, label, mtc)
                    });
                    $this.find('ul.complex-tabs').tabBouaici({
                        onHover: true
                    })
                } else {
                    $this.append('<ul class="mega-widget">' + msgError() + '</ul>')
                }
            }
        }
        $('#Bouaici-main-menu li').each(function (type, label) {
            var lc = $(this),
                $this = lc,
                ltx = lc.find('a'),
                txt = ltx.attr('href').trim(),
                mtc = txt.toLowerCase();
            type = shortCodeBouaici(txt, 'type');
            label = shortCodeBouaici(txt, 'label');
            if (mtc.match('getmega')) {
                $this.addClass('has-sub mega-menu')
            }
            ajaxMega($this, type, 5, label, mtc);
            if (type == 'mtabs') {
                if (label != undefined) {
                    label = label.split('/');
                }
                megaTabs($this, type, label, mtc)
            }
        }); $('#featured .HTML .widget-content').each(function (type, num, label, color) {
            var $this = $(this),
                txt = $this.text().trim(),
                mtc = txt.toLowerCase();
            type = shortCodeBouaici(txt, 'type');
            label = shortCodeBouaici(txt, 'label');
            color = shortCodeBouaici(txt, 'color');
            switch (type) {
            case 'featured2':
                num = 4;
                break;
            case 'featured3':
                num = 5;
                break;
            default:
                num = 3;
                break
            }
            ajaxFeatured($this, type, num, label, mtc, color)
        }); $('.Bouaici-content-blocks .HTML .widget-content').each(function (type, num, label, color) {
            var $this = $(this),
                txt = $this.text().trim(),
                mtc = txt.toLowerCase();
            type = shortCodeBouaici(txt, 'type');
            num = shortCodeBouaici(txt, 'results');
            label = shortCodeBouaici(txt, 'label');
            color = shortCodeBouaici(txt, 'color');
            ajaxBlock($this, type, num, label, mtc, color)
        }); $('.Bouaici-widget-ready .HTML .widget-content').each(function (type, num, label) {
            var $this = $(this),
                txt = $this.text().trim(),
                mtc = txt.toLowerCase();
            type = shortCodeBouaici(txt, 'type');
            num = shortCodeBouaici(txt, 'results');
            label = shortCodeBouaici(txt, 'label');
            ajaxWidget($this, type, num, label, mtc)
        }); $('.Bouaici-related-content').each(function () {
            var $this = $(this),
                label = $this.find('.related-tag').attr('data-label'),
                num = relatedPostsNum;
            ajaxRelated($this, 'related', num, label, 'getrelated')
        }); $(function () {
            $('.index-post .entry-image-link .entry-thumb, .PopularPosts .entry-image-link .entry-thumb, .FeaturedPost .entry-image-link .entry-thumb,.about-author .author-avatar').lazyBouaici();
            $('.mobile-logo').each(function () {
                var $t = $(this),
                    $l = $('#main-logo .header-widget a').clone();
                $l.find('#h1-tag').remove();
                $l.appendTo($t)
            });
            $('#Bouaici-mobile-menu').each(function () {
                var $t = $(this),
                    $m = $('#Bouaici-main-menu-nav').clone();
                $m.attr('id', 'main-mobile-nav');
                $m.find('.mega-widget, .mega-tab').remove();
                $m.find('li.mega-tabs .complex-tabs').each(function () {
                    var $eq = $(this);
                    $eq.replaceWith($eq.find('> ul.select-tab').attr('class', 'sub-menu m-sub'))
                });
                $m.find('.mega-menu:not(.mega-tabs) > a').each(function ($l, $u) {
                    var $a = $(this),
                        $h = $a.attr('href').trim(),
                        $m = $h.toLowerCase();
                    if ($m.match('getmega')) {
                        $l = shortCodeBouaici($h, 'label');
                        $l == 'recent' ? $u = '/search' : $u = '/search/label/' + $l;
                        $a.attr('href', $u)
                    }
                });
                $m.find('.mega-tabs ul li > a').each(function () {
                    var $a = $(this),
                        $l = $a.text().trim();
                    $a.attr('href', '/search/label/' + $l)
                });
                $m.appendTo($t);
                $('.show-Bouaici-mobile-menu, .hide-Bouaici-mobile-menu, .overlay').on('click', function () {
                    $('body').toggleClass('nav-active')
                });
                $('.Bouaici-mobile-menu .has-sub').append('<div class="submenu-toggle"/>');
                $('.Bouaici-mobile-menu .mega-menu').find('.submenu-toggle').remove();
                $('.Bouaici-mobile-menu .mega-tabs').append('<div class="submenu-toggle"/>');
                $('.Bouaici-mobile-menu ul li .submenu-toggle').on('click', function ($this) {
                    if ($(this).parent().hasClass('has-sub')) {
                        $this.preventDefault();
                        if (!$(this).parent().hasClass('show')) {
                            $(this).parent().addClass('show').children('.m-sub').slideToggle(170)
                        } else {
                            $(this).parent().removeClass('show').find('> .m-sub').slideToggle(170)
                        }
                    }
                })
            });
            $('.social-mobile').each(function () {
                var $t = $(this),
                    $l = $('#main-navbar-social ul.social').clone();
                $l.appendTo($t)
            });
            $('#Bouaici-header-wrapper .BouaiciHeader').each(function () {
                var $this = $(this);
                if (fixedMenu == true) {
                    if ($this.length > 0) {
                        var t = $(document).scrollTop(),
                            w = $this.offset().top,
                            s = $this.height(),
                            h = (w + s);
                        $(window).scroll(function () {
                            var n = $(document).scrollTop(),
                                f = $('#footer-wrapper').offset().top,
                                m = (f - s);
                            if (n < m) {
                                if (n > h) {
                                    $this.addClass('is-fixed')
                                } else if (n <= 0) {
                                    $this.removeClass('is-fixed')
                                }
                                if (n > t) {
                                    $this.removeClass('show')
                                } else {
                                    $this.addClass('show')
                                }
                                t = $(document).scrollTop()
                            }
                        })
                    }
                }
            });
            $('#main-wrapper,#sidebar-wrapper').each(function () {
                if (fixedSidebar == true) {
                    if (fixedMenu == true) {
                        var $topMargin = 75
                    } else {
                        $topMargin = 25
                    }
                    $(this).theiaStickySidebar({
                        additionalMarginTop: $topMargin,
                        additionalMarginBottom: 25
                    })
                }
            });
            $('#post-body iframe').each(function () {
                var $t = $(this),
                    $mtc = $t.attr('src');
                if ($mtc.match('www.youtube.com')) {
                    $t.wrap('<div class="responsive-video-wrap"/>')
                }
            });
            $('p.comment-content').each(function () {
                var $t = $(this);
                $t.replaceText(/(https:\/\/\S+(\.png|\.jpeg|\.jpg|\.gif))/g, '<img src="$1"/>');
                $t.replaceText(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g, '<div class="responsive-video-wrap"><iframe id="youtube" width="100%" height="358" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>')
            });
            $('#Bouaici-load-more-link').each(function () {
                var $this = $(this),
                    $loadLink = $this.data('load');
                if ($loadLink) {
                    $('#Bouaici-load-more-link').show()
                }
                $('#Bouaici-load-more-link').on('click', function (a) {
                    $('#Bouaici-load-more-link').hide();
                    $.ajax({
                        url: $loadLink,
                        success: function (data) {
                            var $p = $(data).find('.blog-posts');
                            $p.find('.index-post').addClass('post-animated post-fadeInUp');
                            $('.blog-posts').append($p.html());
                            $loadLink = $(data).find('#Bouaici-load-more-link').data('load');
                            if ($loadLink) {
                                $('#Bouaici-load-more-link').show()
                            } else {
                                $('#Bouaici-load-more-link').hide();
                                $('#blog-pager .no-more').addClass('show')
                            }
                            $('.index-post .entry-image-link .entry-thumb').lazyBouaici()
                        },
                        beforeSend: function () {
                            $('#blog-pager .loading').css('display', 'flex')
                        },
                        complete: function () {
                            $('#blog-pager .loading').hide()
                        }
                    });
                    a.preventDefault()
                })
            });
            $('.back-top').each(function () {
                var $t = $(this);
                $(window).on('scroll', function () {
                    $(this).scrollTop() >= 100 ? $t.fadeIn(250) : $t.fadeOut(250);
                    $t.offset().top >= $('#footer-wrapper').offset().top - 32 ? $t.addClass('on-footer') : $t.removeClass('on-footer')
                }), $t.click(function () {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 500)
                })
            })
        });
		
		
		
		
		! function () {
            for (var a = /(\[img\])?((http:|https:)?\/\/\S*?\.(jpg|gif|png|bmp|jpeg]))(\[\/img\])?/gi, b = /(\[vid\])?http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌?[\w\?‌?=]*)?(\[\/vid\])?/gi, c = /(\[vid\])?(http:|https:)?\/\/(vimeo.com)\/([0-9]*)(\[\/vid\])?/gi, d = document.querySelectorAll(".comment-content"), e = 0; e < d.length; e++) {
                for (var f = d[e].getElementsByTagName("a"), g = 0; g < f.length; g++)
                    if (f[g].href.match(a) || f[g].href.match(b) || f[g].href.match(c)) {
                        var h = document.createElement("span");
                        h.innerHTML = f[g].href;
                        var i = f[g];
                        i.parentNode.insertBefore(h, i), f[g].href = "", f[g].innerHTML = ""
                    } var j = d[e].innerHTML;
                j = j.replace(a, '<img style="max-width: 100%; height: auto;display: blocK;margin: 10px auto;" src="$2"" alt=""/>'), j = j.replace(b, '<div style="position:relative;width:100%;height:0;padding-bottom:56.25%;overflow:hidden;margin:20px auto;"><iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" src="https://www.youtube.com/embed/$2" frameborder="0" allowfullscreen></iframe></div>'), j = j.replace(c, '<div style="position:relative;width:100%;height:0;padding-bottom:56.25%;overflow:hidden;margin:20px auto;"><iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" src="https://player.vimeo.com/video/$4" frameborder="0" allowfullscreen></iframe></div>'), d[e].innerHTML = j
            }
        }();
        var head, newLine, el, title, link, ToC = "<nav class='table-of-contents' role='navigation'><div><span>" + TocN + "</span><span class='toggled'/></div><ul>"; $(".post-body h3,.post-body h2").attr("id", function (arr) {
            return "point" + arr;
        }); $(".post-body h2").attr("class", function (arr) {
            return "point";
        }); $(".post-body h3,.post-body h2").each(function () {
            el = $(this), title = el.text(), cla = el.attr("class"), link = "#" + el.attr("id"), ToC += newLine = "<li class='" + cla + "'><a href='" + link + "'>" + title + "</a></li>"
        }), ToC += "</ul></nav>", $(".ma-pro").prepend(ToC); $('#plus').click(function () {
            $('#post-body').css({
                fontSize: "+=1px"
            });
        }); $('#minus').click(function () {
            $('#post-body').css({
                fontSize: "-=1px"
            });
        }); $('i[rel="pre"]').replaceWith(function () {
            return $('<pre><code>' + $(this).html() + '</code></pre>');
        });
        const navBar = document.querySelector(".navbar");
        const allLi = document.querySelectorAll(".navbar li"); allLi.forEach((li, index) => {
            li.addEventListener("click", e => {
                e.preventDefault();
                navBar.querySelector(".active").classList.remove("active");
                li.classList.add("active");
                const indicator = document.querySelector(".indicator");
                indicator.style.transform = `translateX(calc(${index * 65}px))`;
            });
        }); $(".posts-random").each(function () {
            var n = Math.floor(Math.random() * 5 + 1);
            var s = "/feeds/posts/default?alt=json-in-script&orderby=updated&start-index=" + n + "&max-results=4";
            $.ajax({
                url: s,
                type: "get",
                dataType: "jsonp",
                success: function (t) {
                    for (var e = "", a = "<strong>" + randomtext + "</strong><ul>", n = 0; n < t.feed.entry.length; n++) {
                        for (var s = 0; s < t.feed.entry[n].link.length; s++)
                            if ("alternate" == t.feed.entry[n].link[s].rel) {
                                e = t.feed.entry[n].link[s].href;
                                break;
                            } var c = t.feed.entry[n].title.$t,
                            l = " ";
                        try {
                            l = t.feed.entry[n].category[0].term;
                        } catch (a) {
                            l = "";
                        }
                        a += '<li><a href="' + e + '" title="' + c + '">' + c + "</a></li>";
                    }(a += "</ul>"), $(".posts-random").each(function () {
                        $(this).html(a);
                    });
                },
            });
        });
        (function (e) {
            function n(e, t) {
                var s = e.data("settings");
                if (typeof t === "undefined") t = false;
                if (t) {
                    i(e)
                }
                var o = r(e);
                e.animate(o.css, o.time, "linear", function () {
                    e.css(s.direction, "0");
                    n(e, true)
                })
            }

            function r(e) {
                var t = e.data("settings");
                var n = e.children().first();
                var r = Math.abs(-e.css(t.direction).replace("px", "").replace("auto", "0") - n.outerWidth(true));
                var t = e.data("settings");
                var i = r * 1e3 / t.speed;
                var s = {};
                s[t.direction] = e.css(t.direction).replace("px", "").replace("auto", "0") - r;
                return {
                    css: s,
                    time: i
                }
            }

            function i(e) {
                var t = e.data("settings");
                e.css("transition-duration", "0s").css(t.direction, "0");
                var n = e.children().first();
                if (n.hasClass("webticker-init")) n.remove();
                else e.children().last().after(n)
            }

            function s(e, t) {
                if (typeof t === "undefined") t = false;
                if (t) {
                    i(e)
                }
                var n = r(e);
                var s = n.time / 1e3;
                s += "s";
                e.css(n.css).css("transition-duration", s)
            }

            function o(t, n, r) {
                var i;
                e.get(t, function (t) {
                    var s = e(t);
                    s.find("item").each(function () {
                        var t = e(this),
                            n = {
                                title: t.find("title").text(),
                                link: t.find("link").text()
                            };
                        listItem = "<li><a href='" + n.link + "'>" + n.title + "</a></li>";
                        i += listItem
                    });
                    r.webTicker("update", i, n)
                })
            }

            function u(t) {
                var n = t.data("settings");
                t.width("auto");
                var r = 0;
                t.children("li").each(function () {
                    r += e(this).outerWidth(true)
                });
                if (r < t.parent().width() || t.children().length == 1) {
                    if (n.duplicate) {
                        itemWidth = Math.max.apply(Math, t.children().map(function () {
                            return e(this).width()
                        }).get());
                        while (r - itemWidth < t.parent().width() || t.children().length == 1) {
                            var i = t.children().clone();
                            t.append(i);
                            r = 0;
                            t.children("li").each(function () {
                                r += e(this).outerWidth(true)
                            });
                            itemWidth = Math.max.apply(Math, t.children().map(function () {
                                return e(this).width()
                            }).get())
                        }
                    } else {
                        var s = t.parent().width() - r;
                        s += t.find("li:first").width();
                        var o = t.find("li:first").height();
                        t.append('<li class="ticker-spacer" style="width:' + s + "px;height:" + o + 'px;"></li>')
                    }
                }
                if (n.startEmpty) {
                    var o = t.find("li:first").height();
                    t.prepend('<li class="webticker-init" style="width:' + t.parent().width() + "px;height:" + o + 'px;"></li>')
                }
                r = 0;
                t.children("li").each(function () {
                    r += e(this).outerWidth(true)
                });
                t.width(r + 200);
                widthCompare = 0;
                t.children("li").each(function () {
                    widthCompare += e(this).outerWidth(true)
                });
                while (widthCompare >= t.width()) {
                    t.width(t.width() + 200);
                    widthCompare = 0;
                    t.children("li").each(function () {
                        widthCompare += e(this).outerWidth(true)
                    })
                }
            }
            var t = function () {
                var e = document.createElement("p").style,
                    t = ["ms", "O", "Moz", "Webkit"];
                if (e["transition"] == "") return true;
                while (t.length)
                    if (t.pop() + "Transition" in e) return true;
                return false
            }();
            var a = {
                init: function (r) {
                    r = jQuery.extend({
                        speed: 50,
                        direction: ight,
                        moving: true,
                        startEmpty: true,
                        duplicate: false,
                        rssurl: false,
                        hoverpause: true,
                        rssfrequency: 0,
                        updatetype: "reset"
                    }, r);
                    return this.each(function () {
                        jQuery(this).data("settings", r);
                        var i = jQuery(this);
                        i.addClass("newsticker");
                        var a = i.wrap("<div class='mask'></div>");
                        var f = i.parent().wrap("<div class='tickercontainer'></div>");
                        u(i);
                        if (r.rssurl) {
                            o(r.rssurl, r.type, i);
                            if (r.rssfrequency > 0) {
                                window.setInterval(function () {
                                    o(r.rssurl, r.type, i)
                                }, r.rssfrequency * 1e3 * 60)
                            }
                        }
                        if (t) {
                            i.css("transition-duration", "0s").css(r.direction, "0");
                            s(i, false);
                            i.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function (t) {
                                if (!i.is(t.target)) {
                                    return false
                                }
                                s(e(this), true)
                            })
                        } else {
                            n(e(this))
                        }
                        if (r.hoverpause) {
                            i.hover(function () {
                                if (t) {
                                    var n = e(this).css(r.direction);
                                    e(this).css("transition-duration", "0s").css(r.direction, n)
                                } else jQuery(this).stop()
                            }, function () {
                                if (jQuery(this).data("settings").moving) {
                                    if (t) {
                                        s(e(this), false)
                                    } else {
                                        n(i)
                                    }
                                }
                            })
                        }
                    })
                },
                stop: function () {
                    var n = e(this).data("settings");
                    if (n.moving) {
                        n.moving = false;
                        return this.each(function () {
                            if (t) {
                                var r = e(this).css(n.direction);
                                e(this).css("transition-duration", "0s").css(n.direction, r)
                            } else e(this).stop()
                        })
                    }
                },
                cont: function () {
                    var r = e(this).data("settings");
                    if (!r.moving) {
                        r.moving = true;
                        return this.each(function () {
                            if (t) {
                                s(e(this), false)
                            } else {
                                n(e(this))
                            }
                        })
                    }
                },
                update: function (t, n, r, i) {
                    n = n || "reset";
                    if (typeof r === "undefined") r = true;
                    if (typeof i === "undefined") i = false;
                    if (typeof t === "string") {
                        t = e(t)
                    }
                    var s = e(this);
                    s.webTicker("stop");
                    var o = e(this).data("settings");
                    if (n == "reset") {
                        s.html(t);
                        s.css(o.direction, "0");
                        u(s)
                    } else if (n == "swap") {
                        s.children("li").addClass("old");
                        for (var a = 0; a < t.length; a++) {
                            id = e(t[a]).data("update");
                            match = s.find('[data-update="' + id + '"]');
                            if (match.length < 1) {
                                if (r) {
                                    if (s.find(".ticker-spacer:first-child").length == 0 && s.find(".ticker-spacer").length > 0) {
                                        s.children("li.ticker-spacer").before(t[a])
                                    } else {
                                        s.append(t[a])
                                    }
                                }
                            } else s.find('[data-update="' + id + '"]').replaceWith(t[a]);
                        }
                        s.children("li.webticker-init, li.ticker-spacer").removeClass("old");
                        if (i) s.children("li").remove(".old");
                        stripWidth = 0;
                        s.children("li").each(function () {
                            stripWidth += e(this).outerWidth(true)
                        });
                        s.width(stripWidth + 200)
                    }
                    s.webTicker("cont")
                }
            };
            e.fn.webTicker = function (t) {
                if (a[t]) {
                    return a[t].apply(this, Array.prototype.slice.call(arguments, 1))
                } else if (typeof t === "object" || !t) {
                    return a.init.apply(this, arguments)
                } else {
                    e.error("Method " + t + " does not exist on jQuery.webTicker")
                }
            }
        })(jQuery); jQuery.cookie = function (i, t, e) {
            if (arguments.length > 1 && "[object Object]" !== String(t)) {
                if (e = jQuery.extend({}, e), (null === t || void 0 === t) && (e.expires = -1), "number" == typeof e.expires) {
                    var o = e.expires,
                        n = e.expires = new Date;
                    n.setDate(n.getDate() + o)
                }
                return t = String(t), document.cookie = [encodeUBouaicimponent(i), "=", e.raw ? t : encodeUBouaicimponent(t), e.expires ? "; expires=" + e.expires.toUTCString() : "", e.path ? "; path=" + e.path : "", e.domain ? "; domain=" + e.domain : "", e.secure ? "; secure" : ""].join("")
            }
            e = t || {};
            var a, r = e.raw ? function (i) {
                return i
            } : decodeUBouaicimponent;
            return (a = new RegExp("(?:^|; )" + encodeUBouaicimponent(i) + "=([^;]*)").exec(document.cookie)) ? r(a[1]) : null
        };
        var mql = window.matchMedia("screen and (min-width: 60em)");
        if (mql.matches) {
            var mql = window.matchMedia("screen and (min-width: 60em)");
            mql.matches && $(function () {
                $(window).scroll(function () {
                    $(this).scrollTop() > 100 ? $(".backtotop").fadeIn() : $(".backtotop").fadeOut()
                }), $(".backtotop").click(function () {
                    return $("html,body").animate({
                        scrollTop: 0
                    }, 400), !1
                })
            })
        }
        var mql = window.matchMedia("screen and (min-width: 60em)"); mql.matches && (! function (i) {
            i.fn.theiaStickySidebar = function (t) {
                function e(t, e) {
                    return !0 === t.initialized || !(i("body").width() < t.minWidth) && (function (t, e) {
                        t.initialized = !0, 0 === i("#theia-sticky-sidebar-stylesheet-" + t.namespace).length && i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-' + t.namespace + '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')), e.each(function () {
                            function e() {
                                n.fixedScrollTop = 0, n.sidebar.css({
                                    "min-height": "1px"
                                }), n.stickySidebar.css({
                                    position: "static",
                                    width: "",
                                    transform: "none"
                                })
                            }
                            var n = {};
                            if (n.sidebar = i(this), n.options = t || {}, n.container = i(n.options.containerSelector), 0 == n.container.length && (n.container = n.sidebar.parent()), n.sidebar.parents().css("-webkit-transform", "none"), n.sidebar.css({
                                    position: n.options.defaultPosition,
                                    overflow: "visible",
                                    "-webkit-box-sizing": "border-box",
                                    "-moz-box-sizing": "border-box",
                                    "box-sizing": "border-box"
                                }), n.stickySidebar = n.sidebar.find(".theiaStickySidebar"), 0 == n.stickySidebar.length) {
                                var a = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                                n.sidebar.find("script").filter(function (i, t) {
                                    return 0 === t.type.length || t.type.match(a)
                                }).remove(), n.stickySidebar = i("<div>").addClass("theiaStickySidebar").append(n.sidebar.children()), n.sidebar.append(n.stickySidebar)
                            }
                            n.marginBottom = parseInt(n.sidebar.css("margin-bottom")), n.paddingTop = parseInt(n.sidebar.css("padding-top")), n.paddingBottom = parseInt(n.sidebar.css("padding-bottom"));
                            var r = n.stickySidebar.offset().top,
                                d = n.stickySidebar.outerHeight();
                            n.stickySidebar.css("padding-top", 1), n.stickySidebar.css("padding-bottom", 1), r -= n.stickySidebar.offset().top, d = n.stickySidebar.outerHeight() - d - r, 0 == r ? (n.stickySidebar.css("padding-top", 0), n.stickySidebarPaddingTop = 0) : n.stickySidebarPaddingTop = 1, 0 == d ? (n.stickySidebar.css("padding-bottom", 0), n.stickySidebarPaddingBottom = 0) : n.stickySidebarPaddingBottom = 1, n.previousScrollTop = null, n.fixedScrollTop = 0, e(), n.onScroll = function (n) {
                                if (n.stickySidebar.is(":visible"))
                                    if (i("body").width() < n.options.minWidth) e();
                                    else {
                                        if (n.options.disableOnResponsiveLayouts) {
                                            var a = n.sidebar.outerWidth("none" == n.sidebar.css("float"));
                                            if (a + 50 > n.container.width()) return void e()
                                        }
                                        var r, d, s = i(document).scrollTop(),
                                            c = "static";
                                        if (s >= n.sidebar.offset().top + (n.paddingTop - n.options.additionalMarginTop)) {
                                            var p, b = n.paddingTop + t.additionalMarginTop,
                                                l = n.paddingBottom + n.marginBottom + t.additionalMarginBottom,
                                                m = n.sidebar.offset().top,
                                                h = n.sidebar.offset().top + (r = n.container, d = r.height(), r.children().each(function () {
                                                    d = Math.max(d, i(this).height())
                                                }), d),
                                                f = 0 + t.additionalMarginTop,
                                                u = n.stickySidebar.outerHeight() + b + l < i(window).height();
                                            p = u ? f + n.stickySidebar.outerHeight() : i(window).height() - n.marginBottom - n.paddingBottom - t.additionalMarginBottom;
                                            var g = m - s + n.paddingTop,
                                                S = h - s - n.paddingBottom - n.marginBottom,
                                                y = n.stickySidebar.offset().top - s,
                                                k = n.previousScrollTop - s;
                                            "fixed" == n.stickySidebar.css("position") && "modern" == n.options.sidebarBehavior && (y += k), "stick-to-top" == n.options.sidebarBehavior && (y = t.additionalMarginTop), "stick-to-bottom" == n.options.sidebarBehavior && (y = p - n.stickySidebar.outerHeight()), y = k > 0 ? Math.min(y, f) : Math.max(y, p - n.stickySidebar.outerHeight()), y = Math.max(y, g), y = Math.min(y, S - n.stickySidebar.outerHeight());
                                            var v = n.container.height() == n.stickySidebar.outerHeight();
                                            c = !v && y == f || !v && y == p - n.stickySidebar.outerHeight() ? "fixed" : s + y - n.sidebar.offset().top - n.paddingTop <= t.additionalMarginTop ? "static" : "absolute"
                                        }
                                        if ("fixed" == c) {
                                            var w = i(document).scrollLeft();
                                            n.stickySidebar.css({
                                                position: "fixed",
                                                width: o(n.stickySidebar) + "px",
                                                transform: "translateY(" + y + "px)",
                                                left: n.sidebar.offset().left + parseInt(n.sidebar.css("padding-left")) - w + "px",
                                                top: "0px"
                                            })
                                        } else if ("absolute" == c) {
                                            var x = {};
                                            "absolute" != n.stickySidebar.css("position") && (x.position = "absolute", x.transform = "translateY(" + (s + y - n.sidebar.offset().top - n.stickySidebarPaddingTop - n.stickySidebarPaddingBottom) + "px)", x.top = "0px"), x.width = o(n.stickySidebar) + "px", x.left = "", n.stickySidebar.css(x)
                                        } else "static" == c && e();
                                        "static" != c && 1 == n.options.updateSidebarHeight && n.sidebar.css({
                                            "min-height": n.stickySidebar.outerHeight() + n.stickySidebar.offset().top - n.sidebar.offset().top + n.paddingBottom
                                        }), n.previousScrollTop = s
                                    }
                            }, n.onScroll(n), i(document).on("scroll." + n.options.namespace, function (i) {
                                return function () {
                                    i.onScroll(i)
                                }
                            }(n)), i(window).on("resize." + n.options.namespace, function (i) {
                                return function () {
                                    i.stickySidebar.css({
                                        position: "static"
                                    }), i.onScroll(i)
                                }
                            }(n)), "undefined" != typeof ResizeSensor && new ResizeSensor(n.stickySidebar[0], function (i) {
                                return function () {
                                    i.onScroll(i)
                                }
                            }(n))
                        })
                    }(t, e), !0)
                }

                function o(i) {
                    var t;
                    try {
                        t = i[0].getBoundingClientRect().width
                    } catch (i) {}
                    return void 0 === t && (t = i.width()), t
                }
                return (t = i.extend({
                        containerSelector: "",
                        additionalMarginTop: 0,
                        additionalMarginBottom: 0,
                        updateSidebarHeight: !0,
                        minWidth: 0,
                        disableOnResponsiveLayouts: !0,
                        sidebarBehavior: "modern",
                        defaultPosition: "relative",
                        namespace: "TSS"
                    }, t)).additionalMarginTop = parseInt(t.additionalMarginTop) || 0, t.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0,
                    function (t, o) {
                        e(t, o) || (console.log("TSS: Body width smaller than options.minWidth. Init is delayed."), i(document).on("scroll." + t.namespace, function (t, o) {
                            return function (n) {
                                var a = e(t, o);
                                a && i(this).unbind(n)
                            }
                        }(t, o)), i(window).on("resize." + t.namespace, function (t, o) {
                            return function (n) {
                                var a = e(t, o);
                                a && i(this).unbind(n)
                            }
                        }(t, o)))
                    }(t, this), this
            }
        }(jQuery), $(document).ready(function () {
            $("#sidebar-wrapper").theiaStickySidebar({
                additionalMarginTop: 80,
                additionalMarginBottom: 12
            })
        })); $(document).ready(function () {
            $("#flippy").click(function () {
                $("#flippanel").slideToggle("normal")
            })
        }); setTimeout(function () {
            $(".video-youtube").each(function () {
                $(this).replaceWith('<iframe class="video-youtube loader" src="' + $(this).data("src") + '" allowfullscreen="allowfullscreen" height="281" width="500"></iframe>')
            })
        }, 5e3); $(document).ready(function () {
            function relatedPost(g, e, r) {
                $.ajax({
                    url: "/feeds/posts/default/-/" + e + "?alt=json-in-script&max-results=" + r,
                    type: "get",
                    dataType: "jsonp",
                    success: function (t) {
                        for (var u = "", h = '<div class="related">', x = 0; x < t.feed.entry.length; x++) {
                            for (var z = 0; z < t.feed.entry[x].link.length; z++) {
                                if ("alternate" == t.feed.entry[x].link[z].rel) {
                                    u = t.feed.entry[x].link[z].href;
                                    break
                                }
                            }
                            var p = t.feed.entry[x].title.$t;
                            var c = t.feed.entry[x].content.$t;
                            var y = $('<div>').html(c);
                            if (c.indexOf("https://www.youtube.com/embed/") > -1 || c.indexOf("https://www.youtube.com/embed/") > -1) {
                                var d = t.feed.entry[x].media$thumbnail.url,
                                    m = d.replace('/default.jpg', '/mqdefault.jpg'),
                                    k = m;
                            } else if (c.indexOf("<img") > -1) {
                                var s = y.find('img:first').attr('src'),
                                    v = s.replace('s72-c', 's600');
                                var k = v;
                            } else {
                                var k = 'https://2.bp.blogspot.com/-4lZ7DCckjkg/WtaPclghMGI/AAAAAAAAN00/4Cais5iSDRwwUyU6jEc7qlCojlg1izsVgCLcBGAs/s1600/noImage.png';
                            }
                            h += '<li><div class="related-thumb"><a class="related-img lazyload" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"/></div><h3 class="related-title"><a href="' + u + '">' + p + '</a></h3></li>'
                        }
                        h += '</div>', g.html(h);
                    }
                })
            };
            $("#related-posts").each(function () {
                var g = $(this),
                    e = g.text(),
                    r = 6;
                relatedPost(g, e, r);
            });
        }); jQuery(document).ready(function () {
            jQuery('.page1').click(function () {
                jQuery('.content1').show();
                jQuery('.content2').hide();
                jQuery('.content3').hide();
                jQuery('.content4').hide();
                jQuery('.content5').hide();
                return false;
            });
            jQuery('.page2').click(function () {
                jQuery('.content1').hide();
                jQuery('.content2').show();
                jQuery('.content3').hide();
                jQuery('.content4').hide();
                jQuery('.content5').hide();
                return false;
            });
            jQuery('.page3').click(function () {
                jQuery('.content1').hide();
                jQuery('.content2').hide();
                jQuery('.content3').show();
                jQuery('.content4').hide();
                jQuery('.content5').hide();
                return false;
            });
            jQuery('.page4').click(function () {
                jQuery('.content1').hide();
                jQuery('.content2').hide();
                jQuery('.content3').hide();
                jQuery('.content4').show();
                jQuery('.content5').hide();
                return false;
            });
            jQuery('.page5').click(function () {
                jQuery('.content1').hide();
                jQuery('.content2').hide();
                jQuery('.content3').hide();
                jQuery('.content4').hide();
                jQuery('.content5').show();
                return false;
            });
        });
        "true" == Heart && $(document).ready(function () {
            function t() {
                for (var e = 0; e < o.length; e++) o[e].alpha <= 0 ? (i.body.removeChild(o[e].el), o.splice(e, 1)) : (o[e].y--, o[e].scale += .004, o[e].alpha -= .013, o[e].el.style.cssText = "left:" + o[e].x + "px;top:" + o[e].y + "px;opacity:" + o[e].alpha + ";transform:scale(" + o[e].scale + "," + o[e].scale + ") rotate(45deg);background:" + o[e].color + ";z-index:99999");
                requestAnimationFrame(t)
            }
            var e, i, a, o;
            e = window, i = document, o = [], e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
                    setTimeout(e, 1e3 / 60)
                },
                function (t) {
                    var a = i.createElement("style");
                    a.type = "text/css";
                    try {
                        a.appendChild(i.createTextNode(t))
                    } catch (e) {
                        a.styleSheet.cssText = t
                    }
                    i.getElementsByTagName("head")[0].appendChild(a)
                }(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"), a = "function" == typeof e.onclick && e.onclick, e.onclick = function (e) {
                    var t;
                    a && a(), t = e, (e = i.createElement("div")).className = "heart", o.push({
                        el: e,
                        x: t.clientX - 5,
                        y: t.clientY - 5,
                        scale: 1,
                        alpha: 1,
                        color: "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
                    }), i.body.appendChild(e)
                }, t()
        });
        "true" == hideToc && $(document).ready(function () {
            $(".ma-pro").css("display", "none")
        });
        "true" == hideFontSize && $(document).ready(function () {
            $(".font-size").css("display", "none")
        });
        "true" == hideColorBox && $(document).ready(function () {
            $(".settings-box").css("display", "none")
        }); $(document).ready(function () {
            if ($('.post-body h2:visible,.post-body h3:visible').length == 0) {
                $(".ma-pro").css("display", "none");
            }
        }); $(".ticker .widget-content div").each(function () {
            var t = $(this).attr("data-no"),
                e = $(this).attr("data-option"),
                a = $(this).parent().parent(),
                r = a.find("h3.title").text(),
                n = Math.floor(Math.random() * t + 1);
            if ((a.find("h3.title").remove(), e.match("recent"))) var s = "/feeds/posts/default?alt=json-in-script&max-results=" + t;
            else s = e.match("random") ? "/feeds/posts/default?alt=json-in-script&orderby=updated&start-index=" + n + "&max-results=" + t : "/feeds/posts/default/-/" + e + "?alt=json-in-script&max-results=" + t;
            $.ajax({
                url: s,
                type: "get",
                dataType: "jsonp",
                success: function (t) {
                    for (var e = "", a = "<ul>", n = 0; n < t.feed.entry.length; n++) {
                        for (var s = 0; s < t.feed.entry[n].link.length; s++)
                            if ("alternate" == t.feed.entry[n].link[s].rel) {
                                e = t.feed.entry[n].link[s].href;
                                break;
                            } var c = t.feed.entry[n].title.$t,
                            l = " ";
                        try {
                            l = t.feed.entry[n].category[0].term;
                        } catch (a) {
                            l = "";
                        }
                        a += '<li><a href="/search/label/' + l + '" title="' + l + '" class="item-tag">' + l + '</a><span class="item-title"><a href="' + e + '" title="' + c + '">' + c + "</a></span></li>";
                    }(a += "</ul>"), $(".ticker .widget-content div").each(function () {
                        $(this).html(a), $(this).find("ul").webTicker(), $(this).find(".tickercontainer").append("<span class='title'><i class='fa fa-bolt'></i>" + r + "</span>");
                    });
                },
            });
        });
        if (isSin) {
            if (document.querySelectorAll("#LinkList867")[0]) {
                function radialTimer() {
                    var e = this;
                    this.seconds = 0, this.count = 0, this.degrees = 0, this.timerHTML = "<div class='clom radialtimer'><div class='n'></div><div class='slice'><div class='q'></div><div class='pie r'></div><div class='pie l'></div></div></div><div class='clom radialbtn'><a class='areload' data-href='false' id='btn_reload'>" + redirect_T_Configure + "</a></div>", this.interval = null, this.timerContainer = null, this.number = null, this.slice = null, this.pie = null, this.pieRight = null, this.pieLeft = null, this.quarter = null, this.reload = null, this.history = "/p/" + page_redirect + ".html", this.ranQuerydata = function () {
                        var t = e.getQueryVariable("url");
                        e.reload.attr("data-href", t)
                    }, this.ranQuerybtn = function () {
                        "false" == e.reload.attr("data-href") ? (e.reload.attr("href", "javascript:void(0)"), e.reload.html(redirect_T_err), e.reload.addClass("disabled")) : (e.reload.attr("href", e.reload.attr("data-href")), e.reload.html(redirect_T_ready), e.reload.addClass("active")), nobuttonn && "false" !== e.reload.attr("data-href") && window.location.replace(e.reload.attr("data-href"))
                    }, this.getQueryVariable = function (e) {
                        for (var t = window.location.search.substring(1).split("&"), i = 0; i < t.length; i++) {
                            var r = t[i].split("=");
                            if (r[0] == e) return r[1]
                        }
                        return !1
                    }, this.init = function (t, i) {
                        e.timerContainer = $("#" + t), e.timerContainer.html(e.timerHTML), e.number = e.timerContainer.find(".n"), e.slice = e.timerContainer.find(".slice"), e.pie = e.timerContainer.find(".pie"), e.pieRight = e.timerContainer.find(".pie.r"), e.pieLeft = e.timerContainer.find(".pie.l"), e.quarter = e.timerContainer.find(".q"), e.reload = e.timerContainer.find(".areload"), e.start(i), e.ranQuerydata(), e.timerContainer.length && history.pushState(null, "", e.history)
                    }, this.start = function (t) {
                        e.seconds = t, e.interval = window.setInterval(function () {
                            e.number.html(e.seconds - 1 - e.count), e.count++, e.count > e.seconds - 1 && clearInterval(e.interval), e.degrees += 360 / e.seconds, e.count >= e.seconds / 2 ? (e.slice.addClass("nc"), e.slice.hasClass("mth") || e.pieRight.css({
                                transform: "rotate(180deg)"
                            }), e.pieLeft.css({
                                transform: "rotate(" + e.degrees + "deg)"
                            }), e.slice.addClass("mth"), e.count >= .75 * e.seconds - 1 && e.quarter.remove(), e.seconds - 1 == e.count && e.ranQuerybtn()) : e.pie.css({
                                transform: "rotate(" + e.degrees + "deg)"
                            })
                        }, 1e3)
                    }
                }
                var Se = "undefined" != typeof Settingsredirect ? Settingsredirect : {};
                var page_redirect = void 0 !== Se.pageName ? Se.pageName : "redirect",
                    redirect_T_Configure = void 0 !== Se.waitingMessage ? Se.waitingMessage : "‏جاري تهيئة الرابط",
                    redirect_T_ready = void 0 !== Se.linkReady ? Se.linkReady : "الرابط جاهز",
                    redirect_T_err = void 0 !== Se.linkError ? Se.linkError : "رابط معطل",
                    redirect_timer = void 0 !== Se.waitingTimer ? Se.waitingTimer : "10",
                    redirect_match = void 0 !== Se.autoRedirectSites ? Se.autoRedirectSites : "¥",
                    nobuttonn = void 0 !== Se.nobuttonn && Se.nobuttonn;
                $(document).ready(function () {
                    (new radialTimer).init("pageredirect", redirect_timer)
                }), $(".post-body a").each(function () {
                    var e = window.location.origin,
                        t = window.location.hostname,
                        i = new RegExp("(" + redirect_match + "|" + t + "|blogger.com|bp.blogspot.com|whatsapp:)");
                    0 <= this.href.match(i) && 0 <= this.name.match("more") && ($(this).attr("href", e + "/p/" + page_redirect + ".html?&url=" + $(this).attr("href")), $(this).attr("target", "_blank"))
                });
            }
        }
        noThumbnail = "" + DefaultPostImage, $(".post-nav").each(function () {
            var e = $("a.prev-post").attr("href"),
                t = $("a.next-post").attr("href");
            $.ajax({
                url: e,
                type: "get",
                success: function (e) {
                    var t = $(e).find("h1.entry-title").text(),
                        i = postnavPrevText,
                        r = "",
                        n = $(e).find("#post-body img:first").attr("src");
                    void 0 === n && (n = noThumbnail), r += "<div class='nav-thumb'><img alt='" + t + "' src='" + n + "'/></div><div class='nav-content'><span>" + i + "</span><p class='truncate'>" + t + "</p></div>", $("a.prev-post").html(r)
                }
            }), $.ajax({
                url: t,
                type: "get",
                success: function (e) {
                    var t = $(e).find("h1.entry-title").text(),
                        i = postnavNextText,
                        r = "",
                        n = $(e).find("#post-body img:first").attr("src");
                    void 0 === n && (n = noThumbnail), r += "<div class='nav-thumb'><img alt='" + t + "' src='" + n + "'/></div><div class='nav-content'><span>" + i + "</span><p class='truncate'>" + t + "</p></div>", $("a.next-post").html(r)
                }
            })
        }); window.addEventListener("scroll", function () {
            $(".toggle").click(function (e) {
                e.preventDefault();
                var t = $(this);
                t.next().hasClass("show") ? (t.next().removeClass("show"), t.next().slideUp(350)) : (t.parent().parent().find("li .inner").removeClass("show"), t.parent().parent().find("li .inner").slideUp(350), t.next().toggleClass("show"), t.next().slideToggle(350))
            })
        });
        if (document.querySelector(".main-logo-img img")) {
            var img = document.querySelector(".main-logo-img img");
            img.src = img.getAttribute("data-src");
            if (document.querySelector(".loader.main-logo-img")) {
                document.querySelector(".main-logo-img").classList.remove("loader")
            }
        }
        if (isSin) {
            fetch("/feeds/posts/summary?alt=json&max-results=0", {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(e => e.json()).then(e => {
                e.feed.category.forEach(function (e) {
                    var r = '<div class="caregory-div"><h2 class="Category-sytwd-archivepage">' + e.term + '</h2></div><ul class="clear">';
                    fetch("/feeds/posts/summary/-/" + e.term + "?alt=json&max-results=1000", {
                        method: "get",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(e => e.json()).then(e => {
                        for (var t = 0; t < e.feed.entry.length; t += 1) {
                            var s = e.feed.entry[t].link.map(function (e) {
                                    return e.rel
                                }).indexOf("alternate"),
                                a = e.feed.entry[t].link[s].href,
                                s = e.feed.entry[t].title.$t; - 1 !== a.indexOf(".blogspot.") && (a = a.replace("http://", "https://")), r += "<li><a class='Bouaici-archivepage-posts' title='" + s + "' href='" + a + "'>" + s + "</a></li>"
                        }
                        if (document.querySelector("#Bouaici-archivepage.loader")) {
                            document.querySelector("#Bouaici-archivepage").classList.remove("loader")
                        }
                        document.querySelector("#Bouaici-archivepage").innerHTML += "</ul>" + r
                    })
                })
            });
        }
        if (document.querySelector(".contact-form.loader")) {
            document.querySelector(".contact-form").classList.remove("loader");
            var elm = document.querySelector("#ContactForm1");
            document.querySelector(".contact-form").append(elm)
        }
        $(function () {
            $('span[name="author-social"]').before($(".post-author-social .widget-content").html());
            $(".table-of-contents .toggled").on("click", function () {
                $(".table-of-contents").toggleClass("Bouaici-open");
            });
        }); setInterval(function () {
            if (console.clear) {
                console.clear();
            }
        }, 10);
        var style = "<style>@import url('https://fonts.googleapis.com/css2?family=" + fontGoogle + "&display=swap'); body,body *{font-family:'" + fontGoogle + "', Arial, Tahoma, Helvetica, sans-serif,FontAwesome}</style>"; $("html > head").append(style);
        var aG = new DOMParser, aH = $("#blogger-components"), aI = aH.is("textarea") ? aH.val() : aH.html(), aJ = aG.parseFromString(aI, "text/html"); $(window).one("scroll", function () {
            if ($(".widget.Blog").length > 0 && $(window).scrollTop() + $(window).height() > $(".widget.Blog").offset().top && 1 != $("body").attr("data-tempjs")) {
                $("body").attr("data-tempjs", !0);
                var aL = $(aJ.head).find('script[src*="cookienotice.js"]');
                aL.length > 0 && $.getScript(aL.attr("src"), function () {
                    var aM = "";
                    $.each($(aJ.head).find("script:not([src]):first").html().match(/(\(window|window).*/g), function (t, e) {
                        aM += e
                    }), eval(aM)
                }), $.getScript($(aJ.head).find('script[src*="widgets.js"]').attr("src"), function () {
                    eval($(aJ.head).find("script:not([src]):last").html()), o = _WidgetManager._GetAllData().blog.blogId
                })
            }
        })