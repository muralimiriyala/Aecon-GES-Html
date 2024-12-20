!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
      ? define(['exports'], e)
      : e(((t = t || self).window = t.window || {}))
})(this, function (t) {
  'use strict'
  function e() {
    return 'undefined' != typeof window
  }
  function i() {
    return s || (e() && (s = window.gsap) && s.registerPlugin && s)
  }
  function d(t) {
    return Math.round(1e4 * t) / 1e4
  }
  function c(t) {
    return parseFloat(t) || 0
  }
  function u(t, e) {
    var i = c(t)
    return ~t.indexOf('%') ? (i / 100) * e : i
  }
  function h(t, e) {
    return c(t.getAttribute(e))
  }
  function f(t, e, i, s, n, o) {
    return C(Math.pow((c(i) - c(t)) * n, 2) + Math.pow((c(s) - c(e)) * o, 2))
  }
  function m(t) {
    console.warn(t)
  }
  function g(t) {
    return 'non-scaling-stroke' === t.getAttribute('vector-effect')
  }
  function p(t) {
    if (!(t = b(t)[0])) return 0
    var e,
      i,
      s,
      n,
      o = t.tagName.toLowerCase(),
      r = t.style,
      a = 1,
      l = 1
    g(t) &&
      ((l = t.getScreenCTM()),
      (a = C(l.a * l.a + l.b * l.b)),
      (l = C(l.d * l.d + l.c * l.c)))
    try {
      n = t.getBBox()
    } catch (t) {
      m(
        "Some browsers won't measure invisible elements (like display:none or masks inside defs).",
      )
    }
    var d = n || { x: 0, y: 0, width: 0, height: 0 },
      c = d.x,
      u = d.y,
      p = d.width,
      d = d.height
    if (
      ((n && (p || d)) ||
        !T[o] ||
        ((p = h(t, T[o][0])),
        (d = h(t, T[o][1])),
        'rect' !== o && 'line' !== o && ((p *= 2), (d *= 2)),
        'line' === o &&
          ((c = h(t, 'x1')),
          (u = h(t, 'y1')),
          (p = Math.abs(p - c)),
          (d = Math.abs(d - u)))),
      'path' === o)
    )
      (n = r.strokeDasharray),
        (r.strokeDasharray = 'none'),
        (e = t.getTotalLength() || 0),
        a !== l &&
          m(
            "Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled.",
          ),
        (e *= (a + l) / 2),
        (r.strokeDasharray = n)
    else if ('rect' === o) e = 2 * p * a + 2 * d * l
    else if ('line' === o) e = f(c, u, c + p, u + d, a, l)
    else if ('polyline' === o || 'polygon' === o)
      for (
        i = t.getAttribute('points').match(k) || [],
          'polygon' === o && i.push(i[0], i[1]),
          e = 0,
          s = 2;
        s < i.length;
        s += 2
      )
        e += f(i[s - 2], i[s - 1], i[s], i[s + 1], a, l) || 0
    else
      ('circle' !== o && 'ellipse' !== o) ||
        ((r = (p / 2) * a),
        (n = (d / 2) * l),
        (e = Math.PI * (3 * (r + n) - C((3 * r + n) * (r + 3 * n)))))
    return e || 0
  }
  function v(t, e) {
    if (!(t = b(t)[0])) return [0, 0]
    e = e || p(t) + 1
    var t = w.getComputedStyle(t),
      i = t.strokeDasharray || '',
      t = c(t.strokeDashoffset),
      s = i.indexOf(',')
    return [
      -t || 0,
      (i =
        e < (i = (s = s < 0 ? i.indexOf(' ') : s) < 0 ? e : c(i.substr(0, s)))
          ? e
          : i) - t || 0,
    ]
  }
  function y() {
    e() &&
      ((w = window),
      (x = s = i()),
      (b = s.utils.toArray),
      (_ = -1 !== ((w.navigator || {}).userAgent || '').indexOf('Edge')))
  }
  var s,
    b,
    w,
    _,
    x,
    k = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
    T = {
      rect: ['width', 'height'],
      circle: ['r', 'r'],
      ellipse: ['rx', 'ry'],
      line: ['x2', 'y2'],
    },
    C = Math.sqrt,
    n = {
      version: '3.6.1',
      name: 'drawSVG',
      register: function (t) {
        ;(s = t), y()
      },
      init: function (t, e) {
        if (!t.getBBox) return !1
        x || y()
        var i,
          s,
          n,
          o,
          r,
          a,
          l = p(t)
        return (
          (this._style = t.style),
          (this._target = t),
          e + '' == 'true'
            ? (e = '0 100%')
            : e
              ? -1 === (e + '').indexOf(' ') && (e = '0 ' + e)
              : (e = '0 0'),
          (s = e),
          (o = (i = v(t, (n = l)))[0]),
          (r = s.indexOf(' ')),
          (o =
            r < 0
              ? ((a = void 0 !== o ? o + '' : s), s)
              : ((a = s.substr(0, r)), s.substr(r + 1))),
          (a = u(a, n)),
          (s = (o = u(o, n)) < a ? [o, a] : [a, o]),
          (this._length = d(l)),
          (this._dash = d(i[1] - i[0])),
          (this._offset = d(-i[0])),
          (this._dashPT = this.add(this, '_dash', this._dash, d(s[1] - s[0]))),
          (this._offsetPT = this.add(this, '_offset', this._offset, d(-s[0]))),
          _ &&
            (r = w.getComputedStyle(t)).strokeLinecap !== r.strokeLinejoin &&
            ((s = c(r.strokeMiterlimit)),
            this.add(t.style, 'strokeMiterlimit', s, s + 0.01)),
          (this._live = g(t) || ~(e + '').indexOf('live')),
          (this._nowrap = ~(e + '').indexOf('nowrap')),
          this._props.push('drawSVG'),
          1
        )
      },
      render: function (t, e) {
        var i,
          s,
          n,
          o = e._pt,
          r = e._style
        if (o) {
          for (
            e._live &&
            (i = p(e._target)) !== e._length &&
            ((s = i / e._length),
            (e._length = i),
            e._offsetPT && ((e._offsetPT.s *= s), (e._offsetPT.c *= s)),
            e._dashPT
              ? ((e._dashPT.s *= s), (e._dashPT.c *= s))
              : (e._dash *= s));
            o;

          )
            o.r(t, o.d), (o = o._next)
          ;(s = e._dash || (t && 1 !== t ? 1e-4 : 0)),
            (i = e._length - s + 0.1),
            (n = e._offset),
            s &&
              n &&
              s + Math.abs(n % e._length) > e._length - 0.2 &&
              (n += n < 0 ? 0.1 : -0.1) &&
              (i += 0.1),
            (r.strokeDashoffset = s ? n : n + 0.001),
            (r.strokeDasharray =
              i < 0.2
                ? 'none'
                : s
                  ? s + 'px,' + (e._nowrap ? 999999 : i) + 'px'
                  : '0px, 999999px')
        }
      },
      getLength: p,
      getPosition: v,
    }
  i() && s.registerPlugin(n),
    (t.DrawSVGPlugin = n),
    (t.default = n),
    'undefined' == typeof window || window !== t
      ? Object.defineProperty(t, '__esModule', { value: !0 })
      : delete t.default
}),
  (function (t, e) {
    'object' == typeof exports && 'undefined' != typeof module
      ? e(exports)
      : 'function' == typeof define && define.amd
        ? define(['exports'], e)
        : e(((t = t || self).window = t.window || {}))
  })(this, function (t) {
    'use strict'
    function i(t, e) {
      ;(t.prototype = Object.create(e.prototype)),
        ((t.prototype.constructor = t).__proto__ = e)
    }
    function $(t) {
      if (void 0 === t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        )
      return t
    }
    function H(t) {
      return 'string' == typeof t
    }
    function u(t) {
      return 'function' == typeof t
    }
    function K(t) {
      return 'number' == typeof t
    }
    function o(t) {
      return void 0 === t
    }
    function P(t) {
      return 'object' == typeof t
    }
    function z(t) {
      return !1 !== t
    }
    function a() {
      return 'undefined' != typeof window
    }
    function Z(t) {
      return u(t) || H(t)
    }
    function s(t) {
      return (Gt = Ft(t, r)) && m
    }
    function J(t, e) {
      return console.warn(
        'Invalid property',
        t,
        'set to',
        e,
        'Missing plugin? gsap.registerPlugin()',
      )
    }
    function tt(t, e) {
      return !e && console.warn(t)
    }
    function g(t, e) {
      return (t && (r[t] = e) && Gt && (Gt[t] = e)) || r
    }
    function v() {
      return 0
    }
    function et(t) {
      var e,
        i,
        s = t[0]
      if ((P(s) || u(s) || (t = [t]), !(e = (s._gsap || {}).harness))) {
        for (i = Ve.length; i-- && !Ve[i].targetTest(s); );
        e = Ve[i]
      }
      for (i = t.length; i--; )
        (t[i] && (t[i]._gsap || (t[i]._gsap = new Je(t[i], e)))) ||
          t.splice(i, 1)
      return t
    }
    function it(t) {
      return t._gsap || et(B(t))[0]._gsap
    }
    function y(t, e, i) {
      return (i = t[e]) && u(i)
        ? t[e]()
        : (o(i) && t.getAttribute && t.getAttribute(e)) || i
    }
    function h(t, e) {
      return (t = t.split(',')).forEach(e) || t
    }
    function L(t) {
      return Math.round(1e5 * t) / 1e5 || 0
    }
    function O(t) {
      return Math.round(1e7 * t) / 1e7 || 0
    }
    function st(t, e) {
      var i = e.charAt(0),
        e = parseFloat(e.substr(2))
      return (
        (t = parseFloat(t)),
        '+' === i ? t + e : '-' === i ? t - e : '*' === i ? t * e : t / e
      )
    }
    function nt() {
      var t,
        e,
        i = $e.length,
        s = $e.slice(0)
      for (ze = {}, t = $e.length = 0; t < i; t++)
        (e = s[t]) &&
          e._lazy &&
          (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
    }
    function b(t, e, i, s) {
      $e.length && !V && nt(),
        t.render(e, i, s || (V && e < 0 && (t._initted || t._startAt))),
        $e.length && !V && nt()
    }
    function w(t) {
      var e = parseFloat(t)
      return (e || 0 === e) && (t + '').match(Oe).length < 2
        ? e
        : H(t)
          ? t.trim()
          : t
    }
    function x(t) {
      return t
    }
    function D(t, e) {
      for (var i in e) i in t || (t[i] = e[i])
      return t
    }
    function k(t, e) {
      for (var i in e)
        '__proto__' !== i &&
          'constructor' !== i &&
          'prototype' !== i &&
          (t[i] = P(e[i]) ? k(t[i] || (t[i] = {}), e[i]) : e[i])
      return t
    }
    function ot(t, e) {
      var i,
        s = {}
      for (i in t) i in e || (s[i] = t[i])
      return s
    }
    function rt(t) {
      var s,
        e = t.parent || j,
        i = t.keyframes
          ? ((s = A(t.keyframes)),
            function (t, e) {
              for (var i in e)
                i in t ||
                  ('duration' === i && s) ||
                  'ease' === i ||
                  (t[i] = e[i])
            })
          : D
      if (z(t.inherit))
        for (; e; ) i(t, e.vars.defaults), (e = e.parent || e._dp)
      return t
    }
    function T(t, e, i, s, n) {
      void 0 === i && (i = '_first')
      var o,
        r = t[(s = void 0 === s ? '_last' : s)]
      if (n) for (o = e[n]; r && r[n] > o; ) r = r._prev
      r ? ((e._next = r._next), (r._next = e)) : ((e._next = t[i]), (t[i] = e)),
        e._next ? (e._next._prev = e) : (t[s] = e),
        (e._prev = r),
        (e.parent = e._dp = t)
    }
    function C(t, e, i, s) {
      void 0 === i && (i = '_first'), void 0 === s && (s = '_last')
      var n = e._prev,
        o = e._next
      n ? (n._next = o) : t[i] === e && (t[i] = o),
        o ? (o._prev = n) : t[s] === e && (t[s] = n),
        (e._next = e._prev = e.parent = null)
    }
    function at(t, e) {
      t.parent &&
        (!e || t.parent.autoRemoveChildren) &&
        t.parent.remove &&
        t.parent.remove(t),
        (t._act = 0)
    }
    function S(t, e) {
      if (t && (!e || e._end > t._dur || e._start < 0))
        for (var i = t; i; ) (i._dirty = 1), (i = i.parent)
      return t
    }
    function lt(t, e, i, s) {
      t._startAt &&
        (V
          ? t._startAt.revert(Be)
          : (t.vars.immediateRender && !t.vars.autoRevert) ||
            t._startAt.render(e, !0, s))
    }
    function dt(t) {
      return t._repeat ? Nt(t._tTime, (t = t.duration() + t._rDelay)) * t : 0
    }
    function ct(t, e) {
      return (
        (t - e._start) * e._ts +
        (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur)
      )
    }
    function ut(t) {
      t._end = O(t._start + (t._tDur / Math.abs(t._ts || t._rts || U) || 0))
    }
    function pt(t, e) {
      var i = t._dp
      i &&
        i.smoothChildTiming &&
        t._ts &&
        ((t._start = O(
          i._time -
            (0 < t._ts
              ? e / t._ts
              : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts),
        )),
        ut(t),
        i._dirty || S(i, t))
    }
    function ht(t, e) {
      var i
      if (
        ((e._time ||
          (!e._dur && e._initted) ||
          (e._start < t._time && (e._dur || !e.add))) &&
          ((i = ct(t.rawTime(), e)),
          !e._dur || qt(0, e.totalDuration(), i) - e._tTime > U) &&
          e.render(i, !0),
        S(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
      ) {
        if (t._dur < t.duration())
          for (i = t; i._dp; )
            0 <= i.rawTime() && i.totalTime(i._tTime), (i = i._dp)
        t._zTime = -U
      }
    }
    function E(t, e, i, s) {
      return (
        e.parent && at(e),
        (e._start = O(
          (K(i) ? i : i || t !== j ? d(t, i, e) : t._time) + e._delay,
        )),
        (e._end = O(
          e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0),
        )),
        T(t, e, '_first', '_last', t._sort ? '_start' : 0),
        Ut(e) || (t._recent = e),
        s || ht(t, e),
        t._ts < 0 && pt(t, t._tTime),
        t
      )
    }
    function ft(t, e) {
      ;(r.ScrollTrigger || J('scrollTrigger', e)) &&
        r.ScrollTrigger.create(e, t)
    }
    function mt(t, e, i, s, n) {
      return (
        oi(t, e, n),
        !t._initted ||
          (!i &&
            t._pt &&
            !V &&
            ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
            Zt !== f.frame &&
            ($e.push(t), (t._lazy = [n, s])))
      )
    }
    function gt(t, e, i, s) {
      var n = t._repeat,
        e = O(e) || 0,
        o = t._tTime / t._tDur
      return (
        o && !s && (t._time *= e / t._dur),
        (t._dur = e),
        (t._tDur = n ? (n < 0 ? 1e10 : O(e * (n + 1) + t._rDelay * n)) : e),
        0 < o && !s && pt(t, (t._tTime = t._tDur * o)),
        t.parent && ut(t),
        i || S(t.parent, t),
        t
      )
    }
    function vt(t) {
      return t instanceof I ? S(t) : gt(t, t._dur)
    }
    function yt(t, e, i) {
      var s,
        n,
        o = K(e[1]),
        r = (o ? 2 : 1) + (t < 2 ? 0 : 1),
        a = e[r]
      if ((o && (a.duration = e[1]), (a.parent = i), t)) {
        for (s = a, n = i; n && !('immediateRender' in s); )
          (s = n.vars.defaults || {}), (n = z(n.vars.inherit) && n.parent)
        ;(a.immediateRender = z(s.immediateRender)),
          t < 2 ? (a.runBackwards = 1) : (a.startAt = e[r - 1])
      }
      return new W(e[0], a, e[1 + r])
    }
    function bt(t, e) {
      return t || 0 === t ? e(t) : e
    }
    function R(t, e) {
      return H(t) && (e = Ee.exec(t)) ? e[1] : ''
    }
    function wt(t, e) {
      return (
        t &&
        P(t) &&
        'length' in t &&
        ((!e && !t.length) || (t.length - 1 in t && P(t[0]))) &&
        !t.nodeType &&
        t !== c
      )
    }
    function _t(i) {
      return (
        (i = B(i)[0] || tt('Invalid scope') || {}),
        function (t) {
          var e = i.current || i.nativeElement || i
          return B(
            t,
            e.querySelectorAll
              ? e
              : e === i
                ? tt('Invalid scope') || Xt.createElement('div')
                : i,
          )
        }
      )
    }
    function xt(t) {
      return t.sort(function () {
        return 0.5 - Math.random()
      })
    }
    function kt(t) {
      var h, f, m, g, v, y, b, w, _
      return u(t)
        ? t
        : ((h = P(t) ? t : { each: t }),
          (f = Ge(h.ease)),
          (m = h.from || 0),
          (g = parseFloat(h.base) || 0),
          (v = {}),
          (t = 0 < m && m < 1),
          (y = isNaN(m) || t),
          (b = h.axis),
          H((_ = w = m))
            ? (w = _ = { center: 0.5, edges: 0.5, end: 1 }[m] || 0)
            : !t && y && ((w = m[0]), (_ = m[1])),
          function (t, e, i) {
            var s,
              n,
              o,
              r,
              a,
              l,
              d,
              c,
              u = (i || h).length,
              p = v[u]
            if (!p) {
              if (!(c = 'auto' === h.grid ? 0 : (h.grid || [1, N])[1])) {
                for (
                  l = -N;
                  l < (l = i[c++].getBoundingClientRect().left) && c < u;

                );
                c--
              }
              for (
                p = v[u] = [],
                  s = y ? Math.min(c, u) * w - 0.5 : m % c,
                  n = c === N ? 0 : y ? (u * _) / c - 0.5 : (m / c) | 0,
                  d = N,
                  a = l = 0;
                a < u;
                a++
              )
                (r = (a % c) - s),
                  (o = n - ((a / c) | 0)),
                  (p[a] = r =
                    b ? Math.abs('y' === b ? o : r) : be(r * r + o * o)),
                  l < r && (l = r),
                  r < d && (d = r)
              'random' === m && xt(p),
                (p.max = l - d),
                (p.min = d),
                (p.v = u =
                  (parseFloat(h.amount) ||
                    parseFloat(h.each) *
                      (u < c
                        ? u - 1
                        : b
                          ? 'y' === b
                            ? u / c
                            : c
                          : Math.max(c, u / c)) ||
                    0) * ('edges' === m ? -1 : 1)),
                (p.b = u < 0 ? g - u : g),
                (p.u = R(h.amount || h.each) || 0),
                (f = f && u < 0 ? Xe(f) : f)
            }
            return (
              (u = (p[t] - p.min) / p.max || 0),
              O(p.b + (f ? f(u) : u) * p.v) + p.u
            )
          })
    }
    function Tt(i) {
      var s = Math.pow(10, ((i + '').split('.')[1] || '').length)
      return function (t) {
        var e = O(Math.round(parseFloat(t) / i) * i * s)
        return (e - (e % 1)) / s + (K(t) ? 0 : R(t))
      }
    }
    function Ct(l, t) {
      var d,
        c,
        e = A(l)
      return (
        !e &&
          P(l) &&
          ((d = e = l.radius || N),
          l.values
            ? ((l = B(l.values)), (c = !K(l[0])) && (d *= d))
            : (l = Tt(l.increment))),
        bt(
          t,
          e
            ? u(l)
              ? function (t) {
                  return (c = l(t)), Math.abs(c - t) <= d ? c : t
                }
              : function (t) {
                  for (
                    var e,
                      i,
                      s = parseFloat(c ? t.x : t),
                      n = parseFloat(c ? t.y : 0),
                      o = N,
                      r = 0,
                      a = l.length;
                    a--;

                  )
                    (e = c
                      ? (e = l[a].x - s) * e + (i = l[a].y - n) * i
                      : Math.abs(l[a] - s)) < o && ((o = e), (r = a))
                  return (
                    (r = !d || o <= d ? l[r] : t),
                    c || r === t || K(t) ? r : r + R(t)
                  )
                }
            : Tt(l),
        )
      )
    }
    function St(t, e, i, s) {
      return bt(A(t) ? !e : !0 === i ? !!(i = 0) : !s, function () {
        return A(t)
          ? t[~~(Math.random() * t.length)]
          : (i = i || 1e-5) &&
              (s = i < 1 ? Math.pow(10, (i + '').length - 2) : 1) &&
              Math.floor(
                Math.round(
                  (t - i / 2 + Math.random() * (e - t + 0.99 * i)) / i,
                ) *
                  i *
                  s,
              ) / s
      })
    }
    function Pt(e, i, t) {
      return bt(t, function (t) {
        return e[~~i(t)]
      })
    }
    function Ot(t) {
      for (var e, i, s, n, o = 0, r = ''; ~(e = t.indexOf('random(', o)); )
        (s = t.indexOf(')', e)),
          (n = '[' === t.charAt(e + 7)),
          (i = t.substr(e + 7, s - e - 7).match(n ? Oe : ke)),
          (r +=
            t.substr(o, e - o) +
            St(n ? i : +i[0], n ? 0 : +i[1], +i[2] || 1e-5)),
          (o = s + 1)
      return r + t.substr(o, t.length - o)
    }
    function Et(t, e, i) {
      var s,
        n,
        o,
        r = t.labels,
        a = N
      for (s in r)
        (n = r[s] - e) < 0 == !!i &&
          n &&
          a > (n = Math.abs(n)) &&
          ((o = s), (a = n))
      return o
    }
    function At(t) {
      return (
        at(t),
        t.scrollTrigger && t.scrollTrigger.kill(!!V),
        t.progress() < 1 && _(t, 'onInterrupt'),
        t
      )
    }
    function Bt(t) {
      if (a() && t) {
        var e = (t = (!t.name && t.default) || t).name,
          i = u(t),
          i =
            e && !i && t.init
              ? function () {
                  this._props = []
                }
              : t,
          s = {
            init: v,
            render: xi,
            add: ci,
            kill: Ti,
            modifier: ki,
            rawVars: 0,
          },
          n = {
            targetTest: 0,
            get: 0,
            getSetter: yi,
            aliases: {},
            register: 0,
          }
        if ((We(), t !== i)) {
          if (q[e]) return
          D(i, D(ot(t, s), n)),
            Ft(i.prototype, Ft(s, ot(t, n))),
            (q[(i.prop = e)] = i),
            t.targetTest && (Ve.push(i), (Ie[e] = 1)),
            (e =
              ('css' === e ? 'CSS' : e.charAt(0).toUpperCase() + e.substr(1)) +
              'Plugin')
        }
        g(e, i), t.register && t.register(m, i, Y)
      } else t && Fe.push(t)
    }
    function Mt(t, e, i) {
      return (
        ((6 * (t += t < 0 ? 1 : 1 < t ? -1 : 0) < 1
          ? e + (i - e) * t * 6
          : t < 0.5
            ? i
            : 3 * t < 2
              ? e + (i - e) * (2 / 3 - t) * 6
              : e) *
          p +
          0.5) |
        0
      )
    }
    function It(t, e, i) {
      var s,
        n,
        o,
        r,
        a,
        l,
        d,
        c = t ? (K(t) ? [t >> 16, (t >> 8) & p, t & p] : 0) : Ne.black
      if (!c) {
        if ((',' === t.substr(-1) && (t = t.substr(0, t.length - 1)), Ne[t]))
          c = Ne[t]
        else if ('#' === t.charAt(0)) {
          if (
            9 ===
            (t =
              t.length < 6
                ? '#' +
                  (s = t.charAt(1)) +
                  s +
                  (n = t.charAt(2)) +
                  n +
                  (o = t.charAt(3)) +
                  o +
                  (5 === t.length ? t.charAt(4) + t.charAt(4) : '')
                : t).length
          )
            return [
              (c = parseInt(t.substr(1, 6), 16)) >> 16,
              (c >> 8) & p,
              c & p,
              parseInt(t.substr(7), 16) / 255,
            ]
          c = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & p, t & p]
        } else if ('hsl' === t.substr(0, 3))
          if (((c = d = t.match(ke)), e)) {
            if (~t.indexOf('='))
              return (c = t.match(Te)), i && c.length < 4 && (c[3] = 1), c
          } else
            (r = (+c[0] % 360) / 360),
              (a = c[1] / 100),
              (s =
                2 * (l = c[2] / 100) -
                (n = l <= 0.5 ? l * (a + 1) : l + a - l * a)),
              3 < c.length && (c[3] *= 1),
              (c[0] = Mt(r + 1 / 3, s, n)),
              (c[1] = Mt(r, s, n)),
              (c[2] = Mt(r - 1 / 3, s, n))
        else c = t.match(ke) || Ne.transparent
        c = c.map(Number)
      }
      return (
        e &&
          !d &&
          ((s = c[0] / p),
          (n = c[1] / p),
          (o = c[2] / p),
          (l = ((t = Math.max(s, n, o)) + (e = Math.min(s, n, o))) / 2),
          t === e
            ? (r = a = 0)
            : ((d = t - e),
              (a = 0.5 < l ? d / (2 - t - e) : d / (t + e)),
              (r =
                t === s
                  ? (n - o) / d + (n < o ? 6 : 0)
                  : t === n
                    ? (o - s) / d + 2
                    : (s - n) / d + 4),
              (r *= 60)),
          (c[0] = ~~(r + 0.5)),
          (c[1] = ~~(100 * a + 0.5)),
          (c[2] = ~~(100 * l + 0.5))),
        i && c.length < 4 && (c[3] = 1),
        c
      )
    }
    function $t(t) {
      var e = [],
        i = [],
        s = -1
      return (
        t.split(Ue).forEach(function (t) {
          t = t.match(Ce) || []
          e.push.apply(e, t), i.push((s += t.length + 1))
        }),
        (e.c = i),
        e
      )
    }
    function zt(t, e, i) {
      var s,
        n,
        o,
        r,
        a = '',
        l = (t + a).match(Ue),
        d = e ? 'hsla(' : 'rgba(',
        c = 0
      if (!l) return t
      if (
        ((l = l.map(function (t) {
          return (
            (t = It(t, e, 1)) &&
            d +
              (e
                ? t[0] + ',' + t[1] + '%,' + t[2] + '%,' + t[3]
                : t.join(',')) +
              ')'
          )
        })),
        i && ((o = $t(t)), (s = i.c).join(a) !== o.c.join(a)))
      )
        for (r = (n = t.replace(Ue, '1').split(Ce)).length - 1; c < r; c++)
          a +=
            n[c] +
            (~s.indexOf(c)
              ? l.shift() || d + '0,0,0,0)'
              : (o.length ? o : l.length ? l : i).shift())
      if (!n)
        for (r = (n = t.split(Ue)).length - 1; c < r; c++) a += n[c] + l[c]
      return a + n[r]
    }
    function Lt(t) {
      var e = t.join(' ')
      if (((Ue.lastIndex = 0), Ue.test(e)))
        return (
          (e = qe.test(e)),
          (t[1] = zt(t[1], e)),
          (t[0] = zt(t[0], e, $t(t[1]))),
          !0
        )
    }
    function Dt(t, e) {
      for (var i, s = t._first; s; )
        s instanceof I
          ? Dt(s, e)
          : !s.vars.yoyoEase ||
            (s._yoyo && s._repeat) ||
            s._yoyo === e ||
            (s.timeline
              ? Dt(s.timeline, e)
              : ((i = s._ease),
                (s._ease = s._yEase),
                (s._yEase = i),
                (s._yoyo = e))),
          (s = s._next)
    }
    function Vt(t, e, i, s) {
      var n,
        o = {
          easeIn: e,
          easeOut: (i =
            void 0 === i
              ? function (t) {
                  return 1 - e(1 - t)
                }
              : i),
          easeInOut: (s =
            void 0 === s
              ? function (t) {
                  return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2
                }
              : s),
        }
      h(t, function (t) {
        for (var e in ((M[t] = r[t] = o), (M[(n = t.toLowerCase())] = i), o))
          M[
            n + ('easeIn' === e ? '.in' : 'easeOut' === e ? '.out' : '.inOut')
          ] = M[t + '.' + e] = o[e]
      })
    }
    function jt(e) {
      return function (t) {
        return t < 0.5 ? (1 - e(1 - 2 * t)) / 2 : 0.5 + e(2 * (t - 0.5)) / 2
      }
    }
    function Ht(i, t, e) {
      function s(t) {
        return 1 === t ? 1 : n * Math.pow(2, -10 * t) * _e((t - o) * r) + 1
      }
      var n = 1 <= t ? t : 1,
        o =
          ((r = (e || (i ? 0.3 : 0.45)) / (t < 1 ? t : 1)) / ge) *
          (Math.asin(1 / n) || 0),
        e =
          'out' === i
            ? s
            : 'in' === i
              ? function (t) {
                  return 1 - s(1 - t)
                }
              : jt(s),
        r = ge / r
      return (
        (e.config = function (t, e) {
          return Ht(i, t, e)
        }),
        e
      )
    }
    function Rt(e, i) {
      function s(t) {
        return t ? --t * t * ((i + 1) * t + i) + 1 : 0
      }
      void 0 === i && (i = 1.70158)
      var t =
        'out' === e
          ? s
          : 'in' === e
            ? function (t) {
                return 1 - s(1 - t)
              }
            : jt(s)
      return (
        (t.config = function (t) {
          return Rt(e, t)
        }),
        t
      )
    }
    function Ft(t, e) {
      for (var i in e) t[i] = e[i]
      return t
    }
    function Nt(t, e) {
      return (e = Math.floor((t /= e))), t && e === t ? e - 1 : e
    }
    function Ut(t) {
      return 'isFromStart' === (t = t.data) || 'isStart' === t
    }
    function d(t, e, i) {
      var s,
        n,
        o,
        r = t.labels,
        a = t._recent || He,
        l = t.duration() >= N ? a.endTime(!1) : t._dur
      return H(e) && (isNaN(e) || e in r)
        ? ((n = e.charAt(0)),
          (o = '%' === e.substr(-1)),
          (s = e.indexOf('=')),
          '<' === n || '>' === n
            ? (0 <= s && (e = e.replace(/=/, '')),
              ('<' === n ? a._start : a.endTime(0 <= a._repeat)) +
                (parseFloat(e.substr(1)) || 0) *
                  (o ? (s < 0 ? a : i).totalDuration() / 100 : 1))
            : s < 0
              ? (e in r || (r[e] = l), r[e])
              : ((n = parseFloat(e.charAt(s - 1) + e.substr(s + 1))),
                o && i && (n = (n / 100) * (A(i) ? i[0] : i).totalDuration()),
                1 < s ? d(t, e.substr(0, s - 1), i) + n : l + n))
        : null == e
          ? l
          : +e
    }
    function qt(t, e, i) {
      return i < t ? t : e < i ? e : i
    }
    function Wt(e, t, i, s, n) {
      var o = t - e,
        r = s - i
      return bt(n, function (t) {
        return i + (((t - e) / o) * r || 0)
      })
    }
    function _(t, e, i) {
      var s = t.vars,
        n = s[e],
        o = l,
        r = t._ctx
      if (n)
        (e = s[e + 'Params']),
          (s = s.callbackScope || t),
          i && $e.length && nt(),
          r && (l = r),
          (t = e ? n.apply(s, e) : n.call(s)),
          (l = o)
    }
    var Yt,
      V,
      l,
      j,
      c,
      Qt,
      Xt,
      Gt,
      Kt,
      Zt,
      Jt,
      te,
      ee,
      ie,
      se,
      ne,
      oe,
      re,
      ae,
      le,
      de,
      ce,
      ue,
      pe,
      he,
      fe,
      F = {
        autoSleep: 120,
        force3D: 'auto',
        nullTargetWarn: 1,
        units: { lineHeight: '' },
      },
      me = { duration: 0.5, overwrite: !1, delay: 0 },
      N = 1e8,
      U = 1 / N,
      ge = 2 * Math.PI,
      ve = ge / 4,
      ye = 0,
      be = Math.sqrt,
      we = Math.cos,
      _e = Math.sin,
      xe =
        ('function' == typeof ArrayBuffer && ArrayBuffer.isView) ||
        function () {},
      A = Array.isArray,
      ke = /(?:-?\.?\d|\.)+/gi,
      Te = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
      Ce = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
      Se = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
      Pe = /[+-]=-?[.\d]+/,
      Oe = /[^,'"\[\]\s]+/gi,
      Ee = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
      r = {},
      Ae = { suppressEvents: !0, isStart: !0, kill: !1 },
      Be = { suppressEvents: !0, kill: !1 },
      Me = { suppressEvents: !0 },
      Ie = {},
      $e = [],
      ze = {},
      q = {},
      Le = {},
      De = 30,
      Ve = [],
      je = '',
      He = { _start: 0, endTime: v, totalDuration: v },
      Re = [].slice,
      B = function (t, e, i) {
        return l && !e && l.selector
          ? l.selector(t)
          : !H(t) || i || (!Qt && We())
            ? A(t)
              ? ((s = i),
                void 0 === n && (n = []),
                t.forEach(function (t) {
                  return (H(t) && !s) || wt(t, 1)
                    ? n.push.apply(n, B(t))
                    : n.push(t)
                }) || n)
              : wt(t)
                ? Re.call(t, 0)
                : t
                  ? [t]
                  : []
            : Re.call((e || Xt).querySelectorAll(t), 0)
        var s, n
      },
      Fe = [],
      p = 255,
      Ne = {
        aqua: [0, p, p],
        lime: [0, p, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, p],
        navy: [0, 0, 128],
        white: [p, p, p],
        olive: [128, 128, 0],
        yellow: [p, p, 0],
        orange: [p, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [p, 0, 0],
        pink: [p, 192, 203],
        cyan: [0, p, p],
        transparent: [p, p, p, 0],
      },
      Ue = (function () {
        var t,
          e =
            '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b'
        for (t in Ne) e += '|' + t + '\\b'
        return new RegExp(e + ')', 'gi')
      })(),
      qe = /hsl[a]?\(/,
      f =
        ((re = Date.now),
        (ae = 500),
        (le = 33),
        (de = re()),
        (ce = de),
        (pe = ue = 1e3 / 240),
        (se = {
          time: 0,
          frame: 0,
          tick: function () {
            Ke(!0)
          },
          deltaRatio: function (t) {
            return ne / (1e3 / (t || 60))
          },
          wake: function () {
            Kt &&
              (!Qt &&
                a() &&
                ((c = Qt = window),
                (Xt = c.document || {}),
                (r.gsap = m),
                (c.gsapVersions || (c.gsapVersions = [])).push(m.version),
                s(Gt || c.GreenSockGlobals || (!c.gsap && c) || {}),
                (ie = c.requestAnimationFrame),
                Fe.forEach(Bt)),
              te && se.sleep(),
              (ee =
                ie ||
                function (t) {
                  return setTimeout(t, (pe - 1e3 * se.time + 1) | 0)
                }),
              (Jt = 1),
              Ke(2))
          },
          sleep: function () {
            ;(ie ? c.cancelAnimationFrame : clearTimeout)(te),
              (Jt = 0),
              (ee = v)
          },
          lagSmoothing: function (t, e) {
            ;(ae = t || 1 / 0), (le = Math.min(e || 33, ae))
          },
          fps: function (t) {
            ;(ue = 1e3 / (t || 240)), (pe = 1e3 * se.time + ue)
          },
          add: function (n, t, e) {
            var o = t
              ? function (t, e, i, s) {
                  n(t, e, i, s), se.remove(o)
                }
              : n
            return se.remove(n), he[e ? 'unshift' : 'push'](o), We(), o
          },
          remove: function (t, e) {
            ~(e = he.indexOf(t)) && he.splice(e, 1) && e <= oe && oe--
          },
          _listeners: (he = []),
        })),
      We = function () {
        return !Jt && f.wake()
      },
      M = {},
      Ye = /^[\d.\-M][\d.\-,\s]/,
      Qe = /["']/g,
      Xe = function (e) {
        return function (t) {
          return 1 - e(1 - t)
        }
      },
      Ge = function (t, e) {
        return (
          (t &&
            (u(t)
              ? t
              : M[t] ||
                ((o = ((t = t) + '').split('(')),
                (r = M[o[0]]) && 1 < o.length && r.config
                  ? r.config.apply(
                      null,
                      ~t.indexOf('{')
                        ? [
                            (function (t) {
                              for (
                                var e,
                                  i,
                                  s,
                                  n = {},
                                  o = t.substr(1, t.length - 3).split(':'),
                                  r = o[0],
                                  a = 1,
                                  l = o.length;
                                a < l;
                                a++
                              )
                                (i = o[a]),
                                  (e =
                                    a !== l - 1
                                      ? i.lastIndexOf(',')
                                      : i.length),
                                  (s = i.substr(0, e)),
                                  (n[r] = isNaN(s)
                                    ? s.replace(Qe, '').trim()
                                    : +s),
                                  (r = i.substr(e + 1).trim())
                              return n
                            })(o[1]),
                          ]
                        : ((i = (o = t).indexOf('(') + 1),
                          (s = o.indexOf(')')),
                          (n = o.indexOf('(', i)),
                          o
                            .substring(
                              i,
                              ~n && n < s ? o.indexOf(')', s + 1) : s,
                            )
                            .split(',')
                            .map(w)),
                    )
                  : M._CE && Ye.test(t)
                    ? M._CE('', t)
                    : r))) ||
          e
        )
        var i, s, n, o, r
      }
    function Ke(t) {
      var e,
        i,
        s,
        n = re() - ce,
        o = !0 === t
      if (
        (ae < n && (de += n - le),
        (0 < (n = (i = (ce += n) - de) - pe) || o) &&
          ((s = ++se.frame),
          (ne = i - 1e3 * se.time),
          (se.time = i /= 1e3),
          (pe += n + (ue <= n ? 4 : ue - n)),
          (e = 1)),
        o || (te = ee(Ke)),
        e)
      )
        for (oe = 0; oe < he.length; oe++) he[oe](i, ne, s, t)
    }
    function Ze(t) {
      return t < 1 / 2.75
        ? fe * t * t
        : t < 0.7272727272727273
          ? fe * Math.pow(t - 1.5 / 2.75, 2) + 0.75
          : t < 0.9090909090909092
            ? fe * (t -= 2.25 / 2.75) * t + 0.9375
            : fe * Math.pow(t - 2.625 / 2.75, 2) + 0.984375
    }
    h('Linear,Quad,Cubic,Quart,Quint,Strong', function (t, e) {
      var i = e < 5 ? e + 1 : e
      Vt(
        t + ',Power' + (i - 1),
        e
          ? function (t) {
              return Math.pow(t, i)
            }
          : function (t) {
              return t
            },
        function (t) {
          return 1 - Math.pow(1 - t, i)
        },
        function (t) {
          return t < 0.5
            ? Math.pow(2 * t, i) / 2
            : 1 - Math.pow(2 * (1 - t), i) / 2
        },
      )
    }),
      (M.Linear.easeNone = M.none = M.Linear.easeIn),
      Vt('Elastic', Ht('in'), Ht('out'), Ht()),
      (fe = 7.5625),
      Vt(
        'Bounce',
        function (t) {
          return 1 - Ze(1 - t)
        },
        Ze,
      ),
      Vt('Expo', function (t) {
        return t ? Math.pow(2, 10 * (t - 1)) : 0
      }),
      Vt('Circ', function (t) {
        return -(be(1 - t * t) - 1)
      }),
      Vt('Sine', function (t) {
        return 1 === t ? 1 : 1 - we(t * ve)
      }),
      Vt('Back', Rt('in'), Rt('out'), Rt()),
      (M.SteppedEase =
        M.steps =
        r.SteppedEase =
          {
            config: function (t, e) {
              var i = 1 / (t = void 0 === t ? 1 : t),
                s = t + (e ? 0 : 1),
                n = e ? 1 : 0
              return function (t) {
                return (((s * qt(0, 0.99999999, t)) | 0) + n) * i
              }
            },
          }),
      (me.ease = M['quad.out']),
      h(
        'onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt',
        function (t) {
          return (je += t + ',' + t + 'Params,')
        },
      )
    var Je = function (t, e) {
        ;(this.id = ye++),
          ((t._gsap = this).target = t),
          (this.harness = e),
          (this.get = e ? e.get : y),
          (this.set = e ? e.getSetter : yi)
      },
      ti =
        (((e = ei.prototype).delay = function (t) {
          return t || 0 === t
            ? (this.parent &&
                this.parent.smoothChildTiming &&
                this.startTime(this._start + t - this._delay),
              (this._delay = t),
              this)
            : this._delay
        }),
        (e.duration = function (t) {
          return arguments.length
            ? this.totalDuration(
                0 < this._repeat ? t + (t + this._rDelay) * this._repeat : t,
              )
            : this.totalDuration() && this._dur
        }),
        (e.totalDuration = function (t) {
          return arguments.length
            ? ((this._dirty = 0),
              gt(
                this,
                this._repeat < 0
                  ? t
                  : (t - this._repeat * this._rDelay) / (this._repeat + 1),
              ))
            : this._tDur
        }),
        (e.totalTime = function (t, e) {
          if ((We(), !arguments.length)) return this._tTime
          var i = this._dp
          if (i && i.smoothChildTiming && this._ts) {
            for (
              pt(this, t), i._dp && !i.parent && ht(i, this);
              i && i.parent;

            )
              i.parent._time !==
                i._start +
                  (0 <= i._ts
                    ? i._tTime / i._ts
                    : (i.totalDuration() - i._tTime) / -i._ts) &&
                i.totalTime(i._tTime, !0),
                (i = i.parent)
            !this.parent &&
              this._dp.autoRemoveChildren &&
              ((0 < this._ts && t < this._tDur) ||
                (this._ts < 0 && 0 < t) ||
                (!this._tDur && !t)) &&
              E(this._dp, this, this._start - this._delay)
          }
          return (
            (this._tTime !== t ||
              (!this._dur && !e) ||
              (this._initted && Math.abs(this._zTime) === U) ||
              (!t && !this._initted && (this.add || this._ptLookup))) &&
              (this._ts || (this._pTime = t), b(this, t, e)),
            this
          )
        }),
        (e.time = function (t, e) {
          return arguments.length
            ? this.totalTime(
                Math.min(this.totalDuration(), t + dt(this)) %
                  (this._dur + this._rDelay) || (t ? this._dur : 0),
                e,
              )
            : this._time
        }),
        (e.totalProgress = function (t, e) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * t, e)
            : this.totalDuration()
              ? Math.min(1, this._tTime / this._tDur)
              : this.ratio
        }),
        (e.progress = function (t, e) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                  dt(this),
                e,
              )
            : this.duration()
              ? Math.min(1, this._time / this._dur)
              : this.ratio
        }),
        (e.iteration = function (t, e) {
          var i = this.duration() + this._rDelay
          return arguments.length
            ? this.totalTime(this._time + (t - 1) * i, e)
            : this._repeat
              ? Nt(this._tTime, i) + 1
              : 1
        }),
        (e.timeScale = function (t) {
          if (!arguments.length) return this._rts === -U ? 0 : this._rts
          if (this._rts === t) return this
          for (
            var e =
                this.parent && this._ts
                  ? ct(this.parent._time, this)
                  : this._tTime,
              t =
                ((this._rts = +t || 0),
                (this._ts = this._ps || t === -U ? 0 : this._rts),
                this.totalTime(qt(-Math.abs(this._delay), this._tDur, e), !0),
                ut(this),
                this),
              i = t.parent;
            i && i.parent;

          )
            (i._dirty = 1), i.totalDuration(), (i = i.parent)
          return t
        }),
        (e.paused = function (t) {
          return arguments.length
            ? (this._ps !== t &&
                ((this._ps = t)
                  ? ((this._pTime =
                      this._tTime || Math.max(-this._delay, this.rawTime())),
                    (this._ts = this._act = 0))
                  : (We(),
                    (this._ts = this._rts),
                    this.totalTime(
                      this.parent && !this.parent.smoothChildTiming
                        ? this.rawTime()
                        : this._tTime || this._pTime,
                      1 === this.progress() &&
                        Math.abs(this._zTime) !== U &&
                        (this._tTime -= U),
                    ))),
              this)
            : this._ps
        }),
        (e.startTime = function (t) {
          var e
          return arguments.length
            ? ((this._start = t),
              !(e = this.parent || this._dp) ||
                (!e._sort && this.parent) ||
                E(e, this, t - this._delay),
              this)
            : this._start
        }),
        (e.endTime = function (t) {
          return (
            this._start +
            (z(t) ? this.totalDuration() : this.duration()) /
              Math.abs(this._ts || 1)
          )
        }),
        (e.rawTime = function (t) {
          var e = this.parent || this._dp
          return e
            ? t &&
              (!this._ts ||
                (this._repeat && this._time && this.totalProgress() < 1))
              ? this._tTime % (this._dur + this._rDelay)
              : this._ts
                ? ct(e.rawTime(t), this)
                : this._tTime
            : this._tTime
        }),
        (e.revert = function (t) {
          var e = V
          return (
            (V = t = void 0 === t ? Me : t),
            (this._initted || this._startAt) &&
              (this.timeline && this.timeline.revert(t),
              this.totalTime(-0.01, t.suppressEvents)),
            'nested' !== this.data && !1 !== t.kill && this.kill(),
            (V = e),
            this
          )
        }),
        (e.globalTime = function (t) {
          for (var e = this, i = arguments.length ? t : e.rawTime(); e; )
            (i = e._start + i / (e._ts || 1)), (e = e._dp)
          return !this.parent && this._sat
            ? this._sat.vars.immediateRender
              ? -1 / 0
              : this._sat.globalTime(t)
            : i
        }),
        (e.repeat = function (t) {
          return arguments.length
            ? ((this._repeat = t === 1 / 0 ? -2 : t), vt(this))
            : -2 === this._repeat
              ? 1 / 0
              : this._repeat
        }),
        (e.repeatDelay = function (t) {
          var e
          return arguments.length
            ? ((e = this._time),
              (this._rDelay = t),
              vt(this),
              e ? this.time(e) : this)
            : this._rDelay
        }),
        (e.yoyo = function (t) {
          return arguments.length ? ((this._yoyo = t), this) : this._yoyo
        }),
        (e.seek = function (t, e) {
          return this.totalTime(d(this, t), z(e))
        }),
        (e.restart = function (t, e) {
          return this.play().totalTime(t ? -this._delay : 0, z(e))
        }),
        (e.play = function (t, e) {
          return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
        }),
        (e.reverse = function (t, e) {
          return (
            null != t && this.seek(t || this.totalDuration(), e),
            this.reversed(!0).paused(!1)
          )
        }),
        (e.pause = function (t, e) {
          return null != t && this.seek(t, e), this.paused(!0)
        }),
        (e.resume = function () {
          return this.paused(!1)
        }),
        (e.reversed = function (t) {
          return arguments.length
            ? (!!t !== this.reversed() &&
                this.timeScale(-this._rts || (t ? -U : 0)),
              this)
            : this._rts < 0
        }),
        (e.invalidate = function () {
          return (this._initted = this._act = 0), (this._zTime = -U), this
        }),
        (e.isActive = function () {
          var t = this.parent || this._dp,
            e = this._start
          return !(
            t &&
            !(
              this._ts &&
              this._initted &&
              t.isActive() &&
              (t = t.rawTime(!0)) >= e &&
              t < this.endTime(!0) - U
            )
          )
        }),
        (e.eventCallback = function (t, e, i) {
          var s = this.vars
          return 1 < arguments.length
            ? (e
                ? ((s[t] = e),
                  i && (s[t + 'Params'] = i),
                  'onUpdate' === t && (this._onUpdate = e))
                : delete s[t],
              this)
            : s[t]
        }),
        (e.then = function (s) {
          var n = this
          return new Promise(function (e) {
            function t() {
              var t = n.then
              ;(n.then = null),
                u(i) && (i = i(n)) && (i.then || i === n) && (n.then = t),
                e(i),
                (n.then = t)
            }
            var i = u(s) ? s : x
            ;(n._initted && 1 === n.totalProgress() && 0 <= n._ts) ||
            (!n._tTime && n._ts < 0)
              ? t()
              : (n._prom = t)
          })
        }),
        (e.kill = function () {
          At(this)
        }),
        ei)
    function ei(t) {
      ;(this.vars = t),
        (this._delay = +t.delay || 0),
        (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
          ((this._rDelay = t.repeatDelay || 0),
          (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
        (this._ts = 1),
        gt(this, +t.duration, 1, 1),
        (this.data = t.data),
        l && (this._ctx = l).data.push(this),
        Jt || f.wake()
    }
    D(ti.prototype, {
      _time: 0,
      _start: 0,
      _end: 0,
      _tTime: 0,
      _tDur: 0,
      _dirty: 0,
      _repeat: 0,
      _yoyo: !1,
      parent: null,
      _initted: !1,
      _rDelay: 0,
      _ts: 1,
      _dp: 0,
      ratio: 0,
      _zTime: -U,
      _prom: 0,
      _ps: !1,
      _rts: 1,
    })
    i(si, (ii = ti)),
      ((e = si.prototype).to = function (t, e, i) {
        return yt(0, arguments, this), this
      }),
      (e.from = function (t, e, i) {
        return yt(1, arguments, this), this
      }),
      (e.fromTo = function (t, e, i, s) {
        return yt(2, arguments, this), this
      }),
      (e.set = function (t, e, i) {
        return (
          (e.duration = 0),
          (e.parent = this),
          rt(e).repeatDelay || (e.repeat = 0),
          (e.immediateRender = !!e.immediateRender),
          new W(t, e, d(this, i), 1),
          this
        )
      }),
      (e.call = function (t, e, i) {
        return E(this, W.delayedCall(0, t, e), i)
      }),
      (e.staggerTo = function (t, e, i, s, n, o, r) {
        return (
          (i.duration = e),
          (i.stagger = i.stagger || s),
          (i.onComplete = o),
          (i.onCompleteParams = r),
          (i.parent = this),
          new W(t, i, d(this, n)),
          this
        )
      }),
      (e.staggerFrom = function (t, e, i, s, n, o, r) {
        return (
          (i.runBackwards = 1),
          (rt(i).immediateRender = z(i.immediateRender)),
          this.staggerTo(t, e, i, s, n, o, r)
        )
      }),
      (e.staggerFromTo = function (t, e, i, s, n, o, r, a) {
        return (
          (s.startAt = i),
          (rt(s).immediateRender = z(s.immediateRender)),
          this.staggerTo(t, e, s, n, o, r, a)
        )
      }),
      (e.render = function (t, e, i) {
        var s,
          n,
          o,
          r,
          a,
          l,
          d,
          c,
          u,
          p,
          h = this._time,
          f = this._dirty ? this.totalDuration() : this._tDur,
          m = this._dur,
          g = t <= 0 ? 0 : O(t),
          v = this._zTime < 0 != t < 0 && (this._initted || !m)
        if (
          (g = this !== j && f < g && 0 <= t ? f : g) !== this._tTime ||
          i ||
          v
        ) {
          if (
            (h !== this._time &&
              m &&
              ((g += this._time - h), (t += this._time - h)),
            (s = g),
            (c = this._start),
            (a = !(d = this._ts)),
            v && (m || (h = this._zTime), (!t && e) || (this._zTime = t)),
            this._repeat)
          ) {
            if (
              ((v = this._yoyo),
              (r = m + this._rDelay),
              this._repeat < -1 && t < 0)
            )
              return this.totalTime(100 * r + t, e, i)
            if (
              ((s = O(g % r)),
              g === f
                ? ((o = this._repeat), (s = m))
                : ((o = ~~(g / r)) && o === g / r && ((s = m), o--),
                  m < s && (s = m)),
              (u = Nt(this._tTime, r)),
              v && 1 & o && ((s = m - s), (p = 1)),
              o !==
                (u =
                  !h &&
                  this._tTime &&
                  u !== o &&
                  this._tTime - u * r - this._dur <= 0
                    ? o
                    : u) && !this._lock)
            ) {
              var y = v && 1 & u,
                v = y === (v && 1 & o),
                h = (y = o < u ? !y : y) ? 0 : g % m ? m : g
              if (
                ((this._lock = 1),
                (this.render(h || (p ? 0 : O(o * r)), e, !m)._lock = 0),
                (this._tTime = g),
                !e && this.parent && _(this, 'onRepeat'),
                this.vars.repeatRefresh && !p && (this.invalidate()._lock = 1),
                (h && h !== this._time) ||
                  a != !this._ts ||
                  (this.vars.onRepeat && !this.parent && !this._act))
              )
                return this
              if (
                ((m = this._dur),
                (f = this._tDur),
                v &&
                  ((this._lock = 2),
                  this.render((h = y ? m : -1e-4), !0),
                  this.vars.repeatRefresh) &&
                  !p &&
                  this.invalidate(),
                (this._lock = 0),
                !this._ts && !a)
              )
                return this
              Dt(this, p)
            }
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              (l = (function (t, e, i) {
                var s
                if (e < i)
                  for (s = t._first; s && s._start <= i; ) {
                    if ('isPause' === s.data && s._start > e) return s
                    s = s._next
                  }
                else
                  for (s = t._last; s && s._start >= i; ) {
                    if ('isPause' === s.data && s._start < e) return s
                    s = s._prev
                  }
              })(this, O(h), O(s))) &&
              (g -= s - (s = l._start)),
            (this._tTime = g),
            (this._time = s),
            (this._act = !d),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = t),
              (h = 0)),
            !h && s && !e && !o && (_(this, 'onStart'), this._tTime !== g))
          )
            return this
          if (h <= s && 0 <= t)
            for (b = this._first; b; ) {
              if (
                ((n = b._next), (b._act || s >= b._start) && b._ts && l !== b)
              ) {
                if (b.parent !== this) return this.render(t, e, i)
                if (
                  (b.render(
                    0 < b._ts
                      ? (s - b._start) * b._ts
                      : (b._dirty ? b.totalDuration() : b._tDur) +
                          (s - b._start) * b._ts,
                    e,
                    i,
                  ),
                  s !== this._time || (!this._ts && !a))
                ) {
                  ;(l = 0), n && (g += this._zTime = -U)
                  break
                }
              }
              b = n
            }
          else
            for (var b = this._last, w = t < 0 ? t : s; b; ) {
              if (
                ((n = b._prev), (b._act || w <= b._end) && b._ts && l !== b)
              ) {
                if (b.parent !== this) return this.render(t, e, i)
                if (
                  (b.render(
                    0 < b._ts
                      ? (w - b._start) * b._ts
                      : (b._dirty ? b.totalDuration() : b._tDur) +
                          (w - b._start) * b._ts,
                    e,
                    i || (V && (b._initted || b._startAt)),
                  ),
                  s !== this._time || (!this._ts && !a))
                ) {
                  ;(l = 0), n && (g += this._zTime = w ? -U : U)
                  break
                }
              }
              b = n
            }
          if (
            l &&
            !e &&
            (this.pause(),
            (l.render(h <= s ? 0 : -U)._zTime = h <= s ? 1 : -1),
            this._ts)
          )
            return (this._start = c), ut(this), this.render(t, e, i)
          this._onUpdate && !e && _(this, 'onUpdate', !0),
            !((g === f && this._tTime >= this.totalDuration()) || (!g && h)) ||
              (c !== this._start && Math.abs(d) === Math.abs(this._ts)) ||
              this._lock ||
              ((!t && m) ||
                !((g === f && 0 < this._ts) || (!g && this._ts < 0)) ||
                at(this, 1),
              e) ||
              (t < 0 && !h) ||
              (!g && !h && f) ||
              (_(
                this,
                g === f && 0 <= t ? 'onComplete' : 'onReverseComplete',
                !0,
              ),
              !this._prom) ||
              (g < f && 0 < this.timeScale()) ||
              this._prom()
        }
        return this
      }),
      (e.add = function (t, e) {
        var i = this
        if ((K(e) || (e = d(this, e, t)), !(t instanceof ti))) {
          if (A(t))
            return (
              t.forEach(function (t) {
                return i.add(t, e)
              }),
              this
            )
          if (H(t)) return this.addLabel(t, e)
          if (!u(t)) return this
          t = W.delayedCall(0, t)
        }
        return this !== t ? E(this, t, e) : this
      }),
      (e.getChildren = function (t, e, i, s) {
        void 0 === t && (t = !0),
          void 0 === e && (e = !0),
          void 0 === i && (i = !0),
          void 0 === s && (s = -N)
        for (var n = [], o = this._first; o; )
          o._start >= s &&
            (o instanceof W
              ? e && n.push(o)
              : (i && n.push(o),
                t && n.push.apply(n, o.getChildren(!0, e, i)))),
            (o = o._next)
        return n
      }),
      (e.getById = function (t) {
        for (var e = this.getChildren(1, 1, 1), i = e.length; i--; )
          if (e[i].vars.id === t) return e[i]
      }),
      (e.remove = function (t) {
        return H(t)
          ? this.removeLabel(t)
          : u(t)
            ? this.killTweensOf(t)
            : (C(this, t),
              t === this._recent && (this._recent = this._last),
              S(this))
      }),
      (e.totalTime = function (t, e) {
        return arguments.length
          ? ((this._forcing = 1),
            !this._dp &&
              this._ts &&
              (this._start = O(
                f.time -
                  (0 < this._ts
                    ? t / this._ts
                    : (this.totalDuration() - t) / -this._ts),
              )),
            ii.prototype.totalTime.call(this, t, e),
            (this._forcing = 0),
            this)
          : this._tTime
      }),
      (e.addLabel = function (t, e) {
        return (this.labels[t] = d(this, e)), this
      }),
      (e.removeLabel = function (t) {
        return delete this.labels[t], this
      }),
      (e.addPause = function (t, e, i) {
        e = W.delayedCall(0, e || v, i)
        return (
          (e.data = 'isPause'), (this._hasPause = 1), E(this, e, d(this, t))
        )
      }),
      (e.removePause = function (t) {
        var e = this._first
        for (t = d(this, t); e; )
          e._start === t && 'isPause' === e.data && at(e), (e = e._next)
      }),
      (e.killTweensOf = function (t, e, i) {
        for (var s = this.getTweensOf(t, i), n = s.length; n--; )
          ai !== s[n] && s[n].kill(t, e)
        return this
      }),
      (e.getTweensOf = function (t, e) {
        for (var i, s = [], n = B(t), o = this._first, r = K(e); o; )
          o instanceof W
            ? (function (t, e) {
                for (var i = e.length, s = 0; t.indexOf(e[s]) < 0 && ++s < i; );
                return s < i
              })(o._targets, n) &&
              (r
                ? (!ai || (o._initted && o._ts)) &&
                  o.globalTime(0) <= e &&
                  o.globalTime(o.totalDuration()) > e
                : !e || o.isActive()) &&
              s.push(o)
            : (i = o.getTweensOf(n, e)).length && s.push.apply(s, i),
            (o = o._next)
        return s
      }),
      (e.tweenTo = function (t, e) {
        e = e || {}
        var i,
          s = this,
          n = d(s, t),
          o = e.startAt,
          r = e.onStart,
          a = e.onStartParams,
          t = e.immediateRender,
          l = W.to(
            s,
            D(
              {
                ease: e.ease || 'none',
                lazy: !1,
                immediateRender: !1,
                time: n,
                overwrite: 'auto',
                duration:
                  e.duration ||
                  Math.abs(
                    (n - (o && 'time' in o ? o.time : s._time)) / s.timeScale(),
                  ) ||
                  U,
                onStart: function () {
                  var t
                  s.pause(),
                    i ||
                      ((t =
                        e.duration ||
                        Math.abs(
                          (n - (o && 'time' in o ? o.time : s._time)) /
                            s.timeScale(),
                        )),
                      l._dur !== t && gt(l, t, 0, 1).render(l._time, !0, !0),
                      (i = 1)),
                    r && r.apply(l, a || [])
                },
              },
              e,
            ),
          )
        return t ? l.render(0) : l
      }),
      (e.tweenFromTo = function (t, e, i) {
        return this.tweenTo(e, D({ startAt: { time: d(this, t) } }, i))
      }),
      (e.recent = function () {
        return this._recent
      }),
      (e.nextLabel = function (t) {
        return void 0 === t && (t = this._time), Et(this, d(this, t))
      }),
      (e.previousLabel = function (t) {
        return void 0 === t && (t = this._time), Et(this, d(this, t), 1)
      }),
      (e.currentLabel = function (t) {
        return arguments.length
          ? this.seek(t, !0)
          : this.previousLabel(this._time + U)
      }),
      (e.shiftChildren = function (t, e, i) {
        void 0 === i && (i = 0)
        for (var s, n = this._first, o = this.labels; n; )
          n._start >= i && ((n._start += t), (n._end += t)), (n = n._next)
        if (e) for (s in o) o[s] >= i && (o[s] += t)
        return S(this)
      }),
      (e.invalidate = function (t) {
        var e = this._first
        for (this._lock = 0; e; ) e.invalidate(t), (e = e._next)
        return ii.prototype.invalidate.call(this, t)
      }),
      (e.clear = function (t) {
        void 0 === t && (t = !0)
        for (var e, i = this._first; i; ) (e = i._next), this.remove(i), (i = e)
        return (
          this._dp && (this._time = this._tTime = this._pTime = 0),
          t && (this.labels = {}),
          S(this)
        )
      }),
      (e.totalDuration = function (t) {
        var e,
          i,
          s,
          n = 0,
          o = this,
          r = o._last,
          a = N
        if (arguments.length)
          return o.timeScale(
            (o._repeat < 0 ? o.duration() : o.totalDuration()) /
              (o.reversed() ? -t : t),
          )
        if (o._dirty) {
          for (s = o.parent; r; )
            (e = r._prev),
              r._dirty && r.totalDuration(),
              a < (i = r._start) && o._sort && r._ts && !o._lock
                ? ((o._lock = 1), (E(o, r, i - r._delay, 1)._lock = 0))
                : (a = i),
              i < 0 &&
                r._ts &&
                ((n -= i),
                ((!s && !o._dp) || (s && s.smoothChildTiming)) &&
                  ((o._start += i / o._ts), (o._time -= i), (o._tTime -= i)),
                o.shiftChildren(-i, !1, -1 / 0),
                (a = 0)),
              r._end > n && r._ts && (n = r._end),
              (r = e)
          gt(o, o === j && o._time > n ? o._time : n, 1, 1), (o._dirty = 0)
        }
        return o._tDur
      }),
      (si.updateRoot = function (t) {
        if ((j._ts && (b(j, ct(t, j)), (Zt = f.frame)), f.frame >= De)) {
          De += F.autoSleep || 120
          var e = j._first
          if ((!e || !e._ts) && F.autoSleep && f._listeners.length < 2) {
            for (; e && !e._ts; ) e = e._next
            e || f.sleep()
          }
        }
      })
    var ii,
      I = si
    function si(t, e) {
      var i
      return (
        ((i = ii.call(this, (t = void 0 === t ? {} : t)) || this).labels = {}),
        (i.smoothChildTiming = !!t.smoothChildTiming),
        (i.autoRemoveChildren = !!t.autoRemoveChildren),
        (i._sort = z(t.sortChildren)),
        j && E(t.parent || j, $(i), e),
        t.reversed && i.reverse(),
        t.paused && i.paused(!0),
        t.scrollTrigger && ft($(i), t.scrollTrigger),
        i
      )
    }
    function ni(t, e, i, s, n, o) {
      var r, a, l, d
      if (
        q[t] &&
        !1 !==
          (r = new q[t]()).init(
            n,
            r.rawVars
              ? e[t]
              : (function (t, e, i, s, n) {
                  if (
                    !P((t = u(t) ? ri(t, n, e, i, s) : t)) ||
                    (t.style && t.nodeType) ||
                    A(t) ||
                    xe(t)
                  )
                    return H(t) ? ri(t, n, e, i, s) : t
                  var o,
                    r = {}
                  for (o in t) r[o] = ri(t[o], n, e, i, s)
                  return r
                })(e[t], s, n, o, i),
            i,
            s,
            o,
          ) &&
        ((i._pt = a = new Y(i._pt, n, t, 0, 1, r.render, r, 0, r.priority)),
        i !== Hi)
      )
        for (l = i._ptLookup[i._targets.indexOf(n)], d = r._props.length; d--; )
          l[r._props[d]] = a
      return r
    }
    D(I.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 })
    function oi(t, e, i) {
      var s,
        n,
        o,
        r,
        a,
        l,
        d,
        c,
        u,
        p,
        h,
        f,
        m,
        g = t.vars,
        v = g.ease,
        y = g.startAt,
        b = g.immediateRender,
        w = g.lazy,
        _ = g.onUpdate,
        x = g.onUpdateParams,
        k = g.callbackScope,
        T = g.runBackwards,
        C = g.yoyoEase,
        S = g.keyframes,
        P = g.autoRevert,
        O = t._dur,
        E = t._startAt,
        A = t._targets,
        B = t.parent,
        M = B && 'nested' === B.data ? B.vars.targets : A,
        I = 'auto' === t._overwrite && !Yt,
        $ = t.timeline
      if (
        ((t._ease = Ge((v = !$ || (S && v) ? v : 'none'), me.ease)),
        (t._yEase = C ? Xe(Ge(!0 === C ? v : C, me.ease)) : 0),
        C &&
          t._yoyo &&
          !t._repeat &&
          ((C = t._yEase), (t._yEase = t._ease), (t._ease = C)),
        (t._from = !$ && !!g.runBackwards),
        !$ || (S && !g.stagger))
      ) {
        if (
          ((f = (c = A[0] ? it(A[0]).harness : 0) && g[c.prop]),
          (s = ot(g, Ie)),
          E &&
            (E._zTime < 0 && E.progress(1),
            e < 0 && T && b && !P
              ? E.render(-1, !0)
              : E.revert(T && O ? Be : Ae),
            (E._lazy = 0)),
          y)
        ) {
          if (
            (at(
              (t._startAt = W.set(
                A,
                D(
                  {
                    data: 'isStart',
                    overwrite: !1,
                    parent: B,
                    immediateRender: !0,
                    lazy: !E && z(w),
                    startAt: null,
                    delay: 0,
                    onUpdate: _,
                    onUpdateParams: x,
                    callbackScope: k,
                    stagger: 0,
                  },
                  y,
                ),
              )),
            ),
            (t._startAt._dp = 0),
            (t._startAt._sat = t),
            e < 0 && (V || (!b && !P)) && t._startAt.revert(Be),
            b && O && e <= 0 && i <= 0)
          )
            return void (e && (t._zTime = e))
        } else if (T && O && !E)
          if (
            ((o = D(
              {
                overwrite: !1,
                data: 'isFromStart',
                lazy: (b = e ? !1 : b) && !E && z(w),
                immediateRender: b,
                stagger: 0,
                parent: B,
              },
              s,
            )),
            f && (o[c.prop] = f),
            at((t._startAt = W.set(A, o))),
            (t._startAt._dp = 0),
            (t._startAt._sat = t),
            e < 0 && (V ? t._startAt.revert(Be) : t._startAt.render(-1, !0)),
            (t._zTime = e),
            b)
          ) {
            if (!e) return
          } else oi(t._startAt, U, U)
        for (
          t._pt = t._ptCache = 0, w = (O && z(w)) || (w && !O), n = 0;
          n < A.length;
          n++
        ) {
          if (
            ((d = (a = A[n])._gsap || et(A)[n]._gsap),
            (t._ptLookup[n] = p = {}),
            ze[d.id] && $e.length && nt(),
            (h = M === A ? n : M.indexOf(a)),
            c &&
              !1 !== (u = new c()).init(a, f || s, t, h, M) &&
              ((t._pt = r =
                new Y(t._pt, a, u.name, 0, 1, u.render, u, 0, u.priority)),
              u._props.forEach(function (t) {
                p[t] = r
              }),
              u.priority) &&
              (l = 1),
            !c || f)
          )
            for (o in s)
              q[o] && (u = ni(o, s, t, h, a, M))
                ? u.priority && (l = 1)
                : (p[o] = r =
                    ci.call(t, a, o, 'get', s[o], h, M, 0, g.stringFilter))
          t._op && t._op[n] && t.kill(a, t._op[n]),
            I &&
              t._pt &&
              ((ai = t),
              j.killTweensOf(a, p, t.globalTime(e)),
              (m = !t.parent),
              (ai = 0)),
            t._pt && w && (ze[d.id] = 1)
        }
        l && Ci(t), t._onInit && t._onInit(t)
      }
      ;(t._onUpdate = _),
        (t._initted = (!t._op || t._pt) && !m),
        S && e <= 0 && $.render(N, !0, !0)
    }
    function ri(t, e, i, s, n) {
      return u(t)
        ? t.call(e, i, s, n)
        : H(t) && ~t.indexOf('random(')
          ? Ot(t)
          : t
    }
    var ai,
      li,
      di,
      ci = function (t, e, i, s, n, o, r, a, l, d) {
        u(s) && (s = s(n || 0, t, o))
        var c,
          n = t[e],
          o =
            'get' !== i
              ? i
              : u(n)
                ? l
                  ? t[
                      e.indexOf('set') || !u(t['get' + e.substr(3)])
                        ? e
                        : 'get' + e.substr(3)
                    ](l)
                  : t[e]()
                : n,
          i = u(n) ? (l ? vi : gi) : mi
        if (
          (!H(s) ||
            '=' !== (s = ~s.indexOf('random(') ? Ot(s) : s).charAt(1) ||
            (!(c = st(o, s) + (R(o) || 0)) && 0 !== c) ||
            (s = c),
          !d || o !== s || li)
        )
          return isNaN(o * s) || '' === s
            ? (n || e in t || J(e, s),
              function (t, e, i, s, n, o, r) {
                var a,
                  l,
                  d,
                  c,
                  u,
                  p = new Y(this._pt, t, e, 0, 1, _i, null, n),
                  h = 0,
                  f = 0
                for (
                  p.b = i,
                    p.e = s,
                    i += '',
                    (n = ~(s += '').indexOf('random(')) && (s = Ot(s)),
                    o && (o((o = [i, s]), t, e), (i = o[0]), (s = o[1])),
                    a = i.match(Se) || [];
                  (c = Se.exec(s));

                )
                  (d = c[0]),
                    (c = s.substring(h, c.index)),
                    l ? (l = (l + 1) % 5) : 'rgba(' === c.substr(-5) && (l = 1),
                    d !== a[f++] &&
                      ((u = parseFloat(a[f - 1]) || 0),
                      (p._pt = {
                        _next: p._pt,
                        p: c || 1 === f ? c : ',',
                        s: u,
                        c:
                          '=' === d.charAt(1)
                            ? st(u, d) - u
                            : parseFloat(d) - u,
                        m: l && l < 4 ? Math.round : 0,
                      }),
                      (h = Se.lastIndex))
                return (
                  (p.c = h < s.length ? s.substring(h, s.length) : ''),
                  (p.fp = r),
                  (Pe.test(s) || n) && (p.e = 0),
                  (this._pt = p)
                )
              }.call(this, t, e, o, s, i, a || F.stringFilter, l))
            : ((c = new Y(
                this._pt,
                t,
                e,
                +o || 0,
                s - (o || 0),
                'boolean' == typeof n ? wi : bi,
                0,
                i,
              )),
              l && (c.fp = l),
              r && c.modifier(r, this, t),
              (this._pt = c))
      },
      ui = je + 'repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert',
      pi = {},
      W =
        (h(
          ui + ',id,stagger,delay,duration,paused,scrollTrigger',
          function (t) {
            return (pi[t] = 1)
          },
        ),
        i(n, (di = ti)),
        ((e = n.prototype).render = function (t, e, i) {
          var s,
            n,
            o,
            r = this._time,
            a = this._tDur,
            l = this._dur,
            d = t < 0,
            c = a - U < t && !d ? a : t < U ? 0 : t
          if (l) {
            if (
              c !== this._tTime ||
              !t ||
              i ||
              (!this._initted && this._tTime) ||
              (this._startAt && this._zTime < 0 != d)
            ) {
              if (((f = c), (h = this.timeline), this._repeat)) {
                if (((u = l + this._rDelay), this._repeat < -1 && d))
                  return this.totalTime(100 * u + t, e, i)
                if (
                  ((f = O(c % u)),
                  c === a
                    ? ((v = this._repeat), (f = l))
                    : ((v = ~~(c / u)) && v === c / u && ((f = l), v--),
                      l < f && (f = l)),
                  (n = this._yoyo && 1 & v) && ((p = this._yEase), (f = l - f)),
                  (b = Nt(this._tTime, u)),
                  f === r && !i && this._initted)
                )
                  return (this._tTime = c), this
                v !== b &&
                  (h && this._yEase && Dt(h, n),
                  !this.vars.repeatRefresh ||
                    n ||
                    this._lock ||
                    ((this._lock = i = 1),
                    (this.render(O(u * v), !0).invalidate()._lock = 0)))
              }
              if (!this._initted) {
                if (mt(this, d ? t : f, i, e, c)) return (this._tTime = 0), this
                if (r !== this._time) return this
                if (l !== this._dur) return this.render(t, e, i)
              }
              if (
                ((this._tTime = c),
                (this._time = f),
                !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                (this.ratio = o = (p || this._ease)(f / l)),
                this._from && (this.ratio = o = 1 - o),
                f && !r && !e && !v && (_(this, 'onStart'), this._tTime !== c))
              )
                return this
              for (s = this._pt; s; ) s.r(o, s.d), (s = s._next)
              ;(h &&
                h.render(
                  t < 0 ? t : !f && n ? -U : h._dur * h._ease(f / this._dur),
                  e,
                  i,
                )) ||
                (this._startAt && (this._zTime = t)),
                this._onUpdate &&
                  !e &&
                  (d && lt(this, t, 0, i), _(this, 'onUpdate')),
                this._repeat &&
                  v !== b &&
                  this.vars.onRepeat &&
                  !e &&
                  this.parent &&
                  _(this, 'onRepeat'),
                (c !== this._tDur && c) ||
                  this._tTime !== c ||
                  (d && !this._onUpdate && lt(this, t, 0, !0),
                  (!t && l) ||
                    !(
                      (c === this._tDur && 0 < this._ts) ||
                      (!c && this._ts < 0)
                    ) ||
                    at(this, 1),
                  e) ||
                  (d && !r) ||
                  !(c || r || n) ||
                  (_(this, c === a ? 'onComplete' : 'onReverseComplete', !0),
                  !this._prom) ||
                  (c < a && 0 < this.timeScale()) ||
                  this._prom()
            }
          } else {
            var u = this
            var p = t
            var h = e
            var f = i
            var m,
              g,
              v = u.ratio,
              y =
                p < 0 ||
                (!p &&
                  ((!u._start &&
                    (function t(e) {
                      e = e.parent
                      return (
                        e &&
                        e._ts &&
                        e._initted &&
                        !e._lock &&
                        (e.rawTime() < 0 || t(e))
                      )
                    })(u) &&
                    (u._initted || !Ut(u))) ||
                    ((u._ts < 0 || u._dp._ts < 0) && !Ut(u))))
                  ? 0
                  : 1,
              b = u._rDelay,
              l = 0
            if (
              (b &&
                u._repeat &&
                ((l = qt(0, u._tDur, p)),
                (g = Nt(l, b)),
                u._yoyo && 1 & g && (y = 1 - y),
                g !== Nt(u._tTime, b)) &&
                ((v = 1 - y), u.vars.repeatRefresh) &&
                u._initted &&
                u.invalidate(),
              y !== v || V || f || u._zTime === U || (!p && u._zTime))
            ) {
              if (u._initted || !mt(u, p, f, h, l)) {
                for (
                  g = u._zTime,
                    u._zTime = p || (h ? U : 0),
                    h = h || (p && !g),
                    u.ratio = y,
                    u._from && (y = 1 - y),
                    u._time = 0,
                    u._tTime = l,
                    m = u._pt;
                  m;

                )
                  m.r(y, m.d), (m = m._next)
                p < 0 && lt(u, p, 0, !0),
                  u._onUpdate && !h && _(u, 'onUpdate'),
                  l && u._repeat && !h && u.parent && _(u, 'onRepeat'),
                  (p >= u._tDur || p < 0) &&
                    u.ratio === y &&
                    (y && at(u, 1),
                    h ||
                      V ||
                      (_(u, y ? 'onComplete' : 'onReverseComplete', !0),
                      u._prom && u._prom()))
              }
            } else u._zTime || (u._zTime = p)
          }
          return this
        }),
        (e.targets = function () {
          return this._targets
        }),
        (e.invalidate = function (t) {
          return (
            (t && this.vars.runBackwards) || (this._startAt = 0),
            (this._pt =
              this._op =
              this._onUpdate =
              this._lazy =
              this.ratio =
                0),
            (this._ptLookup = []),
            this.timeline && this.timeline.invalidate(t),
            di.prototype.invalidate.call(this, t)
          )
        }),
        (e.resetTo = function (t, e, i, s) {
          Jt || f.wake(), this._ts || this.play()
          var n,
            o = Math.min(this._dur, (this._dp._time - this._start) * this._ts)
          return (
            this._initted || oi(this, o),
            (n = this._ease(o / this._dur)),
            (function (t, e, i, s, n, o, r) {
              var a,
                l,
                d,
                c,
                u = ((t._pt && t._ptCache) || (t._ptCache = {}))[e]
              if (!u)
                for (
                  u = t._ptCache[e] = [],
                    d = t._ptLookup,
                    c = t._targets.length;
                  c--;

                ) {
                  if ((a = d[c][e]) && a.d && a.d._pt)
                    for (a = a.d._pt; a && a.p !== e && a.fp !== e; )
                      a = a._next
                  if (!a)
                    return (li = 1), (t.vars[e] = '+=0'), oi(t, r), (li = 0), 1
                  u.push(a)
                }
              for (c = u.length; c--; )
                ((a = (l = u[c])._pt || l).s =
                  (!s && 0 !== s) || n ? a.s + (s || 0) + o * a.c : s),
                  (a.c = i - a.s),
                  l.e && (l.e = L(i) + R(l.e)),
                  l.b && (l.b = a.s + R(l.b))
            })(this, t, e, i, s, n, o)
              ? this.resetTo(t, e, i, s)
              : (pt(this, 0),
                this.parent ||
                  T(
                    this._dp,
                    this,
                    '_first',
                    '_last',
                    this._dp._sort ? '_start' : 0,
                  ),
                this.render(0))
          )
        }),
        (e.kill = function (t, e) {
          if ((void 0 === e && (e = 'all'), !(t || (e && 'all' !== e))))
            return (this._lazy = this._pt = 0), this.parent ? At(this) : this
          if (this.timeline)
            (p = this.timeline.totalDuration()),
              this.timeline.killTweensOf(t, e, ai && !0 !== ai.vars.overwrite)
                ._first || At(this),
              this.parent &&
                p !== this.timeline.totalDuration() &&
                gt(this, (this._dur * this.timeline._tDur) / p, 0, 1)
          else {
            var i,
              s,
              n,
              o,
              r,
              a,
              l,
              d = this._targets,
              c = t ? B(t) : d,
              u = this._ptLookup,
              p = this._pt
            if (
              (!e || 'all' === e) &&
              (function (t, e) {
                for (
                  var i = t.length, s = i === e.length;
                  s && i-- && t[i] === e[i];

                );
                return i < 0
              })(d, c)
            )
              return 'all' === e && (this._pt = 0), At(this)
            for (
              i = this._op = this._op || [],
                'all' !== e &&
                  (H(e) &&
                    ((r = {}),
                    h(e, function (t) {
                      return (r[t] = 1)
                    }),
                    (e = r)),
                  (e = (function (t, e) {
                    var i,
                      s,
                      n,
                      o,
                      t = t[0] ? it(t[0]).harness : 0,
                      r = t && t.aliases
                    if (!r) return e
                    for (s in ((i = Ft({}, e)), r))
                      if ((s in i))
                        for (n = (o = r[s].split(',')).length; n--; )
                          i[o[n]] = i[s]
                    return i
                  })(d, e))),
                l = d.length;
              l--;

            )
              if (~c.indexOf(d[l]))
                for (r in ((s = u[l]),
                'all' === e
                  ? ((i[l] = e), (o = s), (n = {}))
                  : ((n = i[l] = i[l] || {}), (o = e)),
                o))
                  (a = s && s[r]) &&
                    (('kill' in a.d && !0 !== a.d.kill(r)) || C(this, a, '_pt'),
                    delete s[r]),
                    'all' !== n && (n[r] = 1)
            this._initted && !this._pt && p && At(this)
          }
          return this
        }),
        (n.to = function (t, e, i) {
          return new n(t, e, i)
        }),
        (n.from = function (t, e) {
          return yt(1, arguments)
        }),
        (n.delayedCall = function (t, e, i, s) {
          return new n(e, 0, {
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: t,
            onComplete: e,
            onReverseComplete: e,
            onCompleteParams: i,
            onReverseCompleteParams: i,
            callbackScope: s,
          })
        }),
        (n.fromTo = function (t, e, i) {
          return yt(2, arguments)
        }),
        (n.set = function (t, e) {
          return (e.duration = 0), e.repeatDelay || (e.repeat = 0), new n(t, e)
        }),
        (n.killTweensOf = function (t, e, i) {
          return j.killTweensOf(t, e, i)
        }),
        n)
    function n(t, e, i, s) {
      var n
      'number' == typeof e && ((i.duration = e), (e = i), (i = null))
      var o,
        r,
        a,
        l,
        d,
        c,
        u,
        p,
        s = (n = di.call(this, s ? e : rt(e)) || this).vars,
        h = s.duration,
        f = s.delay,
        m = s.immediateRender,
        g = s.stagger,
        v = s.overwrite,
        y = s.keyframes,
        b = s.defaults,
        w = s.scrollTrigger,
        _ = s.yoyoEase,
        s = e.parent || j,
        x = (A(t) || xe(t) ? K(t[0]) : 'length' in e) ? [t] : B(t)
      if (
        ((n._targets = x.length
          ? et(x)
          : tt(
              'GSAP target ' + t + ' not found. https://greensock.com',
              !F.nullTargetWarn,
            ) || []),
        (n._ptLookup = []),
        (n._overwrite = v),
        y || g || Z(h) || Z(f))
      ) {
        if (
          ((e = n.vars),
          (o = n.timeline =
            new I({
              data: 'nested',
              defaults: b || {},
              targets: s && 'nested' === s.data ? s.vars.targets : x,
            })).kill(),
          (o.parent = o._dp = $(n)),
          (o._start = 0),
          g || Z(h) || Z(f))
        ) {
          if (((l = x.length), (u = g && kt(g)), P(g)))
            for (d in g) ~ui.indexOf(d) && ((p = p || {})[d] = g[d])
          for (r = 0; r < l; r++)
            ((a = ot(e, pi)).stagger = 0),
              _ && (a.yoyoEase = _),
              p && Ft(a, p),
              (c = x[r]),
              (a.duration = +ri(h, $(n), r, c, x)),
              (a.delay = (+ri(f, $(n), r, c, x) || 0) - n._delay),
              !g &&
                1 === l &&
                a.delay &&
                ((n._delay = f = a.delay), (n._start += f), (a.delay = 0)),
              o.to(c, a, u ? u(r, c, x) : 0),
              (o._ease = M.none)
          o.duration() ? (h = f = 0) : (n.timeline = 0)
        } else if (y) {
          rt(D(o.vars.defaults, { ease: 'none' })),
            (o._ease = Ge(y.ease || e.ease || 'none'))
          var k,
            T,
            C,
            S = 0
          if (A(y))
            y.forEach(function (t) {
              return o.to(x, t, '>')
            }),
              o.duration()
          else {
            for (d in ((a = {}), y))
              'ease' !== d &&
                'easeEach' !== d &&
                (function (t, i, e, s) {
                  var n,
                    o,
                    r = i.ease || s || 'power1.inOut'
                  if (A(i))
                    (o = e[t] || (e[t] = [])),
                      i.forEach(function (t, e) {
                        return o.push({
                          t: (e / (i.length - 1)) * 100,
                          v: t,
                          e: r,
                        })
                      })
                  else
                    for (n in i)
                      (o = e[n] || (e[n] = [])),
                        'ease' !== n &&
                          o.push({ t: parseFloat(t), v: i[n], e: r })
                })(d, y[d], a, y.easeEach)
            for (d in a)
              for (
                k = a[d].sort(function (t, e) {
                  return t.t - e.t
                }),
                  r = S = 0;
                r < k.length;
                r++
              )
                ((C = {
                  ease: (T = k[r]).e,
                  duration: ((T.t - (r ? k[r - 1].t : 0)) / 100) * h,
                })[d] = T.v),
                  o.to(x, C, S),
                  (S += C.duration)
            o.duration() < h && o.to({}, { duration: h - o.duration() })
          }
        }
        h || n.duration((h = o.duration()))
      } else n.timeline = 0
      return (
        !0 !== v || Yt || ((ai = $(n)), j.killTweensOf(x), (ai = 0)),
        E(s, $(n), i),
        e.reversed && n.reverse(),
        e.paused && n.paused(!0),
        (m ||
          (!h &&
            !y &&
            n._start === O(s._time) &&
            z(m) &&
            (function t(e) {
              return !e || (e._ts && t(e.parent))
            })($(n)) &&
            'nested' !== s.data)) &&
          ((n._tTime = -U), n.render(Math.max(0, -f) || 0)),
        w && ft($(n), w),
        n
      )
    }
    function hi(t, e, i) {
      return t.setAttribute(e, i)
    }
    function fi(t, e, i, s) {
      s.mSet(t, e, s.m.call(s.tween, i, s.mt), s)
    }
    D(W.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
      h('staggerTo,staggerFrom,staggerFromTo', function (i) {
        W[i] = function () {
          var t = new I(),
            e = Re.call(arguments, 0)
          return e.splice('staggerFromTo' === i ? 5 : 4, 0, 0), t[i].apply(t, e)
        }
      })
    var mi = function (t, e, i) {
        return (t[e] = i)
      },
      gi = function (t, e, i) {
        return t[e](i)
      },
      vi = function (t, e, i, s) {
        return t[e](s.fp, i)
      },
      yi = function (t, e) {
        return u(t[e]) ? gi : o(t[e]) && t.setAttribute ? hi : mi
      },
      bi = function (t, e) {
        return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e)
      },
      wi = function (t, e) {
        return e.set(e.t, e.p, !!(e.s + e.c * t), e)
      },
      _i = function (t, e) {
        var i = e._pt,
          s = ''
        if (!t && e.b) s = e.b
        else if (1 === t && e.e) s = e.e
        else {
          for (; i; )
            (s =
              i.p +
              (i.m
                ? i.m(i.s + i.c * t)
                : Math.round(1e4 * (i.s + i.c * t)) / 1e4) +
              s),
              (i = i._next)
          s += e.c
        }
        e.set(e.t, e.p, s, e)
      },
      xi = function (t, e) {
        for (var i = e._pt; i; ) i.r(t, i.d), (i = i._next)
      },
      ki = function (t, e, i, s) {
        for (var n, o = this._pt; o; )
          (n = o._next), o.p === s && o.modifier(t, e, i), (o = n)
      },
      Ti = function (t) {
        for (var e, i, s = this._pt; s; )
          (i = s._next),
            (s.p === t && !s.op) || s.op === t
              ? C(this, s, '_pt')
              : s.dep || (e = 1),
            (s = i)
        return !e
      },
      Ci = function (t) {
        for (var e, i, s, n, o = t._pt; o; ) {
          for (e = o._next, i = s; i && i.pr > o.pr; ) i = i._next
          ;(o._prev = i ? i._prev : n) ? (o._prev._next = o) : (s = o),
            (o._next = i) ? (i._prev = o) : (n = o),
            (o = e)
        }
        t._pt = s
      },
      Y =
        ((Si.prototype.modifier = function (t, e, i) {
          ;(this.mSet = this.mSet || this.set),
            (this.set = fi),
            (this.m = t),
            (this.mt = i),
            (this.tween = e)
        }),
        Si)
    function Si(t, e, i, s, n, o, r, a, l) {
      ;(this.t = e),
        (this.s = s),
        (this.c = n),
        (this.p = i),
        (this.r = o || bi),
        (this.d = r || this),
        (this.set = a || mi),
        (this.pr = l || 0),
        (this._next = t) && (t._prev = this)
    }
    function Pi(t) {
      ;(Ai[t] || Bi).map(function (t) {
        return t()
      })
    }
    function Oi() {
      var t = Date.now(),
        a = []
      2 < t - Mi &&
        (Pi('matchMediaInit'),
        Ei.forEach(function (t) {
          var e,
            i,
            s,
            n,
            o = t.queries,
            r = t.conditions
          for (i in o)
            (e = c.matchMedia(o[i]).matches) && (s = 1),
              e !== r[i] && ((r[i] = e), (n = 1))
          n && (t.revert(), s) && a.push(t)
        }),
        Pi('matchMediaRevert'),
        a.forEach(function (t) {
          return t.onMatch(t)
        }),
        (Mi = t),
        Pi('matchMedia'))
    }
    h(
      je +
        'parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger',
      function (t) {
        return (Ie[t] = 1)
      },
    ),
      (r.TweenMax = r.TweenLite = W),
      (r.TimelineLite = r.TimelineMax = I),
      (j = new I({
        sortChildren: !1,
        defaults: me,
        autoRemoveChildren: !0,
        id: 'root',
        smoothChildTiming: !0,
      })),
      (F.stringFilter = Lt)
    var Ei = [],
      Ai = {},
      Bi = [],
      Mi = 0,
      Ii = 0,
      $i =
        (((e = zi.prototype).add = function (t, s, n) {
          function e() {
            var t,
              e = l,
              i = o.selector
            return (
              e && e !== o && e.data.push(o),
              n && (o.selector = _t(n)),
              (l = o),
              u((t = s.apply(o, arguments))) && o._r.push(t),
              (l = e),
              (o.selector = i),
              (o.isReverted = !1),
              t
            )
          }
          u(t) && ((n = s), (s = t), (t = u))
          var o = this
          return (o.last = e), t === u ? e(o) : t ? (o[t] = e) : e
        }),
        (e.ignore = function (t) {
          var e = l
          ;(l = null), t(this), (l = e)
        }),
        (e.getTweens = function () {
          var e = []
          return (
            this.data.forEach(function (t) {
              return t instanceof zi
                ? e.push.apply(e, t.getTweens())
                : t instanceof W &&
                    !(t.parent && 'nested' === t.parent.data) &&
                    e.push(t)
            }),
            e
          )
        }),
        (e.clear = function () {
          this._r.length = this.data.length = 0
        }),
        (e.kill = function (e, t) {
          var i,
            s = this
          if (
            (e
              ? ((i = this.getTweens()),
                this.data.forEach(function (t) {
                  'isFlip' === t.data &&
                    (t.revert(),
                    t.getChildren(!0, !0, !1).forEach(function (t) {
                      return i.splice(i.indexOf(t), 1)
                    }))
                }),
                i
                  .map(function (t) {
                    return { g: t.globalTime(0), t: t }
                  })
                  .sort(function (t, e) {
                    return e.g - t.g || -1 / 0
                  })
                  .forEach(function (t) {
                    return t.t.revert(e)
                  }),
                this.data.forEach(function (t) {
                  return !(t instanceof W) && t.revert && t.revert(e)
                }),
                this._r.forEach(function (t) {
                  return t(e, s)
                }),
                (this.isReverted = !0))
              : this.data.forEach(function (t) {
                  return t.kill && t.kill()
                }),
            this.clear(),
            t)
          )
            for (var n = Ei.length; n--; )
              Ei[n].id === this.id && Ei.splice(n, 1)
        }),
        (e.revert = function (t) {
          this.kill(t || {})
        }),
        zi)
    function zi(t, e) {
      ;(this.selector = e && _t(e)),
        (this.data = []),
        (this._r = []),
        (this.isReverted = !1),
        (this.id = Ii++),
        t && this.add(t)
    }
    ;((e = Di.prototype).add = function (t, e, i) {
      P(t) || (t = { matches: t })
      var s,
        n,
        o,
        r = new $i(0, i || this.scope),
        a = (r.conditions = {})
      for (n in (l && !r.selector && (r.selector = l.selector),
      this.contexts.push(r),
      (e = r.add('onMatch', e)),
      (r.queries = t)))
        'all' === n
          ? (o = 1)
          : (s = c.matchMedia(t[n])) &&
            (Ei.indexOf(r) < 0 && Ei.push(r),
            (a[n] = s.matches) && (o = 1),
            s.addListener
              ? s.addListener(Oi)
              : s.addEventListener('change', Oi))
      return o && e(r), this
    }),
      (e.revert = function (t) {
        this.kill(t || {})
      }),
      (e.kill = function (e) {
        this.contexts.forEach(function (t) {
          return t.kill(e, !0)
        })
      })
    var Li = Di
    function Di(t) {
      ;(this.contexts = []), (this.scope = t)
    }
    var Vi = {
      registerPlugin: function () {
        for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
          e[i] = arguments[i]
        e.forEach(Bt)
      },
      timeline: function (t) {
        return new I(t)
      },
      getTweensOf: function (t, e) {
        return j.getTweensOf(t, e)
      },
      getProperty: function (s, t, e, i) {
        var n = it((s = H(s) ? B(s)[0] : s) || {}).get,
          o = e ? x : w
        return (
          'native' === e && (e = ''),
          s &&
            (t
              ? o(((q[t] && q[t].get) || n)(s, t, e, i))
              : function (t, e, i) {
                  return o(((q[t] && q[t].get) || n)(s, t, e, i))
                })
        )
      },
      quickSetter: function (i, e, s) {
        var n, o
        if (1 < (i = B(i)).length)
          return (
            (n = i.map(function (t) {
              return m.quickSetter(t, e, s)
            })),
            (o = n.length),
            function (t) {
              for (var e = o; e--; ) n[e](t)
            }
          )
        i = i[0] || {}
        var r = q[e],
          a = it(i),
          l = (a.harness && (a.harness.aliases || {})[e]) || e,
          d = r
            ? function (t) {
                var e = new r()
                ;(Hi._pt = 0),
                  e.init(i, s ? t + s : t, Hi, 0, [i]),
                  e.render(1, e),
                  Hi._pt && xi(1, Hi)
              }
            : a.set(i, l)
        return r
          ? d
          : function (t) {
              return d(i, l, s ? t + s : t, a, 1)
            }
      },
      quickTo: function (t, s, e) {
        function i(t, e, i) {
          return n.resetTo(s, t, e, i)
        }
        var n = m.to(
          t,
          Ft((((t = {})[s] = '+=0.1'), (t.paused = !0), t), e || {}),
        )
        return (i.tween = n), i
      },
      isTweening: function (t) {
        return 0 < j.getTweensOf(t, !0).length
      },
      defaults: function (t) {
        return t && t.ease && (t.ease = Ge(t.ease, me.ease)), k(me, t || {})
      },
      config: function (t) {
        return k(F, t || {})
      },
      registerEffect: function (t) {
        var s = t.name,
          n = t.effect,
          e = t.plugins,
          o = t.defaults,
          t = t.extendTimeline
        ;(e || '').split(',').forEach(function (t) {
          return (
            t && !q[t] && !r[t] && tt(s + ' effect requires ' + t + ' plugin.')
          )
        }),
          (Le[s] = function (t, e, i) {
            return n(B(t), D(e || {}, o), i)
          }),
          t &&
            (I.prototype[s] = function (t, e, i) {
              return this.add(Le[s](t, P(e) ? e : (i = e) && {}, this), i)
            })
      },
      registerEase: function (t, e) {
        M[t] = Ge(e)
      },
      parseEase: function (t, e) {
        return arguments.length ? Ge(t, e) : M
      },
      getById: function (t) {
        return j.getById(t)
      },
      exportRoot: function (t, e) {
        var i,
          s,
          n = new I((t = void 0 === t ? {} : t))
        for (
          n.smoothChildTiming = z(t.smoothChildTiming),
            j.remove(n),
            n._dp = 0,
            n._time = n._tTime = j._time,
            i = j._first;
          i;

        )
          (s = i._next),
            (!e &&
              !i._dur &&
              i instanceof W &&
              i.vars.onComplete === i._targets[0]) ||
              E(n, i, i._start - i._delay),
            (i = s)
        return E(j, n, 0), n
      },
      context: function (t, e) {
        return t ? new $i(t, e) : l
      },
      matchMedia: function (t) {
        return new Li(t)
      },
      matchMediaRefresh: function () {
        return (
          Ei.forEach(function (t) {
            var e,
              i,
              s = t.conditions
            for (i in s) s[i] && ((s[i] = !1), (e = 1))
            e && t.revert()
          }) || Oi()
        )
      },
      addEventListener: function (t, e) {
        t = Ai[t] || (Ai[t] = [])
        ~t.indexOf(e) || t.push(e)
      },
      removeEventListener: function (t, e) {
        ;(t = Ai[t]), (e = t && t.indexOf(e))
        0 <= e && t.splice(e, 1)
      },
      utils: {
        wrap: function t(e, i, s) {
          var n = i - e
          return A(e)
            ? Pt(e, t(0, e.length), i)
            : bt(s, function (t) {
                return ((n + ((t - e) % n)) % n) + e
              })
        },
        wrapYoyo: function t(e, i, s) {
          var n = i - e,
            o = 2 * n
          return A(e)
            ? Pt(e, t(0, e.length - 1), i)
            : bt(s, function (t) {
                return e + (n < (t = (o + ((t - e) % o)) % o || 0) ? o - t : t)
              })
        },
        distribute: kt,
        random: St,
        snap: Ct,
        normalize: function (t, e, i) {
          return Wt(t, e, 0, 1, i)
        },
        getUnit: R,
        clamp: function (e, i, t) {
          return bt(t, function (t) {
            return qt(e, i, t)
          })
        },
        splitColor: It,
        toArray: B,
        selector: _t,
        mapRange: Wt,
        pipe: function () {
          for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
            e[i] = arguments[i]
          return function (t) {
            return e.reduce(function (t, e) {
              return e(t)
            }, t)
          }
        },
        unitize: function (e, i) {
          return function (t) {
            return e(parseFloat(t)) + (i || R(t))
          }
        },
        interpolate: function t(e, i, s, n) {
          var o = isNaN(e + i)
            ? 0
            : function (t) {
                return (1 - t) * e + t * i
              }
          if (!o) {
            var r,
              a,
              l,
              d,
              c,
              u = H(e),
              p = {}
            if ((!0 === s && ((n = 1), (s = null)), u))
              (e = { p: e }), (i = { p: i })
            else if (A(e) && !A(i)) {
              for (l = [], d = e.length, c = d - 2, a = 1; a < d; a++)
                l.push(t(e[a - 1], e[a]))
              d--,
                (o = function (t) {
                  t *= d
                  var e = Math.min(c, ~~t)
                  return l[e](t - e)
                }),
                (s = i)
            } else n || (e = Ft(A(e) ? [] : {}, e))
            if (!l) {
              for (r in i) ci.call(p, e, r, 'get', i[r])
              o = function (t) {
                return xi(t, p) || (u ? e.p : e)
              }
            }
          }
          return bt(s, o)
        },
        shuffle: xt,
      },
      install: s,
      effects: Le,
      ticker: f,
      updateRoot: I.updateRoot,
      plugins: q,
      globalTimeline: j,
      core: {
        PropTween: Y,
        globals: g,
        Tween: W,
        Timeline: I,
        Animation: ti,
        getCache: it,
        _removeLinkedListItem: C,
        reverting: function () {
          return V
        },
        context: function (t) {
          return t && l && (l.data.push(t), (t._ctx = l)), l
        },
        suppressOverwrites: function (t) {
          return (Yt = t)
        },
      },
    }
    function ji(t, c) {
      return {
        name: t,
        rawVars: 1,
        init: function (t, d, e) {
          e._onInit = function (t) {
            var e, i
            if (
              (H(d) &&
                ((e = {}),
                h(d, function (t) {
                  return (e[t] = 1)
                }),
                (d = e)),
              c)
            ) {
              for (i in ((e = {}), d)) e[i] = c(d[i])
              d = e
            }
            var s,
              n,
              o,
              r = t,
              a = d,
              l = r._targets
            for (s in a)
              for (n = l.length; n--; )
                (o = (o = r._ptLookup[n][s]) && o.d) &&
                  (o._pt &&
                    (o = (function (t, e) {
                      for (
                        var i = t._pt;
                        i && i.p !== e && i.op !== e && i.fp !== e;

                      )
                        i = i._next
                      return i
                    })(o, s)),
                  o) &&
                  o.modifier &&
                  o.modifier(a[s], r, l[n], s)
          }
        },
      }
    }
    h('to,from,fromTo,delayedCall,set,killTweensOf', function (t) {
      return (Vi[t] = W[t])
    }),
      f.add(I.updateRoot)
    var Hi = Vi.to({}, { duration: 0 }),
      m =
        Vi.registerPlugin(
          {
            name: 'attr',
            init: function (t, e, i, s, n) {
              var o, r, a
              for (o in ((this.tween = i), e))
                (a = t.getAttribute(o) || ''),
                  ((r = this.add(
                    t,
                    'setAttribute',
                    (a || 0) + '',
                    e[o],
                    s,
                    n,
                    0,
                    0,
                    o,
                  )).op = o),
                  (r.b = a),
                  this._props.push(o)
            },
            render: function (t, e) {
              for (var i = e._pt; i; )
                V ? i.set(i.t, i.p, i.b, i) : i.r(t, i.d), (i = i._next)
            },
          },
          {
            name: 'endArray',
            init: function (t, e) {
              for (var i = e.length; i--; )
                this.add(t, i, t[i] || 0, e[i], 0, 0, 0, 0, 0, 1)
            },
          },
          ji('roundProps', Tt),
          ji('modifiers'),
          ji('snap', Ct),
        ) || Vi
    function Ri(t, e) {
      return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
    }
    function Fi(t, e) {
      return e.set(
        e.t,
        e.p,
        1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
        e,
      )
    }
    function Ni(t, e) {
      return e.set(
        e.t,
        e.p,
        t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
        e,
      )
    }
    function Ui(t, e) {
      t = e.s + e.c * t
      e.set(e.t, e.p, ~~(t + (t < 0 ? -0.5 : 0.5)) + e.u, e)
    }
    function qi(t, e) {
      return e.set(e.t, e.p, t ? e.e : e.b, e)
    }
    function Wi(t, e) {
      return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
    }
    function Yi(t, e, i) {
      return (t.style[e] = i)
    }
    function Qi(t, e, i) {
      return t.style.setProperty(e, i)
    }
    function Xi(t, e, i) {
      return (t._gsap[e] = i)
    }
    function Gi(t, e, i) {
      return (t._gsap.scaleX = t._gsap.scaleY = i)
    }
    function Ki(t, e, i, s, n) {
      t = t._gsap
      ;(t.scaleX = t.scaleY = i), t.renderTransform(n, t)
    }
    function Zi(t, e, i, s, n) {
      t = t._gsap
      ;(t[e] = i), t.renderTransform(n, t)
    }
    function Ji(t, e) {
      var i = this,
        s = this.target,
        n = s.style
      if (t in Us && n) {
        if (((this.tfm = this.tfm || {}), 'transform' === t))
          return Ks.transform.split(',').forEach(function (t) {
            return Ji.call(i, t, e)
          })
        if (
          (~(t = Ks[t] || t).indexOf(',')
            ? t.split(',').forEach(function (t) {
                return (i.tfm[t] = sn(s, t))
              })
            : (this.tfm[t] = s._gsap.x ? s._gsap[t] : sn(s, t)),
          0 <= this.props.indexOf(X))
        )
          return
        s._gsap.svg &&
          ((this.svgo = s.getAttribute('data-svg-origin')),
          this.props.push(G, e, '')),
          (t = X)
      }
      ;(n || e) && this.props.push(t, e, n[t])
    }
    function ts(t) {
      t.translate &&
        (t.removeProperty('translate'),
        t.removeProperty('scale'),
        t.removeProperty('rotate'))
    }
    function es() {
      for (
        var t, e = this.props, i = this.target, s = i.style, n = i._gsap, o = 0;
        o < e.length;
        o += 3
      )
        e[o + 1]
          ? (i[e[o]] = e[o + 2])
          : e[o + 2]
            ? (s[e[o]] = e[o + 2])
            : s.removeProperty(
                '--' === e[o].substr(0, 2)
                  ? e[o]
                  : e[o].replace(Qs, '-$1').toLowerCase(),
              )
      if (this.tfm) {
        for (t in this.tfm) n[t] = this.tfm[t]
        n.svg &&
          (n.renderTransform(),
          i.setAttribute('data-svg-origin', this.svgo || '')),
          ((o = Cs()) && o.isStart) || s[X] || (ts(s), (n.uncache = 1))
      }
    }
    function is(t, e) {
      var i = { target: t, props: [], revert: es, save: Ji }
      return (
        t._gsap || m.core.getCache(t),
        e &&
          e.split(',').forEach(function (t) {
            return i.save(t)
          }),
        i
      )
    }
    function ss(t, e) {
      e = ws.createElementNS
        ? ws.createElementNS(
            (e || 'http://www.w3.org/1999/xhtml').replace(/^https/, 'http'),
            t,
          )
        : ws.createElement(t)
      return e.style ? e : ws.createElement(t)
    }
    function Q(t, e, i) {
      var s = getComputedStyle(t)
      return (
        s[e] ||
        s.getPropertyValue(e.replace(Qs, '-$1').toLowerCase()) ||
        s.getPropertyValue(e) ||
        (!i && Q(t, Js(e) || e, 1)) ||
        ''
      )
    }
    function ns() {
      'undefined' != typeof window &&
        window.document &&
        ((_s = (ws = window.document).documentElement),
        (ks = ss('div') || { style: {} }),
        ss('div'),
        (X = Js(X)),
        (G = X + 'Origin'),
        (ks.style.cssText =
          'border-width:0;line-height:0;position:absolute;padding:0'),
        (Ss = !!Js('perspective')),
        (Cs = m.core.reverting),
        (xs = 1))
    }
    function os(t) {
      var e,
        i = ss(
          'svg',
          (this.ownerSVGElement &&
            this.ownerSVGElement.getAttribute('xmlns')) ||
            'http://www.w3.org/2000/svg',
        ),
        s = this.parentNode,
        n = this.nextSibling,
        o = this.style.cssText
      if (
        (_s.appendChild(i),
        i.appendChild(this),
        (this.style.display = 'block'),
        t)
      )
        try {
          ;(e = this.getBBox()),
            (this._gsapBBox = this.getBBox),
            (this.getBBox = os)
        } catch (t) {}
      else this._gsapBBox && (e = this._gsapBBox())
      return (
        s && (n ? s.insertBefore(this, n) : s.appendChild(this)),
        _s.removeChild(i),
        (this.style.cssText = o),
        e
      )
    }
    function rs(t, e) {
      for (var i = e.length; i--; )
        if (t.hasAttribute(e[i])) return t.getAttribute(e[i])
    }
    function as(e) {
      var i
      try {
        i = e.getBBox()
      } catch (t) {
        i = os.call(e, !0)
      }
      return !(i =
        (i && (i.width || i.height)) || e.getBBox === os
          ? i
          : os.call(e, !0)) ||
        i.width ||
        i.x ||
        i.y
        ? i
        : {
            x: +rs(e, ['x', 'cx', 'x1']) || 0,
            y: +rs(e, ['y', 'cy', 'y1']) || 0,
            width: 0,
            height: 0,
          }
    }
    function ls(t) {
      return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !as(t))
    }
    function ds(t, e) {
      e &&
        ((t = t.style),
        e in Us && e !== G && (e = X),
        t.removeProperty
          ? (('ms' !== e.substr(0, 2) && 'webkit' !== e.substr(0, 6)) ||
              (e = '-' + e),
            t.removeProperty(e.replace(Qs, '-$1').toLowerCase()))
          : t.removeAttribute(e))
    }
    function cs(t, e, i, s, n, o) {
      e = new Y(t._pt, e, i, 0, 1, o ? Wi : qi)
      ;((t._pt = e).b = s), (e.e = n), t._props.push(i)
    }
    function us(t, e, i, s) {
      var n,
        o = parseFloat(i) || 0,
        r = (i + '').trim().substr((o + '').length) || 'px',
        a = ks.style,
        l = Xs.test(e),
        d = 'svg' === t.tagName.toLowerCase(),
        c = (d ? 'client' : 'offset') + (l ? 'Width' : 'Height'),
        u = 'px' === s,
        p = '%' === s
      return s === r || !o || tn[s] || tn[r]
        ? o
        : ('px' === r || u || (o = us(t, e, i, 'px')),
          (i = t.getCTM && ls(t)),
          (!p && '%' !== r) || (!Us[e] && !~e.indexOf('adius'))
            ? ((a[l ? 'width' : 'height'] = 100 + (u ? r : s)),
              (e =
                ~e.indexOf('adius') || ('em' === s && t.appendChild && !d)
                  ? t
                  : t.parentNode),
              (s = (e =
                (e = i ? (t.ownerSVGElement || {}).parentNode : e) &&
                e !== ws &&
                e.appendChild
                  ? e
                  : ws.body)._gsap) &&
              p &&
              s.width &&
              l &&
              s.time === f.time &&
              !s.uncache
                ? L((o / s.width) * 100)
                : ((!p && '%' !== r) ||
                    en[Q(e, 'display')] ||
                    (a.position = Q(t, 'position')),
                  e === t && (a.position = 'static'),
                  e.appendChild(ks),
                  (n = ks[c]),
                  e.removeChild(ks),
                  (a.position = 'absolute'),
                  l && p && (((s = it(e)).time = f.time), (s.width = e[c])),
                  L(u ? (n * o) / 100 : n && o ? (100 / n) * o : 0)))
            : ((n = i ? t.getBBox()[l ? 'width' : 'height'] : t[c]),
              L(p ? (o / n) * 100 : (o / 100) * n)))
    }
    function ps(t, e, i, s) {
      var n
      ;(i && 'none' !== i) ||
        ((n = (o = Js(e, t, 1)) && Q(t, o, 1)) && n !== i
          ? ((e = o), (i = n))
          : 'borderColor' === e && (i = Q(t, 'borderTopColor')))
      var o,
        r,
        a,
        l,
        d,
        c,
        u,
        p,
        h,
        f = new Y(this._pt, t.style, e, 0, 1, _i),
        m = 0,
        g = 0
      if (
        ((f.b = i),
        (f.e = s),
        (i += ''),
        'auto' == (s += '') &&
          ((t.style[e] = s), (s = Q(t, e) || s), (t.style[e] = i)),
        Lt((o = [i, s])),
        (s = o[1]),
        (r = (i = o[0]).match(Ce) || []),
        (s.match(Ce) || []).length)
      ) {
        for (; (u = Ce.exec(s)); )
          (p = u[0]),
            (u = s.substring(m, u.index)),
            l
              ? (l = (l + 1) % 5)
              : ('rgba(' !== u.substr(-5) && 'hsla(' !== u.substr(-5)) ||
                (l = 1),
            p !== (d = r[g++] || '') &&
              ((a = parseFloat(d) || 0),
              (h = d.substr((a + '').length)),
              '=' === p.charAt(1) && (p = st(a, p) + h),
              (c = parseFloat(p)),
              (p = p.substr((c + '').length)),
              (m = Ce.lastIndex - p.length),
              p ||
                ((p = p || F.units[e] || h),
                m === s.length && ((s += p), (f.e += p))),
              h !== p && (a = us(t, e, d, p) || 0),
              (f._pt = {
                _next: f._pt,
                p: u || 1 === g ? u : ',',
                s: a,
                c: c - a,
                m: (l && l < 4) || 'zIndex' === e ? Math.round : 0,
              }))
        f.c = m < s.length ? s.substring(m, s.length) : ''
      } else f.r = 'display' === e && 'none' === s ? Wi : qi
      return Pe.test(s) && (f.e = 0), (this._pt = f)
    }
    function hs(t, e) {
      if (e.tween && e.tween._time === e.tween._dur) {
        var i,
          s,
          n,
          o = e.t,
          r = o.style,
          a = e.u,
          e = o._gsap
        if ('all' === a || !0 === a) (r.cssText = ''), (s = 1)
        else
          for (n = (a = a.split(',')).length; -1 < --n; )
            (i = a[n]),
              Us[i] && ((s = 1), (i = 'transformOrigin' === i ? G : X)),
              ds(o, i)
        s &&
          (ds(o, X), e) &&
          (e.svg && o.removeAttribute('transform'),
          ln(o, 1),
          (e.uncache = 1),
          ts(r))
      }
    }
    function fs(t) {
      return 'matrix(1, 0, 0, 1, 0, 0)' === t || 'none' === t || !t
    }
    function ms(t) {
      t = Q(t, X)
      return fs(t) ? rn : t.substr(7).match(Te).map(L)
    }
    function gs(t, e) {
      var i,
        s,
        n,
        o = t._gsap || it(t),
        r = t.style,
        a = ms(t)
      return o.svg && t.getAttribute('transform')
        ? '1,0,0,1,0,0' ===
          (a = [
            (s = t.transform.baseVal.consolidate().matrix).a,
            s.b,
            s.c,
            s.d,
            s.e,
            s.f,
          ]).join(',')
          ? rn
          : a
        : (a !== rn ||
            t.offsetParent ||
            t === _s ||
            o.svg ||
            ((s = r.display),
            (r.display = 'block'),
            ((o = t.parentNode) && t.offsetParent) ||
              ((n = 1), (i = t.nextElementSibling), _s.appendChild(t)),
            (a = ms(t)),
            s ? (r.display = s) : ds(t, 'display'),
            n &&
              (i
                ? o.insertBefore(t, i)
                : o
                  ? o.appendChild(t)
                  : _s.removeChild(t))),
          e && 6 < a.length ? [a[0], a[1], a[4], a[5], a[12], a[13]] : a)
    }
    function vs(t, e, i, s, n, o) {
      var r,
        a = t._gsap,
        n = n || gs(t, !0),
        l = a.xOrigin || 0,
        d = a.yOrigin || 0,
        c = a.xOffset || 0,
        u = a.yOffset || 0,
        p = n[0],
        h = n[1],
        f = n[2],
        m = n[3],
        g = n[4],
        v = n[5],
        y = e.split(' '),
        b = parseFloat(y[0]) || 0,
        w = parseFloat(y[1]) || 0
      i
        ? n !== rn &&
          (n = p * m - h * f) &&
          ((r = b * (-h / n) + w * (p / n) - (p * v - h * g) / n),
          (b = b * (m / n) + w * (-f / n) + (f * v - m * g) / n),
          (w = r))
        : ((b = (n = as(t)).x + (~y[0].indexOf('%') ? (b / 100) * n.width : b)),
          (w =
            n.y + (~(y[1] || y[0]).indexOf('%') ? (w / 100) * n.height : w))),
        s || (!1 !== s && a.smooth)
          ? ((a.xOffset = c + ((g = b - l) * p + (v = w - d) * f) - g),
            (a.yOffset = u + (g * h + v * m) - v))
          : (a.xOffset = a.yOffset = 0),
        (a.xOrigin = b),
        (a.yOrigin = w),
        (a.smooth = !!s),
        (a.origin = e),
        (a.originIsAbsolute = !!i),
        (t.style[G] = '0px 0px'),
        o &&
          (cs(o, a, 'xOrigin', l, b),
          cs(o, a, 'yOrigin', d, w),
          cs(o, a, 'xOffset', c, a.xOffset),
          cs(o, a, 'yOffset', u, a.yOffset)),
        t.setAttribute('data-svg-origin', b + ' ' + w)
    }
    function ys(t, e, i) {
      var s = R(e)
      return L(parseFloat(e) + parseFloat(us(t, 'x', i + 'px', s))) + s
    }
    function bs(t, e) {
      for (var i in e) t[i] = e[i]
      return t
    }
    ;(W.version = I.version = m.version = '3.12.2'), (Kt = 1), a() && We()
    var ws,
      _s,
      xs,
      ks,
      Ts,
      Cs,
      Ss,
      e = M.Power0,
      Ps = M.Power1,
      Os = M.Power2,
      Es = M.Power3,
      As = M.Power4,
      Bs = M.Linear,
      Ms = M.Quad,
      Is = M.Cubic,
      $s = M.Quart,
      zs = M.Quint,
      Ls = M.Strong,
      Ds = M.Elastic,
      Vs = M.Back,
      js = M.SteppedEase,
      Hs = M.Bounce,
      Rs = M.Sine,
      Fs = M.Expo,
      Ns = M.Circ,
      Us = {},
      qs = 180 / Math.PI,
      Ws = Math.PI / 180,
      Ys = Math.atan2,
      Qs = /([A-Z])/g,
      Xs = /(left|right|width|margin|padding|x)/i,
      Gs = /[\s,\(]\S/,
      Ks = {
        autoAlpha: 'opacity,visibility',
        scale: 'scaleX,scaleY',
        alpha: 'opacity',
      },
      X = 'transform',
      G = X + 'Origin',
      Zs = 'O,Moz,ms,Ms,Webkit'.split(','),
      Js = function (t, e, i) {
        var s = (e || ks).style,
          n = 5
        if (t in s && !i) return t
        for (
          t = t.charAt(0).toUpperCase() + t.substr(1);
          n-- && !(Zs[n] + t in s);

        );
        return n < 0 ? null : (3 === n ? 'ms' : 0 <= n ? Zs[n] : '') + t
      },
      tn = { deg: 1, rad: 1, turn: 1 },
      en = { grid: 1, flex: 1 },
      sn = function (t, e, i, s) {
        var n
        return (
          xs || ns(),
          e in Ks &&
            'transform' !== e &&
            ~(e = Ks[e]).indexOf(',') &&
            (e = e.split(',')[0]),
          Us[e] && 'transform' !== e
            ? ((n = ln(t, s)),
              (n =
                'transformOrigin' !== e
                  ? n[e]
                  : n.svg
                    ? n.origin
                    : dn(Q(t, G)) + ' ' + n.zOrigin + 'px'))
            : ((n = t.style[e]) &&
                'auto' !== n &&
                !s &&
                !~(n + '').indexOf('calc(')) ||
              (n =
                (on[e] && on[e](t, e, i)) ||
                Q(t, e) ||
                y(t, e) ||
                ('opacity' === e ? 1 : 0)),
          i && !~(n + '').trim().indexOf(' ') ? us(t, e, n, i) + i : n
        )
      },
      nn = {
        top: '0%',
        bottom: '100%',
        left: '0%',
        right: '100%',
        center: '50%',
      },
      on = {
        clearProps: function (t, e, i, s, n) {
          if ('isFromStart' !== n.data)
            return (
              ((e = t._pt = new Y(t._pt, e, i, 0, 0, hs)).u = s),
              (e.pr = -10),
              (e.tween = n),
              t._props.push(i),
              1
            )
        },
      },
      rn = [1, 0, 0, 1, 0, 0],
      an = {},
      ln = function (t, e) {
        var i,
          s,
          n,
          o,
          r,
          a,
          l,
          d,
          c,
          u,
          p,
          h,
          f,
          m,
          g,
          v,
          y,
          b,
          w,
          _,
          x,
          k,
          T,
          C,
          S,
          P,
          O,
          E,
          A,
          B,
          M,
          I,
          $ = t._gsap || new Je(t)
        return (
          ('x' in $ && !e && !$.uncache) ||
            ((P = t.style),
            (O = $.scaleX < 0),
            (E = 'deg'),
            (A = getComputedStyle(t)),
            (B = Q(t, G) || '0'),
            (M = i = s = o = r = a = l = d = 0),
            (I = n = 1),
            ($.svg = !(!t.getCTM || !ls(t))),
            A.translate &&
              (('none' === A.translate &&
                'none' === A.scale &&
                'none' === A.rotate) ||
                (P[X] =
                  ('none' !== A.translate
                    ? 'translate3d(' +
                      (A.translate + ' 0 0').split(' ').slice(0, 3).join(', ') +
                      ') '
                    : '') +
                  ('none' !== A.rotate ? 'rotate(' + A.rotate + ') ' : '') +
                  ('none' !== A.scale
                    ? 'scale(' + A.scale.split(' ').join(',') + ') '
                    : '') +
                  ('none' !== A[X] ? A[X] : '')),
              (P.scale = P.rotate = P.translate = 'none')),
            (A = gs(t, $.svg)),
            $.svg &&
              ((y = $.uncache
                ? ((b = t.getBBox()),
                  (B = $.xOrigin - b.x + 'px ' + ($.yOrigin - b.y) + 'px'),
                  '')
                : !e && t.getAttribute('data-svg-origin')),
              vs(t, y || B, !!y || $.originIsAbsolute, !1 !== $.smooth, A)),
            (S = $.xOrigin || 0),
            (T = $.yOrigin || 0),
            A !== rn &&
              ((p = A[0]),
              (h = A[1]),
              (f = A[2]),
              (m = A[3]),
              (M = g = A[4]),
              (i = v = A[5]),
              6 === A.length
                ? ((I = Math.sqrt(p * p + h * h)),
                  (n = Math.sqrt(m * m + f * f)),
                  (o = p || h ? Ys(h, p) * qs : 0),
                  (l = f || m ? Ys(f, m) * qs + o : 0) &&
                    (n *= Math.abs(Math.cos(l * Ws))),
                  $.svg &&
                    ((M -= S - (S * p + T * f)), (i -= T - (S * h + T * m))))
                : ((S = A[6]),
                  (T = A[7]),
                  (_ = A[8]),
                  (x = A[9]),
                  (k = A[10]),
                  (C = A[11]),
                  (M = A[12]),
                  (i = A[13]),
                  (s = A[14]),
                  (r = (A = Ys(S, k)) * qs),
                  A &&
                    ((y = g * (c = Math.cos(-A)) + _ * (u = Math.sin(-A))),
                    (b = v * c + x * u),
                    (w = S * c + k * u),
                    (_ = g * -u + _ * c),
                    (x = v * -u + x * c),
                    (k = S * -u + k * c),
                    (C = T * -u + C * c),
                    (g = y),
                    (v = b),
                    (S = w)),
                  (a = (A = Ys(-f, k)) * qs),
                  A &&
                    ((c = Math.cos(-A)),
                    (C = m * (u = Math.sin(-A)) + C * c),
                    (p = y = p * c - _ * u),
                    (h = b = h * c - x * u),
                    (f = w = f * c - k * u)),
                  (o = (A = Ys(h, p)) * qs),
                  A &&
                    ((y = p * (c = Math.cos(A)) + h * (u = Math.sin(A))),
                    (b = g * c + v * u),
                    (h = h * c - p * u),
                    (v = v * c - g * u),
                    (p = y),
                    (g = b)),
                  r &&
                    359.9 < Math.abs(r) + Math.abs(o) &&
                    ((r = o = 0), (a = 180 - a)),
                  (I = L(Math.sqrt(p * p + h * h + f * f))),
                  (n = L(Math.sqrt(v * v + S * S))),
                  (A = Ys(g, v)),
                  (l = 2e-4 < Math.abs(A) ? A * qs : 0),
                  (d = C ? 1 / (C < 0 ? -C : C) : 0)),
              $.svg) &&
              ((y = t.getAttribute('transform')),
              ($.forceCSS = t.setAttribute('transform', '') || !fs(Q(t, X))),
              y) &&
              t.setAttribute('transform', y),
            90 < Math.abs(l) &&
              Math.abs(l) < 270 &&
              (O
                ? ((I *= -1),
                  (l += o <= 0 ? 180 : -180),
                  (o += o <= 0 ? 180 : -180))
                : ((n *= -1), (l += l <= 0 ? 180 : -180))),
            (e = e || $.uncache),
            ($.x =
              M -
              (($.xPercent =
                M &&
                ((!e && $.xPercent) ||
                  (Math.round(t.offsetWidth / 2) === Math.round(-M) ? -50 : 0)))
                ? (t.offsetWidth * $.xPercent) / 100
                : 0) +
              'px'),
            ($.y =
              i -
              (($.yPercent =
                i &&
                ((!e && $.yPercent) ||
                  (Math.round(t.offsetHeight / 2) === Math.round(-i)
                    ? -50
                    : 0)))
                ? (t.offsetHeight * $.yPercent) / 100
                : 0) +
              'px'),
            ($.z = s + 'px'),
            ($.scaleX = L(I)),
            ($.scaleY = L(n)),
            ($.rotation = L(o) + E),
            ($.rotationX = L(r) + E),
            ($.rotationY = L(a) + E),
            ($.skewX = l + E),
            ($.skewY = 0 + E),
            ($.transformPerspective = d + 'px'),
            ($.zOrigin = parseFloat(B.split(' ')[2]) || 0) && (P[G] = dn(B)),
            ($.xOffset = $.yOffset = 0),
            ($.force3D = F.force3D),
            ($.renderTransform = $.svg ? mn : Ss ? fn : cn),
            ($.uncache = 0)),
          $
        )
      },
      dn = function (t) {
        return (t = t.split(' '))[0] + ' ' + t[1]
      },
      cn = function (t, e) {
        ;(e.z = '0px'),
          (e.rotationY = e.rotationX = '0deg'),
          (e.force3D = 0),
          fn(t, e)
      },
      un = '0deg',
      pn = '0px',
      hn = ') ',
      fn = function (t, e) {
        var i,
          s,
          e = e || this,
          n = e.xPercent,
          o = e.yPercent,
          r = e.x,
          a = e.y,
          l = e.z,
          d = e.rotation,
          c = e.rotationY,
          u = e.rotationX,
          p = e.skewX,
          h = e.skewY,
          f = e.scaleX,
          m = e.scaleY,
          g = e.transformPerspective,
          v = e.force3D,
          y = e.target,
          e = e.zOrigin,
          b = '',
          t = ('auto' === v && t && 1 !== t) || !0 === v
        !e ||
          (u === un && c === un) ||
          ((v = parseFloat(c) * Ws),
          (s = Math.sin(v)),
          (i = Math.cos(v)),
          (v = parseFloat(u) * Ws),
          (r = ys(y, r, s * (s = Math.cos(v)) * -e)),
          (a = ys(y, a, -Math.sin(v) * -e)),
          (l = ys(y, l, i * s * -e + e))),
          g !== pn && (b += 'perspective(' + g + hn),
          (n || o) && (b += 'translate(' + n + '%, ' + o + '%) '),
          (!t && r === pn && a === pn && l === pn) ||
            (b +=
              l !== pn || t
                ? 'translate3d(' + r + ', ' + a + ', ' + l + ') '
                : 'translate(' + r + ', ' + a + hn),
          d !== un && (b += 'rotate(' + d + hn),
          c !== un && (b += 'rotateY(' + c + hn),
          u !== un && (b += 'rotateX(' + u + hn),
          (p === un && h === un) || (b += 'skew(' + p + ', ' + h + hn),
          (1 === f && 1 === m) || (b += 'scale(' + f + ', ' + m + hn),
          (y.style[X] = b || 'translate(0, 0)')
      },
      mn = function (t, e) {
        var i,
          s,
          n,
          o,
          r,
          e = e || this,
          a = e.xPercent,
          l = e.yPercent,
          d = e.x,
          c = e.y,
          u = e.rotation,
          p = e.skewX,
          h = e.skewY,
          f = e.scaleX,
          m = e.scaleY,
          g = e.target,
          v = e.xOrigin,
          y = e.yOrigin,
          b = e.xOffset,
          w = e.yOffset,
          e = e.forceCSS,
          _ = parseFloat(d),
          x = parseFloat(c),
          u = parseFloat(u),
          p = parseFloat(p)
        ;(h = parseFloat(h)) && ((p += h = parseFloat(h)), (u += h)),
          u || p
            ? ((u *= Ws),
              (p *= Ws),
              (i = Math.cos(u) * f),
              (s = Math.sin(u) * f),
              (n = Math.sin(u - p) * -m),
              (o = Math.cos(u - p) * m),
              p &&
                ((h *= Ws),
                (r = Math.tan(p - h)),
                (n *= r = Math.sqrt(1 + r * r)),
                (o *= r),
                h) &&
                ((r = Math.tan(h)), (i *= r = Math.sqrt(1 + r * r)), (s *= r)),
              (i = L(i)),
              (s = L(s)),
              (n = L(n)),
              (o = L(o)))
            : ((i = f), (o = m), (s = n = 0)),
          ((_ && !~(d + '').indexOf('px')) ||
            (x && !~(c + '').indexOf('px'))) &&
            ((_ = us(g, 'x', d, 'px')), (x = us(g, 'y', c, 'px'))),
          (v || y || b || w) &&
            ((_ = L(_ + v - (v * i + y * n) + b)),
            (x = L(x + y - (v * s + y * o) + w))),
          (a || l) &&
            ((_ = L(_ + (a / 100) * (r = g.getBBox()).width)),
            (x = L(x + (l / 100) * r.height))),
          g.setAttribute(
            'transform',
            (r =
              'matrix(' +
              i +
              ',' +
              s +
              ',' +
              n +
              ',' +
              o +
              ',' +
              _ +
              ',' +
              x +
              ')'),
          ),
          e && (g.style[X] = r)
      }
    h('padding,margin,Width,Radius', function (e, i) {
      var t = 'Right',
        s = 'Bottom',
        n = 'Left',
        a = (
          i < 3 ? ['Top', t, s, n] : ['Top' + n, 'Top' + t, s + t, s + n]
        ).map(function (t) {
          return i < 2 ? e + t : 'border' + t + e
        })
      on[1 < i ? 'border' + e : e] = function (e, t, i, s, n) {
        var o, r
        if (arguments.length < 4)
          return (
            (o = a.map(function (t) {
              return sn(e, t, i)
            })),
            5 === (r = o.join(' ')).split(o[0]).length ? o[0] : r
          )
        ;(o = (s + '').split(' ')),
          (r = {}),
          a.forEach(function (t, e) {
            return (r[t] = o[e] = o[e] || o[((e - 1) / 2) | 0])
          }),
          e.init(t, r, n)
      }
    })
    var gn,
      vn = {
        name: 'css',
        register: ns,
        targetTest: function (t) {
          return t.style && t.nodeType
        },
        init: function (t, e, i, s, n) {
          var o,
            r,
            a,
            l,
            d,
            c,
            u,
            p,
            h,
            L,
            f,
            m,
            D,
            g,
            v,
            y,
            V,
            b,
            w,
            _,
            x,
            j = this._props,
            k = t.style,
            T = i.vars.startAt
          for (d in (xs || ns(),
          (this.styles = this.styles || is(t)),
          (g = this.styles.props),
          (this.tween = i),
          e))
            if (
              'autoRound' !== d &&
              ((r = e[d]), !q[d] || !ni(d, e, i, s, t, n))
            )
              if (
                ((p = typeof r),
                (l = on[d]),
                'function' === p && (p = typeof (r = r.call(i, s, t, n))),
                'string' === p && ~r.indexOf('random(') && (r = Ot(r)),
                l)
              )
                l(this, t, d, r, i) && (D = 1)
              else if ('--' === d.substr(0, 2))
                (o = (getComputedStyle(t).getPropertyValue(d) + '').trim()),
                  (r += ''),
                  (Ue.lastIndex = 0),
                  Ue.test(o) || ((c = R(o)), (u = R(r))),
                  u ? c !== u && (o = us(t, d, o, u) + u) : c && (r += c),
                  this.add(k, 'setProperty', o, r, s, n, 0, 0, d),
                  j.push(d),
                  g.push(d, 0, k[d])
              else if ('undefined' !== p) {
                if (
                  ((T &&
                    d in T &&
                    (R(
                      (o =
                        H(
                          (o =
                            'function' == typeof T[d]
                              ? T[d].call(i, s, t, n)
                              : T[d]),
                        ) && ~o.indexOf('random(')
                          ? Ot(o)
                          : o) + '',
                    ) || (o += F.units[d] || R(sn(t, d)) || ''),
                    '=' !== (o + '').charAt(1))) ||
                    (o = sn(t, d)),
                  (l = parseFloat(o)),
                  (p =
                    'string' === p && '=' === r.charAt(1) && r.substr(0, 2)) &&
                    (r = r.substr(2)),
                  (a = parseFloat(r)),
                  (h =
                    (d =
                      d in Ks &&
                      ('autoAlpha' === d &&
                        (1 === l &&
                          'hidden' === sn(t, 'visibility') &&
                          a &&
                          (l = 0),
                        g.push('visibility', 0, k.visibility),
                        cs(
                          this,
                          k,
                          'visibility',
                          l ? 'inherit' : 'hidden',
                          a ? 'inherit' : 'hidden',
                          !a,
                        )),
                      'scale' !== d) &&
                      'transform' !== d &&
                      ~(d = Ks[d]).indexOf(',')
                        ? d.split(',')[0]
                        : d) in Us))
                )
                  if (
                    (this.styles.save(d),
                    L ||
                      (((f = t._gsap).renderTransform && !e.parseTransform) ||
                        ln(t, e.parseTransform),
                      (m = !1 !== e.smoothOrigin && f.smooth),
                      ((L = this._pt =
                        new Y(
                          this._pt,
                          k,
                          X,
                          0,
                          1,
                          f.renderTransform,
                          f,
                          0,
                          -1,
                        )).dep = 1)),
                    'scale' === d)
                  )
                    (this._pt = new Y(
                      this._pt,
                      f,
                      'scaleY',
                      f.scaleY,
                      (p ? st(f.scaleY, p + a) : a) - f.scaleY || 0,
                      Ri,
                    )),
                      (this._pt.u = 0),
                      j.push('scaleY', d),
                      (d += 'X')
                  else {
                    if ('transformOrigin' === d) {
                      g.push(G, 0, k[G]),
                        (x = _ = w = void 0),
                        (w = (b = r).split(' ')),
                        (_ = w[0]),
                        (x = w[1] || '50%'),
                        ('top' !== _ &&
                          'bottom' !== _ &&
                          'left' !== x &&
                          'right' !== x) ||
                          ((b = _), (_ = x), (x = b)),
                        (w[0] = nn[_] || _),
                        (w[1] = nn[x] || x),
                        (r = w.join(' ')),
                        f.svg
                          ? vs(t, r, 0, m, 0, this)
                          : ((u = parseFloat(r.split(' ')[2]) || 0) !==
                              f.zOrigin && cs(this, f, 'zOrigin', f.zOrigin, u),
                            cs(this, k, d, dn(o), dn(r)))
                      continue
                    }
                    if ('svgOrigin' === d) {
                      vs(t, r, 1, m, 0, this)
                      continue
                    }
                    if (d in an) {
                      ;(b = this),
                        (_ = f),
                        (x = d),
                        (w = l),
                        (v = p ? st(l, p + r) : r),
                        (V = y = M = z = void 0),
                        (z = 360),
                        (M = H(v)),
                        (y =
                          parseFloat(v) * (M && ~v.indexOf('rad') ? qs : 1) -
                          w),
                        (V = w + y + 'deg'),
                        M &&
                          ('short' === (M = v.split('_')[1]) &&
                            (y %= z) != y % 180 &&
                            (y += y < 0 ? z : -z),
                          'cw' === M && y < 0
                            ? (y = ((y + 36e9) % z) - ~~(y / z) * z)
                            : 'ccw' === M &&
                              0 < y &&
                              (y = ((y - 36e9) % z) - ~~(y / z) * z)),
                        (b._pt = v = new Y(b._pt, _, x, w, y, Fi)),
                        (v.e = V),
                        (v.u = 'deg'),
                        b._props.push(x)
                      continue
                    }
                    if ('smoothOrigin' === d) {
                      cs(this, f, 'smooth', f.smooth, r)
                      continue
                    }
                    if ('force3D' === d) {
                      f[d] = r
                      continue
                    }
                    if ('transform' === d) {
                      z = $ = A = O = E = P = S = C = I = M = B = void 0
                      var C,
                        S,
                        P,
                        O,
                        E,
                        A,
                        B = this,
                        M = r,
                        I = t,
                        $ = bs({}, I._gsap),
                        z = I.style
                      for (S in ($.svg
                        ? ((P = I.getAttribute('transform')),
                          I.setAttribute('transform', ''),
                          (z[X] = M),
                          (C = ln(I, 1)),
                          ds(I, X),
                          I.setAttribute('transform', P))
                        : ((P = getComputedStyle(I)[X]),
                          (z[X] = M),
                          (C = ln(I, 1)),
                          (z[X] = P)),
                      Us))
                        (P = $[S]) !== (E = C[S]) &&
                          'perspective,force3D,transformOrigin,svgOrigin'.indexOf(
                            S,
                          ) < 0 &&
                          ((O =
                            R(P) !== (A = R(E))
                              ? us(I, S, P, A)
                              : parseFloat(P)),
                          (E = parseFloat(E)),
                          (B._pt = new Y(B._pt, C, S, O, E - O, Ri)),
                          (B._pt.u = A || 0),
                          B._props.push(S))
                      bs(C, $)
                      continue
                    }
                  }
                else d in k || (d = Js(d) || d)
                if (
                  h ||
                  ((a || 0 === a) && (l || 0 === l) && !Gs.test(r) && d in k)
                )
                  (a = a || 0),
                    (c = (o + '').substr((l + '').length)) !==
                      (u = R(r) || (d in F.units ? F.units[d] : c)) &&
                      (l = us(t, d, o, u)),
                    (this._pt = new Y(
                      this._pt,
                      h ? f : k,
                      d,
                      l,
                      (p ? st(l, p + a) : a) - l,
                      h || ('px' !== u && 'zIndex' !== d) || !1 === e.autoRound
                        ? Ri
                        : Ui,
                    )),
                    (this._pt.u = u || 0),
                    c !== u &&
                      '%' !== u &&
                      ((this._pt.b = o), (this._pt.r = Ni))
                else if (d in k) ps.call(this, t, d, o, p ? p + r : r)
                else if (d in t) this.add(t, d, o || t[d], p ? p + r : r, s, n)
                else if ('parseTransform' !== d) {
                  J(d, r)
                  continue
                }
                h || (d in k ? g.push(d, 0, k[d]) : g.push(d, 1, o || t[d])),
                  j.push(d)
              }
          D && Ci(this)
        },
        render: function (t, e) {
          if (e.tween._time || !Cs())
            for (var i = e._pt; i; ) i.r(t, i.d), (i = i._next)
          else e.styles.revert()
        },
        get: sn,
        aliases: Ks,
        getSetter: function (t, e, i) {
          var s = Ks[e]
          return (e = s && s.indexOf(',') < 0 ? s : e) in Us &&
            e !== G &&
            (t._gsap.x || sn(t, 'x'))
            ? i && Ts === i
              ? 'scale' === e
                ? Gi
                : Xi
              : (Ts = i || {}) && ('scale' === e ? Ki : Zi)
            : t.style && !o(t.style[e])
              ? Yi
              : ~e.indexOf('-')
                ? Qi
                : yi(t, e)
        },
        core: { _removeProperty: ds, _getMatrix: gs },
      },
      yn =
        ((m.utils.checkPrefix = Js),
        (m.core.getStyleSaver = is),
        (gn = h(
          'x,y,z,scale,scaleX,scaleY,xPercent,yPercent' +
            ',' +
            (yn = 'rotation,rotationX,rotationY,skewX,skewY') +
            ',transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective',
          function (t) {
            Us[t] = 1
          },
        )),
        h(yn, function (t) {
          ;(F.units[t] = 'deg'), (an[t] = 1)
        }),
        (Ks[gn[13]] = 'x,y,z,scale,scaleX,scaleY,xPercent,yPercent,' + yn),
        h(
          '0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY',
          function (t) {
            t = t.split(':')
            Ks[t[1]] = gn[t[0]]
          },
        ),
        h(
          'x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective',
          function (t) {
            F.units[t] = 'px'
          },
        ),
        m.registerPlugin(vn),
        m.registerPlugin(vn) || m),
      bn = yn.core.Tween
    ;(t.Back = Vs),
      (t.Bounce = Hs),
      (t.CSSPlugin = vn),
      (t.Circ = Ns),
      (t.Cubic = Is),
      (t.Elastic = Ds),
      (t.Expo = Fs),
      (t.Linear = Bs),
      (t.Power0 = e),
      (t.Power1 = Ps),
      (t.Power2 = Os),
      (t.Power3 = Es),
      (t.Power4 = As),
      (t.Quad = Ms),
      (t.Quart = $s),
      (t.Quint = zs),
      (t.Sine = Rs),
      (t.SteppedEase = js),
      (t.Strong = Ls),
      (t.TimelineLite = I),
      (t.TimelineMax = I),
      (t.TweenLite = W),
      (t.TweenMax = bn),
      (t.default = yn),
      (t.gsap = yn),
      'undefined' == typeof window || window !== t
        ? Object.defineProperty(t, '__esModule', { value: !0 })
        : delete t.default
  }),
  (() => {
    function n(t) {
      t &&
        (t.element.classList.add(t.stateClassName),
        t.element.firstChild.classList.remove(t.stateChildClassNames[0]),
        t.element.firstChild.classList.add(t.stateChildClassNames[1]),
        t.element.setAttribute('aria-checked', !1))
    }
    function r(i, s) {
      var t = document.createElement('button')
      ;(t.className = s.className),
        (t.innerHTML = s.innerHtml),
        t.setAttribute('role', 'switch'),
        t.firstChild.classList.add(s.stateChildClassNames[0]),
        t.setAttribute('aria-checked', !s.initialState),
        (s.element = t),
        i.params[s.condition_parameter] === s.initialState && n(s),
        t.addEventListener('click', function (t) {
          var e
          this.classList.contains(s.stateClassName)
            ? ((e = s) &&
                (e.element.classList.remove(e.stateClassName),
                e.element.firstChild.classList.add(e.stateChildClassNames[0]),
                e.element.firstChild.classList.remove(
                  e.stateChildClassNames[1],
                ),
                e.element.setAttribute('aria-checked', !0)),
              i[s.actions[0]]())
            : (n(s), i[s.actions[1]]())
        }),
        (i.buttons[s.name] = { element: t, button_properties: s }),
        i.controls_element.appendChild(t)
    }
    function l(t) {
      var e
      return /^\s*null\s*$/.test(t)
        ? null
        : void 0 !==
            (e = (function (t) {
              if (/^\s*(true|false)\s*$/i.test(t)) return 'true' === t
            })(t))
          ? e
          : (/^\s*\d+\s*$/.test((e = t))
              ? parseInt(e)
              : /^\s*[\d.]+\s*$/.test(e)
                ? parseFloat(e)
                : void 0) ||
            (function (t) {
              if (/^\s*\[.*\]\s*$/.test(t))
                try {
                  return JSON.parse(t)
                } catch (t) {}
            })(t) ||
            (function (t) {
              if (/^\s*\{.*\}\s*$/.test(t))
                try {
                  return JSON.parse(t)
                } catch (t) {}
            })(t) ||
            (function (t) {
              if (/^\s*\/.*\/g?i?\s*$/.test(t))
                try {
                  return new RegExp(t)
                } catch (t) {}
            })(t) ||
            t
    }
    function d(t) {
      return Array.isArray(t)
    }
    function i(t, e) {
      return (
        e < t && ([t, e] = [e, t]),
        t === e
          ? t
          : ((t = Math.ceil(t)),
            (e = Math.floor(e)),
            Math.floor(Math.random() * (e - t + 1)) + t)
      )
    }
    function s(t, e) {
      return e ? parseFloat(t.toFixed(e)) : parseInt(t)
    }
    function e(t, e) {
      return !t || !e || Number.isNaN(t) || Number.isNaN(e) ? 0 : (t / e) * 100
    }
    function a(t) {
      var e,
        i = 1.7777777778
      return !t ||
        !t.length ||
        /16[\:x\-\/]{1}9/i.test(t) ||
        (t = t.split(/\s?[\:x\-\/]{1}\s?/i)).length < 2 ||
        ((e = parseInt(t[0])), (t = parseInt(t[1])), 0 === e) ||
        0 === t ||
        isNaN(e) ||
        isNaN(t)
        ? i
        : e / t
    }
    function o(t, e = 1, i = 0) {
      for (const o of (t =
        'string' == typeof (t = t instanceof Element ? [t] : t)
          ? (function t(e, i = document) {
              if (e instanceof Array || e instanceof NodeList) return e
              if (e instanceof Element) return [e]
              if (i instanceof Element || i instanceof Document)
                return i.querySelectorAll(e)
              if (
                (!(i = 'string' == typeof i ? t(i) : i)) instanceof Array &&
                (!i) instanceof NodeList
              )
                return []
              var s = []
              for (const n of i) s.push(...n.querySelectorAll(e))
              return s
            })(t)
          : t)) {
        var s = o.parentNode.offsetHeight + i,
          n = o.parentNode.offsetWidth + i
        n / s < e
          ? ((o.style.width = s * e + 'px'), (o.style.height = s + 'px'))
          : ((o.style.width = n + 'px'), (o.style.height = n / e + 'px'))
      }
    }
    var c =
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i,
      u =
        /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i,
      p = /\/([^\/]+\.(?:mp4|ogg|ogv|ogm|webm|avi))\s*$/i
    function h() {
      return 'maxTouchPoints' in navigator
        ? 0 < navigator.maxTouchPoints
        : 'matchMedia' in window
          ? !!matchMedia('(pointer:coarse)').matches
          : 'orientation' in window ||
            ((t = navigator.userAgent),
            /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(t)) ||
            /\b(Android|Windows Phone|iPad|iPod)\b/i.test(t)
      var t
    }
    var f,
      t = class {
        constructor(t, e, i, s, n, o) {
          i &&
            ((this.is_mobile = h()),
            (this.type = n),
            (this.id = i),
            (this.factoryInstance = o),
            (this.element = t),
            (this.playerElement = null),
            (this.uid = s),
            this.element.setAttribute('data-vbg-uid', s),
            (this.buttons = {}),
            (this.isIntersecting = !1),
            (this.paused = !1),
            (this.muted = !1),
            (this.currentState = 'notstarted'),
            (this.initialPlay = !1),
            (this.initialVolume = !1),
            (this.volume = 1),
            (this.params = {}),
            (this.params = this.parseProperties(
              e,
              {
                pause: !1,
                'play-button': !1,
                'mute-button': !1,
                autoplay: !0,
                muted: !0,
                loop: !0,
                mobile: !0,
                'load-background': !1,
                resolution: '16:9',
                'inline-styles': !0,
                'fit-box': !1,
                offset: 100,
                'start-at': 0,
                'end-at': 0,
                poster: null,
                'always-play': !1,
                volume: 1,
                'no-cookie': !0,
                'force-on-low-battery': !1,
                lazyloading: !1,
              },
              this.element,
              ['data-ytbg-', 'data-vbg-'],
            )),
            this.params.pause &&
              (this.params['play-button'] = this.params.pause),
            (this.params.resolution_mod = a(this.params.resolution)),
            (this.muted = this.params.muted),
            (this.volume = this.params.volume),
            (this.currentTime = this.params['start-at'] || 0),
            (this.duration = this.params['end-at'] || 0),
            (this.percentComplete = 0),
            this.params['start-at'] &&
              (this.percentComplete = this.timeToPercentage(
                this.params['start-at'],
              )),
            this.buildWrapperHTML(),
            (this.is_mobile && !this.params.mobile) ||
              (this.params['play-button'] &&
                r(this, {
                  name: 'playing',
                  className: 'play-toggle',
                  innerHtml: '<i class="fa"></i>',
                  initialState: !this.paused,
                  stateClassName: 'paused',
                  condition_parameter: 'paused',
                  stateChildClassNames: ['fa-pause-circle', 'fa-play-circle'],
                  actions: ['play', 'pause'],
                }),
              this.params['mute-button'] &&
                r(this, {
                  name: 'muted',
                  className: 'mute-toggle',
                  innerHtml: '<i class="fa"></i>',
                  initialState: this.muted,
                  stateClassName: 'muted',
                  condition_parameter: 'muted',
                  stateChildClassNames: ['fa-volume-up', 'fa-volume-mute'],
                  actions: ['unmute', 'mute'],
                })))
        }
        timeToPercentage(t) {
          return t <= this.params['start-at']
            ? 0
            : t >= this.duration
              ? 100
              : t <= 0
                ? 0
                : e(
                    (t -= this.params['start-at']),
                    this.duration - this.params['start-at'],
                  )
        }
        percentageToTime(t) {
          if (!this.duration) return this.params['start-at'] || 0
          if (100 < t) return this.duration
          if (t <= 0) return this.params['start-at'] || 0
          var e = this.duration - this.params['start-at']
          let i = (t * e) / 100
          return (
            (i = s(i, 3)) > e && (i = e),
            this.params['start-at'] && (i += this.params['start-at']),
            i
          )
        }
        resize(t) {
          this.params['fit-box'] ||
            o(
              t || this.playerElement,
              this.params.resolution_mod,
              this.params.offset,
            ),
            this.dispatchEvent('video-background-resize')
        }
        stylePlayerElement(t) {
          t &&
            (this.params['inline-styles'] &&
              ((t.style.top = '50%'),
              (t.style.left = '50%'),
              (t.style.transform = 'translateX(-50%) translateY(-50%)'),
              (t.style.position = 'absolute'),
              (t.style.opacity = 0)),
            this.params['fit-box']) &&
            ((t.style.width = '100%'), (t.style.height = '100%'))
        }
        buildWrapperHTML() {
          var t,
            e = this.element.parentNode,
            i =
              (this.element.classList.add(
                'youtube-background',
                'video-background',
              ),
              {
                height: '100%',
                width: '100%',
                'z-index': '0',
                position: 'absolute',
                overflow: 'hidden',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              })
          if (
            (this.params['mute-button'] || (i['pointer-events'] = 'none'),
            (this.params['load-background'] || this.params.poster) &&
              (this.loadBackground(this.id),
              this.params.poster &&
                (i['background-image'] = `url(${this.params.poster})`),
              (i['background-size'] = 'cover'),
              (i['background-repeat'] = 'no-repeat'),
              (i['background-position'] = 'center')),
            this.params['inline-styles'])
          ) {
            for (var s in i) this.element.style[s] = i[s]
            ;['absolute', 'fixed', 'relative', 'sticky'].indexOf(
              e.style.position,
            ) || (e.style.position = 'relative')
          }
          return (
            (this.params['play-button'] || this.params['mute-button']) &&
              (((t = document.createElement('div')).className =
                'video-background-controls'),
              (t.style.position = 'absolute'),
              (t.style.top = '10px'),
              (t.style.right = '10px'),
              (t.style['z-index'] = 2),
              (this.controls_element = t),
              e.appendChild(t)),
            this.element
          )
        }
        loadBackground(t) {
          this.params['load-background'] &&
            t &&
            ('youtube' === this.type &&
              (this.element.style['background-image'] =
                `url(https://img.youtube.com/vi/${t}/hqdefault.jpg)`),
            'vimeo' === this.type) &&
            (this.element.style['background-image'] =
              `url(https://vumbnail.com/${t}.jpg)`)
        }
        destroy() {
          this.playerElement.remove(),
            this.element.classList.remove(
              'youtube-background',
              'video-background',
            ),
            this.element.removeAttribute('data-vbg-uid'),
            (this.element.style = ''),
            (this.params['play-button'] || this.params['mute-button']) &&
              this.controls_element.remove(),
            this.timeUpdateTimer && clearInterval(this.timeUpdateTimer),
            this.dispatchEvent('video-background-destroyed')
        }
        setDuration(t) {
          this.duration !== t &&
            (this.params['end-at']
              ? t > this.params['end-at']
                ? (this.duration = this.params['end-at'])
                : t < this.params['end-at']
                  ? (this.duration = t)
                  : t <= 0 && (this.duration = this.params['end-at'])
              : (this.duration = t))
        }
        setStartAt(t) {
          this.params['start-at'] = t
        }
        setEndAt(t) {
          ;(this.params['end-at'] = t),
            this.duration > t && (this.duration = t),
            this.currentTime > t && this.onVideoEnded()
        }
        dispatchEvent(t) {
          this.element.dispatchEvent(
            new CustomEvent(t, { bubbles: !0, detail: this }),
          )
        }
        shouldPlay() {
          return !!(
            ('ended' !== this.currentState || this.params.loop) &&
            ((this.params['always-play'] && 'playing' !== this.currentState) ||
              (this.isIntersecting &&
                this.params.autoplay &&
                'playing' !== this.currentState))
          )
        }
        mobileLowBatteryAutoplayHack() {
          !this.params['force-on-low-battery'] ||
            (!this.is_mobile && this.params.mobile) ||
            document.addEventListener(
              'touchstart',
              function () {
                !this.initialPlay &&
                  this.params.autoplay &&
                  this.params.muted &&
                  (this.softPlay(),
                  this.isIntersecting ||
                    this.params['always-play'] ||
                    this.softPause())
              }.bind(this),
              { once: !0 },
            )
        }
        parseProperties(t, e, i, s) {
          let n = {}
          if (t) for (var o in e) n[o] = (t.hasOwnProperty(o) ? t : e)[o]
          else n = e
          if (i)
            for (var r in n) {
              let e
              if (d(s))
                for (let t = 0; t < s.length; t++) {
                  var a = i.getAttribute(s[t] + r)
                  if (a) {
                    e = a
                    break
                  }
                }
              else e = i.getAttribute(s + r)
              void 0 !== e && null !== e && (n[r] = l(e))
            }
          return n
        }
      },
      m = class extends t {
        constructor(t, e, i, s, n) {
          super(t, e, i, s, 'youtube', n),
            !i ||
              (this.is_mobile && !this.params.mobile) ||
              (this.injectScript(),
              (this.player = null),
              this.injectPlayer(),
              (this.STATES = {
                '-1': 'notstarted',
                0: 'ended',
                1: 'playing',
                2: 'paused',
                3: 'buffering',
                5: 'cued',
              }),
              (this.timeUpdateTimer = null),
              (this.timeUpdateInterval = 250),
              this.initYTPlayer())
        }
        startTimeUpdateTimer() {
          this.timeUpdateTimer ||
            (this.timeUpdateTimer = setInterval(
              this.onVideoTimeUpdate.bind(this),
              this.timeUpdateInterval,
            ))
        }
        stopTimeUpdateTimer() {
          clearInterval(this.timeUpdateTimer), (this.timeUpdateTimer = null)
        }
        convertState(t) {
          return this.STATES[t]
        }
        initYTPlayer() {
          window.hasOwnProperty('YT') &&
            null === this.player &&
            ((this.player = new YT.Player(this.uid, {
              events: {
                onReady: this.onVideoPlayerReady.bind(this),
                onStateChange: this.onVideoStateChange.bind(this),
              },
            })),
            1 === this.volume || this.muted || this.setVolume(this.volume))
        }
        onVideoError(t) {
          console.error(t)
        }
        injectScript() {
          var t, e
          window.hasOwnProperty('YT') ||
            document.querySelector(
              'script[src="https://www.youtube.com/player_api"]',
            ) ||
            (((t = document.createElement('script')).src =
              'https://www.youtube.com/player_api'),
            (e =
              document.getElementsByTagName(
                'script',
              )[0]).parentNode.insertBefore(t, e))
        }
        generatePlayerElement() {
          var t = document.createElement('iframe')
          return (
            t.setAttribute('frameborder', 0),
            t.setAttribute('allow', 'autoplay; mute'),
            this.params.lazyloading && t.setAttribute('loading', 'lazy'),
            t
          )
        }
        generateSrcURL(t) {
          let e = 'https://www.youtube.com/embed/',
            i =
              '' +
              (e = this.params['no-cookie']
                ? 'https://www.youtube-nocookie.com/embed/'
                : e) +
              t +
              '?&enablejsapi=1&disablekb=1&controls=0&rel=0&iv_load_policy=3&cc_load_policy=0&playsinline=1&showinfo=0&modestbranding=1&fs=0'
          return (
            this.params.muted && (i += '&mute=1'),
            this.params.autoplay &&
              (this.params['always-play'] || this.isIntersecting) &&
              (i += '&autoplay=1'),
            this.params.loop && (i += '&loop=1'),
            i
          )
        }
        injectPlayer() {
          ;(this.playerElement = this.generatePlayerElement()),
            (this.src = this.generateSrcURL(this.id)),
            (this.playerElement.src = this.src),
            (this.playerElement.id = this.uid),
            this.stylePlayerElement(this.playerElement),
            this.element.appendChild(this.playerElement),
            this.resize(this.playerElement)
        }
        setSource(t) {
          t = t.match(c)
          t &&
            t.length &&
            ((this.id = t[1]),
            (this.src = this.generateSrcURL(this.id)),
            (this.playerElement.src = this.src),
            this.element.hasAttribute('data-vbg') &&
              this.element.setAttribute('data-vbg', this.src),
            this.element.hasAttribute('data-ytbg') &&
              this.element.setAttribute('data-ytbg', this.src),
            this.loadBackground(this.id))
        }
        onVideoTimeUpdate() {
          var t = this.player.getCurrentTime()
          t !== this.currentTime &&
            ((this.currentTime = t),
            (this.percentComplete = this.timeToPercentage(this.currentTime)),
            this.params['end-at'] &&
            this.duration &&
            this.currentTime >= this.duration
              ? ((this.currentState = 'ended'),
                this.dispatchEvent('video-background-state-change'),
                this.onVideoEnded(),
                this.stopTimeUpdateTimer())
              : this.dispatchEvent('video-background-time-update'))
        }
        onVideoPlayerReady() {
          this.mobileLowBatteryAutoplayHack(),
            this.params.autoplay &&
              (this.params['always-play'] || this.isIntersecting) &&
              (this.params['start-at'] && this.seekTo(this.params['start-at']),
              this.player.playVideo()),
            this.setDuration(this.player.getDuration()),
            this.dispatchEvent('video-background-ready')
        }
        onVideoStateChange(t) {
          ;(this.currentState = this.convertState(t.data)),
            'ended' === this.currentState && this.onVideoEnded(),
            'notstarted' === this.currentState &&
              this.params.autoplay &&
              (this.seekTo(this.params['start-at']), this.player.playVideo()),
            'playing' === this.currentState && this.onVideoPlay(),
            'paused' === this.currentState && this.onVideoPause(),
            this.dispatchEvent('video-background-state-change')
        }
        onVideoPlay() {
          this.initialPlay ||
            ((this.initialPlay = !0), (this.playerElement.style.opacity = 1))
          var t = this.player.getCurrentTime()
          this.params['start-at'] &&
            t < this.params['start-at'] &&
            this.seekTo(this.params['start-at']),
            this.duration &&
              t >= this.duration &&
              this.seekTo(this.params['start-at']),
            this.duration || this.setDuration(this.player.getDuration()),
            this.dispatchEvent('video-background-play'),
            this.startTimeUpdateTimer()
        }
        onVideoPause() {
          this.stopTimeUpdateTimer(),
            this.dispatchEvent('video-background-pause')
        }
        onVideoEnded() {
          if ((this.dispatchEvent('video-background-ended'), !this.params.loop))
            return this.pause()
          this.seekTo(this.params['start-at']), this.player.playVideo()
        }
        seek(t) {
          this.seekTo(this.percentageToTime(t), !0)
        }
        seekTo(t, e = !0) {
          this.player &&
            (this.player.seekTo(t, e),
            this.dispatchEvent('video-background-seeked'))
        }
        softPause() {
          this.player &&
            'paused' !== this.currentState &&
            (this.stopTimeUpdateTimer(), this.player.pauseVideo())
        }
        softPlay() {
          this.player &&
            'playing' !== this.currentState &&
            this.player.playVideo()
        }
        play() {
          this.player && ((this.paused = !1), this.player.playVideo())
        }
        pause() {
          this.player &&
            ((this.paused = !0),
            this.stopTimeUpdateTimer(),
            this.player.pauseVideo())
        }
        unmute() {
          this.player &&
            ((this.muted = !1),
            this.initialVolume ||
              ((this.initialVolume = !0), this.setVolume(this.params.volume)),
            this.player.unMute(),
            this.dispatchEvent('video-background-unmute'))
        }
        mute() {
          this.player &&
            ((this.muted = !0),
            this.player.mute(),
            this.dispatchEvent('video-background-mute'))
        }
        getVolume() {
          if (this.player) return this.player.getVolume() / 100
        }
        setVolume(t) {
          this.player &&
            ((this.volume = t),
            this.player.setVolume(100 * t),
            this.dispatchEvent('video-background-volume-change'))
        }
      },
      g = class extends t {
        constructor(t, e, i, s, n) {
          super(t, e, i, s, 'vimeo', n),
            !i ||
              (this.is_mobile && !this.params.mobile) ||
              (this.injectScript(),
              (this.player = null),
              this.injectPlayer(),
              this.initVimeoPlayer())
        }
        injectScript() {
          var t, e
          window.hasOwnProperty('Vimeo') ||
            document.querySelector(
              'script[src="https://player.vimeo.com/api/player.js"]',
            ) ||
            ((t = document.createElement('script')),
            window.hasOwnProperty('onVimeoIframeAPIReady') &&
              'function' == typeof window.onVimeoIframeAPIReady &&
              t.addEventListener('load', () => {
                window.onVimeoIframeAPIReady()
              }),
            (t.src = 'https://player.vimeo.com/api/player.js'),
            (e =
              document.getElementsByTagName(
                'script',
              )[0]).parentNode.insertBefore(t, e))
        }
        initVimeoPlayer() {
          window.hasOwnProperty('Vimeo') &&
            null === this.player &&
            ((this.player = new Vimeo.Player(this.playerElement)),
            this.player.on('loaded', this.onVideoPlayerReady.bind(this)),
            this.player.on('ended', this.onVideoEnded.bind(this)),
            this.player.on('play', this.onVideoPlay.bind(this)),
            this.player.on('pause', this.onVideoPause.bind(this)),
            this.player.on('bufferstart', this.onVideoBuffering.bind(this)),
            this.player.on('timeupdate', this.onVideoTimeUpdate.bind(this)),
            1 === this.volume || this.muted || this.setVolume(this.volume))
        }
        onVideoError(t) {
          console.error(t)
        }
        generatePlayerElement() {
          var t = document.createElement('iframe')
          return (
            t.setAttribute('frameborder', 0),
            t.setAttribute('allow', 'autoplay; mute'),
            this.params.lazyloading && t.setAttribute('loading', 'lazy'),
            t
          )
        }
        generateSrcURL(t) {
          let e =
            'https://player.vimeo.com/video/' + t + '?background=1&controls=0'
          return (
            this.params.muted && (e += '&muted=1'),
            this.params.autoplay &&
              (this.params['always-play'] || this.isIntersecting) &&
              (e += '&autoplay=1'),
            this.params.loop && (e += '&loop=1&autopause=0'),
            this.params['no-cookie'] && (e += '&dnt=1'),
            this.params['start-at'] &&
              (e += '#t=' + this.params['start-at'] + 's'),
            e
          )
        }
        injectPlayer() {
          ;(this.playerElement = this.generatePlayerElement()),
            (this.src = this.generateSrcURL(this.id)),
            (this.playerElement.src = this.src),
            (this.playerElement.id = this.uid),
            this.stylePlayerElement(this.playerElement),
            this.element.appendChild(this.playerElement),
            this.resize(this.playerElement)
        }
        updateState(t) {
          ;(this.currentState = t),
            this.dispatchEvent('video-background-state-change')
        }
        setSource(t) {
          t = t.match(u)
          t &&
            t.length &&
            ((this.id = t[1]),
            (this.src = this.generateSrcURL(this.id)),
            (this.playerElement.src = this.src),
            this.element.hasAttribute('data-vbg') &&
              this.element.setAttribute('data-vbg', this.src),
            this.element.hasAttribute('data-ytbg') &&
              this.element.setAttribute('data-ytbg', this.src),
            this.loadBackground(this.id))
        }
        onVideoPlayerReady() {
          this.mobileLowBatteryAutoplayHack(),
            this.params['start-at'] && this.seekTo(this.params['start-at']),
            this.params.autoplay &&
              (this.params['always-play'] || this.isIntersecting) &&
              this.player.play(),
            this.player.getDuration().then((t) => {
              this.setDuration(t)
            }),
            this.dispatchEvent('video-background-ready')
        }
        onVideoEnded() {
          if (
            (this.updateState('ended'),
            this.dispatchEvent('video-background-ended'),
            !this.params.loop)
          )
            return this.pause()
          this.seekTo(this.params['start-at']),
            this.updateState('playing'),
            this.dispatchEvent('video-background-play')
        }
        onVideoTimeUpdate(t) {
          ;(this.currentTime = t.seconds),
            (this.percentComplete = this.timeToPercentage(t.seconds)),
            this.dispatchEvent('video-background-time-update'),
            this.setDuration(t.duration),
            this.params['end-at'] &&
              this.duration &&
              t.seconds >= this.duration &&
              this.onVideoEnded()
        }
        onVideoBuffering() {
          this.updateState('buffering')
        }
        onVideoPlay(t) {
          if (
            (this.setDuration(t.duration),
            !this.initialPlay &&
              ((this.initialPlay = !0),
              (this.playerElement.style.opacity = 1),
              this.player.setLoop(this.params.loop),
              !this.params.autoplay ||
                (!this.params['always-play'] && !this.isIntersecting)))
          )
            return this.player.pause()
          t = t.seconds
          this.params['start-at'] &&
            t < this.params['start-at'] &&
            this.seekTo(this.params['start-at']),
            this.duration &&
              t >= this.duration &&
              this.seekTo(this.params['start-at']),
            this.updateState('playing'),
            this.dispatchEvent('video-background-play')
        }
        onVideoPause() {
          this.updateState('paused'),
            this.dispatchEvent('video-background-pause')
        }
        seek(t) {
          this.seekTo(this.percentageToTime(t))
        }
        seekTo(t) {
          this.player &&
            (this.player.setCurrentTime(t),
            this.dispatchEvent('video-background-seeked'))
        }
        softPause() {
          this.player && 'paused' !== this.currentState && this.player.pause()
        }
        softPlay() {
          this.player && 'playing' !== this.currentState && this.player.play()
        }
        play() {
          this.player && ((this.paused = !1), this.player.play())
        }
        pause() {
          this.player && ((this.paused = !0), this.player.pause())
        }
        unmute() {
          this.player &&
            ((this.muted = !1),
            this.initialVolume ||
              ((this.initialVolume = !0), this.setVolume(this.params.volume)),
            this.player.setMuted(!1),
            this.dispatchEvent('video-background-unmute'))
        }
        mute() {
          this.player &&
            ((this.muted = !0),
            this.player.setMuted(!0),
            this.dispatchEvent('video-background-mute'))
        }
        getVolume() {
          if (this.player) return this.player.getVolume()
        }
        setVolume(t) {
          this.player &&
            ((this.volume = t),
            this.player.setVolume(t),
            this.dispatchEvent('video-background-volume-change'))
        }
      },
      v = class extends t {
        constructor(t, e, i, s, n) {
          super(t, e, i.link, s, 'video', n),
            i &&
              i.link &&
              ((this.is_mobile && !this.params.mobile) ||
                ((this.src = i.link),
                (this.ext = /(?:\.([^.]+))?$/.exec(i.id)[1]),
                (this.uid = s),
                this.element.setAttribute('data-vbg-uid', s),
                (this.player = null),
                (this.buttons = {}),
                (this.MIME_MAP = {
                  ogv: 'video/ogg',
                  ogm: 'video/ogg',
                  ogg: 'video/ogg',
                  avi: 'video/avi',
                  mp4: 'video/mp4',
                  webm: 'video/webm',
                }),
                (this.mime = this.MIME_MAP[this.ext.toLowerCase()]),
                this.injectPlayer(),
                this.mobileLowBatteryAutoplayHack(),
                this.dispatchEvent('video-background-ready')))
        }
        generatePlayerElement() {
          var t = document.createElement('video')
          return (
            t.setAttribute('playsinline', ''),
            this.params.loop && t.setAttribute('loop', ''),
            this.params.autoplay &&
              (this.params['always-play'] || this.isIntersecting) &&
              t.setAttribute('autoplay', ''),
            this.muted && t.setAttribute('muted', ''),
            this.params.lazyloading && t.setAttribute('loading', 'lazy'),
            t
          )
        }
        injectPlayer() {
          ;(this.player = this.generatePlayerElement()),
            (this.playerElement = this.player),
            1 === this.volume || this.muted || this.setVolume(this.volume),
            this.playerElement.setAttribute('id', this.uid),
            this.stylePlayerElement(this.playerElement),
            this.player.addEventListener(
              'loadedmetadata',
              this.onVideoLoadedMetadata.bind(this),
            ),
            this.player.addEventListener(
              'durationchange',
              this.onVideoLoadedMetadata.bind(this),
            ),
            this.player.addEventListener(
              'canplay',
              this.onVideoCanPlay.bind(this),
            ),
            this.player.addEventListener(
              'timeupdate',
              this.onVideoTimeUpdate.bind(this),
            ),
            this.player.addEventListener('play', this.onVideoPlay.bind(this)),
            this.player.addEventListener('pause', this.onVideoPause.bind(this)),
            this.player.addEventListener(
              'waiting',
              this.onVideoBuffering.bind(this),
            ),
            this.player.addEventListener('ended', this.onVideoEnded.bind(this)),
            this.element.appendChild(this.playerElement)
          var t = document.createElement('source')
          t.setAttribute('src', this.src),
            t.setAttribute('type', this.mime),
            this.playerElement.appendChild(t),
            this.resize(this.playerElement)
        }
        updateState(t) {
          ;(this.currentState = t),
            this.dispatchEvent('video-background-state-change')
        }
        setSource(t) {
          var e = t.match(p)
          e &&
            e.length &&
            ((this.id = e[1]),
            (this.ext = /(?:\.([^.]+))?$/.exec(this.id)[1]),
            (this.mime = this.MIME_MAP[this.ext.toLowerCase()]),
            (this.playerElement.innerHTML = ''),
            (e = document.createElement('source')).setAttribute('src', t),
            e.setAttribute('type', this.mime),
            this.playerElement.appendChild(e),
            (this.src = t),
            this.element.hasAttribute('data-vbg') &&
              this.element.setAttribute('data-vbg', this.src),
            this.element.hasAttribute('data-ytbg')) &&
            this.element.setAttribute('data-ytbg', this.src)
        }
        onVideoLoadedMetadata() {
          this.setDuration(this.player.duration)
        }
        onVideoCanPlay() {
          this.setDuration(this.player.duration)
        }
        onVideoTimeUpdate() {
          ;(this.currentTime = this.player.currentTime),
            (this.percentComplete = this.timeToPercentage(
              this.player.currentTime,
            )),
            this.dispatchEvent('video-background-time-update'),
            this.params['end-at'] &&
              this.currentTime >= this.duration &&
              this.onVideoEnded()
        }
        onVideoPlay() {
          this.initialPlay ||
            ((this.initialPlay = !0), (this.playerElement.style.opacity = 1))
          var t = this.player.currentTime
          this.params['start-at'] &&
            t <= this.params['start-at'] &&
            this.seekTo(this.params['start-at']),
            this.duration &&
              t >= this.duration &&
              this.seekTo(this.params['start-at']),
            this.updateState('playing'),
            this.dispatchEvent('video-background-play')
        }
        onVideoPause() {
          this.updateState('paused'),
            this.dispatchEvent('video-background-pause')
        }
        onVideoEnded() {
          if (
            (this.updateState('ended'),
            this.dispatchEvent('video-background-ended'),
            !this.params.loop)
          )
            return this.pause()
          this.seekTo(this.params['start-at']), this.onVideoPlay()
        }
        onVideoBuffering() {
          this.updateState('buffering')
        }
        seek(t) {
          this.seekTo(this.percentageToTime(t))
        }
        seekTo(t) {
          this.player &&
            (this.player.hasOwnProperty('fastSeek')
              ? this.player.fastSeek(t)
              : ((this.player.currentTime = t),
                this.dispatchEvent('video-background-seeked')))
        }
        softPause() {
          this.player && 'paused' !== this.currentState && this.player.pause()
        }
        softPlay() {
          this.player && 'playing' !== this.currentState && this.player.play()
        }
        play() {
          this.player && ((this.paused = !1), this.player.play())
        }
        pause() {
          this.player && ((this.paused = !0), this.player.pause())
        }
        unmute() {
          this.player &&
            ((this.muted = !1),
            (this.player.muted = !1),
            this.initialVolume ||
              ((this.initialVolume = !0), this.setVolume(this.params.volume)),
            this.dispatchEvent('video-background-unmute'))
        }
        mute() {
          this.player &&
            ((this.muted = !0),
            (this.player.muted = !0),
            this.dispatchEvent('video-background-mute'))
        }
        getVolume() {
          if (this.player) return this.player.volume
        }
        setVolume(t) {
          this.player &&
            ((this.volume = t),
            (this.player.volume = t),
            this.dispatchEvent('video-background-volume-change'))
        }
      },
      y = class {
        constructor(t, e) {
          ;(this.elements = t),
            this.elements instanceof Element &&
              (this.elements = [this.elements]),
            'string' == typeof this.elements &&
              (this.elements = document.querySelectorAll(t)),
            (this.index = {})
          const i = this
          if (
            ((this.intersectionObserver = null),
            'IntersectionObserver' in window &&
              (this.intersectionObserver = new IntersectionObserver(function (
                t,
              ) {
                t.forEach(function (t) {
                  var e = t.target.getAttribute('data-vbg-uid')
                  if (e && i.index.hasOwnProperty(e) && t.isIntersecting) {
                    i.index[e].isIntersecting = !0
                    try {
                      i.index[e].player &&
                        !i.index[e].paused &&
                        i.index[e].softPlay()
                    } catch (t) {}
                  } else {
                    i.index[e].isIntersecting = !1
                    try {
                      i.index[e].player && i.index[e].softPause()
                    } catch (t) {}
                  }
                })
              })),
            (this.resizeObserver = null),
            'ResizeObserver' in window
              ? (this.resizeObserver = new ResizeObserver(function (t) {
                  t.forEach(function (t) {
                    const e = t.target.getAttribute('data-vbg-uid')
                    e &&
                      i.index.hasOwnProperty(e) &&
                      window.requestAnimationFrame(() => i.index[e].resize())
                  })
                }))
              : window.addEventListener('resize', function () {
                  for (let t in i.index)
                    window.requestAnimationFrame(() =>
                      i.index[t].resize(i.index[t].playerElement),
                    )
                }),
            this.initPlayers(),
            this.elements && this.elements.length)
          ) {
            for (let t = 0; t < this.elements.length; t++) {
              var s = this.elements[t]
              this.add(s, e)
            }
            document.addEventListener(
              'visibilitychange',
              this.onVisibilityChange.bind(this),
            )
          }
        }
        onVisibilityChange() {
          if (!document.hidden)
            for (var t in this.index) {
              t = this.index[t]
              t.shouldPlay() && t.softPlay()
            }
        }
        add(t, e) {
          if (t && !t.hasAttribute('data-vbg-uid')) {
            this.intersectionObserver || ((e = e || {})['always-play'] = !0)
            var i =
                t.getAttribute('data-youtube') || t.getAttribute('data-vbg'),
              s = this.getVidID(i)
            if (s) {
              var n = this.generateUID(s.id)
              if (n) {
                switch (s.type) {
                  case 'YOUTUBE':
                    var o = new m(t, e, s.id, n, this)
                    this.index[n] = o
                    break
                  case 'VIMEO':
                    o = new g(t, e, s.id, n, this)
                    this.index[n] = o
                    break
                  case 'VIDEO':
                    o = new v(t, e, s, n, this)
                    this.index[n] = o
                }
                this.resizeObserver && this.resizeObserver.observe(t),
                  !this.index[n].params['always-play'] &&
                    this.intersectionObserver &&
                    this.intersectionObserver.observe(t)
              }
            }
          }
        }
        destroy(t) {
          var e = t.uid || t.getAttribute('data-vbg-uid')
          e &&
            this.index.hasOwnProperty(e) &&
            (!this.index[e].params['always-play'] &&
              this.intersectionObserver &&
              this.intersectionObserver.unobserve(t),
            this.resizeObserver && this.resizeObserver.unobserve(t),
            this.index[e].destroy(),
            delete this.index[e])
        }
        destroyAll() {
          for (var t in this.index) this.destroy(this.index[t].playerElement)
        }
        getVidID(t) {
          if (void 0 !== t || null !== t)
            for (var e in ((this.re = {}),
            (this.re.YOUTUBE = c),
            (this.re.VIMEO = u),
            (this.re.VIDEO = p),
            this.re)) {
              var i = t.match(this.re[e])
              if (i && i.length)
                return (
                  (this.re[e].lastIndex = 0),
                  { id: i[1], type: e, regex_pts: i, link: t }
                )
            }
        }
        generateUID(t) {
          let e =
            (t =
              'vbg-' +
              (t = (t = (t = t.replace(/[^a-zA-Z0-9\-_]/g, '-')).replace(
                /-{2,}/g,
                '-',
              ))
                .replace(/^-+/, '')
                .replace(/-+$/, ''))) +
            '-' +
            i(0, 9999)
          for (; this.index.hasOwnProperty(e); ) e = t + '-' + i(0, 9999)
          return e
        }
        get(t) {
          t = 'string' == typeof t ? t : t.getAttribute('data-vbg-uid')
          if (t && this.index.hasOwnProperty(t)) return this.index[t]
        }
        pauseAll() {
          for (var t in this.index) this.index[t].pause()
        }
        playAll() {
          for (var t in this.index) this.index[t].play()
        }
        muteAll() {
          for (var t in this.index) this.index[t].mute()
        }
        unmuteAll() {
          for (var t in this.index) this.index[t].unmute()
        }
        setVolumeAll(t) {
          for (var e in this.index) this.index[e].setVolume(t)
        }
        initPlayers(e) {
          const i = this
          ;(window.onYouTubeIframeAPIReady = function () {
            for (var t in i.index)
              i.index[t] instanceof m && i.index[t].initYTPlayer()
            e && setTimeout(e, 100)
          }),
            window.hasOwnProperty('YT') &&
              window.YT.loaded &&
              window.onYouTubeIframeAPIReady(),
            (window.onVimeoIframeAPIReady = function () {
              for (var t in i.index)
                i.index[t] instanceof g && i.index[t].initVimeoPlayer()
              e && setTimeout(e, 100)
            }),
            window.hasOwnProperty('Vimeo') &&
              window.Vimeo.hasOwnProperty('Player') &&
              window.onVimeoIframeAPIReady()
        }
      }
    'function' == typeof jQuery &&
      ((f = jQuery).fn.youtube_background = function (t) {
        var e = f(this)
        return (
          window.hasOwnProperty('VIDEO_BACKGROUNDS')
            ? window.VIDEO_BACKGROUNDS.add(e, t)
            : (window.VIDEO_BACKGROUNDS = new y(this, t)),
          e
        )
      }),
      (window.VideoBackgrounds = y)
  })(),
  (function (t, e) {
    'object' == typeof exports && 'undefined' != typeof module
      ? e(require('jquery'))
      : 'function' == typeof define && define.amd
        ? define(['jquery'], e)
        : e(t.jQuery)
  })(this, function (d) {
    'use strict'
    function c(t, e) {
      var t = t.getBoundingClientRect(),
        i = t.top,
        s = t.bottom,
        n = t.left,
        t = t.right,
        e = d.extend({ tolerance: 0, viewport: window }, e),
        o = e.viewport.jquery ? e.viewport : d(e.viewport),
        r =
          (o.length ||
            (console.warn(
              'isInViewport: The viewport selector you have provided matches no element on page.',
            ),
            console.warn('isInViewport: Defaulting to viewport as window'),
            (o = d(window))),
          o.height()),
        a = o.width(),
        l = o[0].toString()
      return (
        o[0] !== window &&
          '[object Window]' !== l &&
          '[object DOMWindow]' !== l &&
          ((i -= (l = o[0].getBoundingClientRect()).top),
          (s -= l.top),
          (n -= l.left),
          (t -= l.left),
          (a -= c.scrollBarWidth =
            c.scrollBarWidth ||
            ((l = o),
            (o = d('<div></div>').css({ width: '100%' })),
            l.append(o),
            (l = l.width() - o.width()),
            o.remove(),
            l))),
        (e.tolerance = ~~Math.round(parseFloat(e.tolerance))),
        e.tolerance < 0 && (e.tolerance = r + e.tolerance),
        !(t <= 0 || a <= n) &&
          (e.tolerance ? i <= e.tolerance && s >= e.tolerance : 0 < s && i <= r)
      )
    }
    function s(t) {
      return t
        ? (1 === (t = t.split(',')).length &&
            isNaN(t[0]) &&
            ((t[1] = t[0]), (t[0] = void 0)),
          {
            tolerance: t[0] ? t[0].trim() : void 0,
            viewport: t[1] ? d(t[1].trim()) : void 0,
          })
        : {}
    }
    ;(d = d && d.hasOwnProperty('default') ? d.default : d).extend(
      d.expr.pseudos || d.expr[':'],
      {
        'in-viewport': d.expr.createPseudo
          ? d.expr.createPseudo(function (e) {
              return function (t) {
                return c(t, s(e))
              }
            })
          : function (t, e, i) {
              return c(t, s(i[3]))
            },
      },
    ),
      (d.fn.isInViewport = function (i) {
        return this.filter(function (t, e) {
          return c(e, i)
        })
      }),
      (d.fn.run = function (t) {
        var i = this
        1 === arguments.length && 'function' == typeof t && (t = [t])
        if (t instanceof Array)
          return (
            t.forEach(function (e) {
              'function' != typeof e
                ? (console.warn(
                    'isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions',
                  ),
                  console.warn(
                    'isInViewport: Ignoring non-function values in array and moving on',
                  ))
                : [].slice.call(i).forEach(function (t) {
                    return e.call(d(t))
                  })
            }),
            this
          )
        throw new SyntaxError(
          'isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions',
        )
      })
  }),
  (function (o) {
    var s,
      n = [],
      r = !1,
      a = !1,
      l = { interval: 250, force_process: !1 },
      d = o(window)
    function c() {
      a = !1
      for (var t = 0; t < n.length; t++) {
        var e,
          i = o(n[t]).filter(function () {
            return o(this).is(':appeared')
          })
        i.trigger('appear', [i]),
          s && (e = s.not(i)).trigger('disappear', [e]),
          (s = i)
      }
    }
    ;(o.expr[':'].appeared = function (t) {
      var e,
        i,
        s,
        n,
        t = o(t)
      return (
        !!t.is(':visible') &&
        ((e = d.scrollLeft()),
        (i = d.scrollTop()),
        (s = (n = t.offset()).left),
        (n = n.top) + t.height() >= i) &&
        n - (t.data('appear-top-offset') || 0) <= i + d.height() &&
        s + t.width() >= e &&
        s - (t.data('appear-left-offset') || 0) <= e + d.width()
      )
    }),
      o.fn.extend({
        appear: function (t) {
          var e,
            i = o.extend({}, l, t || {}),
            t = this.selector || this
          return (
            r ||
              ((e = function () {
                a || ((a = !0), setTimeout(c, i.interval))
              }),
              o(window).scroll(e).resize(e),
              (r = !0)),
            i.force_process && setTimeout(c, i.interval),
            n.push(t),
            o(t)
          )
        },
      }),
      o.extend({
        force_appear: function () {
          return !!r && (c(), !0)
        },
      })
  })(jQuery),
  (function (t) {
    'function' == typeof define && define.amd
      ? define(['jquery'], t)
      : 'object' == typeof exports
        ? t(require('jquery'))
        : t(window.jQuery || window.Zepto)
  })(function (d) {
    function t() {}
    function c(t, e) {
      f.ev.on('mfp' + t + k, e)
    }
    function u(t, e, i, s) {
      var n = document.createElement('div')
      return (
        (n.className = 'mfp-' + t),
        i && (n.innerHTML = i),
        s ? e && e.appendChild(n) : ((n = d(n)), e && n.appendTo(e)),
        n
      )
    }
    function p(t, e) {
      f.ev.triggerHandler('mfp' + t, e),
        f.st.callbacks &&
          ((t = t.charAt(0).toLowerCase() + t.slice(1)), f.st.callbacks[t]) &&
          f.st.callbacks[t].apply(f, d.isArray(e) ? e : [e])
    }
    function h(t) {
      return (
        (t === i && f.currTemplate.closeBtn) ||
          ((f.currTemplate.closeBtn = d(
            f.st.closeMarkup.replace('%title%', f.st.tClose),
          )),
          (i = t)),
        f.currTemplate.closeBtn
      )
    }
    function o() {
      d.magnificPopup.instance ||
        ((f = new t()).init(), (d.magnificPopup.instance = f))
    }
    function r() {
      y && (v.after(y.addClass(l)).detach(), (y = null))
    }
    function n() {
      b && d(document.body).removeClass(b)
    }
    function e() {
      n(), f.req && f.req.abort()
    }
    var f,
      s,
      m,
      a,
      g,
      i,
      l,
      v,
      y,
      b,
      w = 'Close',
      L = 'BeforeClose',
      _ = 'MarkupParse',
      x = 'Open',
      k = '.mfp',
      T = 'mfp-ready',
      D = 'mfp-removing',
      C = 'mfp-prevent-close',
      S = !!window.jQuery,
      P = d(window),
      O =
        ((d.magnificPopup = {
          instance: null,
          proto: (t.prototype = {
            constructor: t,
            init: function () {
              var t = navigator.appVersion
              ;(f.isLowIE = f.isIE8 =
                document.all && !document.addEventListener),
                (f.isAndroid = /android/gi.test(t)),
                (f.isIOS = /iphone|ipad|ipod/gi.test(t)),
                (f.supportsTransition = (function () {
                  var t = document.createElement('p').style,
                    e = ['ms', 'O', 'Moz', 'Webkit']
                  if (void 0 !== t.transition) return !0
                  for (; e.length; ) if (e.pop() + 'Transition' in t) return !0
                  return !1
                })()),
                (f.probablyMobile =
                  f.isAndroid ||
                  f.isIOS ||
                  /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
                    navigator.userAgent,
                  )),
                (m = d(document)),
                (f.popupsCache = {})
            },
            open: function (t) {
              if (!1 === t.isObj) {
                ;(f.items = t.items.toArray()), (f.index = 0)
                for (var e, i = t.items, s = 0; s < i.length; s++)
                  if ((e = (e = i[s]).parsed ? e.el[0] : e) === t.el[0]) {
                    f.index = s
                    break
                  }
              } else
                (f.items = d.isArray(t.items) ? t.items : [t.items]),
                  (f.index = t.index || 0)
              if (!f.isOpen) {
                ;(f.types = []),
                  (g = ''),
                  t.mainEl && t.mainEl.length
                    ? (f.ev = t.mainEl.eq(0))
                    : (f.ev = m),
                  t.key
                    ? (f.popupsCache[t.key] || (f.popupsCache[t.key] = {}),
                      (f.currTemplate = f.popupsCache[t.key]))
                    : (f.currTemplate = {}),
                  (f.st = d.extend(!0, {}, d.magnificPopup.defaults, t)),
                  (f.fixedContentPos =
                    'auto' === f.st.fixedContentPos
                      ? !f.probablyMobile
                      : f.st.fixedContentPos),
                  f.st.modal &&
                    ((f.st.closeOnContentClick = !1),
                    (f.st.closeOnBgClick = !1),
                    (f.st.showCloseBtn = !1),
                    (f.st.enableEscapeKey = !1)),
                  f.bgOverlay ||
                    ((f.bgOverlay = u('bg').on('click' + k, function () {
                      f.close()
                    })),
                    (f.wrap = u('wrap')
                      .attr('tabindex', -1)
                      .on('click' + k, function (t) {
                        f._checkIfClose(t.target) && f.close()
                      })),
                    (f.container = u('container', f.wrap))),
                  (f.contentContainer = u('content')),
                  f.st.preloader &&
                    (f.preloader = u('preloader', f.container, f.st.tLoading))
                var n = d.magnificPopup.modules
                for (s = 0; s < n.length; s++) {
                  var o = (o = n[s]).charAt(0).toUpperCase() + o.slice(1)
                  f['init' + o].call(f)
                }
                p('BeforeOpen'),
                  f.st.showCloseBtn &&
                    (f.st.closeBtnInside
                      ? (c(_, function (t, e, i, s) {
                          i.close_replaceWith = h(s.type)
                        }),
                        (g += ' mfp-close-btn-in'))
                      : f.wrap.append(h())),
                  f.st.alignTop && (g += ' mfp-align-top'),
                  f.fixedContentPos
                    ? f.wrap.css({
                        overflow: f.st.overflowY,
                        overflowX: 'hidden',
                        overflowY: f.st.overflowY,
                      })
                    : f.wrap.css({ top: P.scrollTop(), position: 'absolute' }),
                  (!1 !== f.st.fixedBgPos &&
                    ('auto' !== f.st.fixedBgPos || f.fixedContentPos)) ||
                    f.bgOverlay.css({
                      height: m.height(),
                      position: 'absolute',
                    }),
                  f.st.enableEscapeKey &&
                    m.on('keyup' + k, function (t) {
                      27 === t.keyCode && f.close()
                    }),
                  P.on('resize' + k, function () {
                    f.updateSize()
                  }),
                  f.st.closeOnContentClick || (g += ' mfp-auto-cursor'),
                  g && f.wrap.addClass(g)
                var r = (f.wH = P.height()),
                  a = {},
                  l =
                    (f.fixedContentPos &&
                      f._hasScrollBar(r) &&
                      (l = f._getScrollbarSize()) &&
                      (a.marginRight = l),
                    f.fixedContentPos &&
                      (f.isIE7
                        ? d('body, html').css('overflow', 'hidden')
                        : (a.overflow = 'hidden')),
                    f.st.mainClass)
                return (
                  f.isIE7 && (l += ' mfp-ie7'),
                  l && f._addClassToMFP(l),
                  f.updateItemHTML(),
                  p('BuildControls'),
                  d('html').css(a),
                  f.bgOverlay
                    .add(f.wrap)
                    .prependTo(f.st.prependTo || d(document.body)),
                  (f._lastFocusedEl = document.activeElement),
                  setTimeout(function () {
                    f.content
                      ? (f._addClassToMFP(T), f._setFocus())
                      : f.bgOverlay.addClass(T),
                      m.on('focusin' + k, f._onFocusIn)
                  }, 16),
                  (f.isOpen = !0),
                  f.updateSize(r),
                  p(x),
                  t
                )
              }
              f.updateItemHTML()
            },
            close: function () {
              f.isOpen &&
                (p(L),
                (f.isOpen = !1),
                f.st.removalDelay && !f.isLowIE && f.supportsTransition
                  ? (f._addClassToMFP(D),
                    setTimeout(function () {
                      f._close()
                    }, f.st.removalDelay))
                  : f._close())
            },
            _close: function () {
              p(w)
              var t = D + ' ' + T + ' '
              f.bgOverlay.detach(),
                f.wrap.detach(),
                f.container.empty(),
                f.st.mainClass && (t += f.st.mainClass + ' '),
                f._removeClassFromMFP(t),
                f.fixedContentPos &&
                  ((t = { marginRight: '' }),
                  f.isIE7
                    ? d('body, html').css('overflow', '')
                    : (t.overflow = ''),
                  d('html').css(t)),
                m.off('keyup.mfp focusin' + k),
                f.ev.off(k),
                f.wrap.attr('class', 'mfp-wrap').removeAttr('style'),
                f.bgOverlay.attr('class', 'mfp-bg'),
                f.container.attr('class', 'mfp-container'),
                !f.st.showCloseBtn ||
                  (f.st.closeBtnInside &&
                    !0 !== f.currTemplate[f.currItem.type]) ||
                  (f.currTemplate.closeBtn && f.currTemplate.closeBtn.detach()),
                f.st.autoFocusLast &&
                  f._lastFocusedEl &&
                  d(f._lastFocusedEl).focus(),
                (f.currItem = null),
                (f.content = null),
                (f.currTemplate = null),
                (f.prevHeight = 0),
                p('AfterClose')
            },
            updateSize: function (t) {
              var e
              f.isIOS
                ? ((e =
                    document.documentElement.clientWidth / window.innerWidth),
                  (e = window.innerHeight * e),
                  f.wrap.css('height', e),
                  (f.wH = e))
                : (f.wH = t || P.height()),
                f.fixedContentPos || f.wrap.css('height', f.wH),
                p('Resize')
            },
            updateItemHTML: function () {
              var t = f.items[f.index],
                e =
                  (f.contentContainer.detach(),
                  f.content && f.content.detach(),
                  (t = t.parsed ? t : f.parseEl(f.index)).type),
                i =
                  (p('BeforeChange', [f.currItem ? f.currItem.type : '', e]),
                  (f.currItem = t),
                  f.currTemplate[e] ||
                    ((i = !!f.st[e] && f.st[e].markup),
                    p('FirstMarkupParse', i),
                    (f.currTemplate[e] = !i || d(i))),
                  a &&
                    a !== t.type &&
                    f.container.removeClass('mfp-' + a + '-holder'),
                  f['get' + e.charAt(0).toUpperCase() + e.slice(1)](
                    t,
                    f.currTemplate[e],
                  ))
              f.appendContent(i, e),
                (t.preloaded = !0),
                p('Change', t),
                (a = t.type),
                f.container.prepend(f.contentContainer),
                p('AfterChange')
            },
            appendContent: function (t, e) {
              ;(f.content = t)
                ? f.st.showCloseBtn &&
                  f.st.closeBtnInside &&
                  !0 === f.currTemplate[e]
                  ? f.content.find('.mfp-close').length || f.content.append(h())
                  : (f.content = t)
                : (f.content = ''),
                p('BeforeAppend'),
                f.container.addClass('mfp-' + e + '-holder'),
                f.contentContainer.append(f.content)
            },
            parseEl: function (t) {
              var e,
                i = f.items[t]
              if (
                (i = i.tagName
                  ? { el: d(i) }
                  : ((e = i.type), { data: i, src: i.src })).el
              ) {
                for (var s = f.types, n = 0; n < s.length; n++)
                  if (i.el.hasClass('mfp-' + s[n])) {
                    e = s[n]
                    break
                  }
                ;(i.src = i.el.attr('data-mfp-src')),
                  i.src || (i.src = i.el.attr('href'))
              }
              return (
                (i.type = e || f.st.type || 'inline'),
                (i.index = t),
                (i.parsed = !0),
                (f.items[t] = i),
                p('ElementParse', i),
                f.items[t]
              )
            },
            addGroup: function (e, i) {
              function t(t) {
                ;(t.mfpEl = this), f._openClick(t, e, i)
              }
              var s = 'click.magnificPopup'
              ;((i = i || {}).mainEl = e),
                i.items
                  ? ((i.isObj = !0), e.off(s).on(s, t))
                  : ((i.isObj = !1),
                    i.delegate
                      ? e.off(s).on(s, i.delegate, t)
                      : (i.items = e).off(s).on(s, t))
            },
            _openClick: function (t, e, i) {
              var s = (void 0 !== i.midClick ? i : d.magnificPopup.defaults)
                .midClick
              if (
                s ||
                !(
                  2 === t.which ||
                  t.ctrlKey ||
                  t.metaKey ||
                  t.altKey ||
                  t.shiftKey
                )
              ) {
                s = (void 0 !== i.disableOn ? i : d.magnificPopup.defaults)
                  .disableOn
                if (s)
                  if (d.isFunction(s)) {
                    if (!s.call(f)) return !0
                  } else if (P.width() < s) return !0
                t.type && (t.preventDefault(), f.isOpen) && t.stopPropagation(),
                  (i.el = d(t.mfpEl)),
                  i.delegate && (i.items = e.find(i.delegate)),
                  f.open(i)
              }
            },
            updateStatus: function (t, e) {
              var i
              f.preloader &&
                (s !== t && f.container.removeClass('mfp-s-' + s),
                (i = {
                  status: t,
                  text: (e = e || 'loading' !== t ? e : f.st.tLoading),
                }),
                p('UpdateStatus', i),
                (t = i.status),
                f.preloader.html((e = i.text)),
                f.preloader.find('a').on('click', function (t) {
                  t.stopImmediatePropagation()
                }),
                f.container.addClass('mfp-s-' + t),
                (s = t))
            },
            _checkIfClose: function (t) {
              if (!d(t).hasClass(C)) {
                var e = f.st.closeOnContentClick,
                  i = f.st.closeOnBgClick
                if (e && i) return !0
                if (
                  !f.content ||
                  d(t).hasClass('mfp-close') ||
                  (f.preloader && t === f.preloader[0])
                )
                  return !0
                if (t === f.content[0] || d.contains(f.content[0], t)) {
                  if (e) return !0
                } else if (i && d.contains(document, t)) return !0
                return !1
              }
            },
            _addClassToMFP: function (t) {
              f.bgOverlay.addClass(t), f.wrap.addClass(t)
            },
            _removeClassFromMFP: function (t) {
              this.bgOverlay.removeClass(t), f.wrap.removeClass(t)
            },
            _hasScrollBar: function (t) {
              return (
                (f.isIE7 ? m.height() : document.body.scrollHeight) >
                (t || P.height())
              )
            },
            _setFocus: function () {
              ;(f.st.focus ? f.content.find(f.st.focus).eq(0) : f.wrap).focus()
            },
            _onFocusIn: function (t) {
              if (t.target !== f.wrap[0] && !d.contains(f.wrap[0], t.target))
                return f._setFocus(), !1
            },
            _parseMarkup: function (n, t, e) {
              var o
              e.data && (t = d.extend(e.data, t)),
                p(_, [n, t, e]),
                d.each(t, function (t, e) {
                  if (void 0 === e || !1 === e) return !0
                  var i, s
                  1 < (o = t.split('_')).length
                    ? 0 < (i = n.find(k + '-' + o[0])).length &&
                      ('replaceWith' === (s = o[1])
                        ? i[0] !== e[0] && i.replaceWith(e)
                        : 'img' === s
                          ? i.is('img')
                            ? i.attr('src', e)
                            : i.replaceWith(
                                d('<img>')
                                  .attr('src', e)
                                  .attr('class', i.attr('class')),
                              )
                          : i.attr(o[1], e))
                    : n.find(k + '-' + t).html(e)
                })
            },
            _getScrollbarSize: function () {
              var t
              return (
                void 0 === f.scrollbarSize &&
                  (((t = document.createElement('div')).style.cssText =
                    'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'),
                  document.body.appendChild(t),
                  (f.scrollbarSize = t.offsetWidth - t.clientWidth),
                  document.body.removeChild(t)),
                f.scrollbarSize
              )
            },
          }),
          modules: [],
          open: function (t, e) {
            return (
              o(),
              ((t = t ? d.extend(!0, {}, t) : {}).isObj = !0),
              (t.index = e || 0),
              this.instance.open(t)
            )
          },
          close: function () {
            return d.magnificPopup.instance && d.magnificPopup.instance.close()
          },
          registerModule: function (t, e) {
            e.options && (d.magnificPopup.defaults[t] = e.options),
              d.extend(this.proto, e.proto),
              this.modules.push(t)
          },
          defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: '',
            preloader: !0,
            focus: '',
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: 'auto',
            fixedBgPos: 'auto',
            overflowY: 'auto',
            closeMarkup:
              '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: 'Close (Esc)',
            tLoading: 'Loading...',
            autoFocusLast: !0,
          },
        }),
        (d.fn.magnificPopup = function (t) {
          o()
          var e,
            i,
            s,
            n = d(this)
          return (
            'string' == typeof t
              ? 'open' === t
                ? ((e = S ? n.data('magnificPopup') : n[0].magnificPopup),
                  (i = parseInt(arguments[1], 10) || 0),
                  (s = e.items
                    ? e.items[i]
                    : ((s = n),
                      (s = e.delegate ? s.find(e.delegate) : s).eq(i))),
                  f._openClick({ mfpEl: s }, n, e))
                : f.isOpen &&
                  f[t].apply(f, Array.prototype.slice.call(arguments, 1))
              : ((t = d.extend(!0, {}, t)),
                S ? n.data('magnificPopup', t) : (n[0].magnificPopup = t),
                f.addGroup(n, t)),
            n
          )
        }),
        'inline'),
      E =
        (d.magnificPopup.registerModule(O, {
          options: {
            hiddenClass: 'hide',
            markup: '',
            tNotFound: 'Content not found',
          },
          proto: {
            initInline: function () {
              f.types.push(O),
                c(w + '.' + O, function () {
                  r()
                })
            },
            getInline: function (t, e) {
              var i, s, n
              return (
                r(),
                t.src
                  ? ((i = f.st.inline),
                    (s = d(t.src)).length
                      ? ((n = s[0].parentNode) &&
                          n.tagName &&
                          (v ||
                            ((l = i.hiddenClass), (v = u(l)), (l = 'mfp-' + l)),
                          (y = s.after(v).detach().removeClass(l))),
                        f.updateStatus('ready'))
                      : (f.updateStatus('error', i.tNotFound),
                        (s = d('<div>'))),
                    (t.inlineElement = s))
                  : (f.updateStatus('ready'), f._parseMarkup(e, {}, t), e)
              )
            },
          },
        }),
        'ajax')
    d.magnificPopup.registerModule(E, {
      options: {
        settings: null,
        cursor: 'mfp-ajax-cur',
        tError: '<a href="%url%">The content</a> could not be loaded.',
      },
      proto: {
        initAjax: function () {
          f.types.push(E),
            (b = f.st.ajax.cursor),
            c(w + '.' + E, e),
            c('BeforeChange.' + E, e)
        },
        getAjax: function (s) {
          b && d(document.body).addClass(b), f.updateStatus('loading')
          var t = d.extend(
            {
              url: s.src,
              success: function (t, e, i) {
                t = { data: t, xhr: i }
                p('ParseAjax', t),
                  f.appendContent(d(t.data), E),
                  (s.finished = !0),
                  n(),
                  f._setFocus(),
                  setTimeout(function () {
                    f.wrap.addClass(T)
                  }, 16),
                  f.updateStatus('ready'),
                  p('AjaxContentAdded')
              },
              error: function () {
                n(),
                  (s.finished = s.loadError = !0),
                  f.updateStatus(
                    'error',
                    f.st.ajax.tError.replace('%url%', s.src),
                  )
              },
            },
            f.st.ajax.settings,
          )
          return (f.req = d.ajax(t)), ''
        },
      },
    })
    var A
    d.magnificPopup.registerModule('image', {
      options: {
        markup:
          '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
        cursor: 'mfp-zoom-out-cur',
        titleSrc: 'title',
        verticalFit: !0,
        tError: '<a href="%url%">The image</a> could not be loaded.',
      },
      proto: {
        initImage: function () {
          var t = f.st.image,
            e = '.image'
          f.types.push('image'),
            c(x + e, function () {
              'image' === f.currItem.type &&
                t.cursor &&
                d(document.body).addClass(t.cursor)
            }),
            c(w + e, function () {
              t.cursor && d(document.body).removeClass(t.cursor),
                P.off('resize' + k)
            }),
            c('Resize' + e, f.resizeImage),
            f.isLowIE && c('AfterChange', f.resizeImage)
        },
        resizeImage: function () {
          var t,
            e = f.currItem
          e &&
            e.img &&
            f.st.image.verticalFit &&
            ((t = 0),
            f.isLowIE &&
              (t =
                parseInt(e.img.css('padding-top'), 10) +
                parseInt(e.img.css('padding-bottom'), 10)),
            e.img.css('max-height', f.wH - t))
        },
        _onImageHasSize: function (t) {
          t.img &&
            ((t.hasSize = !0),
            A && clearInterval(A),
            (t.isCheckingImgSize = !1),
            p('ImageHasSize', t),
            t.imgHidden) &&
            (f.content && f.content.removeClass('mfp-loading'),
            (t.imgHidden = !1))
        },
        findImageSize: function (e) {
          function i(t) {
            A && clearInterval(A),
              (A = setInterval(function () {
                0 < n.naturalWidth
                  ? f._onImageHasSize(e)
                  : (200 < s && clearInterval(A),
                    3 === ++s ? i(10) : 40 === s ? i(50) : 100 === s && i(500))
              }, t))
          }
          var s = 0,
            n = e.img[0]
          i(1)
        },
        getImage: function (t, e) {
          function i() {
            t &&
              (t.img[0].complete
                ? (t.img.off('.mfploader'),
                  t === f.currItem &&
                    (f._onImageHasSize(t), f.updateStatus('ready')),
                  (t.hasSize = !0),
                  (t.loaded = !0),
                  p('ImageLoadComplete'))
                : ++o < 200
                  ? setTimeout(i, 100)
                  : s())
          }
          function s() {
            t &&
              (t.img.off('.mfploader'),
              t === f.currItem &&
                (f._onImageHasSize(t),
                f.updateStatus('error', r.tError.replace('%url%', t.src))),
              (t.hasSize = !0),
              (t.loaded = !0),
              (t.loadError = !0))
          }
          var n,
            o = 0,
            r = f.st.image,
            a = e.find('.mfp-img')
          return (
            a.length &&
              (((n = document.createElement('img')).className = 'mfp-img'),
              t.el &&
                t.el.find('img').length &&
                (n.alt = t.el.find('img').attr('alt')),
              (t.img = d(n).on('load.mfploader', i).on('error.mfploader', s)),
              (n.src = t.src),
              a.is('img') && (t.img = t.img.clone()),
              0 < (n = t.img[0]).naturalWidth
                ? (t.hasSize = !0)
                : n.width || (t.hasSize = !1)),
            f._parseMarkup(
              e,
              {
                title: (function (t) {
                  if (t.data && void 0 !== t.data.title) return t.data.title
                  var e = f.st.image.titleSrc
                  if (e) {
                    if (d.isFunction(e)) return e.call(f, t)
                    if (t.el) return t.el.attr(e) || ''
                  }
                  return ''
                })(t),
                img_replaceWith: t.img,
              },
              t,
            ),
            f.resizeImage(),
            t.hasSize
              ? (A && clearInterval(A),
                t.loadError
                  ? (e.addClass('mfp-loading'),
                    f.updateStatus('error', r.tError.replace('%url%', t.src)))
                  : (e.removeClass('mfp-loading'), f.updateStatus('ready')))
              : (f.updateStatus('loading'),
                (t.loading = !0),
                t.hasSize ||
                  ((t.imgHidden = !0),
                  e.addClass('mfp-loading'),
                  f.findImageSize(t))),
            e
          )
        },
      },
    })
    function B(t) {
      var e
      f.currTemplate[$] &&
        (e = f.currTemplate[$].find('iframe')).length &&
        (t || (e[0].src = '//about:blank'), f.isIE8) &&
        e.css('display', t ? 'block' : 'none')
    }
    function M(t) {
      var e = f.items.length
      return e - 1 < t ? t - e : t < 0 ? e + t : t
    }
    function V(t, e, i) {
      return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
    }
    d.magnificPopup.registerModule('zoom', {
      options: {
        enabled: !1,
        easing: 'ease-in-out',
        duration: 300,
        opener: function (t) {
          return t.is('img') ? t : t.find('img')
        },
      },
      proto: {
        initZoom: function () {
          var t,
            e,
            i,
            s,
            n,
            o,
            r = f.st.zoom,
            a = '.zoom'
          r.enabled &&
            f.supportsTransition &&
            ((e = r.duration),
            (i = function (t) {
              var t = t
                  .clone()
                  .removeAttr('style')
                  .removeAttr('class')
                  .addClass('mfp-animated-image'),
                e = 'all ' + r.duration / 1e3 + 's ' + r.easing,
                i = {
                  position: 'fixed',
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  '-webkit-backface-visibility': 'hidden',
                },
                s = 'transition'
              return (
                (i['-webkit-' + s] = i['-moz-' + s] = i['-o-' + s] = i[s] = e),
                t.css(i),
                t
              )
            }),
            (s = function () {
              f.content.css('visibility', 'visible')
            }),
            c('BuildControls' + a, function () {
              f._allowZoom() &&
                (clearTimeout(n),
                f.content.css('visibility', 'hidden'),
                (t = f._getItemToZoom())
                  ? ((o = i(t)).css(f._getOffset()),
                    f.wrap.append(o),
                    (n = setTimeout(function () {
                      o.css(f._getOffset(!0)),
                        (n = setTimeout(function () {
                          s(),
                            setTimeout(function () {
                              o.remove(),
                                (t = o = null),
                                p('ZoomAnimationEnded')
                            }, 16)
                        }, e))
                    }, 16)))
                  : s())
            }),
            c(L + a, function () {
              if (f._allowZoom()) {
                if ((clearTimeout(n), (f.st.removalDelay = e), !t)) {
                  if (!(t = f._getItemToZoom())) return
                  o = i(t)
                }
                o.css(f._getOffset(!0)),
                  f.wrap.append(o),
                  f.content.css('visibility', 'hidden'),
                  setTimeout(function () {
                    o.css(f._getOffset())
                  }, 16)
              }
            }),
            c(w + a, function () {
              f._allowZoom() && (s(), o && o.remove(), (t = null))
            }))
        },
        _allowZoom: function () {
          return 'image' === f.currItem.type
        },
        _getItemToZoom: function () {
          return !!f.currItem.hasSize && f.currItem.img
        },
        _getOffset: function (t) {
          var t = t
              ? f.currItem.img
              : f.st.zoom.opener(f.currItem.el || f.currItem),
            e = t.offset(),
            i = parseInt(t.css('padding-top'), 10),
            s = parseInt(t.css('padding-bottom'), 10),
            t =
              ((e.top -= d(window).scrollTop() - i),
              {
                width: t.width(),
                height: (S ? t.innerHeight() : t[0].offsetHeight) - s - i,
              })
          return (
            (I =
              void 0 === I
                ? void 0 !== document.createElement('p').style.MozTransform
                : I)
              ? (t['-moz-transform'] = t.transform =
                  'translate(' + e.left + 'px,' + e.top + 'px)')
              : ((t.left = e.left), (t.top = e.top)),
            t
          )
        },
      },
    })
    var I,
      $ = 'iframe',
      z =
        (d.magnificPopup.registerModule($, {
          options: {
            markup:
              '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: 'iframe_src',
            patterns: {
              youtube: {
                index: 'youtube.com',
                id: 'v=',
                src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0&loop=1',
              },
              vimeo: {
                index: 'vimeo.com/',
                id: '/',
                src: '//player.vimeo.com/video/%id%?autoplay=1&rel=0&loop=1',
              },
              gmaps: { index: '//maps.google.', src: '%id%&output=embed' },
            },
          },
          proto: {
            initIframe: function () {
              f.types.push($),
                c('BeforeChange', function (t, e, i) {
                  e !== i && (e === $ ? B() : i === $ && B(!0))
                }),
                c(w + '.' + $, function () {
                  B()
                })
            },
            getIframe: function (t, e) {
              var i = t.src,
                s = f.st.iframe,
                n =
                  (d.each(s.patterns, function () {
                    if (-1 < i.indexOf(this.index))
                      return (
                        this.id &&
                          (i =
                            'string' == typeof this.id
                              ? i.substr(
                                  i.lastIndexOf(this.id) + this.id.length,
                                  i.length,
                                )
                              : this.id.call(this, i)),
                        (i = this.src.replace('%id%', i)),
                        !1
                      )
                  }),
                  {})
              return (
                s.srcAction && (n[s.srcAction] = i),
                f._parseMarkup(e, n, t),
                f.updateStatus('ready'),
                e
              )
            },
          },
        }),
        d.magnificPopup.registerModule('gallery', {
          options: {
            enabled: !1,
            arrowMarkup:
              '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: 'Previous (Left arrow key)',
            tNext: 'Next (Right arrow key)',
            tCounter: '%curr% of %total%',
          },
          proto: {
            initGallery: function () {
              var o = f.st.gallery,
                t = '.mfp-gallery'
              if (((f.direction = !0), !o || !o.enabled)) return !1
              ;(g += ' mfp-gallery'),
                c(x + t, function () {
                  o.navigateByImgClick &&
                    f.wrap.on('click' + t, '.mfp-img', function () {
                      if (1 < f.items.length) return f.next(), !1
                    }),
                    m.on('keydown' + t, function (t) {
                      37 === t.keyCode ? f.prev() : 39 === t.keyCode && f.next()
                    })
                }),
                c('UpdateStatus' + t, function (t, e) {
                  e.text &&
                    (e.text = V(e.text, f.currItem.index, f.items.length))
                }),
                c(_ + t, function (t, e, i, s) {
                  var n = f.items.length
                  i.counter = 1 < n ? V(o.tCounter, s.index, n) : ''
                }),
                c('BuildControls' + t, function () {
                  var t, e
                  1 < f.items.length &&
                    o.arrows &&
                    !f.arrowLeft &&
                    ((e = o.arrowMarkup),
                    (t = f.arrowLeft =
                      d(
                        e
                          .replace(/%title%/gi, o.tPrev)
                          .replace(/%dir%/gi, 'left'),
                      ).addClass(C)),
                    (e = f.arrowRight =
                      d(
                        e
                          .replace(/%title%/gi, o.tNext)
                          .replace(/%dir%/gi, 'right'),
                      ).addClass(C)),
                    t.click(function () {
                      f.prev()
                    }),
                    e.click(function () {
                      f.next()
                    }),
                    f.container.append(t.add(e)))
                }),
                c('Change' + t, function () {
                  f._preloadTimeout && clearTimeout(f._preloadTimeout),
                    (f._preloadTimeout = setTimeout(function () {
                      f.preloadNearbyImages(), (f._preloadTimeout = null)
                    }, 16))
                }),
                c(w + t, function () {
                  m.off(t),
                    f.wrap.off('click' + t),
                    (f.arrowRight = f.arrowLeft = null)
                })
            },
            next: function () {
              ;(f.direction = !0),
                (f.index = M(f.index + 1)),
                f.updateItemHTML()
            },
            prev: function () {
              ;(f.direction = !1),
                (f.index = M(f.index - 1)),
                f.updateItemHTML()
            },
            goTo: function (t) {
              ;(f.direction = t >= f.index), (f.index = t), f.updateItemHTML()
            },
            preloadNearbyImages: function () {
              for (
                var t = f.st.gallery.preload,
                  e = Math.min(t[0], f.items.length),
                  i = Math.min(t[1], f.items.length),
                  s = 1;
                s <= (f.direction ? i : e);
                s++
              )
                f._preloadItem(f.index + s)
              for (s = 1; s <= (f.direction ? e : i); s++)
                f._preloadItem(f.index - s)
            },
            _preloadItem: function (t) {
              var e
              ;(t = M(t)),
                f.items[t].preloaded ||
                  ((e = f.items[t]).parsed || (e = f.parseEl(t)),
                  p('LazyLoad', e),
                  'image' === e.type &&
                    (e.img = d('<img class="mfp-img" />')
                      .on('load.mfploader', function () {
                        e.hasSize = !0
                      })
                      .on('error.mfploader', function () {
                        ;(e.hasSize = !0),
                          (e.loadError = !0),
                          p('LazyLoadError', e)
                      })
                      .attr('src', e.src)),
                  (e.preloaded = !0))
            },
          },
        }),
        'retina')
    d.magnificPopup.registerModule(z, {
      options: {
        replaceSrc: function (t) {
          return t.src.replace(/\.\w+$/, function (t) {
            return '@2x' + t
          })
        },
        ratio: 1,
      },
      proto: {
        initRetina: function () {
          var i, s
          1 < window.devicePixelRatio &&
            ((i = f.st.retina), (s = i.ratio), 1 < (s = isNaN(s) ? s() : s)) &&
            (c('ImageHasSize.' + z, function (t, e) {
              e.img.css({
                'max-width': e.img[0].naturalWidth / s,
                width: '100%',
              })
            }),
            c('ElementParse.' + z, function (t, e) {
              e.src = i.replaceSrc(e, s)
            }))
        },
      },
    }),
      o()
  }),
  (function (b) {
    var s = (window.SelectBox = function (t, e) {
      if (t instanceof jQuery) {
        if (!(0 < t.length)) return
        t = t[0]
      }
      return (
        (this.typeTimer = null),
        (this.typeSearch = ''),
        (this.isMac = navigator.platform.match(/mac/i)),
        (e = 'object' == typeof e ? e : {}),
        (this.selectElement = t),
        !(
          !e.mobile &&
          navigator.userAgent.match(/iPad|iPhone|Android|IEMobile|BlackBerry/i)
        ) &&
          'select' === t.tagName.toLowerCase() &&
          void this.init(e)
      )
    })
    ;(s.prototype.version = '1.2.0'),
      (s.prototype.init = function (e) {
        var t = b(this.selectElement)
        if (t.data('selectBox-control')) return !1
        var i,
          s = b('<a class="selectBox" />'),
          n = t.attr('multiple') || 1 < parseInt(t.attr('size')),
          o = e || {},
          r = parseInt(t.prop('tabindex')) || 0,
          a = this
        s
          .width(t.outerWidth())
          .addClass(t.attr('class'))
          .attr('title', t.attr('title') || '')
          .attr('tabindex', r)
          .css('display', 'inline-block')
          .bind('focus.selectBox', function () {
            this !== document.activeElement &&
              document.body !== document.activeElement &&
              b(document.activeElement).blur(),
              s.hasClass('selectBox-active') ||
                (s.addClass('selectBox-active'), t.trigger('focus'))
          })
          .bind('blur.selectBox', function () {
            s.hasClass('selectBox-active') &&
              (s.removeClass('selectBox-active'), t.trigger('blur'))
          }),
          b(window).data('selectBox-bindings') ||
            b(window)
              .data('selectBox-bindings', !0)
              .bind(
                'scroll.selectBox',
                o.hideOnWindowScroll ? this.hideMenus : b.noop,
              )
              .bind('resize.selectBox', this.hideMenus),
          t.attr('disabled') && s.addClass('selectBox-disabled'),
          t.bind('click.selectBox', function (t) {
            s.focus(), t.preventDefault()
          }),
          n
            ? ((e = this.getOptions('inline')),
              s
                .append(e)
                .data('selectBox-options', e)
                .addClass('selectBox-inline selectBox-menuShowing')
                .bind('keydown.selectBox', function (t) {
                  a.handleKeyDown(t)
                })
                .bind('keypress.selectBox', function (t) {
                  a.handleKeyPress(t)
                })
                .bind('mousedown.selectBox', function (t) {
                  1 !== t.which ||
                    (b(t.target).is('A.selectBox-inline') && t.preventDefault(),
                    s.hasClass('selectBox-focus')) ||
                    s.focus()
                })
                .insertAfter(t),
              t[0].style.height ||
                ((r = t.attr('size') ? parseInt(t.attr('size')) : 5),
                (n = s
                  .clone()
                  .removeAttr('id')
                  .css({ position: 'absolute', top: '-9999em' })
                  .show()
                  .appendTo('body'))
                  .find('.selectBox-options')
                  .html('<li><a> </a></li>'),
                (i = parseInt(
                  n
                    .find('.selectBox-options A:first')
                    .html('&nbsp;')
                    .outerHeight(),
                )),
                n.remove(),
                s.height(i * r)))
            : ((n = b('<span class="selectBox-label" />')),
              (i = b('<span class="selectBox-arrow" />')),
              n.attr('class', this.getLabelClass()).html(this.getLabelHtml()),
              (e = this.getOptions('dropdown')).appendTo('BODY'),
              s
                .data('selectBox-options', e)
                .addClass('selectBox-dropdown')
                .append(n)
                .append(i)
                .bind('mousedown.selectBox', function (t) {
                  1 === t.which &&
                    (s.hasClass('selectBox-menuShowing')
                      ? a.hideMenus()
                      : (t.stopPropagation(),
                        e
                          .data('selectBox-down-at-x', t.screenX)
                          .data('selectBox-down-at-y', t.screenY),
                        a.showMenu()))
                })
                .bind('keydown.selectBox', function (t) {
                  a.handleKeyDown(t)
                })
                .bind('keypress.selectBox', function (t) {
                  a.handleKeyPress(t)
                })
                .bind('open.selectBox', function (t, e) {
                  ;(e && !0 === e._selectBox) || a.showMenu()
                })
                .bind('close.selectBox', function (t, e) {
                  ;(e && !0 === e._selectBox) || a.hideMenus()
                })
                .insertAfter(t),
              (r =
                s.width() -
                i.outerWidth() -
                (parseInt(n.css('paddingLeft')) || 0) -
                (parseInt(n.css('paddingRight')) || 0)),
              n.width(r)),
          this.disableSelection(s),
          t
            .addClass('selectBox')
            .data('selectBox-control', s)
            .data('selectBox-settings', o)
            .hide()
      }),
      (s.prototype.getOptions = function (t) {
        var e = b(this.selectElement),
          i = this,
          s = function (t, e) {
            return (
              t.children('OPTION, OPTGROUP').each(function () {
                var t
                b(this).is('OPTION')
                  ? 0 < b(this).length
                    ? i.generateOptions(b(this), e)
                    : e.append('<li> </li>')
                  : ((t = b('<li class="selectBox-optgroup" />')).text(
                      b(this).attr('label'),
                    ),
                    e.append(t),
                    (e = s(b(this), e)))
              }),
              e
            )
          }
        switch (t) {
          case 'inline':
            return (
              (n = b('<ul class="selectBox-options" />')),
              (n = s(e, n))
                .find('A')
                .bind('mouseover.selectBox', function (t) {
                  i.addHover(b(this).parent())
                })
                .bind('mouseout.selectBox', function (t) {
                  i.removeHover(b(this).parent())
                })
                .bind('mousedown.selectBox', function (t) {
                  1 !== t.which ||
                    (t.preventDefault(),
                    e.selectBox('control').hasClass('selectBox-active')) ||
                    e.selectBox('control').focus()
                })
                .bind('mouseup.selectBox', function (t) {
                  1 === t.which &&
                    (i.hideMenus(), i.selectOption(b(this).parent(), t))
                }),
              this.disableSelection(n),
              n
            )
          case 'dropdown':
            var n = b(
              '<ul class="selectBox-dropdown-menu selectBox-options" />',
            )
            if (
              ((n = s(e, n))
                .data('selectBox-select', e)
                .css('display', 'none')
                .appendTo('BODY')
                .find('A')
                .bind('mousedown.selectBox', function (t) {
                  1 === t.which &&
                    (t.preventDefault(),
                    t.screenX === n.data('selectBox-down-at-x')) &&
                    t.screenY === n.data('selectBox-down-at-y') &&
                    (n
                      .removeData('selectBox-down-at-x')
                      .removeData('selectBox-down-at-y'),
                    /android/i.test(navigator.userAgent.toLowerCase()) &&
                      /chrome/i.test(navigator.userAgent.toLowerCase()) &&
                      i.selectOption(b(this).parent()),
                    i.hideMenus())
                })
                .bind('mouseup.selectBox', function (t) {
                  1 !== t.which ||
                    (t.screenX === n.data('selectBox-down-at-x') &&
                      t.screenY === n.data('selectBox-down-at-y')) ||
                    (n
                      .removeData('selectBox-down-at-x')
                      .removeData('selectBox-down-at-y'),
                    i.selectOption(b(this).parent()),
                    i.hideMenus())
                })
                .bind('mouseover.selectBox', function (t) {
                  i.addHover(b(this).parent())
                })
                .bind('mouseout.selectBox', function (t) {
                  i.removeHover(b(this).parent())
                }),
              '' !== (o = e.attr('class') || ''))
            )
              for (var o = o.split(' '), r = 0; r < o.length; r++)
                n.addClass(o[r] + '-selectBox-dropdown-menu')
            return this.disableSelection(n), n
        }
      }),
      (s.prototype.getLabelClass = function () {
        return (
          'selectBox-label ' +
          (b(this.selectElement).find('OPTION:selected').attr('class') || '')
        ).replace(/\s+$/, '')
      }),
      (s.prototype.getLabelHtml = function () {
        var t = b(this.selectElement).find('OPTION:selected'),
          t = t.data('icon')
            ? '<i class="fa fa-' +
              t.data('icon') +
              ' fa-fw fa-lg"></i> ' +
              t.text()
            : t.text()
        return t || ' '
      }),
      (s.prototype.setLabel = function () {
        var t = b(this.selectElement).data('selectBox-control')
        t &&
          t
            .find('.selectBox-label')
            .attr('class', this.getLabelClass())
            .html(this.getLabelHtml())
      }),
      (s.prototype.destroy = function () {
        var t = b(this.selectElement),
          e = t.data('selectBox-control')
        e &&
          (e.data('selectBox-options').remove(),
          e.remove(),
          t
            .removeClass('selectBox')
            .removeData('selectBox-control')
            .data('selectBox-control', null)
            .removeData('selectBox-settings')
            .data('selectBox-settings', null)
            .show())
      }),
      (s.prototype.refresh = function () {
        var t,
          e = b(this.selectElement).data('selectBox-control'),
          i = e.hasClass('selectBox-dropdown') ? 'dropdown' : 'inline'
        switch (
          (e.data('selectBox-options').remove(),
          (t = this.getOptions(i)),
          e.data('selectBox-options', t),
          i)
        ) {
          case 'inline':
            e.append(t)
            break
          case 'dropdown':
            this.setLabel(), b('BODY').append(t)
        }
        'dropdown' == i &&
          e.hasClass('selectBox-menuShowing') &&
          this.showMenu()
      }),
      (s.prototype.showMenu = function () {
        var e = this,
          t = b(this.selectElement),
          i = t.data('selectBox-control'),
          s = t.data('selectBox-settings'),
          n = i.data('selectBox-options')
        if (i.hasClass('selectBox-disabled')) return !1
        this.hideMenus()
        var o,
          r = parseInt(i.css('borderBottomWidth')) || 0,
          a = parseInt(i.css('borderTopWidth')) || 0,
          l = i.offset(),
          d = s.topPositionCorrelation || 0,
          c = s.bottomPositionCorrelation || 0,
          u = n.outerHeight(),
          p = i.outerHeight(),
          h = parseInt(n.css('max-height')),
          f = b(window).scrollTop(),
          f = l.top - f,
          m = b(window).height() - (f + p),
          g = m < f && (null == s.keepInViewport || s.keepInViewport),
          v = i.innerWidth() >= n.innerWidth() ? i.innerWidth() + 'px' : 'auto',
          u = g ? l.top - u + a + d : l.top + p - r - c
        if (
          (f < h &&
            m < h &&
            (g
              ? (n.css({ 'max-height': h - (o = h - (f - 5)) + 'px' }),
                (u += o))
              : n.css({ 'max-height': h - (o = h - (m - 5)) + 'px' })),
          n.data('posTop', g),
          n
            .width(v)
            .css({ top: u, left: i.offset().left })
            .addClass(
              'selectBox-options selectBox-options-' + (g ? 'top' : 'bottom'),
            ),
          s.styleClass && n.addClass(s.styleClass),
          t.triggerHandler('beforeopen'))
        )
          return !1
        function y() {
          t.triggerHandler('open', { _selectBox: !0 })
        }
        switch (s.menuTransition) {
          case 'fade':
            n.fadeIn(s.menuSpeed, y)
            break
          case 'slide':
            n.slideDown(s.menuSpeed, y)
            break
          default:
            n.show(s.menuSpeed, y)
        }
        s.menuSpeed || y()
        a = n.find('.selectBox-selected:first')
        this.keepOptionInView(a, !0),
          this.addHover(a),
          i.addClass(
            'selectBox-menuShowing selectBox-menuShowing-' +
              (g ? 'top' : 'bottom'),
          ),
          b(document).bind('mousedown.selectBox', function (t) {
            1 !== t.which ||
              b(t.target).parents().andSelf().hasClass('selectBox-options') ||
              e.hideMenus()
          })
      }),
      (s.prototype.hideMenus = function () {
        0 !== b('.selectBox-dropdown-menu:visible').length &&
          (b(document).unbind('mousedown.selectBox'),
          b('.selectBox-dropdown-menu').each(function () {
            var t = b(this),
              e = t.data('selectBox-select'),
              i = e.data('selectBox-control'),
              s = e.data('selectBox-settings'),
              n = t.data('posTop')
            if (e.triggerHandler('beforeclose')) return !1
            function o() {
              e.triggerHandler('close', { _selectBox: !0 })
            }
            if (s) {
              switch (s.menuTransition) {
                case 'fade':
                  t.fadeOut(s.menuSpeed, o)
                  break
                case 'slide':
                  t.slideUp(s.menuSpeed, o)
                  break
                default:
                  t.hide(s.menuSpeed, o)
              }
              s.menuSpeed || o(),
                i.removeClass(
                  'selectBox-menuShowing selectBox-menuShowing-' +
                    (n ? 'top' : 'bottom'),
                )
            } else
              b(this).hide(),
                b(this).triggerHandler('close', { _selectBox: !0 }),
                b(this).removeClass(
                  'selectBox-menuShowing selectBox-menuShowing-' +
                    (n ? 'top' : 'bottom'),
                )
            t.css('max-height', ''),
              t.removeClass('selectBox-options-' + (n ? 'top' : 'bottom')),
              t.data('posTop', !1)
          }))
      }),
      (s.prototype.selectOption = function (t, e) {
        var i,
          s = b(this.selectElement),
          n = ((t = b(t)), s.data('selectBox-control'))
        s.data('selectBox-settings')
        if (n.hasClass('selectBox-disabled')) return !1
        if (0 === t.length || t.hasClass('selectBox-disabled')) return !1
        s.attr('multiple')
          ? e.shiftKey && n.data('selectBox-last-selected')
            ? (t.toggleClass('selectBox-selected'),
              (i = (i =
                t.index() > n.data('selectBox-last-selected').index()
                  ? t
                      .siblings()
                      .slice(
                        n.data('selectBox-last-selected').index(),
                        t.index(),
                      )
                  : t
                      .siblings()
                      .slice(
                        t.index(),
                        n.data('selectBox-last-selected').index(),
                      )).not('.selectBox-optgroup, .selectBox-disabled')),
              t.hasClass('selectBox-selected')
                ? i.addClass('selectBox-selected')
                : i.removeClass('selectBox-selected'))
            : (this.isMac && e.metaKey) || (!this.isMac && e.ctrlKey)
              ? t.toggleClass('selectBox-selected')
              : (t.siblings().removeClass('selectBox-selected'),
                t.addClass('selectBox-selected'))
          : (t.siblings().removeClass('selectBox-selected'),
            t.addClass('selectBox-selected')),
          n.hasClass('selectBox-dropdown') &&
            n.find('.selectBox-label').html(t.html())
        var o = 0,
          r = []
        return (
          s.attr('multiple')
            ? n.find('.selectBox-selected A').each(function () {
                r[o++] = b(this).attr('rel')
              })
            : (r = t.find('A').attr('rel')),
          n.data('selectBox-last-selected', t),
          s.val() !== r && (s.val(r), this.setLabel(), s.trigger('change')),
          !0
        )
      }),
      (s.prototype.addHover = function (t) {
        ;(t = b(t)),
          b(this.selectElement)
            .data('selectBox-control')
            .data('selectBox-options')
            .find('.selectBox-hover')
            .removeClass('selectBox-hover'),
          t.addClass('selectBox-hover')
      }),
      (s.prototype.getSelectElement = function () {
        return this.selectElement
      }),
      (s.prototype.removeHover = function (t) {
        ;(t = b(t)),
          b(this.selectElement)
            .data('selectBox-control')
            .data('selectBox-options')
            .find('.selectBox-hover')
            .removeClass('selectBox-hover')
      }),
      (s.prototype.keepOptionInView = function (t, e) {
        var i, s, n
        t &&
          0 !== t.length &&
          ((s = (i = b(this.selectElement).data('selectBox-control')).data(
            'selectBox-options',
          )),
          (i = i.hasClass('selectBox-dropdown') ? s : s.parent()),
          (s = parseInt(t.offset().top - i.position().top)),
          (n = parseInt(s + t.outerHeight())),
          e
            ? i.scrollTop(
                t.offset().top -
                  i.offset().top +
                  i.scrollTop() -
                  i.height() / 2,
              )
            : (s < 0 &&
                i.scrollTop(t.offset().top - i.offset().top + i.scrollTop()),
              n > i.height() &&
                i.scrollTop(
                  t.offset().top +
                    t.outerHeight() -
                    i.offset().top +
                    i.scrollTop() -
                    i.height(),
                )))
      }),
      (s.prototype.handleKeyDown = function (t) {
        var e = b(this.selectElement),
          i = e.data('selectBox-control'),
          s = i.data('selectBox-options'),
          n = e.data('selectBox-settings'),
          o = 0,
          r = 0
        if (!i.hasClass('selectBox-disabled'))
          switch (t.keyCode) {
            case 8:
              t.preventDefault(), (this.typeSearch = '')
              break
            case 9:
            case 27:
              this.hideMenus(), this.removeHover()
              break
            case 13:
              i.hasClass('selectBox-menuShowing')
                ? (this.selectOption(s.find('LI.selectBox-hover:first'), t),
                  i.hasClass('selectBox-dropdown') && this.hideMenus())
                : this.showMenu()
              break
            case 38:
            case 37:
              if ((t.preventDefault(), i.hasClass('selectBox-menuShowing'))) {
                for (
                  var a = s.find('.selectBox-hover').prev('LI'),
                    o = s.find('LI:not(.selectBox-optgroup)').length,
                    r = 0;
                  (0 === a.length ||
                    a.hasClass('selectBox-disabled') ||
                    a.hasClass('selectBox-optgroup')) &&
                  (0 === (a = a.prev('LI')).length &&
                    (a = n.loopOptions
                      ? s.find('LI:last')
                      : s.find('LI:first')),
                  !(++r >= o));

                );
                this.addHover(a),
                  this.selectOption(a, t),
                  this.keepOptionInView(a)
              } else this.showMenu()
              break
            case 40:
            case 39:
              if ((t.preventDefault(), i.hasClass('selectBox-menuShowing'))) {
                var l = s.find('.selectBox-hover').next('LI')
                for (
                  o = s.find('LI:not(.selectBox-optgroup)').length, r = 0;
                  (0 === l.length ||
                    l.hasClass('selectBox-disabled') ||
                    l.hasClass('selectBox-optgroup')) &&
                  (0 === (l = l.next('LI')).length &&
                    (l = n.loopOptions
                      ? s.find('LI:first')
                      : s.find('LI:last')),
                  !(++r >= o));

                );
                this.addHover(l),
                  this.selectOption(l, t),
                  this.keepOptionInView(l)
              } else this.showMenu()
          }
      }),
      (s.prototype.handleKeyPress = function (t) {
        var e = b(this.selectElement).data('selectBox-control'),
          i = e.data('selectBox-options'),
          s = this
        if (!e.hasClass('selectBox-disabled'))
          switch (t.keyCode) {
            case 9:
            case 27:
            case 13:
            case 38:
            case 37:
            case 40:
            case 39:
              break
            default:
              e.hasClass('selectBox-menuShowing') || this.showMenu(),
                t.preventDefault(),
                clearTimeout(this.typeTimer),
                (this.typeSearch += String.fromCharCode(
                  t.charCode || t.keyCode,
                )),
                i.find('A').each(function () {
                  if (
                    b(this)
                      .text()
                      .substr(0, s.typeSearch.length)
                      .toLowerCase() === s.typeSearch.toLowerCase()
                  )
                    return (
                      s.addHover(b(this).parent()),
                      s.selectOption(b(this).parent(), t),
                      s.keepOptionInView(b(this).parent()),
                      !1
                    )
                }),
                (this.typeTimer = setTimeout(function () {
                  s.typeSearch = ''
                }, 1e3))
          }
      }),
      (s.prototype.enable = function () {
        var t = b(this.selectElement),
          t = (t.prop('disabled', !1), t.data('selectBox-control'))
        t && t.removeClass('selectBox-disabled')
      }),
      (s.prototype.disable = function () {
        var t = b(this.selectElement),
          t = (t.prop('disabled', !0), t.data('selectBox-control'))
        t && t.addClass('selectBox-disabled')
      }),
      (s.prototype.setValue = function (e) {
        var t,
          i = b(this.selectElement),
          s =
            (i.val(e),
            null === (e = i.val()) &&
              ((e = i.children().first().val()), i.val(e)),
            i.data('selectBox-control'))
        s &&
          ((t = i.data('selectBox-settings')),
          (s = s.data('selectBox-options')),
          this.setLabel(),
          s.find('.selectBox-selected').removeClass('selectBox-selected'),
          s.find('A').each(function () {
            if ('object' == typeof e)
              for (var t = 0; t < e.length; t++)
                b(this).attr('rel') == e[t] &&
                  b(this).parent().addClass('selectBox-selected')
            else
              b(this).attr('rel') == e &&
                b(this).parent().addClass('selectBox-selected')
          }),
          t.change) &&
          t.change.call(i)
      }),
      (s.prototype.disableSelection = function (t) {
        b(t)
          .css('MozUserSelect', 'none')
          .bind('selectstart', function (t) {
            t.preventDefault()
          })
      }),
      (s.prototype.generateOptions = function (t, e) {
        var i = b('<li />'),
          s = b('<a />')
        i.addClass(t.attr('class')),
          i.data(t.data()),
          t.data('icon')
            ? s
                .attr('rel', t.val())
                .html(
                  '<i class="fa fa-' +
                    t.data('icon') +
                    ' fa-fw fa-lg"></i> ' +
                    t.text(),
                )
            : s.attr('rel', t.val()).text(t.text()),
          i.append(s),
          t.attr('disabled') && i.addClass('selectBox-disabled'),
          t.attr('selected') && i.addClass('selectBox-selected'),
          e.append(i)
      }),
      b.extend(b.fn, {
        setOptions: function (t) {
          var e = b(this),
            i = e.data('selectBox-control')
          switch (typeof t) {
            case 'string':
              e.html(t)
              break
            case 'object':
              for (var s in (e.html(''), t))
                if (null !== t[s])
                  if ('object' == typeof t[s]) {
                    var n,
                      o = b('<optgroup label="' + s + '" />')
                    for (n in t[s])
                      o.append(
                        '<option value="' + n + '">' + t[s][n] + '</option>',
                      )
                    e.append(o)
                  } else {
                    var r = b('<option value="' + s + '">' + t[s] + '</option>')
                    e.append(r)
                  }
          }
          i && b(this).selectBox('refresh')
        },
        selectBox: function (i, t) {
          var e
          switch (i) {
            case 'control':
              return b(this).data('selectBox-control')
            case 'settings':
              if (!t) return b(this).data('selectBox-settings')
              b(this).each(function () {
                b(this).data(
                  'selectBox-settings',
                  b.extend(!0, b(this).data('selectBox-settings'), t),
                )
              })
              break
            case 'options':
              if (void 0 === t)
                return b(this)
                  .data('selectBox-control')
                  .data('selectBox-options')
              b(this).each(function () {
                b(this).setOptions(t)
              })
              break
            case 'value':
              if (void 0 === t) return b(this).val()
              b(this).each(function () {
                ;(e = b(this).data('selectBox')) && e.setValue(t)
              })
              break
            case 'refresh':
              b(this).each(function () {
                ;(e = b(this).data('selectBox')) && e.refresh()
              })
              break
            case 'enable':
              b(this).each(function () {
                ;(e = b(this).data('selectBox')) && e.enable(this)
              })
              break
            case 'disable':
              b(this).each(function () {
                ;(e = b(this).data('selectBox')) && e.disable()
              })
              break
            case 'destroy':
              b(this).each(function () {
                ;(e = b(this).data('selectBox')) &&
                  (e.destroy(), b(this).data('selectBox', null))
              })
              break
            case 'instance':
              return b(this).data('selectBox')
            default:
              b(this).each(function (t, e) {
                b(e).data('selectBox') || b(e).data('selectBox', new s(e, i))
              })
          }
          return b(this)
        },
      })
  })(jQuery),
  (function (t, e) {
    'object' == typeof exports && 'object' == typeof module
      ? (module.exports = e())
      : 'function' == typeof define && define.amd
        ? define('simpleParallax', [], e)
        : 'object' == typeof exports
          ? (exports.simpleParallax = e())
          : (t.simpleParallax = e())
  })(window, function () {
    return (
      (i = [
        function (t, e, i) {
          'use strict'
          i.r(e),
            i.d(e, 'default', function () {
              return w
            })
          function s(t, e) {
            for (var i = 0; i < e.length; i++) {
              var s = e[i]
              ;(s.enumerable = s.enumerable || !1),
                (s.configurable = !0),
                'value' in s && (s.writable = !0),
                Object.defineProperty(t, s.key, s)
            }
          }
          function n(t) {
            return NodeList.prototype.isPrototypeOf(t) ||
              HTMLCollection.prototype.isPrototypeOf(t)
              ? Array.from(t)
              : 'string' == typeof t || t instanceof String
                ? document.querySelectorAll(t)
                : [t]
          }
          s(a.prototype, [
            {
              key: 'setViewportTop',
              value: function (t) {
                return (
                  (this.positions.top = t ? t.scrollTop : window.pageYOffset),
                  this.positions
                )
              },
            },
            {
              key: 'setViewportBottom',
              value: function () {
                return (
                  (this.positions.bottom =
                    this.positions.top + this.positions.height),
                  this.positions
                )
              },
            },
            {
              key: 'setViewportAll',
              value: function (t) {
                return (
                  (this.positions.top = t ? t.scrollTop : window.pageYOffset),
                  (this.positions.height = (
                    t || document.documentElement
                  ).clientHeight),
                  (this.positions.bottom =
                    this.positions.top + this.positions.height),
                  this.positions
                )
              },
            },
          ])
          var o = new a(),
            r = (function () {
              for (
                var t,
                  e =
                    'transform webkitTransform mozTransform oTransform msTransform'.split(
                      ' ',
                    ),
                  i = 0;
                void 0 === t;

              )
                (t =
                  void 0 !== document.createElement('div').style[e[i]]
                    ? e[i]
                    : void 0),
                  (i += 1)
              return t
            })()
          function a() {
            if (!(this instanceof a))
              throw new TypeError('Cannot call a class as a function')
            this.positions = { top: 0, bottom: 0, height: 0 }
          }
          function l(t, e) {
            ;(null == e || e > t.length) && (e = t.length)
            for (var i = 0, s = new Array(e); i < e; i++) s[i] = t[i]
            return s
          }
          function d(t, e) {
            for (var i = 0; i < e.length; i++) {
              var s = e[i]
              ;(s.enumerable = s.enumerable || !1),
                (s.configurable = !0),
                'value' in s && (s.writable = !0),
                Object.defineProperty(t, s.key, s)
            }
          }
          d(u.prototype, [
            {
              key: 'init',
              value: function (t) {
                var e = this
                this.isInit ||
                  (t && (this.rangeMax = null),
                  this.element.closest('.simpleParallax')) ||
                  (!1 === this.settings.overflow &&
                    this.wrapElement(this.element),
                  this.setTransformCSS(),
                  this.getElementOffset(),
                  this.intersectionObserver(),
                  this.getTranslateValue(),
                  this.animate(),
                  0 < this.settings.delay &&
                    setTimeout(function () {
                      e.setTransitionCSS()
                    }, 10),
                  (this.isInit = !0))
              },
            },
            {
              key: 'wrapElement',
              value: function () {
                var t =
                    this.settings.customWrapper &&
                    this.element.closest(this.settings.customWrapper),
                  e = this.element.closest('picture') || this.element,
                  i = document.createElement('div')
                ;(i = t
                  ? this.element.closest(this.settings.customWrapper)
                  : i).classList.add('simpleParallax'),
                  (i.style.overflow = 'hidden'),
                  t || (e.parentNode.insertBefore(i, e), i.appendChild(e)),
                  (this.elementContainer = i)
              },
            },
            {
              key: 'unWrapElement',
              value: function () {
                var t = this.elementContainer
                this.settings.customWrapper &&
                this.element.closest(this.settings.customWrapper)
                  ? (t.classList.remove('simpleParallax'),
                    (t.style.overflow = ''))
                  : t.replaceWith.apply(
                      t,
                      (function (t) {
                        if (Array.isArray(t)) return l(t)
                      })((t = t.childNodes)) ||
                        (function (t) {
                          if (
                            'undefined' != typeof Symbol &&
                            Symbol.iterator in Object(t)
                          )
                            return Array.from(t)
                        })(t) ||
                        (function (t) {
                          var e
                          if (t)
                            return 'string' == typeof t
                              ? l(t, void 0)
                              : 'Map' ===
                                    (e =
                                      'Object' ===
                                        (e = Object.prototype.toString
                                          .call(t)
                                          .slice(8, -1)) && t.constructor
                                        ? t.constructor.name
                                        : e) || 'Set' === e
                                ? Array.from(t)
                                : 'Arguments' === e ||
                                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                      e,
                                    )
                                  ? l(t, void 0)
                                  : void 0
                        })(t) ||
                        (function () {
                          throw new TypeError(
                            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                          )
                        })(),
                    )
              },
            },
            {
              key: 'setTransformCSS',
              value: function () {
                !1 === this.settings.overflow &&
                  (this.element.style[r] = 'scale('.concat(
                    this.settings.scale,
                    ')',
                  )),
                  (this.element.style.willChange = 'transform')
              },
            },
            {
              key: 'setTransitionCSS',
              value: function () {
                this.element.style.transition = 'transform '
                  .concat(this.settings.delay, 's ')
                  .concat(this.settings.transition)
              },
            },
            {
              key: 'unSetStyle',
              value: function () {
                ;(this.element.style.willChange = ''),
                  (this.element.style[r] = ''),
                  (this.element.style.transition = '')
              },
            },
            {
              key: 'getElementOffset',
              value: function () {
                var t,
                  e = this.elementContainer.getBoundingClientRect()
                ;(this.elementHeight = e.height),
                  (this.elementTop = e.top + o.positions.top),
                  this.settings.customContainer &&
                    ((t =
                      this.settings.customContainer.getBoundingClientRect()),
                    (this.elementTop = e.top - t.top + o.positions.top)),
                  (this.elementBottom = this.elementHeight + this.elementTop)
              },
            },
            {
              key: 'buildThresholdList',
              value: function () {
                for (var t = [], e = 1; e <= this.elementHeight; e++) {
                  var i = e / this.elementHeight
                  t.push(i)
                }
                return t
              },
            },
            {
              key: 'intersectionObserver',
              value: function () {
                var t = { root: null, threshold: this.buildThresholdList() }
                ;(this.observer = new IntersectionObserver(
                  this.intersectionObserverCallback.bind(this),
                  t,
                )),
                  this.observer.observe(this.element)
              },
            },
            {
              key: 'intersectionObserverCallback',
              value: function (t) {
                var e = this
                t.forEach(function (t) {
                  t.isIntersecting ? (e.isVisible = !0) : (e.isVisible = !1)
                })
              },
            },
            {
              key: 'checkIfVisible',
              value: function () {
                return (
                  this.elementBottom > o.positions.top &&
                  this.elementTop < o.positions.bottom
                )
              },
            },
            {
              key: 'getRangeMax',
              value: function () {
                var t = this.element.clientHeight
                this.rangeMax = t * this.settings.scale - t
              },
            },
            {
              key: 'getTranslateValue',
              value: function () {
                var t = (
                    (o.positions.bottom - this.elementTop) /
                    ((o.positions.height + this.elementHeight) / 100)
                  ).toFixed(1),
                  t = Math.min(100, Math.max(0, t))
                return (
                  0 !== this.settings.maxTransition &&
                    t > this.settings.maxTransition &&
                    (t = this.settings.maxTransition),
                  this.oldPercentage !== t &&
                    (this.rangeMax || this.getRangeMax(),
                    (this.translateValue = (
                      (t / 100) * this.rangeMax -
                      this.rangeMax / 2
                    ).toFixed(0)),
                    this.oldTranslateValue !== this.translateValue) &&
                    ((this.oldPercentage = t),
                    (this.oldTranslateValue = this.translateValue),
                    !0)
                )
              },
            },
            {
              key: 'animate',
              value: function () {
                var t = 0,
                  e = 0
                ;(this.settings.orientation.includes('left') ||
                  this.settings.orientation.includes('right')) &&
                  (e = ''.concat(
                    this.settings.orientation.includes('left')
                      ? -1 * this.translateValue
                      : this.translateValue,
                    'px',
                  )),
                  (this.settings.orientation.includes('up') ||
                    this.settings.orientation.includes('down')) &&
                    (t = ''.concat(
                      this.settings.orientation.includes('up')
                        ? -1 * this.translateValue
                        : this.translateValue,
                      'px',
                    )),
                  (e =
                    !1 === this.settings.overflow
                      ? 'translate3d('
                          .concat(e, ', ')
                          .concat(t, ', 0) scale(')
                          .concat(this.settings.scale, ')')
                      : 'translate3d('.concat(e, ', ').concat(t, ', 0)')),
                  (this.element.style[r] = e)
              },
            },
          ])
          var c = u
          function u(t, e) {
            var i = this
            if (!(this instanceof u))
              throw new TypeError('Cannot call a class as a function')
            ;(this.element = t),
              (this.elementContainer = t),
              (this.settings = e),
              (this.isVisible = !0),
              (this.isInit = !1),
              (this.oldTranslateValue = -1),
              (this.init = this.init.bind(this)),
              'video' !== (e = t).tagName.toLowerCase() &&
              (!e ||
                !e.complete ||
                (void 0 !== e.naturalWidth && 0 === e.naturalWidth))
                ? this.element.addEventListener('load', function () {
                    setTimeout(function () {
                      i.init(!0)
                    }, 50)
                  })
                : this.init()
          }
          function p(t) {
            return (
              (function (t) {
                if (Array.isArray(t)) return f(t)
              })(t) ||
              (function (t) {
                if (
                  'undefined' != typeof Symbol &&
                  Symbol.iterator in Object(t)
                )
                  return Array.from(t)
              })(t) ||
              h(t) ||
              (function () {
                throw new TypeError(
                  'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                )
              })()
            )
          }
          function h(t, e) {
            var i
            if (t)
              return 'string' == typeof t
                ? f(t, e)
                : 'Map' ===
                      (i =
                        'Object' ===
                          (i = Object.prototype.toString
                            .call(t)
                            .slice(8, -1)) && t.constructor
                          ? t.constructor.name
                          : i) || 'Set' === i
                  ? Array.from(t)
                  : 'Arguments' === i ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
                    ? f(t, e)
                    : void 0
          }
          function f(t, e) {
            ;(null == e || e > t.length) && (e = t.length)
            for (var i = 0, s = new Array(e); i < e; i++) s[i] = t[i]
            return s
          }
          function m(t, e) {
            for (var i = 0; i < e.length; i++) {
              var s = e[i]
              ;(s.enumerable = s.enumerable || !1),
                (s.configurable = !0),
                'value' in s && (s.writable = !0),
                Object.defineProperty(t, s.key, s)
            }
          }
          var g,
            v,
            y = !1,
            b = [],
            w =
              (m(_.prototype, [
                {
                  key: 'init',
                  value: function () {
                    var e = this
                    o.setViewportAll(this.customContainer),
                      (b = [].concat(
                        p(
                          this.elements.map(function (t) {
                            return new c(t, e.settings)
                          }),
                        ),
                        p(b),
                      )),
                      y ||
                        (this.proceedRequestAnimationFrame(),
                        window.addEventListener('resize', this.resizeIsDone),
                        (y = !0))
                  },
                },
                {
                  key: 'resizeIsDone',
                  value: function () {
                    clearTimeout(v), (v = setTimeout(this.refresh, 200))
                  },
                },
                {
                  key: 'proceedRequestAnimationFrame',
                  value: function () {
                    var e = this
                    o.setViewportTop(this.customContainer),
                      this.lastPosition !== o.positions.top
                        ? (o.setViewportBottom(),
                          b.forEach(function (t) {
                            e.proceedElement(t)
                          }),
                          (g = window.requestAnimationFrame(
                            this.proceedRequestAnimationFrame,
                          )),
                          (this.lastPosition = o.positions.top))
                        : (g = window.requestAnimationFrame(
                            this.proceedRequestAnimationFrame,
                          ))
                  },
                },
                {
                  key: 'proceedElement',
                  value: function (t) {
                    ;(this.customContainer
                      ? t.checkIfVisible()
                      : t.isVisible) &&
                      t.getTranslateValue() &&
                      t.animate()
                  },
                },
                {
                  key: 'refresh',
                  value: function () {
                    o.setViewportAll(this.customContainer),
                      b.forEach(function (t) {
                        t.getElementOffset(), t.getRangeMax()
                      }),
                      (this.lastPosition = -1)
                  },
                },
                {
                  key: 'destroy',
                  value: function () {
                    var e = this,
                      i = []
                    ;(b = b.filter(function (t) {
                      return e.elements.includes(t.element)
                        ? (i.push(t), !1)
                        : t
                    })),
                      i.forEach(function (t) {
                        t.unSetStyle(),
                          !1 === e.settings.overflow && t.unWrapElement()
                      }),
                      b.length ||
                        (window.cancelAnimationFrame(g),
                        window.removeEventListener('resize', this.refresh))
                  },
                },
              ]),
              _)
          function _(t, e) {
            if (!(this instanceof _))
              throw new TypeError('Cannot call a class as a function')
            t &&
              Element.prototype.closest &&
              'IntersectionObserver' in window &&
              ((this.elements = n(t)),
              (this.defaults = {
                delay: 0,
                orientation: 'up',
                scale: 1.3,
                overflow: !1,
                transition: 'cubic-bezier(0,0,0,1)',
                customContainer: !1,
                customWrapper: !1,
                maxTransition: 0,
              }),
              (this.settings = Object.assign(this.defaults, e)),
              this.settings.customContainer &&
                ((t = n(this.settings.customContainer)),
                (e = 1),
                (t =
                  (function (t) {
                    if (Array.isArray(t)) return t
                  })(t) ||
                  (function (t, e) {
                    if (
                      'undefined' != typeof Symbol &&
                      Symbol.iterator in Object(t)
                    ) {
                      var i = [],
                        s = !0,
                        n = !1,
                        o = void 0
                      try {
                        for (
                          var r, a = t[Symbol.iterator]();
                          !(s = (r = a.next()).done) &&
                          (i.push(r.value), !e || i.length !== e);
                          s = !0
                        );
                      } catch (t) {
                        ;(n = !0), (o = t)
                      } finally {
                        try {
                          s || null == a.return || a.return()
                        } finally {
                          if (n) throw o
                        }
                      }
                      return i
                    }
                  })(t, e) ||
                  h(t, e) ||
                  (function () {
                    throw new TypeError(
                      'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    )
                  })()),
                (this.customContainer = t[0])),
              (this.lastPosition = -1),
              (this.resizeIsDone = this.resizeIsDone.bind(this)),
              (this.refresh = this.refresh.bind(this)),
              (this.proceedRequestAnimationFrame =
                this.proceedRequestAnimationFrame.bind(this)),
              this.init())
          }
        },
      ]),
      (s = {}),
      (n.m = i),
      (n.c = s),
      (n.d = function (t, e, i) {
        n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i })
      }),
      (n.r = function (t) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 })
      }),
      (n.t = function (e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e
        var i = Object.create(null)
        if (
          (n.r(i),
          Object.defineProperty(i, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var s in e)
            n.d(
              i,
              s,
              function (t) {
                return e[t]
              }.bind(null, s),
            )
        return i
      }),
      (n.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default
              }
            : function () {
                return t
              }
        return n.d(e, 'a', e), e
      }),
      (n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
      }),
      (n.p = ''),
      n((n.s = 0)).default
    )
    function n(t) {
      var e
      return (
        s[t] ||
        ((e = s[t] = { i: t, l: !1, exports: {} }),
        i[t].call(e.exports, e, e.exports, n),
        (e.l = !0),
        e)
      ).exports
    }
    var i, s
  }),
  (function (t) {
    'use strict'
    'function' == typeof define && define.amd
      ? define(['jquery'], t)
      : 'undefined' != typeof exports
        ? (module.exports = t(require('jquery')))
        : t(jQuery)
  })(function (d) {
    'use strict'
    var s,
      r = window.Slick || {}
    ;(s = 0),
      ((r = function (t, e) {
        var i = this
        ;(i.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: d(t),
          appendDots: d(t),
          arrows: !0,
          asNavFor: null,
          prevArrow:
            '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
          nextArrow:
            '<button class="slick-next" aria-label="Next" type="button">Next</button>',
          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: '50px',
          cssEase: 'ease',
          customPaging: function (t, e) {
            return d('<button type="button" />').text(e + 1)
          },
          dots: !1,
          dotsClass: 'slick-dots',
          draggable: !0,
          easing: 'linear',
          edgeFriction: 0.35,
          fade: !1,
          focusOnSelect: !1,
          focusOnChange: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: 'ondemand',
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnFocus: !0,
          pauseOnDotsHover: !1,
          respondTo: 'window',
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: '',
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !0,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
          zIndex: 1e3,
        }),
          (i.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1,
          }),
          d.extend(i, i.initials),
          (i.activeBreakpoint = null),
          (i.animType = null),
          (i.animProp = null),
          (i.breakpoints = []),
          (i.breakpointSettings = []),
          (i.cssTransitions = !1),
          (i.focussed = !1),
          (i.interrupted = !1),
          (i.hidden = 'hidden'),
          (i.paused = !0),
          (i.positionProp = null),
          (i.respondTo = null),
          (i.rowCount = 1),
          (i.shouldClick = !0),
          (i.$slider = d(t)),
          (i.$slidesCache = null),
          (i.transformType = null),
          (i.transitionType = null),
          (i.visibilityChange = 'visibilitychange'),
          (i.windowWidth = 0),
          (i.windowTimer = null),
          (t = d(t).data('slick') || {}),
          (i.options = d.extend({}, i.defaults, e, t)),
          (i.currentSlide = i.options.initialSlide),
          (i.originalSettings = i.options),
          void 0 !== document.mozHidden
            ? ((i.hidden = 'mozHidden'),
              (i.visibilityChange = 'mozvisibilitychange'))
            : void 0 !== document.webkitHidden &&
              ((i.hidden = 'webkitHidden'),
              (i.visibilityChange = 'webkitvisibilitychange')),
          (i.autoPlay = d.proxy(i.autoPlay, i)),
          (i.autoPlayClear = d.proxy(i.autoPlayClear, i)),
          (i.autoPlayIterator = d.proxy(i.autoPlayIterator, i)),
          (i.changeSlide = d.proxy(i.changeSlide, i)),
          (i.clickHandler = d.proxy(i.clickHandler, i)),
          (i.selectHandler = d.proxy(i.selectHandler, i)),
          (i.setPosition = d.proxy(i.setPosition, i)),
          (i.swipeHandler = d.proxy(i.swipeHandler, i)),
          (i.dragHandler = d.proxy(i.dragHandler, i)),
          (i.keyHandler = d.proxy(i.keyHandler, i)),
          (i.instanceUid = s++),
          (i.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
          i.registerBreakpoints(),
          i.init(!0)
      }).prototype.activateADA = function () {
        this.$slideTrack
          .find('.slick-active')
          .attr({ 'aria-hidden': 'false' })
          .find('a, input, button, select')
          .attr({ tabindex: '0' })
      }),
      (r.prototype.addSlide = r.prototype.slickAdd =
        function (t, e, i) {
          var s = this
          if ('boolean' == typeof e) (i = e), (e = null)
          else if (e < 0 || e >= s.slideCount) return !1
          s.unload(),
            'number' == typeof e
              ? 0 === e && 0 === s.$slides.length
                ? d(t).appendTo(s.$slideTrack)
                : i
                  ? d(t).insertBefore(s.$slides.eq(e))
                  : d(t).insertAfter(s.$slides.eq(e))
              : !0 === i
                ? d(t).prependTo(s.$slideTrack)
                : d(t).appendTo(s.$slideTrack),
            (s.$slides = s.$slideTrack.children(this.options.slide)),
            s.$slideTrack.children(this.options.slide).detach(),
            s.$slideTrack.append(s.$slides),
            s.$slides.each(function (t, e) {
              d(e).attr('data-slick-index', t)
            }),
            (s.$slidesCache = s.$slides),
            s.reinit()
        }),
      (r.prototype.animateHeight = function () {
        var t,
          e = this
        1 === e.options.slidesToShow &&
          !0 === e.options.adaptiveHeight &&
          !1 === e.options.vertical &&
          ((t = e.$slides.eq(e.currentSlide).outerHeight(!0)),
          e.$list.animate({ height: t }, e.options.speed))
      }),
      (r.prototype.animateSlide = function (t, e) {
        var i = {},
          s = this
        s.animateHeight(),
          !0 === s.options.rtl && !1 === s.options.vertical && (t = -t),
          !1 === s.transformsEnabled
            ? !1 === s.options.vertical
              ? s.$slideTrack.animate(
                  { left: t },
                  s.options.speed,
                  s.options.easing,
                  e,
                )
              : s.$slideTrack.animate(
                  { top: t },
                  s.options.speed,
                  s.options.easing,
                  e,
                )
            : !1 === s.cssTransitions
              ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
                d({ animStart: s.currentLeft }).animate(
                  { animStart: t },
                  {
                    duration: s.options.speed,
                    easing: s.options.easing,
                    step: function (t) {
                      ;(t = Math.ceil(t)),
                        !1 === s.options.vertical
                          ? (i[s.animType] = 'translate(' + t + 'px, 0px)')
                          : (i[s.animType] = 'translate(0px,' + t + 'px)'),
                        s.$slideTrack.css(i)
                    },
                    complete: function () {
                      e && e.call()
                    },
                  },
                ))
              : (s.applyTransition(),
                (t = Math.ceil(t)),
                !1 === s.options.vertical
                  ? (i[s.animType] = 'translate3d(' + t + 'px, 0px, 0px)')
                  : (i[s.animType] = 'translate3d(0px,' + t + 'px, 0px)'),
                s.$slideTrack.css(i),
                e &&
                  setTimeout(function () {
                    s.disableTransition(), e.call()
                  }, s.options.speed))
      }),
      (r.prototype.getNavTarget = function () {
        var t = this.options.asNavFor
        return (t = t && null !== t ? d(t).not(this.$slider) : t)
      }),
      (r.prototype.asNavFor = function (e) {
        var t = this.getNavTarget()
        null !== t &&
          'object' == typeof t &&
          t.each(function () {
            var t = d(this).slick('getSlick')
            t.unslicked || t.slideHandler(e, !0)
          })
      }),
      (r.prototype.applyTransition = function (t) {
        var e = this,
          i = {}
        !1 === e.options.fade
          ? (i[e.transitionType] =
              e.transformType +
              ' ' +
              e.options.speed +
              'ms ' +
              e.options.cssEase)
          : (i[e.transitionType] =
              'opacity ' + e.options.speed + 'ms ' + e.options.cssEase),
          (!1 === e.options.fade ? e.$slideTrack : e.$slides.eq(t)).css(i)
      }),
      (r.prototype.autoPlay = function () {
        var t = this
        t.autoPlayClear(),
          t.slideCount > t.options.slidesToShow &&
            (t.autoPlayTimer = setInterval(
              t.autoPlayIterator,
              t.options.autoplaySpeed,
            ))
      }),
      (r.prototype.autoPlayClear = function () {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
      }),
      (r.prototype.autoPlayIterator = function () {
        var t = this,
          e = t.currentSlide + t.options.slidesToScroll
        t.paused ||
          t.interrupted ||
          t.focussed ||
          (!1 === t.options.infinite &&
            (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1
              ? (t.direction = 0)
              : 0 === t.direction &&
                ((e = t.currentSlide - t.options.slidesToScroll),
                t.currentSlide - 1 == 0) &&
                (t.direction = 1)),
          t.slideHandler(e))
      }),
      (r.prototype.buildArrows = function () {
        var t = this
        !0 === t.options.arrows &&
          ((t.$prevArrow = d(t.options.prevArrow).addClass('slick-arrow')),
          (t.$nextArrow = d(t.options.nextArrow).addClass('slick-arrow')),
          t.slideCount > t.options.slidesToShow
            ? (t.$prevArrow
                .removeClass('slick-hidden')
                .removeAttr('aria-hidden tabindex'),
              t.$nextArrow
                .removeClass('slick-hidden')
                .removeAttr('aria-hidden tabindex'),
              t.htmlExpr.test(t.options.prevArrow) &&
                t.$prevArrow.prependTo(t.options.appendArrows),
              t.htmlExpr.test(t.options.nextArrow) &&
                t.$nextArrow.appendTo(t.options.appendArrows),
              !0 !== t.options.infinite &&
                t.$prevArrow
                  .addClass('slick-disabled')
                  .attr('aria-disabled', 'true'))
            : t.$prevArrow
                .add(t.$nextArrow)
                .addClass('slick-hidden')
                .attr({ 'aria-disabled': 'true', tabindex: '-1' }))
      }),
      (r.prototype.buildDots = function () {
        var t,
          e,
          i = this
        if (!0 === i.options.dots) {
          for (
            i.$slider.addClass('slick-dotted'),
              e = d('<ul />').addClass(i.options.dotsClass),
              t = 0;
            t <= i.getDotCount();
            t += 1
          )
            e.append(
              d('<li />').append(i.options.customPaging.call(this, i, t)),
            )
          ;(i.$dots = e.appendTo(i.options.appendDots)),
            i.$dots.find('li').first().addClass('slick-active')
        }
      }),
      (r.prototype.buildOut = function () {
        var t = this
        ;(t.$slides = t.$slider
          .children(t.options.slide + ':not(.slick-cloned)')
          .addClass('slick-slide')),
          (t.slideCount = t.$slides.length),
          t.$slides.each(function (t, e) {
            d(e)
              .attr('data-slick-index', t)
              .data('originalStyling', d(e).attr('style') || '')
          }),
          t.$slider.addClass('slick-slider'),
          (t.$slideTrack =
            0 === t.slideCount
              ? d('<div class="slick-track"/>').appendTo(t.$slider)
              : t.$slides.wrapAll('<div class="slick-track"/>').parent()),
          (t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent()),
          t.$slideTrack.css('opacity', 0),
          (!0 !== t.options.centerMode && !0 !== t.options.swipeToSlide) ||
            (t.options.slidesToScroll = 1),
          d('img[data-lazy]', t.$slider).not('[src]').addClass('slick-loading'),
          t.setupInfinite(),
          t.buildArrows(),
          t.buildDots(),
          t.updateDots(),
          t.setSlideClasses(
            'number' == typeof t.currentSlide ? t.currentSlide : 0,
          ),
          !0 === t.options.draggable && t.$list.addClass('draggable')
      }),
      (r.prototype.buildRows = function () {
        var t,
          e,
          i,
          s = this,
          n = document.createDocumentFragment(),
          o = s.$slider.children()
        if (1 < s.options.rows) {
          for (
            i = s.options.slidesPerRow * s.options.rows,
              e = Math.ceil(o.length / i),
              t = 0;
            t < e;
            t++
          ) {
            for (
              var r = document.createElement('div'), a = 0;
              a < s.options.rows;
              a++
            ) {
              for (
                var l = document.createElement('div'), d = 0;
                d < s.options.slidesPerRow;
                d++
              ) {
                var c = t * i + (a * s.options.slidesPerRow + d)
                o.get(c) && l.appendChild(o.get(c))
              }
              r.appendChild(l)
            }
            n.appendChild(r)
          }
          s.$slider.empty().append(n),
            s.$slider
              .children()
              .children()
              .children()
              .css({
                width: 100 / s.options.slidesPerRow + '%',
                display: 'inline-block',
              })
        }
      }),
      (r.prototype.checkResponsive = function (t, e) {
        var i,
          s,
          n,
          o = this,
          r = !1,
          a = o.$slider.width(),
          l = window.innerWidth || d(window).width()
        if (
          ('window' === o.respondTo
            ? (n = l)
            : 'slider' === o.respondTo
              ? (n = a)
              : 'min' === o.respondTo && (n = Math.min(l, a)),
          o.options.responsive &&
            o.options.responsive.length &&
            null !== o.options.responsive)
        ) {
          for (i in ((s = null), o.breakpoints))
            o.breakpoints.hasOwnProperty(i) &&
              (!1 === o.originalSettings.mobileFirst
                ? n < o.breakpoints[i] && (s = o.breakpoints[i])
                : n > o.breakpoints[i] && (s = o.breakpoints[i]))
          null !== s
            ? (null !== o.activeBreakpoint && s === o.activeBreakpoint && !e) ||
              ((o.activeBreakpoint = s),
              'unslick' === o.breakpointSettings[s]
                ? o.unslick(s)
                : ((o.options = d.extend(
                    {},
                    o.originalSettings,
                    o.breakpointSettings[s],
                  )),
                  !0 === t && (o.currentSlide = o.options.initialSlide),
                  o.refresh(t)),
              (r = s))
            : null !== o.activeBreakpoint &&
              ((o.activeBreakpoint = null),
              (o.options = o.originalSettings),
              !0 === t && (o.currentSlide = o.options.initialSlide),
              o.refresh(t),
              (r = s)),
            t || !1 === r || o.$slider.trigger('breakpoint', [o, r])
        }
      }),
      (r.prototype.changeSlide = function (t, e) {
        var i,
          s = this,
          n = d(t.currentTarget)
        switch (
          (n.is('a') && t.preventDefault(),
          n.is('li') || (n = n.closest('li')),
          (i =
            s.slideCount % s.options.slidesToScroll != 0
              ? 0
              : (s.slideCount - s.currentSlide) % s.options.slidesToScroll),
          t.data.message)
        ) {
          case 'previous':
            ;(o =
              0 == i ? s.options.slidesToScroll : s.options.slidesToShow - i),
              s.slideCount > s.options.slidesToShow &&
                s.slideHandler(s.currentSlide - o, !1, e)
            break
          case 'next':
            ;(o = 0 == i ? s.options.slidesToScroll : i),
              s.slideCount > s.options.slidesToShow &&
                s.slideHandler(s.currentSlide + o, !1, e)
            break
          case 'index':
            var o =
              0 === t.data.index
                ? 0
                : t.data.index || n.index() * s.options.slidesToScroll
            s.slideHandler(s.checkNavigable(o), !1, e),
              n.children().trigger('focus')
            break
          default:
            return
        }
      }),
      (r.prototype.checkNavigable = function (t) {
        var e = this.getNavigableIndexes(),
          i = 0
        if (t > e[e.length - 1]) t = e[e.length - 1]
        else
          for (var s in e) {
            if (t < e[s]) {
              t = i
              break
            }
            i = e[s]
          }
        return t
      }),
      (r.prototype.cleanUpEvents = function () {
        var t = this
        t.options.dots &&
          null !== t.$dots &&
          (d('li', t.$dots)
            .off('click.slick', t.changeSlide)
            .off('mouseenter.slick', d.proxy(t.interrupt, t, !0))
            .off('mouseleave.slick', d.proxy(t.interrupt, t, !1)),
          !0 === t.options.accessibility) &&
          t.$dots.off('keydown.slick', t.keyHandler),
          t.$slider.off('focus.slick blur.slick'),
          !0 === t.options.arrows &&
            t.slideCount > t.options.slidesToShow &&
            (t.$prevArrow && t.$prevArrow.off('click.slick', t.changeSlide),
            t.$nextArrow && t.$nextArrow.off('click.slick', t.changeSlide),
            !0 === t.options.accessibility) &&
            (t.$prevArrow && t.$prevArrow.off('keydown.slick', t.keyHandler),
            t.$nextArrow) &&
            t.$nextArrow.off('keydown.slick', t.keyHandler),
          t.$list.off('touchstart.slick mousedown.slick', t.swipeHandler),
          t.$list.off('touchmove.slick mousemove.slick', t.swipeHandler),
          t.$list.off('touchend.slick mouseup.slick', t.swipeHandler),
          t.$list.off('touchcancel.slick mouseleave.slick', t.swipeHandler),
          t.$list.off('click.slick', t.clickHandler),
          d(document).off(t.visibilityChange, t.visibility),
          t.cleanUpSlideEvents(),
          !0 === t.options.accessibility &&
            t.$list.off('keydown.slick', t.keyHandler),
          !0 === t.options.focusOnSelect &&
            d(t.$slideTrack).children().off('click.slick', t.selectHandler),
          d(window).off(
            'orientationchange.slick.slick-' + t.instanceUid,
            t.orientationChange,
          ),
          d(window).off('resize.slick.slick-' + t.instanceUid, t.resize),
          d('[draggable!=true]', t.$slideTrack).off(
            'dragstart',
            t.preventDefault,
          ),
          d(window).off('load.slick.slick-' + t.instanceUid, t.setPosition)
      }),
      (r.prototype.cleanUpSlideEvents = function () {
        var t = this
        t.$list.off('mouseenter.slick', d.proxy(t.interrupt, t, !0)),
          t.$list.off('mouseleave.slick', d.proxy(t.interrupt, t, !1))
      }),
      (r.prototype.cleanUpRows = function () {
        var t
        1 < this.options.rows &&
          ((t = this.$slides.children().children()).removeAttr('style'),
          this.$slider.empty().append(t))
      }),
      (r.prototype.clickHandler = function (t) {
        !1 === this.shouldClick &&
          (t.stopImmediatePropagation(),
          t.stopPropagation(),
          t.preventDefault())
      }),
      (r.prototype.destroy = function (t) {
        var e = this
        e.autoPlayClear(),
          (e.touchObject = {}),
          e.cleanUpEvents(),
          d('.slick-cloned', e.$slider).detach(),
          e.$dots && e.$dots.remove(),
          e.$prevArrow &&
            e.$prevArrow.length &&
            (e.$prevArrow
              .removeClass('slick-disabled slick-arrow slick-hidden')
              .removeAttr('aria-hidden aria-disabled tabindex')
              .css('display', ''),
            e.htmlExpr.test(e.options.prevArrow)) &&
            e.$prevArrow.remove(),
          e.$nextArrow &&
            e.$nextArrow.length &&
            (e.$nextArrow
              .removeClass('slick-disabled slick-arrow slick-hidden')
              .removeAttr('aria-hidden aria-disabled tabindex')
              .css('display', ''),
            e.htmlExpr.test(e.options.nextArrow)) &&
            e.$nextArrow.remove(),
          e.$slides &&
            (e.$slides
              .removeClass(
                'slick-slide slick-active slick-center slick-visible slick-current',
              )
              .removeAttr('aria-hidden')
              .removeAttr('data-slick-index')
              .each(function () {
                d(this).attr('style', d(this).data('originalStyling'))
              }),
            e.$slideTrack.children(this.options.slide).detach(),
            e.$slideTrack.detach(),
            e.$list.detach(),
            e.$slider.append(e.$slides)),
          e.cleanUpRows(),
          e.$slider.removeClass('slick-slider'),
          e.$slider.removeClass('slick-initialized'),
          e.$slider.removeClass('slick-dotted'),
          (e.unslicked = !0),
          t || e.$slider.trigger('destroy', [e])
      }),
      (r.prototype.disableTransition = function (t) {
        var e = {}
        ;(e[this.transitionType] = ''),
          (!1 === this.options.fade
            ? this.$slideTrack
            : this.$slides.eq(t)
          ).css(e)
      }),
      (r.prototype.fadeSlide = function (t, e) {
        var i = this
        !1 === i.cssTransitions
          ? (i.$slides.eq(t).css({ zIndex: i.options.zIndex }),
            i.$slides
              .eq(t)
              .animate({ opacity: 1 }, i.options.speed, i.options.easing, e))
          : (i.applyTransition(t),
            i.$slides.eq(t).css({ opacity: 1, zIndex: i.options.zIndex }),
            e &&
              setTimeout(function () {
                i.disableTransition(t), e.call()
              }, i.options.speed))
      }),
      (r.prototype.fadeSlideOut = function (t) {
        var e = this
        !1 === e.cssTransitions
          ? e.$slides
              .eq(t)
              .animate(
                { opacity: 0, zIndex: e.options.zIndex - 2 },
                e.options.speed,
                e.options.easing,
              )
          : (e.applyTransition(t),
            e.$slides.eq(t).css({ opacity: 0, zIndex: e.options.zIndex - 2 }))
      }),
      (r.prototype.filterSlides = r.prototype.slickFilter =
        function (t) {
          var e = this
          null !== t &&
            ((e.$slidesCache = e.$slides),
            e.unload(),
            e.$slideTrack.children(this.options.slide).detach(),
            e.$slidesCache.filter(t).appendTo(e.$slideTrack),
            e.reinit())
        }),
      (r.prototype.focusHandler = function () {
        var i = this
        i.$slider
          .off('focus.slick blur.slick')
          .on('focus.slick blur.slick', '*', function (t) {
            t.stopImmediatePropagation()
            var e = d(this)
            setTimeout(function () {
              i.options.pauseOnFocus &&
                ((i.focussed = e.is(':focus')), i.autoPlay())
            }, 0)
          })
      }),
      (r.prototype.getCurrent = r.prototype.slickCurrentSlide =
        function () {
          return this.currentSlide
        }),
      (r.prototype.getDotCount = function () {
        var t = this,
          e = 0,
          i = 0,
          s = 0
        if (!0 === t.options.infinite)
          if (t.slideCount <= t.options.slidesToShow) ++s
          else
            for (; e < t.slideCount; )
              ++s,
                (e = i + t.options.slidesToScroll),
                (i +=
                  t.options.slidesToScroll <= t.options.slidesToShow
                    ? t.options.slidesToScroll
                    : t.options.slidesToShow)
        else if (!0 === t.options.centerMode) s = t.slideCount
        else if (t.options.asNavFor)
          for (; e < t.slideCount; )
            ++s,
              (e = i + t.options.slidesToScroll),
              (i +=
                t.options.slidesToScroll <= t.options.slidesToShow
                  ? t.options.slidesToScroll
                  : t.options.slidesToShow)
        else
          s =
            1 +
            Math.ceil(
              (t.slideCount - t.options.slidesToShow) /
                t.options.slidesToScroll,
            )
        return s - 1
      }),
      (r.prototype.getLeft = function (t) {
        var e,
          i,
          s = this,
          n = 0
        return (
          (s.slideOffset = 0),
          (e = s.$slides.first().outerHeight(!0)),
          !0 === s.options.infinite
            ? (s.slideCount > s.options.slidesToShow &&
                ((s.slideOffset = s.slideWidth * s.options.slidesToShow * -1),
                (i = -1),
                !0 === s.options.vertical &&
                  !0 === s.options.centerMode &&
                  (2 === s.options.slidesToShow
                    ? (i = -1.5)
                    : 1 === s.options.slidesToShow && (i = -2)),
                (n = e * s.options.slidesToShow * i)),
              s.slideCount % s.options.slidesToScroll != 0 &&
                t + s.options.slidesToScroll > s.slideCount &&
                s.slideCount > s.options.slidesToShow &&
                (n =
                  t > s.slideCount
                    ? ((s.slideOffset =
                        (s.options.slidesToShow - (t - s.slideCount)) *
                        s.slideWidth *
                        -1),
                      (s.options.slidesToShow - (t - s.slideCount)) * e * -1)
                    : ((s.slideOffset =
                        (s.slideCount % s.options.slidesToScroll) *
                        s.slideWidth *
                        -1),
                      (s.slideCount % s.options.slidesToScroll) * e * -1)))
            : t + s.options.slidesToShow > s.slideCount &&
              ((s.slideOffset =
                (t + s.options.slidesToShow - s.slideCount) * s.slideWidth),
              (n = (t + s.options.slidesToShow - s.slideCount) * e)),
          s.slideCount <= s.options.slidesToShow && (n = s.slideOffset = 0),
          !0 === s.options.centerMode && s.slideCount <= s.options.slidesToShow
            ? (s.slideOffset =
                (s.slideWidth * Math.floor(s.options.slidesToShow)) / 2 -
                (s.slideWidth * s.slideCount) / 2)
            : !0 === s.options.centerMode && !0 === s.options.infinite
              ? (s.slideOffset +=
                  s.slideWidth * Math.floor(s.options.slidesToShow / 2) -
                  s.slideWidth)
              : !0 === s.options.centerMode &&
                ((s.slideOffset = 0),
                (s.slideOffset +=
                  s.slideWidth * Math.floor(s.options.slidesToShow / 2))),
          (i =
            !1 === s.options.vertical
              ? t * s.slideWidth * -1 + s.slideOffset
              : t * e * -1 + n),
          !0 === s.options.variableWidth &&
            ((e =
              s.slideCount <= s.options.slidesToShow ||
              !1 === s.options.infinite
                ? s.$slideTrack.children('.slick-slide').eq(t)
                : s.$slideTrack
                    .children('.slick-slide')
                    .eq(t + s.options.slidesToShow)),
            (i =
              !0 === s.options.rtl
                ? e[0]
                  ? -1 * (s.$slideTrack.width() - e[0].offsetLeft - e.width())
                  : 0
                : e[0]
                  ? -1 * e[0].offsetLeft
                  : 0),
            !0 === s.options.centerMode) &&
            ((e =
              s.slideCount <= s.options.slidesToShow ||
              !1 === s.options.infinite
                ? s.$slideTrack.children('.slick-slide').eq(t)
                : s.$slideTrack
                    .children('.slick-slide')
                    .eq(t + s.options.slidesToShow + 1)),
            (i =
              !0 === s.options.rtl
                ? e[0]
                  ? -1 * (s.$slideTrack.width() - e[0].offsetLeft - e.width())
                  : 0
                : e[0]
                  ? -1 * e[0].offsetLeft
                  : 0),
            (i += (s.$list.width() - e.outerWidth()) / 2)),
          i
        )
      }),
      (r.prototype.getOption = r.prototype.slickGetOption =
        function (t) {
          return this.options[t]
        }),
      (r.prototype.getNavigableIndexes = function () {
        for (
          var t = this,
            e = 0,
            i = 0,
            s = [],
            n =
              !1 === t.options.infinite
                ? t.slideCount
                : ((e = -1 * t.options.slidesToScroll),
                  (i = -1 * t.options.slidesToScroll),
                  2 * t.slideCount);
          e < n;

        )
          s.push(e),
            (e = i + t.options.slidesToScroll),
            (i +=
              t.options.slidesToScroll <= t.options.slidesToShow
                ? t.options.slidesToScroll
                : t.options.slidesToShow)
        return s
      }),
      (r.prototype.getSlick = function () {
        return this
      }),
      (r.prototype.getSlideCount = function () {
        var i,
          s = this,
          n =
            !0 === s.options.centerMode
              ? s.slideWidth * Math.floor(s.options.slidesToShow / 2)
              : 0
        return !0 === s.options.swipeToSlide
          ? (s.$slideTrack.find('.slick-slide').each(function (t, e) {
              if (e.offsetLeft - n + d(e).outerWidth() / 2 > -1 * s.swipeLeft)
                return (i = e), !1
            }),
            Math.abs(d(i).attr('data-slick-index') - s.currentSlide) || 1)
          : s.options.slidesToScroll
      }),
      (r.prototype.goTo = r.prototype.slickGoTo =
        function (t, e) {
          this.changeSlide(
            { data: { message: 'index', index: parseInt(t) } },
            e,
          )
        }),
      (r.prototype.init = function (t) {
        var e = this
        d(e.$slider).hasClass('slick-initialized') ||
          (d(e.$slider).addClass('slick-initialized'),
          e.buildRows(),
          e.buildOut(),
          e.setProps(),
          e.startLoad(),
          e.loadSlider(),
          e.initializeEvents(),
          e.updateArrows(),
          e.updateDots(),
          e.checkResponsive(!0),
          e.focusHandler()),
          t && e.$slider.trigger('init', [e]),
          !0 === e.options.accessibility && e.initADA(),
          e.options.autoplay && ((e.paused = !1), e.autoPlay())
      }),
      (r.prototype.initADA = function () {
        var i = this,
          s = Math.ceil(i.slideCount / i.options.slidesToShow),
          n = i.getNavigableIndexes().filter(function (t) {
            return 0 <= t && t < i.slideCount
          })
        i.$slides
          .add(i.$slideTrack.find('.slick-cloned'))
          .attr({ 'aria-hidden': 'true', tabindex: '-1' })
          .find('a, input, button, select')
          .attr({ tabindex: '-1' }),
          null !== i.$dots &&
            (i.$slides
              .not(i.$slideTrack.find('.slick-cloned'))
              .each(function (t) {
                var e = n.indexOf(t)
                d(this).attr({
                  role: 'tabpanel',
                  id: 'slick-slide' + i.instanceUid + t,
                  tabindex: -1,
                }),
                  -1 !== e &&
                    d(this).attr({
                      'aria-describedby':
                        'slick-slide-control' + i.instanceUid + e,
                    })
              }),
            i.$dots
              .attr('role', 'tablist')
              .find('li')
              .each(function (t) {
                var e = n[t]
                d(this).attr({ role: 'presentation' }),
                  d(this)
                    .find('button')
                    .first()
                    .attr({
                      role: 'tab',
                      id: 'slick-slide-control' + i.instanceUid + t,
                      'aria-controls': 'slick-slide' + i.instanceUid + e,
                      'aria-label': t + 1 + ' of ' + s,
                      'aria-selected': null,
                      tabindex: '-1',
                    })
              })
              .eq(i.currentSlide)
              .find('button')
              .attr({ 'aria-selected': 'true', tabindex: '0' })
              .end())
        for (var t = i.currentSlide, e = t + i.options.slidesToShow; t < e; t++)
          i.$slides.eq(t).attr('tabindex', 0)
        i.activateADA()
      }),
      (r.prototype.initArrowEvents = function () {
        var t = this
        !0 === t.options.arrows &&
          t.slideCount > t.options.slidesToShow &&
          (t.$prevArrow
            .off('click.slick')
            .on('click.slick', { message: 'previous' }, t.changeSlide),
          t.$nextArrow
            .off('click.slick')
            .on('click.slick', { message: 'next' }, t.changeSlide),
          !0 === t.options.accessibility) &&
          (t.$prevArrow.on('keydown.slick', t.keyHandler),
          t.$nextArrow.on('keydown.slick', t.keyHandler))
      }),
      (r.prototype.initDotEvents = function () {
        var t = this
        !0 === t.options.dots &&
          (d('li', t.$dots).on(
            'click.slick',
            { message: 'index' },
            t.changeSlide,
          ),
          !0 === t.options.accessibility) &&
          t.$dots.on('keydown.slick', t.keyHandler),
          !0 === t.options.dots &&
            !0 === t.options.pauseOnDotsHover &&
            d('li', t.$dots)
              .on('mouseenter.slick', d.proxy(t.interrupt, t, !0))
              .on('mouseleave.slick', d.proxy(t.interrupt, t, !1))
      }),
      (r.prototype.initSlideEvents = function () {
        var t = this
        t.options.pauseOnHover &&
          (t.$list.on('mouseenter.slick', d.proxy(t.interrupt, t, !0)),
          t.$list.on('mouseleave.slick', d.proxy(t.interrupt, t, !1)))
      }),
      (r.prototype.initializeEvents = function () {
        var t = this
        t.initArrowEvents(),
          t.initDotEvents(),
          t.initSlideEvents(),
          t.$list.on(
            'touchstart.slick mousedown.slick',
            { action: 'start' },
            t.swipeHandler,
          ),
          t.$list.on(
            'touchmove.slick mousemove.slick',
            { action: 'move' },
            t.swipeHandler,
          ),
          t.$list.on(
            'touchend.slick mouseup.slick',
            { action: 'end' },
            t.swipeHandler,
          ),
          t.$list.on(
            'touchcancel.slick mouseleave.slick',
            { action: 'end' },
            t.swipeHandler,
          ),
          t.$list.on('click.slick', t.clickHandler),
          d(document).on(t.visibilityChange, d.proxy(t.visibility, t)),
          !0 === t.options.accessibility &&
            t.$list.on('keydown.slick', t.keyHandler),
          !0 === t.options.focusOnSelect &&
            d(t.$slideTrack).children().on('click.slick', t.selectHandler),
          d(window).on(
            'orientationchange.slick.slick-' + t.instanceUid,
            d.proxy(t.orientationChange, t),
          ),
          d(window).on(
            'resize.slick.slick-' + t.instanceUid,
            d.proxy(t.resize, t),
          ),
          d('[draggable!=true]', t.$slideTrack).on(
            'dragstart',
            t.preventDefault,
          ),
          d(window).on('load.slick.slick-' + t.instanceUid, t.setPosition),
          d(t.setPosition)
      }),
      (r.prototype.initUI = function () {
        var t = this
        !0 === t.options.arrows &&
          t.slideCount > t.options.slidesToShow &&
          (t.$prevArrow.show(), t.$nextArrow.show()),
          !0 === t.options.dots &&
            t.slideCount > t.options.slidesToShow &&
            t.$dots.show()
      }),
      (r.prototype.keyHandler = function (t) {
        var e = this
        t.target.tagName.match('TEXTAREA|INPUT|SELECT') ||
          (37 === t.keyCode && !0 === e.options.accessibility
            ? e.changeSlide({
                data: { message: !0 === e.options.rtl ? 'next' : 'previous' },
              })
            : 39 === t.keyCode &&
              !0 === e.options.accessibility &&
              e.changeSlide({
                data: { message: !0 === e.options.rtl ? 'previous' : 'next' },
              }))
      }),
      (r.prototype.lazyLoad = function () {
        function t(t) {
          d('img[data-lazy]', t).each(function () {
            var t = d(this),
              e = d(this).attr('data-lazy'),
              i = d(this).attr('data-srcset'),
              s = d(this).attr('data-sizes') || o.$slider.attr('data-sizes'),
              n = document.createElement('img')
            ;(n.onload = function () {
              t.animate({ opacity: 0 }, 100, function () {
                i && (t.attr('srcset', i), s) && t.attr('sizes', s),
                  t.attr('src', e).animate({ opacity: 1 }, 200, function () {
                    t.removeAttr(
                      'data-lazy data-srcset data-sizes',
                    ).removeClass('slick-loading')
                  }),
                  o.$slider.trigger('lazyLoaded', [o, t, e])
              })
            }),
              (n.onerror = function () {
                t
                  .removeAttr('data-lazy')
                  .removeClass('slick-loading')
                  .addClass('slick-lazyload-error'),
                  o.$slider.trigger('lazyLoadError', [o, t, e])
              }),
              (n.src = e)
          })
        }
        var e,
          i,
          s,
          o = this
        if (
          (!0 === o.options.centerMode
            ? (s =
                !0 === o.options.infinite
                  ? (i = o.currentSlide + (o.options.slidesToShow / 2 + 1)) +
                    o.options.slidesToShow +
                    2
                  : ((i = Math.max(
                      0,
                      o.currentSlide - (o.options.slidesToShow / 2 + 1),
                    )),
                    o.options.slidesToShow / 2 + 1 + 2 + o.currentSlide))
            : ((i = o.options.infinite
                ? o.options.slidesToShow + o.currentSlide
                : o.currentSlide),
              (s = Math.ceil(i + o.options.slidesToShow)),
              !0 === o.options.fade &&
                (0 < i && i--, s <= o.slideCount) &&
                s++),
          (e = o.$slider.find('.slick-slide').slice(i, s)),
          'anticipated' === o.options.lazyLoad)
        )
          for (
            var n = i - 1, r = s, a = o.$slider.find('.slick-slide'), l = 0;
            l < o.options.slidesToScroll;
            l++
          )
            n < 0 && (n = o.slideCount - 1),
              (e = (e = e.add(a.eq(n))).add(a.eq(r))),
              n--,
              r++
        t(e),
          o.slideCount <= o.options.slidesToShow
            ? t(o.$slider.find('.slick-slide'))
            : o.currentSlide >= o.slideCount - o.options.slidesToShow
              ? t(
                  o.$slider
                    .find('.slick-cloned')
                    .slice(0, o.options.slidesToShow),
                )
              : 0 === o.currentSlide &&
                t(
                  o.$slider
                    .find('.slick-cloned')
                    .slice(-1 * o.options.slidesToShow),
                )
      }),
      (r.prototype.loadSlider = function () {
        var t = this
        t.setPosition(),
          t.$slideTrack.css({ opacity: 1 }),
          t.$slider.removeClass('slick-loading'),
          t.initUI(),
          'progressive' === t.options.lazyLoad && t.progressiveLazyLoad()
      }),
      (r.prototype.next = r.prototype.slickNext =
        function () {
          this.changeSlide({ data: { message: 'next' } })
        }),
      (r.prototype.orientationChange = function () {
        this.checkResponsive(), this.setPosition()
      }),
      (r.prototype.pause = r.prototype.slickPause =
        function () {
          this.autoPlayClear(), (this.paused = !0)
        }),
      (r.prototype.play = r.prototype.slickPlay =
        function () {
          var t = this
          t.autoPlay(),
            (t.options.autoplay = !0),
            (t.paused = !1),
            (t.focussed = !1),
            (t.interrupted = !1)
        }),
      (r.prototype.postSlide = function (t) {
        var e = this
        e.unslicked ||
          (e.$slider.trigger('afterChange', [e, t]),
          (e.animating = !1),
          e.slideCount > e.options.slidesToShow && e.setPosition(),
          (e.swipeLeft = null),
          e.options.autoplay && e.autoPlay(),
          !0 === e.options.accessibility &&
            (e.initADA(), e.options.focusOnChange) &&
            d(e.$slides.get(e.currentSlide)).attr('tabindex', 0).focus())
      }),
      (r.prototype.prev = r.prototype.slickPrev =
        function () {
          this.changeSlide({ data: { message: 'previous' } })
        }),
      (r.prototype.preventDefault = function (t) {
        t.preventDefault()
      }),
      (r.prototype.progressiveLazyLoad = function (t) {
        t = t || 1
        var e,
          i,
          s,
          n,
          o = this,
          r = d('img[data-lazy]', o.$slider)
        r.length
          ? ((e = r.first()),
            (i = e.attr('data-lazy')),
            (s = e.attr('data-srcset')),
            (n = e.attr('data-sizes') || o.$slider.attr('data-sizes')),
            ((r = document.createElement('img')).onload = function () {
              s && (e.attr('srcset', s), n) && e.attr('sizes', n),
                e
                  .attr('src', i)
                  .removeAttr('data-lazy data-srcset data-sizes')
                  .removeClass('slick-loading'),
                !0 === o.options.adaptiveHeight && o.setPosition(),
                o.$slider.trigger('lazyLoaded', [o, e, i]),
                o.progressiveLazyLoad()
            }),
            (r.onerror = function () {
              t < 3
                ? setTimeout(function () {
                    o.progressiveLazyLoad(t + 1)
                  }, 500)
                : (e
                    .removeAttr('data-lazy')
                    .removeClass('slick-loading')
                    .addClass('slick-lazyload-error'),
                  o.$slider.trigger('lazyLoadError', [o, e, i]),
                  o.progressiveLazyLoad())
            }),
            (r.src = i))
          : o.$slider.trigger('allImagesLoaded', [o])
      }),
      (r.prototype.refresh = function (t) {
        var e = this,
          i = e.slideCount - e.options.slidesToShow
        !e.options.infinite && e.currentSlide > i && (e.currentSlide = i),
          e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
          (i = e.currentSlide),
          e.destroy(!0),
          d.extend(e, e.initials, { currentSlide: i }),
          e.init(),
          t || e.changeSlide({ data: { message: 'index', index: i } }, !1)
      }),
      (r.prototype.registerBreakpoints = function () {
        var t,
          e,
          i,
          s = this,
          n = s.options.responsive || null
        if ('array' === d.type(n) && n.length) {
          for (t in ((s.respondTo = s.options.respondTo || 'window'), n))
            if (((i = s.breakpoints.length - 1), n.hasOwnProperty(t))) {
              for (e = n[t].breakpoint; 0 <= i; )
                s.breakpoints[i] &&
                  s.breakpoints[i] === e &&
                  s.breakpoints.splice(i, 1),
                  i--
              s.breakpoints.push(e), (s.breakpointSettings[e] = n[t].settings)
            }
          s.breakpoints.sort(function (t, e) {
            return s.options.mobileFirst ? t - e : e - t
          })
        }
      }),
      (r.prototype.reinit = function () {
        var t = this
        ;(t.$slides = t.$slideTrack
          .children(t.options.slide)
          .addClass('slick-slide')),
          (t.slideCount = t.$slides.length),
          t.currentSlide >= t.slideCount &&
            0 !== t.currentSlide &&
            (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
          t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
          t.registerBreakpoints(),
          t.setProps(),
          t.setupInfinite(),
          t.buildArrows(),
          t.updateArrows(),
          t.initArrowEvents(),
          t.buildDots(),
          t.updateDots(),
          t.initDotEvents(),
          t.cleanUpSlideEvents(),
          t.initSlideEvents(),
          t.checkResponsive(!1, !0),
          !0 === t.options.focusOnSelect &&
            d(t.$slideTrack).children().on('click.slick', t.selectHandler),
          t.setSlideClasses(
            'number' == typeof t.currentSlide ? t.currentSlide : 0,
          ),
          t.setPosition(),
          t.focusHandler(),
          (t.paused = !t.options.autoplay),
          t.autoPlay(),
          t.$slider.trigger('reInit', [t])
      }),
      (r.prototype.resize = function () {
        var t = this
        d(window).width() !== t.windowWidth &&
          (clearTimeout(t.windowDelay),
          (t.windowDelay = window.setTimeout(function () {
            ;(t.windowWidth = d(window).width()),
              t.checkResponsive(),
              t.unslicked || t.setPosition()
          }, 50)))
      }),
      (r.prototype.removeSlide = r.prototype.slickRemove =
        function (t, e, i) {
          var s = this
          if (
            ((t =
              'boolean' == typeof t
                ? !0 === (e = t)
                  ? 0
                  : s.slideCount - 1
                : !0 === e
                  ? --t
                  : t),
            s.slideCount < 1 || t < 0 || t > s.slideCount - 1)
          )
            return !1
          s.unload(),
            (!0 === i
              ? s.$slideTrack.children()
              : s.$slideTrack.children(this.options.slide).eq(t)
            ).remove(),
            (s.$slides = s.$slideTrack.children(this.options.slide)),
            s.$slideTrack.children(this.options.slide).detach(),
            s.$slideTrack.append(s.$slides),
            (s.$slidesCache = s.$slides),
            s.reinit()
        }),
      (r.prototype.setCSS = function (t) {
        var e,
          i,
          s = this,
          n = {}
        !0 === s.options.rtl && (t = -t),
          (e = 'left' == s.positionProp ? Math.ceil(t) + 'px' : '0px'),
          (i = 'top' == s.positionProp ? Math.ceil(t) + 'px' : '0px'),
          (n[s.positionProp] = t),
          !1 !== s.transformsEnabled &&
            (!(n = {}) === s.cssTransitions
              ? (n[s.animType] = 'translate(' + e + ', ' + i + ')')
              : (n[s.animType] = 'translate3d(' + e + ', ' + i + ', 0px)')),
          s.$slideTrack.css(n)
      }),
      (r.prototype.setDimensions = function () {
        var t = this,
          e =
            (!1 === t.options.vertical
              ? !0 === t.options.centerMode &&
                t.$list.css({ padding: '0px ' + t.options.centerPadding })
              : (t.$list.height(
                  t.$slides.first().outerHeight(!0) * t.options.slidesToShow,
                ),
                !0 === t.options.centerMode &&
                  t.$list.css({ padding: t.options.centerPadding + ' 0px' })),
            (t.listWidth = t.$list.width()),
            (t.listHeight = t.$list.height()),
            !1 === t.options.vertical && !1 === t.options.variableWidth
              ? ((t.slideWidth = Math.ceil(
                  t.listWidth / t.options.slidesToShow,
                )),
                t.$slideTrack.width(
                  Math.ceil(
                    t.slideWidth *
                      t.$slideTrack.children('.slick-slide').length,
                  ),
                ))
              : !0 === t.options.variableWidth
                ? t.$slideTrack.width(5e3 * t.slideCount)
                : ((t.slideWidth = Math.ceil(t.listWidth)),
                  t.$slideTrack.height(
                    Math.ceil(
                      t.$slides.first().outerHeight(!0) *
                        t.$slideTrack.children('.slick-slide').length,
                    ),
                  )),
            t.$slides.first().outerWidth(!0) - t.$slides.first().width())
        !1 === t.options.variableWidth &&
          t.$slideTrack.children('.slick-slide').width(t.slideWidth - e)
      }),
      (r.prototype.setFade = function () {
        var i,
          s = this
        s.$slides.each(function (t, e) {
          ;(i = s.slideWidth * t * -1),
            !0 === s.options.rtl
              ? d(e).css({
                  position: 'relative',
                  right: i,
                  top: 0,
                  zIndex: s.options.zIndex - 2,
                  opacity: 0,
                })
              : d(e).css({
                  position: 'relative',
                  left: i,
                  top: 0,
                  zIndex: s.options.zIndex - 2,
                  opacity: 0,
                })
        }),
          s.$slides
            .eq(s.currentSlide)
            .css({ zIndex: s.options.zIndex - 1, opacity: 1 })
      }),
      (r.prototype.setHeight = function () {
        var t,
          e = this
        1 === e.options.slidesToShow &&
          !0 === e.options.adaptiveHeight &&
          !1 === e.options.vertical &&
          ((t = e.$slides.eq(e.currentSlide).outerHeight(!0)),
          e.$list.css('height', t))
      }),
      (r.prototype.setOption = r.prototype.slickSetOption =
        function () {
          var t,
            e,
            i,
            s,
            n,
            o = this,
            r = !1
          if (
            ('object' === d.type(arguments[0])
              ? ((i = arguments[0]), (r = arguments[1]), (n = 'multiple'))
              : 'string' === d.type(arguments[0]) &&
                ((i = arguments[0]),
                (s = arguments[1]),
                (r = arguments[2]),
                'responsive' === arguments[0] &&
                'array' === d.type(arguments[1])
                  ? (n = 'responsive')
                  : void 0 !== arguments[1] && (n = 'single')),
            'single' === n)
          )
            o.options[i] = s
          else if ('multiple' === n)
            d.each(i, function (t, e) {
              o.options[t] = e
            })
          else if ('responsive' === n)
            for (e in s)
              if ('array' !== d.type(o.options.responsive))
                o.options.responsive = [s[e]]
              else {
                for (t = o.options.responsive.length - 1; 0 <= t; )
                  o.options.responsive[t].breakpoint === s[e].breakpoint &&
                    o.options.responsive.splice(t, 1),
                    t--
                o.options.responsive.push(s[e])
              }
          r && (o.unload(), o.reinit())
        }),
      (r.prototype.setPosition = function () {
        var t = this
        t.setDimensions(),
          t.setHeight(),
          !1 === t.options.fade
            ? t.setCSS(t.getLeft(t.currentSlide))
            : t.setFade(),
          t.$slider.trigger('setPosition', [t])
      }),
      (r.prototype.setProps = function () {
        var t = this,
          e = document.body.style
        ;(t.positionProp = !0 === t.options.vertical ? 'top' : 'left'),
          'top' === t.positionProp
            ? t.$slider.addClass('slick-vertical')
            : t.$slider.removeClass('slick-vertical'),
          (void 0 === e.WebkitTransition &&
            void 0 === e.MozTransition &&
            void 0 === e.msTransition) ||
            (!0 === t.options.useCSS && (t.cssTransitions = !0)),
          t.options.fade &&
            ('number' == typeof t.options.zIndex
              ? t.options.zIndex < 3 && (t.options.zIndex = 3)
              : (t.options.zIndex = t.defaults.zIndex)),
          void 0 !== e.OTransform &&
            ((t.animType = 'OTransform'),
            (t.transformType = '-o-transform'),
            (t.transitionType = 'OTransition'),
            void 0 === e.perspectiveProperty) &&
            void 0 === e.webkitPerspective &&
            (t.animType = !1),
          void 0 !== e.MozTransform &&
            ((t.animType = 'MozTransform'),
            (t.transformType = '-moz-transform'),
            (t.transitionType = 'MozTransition'),
            void 0 === e.perspectiveProperty) &&
            void 0 === e.MozPerspective &&
            (t.animType = !1),
          void 0 !== e.webkitTransform &&
            ((t.animType = 'webkitTransform'),
            (t.transformType = '-webkit-transform'),
            (t.transitionType = 'webkitTransition'),
            void 0 === e.perspectiveProperty) &&
            void 0 === e.webkitPerspective &&
            (t.animType = !1),
          void 0 !== e.msTransform &&
            ((t.animType = 'msTransform'),
            (t.transformType = '-ms-transform'),
            (t.transitionType = 'msTransition'),
            void 0 === e.msTransform) &&
            (t.animType = !1),
          void 0 !== e.transform &&
            !1 !== t.animType &&
            ((t.animType = 'transform'),
            (t.transformType = 'transform'),
            (t.transitionType = 'transition')),
          (t.transformsEnabled =
            t.options.useTransform && null !== t.animType && !1 !== t.animType)
      }),
      (r.prototype.setSlideClasses = function (t) {
        var e,
          i,
          s,
          n = this,
          o = n.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true')
        n.$slides.eq(t).addClass('slick-current'),
          !0 === n.options.centerMode
            ? ((i = n.options.slidesToShow % 2 == 0 ? 1 : 0),
              (s = Math.floor(n.options.slidesToShow / 2)),
              !0 === n.options.infinite &&
                ((s <= t && t <= n.slideCount - 1 - s
                  ? n.$slides.slice(t - s + i, t + s + 1)
                  : ((e = n.options.slidesToShow + t),
                    o.slice(e - s + 1 + i, e + s + 2))
                )
                  .addClass('slick-active')
                  .attr('aria-hidden', 'false'),
                0 === t
                  ? o
                      .eq(o.length - 1 - n.options.slidesToShow)
                      .addClass('slick-center')
                  : t === n.slideCount - 1 &&
                    o.eq(n.options.slidesToShow).addClass('slick-center')),
              n.$slides.eq(t).addClass('slick-center'))
            : (0 <= t && t <= n.slideCount - n.options.slidesToShow
                ? n.$slides.slice(t, t + n.options.slidesToShow)
                : o.length <= n.options.slidesToShow
                  ? o
                  : ((i = n.slideCount % n.options.slidesToShow),
                    (e =
                      !0 === n.options.infinite
                        ? n.options.slidesToShow + t
                        : t),
                    n.options.slidesToShow == n.options.slidesToScroll &&
                    n.slideCount - t < n.options.slidesToShow
                      ? o.slice(e - (n.options.slidesToShow - i), e + i)
                      : o.slice(e, e + n.options.slidesToShow))
              )
                .addClass('slick-active')
                .attr('aria-hidden', 'false'),
          ('ondemand' !== n.options.lazyLoad &&
            'anticipated' !== n.options.lazyLoad) ||
            n.lazyLoad()
      }),
      (r.prototype.setupInfinite = function () {
        var t,
          e,
          i,
          s = this
        if (
          (!0 === s.options.fade && (s.options.centerMode = !1),
          !0 === s.options.infinite &&
            !1 === s.options.fade &&
            ((e = null), s.slideCount > s.options.slidesToShow))
        ) {
          for (
            i =
              !0 === s.options.centerMode
                ? s.options.slidesToShow + 1
                : s.options.slidesToShow,
              t = s.slideCount;
            t > s.slideCount - i;
            --t
          )
            d(s.$slides[(e = t - 1)])
              .clone(!0)
              .attr('id', '')
              .attr('data-slick-index', e - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass('slick-cloned')
          for (t = 0; t < i + s.slideCount; t += 1)
            (e = t),
              d(s.$slides[e])
                .clone(!0)
                .attr('id', '')
                .attr('data-slick-index', e + s.slideCount)
                .appendTo(s.$slideTrack)
                .addClass('slick-cloned')
          s.$slideTrack
            .find('.slick-cloned')
            .find('[id]')
            .each(function () {
              d(this).attr('id', '')
            })
        }
      }),
      (r.prototype.interrupt = function (t) {
        t || this.autoPlay(), (this.interrupted = t)
      }),
      (r.prototype.selectHandler = function (t) {
        ;(t = d(t.target).is('.slick-slide')
          ? d(t.target)
          : d(t.target).parents('.slick-slide')),
          (t = (t = parseInt(t.attr('data-slick-index'))) || 0)
        this.slideCount <= this.options.slidesToShow
          ? this.slideHandler(t, !1, !0)
          : this.slideHandler(t)
      }),
      (r.prototype.slideHandler = function (t, e, i) {
        var s,
          n,
          o,
          r = this
        ;(e = e || !1),
          (!0 === r.animating && !0 === r.options.waitForAnimate) ||
            (!0 === r.options.fade && r.currentSlide === t) ||
            (!1 === e && r.asNavFor(t),
            (s = t),
            (e = r.getLeft(s)),
            (o = r.getLeft(r.currentSlide)),
            (r.currentLeft = null === r.swipeLeft ? o : r.swipeLeft),
            (!1 === r.options.infinite &&
              !1 === r.options.centerMode &&
              (t < 0 || t > r.getDotCount() * r.options.slidesToScroll)) ||
            (!1 === r.options.infinite &&
              !0 === r.options.centerMode &&
              (t < 0 || t > r.slideCount - r.options.slidesToScroll))
              ? !1 === r.options.fade &&
                ((s = r.currentSlide),
                !0 !== i
                  ? r.animateSlide(o, function () {
                      r.postSlide(s)
                    })
                  : r.postSlide(s))
              : (r.options.autoplay && clearInterval(r.autoPlayTimer),
                (n =
                  s < 0
                    ? r.slideCount % r.options.slidesToScroll != 0
                      ? r.slideCount - (r.slideCount % r.options.slidesToScroll)
                      : r.slideCount + s
                    : s >= r.slideCount
                      ? r.slideCount % r.options.slidesToScroll != 0
                        ? 0
                        : s - r.slideCount
                      : s),
                (r.animating = !0),
                r.$slider.trigger('beforeChange', [r, r.currentSlide, n]),
                (t = r.currentSlide),
                (r.currentSlide = n),
                r.setSlideClasses(r.currentSlide),
                r.options.asNavFor &&
                  (o = (o = r.getNavTarget()).slick('getSlick')).slideCount <=
                    o.options.slidesToShow &&
                  o.setSlideClasses(r.currentSlide),
                r.updateDots(),
                r.updateArrows(),
                !0 === r.options.fade
                  ? (!0 !== i
                      ? (r.fadeSlideOut(t),
                        r.fadeSlide(n, function () {
                          r.postSlide(n)
                        }))
                      : r.postSlide(n),
                    r.animateHeight())
                  : !0 !== i
                    ? r.animateSlide(e, function () {
                        r.postSlide(n)
                      })
                    : r.postSlide(n)))
      }),
      (r.prototype.startLoad = function () {
        var t = this
        !0 === t.options.arrows &&
          t.slideCount > t.options.slidesToShow &&
          (t.$prevArrow.hide(), t.$nextArrow.hide()),
          !0 === t.options.dots &&
            t.slideCount > t.options.slidesToShow &&
            t.$dots.hide(),
          t.$slider.addClass('slick-loading')
      }),
      (r.prototype.swipeDirection = function () {
        var t = this,
          e = t.touchObject.startX - t.touchObject.curX,
          i = t.touchObject.startY - t.touchObject.curY,
          i = Math.atan2(i, e)
        return ((e =
          (e = Math.round((180 * i) / Math.PI)) < 0 ? 360 - Math.abs(e) : e) <=
          45 &&
          0 <= e) ||
          (e <= 360 && 315 <= e)
          ? !1 === t.options.rtl
            ? 'left'
            : 'right'
          : 135 <= e && e <= 225
            ? !1 === t.options.rtl
              ? 'right'
              : 'left'
            : !0 === t.options.verticalSwiping
              ? 35 <= e && e <= 135
                ? 'down'
                : 'up'
              : 'vertical'
      }),
      (r.prototype.swipeEnd = function (t) {
        var e,
          i,
          s = this
        if (((s.dragging = !1), (s.swiping = !1), s.scrolling))
          return (s.scrolling = !1)
        if (
          ((s.interrupted = !1),
          (s.shouldClick = !(10 < s.touchObject.swipeLength)),
          void 0 === s.touchObject.curX)
        )
          return !1
        if (
          (!0 === s.touchObject.edgeHit &&
            s.$slider.trigger('edge', [s, s.swipeDirection()]),
          s.touchObject.swipeLength >= s.touchObject.minSwipe)
        ) {
          switch ((i = s.swipeDirection())) {
            case 'left':
            case 'down':
              ;(e = s.options.swipeToSlide
                ? s.checkNavigable(s.currentSlide + s.getSlideCount())
                : s.currentSlide + s.getSlideCount()),
                (s.currentDirection = 0)
              break
            case 'right':
            case 'up':
              ;(e = s.options.swipeToSlide
                ? s.checkNavigable(s.currentSlide - s.getSlideCount())
                : s.currentSlide - s.getSlideCount()),
                (s.currentDirection = 1)
          }
          'vertical' != i &&
            (s.slideHandler(e),
            (s.touchObject = {}),
            s.$slider.trigger('swipe', [s, i]))
        } else
          s.touchObject.startX !== s.touchObject.curX &&
            (s.slideHandler(s.currentSlide), (s.touchObject = {}))
      }),
      (r.prototype.swipeHandler = function (t) {
        var e = this
        if (
          !(
            !1 === e.options.swipe ||
            ('ontouchend' in document && !1 === e.options.swipe) ||
            (!1 === e.options.draggable && -1 !== t.type.indexOf('mouse'))
          )
        )
          switch (
            ((e.touchObject.fingerCount =
              t.originalEvent && void 0 !== t.originalEvent.touches
                ? t.originalEvent.touches.length
                : 1),
            (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
            !0 === e.options.verticalSwiping &&
              (e.touchObject.minSwipe =
                e.listHeight / e.options.touchThreshold),
            t.data.action)
          ) {
            case 'start':
              e.swipeStart(t)
              break
            case 'move':
              e.swipeMove(t)
              break
            case 'end':
              e.swipeEnd(t)
          }
      }),
      (r.prototype.swipeMove = function (t) {
        var e,
          i,
          s = this,
          n = void 0 !== t.originalEvent ? t.originalEvent.touches : null
        return (
          !(!s.dragging || s.scrolling || (n && 1 !== n.length)) &&
          ((e = s.getLeft(s.currentSlide)),
          (s.touchObject.curX = void 0 !== n ? n[0].pageX : t.clientX),
          (s.touchObject.curY = void 0 !== n ? n[0].pageY : t.clientY),
          (s.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(s.touchObject.curX - s.touchObject.startX, 2)),
          )),
          (n = Math.round(
            Math.sqrt(Math.pow(s.touchObject.curY - s.touchObject.startY, 2)),
          )),
          !s.options.verticalSwiping && !s.swiping && 4 < n
            ? !(s.scrolling = !0)
            : (!0 === s.options.verticalSwiping &&
                (s.touchObject.swipeLength = n),
              (n = s.swipeDirection()),
              void 0 !== t.originalEvent &&
                4 < s.touchObject.swipeLength &&
                ((s.swiping = !0), t.preventDefault()),
              (t =
                (!1 === s.options.rtl ? 1 : -1) *
                (s.touchObject.curX > s.touchObject.startX ? 1 : -1)),
              !0 === s.options.verticalSwiping &&
                (t = s.touchObject.curY > s.touchObject.startY ? 1 : -1),
              (i = s.touchObject.swipeLength),
              (s.touchObject.edgeHit = !1) === s.options.infinite &&
                ((0 === s.currentSlide && 'right' === n) ||
                  (s.currentSlide >= s.getDotCount() && 'left' === n)) &&
                ((i = s.touchObject.swipeLength * s.options.edgeFriction),
                (s.touchObject.edgeHit = !0)),
              !1 === s.options.vertical
                ? (s.swipeLeft = e + i * t)
                : (s.swipeLeft = e + i * (s.$list.height() / s.listWidth) * t),
              !0 === s.options.verticalSwiping && (s.swipeLeft = e + i * t),
              !0 !== s.options.fade &&
                !1 !== s.options.touchMove &&
                (!0 === s.animating
                  ? ((s.swipeLeft = null), !1)
                  : void s.setCSS(s.swipeLeft))))
        )
      }),
      (r.prototype.swipeStart = function (t) {
        var e,
          i = this
        if (
          ((i.interrupted = !0),
          1 !== i.touchObject.fingerCount ||
            i.slideCount <= i.options.slidesToShow)
        )
          return !(i.touchObject = {})
        void 0 !== t.originalEvent &&
          void 0 !== t.originalEvent.touches &&
          (e = t.originalEvent.touches[0]),
          (i.touchObject.startX = i.touchObject.curX =
            void 0 !== e ? e.pageX : t.clientX),
          (i.touchObject.startY = i.touchObject.curY =
            void 0 !== e ? e.pageY : t.clientY),
          (i.dragging = !0)
      }),
      (r.prototype.unfilterSlides = r.prototype.slickUnfilter =
        function () {
          var t = this
          null !== t.$slidesCache &&
            (t.unload(),
            t.$slideTrack.children(this.options.slide).detach(),
            t.$slidesCache.appendTo(t.$slideTrack),
            t.reinit())
        }),
      (r.prototype.unload = function () {
        var t = this
        d('.slick-cloned', t.$slider).remove(),
          t.$dots && t.$dots.remove(),
          t.$prevArrow &&
            t.htmlExpr.test(t.options.prevArrow) &&
            t.$prevArrow.remove(),
          t.$nextArrow &&
            t.htmlExpr.test(t.options.nextArrow) &&
            t.$nextArrow.remove(),
          t.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '')
      }),
      (r.prototype.unslick = function (t) {
        this.$slider.trigger('unslick', [this, t]), this.destroy()
      }),
      (r.prototype.updateArrows = function () {
        var t = this
        Math.floor(t.options.slidesToShow / 2),
          !0 === t.options.arrows &&
            t.slideCount > t.options.slidesToShow &&
            !t.options.infinite &&
            (t.$prevArrow
              .removeClass('slick-disabled')
              .attr('aria-disabled', 'false'),
            t.$nextArrow
              .removeClass('slick-disabled')
              .attr('aria-disabled', 'false'),
            0 === t.currentSlide
              ? (t.$prevArrow
                  .addClass('slick-disabled')
                  .attr('aria-disabled', 'true'),
                t.$nextArrow
                  .removeClass('slick-disabled')
                  .attr('aria-disabled', 'false'))
              : ((t.currentSlide >= t.slideCount - t.options.slidesToShow &&
                  !1 === t.options.centerMode) ||
                  (t.currentSlide >= t.slideCount - 1 &&
                    !0 === t.options.centerMode)) &&
                (t.$nextArrow
                  .addClass('slick-disabled')
                  .attr('aria-disabled', 'true'),
                t.$prevArrow
                  .removeClass('slick-disabled')
                  .attr('aria-disabled', 'false')))
      }),
      (r.prototype.updateDots = function () {
        var t = this
        null !== t.$dots &&
          (t.$dots.find('li').removeClass('slick-active').end(),
          t.$dots
            .find('li')
            .eq(Math.floor(t.currentSlide / t.options.slidesToScroll))
            .addClass('slick-active'))
      }),
      (r.prototype.visibility = function () {
        this.options.autoplay &&
          (document[this.hidden]
            ? (this.interrupted = !0)
            : (this.interrupted = !1))
      }),
      (d.fn.slick = function () {
        for (
          var t,
            e = this,
            i = arguments[0],
            s = Array.prototype.slice.call(arguments, 1),
            n = e.length,
            o = 0;
          o < n;
          o++
        )
          if (
            ('object' == typeof i || void 0 === i
              ? (e[o].slick = new r(e[o], i))
              : (t = e[o].slick[i].apply(e[o].slick, s)),
            void 0 !== t)
          )
            return t
        return e
      })
  })
var $animation_elements = jQuery('[data-animation]'),
  $window = jQuery(window)
function check_if_in_view() {
  var t = $window.height()
  let l = $window.scrollTop(),
    d = l + t
  $animation_elements.each(function () {
    const t = jQuery(this)
    var e = t.outerHeight(),
      i = t.offset().top,
      s = i + e,
      e = 0.75 * e
    const n = t.data('animation'),
      o = t.data('animate')
    var r = Number(t.data('animation-delay') || 0)
    const a = t[0].tl
    i + e <= d && s >= l + e
      ? setTimeout(() => {
          o ? _.animateRun(t, o) : t.addClass('visible ' + n),
            jQuery('.ev-charging-anim').each(function () {
              var t = jQuery(this)
              t.hasClass('visible') &&
                ((t = t.find('rect.ev-charging-rect')),
                t.each(function (t) {
                  var e = jQuery(this),
                    i = parseFloat(e.attr('height'))
                  e.css({ y: 260 + 30 * t, height: i + 20 })
                }))
            }),
            jQuery('.hc-anim').each(function () {
              var t, s
              jQuery(this).hasClass('visible') &&
                ((t = jQuery('rect.hc-rect')),
                (s = [102, 130, 158, 186]),
                t.each(function (t) {
                  var e = jQuery(this),
                    i = parseFloat(e.attr('height'))
                  e.css({ y: s[t], height: i + 20 })
                }))
            }),
            a && a.play()
        }, r)
      : a && 0 < a.progress() && (a.progress(0), a.pause())
  })
}
$window.on('scroll load', check_if_in_view),
  $window.trigger('scroll'),
  jQuery(function () {
    check_if_in_view(), setTimeout(check_if_in_view, 100)
  }),
  jQuery(document).ready(function (e) {
    e('.browse-mobile-btn').on('click', function (t) {
      t.preventDefault(),
        e(this).toggleClass('active'),
        e('.browse-news-form').toggleClass('open')
    })
  })
var DrawSVGPlugin = DrawSVGPlugin || window.DrawSVGPlugin,
  CountUp = CountUp || window.CountUp
function getRandomInt(t, e) {
  return Math.random() * (e - t) + t
}
gsap.registerPlugin(DrawSVGPlugin)
var $drawing = jQuery('[data-animation="ui-drawing"]'),
  $uidot =
    ($drawing.each(function () {
      var t = jQuery(this),
        e = t.find('path'),
        i = gsap.timeline({ paused: !0, delay: 0.05 })
      e.each(function (t) {
        i.fromTo(
          jQuery(this)[0],
          { drawSVG: '0%' },
          { drawSVG: '100%', duration: 0.4, ease: 'power1.out' },
        )
      }),
        (t[0].tl = i)
    }),
    jQuery('[data-animation="ui-svg-dot"]'))
$uidot.each(function () {
  var t = jQuery(this),
    e = t.find('path'),
    i = gsap.timeline({ paused: !0 })
  i.fromTo(
    e[0],
    { drawSVG: '0%', opacity: '0' },
    { drawSVG: '100%', opacity: '1', duration: 0.75, ease: 'power1.out' },
  ),
    i.fromTo(
      e[1],
      { drawSVG: '0%', opacity: '0' },
      { drawSVG: '100%', opacity: '1', duration: 0.5, ease: 'power1.out' },
    ),
    (t[0].tl = i)
}),
  jQuery(document).ready(function (t) {
    t(window).on('load', function () {
      t('.home-banner-iframe').youtube_background({ lazyloading: !1 })
    })
  }),
  document.addEventListener('DOMContentLoaded', function () {
    var t = document.querySelectorAll('.parallax-image img')
    t &&
      t.forEach(function (t) {
        new simpleParallax(t, {
          scale: 1.1,
          delay: 0.2,
          transition: 'cubic-bezier(0, 0, 0, 0.5)',
        })
      })
  }),
  jQuery(document).ready(function (e) {
    const t = e('.header-main')
    var i = e('body.home .banner-section')
    if (i.length) {
      const o = i.offset().top + i.outerHeight(!0)
      window.onscroll = function () {
        window.scrollY >= o ? t.addClass('sticky') : t.removeClass('sticky')
      }
    }
    const s = e('.contact_btn'),
      n =
        (s.on('click', function (t) {
          t.preventDefault(),
            e(this).toggleClass('open'),
            e('.contact_btn_menu').slideToggle(900)
        }),
        e('body').on('click', function (t) {
          e(t.target).closest('.contact_btn, .contact_btn_wrap').length ||
            e('.contact_btn_menu').slideUp()
        }),
        e('.get_quote_flyout').each(function () {
          e(this).on('click', function (t) {
            t.preventDefault(),
              s.removeClass('open'),
              e('body').addClass('open-flyout-bg'),
              e(this).siblings('.flyout-blue-overlay').addClass('open'),
              e(this).siblings('.flyout-form-overlay').addClass('open'),
              e('.contact_btn_menu').slideUp(900)
          })
        }),
        e('.flyout-form-close').each(function () {
          e(this).on('click', function (t) {
            t.preventDefault(),
              e('body').removeClass('open-flyout-bg'),
              e('.flyout-blue-overlay').removeClass('open'),
              e('.flyout-form-overlay').removeClass('open'),
              e('.html').removeClass('scroll-hidden'),
              e('.flyout-overlay').removeClass('scroll-hidden')
          })
        }),
        e('.header-right .get_quote_flyout').on('click', function (t) {
          t.preventDefault(),
            e('body').removeClass('open-flyout-bg'),
            e('html').addClass('scroll-hidden'),
            e('.flyout-overlay').addClass('scroll-hidden')
        }),
        e('.humburger-btn'))
    n.on('click', (t) => {
      t.preventDefault(),
        n.toggleClass('open'),
        s.removeClass('open'),
        e('.header-right .flyout-blue-overlay').toggleClass('open'),
        e('body').toggleClass('nav-overlay-open'),
        e('.contact_btn_menu').slideUp(900),
        e('.header-right .flyout-overlay').toggleClass('open')
    })
    e('.flyout-close').on('click', (t) => {
      t.preventDefault(),
        n.removeClass('open'),
        e('.flyout-blue-overlay').removeClass('open'),
        e('.flyout-overlay').removeClass('open')
    }),
      e('body').on('click', function (t) {
        e(t.target).closest(
          '.humburger-btn, .flyout-overlay, .get_quote_flyout, .flyout-form-overlay, body .selectBox-dropdown, ul.selectBox-dropdown-menu li a',
        ).length ||
          (n.removeClass('open'),
          e('.flyout-blue-overlay').removeClass('open'),
          e('.flyout-overlay').removeClass('open'),
          e('.flyout-form-overlay').removeClass('open'),
          e('body').removeClass('open-flyout-bg'))
      }),
      e('.accordion-header').on('click', function (t) {
        t.preventDefault(),
          e(this).parent().toggleClass('active'),
          e(this).parent().siblings().removeClass('active'),
          e(this)
            .parent()
            .siblings()
            .find('.accordion-header')
            .removeClass('open'),
          e(this).toggleClass('open'),
          e(this).siblings('.accordion-content').slideToggle(500),
          e(this).parent().siblings().find('.accordion-content').slideUp(500)
      })
    ;(i = e('ul.about-partners-tabs li a')),
      e('ul.about-partners-tabs li:first-child a').addClass('active'),
      (tabValue = e('.partners-tab-content').attr('data-tab-value')),
      i.on('click', function (t) {
        t.preventDefault(),
          e(this).addClass('active'),
          e(this).parent().siblings().find('a').removeClass('active')
        ;(t = e(this).attr('data-tab-name')),
          e('.partners-tab-content').hide(),
          e('.partners-tab-content[data-tab-value=' + t + ']').fadeIn(),
          (t = e(this).text()),
          e('.partners-mobile-span').text(t),
          (t = e(this).find('.partners-tab-icon').html())
        e('.all-partners-icon').html(t),
          e('ul.about-partners-tabs').removeClass('open')
      }),
      e('.partners-mobile-btn').on('click', function (t) {
        t.preventDefault(), e('ul.about-partners-tabs').toggleClass('open')
      }),
      (i = e('ul.faq-tabs li a'))
    e('ul.faq-tabs li:first-child a').addClass('active'),
      (tabValue = e('.partners-tab-content').attr('data-tab-value')),
      i.on('click', function (t) {
        t.preventDefault(),
          e(this).addClass('active'),
          e(this).parent().siblings().find('a').removeClass('active')
        ;(t = e(this).attr('data-name')),
          e('.faq-tab-content').hide(),
          e('.faq-tab-content[data-value=' + t + ']').fadeIn(),
          (t = e(this).text()),
          e('.faqs-mobile-span').text(t),
          (t = e(this).find('.faq-tabs-icon').html())
        e('.faqs-mobile-icon').html(t), e('ul.faq-tabs').removeClass('open')
      }),
      e('.faqs-mobile-btn').on('click', function (t) {
        t.preventDefault(), e('ul.faq-tabs').toggleClass('open')
      }),
      e(window).width() <= 1023 &&
        e('ul.flyout-menu > li.menu-item-has-children > a').on(
          'click',
          function (t) {
            t.preventDefault(),
              e(this)
                .parent('li')
                .siblings()
                .children('a')
                .removeClass('active'),
              e(this).toggleClass('active'),
              e(this).parent('li').siblings().children('ul').slideUp(900),
              e(this).siblings('ul').slideToggle(900)
          },
        ),
      e('.leaderships-mask').hover(
        function () {
          e(this).removeClass('out').addClass('over')
        },
        function () {
          e(this).removeClass('over').addClass('out')
        },
      )
  }),
  jQuery(document).ready(function (t) {
    t('select').selectBox({
      keepInViewport: !1,
      menuSpeed: 'slow',
      mobile: !0,
      hideOnWindowScroll: !0,
    }),
      t('.selectBox, .selectBox-dropdown .selectBox-label').removeAttr('style')
  }),
  jQuery(function (t) {
    function i() {
      t('.mfp-wrap').on('scroll', function () {
        new SelectBox(t('select'), (settings = {})).hideMenus()
      })
    }
    i(),
      new MutationObserver(function (t) {
        for (var e of t) 'childList' === e.type && i()
      }).observe(document.body, { childList: !0, subtree: !0 })
  }),
  jQuery(document).ready(function (t) {
    t('.free-steps-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: !0,
      autoplay: !0,
      autoplaySpeed: 3e3,
      speed: 1500,
      arrows: !0,
      prevArrow:
        '<div class="slick-arrow slick-prev step-slick-arrow flex flex-center"><span class="fa-solid fa-arrow-left"></span></div>',
      nextArrow:
        '<div class="slick-arrow slick-next step-slick-arrow flex flex-center"><span class="fa-solid fa-arrow-right"></span></div>',
      dots: !1,
    }),
      t('.partner-logos-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: !0,
        prevArrow:
          '<div class="slick-arrow slick-prev button btn-green flex flex-center"><span class="fa-regular fa-arrow-left"></span></div>',
        nextArrow:
          '<div class="slick-arrow slick-next button btn-green flex flex-center"><span class="fa-regular fa-arrow-right"></span></div>',
        dots: !1,
        infinite: !1,
        speed: 1e3,
        variableWidth: !0,
        responsive: [
          {
            breakpoint: 1299,
            settings: { slidesToShow: 3, slidesToScroll: 1 },
          },
          {
            breakpoint: 1023,
            settings: { slidesToShow: 2, slidesToScroll: 1 },
          },
          {
            breakpoint: 739,
            settings: { slidesToShow: 1, slidesToScroll: 1, dots: !0 },
          },
        ],
      }),
      t('.timeline-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: !0,
        prevArrow:
          '<div class="slick-arrow slick-prev button btn-green flex flex-center"><span class="fa-regular fa-arrow-left"></span></div>',
        nextArrow:
          '<div class="slick-arrow slick-next button btn-green flex flex-center"><span class="fa-regular fa-arrow-right"></span></div>',
        dots: !1,
        infinite: !1,
        speed: 1e3,
        variableWidth: !0,
        swipeToSlide: !0,
        touchThreshold: 200,
        rtl: !1,
        responsive: [
          {
            breakpoint: 1299,
            settings: { slidesToShow: 2, slidesToScroll: 1 },
          },
          {
            breakpoint: 739,
            settings: { slidesToShow: 1, slidesToScroll: 1, dots: !0 },
          },
        ],
      })
  }),
  jQuery(document).ready(function (e) {
    var t = e('.explore-icons-list')
    e('.explore-icons-list:first').addClass('active'),
      t.on('click', function (t) {
        t.preventDefault(),
          (_self = e(this)).addClass('active'),
          _self.siblings().removeClass('active')
        t = _self.data('name')
        e('.explore-slider-text[data-text=' + t + ']').addClass('active'),
          e('.explore-slider-image').hide(),
          e('.explore-slider-image[data-value=' + t + ']').fadeIn(800),
          e('.explore-slider-text').hide(),
          e('.explore-slider-text[data-text=' + t + ']').fadeIn(100)
      })
  }),
  jQuery(document).ready(function (n) {
    n(
      'body .free-steps-text .frm_forms .frm_form_fields .frm_form_field .frm_checkbox input[type=checkbox]',
    ).on('click', function (t) {
      const e = n(this)
      e.parent().addClass('open'),
        e.parent().parent().siblings().find('label').removeClass('open'),
        setTimeout(function () {
          e.parents()
            .siblings('.frm_checkbox')
            .find('input')
            .prop('disabled', !1)
            .prop('checked', !1)
        }, 100),
        e.removeAttr('disabled').prop('checked', !0)
      var i = n(this).prop('checked'),
        s = n(this).closest('.frm_form_field')
      i && s.removeClass('frm_blank_field')
    }),
      n(
        'body .free-steps-text .frm_forms .frm_form_fields .frm_form_field#frm_field_65_container .frm_checkbox input[type=checkbox]:not(#field_xxesr-3)',
      ).on('click', function (t) {
        n('#frm_field_90_container').fadeOut('slow')
      }),
      n(
        'body .free-steps-text .frm_forms .frm_form_fields .frm_form_field#frm_field_65_container .frm_checkbox input[type=checkbox]#field_xxesr-3',
      ).on('click', function (t) {
        n('#frm_field_90_container').fadeIn('slow')
      }),
      n(
        'body .free-steps-text .frm_forms .frm_form_fields .frm_form_field#frm_field_67_container .frm_checkbox input[type=checkbox]:not(#field_d83cb-2)',
      ).on('click', function (t) {
        n('#frm_field_91_container').fadeOut('slow')
      }),
      n(
        'body .free-steps-text .frm_forms .frm_form_fields .frm_form_field#frm_field_67_container .frm_checkbox input[type=checkbox]#field_d83cb-2',
      ).on('click', function (t) {
        n('#frm_field_91_container').fadeIn('slow')
      }),
      n(
        'body .free-steps-text .frm_forms .frm_form_fields .frm_form_field#frm_field_68_container .frm_checkbox input[type=checkbox]:not(#field_5pmmi-4)',
      ).on('click', function (t) {
        n('#frm_field_92_container').fadeOut('slow')
      }),
      n(
        'body .free-steps-text .frm_forms .frm_form_fields .frm_form_field#frm_field_68_container .frm_checkbox input[type=checkbox]#field_5pmmi-4',
      ).on('click', function (t) {
        n('#frm_field_92_container').fadeIn('slow')
      }),
      n(
        '.free-steps-text .frm_forms .frm_form_fields .frm_form_field .frm_checkbox input[type=checkbox]:checked',
      ).each(function () {
        const t = n(this)
        var e = n(this).prop('checked'),
          i = n(this).closest('.frm_form_field')
        e && i.removeClass('frm_blank_field'),
          t.parent().addClass('open'),
          t.parent().parent().siblings().find('label').removeClass('open'),
          setTimeout(function () {
            t.parents()
              .siblings('.frm_checkbox')
              .find('input')
              .prop('disabled', !1)
              .prop('checked', !1)
          }, 100)
      }),
      n(
        'body .free-steps-text .frm_forms .frm_form_fields .frm_form_field .frm_checkbox#frm_checkbox_69-0 input[type=checkbox]',
      ).on('click', function () {
        var t = n(this).prop('checked'),
          e = n('.frm_button_submit')
        t && e.text('submit')
      }),
      n(
        'body .free-steps-text .frm_forms .frm_form_fields .frm_form_field .frm_checkbox#frm_checkbox_69-1 input[type=checkbox]',
      ).on('click', function () {
        var t = n(this).prop('checked'),
          e = n('.frm_button_submit')
        t && e.text('next')
      }),
      n(
        'body .free-steps-text .frm_forms .frm_form_fields .frm_submit button[type="submit"].frm_prev_page',
      ).text('Back'),
      n(
        'body .free-steps-text .frm_forms .frm_form_fields .frm_form_field input',
      ).on('input', function () {
        var t = n(this)
        '' !== t.val().trim()
          ? t.siblings('.frm_error').addClass('hide-error-message')
          : t.siblings('.frm_error').removeClass('hide-error-message')
      }),
      n(
        'body .free-steps-text .frm_forms .frm_form_fields .frm_form_field input',
      ).each(function () {
        '' !== n(this).val().trim() && n(this).trigger('input')
      })
  }),
  jQuery(document).ready(function (t) {
    t('.free-steps-repeat').each(function () {
      const s = t(this).children('.free-steps-image'),
        n = t('.tooltip-main')
      s.on('mouseenter mousemove', function (t) {
        n.fadeIn(),
          (_tooltipHeight = n.outerHeight(!0)),
          (_tooltipWidth = n.width())
        var e = s.offset(),
          i = t.pageY - e.top,
          t = t.pageX - e.left
        n.css({ top: i - 180, left: t - 104 })
      }),
        s.on('mouseleave', function () {
          n.fadeOut()
        }),
        n.on('mouseenter', function () {
          n.stop(!0, !0).show()
        })
    })
  }),
  jQuery(document).ready(function (t) {
    var e, i
    t('.popup-youtube').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-video',
      removalDelay: 160,
      preloader: !1,
      fixedContentPos: !0,
      iframe: {
        patterns: {
          youtube: {
            index: 'youtube.com/',
            id: 'v=',
            src:
              ((e =
                /Chrome/.test(navigator.userAgent) &&
                /Google Inc/.test(navigator.vendor)),
              (i = 'https://www.youtube.com/embed/%id%?autoplay=1&rel=0'),
              e ? i + '&mute=1' : i),
          },
        },
      },
    }),
      t('.popup-video').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-video',
        removalDelay: 160,
        preloader: !1,
        fixedContentPos: !0,
      }),
      t('.popup-modal').magnificPopup({
        type: 'inline',
        fixedContentPos: !0,
        fixedBgPos: !0,
        overflowY: 'auto',
        preloader: !1,
        removalDelay: 160,
        mainClass: 'my-mfp-slide-top',
      })
  }),
  jQuery(document).ready(function (n) {
    n('.our-approach-links li:first-child').addClass('open-approach'),
      n('.our-approach-links li:first-child a').addClass('active'),
      n('.our-approach-main').each(function () {
        const i = n(this),
          s = i.find('.our-approach-link')
        s.on('click', function (t) {
          t.preventDefault()
          var t = n(this),
            e =
              (t.parent().siblings('li').find('a').removeClass('active'),
              t.toggleClass('active'),
              s.index(this))
          i.find('.approach-slider-for').slick('slickGoTo', e),
            t.parent().siblings().removeClass('open-approach'),
            t.parent().siblings().find('.our-approach-mobile').slideUp(900),
            t.siblings('.our-approach-mobile').slideToggle(900)
        }),
          i.find('.approach-slider-for').slick({
            slidesToScroll: 1,
            adaptiveHeight: !0,
            arrows: !1,
            fade: !0,
            asNavFor: i.find('.approach-slider-nav'),
          }),
          i.find('.approach-slider-nav').slick({
            slidesToShow: 1,
            adaptiveHeight: !0,
            fade: !0,
            arrows: !1,
            asNavFor: i.find('.approach-slider-for'),
          })
      })
  }),
  jQuery(document).ready(function (i) {
    i('.about-partner-logos').each(function () {
      var t = i(this)
      const e = t.children('.about-partner-logo')
      16 <= e.length &&
        (t
          .parent()
          .append(
            "<div class='partner-show-btn'><a class='partner-logo-btn button btn-md btn-gray down-arrow'>Show all partners</a></div>",
          ),
        i('.partner-logo-btn').on('click', function (t) {
          t.preventDefault(),
            e.slice(15).fadeToggle('fast'),
            i(this).text(
              'Show all partners' == i(this).text()
                ? 'Show Less partners'
                : 'Show all partners',
            )
        }))
    })
  }),
  jQuery(document).ready(function (n) {
    const s = n('.process-slider-for')
    var t = n('.process-slider-nav')
    1024 <= n(window).width()
      ? (s.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: !0,
          cssEase: 'ease',
          arrows: !1,
          dots: !0,
          appendDots: n("<div class='process-slider-nav'></div>"),
        }),
        n('.p-slick-dot[data-slide="0"]').addClass(
          'slick-current slick-first-slide',
        ),
        s.on('beforeChange', function (t, e, i, s) {
          i = i < s ? 'moveRightSlide' : 'moveLeftSlide'
          n('.p-slick-dot[data-slide="' + s + '"]')
            .find('.process-slider-content')
            .removeClass('moveLeftSlide moveRightSlide'),
            n('.p-slick-dot[data-slide="' + s + '"]')
              .find('.process-slider-content')
              .addClass(i)
        }),
        s.on('afterChange', function (t, e, i, s) {
          n('.p-slick-dot').removeClass('slick-current'),
            n('.p-slick-dot[data-slide="' + i + '"]').addClass('slick-current'),
            n('.process-num').fadeIn(1e3),
            n('.p-slick-dot[data-slide="' + i + '"]')
              .find('.process-num')
              .fadeOut(1e3)
        }),
        n('[data-slide]').on('click', function (t) {
          t.preventDefault()
          t = n(this).data('slide')
          s.slick('slickGoTo', t)
        }),
        n('.p-slick-arrow').on('click', function (t) {
          t.preventDefault()
          var e,
            t = s.slick('slickCurrentSlide'),
            i = s.slick('getSlick').slideCount - 1
          n(this).hasClass('p-slick-next')
            ? (e = t + 1) <= i &&
              (s.slick('slickGoTo', e),
              n(this).closest('.p-slick-dot').find('.process-num').fadeIn(2e3),
              n(this)
                .closest('.p-slick-dot')
                .next('.p-slick-dot')
                .find('.process-num')
                .fadeOut(1e3),
              n(this)
                .closest('.p-slick-dot')
                .next('.p-slick-dot')
                .find('.process-slider-content')
                .addClass('moveRightSlide')
                .removeClass('moveLeftSlide'),
              e === i) &&
              n(this)
                .closest('.p-slick-dot')
                .next('.p-slick-dot')
                .addClass('slick-last-slide')
            : n(this).hasClass('p-slick-prev') &&
              0 <= (e = t - 1) &&
              (s.slick('slickGoTo', e),
              n(this).closest('.p-slick-dot').find('.process-num').fadeIn(2e3),
              n(this)
                .closest('.p-slick-dot')
                .prev('.p-slick-dot')
                .find('.process-num')
                .fadeOut(1e3),
              n(this)
                .closest('.p-slick-dot')
                .prev('.p-slick-dot')
                .find('.process-slider-content')
                .addClass('moveLeftSlide')
                .removeClass('moveRightSlide'),
              0 == e) &&
              n(this)
                .closest('.p-slick-dot')
                .prev('.p-slick-dot')
                .addClass('slick-first-slide')
        }))
      : (s.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: !0,
          cssEase: 'ease',
          arrows: !1,
          dots: !1,
          swipeToSlide: !0,
          focusOnSelect: !0,
          asNavFor: t,
        }),
        t.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 1500,
          swipeToSlide: !0,
          focusOnSelect: !0,
          dots: !1,
          arrows: !0,
          prevArrow:
            '<div class="slick-arrow slick-prev button btn-green flex flex-center"><span class="fa-regular fa-arrow-left"></span></div>',
          nextArrow:
            '<div class="slick-arrow slick-next button btn-green flex flex-center"><span class="fa-regular fa-arrow-right"></span></div>',
          asNavFor: s,
          responsive: [{ breakpoint: 739, settings: { dots: !0 } }],
        }))
  })
