/* Kumar Classes — motion and enquiry handoff */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* curtain */
  var curtain = $('#curtain');
  if (curtain) {
    if (reduced) { curtain.parentNode.removeChild(curtain); }
    else setTimeout(function () {
      curtain.classList.add('done');
      setTimeout(function () { if (curtain.parentNode) curtain.parentNode.removeChild(curtain); }, 900);
    }, 1250);
  }

  /* split headline — keeps <br> line breaks */
  $$('.split').forEach(function (el) {
    var lines = el.innerHTML.split(/<br\s*\/?>/i).map(function (chunk) {
      var d = document.createElement('div');
      d.innerHTML = chunk;
      return (d.textContent || '').replace(/\s+/g, ' ').trim();
    }).filter(function (l) { return l.length; });

    el.textContent = '';
    var i = 0;
    lines.forEach(function (line, li) {
      var words = line.split(' ');
      words.forEach(function (word, wi) {
        var w = document.createElement('span');
        w.style.display = 'inline-block';
        w.style.whiteSpace = 'nowrap';
        Array.prototype.forEach.call(word, function (ch) {
          var s = document.createElement('span');
          s.className = 'ch';
          s.textContent = ch;
          s.style.animationDelay = (reduced ? 0 : 0.5 + i * 0.03) + 's';
          w.appendChild(s);
          i++;
        });
        el.appendChild(w);
        if (wi < words.length - 1) { el.appendChild(document.createTextNode(' ')); i++; }
      });
      if (li < lines.length - 1) el.appendChild(document.createElement('br'));
    });
    el.setAttribute('aria-label', lines.join(' '));
  });

  /* header + progress */
  var header = $('#siteHeader'), bar = $('#progressBar');
  var onScroll = function () {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('stuck', y > 30);
    if (bar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + '%';
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* nav */
  var burger = $('#burger'), nav = $('#nav');
  if (burger && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', function () { setOpen(burger.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); burger.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 760 && nav.classList.contains('open')) setOpen(false); });
  }

  /* reveals */
  var items = $$('.reveal, .reveal-img');
  if (!('IntersectionObserver' in window) || reduced) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var sibs = el.parentElement ? Array.prototype.slice.call(el.parentElement.children) : [];
        el.style.transitionDelay = Math.min(Math.max(0, sibs.indexOf(el)) * 65, 260) + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* enquiry form -> WhatsApp */
  var form = $('#enquiryForm');
  if (form) {
    var WA = '917030293982';
    var msgEl = $('#enquiryMsg');
    var digits = function (v) { return (v || '').replace(/\D/g, ''); };
    var mark = function (input, ok) { input.classList.toggle('invalid', !ok); return ok; };
    var say = function (text, ok) {
      if (!msgEl) return;
      msgEl.textContent = text;
      msgEl.classList.toggle('ok', !!ok);
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#eq-name'), phone = $('#eq-phone');
      var klass = $('#eq-class'), board = $('#eq-board'), time = $('#eq-time'), subject = $('#eq-subject');

      var okName = mark(name, name.value.trim().length > 1);
      var okPhone = mark(phone, digits(phone.value).length >= 10);

      if (!(okName && okPhone)) {
        say('Please add the student\u2019s name and a 10-digit phone number.', false);
        (!okName ? name : phone).focus();
        return;
      }

      var lines = [
        'Demo class enquiry — Kumar Classes',
        '',
        'Student: ' + name.value.trim(),
        'Phone: ' + phone.value.trim(),
        'Class: ' + klass.value,
        'Board: ' + board.value,
        'Preferred time: ' + time.value
      ];
      if (subject.value.trim()) lines.push('Subject: ' + subject.value.trim());

      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
      say('Opening WhatsApp with the enquiry filled in. Send it and the academy will reply.', true);
    });

    $$('input, select', form).forEach(function (el) {
      el.addEventListener('input', function () { el.classList.remove('invalid'); });
    });
  }
})();
