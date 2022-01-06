import '@salla.sa/twilight-components';
import '@salla.sa/twilight';
import CartListeners from './partials/cart-listeners';
import MobileMenu from 'mmenu-light';
import Swal from "sweetalert2";
import Anime from './partials/anime';

class App extends salla.AppHelpers {
    constructor() {
        super();
        this.isThemeApp = true;//to make sure that window.app, is this class
        this.registerWindowProperties();
        salla.onReady(() => this.loadTheApp());
    }

    /**
     * @param key
     * @return {*}
     */
    pageData(key) {
        let data = salla.config.page || {};
        return key ? data[key] : data;
    }

    isUser() {
        return salla.config.is_user;
    }

    registerWindowProperties() {
        window.app = this;
    }

    loadTheApp() {
        this.log('Initiating...');
        this.initiateNotifier();
        this.initiateLazyLoad();
        this.initiateMobileMenu();
        this.initiateStickyMenu();
        CartListeners();
        this.initiateWishlistButtons();
        this.initiateAdAlert();
        this.initiateDropdowns();
        this.initiateModals();
        this.initiateCommons();
        this.log('Loaded 🎉');
    }

    log(message) {
        salla.log(`ThemeApp(${salla.config.theme.name})::${message}`);
        return this;
    }

    initiateCommons() {
        salla.currency.event.onChanged(() => window.location.reload());
        document.querySelectorAll('.btn--has-loading').forEach(btn => {
            btn.addEventListener('click', () => btn.classList.add('btn--is-loading'));
        });

        const nextPageBtn = document.getElementById('next-page-btn');

        // salla.event.on('infiniteScroll::request', function () {
        //     //document.querySelector('.loading-status-wrapper .spinner-loader-wrap').classList.remove('hidden');
        // })

        salla.event.on('infiniteScroll::load', () => this.removeClass('#next-page-btn', 'btn--is-loading').hideElement('.loading-status-wrapper .loader-status'))

        this.anime('.anime-count', {scale: [0.5, 1]});
    }

    initiateNotifier() {
        salla.notify.setNotifier(function (message, type, data) {
            if (typeof message == 'object') {
                return Swal.fire(message).then(type);
            }
            return Swal.mixin({
                toast            : true,
                position         : window.is_rtl ? 'top-start' : 'top-end',
                showConfirmButton: false,
                timer            : 3500,
                didOpen          : (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            }).fire({
                icon            : type,
                title           : message,
                showCloseButton : true,
                timerProgressBar: true
            })
        });
    }

    initiateMobileMenu() {
        const menu = new MobileMenu(this.element("#mobile-menu"), "(max-width: 1024px)", "( slidingSubmenus: false)");
        menu.navigation({title: salla.lang.get('blocks.header.main_menu')});
        const drawer = menu.offcanvas({position: salla.config.is_rtl ? "right" : 'left'});

        this.onClick("a[href='#mobile-menu']", event => event.preventDefault() || drawer.close() || drawer.open());
        this.onClick(".close-mobile-menu", event => event.preventDefault() || drawer.close());
    }

    initiateLazyLoad() {
        let imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                let src;
                if (!entry.isIntersecting || !(src = entry.target.dataset.src)) {
                    return;
                }
                // assign image source to src attribute
                try {
                    entry.target.classList.contains('lazy-background')
                        ? entry.target.style.backgroundImage = `url('${src}')`
                        : entry.target.src = src;
                } catch (e) {
                    salla.log(`Failed to load image (${src})!`, e.message);
                }
                app.toggleElement(entry.target, 'loaded', 'lazy-load lazy-background', () => true);
                observer.unobserve(entry.target);
            });
        }, {threshold: 0, trackVisibility: true, delay: 100, rootMargin: "250px 250px 250px 250px"});
        window.LazyLoad = () => document.querySelectorAll(".lazy-load, .lazy-background").forEach(entry => imgObserver.observe(entry));
        LazyLoad(); //fire it for the first time;
        salla.infiniteScroll.event.onAppend(LazyLoad); //fire it after each load more request;
    }

    initiateStickyMenu() {
        let header = this.element('#site-header-outer');
        let height = this.element('.site-header').clientHeight;
        header.style.height = height + 'px';

        window.addEventListener('scroll', () => {
            window.scrollY >= header.offsetTop + height ? header.classList.add('fixed-pinned', 'animated') : header.classList.remove('fixed-pinned');
            window.scrollY >= 200 ? header.classList.add('fixed-header') : header.classList.remove('fixed-header', 'animated');
        }, {passive: true});
    }

    initiateAdAlert() {
        let ad = this.element("#s-theme_ad");

        if (!ad) {
            return;
        }

        if (!localStorage.getItem('statusAd-' + ad.dataset.id)) {
            ad.classList.remove('hidden');
        }

        this.onClick('.ad-close', function (event) {
            event.preventDefault();
            localStorage.setItem('statusAd-' + ad.dataset.id, 'dismissed');

            anime({
                targets : '#s-theme_ad',
                opacity : [1, 0],
                duration: 300,
                height  : [ad.clientHeight, 0],
                easing  : 'easeInOutQuad',
            });
        });
    }

    initiateDropdowns() {
        this.onClick('.dropdown__trigger', ({target: btn}) => {
            btn.parentElement.classList.toggle('is-opened');
            document.body.classList.toggle('dropdown--is-opened');
            // Click Outside || Click on close btn
            window.addEventListener('click', ({target: element}) => {
                if (!element.closest('.dropdown__menu') && element !== btn || element.classList.contains('dropdown__close')) {
                    btn.parentElement.classList.remove('is-opened');
                    document.body.classList.remove('dropdown--is-opened');
                }
            });
        });
    }

    initiateModals() {
        this.onClick('[data-modal-trigger]', event => {
            let id = '#' + event.target.dataset.modalTrigger;
            this.removeClass(id, 'hidden');
            setTimeout(() => this.toggleModal(id, true)); //small amont of time to running toggle After adding hidden
        });
        this.onClick("[data-close-modal]", event => this.toggleModal('#' + event.target.dataset.closeModal, false));
    }

    toggleModal(id, isOpen) {
        this.toggle(`${id} .modal__overlay`, 'ease-out duration-300 opacity-100', 'opacity-0', () => isOpen);
        this.toggle(`${id} .modal__body`,
            'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100', //add these classes
            'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95', //remove these classes
            () => isOpen);
        app.toggleElement(document.body, 'modal-is-open', 'modal-is-closed', () => isOpen);
        if (!isOpen) {
            setTimeout(() => this.addClass(id, 'hidden'), 350);
        }
    }

    /**
     * Workaround for seeking to simplify & clean, There are three ways to use this method:
     * 1- direct call: `this.anime('.my-selector')` - will use default values
     * 2- direct call with overriding defaults: `this.anime('.my-selector', {duration:3000})`
     * 3- return object to play it leter: `this.anime('.my-selector', false).duration(3000).play()` - will not play animation unless calling play method.
     * @param {string} selector
     * @param {object|undefined|null|null} options - in case there is need to set attributes one by one set it `false`;
     * @return {Anime|*}
     */
    anime(selector, options = null) {
        let anime = new Anime(selector, options);
        return options === false ? anime : anime.play();
    }


    // ======================= Wishlist Icons in Product Cards ======================= //
    initiateWishlistButtons() {
        app.onClick('.wishlist-btn', event => event.target.classList.add('is--loading'));
        localStore.get("salla-wishlist", []).forEach(id => this.toggalFavorites(id, true));

        salla.wishlist.event.onAdded((event, id) => this.updateWishlist(id, true));
        salla.wishlist.event.onRemoved((event, id) => this.updateWishlist(id, false));
    }

    updateWishlist(id, isAdded) {
        let wishlist = localStore.get("salla-wishlist", []);
        isAdded ? wishlist.push(id) : wishlist.splice(wishlist.indexOf(id), 1);
        localStore.set("salla-wishlist", wishlist);
        toggalFavorites(id, isAdded);
    }

    toggalFavorites(id, isAdded) {
        document.querySelectorAll('.wishlist-btn[data-id="' + id + '"]')
            .forEach(btn => {
                app.toggleElement(btn.querySelector('i'), 'sicon-heart-off', 'sicon-heart', () => isAdded);
                app.toggleElement(btn, ['text-primary', 'pulse'], 'un-favorited', () => isAdded);
                btn.dataset.onClick = isAdded ? 'wishlist::remove' : 'wishlist::add';
                btn.classList.remove('is--loading');
            });
    }
}


new App;