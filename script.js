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
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--cl', e.target.dataset.color);
        localStorage.setItem("color_option", e.target.dataset.color);
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");
    });
});
let mainColor = localStorage.getItem("color");
null !== mainColor && (document.documentElement.style.setProperty("--cl2", localStorage.getItem("color")));
const colorLi = document.querySelectorAll(".colors-list li");
colorLi.forEach(e => {
    e.addEventListener("click", e => {
        document.documentElement.style.setProperty("--cl2", e.target.dataset.colors), localStorage.setItem("color", e.target.dataset.colors)
    })
});
document.querySelector(".settings-box .toggle-settings .fa-gear").onclick = function () {
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
var didScroll = false;
window.onscroll = () => didScroll = true;
setTimeout(() => {
    if (!didScroll) {
        window.scrollTo({
            top: 1,
            behavior: 'smooth'
        })
    }
}, 5000);
$(document).ready(function () {
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
});
! function (a) {
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
}(jQuery);
! function (a) {
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
}(jQuery);
! function (a) {
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
})(jQuery);
$('#Bouaici-main-menu').menuBouaici();
$('#Bouaici-main-menu .widget').addClass('show-menu');
$('.search-toggle').on('click', function () {
    $('body').toggleClass('search-active')
});
$('.blog-posts-title a.more,.related-title a.more').each(function () {
    var $t = $(this),
        $smt = viewAllText;
    if ($smt != '') {
        $t.text($smt)
    }
});
$('#sidebar-tabs').tabBouaici();
$('.post-body strike').each(function () {
    var $t = $(this),
        $mtc = $t.text().trim();
    if ($mtc == '$ads={1}') {
        $t.replaceWith('<div id="Bouaici-new-before-E3lan"/>')
    }
    if ($mtc == '$ads={2}') {
        $t.replaceWith('<div id="Bouaici-new-after-E3lan"/>')
    }
});
$('#Bouaici-new-before-E3lan').each(function () {
    var $t = $(this);
    if ($t.length) {
        $('#before-E3lan').appendTo($t)
    }
});
$('#Bouaici-new-after-E3lan').each(function () {
    var $t = $(this);
    if ($t.length) {
        $('#after-E3lan').appendTo($t)
    }
});
$('#HTML200').each(function () {
    var $t = $(this);
    if ($t.length) {
        $t.appendTo($('#before-E3lan'))
    }
});
$('#HTML300').each(function () {
    var $t = $(this);
    if ($t.length) {
        $t.appendTo($('#after-E3lan'))
    }
});
$('.avatar-image-container img').attr('src', function ($this, i) {
    i = i.replace('//resources.blogblog.com/img/blank.gif', '//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s35-r/avatar.jpg');
    i = i.replace('//img1.blogblog.com/img/blank.gif', '//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s35-r/avatar.jpg');
    return i
});
$('.post-body a').each(function () {
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
});
$('.post-body strike').each(function () {
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
});
$('.Bouaici-share-links .window-Bouaici,.entry-share .window-Bouaici').on('click', function () {
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
});
$('.Bouaici-share-links').each(function () {
    var $t = $(this),
        $b = $t.find('.show-hid a');
    $b.on('click', function () {
        $t.toggleClass('show-hidden')
    })
});
$('.about-author .author-description span a').each(function () {
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
});
$('#featured .HTML .widget-content').each(function (type, num, label, color) {
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
});
$('.Bouaici-content-blocks .HTML .widget-content').each(function (type, num, label, color) {
    var $this = $(this),
        txt = $this.text().trim(),
        mtc = txt.toLowerCase();
    type = shortCodeBouaici(txt, 'type');
    num = shortCodeBouaici(txt, 'results');
    label = shortCodeBouaici(txt, 'label');
    color = shortCodeBouaici(txt, 'color');
    ajaxBlock($this, type, num, label, mtc, color)
});
$('.Bouaici-widget-ready .HTML .widget-content').each(function (type, num, label) {
    var $this = $(this),
        txt = $this.text().trim(),
        mtc = txt.toLowerCase();
    type = shortCodeBouaici(txt, 'type');
    num = shortCodeBouaici(txt, 'results');
    label = shortCodeBouaici(txt, 'label');
    ajaxWidget($this, type, num, label, mtc)
});
$('.Bouaici-related-content').each(function () {
    var $this = $(this),
        label = $this.find('.related-tag').attr('data-label'),
        num = relatedPostsNum;
    ajaxRelated($this, 'related', num, label, 'getrelated')
});
$(function () {
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
var head, newLine, el, title, link, ToC = "<nav class='table-of-contents' role='navigation'><div><span>" + TocN + "</span><span class='toggled'/></div><ul>";
$(".post-body h3,.post-body h2").attr("id", function (arr) {
    return "point" + arr;
});
$(".post-body h2").attr("class", function (arr) {
    return "point";
});
$(".post-body h3,.post-body h2").each(function () {
    el = $(this), title = el.text(), cla = el.attr("class"), link = "#" + el.attr("id"), ToC += newLine = "<li class='" + cla + "'><a href='" + link + "'>" + title + "</a></li>"
}), ToC += "</ul></nav>", $(".ma-pro").prepend(ToC);
$('#plus').click(function () {
    $('#post-body').css({
        fontSize: "+=1px"
    });
});
$('#minus').click(function () {
    $('#post-body').css({
        fontSize: "-=1px"
    });
});
$('i[rel="pre"]').replaceWith(function () {
    return $('<pre><code>' + $(this).html() + '</code></pre>');
});
$(document).ready(function () {
    $('#BouaiciRights').attr('style', 'margin-left: 3px;visibility: visible!important; opacity: 1!important;z-index: 1!important;').html('<span class="BouaiciRightsClass"><a href="https://bouaici-templates.blogspot.com/" tooltip="Bouaici-Template - Multi-Use" target="_blank" style="visibility: visible!important;opacity: 1!important;position: relative!important;z-index: 1!important;width:32px!important;height:32px!important;background: url(https://yt3.googleusercontent.com/t7DCCaCoRkS1wm_sq-CjY_o0rx7Bvx5JUkyuqZIZI5j87Fi0qAt0PDqIONsHRL3pp8QRZ1SsYzY=s176-c-k-c0x00ffffff-no-rj-mo) top no-repeat;background-size:contain;-webkit-transition: all 0.15s ease-in-out;-moz-transition: all 0.15s ease-in-out;-ms-transition: all 0.15s ease-in-out;-o-transition: all 0.15s ease-in-out;transition: all 0.15s ease-in-out;display:inline-block!important;vertical-align: top;"></a></span>');
    setInterval(function () {
        if (!$('#BouaiciRights:visible').length) {
            window.location.href = 'https://bouaici-templates.blogspot.com/'
        }
    }, 10000)
});
$(document).ready(function () {
    $(function () {
        "use strict";
        $.ajax({
            dataType: "json",
            url: "https://www.blogger.com/feeds/8727805023452710728/posts/default?alt=json-in-script",
            method: "GET",
            dataType: "jsonp",
            success: function (e) {
                var t;
                for (t = 0; t < e.feed.entry.length; t += 1) {
                    var n = $(e.feed.entry[t].content.$t);
                    if (0 === t && !$("body").hasClass("error_page")) {
                        for (var o = n.find("li"), d = [], a = 0; a < o.length; a += 1) d.push($(o[a]).text());
                        var r, ids = $('link[rel="service.post"]').attr('href'),
                            idss = ids.split('/feeds/').pop(),
                            i = idss.split("/posts/default"),
                            f = window.location.href.toLowerCase(),
                            s = d.length - 1;
                        for (r = 0; r < d.length; r += 1) {
                            if (-1 != i.indexOf(d[r])) {
                                var l = $(e.feed.entry[t].content.$t).find("script"),
                                    p = $(e.feed.entry[t].content.$t).find("style");
                                $("head").append(p), $("head").append(l);
                                break;
                            }
                            r == s && -1 == f.indexOf("post-preview") && -1 == f.indexOf("www.blogger") && -1 == f.indexOf("b/layout-preview") && -1 == f.indexOf("b/preview") && -1 == f.indexOf("translate.google") && -1 == f.indexOf("webcache.googleusercontent") && -1 == f.indexOf("template-editor") && $("html").html(n.find(".redirect").html());
                        }
                    }
                    if (1 === t) {}
                }
            },
        });
    });
});
const navBar = document.querySelector(".navbar");
const allLi = document.querySelectorAll(".navbar li");
allLi.forEach((li, index) => {
    li.addEventListener("click", e => {
        e.preventDefault();
        navBar.querySelector(".active").classList.remove("active");
        li.classList.add("active");
        const indicator = document.querySelector(".indicator");
        indicator.style.transform = `translateX(calc(${index*65}px))`;
    });
});
$(".posts-random").each(function () {
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
                    }
                var c = t.feed.entry[n].title.$t,
                    l = " ";
                try {
                    l = t.feed.entry[n].category[0].term;
                } catch (a) {
                    l = "";
                }
                a += '<li><a href="' + e + '" title="' + c + '">' + c + "</a></li>";
            }
            (a += "</ul>"), $(".posts-random").each(function () {
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
})(jQuery);
jQuery.cookie = function (i, t, e) {
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
var mql = window.matchMedia("screen and (min-width: 60em)");
mql.matches && (! function (i) {
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
}));
$(document).ready(function () {
    $("#flippy").click(function () {
        $("#flippanel").slideToggle("normal")
    })
});
setTimeout(function () {
    $(".video-youtube").each(function () {
        $(this).replaceWith('<iframe class="video-youtube loader" src="' + $(this).data("src") + '" allowfullscreen="allowfullscreen" height="281" width="500"></iframe>')
    })
}, 5e3);
var lazyshare = !1;
window.addEventListener("scroll", function () {
    (0 != document.documentElement.scrollTop && !1 === lazyshare || 0 != document.body.scrollTop && !1 === lazyshare) && (! function () {
        var e = document.createElement("script");
        e.type = "text/javascript", e.async = !0, e.src = "//platform-api.sharethis.com/js/sharethis.js#property=5ae1955780207c001169f1d2&amp;product=inline-share-buttons";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(e, a)
    }(), lazyshare = !0)
}, !0);
$(document).ready(function () {
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
});
jQuery(document).ready(function () {
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
"true" == AdBlockBlocker && ! function () {
    function e() {
        var e = document.createElement("div");
        e.id = "levelmaxblock", e.innerHTML = '<div id="AdBlockBlocker"><div class="inner"><img src="' + AdBlockImage + '" alt="adblock" width="800px" height="600px" title="adblock"/></div></div>', document.body.append(e), document.body.style.overflow = "hidden"
    }
    var t = document.createElement("script");
    t.type = "text/javascript", t.async = !0, t.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", t.onerror = function () {
        e(), window.adblock = !0
    };
    var i = document.getElementsByTagName("script")[0];
    i.parentNode.insertBefore(t, i)
}();
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
});
$(document).ready(function () {
    if ($('.post-body h2:visible,.post-body h3:visible').length == 0) {
        $(".ma-pro").css("display", "none");
    }
});
$(".ticker .widget-content div").each(function () {
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
                    }
                var c = t.feed.entry[n].title.$t,
                    l = " ";
                try {
                    l = t.feed.entry[n].category[0].term;
                } catch (a) {
                    l = "";
                }
                a += '<li><a href="/search/label/' + l + '" title="' + l + '" class="item-tag">' + l + '</a><span class="item-title"><a href="' + e + '" title="' + c + '">' + c + "</a></span></li>";
            }
            (a += "</ul>"), $(".ticker .widget-content div").each(function () {
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
});
window.addEventListener("scroll", function () {
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
});
setInterval(function () {
    if (console.clear) {
        console.clear();
    }
}, 10);
var style = "<style>@import url('https://fonts.googleapis.com/css2?family=" + fontGoogle + "&display=swap'); body,body *{font-family:'" + fontGoogle + "', Arial, Tahoma, Helvetica, sans-serif,FontAwesome}</style>";
$("html > head").append(style);
var aG = new DOMParser,
    aH = $("#blogger-components"),
    aI = aH.is("textarea") ? aH.val() : aH.html(),
    aJ = aG.parseFromString(aI, "text/html");
$(window).one("scroll", function () {
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
;
function Active() {
    if (HomeUrl === true) {
        Bouaici = void 0 !== HomeUrl ? HomeUrl : "/p/contact-us.html";
    } else {
        Bouaici = void 0 !== HomeUrl ? HomeUrl : "/p/contact-us.html";
    }
    var t = Bouaici
      , Linkk = window['location']['href']['toLowerCase']();
    if (Linkk['indexOf']('www.blogger') == -1 && Linkk['indexOf']('draft.blogger') == -1 && Linkk['indexOf']('template-editor') == -1 && Linkk['indexOf']('post-preview') == -1 && Linkk['indexOf']('b/layout-preview') == -1 && Linkk['indexOf']('b/blog-preview') == -1 && Linkk['indexOf']('b/preview') == -1 && Linkk['indexOf']('b/html-preview') == -1 && Linkk['indexOf']('b/app-preview') == -1 && Linkk['indexOf']('translate.google') == -1 && Linkk['indexOf']('webcache.googleusercontent') == -1) {
        "undefined" != typeof _WidgetManager && (t = _WidgetManager._GetAllData().blog.homepageUrl);
        var e = ["color: #c31432", "font-size:20px", "font-weight: bold"].join(";")
          , a = ["color: #434752", "font-size:12px", "font-weight: bold"].join(";")
          , s = ["background: #c31432", "color: #ffffff", "font-size:12px", "padding: 0 5px", "margin: 2px 0", "border-radius: 30px"].join(";")
          , o = t.toLowerCase()
          , n = "Bouaici-Template - Bouaici Template"
          , i = "" + trans[27]
          , r = "" + o + "&keyactive=" + copyrights.active + "&version=7.0.0&product=" + n + "&action=copyrights"
          , l = {
            team: "Bouaici",
            link: "https://bouaici-templates.blogspot.com/"
        }
          , d = {
            copyright: function(t) {
                t && ($("html").html('<div style="font: 14px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;position: fixed;overflow-x: hidden;background: #f8f8f8;top: 0;left: 0;right: 0;bottom: 0;width: 100%;height: 100%;z-index: 1;text-align: center;"><div style="position: relative;padding: 2em;width: 80%;max-width: 600px;min-width: 200px;margin: 5em auto;background: white;box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0px 1px 1px 0 rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);-webkit-box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0px 1px 1px 0 rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);"><div><div style="color: #fff; position: absolute; margin: 0 auto; left: 0; right: 0; top: -25px; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; -webkit-border-radius: 50%; z-index: 9; background: #c31432; padding: 0; text-align: center; box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.26); -webkit-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.26); font-size: 2em; font-family: arial; text-decoration: none;"><span>©</span></div><h4 style="text-align: center; font-size: 26px; margin: 30px 0 15px;line-height: normal;">عفواً..!!</h4></div><div style="position: relative;padding: 5px;text-align: right;font-size: 14px;"><p>لا يمكنك إستخدام هذا القالب .. هذا التوقف يحدث تلقائياً بسبب مايلي ..</p><p><span style="font-size: 17px; font-weight: bold; color: #c31432;">1</span>-العبث بحقوق ملكية التصميم!..كإخفاء توقيع المصمم</p><p><span style="font-size: 17px; font-weight: bold; color: #c31432;">2</span>-لا تملك رخصة؟ .. للحصول على تفعيل القالب يرجى<a style="color: #c31432;font-size: 14px; font-weight: 400;" href="https://bouaici-templates.blogspot.com//?view=Activation&type=request"> طلب رخصة </a></p><p><span style="font-size: 17px; font-weight: bold; color: #c31432;">3</span>-تملك رخصة ومع ذلك لا تستطيع إستخدام هذا القالب .. يرجى التواصل بـ  <a style="color: #c31432;font-size: 14px; font-weight: 400;" href="https://mail.google.com/mail/?ui=2&view=cm&fs=1&tf=1&to=bouaici@gmail.com&su=طلب الدعم الفني للمنتج (Bouaici-Template - Bouaici Template)&body=أكتب مشكلتك هنا..."> فريق الدعم </a></p></div><div style="text-align: center; overflow: hidden;"><a style="color: #fff;background: #c31432;text-decoration: none;display: block;max-width: 180px;padding: 10px 12px;margin: 5px auto;font-size: 14px;font-weight: 400;line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 0;box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0px 1px 1px 0 rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);-webkit-box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0px 1px 1px 0 rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);" href="https://bouaici-templates.blogspot.com/">الصفحة الرسمية</a></div></div></div>'),
                setInterval(function() {
                    window.location.href = t
                }, 6e4))
            },
            macros: function(t, e, a, s, o, n, r) {
                if (!0 === n && window.location.hostname == t) {
                    var l = "<abbr>© " + (new Date).getFullYear() + "</abbr> " + i + " - <a href='" + HomeUrl + "'>" + blogTitle + "</a>";
                    $("#source-org").html(l),
                    $("#licenseKey").remove()
                } else
                    d.copyright(e.link);
                if (0 !== $("#copyrights").length) {
                    if (!0 === r) {
                        var c = "<span class='created-using-layers impo'><a class='impo' tooltip='" + e.team + "' href='" + e.link + "' target='_blank' style='display: block;'></a></span>";
                        $("#copyrights").addClass("impo").append(c),
                        setInterval(function() {
                            $(".impo").each(function() {
                                ($(this).css("opacity") < 1 || "hidden" == $(this).css("visibility") || $(this).is(":hidden")) && d.copyright(e.link)
                            })
                        }, 2e3)
                    }
                } else
                    d.copyright(e.link);
                console.log("%c" + a + "\n%cURL: " + e.link + "\nby: " + e.team + "\nCopyright: 2023", s, o)
            }
        };
        jQuery.ajax({
            timeout: 1e4,
            url: r,
            method: "GET",
            dataType: "jsonp",
            async: !0,
            beforeSend: function() {},
            success: function(t) {
                var o = t.records
                  , i = o.status
                  , r = o.created
                  , l = o.version
                  , c = o.by
                  , p = o.host;
                d.macros(p, c, n, e, a, i, r),
                console.log("%cStatus: " + i + "\nCreated: " + r + "\nVersion: 7.0.0 (" + l + ")", s)
            },
            error: function(t, o, i) {
                d.macros(window.location.hostname, l, n, e, a, !0, !0),
                console.log("%cStatus: " + o + "\nVersion: 7.0.0", s)
            }
        })
    } else {
        var styles4 = ['background: #c31432', 'color: #ffffff', 'font-size:12px', 'padding: 0 5px', 'margin: 2px 0', 'border-radius: 30px'].join(';');
        console.log('%cStatus: true\nCreated: true\nVersion: 7.0.0', styles4)
    }
}
Active();
var getTitle, getLink, getSnippet, getNameAuthor, getUrlAuthor, getImgAuthor, getCategory, CategoryHtml, getImage, thumbUrl, youtube_id, getPublisher, getDate, setDate, Format_Archive, numComments, setComments, newArrayMap = new Array(26).fill(1).map((t,e)=>String.fromCharCode(97 + e)), newArrayMapLow = new Array(26).fill(1).map((t,e)=>String.fromCharCode(65 + e)), o = $("body").html().match(new RegExp("'" + newArrayMap[1] + newArrayMap[11] + newArrayMap[14] + newArrayMap[6] + newArrayMapLow[8] + newArrayMap[3] + "':.+?,"))[0].replace(/[^0-9]/g, ""), p = !1, q = window.location.href, r = "undefined" != typeof BouaiciSet ? BouaiciSet : {}, comment_system = r["comment-system"] || "blogger", face_id = r["fb-id"] || "", disqus_id = r["dis-id"] || "", numMax = r["max-results"] || 10, max_intro = r["max-intro"] || 10, max_ticker = r["max-ticker"] || 20, max_v_carousel = r["ve-carousel-max"] || 2, max_related = r["max-rel"] || 10, time_dur_mutual = r["h-mutual-dur"] || 5e3, time_dur_vCarousel = r["ve-carousel-dur"] || 3e3, option_comments = void 0 === r["option-comments"] || r["option-comments"], No_Mouse = void 0 !== r.NoMouse && r.NoMouse, lazy_load = void 0 === r["lazy-load"] || r["lazy-load"], lazy_body = void 0 !== r["lazy-body"] && r["lazy-body"], No_Select = void 0 === r.NoSelect || r.NoSelect, toc_sys = void 0 === r.toc || r.toc, sticky_aside = void 0 === r["sticky-aside"] || r["sticky-aside"], menu_fixed = void 0 !== r["menu-fixed"] && r["menu-fixed"], navtop_fixed = void 0 !== r["navtop-fixed"] && r["navtop-fixed"], repeat_midad = void 0 !== r["repeat-midad"] && r["repeat-midad"], repeat_indexad = void 0 !== r["repeat-indexad"] ? r["repeat-indexad"] : 0, support_webp = void 0 !== r["sup-web"] && r["sup-web"], author_page = r["authors-page"], errFeed = "<div class='widget-error'><b>" + trans[1] + "</b><p>" + trans[2] + "</p></div>", SVGicon = ["khamsat", "mostaql", "tradent", "google-play", "messenger", "blogger", "tik-tok"];
if (blog_labels = "undefined" != typeof _bl ? _bl : {},
PostCount = "undefined" != typeof PostCount ? PostCount : 0,
feed_count = Math.ceil(PostCount / 150),
AuthorsInfo = "undefined" != typeof AuthorsInfo ? AuthorsInfo : {},
$(window).one("scroll", function() {
    isSingleItem && $(".attachments").length && $(".attachments").removeClass("hide").appendTo(".topic-attachments")
}),
ScriptsAndElements(),
setVCarousel(),
lazy_load ? $(window).one("scroll", setIntroAndTicker) : setIntroAndTicker(),
lazy_load ? $(window).scroll(sideFooterWidgets) : sideFooterWidgets(),
setStickySidebar(),
isArchive || setPagination(),
isHomepage && (setHomeSectionContainer(),
$(".hfeed > .headline").append('<a class="btn-more btn btn-main sizes-df radius5" href="/search?max-results="' + numMax + '"><b>' + showMore + "</b></a>"),
setMutual(),
lazy_load ? $(window).scroll(setHomeSectionAjax) : setHomeSectionAjax()),
isSingleItem && (redirectPage(),
staticPageElements(),
setShareBlockqoute(),
postBodyElements(),
lazy_load ? $(window).scroll(setCommentsBlog) : setCommentsBlog()),
isPost) {
    if (setTocPost(),
    setAdsAndAuthorPost(),
    setZoomText(),
    lazy_load) {
        var a0 = !1;
        $(window).scroll(setPrevAndNext)
    } else {
        var a0 = !0;
        setPrevAndNext()
    }
    if (lazy_load) {
        var a2 = !1;
        $(window).scroll(setRelatedPost)
    } else {
        var a2 = !0;
        setRelatedPost()
    }
}
if (isPage) {
    var W = 0
      , X = 0
      , Y = 0;
    setArshivePage(),
    setAuthorsPage()
}
isMultipleItems && !isHomepage && setCloneHomeAds();
var a3 = {};
function ScriptsAndElements() {
    if (lazy_load || LazyImages("data-src", null, !0),
    $("a[href]").each(function() {
        if (-1 !== $(this).attr("href").indexOf("search/label/")) {
            var t = placeA5($(this).attr("href"))["max-results"];
            t ? $(this).attr("href", $(this).attr("href").replace(t, numMax)) : $(this).attr("href", $(this).attr("href") + "?max-results=" + numMax)
        }
    }),
    setMegamMenu(),
    navtop_fixed && $(window).scroll(function() {
        $(window).scrollTop() > 40 ? $("header .nav-top").addClass("fixed-top show fixed-shadow") : $("header .nav-top").removeClass("fixed-top show fixed-shadow")
    }),
    menu_fixed) {
        var aK = $("#" + menu_instanceId).offset().top + 60;
        $(window).scroll(function() {
            $(window).scrollTop() > aK ? $(".bottom-menu").addClass("fixed-top show fixed-shadow") : $(".bottom-menu").removeClass("fixed-top show fixed-shadow")
        })
    }
    $(".menu-res").click(function() {
        $(".menu-res-wrap > ul").fadeToggle()
    }),
    $(".menu-res-bar").click(function() {
        $(this).nextAll("ul.notr").slideToggle()
    }),
    $("body").on("click", ".share-icon", function() {
        $(this).next(".post-share").slideToggle("fast")
    }),
    $(".accordion-widget").siblings(".headline").find("h6").each(function() {
        $(this).text($(this).text().replace("[AO]", ""))
    }),
    $(".acc-title").click(function() {
        $(this).toggleClass("is-opened").siblings(".acc-title").removeClass("is-opened"),
        $(this).next(".acc-content").slideToggle("fast"),
        $(this).siblings(".acc-content").not($(this).next()).slideUp("fast")
    }),
    $(".social-widget a").each(function() {
        var t, e = $(this).text(), a = -1 != e.indexOf("-") ? e.match(/.+-/)[0].slice(0, -1) : e, s = e.split("-")[e.split("-").length - 1] || e;
        t = -1 != SVGicon.indexOf(a) ? "<svg class='radius30 shadow-lg fa-" + a + "'><use xlink:href='#ic-" + a + "'/></svg>" : "<i class='radius30 shadow-lg fa fa-" + a + "'></i>",
        $(this).html(t + '<div class="radius30 shadow-kit">' + s + "</div>")
    }),
    $(".social-widget").removeClass("hide");
    var scrollTop = $(".scroll-top");
    0 != r["scroll-top"] && scrollTop.length > 0 && ($(window).scroll(function() {
        $(this).scrollTop() > 10 ? scrollTop.fadeIn(300) : scrollTop.fadeOut(300)
    }),
    scrollTop.on("click", function() {
        var t = {
            scrollTop: 0
        };
        $("html,body").stop().animate(t, 1e3)
    }));
    var aG = new DOMParser
      , aH = $("#blogger-components")
      , aI = aH.is("textarea") ? aH.val() : aH.html()
      , aJ = aG.parseFromString(aI, "text/html");
    $(window).one("scroll", function() {
        if ($(".widget.Blog").length > 0 && $(window).scrollTop() + $(window).height() > $(".widget.Blog").offset().top && 1 != $("body").attr("data-tempjs")) {
            $("body").attr("data-tempjs", !0);
            var aL = $(aJ.head).find('script[src*="cookienotice.js"]');
            aL.length > 0 && $.getScript(aL.attr("src"), function() {
                var aM = "";
                $.each($(aJ.head).find("script:not([src]):first").html().match(/(\(window|window).*/g), function(t, e) {
                    aM += e
                }),
                eval(aM)
            }),
            $.getScript($(aJ.head).find('script[src*="widgets.js"]').attr("src"), function() {
                eval($(aJ.head).find("script:not([src]):last").html()),
                o = _WidgetManager._GetAllData().blog.blogId
            })
        }
    }),
    No_Select && document.body.setAttribute("data-protect", !0),
    No_Mouse && ($("body").attr("data-mouse", !0).on("contextmenu", function(t) {
        return !1
    }).bind("cut copy paste", function(t) {
        return !1
    }),
    $(document).keydown(function(t) {
        return 123 != t.keyCode && ((!t.ctrlKey || !t.shiftKey || 73 != t.keyCode) && ((!t.ctrlKey || !t.shiftKey || 74 != t.keyCode) && void 0))
    }),
    $(".post-body pre.Bouaici-code").hover(function() {
        $("body").attr("data-mouse", !1).unbind("contextmenu").unbind("cut copy paste")
    }, function() {
        $("body").attr("data-mouse", !0).on("contextmenu", function(t) {
            return !1
        }).bind("cut copy paste", function(t) {
            return !1
        })
    })),
    lazy_body && document.body.setAttribute("data-lazy", !0)
}
function placeA5(t) {
    var e = t.replace(/.+?\?/, "").split("&")
      , a = {};
    return $.each(e, function(t, e) {
        a[e.split("=")[0]] = e.split("=")[1]
    }),
    a
}
function setMonth(t) {
    var e = {
        month: "long"
    };
    return new Date(t).toLocaleString(BlogLang, e)
}
function ajaxElement(t) {
    if (getTitle = t.title.$t.replace(/"/g, '"'),
    getLink = t.link.filter(function(t) {
        return "alternate" == t.rel
    })[0].href,
    getLink = httpsEnabled ? getLink.replace("http://", "https://") : getLink,
    void 0 !== t.summary) {
        var e = t.summary.$t.replace(/<\S[^>]*>/g, "");
        getSnippet = e.substring(0, snippetLength) + "..."
    } else if (void 0 !== t.content) {
        var a = t.content.$t.replace(/(<([^>]+)>)/gi, "");
        getSnippet = a.substring(0, snippetLength) + "..."
    } else
        getSnippet = "";
    showAuthor && void 0 !== t.author[0].uri ? (getNameAuthor = t.author[0].name.$t,
    getImgAuthor = (getImgAuthor = t.author[0].gd$image.src.match("blogblog") ? NoUserImage : t.author[0].gd$image.src).replace(/http:\/\//, "/http:///"),
    getUrlAuthor = t.author[0].uri.$t,
    AuthorHtml = '<a class="author-prof Author url" href="' + getUrlAuthor + '">' + getNameAuthor + "</a>") : (getNameAuthor = trans[3],
    getImgAuthor = NoUserImage,
    getUrlAuthor = "javascript:void(0)",
    AuthorHtml = '<span class="fn Author">' + getNameAuthor + "</span>"),
    void 0 !== t.category ? (getCategory = t.category[0].term,
    CategoryHtml = '<a class="Category" href="/search/label/' + getCategory + "?max-results=" + numMax + '">' + getCategory + "</a>") : (getCategory = trans[4],
    CategoryHtml = '<span class="Category">' + getCategory + "</span>"),
    void 0 !== t.media$thumbnail ? (thumbUrl = t.media$thumbnail.url,
    getImage = httpsEnabled ? thumbUrl.replace("http://", "https://").replace("?imgmax=800", "") : thumbUrl) : void 0 !== t.content && null != t.content.$t.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/) ? 11 == (youtube_id = t.content.$t.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop()).length && (getImage = "//img.youtube.com/vi/" + youtube_id + "/0.jpg") : getImage = void 0 !== t.content && null != t.content.$t.match(/src=(.+?[\.jpg|\.gif|\.png]")/) ? t.content.$t.match(/src=(.+?[\.jpg|\.gif|\.png]")/)[1] : NoImage,
    void 0 !== t.thr$total ? (numComments = t.thr$total.$t,
    setComments = '<a class="Comments" href="' + getLink + '#comment-form">(' + numComments + ")</a>") : setComments = '<span class="Comments">(' + (numComments = 0) + ")</a>",
    getPublisher = t.published.$t,
    getDate = getPublisher.substr(8, 2) + " " + setMonth(getPublisher) + " " + getPublisher.substr(0, 4),
    Format_Archive = "/" + t.published.$t.substr(0, 10).replace(/\-/g, "_") + "_archive.html",
    setDate = showTimestamp ? '<a href="' + Format_Archive + '" class="Date post-date">' + getDate + "</a>" : "",
    PostId = t.id.$t.replace(/.+\-/g, "")
}
function setPostShare(t) {
    return '<i class="btn btn-35 btn-defaul btn-outline radius5 fa fa-share-alt share-icon"></i><div class="post-share notr"><ul class="share-menu"><li><a target="_blank" href="https://www.blogger.com/share-post.g?blogID=' + o + "&postID=" + t + '&target=facebook"><i class="notr fa fa-facebook btn-facebook"></i></a></li><li><a target="_blank" href="https://www.blogger.com/share-post.g?blogID=' + o + "&postID=" + t + '&target=twitter"><i class="notr fa fa-twitter btn-twitter"></i></a></li><li><a target="_blank" href="https://www.blogger.com/share-post.g?blogID=' + o + "&postID=" + t + '&target=pinterest"><i class="notr fa fa-pinterest-p btn-pinterest"></i></a></li></ul></div>'
}
function setMegamMenu() {
    $(window).width() > 992 ? $(".MegaItem").hover(function() {
        var t = $(this)
          , e = t.find("a").attr("data-label")
          , a = support_webp ? "https://www.blogger.com/feeds/" + o : "/feeds";
        t.find(".mega-wrapper").stop().slideDown(),
        t.find(".mega-wrapper").hasClass("done") || (t.find(".mega-wrapper").addClass("done"),
        t.find(".mega-wrapper").html('<i class="loader-call"/>'),
        $.get(a + "/posts/summary/-/" + e + "?alt=json&max-results=10", function(e) {
            if (e.feed.entry) {
                var a = new String;
                $.each(e.feed.entry, function(t, e) {
                    e.app$control || (ajaxElement(e),
                    a = (a = (a = (a += '<div class="mega-post">') + '<a class="img-content" href="' + getLink + '"><img alt="' + getTitle + '" src="' + resizeImg(getImage, 250, 150) + '"></a>') + '<div class="details-section">' + setDate + setComments + "</div>") + '<h2 class="post-title"><a class="entry-title" href="' + getLink + '">' + getTitle + "</a></h2>",
                    a += "</div>")
                });
                var s = $('<div class="owl-carousel notr">' + a + "</div>");
                function o() {
                    $("body").attr("data-carousel", !0);
                    var e = {
                        slideBy: 5,
                        margin: 20,
                        nav: !0,
                        items: 5,
                        loop: !0
                    };
                    e.rtl = "rtl" === BlogDir,
                    e.autoplay = !1,
                    e.autoplayHoverPause = !0,
                    e.dots = !1,
                    e.navText = [],
                    s.owlCarousel(e),
                    t.find(".mega-wrapper").slideDown()
                }
                t.find(".mega-wrapper").html(s),
                1 != $("body").attr("data-carousel") ? $.getScript("https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js", o) : o()
            }
        }, "jsonp")),
        $(".MegaItem > ul").remove()
    }, function() {
        $(this).find(".mega-wrapper").stop().slideUp(),
        $(".bottom-menu").css("margin-bottom", "0px")
    }) : $(".mega-wrapper").remove()
}
function setIntroAndTicker() {
    $(".intro .HTML").each(function() {
        var t, e, a = $(this), s = a.is("#" + tikcer_instanceId) ? "Ticker" : "Slider", n = a.find(".ord").text(), i = new String, r = new String, l = "Ticker" === s ? max_ticker : max_intro, d = Math.round(Math.random() * (PostCount - l)), c = support_webp ? "https://www.blogger.com/feeds/" + o : "/feeds";
        ("random" === n || "recent" === n || n in blog_labels) && PostCount > 0 && FeedEnabled && !isPrivate ? function() {
            switch (a.css("display", "block"),
            d = d <= 0 ? 1 : d,
            n) {
            case "recent":
                t = c + "/posts/summary?alt=json-in-script&max-results=" + l;
                break;
            case "random":
                t = c + "/posts/summary?alt=json-in-script&start-index=" + d + "&max-results=" + l;
                break;
            default:
                t = c + "/posts/summary/-/" + n + "?alt=json-in-script&max-results=" + l
            }
            if (isStorage)
                if (void 0 !== sessionStorage[s])
                    m(sessionStorage[s]);
                else {
                    var o = {};
                    o.url = t,
                    o.dataType = "jsonp",
                    $.ajax(o).done(function(t) {
                        sessionStorage[s] = JSON.stringify(t),
                        m(t)
                    })
                }
            else {
                var p = {};
                p.url = t,
                p.dataType = "jsonp",
                $.ajax(p).done(function(t) {
                    m(t)
                })
            }
            function m(t) {
                for (t = "string" == typeof t ? JSON.parse(t) : t,
                a.find(".ord").remove(),
                e = 0; e < t.feed.entry.length; e += 1)
                    if (!t.feed.entry[e].app$control && (ajaxElement(t.feed.entry[e]),
                    a.find("div").is(".ticker-wrapper") && (i += '<li><a title="' + getTitle + '" href="' + getLink + '">' + getTitle + "</a></li>"),
                    a.find("div").is(".main-slider"))) {
                        var o = '<div class="Item radius3"><div class="img-content LazyLoad"><img class="notr" style="opacity:0" data-slider-src="' + getImage + '"/><span class="Category label-name">' + getCategory + '</span></div><div class="caption"><h2 class="Title"><a title="' + getTitle + '" href="' + getLink + '">' + getTitle + "</a></h2></div></div>";
                        0 === e ? $(".first-box .top").html(o) : 1 === e ? $(".first-box .bottom").html(o) : 2 === e ? $(".second-box .top").html(o) : 3 === e ? $(".second-box .bottom").html(o) : (r += '<div class="Item radius3">',
                        r += '<div class="img-content LazyLoad">',
                        r += '<img class="notr" style="opacity:0" data-slider-src="' + getImage + '"/>',
                        r += '<span class="Category">' + getCategory + "</span>",
                        r += "</div>",
                        r += '<div class="caption radius3">',
                        r += '<h2 class="Title"><a title="' + getTitle + '" href="' + getLink + '">' + getTitle + "</a></h2>",
                        r += '<div class="details-section">' + AuthorHtml + setDate + setComments + "</div>",
                        r += "</div>",
                        r += "</div>")
                    }
                if ("Ticker" === s ? $(".ticker-content").html('<nav><ul class="notr">' + i + "</ul></nav>") : $("#right-slider").html(r),
                $(".intro").removeClass("hide"),
                "Ticker" === s) {
                    var l, d = "rtl" == BlogDir ? "right" : "left", c = $(".ticker-content ul"), p = 0, m = $("#wd-ticker").width() - 100, u = m;
                    c.each(function() {
                        function t() {
                            (u -= 1) < -c.width() && (u = m),
                            $(c).css(d, u + "px")
                        }
                        c.children("li").length >= 1 && ($(this).children("li").each(function(t, e) {
                            p += $(e).outerWidth(!0)
                        }),
                        $(this).width(p + 500)),
                        l = setInterval(t, 13),
                        $(c).hover(function() {
                            clearInterval(l)
                        }, function() {
                            l = setInterval(t, 13)
                        })
                    })
                }
                if ("Slider" === s) {
                    if ("random" === n)
                        for (var h = 0; h < $("#right-slider .item").length; h++) {
                            var f = Math.round(Math.random() * $("#right-slider .item").length);
                            $("#right-slider .item:eq(" + f + ")").appendTo($("#right-slider"))
                        }
                    function g() {
                        $("body").attr("data-carousel", !0);
                        var t = {
                            nav: !0,
                            items: 1
                        };
                        t.rtl = "rtl" === BlogDir,
                        t.autoplay = !0,
                        t.autoplayHoverPause = !0,
                        t.dots = !1,
                        t.loop = !0,
                        t.navText = ["", ""],
                        $("#right-slider").owlCarousel(t),
                        LazyImages("data-slider-src", null, !lazy_load)
                    }
                    1 != $("body").attr("data-carousel") ? $.getScript("https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js", g) : g()
                }
            }
        }() : ($(".intro").removeClass("hide"),
        a.find("div").html(errFeed))
    })
}
function setStickySidebar() {
    sticky_aside && $(window).scroll(function() {
        if ($(window).width() > 768) {
            var t = $(".middle-content").offset().top
              , e = $("main").height()
              , a = t + e
              , s = $("aside").height()
              , o = t + s
              , n = $(window).scrollTop()
              , i = $(window).height()
              , r = n + i
              , l = $(".bottom-content").offset().top - 20;
            e > s && r >= o && s > i ? r <= l ? $("aside").css("top", r - o - 20) : $("aside").css("top", l - t - s - 20) : e < s && r >= a && e > i ? r <= l ? $("main").css("top", r - a - 20) : $("main").css("top", l - e - t - 20) : $("main, aside").css("top", "0px")
        } else
            $("main").css("top", 0)
    })
}
function sideFooterWidgets() {
    $(".BouaiciMore").each(function() {
        var t, e = $(this).parent(), a = $(this).closest(".widget").attr("id"), s = $(this).attr("data-label"), n = $(this).attr("data-num"), i = $(this).attr("data-type"), r = new String, l = support_webp ? "https://www.blogger.com/feeds/" + o : "/feeds";
        if (e.addClass("slider-wid"),
        $('.BouaiciMore[data-type="slider"],.BouaiciMore[data-type="vslider"]').closest(".widget").addClass("widget-slider"),
        $('.BouaiciMore[data-type="comments"]').closest(".widget").addClass("widget-comments"),
        $(window).scrollTop() + $(window).height() > e.offset().top && e.parent().not(".done") || !lazy_load) {
            $(this).parent().addClass("done"),
            ("random" === s || "recent" === s || "comments" === s || s in blog_labels) && PostCount > 0 && FeedEnabled && !isPrivate ? function() {
                if ("random" === s || "recent" === s) {
                    n = PostCount - n > 0 ? n : PostCount;
                    var o = Math.round(Math.random() * PostCount - n);
                    o = o <= 0 ? 1 : o
                }
                switch (s) {
                case "recent":
                    r = l + "/posts/summary?alt=json-in-script&max-results=" + n;
                    break;
                case "random":
                    r = l + "/posts/summary?alt=json-in-script&start-index=" + o + "&max-results=" + n;
                    break;
                case "comments":
                    r = l + "/comments/summary?alt=json-in-script&max-results=" + n;
                    break;
                default:
                    r = l + "/posts/summary/-/" + encodeURIComponent(s) + "?alt=json-in-script&max-results=" + n
                }
                "vslider" === i && e.html("<ul class='notr ve-carousel'></ul>");
                "slider" === i && e.html("<ul class='notr owl-carousel'></ul>");
                "thumbs" === i && e.html("<div class='sided-content'></div>");
                "comments" === s && e.html("<div class='recent-comments'></div>");
                if (isStorage)
                    if (void 0 !== sessionStorage[a])
                        p(sessionStorage[a]);
                    else {
                        var d = {};
                        d.url = r,
                        d.dataType = "jsonp",
                        $.ajax(d).done(function(t) {
                            sessionStorage[a] = JSON.stringify(t),
                            p(t)
                        })
                    }
                else {
                    var c = {};
                    c.url = r,
                    c.dataType = "jsonp",
                    $.ajax(c).done(function(t) {
                        p(t)
                    })
                }
                function p(a) {
                    if ((a = "string" == typeof a ? JSON.parse(a) : a).feed.entry) {
                        for (t = 0; t < a.feed.entry.length; t += 1)
                            if (!a.feed.entry[t].app$control) {
                                if ("comments" !== s && ajaxElement(a.feed.entry[t]),
                                "comments" === s && a.feed.entry[t].link.filter(function(t) {
                                    return "alternate" == t.rel
                                })[0]) {
                                    var o = a.feed.entry[t]
                                      , n = o.link.filter(function(t) {
                                        return "alternate" == t.rel
                                    })[0].href
                                      , r = o.summary.$t.replace(/(<.*?>|\[.*?\])/g, "")
                                      , l = o.author[0].name.$t
                                      , d = void 0 !== o.author[0].uri ? a.feed.entry[t].author[0].uri.$t : "#"
                                      , c = o.author[0].gd$image.src
                                      , p = o.gd$extendedProperty.filter(function(t) {
                                        return "blogger.displayTime" == t.name
                                    })[0].value;
                                    l = "Anonymous" === l ? trans[3] : l,
                                    c = (c = -1 == c.indexOf("img1.blogblog.com") ? c : NoUserImage).replace(/\/s.*?\//, "/s40-c/"),
                                    r = r.replace(/(https:\/\/)(www.youtube|youtube|youtu)(.com\/|.be\/).+?(\s|<br.*?>|$)/g, function() {
                                        return '<span class="attachment-mark att-video">' + trans[8] + "</span>"
                                    }).replace(/(https:).+?(jpeg|jpg|gif|png)/g, function() {
                                        return '<span class="attachment-mark att-photo">' + trans[9] + "</span>"
                                    }),
                                    e.find(".recent-comments").append('<div class="comment"><div class="comments-img-content"><img style="opacity:0" class="notr" data-src="' + c + '"/></div><div class="comm"><a class="comm-author" href="' + d + '" target="_blank" rel="nofollow noreferrer">' + l + '</a><div class="details-section"><span class="Date post-date">' + p + "</span></div><p>" + r + '</p><a href="' + n + '" class="leave-touch btn sizes-sm btn-main radius30">' + trans[10] + "</a></div></div>")
                                }
                                "slider" === i && e.find(".owl-carousel").append('<li class="Item notr"><div class="img-content"><img data-carousel-src="' + getImage + '" style="opacity:0" class="notr"/><span class="Category label-name">' + getCategory + '</span><div class="caption"><h2><a href="' + getLink + '">' + getTitle + "</a></h2></div></div></li>"),
                                "vslider" === i && e.find(".ve-carousel").append('<li class="Item notr"><div class="img-content"><img data-vCarousel-src="' + getImage + '" style="opacity:0" class="notr"/><span class="Category label-name">' + getCategory + '</span><div class="caption"><h2><a href="' + getLink + '">' + getTitle + "</a></h2></div></div></li>"),
                                "thumbs" === i && e.find(".sided-content").append('<div class="Item"><a href="' + getLink + '" class="img-content"><img style="opacity:0" class="notr" data-src="' + getImage + '"><span class="Category label-name">' + getCategory + '</span></a><h2><a href="' + getLink + '">' + getTitle + '</a></h2><div class="details-section">' + AuthorHtml + setDate + setComments + "</div></div>")
                            }
                    } else
                        e.html(errFeed);
                    if ("slider" === i) {
                        function m() {
                            var t = {
                                items: 1,
                                nav: !0,
                                dots: !1
                            };
                            t.rtl = "rtl" === BlogDir,
                            t.animateOut = "fadeOut",
                            t.animateIn = "fadeIn",
                            t.autoplayHoverPause = !0,
                            t.autoplay = !0,
                            t.loop = !0,
                            t.navText = [""],
                            t.mouseDrag = !1,
                            e.find("ul").owlCarousel(t),
                            LazyImages("data-carousel-src", null)
                        }
                        1 != $("body").attr("data-carousel") ? $.getScript("https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js", m) : m()
                    }
                    if ("vslider" === i) {
                        var u = {};
                        u.items = max_v_carousel,
                        e.find("ul").vCarousel(u),
                        LazyImages("data-vcarousel-src", null, !0)
                    }
                }
            }() : e.html(errFeed)
        }
    })
}
function setPagination() {
    $(window).one("scroll", function() {
        var t = $(".post-outer").length;
        if (0 === t)
            $("#Pagination").remove();
        else {
            var e, a, s, n, i = support_webp ? "https://www.blogger.com/feeds/" + o : "/feeds";
            for (-1 !== q.indexOf("/search/label/") ? (e = q.match(/\/label\/.+\?/)[0].replace(/\/label\//, "").replace("?", ""),
            n = blog_labels[decodeURIComponent(e)],
            a = i + "/posts/summary/-/" + e) : (n = PostCount,
            a = i + "/posts/summary"),
            $("#Pagination").prepend('<div class="page-inner"></div>'),
            $(".page-inner").prepend('<div class="page-nums"><span class="is-selected">1</span></div>'),
            s = 2; s <= Math.ceil(n / t); s++)
                $("#Pagination .page-nums").append("<span>" + s + "</span>");
            function r() {
                Math.ceil(n / t) > $(".page-nums").width() / 39 ? 0 == $(".page-inner .page-prev").length && $(".page-inner .page-nums").before('<a class="page-prev"></a>').after('<a class="page-next"></a>') : $(".page-inner .page-prev, .page-inner .page-next").remove()
            }
            r(),
            $(window).resize(r)
        }
        $("body").on("click", ".page-next", function() {
            $('.page-nums span:not(".hide-nums"):first').text() != Math.ceil(n / t) - Math.floor($(".page-nums").width() / 39) + 1 && $('.page-nums span:not(".hide-nums"):first').addClass("hide-nums")
        }),
        $("body").on("click", ".page-prev", function() {
            $(".page-nums span.hide-nums:last").removeAttr("class")
        }),
        $("body").on("click", "#Pagination span:not(.is-selected)", function() {
            if (FeedEnabled && !isPrivate) {
                $(".is-selected").removeClass("is-selected"),
                $(this).addClass("is-selected"),
                $(".post-outer").addClass("opac");
                var e = $(".index-posts").height();
                $(".index-posts").css({
                    height: e + "px",
                    "background-color": mainBack,
                    border: "1px solid" + bodyLine,
                    "margin-bottom": "15px",
                    "-webkit-border-radius": "3px",
                    "-moz-border-radius": "3px",
                    "-o-border-radius": "3px",
                    "border-radius": "3px",
                    position: "relative"
                }),
                $(".index-posts").html(""),
                $("main").removeAttr("style"),
                $("html,body").stop().animate({
                    scrollTop: $("#Blog1").offset().top
                }),
                $(".index-posts").append('<div class="loader-Pagination loader-call"></div>');
                var s = $(this).text() * t - t + 1;
                $.get(a + "?alt=json-in-script&max-results=" + t + "&start-index=" + s, function(t) {
                    $(".post-outer").remove(),
                    $(".index-posts").css({
                        height: "auto",
                        "background-color": "transparent",
                        border: 0,
                        "-webkit-border-radius": 0,
                        "-moz-border-radius": 0,
                        "-o-border-radius": 0,
                        "border-radius": 0,
                        "margin-bottom": 0
                    });
                    var e, a = "";
                    for (e = 0; e < t.feed.entry.length; e += 1)
                        t.feed.entry[e].app$control || (ajaxElement(t.feed.entry[e]),
                        getSnippet = getSnippet.substr(0, snippetLength),
                        a += '<div class="post-outer"><div class="post page-nav">',
                        a += '<a class="img-content LazyLoad" href="' + getLink + '" title="' + getTitle + '">',
                        a += '<img alt="' + getTitle + '" data-src="' + getImage + '" title="' + getTitle + '" style="opacity:0" class="notr">',
                        a += '<span class="Category label-title">' + getCategory + "</span>",
                        a += "</a>",
                        a += '<h2 class="post-title Title"><a class="entry-title" href="' + getLink + '" itemprop="name">' + getTitle + "</a></h2>",
                        a += '<div class="details-section">',
                        a += '<a class="Author author-prof" rel="nofollow noreferrer" href="' + getUrlAuthor + '" title="author">' + getNameAuthor + "</a>",
                        a += '<a class="Date post-date" href="' + Format_Archive + '">' + getDate + "</a>" + setComments,
                        a += "</div>",
                        a += '<p class="Snippet">' + getSnippet + "</p>",
                        a += '<div class="footer-post">',
                        a += '<a class="read-more btn sizes-go btn-main radius5" href="' + getLink + '">' + JumpButton + "</a>",
                        a += setPostShare(PostId),
                        a += "</div></div></div>");
                    $(".index-posts").html(a + '<i class="clear"/>'),
                    setCloneHomeAds()
                }, "jsonp")
            }
        })
    })
}
function setCloneHomeAds() {
    repeat_indexad && $(".index-posts .post-outer:nth-of-type(" + repeat_indexad + "n)").each(function() {
        $(this).after($("#HTML305").clone())
    })
}
function setCanvas(t) {
    var e = t.getElementsByTagName("canvas")[0]
      , a = e.width
      , s = e.height
      , o = e.getContext("2d");
    o.lineWidth = 4,
    o.strokeStyle = "#FFFFFF",
    o.shadowBlur = 1,
    o.shadowColor = "rgba(0,0,0,0.3)";
    var n = a / 2
      , i = s / 2
      , r = 0;
    !function t(e) {
        o.clearRect(0, 0, a, s),
        o.beginPath(),
        o.arc(n, i, 20, 0, e, !1),
        o.stroke(),
        ++r < 101 && requestAnimationFrame(function() {
            t(25 * r / 100 + 0)
        })
    }()
}
function setHomeSectionContainer() {
    $(".cate-wrapper").each(function() {
        var t, e = $(this);
        3 === e.find(".section").length ? 0 === e.find(".no-items").length ? t = "three-cols" : 1 === e.find(".no-items").length ? (t = "two-cols",
        e.find(".section:eq(0)").hasClass("no-items") ? e.find(".section:eq(1)").addClass("wide-right") : e.find(".section:eq(1)").hasClass("no-items") ? e.addClass("no-wide") : e.find(".section:eq(2)").hasClass("no-items") && e.find(".section:eq(1)").addClass("wide-left")) : 2 === e.find(".no-items").length ? t = "one-col" : 3 === e.find(".no-items").length && (t = "hide") : 2 === e.find(".section").length && (0 === e.find(".no-items").length ? (t = "two-cols",
        e.addClass("no-wide")) : 1 === e.find(".no-items").length ? t = "one-col" : 2 === e.find(".no-items").length && (t = "hide")),
        e.addClass(t),
        e.find(".no-items").remove()
    })
}
function setHomeSectionAjax() {
    $(".BouaiciCates").each(function() {
        var t, e = $(this).closest(".widget"), a = e.attr("id"), s = new String, n = support_webp ? "https://www.blogger.com/feeds/" + o : "/feeds", i = $(this).attr("data-label"), r = $(this).attr("data-type"), l = e.find(".BouaiciCates").attr("data-num");
        if ($(window).scrollTop() + $(window).height() > $(e).offset().top && !e.is(".done") || !lazy_load) {
            e.addClass("done cate-" + r + " mut-cate");
            var d = "random" === i || "recent" === i ? "/search?max-results=" + numMax : "/search/label/" + i + "?max-results=" + numMax;
            e.find(".headline").append('<a class="btn-more btn btn-main sizes-df radius5" href="' + d + '">' + showMore + "</a>"),
            ("random" === i || "recent" === i || i in blog_labels) && PostCount > 0 && FeedEnabled && !isPrivate ? function() {
                if ("random" === i || "recent" === i) {
                    l = PostCount - l > 0 ? l : PostCount;
                    var o = Math.round(Math.random() * PostCount - l);
                    o = o <= 0 ? 1 : o
                }
                switch (i) {
                case "recent":
                    s = n + "/posts/summary?alt=json-in-script&max-results=" + l;
                    break;
                case "random":
                    s = n + "/posts/summary?alt=json-in-script&start-index=" + o + "&max-results=" + l;
                    break;
                default:
                    s = n + "/posts/summary/-/" + encodeURIComponent(i) + "?alt=json-in-script&max-results=" + l
                }
                if (isStorage)
                    if (void 0 !== sessionStorage[a])
                        p(sessionStorage[a]);
                    else {
                        var d = {};
                        d.url = s,
                        d.dataType = "jsonp",
                        $.ajax(d).done(function(t) {
                            sessionStorage[a] = JSON.stringify(t),
                            p(t)
                        })
                    }
                else {
                    var c = {};
                    c.url = s,
                    c.dataType = "jsonp",
                    $.ajax(c).done(function(t) {
                        p(t)
                    })
                }
                function p(a) {
                    for (e.find(".headline").css("display", "block"),
                    e.find(".BouaiciCates").remove(),
                    a = "string" == typeof a ? JSON.parse(a) : a,
                    t = 0; t < a.feed.entry.length; t += 1) {
                        var s = new String;
                        a.feed.entry[t].app$control || (ajaxElement(a.feed.entry[t]),
                        getSnippet = getSnippet.substr(0, snippetLength) + "...",
                        "mutual" === r && 0 === t && (s += '<div class="mutual-slider"></div>'),
                        s += '<div class="Item">',
                        s += '<a href="' + getLink + '" class="img-content">',
                        s += "carousel" === r ? '<img class="notr" style="opacity:0" data-carousel-src="' + getImage + '"/>' : "mutual" === r ? '<img class="notr" style="opacity:0" data-mutual-src="' + getImage + '"/>' : '<img class="notr" style="opacity:0" data-src="' + getImage + '"/>',
                        "video" === r && (s += '<canvas id="vCanvas" width="50" height="50"/><i class="First fa fa-play"></i><i class="fa fa-play"></i>'),
                        "long" !== r && "cover" !== r && "carousel" !== r || 0 !== t || (s += '<span class="Category label-name">' + getCategory + "</span>"),
                        s += "</a>",
                        s += '<h2 class="Title"><a href="' + getLink + '">' + getTitle + "</a></h2>",
                        "long" !== r && "cover" !== r || 0 !== t || (s += '<div class="details-section">' + AuthorHtml + setDate + setComments + "</div>",
                        s += '<p class="Snippet">' + getSnippet + "</p>",
                        s += '<div class="footer-post">',
                        s += '<a class="read-more btn sizes-go btn-main radius5" href="' + getLink + '">' + JumpButton + "</a>",
                        s += setPostShare(PostId),
                        s += "</div>"),
                        ("long" !== r && "cover" !== r || 0 === t) && "carousel" !== r || (s += '<div class="details-section">' + AuthorHtml + setDate + "</div>"),
                        "video" === r && (s += '<div class="details-section">' + AuthorHtml + setDate + setComments + "</div>",
                        s += '<p class="Snippet">' + getSnippet + "</p>"),
                        s += "</div>",
                        e.find(".widget-content").append(s))
                    }
                    if ("random" === i && "long" !== r && "cover" !== r)
                        for (var o = 0; o < e.find(".Item").length; o++) {
                            var n = Math.round(Math.random() * e.find(".Item").length);
                            e.find(".Item:eq(" + n + ")").appendTo(e.find(".widget-content"))
                        }
                    if ("long" != r && "cover" != r || LazyImages("data-src", null),
                    "mutual" === r) {
                        var l = {};
                        l.Length = a.feed.entry.length,
                        e.Mutual(l)
                    }
                    if ("carousel" === r) {
                        function d() {
                            $("body").attr("data-carousel", !0),
                            e.find(".widget-content").addClass("owl-carousel").owlCarousel({
                                items: Math.round(e.find(".widget-content").outerWidth() / 300),
                                autoplay: !0,
                                autoplayHoverPause: !0,
                                nav: !1,
                                margin: 15,
                                rtl: "rtl" === BlogDir
                            }).find(".owl-wrapper").addClass("notr"),
                            LazyImages("data-carousel-src", null)
                        }
                        1 != $("body").attr("data-carousel") ? $.getScript("https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js", d) : d()
                    }
                    "mutual" !== r && "cover" !== r && "video" !== r || (!e.closest(".cate").hasClass("two-cols") && !e.closest(".cate").hasClass("three-cols") || e.parent().is(".wide-right") || e.parent().is(".wide-left") ? e.find(".widget-content").addClass("full-widget") : e.find(".widget-content").addClass("tight-width")),
                    e.find(".Item b").each(function() {
                        $(this).before('<a rel="nofollow noreferrer" href="' + $(this).attr("href") + '">' + $(this).html() + "</a>").remove()
                    }),
                    $(document).on("mouseenter", ".cate-video .img-content", function() {
                        setCanvas(this)
                    })
                }
            }() : e.find(".widget-content").html(errFeed)
        }
    }),
    $(".cate .HTML:not(.mut-cate) .headline").css("display", "block")
}
function setVCarousel() {
    $.fn.vCarousel = function(t) {
        function e() {
            if (n <= i && n > 0) {
                var t = {};
                t.top = -215 * n,
                a.find(".vCar-wrapper").finish().animate(t)
            } else {
                var e = {
                    top: 0
                };
                a.find(".vCar-wrapper").finish().animate(e),
                n = 0
            }
            n++
        }
        var a = $(this)
          , s = a.find(".Item").length
          , o = s >= t.items ? 200 * t.items + 15 * (t.items - 1) : 200 * s + 15 * (s - 1)
          , n = 1
          , i = s >= t.items ? s - t.items : 0;
        a.html('<div class="vCar-screen notr"><div class="vCar-wrapper notr">' + a.html() + '</div></div><div class="ve-navigations"><button class="vc-prev"></button><button class="vc-next"></button></div>'),
        a.find(".vCar-screen").height(o);
        var r = setInterval(e, time_dur_vCarousel);
        a.find(".vCar-screen").hover(function() {
            clearInterval(r)
        }, function() {
            r = setInterval(e, time_dur_vCarousel)
        }),
        $(a).on("click", ".vc-prev", function() {
            clearInterval(r),
            n -= 2,
            e(),
            r = setInterval(e, time_dur_vCarousel)
        }),
        $(a).on("click", ".vc-next", function() {
            clearInterval(r),
            e(),
            r = setInterval(e, time_dur_vCarousel)
        })
    }
}
function setMutual() {
    $.fn.Mutual = function(t) {
        var e = $(this);
        e.find(".mutual-slider").prepend('<b class="notr m-prog"></b>'),
        $.each(e.find(".img-content"), function() {
            $(this).appendTo(e.find(".mutual-slider")).addClass("notr").css("display", "none")
        }),
        $.each(e.find(".Title"), function() {
            $(this).closest(".Item").text($(this).text())
        }),
        e.find(".Item:first, .img-content:first").addClass("m-selected"),
        e.find(".img-content:first").fadeIn();
        var a = {
            height: "100%"
        };
        $(".m-prog").animate(a, time_dur_mutual);
        var s = 0;
        LazyImages("data-mutual-src", ".mutual-slider");
        var o = setInterval(n, time_dur_mutual);
        function n() {
            i(s = s + 1 == t.Length ? 0 : s + 1);
            var a = {
                height: "100%"
            };
            e.find(".m-prog").stop().css("height", "0px").animate(a, time_dur_mutual)
        }
        function i(t) {
            e.find(".img-content.m-selected").removeClass("m-selected").fadeOut(),
            e.find(".img-content:eq(" + t + ")").addClass("m-selected").fadeIn(),
            e.find(".Item.m-selected").removeClass("m-selected"),
            e.find(".Item:eq(" + t + ")").addClass("m-selected")
        }
        e.hover(function() {
            clearInterval(o);
            var t = {
                height: "0px"
            };
            e.find(".m-prog").stop().animate(t)
        }, function() {
            o = setInterval(n, time_dur_mutual);
            var t = {
                height: "100%"
            };
            e.find(".m-prog").stop().css("height", "0px").animate(t, time_dur_mutual)
        }),
        e.on("click", ".Item", function() {
            i(s = $(this).index() - 1),
            e.find(".m-prog").stop().css("height", "0px")
        })
    }
}
function setZoomText() {
    $(".zooming i").click(function() {
        if ($(this).is(".fa-plus") && !$(this).is(".disb")) {
            var t = parseInt($(".post-body").css("font-size").split("px")[0]);
            $(".post-body").css("font-size", t + 2 + "px"),
            t >= 20 && ($(this).addClass("disb"),
            $(".post-body").css("font-size", "22px")),
            $(".fa-minus").is(".disb") && $(".fa-minus").removeClass("disb")
        } else if ($(this).is(".fa-minus") && !$(this).is(".disb")) {
            t = parseInt($(".post-body").css("font-size").split("px")[0]);
            $(".post-body").css("font-size", t - 2 + "px"),
            t <= 12 && ($(this).addClass("disb"),
            $(".post-body").css("font-size", "10px")),
            $(".fa-plus").is(".disb") && $(".fa-plus").removeClass("disb")
        }
    })
}
function postBodyElements() {
    author_page && $(".topic-author").append('<div class="btn-group group-shapes-ro flexcen radius30"><a class="profile-link btn btn-35 btn-key radius30" href="' + author_page + "?name=" + encodeURI(AuthorName) + '" title="' + trans[15] + '"><i class="fa fa-user"></i></a><span class="author-file radius3">' + trans[16] + '</span><a class="followers-link btn btn-35 btn-key radius30" href="https://www.blogger.com/follow.g?blogID=' + blogId + '" target="_blank" title="' + trans[17] + '"><i class="fa fa-user-plus"></i></a><div>'),
    $(".post-body a").each(function() {
        $(this).is("blockquote a") || $(this).is("#redirect-page a") || $(this).is(".separator a") || $(this).is(".premium-btn") || $(this).is(".Bouaici-button") || $(this).addClass("d-link")
    }),
    $('.separator a:not([href*="bp.blogspot.com"])').click(function() {
        var t = $(this);
        "_blank" == t.attr("target") ? window.open(t.attr("href")) : location.href = t.attr("href")
    })
}
function setTocPost() {
    if (toc_sys && !$(".post-outer").hasClass("divided-post")) {
        var t = $(".post-body").find("h2,h3,h4");
        t.length > 0 && $(".item-page header").after('<div id="TOC"><span>' + trans[20] + "<span class='toggled'/></span><ul></ul></div>"),
        $.each(t, function(t, e) {
            $("#TOC ul").append('<li data-tag="' + e.localName + '"><a href="#head-' + (t + 1) + '">' + $(e).text() + "</a></li>")
        }),
        $("body").on("click", "#TOC a", function(e) {
            e.preventDefault();
            var a = $(this).attr("href").replace("#head-", "")
              , s = t.eq(parseInt(a) - 1)
              , o = menu_fixed ? s.offset().top - $("#" + menu_instanceId).height() : s.offset().top
              , n = {};
            n.scrollTop = o - 15,
            $("html,body").stop().animate(n)
        })
    }
}
function setShareBlockqoute() {
    $(".post-body blockquote").each(function() {
        var t = '<div class="quote-share">';
        if (t += '<a target="_blank" title="share to Facebook" rel="nofollow noreferrer" href="https://www.facebook.com/sharer/sharer.php?v=4&u=' + q + "&quote=" + $(this).text() + '" class="quote-fb"><i class="fa fa-facebook"/></a>',
        $(this).text().length + 23 > 280)
            var e = $(this).text().length + 23 - 280
              , a = $(this).text().substr(0, $(this).text().length - e - 5) + "...";
        else
            a = $(this).text();
        t += '<a target="_blank" title="tweet" rel="nofollow noreferrer" href="https://twitter.com/intent/tweet?url=' + q + "&text=" + a + ' :" class="quote-tw"><i class="fa fa-twitter"/></a>',
        $(this).append(t)
    })
}
function setPrevAndNext() {
    ($(window).scrollTop() + $(window).height() > $(".topic-nav").offset().top && !a0 || !lazy_load) && (a0 = !0,
    $(".next,.prev").each(function() {
        var t = $(this)
          , e = t.attr("href")
          , a = t.hasClass("prev") ? "" + trans[22] : "" + trans[21];
        $.get(e, function(e) {
            var s = $(e).find("meta[name='postPoster']").attr("content");
            s = "" !== s ? s : NoImage,
            s = resizeImg(s, Math.ceil(t.outerWidth() - 20), 150),
            t.html('<span class="next-txt">' + a + "</span><h4>" + $(e).find("meta[name='postTitle']").attr("content") + "</h4>")
        })
    }))
}
function setAdsAndAuthorPost() {
    var t, e = AuthorsInfo.filter(function(t) {
        return t.name === AuthorName
    })[0], a = ($(".post-body [dir]").length ? $(".post-body [dir]") : $(".post-body")).find("*").not("pre *,ins *,iframe *,blockquote *,ul *,ol *,.separator *,br,table, table *,.ContactForm, .ContactForm *,.premium, .premium *"), s = Math.floor(a.length / 2), o = !!e && e.provided;
    if (e && o)
        var n = e["top-ad"] ? e["top-ad"] : AuthorsInfo["top-ad"] ? AuthorsInfo["top-ad"] : ""
          , i = e["mid-ad"] ? e["mid-ad"] : AuthorsInfo["mid-ad"] ? AuthorsInfo["mid-ad"] : ""
          , r = e["bot-ad"] ? e["bot-ad"] : AuthorsInfo["bot-ad"] ? AuthorsInfo["bot-ad"] : ""
          , l = e["str-ad"] ? e["str-ad"] : AuthorsInfo["str-ad"] ? AuthorsInfo["str-ad"] : ""
          , d = e["pgn-ad"] ? e["pgn-ad"] : AuthorsInfo["pgn-ad"] ? AuthorsInfo["pgn-ad"] : ""
          , c = e["rlt-ad"] ? e["rlt-ad"] : AuthorsInfo["rlt-ad"] ? AuthorsInfo["rlt-ad"] : ""
          , p = e["cmt-ad"] ? e["cmt-ad"] : AuthorsInfo["cmt-ad"] ? AuthorsInfo["cmt-ad"] : ""
          , m = e["end-ad"] ? e["end-ad"] : AuthorsInfo["end-ad"] ? AuthorsInfo["end-ad"] : "";
    else
        n = AuthorsInfo["top-ad"] ? AuthorsInfo["top-ad"] : "",
        i = AuthorsInfo["mid-ad"] ? AuthorsInfo["mid-ad"] : "",
        r = AuthorsInfo["bot-ad"] ? AuthorsInfo["bot-ad"] : "",
        l = AuthorsInfo["str-ad"] ? AuthorsInfo["str-ad"] : "",
        d = AuthorsInfo["pgn-ad"] ? AuthorsInfo["pgn-ad"] : "",
        c = AuthorsInfo["rlt-ad"] ? AuthorsInfo["rlt-ad"] : "",
        p = AuthorsInfo["cmt-ad"] ? AuthorsInfo["cmt-ad"] : "",
        m = AuthorsInfo["end-ad"] ? AuthorsInfo["end-ad"] : "";
    ($(".item-page header").after('<div class="article-ad">' + n + "</div>"),
    $(".post-body").after('<div class="article-ad">' + r + "</div>"),
    $(".item-page header").before('<div class="article-ad">' + l + "</div>"),
    PagedPost && $(".post-pages").after('<div class="article-ad">' + d + "</div>"),
    $(".topic-related").before('<div class="article-ad">' + c + "</div>"),
    $("#item-comments").before('<div class="article-ad">' + p + "</div>"),
    $(".item-page footer").after('<div class="article-ad">' + m + "</div>"),
    i = -1 !== i.indexOf("width") ? '<div class="Middle-Ad fixedAd">' + i + "</div>" : '<div class="Middle-Ad">' + i + "</div>",
    repeat_midad && !PagedPost && $(".post-body").find("h2,h3,h4,h5,h6").length > 0 ? $(".post-body").find("h2,h3,h4,h5,h6").each(function() {
        $(this).before(i)
    }) : a.eq(s).after(i),
    e && o) && ($(".topic-author .space-html").after((e.rank,
    "<span class='author-rank radius100px'>" + e.rank + "</span>")),
    $(".topic-author .author-rank").after((e.label,
    "<i class='clear-left'></i><span class='text-main-label'>" + trans[14] + "</span>: <a class='author-label radius3' href='" + HomeUrl + "search/label/" + e.label + "'>" + e.label + "</a>")),
    $(".topic-author .author-about").html(e.about ? e.about : ""),
    $.each(e.links, function(e, a) {
        t = -1 != SVGicon.indexOf(e) ? '<a class="radius30 fa fa-' + e + '" href="' + a + '"><svg><use xlink:href="#ic-' + e + '"/></svg></a>' : '<a class="radius30 fa fa-' + e + '" href="' + a + '"></a>',
        $(".topic-author .social").append(t)
    }),
    $(".topic-author").fadeIn(0))
}
function setRelatedPost() {
    document.querySelector(".toggled").onclick = function() {
        document.querySelector("#TOC").classList.toggle("showToc")
    }
    ;
    if ($(window).scrollTop() + $(window).height() > $(".topic-related").offset().top && !a2 || !lazy_load) {
        a2 = !0;
        var t, e, a, s = support_webp ? "https://www.blogger.com/feeds/" + o : "/feeds", n = (new String,
        $(".categ a:eq(1)").text()), i = max_related - blog_labels[n] > PostCount ? PostCount : max_related - blog_labels[n];
        function r(e, a) {
            for (t = 0; t < a; t += 1) {
                if (!e.feed.entry[t].app$control)
                    ajaxElement(e.feed.entry[t]),
                    $(".related-carousel").append('<div class="Item"><a href="' + getLink + '" class="img-content"><img style="opacity:0" class="rel-img notr" data-rel-src="' + getImage + '"/><span class="Category">' + getCategory + '</span></a><div class="details-section">' + AuthorHtml + setDate + '</div><h4><a href="' + getLink + '">' + getTitle + "</a></h4></div>")
            }
        }
        function l() {
            function t() {
                $("body").attr("data-carousel", "true"),
                $(".related-carousel").owlCarousel({
                    items: Math.round($(".related-carousel").outerWidth() / 280),
                    autoplay: !0,
                    autoplayHoverPause: !0,
                    margin: 15,
                    rtl: "rtl" === BlogDir,
                    dots: !1
                }).find(".owl-wrapper").addClass("notr"),
                LazyImages("data-rel-src")
            }
            1 != $("body").attr("data-carousel") ? $.getScript("https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js", t) : t()
        }
        FeedEnabled && !isPrivate && (e = n ? s + "/posts/summary/-/" + encodeURIComponent(n) + "?alt=json-in-script&max-results=" + max_related : s + "/posts/summary/?alt=json-in-script&max-results=" + max_related,
        $.get(e, function(t) {
            r(t, t.feed.entry.length)
        }, "jsonp").done(function() {
            i > 0 ? (a = s + "/posts/summary?alt=json-in-script&max-results=" + i,
            $.get(a, function(t) {
                r(t, t.feed.entry.length)
            }, "jsonp").done(function() {
                l()
            })) : l()
        }))
    }
}
function setCommentsBlog() {
    if (AllowComments) {
        if ($(window).scrollTop() > $(".topic-comments").offset().top - 1e3 && !$(".topic-comments").hasClass("rendered") || !lazy_load) {
            $(".topic-comments").addClass("rendered");
            var aG = comment_system.split("-");
            function aH(t) {
                t.html(t.html().replace(/(https:).+?(jpeg|jpg|gif|png|\s)/g, function(t) {
                    return t.match(/(https:).+?(jpeg|jpg|gif|png)/) ? '<img src="' + t + '"/>' : t
                })),
                t.html(t.html().replace(/(https:\/\/)(www.youtube|youtube|youtu)(.com\/|.be\/).+?(\s|<br.*?>|$)/g, function(t) {
                    return -1 !== t.indexOf("watch?v") && (t = t.replace("watch?v=", "embed/")),
                    -1 !== t.indexOf("youtu.be") && (t = "https://www.youtube.com/embed/" + t.split("be/")[1]),
                    -1 !== t.indexOf("&amp;") && (t = t.replace("&amp;", "?")),
                    '<iframe src="' + t + '"></iframe>'
                }))
            }
            function aI(t) {
                t.length < 200 && $("#loadmore").remove();
                var e = $(".comments-list > ul > li.comment:last").clone()[0].outerHTML;
                $.each(t, function(t, a) {
                    var s = $(e);
                    s.find(".comment-replies ul").empty();
                    var o = a.authorPhoto ? a.authorPhoto.thumbUrl : -1 != a.authorAvatarSrc.indexOf("blank") ? NoUserImage : a.authorAvatarSrc;
                    o = a.inReplyTo ? resizeImg(o, 40, 40) : resizeImg(o, 72, 72),
                    $(s).attr("id", a.anchorName),
                    $(s).find(".user a").attr("href", a.authorUrl).text(a.author),
                    $(s).find(".avatar-image-container img").attr("src", o).attr("alt", a.author + "'s avatar"),
                    $(s).find(".com-date").attr("data-date", a.timestampAbs).text(a.timestamp),
                    $(s).find(".comment-content").html(a.body),
                    option_comments && aH($(s).find(".comment-content")),
                    $(s).find(".comment-reply").attr("data-comment-id", a.id),
                    $(s).find(".blog-admin").attr("class", "blog-admin " + a.commentAuthorClass).find("a").attr("href", a.deleteUrl),
                    a.inReplyTo ? ($(s).find(".comment-reply").parent().remove(),
                    0 == $("#" + a.anchorName).length && $("#c" + a.inReplyTo + "> .comment-replies > ul").append($(s)[0].outerHTML)) : $(".comments-list > ul").append($(s)[0].outerHTML)
                })
            }
            $.each(aG, function(aJ, aK) {
                if ("blogger" === aK) {
                    if ($(".comments-bar").append("<li data-bar='blogger' class='radius3'> " + trans[23] + " Blogger</li>"),
                    $(".comments-tabs").append("<div class='notr blogger-tab'/>"),
                    $(".blogger-tab").append($("div.comments#comments")),
                    AllowNew)
                        if ($("#comment-editor").attr("src", $("#comment-editor").attr("data-src")),
                        0 == $("#comments-respond").find("script").length) {
                            var aL = $("#comments-respond").contents().filter(function() {
                                return 8 == this.nodeType
                            })[0].data.replace(/<!--||-->/g, "")
                              , aM = new DOMParser
                              , aN = aM.parseFromString(aL, "text/html");
                            $.getScript(aN.head.children[0].src, function() {
                                eval(aN.head.children[1].innerHTML),
                                setTimeout(function() {
                                    $("#comments-respond").append($("#comment-editor"))
                                }, 1e3)
                            })
                        } else
                            $("#comments-respond").append($("#comment-editor"))
                } else if ("facebook" === aK)
                    $(".comments-bar").append("<li data-bar='facebook' class='radius3'> " + trans[23] + " Facebook</li>"),
                    $(".comments-tabs").append('<div class="notr facebook-tab"><div class="fb-comments" data-href="' + CanUrl + '" data-width="100%" data-numposts="5"></div></div>'),
                    $.getScript("//connect.facebook.net/ar_AR/sdk.js", function() {
                        var t = {};
                        t.appId = face_id,
                        t.version = "v3.3",
                        FB.init(t),
                        FB.XFBML.parse(),
                        $("body").attr("data-facebook", !0)
                    });
                else if ("disqus" === aK) {
                    $(".comments-bar").append("<li data-bar='disqus' class='radius3'> " + trans[23] + " Disqus</li>"),
                    $(".comments-tabs").append("<div class='notr disqus-tab'><div id='disqus_thread'/></div>");
                    var aO = document.createElement("script");
                    aO.type = "text/javascript",
                    aO.defer = !0,
                    aO.setAttribute("data-timestamp", +new Date),
                    aO.src = "//" + disqus_id + ".disqus.com/embed.js",
                    (document.head || document.body).appendChild(aO)
                }
            }),
            -1 == comment_system.indexOf("blogger") && $("#comments.comments").remove(),
            $(".comments-bar li:first").addClass("active"),
            $(".comments-tabs div:first").addClass("default"),
            $(".comments-bar li").click(function() {
                if ("disqus" === $(this).attr("data-bar") && 1 != $("body").attr("data-disqus")) {
                    var t = {
                        reload: !0
                    };
                    DISQUS.reset(t),
                    $("body").attr("data-disqus", !0)
                }
                $("." + $(this).data("bar") + "-tab").slideDown(),
                $(this).addClass("active").siblings("li").removeClass("active"),
                $(".topic-comments").find(".comments-tabs").children("div").not($("." + $(this).data("bar") + "-tab")).slideUp()
            }),
            AllowNew ? $(document).on("click", ".comment-reply", function() {
                var t = $(this).attr("data-comment-id");
                $(this).closest(".comment").append($("#comment-editor")),
                $("#comment-editor").attr("src", $("#comment-editor").attr("src") + "&parentID=" + t)
            }) : $(".comment-reply").remove(),
            $(".comments-show a").click(function(t) {
                var e = $(".comments-tabs")
                  , a = $(".comment-replies");
                a.addClass("notr"),
                $(this).addClass("active").siblings("a").removeClass("active"),
                $(this).hasClass("comments-only") ? $(this).parentsUntil(e).find(a).slideUp() : $(this).parentsUntil(e).find(a).slideDown(),
                t.preventDefault()
            }),
            $(".go-respond").click(function() {
                -1 !== $("#comment-editor").attr("src").indexOf("parentID") && ($("#comment-editor").attr("src", $("#comment-editor").attr("src").replace(/&parent.*/, "")),
                $("#comments-respond").append($("#comment-editor")))
            }),
            $(".noimg").each(function() {
                $(this).after('<img data-src="' + NoUserImage + '">'),
                $(this).remove()
            }),
            option_comments && $(".comment-content").each(function() {
                aH($(this))
            }),
            $("#loadmore").click(function() {
                _WidgetManager._HandleControllerResult = function(t, e, a) {
                    aI(a.comments)
                }
                ,
                $.get(location.pathname + "?action=getComments&widgetId=Blog1&widgetType=Blog&responseType=js&postId=" + itemId + "&publishedMin=" + $(".com-date:last").data("date") + "&xssi_token=" + window.__wavt)
            })
        }
    } else
        $("#comments,#item-comments").remove()
}
function staticPageElements() {
    if ($(".post-contact-form").after($("#ContactForm302")),
    $("pre.Bouaici-code").each(function() {
        for (var t = document.querySelectorAll("var,samp,strong,em,code,pre,kbd,blockquote,value,textarea"), e = 0; e < t.length; e++)
            t[e].addEventListener("dblclick", function() {
                var t = getSelection()
                  , e = document.createRange();
                e.selectNodeContents(this),
                t.removeAllRanges(),
                t.addRange(e)
            }, !1);
        var a, s = -1 != $(this).html().indexOf("\n") ? $(this).html().split("\n") : $(this).html().split("<br>"), o = new String, n = new String;
        for (a = 0; a < s.length; a++)
            a !== s.length && "" !== s[a] && (o += "<span>" + (a + 1) + "</span>"),
            n += "<code>" + s[a] + "</code>";
        $(this).html('<div class="code-sn">' + o + '</div><pre class="Bouaici-source">' + n + "</div>")
    }),
    $(".premium").length > 0) {
        if (-1 !== q.indexOf("?") && -1 !== q.split("&") && !0 === localStorage.getItem("lock-" + itemId)) {
            var t, e = q.split("?")[1].split("&"), a = e.filter(function(t) {
                return "id" === t.split("=")[0]
            })[0], s = e.filter(function(t) {
                return "referrer" === t.split("=")[0]
            })[0], o = void 0 !== s ? s.split("=")[1] : void 0, n = void 0 !== a ? a.split("=")[1] : void 0, i = document.referrer;
            n == itemId && "facebook" == o || "twitter" == o && -1 !== i.indexOf("facebook.com") || -1 !== i.indexOf("t.co") ? (localStorage.setItem("lock-" + itemId, !1),
            t = !1) : (localStorage.setItem("lock-" + itemId, !0),
            t = !0)
        } else
            !1 === localStorage.getItem("lock-" + itemId) ? t = !1 : (localStorage.setItem("lock-" + itemId, !0),
            t = !0);
        !0 === t ? $(".post-body .premium").each(function() {
            $(this);
            $(this).html('<textarea class="hide">' + $(this).html() + "</textarea>");
            var t, e = "https://www.facebook.com/sharer.php?u=" + encodeURIComponent(CanUrl + "?id=" + itemId + "&referrer=facebook"), a = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(CanUrl + "?id=" + itemId + "&referrer=twitter");
            t = '<h6 class="premium-title"> ' + trans[24] + " </h6>",
            t += '<span class="premium-des"> ' + trans[25] + " </span>",
            t += '<a title="share to Facebook" target="blank" href="' + e + '" class="premium-btn premium-btn-facebook">Facebook</a>',
            t += '<a title="tweet" target="blank" href="' + a + '" class="premium-btn premium-btn-twitter">Twitter</a>',
            $(this).css("display", "block").html(t)
        }) : !1 === t && $(".premium").removeClass("premium")
    }
}
function setArshivePage() {
    $("#archive-page").length > 0 && $.each(blog_labels, function(t, e) {
        var a, s = new String, n = Math.ceil(e / 150), i = decodeURI(t), r = 0;
        $(".post-body").append('<div class="archive-label" data-label="' + i + '"><div class="archive-label-name"><b class="radius100px">' + i + '</b><span class="archive-label-count">' + e + " <u> " + trans[26] + " </u></span></div></div>"),
        FeedEnabled && !isPrivate && function t() {
            if (r !== n) {
                var e = support_webp ? "https://www.blogger.com/feeds/" + o : "/feeds"
                  , l = {};
                l.url = e + "/posts/summary/-/" + encodeURIComponent(i) + "?alt=json-in-script&max-results=150&start-index=" + (150 * r + 1),
                l.dataType = "jsonp",
                $.ajax(l).done(function(e) {
                    for (a = 0; a < e.feed.entry.length; a += 1)
                        if (!e.feed.entry[a].app$control) {
                            ajaxElement(e.feed.entry[a]);
                            s += '<div class="archive-item">';
                            s += '<img class="archive-thumb" src="' + resizeImg(getImage, 72, 72) + '"/>',
                            s += '<span class="archive-date">' + getDate + "</span>",
                            void 0 !== e.feed.entry[a].category[1] && (s += '<span class="archive-cate radius30">' + e.feed.entry[a].category.filter(function(t) {
                                return t.term != i
                            })[0].term + "</span>"),
                            s += '<a class="archive-link" href="' + getLink + '">' + getTitle + "</a>",
                            s += "</div>"
                        }
                    $('.archive-label[data-label="' + i + '"]').append(s),
                    s = "",
                    r += 1,
                    t(),
                    console.log(r)
                }, "jsonp")
            }
        }()
    })
}
function setAuthorsPage() {
    var t;
    $("#authors-page").length > 0 && (placeA5(location.href).name ? (window.Aup_Posts_Content = new String,
    window.Aup_Name = decodeURI(placeA5(location.href).name).replace(/\+/g, " "),
    window.Aup_Info = AuthorsInfo.filter(function(t) {
        return t.name == Aup_Name
    })[0],
    console.log(placeA5(location.href).name),
    window.Aup_avatar = Aup_Info.avatar || NoUserImage,
    Aup_avatar = resizeImg(Aup_avatar, 160, 160, "-cc"),
    document.title = Aup_Name,
    $(".static-page .entry-title").text("" + trans[16]),
    $(".post-body").html('<div class="au-wrapper"><div class="au-head"><div class="au-photo" style="background-image:url(' + Aup_avatar + ')"/></div><h1 class="au-name">' + Aup_Name + '</h1><span class="au-ranked"></span><p class="au-about"/><div class="au-social social"/><div class="au-posts"/>'),
    Aup_Info && (Aup_Info.about && $(".au-about").html(Aup_Info.about),
    Aup_Info.rank && $(".au-ranked").html("<b>" + Aup_Info.rank + "</b>"),
    Aup_Info.label && $(".au-ranked").after('<div class="au-label"><span class="text-main-label">' + trans[14] + '</span>: <a class="author-label radius3" href="' + HomeUrl + "search/label/" + Aup_Info.label + '">' + Aup_Info.label + "</a></div>"),
    Object.keys(Aup_Info.links).length > 0 && $.each(Aup_Info.links, function(e, a) {
        t = -1 != SVGicon.indexOf(e) ? '<a class="fa fa-' + e + '" href="' + a + '"><svg><use xlink:href="#ic-' + e + '"/></svg></a>' : '<a class="fa fa-' + e + '" href="' + a + '"></a>',
        $(".au-social").append(t)
    })),
    FeedEnabled && !isPrivate && setPostboxAuthor()) : FeedEnabled && !isPrivate && setAuthorIndvPage())
}
function setPostboxAuthor() {
    if (W === feed_count) {
        var t = $(".postbox-month");
        $(".postbox-item").each(function() {
            var e = $(this)
              , a = t.filter(function() {
                return $(this).attr("data-month") == e.attr("data-month")
            })[0];
            e.appendTo(a)
        }),
        t.has(".postbox-item").find(".hide").removeClass("hide"),
        t.not(t.has(".postbox-item")).remove()
    } else {
        var e = support_webp ? "https://www.blogger.com/feeds/" + o : "/feeds"
          , a = {};
        a.url = e + "/posts/summary?alt=json-in-script&max-results=150&start-index=" + (150 * W + 1),
        a.dataType = "jsonp",
        $.ajax(a).done(function(t) {
            for (; X < t.feed.entry.length; X += 1)
                t.feed.entry[X].app$control || (ajaxElement(t.feed.entry[X]),
                getNameAuthor === Aup_Name && (Aup_Posts_Content += '<div class="postbox-month" data-month="' + setMonth(getPublisher) + " " + getPublisher.substr(0, 4) + '">',
                Aup_Posts_Content += '<div class="postbox-mohth-name hide"><span>' + setMonth(getPublisher) + " " + getPublisher.substr(0, 4) + "</span></div>",
                Aup_Posts_Content += '<div class="clear"></div>',
                Aup_Posts_Content += '<div class="postbox-item" data-month="' + setMonth(getPublisher) + " " + getPublisher.substr(0, 4) + '">',
                Aup_Posts_Content += '<div class="postbox-post">',
                Aup_Posts_Content += '<img class="postbox-thumb" src="' + resizeImg(getImage, 250, 180, "-cc") + '"/>',
                Aup_Posts_Content += "</div>",
                Aup_Posts_Content += '<span class="postbox-date">',
                Aup_Posts_Content += "<b>" + getPublisher.substr(8, 2) + "</b>",
                Aup_Posts_Content += "<i>" + setMonth(getPublisher) + " " + getPublisher.substr(0, 4) + "</i>",
                Aup_Posts_Content += "</span>",
                Aup_Posts_Content += '<a class="postbox-title" href="' + getLink + '">' + getTitle + "</a>",
                Aup_Posts_Content += "</div>",
                Aup_Posts_Content += "</div>"));
            $(".au-posts").append(Aup_Posts_Content),
            Aup_Posts_Content = "",
            W += 1,
            setPostboxAuthor()
        })
    }
}
function setAuthorIndvPage() {
    if (W === feed_count)
        $(".post-body").html('<div class="blog-authors"/>'),
        $.each(AuthorsInfo, function(t, e) {
            var a, s = new String, o = e.avatar || NoUserImage, n = location.pathname + "?name=" + e.name;
            s += '<div class="blog-author-card" data-blog-author="' + e.name + '">',
            s += '<div class="blog-author-social social"></div>',
            s += '<span class="blog-author-avatar radius100" style="background-image:url(' + resizeImg(o, 120, 120, "-cc") + ')"/>',
            s += '<b class="blog-author-name">' + e.name + "</b>",
            s += '<div class="clear-left"></div>',
            s += e.rank ? '<b class="blog-author-rank radius30">' + e.rank + "</b>" : "",
            s += '<div class="clear-left"></div>',
            s += e.label ? '<span class="text-main-label">' + trans[14] + '</span>: <a class="author-label radius3" href="' + HomeUrl + "search/label/" + e.label + '">' + e.label + "</a>" : "",
            s += '<div class="clear"></div>',
            s += '<div class="footer-card-author">',
            s += '<b class="blog-author-count">' + e.count + " " + trans[26] + " </b>",
            s += '<div class="btn-group group-shapes-ro flexcen radius30"><a class="profile-link btn btn-35 btn-key radius30" href="' + n + '" title="' + trans[15] + '"><i class="fa fa-user"></i></a><span class="author-file radius3">' + trans[16] + '</span><a class="followers-link btn btn-35 btn-key radius30" href="https://www.blogger.com/follow.g?blogID=' + blogId + '" target="_blank" title="' + trans[17] + '"><i class="fa fa-user-plus"></i></a><div>',
            s += "</div>",
            s += "</div>",
            $(".blog-authors").append(s),
            e.links && $.each(e.links, function(t, s) {
                a = -1 != SVGicon.indexOf(t) ? '<a class="radius30 fa fa-' + t + '" href="' + s + '"><svg><use xlink:href="#ic-' + t + '"/></svg></a>' : '<a class="radius30 fa fa-' + t + '" href="' + s + '"></a>',
                $('[data-blog-author="' + e.name + '"] .blog-author-social').append(a)
            })
        });
    else {
        var t = {};
        t.url = "/feeds/posts/summary?alt=json-in-script&max-results=150&start-index=" + (150 * W + 1),
        t.dataType = "jsonp",
        $.ajax(t).done(function(t) {
            for (X = 0; X < t.feed.entry.length; X += 1) {
                var e = AuthorsInfo.filter(function(e) {
                    return e.name === t.feed.entry[X].author[0].name.$t.toString()
                })[0];
                if (e)
                    e.count += 1;
                else {
                    var a = {};
                    a.name = t.feed.entry[X].author[0].name.$t,
                    a.avatar = t.feed.entry[X].author[0].gd$image ? t.feed.entry[X].author[0].gd$image.src : NoUserImage,
                    a.count = 1,
                    a.provided = !1,
                    AuthorsInfo.push(a)
                }
            }
            W += 1,
            setAuthorIndvPage()
        })
    }
}
function redirectPage() {
    var t = "undefined" != typeof BouaiciRedirect ? BouaiciRedirect : {}
      , e = void 0 === t["allow-redirect"] || t["allow-redirect"]
      , a = void 0 !== t["redirect-mydomains"] && t["redirect-mydomains"]
      , s = t["name-class"] || ".post-body"
      , o = t["name-page"] || "redirect"
      , n = void 0 !== t.timer ? t.timer : 10
      , i = t["ads-text"] || ""
      , r = t["ads-img"] || ""
      , l = t["ads-google"] || ""
      , d = t["block-redirect"] || "facebook.com|youtube.com|mail.google.com|instagram.com|twitter.com|linkedin.com|deviantart.com|codepen.io|pinterest.com|dribbble.com|behance.net|digg.net|dropbox.com|skype.com|tumblr.com|vimeo.com|flickr.com|github.com|vk.com|weibo.com"
      , c = t.themes || "progress"
      , p = void 0 !== t["redirect-auto"] && t["redirect-auto"]
      , m = {
        convertHTML: function(t) {
            return t = (t = (t = (t = (t = t.replace(/&amp;/g, "&")).replace(/&#039;/g, "'")).replace(/&quot;/g, '"')).replace(/&lt;/g, "<")).replace(/&gt;/g, ">")
        },
        getGUID: function(t) {
            return "xxhxhxxxxxhx".replace(/[xh]/g, function(t) {
                var e = 16 * Math.random() | 0
                  , a = ("x" == t ? e : 3 & e | 8).toString(8);
                return a
            })
        }
    };
    e && $("#Bouaici-redirect").length > 0 && (new function() {
        var t = this
          , e = 0 < i.length ? i.split("|") : r.split("|")
          , a = e[0]
          , s = e[1]
          , n = e[2];
        this.seconds = 0,
        this.count = 0,
        this.degrees = 0,
        this.interval = null,
        this.timerContainer = null,
        this.number = null,
        this.slice = null,
        this.pie = null,
        this.pieRight = null,
        this.pieLeft = null,
        this.quarter = null,
        this.reload = null,
        this.feed = null,
        this.history = "/p/" + o + ".html",
        this.adsHTML = i ? "<a href='" + s + "' rel='" + n + "' target='_blank'><p>" + a + "</p></a>" : r ? "<a href='" + s + "' rel='" + n + "' target='_blank'><img src='" + a + "'/></a>" : l ? "<div class='parent-Ads eq-ad-header ad-w720-h90'>" + m.convertHTML(l) + "</div>" : "<p>" + trans[31] + "</p>",
        this.timerHTML = "<div class='clom radialads'>" + t.adsHTML + "</div><div class='clom radialtimer " + c + "'><div class='re-outer'><div class='n'></div><div class='slice'><div class='q'></div><div class='pie r'></div><div class='pie l'></div></div></div></div><div class='clom radialbtn'><a class='areload radius5 sizes-lg btn btn-mouse' data-href='false' id='btn_reload'>" + trans[28] + "</a></div><div class='clom feed'></div>",
        this.ranQuerydata = function() {
            var e = t.getQueryVariable("redirect-url");
            e && ("undefined" != typeof Storage ? t.reload.data("orig-link", localStorage.getItem(e)) : (t.reload.data("orig-link", e),
            history.pushState(null, "", t.history)))
        }
        ,
        this.getQueryVariable = function(t) {
            var e, a = window.location.search.split("?&" + t + "=");
            if (a.length > 1)
                for (e = 0; e < a.length; e++)
                    return a[1].split(/&m=0|&m=1/g)[0];
            return !1
        }
        ,
        this.ranQuerybtn = function() {
            var e = t.reload.data("orig-link");
            e ? p ? t.geturidownload(e) : (t.reload.attr("href", e),
            t.reload.html("" + trans[29]),
            t.reload.addClass("btn-main")) : (t.reload.attr("href", "javascript:void(0)"),
            t.reload.html("" + trans[30]),
            t.reload.addClass("btn-disabled"))
        }
        ,
        this.init = function(e, a) {
            t.timerContainer = $(e),
            t.timerContainer.html(t.timerHTML),
            t.number = t.timerContainer.find(".n"),
            t.slice = t.timerContainer.find(".slice"),
            t.pie = t.timerContainer.find(".pie"),
            t.pieRight = t.timerContainer.find(".pie.r"),
            t.pieLeft = t.timerContainer.find(".pie.l"),
            t.quarter = t.timerContainer.find(".q"),
            t.reload = t.timerContainer.find(".areload"),
            t.feed = t.timerContainer.find(".feed"),
            t.ranQuerydata(),
            t.start(a)
        }
        ,
        this.start = function(e) {
            t.seconds = e,
            t.interval = window.setInterval(function() {
                "rotate" == c ? (t.number.html(t.seconds - 1 - t.count),
                t.count++,
                t.count >= t.seconds && clearInterval(t.interval),
                t.degrees = t.degrees + 360 / t.seconds,
                t.count >= t.seconds / 2 ? (t.slice.addClass("nc"),
                t.slice.hasClass("mth") || t.pieRight.css({
                    transform: "rotate(180deg)"
                }),
                t.pieLeft.css({
                    transform: "rotate(" + t.degrees + "deg)"
                }),
                t.slice.addClass("mth"),
                t.count >= .75 * t.seconds && t.quarter.remove(),
                t.seconds == t.count && t.ranQuerybtn()) : t.pie.css({
                    transform: "rotate(" + t.degrees + "deg)"
                })) : "scale" == c ? (t.number.html(t.seconds - 1 - t.count),
                t.count++,
                t.count >= t.seconds && clearInterval(t.interval),
                t.degrees = t.degrees + 1 / t.seconds,
                t.count >= t.seconds / 2 ? (t.slice.addClass("nc"),
                t.slice.hasClass("mth") || t.pieRight.css({
                    transform: "scale(0)"
                }),
                t.pieLeft.css({
                    transform: "scale(" + t.degrees + ")"
                }),
                t.slice.addClass("mth"),
                t.count >= .75 * t.seconds && t.quarter.remove(),
                t.seconds == t.count && t.ranQuerybtn()) : t.pie.css({
                    transform: "scale(" + t.degrees + ")"
                }),
                t.number.css({
                    transform: "scale(" + t.degrees + ")"
                })) : "progress" == c && (t.number.html(t.seconds - 1 - t.count),
                t.count++,
                t.count >= t.seconds && clearInterval(t.interval),
                t.degrees = t.degrees + 200 / t.seconds,
                t.count >= t.seconds / 2 ? (t.slice.addClass("nc"),
                t.slice.hasClass("mth") || t.pieRight.css({
                    width: "0px"
                }),
                t.pieLeft.css({
                    width: t.degrees + "px"
                }),
                t.slice.addClass("mth"),
                t.count >= .75 * t.seconds && t.quarter.remove(),
                t.seconds == t.count && t.ranQuerybtn()) : t.pie.css({
                    width: t.degrees + "px"
                }))
            }, 1e3)
        }
        ,
        this.geturidownload = function(t) {
            t && setTimeout(function() {
                window.location.href = t
            }, 1e3)
        }
    }
    ).init("#Bouaici-redirect", n),
    $(s + " a").each(function(t) {
        var s, n, i = $(this).attr("href"), r = window.location.origin + "/p/" + o + ".html";
        !1 === a && (n = "|" + window.location.hostname),
        s = new RegExp("(" + d + "|blogger.com|bp.blogspot.com|whatsapp:|mailto:|javascript:|#" + n + ")"),
        0 <= this.href.match(s) && i && e && ($(this).attr("href", "javascript:;").removeAttr("target"),
        "undefined" != typeof Storage ? $(this).on("click", function(t) {
            t.preventDefault();
            var e, a = m.getGUID();
            for (e = 0; e < localStorage.length; e++) {
                var s = localStorage.getItem(localStorage.key(e));
                s && s === i && (a = localStorage.key(e))
            }
            localStorage.setItem(a, i),
            window.open(r + "?&redirect-url=" + a, "_blank")
        }) : ($(this).data("orig-link", i),
        $(this).on("click", function(t) {
            t.preventDefault(),
            window.open(r + "?&redirect-url=" + $(this).data("orig-link"), "_blank")
        })))
    })
}
if (a3.cache = !0,
$.ajaxSetup(a3),
!isMobile && !1 !== BouaiciSet.Tooltip) {
    $("[title]").addClass("Tooltip");
    var $body = $("body");
    $(".text-tooltip").length > -1 && ($(".text-tooltip").remove(),
    $body.append($('<span class="text-tooltip notr"></span>'))),
    $(".Tooltip").hover(function(t) {
        var e = $(this).attr("title");
        $(this).data("tiptext", e).removeAttr("title");
        var a = $("body").hasClass("rtl") ? t.pageX - ($(".text-tooltip").width() + 10) : t.pageX - 10
          , s = t.pageY + 20;
        $(".text-tooltip").text(e).css({
            top: s,
            left: a
        }).fadeIn(0)
    }, function() {
        $(this).attr("title", $(this).data("tiptext")),
        $(".text-tooltip").css({
            top: 0,
            left: 0
        }).fadeOut(0)
    }).mousemove(function(t) {
        var e = $("body").hasClass("rtl") ? t.pageX - ($(".text-tooltip").width() + 10) : t.pageX - 10
          , a = t.pageY + 20;
        $(".text-tooltip").css({
            top: a,
            left: e
        }).fadeIn(0)
    }),
    $(window).scroll(function() {
        $(".text-tooltip:visible") && $(".text-tooltip").css({
            top: 0,
            left: 0
        }).fadeOut(0)
    })
}
if (document.querySelector("#dark-mode")) {
    var _0x1ad8 = ['documentElement', '472172GgEVuI', 'test', '2ymahvb', '^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}', 'getItem', '19apUJYD', '584525chgSOs', 'dark-mode', 'getAttribute', 'apply', 'setAttribute', '208CRzlAf', '(prefers-color-scheme:\x20light)', '189594ieYMcO', 'matchMedia', '143612FaKnHr', '2704WVXcjR', 'getElementById', '1Stjfgc', 'class', 'onclick', 'Bouaici-dark', 'light', '304683yVRqat', '122693iIyojj', 'constructor', 'theme'];
    var _0x327723 = _0x11b5;
    function _0x11b5(_0x2de07c, _0x48ac35) {
        _0x2de07c = _0x2de07c - 0x0;
        var _0x335491 = _0x1ad8[_0x2de07c];
        return _0x335491;
    }
    (function(_0x3a97e5, _0x370408) {
        var _0x5db012 = _0x11b5;
        while (!![]) {
            try {
                var _0x433929 = -parseInt(_0x5db012(0x5)) * parseInt(_0x5db012(0x0)) + -parseInt(_0x5db012(0x2)) + -parseInt(_0x5db012(0xd)) * parseInt(_0x5db012(0x13)) + parseInt(_0x5db012(0xc)) * -parseInt(_0x5db012(0x7)) + -parseInt(_0x5db012(0x17)) + -parseInt(_0x5db012(0x11)) + parseInt(_0x5db012(0x4)) * parseInt(_0x5db012(0x16));
                if (_0x433929 === _0x370408)
                    break;
                else
                    _0x3a97e5['push'](_0x3a97e5['shift']());
            } catch (_0x59ffef) {
                _0x3a97e5['push'](_0x3a97e5['shift']());
            }
        }
    }(_0x1ad8, 0x5a4ac));
    var _0x164c56 = function() {
        var _0x4d8c9 = !![];
        return function(_0x22d5a, _0x46ab8a) {
            var _0x2eb43f = _0x4d8c9 ? function() {
                var _0x5f3df6 = _0x11b5;
                if (_0x46ab8a) {
                    var _0x18477e = _0x46ab8a[_0x5f3df6(0x1a)](_0x22d5a, arguments);
                    return _0x46ab8a = null,
                    _0x18477e;
                }
            }
            : function() {}
            ;
            return _0x4d8c9 = ![],
            _0x2eb43f;
        }
        ;
    }()
      , _0x335491 = _0x164c56(this, function() {
        var _0x39fbee = function() {
            var _0x4ea91c = _0x11b5
              , _0x41fcf2 = _0x39fbee[_0x4ea91c(0xe)]('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()[_0x4ea91c(0xe)](_0x4ea91c(0x14));
            return !_0x41fcf2[_0x4ea91c(0x12)](_0x335491);
        };
        return _0x39fbee();
    });
    _0x335491();
    var toggle = document[_0x327723(0x6)](_0x327723(0x18))
      , storedTheme = localStorage[_0x327723(0x15)](_0x327723(0xf)) || (window[_0x327723(0x3)](_0x327723(0x1))['matches'] ? 'light' : _0x327723(0xb));
    storedTheme && document['documentElement'][_0x327723(0x1b)](_0x327723(0x8), storedTheme),
    toggle[_0x327723(0x9)] = function() {
        var _0xe7279e = _0x327723
          , _0x1f8e21 = document[_0xe7279e(0x10)][_0xe7279e(0x19)]('class')
          , _0x37b485 = _0xe7279e(0xb);
        _0xe7279e(0xb) === _0x1f8e21 && (_0x37b485 = _0xe7279e(0xa)),
        document[_0xe7279e(0x10)][_0xe7279e(0x1b)](_0xe7279e(0x8), _0x37b485),
        localStorage['setItem'](_0xe7279e(0xf), _0x37b485);
    }
    ;
}
if (document.querySelector(".post-random")) {
    if (Randomd === true) {
        var Remdoqscr = document.querySelector("#RandomPosts");
        setInterval(function() {
            document.querySelector(".Middle-Ad").after(Remdoqscr);
        }, 0);
    }
    if (Randomtop === true) {
        document.querySelector("#top-red").after(document.querySelector("#RandomPosts"))
    }
    if (Randombot === true) {
        document.querySelector("#bot-red").after(document.querySelector("#RandomPosts"))
    }
}
 ;
