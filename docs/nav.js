(function () {
  var PAGES = [
    { id: 'index', file: 'index.html', title: 'Okładka', group: 'Start' },
    { id: 'koncepcja', file: 'koncepcja.html', title: 'Koncepcja', group: 'Produkt' },
    { id: 'struktura', file: 'struktura.html', title: 'Struktura produktu', group: 'Produkt' },
    { id: 'mapa-umiejetnosci', file: 'mapa-umiejetnosci.html', title: 'Mapa umiejętności', group: 'Produkt' },
    { id: 'tryby', file: 'tryby.html', title: 'Tryby i pomoc', group: 'Produkt' },
    { id: 'ocena-ai', file: 'ocena-ai.html', title: 'Typ błędu i ocena AI', group: 'Produkt' },
    { id: 'dane-cke', file: 'dane-cke.html', title: 'Dane z CKE', group: 'Podstawy' },
    { id: 'przedmioty', file: 'przedmioty.html', title: 'Przedmioty', group: 'Podstawy' },
    { id: 'konkurs', file: 'konkurs.html', title: 'Konkurs', group: 'Projekt' },
    { id: 'pytania', file: 'pytania.html', title: 'Do ustalenia', group: 'Projekt' }
  ];
  PAGES.forEach(function (p, i) { p.num = (i < 10 ? '0' : '') + i; });

  var seg = location.pathname.split('/').pop().replace(/\.html$/, '') || 'index';
  var cur = 0;
  PAGES.forEach(function (p, i) { if (p.id === seg) cur = i; });
  var page = PAGES[cur];

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function slug(s) {
    var map = { 'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z' };
    return s.toLowerCase().replace(/[ąćęłńóśźż]/g, function (c) { return map[c]; })
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  var main = document.querySelector('main');
  if (!main) return;

  var heads = [].slice.call(main.querySelectorAll('h2'));
  heads.forEach(function (h) { if (!h.id) h.id = slug(h.textContent); });

  if (location.hash) { var t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) setTimeout(function () { t.scrollIntoView(); }, 0); }

  var side = el('aside', 'side');
  side.id = 'side';
  var brand = el('a', 'brand', '[nazwa]<small>zarys projektu</small>');
  brand.href = 'index.html';
  side.appendChild(brand);

  var nav = el('nav');
  var group = null;
  PAGES.forEach(function (p, i) {
    if (p.group !== group) {
      group = p.group;
      nav.appendChild(el('div', 'grp', group));
    }
    var a = el('a', 'item' + (i === cur ? ' on' : ''), '<span class="n">' + p.num + '</span><span>' + p.title + '</span>');
    a.href = p.file;
    if (i === cur) a.setAttribute('aria-current', 'page');
    nav.appendChild(a);
    if (i === cur && heads.length && i !== 0) {
      var ul = el('div', 'toc');
      heads.forEach(function (h) {
        var l = el('a', null, h.textContent);
        l.href = '#' + h.id;
        l.dataset.target = h.id;
        ul.appendChild(l);
      });
      nav.appendChild(ul);
    }
  });
  side.appendChild(nav);
  side.appendChild(el('div', 'side-foot', 'Konkurs „Sztuczna inteligencja wśród nas”<br>Zgłoszenie do 29 XI 2026'));

  var bar = el('div', 'mbar');
  var btn = el('button', null, '<span></span><span></span><span></span>');
  btn.setAttribute('aria-label', 'Menu');
  bar.appendChild(btn);
  bar.appendChild(el('b', null, '[nazwa]'));
  bar.appendChild(el('span', 'mt', page.title));
  var shade = el('div', 'shade');

  document.body.prepend(shade);
  document.body.prepend(side);
  document.body.prepend(bar);

  function toggle(open) { document.body.classList.toggle('menu-open', open); }
  btn.addEventListener('click', function () { toggle(!document.body.classList.contains('menu-open')); });
  shade.addEventListener('click', function () { toggle(false); });
  side.addEventListener('click', function (e) { if (e.target.closest('a')) toggle(false); });

  var h1 = main.querySelector('h1');
  if (h1 && cur !== 0) h1.parentNode.insertBefore(el('div', 'eyebrow', page.num + ' &nbsp;/&nbsp; ' + page.group), h1);

  var prev = PAGES[cur - 1], next = PAGES[cur + 1];
  var pager = el('div', 'pager');
  if (prev) {
    var pa = el('a', 'prev', '<small>← ' + prev.num + '</small>' + prev.title);
    pa.href = prev.file;
    pager.appendChild(pa);
  } else {
    pager.appendChild(el('span'));
  }
  if (next) {
    var na = el('a', 'next', '<small>' + next.num + ' →</small>' + next.title);
    na.href = next.file;
    pager.appendChild(na);
  }
  main.parentNode.insertBefore(pager, main.nextSibling);

  var links = {};
  [].forEach.call(side.querySelectorAll('.toc a'), function (a) { links[a.dataset.target] = a; });
  if ('IntersectionObserver' in window && heads.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          [].forEach.call(side.querySelectorAll('.toc a.on'), function (a) { a.classList.remove('on'); });
          if (links[en.target.id]) links[en.target.id].classList.add('on');
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px' });
    heads.forEach(function (h) { io.observe(h); });
  }
})();
