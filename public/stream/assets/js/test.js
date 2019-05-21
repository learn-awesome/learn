!function (e, t) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document) throw new Error("jQuery requires a window with a document");
    return t(e)
  } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
  "use strict";

  function i(e, t) {
    var i = (t = t || U).createElement("script");
    i.text = e, t.head.appendChild(i).parentNode.removeChild(i)
  }

  function n(e) {
    var t = !!e && "length" in e && e.length, i = re.type(e);
    return "function" !== i && !re.isWindow(e) && ("array" === i || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
  }

  function s(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
  }

  function o(e, t, i) {
    return re.isFunction(t) ? re.grep(e, function (e, n) {
      return !!t.call(e, n, e) !== i
    }) : t.nodeType ? re.grep(e, function (e) {
      return e === t !== i
    }) : "string" != typeof t ? re.grep(e, function (e) {
      return ee.call(t, e) > -1 !== i
    }) : ve.test(t) ? re.filter(t, e, i) : (t = re.filter(t, e), re.grep(e, function (e) {
      return ee.call(t, e) > -1 !== i && 1 === e.nodeType
    }))
  }

  function a(e, t) {
    for (; (e = e[t]) && 1 !== e.nodeType;) ;
    return e
  }

  function r(e) {
    return e
  }

  function l(e) {
    throw e
  }

  function c(e, t, i, n) {
    var s;
    try {
      e && re.isFunction(s = e.promise) ? s.call(e).done(t).fail(i) : e && re.isFunction(s = e.then) ? s.call(e, t, i) : t.apply(void 0, [e].slice(n))
    } catch (e) {
      i.apply(void 0, [e])
    }
  }

  function u() {
    U.removeEventListener("DOMContentLoaded", u), e.removeEventListener("load", u), re.ready()
  }

  function d() {
    this.expando = re.expando + d.uid++
  }

  function h(e, t, i) {
    var n;
    if (void 0 === i && 1 === e.nodeType) if (n = "data-" + t.replace(Ie, "-$&").toLowerCase(), "string" == typeof(i = e.getAttribute(n))) {
      try {
        i = function (e) {
          return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Pe.test(e) ? JSON.parse(e) : e)
        }(i)
      } catch (e) {
      }
      Me.set(e, t, i)
    } else i = void 0;
    return i
  }

  function p(e, t, i, n) {
    var s, o = 1, a = 20, r = n ? function () {
        return n.cur()
      } : function () {
        return re.css(e, t, "")
      }, l = r(), c = i && i[3] || (re.cssNumber[t] ? "" : "px"),
      u = (re.cssNumber[t] || "px" !== c && +l) && ze.exec(re.css(e, t));
    if (u && u[3] !== c) {
      c = c || u[3], i = i || [], u = +l || 1;
      do {
        o = o || ".5", u /= o, re.style(e, t, u + c)
      } while (o !== (o = r() / l) && 1 !== o && --a)
    }
    return i && (u = +u || +l || 0, s = i[1] ? u + (i[1] + 1) * i[2] : +i[2], n && (n.unit = c, n.start = u, n.end = s)), s
  }

  function f(e) {
    var t, i = e.ownerDocument, n = e.nodeName, s = Oe[n];
    return s || (t = i.body.appendChild(i.createElement(n)), s = re.css(t, "display"), t.parentNode.removeChild(t), "none" === s && (s = "block"), Oe[n] = s, s)
  }

  function m(e, t) {
    for (var i, n, s = [], o = 0, a = e.length; o < a; o++) (n = e[o]).style && (i = n.style.display, t ? ("none" === i && (s[o] = _e.get(n, "display") || null, s[o] || (n.style.display = "")), "" === n.style.display && De(n) && (s[o] = f(n))) : "none" !== i && (s[o] = "none", _e.set(n, "display", i)));
    for (o = 0; o < a; o++) null != s[o] && (e[o].style.display = s[o]);
    return e
  }

  function g(e, t) {
    var i;
    return i = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && s(e, t) ? re.merge([e], i) : i
  }

  function v(e, t) {
    for (var i = 0, n = e.length; i < n; i++) _e.set(e[i], "globalEval", !t || _e.get(t[i], "globalEval"))
  }

  function y(e, t, i, n, s) {
    for (var o, a, r, l, c, u, d = t.createDocumentFragment(), h = [], p = 0, f = e.length; p < f; p++) if ((o = e[p]) || 0 === o) if ("object" === re.type(o)) re.merge(h, o.nodeType ? [o] : o); else if (Ne.test(o)) {
      for (a = a || d.appendChild(t.createElement("div")), r = (Be.exec(o) || ["", ""])[1].toLowerCase(), l = He[r] || He._default, a.innerHTML = l[1] + re.htmlPrefilter(o) + l[2], u = l[0]; u--;) a = a.lastChild;
      re.merge(h, a.childNodes), (a = d.firstChild).textContent = ""
    } else h.push(t.createTextNode(o));
    for (d.textContent = "", p = 0; o = h[p++];) if (n && re.inArray(o, n) > -1) s && s.push(o); else if (c = re.contains(o.ownerDocument, o), a = g(d.appendChild(o), "script"), c && v(a), i) for (u = 0; o = a[u++];) Fe.test(o.type || "") && i.push(o);
    return d
  }

  function b() {
    return !0
  }

  function x() {
    return !1
  }

  function w() {
    try {
      return U.activeElement
    } catch (e) {
    }
  }

  function S(e, t, i, n, s, o) {
    var a, r;
    if ("object" == typeof t) {
      "string" != typeof i && (n = n || i, i = void 0);
      for (r in t) S(e, r, i, n, t[r], o);
      return e
    }
    if (null == n && null == s ? (s = i, n = i = void 0) : null == s && ("string" == typeof i ? (s = n, n = void 0) : (s = n, n = i, i = void 0)), !1 === s) s = x; else if (!s) return e;
    return 1 === o && (a = s, s = function (e) {
      return re().off(e), a.apply(this, arguments)
    }, s.guid = a.guid || (a.guid = re.guid++)), e.each(function () {
      re.event.add(this, t, s, n, i)
    })
  }

  function C(e, t) {
    return s(e, "table") && s(11 !== t.nodeType ? t : t.firstChild, "tr") ? re(">tbody", e)[0] || e : e
  }

  function T(e) {
    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
  }

  function E(e) {
    var t = Ue.exec(e.type);
    return t ? e.type = t[1] : e.removeAttribute("type"), e
  }

  function k(e, t) {
    var i, n, s, o, a, r, l, c;
    if (1 === t.nodeType) {
      if (_e.hasData(e) && (o = _e.access(e), a = _e.set(t, o), c = o.events)) {
        delete a.handle, a.events = {};
        for (s in c) for (i = 0, n = c[s].length; i < n; i++) re.event.add(t, s, c[s][i])
      }
      Me.hasData(e) && (r = Me.access(e), l = re.extend({}, r), Me.set(t, l))
    }
  }

  function _(e, t) {
    var i = t.nodeName.toLowerCase();
    "input" === i && je.test(e.type) ? t.checked = e.checked : "input" !== i && "textarea" !== i || (t.defaultValue = e.defaultValue)
  }

  function M(e, t, n, s) {
    t = Z.apply([], t);
    var o, a, r, l, c, u, d = 0, h = e.length, p = h - 1, f = t[0], m = re.isFunction(f);
    if (m || h > 1 && "string" == typeof f && !ae.checkClone && Ge.test(f)) return e.each(function (i) {
      var o = e.eq(i);
      m && (t[0] = f.call(this, i, o.html())), M(o, t, n, s)
    });
    if (h && (o = y(t, e[0].ownerDocument, !1, e, s), a = o.firstChild, 1 === o.childNodes.length && (o = a), a || s)) {
      for (l = (r = re.map(g(o, "script"), T)).length; d < h; d++) c = o, d !== p && (c = re.clone(c, !0, !0), l && re.merge(r, g(c, "script"))), n.call(e[d], c, d);
      if (l) for (u = r[r.length - 1].ownerDocument, re.map(r, E), d = 0; d < l; d++) c = r[d], Fe.test(c.type || "") && !_e.access(c, "globalEval") && re.contains(u, c) && (c.src ? re._evalUrl && re._evalUrl(c.src) : i(c.textContent.replace(Qe, ""), u))
    }
    return e
  }

  function P(e, t, i) {
    for (var n, s = t ? re.filter(t, e) : e, o = 0; null != (n = s[o]); o++) i || 1 !== n.nodeType || re.cleanData(g(n)), n.parentNode && (i && re.contains(n.ownerDocument, n) && v(g(n, "script")), n.parentNode.removeChild(n));
    return e
  }

  function I(e, t, i) {
    var n, s, o, a, r = e.style;
    return (i = i || Je(e)) && ("" !== (a = i.getPropertyValue(t) || i[t]) || re.contains(e.ownerDocument, e) || (a = re.style(e, t)), !ae.pixelMarginRight() && Ze.test(a) && Ke.test(t) && (n = r.width, s = r.minWidth, o = r.maxWidth, r.minWidth = r.maxWidth = r.width = a, a = i.width, r.width = n, r.minWidth = s, r.maxWidth = o)), void 0 !== a ? a + "" : a
  }

  function L(e, t) {
    return {
      get: function () {
        return e() ? void delete this.get : (this.get = t).apply(this, arguments)
      }
    }
  }

  function z(e) {
    var t = re.cssProps[e];
    return t || (t = re.cssProps[e] = function (e) {
      if (e in ot) return e;
      for (var t = e[0].toUpperCase() + e.slice(1), i = st.length; i--;) if ((e = st[i] + t) in ot) return e
    }(e) || e), t
  }

  function A(e, t, i) {
    var n = ze.exec(t);
    return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : t
  }

  function D(e, t, i, n, s) {
    var o, a = 0;
    for (o = i === (n ? "border" : "content") ? 4 : "width" === t ? 1 : 0; o < 4; o += 2) "margin" === i && (a += re.css(e, i + Ae[o], !0, s)), n ? ("content" === i && (a -= re.css(e, "padding" + Ae[o], !0, s)), "margin" !== i && (a -= re.css(e, "border" + Ae[o] + "Width", !0, s))) : (a += re.css(e, "padding" + Ae[o], !0, s), "padding" !== i && (a += re.css(e, "border" + Ae[o] + "Width", !0, s)));
    return a
  }

  function $(e, t, i) {
    var n, s = Je(e), o = I(e, t, s), a = "border-box" === re.css(e, "boxSizing", !1, s);
    return Ze.test(o) ? o : (n = a && (ae.boxSizingReliable() || o === e.style[t]), "auto" === o && (o = e["offset" + t[0].toUpperCase() + t.slice(1)]), (o = parseFloat(o) || 0) + D(e, t, i || (a ? "border" : "content"), n, s) + "px")
  }

  function O(e, t, i, n, s) {
    return new O.prototype.init(e, t, i, n, s)
  }

  function j() {
    rt && (!1 === U.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(j) : e.setTimeout(j, re.fx.interval), re.fx.tick())
  }

  function B() {
    return e.setTimeout(function () {
      at = void 0
    }), at = re.now()
  }

  function F(e, t) {
    var i, n = 0, s = {height: e};
    for (t = t ? 1 : 0; n < 4; n += 2 - t) i = Ae[n], s["margin" + i] = s["padding" + i] = e;
    return t && (s.opacity = s.width = e), s
  }

  function H(e, t, i) {
    for (var n, s = (N.tweeners[t] || []).concat(N.tweeners["*"]), o = 0, a = s.length; o < a; o++) if (n = s[o].call(i, t, e)) return n
  }

  function N(e, t, i) {
    var n, s, o = 0, a = N.prefilters.length, r = re.Deferred().always(function () {
      delete l.elem
    }), l = function () {
      if (s) return !1;
      for (var t = at || B(), i = Math.max(0, c.startTime + c.duration - t), n = 1 - (i / c.duration || 0), o = 0, a = c.tweens.length; o < a; o++) c.tweens[o].run(n);
      return r.notifyWith(e, [c, n, i]), n < 1 && a ? i : (a || r.notifyWith(e, [c, 1, 0]), r.resolveWith(e, [c]), !1)
    }, c = r.promise({
      elem: e,
      props: re.extend({}, t),
      opts: re.extend(!0, {specialEasing: {}, easing: re.easing._default}, i),
      originalProperties: t,
      originalOptions: i,
      startTime: at || B(),
      duration: i.duration,
      tweens: [],
      createTween: function (t, i) {
        var n = re.Tween(e, c.opts, t, i, c.opts.specialEasing[t] || c.opts.easing);
        return c.tweens.push(n), n
      },
      stop: function (t) {
        var i = 0, n = t ? c.tweens.length : 0;
        if (s) return this;
        for (s = !0; i < n; i++) c.tweens[i].run(1);
        return t ? (r.notifyWith(e, [c, 1, 0]), r.resolveWith(e, [c, t])) : r.rejectWith(e, [c, t]), this
      }
    }), u = c.props;
    for (function (e, t) {
      var i, n, s, o, a;
      for (i in e) if (n = re.camelCase(i), s = t[n], o = e[i], Array.isArray(o) && (s = o[1], o = e[i] = o[0]), i !== n && (e[n] = o, delete e[i]), (a = re.cssHooks[n]) && "expand" in a) {
        o = a.expand(o), delete e[n];
        for (i in o) i in e || (e[i] = o[i], t[i] = s)
      } else t[n] = s
    }(u, c.opts.specialEasing); o < a; o++) if (n = N.prefilters[o].call(c, e, u, c.opts)) return re.isFunction(n.stop) && (re._queueHooks(c.elem, c.opts.queue).stop = re.proxy(n.stop, n)), n;
    return re.map(u, H, c), re.isFunction(c.opts.start) && c.opts.start.call(e, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), re.fx.timer(re.extend(l, {
      elem: e,
      anim: c,
      queue: c.opts.queue
    })), c
  }

  function R(e) {
    return (e.match(Se) || []).join(" ")
  }

  function q(e) {
    return e.getAttribute && e.getAttribute("class") || ""
  }

  function W(e, t, i, n) {
    var s;
    if (Array.isArray(t)) re.each(t, function (t, s) {
      i || bt.test(e) ? n(e, s) : W(e + "[" + ("object" == typeof s && null != s ? t : "") + "]", s, i, n)
    }); else if (i || "object" !== re.type(t)) n(e, t); else for (s in t) W(e + "[" + s + "]", t[s], i, n)
  }

  function X(e) {
    return function (t, i) {
      "string" != typeof t && (i = t, t = "*");
      var n, s = 0, o = t.toLowerCase().match(Se) || [];
      if (re.isFunction(i)) for (; n = o[s++];) "+" === n[0] ? (n = n.slice(1) || "*", (e[n] = e[n] || []).unshift(i)) : (e[n] = e[n] || []).push(i)
    }
  }

  function Y(e, t, i, n) {
    function s(r) {
      var l;
      return o[r] = !0, re.each(e[r] || [], function (e, r) {
        var c = r(t, i, n);
        return "string" != typeof c || a || o[c] ? a ? !(l = c) : void 0 : (t.dataTypes.unshift(c), s(c), !1)
      }), l
    }

    var o = {}, a = e === It;
    return s(t.dataTypes[0]) || !o["*"] && s("*")
  }

  function V(e, t) {
    var i, n, s = re.ajaxSettings.flatOptions || {};
    for (i in t) void 0 !== t[i] && ((s[i] ? e : n || (n = {}))[i] = t[i]);
    return n && re.extend(!0, e, n), e
  }

  var G = [], U = e.document, Q = Object.getPrototypeOf, K = G.slice, Z = G.concat, J = G.push, ee = G.indexOf, te = {},
    ie = te.toString, ne = te.hasOwnProperty, se = ne.toString, oe = se.call(Object), ae = {}, re = function (e, t) {
      return new re.fn.init(e, t)
    }, le = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ce = /^-ms-/, ue = /-([a-z])/g, de = function (e, t) {
      return t.toUpperCase()
    };
  re.fn = re.prototype = {
    jquery: "3.2.1", constructor: re, length: 0, toArray: function () {
      return K.call(this)
    }, get: function (e) {
      return null == e ? K.call(this) : e < 0 ? this[e + this.length] : this[e]
    }, pushStack: function (e) {
      var t = re.merge(this.constructor(), e);
      return t.prevObject = this, t
    }, each: function (e) {
      return re.each(this, e)
    }, map: function (e) {
      return this.pushStack(re.map(this, function (t, i) {
        return e.call(t, i, t)
      }))
    }, slice: function () {
      return this.pushStack(K.apply(this, arguments))
    }, first: function () {
      return this.eq(0)
    }, last: function () {
      return this.eq(-1)
    }, eq: function (e) {
      var t = this.length, i = +e + (e < 0 ? t : 0);
      return this.pushStack(i >= 0 && i < t ? [this[i]] : [])
    }, end: function () {
      return this.prevObject || this.constructor()
    }, push: J, sort: G.sort, splice: G.splice
  }, re.extend = re.fn.extend = function () {
    var e, t, i, n, s, o, a = arguments[0] || {}, r = 1, l = arguments.length, c = !1;
    for ("boolean" == typeof a && (c = a, a = arguments[r] || {}, r++), "object" == typeof a || re.isFunction(a) || (a = {}), r === l && (a = this, r--); r < l; r++) if (null != (e = arguments[r])) for (t in e) i = a[t], n = e[t], a !== n && (c && n && (re.isPlainObject(n) || (s = Array.isArray(n))) ? (s ? (s = !1, o = i && Array.isArray(i) ? i : []) : o = i && re.isPlainObject(i) ? i : {}, a[t] = re.extend(c, o, n)) : void 0 !== n && (a[t] = n));
    return a
  }, re.extend({
    expando: "jQuery" + ("3.2.1" + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
      throw new Error(e)
    }, noop: function () {
    }, isFunction: function (e) {
      return "function" === re.type(e)
    }, isWindow: function (e) {
      return null != e && e === e.window
    }, isNumeric: function (e) {
      var t = re.type(e);
      return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }, isPlainObject: function (e) {
      var t, i;
      return !(!e || "[object Object]" !== ie.call(e) || (t = Q(e)) && ("function" != typeof(i = ne.call(t, "constructor") && t.constructor) || se.call(i) !== oe))
    }, isEmptyObject: function (e) {
      var t;
      for (t in e) return !1;
      return !0
    }, type: function (e) {
      return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? te[ie.call(e)] || "object" : typeof e
    }, globalEval: function (e) {
      i(e)
    }, camelCase: function (e) {
      return e.replace(ce, "ms-").replace(ue, de)
    }, each: function (e, t) {
      var i, s = 0;
      if (n(e)) for (i = e.length; s < i && !1 !== t.call(e[s], s, e[s]); s++) ; else for (s in e) if (!1 === t.call(e[s], s, e[s])) break;
      return e
    }, trim: function (e) {
      return null == e ? "" : (e + "").replace(le, "")
    }, makeArray: function (e, t) {
      var i = t || [];
      return null != e && (n(Object(e)) ? re.merge(i, "string" == typeof e ? [e] : e) : J.call(i, e)), i
    }, inArray: function (e, t, i) {
      return null == t ? -1 : ee.call(t, e, i)
    }, merge: function (e, t) {
      for (var i = +t.length, n = 0, s = e.length; n < i; n++) e[s++] = t[n];
      return e.length = s, e
    }, grep: function (e, t, i) {
      for (var n = [], s = 0, o = e.length, a = !i; s < o; s++) !t(e[s], s) !== a && n.push(e[s]);
      return n
    }, map: function (e, t, i) {
      var s, o, a = 0, r = [];
      if (n(e)) for (s = e.length; a < s; a++) null != (o = t(e[a], a, i)) && r.push(o); else for (a in e) null != (o = t(e[a], a, i)) && r.push(o);
      return Z.apply([], r)
    }, guid: 1, proxy: function (e, t) {
      var i, n, s;
      if ("string" == typeof t && (i = e[t], t = e, e = i), re.isFunction(e)) return n = K.call(arguments, 2), s = function () {
        return e.apply(t || this, n.concat(K.call(arguments)))
      }, s.guid = e.guid = e.guid || re.guid++, s
    }, now: Date.now, support: ae
  }), "function" == typeof Symbol && (re.fn[Symbol.iterator] = G[Symbol.iterator]), re.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
    te["[object " + t + "]"] = t.toLowerCase()
  });
  var he = function (e) {
    function t(e, t, i, n) {
      var s, o, a, r, l, c, u, h = t && t.ownerDocument, f = t ? t.nodeType : 9;
      if (i = i || [], "string" != typeof e || !e || 1 !== f && 9 !== f && 11 !== f) return i;
      if (!n && ((t ? t.ownerDocument || t : F) !== L && I(t), t = t || L, A)) {
        if (11 !== f && (l = me.exec(e))) if (s = l[1]) {
          if (9 === f) {
            if (!(a = t.getElementById(s))) return i;
            if (a.id === s) return i.push(a), i
          } else if (h && (a = h.getElementById(s)) && j(t, a) && a.id === s) return i.push(a), i
        } else {
          if (l[2]) return Q.apply(i, t.getElementsByTagName(e)), i;
          if ((s = l[3]) && x.getElementsByClassName && t.getElementsByClassName) return Q.apply(i, t.getElementsByClassName(s)), i
        }
        if (x.qsa && !W[e + " "] && (!D || !D.test(e))) {
          if (1 !== f) h = t, u = e; else if ("object" !== t.nodeName.toLowerCase()) {
            for ((r = t.getAttribute("id")) ? r = r.replace(be, xe) : t.setAttribute("id", r = B), o = (c = T(e)).length; o--;) c[o] = "#" + r + " " + p(c[o]);
            u = c.join(","), h = ge.test(e) && d(t.parentNode) || t
          }
          if (u) try {
            return Q.apply(i, h.querySelectorAll(u)), i
          } catch (e) {
          } finally {
            r === B && t.removeAttribute("id")
          }
        }
      }
      return k(e.replace(oe, "$1"), t, i, n)
    }

    function i() {
      function e(i, n) {
        return t.push(i + " ") > w.cacheLength && delete e[t.shift()], e[i + " "] = n
      }

      var t = [];
      return e
    }

    function n(e) {
      return e[B] = !0, e
    }

    function s(e) {
      var t = L.createElement("fieldset");
      try {
        return !!e(t)
      } catch (e) {
        return !1
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null
      }
    }

    function o(e, t) {
      for (var i = e.split("|"), n = i.length; n--;) w.attrHandle[i[n]] = t
    }

    function a(e, t) {
      var i = t && e, n = i && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
      if (n) return n;
      if (i) for (; i = i.nextSibling;) if (i === t) return -1;
      return e ? 1 : -1
    }

    function r(e) {
      return function (t) {
        return "input" === t.nodeName.toLowerCase() && t.type === e
      }
    }

    function l(e) {
      return function (t) {
        var i = t.nodeName.toLowerCase();
        return ("input" === i || "button" === i) && t.type === e
      }
    }

    function c(e) {
      return function (t) {
        return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Se(t) === e : t.disabled === e : "label" in t && t.disabled === e
      }
    }

    function u(e) {
      return n(function (t) {
        return t = +t, n(function (i, n) {
          for (var s, o = e([], i.length, t), a = o.length; a--;) i[s = o[a]] && (i[s] = !(n[s] = i[s]))
        })
      })
    }

    function d(e) {
      return e && void 0 !== e.getElementsByTagName && e
    }

    function h() {
    }

    function p(e) {
      for (var t = 0, i = e.length, n = ""; t < i; t++) n += e[t].value;
      return n
    }

    function f(e, t, i) {
      var n = t.dir, s = t.next, o = s || n, a = i && "parentNode" === o, r = N++;
      return t.first ? function (t, i, s) {
        for (; t = t[n];) if (1 === t.nodeType || a) return e(t, i, s);
        return !1
      } : function (t, i, l) {
        var c, u, d, h = [H, r];
        if (l) {
          for (; t = t[n];) if ((1 === t.nodeType || a) && e(t, i, l)) return !0
        } else for (; t = t[n];) if (1 === t.nodeType || a) if (d = t[B] || (t[B] = {}), u = d[t.uniqueID] || (d[t.uniqueID] = {}), s && s === t.nodeName.toLowerCase()) t = t[n] || t; else {
          if ((c = u[o]) && c[0] === H && c[1] === r) return h[2] = c[2];
          if (u[o] = h, h[2] = e(t, i, l)) return !0
        }
        return !1
      }
    }

    function m(e) {
      return e.length > 1 ? function (t, i, n) {
        for (var s = e.length; s--;) if (!e[s](t, i, n)) return !1;
        return !0
      } : e[0]
    }

    function g(e, t, i, n, s) {
      for (var o, a = [], r = 0, l = e.length, c = null != t; r < l; r++) (o = e[r]) && (i && !i(o, n, s) || (a.push(o), c && t.push(r)));
      return a
    }

    function v(e, i, s, o, a, r) {
      return o && !o[B] && (o = v(o)), a && !a[B] && (a = v(a, r)), n(function (n, r, l, c) {
        var u, d, h, p = [], f = [], m = r.length, v = n || function (e, i, n) {
            for (var s = 0, o = i.length; s < o; s++) t(e, i[s], n);
            return n
          }(i || "*", l.nodeType ? [l] : l, []), y = !e || !n && i ? v : g(v, p, e, l, c),
          b = s ? a || (n ? e : m || o) ? [] : r : y;
        if (s && s(y, b, l, c), o) for (u = g(b, f), o(u, [], l, c), d = u.length; d--;) (h = u[d]) && (b[f[d]] = !(y[f[d]] = h));
        if (n) {
          if (a || e) {
            if (a) {
              for (u = [], d = b.length; d--;) (h = b[d]) && u.push(y[d] = h);
              a(null, b = [], u, c)
            }
            for (d = b.length; d--;) (h = b[d]) && (u = a ? Z(n, h) : p[d]) > -1 && (n[u] = !(r[u] = h))
          }
        } else b = g(b === r ? b.splice(m, b.length) : b), a ? a(null, r, b, c) : Q.apply(r, b)
      })
    }

    function y(e) {
      for (var t, i, n, s = e.length, o = w.relative[e[0].type], a = o || w.relative[" "], r = o ? 1 : 0, l = f(function (e) {
        return e === t
      }, a, !0), c = f(function (e) {
        return Z(t, e) > -1
      }, a, !0), u = [function (e, i, n) {
        var s = !o && (n || i !== _) || ((t = i).nodeType ? l(e, i, n) : c(e, i, n));
        return t = null, s
      }]; r < s; r++) if (i = w.relative[e[r].type]) u = [f(m(u), i)]; else {
        if ((i = w.filter[e[r].type].apply(null, e[r].matches))[B]) {
          for (n = ++r; n < s && !w.relative[e[n].type]; n++) ;
          return v(r > 1 && m(u), r > 1 && p(e.slice(0, r - 1).concat({value: " " === e[r - 2].type ? "*" : ""})).replace(oe, "$1"), i, r < n && y(e.slice(r, n)), n < s && y(e = e.slice(n)), n < s && p(e))
        }
        u.push(i)
      }
      return m(u)
    }

    var b, x, w, S, C, T, E, k, _, M, P, I, L, z, A, D, $, O, j, B = "sizzle" + 1 * new Date, F = e.document, H = 0,
      N = 0, R = i(), q = i(), W = i(), X = function (e, t) {
        return e === t && (P = !0), 0
      }, Y = {}.hasOwnProperty, V = [], G = V.pop, U = V.push, Q = V.push, K = V.slice, Z = function (e, t) {
        for (var i = 0, n = e.length; i < n; i++) if (e[i] === t) return i;
        return -1
      },
      J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      ee = "[\\x20\\t\\r\\n\\f]", te = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
      ie = "\\[" + ee + "*(" + te + ")(?:" + ee + "*([*^$|!~]?=)" + ee + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + te + "))|)" + ee + "*\\]",
      ne = ":(" + te + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)",
      se = new RegExp(ee + "+", "g"), oe = new RegExp("^" + ee + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ee + "+$", "g"),
      ae = new RegExp("^" + ee + "*," + ee + "*"), re = new RegExp("^" + ee + "*([>+~]|" + ee + ")" + ee + "*"),
      le = new RegExp("=" + ee + "*([^\\]'\"]*?)" + ee + "*\\]", "g"), ce = new RegExp(ne),
      ue = new RegExp("^" + te + "$"), de = {
        ID: new RegExp("^#(" + te + ")"),
        CLASS: new RegExp("^\\.(" + te + ")"),
        TAG: new RegExp("^(" + te + "|[*])"),
        ATTR: new RegExp("^" + ie),
        PSEUDO: new RegExp("^" + ne),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ee + "*(even|odd|(([+-]|)(\\d*)n|)" + ee + "*(?:([+-]|)" + ee + "*(\\d+)|))" + ee + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + J + ")$", "i"),
        needsContext: new RegExp("^" + ee + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ee + "*((?:-\\d)?\\d*)" + ee + "*\\)|)(?=[^-]|$)", "i")
      }, he = /^(?:input|select|textarea|button)$/i, pe = /^h\d$/i, fe = /^[^{]+\{\s*\[native \w/,
      me = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ge = /[+~]/,
      ve = new RegExp("\\\\([\\da-f]{1,6}" + ee + "?|(" + ee + ")|.)", "ig"), ye = function (e, t, i) {
        var n = "0x" + t - 65536;
        return n != n || i ? t : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
      }, be = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, xe = function (e, t) {
        return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
      }, we = function () {
        I()
      }, Se = f(function (e) {
        return !0 === e.disabled && ("form" in e || "label" in e)
      }, {dir: "parentNode", next: "legend"});
    try {
      Q.apply(V = K.call(F.childNodes), F.childNodes), V[F.childNodes.length].nodeType
    } catch (e) {
      Q = {
        apply: V.length ? function (e, t) {
          U.apply(e, K.call(t))
        } : function (e, t) {
          for (var i = e.length, n = 0; e[i++] = t[n++];) ;
          e.length = i - 1
        }
      }
    }
    x = t.support = {}, C = t.isXML = function (e) {
      var t = e && (e.ownerDocument || e).documentElement;
      return !!t && "HTML" !== t.nodeName
    }, I = t.setDocument = function (e) {
      var t, i, n = e ? e.ownerDocument || e : F;
      return n !== L && 9 === n.nodeType && n.documentElement ? (L = n, z = L.documentElement, A = !C(L), F !== L && (i = L.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", we, !1) : i.attachEvent && i.attachEvent("onunload", we)), x.attributes = s(function (e) {
        return e.className = "i", !e.getAttribute("className")
      }), x.getElementsByTagName = s(function (e) {
        return e.appendChild(L.createComment("")), !e.getElementsByTagName("*").length
      }), x.getElementsByClassName = fe.test(L.getElementsByClassName), x.getById = s(function (e) {
        return z.appendChild(e).id = B, !L.getElementsByName || !L.getElementsByName(B).length
      }), x.getById ? (w.filter.ID = function (e) {
        var t = e.replace(ve, ye);
        return function (e) {
          return e.getAttribute("id") === t
        }
      }, w.find.ID = function (e, t) {
        if (void 0 !== t.getElementById && A) {
          var i = t.getElementById(e);
          return i ? [i] : []
        }
      }) : (w.filter.ID = function (e) {
        var t = e.replace(ve, ye);
        return function (e) {
          var i = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
          return i && i.value === t
        }
      }, w.find.ID = function (e, t) {
        if (void 0 !== t.getElementById && A) {
          var i, n, s, o = t.getElementById(e);
          if (o) {
            if ((i = o.getAttributeNode("id")) && i.value === e) return [o];
            for (s = t.getElementsByName(e), n = 0; o = s[n++];) if ((i = o.getAttributeNode("id")) && i.value === e) return [o]
          }
          return []
        }
      }), w.find.TAG = x.getElementsByTagName ? function (e, t) {
        return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : x.qsa ? t.querySelectorAll(e) : void 0
      } : function (e, t) {
        var i, n = [], s = 0, o = t.getElementsByTagName(e);
        if ("*" === e) {
          for (; i = o[s++];) 1 === i.nodeType && n.push(i);
          return n
        }
        return o
      }, w.find.CLASS = x.getElementsByClassName && function (e, t) {
        if (void 0 !== t.getElementsByClassName && A) return t.getElementsByClassName(e)
      }, $ = [], D = [], (x.qsa = fe.test(L.querySelectorAll)) && (s(function (e) {
        z.appendChild(e).innerHTML = "<a id="
        "+B+"
        "></a><select id="
        "+B+" -\r\\" msallowcapture="
        "><option selected="
        "></option></select>", e.querySelectorAll("[msallowcapture^='']").length && D.push("[*^$]=" + ee + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || D.push("\\[" + ee + "*(?:value|" + J + ")"), e.querySelectorAll("[id~=" + B + "-]").length || D.push("~="), e.querySelectorAll(":checked").length || D.push(":checked"), e.querySelectorAll("a#" + B + "+*").length || D.push(".#.+[+~]")
      }), s(function (e) {
        e.innerHTML = "<a href="
        " disabled="
        disabled
        "></a><select disabled="
        disabled
        "><option/></select>";
        var t = L.createElement("input");
        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && D.push("name" + ee + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && D.push(":enabled", ":disabled"), z.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && D.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), D.push(",.*:")
      })), (x.matchesSelector = fe.test(O = z.matches || z.webkitMatchesSelector || z.mozMatchesSelector || z.oMatchesSelector || z.msMatchesSelector)) && s(function (e) {
        x.disconnectedMatch = O.call(e, "*"), O.call(e, "[s!='']:x"), $.push("!=", ne)
      }), D = D.length && new RegExp(D.join("|")), $ = $.length && new RegExp($.join("|")), t = fe.test(z.compareDocumentPosition), j = t || fe.test(z.contains) ? function (e, t) {
        var i = 9 === e.nodeType ? e.documentElement : e, n = t && t.parentNode;
        return e === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)))
      } : function (e, t) {
        if (t) for (; t = t.parentNode;) if (t === e) return !0;
        return !1
      }, X = t ? function (e, t) {
        if (e === t) return P = !0, 0;
        var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return i || (1 & (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !x.sortDetached && t.compareDocumentPosition(e) === i ? e === L || e.ownerDocument === F && j(F, e) ? -1 : t === L || t.ownerDocument === F && j(F, t) ? 1 : M ? Z(M, e) - Z(M, t) : 0 : 4 & i ? -1 : 1)
      } : function (e, t) {
        if (e === t) return P = !0, 0;
        var i, n = 0, s = e.parentNode, o = t.parentNode, r = [e], l = [t];
        if (!s || !o) return e === L ? -1 : t === L ? 1 : s ? -1 : o ? 1 : M ? Z(M, e) - Z(M, t) : 0;
        if (s === o) return a(e, t);
        for (i = e; i = i.parentNode;) r.unshift(i);
        for (i = t; i = i.parentNode;) l.unshift(i);
        for (; r[n] === l[n];) n++;
        return n ? a(r[n], l[n]) : r[n] === F ? -1 : l[n] === F ? 1 : 0
      }, L) : L
    }, t.matches = function (e, i) {
      return t(e, null, null, i)
    }, t.matchesSelector = function (e, i) {
      if ((e.ownerDocument || e) !== L && I(e), i = i.replace(le, "='$1']"), x.matchesSelector && A && !W[i + " "] && (!$ || !$.test(i)) && (!D || !D.test(i))) try {
        var n = O.call(e, i);
        if (n || x.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
      } catch (e) {
      }
      return t(i, L, null, [e]).length > 0
    }, t.contains = function (e, t) {
      return (e.ownerDocument || e) !== L && I(e), j(e, t)
    }, t.attr = function (e, t) {
      (e.ownerDocument || e) !== L && I(e);
      var i = w.attrHandle[t.toLowerCase()], n = i && Y.call(w.attrHandle, t.toLowerCase()) ? i(e, t, !A) : void 0;
      return void 0 !== n ? n : x.attributes || !A ? e.getAttribute(t) : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
    }, t.escape = function (e) {
      return (e + "").replace(be, xe)
    }, t.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e)
    }, t.uniqueSort = function (e) {
      var t, i = [], n = 0, s = 0;
      if (P = !x.detectDuplicates, M = !x.sortStable && e.slice(0), e.sort(X), P) {
        for (; t = e[s++];) t === e[s] && (n = i.push(s));
        for (; n--;) e.splice(i[n], 1)
      }
      return M = null, e
    }, S = t.getText = function (e) {
      var t, i = "", n = 0, s = e.nodeType;
      if (s) {
        if (1 === s || 9 === s || 11 === s) {
          if ("string" == typeof e.textContent) return e.textContent;
          for (e = e.firstChild; e; e = e.nextSibling) i += S(e)
        } else if (3 === s || 4 === s) return e.nodeValue
      } else for (; t = e[n++];) i += S(t);
      return i
    }, (w = t.selectors = {
      cacheLength: 50,
      createPseudo: n,
      match: de,
      attrHandle: {},
      find: {},
      relative: {
        ">": {dir: "parentNode", first: !0},
        " ": {dir: "parentNode"},
        "+": {dir: "previousSibling", first: !0},
        "~": {dir: "previousSibling"}
      },
      preFilter: {
        ATTR: function (e) {
          return e[1] = e[1].replace(ve, ye), e[3] = (e[3] || e[4] || e[5] || "").replace(ve, ye), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
        }, CHILD: function (e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
        }, PSEUDO: function (e) {
          var t, i = !e[6] && e[2];
          return de.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && ce.test(i) && (t = T(i, !0)) && (t = i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t), e[2] = i.slice(0, t)), e.slice(0, 3))
        }
      },
      filter: {
        TAG: function (e) {
          var t = e.replace(ve, ye).toLowerCase();
          return "*" === e ? function () {
            return !0
          } : function (e) {
            return e.nodeName && e.nodeName.toLowerCase() === t
          }
        }, CLASS: function (e) {
          var t = R[e + " "];
          return t || (t = new RegExp("(^|" + ee + ")" + e + "(" + ee + "|$)")) && R(e, function (e) {
            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
          })
        }, ATTR: function (e, i, n) {
          return function (s) {
            var o = t.attr(s, e);
            return null == o ? "!=" === i : !i || (o += "", "=" === i ? o === n : "!=" === i ? o !== n : "^=" === i ? n && 0 === o.indexOf(n) : "*=" === i ? n && o.indexOf(n) > -1 : "$=" === i ? n && o.slice(-n.length) === n : "~=" === i ? (" " + o.replace(se, " ") + " ").indexOf(n) > -1 : "|=" === i && (o === n || o.slice(0, n.length + 1) === n + "-"))
          }
        }, CHILD: function (e, t, i, n, s) {
          var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), r = "of-type" === t;
          return 1 === n && 0 === s ? function (e) {
            return !!e.parentNode
          } : function (t, i, l) {
            var c, u, d, h, p, f, m = o !== a ? "nextSibling" : "previousSibling", g = t.parentNode,
              v = r && t.nodeName.toLowerCase(), y = !l && !r, b = !1;
            if (g) {
              if (o) {
                for (; m;) {
                  for (h = t; h = h[m];) if (r ? h.nodeName.toLowerCase() === v : 1 === h.nodeType) return !1;
                  f = m = "only" === e && !f && "nextSibling"
                }
                return !0
              }
              if (f = [a ? g.firstChild : g.lastChild], a && y) {
                for (b = (p = (c = (u = (d = (h = g)[B] || (h[B] = {}))[h.uniqueID] || (d[h.uniqueID] = {}))[e] || [])[0] === H && c[1]) && c[2], h = p && g.childNodes[p]; h = ++p && h && h[m] || (b = p = 0) || f.pop();) if (1 === h.nodeType && ++b && h === t) {
                  u[e] = [H, p, b];
                  break
                }
              } else if (y && (h = t, d = h[B] || (h[B] = {}), u = d[h.uniqueID] || (d[h.uniqueID] = {}), c = u[e] || [], p = c[0] === H && c[1], b = p), !1 === b) for (; (h = ++p && h && h[m] || (b = p = 0) || f.pop()) && ((r ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++b || (y && (d = h[B] || (h[B] = {}), u = d[h.uniqueID] || (d[h.uniqueID] = {}), u[e] = [H, b]), h !== t));) ;
              return (b -= s) === n || b % n == 0 && b / n >= 0
            }
          }
        }, PSEUDO: function (e, i) {
          var s, o = w.pseudos[e] || w.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
          return o[B] ? o(i) : o.length > 1 ? (s = [e, e, "", i], w.setFilters.hasOwnProperty(e.toLowerCase()) ? n(function (e, t) {
            for (var n, s = o(e, i), a = s.length; a--;) n = Z(e, s[a]), e[n] = !(t[n] = s[a])
          }) : function (e) {
            return o(e, 0, s)
          }) : o
        }
      },
      pseudos: {
        not: n(function (e) {
          var t = [], i = [], s = E(e.replace(oe, "$1"));
          return s[B] ? n(function (e, t, i, n) {
            for (var o, a = s(e, null, n, []), r = e.length; r--;) (o = a[r]) && (e[r] = !(t[r] = o))
          }) : function (e, n, o) {
            return t[0] = e, s(t, null, o, i), t[0] = null, !i.pop()
          }
        }), has: n(function (e) {
          return function (i) {
            return t(e, i).length > 0
          }
        }), contains: n(function (e) {
          return e = e.replace(ve, ye), function (t) {
            return (t.textContent || t.innerText || S(t)).indexOf(e) > -1
          }
        }), lang: n(function (e) {
          return ue.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(ve, ye).toLowerCase(), function (t) {
            var i;
            do {
              if (i = A ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (i = i.toLowerCase()) === e || 0 === i.indexOf(e + "-")
            } while ((t = t.parentNode) && 1 === t.nodeType);
            return !1
          }
        }), target: function (t) {
          var i = e.location && e.location.hash;
          return i && i.slice(1) === t.id
        }, root: function (e) {
          return e === z
        }, focus: function (e) {
          return e === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        }, enabled: c(!1), disabled: c(!0), checked: function (e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && !!e.checked || "option" === t && !!e.selected
        }, selected: function (e) {
          return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
        }, empty: function (e) {
          for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
          return !0
        }, parent: function (e) {
          return !w.pseudos.empty(e)
        }, header: function (e) {
          return pe.test(e.nodeName)
        }, input: function (e) {
          return he.test(e.nodeName)
        }, button: function (e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && "button" === e.type || "button" === t
        }, text: function (e) {
          var t;
          return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
        }, first: u(function () {
          return [0]
        }), last: u(function (e, t) {
          return [t - 1]
        }), eq: u(function (e, t, i) {
          return [i < 0 ? i + t : i]
        }), even: u(function (e, t) {
          for (var i = 0; i < t; i += 2) e.push(i);
          return e
        }), odd: u(function (e, t) {
          for (var i = 1; i < t; i += 2) e.push(i);
          return e
        }), lt: u(function (e, t, i) {
          for (var n = i < 0 ? i + t : i; --n >= 0;) e.push(n);
          return e
        }), gt: u(function (e, t, i) {
          for (var n = i < 0 ? i + t : i; ++n < t;) e.push(n);
          return e
        })
      }
    }).pseudos.nth = w.pseudos.eq;
    for (b in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) w.pseudos[b] = r(b);
    for (b in{submit: !0, reset: !0}) w.pseudos[b] = l(b);
    return h.prototype = w.filters = w.pseudos, w.setFilters = new h, T = t.tokenize = function (e, i) {
      var n, s, o, a, r, l, c, u = q[e + " "];
      if (u) return i ? 0 : u.slice(0);
      for (r = e, l = [], c = w.preFilter; r;) {
        n && !(s = ae.exec(r)) || (s && (r = r.slice(s[0].length) || r), l.push(o = [])), n = !1, (s = re.exec(r)) && (n = s.shift(), o.push({
          value: n,
          type: s[0].replace(oe, " ")
        }), r = r.slice(n.length));
        for (a in w.filter) !(s = de[a].exec(r)) || c[a] && !(s = c[a](s)) || (n = s.shift(), o.push({
          value: n,
          type: a,
          matches: s
        }), r = r.slice(n.length));
        if (!n) break
      }
      return i ? r.length : r ? t.error(e) : q(e, l).slice(0)
    }, E = t.compile = function (e, i) {
      var s, o = [], a = [], r = W[e + " "];
      if (!r) {
        for (i || (i = T(e)), s = i.length; s--;) (r = y(i[s]))[B] ? o.push(r) : a.push(r);
        (r = W(e, function (e, i) {
          var s = i.length > 0, o = e.length > 0, a = function (n, a, r, l, c) {
            var u, d, h, p = 0, f = "0", m = n && [], v = [], y = _, b = n || o && w.find.TAG("*", c),
              x = H += null == y ? 1 : Math.random() || .1, S = b.length;
            for (c && (_ = a === L || a || c); f !== S && null != (u = b[f]); f++) {
              if (o && u) {
                for (d = 0, a || u.ownerDocument === L || (I(u), r = !A); h = e[d++];) if (h(u, a || L, r)) {
                  l.push(u);
                  break
                }
                c && (H = x)
              }
              s && ((u = !h && u) && p--, n && m.push(u))
            }
            if (p += f, s && f !== p) {
              for (d = 0; h = i[d++];) h(m, v, a, r);
              if (n) {
                if (p > 0) for (; f--;) m[f] || v[f] || (v[f] = G.call(l));
                v = g(v)
              }
              Q.apply(l, v), c && !n && v.length > 0 && p + i.length > 1 && t.uniqueSort(l)
            }
            return c && (H = x, _ = y), m
          };
          return s ? n(a) : a
        }(a, o))).selector = e
      }
      return r
    }, k = t.select = function (e, t, i, n) {
      var s, o, a, r, l, c = "function" == typeof e && e, u = !n && T(e = c.selector || e);
      if (i = i || [], 1 === u.length) {
        if ((o = u[0] = u[0].slice(0)).length > 2 && "ID" === (a = o[0]).type && 9 === t.nodeType && A && w.relative[o[1].type]) {
          if (!(t = (w.find.ID(a.matches[0].replace(ve, ye), t) || [])[0])) return i;
          c && (t = t.parentNode), e = e.slice(o.shift().value.length)
        }
        for (s = de.needsContext.test(e) ? 0 : o.length; s-- && (a = o[s], !w.relative[r = a.type]);) if ((l = w.find[r]) && (n = l(a.matches[0].replace(ve, ye), ge.test(o[0].type) && d(t.parentNode) || t))) {
          if (o.splice(s, 1), !(e = n.length && p(o))) return Q.apply(i, n), i;
          break
        }
      }
      return (c || E(e, u))(n, t, !A, i, !t || ge.test(e) && d(t.parentNode) || t), i
    }, x.sortStable = B.split("").sort(X).join("") === B, x.detectDuplicates = !!P, I(), x.sortDetached = s(function (e) {
      return 1 & e.compareDocumentPosition(L.createElement("fieldset"))
    }), s(function (e) {
      return e.innerHTML = "<a href="
      #"></a>", "#" === e.firstChild.getAttribute("href")
    }) || o("type|href|height|width", function (e, t, i) {
      if (!i) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
    }), x.attributes && s(function (e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
    }) || o("value", function (e, t, i) {
      if (!i && "input" === e.nodeName.toLowerCase()) return e.defaultValue
    }), s(function (e) {
      return null == e.getAttribute("disabled")
    }) || o(J, function (e, t, i) {
      var n;
      if (!i) return !0 === e[t] ? t.toLowerCase() : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
    }), t
  }(e);
  re.find = he, re.expr = he.selectors, re.expr[":"] = re.expr.pseudos, re.uniqueSort = re.unique = he.uniqueSort, re.text = he.getText, re.isXMLDoc = he.isXML, re.contains = he.contains, re.escapeSelector = he.escape;
  var pe = function (e, t, i) {
      for (var n = [], s = void 0 !== i; (e = e[t]) && 9 !== e.nodeType;) if (1 === e.nodeType) {
        if (s && re(e).is(i)) break;
        n.push(e)
      }
      return n
    }, fe = function (e, t) {
      for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
      return i
    }, me = re.expr.match.needsContext, ge = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
    ve = /^.[^:#\[\.,]*$/;
  re.filter = function (e, t, i) {
    var n = t[0];
    return i && (e = ":not(" + e + ")"), 1 === t.length && 1 === n.nodeType ? re.find.matchesSelector(n, e) ? [n] : [] : re.find.matches(e, re.grep(t, function (e) {
      return 1 === e.nodeType
    }))
  }, re.fn.extend({
    find: function (e) {
      var t, i, n = this.length, s = this;
      if ("string" != typeof e) return this.pushStack(re(e).filter(function () {
        for (t = 0; t < n; t++) if (re.contains(s[t], this)) return !0
      }));
      for (i = this.pushStack([]), t = 0; t < n; t++) re.find(e, s[t], i);
      return n > 1 ? re.uniqueSort(i) : i
    }, filter: function (e) {
      return this.pushStack(o(this, e || [], !1))
    }, not: function (e) {
      return this.pushStack(o(this, e || [], !0))
    }, is: function (e) {
      return !!o(this, "string" == typeof e && me.test(e) ? re(e) : e || [], !1).length
    }
  });
  var ye, be = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  (re.fn.init = function (e, t, i) {
    var n, s;
    if (!e) return this;
    if (i = i || ye, "string" == typeof e) {
      if (!(n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : be.exec(e)) || !n[1] && t) return !t || t.jquery ? (t || i).find(e) : this.constructor(t).find(e);
      if (n[1]) {
        if (t = t instanceof re ? t[0] : t, re.merge(this, re.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : U, !0)), ge.test(n[1]) && re.isPlainObject(t)) for (n in t) re.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
        return this
      }
      return (s = U.getElementById(n[2])) && (this[0] = s, this.length = 1), this
    }
    return e.nodeType ? (this[0] = e, this.length = 1, this) : re.isFunction(e) ? void 0 !== i.ready ? i.ready(e) : e(re) : re.makeArray(e, this)
  }).prototype = re.fn, ye = re(U);
  var xe = /^(?:parents|prev(?:Until|All))/, we = {children: !0, contents: !0, next: !0, prev: !0};
  re.fn.extend({
    has: function (e) {
      var t = re(e, this), i = t.length;
      return this.filter(function () {
        for (var e = 0; e < i; e++) if (re.contains(this, t[e])) return !0
      })
    }, closest: function (e, t) {
      var i, n = 0, s = this.length, o = [], a = "string" != typeof e && re(e);
      if (!me.test(e)) for (; n < s; n++) for (i = this[n]; i && i !== t; i = i.parentNode) if (i.nodeType < 11 && (a ? a.index(i) > -1 : 1 === i.nodeType && re.find.matchesSelector(i, e))) {
        o.push(i);
        break
      }
      return this.pushStack(o.length > 1 ? re.uniqueSort(o) : o)
    }, index: function (e) {
      return e ? "string" == typeof e ? ee.call(re(e), this[0]) : ee.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    }, add: function (e, t) {
      return this.pushStack(re.uniqueSort(re.merge(this.get(), re(e, t))))
    }, addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }
  }), re.each({
    parent: function (e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null
    }, parents: function (e) {
      return pe(e, "parentNode")
    }, parentsUntil: function (e, t, i) {
      return pe(e, "parentNode", i)
    }, next: function (e) {
      return a(e, "nextSibling")
    }, prev: function (e) {
      return a(e, "previousSibling")
    }, nextAll: function (e) {
      return pe(e, "nextSibling")
    }, prevAll: function (e) {
      return pe(e, "previousSibling")
    }, nextUntil: function (e, t, i) {
      return pe(e, "nextSibling", i)
    }, prevUntil: function (e, t, i) {
      return pe(e, "previousSibling", i)
    }, siblings: function (e) {
      return fe((e.parentNode || {}).firstChild, e)
    }, children: function (e) {
      return fe(e.firstChild)
    }, contents: function (e) {
      return s(e, "iframe") ? e.contentDocument : (s(e, "template") && (e = e.content || e), re.merge([], e.childNodes))
    }
  }, function (e, t) {
    re.fn[e] = function (i, n) {
      var s = re.map(this, t, i);
      return "Until" !== e.slice(-5) && (n = i), n && "string" == typeof n && (s = re.filter(n, s)), this.length > 1 && (we[e] || re.uniqueSort(s), xe.test(e) && s.reverse()), this.pushStack(s)
    }
  });
  var Se = /[^\x20\t\r\n\f]+/g;
  re.Callbacks = function (e) {
    e = "string" == typeof e ? function (e) {
      var t = {};
      return re.each(e.match(Se) || [], function (e, i) {
        t[i] = !0
      }), t
    }(e) : re.extend({}, e);
    var t, i, n, s, o = [], a = [], r = -1, l = function () {
      for (s = s || e.once, n = t = !0; a.length; r = -1) for (i = a.shift(); ++r < o.length;) !1 === o[r].apply(i[0], i[1]) && e.stopOnFalse && (r = o.length, i = !1);
      e.memory || (i = !1), t = !1, s && (o = i ? [] : "")
    }, c = {
      add: function () {
        return o && (i && !t && (r = o.length - 1, a.push(i)), function t(i) {
          re.each(i, function (i, n) {
            re.isFunction(n) ? e.unique && c.has(n) || o.push(n) : n && n.length && "string" !== re.type(n) && t(n)
          })
        }(arguments), i && !t && l()), this
      }, remove: function () {
        return re.each(arguments, function (e, t) {
          for (var i; (i = re.inArray(t, o, i)) > -1;) o.splice(i, 1), i <= r && r--
        }), this
      }, has: function (e) {
        return e ? re.inArray(e, o) > -1 : o.length > 0
      }, empty: function () {
        return o && (o = []), this
      }, disable: function () {
        return s = a = [], o = i = "", this
      }, disabled: function () {
        return !o
      }, lock: function () {
        return s = a = [], i || t || (o = i = ""), this
      }, locked: function () {
        return !!s
      }, fireWith: function (e, i) {
        return s || (i = i || [], i = [e, i.slice ? i.slice() : i], a.push(i), t || l()), this
      }, fire: function () {
        return c.fireWith(this, arguments), this
      }, fired: function () {
        return !!n
      }
    };
    return c
  }, re.extend({
    Deferred: function (t) {
      var i = [["notify", "progress", re.Callbacks("memory"), re.Callbacks("memory"), 2], ["resolve", "done", re.Callbacks("once memory"), re.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", re.Callbacks("once memory"), re.Callbacks("once memory"), 1, "rejected"]],
        n = "pending", s = {
          state: function () {
            return n
          }, always: function () {
            return o.done(arguments).fail(arguments), this
          }, catch: function (e) {
            return s.then(null, e)
          }, pipe: function () {
            var e = arguments;
            return re.Deferred(function (t) {
              re.each(i, function (i, n) {
                var s = re.isFunction(e[n[4]]) && e[n[4]];
                o[n[1]](function () {
                  var e = s && s.apply(this, arguments);
                  e && re.isFunction(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[n[0] + "With"](this, s ? [e] : arguments)
                })
              }), e = null
            }).promise()
          }, then: function (t, n, s) {
            function o(t, i, n, s) {
              return function () {
                var c = this, u = arguments, d = function () {
                  var e, d;
                  if (!(t < a)) {
                    if ((e = n.apply(c, u)) === i.promise()) throw new TypeError("Thenable self-resolution");
                    d = e && ("object" == typeof e || "function" == typeof e) && e.then, re.isFunction(d) ? s ? d.call(e, o(a, i, r, s), o(a, i, l, s)) : (a++, d.call(e, o(a, i, r, s), o(a, i, l, s), o(a, i, r, i.notifyWith))) : (n !== r && (c = void 0, u = [e]), (s || i.resolveWith)(c, u))
                  }
                }, h = s ? d : function () {
                  try {
                    d()
                  } catch (e) {
                    re.Deferred.exceptionHook && re.Deferred.exceptionHook(e, h.stackTrace), t + 1 >= a && (n !== l && (c = void 0, u = [e]), i.rejectWith(c, u))
                  }
                };
                t ? h() : (re.Deferred.getStackHook && (h.stackTrace = re.Deferred.getStackHook()), e.setTimeout(h))
              }
            }

            var a = 0;
            return re.Deferred(function (e) {
              i[0][3].add(o(0, e, re.isFunction(s) ? s : r, e.notifyWith)), i[1][3].add(o(0, e, re.isFunction(t) ? t : r)), i[2][3].add(o(0, e, re.isFunction(n) ? n : l))
            }).promise()
          }, promise: function (e) {
            return null != e ? re.extend(e, s) : s
          }
        }, o = {};
      return re.each(i, function (e, t) {
        var a = t[2], r = t[5];
        s[t[1]] = a.add, r && a.add(function () {
          n = r
        }, i[3 - e][2].disable, i[0][2].lock), a.add(t[3].fire), o[t[0]] = function () {
          return o[t[0] + "With"](this === o ? void 0 : this, arguments), this
        }, o[t[0] + "With"] = a.fireWith
      }), s.promise(o), t && t.call(o, o), o
    }, when: function (e) {
      var t = arguments.length, i = t, n = Array(i), s = K.call(arguments), o = re.Deferred(), a = function (e) {
        return function (i) {
          n[e] = this, s[e] = arguments.length > 1 ? K.call(arguments) : i, --t || o.resolveWith(n, s)
        }
      };
      if (t <= 1 && (c(e, o.done(a(i)).resolve, o.reject, !t), "pending" === o.state() || re.isFunction(s[i] && s[i].then))) return o.then();
      for (; i--;) c(s[i], a(i), o.reject);
      return o.promise()
    }
  });
  var Ce = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  re.Deferred.exceptionHook = function (t, i) {
    e.console && e.console.warn && t && Ce.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, i)
  }, re.readyException = function (t) {
    e.setTimeout(function () {
      throw t
    })
  };
  var Te = re.Deferred();
  re.fn.ready = function (e) {
    return Te.then(e).catch(function (e) {
      re.readyException(e)
    }), this
  }, re.extend({
    isReady: !1, readyWait: 1, ready: function (e) {
      (!0 === e ? --re.readyWait : re.isReady) || (re.isReady = !0, !0 !== e && --re.readyWait > 0 || Te.resolveWith(U, [re]))
    }
  }), re.ready.then = Te.then, "complete" === U.readyState || "loading" !== U.readyState && !U.documentElement.doScroll ? e.setTimeout(re.ready) : (U.addEventListener("DOMContentLoaded", u), e.addEventListener("load", u));
  var Ee = function (e, t, i, n, s, o, a) {
    var r = 0, l = e.length, c = null == i;
    if ("object" === re.type(i)) {
      s = !0;
      for (r in i) Ee(e, t, r, i[r], !0, o, a)
    } else if (void 0 !== n && (s = !0, re.isFunction(n) || (a = !0), c && (a ? (t.call(e, n), t = null) : (c = t, t = function (e, t, i) {
      return c.call(re(e), i)
    })), t)) for (; r < l; r++) t(e[r], i, a ? n : n.call(e[r], r, t(e[r], i)));
    return s ? e : c ? t.call(e) : l ? t(e[0], i) : o
  }, ke = function (e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
  };
  d.uid = 1, d.prototype = {
    cache: function (e) {
      var t = e[this.expando];
      return t || (t = {}, ke(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
        value: t,
        configurable: !0
      }))), t
    }, set: function (e, t, i) {
      var n, s = this.cache(e);
      if ("string" == typeof t) s[re.camelCase(t)] = i; else for (n in t) s[re.camelCase(n)] = t[n];
      return s
    }, get: function (e, t) {
      return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][re.camelCase(t)]
    }, access: function (e, t, i) {
      return void 0 === t || t && "string" == typeof t && void 0 === i ? this.get(e, t) : (this.set(e, t, i), void 0 !== i ? i : t)
    }, remove: function (e, t) {
      var i, n = e[this.expando];
      if (void 0 !== n) {
        if (void 0 !== t) {
          Array.isArray(t) ? t = t.map(re.camelCase) : (t = re.camelCase(t), t = t in n ? [t] : t.match(Se) || []), i = t.length;
          for (; i--;) delete n[t[i]]
        }
        (void 0 === t || re.isEmptyObject(n)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
      }
    }, hasData: function (e) {
      var t = e[this.expando];
      return void 0 !== t && !re.isEmptyObject(t)
    }
  };
  var _e = new d, Me = new d, Pe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Ie = /[A-Z]/g;
  re.extend({
    hasData: function (e) {
      return Me.hasData(e) || _e.hasData(e)
    }, data: function (e, t, i) {
      return Me.access(e, t, i)
    }, removeData: function (e, t) {
      Me.remove(e, t)
    }, _data: function (e, t, i) {
      return _e.access(e, t, i)
    }, _removeData: function (e, t) {
      _e.remove(e, t)
    }
  }), re.fn.extend({
    data: function (e, t) {
      var i, n, s, o = this[0], a = o && o.attributes;
      if (void 0 === e) {
        if (this.length && (s = Me.get(o), 1 === o.nodeType && !_e.get(o, "hasDataAttrs"))) {
          for (i = a.length; i--;) a[i] && 0 === (n = a[i].name).indexOf("data-") && (n = re.camelCase(n.slice(5)), h(o, n, s[n]));
          _e.set(o, "hasDataAttrs", !0)
        }
        return s
      }
      return "object" == typeof e ? this.each(function () {
        Me.set(this, e)
      }) : Ee(this, function (t) {
        var i;
        if (o && void 0 === t) {
          if (void 0 !== (i = Me.get(o, e))) return i;
          if (void 0 !== (i = h(o, e))) return i
        } else this.each(function () {
          Me.set(this, e, t)
        })
      }, null, t, arguments.length > 1, null, !0)
    }, removeData: function (e) {
      return this.each(function () {
        Me.remove(this, e)
      })
    }
  }), re.extend({
    queue: function (e, t, i) {
      var n;
      if (e) return t = (t || "fx") + "queue", n = _e.get(e, t), i && (!n || Array.isArray(i) ? n = _e.access(e, t, re.makeArray(i)) : n.push(i)), n || []
    }, dequeue: function (e, t) {
      t = t || "fx";
      var i = re.queue(e, t), n = i.length, s = i.shift(), o = re._queueHooks(e, t);
      "inprogress" === s && (s = i.shift(), n--), s && ("fx" === t && i.unshift("inprogress"), delete o.stop, s.call(e, function () {
        re.dequeue(e, t)
      }, o)), !n && o && o.empty.fire()
    }, _queueHooks: function (e, t) {
      var i = t + "queueHooks";
      return _e.get(e, i) || _e.access(e, i, {
        empty: re.Callbacks("once memory").add(function () {
          _e.remove(e, [t + "queue", i])
        })
      })
    }
  }), re.fn.extend({
    queue: function (e, t) {
      var i = 2;
      return "string" != typeof e && (t = e, e = "fx", i--), arguments.length < i ? re.queue(this[0], e) : void 0 === t ? this : this.each(function () {
        var i = re.queue(this, e, t);
        re._queueHooks(this, e), "fx" === e && "inprogress" !== i[0] && re.dequeue(this, e)
      })
    }, dequeue: function (e) {
      return this.each(function () {
        re.dequeue(this, e)
      })
    }, clearQueue: function (e) {
      return this.queue(e || "fx", [])
    }, promise: function (e, t) {
      var i, n = 1, s = re.Deferred(), o = this, a = this.length, r = function () {
        --n || s.resolveWith(o, [o])
      };
      for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) (i = _e.get(o[a], e + "queueHooks")) && i.empty && (n++, i.empty.add(r));
      return r(), s.promise(t)
    }
  });
  var Le = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, ze = new RegExp("^(?:([+-])=|)(" + Le + ")([a-z%]*)$", "i"),
    Ae = ["Top", "Right", "Bottom", "Left"], De = function (e, t) {
      return "none" === (e = t || e).style.display || "" === e.style.display && re.contains(e.ownerDocument, e) && "none" === re.css(e, "display")
    }, $e = function (e, t, i, n) {
      var s, o, a = {};
      for (o in t) a[o] = e.style[o], e.style[o] = t[o];
      s = i.apply(e, n || []);
      for (o in t) e.style[o] = a[o];
      return s
    }, Oe = {};
  re.fn.extend({
    show: function () {
      return m(this, !0)
    }, hide: function () {
      return m(this)
    }, toggle: function (e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
        De(this) ? re(this).show() : re(this).hide()
      })
    }
  });
  var je = /^(?:checkbox|radio)$/i, Be = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, Fe = /^$|\/(?:java|ecma)script/i, He = {
    option: [1, "<select multiple="multiple">", "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  He.optgroup = He.option, He.tbody = He.tfoot = He.colgroup = He.caption = He.thead, He.th = He.td;
  var Ne = /<|&#?\w+;/;
  !function () {
    var e = U.createDocumentFragment().appendChild(U.createElement("div")), t = U.createElement("input");
    t.setAttribute("type", "radio"), t.setAttribute("checked", "checked"), t.setAttribute("name", "t"), e.appendChild(t), ae.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", ae.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
  }();
  var Re = U.documentElement, qe = /^key/, We = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    Xe = /^([^.]*)(?:\.(.+)|)/;
  re.event = {
    global: {}, add: function (e, t, i, n, s) {
      var o, a, r, l, c, u, d, h, p, f, m, g = _e.get(e);
      if (g) for (i.handler && (o = i, i = o.handler, s = o.selector), s && re.find.matchesSelector(Re, s), i.guid || (i.guid = re.guid++), (l = g.events) || (l = g.events = {}), (a = g.handle) || (a = g.handle = function (t) {
        return void 0 !== re && re.event.triggered !== t.type ? re.event.dispatch.apply(e, arguments) : void 0
      }), c = (t = (t || "").match(Se) || [""]).length; c--;) r = Xe.exec(t[c]) || [], p = m = r[1], f = (r[2] || "").split(".").sort(), p && (d = re.event.special[p] || {}, p = (s ? d.delegateType : d.bindType) || p, d = re.event.special[p] || {}, u = re.extend({
        type: p,
        origType: m,
        data: n,
        handler: i,
        guid: i.guid,
        selector: s,
        needsContext: s && re.expr.match.needsContext.test(s),
        namespace: f.join(".")
      }, o), (h = l[p]) || (h = l[p] = [], h.delegateCount = 0, d.setup && !1 !== d.setup.call(e, n, f, a) || e.addEventListener && e.addEventListener(p, a)), d.add && (d.add.call(e, u), u.handler.guid || (u.handler.guid = i.guid)), s ? h.splice(h.delegateCount++, 0, u) : h.push(u), re.event.global[p] = !0)
    }, remove: function (e, t, i, n, s) {
      var o, a, r, l, c, u, d, h, p, f, m, g = _e.hasData(e) && _e.get(e);
      if (g && (l = g.events)) {
        for (c = (t = (t || "").match(Se) || [""]).length; c--;) if (r = Xe.exec(t[c]) || [], p = m = r[1], f = (r[2] || "").split(".").sort(), p) {
          for (d = re.event.special[p] || {}, h = l[p = (n ? d.delegateType : d.bindType) || p] || [], r = r[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = h.length; o--;) u = h[o], !s && m !== u.origType || i && i.guid !== u.guid || r && !r.test(u.namespace) || n && n !== u.selector && ("**" !== n || !u.selector) || (h.splice(o, 1), u.selector && h.delegateCount--, d.remove && d.remove.call(e, u));
          a && !h.length && (d.teardown && !1 !== d.teardown.call(e, f, g.handle) || re.removeEvent(e, p, g.handle), delete l[p])
        } else for (p in l) re.event.remove(e, p + t[c], i, n, !0);
        re.isEmptyObject(l) && _e.remove(e, "handle events")
      }
    }, dispatch: function (e) {
      var t, i, n, s, o, a, r = re.event.fix(e), l = new Array(arguments.length),
        c = (_e.get(this, "events") || {})[r.type] || [], u = re.event.special[r.type] || {};
      for (l[0] = r, t = 1; t < arguments.length; t++) l[t] = arguments[t];
      if (r.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, r)) {
        for (a = re.event.handlers.call(this, r, c), t = 0; (s = a[t++]) && !r.isPropagationStopped();) for (r.currentTarget = s.elem, i = 0; (o = s.handlers[i++]) && !r.isImmediatePropagationStopped();) r.rnamespace && !r.rnamespace.test(o.namespace) || (r.handleObj = o, r.data = o.data, void 0 !== (n = ((re.event.special[o.origType] || {}).handle || o.handler).apply(s.elem, l)) && !1 === (r.result = n) && (r.preventDefault(), r.stopPropagation()));
        return u.postDispatch && u.postDispatch.call(this, r), r.result
      }
    }, handlers: function (e, t) {
      var i, n, s, o, a, r = [], l = t.delegateCount, c = e.target;
      if (l && c.nodeType && !("click" === e.type && e.button >= 1)) for (; c !== this; c = c.parentNode || this) if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
        for (o = [], a = {}, i = 0; i < l; i++) n = t[i], s = n.selector + " ", void 0 === a[s] && (a[s] = n.needsContext ? re(s, this).index(c) > -1 : re.find(s, this, null, [c]).length), a[s] && o.push(n);
        o.length && r.push({elem: c, handlers: o})
      }
      return c = this, l < t.length && r.push({elem: c, handlers: t.slice(l)}), r
    }, addProp: function (e, t) {
      Object.defineProperty(re.Event.prototype, e, {
        enumerable: !0,
        configurable: !0,
        get: re.isFunction(t) ? function () {
          if (this.originalEvent) return t(this.originalEvent)
        } : function () {
          if (this.originalEvent) return this.originalEvent[e]
        },
        set: function (t) {
          Object.defineProperty(this, e, {enumerable: !0, configurable: !0, writable: !0, value: t})
        }
      })
    }, fix: function (e) {
      return e[re.expando] ? e : new re.Event(e)
    }, special: {
      load: {noBubble: !0}, focus: {
        trigger: function () {
          if (this !== w() && this.focus) return this.focus(), !1
        }, delegateType: "focusin"
      }, blur: {
        trigger: function () {
          if (this === w() && this.blur) return this.blur(), !1
        }, delegateType: "focusout"
      }, click: {
        trigger: function () {
          if ("checkbox" === this.type && this.click && s(this, "input")) return this.click(), !1
        }, _default: function (e) {
          return s(e.target, "a")
        }
      }, beforeunload: {
        postDispatch: function (e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
        }
      }
    }
  }, re.removeEvent = function (e, t, i) {
    e.removeEventListener && e.removeEventListener(t, i)
  }, re.Event = function (e, t) {
    return this instanceof re.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? b : x, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && re.extend(this, t), this.timeStamp = e && e.timeStamp || re.now(), void(this[re.expando] = !0)) : new re.Event(e, t)
  }, re.Event.prototype = {
    constructor: re.Event,
    isDefaultPrevented: x,
    isPropagationStopped: x,
    isImmediatePropagationStopped: x,
    isSimulated: !1,
    preventDefault: function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = b, e && !this.isSimulated && e.preventDefault()
    },
    stopPropagation: function () {
      var e = this.originalEvent;
      this.isPropagationStopped = b, e && !this.isSimulated && e.stopPropagation()
    },
    stopImmediatePropagation: function () {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = b, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
    }
  }, re.each({
    altKey: !0,
    bubbles: !0,
    cancelable: !0,
    changedTouches: !0,
    ctrlKey: !0,
    detail: !0,
    eventPhase: !0,
    metaKey: !0,
    pageX: !0,
    pageY: !0,
    shiftKey: !0,
    view: !0,
    char: !0,
    charCode: !0,
    key: !0,
    keyCode: !0,
    button: !0,
    buttons: !0,
    clientX: !0,
    clientY: !0,
    offsetX: !0,
    offsetY: !0,
    pointerId: !0,
    pointerType: !0,
    screenX: !0,
    screenY: !0,
    targetTouches: !0,
    toElement: !0,
    touches: !0,
    which: function (e) {
      var t = e.button;
      return null == e.which && qe.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && We.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
    }
  }, re.event.addProp), re.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (e, t) {
    re.event.special[e] = {
      delegateType: t, bindType: t, handle: function (e) {
        var i, n = e.relatedTarget, s = e.handleObj;
        return n && (n === this || re.contains(this, n)) || (e.type = s.origType, i = s.handler.apply(this, arguments), e.type = t), i
      }
    }
  }), re.fn.extend({
    on: function (e, t, i, n) {
      return S(this, e, t, i, n)
    }, one: function (e, t, i, n) {
      return S(this, e, t, i, n, 1)
    }, off: function (e, t, i) {
      var n, s;
      if (e && e.preventDefault && e.handleObj) return n = e.handleObj, re(e.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
      if ("object" == typeof e) {
        for (s in e) this.off(s, t, e[s]);
        return this
      }
      return !1 !== t && "function" != typeof t || (i = t, t = void 0), !1 === i && (i = x), this.each(function () {
        re.event.remove(this, e, i, t)
      })
    }
  });
  var Ye = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
    Ve = /<script|<style|<link/i, Ge = /checked\s*(?:[^=]|=\s*.checked.)/i, Ue = /^true\/(.*)/,
    Qe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  re.extend({
    htmlPrefilter: function (e) {
      return e.replace(Ye, "<$1></$2>")
    }, clone: function (e, t, i) {
      var n, s, o, a, r = e.cloneNode(!0), l = re.contains(e.ownerDocument, e);
      if (!(ae.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || re.isXMLDoc(e))) for (a = g(r), o = g(e), n = 0, s = o.length; n < s; n++) _(o[n], a[n]);
      if (t) if (i) for (o = o || g(e), a = a || g(r), n = 0, s = o.length; n < s; n++) k(o[n], a[n]); else k(e, r);
      return (a = g(r, "script")).length > 0 && v(a, !l && g(e, "script")), r
    }, cleanData: function (e) {
      for (var t, i, n, s = re.event.special, o = 0; void 0 !== (i = e[o]); o++) if (ke(i)) {
        if (t = i[_e.expando]) {
          if (t.events) for (n in t.events) s[n] ? re.event.remove(i, n) : re.removeEvent(i, n, t.handle);
          i[_e.expando] = void 0
        }
        i[Me.expando] && (i[Me.expando] = void 0)
      }
    }
  }), re.fn.extend({
    detach: function (e) {
      return P(this, e, !0)
    }, remove: function (e) {
      return P(this, e)
    }, text: function (e) {
      return Ee(this, function (e) {
        return void 0 === e ? re.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
        })
      }, null, e, arguments.length)
    }, append: function () {
      return M(this, arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          C(this, e).appendChild(e)
        }
      })
    }, prepend: function () {
      return M(this, arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = C(this, e);
          t.insertBefore(e, t.firstChild)
        }
      })
    }, before: function () {
      return M(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this)
      })
    }, after: function () {
      return M(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
      })
    }, empty: function () {
      for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (re.cleanData(g(e, !1)), e.textContent = "");
      return this
    }, clone: function (e, t) {
      return e = null != e && e, t = null == t ? e : t, this.map(function () {
        return re.clone(this, e, t)
      })
    }, html: function (e) {
      return Ee(this, function (e) {
        var t = this[0] || {}, i = 0, n = this.length;
        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
        if ("string" == typeof e && !Ve.test(e) && !He[(Be.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = re.htmlPrefilter(e);
          try {
            for (; i < n; i++) 1 === (t = this[i] || {}).nodeType && (re.cleanData(g(t, !1)), t.innerHTML = e);
            t = 0
          } catch (e) {
          }
        }
        t && this.empty().append(e)
      }, null, e, arguments.length)
    }, replaceWith: function () {
      var e = [];
      return M(this, arguments, function (t) {
        var i = this.parentNode;
        re.inArray(this, e) < 0 && (re.cleanData(g(this)), i && i.replaceChild(t, this))
      }, e)
    }
  }), re.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (e, t) {
    re.fn[e] = function (e) {
      for (var i, n = [], s = re(e), o = s.length - 1, a = 0; a <= o; a++) i = a === o ? this : this.clone(!0), re(s[a])[t](i), J.apply(n, i.get());
      return this.pushStack(n)
    }
  });
  var Ke = /^margin/, Ze = new RegExp("^(" + Le + ")(?!px)[a-z%]+$", "i"), Je = function (t) {
    var i = t.ownerDocument.defaultView;
    return i && i.opener || (i = e), i.getComputedStyle(t)
  };
  !function () {
    function t() {
      if (r) {
        r.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", r.innerHTML = "", Re.appendChild(a);
        var t = e.getComputedStyle(r);
        i = "1%" !== t.top, o = "2px" === t.marginLeft, n = "4px" === t.width, r.style.marginRight = "50%", s = "4px" === t.marginRight, Re.removeChild(a), r = null
      }
    }

    var i, n, s, o, a = U.createElement("div"), r = U.createElement("div");
    r.style && (r.style.backgroundClip = "content-box", r.cloneNode(!0).style.backgroundClip = "", ae.clearCloneStyle = "content-box" === r.style.backgroundClip, a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", a.appendChild(r), re.extend(ae, {
      pixelPosition: function () {
        return t(), i
      }, boxSizingReliable: function () {
        return t(), n
      }, pixelMarginRight: function () {
        return t(), s
      }, reliableMarginLeft: function () {
        return t(), o
      }
    }))
  }();
  var et = /^(none|table(?!-c[ea]).+)/, tt = /^--/, it = {position: "absolute", visibility: "hidden", display: "block"},
    nt = {letterSpacing: "0", fontWeight: "400"}, st = ["Webkit", "Moz", "ms"], ot = U.createElement("div").style;
  re.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var i = I(e, "opacity");
            return "" === i ? "1" : i
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {float: "cssFloat"},
    style: function (e, t, i, n) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var s, o, a, r = re.camelCase(t), l = tt.test(t), c = e.style;
        return l || (t = z(r)), a = re.cssHooks[t] || re.cssHooks[r], void 0 === i ? a && "get" in a && void 0 !== (s = a.get(e, !1, n)) ? s : c[t] : ("string" === (o = typeof i) && (s = ze.exec(i)) && s[1] && (i = p(e, t, s), o = "number"), void(null != i && i == i && ("number" === o && (i += s && s[3] || (re.cssNumber[r] ? "" : "px")), ae.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (c[t] = "inherit"), a && "set" in a && void 0 === (i = a.set(e, i, n)) || (l ? c.setProperty(t, i) : c[t] = i))))
      }
    },
    css: function (e, t, i, n) {
      var s, o, a, r = re.camelCase(t);
      return tt.test(t) || (t = z(r)), (a = re.cssHooks[t] || re.cssHooks[r]) && "get" in a && (s = a.get(e, !0, i)), void 0 === s && (s = I(e, t, n)), "normal" === s && t in nt && (s = nt[t]), "" === i || i ? (o = parseFloat(s), !0 === i || isFinite(o) ? o || 0 : s) : s
    }
  }), re.each(["height", "width"], function (e, t) {
    re.cssHooks[t] = {
      get: function (e, i, n) {
        if (i) return !et.test(re.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? $(e, t, n) : $e(e, it, function () {
          return $(e, t, n)
        })
      }, set: function (e, i, n) {
        var s, o = n && Je(e), a = n && D(e, t, n, "border-box" === re.css(e, "boxSizing", !1, o), o);
        return a && (s = ze.exec(i)) && "px" !== (s[3] || "px") && (e.style[t] = i, i = re.css(e, t)), A(0, i, a)
      }
    }
  }), re.cssHooks.marginLeft = L(ae.reliableMarginLeft, function (e, t) {
    if (t) return (parseFloat(I(e, "marginLeft")) || e.getBoundingClientRect().left - $e(e, {marginLeft: 0}, function () {
      return e.getBoundingClientRect().left
    })) + "px"
  }), re.each({margin: "", padding: "", border: "Width"}, function (e, t) {
    re.cssHooks[e + t] = {
      expand: function (i) {
        for (var n = 0, s = {}, o = "string" == typeof i ? i.split(" ") : [i]; n < 4; n++) s[e + Ae[n] + t] = o[n] || o[n - 2] || o[0];
        return s
      }
    }, Ke.test(e) || (re.cssHooks[e + t].set = A)
  }), re.fn.extend({
    css: function (e, t) {
      return Ee(this, function (e, t, i) {
        var n, s, o = {}, a = 0;
        if (Array.isArray(t)) {
          for (n = Je(e), s = t.length; a < s; a++) o[t[a]] = re.css(e, t[a], !1, n);
          return o
        }
        return void 0 !== i ? re.style(e, t, i) : re.css(e, t)
      }, e, t, arguments.length > 1)
    }
  }), re.Tween = O, (O.prototype = {
    constructor: O, init: function (e, t, i, n, s, o) {
      this.elem = e, this.prop = i, this.easing = s || re.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = n, this.unit = o || (re.cssNumber[i] ? "" : "px")
    }, cur: function () {
      var e = O.propHooks[this.prop];
      return e && e.get ? e.get(this) : O.propHooks._default.get(this)
    }, run: function (e) {
      var t, i = O.propHooks[this.prop];
      return this.options.duration ? this.pos = t = re.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : O.propHooks._default.set(this), this
    }
  }).init.prototype = O.prototype, (O.propHooks = {
    _default: {
      get: function (e) {
        var t;
        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = re.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
      }, set: function (e) {
        re.fx.step[e.prop] ? re.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[re.cssProps[e.prop]] && !re.cssHooks[e.prop] ? e.elem[e.prop] = e.now : re.style(e.elem, e.prop, e.now + e.unit)
      }
    }
  }).scrollTop = O.propHooks.scrollLeft = {
    set: function (e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }
  }, re.easing = {
    linear: function (e) {
      return e
    }, swing: function (e) {
      return .5 - Math.cos(e * Math.PI) / 2
    }, _default: "swing"
  }, re.fx = O.prototype.init, re.fx.step = {};
  var at, rt, lt = /^(?:toggle|show|hide)$/, ct = /queueHooks$/;
  re.Animation = re.extend(N, {
    tweeners: {
      "*": [function (e, t) {
        var i = this.createTween(e, t);
        return p(i.elem, e, ze.exec(t), i), i
      }]
    }, tweener: function (e, t) {
      re.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(Se);
      for (var i, n = 0, s = e.length; n < s; n++) i = e[n], N.tweeners[i] = N.tweeners[i] || [], N.tweeners[i].unshift(t)
    }, prefilters: [function (e, t, i) {
      var n, s, o, a, r, l, c, u, d = "width" in t || "height" in t, h = this, p = {}, f = e.style,
        g = e.nodeType && De(e), v = _e.get(e, "fxshow");
      i.queue || (null == (a = re._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, r = a.empty.fire, a.empty.fire = function () {
        a.unqueued || r()
      }), a.unqueued++, h.always(function () {
        h.always(function () {
          a.unqueued--, re.queue(e, "fx").length || a.empty.fire()
        })
      }));
      for (n in t) if (s = t[n], lt.test(s)) {
        if (delete t[n], o = o || "toggle" === s, s === (g ? "hide" : "show")) {
          if ("show" !== s || !v || void 0 === v[n]) continue;
          g = !0
        }
        p[n] = v && v[n] || re.style(e, n)
      }
      if ((l = !re.isEmptyObject(t)) || !re.isEmptyObject(p)) {
        d && 1 === e.nodeType && (i.overflow = [f.overflow, f.overflowX, f.overflowY], null == (c = v && v.display) && (c = _e.get(e, "display")), "none" === (u = re.css(e, "display")) && (c ? u = c : (m([e], !0), c = e.style.display || c, u = re.css(e, "display"), m([e]))), ("inline" === u || "inline-block" === u && null != c) && "none" === re.css(e, "float") && (l || (h.done(function () {
          f.display = c
        }), null == c && (u = f.display, c = "none" === u ? "" : u)), f.display = "inline-block")), i.overflow && (f.overflow = "hidden", h.always(function () {
          f.overflow = i.overflow[0], f.overflowX = i.overflow[1], f.overflowY = i.overflow[2]
        })), l = !1;
        for (n in p) l || (v ? "hidden" in v && (g = v.hidden) : v = _e.access(e, "fxshow", {display: c}), o && (v.hidden = !g), g && m([e], !0), h.done(function () {
          g || m([e]), _e.remove(e, "fxshow");
          for (n in p) re.style(e, n, p[n])
        })), l = H(g ? v[n] : 0, n, h), n in v || (v[n] = l.start, g && (l.end = l.start, l.start = 0))
      }
    }], prefilter: function (e, t) {
      t ? N.prefilters.unshift(e) : N.prefilters.push(e)
    }
  }), re.speed = function (e, t, i) {
    var n = e && "object" == typeof e ? re.extend({}, e) : {
      complete: i || !i && t || re.isFunction(e) && e,
      duration: e,
      easing: i && t || t && !re.isFunction(t) && t
    };
    return re.fx.off ? n.duration = 0 : "number" != typeof n.duration && (n.duration in re.fx.speeds ? n.duration = re.fx.speeds[n.duration] : n.duration = re.fx.speeds._default), null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function () {
      re.isFunction(n.old) && n.old.call(this), n.queue && re.dequeue(this, n.queue)
    }, n
  }, re.fn.extend({
    fadeTo: function (e, t, i, n) {
      return this.filter(De).css("opacity", 0).show().end().animate({opacity: t}, e, i, n)
    }, animate: function (e, t, i, n) {
      var s = re.isEmptyObject(e), o = re.speed(t, i, n), a = function () {
        var t = N(this, re.extend({}, e), o);
        (s || _e.get(this, "finish")) && t.stop(!0)
      };
      return a.finish = a, s || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
    }, stop: function (e, t, i) {
      var n = function (e) {
        var t = e.stop;
        delete e.stop, t(i)
      };
      return "string" != typeof e && (i = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function () {
        var t = !0, s = null != e && e + "queueHooks", o = re.timers, a = _e.get(this);
        if (s) a[s] && a[s].stop && n(a[s]); else for (s in a) a[s] && a[s].stop && ct.test(s) && n(a[s]);
        for (s = o.length; s--;) o[s].elem !== this || null != e && o[s].queue !== e || (o[s].anim.stop(i), t = !1, o.splice(s, 1));
        !t && i || re.dequeue(this, e)
      })
    }, finish: function (e) {
      return !1 !== e && (e = e || "fx"), this.each(function () {
        var t, i = _e.get(this), n = i[e + "queue"], s = i[e + "queueHooks"], o = re.timers, a = n ? n.length : 0;
        for (i.finish = !0, re.queue(this, e, []), s && s.stop && s.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
        for (t = 0; t < a; t++) n[t] && n[t].finish && n[t].finish.call(this);
        delete i.finish
      })
    }
  }), re.each(["toggle", "show", "hide"], function (e, t) {
    var i = re.fn[t];
    re.fn[t] = function (e, n, s) {
      return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(F(t, !0), e, n, s)
    }
  }), re.each({
    slideDown: F("show"),
    slideUp: F("hide"),
    slideToggle: F("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function (e, t) {
    re.fn[e] = function (e, i, n) {
      return this.animate(t, e, i, n)
    }
  }), re.timers = [], re.fx.tick = function () {
    var e, t = 0, i = re.timers;
    for (at = re.now(); t < i.length; t++) (e = i[t])() || i[t] !== e || i.splice(t--, 1);
    i.length || re.fx.stop(), at = void 0
  }, re.fx.timer = function (e) {
    re.timers.push(e), re.fx.start()
  }, re.fx.interval = 13, re.fx.start = function () {
    rt || (rt = !0, j())
  }, re.fx.stop = function () {
    rt = null
  }, re.fx.speeds = {slow: 600, fast: 200, _default: 400}, re.fn.delay = function (t, i) {
    return t = re.fx ? re.fx.speeds[t] || t : t, i = i || "fx", this.queue(i, function (i, n) {
      var s = e.setTimeout(i, t);
      n.stop = function () {
        e.clearTimeout(s)
      }
    })
  }, function () {
    var e = U.createElement("input"), t = U.createElement("select").appendChild(U.createElement("option"));
    e.type = "checkbox", ae.checkOn = "" !== e.value, ae.optSelected = t.selected, (e = U.createElement("input")).value = "t", e.type = "radio", ae.radioValue = "t" === e.value
  }();
  var ut, dt = re.expr.attrHandle;
  re.fn.extend({
    attr: function (e, t) {
      return Ee(this, re.attr, e, t, arguments.length > 1)
    }, removeAttr: function (e) {
      return this.each(function () {
        re.removeAttr(this, e)
      })
    }
  }), re.extend({
    attr: function (e, t, i) {
      var n, s, o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? re.prop(e, t, i) : (1 === o && re.isXMLDoc(e) || (s = re.attrHooks[t.toLowerCase()] || (re.expr.match.bool.test(t) ? ut : void 0)), void 0 !== i ? null === i ? void re.removeAttr(e, t) : s && "set" in s && void 0 !== (n = s.set(e, i, t)) ? n : (e.setAttribute(t, i + ""), i) : s && "get" in s && null !== (n = s.get(e, t)) ? n : null == (n = re.find.attr(e, t)) ? void 0 : n)
    }, attrHooks: {
      type: {
        set: function (e, t) {
          if (!ae.radioValue && "radio" === t && s(e, "input")) {
            var i = e.value;
            return e.setAttribute("type", t), i && (e.value = i), t
          }
        }
      }
    }, removeAttr: function (e, t) {
      var i, n = 0, s = t && t.match(Se);
      if (s && 1 === e.nodeType) for (; i = s[n++];) e.removeAttribute(i)
    }
  }), ut = {
    set: function (e, t, i) {
      return !1 === t ? re.removeAttr(e, i) : e.setAttribute(i, i), i
    }
  }, re.each(re.expr.match.bool.source.match(/\w+/g), function (e, t) {
    var i = dt[t] || re.find.attr;
    dt[t] = function (e, t, n) {
      var s, o, a = t.toLowerCase();
      return n || (o = dt[a], dt[a] = s, s = null != i(e, t, n) ? a : null, dt[a] = o), s
    }
  });
  var ht = /^(?:input|select|textarea|button)$/i, pt = /^(?:a|area)$/i;
  re.fn.extend({
    prop: function (e, t) {
      return Ee(this, re.prop, e, t, arguments.length > 1)
    }, removeProp: function (e) {
      return this.each(function () {
        delete this[re.propFix[e] || e]
      })
    }
  }), re.extend({
    prop: function (e, t, i) {
      var n, s, o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o) return 1 === o && re.isXMLDoc(e) || (t = re.propFix[t] || t, s = re.propHooks[t]), void 0 !== i ? s && "set" in s && void 0 !== (n = s.set(e, i, t)) ? n : e[t] = i : s && "get" in s && null !== (n = s.get(e, t)) ? n : e[t]
    }, propHooks: {
      tabIndex: {
        get: function (e) {
          var t = re.find.attr(e, "tabindex");
          return t ? parseInt(t, 10) : ht.test(e.nodeName) || pt.test(e.nodeName) && e.href ? 0 : -1
        }
      }
    }, propFix: {for: "htmlFor", class: "className"}
  }), ae.optSelected || (re.propHooks.selected = {
    get: function (e) {
      var t = e.parentNode;
      return t && t.parentNode && t.parentNode.selectedIndex, null
    }, set: function (e) {
      var t = e.parentNode;
      t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
    }
  }), re.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    re.propFix[this.toLowerCase()] = this
  }), re.fn.extend({
    addClass: function (e) {
      var t, i, n, s, o, a, r, l = 0;
      if (re.isFunction(e)) return this.each(function (t) {
        re(this).addClass(e.call(this, t, q(this)))
      });
      if ("string" == typeof e && e) for (t = e.match(Se) || []; i = this[l++];) if (s = q(i), n = 1 === i.nodeType && " " + R(s) + " ") {
        for (a = 0; o = t[a++];) n.indexOf(" " + o + " ") < 0 && (n += o + " ");
        s !== (r = R(n)) && i.setAttribute("class", r)
      }
      return this
    }, removeClass: function (e) {
      var t, i, n, s, o, a, r, l = 0;
      if (re.isFunction(e)) return this.each(function (t) {
        re(this).removeClass(e.call(this, t, q(this)))
      });
      if (!arguments.length) return this.attr("class", "");
      if ("string" == typeof e && e) for (t = e.match(Se) || []; i = this[l++];) if (s = q(i), n = 1 === i.nodeType && " " + R(s) + " ") {
        for (a = 0; o = t[a++];) for (; n.indexOf(" " + o + " ") > -1;) n = n.replace(" " + o + " ", " ");
        s !== (r = R(n)) && i.setAttribute("class", r)
      }
      return this
    }, toggleClass: function (e, t) {
      var i = typeof e;
      return "boolean" == typeof t && "string" === i ? t ? this.addClass(e) : this.removeClass(e) : re.isFunction(e) ? this.each(function (i) {
        re(this).toggleClass(e.call(this, i, q(this), t), t)
      }) : this.each(function () {
        var t, n, s, o;
        if ("string" === i) for (n = 0, s = re(this), o = e.match(Se) || []; t = o[n++];) s.hasClass(t) ? s.removeClass(t) : s.addClass(t); else void 0 !== e && "boolean" !== i || ((t = q(this)) && _e.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : _e.get(this, "__className__") || ""))
      })
    }, hasClass: function (e) {
      var t, i, n = 0;
      for (t = " " + e + " "; i = this[n++];) if (1 === i.nodeType && (" " + R(q(i)) + " ").indexOf(t) > -1) return !0;
      return !1
    }
  });
  var ft = /\r/g;
  re.fn.extend({
    val: function (e) {
      var t, i, n, s = this[0];
      return arguments.length ? (n = re.isFunction(e), this.each(function (i) {
        var s;
        1 === this.nodeType && (null == (s = n ? e.call(this, i, re(this).val()) : e) ? s = "" : "number" == typeof s ? s += "" : Array.isArray(s) && (s = re.map(s, function (e) {
          return null == e ? "" : e + ""
        })), (t = re.valHooks[this.type] || re.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, s, "value") || (this.value = s))
      })) : s ? (t = re.valHooks[s.type] || re.valHooks[s.nodeName.toLowerCase()]) && "get" in t && void 0 !== (i = t.get(s, "value")) ? i : "string" == typeof(i = s.value) ? i.replace(ft, "") : null == i ? "" : i : void 0
    }
  }), re.extend({
    valHooks: {
      option: {
        get: function (e) {
          var t = re.find.attr(e, "value");
          return null != t ? t : R(re.text(e))
        }
      }, select: {
        get: function (e) {
          var t, i, n, o = e.options, a = e.selectedIndex, r = "select-one" === e.type, l = r ? null : [],
            c = r ? a + 1 : o.length;
          for (n = a < 0 ? c : r ? a : 0; n < c; n++) if (((i = o[n]).selected || n === a) && !i.disabled && (!i.parentNode.disabled || !s(i.parentNode, "optgroup"))) {
            if (t = re(i).val(), r) return t;
            l.push(t)
          }
          return l
        }, set: function (e, t) {
          for (var i, n, s = e.options, o = re.makeArray(t), a = s.length; a--;) n = s[a], (n.selected = re.inArray(re.valHooks.option.get(n), o) > -1) && (i = !0);
          return i || (e.selectedIndex = -1), o
        }
      }
    }
  }), re.each(["radio", "checkbox"], function () {
    re.valHooks[this] = {
      set: function (e, t) {
        if (Array.isArray(t)) return e.checked = re.inArray(re(e).val(), t) > -1
      }
    }, ae.checkOn || (re.valHooks[this].get = function (e) {
      return null === e.getAttribute("value") ? "on" : e.value
    })
  });
  var mt = /^(?:focusinfocus|focusoutblur)$/;
  re.extend(re.event, {
    trigger: function (t, i, n, s) {
      var o, a, r, l, c, u, d, h = [n || U], p = ne.call(t, "type") ? t.type : t,
        f = ne.call(t, "namespace") ? t.namespace.split(".") : [];
      if (a = r = n = n || U, 3 !== n.nodeType && 8 !== n.nodeType && !mt.test(p + re.event.triggered) && (p.indexOf(".") > -1 && (f = p.split("."), p = f.shift(), f.sort()), c = p.indexOf(":") < 0 && "on" + p, t = t[re.expando] ? t : new re.Event(p, "object" == typeof t && t), t.isTrigger = s ? 2 : 3, t.namespace = f.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = n), i = null == i ? [t] : re.makeArray(i, [t]), d = re.event.special[p] || {}, s || !d.trigger || !1 !== d.trigger.apply(n, i))) {
        if (!s && !d.noBubble && !re.isWindow(n)) {
          for (l = d.delegateType || p, mt.test(l + p) || (a = a.parentNode); a; a = a.parentNode) h.push(a), r = a;
          r === (n.ownerDocument || U) && h.push(r.defaultView || r.parentWindow || e)
        }
        for (o = 0; (a = h[o++]) && !t.isPropagationStopped();) t.type = o > 1 ? l : d.bindType || p, (u = (_e.get(a, "events") || {})[t.type] && _e.get(a, "handle")) && u.apply(a, i), (u = c && a[c]) && u.apply && ke(a) && (t.result = u.apply(a, i), !1 === t.result && t.preventDefault());
        return t.type = p, s || t.isDefaultPrevented() || d._default && !1 !== d._default.apply(h.pop(), i) || !ke(n) || c && re.isFunction(n[p]) && !re.isWindow(n) && ((r = n[c]) && (n[c] = null), re.event.triggered = p, n[p](), re.event.triggered = void 0, r && (n[c] = r)), t.result
      }
    }, simulate: function (e, t, i) {
      var n = re.extend(new re.Event, i, {type: e, isSimulated: !0});
      re.event.trigger(n, null, t)
    }
  }), re.fn.extend({
    trigger: function (e, t) {
      return this.each(function () {
        re.event.trigger(e, t, this)
      })
    }, triggerHandler: function (e, t) {
      var i = this[0];
      if (i) return re.event.trigger(e, t, i, !0)
    }
  }), re.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, t) {
    re.fn[t] = function (e, i) {
      return arguments.length > 0 ? this.on(t, null, e, i) : this.trigger(t)
    }
  }), re.fn.extend({
    hover: function (e, t) {
      return this.mouseenter(e).mouseleave(t || e)
    }
  }), ae.focusin = "onfocusin" in e, ae.focusin || re.each({focus: "focusin", blur: "focusout"}, function (e, t) {
    var i = function (e) {
      re.event.simulate(t, e.target, re.event.fix(e))
    };
    re.event.special[t] = {
      setup: function () {
        var n = this.ownerDocument || this, s = _e.access(n, t);
        s || n.addEventListener(e, i, !0), _e.access(n, t, (s || 0) + 1)
      }, teardown: function () {
        var n = this.ownerDocument || this, s = _e.access(n, t) - 1;
        s ? _e.access(n, t, s) : (n.removeEventListener(e, i, !0), _e.remove(n, t))
      }
    }
  });
  var gt = e.location, vt = re.now(), yt = /\?/;
  re.parseXML = function (t) {
    var i;
    if (!t || "string" != typeof t) return null;
    try {
      i = (new e.DOMParser).parseFromString(t, "text/xml")
    } catch (e) {
      i = void 0
    }
    return i && !i.getElementsByTagName("parsererror").length || re.error("Invalid XML: " + t), i
  };
  var bt = /\[\]$/, xt = /\r?\n/g, wt = /^(?:submit|button|image|reset|file)$/i,
    St = /^(?:input|select|textarea|keygen)/i;
  re.param = function (e, t) {
    var i, n = [], s = function (e, t) {
      var i = re.isFunction(t) ? t() : t;
      n[n.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == i ? "" : i)
    };
    if (Array.isArray(e) || e.jquery && !re.isPlainObject(e)) re.each(e, function () {
      s(this.name, this.value)
    }); else for (i in e) W(i, e[i], t, s);
    return n.join("&")
  }, re.fn.extend({
    serialize: function () {
      return re.param(this.serializeArray())
    }, serializeArray: function () {
      return this.map(function () {
        var e = re.prop(this, "elements");
        return e ? re.makeArray(e) : this
      }).filter(function () {
        var e = this.type;
        return this.name && !re(this).is(":disabled") && St.test(this.nodeName) && !wt.test(e) && (this.checked || !je.test(e))
      }).map(function (e, t) {
        var i = re(this).val();
        return null == i ? null : Array.isArray(i) ? re.map(i, function (e) {
          return {name: t.name, value: e.replace(xt, "\r\n")}
        }) : {name: t.name, value: i.replace(xt, "\r\n")}
      }).get()
    }
  });
  var Ct = /%20/g, Tt = /#.*$/, Et = /([?&])_=[^&]*/, kt = /^(.*?):[ \t]*([^\r\n]*)$/gm, _t = /^(?:GET|HEAD)$/,
    Mt = /^\/\//, Pt = {}, It = {}, Lt = "*/".concat("*"), zt = U.createElement("a");
  zt.href = gt.href, re.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: gt.href,
      type: "GET",
      isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(gt.protocol),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Lt,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
      responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
      converters: {"* text": String, "text html": !0, "text json": JSON.parse, "text xml": re.parseXML},
      flatOptions: {url: !0, context: !0}
    },
    ajaxSetup: function (e, t) {
      return t ? V(V(e, re.ajaxSettings), t) : V(re.ajaxSettings, e)
    },
    ajaxPrefilter: X(Pt),
    ajaxTransport: X(It),
    ajax: function (t, i) {
      function n(t, i, n, r) {
        var c, h, p, x, w, S = i;
        u || (u = !0, l && e.clearTimeout(l), s = void 0, a = r || "", C.readyState = t > 0 ? 4 : 0, c = t >= 200 && t < 300 || 304 === t, n && (x = function (e, t, i) {
          for (var n, s, o, a, r = e.contents, l = e.dataTypes; "*" === l[0];) l.shift(), void 0 === n && (n = e.mimeType || t.getResponseHeader("Content-Type"));
          if (n) for (s in r) if (r[s] && r[s].test(n)) {
            l.unshift(s);
            break
          }
          if (l[0] in i) o = l[0]; else {
            for (s in i) {
              if (!l[0] || e.converters[s + " " + l[0]]) {
                o = s;
                break
              }
              a || (a = s)
            }
            o = o || a
          }
          if (o) return o !== l[0] && l.unshift(o), i[o]
        }(f, C, n)), x = function (e, t, i, n) {
          var s, o, a, r, l, c = {}, u = e.dataTypes.slice();
          if (u[1]) for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
          for (o = u.shift(); o;) if (e.responseFields[o] && (i[e.responseFields[o]] = t), !l && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = u.shift()) if ("*" === o) o = l; else if ("*" !== l && l !== o) {
            if (!(a = c[l + " " + o] || c["* " + o])) for (s in c) if ((r = s.split(" "))[1] === o && (a = c[l + " " + r[0]] || c["* " + r[0]])) {
              !0 === a ? a = c[s] : !0 !== c[s] && (o = r[0], u.unshift(r[1]));
              break
            }
            if (!0 !== a) if (a && e.throws) t = a(t); else try {
              t = a(t)
            } catch (e) {
              return {state: "parsererror", error: a ? e : "No conversion from " + l + " to " + o}
            }
          }
          return {state: "success", data: t}
        }(f, x, C, c), c ? (f.ifModified && ((w = C.getResponseHeader("Last-Modified")) && (re.lastModified[o] = w), (w = C.getResponseHeader("etag")) && (re.etag[o] = w)), 204 === t || "HEAD" === f.type ? S = "nocontent" : 304 === t ? S = "notmodified" : (S = x.state, h = x.data, p = x.error, c = !p)) : (p = S, !t && S || (S = "error", t < 0 && (t = 0))), C.status = t, C.statusText = (i || S) + "", c ? v.resolveWith(m, [h, S, C]) : v.rejectWith(m, [C, S, p]), C.statusCode(b), b = void 0, d && g.trigger(c ? "ajaxSuccess" : "ajaxError", [C, f, c ? h : p]), y.fireWith(m, [C, S]), d && (g.trigger("ajaxComplete", [C, f]), --re.active || re.event.trigger("ajaxStop")))
      }

      "object" == typeof t && (i = t, t = void 0), i = i || {};
      var s, o, a, r, l, c, u, d, h, p, f = re.ajaxSetup({}, i), m = f.context || f,
        g = f.context && (m.nodeType || m.jquery) ? re(m) : re.event, v = re.Deferred(),
        y = re.Callbacks("once memory"), b = f.statusCode || {}, x = {}, w = {}, S = "canceled", C = {
          readyState: 0, getResponseHeader: function (e) {
            var t;
            if (u) {
              if (!r) for (r = {}; t = kt.exec(a);) r[t[1].toLowerCase()] = t[2];
              t = r[e.toLowerCase()]
            }
            return null == t ? null : t
          }, getAllResponseHeaders: function () {
            return u ? a : null
          }, setRequestHeader: function (e, t) {
            return null == u && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e, x[e] = t), this
          }, overrideMimeType: function (e) {
            return null == u && (f.mimeType = e), this
          }, statusCode: function (e) {
            var t;
            if (e) if (u) C.always(e[C.status]); else for (t in e) b[t] = [b[t], e[t]];
            return this
          }, abort: function (e) {
            var t = e || S;
            return s && s.abort(t), n(0, t), this
          }
        };
      if (v.promise(C), f.url = ((t || f.url || gt.href) + "").replace(Mt, gt.protocol + "//"), f.type = i.method || i.type || f.method || f.type, f.dataTypes = (f.dataType || "*").toLowerCase().match(Se) || [""], null == f.crossDomain) {
        c = U.createElement("a");
        try {
          c.href = f.url, c.href = c.href, f.crossDomain = zt.protocol + "//" + zt.host != c.protocol + "//" + c.host
        } catch (e) {
          f.crossDomain = !0
        }
      }
      if (f.data && f.processData && "string" != typeof f.data && (f.data = re.param(f.data, f.traditional)), Y(Pt, f, i, C), u) return C;
      (d = re.event && f.global) && 0 == re.active++ && re.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !_t.test(f.type), o = f.url.replace(Tt, ""), f.hasContent ? f.data && f.processData && 0 === (f.contentType || "").indexOf("application/x-www-form-urlencoded") && (f.data = f.data.replace(Ct, "+")) : (p = f.url.slice(o.length), f.data && (o += (yt.test(o) ? "&" : "?") + f.data, delete f.data), !1 === f.cache && (o = o.replace(Et, "$1"), p = (yt.test(o) ? "&" : "?") + "_=" + vt++ + p), f.url = o + p), f.ifModified && (re.lastModified[o] && C.setRequestHeader("If-Modified-Since", re.lastModified[o]), re.etag[o] && C.setRequestHeader("If-None-Match", re.etag[o])), (f.data && f.hasContent && !1 !== f.contentType || i.contentType) && C.setRequestHeader("Content-Type", f.contentType), C.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Lt + "; q=0.01" : "") : f.accepts["*"]);
      for (h in f.headers) C.setRequestHeader(h, f.headers[h]);
      if (f.beforeSend && (!1 === f.beforeSend.call(m, C, f) || u)) return C.abort();
      if (S = "abort", y.add(f.complete), C.done(f.success), C.fail(f.error), s = Y(It, f, i, C)) {
        if (C.readyState = 1, d && g.trigger("ajaxSend", [C, f]), u) return C;
        f.async && f.timeout > 0 && (l = e.setTimeout(function () {
          C.abort("timeout")
        }, f.timeout));
        try {
          u = !1, s.send(x, n)
        } catch (e) {
          if (u) throw e;
          n(-1, e)
        }
      } else n(-1, "No Transport");
      return C
    },
    getJSON: function (e, t, i) {
      return re.get(e, t, i, "json")
    },
    getScript: function (e, t) {
      return re.get(e, void 0, t, "script")
    }
  }), re.each(["get", "post"], function (e, t) {
    re[t] = function (e, i, n, s) {
      return re.isFunction(i) && (s = s || n, n = i, i = void 0), re.ajax(re.extend({
        url: e,
        type: t,
        dataType: s,
        data: i,
        success: n
      }, re.isPlainObject(e) && e))
    }
  }), re._evalUrl = function (e) {
    return re.ajax({url: e, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, throws: !0})
  }, re.fn.extend({
    wrapAll: function (e) {
      var t;
      return this[0] && (re.isFunction(e) && (e = e.call(this[0])), t = re(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
        for (var e = this; e.firstElementChild;) e = e.firstElementChild;
        return e
      }).append(this)), this
    }, wrapInner: function (e) {
      return re.isFunction(e) ? this.each(function (t) {
        re(this).wrapInner(e.call(this, t))
      }) : this.each(function () {
        var t = re(this), i = t.contents();
        i.length ? i.wrapAll(e) : t.append(e)
      })
    }, wrap: function (e) {
      var t = re.isFunction(e);
      return this.each(function (i) {
        re(this).wrapAll(t ? e.call(this, i) : e)
      })
    }, unwrap: function (e) {
      return this.parent(e).not("body").each(function () {
        re(this).replaceWith(this.childNodes)
      }), this
    }
  }), re.expr.pseudos.hidden = function (e) {
    return !re.expr.pseudos.visible(e)
  }, re.expr.pseudos.visible = function (e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
  }, re.ajaxSettings.xhr = function () {
    try {
      return new e.XMLHttpRequest
    } catch (e) {
    }
  };
  var At = {0: 200, 1223: 204}, Dt = re.ajaxSettings.xhr();
  ae.cors = !!Dt && "withCredentials" in Dt, ae.ajax = Dt = !!Dt, re.ajaxTransport(function (t) {
    var i, n;
    if (ae.cors || Dt && !t.crossDomain) return {
      send: function (s, o) {
        var a, r = t.xhr();
        if (r.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields) for (a in t.xhrFields) r[a] = t.xhrFields[a];
        t.mimeType && r.overrideMimeType && r.overrideMimeType(t.mimeType), t.crossDomain || s["X-Requested-With"] || (s["X-Requested-With"] = "XMLHttpRequest");
        for (a in s) r.setRequestHeader(a, s[a]);
        i = function (e) {
          return function () {
            i && (i = n = r.onload = r.onerror = r.onabort = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? o(0, "error") : o(r.status, r.statusText) : o(At[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {binary: r.response} : {text: r.responseText}, r.getAllResponseHeaders()))
          }
        }, r.onload = i(), n = r.onerror = i("error"), void 0 !== r.onabort ? r.onabort = n : r.onreadystatechange = function () {
          4 === r.readyState && e.setTimeout(function () {
            i && n()
          })
        }, i = i("abort");
        try {
          r.send(t.hasContent && t.data || null)
        } catch (e) {
          if (i) throw e
        }
      }, abort: function () {
        i && i()
      }
    }
  }), re.ajaxPrefilter(function (e) {
    e.crossDomain && (e.contents.script = !1)
  }), re.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
    contents: {script: /\b(?:java|ecma)script\b/},
    converters: {
      "text script": function (e) {
        return re.globalEval(e), e
      }
    }
  }), re.ajaxPrefilter("script", function (e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
  }), re.ajaxTransport("script", function (e) {
    if (e.crossDomain) {
      var t, i;
      return {
        send: function (n, s) {
          t = re("<script>").prop({charset: e.scriptCharset, src: e.url}).on("load error", i = function (e) {
            t.remove(), i = null, e && s("error" === e.type ? 404 : 200, e.type)
          }), U.head.appendChild(t[0])
        }, abort: function () {
          i && i()
        }
      }
    }
  });
  var $t = [], Ot = /(=)\?(?=&|$)|\?\?/;
  re.ajaxSetup({
    jsonp: "callback", jsonpCallback: function () {
      var e = $t.pop() || re.expando + "_" + vt++;
      return this[e] = !0, e
    }
  }), re.ajaxPrefilter("json jsonp", function (t, i, n) {
    var s, o, a,
      r = !1 !== t.jsonp && (Ot.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ot.test(t.data) && "data");
    if (r || "jsonp" === t.dataTypes[0]) return s = t.jsonpCallback = re.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, r ? t[r] = t[r].replace(Ot, "$1" + s) : !1 !== t.jsonp && (t.url += (yt.test(t.url) ? "&" : "?") + t.jsonp + "=" + s), t.converters["script json"] = function () {
      return a || re.error(s + " was not called"), a[0]
    }, t.dataTypes[0] = "json", o = e[s], e[s] = function () {
      a = arguments
    }, n.always(function () {
      void 0 === o ? re(e).removeProp(s) : e[s] = o, t[s] && (t.jsonpCallback = i.jsonpCallback, $t.push(s)), a && re.isFunction(o) && o(a[0]), a = o = void 0
    }), "script"
  }), ae.createHTMLDocument = function () {
    var e = U.implementation.createHTMLDocument("").body;
    return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
  }(), re.parseHTML = function (e, t, i) {
    if ("string" != typeof e) return [];
    "boolean" == typeof t && (i = t, t = !1);
    var n, s, o;
    return t || (ae.createHTMLDocument ? (t = U.implementation.createHTMLDocument(""), n = t.createElement("base"), n.href = U.location.href, t.head.appendChild(n)) : t = U), s = ge.exec(e), o = !i && [], s ? [t.createElement(s[1])] : (s = y([e], t, o), o && o.length && re(o).remove(), re.merge([], s.childNodes))
  }, re.fn.load = function (e, t, i) {
    var n, s, o, a = this, r = e.indexOf(" ");
    return r > -1 && (n = R(e.slice(r)), e = e.slice(0, r)), re.isFunction(t) ? (i = t, t = void 0) : t && "object" == typeof t && (s = "POST"), a.length > 0 && re.ajax({
      url: e,
      type: s || "GET",
      dataType: "html",
      data: t
    }).done(function (e) {
      o = arguments, a.html(n ? re("<div>").append(re.parseHTML(e)).find(n) : e)
    }).always(i && function (e, t) {
      a.each(function () {
        i.apply(this, o || [e.responseText, t, e])
      })
    }), this
  }, re.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
    re.fn[t] = function (e) {
      return this.on(t, e)
    }
  }), re.expr.pseudos.animated = function (e) {
    return re.grep(re.timers, function (t) {
      return e === t.elem
    }).length
  }, re.offset = {
    setOffset: function (e, t, i) {
      var n, s, o, a, r, l, c = re.css(e, "position"), u = re(e), d = {};
      "static" === c && (e.style.position = "relative"), r = u.offset(), o = re.css(e, "top"), l = re.css(e, "left"), ("absolute" === c || "fixed" === c) && (o + l).indexOf("auto") > -1 ? (n = u.position(), a = n.top, s = n.left) : (a = parseFloat(o) || 0, s = parseFloat(l) || 0), re.isFunction(t) && (t = t.call(e, i, re.extend({}, r))), null != t.top && (d.top = t.top - r.top + a), null != t.left && (d.left = t.left - r.left + s), "using" in t ? t.using.call(e, d) : u.css(d)
    }
  }, re.fn.extend({
    offset: function (e) {
      if (arguments.length) return void 0 === e ? this : this.each(function (t) {
        re.offset.setOffset(this, e, t)
      });
      var t, i, n, s, o = this[0];
      return o ? o.getClientRects().length ? (n = o.getBoundingClientRect(), t = o.ownerDocument, i = t.documentElement, s = t.defaultView, {
        top: n.top + s.pageYOffset - i.clientTop,
        left: n.left + s.pageXOffset - i.clientLeft
      }) : {top: 0, left: 0} : void 0
    }, position: function () {
      if (this[0]) {
        var e, t, i = this[0], n = {top: 0, left: 0};
        return "fixed" === re.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), s(e[0], "html") || (n = e.offset()), n = {
          top: n.top + re.css(e[0], "borderTopWidth", !0),
          left: n.left + re.css(e[0], "borderLeftWidth", !0)
        }), {top: t.top - n.top - re.css(i, "marginTop", !0), left: t.left - n.left - re.css(i, "marginLeft", !0)}
      }
    }, offsetParent: function () {
      return this.map(function () {
        for (var e = this.offsetParent; e && "static" === re.css(e, "position");) e = e.offsetParent;
        return e || Re
      })
    }
  }), re.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
    var i = "pageYOffset" === t;
    re.fn[e] = function (n) {
      return Ee(this, function (e, n, s) {
        var o;
        return re.isWindow(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === s ? o ? o[t] : e[n] : void(o ? o.scrollTo(i ? o.pageXOffset : s, i ? s : o.pageYOffset) : e[n] = s)
      }, e, n, arguments.length)
    }
  }), re.each(["top", "left"], function (e, t) {
    re.cssHooks[t] = L(ae.pixelPosition, function (e, i) {
      if (i) return i = I(e, t), Ze.test(i) ? re(e).position()[t] + "px" : i
    })
  }), re.each({Height: "height", Width: "width"}, function (e, t) {
    re.each({padding: "inner" + e, content: t, "": "outer" + e}, function (i, n) {
      re.fn[n] = function (s, o) {
        var a = arguments.length && (i || "boolean" != typeof s), r = i || (!0 === s || !0 === o ? "margin" : "border");
        return Ee(this, function (t, i, s) {
          var o;
          return re.isWindow(t) ? 0 === n.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === s ? re.css(t, i, r) : re.style(t, i, s, r)
        }, t, a ? s : void 0, a)
      }
    })
  }), re.fn.extend({
    bind: function (e, t, i) {
      return this.on(e, null, t, i)
    }, unbind: function (e, t) {
      return this.off(e, null, t)
    }, delegate: function (e, t, i, n) {
      return this.on(t, e, i, n)
    }, undelegate: function (e, t, i) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
    }
  }), re.holdReady = function (e) {
    e ? re.readyWait++ : re.ready(!0)
  }, re.isArray = Array.isArray, re.parseJSON = JSON.parse, re.nodeName = s, "function" == typeof define && define.amd && define("jquery", [], function () {
    return re
  });
  var jt = e.jQuery, Bt = e.$;
  return re.noConflict = function (t) {
    return e.$ === re && (e.$ = Bt), t && e.jQuery === re && (e.jQuery = jt), re
  }, t || (e.jQuery = e.$ = re), re
}), void 0 === jQuery.migrateMute && (jQuery.migrateMute = !0), function (e, t) {
  "use strict";

  function i(i) {
    var n = t.console;
    s[i] || (s[i] = !0, e.migrateWarnings.push(i), n && n.warn && !e.migrateMute && (n.warn("JQMIGRATE: " + i), e.migrateTrace && n.trace && n.trace()))
  }

  function n(e, t, n, s) {
    Object.defineProperty(e, t, {
      configurable: !0, enumerable: !0, get: function () {
        return i(s), n
      }
    })
  }

  e.migrateVersion = "3.0.0", function () {
    var i = t.console && t.console.log && function () {
      t.console.log.apply(t.console, arguments)
    };
    i && (e && !/^[12]\./.test(e.fn.jquery) || i("JQMIGRATE: jQuery 3.0.0+ REQUIRED"), e.migrateWarnings && i("JQMIGRATE: Migrate plugin loaded multiple times"), i("JQMIGRATE: Migrate is installed" + (e.migrateMute ? "" : " with logging active") + ", version " + e.migrateVersion))
  }();
  var s = {};
  e.migrateWarnings = [], void 0 === e.migrateTrace && (e.migrateTrace = !0), e.migrateReset = function () {
    s = {}, e.migrateWarnings.length = 0
  }, "BackCompat" === document.compatMode && i("jQuery is not compatible with Quirks Mode");
  var o = e.fn.init, a = e.isNumeric, r = e.find, l = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
    c = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g;
  e.fn.init = function (e) {
    var t = Array.prototype.slice.call(arguments);
    return "string" == typeof e && "#" === e && (i("jQuery( '#' ) is not a valid selector"), t[0] = []), o.apply(this, t)
  }, e.fn.init.prototype = e.fn, e.find = function (e) {
    var t = Array.prototype.slice.call(arguments);
    if ("string" == typeof e && l.test(e)) try {
      document.querySelector(e)
    } catch (n) {
      e = e.replace(c, function (e, t, i, n) {
        return "[" + t + i + '"' + n + '"]'
      });
      try {
        document.querySelector(e), i("Attribute selector with '#' must be quoted: " + t[0]), t[0] = e
      } catch (e) {
        i("Attribute selector with '#' was not fixed: " + t[0])
      }
    }
    return r.apply(this, t)
  };
  var u;
  for (u in r) Object.prototype.hasOwnProperty.call(r, u) && (e.find[u] = r[u]);
  e.fn.size = function () {
    return i("jQuery.fn.size() is deprecated; use the .length property"), this.length
  }, e.parseJSON = function () {
    return i("jQuery.parseJSON is deprecated; use JSON.parse"), JSON.parse.apply(null, arguments)
  }, e.isNumeric = function (t) {
    var n = a(t), s = function (t) {
      var i = t && t.toString();
      return !e.isArray(t) && i - parseFloat(i) + 1 >= 0
    }(t);
    return n !== s && i("jQuery.isNumeric() should not be called on constructed objects"), s
  }, n(e, "unique", e.uniqueSort, "jQuery.unique is deprecated, use jQuery.uniqueSort"), n(e.expr, "filters", e.expr.pseudos, "jQuery.expr.filters is now jQuery.expr.pseudos"), n(e.expr, ":", e.expr.pseudos, 'jQuery.expr[":"] is now jQuery.expr.pseudos');
  var d = e.ajax;
  e.ajax = function () {
    var e = d.apply(this, arguments);
    return e.promise && (n(e, "success", e.done, "jQXHR.success is deprecated and removed"), n(e, "error", e.fail, "jQXHR.error is deprecated and removed"), n(e, "complete", e.always, "jQXHR.complete is deprecated and removed")), e
  };
  var h = e.fn.removeAttr, p = e.fn.toggleClass, f = /\S+/g;
  e.fn.removeAttr = function (t) {
    var n = this;
    return e.each(t.match(f), function (t, s) {
      e.expr.match.bool.test(s) && (i("jQuery.fn.removeAttr no longer sets boolean properties: " + s), n.prop(s, !1))
    }), h.apply(this, arguments)
  }, e.fn.toggleClass = function (t) {
    return void 0 !== t && "boolean" != typeof t ? p.apply(this, arguments) : (i("jQuery.fn.toggleClass( boolean ) is deprecated"), this.each(function () {
      var i = this.getAttribute && this.getAttribute("class") || "";
      i && e.data(this, "__className__", i), this.setAttribute && this.setAttribute("class", i || !1 === t ? "" : e.data(this, "__className__") || "")
    }))
  };
  var m = !1;
  e.swap && e.each(["height", "width", "reliableMarginRight"], function (t, i) {
    var n = e.cssHooks[i] && e.cssHooks[i].get;
    n && (e.cssHooks[i].get = function () {
      var e;
      return m = !0, e = n.apply(this, arguments), m = !1, e
    })
  }), e.swap = function (e, t, n, s) {
    var o, a, r = {};
    m || i("jQuery.swap() is undocumented and deprecated");
    for (a in t) r[a] = e.style[a], e.style[a] = t[a];
    o = n.apply(e, s || []);
    for (a in t) e.style[a] = r[a];
    return o
  };
  var g = e.data;
  e.data = function (t, n, s) {
    var o;
    return n && n !== e.camelCase(n) && (o = e.hasData(t) && g.call(this, t)) && n in o ? (i("jQuery.data() always sets/gets camelCased names: " + n), arguments.length > 2 && (o[n] = s), o[n]) : g.apply(this, arguments)
  };
  var v = e.Tween.prototype.run;
  e.Tween.prototype.run = function (t) {
    e.easing[this.easing].length > 1 && (i('easing function "jQuery.easing.' + this.easing.toString() + '" should use only first argument'), e.easing[this.easing] = e.easing[this.easing].bind(e.easing, t, this.options.duration * t, 0, 1, this.options.duration)), v.apply(this, arguments)
  };
  var y = e.fn.load, b = e.event.fix;
  e.event.props = [], e.event.fixHooks = {}, e.event.fix = function (t) {
    var n, s = t.type, o = this.fixHooks[s], a = e.event.props;
    if (a.length) for (i("jQuery.event.props are deprecated and removed: " + a.join()); a.length;) e.event.addProp(a.pop());
    if (o && !o._migrated_ && (o._migrated_ = !0, i("jQuery.event.fixHooks are deprecated and removed: " + s), (a = o.props) && a.length)) for (; a.length;) e.event.addProp(a.pop());
    return n = b.call(this, t), o && o.filter ? o.filter(n, t) : n
  }, e.each(["load", "unload", "error"], function (t, n) {
    e.fn[n] = function () {
      var e = Array.prototype.slice.call(arguments, 0);
      return "load" === n && "string" == typeof e[0] ? y.apply(this, e) : (i("jQuery.fn." + n + "() is deprecated"), e.splice(0, 0, n), arguments.length ? this.on.apply(this, e) : (this.triggerHandler.apply(this, e), this))
    }
  }), e(function () {
    e(document).triggerHandler("ready")
  }), e.event.special.ready = {
    setup: function () {
      this === document && i("'ready' event is deprecated")
    }
  }, e.fn.extend({
    bind: function (e, t, n) {
      return i("jQuery.fn.bind() is deprecated"), this.on(e, null, t, n)
    }, unbind: function (e, t) {
      return i("jQuery.fn.unbind() is deprecated"), this.off(e, null, t)
    }, delegate: function (e, t, n, s) {
      return i("jQuery.fn.delegate() is deprecated"), this.on(t, e, n, s)
    }, undelegate: function (e, t, n) {
      return i("jQuery.fn.undelegate() is deprecated"), 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
    }
  });
  var x = e.fn.offset;
  e.fn.offset = function () {
    var t, n = this[0], s = {top: 0, left: 0};
    return n && n.nodeType ? (t = (n.ownerDocument || document).documentElement, e.contains(t, n) ? x.apply(this, arguments) : (i("jQuery.fn.offset() requires an element connected to a document"), s)) : (i("jQuery.fn.offset() requires a valid DOM element"), s)
  };
  var w = e.param;
  e.param = function (t, n) {
    var s = e.ajaxSettings && e.ajaxSettings.traditional;
    return void 0 === n && s && (i("jQuery.param() no longer uses jQuery.ajaxSettings.traditional"), n = s), w.call(this, t, n)
  };
  var S = e.fn.andSelf || e.fn.addBack;
  e.fn.andSelf = function () {
    return i("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), S.apply(this, arguments)
  };
  var C = e.Deferred,
    T = [["resolve", "done", e.Callbacks("once memory"), e.Callbacks("once memory"), "resolved"], ["reject", "fail", e.Callbacks("once memory"), e.Callbacks("once memory"), "rejected"], ["notify", "progress", e.Callbacks("memory"), e.Callbacks("memory")]];
  e.Deferred = function (t) {
    var n = C(), s = n.promise();
    return n.pipe = s.pipe = function () {
      var t = arguments;
      return i("deferred.pipe() is deprecated"), e.Deferred(function (i) {
        e.each(T, function (o, a) {
          var r = e.isFunction(t[o]) && t[o];
          n[a[1]](function () {
            var t = r && r.apply(this, arguments);
            t && e.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[a[0] + "With"](this === s ? i.promise() : this, r ? [t] : arguments)
          })
        }), t = null
      }).promise()
    }, t && t.call(n, n), n
  }
}(jQuery, window), function (e, t) {
  "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
    return t(e, i)
  }) : "object" == typeof module && module.exports ? module.exports = t(e, require("jquery")) : e.jQueryBridget = t(e, e.jQuery)
}(window, function (e, t) {
  "use strict";

  function i(i, o, r) {
    (r = r || t || e.jQuery) && (o.prototype.option || (o.prototype.option = function (e) {
      r.isPlainObject(e) && (this.options = r.extend(!0, this.options, e))
    }), r.fn[i] = function (e) {
      if ("string" == typeof e) {
        return function (e, t, n) {
          var s, o = "$()." + i + '("' + t + '")';
          return e.each(function (e, l) {
            var c = r.data(l, i);
            if (c) {
              var u = c[t];
              if (u && "_" != t.charAt(0)) {
                var d = u.apply(c, n);
                s = void 0 === s ? d : s
              } else a(o + " is not a valid method")
            } else a(i + " not initialized. Cannot call methods, i.e. " + o)
          }), void 0 !== s ? s : e
        }(this, e, s.call(arguments, 1))
      }
      return function (e, t) {
        e.each(function (e, n) {
          var s = r.data(n, i);
          s ? (s.option(t), s._init()) : (s = new o(n, t), r.data(n, i, s))
        })
      }(this, e), this
    }, n(r))
  }

  function n(e) {
    !e || e && e.bridget || (e.bridget = i)
  }

  var s = Array.prototype.slice, o = e.console, a = void 0 === o ? function () {
  } : function (e) {
    o.error(e)
  };
  return n(t || e.jQuery), i
}), function (e, t) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, function () {
  function e() {
  }

  var t = e.prototype;
  return t.on = function (e, t) {
    if (e && t) {
      var i = this._events = this._events || {}, n = i[e] = i[e] || [];
      return -1 == n.indexOf(t) && n.push(t), this
    }
  }, t.once = function (e, t) {
    if (e && t) {
      this.on(e, t);
      var i = this._onceEvents = this._onceEvents || {};
      return (i[e] = i[e] || {})[t] = !0, this
    }
  }, t.off = function (e, t) {
    var i = this._events && this._events[e];
    if (i && i.length) {
      var n = i.indexOf(t);
      return -1 != n && i.splice(n, 1), this
    }
  }, t.emitEvent = function (e, t) {
    var i = this._events && this._events[e];
    if (i && i.length) {
      var n = 0, s = i[n];
      t = t || [];
      for (var o = this._onceEvents && this._onceEvents[e]; s;) {
        var a = o && o[s];
        a && (this.off(e, s), delete o[s]), s.apply(this, t), s = i[n += a ? 0 : 1]
      }
      return this
    }
  }, e
}), function (e, t) {
  "use strict";
  "function" == typeof define && define.amd ? define("get-size/get-size", [], function () {
    return t()
  }) : "object" == typeof module && module.exports ? module.exports = t() : e.getSize = t()
}(window, function () {
  "use strict";

  function e(e) {
    var t = parseFloat(e);
    return -1 == e.indexOf("%") && !isNaN(t) && t
  }

  function t(e) {
    var t = getComputedStyle(e);
    return t || s("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), t
  }

  function i(s) {
    if (function () {
      if (!r) {
        r = !0;
        var s = document.createElement("div");
        s.style.width = "200px", s.style.padding = "1px 2px 3px 4px", s.style.borderStyle = "solid", s.style.borderWidth = "1px 2px 3px 4px", s.style.boxSizing = "border-box";
        var o = document.body || document.documentElement;
        o.appendChild(s);
        var a = t(s);
        i.isBoxSizeOuter = n = 200 == e(a.width), o.removeChild(s)
      }
    }(), "string" == typeof s && (s = document.querySelector(s)), s && "object" == typeof s && s.nodeType) {
      var l = t(s);
      if ("none" == l.display) return function () {
        for (var e = {
          width: 0,
          height: 0,
          innerWidth: 0,
          innerHeight: 0,
          outerWidth: 0,
          outerHeight: 0
        }, t = 0; t < a; t++) e[o[t]] = 0;
        return e
      }();
      var c = {};
      c.width = s.offsetWidth, c.height = s.offsetHeight;
      for (var u = c.isBorderBox = "border-box" == l.boxSizing, d = 0; d < a; d++) {
        var h = o[d], p = l[h], f = parseFloat(p);
        c[h] = isNaN(f) ? 0 : f
      }
      var m = c.paddingLeft + c.paddingRight, g = c.paddingTop + c.paddingBottom, v = c.marginLeft + c.marginRight,
        y = c.marginTop + c.marginBottom, b = c.borderLeftWidth + c.borderRightWidth,
        x = c.borderTopWidth + c.borderBottomWidth, w = u && n, S = e(l.width);
      !1 !== S && (c.width = S + (w ? 0 : m + b));
      var C = e(l.height);
      return !1 !== C && (c.height = C + (w ? 0 : g + x)), c.innerWidth = c.width - (m + b), c.innerHeight = c.height - (g + x), c.outerWidth = c.width + v, c.outerHeight = c.height + y, c
    }
  }

  var n, s = "undefined" == typeof console ? function () {
    } : function (e) {
      console.error(e)
    },
    o = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
    a = o.length, r = !1;
  return i
}), function (e, t) {
  "use strict";
  "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", t) : "object" == typeof module && module.exports ? module.exports = t() : e.matchesSelector = t()
}(window, function () {
  "use strict";
  var e = function () {
    var e = window.Element.prototype;
    if (e.matches) return "matches";
    if (e.matchesSelector) return "matchesSelector";
    for (var t = ["webkit", "moz", "ms", "o"], i = 0; i < t.length; i++) {
      var n = t[i] + "MatchesSelector";
      if (e[n]) return n
    }
  }();
  return function (t, i) {
    return t[e](i)
  }
}), function (e, t) {
  "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
    return t(e, i)
  }) : "object" == typeof module && module.exports ? module.exports = t(e, require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.matchesSelector)
}(window, function (e, t) {
  var i = {};
  i.extend = function (e, t) {
    for (var i in t) e[i] = t[i];
    return e
  }, i.modulo = function (e, t) {
    return (e % t + t) % t
  }, i.makeArray = function (e) {
    var t = [];
    if (Array.isArray(e)) t = e; else if (e && "object" == typeof e && "number" == typeof e.length) for (var i = 0; i < e.length; i++) t.push(e[i]); else t.push(e);
    return t
  }, i.removeFrom = function (e, t) {
    var i = e.indexOf(t);
    -1 != i && e.splice(i, 1)
  }, i.getParent = function (e, i) {
    for (; e.parentNode && e != document.body;) if (e = e.parentNode, t(e, i)) return e
  }, i.getQueryElement = function (e) {
    return "string" == typeof e ? document.querySelector(e) : e
  }, i.handleEvent = function (e) {
    var t = "on" + e.type;
    this[t] && this[t](e)
  }, i.filterFindElements = function (e, n) {
    var s = [];
    return (e = i.makeArray(e)).forEach(function (e) {
      if (e instanceof HTMLElement) {
        if (!n) return void s.push(e);
        t(e, n) && s.push(e);
        for (var i = e.querySelectorAll(n), o = 0; o < i.length; o++) s.push(i[o])
      }
    }), s
  }, i.debounceMethod = function (e, t, i) {
    var n = e.prototype[t], s = t + "Timeout";
    e.prototype[t] = function () {
      var e = this[s];
      e && clearTimeout(e);
      var t = arguments, o = this;
      this[s] = setTimeout(function () {
        n.apply(o, t), delete o[s]
      }, i || 100)
    }
  }, i.docReady = function (e) {
    var t = document.readyState;
    "complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e)
  }, i.toDashed = function (e) {
    return e.replace(/(.)([A-Z])/g, function (e, t, i) {
      return t + "-" + i
    }).toLowerCase()
  };
  var n = e.console;
  return i.htmlInit = function (t, s) {
    i.docReady(function () {
      var o = i.toDashed(s), a = "data-" + o, r = document.querySelectorAll("[" + a + "]"),
        l = document.querySelectorAll(".js-" + o), c = i.makeArray(r).concat(i.makeArray(l)), u = a + "-options",
        d = e.jQuery;
      c.forEach(function (e) {
        var i, o = e.getAttribute(a) || e.getAttribute(u);
        try {
          i = o && JSON.parse(o)
        } catch (t) {
          return void(n && n.error("Error parsing " + a + " on " + e.className + ": " + t))
        }
        var r = new t(e, i);
        d && d.data(e, s, r)
      })
    })
  }, i
}), function (e, t) {
  "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("ev-emitter"), require("get-size")) : (e.Outlayer = {}, e.Outlayer.Item = t(e.EvEmitter, e.getSize))
}(window, function (e, t) {
  "use strict";

  function i(e, t) {
    e && (this.element = e, this.layout = t, this.position = {x: 0, y: 0}, this._create())
  }

  var n = document.documentElement.style, s = "string" == typeof n.transition ? "transition" : "WebkitTransition",
    o = "string" == typeof n.transform ? "transform" : "WebkitTransform",
    a = {WebkitTransition: "webkitTransitionEnd", transition: "transitionend"}[s], r = {
      transform: o,
      transition: s,
      transitionDuration: s + "Duration",
      transitionProperty: s + "Property",
      transitionDelay: s + "Delay"
    }, l = i.prototype = Object.create(e.prototype);
  l.constructor = i, l._create = function () {
    this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
  }, l.handleEvent = function (e) {
    var t = "on" + e.type;
    this[t] && this[t](e)
  }, l.getSize = function () {
    this.size = t(this.element)
  }, l.css = function (e) {
    var t = this.element.style;
    for (var i in e) {
      t[r[i] || i] = e[i]
    }
  }, l.getPosition = function () {
    var e = getComputedStyle(this.element), t = this.layout._getOption("originLeft"),
      i = this.layout._getOption("originTop"), n = e[t ? "left" : "right"], s = e[i ? "top" : "bottom"],
      o = this.layout.size, a = -1 != n.indexOf("%") ? parseFloat(n) / 100 * o.width : parseInt(n, 10),
      r = -1 != s.indexOf("%") ? parseFloat(s) / 100 * o.height : parseInt(s, 10);
    a = isNaN(a) ? 0 : a, r = isNaN(r) ? 0 : r, a -= t ? o.paddingLeft : o.paddingRight, r -= i ? o.paddingTop : o.paddingBottom, this.position.x = a, this.position.y = r
  }, l.layoutPosition = function () {
    var e = this.layout.size, t = {}, i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop"),
      s = i ? "paddingLeft" : "paddingRight", o = i ? "left" : "right", a = i ? "right" : "left",
      r = this.position.x + e[s];
    t[o] = this.getXValue(r), t[a] = "";
    var l = n ? "paddingTop" : "paddingBottom", c = n ? "top" : "bottom", u = n ? "bottom" : "top",
      d = this.position.y + e[l];
    t[c] = this.getYValue(d), t[u] = "", this.css(t), this.emitEvent("layout", [this])
  }, l.getXValue = function (e) {
    var t = this.layout._getOption("horizontal");
    return this.layout.options.percentPosition && !t ? e / this.layout.size.width * 100 + "%" : e + "px"
  }, l.getYValue = function (e) {
    var t = this.layout._getOption("horizontal");
    return this.layout.options.percentPosition && t ? e / this.layout.size.height * 100 + "%" : e + "px"
  }, l._transitionTo = function (e, t) {
    this.getPosition();
    var i = this.position.x, n = this.position.y, s = parseInt(e, 10), o = parseInt(t, 10),
      a = s === this.position.x && o === this.position.y;
    if (this.setPosition(e, t), !a || this.isTransitioning) {
      var r = e - i, l = t - n, c = {};
      c.transform = this.getTranslate(r, l), this.transition({
        to: c,
        onTransitionEnd: {transform: this.layoutPosition},
        isCleaning: !0
      })
    } else this.layoutPosition()
  }, l.getTranslate = function (e, t) {
    var i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop");
    return e = i ? e : -e, t = n ? t : -t, "translate3d(" + e + "px, " + t + "px, 0)"
  }, l.goTo = function (e, t) {
    this.setPosition(e, t), this.layoutPosition()
  }, l.moveTo = l._transitionTo, l.setPosition = function (e, t) {
    this.position.x = parseInt(e, 10), this.position.y = parseInt(t, 10)
  }, l._nonTransition = function (e) {
    this.css(e.to), e.isCleaning && this._removeStyles(e.to);
    for (var t in e.onTransitionEnd) e.onTransitionEnd[t].call(this)
  }, l.transition = function (e) {
    if (parseFloat(this.layout.options.transitionDuration)) {
      var t = this._transn;
      for (var i in e.onTransitionEnd) t.onEnd[i] = e.onTransitionEnd[i];
      for (i in e.to) t.ingProperties[i] = !0, e.isCleaning && (t.clean[i] = !0);
      if (e.from) {
        this.css(e.from);
        this.element.offsetHeight;
        null
      }
      this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !0
    } else this._nonTransition(e)
  };
  var c = "opacity," + function (e) {
    return e.replace(/([A-Z])/g, function (e) {
      return "-" + e.toLowerCase()
    })
  }(o);
  l.enableTransition = function () {
    if (!this.isTransitioning) {
      var e = this.layout.options.transitionDuration;
      e = "number" == typeof e ? e + "ms" : e, this.css({
        transitionProperty: c,
        transitionDuration: e,
        transitionDelay: this.staggerDelay || 0
      }), this.element.addEventListener(a, this, !1)
    }
  }, l.onwebkitTransitionEnd = function (e) {
    this.ontransitionend(e)
  }, l.onotransitionend = function (e) {
    this.ontransitionend(e)
  };
  var u = {"-webkit-transform": "transform"};
  l.ontransitionend = function (e) {
    if (e.target === this.element) {
      var t = this._transn, i = u[e.propertyName] || e.propertyName;
      if (delete t.ingProperties[i], function (e) {
        for (var t in e) return !1;
        return !0
      }(t.ingProperties) && this.disableTransition(), i in t.clean && (this.element.style[e.propertyName] = "", delete t.clean[i]), i in t.onEnd) {
        t.onEnd[i].call(this), delete t.onEnd[i]
      }
      this.emitEvent("transitionEnd", [this])
    }
  }, l.disableTransition = function () {
    this.removeTransitionStyles(), this.element.removeEventListener(a, this, !1), this.isTransitioning = !1
  }, l._removeStyles = function (e) {
    var t = {};
    for (var i in e) t[i] = "";
    this.css(t)
  };
  var d = {transitionProperty: "", transitionDuration: "", transitionDelay: ""};
  return l.removeTransitionStyles = function () {
    this.css(d)
  }, l.stagger = function (e) {
    e = isNaN(e) ? 0 : e, this.staggerDelay = e + "ms"
  }, l.removeElem = function () {
    this.element.parentNode.removeChild(this.element), this.css({display: ""}), this.emitEvent("remove", [this])
  }, l.remove = function () {
    return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
      this.removeElem()
    }), void this.hide()) : void this.removeElem()
  }, l.reveal = function () {
    delete this.isHidden, this.css({display: ""});
    var e = this.layout.options, t = {};
    t[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({
      from: e.hiddenStyle,
      to: e.visibleStyle,
      isCleaning: !0,
      onTransitionEnd: t
    })
  }, l.onRevealTransitionEnd = function () {
    this.isHidden || this.emitEvent("reveal")
  }, l.getHideRevealTransitionEndProperty = function (e) {
    var t = this.layout.options[e];
    if (t.opacity) return "opacity";
    for (var i in t) return i
  }, l.hide = function () {
    this.isHidden = !0, this.css({display: ""});
    var e = this.layout.options, t = {};
    t[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({
      from: e.visibleStyle,
      to: e.hiddenStyle,
      isCleaning: !0,
      onTransitionEnd: t
    })
  }, l.onHideTransitionEnd = function () {
    this.isHidden && (this.css({display: "none"}), this.emitEvent("hide"))
  }, l.destroy = function () {
    this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
  }, i
}), function (e, t) {
  "use strict";
  "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, s, o) {
    return t(e, i, n, s, o)
  }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : e.Outlayer = t(e, e.EvEmitter, e.getSize, e.fizzyUIUtils, e.Outlayer.Item)
}(window, function (e, t, i, n, s) {
  "use strict";

  function o(e, t) {
    var i = n.getQueryElement(e);
    if (i) {
      this.element = i, l && (this.$element = l(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(t);
      var s = ++u;
      this.element.outlayerGUID = s, d[s] = this, this._create();
      this._getOption("initLayout") && this.layout()
    } else r && r.error("Bad element for " + this.constructor.namespace + ": " + (i || e))
  }

  function a(e) {
    function t() {
      e.apply(this, arguments)
    }

    return t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t
  }

  var r = e.console, l = e.jQuery, c = function () {
  }, u = 0, d = {};
  o.namespace = "outlayer", o.Item = s, o.defaults = {
    containerStyle: {position: "relative"},
    initLayout: !0,
    originLeft: !0,
    originTop: !0,
    resize: !0,
    resizeContainer: !0,
    transitionDuration: "0.4s",
    hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
    visibleStyle: {opacity: 1, transform: "scale(1)"}
  };
  var h = o.prototype;
  n.extend(h, t.prototype), h.option = function (e) {
    n.extend(this.options, e)
  }, h._getOption = function (e) {
    var t = this.constructor.compatOptions[e];
    return t && void 0 !== this.options[t] ? this.options[t] : this.options[e]
  }, o.compatOptions = {
    initLayout: "isInitLayout",
    horizontal: "isHorizontal",
    layoutInstant: "isLayoutInstant",
    originLeft: "isOriginLeft",
    originTop: "isOriginTop",
    resize: "isResizeBound",
    resizeContainer: "isResizingContainer"
  }, h._create = function () {
    this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
    this._getOption("resize") && this.bindResize()
  }, h.reloadItems = function () {
    this.items = this._itemize(this.element.children)
  }, h._itemize = function (e) {
    for (var t = this._filterFindItemElements(e), i = this.constructor.Item, n = [], s = 0; s < t.length; s++) {
      var o = new i(t[s], this);
      n.push(o)
    }
    return n
  }, h._filterFindItemElements = function (e) {
    return n.filterFindElements(e, this.options.itemSelector)
  }, h.getItemElements = function () {
    return this.items.map(function (e) {
      return e.element
    })
  }, h.layout = function () {
    this._resetLayout(), this._manageStamps();
    var e = this._getOption("layoutInstant"), t = void 0 !== e ? e : !this._isLayoutInited;
    this.layoutItems(this.items, t), this._isLayoutInited = !0
  }, h._init = h.layout, h._resetLayout = function () {
    this.getSize()
  }, h.getSize = function () {
    this.size = i(this.element)
  }, h._getMeasurement = function (e, t) {
    var n, s = this.options[e];
    s ? ("string" == typeof s ? n = this.element.querySelector(s) : s instanceof HTMLElement && (n = s), this[e] = n ? i(n)[t] : s) : this[e] = 0
  }, h.layoutItems = function (e, t) {
    e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
  }, h._getItemsForLayout = function (e) {
    return e.filter(function (e) {
      return !e.isIgnored
    })
  }, h._layoutItems = function (e, t) {
    if (this._emitCompleteOnItems("layout", e), e && e.length) {
      var i = [];
      e.forEach(function (e) {
        var n = this._getItemLayoutPosition(e);
        n.item = e, n.isInstant = t || e.isLayoutInstant, i.push(n)
      }, this), this._processLayoutQueue(i)
    }
  }, h._getItemLayoutPosition = function () {
    return {x: 0, y: 0}
  }, h._processLayoutQueue = function (e) {
    this.updateStagger(), e.forEach(function (e, t) {
      this._positionItem(e.item, e.x, e.y, e.isInstant, t)
    }, this)
  }, h.updateStagger = function () {
    var e = this.options.stagger;
    return null === e || void 0 === e ? void(this.stagger = 0) : (this.stagger = function (e) {
      if ("number" == typeof e) return e;
      var t = e.match(/(^\d*\.?\d*)(\w*)/), i = t && t[1], n = t && t[2];
      return i.length ? (i = parseFloat(i)) * (p[n] || 1) : 0
    }(e), this.stagger)
  }, h._positionItem = function (e, t, i, n, s) {
    n ? e.goTo(t, i) : (e.stagger(s * this.stagger), e.moveTo(t, i))
  }, h._postLayout = function () {
    this.resizeContainer()
  }, h.resizeContainer = function () {
    if (this._getOption("resizeContainer")) {
      var e = this._getContainerSize();
      e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
    }
  }, h._getContainerSize = c, h._setContainerMeasure = function (e, t) {
    if (void 0 !== e) {
      var i = this.size;
      i.isBorderBox && (e += t ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px"
    }
  }, h._emitCompleteOnItems = function (e, t) {
    function i() {
      s.dispatchEvent(e + "Complete", null, [t])
    }

    function n() {
      ++a == o && i()
    }

    var s = this, o = t.length;
    if (t && o) {
      var a = 0;
      t.forEach(function (t) {
        t.once(e, n)
      })
    } else i()
  }, h.dispatchEvent = function (e, t, i) {
    var n = t ? [t].concat(i) : i;
    if (this.emitEvent(e, n), l) if (this.$element = this.$element || l(this.element), t) {
      var s = l.Event(t);
      s.type = e, this.$element.trigger(s, i)
    } else this.$element.trigger(e, i)
  }, h.ignore = function (e) {
    var t = this.getItem(e);
    t && (t.isIgnored = !0)
  }, h.unignore = function (e) {
    var t = this.getItem(e);
    t && delete t.isIgnored
  }, h.stamp = function (e) {
    (e = this._find(e)) && (this.stamps = this.stamps.concat(e), e.forEach(this.ignore, this))
  }, h.unstamp = function (e) {
    (e = this._find(e)) && e.forEach(function (e) {
      n.removeFrom(this.stamps, e), this.unignore(e)
    }, this)
  }, h._find = function (e) {
    if (e) return "string" == typeof e && (e = this.element.querySelectorAll(e)), e = n.makeArray(e)
  }, h._manageStamps = function () {
    this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
  }, h._getBoundingRect = function () {
    var e = this.element.getBoundingClientRect(), t = this.size;
    this._boundingRect = {
      left: e.left + t.paddingLeft + t.borderLeftWidth,
      top: e.top + t.paddingTop + t.borderTopWidth,
      right: e.right - (t.paddingRight + t.borderRightWidth),
      bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
    }
  }, h._manageStamp = c, h._getElementOffset = function (e) {
    var t = e.getBoundingClientRect(), n = this._boundingRect, s = i(e);
    return {
      left: t.left - n.left - s.marginLeft,
      top: t.top - n.top - s.marginTop,
      right: n.right - t.right - s.marginRight,
      bottom: n.bottom - t.bottom - s.marginBottom
    }
  }, h.handleEvent = n.handleEvent, h.bindResize = function () {
    e.addEventListener("resize", this), this.isResizeBound = !0
  }, h.unbindResize = function () {
    e.removeEventListener("resize", this), this.isResizeBound = !1
  }, h.onresize = function () {
    this.resize()
  }, n.debounceMethod(o, "onresize", 100), h.resize = function () {
    this.isResizeBound && this.needsResizeLayout() && this.layout()
  }, h.needsResizeLayout = function () {
    var e = i(this.element);
    return this.size && e && e.innerWidth !== this.size.innerWidth
  }, h.addItems = function (e) {
    var t = this._itemize(e);
    return t.length && (this.items = this.items.concat(t)), t
  }, h.appended = function (e) {
    var t = this.addItems(e);
    t.length && (this.layoutItems(t, !0), this.reveal(t))
  }, h.prepended = function (e) {
    var t = this._itemize(e);
    if (t.length) {
      var i = this.items.slice(0);
      this.items = t.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(i)
    }
  }, h.reveal = function (e) {
    if (this._emitCompleteOnItems("reveal", e), e && e.length) {
      var t = this.updateStagger();
      e.forEach(function (e, i) {
        e.stagger(i * t), e.reveal()
      })
    }
  }, h.hide = function (e) {
    if (this._emitCompleteOnItems("hide", e), e && e.length) {
      var t = this.updateStagger();
      e.forEach(function (e, i) {
        e.stagger(i * t), e.hide()
      })
    }
  }, h.revealItemElements = function (e) {
    var t = this.getItems(e);
    this.reveal(t)
  }, h.hideItemElements = function (e) {
    var t = this.getItems(e);
    this.hide(t)
  }, h.getItem = function (e) {
    for (var t = 0; t < this.items.length; t++) {
      var i = this.items[t];
      if (i.element == e) return i
    }
  }, h.getItems = function (e) {
    var t = [];
    return (e = n.makeArray(e)).forEach(function (e) {
      var i = this.getItem(e);
      i && t.push(i)
    }, this), t
  }, h.remove = function (e) {
    var t = this.getItems(e);
    this._emitCompleteOnItems("remove", t), t && t.length && t.forEach(function (e) {
      e.remove(), n.removeFrom(this.items, e)
    }, this)
  }, h.destroy = function () {
    var e = this.element.style;
    e.height = "", e.position = "", e.width = "", this.items.forEach(function (e) {
      e.destroy()
    }), this.unbindResize();
    var t = this.element.outlayerGUID;
    delete d[t], delete this.element.outlayerGUID, l && l.removeData(this.element, this.constructor.namespace)
  }, o.data = function (e) {
    var t = (e = n.getQueryElement(e)) && e.outlayerGUID;
    return t && d[t]
  }, o.create = function (e, t) {
    var i = a(o);
    return i.defaults = n.extend({}, o.defaults), n.extend(i.defaults, t), i.compatOptions = n.extend({}, o.compatOptions), i.namespace = e, i.data = o.data, i.Item = a(s), n.htmlInit(i, e), l && l.bridget && l.bridget(e, i), i
  };
  var p = {ms: 1, s: 1e3};
  return o.Item = s, o
}), function (e, t) {
  "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer")) : (e.Isotope = e.Isotope || {}, e.Isotope.Item = t(e.Outlayer))
}(window, function (e) {
  "use strict";

  function t() {
    e.Item.apply(this, arguments)
  }

  var i = t.prototype = Object.create(e.Item.prototype), n = i._create;
  i._create = function () {
    this.id = this.layout.itemGUID++, n.call(this), this.sortData = {}
  }, i.updateSortData = function () {
    if (!this.isIgnored) {
      this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
      var e = this.layout.options.getSortData, t = this.layout._sorters;
      for (var i in e) {
        var n = t[i];
        this.sortData[i] = n(this.element, this)
      }
    }
  };
  var s = i.destroy;
  return i.destroy = function () {
    s.apply(this, arguments), this.css({display: ""})
  }, t
}), function (e, t) {
  "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], t) : "object" == typeof module && module.exports ? module.exports = t(require("get-size"), require("outlayer")) : (e.Isotope = e.Isotope || {}, e.Isotope.LayoutMode = t(e.getSize, e.Outlayer))
}(window, function (e, t) {
  "use strict";

  function i(e) {
    this.isotope = e, e && (this.options = e.options[this.namespace], this.element = e.element, this.items = e.filteredItems, this.size = e.size)
  }

  var n = i.prototype;
  return ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"].forEach(function (e) {
    n[e] = function () {
      return t.prototype[e].apply(this.isotope, arguments)
    }
  }), n.needsVerticalResizeLayout = function () {
    var t = e(this.isotope.element);
    return this.isotope.size && t && t.innerHeight != this.isotope.size.innerHeight
  }, n._getMeasurement = function () {
    this.isotope._getMeasurement.apply(this, arguments)
  }, n.getColumnWidth = function () {
    this.getSegmentSize("column", "Width")
  }, n.getRowHeight = function () {
    this.getSegmentSize("row", "Height")
  }, n.getSegmentSize = function (e, t) {
    var i = e + t, n = "outer" + t;
    if (this._getMeasurement(i, n), !this[i]) {
      var s = this.getFirstItemSize();
      this[i] = s && s[n] || this.isotope.size["inner" + t]
    }
  }, n.getFirstItemSize = function () {
    var t = this.isotope.filteredItems[0];
    return t && t.element && e(t.element)
  }, n.layout = function () {
    this.isotope.layout.apply(this.isotope, arguments)
  }, n.getSize = function () {
    this.isotope.getSize(), this.size = this.isotope.size
  }, i.modes = {}, i.create = function (e, t) {
    function s() {
      i.apply(this, arguments)
    }

    return s.prototype = Object.create(n), s.prototype.constructor = s, t && (s.options = t), s.prototype.namespace = e, i.modes[e] = s, s
  }, i
}), function (e, t) {
  "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer"), require("get-size")) : e.Masonry = t(e.Outlayer, e.getSize)
}(window, function (e, t) {
  var i = e.create("masonry");
  i.compatOptions.fitWidth = "isFitWidth";
  var n = i.prototype;
  return n._resetLayout = function () {
    this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
    for (var e = 0; e < this.cols; e++) this.colYs.push(0);
    this.maxY = 0, this.horizontalColIndex = 0
  }, n.measureColumns = function () {
    if (this.getContainerWidth(), !this.columnWidth) {
      var e = this.items[0], i = e && e.element;
      this.columnWidth = i && t(i).outerWidth || this.containerWidth
    }
    var n = this.columnWidth += this.gutter, s = this.containerWidth + this.gutter, o = s / n, a = n - s % n,
      r = a && a < 1 ? "round" : "floor";
    o = Math[r](o), this.cols = Math.max(o, 1)
  }, n.getContainerWidth = function () {
    var e = this._getOption("fitWidth") ? this.element.parentNode : this.element, i = t(e);
    this.containerWidth = i && i.innerWidth
  }, n._getItemLayoutPosition = function (e) {
    e.getSize();
    var t = e.size.outerWidth % this.columnWidth, i = t && t < 1 ? "round" : "ceil",
      n = Math[i](e.size.outerWidth / this.columnWidth);
    n = Math.min(n, this.cols);
    for (var s = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](n, e), o = {
      x: this.columnWidth * s.col,
      y: s.y
    }, a = s.y + e.size.outerHeight, r = n + s.col, l = s.col; l < r; l++) this.colYs[l] = a;
    return o
  }, n._getTopColPosition = function (e) {
    var t = this._getTopColGroup(e), i = Math.min.apply(Math, t);
    return {col: t.indexOf(i), y: i}
  }, n._getTopColGroup = function (e) {
    if (e < 2) return this.colYs;
    for (var t = [], i = this.cols + 1 - e, n = 0; n < i; n++) t[n] = this._getColGroupY(n, e);
    return t
  }, n._getColGroupY = function (e, t) {
    if (t < 2) return this.colYs[e];
    var i = this.colYs.slice(e, e + t);
    return Math.max.apply(Math, i)
  }, n._getHorizontalColPosition = function (e, t) {
    var i = this.horizontalColIndex % this.cols;
    i = e > 1 && i + e > this.cols ? 0 : i;
    var n = t.size.outerWidth && t.size.outerHeight;
    return this.horizontalColIndex = n ? i + e : this.horizontalColIndex, {col: i, y: this._getColGroupY(i, e)}
  }, n._manageStamp = function (e) {
    var i = t(e), n = this._getElementOffset(e), s = this._getOption("originLeft") ? n.left : n.right,
      o = s + i.outerWidth, a = Math.floor(s / this.columnWidth);
    a = Math.max(0, a);
    var r = Math.floor(o / this.columnWidth);
    r -= o % this.columnWidth ? 0 : 1, r = Math.min(this.cols - 1, r);
    for (var l = (this._getOption("originTop") ? n.top : n.bottom) + i.outerHeight, c = a; c <= r; c++) this.colYs[c] = Math.max(l, this.colYs[c])
  }, n._getContainerSize = function () {
    this.maxY = Math.max.apply(Math, this.colYs);
    var e = {height: this.maxY};
    return this._getOption("fitWidth") && (e.width = this._getContainerFitWidth()), e
  }, n._getContainerFitWidth = function () {
    for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];) e++;
    return (this.cols - e) * this.columnWidth - this.gutter
  }, n.needsResizeLayout = function () {
    var e = this.containerWidth;
    return this.getContainerWidth(), e != this.containerWidth
  }, i
}), function (e, t) {
  "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], t) : "object" == typeof module && module.exports ? module.exports = t(require("../layout-mode"), require("masonry-layout")) : t(e.Isotope.LayoutMode, e.Masonry)
}(window, function (e, t) {
  "use strict";
  var i = e.create("masonry"), n = i.prototype, s = {_getElementOffset: !0, layout: !0, _getMeasurement: !0};
  for (var o in t.prototype) s[o] || (n[o] = t.prototype[o]);
  var a = n.measureColumns;
  n.measureColumns = function () {
    this.items = this.isotope.filteredItems, a.call(this)
  };
  var r = n._getOption;
  return n._getOption = function (e) {
    return "fitWidth" == e ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : r.apply(this.isotope, arguments)
  }, i
}), function (e, t) {
  "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], t) : "object" == typeof exports ? module.exports = t(require("../layout-mode")) : t(e.Isotope.LayoutMode)
}(window, function (e) {
  "use strict";
  var t = e.create("fitRows"), i = t.prototype;
  return i._resetLayout = function () {
    this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
  }, i._getItemLayoutPosition = function (e) {
    e.getSize();
    var t = e.size.outerWidth + this.gutter, i = this.isotope.size.innerWidth + this.gutter;
    0 !== this.x && t + this.x > i && (this.x = 0, this.y = this.maxY);
    var n = {x: this.x, y: this.y};
    return this.maxY = Math.max(this.maxY, this.y + e.size.outerHeight), this.x += t, n
  }, i._getContainerSize = function () {
    return {height: this.maxY}
  }, t
}), function (e, t) {
  "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], t) : "object" == typeof module && module.exports ? module.exports = t(require("../layout-mode")) : t(e.Isotope.LayoutMode)
}(window, function (e) {
  "use strict";
  var t = e.create("vertical", {horizontalAlignment: 0}), i = t.prototype;
  return i._resetLayout = function () {
    this.y = 0
  }, i._getItemLayoutPosition = function (e) {
    e.getSize();
    var t = (this.isotope.size.innerWidth - e.size.outerWidth) * this.options.horizontalAlignment, i = this.y;
    return this.y += e.size.outerHeight, {x: t, y: i}
  }, i._getContainerSize = function () {
    return {height: this.y}
  }, t
}), function (e, t) {
  "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function (i, n, s, o, a, r) {
    return t(e, i, n, s, o, a, r)
  }) : "object" == typeof module && module.exports ? module.exports = t(e, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : e.Isotope = t(e, e.Outlayer, e.getSize, e.matchesSelector, e.fizzyUIUtils, e.Isotope.Item, e.Isotope.LayoutMode)
}(window, function (e, t, i, n, s, o, a) {
  var r = e.jQuery, l = String.prototype.trim ? function (e) {
    return e.trim()
  } : function (e) {
    return e.replace(/^\s+|\s+$/g, "")
  }, c = t.create("isotope", {layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0});
  c.Item = o, c.LayoutMode = a;
  var u = c.prototype;
  u._create = function () {
    this.itemGUID = 0, this._sorters = {}, this._getSorters(), t.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
    for (var e in a.modes) this._initLayoutMode(e)
  }, u.reloadItems = function () {
    this.itemGUID = 0, t.prototype.reloadItems.call(this)
  }, u._itemize = function () {
    for (var e = t.prototype._itemize.apply(this, arguments), i = 0; i < e.length; i++) {
      e[i].id = this.itemGUID++
    }
    return this._updateItemsSortData(e), e
  }, u._initLayoutMode = function (e) {
    var t = a.modes[e], i = this.options[e] || {};
    this.options[e] = t.options ? s.extend(t.options, i) : i, this.modes[e] = new t(this)
  }, u.layout = function () {
    return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
  }, u._layout = function () {
    var e = this._getIsInstant();
    this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, e), this._isLayoutInited = !0
  }, u.arrange = function (e) {
    this.option(e), this._getIsInstant();
    var t = this._filter(this.items);
    this.filteredItems = t.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [t]) : this._hideReveal(t), this._sort(), this._layout()
  }, u._init = u.arrange, u._hideReveal = function (e) {
    this.reveal(e.needReveal), this.hide(e.needHide)
  }, u._getIsInstant = function () {
    var e = this._getOption("layoutInstant"), t = void 0 !== e ? e : !this._isLayoutInited;
    return this._isInstant = t, t
  }, u._bindArrangeComplete = function () {
    function e() {
      t && i && n && s.dispatchEvent("arrangeComplete", null, [s.filteredItems])
    }

    var t, i, n, s = this;
    this.once("layoutComplete", function () {
      t = !0, e()
    }), this.once("hideComplete", function () {
      i = !0, e()
    }), this.once("revealComplete", function () {
      n = !0, e()
    })
  }, u._filter = function (e) {
    var t = this.options.filter;
    t = t || "*";
    for (var i = [], n = [], s = [], o = this._getFilterTest(t), a = 0; a < e.length; a++) {
      var r = e[a];
      if (!r.isIgnored) {
        var l = o(r);
        l && i.push(r), l && r.isHidden ? n.push(r) : l || r.isHidden || s.push(r)
      }
    }
    return {matches: i, needReveal: n, needHide: s}
  }, u._getFilterTest = function (e) {
    return r && this.options.isJQueryFiltering ? function (t) {
      return r(t.element).is(e)
    } : "function" == typeof e ? function (t) {
      return e(t.element)
    } : function (t) {
      return n(t.element, e)
    }
  }, u.updateSortData = function (e) {
    var t;
    e ? (e = s.makeArray(e), t = this.getItems(e)) : t = this.items, this._getSorters(), this._updateItemsSortData(t)
  }, u._getSorters = function () {
    var e = this.options.getSortData;
    for (var t in e) {
      var i = e[t];
      this._sorters[t] = d(i)
    }
  }, u._updateItemsSortData = function (e) {
    for (var t = e && e.length, i = 0; t && i < t; i++) {
      e[i].updateSortData()
    }
  };
  var d = function () {
    return function (e) {
      if ("string" != typeof e) return e;
      var t = l(e).split(" "), i = t[0], n = i.match(/^\[(.+)\]$/), s = function (e, t) {
        return e ? function (t) {
          return t.getAttribute(e)
        } : function (e) {
          var i = e.querySelector(t);
          return i && i.textContent
        }
      }(n && n[1], i), o = c.sortDataParsers[t[1]];
      return e = o ? function (e) {
        return e && o(s(e))
      } : function (e) {
        return e && s(e)
      }
    }
  }();
  c.sortDataParsers = {
    parseInt: function (e) {
      return parseInt(e, 10)
    }, parseFloat: function (e) {
      return parseFloat(e)
    }
  }, u._sort = function () {
    if (this.options.sortBy) {
      var e = s.makeArray(this.options.sortBy);
      this._getIsSameSortBy(e) || (this.sortHistory = e.concat(this.sortHistory));
      var t = function (e, t) {
        return function (i, n) {
          for (var s = 0; s < e.length; s++) {
            var o = e[s], a = i.sortData[o], r = n.sortData[o];
            if (a > r || a < r) {
              var l = void 0 !== t[o] ? t[o] : t;
              return (a > r ? 1 : -1) * (l ? 1 : -1)
            }
          }
          return 0
        }
      }(this.sortHistory, this.options.sortAscending);
      this.filteredItems.sort(t)
    }
  }, u._getIsSameSortBy = function (e) {
    for (var t = 0; t < e.length; t++) if (e[t] != this.sortHistory[t]) return !1;
    return !0
  }, u._mode = function () {
    var e = this.options.layoutMode, t = this.modes[e];
    if (!t) throw new Error("No layout mode: " + e);
    return t.options = this.options[e], t
  }, u._resetLayout = function () {
    t.prototype._resetLayout.call(this), this._mode()._resetLayout()
  }, u._getItemLayoutPosition = function (e) {
    return this._mode()._getItemLayoutPosition(e)
  }, u._manageStamp = function (e) {
    this._mode()._manageStamp(e)
  }, u._getContainerSize = function () {
    return this._mode()._getContainerSize()
  }, u.needsResizeLayout = function () {
    return this._mode().needsResizeLayout()
  }, u.appended = function (e) {
    var t = this.addItems(e);
    if (t.length) {
      var i = this._filterRevealAdded(t);
      this.filteredItems = this.filteredItems.concat(i)
    }
  }, u.prepended = function (e) {
    var t = this._itemize(e);
    if (t.length) {
      this._resetLayout(), this._manageStamps();
      var i = this._filterRevealAdded(t);
      this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = t.concat(this.items)
    }
  }, u._filterRevealAdded = function (e) {
    var t = this._filter(e);
    return this.hide(t.needHide), this.reveal(t.matches), this.layoutItems(t.matches, !0), t.matches
  }, u.insert = function (e) {
    var t = this.addItems(e);
    if (t.length) {
      var i, n, s = t.length;
      for (i = 0; i < s; i++) n = t[i], this.element.appendChild(n.element);
      var o = this._filter(t).matches;
      for (i = 0; i < s; i++) t[i].isLayoutInstant = !0;
      for (this.arrange(), i = 0; i < s; i++) delete t[i].isLayoutInstant;
      this.reveal(o)
    }
  };
  var h = u.remove;
  return u.remove = function (e) {
    e = s.makeArray(e);
    var t = this.getItems(e);
    h.call(this, e);
    for (var i = t && t.length, n = 0; i && n < i; n++) {
      var o = t[n];
      s.removeFrom(this.filteredItems, o)
    }
  }, u.shuffle = function () {
    for (var e = 0; e < this.items.length; e++) {
      this.items[e].sortData.random = Math.random()
    }
    this.options.sortBy = "random", this._sort(), this._layout()
  }, u._noTransition = function (e, t) {
    var i = this.options.transitionDuration;
    this.options.transitionDuration = 0;
    var n = e.apply(this, t);
    return this.options.transitionDuration = i, n
  }, u.getFilteredItemElements = function () {
    return this.filteredItems.map(function (e) {
      return e.element
    })
  }, c
}), function (e, t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["get-size/get-size", "isotope/js/layout-mode"], t) : "object" == typeof module && module.exports ? module.exports = t(require("get-size"), require("isotope-layout/js/layout-mode")) : t(e.getSize, e.Isotope.LayoutMode)
}(window, function (e, t) {
  "use strict";
  var i = t.create("masonryHorizontal"), n = i.prototype;
  return n._resetLayout = function () {
    this.getRowHeight(), this._getMeasurement("gutter", "outerHeight"), this.rowHeight += this.gutter, this.rows = Math.floor((this.isotope.size.innerHeight + this.gutter) / this.rowHeight), this.rows = Math.max(this.rows, 1);
    var e = this.rows;
    for (this.rowXs = []; e--;) this.rowXs.push(0);
    this.maxX = 0
  }, n._getItemLayoutPosition = function (e) {
    e.getSize();
    var t = e.size.outerHeight % this.rowHeight, i = t && t < 1 ? "round" : "ceil",
      n = Math[i](e.size.outerHeight / this.rowHeight);
    n = Math.min(n, this.rows);
    for (var s = this._getRowGroup(n), o = Math.min.apply(Math, s), a = s.indexOf(o), r = {
      x: o,
      y: this.rowHeight * a
    }, l = o + e.size.outerWidth, c = this.rows + 1 - s.length, u = 0; u < c; u++) this.rowXs[a + u] = l;
    return r
  }, n._getRowGroup = function (e) {
    if (e < 2) return this.rowXs;
    for (var t = [], i = this.rows + 1 - e, n = 0; n < i; n++) {
      var s = this.rowXs.slice(n, n + e);
      t[n] = Math.max.apply(Math, s)
    }
    return t
  }, n._manageStamp = function (t) {
    var i = e(t), n = this.isotope._getElementOffset(t), s = this._getOption("originTop") ? n.top : n.bottom,
      o = s + i.outerHeight, a = Math.floor(s / this.rowHeight);
    a = Math.max(0, a);
    var r = Math.floor(o / this.rowHeight);
    r = Math.min(this.rows - 1, r);
    for (var l = (this._getOption("originLeft") ? n.left : n.right) + i.outerWidth, c = a; c <= r; c++) this.rowXs[c] = Math.max(l, this.rowXs[c])
  }, n._getContainerSize = function () {
    return this.maxX = Math.max.apply(Math, this.rowXs), {width: this.maxX}
  }, n.needsResizeLayout = function () {
    return this.needsVerticalResizeLayout()
  }, i
}), function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
}(function (e) {
  function t(t) {
    var a = t || window.event, r = l.call(arguments, 1), c = 0, d = 0, h = 0, p = 0, f = 0, m = 0;
    if (t = e.event.fix(a), t.type = "mousewheel", "detail" in a && (h = -1 * a.detail), "wheelDelta" in a && (h = a.wheelDelta), "wheelDeltaY" in a && (h = a.wheelDeltaY), "wheelDeltaX" in a && (d = -1 * a.wheelDeltaX), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (d = -1 * h, h = 0), c = 0 === h ? d : h, "deltaY" in a && (h = -1 * a.deltaY, c = h), "deltaX" in a && (d = a.deltaX, 0 === h && (c = -1 * d)), 0 !== h || 0 !== d) {
      if (1 === a.deltaMode) {
        var g = e.data(this, "mousewheel-line-height");
        c *= g, h *= g, d *= g
      } else if (2 === a.deltaMode) {
        var v = e.data(this, "mousewheel-page-height");
        c *= v, h *= v, d *= v
      }
      if (p = Math.max(Math.abs(h), Math.abs(d)), (!o || o > p) && (o = p, n(a, p) && (o /= 40)), n(a, p) && (c /= 40, d /= 40, h /= 40), c = Math[c >= 1 ? "floor" : "ceil"](c / o), d = Math[d >= 1 ? "floor" : "ceil"](d / o), h = Math[h >= 1 ? "floor" : "ceil"](h / o), u.settings.normalizeOffset && this.getBoundingClientRect) {
        var y = this.getBoundingClientRect();
        f = t.clientX - y.left, m = t.clientY - y.top
      }
      return t.deltaX = d, t.deltaY = h, t.deltaFactor = o, t.offsetX = f, t.offsetY = m, t.deltaMode = 0, r.unshift(t, c, d, h), s && clearTimeout(s), s = setTimeout(i, 200), (e.event.dispatch || e.event.handle).apply(this, r)
    }
  }

  function i() {
    o = null
  }

  function n(e, t) {
    return u.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0
  }

  var s, o, a = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    r = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
    l = Array.prototype.slice;
  if (e.event.fixHooks) for (var c = a.length; c;) e.event.fixHooks[a[--c]] = e.event.mouseHooks;
  var u = e.event.special.mousewheel = {
    version: "3.1.12", setup: function () {
      if (this.addEventListener) for (var i = r.length; i;) this.addEventListener(r[--i], t, !1); else this.onmousewheel = t;
      e.data(this, "mousewheel-line-height", u.getLineHeight(this)), e.data(this, "mousewheel-page-height", u.getPageHeight(this))
    }, teardown: function () {
      if (this.removeEventListener) for (var i = r.length; i;) this.removeEventListener(r[--i], t, !1); else this.onmousewheel = null;
      e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
    }, getLineHeight: function (t) {
      var i = e(t), n = i["offsetParent" in e.fn ? "offsetParent" : "parent"]();
      return n.length || (n = e("body")), parseInt(n.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16
    }, getPageHeight: function (t) {
      return e(t).height()
    }, settings: {adjustOldDeltas: !0, normalizeOffset: !0}
  };
  e.fn.extend({
    mousewheel: function (e) {
      return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
    }, unmousewheel: function (e) {
      return this.unbind("mousewheel", e)
    }
  })
}), function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
}(function (e) {
  function t(t) {
    var a = t || window.event, r = l.call(arguments, 1), c = 0, d = 0, h = 0, p = 0, f = 0, m = 0;
    if (t = e.event.fix(a), t.type = "mousewheel", "detail" in a && (h = -1 * a.detail), "wheelDelta" in a && (h = a.wheelDelta), "wheelDeltaY" in a && (h = a.wheelDeltaY), "wheelDeltaX" in a && (d = -1 * a.wheelDeltaX), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (d = -1 * h, h = 0), c = 0 === h ? d : h, "deltaY" in a && (h = -1 * a.deltaY, c = h), "deltaX" in a && (d = a.deltaX, 0 === h && (c = -1 * d)), 0 !== h || 0 !== d) {
      if (1 === a.deltaMode) {
        var g = e.data(this, "mousewheel-line-height");
        c *= g, h *= g, d *= g
      } else if (2 === a.deltaMode) {
        var v = e.data(this, "mousewheel-page-height");
        c *= v, h *= v, d *= v
      }
      if (p = Math.max(Math.abs(h), Math.abs(d)), (!o || o > p) && (o = p, n(a, p) && (o /= 40)), n(a, p) && (c /= 40, d /= 40, h /= 40), c = Math[c >= 1 ? "floor" : "ceil"](c / o), d = Math[d >= 1 ? "floor" : "ceil"](d / o), h = Math[h >= 1 ? "floor" : "ceil"](h / o), u.settings.normalizeOffset && this.getBoundingClientRect) {
        var y = this.getBoundingClientRect();
        f = t.clientX - y.left, m = t.clientY - y.top
      }
      return t.deltaX = d, t.deltaY = h, t.deltaFactor = o, t.offsetX = f, t.offsetY = m, t.deltaMode = 0, r.unshift(t, c, d, h), s && clearTimeout(s), s = setTimeout(i, 200), (e.event.dispatch || e.event.handle).apply(this, r)
    }
  }

  function i() {
    o = null
  }

  function n(e, t) {
    return u.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0
  }

  var s, o, a = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    r = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
    l = Array.prototype.slice;
  if (e.event.fixHooks) for (var c = a.length; c;) e.event.fixHooks[a[--c]] = e.event.mouseHooks;
  var u = e.event.special.mousewheel = {
    version: "3.1.12", setup: function () {
      if (this.addEventListener) for (var i = r.length; i;) this.addEventListener(r[--i], t, !1); else this.onmousewheel = t;
      e.data(this, "mousewheel-line-height", u.getLineHeight(this)), e.data(this, "mousewheel-page-height", u.getPageHeight(this))
    }, teardown: function () {
      if (this.removeEventListener) for (var i = r.length; i;) this.removeEventListener(r[--i], t, !1); else this.onmousewheel = null;
      e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
    }, getLineHeight: function (t) {
      var i = e(t), n = i["offsetParent" in e.fn ? "offsetParent" : "parent"]();
      return n.length || (n = e("body")), parseInt(n.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16
    }, getPageHeight: function (t) {
      return e(t).height()
    }, settings: {adjustOldDeltas: !0, normalizeOffset: !0}
  };
  e.fn.extend({
    mousewheel: function (e) {
      return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
    }, unmousewheel: function (e) {
      return this.unbind("mousewheel", e)
    }
  })
}), function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e : e(jQuery, window, document)
}(function (e) {
  !function (t) {
    var i = "function" == typeof define && define.amd, n = "undefined" != typeof module && module.exports,
      s = "https:" == document.location.protocol ? "https:" : "http:";
    i || (n ? require("jquery-mousewheel")(e) : e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + s + "//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js%3E%3C/script%3E"))), function () {
      var t, i = "mCustomScrollbar", n = ".mCustomScrollbar", s = {
          setTop: 0,
          setLeft: 0,
          axis: "y",
          scrollbarPosition: "inside",
          scrollInertia: 950,
          autoDraggerLength: !0,
          alwaysShowScrollbar: 0,
          snapOffset: 0,
          mouseWheel: {
            enable: !0,
            scrollAmount: "auto",
            axis: "y",
            deltaFactor: "auto",
            disableOver: ["select", "option", "keygen", "datalist", "textarea"]
          },
          scrollButtons: {scrollType: "stepless", scrollAmount: "auto"},
          keyboard: {enable: !0, scrollType: "stepless", scrollAmount: "auto"},
          contentTouchScroll: 25,
          documentTouchScroll: !0,
          advanced: {
            autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
            updateOnContentResize: !0,
            updateOnImageLoad: "auto",
            autoUpdateTimeout: 60
          },
          theme: "light",
          callbacks: {onTotalScrollOffset: 0, onTotalScrollBackOffset: 0, alwaysTriggerOffsets: !0}
        }, o = 0, a = {}, r = window.attachEvent && !window.addEventListener ? 1 : 0, l = !1,
        c = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
        u = {
          init: function (t) {
            var t = e.extend(!0, {}, s, t), i = d.call(this);
            if (t.live) {
              var r = t.liveSelector || this.selector || n, l = e(r);
              if ("off" === t.live) return void p(r);
              a[r] = setTimeout(function () {
                l.mCustomScrollbar(t), "once" === t.live && l.length && p(r)
              }, 500)
            } else p(r);
            return t.setWidth = t.set_width ? t.set_width : t.setWidth, t.setHeight = t.set_height ? t.set_height : t.setHeight, t.axis = t.horizontalScroll ? "x" : f(t.axis), t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia, "object" != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = {
              enable: !0,
              scrollAmount: "auto",
              axis: "y",
              preventDefault: !1,
              deltaFactor: "auto",
              normalizeDelta: !1,
              invert: !1
            }), t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount, t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta, t.scrollButtons.scrollType = m(t.scrollButtons.scrollType), h(t), e(i).each(function () {
              var i = e(this);
              if (!i.data("mCS")) {
                i.data("mCS", {
                  idx: ++o,
                  opt: t,
                  scrollRatio: {y: null, x: null},
                  overflowed: null,
                  contentReset: {y: null, x: null},
                  bindEvents: !1,
                  tweenRunning: !1,
                  sequential: {},
                  langDir: i.css("direction"),
                  cbOffsets: null,
                  trigger: null,
                  poll: {size: {o: 0, n: 0}, img: {o: 0, n: 0}, change: {o: 0, n: 0}}
                });
                var n = i.data("mCS"), s = n.opt, a = i.data("mcs-axis"), r = i.data("mcs-scrollbar-position"),
                  l = i.data("mcs-theme");
                a && (s.axis = a), r && (s.scrollbarPosition = r), l && (s.theme = l, h(s)), g.call(this), n && s.callbacks.onCreate && "function" == typeof s.callbacks.onCreate && s.callbacks.onCreate.call(this), e("#mCSB_" + n.idx + "_container img:not(." + c[2] + ")").addClass(c[2]), u.update.call(null, i)
              }
            })
          }, update: function (t, i) {
            var n = t || d.call(this);
            return e(n).each(function () {
              var t = e(this);
              if (t.data("mCS")) {
                var n = t.data("mCS"), s = n.opt, o = e("#mCSB_" + n.idx + "_container"), a = e("#mCSB_" + n.idx),
                  r = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
                if (!o.length) return;
                n.tweenRunning && Y(t), i && n && s.callbacks.onBeforeUpdate && "function" == typeof s.callbacks.onBeforeUpdate && s.callbacks.onBeforeUpdate.call(this), t.hasClass(c[3]) && t.removeClass(c[3]), t.hasClass(c[4]) && t.removeClass(c[4]), a.css("max-height", "none"), a.height() !== t.height() && a.css("max-height", t.height()), y.call(this), "y" === s.axis || s.advanced.autoExpandHorizontalScroll || o.css("width", v(o)), n.overflowed = C.call(this), _.call(this), s.autoDraggerLength && x.call(this), w.call(this), E.call(this);
                var l = [Math.abs(o[0].offsetTop), Math.abs(o[0].offsetLeft)];
                "x" !== s.axis && (n.overflowed[0] ? r[0].height() > r[0].parent().height() ? T.call(this) : (V(t, l[0].toString(), {
                  dir: "y",
                  dur: 0,
                  overwrite: "none"
                }), n.contentReset.y = null) : (T.call(this), "y" === s.axis ? k.call(this) : "yx" === s.axis && n.overflowed[1] && V(t, l[1].toString(), {
                  dir: "x",
                  dur: 0,
                  overwrite: "none"
                }))), "y" !== s.axis && (n.overflowed[1] ? r[1].width() > r[1].parent().width() ? T.call(this) : (V(t, l[1].toString(), {
                  dir: "x",
                  dur: 0,
                  overwrite: "none"
                }), n.contentReset.x = null) : (T.call(this), "x" === s.axis ? k.call(this) : "yx" === s.axis && n.overflowed[0] && V(t, l[0].toString(), {
                  dir: "y",
                  dur: 0,
                  overwrite: "none"
                }))), i && n && (2 === i && s.callbacks.onImageLoad && "function" == typeof s.callbacks.onImageLoad ? s.callbacks.onImageLoad.call(this) : 3 === i && s.callbacks.onSelectorChange && "function" == typeof s.callbacks.onSelectorChange ? s.callbacks.onSelectorChange.call(this) : s.callbacks.onUpdate && "function" == typeof s.callbacks.onUpdate && s.callbacks.onUpdate.call(this)), X.call(this)
              }
            })
          }, scrollTo: function (t, i) {
            if (void 0 !== t && null != t) {
              var n = d.call(this);
              return e(n).each(function () {
                var n = e(this);
                if (n.data("mCS")) {
                  var s = n.data("mCS"), o = s.opt, a = {
                      trigger: "external",
                      scrollInertia: o.scrollInertia,
                      scrollEasing: "mcsEaseInOut",
                      moveDragger: !1,
                      timeout: 60,
                      callbacks: !0,
                      onStart: !0,
                      onUpdate: !0,
                      onComplete: !0
                    }, r = e.extend(!0, {}, a, i), l = q.call(this, t),
                    c = r.scrollInertia > 0 && r.scrollInertia < 17 ? 17 : r.scrollInertia;
                  l[0] = W.call(this, l[0], "y"), l[1] = W.call(this, l[1], "x"), r.moveDragger && (l[0] *= s.scrollRatio.y, l[1] *= s.scrollRatio.x), r.dur = ie() ? 0 : c, setTimeout(function () {
                    null !== l[0] && void 0 !== l[0] && "x" !== o.axis && s.overflowed[0] && (r.dir = "y", r.overwrite = "all", V(n, l[0].toString(), r)), null !== l[1] && void 0 !== l[1] && "y" !== o.axis && s.overflowed[1] && (r.dir = "x", r.overwrite = "none", V(n, l[1].toString(), r))
                  }, r.timeout)
                }
              })
            }
          }, stop: function () {
            var t = d.call(this);
            return e(t).each(function () {
              var t = e(this);
              t.data("mCS") && Y(t)
            })
          }, disable: function (t) {
            var i = d.call(this);
            return e(i).each(function () {
              var i = e(this);
              i.data("mCS") && (i.data("mCS"), X.call(this, "remove"), k.call(this), t && T.call(this), _.call(this, !0), i.addClass(c[3]))
            })
          }, destroy: function () {
            var t = d.call(this);
            return e(t).each(function () {
              var n = e(this);
              if (n.data("mCS")) {
                var s = n.data("mCS"), o = s.opt, a = e("#mCSB_" + s.idx), r = e("#mCSB_" + s.idx + "_container"),
                  l = e(".mCSB_" + s.idx + "_scrollbar");
                o.live && p(o.liveSelector || e(t).selector), X.call(this, "remove"), k.call(this), T.call(this), n.removeData("mCS"), K(this, "mcs"), l.remove(), r.find("img." + c[2]).removeClass(c[2]), a.replaceWith(r.contents()), n.removeClass(i + " _mCS_" + s.idx + " " + c[6] + " " + c[7] + " " + c[5] + " " + c[3]).addClass(c[4])
              }
            })
          }
        }, d = function () {
          return "object" != typeof e(this) || e(this).length < 1 ? n : this
        }, h = function (t) {
          t.autoDraggerLength = !(e.inArray(t.theme, ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"]) > -1) && t.autoDraggerLength, t.autoExpandScrollbar = !(e.inArray(t.theme, ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"]) > -1) && t.autoExpandScrollbar, t.scrollButtons.enable = !(e.inArray(t.theme, ["minimal", "minimal-dark"]) > -1) && t.scrollButtons.enable, t.autoHideScrollbar = e.inArray(t.theme, ["minimal", "minimal-dark"]) > -1 || t.autoHideScrollbar, t.scrollbarPosition = e.inArray(t.theme, ["minimal", "minimal-dark"]) > -1 ? "outside" : t.scrollbarPosition
        }, p = function (e) {
          a[e] && (clearTimeout(a[e]), K(a, e))
        }, f = function (e) {
          return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
        }, m = function (e) {
          return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
        }, g = function () {
          var t = e(this), n = t.data("mCS"), s = n.opt, o = s.autoExpandScrollbar ? " " + c[1] + "_expand" : "",
            a = ["<div id='mCSB_" + n.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + s.theme + " mCSB_scrollTools_vertical" + o + "'><div class='" + c[12] + "'><div id='mCSB_" + n.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + n.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + s.theme + " mCSB_scrollTools_horizontal" + o + "'><div class='" + c[12] + "'><div id='mCSB_" + n.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
            r = "yx" === s.axis ? "mCSB_vertical_horizontal" : "x" === s.axis ? "mCSB_horizontal" : "mCSB_vertical",
            l = "yx" === s.axis ? a[0] + a[1] : "x" === s.axis ? a[1] : a[0],
            u = "yx" === s.axis ? "<div id='mCSB_" + n.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
            d = s.autoHideScrollbar ? " " + c[6] : "", h = "x" !== s.axis && "rtl" === n.langDir ? " " + c[7] : "";
          s.setWidth && t.css("width", s.setWidth), s.setHeight && t.css("height", s.setHeight), s.setLeft = "y" !== s.axis && "rtl" === n.langDir ? "989999px" : s.setLeft, t.addClass(i + " _mCS_" + n.idx + d + h).wrapInner("<div id='mCSB_" + n.idx + "' class='mCustomScrollBox mCS-" + s.theme + " " + r + "'><div id='mCSB_" + n.idx + "_container' class='mCSB_container' style='position:relative; top:" + s.setTop + "; left:" + s.setLeft + ";' dir='" + n.langDir + "' /></div>");
          var p = e("#mCSB_" + n.idx), f = e("#mCSB_" + n.idx + "_container");
          "y" === s.axis || s.advanced.autoExpandHorizontalScroll || f.css("width", v(f)), "outside" === s.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"), t.css("overflow", "visible"), p.addClass("mCSB_outside").after(l)) : (p.addClass("mCSB_inside").append(l), f.wrap(u)), b.call(this);
          var m = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
          m[0].css("min-height", m[0].height()), m[1].css("min-width", m[1].width())
        }, v = function (t) {
          var i = [t[0].scrollWidth, Math.max.apply(Math, t.children().map(function () {
            return e(this).outerWidth(!0)
          }).get())], n = t.parent().width();
          return i[0] > n ? i[0] : i[1] > n ? i[1] : "100%"
        }, y = function () {
          var t = e(this), i = t.data("mCS"), n = i.opt, s = e("#mCSB_" + i.idx + "_container");
          if (n.advanced.autoExpandHorizontalScroll && "y" !== n.axis) {
            s.css({width: "auto", "min-width": 0, "overflow-x": "scroll"});
            var o = Math.ceil(s[0].scrollWidth);
            3 === n.advanced.autoExpandHorizontalScroll || 2 !== n.advanced.autoExpandHorizontalScroll && o > s.parent().width() ? s.css({
              width: o,
              "min-width": "100%",
              "overflow-x": "inherit"
            }) : s.css({
              "overflow-x": "inherit",
              position: "absolute"
            }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
              width: Math.ceil(s[0].getBoundingClientRect().right + .4) - Math.floor(s[0].getBoundingClientRect().left),
              "min-width": "100%",
              position: "relative"
            }).unwrap()
          }
        }, b = function () {
          var t = e(this), i = t.data("mCS"), n = i.opt, s = e(".mCSB_" + i.idx + "_scrollbar:first"),
            o = ee(n.scrollButtons.tabindex) ? "tabindex='" + n.scrollButtons.tabindex + "'" : "",
            a = ["<a href='#' class='" + c[13] + "' " + o + " />", "<a href='#' class='" + c[14] + "' " + o + " />", "<a href='#' class='" + c[15] + "' " + o + " />", "<a href='#' class='" + c[16] + "' " + o + " />"],
            r = ["x" === n.axis ? a[2] : a[0], "x" === n.axis ? a[3] : a[1], a[2], a[3]];
          n.scrollButtons.enable && s.prepend(r[0]).append(r[1]).next(".mCSB_scrollTools").prepend(r[2]).append(r[3])
        }, x = function () {
          var t = e(this), i = t.data("mCS"), n = e("#mCSB_" + i.idx), s = e("#mCSB_" + i.idx + "_container"),
            o = [e("#mCSB_" + i.idx + "_dragger_vertical"), e("#mCSB_" + i.idx + "_dragger_horizontal")],
            a = [n.height() / s.outerHeight(!1), n.width() / s.outerWidth(!1)],
            l = [parseInt(o[0].css("min-height")), Math.round(a[0] * o[0].parent().height()), parseInt(o[1].css("min-width")), Math.round(a[1] * o[1].parent().width())],
            c = r && l[1] < l[0] ? l[0] : l[1], u = r && l[3] < l[2] ? l[2] : l[3];
          o[0].css({
            height: c,
            "max-height": o[0].parent().height() - 10
          }).find(".mCSB_dragger_bar").css({"line-height": l[0] + "px"}), o[1].css({
            width: u,
            "max-width": o[1].parent().width() - 10
          })
        }, w = function () {
          var t = e(this), i = t.data("mCS"), n = e("#mCSB_" + i.idx), s = e("#mCSB_" + i.idx + "_container"),
            o = [e("#mCSB_" + i.idx + "_dragger_vertical"), e("#mCSB_" + i.idx + "_dragger_horizontal")],
            a = [s.outerHeight(!1) - n.height(), s.outerWidth(!1) - n.width()],
            r = [a[0] / (o[0].parent().height() - o[0].height()), a[1] / (o[1].parent().width() - o[1].width())];
          i.scrollRatio = {y: r[0], x: r[1]}
        }, S = function (e, t, i) {
          var n = i ? c[0] + "_expanded" : "", s = e.closest(".mCSB_scrollTools");
          "active" === t ? (e.toggleClass(c[0] + " " + n), s.toggleClass(c[1]), e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ("hide" === t ? (e.removeClass(c[0]), s.removeClass(c[1])) : (e.addClass(c[0]), s.addClass(c[1])))
        }, C = function () {
          var t = e(this), i = t.data("mCS"), n = e("#mCSB_" + i.idx), s = e("#mCSB_" + i.idx + "_container"),
            o = null == i.overflowed ? s.height() : s.outerHeight(!1),
            a = null == i.overflowed ? s.width() : s.outerWidth(!1), r = s[0].scrollHeight, l = s[0].scrollWidth;
          return r > o && (o = r), l > a && (a = l), [o > n.height(), a > n.width()]
        }, T = function () {
          var t = e(this), i = t.data("mCS"), n = i.opt, s = e("#mCSB_" + i.idx), o = e("#mCSB_" + i.idx + "_container"),
            a = [e("#mCSB_" + i.idx + "_dragger_vertical"), e("#mCSB_" + i.idx + "_dragger_horizontal")];
          if (Y(t), ("x" !== n.axis && !i.overflowed[0] || "y" === n.axis && i.overflowed[0]) && (a[0].add(o).css("top", 0), V(t, "_resetY")), "y" !== n.axis && !i.overflowed[1] || "x" === n.axis && i.overflowed[1]) {
            var r = dx = 0;
            "rtl" === i.langDir && (r = s.width() - o.outerWidth(!1), dx = Math.abs(r / i.scrollRatio.x)), o.css("left", r), a[1].css("left", dx), V(t, "_resetX")
          }
        }, E = function () {
          function t() {
            o = setTimeout(function () {
              e.event.special.mousewheel ? (clearTimeout(o), z.call(i[0])) : t()
            }, 100)
          }

          var i = e(this), n = i.data("mCS"), s = n.opt;
          if (!n.bindEvents) {
            if (P.call(this), s.contentTouchScroll && I.call(this), L.call(this), s.mouseWheel.enable) {
              var o;
              t()
            }
            j.call(this), F.call(this), s.advanced.autoScrollOnFocus && B.call(this), s.scrollButtons.enable && H.call(this), s.keyboard.enable && N.call(this), n.bindEvents = !0
          }
        }, k = function () {
          var t = e(this), i = t.data("mCS"), n = i.opt, s = "mCS_" + i.idx, o = ".mCSB_" + i.idx + "_scrollbar",
            a = e("#mCSB_" + i.idx + ",#mCSB_" + i.idx + "_container,#mCSB_" + i.idx + "_container_wrapper," + o + " ." + c[12] + ",#mCSB_" + i.idx + "_dragger_vertical,#mCSB_" + i.idx + "_dragger_horizontal," + o + ">a"),
            r = e("#mCSB_" + i.idx + "_container");
          n.advanced.releaseDraggableSelectors && a.add(e(n.advanced.releaseDraggableSelectors)), n.advanced.extraDraggableSelectors && a.add(e(n.advanced.extraDraggableSelectors)), i.bindEvents && (e(document).add(e(!D() || top.document)).unbind("." + s), a.each(function () {
            e(this).unbind("." + s)
          }), clearTimeout(t[0]._focusTimeout), K(t[0], "_focusTimeout"), clearTimeout(i.sequential.step), K(i.sequential, "step"), clearTimeout(r[0].onCompleteTimeout), K(r[0], "onCompleteTimeout"), i.bindEvents = !1)
        }, _ = function (t) {
          var i = e(this), n = i.data("mCS"), s = n.opt, o = e("#mCSB_" + n.idx + "_container_wrapper"),
            a = o.length ? o : e("#mCSB_" + n.idx + "_container"),
            r = [e("#mCSB_" + n.idx + "_scrollbar_vertical"), e("#mCSB_" + n.idx + "_scrollbar_horizontal")],
            l = [r[0].find(".mCSB_dragger"), r[1].find(".mCSB_dragger")];
          "x" !== s.axis && (n.overflowed[0] && !t ? (r[0].add(l[0]).add(r[0].children("a")).css("display", "block"), a.removeClass(c[8] + " " + c[10])) : (s.alwaysShowScrollbar ? (2 !== s.alwaysShowScrollbar && l[0].css("display", "none"), a.removeClass(c[10])) : (r[0].css("display", "none"), a.addClass(c[10])), a.addClass(c[8]))), "y" !== s.axis && (n.overflowed[1] && !t ? (r[1].add(l[1]).add(r[1].children("a")).css("display", "block"), a.removeClass(c[9] + " " + c[11])) : (s.alwaysShowScrollbar ? (2 !== s.alwaysShowScrollbar && l[1].css("display", "none"), a.removeClass(c[11])) : (r[1].css("display", "none"), a.addClass(c[11])), a.addClass(c[9]))), n.overflowed[0] || n.overflowed[1] ? i.removeClass(c[5]) : i.addClass(c[5])
        }, M = function (t) {
          var i = t.type,
            n = t.target.ownerDocument !== document && null !== frameElement ? [e(frameElement).offset().top, e(frameElement).offset().left] : null,
            s = D() && t.target.ownerDocument !== top.document && null !== frameElement ? [e(t.view.frameElement).offset().top, e(t.view.frameElement).offset().left] : [0, 0];
          switch (i) {
            case"pointerdown":
            case"MSPointerDown":
            case"pointermove":
            case"MSPointerMove":
            case"pointerup":
            case"MSPointerUp":
              return n ? [t.originalEvent.pageY - n[0] + s[0], t.originalEvent.pageX - n[1] + s[1], !1] : [t.originalEvent.pageY, t.originalEvent.pageX, !1];
            case"touchstart":
            case"touchmove":
            case"touchend":
              var o = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
                a = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;
              return t.target.ownerDocument !== document ? [o.screenY, o.screenX, a > 1] : [o.pageY, o.pageX, a > 1];
            default:
              return n ? [t.pageY - n[0] + s[0], t.pageX - n[1] + s[1], !1] : [t.pageY, t.pageX, !1]
          }
        }, P = function () {
          function t(e, t, n, s) {
            if (h[0].idleTimer = c.scrollInertia < 233 ? 250 : 0, i.attr("id") === d[1]) var r = "x",
              l = (i[0].offsetLeft - t + s) * a.scrollRatio.x; else var r = "y",
              l = (i[0].offsetTop - e + n) * a.scrollRatio.y;
            V(o, l.toString(), {dir: r, drag: !0})
          }

          var i, n, s, o = e(this), a = o.data("mCS"), c = a.opt, u = "mCS_" + a.idx,
            d = ["mCSB_" + a.idx + "_dragger_vertical", "mCSB_" + a.idx + "_dragger_horizontal"],
            h = e("#mCSB_" + a.idx + "_container"), p = e("#" + d[0] + ",#" + d[1]),
            f = c.advanced.releaseDraggableSelectors ? p.add(e(c.advanced.releaseDraggableSelectors)) : p,
            m = c.advanced.extraDraggableSelectors ? e(!D() || top.document).add(e(c.advanced.extraDraggableSelectors)) : e(!D() || top.document);
          p.bind("contextmenu." + u, function (e) {
            e.preventDefault()
          }).bind("mousedown." + u + " touchstart." + u + " pointerdown." + u + " MSPointerDown." + u, function (t) {
            if (t.stopImmediatePropagation(), t.preventDefault(), Z(t)) {
              l = !0, r && (document.onselectstart = function () {
                return !1
              }), $.call(h, !1), Y(o);
              var a = (i = e(this)).offset(), u = M(t)[0] - a.top, d = M(t)[1] - a.left, p = i.height() + a.top,
                f = i.width() + a.left;
              p > u && u > 0 && f > d && d > 0 && (n = u, s = d), S(i, "active", c.autoExpandScrollbar)
            }
          }).bind("touchmove." + u, function (e) {
            e.stopImmediatePropagation(), e.preventDefault();
            var o = i.offset(), a = M(e)[0] - o.top, r = M(e)[1] - o.left;
            t(n, s, a, r)
          }), e(document).add(m).bind("mousemove." + u + " pointermove." + u + " MSPointerMove." + u, function (e) {
            if (i) {
              var o = i.offset(), a = M(e)[0] - o.top, r = M(e)[1] - o.left;
              if (n === a && s === r) return;
              t(n, s, a, r)
            }
          }).add(f).bind("mouseup." + u + " touchend." + u + " pointerup." + u + " MSPointerUp." + u, function () {
            i && (S(i, "active", c.autoExpandScrollbar), i = null), l = !1, r && (document.onselectstart = null), $.call(h, !0)
          })
        }, I = function () {
          function i(e) {
            if (!J(e) || l || M(e)[2]) t = 0; else {
              t = 1, w = 0, S = 0, c = 1, C.removeClass("mCS_touch_action");
              var i = P.offset();
              u = M(e)[0] - i.top, d = M(e)[1] - i.left, O = [M(e)[0], M(e)[1]]
            }
          }

          function n(e) {
            if (J(e) && !l && !M(e)[2] && (E.documentTouchScroll || e.preventDefault(), e.stopImmediatePropagation(), (!S || w) && c)) {
              m = U();
              var t = _.offset(), i = M(e)[0] - t.top, n = M(e)[1] - t.left;
              if (L.push(i), z.push(n), O[2] = Math.abs(M(e)[0] - O[0]), O[3] = Math.abs(M(e)[1] - O[1]), T.overflowed[0]) var s = I[0].parent().height() - I[0].height(),
                o = u - i > 0 && i - u > -s * T.scrollRatio.y && (2 * O[3] < O[2] || "yx" === E.axis);
              if (T.overflowed[1]) var a = I[1].parent().width() - I[1].width(),
                h = d - n > 0 && n - d > -a * T.scrollRatio.x && (2 * O[2] < O[3] || "yx" === E.axis);
              o || h ? (F || e.preventDefault(), w = 1) : (S = 1, C.addClass("mCS_touch_action")), F && e.preventDefault(), b = "yx" === E.axis ? [u - i, d - n] : "x" === E.axis ? [null, d - n] : [u - i, null], P[0].idleTimer = 250, T.overflowed[0] && r(b[0], A, "mcsLinearOut", "y", "all", !0), T.overflowed[1] && r(b[1], A, "mcsLinearOut", "x", $, !0)
            }
          }

          function s(e) {
            if (!J(e) || l || M(e)[2]) t = 0; else {
              t = 1, e.stopImmediatePropagation(), Y(C), f = U();
              var i = _.offset();
              h = M(e)[0] - i.top, p = M(e)[1] - i.left, L = [], z = []
            }
          }

          function o(e) {
            if (J(e) && !l && !M(e)[2]) {
              c = 0, e.stopImmediatePropagation(), w = 0, S = 0, g = U();
              var t = _.offset(), i = M(e)[0] - t.top, n = M(e)[1] - t.left;
              if (!(g - m > 30)) {
                var s = 2.5 > (y = 1e3 / (g - f)), o = s ? [L[L.length - 2], z[z.length - 2]] : [0, 0];
                v = s ? [i - o[0], n - o[1]] : [i - h, n - p];
                var u = [Math.abs(v[0]), Math.abs(v[1])];
                y = s ? [Math.abs(v[0] / 4), Math.abs(v[1] / 4)] : [y, y];
                var d = [Math.abs(P[0].offsetTop) - v[0] * a(u[0] / y[0], y[0]), Math.abs(P[0].offsetLeft) - v[1] * a(u[1] / y[1], y[1])];
                b = "yx" === E.axis ? [d[0], d[1]] : "x" === E.axis ? [null, d[1]] : [d[0], null], x = [4 * u[0] + E.scrollInertia, 4 * u[1] + E.scrollInertia];
                var C = parseInt(E.contentTouchScroll) || 0;
                b[0] = u[0] > C ? b[0] : 0, b[1] = u[1] > C ? b[1] : 0, T.overflowed[0] && r(b[0], x[0], "mcsEaseOut", "y", $, !1), T.overflowed[1] && r(b[1], x[1], "mcsEaseOut", "x", $, !1)
              }
            }
          }

          function a(e, t) {
            var i = [1.5 * t, 2 * t, t / 1.5, t / 2];
            return e > 90 ? t > 4 ? i[0] : i[3] : e > 60 ? t > 3 ? i[3] : i[2] : e > 30 ? t > 8 ? i[1] : t > 6 ? i[0] : t > 4 ? t : i[2] : t > 8 ? t : i[3]
          }

          function r(e, t, i, n, s, o) {
            e && V(C, e.toString(), {dur: t, scrollEasing: i, dir: n, overwrite: s, drag: o})
          }

          var c, u, d, h, p, f, m, g, v, y, b, x, w, S, C = e(this), T = C.data("mCS"), E = T.opt, k = "mCS_" + T.idx,
            _ = e("#mCSB_" + T.idx), P = e("#mCSB_" + T.idx + "_container"),
            I = [e("#mCSB_" + T.idx + "_dragger_vertical"), e("#mCSB_" + T.idx + "_dragger_horizontal")], L = [], z = [],
            A = 0, $ = "yx" === E.axis ? "none" : "all", O = [], j = P.find("iframe"),
            B = ["touchstart." + k + " pointerdown." + k + " MSPointerDown." + k, "touchmove." + k + " pointermove." + k + " MSPointerMove." + k, "touchend." + k + " pointerup." + k + " MSPointerUp." + k],
            F = void 0 !== document.body.style.touchAction && "" !== document.body.style.touchAction;
          P.bind(B[0], function (e) {
            i(e)
          }).bind(B[1], function (e) {
            n(e)
          }), _.bind(B[0], function (e) {
            s(e)
          }).bind(B[2], function (e) {
            o(e)
          }), j.length && j.each(function () {
            e(this).bind("load", function () {
              D(this) && e(this.contentDocument || this.contentWindow.document).bind(B[0], function (e) {
                i(e), s(e)
              }).bind(B[1], function (e) {
                n(e)
              }).bind(B[2], function (e) {
                o(e)
              })
            })
          })
        }, L = function () {
          function i(e, t, i) {
            r.type = i && n ? "stepped" : "stepless", r.scrollAmount = 10, R(s, e, t, "mcsLinearOut", i ? 60 : null)
          }

          var n, s = e(this), o = s.data("mCS"), a = o.opt, r = o.sequential, c = "mCS_" + o.idx,
            u = e("#mCSB_" + o.idx + "_container"), d = u.parent();
          u.bind("mousedown." + c, function () {
            t || n || (n = 1, l = !0)
          }).add(document).bind("mousemove." + c, function (e) {
            if (!t && n && (window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0)) {
              var s = u.offset(), l = M(e)[0] - s.top + u[0].offsetTop, c = M(e)[1] - s.left + u[0].offsetLeft;
              l > 0 && l < d.height() && c > 0 && c < d.width() ? r.step && i("off", null, "stepped") : ("x" !== a.axis && o.overflowed[0] && (0 > l ? i("on", 38) : l > d.height() && i("on", 40)), "y" !== a.axis && o.overflowed[1] && (0 > c ? i("on", 37) : c > d.width() && i("on", 39)))
            }
          }).bind("mouseup." + c + " dragend." + c, function () {
            t || (n && (n = 0, i("off", null)), l = !1)
          })
        }, z = function () {
          function t(t, o) {
            if (Y(i), !O(i, t.target)) {
              var c = "auto" !== s.mouseWheel.deltaFactor ? parseInt(s.mouseWheel.deltaFactor) : r && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100,
                u = s.scrollInertia;
              if ("x" === s.axis || "x" === s.mouseWheel.axis) var d = "x",
                h = [Math.round(c * n.scrollRatio.x), parseInt(s.mouseWheel.scrollAmount)],
                p = "auto" !== s.mouseWheel.scrollAmount ? h[1] : h[0] >= a.width() ? .9 * a.width() : h[0],
                f = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetLeft), m = l[1][0].offsetLeft,
                g = l[1].parent().width() - l[1].width(),
                v = "y" === s.mouseWheel.axis ? t.deltaY || o : t.deltaX; else var d = "y",
                h = [Math.round(c * n.scrollRatio.y), parseInt(s.mouseWheel.scrollAmount)],
                p = "auto" !== s.mouseWheel.scrollAmount ? h[1] : h[0] >= a.height() ? .9 * a.height() : h[0],
                f = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetTop), m = l[0][0].offsetTop,
                g = l[0].parent().height() - l[0].height(), v = t.deltaY || o;
              "y" === d && !n.overflowed[0] || "x" === d && !n.overflowed[1] || ((s.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (v = -v), s.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1), (v > 0 && 0 !== m || 0 > v && m !== g || s.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()), t.deltaFactor < 5 && !s.mouseWheel.normalizeDelta && (p = t.deltaFactor, u = 17), V(i, (f - v * p).toString(), {
                dir: d,
                dur: u
              }))
            }
          }

          if (e(this).data("mCS")) {
            var i = e(this), n = i.data("mCS"), s = n.opt, o = "mCS_" + n.idx, a = e("#mCSB_" + n.idx),
              l = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")],
              c = e("#mCSB_" + n.idx + "_container").find("iframe");
            c.length && c.each(function () {
              e(this).bind("load", function () {
                D(this) && e(this.contentDocument || this.contentWindow.document).bind("mousewheel." + o, function (e, i) {
                  t(e, i)
                })
              })
            }), a.bind("mousewheel." + o, function (e, i) {
              t(e, i)
            })
          }
        }, A = new Object, D = function (t) {
          var i = !1, n = !1, s = null;
          if (void 0 === t ? n = "#empty" : void 0 !== e(t).attr("id") && (n = e(t).attr("id")), !1 !== n && void 0 !== A[n]) return A[n];
          if (t) {
            try {
              var o = t.contentDocument || t.contentWindow.document;
              s = o.body.innerHTML
            } catch (e) {
            }
            i = null !== s
          } else {
            try {
              var o = top.document;
              s = o.body.innerHTML
            } catch (e) {
            }
            i = null !== s
          }
          return !1 !== n && (A[n] = i), i
        }, $ = function (e) {
          var t = this.find("iframe");
          if (t.length) {
            var i = e ? "auto" : "none";
            t.css("pointer-events", i)
          }
        }, O = function (t, i) {
          var n = i.nodeName.toLowerCase(), s = t.data("mCS").opt.mouseWheel.disableOver;
          return e.inArray(n, s) > -1 && !(e.inArray(n, ["select", "textarea"]) > -1 && !e(i).is(":focus"))
        }, j = function () {
          var t, i = e(this), n = i.data("mCS"), s = "mCS_" + n.idx, o = e("#mCSB_" + n.idx + "_container"),
            a = o.parent(), r = e(".mCSB_" + n.idx + "_scrollbar ." + c[12]);
          r.bind("mousedown." + s + " touchstart." + s + " pointerdown." + s + " MSPointerDown." + s, function (i) {
            l = !0, e(i.target).hasClass("mCSB_dragger") || (t = 1)
          }).bind("touchend." + s + " pointerup." + s + " MSPointerUp." + s, function () {
            l = !1
          }).bind("click." + s, function (s) {
            if (t && (t = 0, e(s.target).hasClass(c[12]) || e(s.target).hasClass("mCSB_draggerRail"))) {
              Y(i);
              var r = e(this), l = r.find(".mCSB_dragger");
              if (r.parent(".mCSB_scrollTools_horizontal").length > 0) {
                if (!n.overflowed[1]) return;
                var u = "x", d = s.pageX > l.offset().left ? -1 : 1, h = Math.abs(o[0].offsetLeft) - d * (.9 * a.width())
              } else {
                if (!n.overflowed[0]) return;
                var u = "y", d = s.pageY > l.offset().top ? -1 : 1, h = Math.abs(o[0].offsetTop) - d * (.9 * a.height())
              }
              V(i, h.toString(), {dir: u, scrollEasing: "mcsEaseInOut"})
            }
          })
        }, B = function () {
          var t = e(this), i = t.data("mCS"), n = i.opt, s = "mCS_" + i.idx, o = e("#mCSB_" + i.idx + "_container"),
            a = o.parent();
          o.bind("focusin." + s, function () {
            var i = e(document.activeElement), s = o.find(".mCustomScrollBox").length;
            i.is(n.advanced.autoScrollOnFocus) && (Y(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = s ? 17 * s : 0, t[0]._focusTimeout = setTimeout(function () {
              var e = [te(i)[0], te(i)[1]], s = [o[0].offsetTop, o[0].offsetLeft],
                r = [s[0] + e[0] >= 0 && s[0] + e[0] < a.height() - i.outerHeight(!1), s[1] + e[1] >= 0 && s[0] + e[1] < a.width() - i.outerWidth(!1)],
                l = "yx" !== n.axis || r[0] || r[1] ? "all" : "none";
              "x" === n.axis || r[0] || V(t, e[0].toString(), {
                dir: "y",
                scrollEasing: "mcsEaseInOut",
                overwrite: l,
                dur: 0
              }), "y" === n.axis || r[1] || V(t, e[1].toString(), {
                dir: "x",
                scrollEasing: "mcsEaseInOut",
                overwrite: l,
                dur: 0
              })
            }, t[0]._focusTimer))
          })
        }, F = function () {
          var t = e(this), i = t.data("mCS"), n = "mCS_" + i.idx, s = e("#mCSB_" + i.idx + "_container").parent();
          s.bind("scroll." + n, function () {
            0 === s.scrollTop() && 0 === s.scrollLeft() || e(".mCSB_" + i.idx + "_scrollbar").css("visibility", "hidden")
          })
        }, H = function () {
          var t = e(this), i = t.data("mCS"), n = i.opt, s = i.sequential, o = "mCS_" + i.idx,
            a = ".mCSB_" + i.idx + "_scrollbar", r = e(a + ">a");
          r.bind("contextmenu." + o, function (e) {
            e.preventDefault()
          }).bind("mousedown." + o + " touchstart." + o + " pointerdown." + o + " MSPointerDown." + o + " mouseup." + o + " touchend." + o + " pointerup." + o + " MSPointerUp." + o + " mouseout." + o + " pointerout." + o + " MSPointerOut." + o + " click." + o, function (o) {
            function a(e, i) {
              s.scrollAmount = n.scrollButtons.scrollAmount, R(t, e, i)
            }

            if (o.preventDefault(), Z(o)) {
              var r = e(this).attr("class");
              switch (s.type = n.scrollButtons.scrollType, o.type) {
                case"mousedown":
                case"touchstart":
                case"pointerdown":
                case"MSPointerDown":
                  if ("stepped" === s.type) return;
                  l = !0, i.tweenRunning = !1, a("on", r);
                  break;
                case"mouseup":
                case"touchend":
                case"pointerup":
                case"MSPointerUp":
                case"mouseout":
                case"pointerout":
                case"MSPointerOut":
                  if ("stepped" === s.type) return;
                  l = !1, s.dir && a("off", r);
                  break;
                case"click":
                  if ("stepped" !== s.type || i.tweenRunning) return;
                  a("on", r)
              }
            }
          })
        }, N = function () {
          function t(t) {
            function a(e, t) {
              o.type = s.keyboard.scrollType, o.scrollAmount = s.keyboard.scrollAmount, "stepped" === o.type && n.tweenRunning || R(i, e, t)
            }

            switch (t.type) {
              case"blur":
                n.tweenRunning && o.dir && a("off", null);
                break;
              case"keydown":
              case"keyup":
                var r = t.keyCode ? t.keyCode : t.which, d = "on";
                if ("x" !== s.axis && (38 === r || 40 === r) || "y" !== s.axis && (37 === r || 39 === r)) {
                  if ((38 === r || 40 === r) && !n.overflowed[0] || (37 === r || 39 === r) && !n.overflowed[1]) return;
                  "keyup" === t.type && (d = "off"), e(document.activeElement).is(u) || (t.preventDefault(), t.stopImmediatePropagation(), a(d, r))
                } else if (33 === r || 34 === r) {
                  if ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type) {
                    Y(i);
                    var h = 34 === r ? -1 : 1;
                    if ("x" === s.axis || "yx" === s.axis && n.overflowed[1] && !n.overflowed[0]) var p = "x",
                      f = Math.abs(l[0].offsetLeft) - h * (.9 * c.width()); else var p = "y",
                      f = Math.abs(l[0].offsetTop) - h * (.9 * c.height());
                    V(i, f.toString(), {dir: p, scrollEasing: "mcsEaseInOut"})
                  }
                } else if ((35 === r || 36 === r) && !e(document.activeElement).is(u) && ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type)) {
                  if ("x" === s.axis || "yx" === s.axis && n.overflowed[1] && !n.overflowed[0]) var p = "x",
                    f = 35 === r ? Math.abs(c.width() - l.outerWidth(!1)) : 0; else var p = "y",
                    f = 35 === r ? Math.abs(c.height() - l.outerHeight(!1)) : 0;
                  V(i, f.toString(), {dir: p, scrollEasing: "mcsEaseInOut"})
                }
            }
          }

          var i = e(this), n = i.data("mCS"), s = n.opt, o = n.sequential, a = "mCS_" + n.idx, r = e("#mCSB_" + n.idx),
            l = e("#mCSB_" + n.idx + "_container"), c = l.parent(),
            u = "input,textarea,select,datalist,keygen,[contenteditable='true']", d = l.find("iframe"),
            h = ["blur." + a + " keydown." + a + " keyup." + a];
          d.length && d.each(function () {
            e(this).bind("load", function () {
              D(this) && e(this.contentDocument || this.contentWindow.document).bind(h[0], function (e) {
                t(e)
              })
            })
          }), r.attr("tabindex", "0").bind(h[0], function (e) {
            t(e)
          })
        }, R = function (t, i, n, s, o) {
          function a(e) {
            l.snapAmount && (u.scrollAmount = l.snapAmount instanceof Array ? "x" === u.dir[0] ? l.snapAmount[1] : l.snapAmount[0] : l.snapAmount);
            var i = "stepped" !== u.type, n = o || (e ? i ? p / 1.5 : f : 1e3 / 60), c = e ? i ? 7.5 : 40 : 2.5,
              h = [Math.abs(d[0].offsetTop), Math.abs(d[0].offsetLeft)],
              m = [r.scrollRatio.y > 10 ? 10 : r.scrollRatio.y, r.scrollRatio.x > 10 ? 10 : r.scrollRatio.x],
              g = "x" === u.dir[0] ? h[1] + u.dir[1] * (m[1] * c) : h[0] + u.dir[1] * (m[0] * c),
              v = "x" === u.dir[0] ? h[1] + u.dir[1] * parseInt(u.scrollAmount) : h[0] + u.dir[1] * parseInt(u.scrollAmount),
              y = "auto" !== u.scrollAmount ? v : g, b = s || (e ? i ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear"),
              x = !!e;
            return e && 17 > n && (y = "x" === u.dir[0] ? h[1] : h[0]), V(t, y.toString(), {
              dir: u.dir[0],
              scrollEasing: b,
              dur: n,
              onComplete: x
            }), e ? void(u.dir = !1) : (clearTimeout(u.step), void(u.step = setTimeout(function () {
              a()
            }, n)))
          }

          var r = t.data("mCS"), l = r.opt, u = r.sequential, d = e("#mCSB_" + r.idx + "_container"),
            h = "stepped" === u.type, p = l.scrollInertia < 26 ? 26 : l.scrollInertia,
            f = l.scrollInertia < 1 ? 17 : l.scrollInertia;
          switch (i) {
            case"on":
              if (u.dir = [n === c[16] || n === c[15] || 39 === n || 37 === n ? "x" : "y", n === c[13] || n === c[15] || 38 === n || 37 === n ? -1 : 1], Y(t), ee(n) && "stepped" === u.type) return;
              a(h);
              break;
            case"off":
              clearTimeout(u.step), K(u, "step"), Y(t), (h || r.tweenRunning && u.dir) && a(!0)
          }
        }, q = function (t) {
          var i = e(this).data("mCS").opt, n = [];
          return "function" == typeof t && (t = t()), t instanceof Array ? n = t.length > 1 ? [t[0], t[1]] : "x" === i.axis ? [null, t[0]] : [t[0], null] : (n[0] = t.y ? t.y : t.x || "x" === i.axis ? null : t, n[1] = t.x ? t.x : t.y || "y" === i.axis ? null : t), "function" == typeof n[0] && (n[0] = n[0]()), "function" == typeof n[1] && (n[1] = n[1]()), n
        }, W = function (t, i) {
          if (null != t && void 0 !== t) {
            var n = e(this), s = n.data("mCS"), o = s.opt, a = e("#mCSB_" + s.idx + "_container"), r = a.parent(),
              l = typeof t;
            i || (i = "x" === o.axis ? "x" : "y");
            var c = "x" === i ? a.outerWidth(!1) - r.width() : a.outerHeight(!1) - r.height(),
              d = "x" === i ? a[0].offsetLeft : a[0].offsetTop, h = "x" === i ? "left" : "top";
            switch (l) {
              case"function":
                return t();
              case"object":
                var p = t.jquery ? t : e(t);
                if (!p.length) return;
                return "x" === i ? te(p)[1] : te(p)[0];
              case"string":
              case"number":
                if (ee(t)) return Math.abs(t);
                if (-1 !== t.indexOf("%")) return Math.abs(c * parseInt(t) / 100);
                if (-1 !== t.indexOf("-=")) return Math.abs(d - parseInt(t.split("-=")[1]));
                if (-1 !== t.indexOf("+=")) {
                  var f = d + parseInt(t.split("+=")[1]);
                  return f >= 0 ? 0 : Math.abs(f)
                }
                if (-1 !== t.indexOf("px") && ee(t.split("px")[0])) return Math.abs(t.split("px")[0]);
                if ("top" === t || "left" === t) return 0;
                if ("bottom" === t) return Math.abs(r.height() - a.outerHeight(!1));
                if ("right" === t) return Math.abs(r.width() - a.outerWidth(!1));
                if ("first" === t || "last" === t) {
                  var p = a.find(":" + t);
                  return "x" === i ? te(p)[1] : te(p)[0]
                }
                return e(t).length ? "x" === i ? te(e(t))[1] : te(e(t))[0] : (a.css(h, t), void u.update.call(null, n[0]))
            }
          }
        }, X = function (t) {
          function i() {
            return clearTimeout(r[0].autoUpdate), 0 === s.parents("html").length ? void(s = null) : void(r[0].autoUpdate = setTimeout(function () {
              return a.advanced.updateOnSelectorChange && (o.poll.change.n = function () {
                !0 === a.advanced.updateOnSelectorChange && (a.advanced.updateOnSelectorChange = "*");
                var e = 0, t = r.find(a.advanced.updateOnSelectorChange);
                return a.advanced.updateOnSelectorChange && t.length > 0 && t.each(function () {
                  e += this.offsetHeight + this.offsetWidth
                }), e
              }(), o.poll.change.n !== o.poll.change.o) ? (o.poll.change.o = o.poll.change.n, void n(3)) : a.advanced.updateOnContentResize && (o.poll.size.n = s[0].scrollHeight + s[0].scrollWidth + r[0].offsetHeight + s[0].offsetHeight + s[0].offsetWidth, o.poll.size.n !== o.poll.size.o) ? (o.poll.size.o = o.poll.size.n, void n(1)) : !a.advanced.updateOnImageLoad || "auto" === a.advanced.updateOnImageLoad && "y" === a.axis || (o.poll.img.n = r.find("img").length, o.poll.img.n === o.poll.img.o) ? void((a.advanced.updateOnSelectorChange || a.advanced.updateOnContentResize || a.advanced.updateOnImageLoad) && i()) : (o.poll.img.o = o.poll.img.n, void r.find("img").each(function () {
                !function (t) {
                  if (e(t).hasClass(c[2])) return void n();
                  var i = new Image;
                  i.onload = function (e, t) {
                    return function () {
                      return t.apply(e, arguments)
                    }
                  }(i, function () {
                    this.onload = null, e(t).addClass(c[2]), n(2)
                  }), i.src = t.src
                }(this)
              }))
            }, a.advanced.autoUpdateTimeout))
          }

          function n(e) {
            clearTimeout(r[0].autoUpdate), u.update.call(null, s[0], e)
          }

          var s = e(this), o = s.data("mCS"), a = o.opt, r = e("#mCSB_" + o.idx + "_container");
          return t ? (clearTimeout(r[0].autoUpdate), void K(r[0], "autoUpdate")) : void i()
        }, Y = function (t) {
          var i = t.data("mCS"),
            n = e("#mCSB_" + i.idx + "_container,#mCSB_" + i.idx + "_container_wrapper,#mCSB_" + i.idx + "_dragger_vertical,#mCSB_" + i.idx + "_dragger_horizontal");
          n.each(function () {
            Q.call(this)
          })
        }, V = function (t, i, n) {
          function s(e) {
            return a && r.callbacks[e] && "function" == typeof r.callbacks[e]
          }

          function o() {
            var e = [d[0].offsetTop, d[0].offsetLeft], i = [g[0].offsetTop, g[0].offsetLeft],
              s = [d.outerHeight(!1), d.outerWidth(!1)], o = [u.height(), u.width()];
            t[0].mcs = {
              content: d,
              top: e[0],
              left: e[1],
              draggerTop: i[0],
              draggerLeft: i[1],
              topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(s[0]) - o[0])),
              leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(s[1]) - o[1])),
              direction: n.dir
            }
          }

          var a = t.data("mCS"), r = a.opt, l = {
              trigger: "internal",
              dir: "y",
              scrollEasing: "mcsEaseOut",
              drag: !1,
              dur: r.scrollInertia,
              overwrite: "all",
              callbacks: !0,
              onStart: !0,
              onUpdate: !0,
              onComplete: !0
            }, n = e.extend(l, n), c = [n.dur, n.drag ? 0 : n.dur], u = e("#mCSB_" + a.idx),
            d = e("#mCSB_" + a.idx + "_container"), h = d.parent(),
            p = r.callbacks.onTotalScrollOffset ? q.call(t, r.callbacks.onTotalScrollOffset) : [0, 0],
            f = r.callbacks.onTotalScrollBackOffset ? q.call(t, r.callbacks.onTotalScrollBackOffset) : [0, 0];
          if (a.trigger = n.trigger, 0 === h.scrollTop() && 0 === h.scrollLeft() || (e(".mCSB_" + a.idx + "_scrollbar").css("visibility", "visible"), h.scrollTop(0).scrollLeft(0)), "_resetY" !== i || a.contentReset.y || (s("onOverflowYNone") && r.callbacks.onOverflowYNone.call(t[0]), a.contentReset.y = 1), "_resetX" !== i || a.contentReset.x || (s("onOverflowXNone") && r.callbacks.onOverflowXNone.call(t[0]), a.contentReset.x = 1), "_resetY" !== i && "_resetX" !== i) {
            if (!a.contentReset.y && t[0].mcs || !a.overflowed[0] || (s("onOverflowY") && r.callbacks.onOverflowY.call(t[0]), a.contentReset.x = null), !a.contentReset.x && t[0].mcs || !a.overflowed[1] || (s("onOverflowX") && r.callbacks.onOverflowX.call(t[0]), a.contentReset.x = null), r.snapAmount) {
              var m = r.snapAmount instanceof Array ? "x" === n.dir ? r.snapAmount[1] : r.snapAmount[0] : r.snapAmount;
              i = function (e, t, i) {
                return Math.round(e / t) * t - i
              }(i, m, r.snapOffset)
            }
            switch (n.dir) {
              case"x":
                var g = e("#mCSB_" + a.idx + "_dragger_horizontal"), v = "left", y = d[0].offsetLeft,
                  b = [u.width() - d.outerWidth(!1), g.parent().width() - g.width()],
                  x = [i, 0 === i ? 0 : i / a.scrollRatio.x], w = p[1], C = f[1], T = w > 0 ? w / a.scrollRatio.x : 0,
                  E = C > 0 ? C / a.scrollRatio.x : 0;
                break;
              case"y":
                var g = e("#mCSB_" + a.idx + "_dragger_vertical"), v = "top", y = d[0].offsetTop,
                  b = [u.height() - d.outerHeight(!1), g.parent().height() - g.height()],
                  x = [i, 0 === i ? 0 : i / a.scrollRatio.y], w = p[0], C = f[0], T = w > 0 ? w / a.scrollRatio.y : 0,
                  E = C > 0 ? C / a.scrollRatio.y : 0
            }
            x[1] < 0 || 0 === x[0] && 0 === x[1] ? x = [0, 0] : x[1] >= b[1] ? x = [b[0], b[1]] : x[0] = -x[0], t[0].mcs || (o(), s("onInit") && r.callbacks.onInit.call(t[0])), clearTimeout(d[0].onCompleteTimeout), G(g[0], v, Math.round(x[1]), c[1], n.scrollEasing), !a.tweenRunning && (0 === y && x[0] >= 0 || y === b[0] && x[0] <= b[0]) || G(d[0], v, Math.round(x[0]), c[0], n.scrollEasing, n.overwrite, {
              onStart: function () {
                n.callbacks && n.onStart && !a.tweenRunning && (s("onScrollStart") && (o(), r.callbacks.onScrollStart.call(t[0])), a.tweenRunning = !0, S(g), a.cbOffsets = [r.callbacks.alwaysTriggerOffsets || y >= b[0] + w, r.callbacks.alwaysTriggerOffsets || -C >= y])
              }, onUpdate: function () {
                n.callbacks && n.onUpdate && s("whileScrolling") && (o(), r.callbacks.whileScrolling.call(t[0]))
              }, onComplete: function () {
                if (n.callbacks && n.onComplete) {
                  "yx" === r.axis && clearTimeout(d[0].onCompleteTimeout);
                  var e = d[0].idleTimer || 0;
                  d[0].onCompleteTimeout = setTimeout(function () {
                    s("onScroll") && (o(), r.callbacks.onScroll.call(t[0])), s("onTotalScroll") && x[1] >= b[1] - T && a.cbOffsets[0] && (o(), r.callbacks.onTotalScroll.call(t[0])), s("onTotalScrollBack") && x[1] <= E && a.cbOffsets[1] && (o(), r.callbacks.onTotalScrollBack.call(t[0])), a.tweenRunning = !1, d[0].idleTimer = 0, S(g, "hide")
                  }, e)
                }
              }
            })
          }
        }, G = function (e, t, i, n, s, o, a) {
          function r() {
            y.stop || (m || d.call(), m = U() - f, l(), m >= y.time && (y.time = m > y.time ? m + c - (m - y.time) : m + c - 1, y.time < m + 1 && (y.time = m + 1)), y.time < n ? y.id = u(r) : p.call())
          }

          function l() {
            n > 0 ? (y.currVal = function (e, t, i, n, s) {
              switch (s) {
                case"linear":
                case"mcsLinear":
                  return i * e / n + t;
                case"mcsLinearOut":
                  return e /= n, e--, i * Math.sqrt(1 - e * e) + t;
                case"easeInOutSmooth":
                  return 1 > (e /= n / 2) ? i / 2 * e * e + t : (e--, -i / 2 * (e * (e - 2) - 1) + t);
                case"easeInOutStrong":
                  return 1 > (e /= n / 2) ? i / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--, i / 2 * (2 - Math.pow(2, -10 * e)) + t);
                case"easeInOut":
                case"mcsEaseInOut":
                  return 1 > (e /= n / 2) ? i / 2 * e * e * e + t : (e -= 2, i / 2 * (e * e * e + 2) + t);
                case"easeOutSmooth":
                  return e /= n, e--, -i * (e * e * e * e - 1) + t;
                case"easeOutStrong":
                  return i * (1 - Math.pow(2, -10 * e / n)) + t;
                case"easeOut":
                case"mcsEaseOut":
                default:
                  var o = (e /= n) * e, a = o * e;
                  return t + i * (.499999999999997 * a * o + -2.5 * o * o + 5.5 * a + -6.5 * o + 4 * e)
              }
            }(y.time, g, b, n, s), v[t] = Math.round(y.currVal) + "px") : v[t] = i + "px", h.call()
          }

          e._mTween || (e._mTween = {top: {}, left: {}});
          var c, u, a = a || {}, d = a.onStart || function () {
          }, h = a.onUpdate || function () {
          }, p = a.onComplete || function () {
          }, f = U(), m = 0, g = e.offsetTop, v = e.style, y = e._mTween[t];
          "left" === t && (g = e.offsetLeft);
          var b = i - g;
          y.stop = 0, "none" !== o && null != y.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(y.id) : clearTimeout(y.id), y.id = null), c = 1e3 / 60, y.time = m + c, u = window.requestAnimationFrame ? window.requestAnimationFrame : function (e) {
            return l(), setTimeout(e, .01)
          }, y.id = u(r)
        }, U = function () {
          return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
        }, Q = function () {
          this._mTween || (this._mTween = {top: {}, left: {}});
          for (var e = ["top", "left"], t = 0; t < e.length; t++) {
            var i = e[t];
            this._mTween[i].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(this._mTween[i].id) : clearTimeout(this._mTween[i].id), this._mTween[i].id = null, this._mTween[i].stop = 1)
          }
        }, K = function (e, t) {
          try {
            delete e[t]
          } catch (i) {
            e[t] = null
          }
        }, Z = function (e) {
          return !(e.which && 1 !== e.which)
        }, J = function (e) {
          var t = e.originalEvent.pointerType;
          return !(t && "touch" !== t && 2 !== t)
        }, ee = function (e) {
          return !isNaN(parseFloat(e)) && isFinite(e)
        }, te = function (e) {
          var t = e.parents(".mCSB_container");
          return [e.offset().top - t.offset().top, e.offset().left - t.offset().left]
        }, ie = function () {
          var e = function () {
            var e = ["webkit", "moz", "ms", "o"];
            if ("hidden" in document) return "hidden";
            for (var t = 0; t < e.length; t++) if (e[t] + "Hidden" in document) return e[t] + "Hidden";
            return null
          }();
          return !!e && document[e]
        };
      e.fn[i] = function (t) {
        return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
      }, e[i] = function (t) {
        return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
      }, e[i].defaults = s, window[i] = !0, e(window).bind("load", function () {
        e(n)[i](), e.extend(e.expr[":"], {
          mcsInView: e.expr[":"].mcsInView || function (t) {
            var i, n, s = e(t), o = s.parents(".mCSB_container");
            if (o.length) return i = o.parent(), (n = [o[0].offsetTop, o[0].offsetLeft])[0] + te(s)[0] >= 0 && n[0] + te(s)[0] < i.height() - s.outerHeight(!1) && n[1] + te(s)[1] >= 0 && n[1] + te(s)[1] < i.width() - s.outerWidth(!1)
          }, mcsInSight: e.expr[":"].mcsInSight || function (t, i, n) {
            var s, o, a, r, l = e(t), c = l.parents(".mCSB_container"),
              u = "exact" === n[3] ? [[1, 0], [1, 0]] : [[.9, .1], [.6, .4]];
            if (c.length) return s = [l.outerHeight(!1), l.outerWidth(!1)], a = [c[0].offsetTop + te(l)[0], c[0].offsetLeft + te(l)[1]], o = [c.parent()[0].offsetHeight, c.parent()[0].offsetWidth], r = [s[0] < o[0] ? u[0] : u[1], s[1] < o[1] ? u[0] : u[1]], a[0] - o[0] * r[0][0] < 0 && a[0] + s[0] - o[0] * r[0][1] >= 0 && a[1] - o[1] * r[1][0] < 0 && a[1] + s[1] - o[1] * r[1][1] >= 0
          }, mcsOverflow: e.expr[":"].mcsOverflow || function (t) {
            var i = e(t).data("mCS");
            if (i) return i.overflowed[0] || i.overflowed[1]
          }
        })
      })
    }()
  }()
}), function () {
  function e(t) {
    if (!t || "object" != typeof t) return t;
    var i = new t.constructor;
    for (var n in t) t.hasOwnProperty(n) && (i[n] = e(t[n]));
    return i
  }

  function t(e, t) {
    if (e) {
      var i, n = 0, s = e.length;
      if (void 0 === s) {
        for (i in e) if (!1 === t.call(e[i], i, e[i])) break
      } else for (var o = e[0]; s > n && !1 !== t.call(o, n, o); o = e[++n]) ;
      return e
    }
  }

  function i(e) {
    return document.getElementById(e)
  }

  function n(e, i, n) {
    return "object" != typeof i ? e : (e && i && t(i, function (t, i) {
      n && "function" == typeof i || (e[t] = i)
    }), e)
  }

  function s(e) {
    return (e = e || window.event).preventDefault ? (e.stopPropagation(), e.preventDefault()) : (e.returnValue = !1, e.cancelBubble = !0), !1
  }

  function o(e, t, i) {
    e[t] = e[t] || [], e[t].push(i)
  }

  function a() {
    return "_" + ("" + Math.random()).slice(2, 10)
  }

  function r(r, l, h) {
    function p() {
      function e(e) {
        var t = S.hasiPadSupport && S.hasiPadSupport();
        return !(!/iPad|iPhone|iPod/i.test(navigator.userAgent) || /.flv$/i.test(E[0].url) || t) || (S.isLoaded() || !1 === S._fireEvent("onBeforeClick") || S.load(), s(e))
      }

      $f(r) ? ($f(r).getParent().innerHTML = "", y = $f(r).getIndex(), d[y] = S) : (d.push(S), y = d.length - 1), w = parseInt(r.style.height, 10) || r.clientHeight, g = r.id || "fp" + a(), v = l.id || g + "_api", l.id = v, h.playerId = g, "string" == typeof h && (h = {clip: {url: h}}), "string" == typeof h.clip && (h.clip = {url: h.clip}), h.clip = h.clip || {}, r.getAttribute("href", 2) && !h.clip.url && (h.clip.url = r.getAttribute("href", 2)), m = new c(h.clip, -1, S), h.playlist = h.playlist || [h.clip];
      var i = 0;
      t(h.playlist, function () {
        var e = this;
        "object" == typeof e && e.length && (e = {url: "" + e}), t(h.clip, function (t, i) {
          void 0 !== i && void 0 === e[t] && "function" != typeof i && (e[t] = i)
        }), h.playlist[i] = e, e = new c(e, i, S), E.push(e), i++
      }), t(h, function (e, t) {
        "function" == typeof t && (m[e] ? m[e](t) : o(_, e, t), delete h[e])
      }), t(h.plugins, function (e, t) {
        t && (k[e] = new u(e, t, S))
      }), h.plugins && void 0 !== h.plugins.controls || (k.controls = new u("controls", null, S)), k.canvas = new u("canvas", null, S), f = r.innerHTML, setTimeout(function () {
        "" !== f.replace(/\s/g, "") ? r.addEventListener ? r.addEventListener("click", e, !1) : r.attachEvent && r.attachEvent("onclick", e) : (r.addEventListener && r.addEventListener("click", s, !1), S.load())
      }, 0)
    }

    var f, m, g, v, y, b, x, w, S = this, C = null, T = !1, E = [], k = {}, _ = {};
    if (n(S, {
      id: function () {
        return g
      }, isLoaded: function () {
        return null !== C && void 0 !== C.fp_play && !T
      }, getParent: function () {
        return r
      }, hide: function (e) {
        return e && (r.style.height = "0px"), S.isLoaded() && (C.style.height = "0px"), S
      }, show: function () {
        return r.style.height = w + "px", S.isLoaded() && (C.style.height = x + "px"), S
      }, isHidden: function () {
        return S.isLoaded() && 0 === parseInt(C.style.height, 10)
      }, load: function (e) {
        if (!S.isLoaded() && !1 !== S._fireEvent("onBeforeLoad")) {
          var i = 0;
          t(d, function () {
            this.unload(function (t) {
              ++i == d.length && ((f = r.innerHTML) && !flashembed.isSupported(l.version) && (r.innerHTML = ""), e && (e.cached = !0, o(_, "onLoad", e)), flashembed(r, l, {config: h}))
            })
          })
        }
        return S
      }, unload: function (e) {
        if (this.isFullscreen() && /WebKit/i.test(navigator.userAgent)) return e && e(!1), S;
        if ("" !== f.replace(/\s/g, "")) {
          if (!1 === S._fireEvent("onBeforeUnload")) return e && e(!1), S;
          T = !0;
          try {
            C && (C.fp_close(), S._fireEvent("onUnload"))
          } catch (e) {
          }
          setTimeout(function () {
            C = null, r.innerHTML = f, T = !1, e && e(!0)
          }, 50)
        } else e && e(!1);
        return S
      }, getClip: function (e) {
        return void 0 === e && (e = b), E[e]
      }, getCommonClip: function () {
        return m
      }, getPlaylist: function () {
        return E
      }, getPlugin: function (e) {
        var t = k[e];
        if (!t && S.isLoaded()) {
          var i = S._api().fp_getPlugin(e);
          i && (t = new u(e, i, S), k[e] = t)
        }
        return t
      }, getScreen: function () {
        return S.getPlugin("screen")
      }, getControls: function () {
        return S.getPlugin("controls")._fireEvent("onUpdate")
      }, getLogo: function () {
        try {
          return S.getPlugin("logo")._fireEvent("onUpdate")
        } catch (e) {
        }
      }, getPlay: function () {
        return S.getPlugin("play")._fireEvent("onUpdate")
      }, getConfig: function (t) {
        return t ? e(h) : h
      }, getFlashParams: function () {
        return l
      }, loadPlugin: function (e, t, i, n) {
        "function" == typeof i && (n = i, i = {});
        var s = n ? a() : "_";
        S._api().fp_loadPlugin(e, t, i, s);
        var o = {};
        o[s] = n;
        var r = new u(e, null, S, o);
        return k[e] = r, r
      }, getState: function () {
        return S.isLoaded() ? C.fp_getState() : -1
      }, play: function (e, t) {
        var i = function () {
          void 0 !== e ? S._api().fp_play(e, t) : S._api().fp_play()
        };
        return S.isLoaded() ? i() : T ? setTimeout(function () {
          S.play(e, t)
        }, 50) : S.load(function () {
          i()
        }), S
      }, getVersion: function () {
        var e = "flowplayer.js 3.2.6";
        if (S.isLoaded()) {
          var t = C.fp_getVersion();
          return t.push(e), t
        }
        return e
      }, _api: function () {
        if (!S.isLoaded()) throw"Flowplayer " + S.id() + " not loaded when calling an API method";
        return C
      }, setClip: function (e) {
        return S.setPlaylist([e]), S
      }, getIndex: function () {
        return y
      }, _swfHeight: function () {
        return C.clientHeight
      }
    }), t("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,ClipAdd,Fullscreen*,FullscreenExit,Error,MouseOver,MouseOut".split(","), function () {
      var e = "on" + this;
      if (-1 != e.indexOf("*")) {
        var t = "onBefore" + (e = e.slice(0, e.length - 1)).slice(2);
        S[t] = function (e) {
          return o(_, t, e), S
        }
      }
      S[e] = function (t) {
        return o(_, e, t), S
      }
    }), t("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,toggleFullscreen,reset,close,setPlaylist,addClip,playFeed,setKeyboardShortcutsEnabled,isKeyboardShortcutsEnabled".split(","), function () {
      var e = this;
      S[e] = function (t, i) {
        if (!S.isLoaded()) return S;
        var n = null;
        return "undefined" === (n = void 0 !== t && void 0 !== i ? C["fp_" + e](t, i) : void 0 === t ? C["fp_" + e]() : C["fp_" + e](t)) || void 0 === n ? S : n
      }
    }), S._fireEvent = function (e) {
      "string" == typeof e && (e = [e]);
      var n = e[0], s = e[1], o = e[2], a = e[3], r = 0;
      if (h.debug && function (e) {
        console.log("$f.fireEvent", [].slice.call(e))
      }(e), S.isLoaded() || "onLoad" != n || "player" != s || (C = C || i(v), x = S._swfHeight(), t(E, function () {
        this._fireEvent("onLoad")
      }), t(k, function (e, t) {
        t._fireEvent("onUpdate")
      }), m._fireEvent("onLoad")), "onLoad" != n || "player" == s) {
        if ("onError" == n && ("string" == typeof s || "number" == typeof s && "number" == typeof o) && (s = o, o = a), "onContextMenu" == n) return void t(h.contextMenu[s], function (e, t) {
          t.call(S)
        });
        if ("onPluginEvent" != n && "onBeforePluginEvent" != n) {
          if ("onPlaylistReplace" == n) {
            E = [];
            var l = 0;
            t(s, function () {
              E.push(new c(this, l++, S))
            })
          }
          if ("onClipAdd" == n) {
            if (s.isInStream) return;
            for (s = new c(s, o, S), E.splice(o, 0, s), r = o + 1; r < E.length; r++) E[r].index++
          }
          var u = !0;
          if ("number" == typeof s && s < E.length) {
            b = s;
            var d = E[s];
            d && (u = d._fireEvent(n, o, a)), d && !1 === u || (u = m._fireEvent(n, o, a, d))
          }
          return t(_[n], function () {
            return u = this.call(S, s, o), this.cached && _[n].splice(r, 1), !1 !== u && void r++
          }), u
        }
        var p = s.name || s, f = k[p];
        if (f) return f._fireEvent("onUpdate", s), f._fireEvent(o, e.slice(3))
      }
    }, "string" == typeof r) {
      var M = i(r);
      if (!M) throw"Flowplayer cannot access element: " + r;
      r = M, p()
    } else p()
  }

  function l(e) {
    this.length = e.length, this.each = function (i) {
      t(e, i)
    }, this.size = function () {
      return e.length
    }
  }

  var c = function (e, i, s) {
    var r = this, l = {}, c = {};
    if (r.index = i, "string" == typeof e && (e = {url: e}), n(this, e, !0), t("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop".split(","), function () {
      var e = "on" + this;
      if (-1 != e.indexOf("*")) {
        var t = "onBefore" + (e = e.slice(0, e.length - 1)).slice(2);
        r[t] = function (e) {
          return o(c, t, e), r
        }
      }
      r[e] = function (t) {
        return o(c, e, t), r
      }, -1 == i && (r[t] && (s[t] = r[t]), r[e] && (s[e] = r[e]))
    }), n(this, {
      onCuepoint: function (e, t) {
        if (1 == arguments.length) return l.embedded = [null, e], r;
        "number" == typeof e && (e = [e]);
        var n = a();
        return l[n] = [e, t], s.isLoaded() && s._api().fp_addCuepoints(e, i, n), r
      }, update: function (e) {
        n(r, e), s.isLoaded() && s._api().fp_updateClip(e, i);
        var t = s.getConfig();
        n(-1 == i ? t.clip : t.playlist[i], e, !0)
      }, _fireEvent: function (e, o, a, u) {
        if ("onLoad" == e) return t(l, function (e, t) {
          t[0] && s._api().fp_addCuepoints(t[0], i, e)
        }), !1;
        if (u = u || r, "onCuepoint" == e) {
          var d = l[o];
          if (d) return d[1].call(s, u, a)
        }
        o && -1 != "onBeforeBegin,onMetaData,onStart,onUpdate,onResume".indexOf(e) && (n(u, o), o.metaData && (u.duration ? u.fullDuration = o.metaData.duration : u.duration = o.metaData.duration));
        var h = !0;
        return t(c[e], function () {
          h = this.call(s, u, o, a)
        }), h
      }
    }), e.onCuepoint) {
      var u = e.onCuepoint;
      r.onCuepoint.apply(r, "function" == typeof u ? [u] : u), delete e.onCuepoint
    }
    t(e, function (t, i) {
      "function" == typeof i && (o(c, t, i), delete e[t])
    }), -1 == i && (s.onCuepoint = this.onCuepoint)
  }, u = function (e, i, s, o) {
    var r = this, l = {}, c = !1;
    o && n(l, o), t(i, function (e, t) {
      "function" == typeof t && (l[e] = t, delete i[e])
    }), n(this, {
      animate: function (t, n, o) {
        if (!t) return r;
        if ("function" == typeof n && (o = n, n = 500), "string" == typeof t) {
          var c = t;
          (t = {})[c] = n, n = 500
        }
        if (o) {
          var u = a();
          l[u] = o
        }
        return void 0 === n && (n = 500), i = s._api().fp_animate(e, t, n, u), r
      }, css: function (t, o) {
        if (void 0 !== o) {
          var a = {};
          a[t] = o, t = a
        }
        return i = s._api().fp_css(e, t), n(r, i), r
      }, show: function () {
        return this.display = "block", s._api().fp_showPlugin(e), r
      }, hide: function () {
        return this.display = "none", s._api().fp_hidePlugin(e), r
      }, toggle: function () {
        return this.display = s._api().fp_togglePlugin(e), r
      }, fadeTo: function (t, i, n) {
        if ("function" == typeof i && (n = i, i = 500), n) {
          var o = a();
          l[o] = n
        }
        return this.display = s._api().fp_fadeTo(e, t, i, o), this.opacity = t, r
      }, fadeIn: function (e, t) {
        return r.fadeTo(1, e, t)
      }, fadeOut: function (e, t) {
        return r.fadeTo(0, e, t)
      }, getName: function () {
        return e
      }, getPlayer: function () {
        return s
      }, _fireEvent: function (i, o, a) {
        if ("onUpdate" == i) {
          var u = s._api().fp_getPlugin(e);
          if (!u) return;
          n(r, u), delete r.methods, c || (t(u.methods, function () {
            var t = "" + this;
            r[t] = function () {
              var i = [].slice.call(arguments), n = s._api().fp_invoke(e, t, i);
              return "undefined" === n || void 0 === n ? r : n
            }
          }), c = !0)
        }
        var d = l[i];
        if (d) {
          var h = d.apply(r, o);
          return "_" == i.slice(0, 1) && delete l[i], h
        }
        return r
      }
    })
  }, d = [];
  window.flowplayer = window.$f = function () {
    var s = null, o = arguments[0];
    if (!arguments.length) return t(d, function () {
      return this.isLoaded() ? (s = this, !1) : void 0
    }), s || d[0];
    if (1 == arguments.length) return "number" == typeof o ? d[o] : "*" == o ? new l(d) : (t(d, function () {
      return this.id() == o.id || this.id() == o || this.getParent() == o ? (s = this, !1) : void 0
    }), s);
    if (arguments.length > 1) {
      var a = arguments[1], c = 3 == arguments.length ? arguments[2] : {};
      if ("string" == typeof a && (a = {src: a}), a = n({
        bgcolor: "#000000",
        version: [9, 0],
        expressInstall: "http://static.flowplayer.org/swf/expressinstall.swf",
        cachebusting: !1
      }, a), "string" == typeof o) {
        if (-1 != o.indexOf(".")) {
          var u = [];
          return t(function (e) {
            var i = e.indexOf(".");
            if (-1 != i) {
              var n = e.slice(0, i) || "*", s = e.slice(i + 1, e.length), o = [];
              return t(document.getElementsByTagName(n), function () {
                this.className && -1 != this.className.indexOf(s) && o.push(this)
              }), o
            }
          }(o), function () {
            u.push(new r(this, e(a), e(c)))
          }), new l(u)
        }
        var h = i(o);
        return new r(null !== h ? h : o, a, c)
      }
      if (o) return new r(o, a, c)
    }
    return null
  }, n(window.$f, {
    fireEvent: function () {
      var e = [].slice.call(arguments), t = $f(e[0]);
      return t ? t._fireEvent(e.slice(1)) : null
    }, addPlugin: function (e, t) {
      return r.prototype[e] = t, $f
    }, each: t, extend: n
  }), "function" == typeof jQuery && (jQuery.fn.flowplayer = function (t, i) {
    if (!arguments.length || "number" == typeof arguments[0]) {
      var n = [];
      return this.each(function () {
        var e = $f(this);
        e && n.push(e)
      }), arguments.length ? n[arguments[0]] : new l(n)
    }
    return this.each(function () {
      $f(this, e(t), i ? e(i) : {})
    })
  })
}(), function () {
  function e() {
    if (a.done) return !1;
    var e = document;
    if (e && e.getElementsByTagName && e.getElementById && e.body) {
      clearInterval(a.timer), a.timer = null;
      for (var t = 0; t < a.ready.length; t++) a.ready[t].call();
      a.ready = null, a.done = !0
    }
  }

  function t(e, t) {
    if (t) for (key in t) t.hasOwnProperty(key) && (e[key] = t[key]);
    return e
  }

  function i(e) {
    switch (function (e) {
      if (null === e || void 0 === e) return !1;
      var t = typeof e;
      return "object" == t && e.push ? "array" : t
    }(e)) {
      case"string":
        return e = e.replace(new RegExp('(["\\\\])', "g"), "\\$1"), '"' + (e = e.replace(/^\s?(\d+)%/, "$1pct")) + '"';
      case"array":
        return "[" + function (e, t) {
          var i = [];
          for (var n in e) e.hasOwnProperty(n) && (i[n] = t(e[n]));
          return i
        }(e, function (e) {
          return i(e)
        }).join(",") + "]";
      case"function":
        return '"function()"';
      case"object":
        var t = [];
        for (var n in e) e.hasOwnProperty(n) && t.push('"' + n + '":' + i(e[n]));
        return "{" + t.join(",") + "}"
    }
    return String(e).replace(/\s/g, " ").replace(/\'/g, '"')
  }

  function n(e, n) {
    var s = t({}, e), o = document.all, a = '<object width="' + s.width + '" height="' + s.height + '"';
    o && !s.id && (s.id = "_" + ("" + Math.random()).substring(9)), s.id && (a += ' id="' + s.id + '"'), s.cachebusting && (s.src += (-1 != s.src.indexOf("?") ? "&" : "?") + Math.random()), a += s.w3c || !o ? ' data="' + s.src + '" type="application/x-shockwave-flash"' : ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"', a += ">", (s.w3c || o) && (a += '<param name="movie" value="' + s.src + '" />'), s.width = s.height = s.id = s.w3c = s.src = null;
    for (var r in s) null !== s[r] && (a += '<param name="' + r + '" value="' + s[r] + '" />');
    var l = "";
    if (n) {
      for (var c in n) null !== n[c] && (l += c + "=" + ("object" == typeof n[c] ? i(n[c]) : n[c]) + "&");
      a += '<param name="flashvars" value=\'' + (l = l.substring(0, l.length - 1)) + "' />"
    }
    return a += "</object>"
  }

  var s = "function" == typeof jQuery, o = {
    width: "100%",
    height: "100%",
    allowfullscreen: !0,
    allowscriptaccess: "always",
    quality: "high",
    version: null,
    onFail: null,
    expressInstall: null,
    w3c: !1,
    cachebusting: !1
  };
  s && (jQuery.tools = jQuery.tools || {}, jQuery.tools.flashembed = {version: "1.0.4", conf: o});
  var a = s ? jQuery : function (t) {
    return a.done ? t() : void(a.timer ? a.ready.push(t) : (a.ready = [t], a.timer = setInterval(e, 13)))
  };
  window.attachEvent && window.attachEvent("onbeforeunload", function () {
    __flash_unloadHandler = function () {
    }, __flash_savedUnloadHandler = function () {
    }
  }), window.flashembed = function (e, i, s) {
    if ("string" == typeof e) {
      var r = document.getElementById(e);
      if (!r) return void a(function () {
        flashembed(e, i, s)
      });
      e = r
    }
    if (e) {
      "string" == typeof i && (i = {src: i});
      var l = t({}, o);
      return t(l, i), new function (e, i, s) {
        var o = flashembed.getVersion();
        t(this, {
          getContainer: function () {
            return e
          }, getConf: function () {
            return i
          }, getVersion: function () {
            return o
          }, getFlashvars: function () {
            return s
          }, getApi: function () {
            return e.firstChild
          }, getHTML: function () {
            return n(i, s)
          }
        });
        var a = i.version, r = i.expressInstall, l = !a || flashembed.isSupported(a);
        if (l ? (i.onFail = i.version = i.expressInstall = null, e.innerHTML = n(i, s)) : a && r && flashembed.isSupported([6, 65]) ? (t(i, {src: r}), s = {
          MMredirectURL: location.href,
          MMplayerType: "PlugIn",
          MMdoctitle: document.title
        }, e.innerHTML = n(i, s)) : "" !== e.innerHTML.replace(/\s/g, "") || (e.innerHTML = "<h2>Flash version " + a + " or greater is required</h2><h3>" + (o[0] > 0 ? "Your version is " + o : "You have no flash plugin installed") + "</h3>" + ("A" == e.tagName ? "<p>Click here to download latest version</p>" : "<p>Download latest version from <a href='http://www.adobe.com/go/getflashplayer'>here</a></p>"), "A" == e.tagName && (e.onclick = function () {
          location.href = "http://www.adobe.com/go/getflashplayer"
        })), !l && i.onFail) {
          var c = i.onFail.call(this);
          "string" == typeof c && (e.innerHTML = c)
        }
        document.all && (window[i.id] = document.getElementById(i.id))
      }(e, l, s)
    }
  }, t(window.flashembed, {
    getVersion: function () {
      var e = [0, 0];
      if (navigator.plugins && "object" == typeof navigator.plugins["Shockwave Flash"]) {
        var t = navigator.plugins["Shockwave Flash"].description;
        if (void 0 !== t) {
          t = t.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
          var i = parseInt(t.replace(/^(.*)\..*$/, "$1"), 10),
            n = /r/.test(t) ? parseInt(t.replace(/^.*r(.*)$/, "$1"), 10) : 0;
          e = [i, n]
        }
      } else if (window.ActiveXObject) {
        try {
          var s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
        } catch (t) {
          try {
            s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), e = [6, 0], s.AllowScriptAccess = "always"
          } catch (t) {
            if (6 == e[0]) return e
          }
          try {
            s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
          } catch (e) {
          }
        }
        "object" == typeof s && void 0 !== (t = s.GetVariable("$version")) && (t = t.replace(/^\S+\s+(.*)$/, "$1").split(","), e = [parseInt(t[0], 10), parseInt(t[2], 10)])
      }
      return e
    }, isSupported: function (e) {
      var t = flashembed.getVersion();
      return t[0] > e[0] || t[0] == e[0] && t[1] >= e[1]
    }, domReady: a, asString: i, getHTML: n
  }), s && (jQuery.fn.flashembed = function (e, t) {
    var i = null;
    return this.each(function () {
      i = flashembed(this, e, t)
    }), !1 === e.api ? this : i
  })
}(), function () {
  function e() {
    if (!a && (a = !0, r)) {
      for (var e = 0; e < r.length; e++) r[e].call(window, []);
      r = []
    }
  }

  function t() {
    if (!o) {
      if (o = !0, document.addEventListener && !s.opera && document.addEventListener("DOMContentLoaded", e, !1), s.msie && window == top && function () {
        if (!a) {
          try {
            document.documentElement.doScroll("left")
          } catch (e) {
            return void setTimeout(arguments.callee, 0)
          }
          e()
        }
      }(), s.opera && document.addEventListener("DOMContentLoaded", function () {
        if (!a) {
          for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].disabled) return void setTimeout(arguments.callee, 0);
          e()
        }
      }, !1), s.safari) {
        var t;
        !function () {
          if (!a) {
            if ("loaded" != document.readyState && "complete" != document.readyState) return void setTimeout(arguments.callee, 0);
            if (void 0 === t) {
              for (var i = document.getElementsByTagName("link"), n = 0; n < i.length; n++) "stylesheet" == i[n].getAttribute("rel") && t++;
              var s = document.getElementsByTagName("style");
              t += s.length
            }
            document.styleSheets.length != t ? setTimeout(arguments.callee, 0) : e()
          }
        }()
      }
      !function (e) {
        var t = window.onload;
        "function" != typeof window.onload ? window.onload = e : window.onload = function () {
          t && t(), e()
        }
      }(e)
    }
  }

  var i = window.DomReady = {}, n = navigator.userAgent.toLowerCase(), s = {
    version: (n.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
    safari: /webkit/.test(n),
    opera: /opera/.test(n),
    msie: /msie/.test(n) && !/opera/.test(n),
    mozilla: /mozilla/.test(n) && !/(compatible|webkit)/.test(n)
  }, o = !1, a = !1, r = [];
  i.ready = function (e, i) {
    t(), a ? e.call(window, []) : r.push(function () {
      return e.call(window, [])
    })
  }, t()
}(), function (e, t, i) {
  "use strict";

  function n(e, t) {
    return e.canPlayType(t) || f && t.search("mp4") > -1
  }

  function s(e) {
    for (var i = t.getElementsByTagName(e), s = [], a = 0; a < i.length; a++) s.push(i[a]);
    for (a = 0; a < s.length; a++) {
      var l = s[a], c = !0;
      if (l.canPlayType) if (l.src) n(l, r(e, l.src)) && (c = !1); else for (var u = l.getElementsByTagName("source"), d = 0; d < u.length; d++) {
        var h = u[d];
        if (n(l, r(e, h.src, h.type))) {
          c = !1;
          break
        }
      }
      c || o.forceFallback(e, l) ? o.createFallback(e, l) : f && l.addEventListener("click", function () {
        this.play()
      }, !1)
    }
  }

  function o() {
    s("video"), s("audio")
  }

  function a(e) {
    return e.split("/").slice(0, -1).join("/") + "/"
  }

  function r(e, t, i) {
    if (i) return i;
    var n = /\.([a-z1-9]+)(\?|#|\s|$)/i.exec(t);
    if (n) {
      var s = T[e][n[1]];
      if (s) return s
    }
    return S[e]
  }

  function l(e, t) {
    var i = e.getAttribute(t);
    return !!i || "string" == typeof i
  }

  function c(e) {
    var i = t.createElement("a");
    return i.href = e, i.href
  }

  function u(i, n, s) {
    var o = i.getAttribute(n);
    if (o) return o + "px";
    var a;
    if (i.currentStyle) a = i.currentStyle[n]; else {
      if (!e.getComputedStyle) return s;
      a = t.defaultView.getComputedStyle(i, null).getPropertyValue(n)
    }
    return "auto" == a ? s : a
  }

  function d(e) {
    return e.match(/\s*([\w-]+\/[\w-]+)(;|\s|$)/)[1]
  }

  function h(e, t) {
    return d(e) == d(t)
  }

  var p = e.navigator.userAgent.toLowerCase();
  t.createElement("video").canPlayType || (t.createElement("audio"), t.createElement("source"));
  var f = null !== p.match(/android 2\.[12]/) || null !== p.match(/android 6/), m = null !== p.match(/opera/);
  o.forceFallback = function (e, t) {
    return !1
  };
  var g = function () {
    for (var e = t.getElementsByTagName("script"), i = 0; i < e.length; i++) {
      var n = e[i];
      if (n.src.match(/html5media(\.min|)\.js/)) return a(n.src)
    }
    return ""
  }();
  o.flowplayerSwf = g + "flowplayer.swf", o.flowplayerAudioSwf = g + "flowplayer.audio.swf", o.flowplayerControlsSwf = g + "flowplayer.controls.swf", o.expressInstallSwf = g + "expressInstall.swf", o.videoFallbackClass = "html5media-video-fallback", o.audioFallbackClass = "html5media-audio-fallback";
  var v = 'video/ogg; codecs="theora, vorbis"', y = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
    b = 'audio/ogg; codecs="vorbis"', x = "audio/x-m4a;", w = "audio/mpeg;", S = {video: y, audio: w}, C = [y, x, w],
    T = {
      video: {
        ogg: v,
        ogv: v,
        avi: y,
        mp4: y,
        mkv: y,
        h264: y,
        264: y,
        avc: y,
        m4v: y,
        "3gp": y,
        "3gpp": y,
        "3g2": y,
        mpg: y,
        mpeg: y,
        webm: "video/webm;"
      }, audio: {ogg: b, oga: b, aac: x, m4a: x, mp3: w, wav: 'audio/wav; codecs="1"'}
    };
  o.configureFlowplayer = function (e, t) {
    return t
  }, o.createFallback = function (e, i) {
    var n = l(i, "controls"), s = i.getAttribute("poster") || "", a = i.getAttribute("src") || "";
    if (!a) for (var d = i.getElementsByTagName("source"), p = 0; p < d.length; p++) {
      var f = d[p], g = f.getAttribute("src");
      if (g) for (var v = 0; v < C.length; v++) {
        if (h(C[v], r(e, g, f.getAttribute("type")))) {
          a = g;
          break
        }
      }
      if (a) break
    }
    if (a) {
      var y = t.createElement("span");
      y.id = i.id, y.style.cssText = i.style.cssText, y.className = i.className, y.title = i.title, i.style.display || (y.style.display = "block"), y.style.width = u(i, "width", "300px"), "audio" == e ? (y.style.height = u(i, "height", "26px"), y.className = (y.className ? y.className + " " : "") + o.audioFallbackClass) : (y.style.height = u(i, "height", "200px"), y.className = (y.className ? y.className + " " : "") + o.videoFallbackClass), i.parentNode.replaceChild(y, i);
      var b = (i.getAttribute("preload") || "").toLowerCase(), x = [];
      s && x.push({url: c(s)}), a && x.push({
        url: c(a),
        autoPlay: l(i, "autoplay"),
        autoBuffering: l(i, "autobuffer") || l(i, "preload") && ("" === b || "auto" == b),
        onBeforeFinish: function () {
          return !l(i, "loop")
        }
      });
      var w = {
        controls: n && {
          url: c(o.flowplayerControlsSwf),
          opacity: .8,
          backgroundColor: "#181818",
          backgroundGradient: "none",
          fullscreen: "video" == e,
          autoHide: "video" == e && {
            fullscreenOnly: !1,
            enabled: !0,
            hideStyle: "fade",
            mouseOutDelay: 0
          } || {enabled: !1}
        } || null
      };
      m && w.controls && (w.controls.autoHide.enabled = !1), "audio" == e && (w.audio = {url: c(o.flowplayerAudioSwf)}, n || (w.controls = {
        url: c(o.flowplayerControlsSwf),
        display: "none"
      }, y.style.height = 0), x[x.length - 1].autoBuffering = !1);
      var S = {
        play: null,
        playlist: x,
        clip: {scaling: "fit", fadeInSpeed: 0, fadeOutSpeed: 0},
        canvas: {backgroundGradient: "none", backgroundColor: "#000000"},
        plugins: w
      };
      S = o.configureFlowplayer(i, S), flowplayer(y, {
        src: c(o.flowplayerSwf),
        expressInstall: c(o.expressInstallSwf),
        wmode: "opaque"
      }, S)
    }
  }, DomReady.ready(o), e.html5media = o
}(this, document), function (e, t) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports ? module.exports = t(e, document) : "function" == typeof define && define.amd ? define([], function () {
    return t(e, document)
  }) : e.plyr = t(e, document)
}("undefined" != typeof window ? window : this, function (e, t) {
  "use strict";

  function i() {
    var e, i, n, s = navigator.userAgent, o = navigator.appName, a = "" + parseFloat(navigator.appVersion),
      r = parseInt(navigator.appVersion, 10), l = !1, c = !1, u = !1, d = !1;
    return -1 !== navigator.appVersion.indexOf("Windows NT") && -1 !== navigator.appVersion.indexOf("rv:11") ? (l = !0, o = "IE", a = "11") : -1 !== (i = s.indexOf("MSIE")) ? (l = !0, o = "IE", a = s.substring(i + 5)) : -1 !== (i = s.indexOf("Chrome")) ? (u = !0, o = "Chrome", a = s.substring(i + 7)) : -1 !== (i = s.indexOf("Safari")) ? (d = !0, o = "Safari", a = s.substring(i + 7), -1 !== (i = s.indexOf("Version")) && (a = s.substring(i + 8))) : -1 !== (i = s.indexOf("Firefox")) ? (c = !0, o = "Firefox", a = s.substring(i + 8)) : (e = s.lastIndexOf(" ") + 1) < (i = s.lastIndexOf("/")) && (o = s.substring(e, i), a = s.substring(i + 1), o.toLowerCase() === o.toUpperCase() && (o = navigator.appName)), -1 !== (n = a.indexOf(";")) && (a = a.substring(0, n)), -1 !== (n = a.indexOf(" ")) && (a = a.substring(0, n)), r = parseInt("" + a, 10), isNaN(r) && (a = "" + parseFloat(navigator.appVersion), r = parseInt(navigator.appVersion, 10)), {
      name: o,
      version: r,
      isIE: l,
      isFirefox: c,
      isChrome: u,
      isSafari: d,
      isIos: /(iPad|iPhone|iPod)/g.test(navigator.platform),
      isIphone: /(iPhone|iPod)/g.test(navigator.userAgent),
      isTouch: "ontouchstart" in t.documentElement
    }
  }

  function n(e) {
    if (!t.querySelectorAll('script[src="' + e + '"]').length) {
      var i = t.createElement("script");
      i.src = e;
      var n = t.getElementsByTagName("script")[0];
      n.parentNode.insertBefore(i, n)
    }
  }

  function s(e, t) {
    return Array.prototype.indexOf && -1 !== e.indexOf(t)
  }

  function o(e, t, i) {
    return e.replace(new RegExp(t.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, "\\$1"), "g"), i)
  }

  function a(e, t) {
    e.length || (e = [e]);
    for (var i = e.length - 1; i >= 0; i--) {
      var n = i > 0 ? t.cloneNode(!0) : t, s = e[i], o = s.parentNode, a = s.nextSibling;
      return n.appendChild(s), a ? o.insertBefore(n, a) : o.appendChild(n), n
    }
  }

  function r(e) {
    e && e.parentNode.removeChild(e)
  }

  function l(e, t) {
    e.insertBefore(t, e.firstChild)
  }

  function c(e, t) {
    for (var i in t) e.setAttribute(i, M.boolean(t[i]) && t[i] ? "" : t[i])
  }

  function u(e, i, n) {
    var s = t.createElement(e);
    c(s, n), l(i, s)
  }

  function d(e, t, i) {
    if (e) if (e.classList) e.classList[i ? "add" : "remove"](t); else {
      var n = (" " + e.className + " ").replace(/\s+/g, " ").replace(" " + t + " ", "");
      e.className = n + (i ? " " + t : "")
    }
  }

  function h(e, t) {
    return !!e && (e.classList ? e.classList.contains(t) : new RegExp("(\\s|^)" + t + "(\\s|$)").test(e.className))
  }

  function p(e, i) {
    var n = Element.prototype;
    return (n.matches || n.webkitMatchesSelector || n.mozMatchesSelector || n.msMatchesSelector || function (e) {
      return -1 !== [].indexOf.call(t.querySelectorAll(e), this)
    }).call(e, i)
  }

  function f(e, t, i, n, s) {
    i && g(e, t, function (t) {
      i.apply(e, [t])
    }, s), g(e, t, function (t) {
      n.apply(e, [t])
    }, s)
  }

  function m(e, t, i, n, s) {
    var o = t.split(" ");
    if (M.boolean(s) || (s = !1), e instanceof NodeList) for (var a = 0; a < e.length; a++) e[a] instanceof Node && m(e[a], arguments[1], arguments[2], arguments[3]); else for (var r = 0; r < o.length; r++) e[n ? "addEventListener" : "removeEventListener"](o[r], i, s)
  }

  function g(e, t, i, n) {
    e && m(e, t, i, !0, n)
  }

  function v(e, t, i, n) {
    if (e && t) {
      M.boolean(i) || (i = !1);
      var s = new CustomEvent(t, {bubbles: i, detail: n});
      e.dispatchEvent(s)
    }
  }

  function y(e, t) {
    if (e) return t = M.boolean(t) ? t : !e.getAttribute("aria-pressed"), e.setAttribute("aria-pressed", t), t
  }

  function b(e, t) {
    return 0 === e || 0 === t || isNaN(e) || isNaN(t) ? 0 : (e / t * 100).toFixed(2)
  }

  function x() {
    var e = arguments;
    if (e.length) {
      if (1 === e.length) return e[0];
      for (var t = Array.prototype.shift.call(e), i = e.length, n = 0; n < i; n++) {
        var s = e[n];
        for (var o in s) s[o] && s[o].constructor && s[o].constructor === Object ? (t[o] = t[o] || {}, x(t[o], s[o])) : t[o] = s[o]
      }
      return t
    }
  }

  function w(w, I) {
    function L(e, t, i, n) {
      v(e, t, i, x({}, n, {plyr: ke}))
    }

    function z(t, i) {
      I.debug && e.console && (i = Array.prototype.slice.call(i), M.string(I.logPrefix) && I.logPrefix.length && i.unshift(I.logPrefix), console[t].apply(console, i))
    }

    function A() {
      return {url: I.iconUrl, absolute: 0 === I.iconUrl.indexOf("http") || _e.browser.isIE && !e.svg4everybody}
    }

    function D() {
      if (_e.supported.full && ("audio" !== _e.type || I.fullscreen.allowAudio) && I.fullscreen.enabled) {
        var t = E.supportsFullScreen;
        t || I.fullscreen.fallback && !function () {
          try {
            return e.self !== e.top
          } catch (e) {
            return !0
          }
        }() ? (Ie((t ? "Native" : "Fallback") + " fullscreen enabled"), t || d(_e.container, I.classes.fullscreen.fallback, !0), d(_e.container, I.classes.fullscreen.enabled, !0)) : Ie("Fullscreen not supported and fallback disabled"), _e.buttons && _e.buttons.fullscreen && y(_e.buttons.fullscreen, !1), H()
      }
    }

    function $() {
      if ("video" === _e.type) {
        F(I.selectors.captions) || _e.videoContainer.insertAdjacentHTML("afterbegin", '<div class="' + function (e) {
          return e.replace(".", "")
        }(I.selectors.captions) + '"></div>'), _e.usingTextTracks = !1, _e.media.textTracks && (_e.usingTextTracks = !0);
        for (var e, t = "", i = _e.media.childNodes, n = 0; n < i.length; n++) "track" === i[n].nodeName.toLowerCase() && ("captions" !== (e = i[n].kind) && "subtitles" !== e || (t = i[n].getAttribute("src")));
        if (_e.captionExists = !0, "" === t ? (_e.captionExists = !1, Ie("No caption track found")) : Ie("Caption track found; URI: " + t), _e.captionExists) {
          for (var s = _e.media.textTracks, o = 0; o < s.length; o++) s[o].mode = "hidden";
          if (function () {
            if (!_e.buttons.captions) return;
            d(_e.container, I.classes.captions.enabled, !0);
            var e = _e.storage.captionsEnabled;
            M.boolean(e) || (e = I.captions.defaultActive);
            e && (d(_e.container, I.classes.captions.active, !0), y(_e.buttons.captions, !0))
          }(), (_e.browser.isIE && _e.browser.version >= 10 || _e.browser.isFirefox && _e.browser.version >= 31) && (Ie("Detected browser with known TextTrack issues - using manual fallback"), _e.usingTextTracks = !1), _e.usingTextTracks) {
            Ie("TextTracks supported");
            for (var a = 0; a < s.length; a++) {
              var r = s[a];
              "captions" !== r.kind && "subtitles" !== r.kind || g(r, "cuechange", function () {
                this.activeCues[0] && "text" in this.activeCues[0] ? O(this.activeCues[0].getCueAsHTML()) : O()
              })
            }
          } else if (Ie("TextTracks not supported so rendering captions manually"), _e.currentCaption = "", _e.captions = [], "" !== t) {
            var l = new XMLHttpRequest;
            l.onreadystatechange = function () {
              if (4 === l.readyState) if (200 === l.status) {
                var e, t = [], i = l.responseText, n = "\r\n";
                -1 === i.indexOf(n + n) && (n = -1 !== i.indexOf("\r\r") ? "\r" : "\n"), t = i.split(n + n);
                for (var s = 0; s < t.length; s++) {
                  e = t[s], _e.captions[s] = [];
                  var o = e.split(n), a = 0;
                  -1 === o[a].indexOf(":") && (a = 1), _e.captions[s] = [o[a], o[a + 1]]
                }
                _e.captions.shift(), Ie("Successfully loaded the caption file via AJAX")
              } else Le(I.logPrefix + "There was a problem loading the caption file via AJAX")
            }, l.open("get", t, !0), l.send()
          }
        } else d(_e.container, I.classes.captions.enabled)
      }
    }

    function O(e) {
      var i = F(I.selectors.captions), n = t.createElement("span");
      i.innerHTML = "", M.undefined(e) && (e = ""), M.string(e) ? n.innerHTML = e.trim() : n.appendChild(e), i.appendChild(n);
      i.offsetHeight
    }

    function j(e) {
      function t(e, t) {
        var i = [];
        i = e.split(" --\x3e ");
        for (var n = 0; n < i.length; n++) i[n] = i[n].replace(/(\d+:\d+:\d+\.\d+).*/, "$1");
        return function (e) {
          {
            if (null === e || void 0 === e) return 0;
            var t = [], i = [];
            return t = e.split(","), i = t[0].split(":"), Math.floor(60 * i[0] * 60) + Math.floor(60 * i[1]) + Math.floor(i[2])
          }
        }(i[t])
      }

      function i(e) {
        return t(e, 1)
      }

      if (!_e.usingTextTracks && "video" === _e.type && _e.supported.full && (_e.subcount = 0, e = M.number(e) ? e : _e.media.currentTime, _e.captions[_e.subcount])) {
        for (; i(_e.captions[_e.subcount][0]) < e.toFixed(1);) if (_e.subcount++, _e.subcount > _e.captions.length - 1) {
          _e.subcount = _e.captions.length - 1;
          break
        }
        _e.media.currentTime.toFixed(1) >= function (e) {
          return t(e, 0)
        }(_e.captions[_e.subcount][0]) && _e.media.currentTime.toFixed(1) <= i(_e.captions[_e.subcount][0]) ? (_e.currentCaption = _e.captions[_e.subcount][1], O(_e.currentCaption)) : O()
      }
    }

    function B(e) {
      return _e.container.querySelectorAll(e)
    }

    function F(e) {
      return B(e)[0]
    }

    function H() {
      var e = B("input:not([disabled]), button:not([disabled])"), t = e[0], i = e[e.length - 1];
      g(_e.container, "keydown", function (e) {
        9 === e.which && _e.isFullscreen && (e.target !== i || e.shiftKey ? e.target === t && e.shiftKey && (e.preventDefault(), i.focus()) : (e.preventDefault(), t.focus()))
      })
    }

    function N(e, t) {
      if (M.string(t)) u(e, _e.media, {src: t}); else if (t.constructor === Array) for (var i = t.length - 1; i >= 0; i--) u(e, _e.media, t[i])
    }

    function R() {
      if (I.loadSprite) {
        var e = A();
        e.absolute ? (Ie("AJAX loading absolute SVG sprite" + (_e.browser.isIE ? " (due to IE)" : "")), S(e.url, "sprite-plyr")) : Ie("Sprite will be used as external resource directly")
      }
      var i = I.html;
      Ie("Injecting custom controls"), i || (i = function () {
        var e = [], t = A(), i = (t.absolute ? "" : t.url) + "#" + I.iconPrefix;
        return s(I.controls, "play-large") && e.push('<button type="button" data-plyr="play" class="plyr__play-large">', '<svg><use xlink:href="' + i + '-play" /></svg>', '<span class="plyr__sr-only">' + I.i18n.play + "</span>", "</button>"), e.push('<div class="plyr__controls">'), s(I.controls, "restart") && e.push('<button type="button" data-plyr="restart">', '<svg><use xlink:href="' + i + '-restart" /></svg>', '<span class="plyr__sr-only">' + I.i18n.restart + "</span>", "</button>"), s(I.controls, "rewind") && e.push('<button type="button" data-plyr="rewind">', '<svg><use xlink:href="' + i + '-rewind" /></svg>', '<span class="plyr__sr-only">' + I.i18n.rewind + "</span>", "</button>"), s(I.controls, "prev") && e.push('<button id="audioPlayerPrev" type="button" data-plyr="prev">', '<span class="plyr__sr-only">' + I.i18n.prev + "</span>", "</button>"), s(I.controls, "play") && e.push('<button type="button" data-plyr="play">', '<svg><use xlink:href="' + i + '-play" /></svg>', '<span class="plyr__sr-only">' + I.i18n.play + "</span>", "</button>", '<button type="button" data-plyr="pause">', '<svg><use xlink:href="' + i + '-pause" /></svg>', '<span class="plyr__sr-only">' + I.i18n.pause + "</span>", "</button>"), s(I.controls, "next") && e.push('<button id="audioPlayerNext" type="button" data-plyr="next">', '<span class="plyr__sr-only">' + I.i18n.next + "</span>", "</button>"), s(I.controls, "fast-forward") && e.push('<button type="button" data-plyr="fast-forward">', '<svg><use xlink:href="' + i + '-fast-forward" /></svg>', '<span class="plyr__sr-only">' + I.i18n.forward + "</span>", "</button>"), s(I.controls, "progress") && (e.push('<span class="plyr__progress">', '<label for="seek{id}" class="plyr__sr-only">Seek</label>', '<input id="seek{id}" class="plyr__progress--seek" type="range" min="0" max="100" step="0.1" value="0" data-plyr="seek">', '<progress class="plyr__progress--played" max="100" value="0" role="presentation"></progress>', '<progress class="plyr__progress--buffer" max="100" value="0">', "<span>0</span>% " + I.i18n.buffered, "</progress>"), I.tooltips.seek && e.push('<span class="plyr__tooltip">00:00</span>'), e.push("</span>")), s(I.controls, "current-time") && e.push('<span class="plyr__time">', '<span class="plyr__sr-only">' + I.i18n.currentTime + "</span>", '<span class="plyr__time--current">00:00</span>', "</span>"), s(I.controls, "duration") && e.push('<span class="plyr__time">', '<span class="plyr__sr-only">' + I.i18n.duration + "</span>", '<span class="plyr__time--duration">00:00</span>', "</span>"), s(I.controls, "mute") && e.push('<button type="button" data-plyr="mute">', '<svg class="icon--muted"><use xlink:href="' + i + '-muted" /></svg>', '<svg><use xlink:href="' + i + '-volume" /></svg>', '<span class="plyr__sr-only">' + I.i18n.toggleMute + "</span>", "</button>"), s(I.controls, "volume") && e.push('<span class="plyr__volume">', '<label for="volume{id}" class="plyr__sr-only">' + I.i18n.volume + "</label>", '<input id="volume{id}" class="plyr__volume--input" type="range" min="' + I.volumeMin + '" max="' + I.volumeMax + '" value="' + I.volume + '" data-plyr="volume">', '<progress class="plyr__volume--display" max="' + I.volumeMax + '" value="' + I.volumeMin + '" role="presentation"></progress>', "</span>"), s(I.controls, "captions") && e.push('<button type="button" data-plyr="captions">', '<svg class="icon--captions-on"><use xlink:href="' + i + '-captions-on" /></svg>', '<svg><use xlink:href="' + i + '-captions-off" /></svg>', '<span class="plyr__sr-only">' + I.i18n.toggleCaptions + "</span>", "</button>"), s(I.controls, "fullscreen") && e.push('<button type="button" data-plyr="fullscreen">', '<svg class="icon--exit-fullscreen"><use xlink:href="' + i + '-exit-fullscreen" /></svg>', '<svg><use xlink:href="' + i + '-enter-fullscreen" /></svg>', '<span class="plyr__sr-only">' + I.i18n.toggleFullscreen + "</span>", "</button>"), e.push("</div>"), e.join("")
      }()), i = o(i = o(i, "{seektime}", I.seekTime), "{id}", Math.floor(1e4 * Math.random())), I.title && (i = o(i, "{title}", I.title));
      var n;
      if (M.string(I.selectors.controls.container) && (n = t.querySelector(I.selectors.controls.container)), M.htmlElement(n) || (n = _e.container), n.insertAdjacentHTML("beforeend", i), I.tooltips.controls) for (var a = B([I.selectors.controls.wrapper, " ", I.selectors.labels, " .", I.classes.hidden].join("")), r = a.length - 1; r >= 0; r--) {
        var l = a[r];
        d(l, I.classes.hidden, !1), d(l, I.classes.tooltip, !0)
      }
    }

    function q() {
      d(_e.container, I.selectors.container.replace(".", ""), _e.supported.full)
    }

    function W(e) {
      e && s(I.types.html5, _e.type) ? _e.media.setAttribute("controls", "") : _e.media.removeAttribute("controls")
    }

    function X(e) {
      var t = I.i18n.play;
      if (M.string(I.title) && I.title.length && (t += ", " + I.title, _e.container.setAttribute("aria-label", I.title)), _e.supported.full && _e.buttons.play) for (var i = _e.buttons.play.length - 1; i >= 0; i--) _e.buttons.play[i].setAttribute("aria-label", t);
      M.htmlElement(e) && e.setAttribute("title", I.i18n.frameTitle.replace("{title}", I.title))
    }

    function Y(t) {
      P.supported && I.storage.enabled && (x(_e.storage, t), e.localStorage.setItem(I.storage.key, JSON.stringify(_e.storage)))
    }

    function V() {
      if (_e.media) {
        if (_e.supported.full && (d(_e.container, I.classes.type.replace("{0}", _e.type), !0), s(I.types.embed, _e.type) && d(_e.container, I.classes.type.replace("{0}", "video"), !0), d(_e.container, I.classes.stopped, I.autoplay), d(_e.container, I.classes.isIos, _e.browser.isIos), d(_e.container, I.classes.isTouch, _e.browser.isTouch), "video" === _e.type)) {
          var i = t.createElement("div");
          i.setAttribute("class", I.classes.videoWrapper), a(_e.media, i), _e.videoContainer = i
        }
        s(I.types.embed, _e.type) && function () {
          var i, s = t.createElement("div"), o = _e.type + "-" + Math.floor(1e4 * Math.random());
          switch (_e.type) {
            case"youtube":
              i = function (e) {
                return e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/) ? RegExp.$2 : e
              }(_e.embedId);
              break;
            case"vimeo":
              i = function (e) {
                return e.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : e
              }(_e.embedId);
              break;
            default:
              i = _e.embedId
          }
          for (var a = B('[id^="' + _e.type + '-"]'), l = a.length - 1; l >= 0; l--) r(a[l]);
          if (d(_e.media, I.classes.videoWrapper, !0), d(_e.media, I.classes.embedWrapper, !0), "youtube" === _e.type) _e.media.appendChild(s), s.setAttribute("id", o), M.object(e.YT) ? U(i, s) : (n(I.urls.youtube.api), e.onYouTubeReadyCallbacks = e.onYouTubeReadyCallbacks || [], e.onYouTubeReadyCallbacks.push(function () {
            U(i, s)
          }), e.onYouTubeIframeAPIReady = function () {
            e.onYouTubeReadyCallbacks.forEach(function (e) {
              e()
            })
          }); else if ("vimeo" === _e.type) if (_e.supported.full ? _e.media.appendChild(s) : s = _e.media, s.setAttribute("id", o), M.object(e.Vimeo)) Q(i, s); else {
            n(I.urls.vimeo.api);
            var u = e.setInterval(function () {
              M.object(e.Vimeo) && (e.clearInterval(u), Q(i, s))
            }, 50)
          } else if ("soundcloud" === _e.type) {
            var h = t.createElement("iframe");
            h.loaded = !1, g(h, "load", function () {
              h.loaded = !0
            }), c(h, {
              src: "https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/" + i,
              id: o
            }), s.appendChild(h), _e.media.appendChild(s), e.SC || n(I.urls.soundcloud.api);
            var p = e.setInterval(function () {
              e.SC && h.loaded && (e.clearInterval(p), function () {
                _e.embed = e.SC.Widget(this), _e.embed.bind(e.SC.Widget.Events.READY, function () {
                  _e.media.play = function () {
                    _e.embed.play(), _e.media.paused = !1
                  }, _e.media.pause = function () {
                    _e.embed.pause(), _e.media.paused = !0
                  }, _e.media.stop = function () {
                    _e.embed.seekTo(0), _e.embed.pause(), _e.media.paused = !0
                  }, _e.media.paused = !0, _e.media.currentTime = 0, _e.embed.getDuration(function (e) {
                    _e.media.duration = e / 1e3, G()
                  }), _e.embed.getPosition(function (e) {
                    _e.media.currentTime = e, L(_e.media, "timeupdate")
                  }), _e.embed.bind(e.SC.Widget.Events.PLAY, function () {
                    _e.media.paused = !1, L(_e.media, "play"), L(_e.media, "playing")
                  }), _e.embed.bind(e.SC.Widget.Events.PAUSE, function () {
                    _e.media.paused = !0, L(_e.media, "pause")
                  }), _e.embed.bind(e.SC.Widget.Events.PLAY_PROGRESS, function (e) {
                    _e.media.seeking = !1, _e.media.currentTime = e.currentPosition / 1e3, L(_e.media, "timeupdate")
                  }), _e.embed.bind(e.SC.Widget.Events.LOAD_PROGRESS, function (e) {
                    _e.media.buffered = e.loadProgress, L(_e.media, "progress"), 1 === parseInt(e.loadProgress) && L(_e.media, "canplaythrough")
                  }), _e.embed.bind(e.SC.Widget.Events.FINISH, function () {
                    _e.media.paused = !0, L(_e.media, "ended")
                  })
                })
              }.call(h))
            }, 50)
          }
        }()
      } else Le("No media element found!")
    }

    function G() {
      _e.supported.full && (Te(), Ee()), X(F("iframe"))
    }

    function U(t, i) {
      _e.embed = new e.YT.Player(i.id, {
        videoId: t,
        playerVars: {
          autoplay: I.autoplay ? 1 : 0,
          controls: _e.supported.full ? 0 : 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          cc_load_policy: I.captions.defaultActive ? 1 : 0,
          cc_lang_pref: "en",
          wmode: "transparent",
          modestbranding: 1,
          disablekb: 1,
          origin: "*"
        },
        events: {
          onError: function (e) {
            L(_e.container, "error", !0, {code: e.data, embed: e.target})
          }, onReady: function (t) {
            var i = t.target;
            _e.media.play = function () {
              i.playVideo(), _e.media.paused = !1
            }, _e.media.pause = function () {
              i.pauseVideo(), _e.media.paused = !0
            }, _e.media.stop = function () {
              i.stopVideo(), _e.media.paused = !0
            }, _e.media.duration = i.getDuration(), _e.media.paused = !0, _e.media.currentTime = 0, _e.media.muted = i.isMuted(), "function" == typeof i.getVideoData && (I.title = i.getVideoData().title), _e.supported.full && _e.media.querySelector("iframe").setAttribute("tabindex", "-1"), G(), L(_e.media, "timeupdate"), L(_e.media, "durationchange"), e.clearInterval(Me.buffering), Me.buffering = e.setInterval(function () {
              _e.media.buffered = i.getVideoLoadedFraction(), (null === _e.media.lastBuffered || _e.media.lastBuffered < _e.media.buffered) && L(_e.media, "progress"), _e.media.lastBuffered = _e.media.buffered, 1 === _e.media.buffered && (e.clearInterval(Me.buffering), L(_e.media, "canplaythrough"))
            }, 200)
          }, onStateChange: function (t) {
            var i = t.target;
            switch (e.clearInterval(Me.playing), t.data) {
              case 0:
                _e.media.paused = !0, L(_e.media, "ended");
                break;
              case 1:
                _e.media.paused = !1, _e.media.seeking && L(_e.media, "seeked"), _e.media.seeking = !1, L(_e.media, "play"), L(_e.media, "playing"), Me.playing = e.setInterval(function () {
                  _e.media.currentTime = i.getCurrentTime(), L(_e.media, "timeupdate")
                }, 100), _e.media.duration !== i.getDuration() && (_e.media.duration = i.getDuration(), L(_e.media, "durationchange"));
                break;
              case 2:
                _e.media.paused = !0, L(_e.media, "pause")
            }
            L(_e.container, "statechange", !1, {code: t.data})
          }
        }
      })
    }

    function Q(i, n) {
      var s = function (e) {
          return Object.keys(e).map(function (t) {
            return encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
          }).join("&")
        }({loop: I.loop, autoplay: I.autoplay, byline: !1, portrait: !1, title: !1, speed: !0, transparent: 0}),
        o = t.createElement("iframe"), a = "https://player.vimeo.com/video/" + i + "?" + s;
      o.setAttribute("src", a), o.setAttribute("allowfullscreen", ""), n.appendChild(o), _e.embed = new e.Vimeo.Player(o), _e.media.play = function () {
        _e.embed.play(), _e.media.paused = !1
      }, _e.media.pause = function () {
        _e.embed.pause(), _e.media.paused = !0
      }, _e.media.stop = function () {
        _e.embed.stop(), _e.media.paused = !0
      }, _e.media.paused = !0, _e.media.currentTime = 0, G(), _e.embed.getCurrentTime().then(function (e) {
        _e.media.currentTime = e, L(_e.media, "timeupdate")
      }), _e.embed.getDuration().then(function (e) {
        _e.media.duration = e, L(_e.media, "durationchange")
      }), _e.embed.on("loaded", function () {
        M.htmlElement(_e.embed.element) && _e.supported.full && _e.embed.element.setAttribute("tabindex", "-1")
      }), _e.embed.on("play", function () {
        _e.media.paused = !1, L(_e.media, "play"), L(_e.media, "playing")
      }), _e.embed.on("pause", function () {
        _e.media.paused = !0, L(_e.media, "pause")
      }), _e.embed.on("timeupdate", function (e) {
        _e.media.seeking = !1, _e.media.currentTime = e.seconds, L(_e.media, "timeupdate")
      }), _e.embed.on("progress", function (e) {
        _e.media.buffered = e.percent, L(_e.media, "progress"), 1 === parseInt(e.percent) && L(_e.media, "canplaythrough")
      }), _e.embed.on("seeked", function () {
        _e.media.seeking = !1, L(_e.media, "seeked"), L(_e.media, "play")
      }), _e.embed.on("ended", function () {
        _e.media.paused = !0, L(_e.media, "ended")
      })
    }

    function K() {
      "play" in _e.media && _e.media.play()
    }

    function Z() {
      "pause" in _e.media && _e.media.pause()
    }

    function J(e) {
      return M.boolean(e) || (e = _e.media.paused), e ? K() : Z(), e
    }

    function ee(e) {
      M.number(e) || (e = I.seekTime), ie(_e.media.currentTime - e)
    }

    function te(e) {
      M.number(e) || (e = I.seekTime), ie(_e.media.currentTime + e)
    }

    function ie(e) {
      var t = 0, i = _e.media.paused, n = ne();
      M.number(e) ? t = e : M.object(e) && s(["input", "change"], e.type) && (t = e.target.value / e.target.max * n), t < 0 ? t = 0 : t > n && (t = n), ye(t);
      try {
        _e.media.currentTime = t.toFixed(4)
      } catch (e) {
      }
      if (s(I.types.embed, _e.type)) {
        switch (_e.type) {
          case"youtube":
            _e.embed.seekTo(t);
            break;
          case"vimeo":
            _e.embed.setCurrentTime(t.toFixed(0));
            break;
          case"soundcloud":
            _e.embed.seekTo(1e3 * t)
        }
        i && Z(), L(_e.media, "timeupdate"), _e.media.seeking = !0, L(_e.media, "seeking")
      }
      Ie("Seeking to " + _e.media.currentTime + " seconds"), j(t)
    }

    function ne() {
      var e = parseInt(I.duration), t = 0;
      return null === _e.media.duration || isNaN(_e.media.duration) || (t = _e.media.duration), isNaN(e) ? t : e
    }

    function se() {
      d(_e.container, I.classes.playing, !_e.media.paused), d(_e.container, I.classes.stopped, _e.media.paused), xe(_e.media.paused)
    }

    function oe(i) {
      var n = E.supportsFullScreen;
      if (n) {
        if (!i || i.type !== E.fullScreenEventName) return E.isFullScreen(_e.container) ? E.cancelFullScreen() : (k = {
          x: e.pageXOffset || 0,
          y: e.pageYOffset || 0
        }, E.requestFullScreen(_e.container)), void(_e.isFullscreen = E.isFullScreen(_e.container));
        _e.isFullscreen = E.isFullScreen(_e.container)
      } else _e.isFullscreen = !_e.isFullscreen, t.body.style.overflow = _e.isFullscreen ? "hidden" : "";
      d(_e.container, I.classes.fullscreen.active, _e.isFullscreen), H(_e.isFullscreen), _e.buttons && _e.buttons.fullscreen && y(_e.buttons.fullscreen, _e.isFullscreen), L(_e.container, _e.isFullscreen ? "enterfullscreen" : "exitfullscreen", !0), !_e.isFullscreen && n && e.scrollTo(k.x, k.y)
    }

    function ae(e) {
      if (M.boolean(e) || (e = !_e.media.muted), y(_e.buttons.mute, e), _e.media.muted = e, 0 === _e.media.volume && re(I.volume), s(I.types.embed, _e.type)) {
        switch (_e.type) {
          case"youtube":
            _e.embed[_e.media.muted ? "mute" : "unMute"]();
            break;
          case"vimeo":
          case"soundcloud":
            _e.embed.setVolume(_e.media.muted ? 0 : parseFloat(I.volume / I.volumeMax))
        }
        L(_e.media, "volumechange")
      }
    }

    function re(e) {
      var t = I.volumeMax, i = I.volumeMin;
      if (M.undefined(e) && (e = _e.storage.volume), (null === e || isNaN(e)) && (e = I.volume), e > t && (e = t), e < i && (e = i), _e.media.volume = parseFloat(e / t), _e.volume.display && (_e.volume.display.value = e), s(I.types.embed, _e.type)) {
        switch (_e.type) {
          case"youtube":
            _e.embed.setVolume(100 * _e.media.volume);
            break;
          case"vimeo":
          case"soundcloud":
            _e.embed.setVolume(_e.media.volume)
        }
        L(_e.media, "volumechange")
      }
      0 === e ? _e.media.muted = !0 : _e.media.muted && e > 0 && ae()
    }

    function le(e) {
      var t = _e.media.muted ? 0 : _e.media.volume * I.volumeMax;
      M.number(e) || (e = I.volumeStep), re(t + e)
    }

    function ce(e) {
      var t = _e.media.muted ? 0 : _e.media.volume * I.volumeMax;
      M.number(e) || (e = I.volumeStep), re(t - e)
    }

    function ue() {
      var e = _e.media.muted ? 0 : _e.media.volume * I.volumeMax;
      _e.supported.full && (_e.volume.input && (_e.volume.input.value = e), _e.volume.display && (_e.volume.display.value = e)), Y({volume: e}), d(_e.container, I.classes.muted, 0 === e), _e.supported.full && _e.buttons.mute && y(_e.buttons.mute, 0 === e)
    }

    function de(e) {
      _e.supported.full && _e.buttons.captions && (M.boolean(e) || (e = -1 === _e.container.className.indexOf(I.classes.captions.active)), _e.captionsEnabled = e, y(_e.buttons.captions, _e.captionsEnabled), d(_e.container, I.classes.captions.active, _e.captionsEnabled), L(_e.container, _e.captionsEnabled ? "captionsenabled" : "captionsdisabled", !0), Y({captionsEnabled: _e.captionsEnabled}))
    }

    function he(e) {
      var t = "waiting" === e.type;
      clearTimeout(Me.loading), Me.loading = setTimeout(function () {
        d(_e.container, I.classes.loading, t), xe(t)
      }, t ? 250 : 0)
    }

    function pe(e) {
      if (_e.supported.full) {
        var t = _e.progress.played, i = 0, n = ne();
        if (e) switch (e.type) {
          case"timeupdate":
          case"seeking":
            if (_e.controls.pressed) return;
            i = b(_e.media.currentTime, n), "timeupdate" === e.type && _e.buttons.seek && (_e.buttons.seek.value = i);
            break;
          case"playing":
          case"progress":
            t = _e.progress.buffer, i = function () {
              var e = _e.media.buffered;
              return e && e.length ? b(e.end(0), n) : M.number(e) ? 100 * e : 0
            }()
        }
        fe(t, i)
      }
    }

    function fe(e, t) {
      if (_e.supported.full) {
        if (M.undefined(t) && (t = 0), M.undefined(e)) {
          if (!_e.progress || !_e.progress.buffer) return;
          e = _e.progress.buffer
        }
        M.htmlElement(e) ? e.value = t : e && (e.bar && (e.bar.value = t), e.text && (e.text.innerHTML = t))
      }
    }

    function me(e, t) {
      if (t) {
        isNaN(e) && (e = 0), _e.secs = parseInt(e % 60), _e.mins = parseInt(e / 60 % 60), _e.hours = parseInt(e / 60 / 60 % 60);
        var i = parseInt(ne() / 60 / 60 % 60) > 0;
        _e.secs = ("0" + _e.secs).slice(-2), _e.mins = ("0" + _e.mins).slice(-2), t.innerHTML = (i ? _e.hours + ":" : "") + _e.mins + ":" + _e.secs
      }
    }

    function ge() {
      if (_e.supported.full) {
        var e = ne() || 0;
        !_e.duration && I.displayDuration && _e.media.paused && me(e, _e.currentTime), _e.duration && me(e, _e.duration), be()
      }
    }

    function ve(e) {
      me(_e.media.currentTime, _e.currentTime), e && "timeupdate" === e.type && _e.media.seeking || pe(e)
    }

    function ye(e) {
      M.number(e) || (e = 0);
      var t = b(e, ne());
      _e.progress && _e.progress.played && (_e.progress.played.value = t), _e.buttons && _e.buttons.seek && (_e.buttons.seek.value = t)
    }

    function be(e) {
      var t = ne();
      if (I.tooltips.seek && _e.progress.container && 0 !== t) {
        var i = _e.progress.container.getBoundingClientRect(), n = 0, o = I.classes.tooltip + "--visible";
        if (e) n = 100 / i.width * (e.pageX - i.left); else {
          if (!h(_e.progress.tooltip, o)) return;
          n = _e.progress.tooltip.style.left.replace("%", "")
        }
        n < 0 ? n = 0 : n > 100 && (n = 100), me(t / 100 * n, _e.progress.tooltip), _e.progress.tooltip.style.left = n + "%", e && s(["mouseenter", "mouseleave"], e.type) && d(_e.progress.tooltip, o, "mouseenter" === e.type)
      }
    }

    function xe(t) {
      if (I.hideControls && "audio" !== _e.type) {
        var i = 0, n = !1, o = t, a = h(_e.container, I.classes.loading);
        if (M.boolean(t) || (t && t.type ? (n = "enterfullscreen" === t.type, o = s(["mousemove", "touchstart", "mouseenter", "focus"], t.type), s(["mousemove", "touchmove"], t.type) && (i = 2e3), "focus" === t.type && (i = 3e3)) : o = h(_e.container, I.classes.hideControls)), e.clearTimeout(Me.hover), o || _e.media.paused || a) {
          if (d(_e.container, I.classes.hideControls, !1), _e.media.paused || a) return;
          _e.browser.isTouch && (i = 3e3)
        }
        o && _e.media.paused || (Me.hover = e.setTimeout(function () {
          (!_e.controls.pressed && !_e.controls.hover || n) && d(_e.container, I.classes.hideControls, !0)
        }, i))
      }
    }

    function we() {
      d(F("." + I.classes.tabFocus), I.classes.tabFocus, !1)
    }

    function Se() {
      function i() {
        var e = J(), t = _e.buttons[e ? "play" : "pause"], i = _e.buttons[e ? "pause" : "play"];
        if (i && (i = i.length > 1 ? i[i.length - 1] : i[0]), i) {
          var n = h(t, I.classes.tabFocus);
          setTimeout(function () {
            i.focus(), n && (d(t, I.classes.tabFocus, !1), d(i, I.classes.tabFocus, !0))
          }, 100)
        }
      }

      function n() {
        var e = t.activeElement;
        return e = e && e !== t.body ? t.querySelector(":focus") : null
      }

      function o(e) {
        return e.keyCode ? e.keyCode : e.which
      }

      function a(e) {
        var t = o(e), i = "keydown" === e.type, n = i && t === l;
        if (M.number(t)) if (i) {
          switch (s([48, 49, 50, 51, 52, 53, 54, 56, 57, 32, 75, 38, 40, 77, 39, 37, 70, 67], t) && (e.preventDefault(), e.stopPropagation()), t) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              n || function () {
                var e = _e.media.duration;
                M.number(e) && ie(e / 10 * (t - 48))
              }();
              break;
            case 32:
            case 75:
              n || J();
              break;
            case 38:
              le();
              break;
            case 40:
              ce();
              break;
            case 77:
              n || ae();
              break;
            case 39:
              te();
              break;
            case 37:
              ee();
              break;
            case 70:
              oe();
              break;
            case 67:
              n || de()
          }
          !E.supportsFullScreen && _e.isFullscreen && 27 === t && oe(), l = t
        } else l = null
      }

      var r = _e.browser.isIE ? "change" : "input";
      if (I.keyboardShorcuts.focused) {
        var l = null;
        I.keyboardShorcuts.global && g(e, "keydown keyup", function (e) {
          var t = o(e), i = n();
          1 !== T().length || !s([48, 49, 50, 51, 52, 53, 54, 56, 57, 75, 77, 70, 67], t) || M.htmlElement(i) && p(i, I.selectors.editable) || a(e)
        }), g(_e.container, "keydown keyup", a)
      }
      g(e, "keyup", function (e) {
        var t = o(e), i = n();
        9 === t && function (e) {
          for (var t in _e.buttons) {
            var i = _e.buttons[t];
            if (M.nodeList(i)) for (var n = 0; n < i.length; n++) d(i[n], I.classes.tabFocus, i[n] === e); else d(i, I.classes.tabFocus, i === e)
          }
        }(i)
      }), g(t.body, "click", we);
      for (var c in _e.buttons) {
        var u = _e.buttons[c];
        g(u, "blur", function () {
          d(u, "tab-focus", !1)
        })
      }
      f(_e.buttons.play, "click", I.listeners.play, i), f(_e.buttons.pause, "click", I.listeners.pause, i), f(_e.buttons.restart, "click", I.listeners.restart, ie), f(_e.buttons.rewind, "click", I.listeners.rewind, ee), f(_e.buttons.forward, "click", I.listeners.forward, te), f(_e.buttons.seek, r, I.listeners.seek, ie), f(_e.volume.input, r, I.listeners.volume, function () {
        re(_e.volume.input.value)
      }), f(_e.buttons.mute, "click", I.listeners.mute, ae), f(_e.buttons.fullscreen, "click", I.listeners.fullscreen, oe), E.supportsFullScreen && g(t, E.fullScreenEventName, oe), f(_e.buttons.captions, "click", I.listeners.captions, de), g(_e.progress.container, "mouseenter mouseleave mousemove", be), I.hideControls && (g(_e.container, "mouseenter mouseleave mousemove touchstart touchend touchcancel touchmove enterfullscreen", xe), g(_e.controls, "mouseenter mouseleave", function (e) {
        _e.controls.hover = "mouseenter" === e.type
      }), g(_e.controls, "mousedown mouseup touchstart touchend touchcancel", function (e) {
        _e.controls.pressed = s(["mousedown", "touchstart"], e.type)
      }), g(_e.controls, "focus blur", xe, !0)), g(_e.volume.input, "wheel", function (e) {
        e.preventDefault();
        var t = e.webkitDirectionInvertedFromDevice, i = I.volumeStep / 5;
        (e.deltaY < 0 || e.deltaX > 0) && (t ? ce(i) : le(i)), (e.deltaY > 0 || e.deltaX < 0) && (t ? le(i) : ce(i))
      })
    }

    function Ce(i, n) {
      function s() {
        clearTimeout(Me.cleanUp), M.boolean(n) || (n = !0), M.function(i) && i.call(Pe), n && (_e.init = !1, _e.container.parentNode.replaceChild(Pe, _e.container), _e.container = null, t.body.style.overflow = "", function (e, t, i, n) {
          e && m(e, t, i, !1, n)
        }(t.body, "click", we), L(Pe, "destroyed", !0))
      }

      if (!_e.init) return null;
      switch (_e.type) {
        case"youtube":
          e.clearInterval(Me.buffering), e.clearInterval(Me.playing), _e.embed.destroy(), s();
          break;
        case"vimeo":
          _e.embed.unload().then(s), Me.cleanUp = e.setTimeout(s, 200);
          break;
        case"video":
        case"audio":
          W(!0), s()
      }
    }

    function Te() {
      if (!_e.supported.full) return Le("Basic support only", _e.type), r(F(I.selectors.controls.wrapper)), r(F(I.selectors.buttons.play)), void W(!0);
      var e = !B(I.selectors.controls.wrapper).length;
      e && R(), function () {
        try {
          return _e.controls = F(I.selectors.controls.wrapper), _e.buttons = {}, _e.buttons.seek = F(I.selectors.buttons.seek), _e.buttons.play = B(I.selectors.buttons.play), _e.buttons.pause = F(I.selectors.buttons.pause), _e.buttons.prev = B(I.selectors.buttons.prev), _e.buttons.next = F(I.selectors.buttons.next), _e.buttons.restart = F(I.selectors.buttons.restart), _e.buttons.rewind = F(I.selectors.buttons.rewind), _e.buttons.forward = F(I.selectors.buttons.forward), _e.buttons.fullscreen = F(I.selectors.buttons.fullscreen), _e.buttons.mute = F(I.selectors.buttons.mute), _e.buttons.captions = F(I.selectors.buttons.captions), _e.progress = {}, _e.progress.container = F(I.selectors.progress.container), _e.progress.buffer = {}, _e.progress.buffer.bar = F(I.selectors.progress.buffer), _e.progress.buffer.text = _e.progress.buffer.bar && _e.progress.buffer.bar.getElementsByTagName("span")[0], _e.progress.played = F(I.selectors.progress.played), _e.progress.tooltip = _e.progress.container && _e.progress.container.querySelector("." + I.classes.tooltip), _e.volume = {}, _e.volume.input = F(I.selectors.volume.input), _e.volume.display = F(I.selectors.volume.display), _e.duration = F(I.selectors.duration), _e.currentTime = F(I.selectors.currentTime), _e.seekTime = B(I.selectors.seekTime), !0
        } catch (e) {
          return Le("It looks like there is a problem with your controls HTML"), W(!0), !1
        }
      }() && (e && Se(), function () {
        if (g(_e.media, "timeupdate seeking", ve), g(_e.media, "timeupdate", j), g(_e.media, "durationchange loadedmetadata", ge), g(_e.media, "ended", function () {
          "video" === _e.type && I.showPosterOnEnd && ("video" === _e.type && O(), ie(), _e.media.load())
        }), g(_e.media, "progress playing", pe), g(_e.media, "volumechange", ue), g(_e.media, "play pause ended", se), g(_e.media, "waiting canplay seeked", he), I.clickToPlay && "audio" !== _e.type) {
          var e = F("." + I.classes.videoWrapper);
          if (!e) return;
          e.style.cursor = "pointer", g(e, "click", function () {
            I.hideControls && _e.browser.isTouch && !_e.media.paused || (_e.media.paused ? K() : _e.media.ended ? (ie(), K()) : Z())
          })
        }
        I.disableContextMenu && g(_e.media, "contextmenu", function (e) {
          e.preventDefault()
        }), g(_e.media, I.events.concat(["keyup", "keydown"]).join(" "), function (e) {
          L(_e.container, e.type, !0)
        })
      }(), W(), D(), $(), re(), ue(), ve(), se(), ge())
    }

    function Ee() {
      e.setTimeout(function () {
        L(_e.media, "ready")
      }, 0), d(_e.media, _.classes.setup, !0), d(_e.container, I.classes.ready, !0), _e.media.plyr = ke, I.autoplay && K()
    }

    var ke, _e = this, Me = {};
    _e.media = w;
    var Pe = w.cloneNode(!0), Ie = function () {
      z("log", arguments)
    }, Le = function () {
      z("warn", arguments)
    };
    return Ie("Config", I), ke = {
      getOriginal: function () {
        return Pe
      },
      getContainer: function () {
        return _e.container
      },
      getEmbed: function () {
        return _e.embed
      },
      getMedia: function () {
        return _e.media
      },
      getType: function () {
        return _e.type
      },
      getDuration: ne,
      getCurrentTime: function () {
        return _e.media.currentTime
      },
      getVolume: function () {
        return _e.media.volume
      },
      isMuted: function () {
        return _e.media.muted
      },
      isReady: function () {
        return h(_e.container, I.classes.ready)
      },
      isLoading: function () {
        return h(_e.container, I.classes.loading)
      },
      isPaused: function () {
        return _e.media.paused
      },
      on: function (e, t) {
        return g(_e.container, e, t), this
      },
      play: K,
      pause: Z,
      stop: function () {
        Z(), ie()
      },
      restart: ie,
      rewind: ee,
      forward: te,
      seek: ie,
      source: function (e) {
        if (M.undefined(e)) {
          var i;
          switch (_e.type) {
            case"youtube":
              i = _e.embed.getVideoUrl();
              break;
            case"vimeo":
              _e.embed.getVideoUrl.then(function (e) {
                i = e
              });
              break;
            case"soundcloud":
              _e.embed.getCurrentSound(function (e) {
                i = e.permalink_url
              });
              break;
            default:
              i = _e.media.currentSrc
          }
          return i || ""
        }
        !function (e) {
          M.object(e) && "sources" in e && e.sources.length ? (d(_e.container, I.classes.ready, !1), Z(), ye(), fe(), function () {
            if (s(I.types.html5, _e.type)) {
              for (var e = _e.media.querySelectorAll("source"), t = 0; t < e.length; t++) r(e[t]);
              _e.media.setAttribute("src", I.blankUrl), _e.media.load(), Ie("Cancelled network requests")
            }
          }(), Ce(function () {
            if (_e.embed = null, r(_e.media), "video" === _e.type && _e.videoContainer && r(_e.videoContainer), _e.container && _e.container.removeAttribute("class"), "type" in e && (_e.type = e.type, "video" === _e.type)) {
              var i = e.sources[0];
              "type" in i && s(I.types.embed, i.type) && (_e.type = i.type)
            }
            switch (_e.supported = C(_e.type), _e.type) {
              case"video":
                _e.media = t.createElement("video");
                break;
              case"audio":
                _e.media = t.createElement("audio");
                break;
              case"youtube":
              case"vimeo":
              case"soundcloud":
                _e.media = t.createElement("div"), _e.embedId = e.sources[0].src
            }
            l(_e.container, _e.media), M.boolean(e.autoplay) && (I.autoplay = e.autoplay), s(I.types.html5, _e.type) && (I.crossorigin && _e.media.setAttribute("crossorigin", ""), I.autoplay && _e.media.setAttribute("autoplay", ""), "poster" in e && _e.media.setAttribute("poster", e.poster), I.loop && _e.media.setAttribute("loop", "")), d(_e.container, I.classes.fullscreen.active, _e.isFullscreen), d(_e.container, I.classes.captions.active, _e.captionsEnabled), q(), s(I.types.html5, _e.type) && N("source", e.sources), V(), s(I.types.html5, _e.type) && ("tracks" in e && N("track", e.tracks), _e.media.load()), (s(I.types.html5, _e.type) || s(I.types.embed, _e.type) && !_e.supported.full) && (Te(), Ee()), I.title = e.title, X()
          }, !1)) : Le("Invalid source format")
        }(e)
      },
      poster: function (e) {
        "video" === _e.type && _e.media.setAttribute("poster", e)
      },
      setVolume: re,
      togglePlay: J,
      toggleMute: ae,
      toggleCaptions: de,
      toggleFullscreen: oe,
      toggleControls: xe,
      isFullscreen: function () {
        return _e.isFullscreen || !1
      },
      support: function (e) {
        return function (e, t) {
          var i = e.media;
          if ("video" === e.type) switch (t) {
            case"video/webm":
              return !(!i.canPlayType || !i.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/, ""));
            case"video/mp4":
              return !(!i.canPlayType || !i.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/, ""));
            case"video/ogg":
              return !(!i.canPlayType || !i.canPlayType('video/ogg; codecs="theora"').replace(/no/, ""))
          } else if ("audio" === e.type) switch (t) {
            case"audio/mpeg":
              return !(!i.canPlayType || !i.canPlayType("audio/mpeg;").replace(/no/, ""));
            case"audio/ogg":
              return !(!i.canPlayType || !i.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ""));
            case"audio/wav":
              return !(!i.canPlayType || !i.canPlayType('audio/wav; codecs="1"').replace(/no/, ""))
          }
          return !1
        }(_e, e)
      },
      destroy: Ce
    }, function () {
      if (_e.init) return null;
      if (E = function () {
        var e = {
          supportsFullScreen: !1, isFullScreen: function () {
            return !1
          }, requestFullScreen: function () {
          }, cancelFullScreen: function () {
          }, fullScreenEventName: "", element: null, prefix: ""
        }, i = "webkit o moz ms khtml".split(" ");
        if (M.undefined(t.cancelFullScreen)) for (var n = 0, s = i.length; n < s; n++) {
          if (e.prefix = i[n], !M.undefined(t[e.prefix + "CancelFullScreen"])) {
            e.supportsFullScreen = !0;
            break
          }
          if (!M.undefined(t.msExitFullscreen) && t.msFullscreenEnabled) {
            e.prefix = "ms", e.supportsFullScreen = !0;
            break
          }
        } else e.supportsFullScreen = !0;
        return e.supportsFullScreen && (e.fullScreenEventName = "ms" === e.prefix ? "MSFullscreenChange" : e.prefix + "fullscreenchange", e.isFullScreen = function (e) {
          switch (M.undefined(e) && (e = t.body), this.prefix) {
            case"":
              return t.fullscreenElement === e;
            case"moz":
              return t.mozFullScreenElement === e;
            default:
              return t[this.prefix + "FullscreenElement"] === e
          }
        }, e.requestFullScreen = function (e) {
          return M.undefined(e) && (e = t.body), "" === this.prefix ? e.requestFullScreen() : e[this.prefix + ("ms" === this.prefix ? "RequestFullscreen" : "RequestFullScreen")]()
        }, e.cancelFullScreen = function () {
          return "" === this.prefix ? t.cancelFullScreen() : t[this.prefix + ("ms" === this.prefix ? "ExitFullscreen" : "CancelFullScreen")]()
        }, e.element = function () {
          return "" === this.prefix ? t.fullscreenElement : t[this.prefix + "FullscreenElement"]
        }), e
      }(), _e.browser = i(), M.htmlElement(_e.media)) {
        !function () {
          var t = null;
          _e.storage = {}, P.supported && I.storage.enabled && (e.localStorage.removeItem("plyr-volume"), (t = e.localStorage.getItem(I.storage.key)) && (/^\d+(\.\d+)?$/.test(t) ? Y({volume: parseFloat(t)}) : _e.storage = JSON.parse(t)))
        }();
        var n = w.tagName.toLowerCase();
        "div" === n ? (_e.type = w.getAttribute("data-type"), _e.embedId = w.getAttribute("data-video-id"), w.removeAttribute("data-type"), w.removeAttribute("data-video-id")) : (_e.type = n, I.crossorigin = null !== w.getAttribute("crossorigin"), I.autoplay = I.autoplay || null !== w.getAttribute("autoplay"), I.loop = I.loop || null !== w.getAttribute("loop")), _e.supported = C(_e.type), _e.supported.basic && (_e.container = a(w, t.createElement("div")), _e.container.setAttribute("tabindex", 0), q(), Ie(_e.browser.name + " " + _e.browser.version), V(), (s(I.types.html5, _e.type) || s(I.types.embed, _e.type) && !_e.supported.full) && (Te(), Ee(), X()), _e.init = !0)
      }
    }(), _e.init ? ke : null
  }

  function S(e, i) {
    var n = new XMLHttpRequest;
    if (!M.string(i) || !M.htmlElement(t.querySelector("#" + i))) {
      var s = t.createElement("div");
      s.setAttribute("hidden", ""), M.string(i) && s.setAttribute("id", i), t.body.insertBefore(s, t.body.childNodes[0]), "withCredentials" in n && (n.open("GET", e, !0), n.onload = function () {
        s.innerHTML = n.responseText
      }, n.send())
    }
  }

  function C(e) {
    var n = i(), s = n.isIE && n.version <= 9, o = n.isIos, a = n.isIphone, r = !!t.createElement("audio").canPlayType,
      l = !!t.createElement("video").canPlayType, c = !1, u = !1;
    switch (e) {
      case"video":
        u = (c = l) && !s && !a;
        break;
      case"audio":
        u = (c = r) && !s;
        break;
      case"vimeo":
        c = !0, u = !s && !o;
        break;
      case"youtube":
        c = !0, u = !s && !o, o && !a && n.version >= 10 && (u = !0);
        break;
      case"soundcloud":
        c = !0, u = !s && !a;
        break;
      default:
        u = (c = r && l) && !s
    }
    return {basic: c, full: u}
  }

  function T(e) {
    if (M.string(e) ? e = t.querySelector(e) : M.undefined(e) && (e = t.body), M.htmlElement(e)) {
      var i = e.querySelectorAll("." + _.classes.setup), n = [];
      return Array.prototype.slice.call(i).forEach(function (e) {
        M.object(e.plyr) && n.push(e.plyr)
      }), n
    }
    return []
  }

  var E, k = {x: 0, y: 0}, _ = {
    enabled: !0,
    debug: !1,
    autoplay: !1,
    loop: !1,
    seekTime: 10,
    volume: 10,
    volumeMin: 0,
    volumeMax: 10,
    volumeStep: 1,
    duration: null,
    displayDuration: !0,
    loadSprite: !0,
    iconPrefix: "plyr",
    iconUrl: "https://cdn.plyr.io/2.0.18/plyr.svg",
    blankUrl: "https://cdn.plyr.io/static/blank.mp4",
    clickToPlay: !0,
    hideControls: !0,
    showPosterOnEnd: !1,
    disableContextMenu: !0,
    keyboardShorcuts: {focused: !0, global: !1},
    tooltips: {controls: !1, seek: !0},
    selectors: {
      html5: "video, audio",
      embed: "[data-type]",
      editable: "input, textarea, select, [contenteditable]",
      container: ".plyr",
      controls: {container: null, wrapper: ".plyr__controls"},
      labels: "[data-plyr]",
      buttons: {
        seek: '[data-plyr="seek"]',
        play: '[data-plyr="play"]',
        pause: '[data-plyr="pause"]',
        prev: '[data-plyr="prev"]',
        next: '[data-plyr="next"]',
        restart: '[data-plyr="restart"]',
        rewind: '[data-plyr="rewind"]',
        forward: '[data-plyr="fast-forward"]',
        mute: '[data-plyr="mute"]',
        captions: '[data-plyr="captions"]',
        fullscreen: '[data-plyr="fullscreen"]'
      },
      volume: {input: '[data-plyr="volume"]', display: ".plyr__volume--display"},
      progress: {container: ".plyr__progress", buffer: ".plyr__progress--buffer", played: ".plyr__progress--played"},
      captions: ".plyr__captions",
      currentTime: ".plyr__time--current",
      duration: ".plyr__time--duration"
    },
    classes: {
      setup: "plyr--setup",
      ready: "plyr--ready",
      videoWrapper: "plyr__video-wrapper",
      embedWrapper: "plyr__video-embed",
      type: "plyr--{0}",
      stopped: "plyr--stopped",
      playing: "plyr--playing",
      muted: "plyr--muted",
      loading: "plyr--loading",
      hover: "plyr--hover",
      tooltip: "plyr__tooltip",
      hidden: "plyr__sr-only",
      hideControls: "plyr--hide-controls",
      isIos: "plyr--is-ios",
      isTouch: "plyr--is-touch",
      captions: {enabled: "plyr--captions-enabled", active: "plyr--captions-active"},
      fullscreen: {
        enabled: "plyr--fullscreen-enabled",
        fallback: "plyr--fullscreen-fallback",
        active: "plyr--fullscreen-active"
      },
      tabFocus: "tab-focus"
    },
    captions: {defaultActive: !1},
    fullscreen: {enabled: !0, fallback: !0, allowAudio: !1},
    storage: {enabled: !0, key: "plyr"},
    controls: ["play-large", "play", "prev", "next", "progress", "current-time", "mute", "volume", "captions", "fullscreen"],
    i18n: {
      restart: "Restart",
      rewind: "Rewind {seektime} secs",
      play: "Play",
      pause: "Pause",
      forward: "Forward {seektime} secs",
      played: "played",
      buffered: "buffered",
      currentTime: "Current time",
      duration: "Duration",
      volume: "Volume",
      toggleMute: "Toggle Mute",
      toggleCaptions: "Toggle Captions",
      toggleFullscreen: "Toggle Fullscreen",
      frameTitle: "Player for {title}"
    },
    types: {embed: ["youtube", "vimeo", "soundcloud"], html5: ["video", "audio"]},
    urls: {
      vimeo: {api: "https://player.vimeo.com/api/player.js"},
      youtube: {api: "https://www.youtube.com/iframe_api"},
      soundcloud: {api: "https://w.soundcloud.com/player/api.js"}
    },
    listeners: {
      seek: null,
      play: null,
      pause: null,
      restart: null,
      rewind: null,
      forward: null,
      mute: null,
      volume: null,
      captions: null,
      fullscreen: null
    },
    events: ["ready", "ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied"],
    logPrefix: "[Plyr]"
  }, M = {
    object: function (e) {
      return null !== e && "object" == typeof e
    }, array: function (e) {
      return null !== e && "object" == typeof e && e.constructor === Array
    }, number: function (e) {
      return null !== e && ("number" == typeof e && !isNaN(e - 0) || "object" == typeof e && e.constructor === Number)
    }, string: function (e) {
      return null !== e && ("string" == typeof e || "object" == typeof e && e.constructor === String)
    }, boolean: function (e) {
      return null !== e && "boolean" == typeof e
    }, nodeList: function (e) {
      return null !== e && e instanceof NodeList
    }, htmlElement: function (e) {
      return null !== e && e instanceof HTMLElement
    }, function: function (e) {
      return null !== e && "function" == typeof e
    }, undefined: function (e) {
      return null !== e && void 0 === e
    }
  }, P = {
    supported: function () {
      try {
        e.localStorage.setItem("___test", "OK");
        var t = e.localStorage.getItem("___test");
        return e.localStorage.removeItem("___test"), "OK" === t
      } catch (e) {
        return !1
      }
      return !1
    }()
  };
  return {
    setup: function (e, i) {
      function n(e, t) {
        h(t, _.classes.hook) || s.push({target: e, media: t})
      }

      var s = [], o = [], a = [_.selectors.html5, _.selectors.embed].join(",");
      if (M.string(e) ? e = t.querySelectorAll(e) : M.htmlElement(e) ? e = [e] : M.nodeList(e) || M.array(e) || M.string(e) || (M.undefined(i) && M.object(e) && (i = e), e = t.querySelectorAll(a)), M.nodeList(e) && (e = Array.prototype.slice.call(e)), !C().basic || !e.length) return !1;
      for (var r = 0; r < e.length; r++) {
        var l = e[r], c = l.querySelectorAll(a);
        if (c.length) for (var u = 0; u < c.length; u++) n(l, c[u]); else p(l, a) && n(l, l)
      }
      return s.forEach(function (e) {
        var t = e.target, n = e.media, s = {};
        try {
          s = JSON.parse(t.getAttribute("data-plyr"))
        } catch (e) {
        }
        var a = x({}, _, i, s);
        if (!a.enabled) return null;
        var r = new w(n, a);
        if (M.object(r)) {
          if (a.debug) {
            var l = a.events.concat(["setup", "statechange", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled"]);
            g(r.getContainer(), l.join(" "), function (e) {
              console.log([a.logPrefix, "event:", e.type].join(" "), e.detail.plyr)
            })
          }
          v(r.getContainer(), "setup", !0, {plyr: r}), o.push(r)
        }
      }), o
    }, supported: C, loadSprite: S, get: T
  }
}), function () {
  function e(e, t) {
    t = t || {bubbles: !1, cancelable: !1, detail: void 0};
    var i = document.createEvent("CustomEvent");
    return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i
  }

  "function" != typeof window.CustomEvent && (e.prototype = window.Event.prototype, window.CustomEvent = e)
}(), function (e, t) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports ? module.exports = t(e, document) : "function" == typeof define && define.amd ? define(null, function () {
    t(e, document)
  }) : e.rangetouch = t(e, document)
}("undefined" != typeof window ? window : this, function (e, t) {
  "use strict";

  function i(e, t, i) {
    e.addEventListener(t, i, !1)
  }

  function n(e, t) {
    if (t < 1) {
      var i = function (e) {
        var t = ("" + e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0
      }(t);
      return parseFloat(e.toFixed(i))
    }
    return Math.round(e / t) * t
  }

  function s(i) {
    o.enabled && "range" === i.target.type && !function (e) {
      return !(e instanceof HTMLElement) || e.matches(o.selectors.disabled) || e.disabled
    }(i.target) && (i.preventDefault(), i.target.value = function (e) {
      var t, i = e.target, s = e.changedTouches[0], a = parseFloat(i.getAttribute("min")) || 0,
        r = parseFloat(i.getAttribute("max")) || 100, l = parseFloat(i.getAttribute("step")) || 1, c = r - a,
        u = i.getBoundingClientRect(), d = 100 / u.width * (o.thumbWidth / 2) / 100;
      return (t = 100 / u.width * (s.clientX - u.left)) < 0 ? t = 0 : t > 100 && (t = 100), t < 50 ? t -= (100 - 2 * t) * d : t > 50 && (t += 2 * (t - 50) * d), a + n(c * (t / 100), l)
    }(i), function (i, n, s) {
      if (i && n) {
        var o;
        "function" == typeof e.CustomEvent ? o = e.CustomEvent : (o = function (e, i) {
          i = i || {bubbles: !1, cancelable: !1, detail: void 0};
          var n = t.createEvent("CustomEvent");
          return n.initCustomEvent(e, i.bubbles, i.cancelable, i.detail), n
        }, o.prototype = e.Event.prototype);
        var a = new o(n, {bubbles: !0, detail: s});
        i.dispatchEvent(a)
      }
    }(i.target, i.type === o.events.end ? "change" : "input"))
  }

  var o = {
    enabled: !0,
    addCSS: !0,
    thumbWidth: 15,
    selectors: {range: '[type="range"]', disabled: ".rangetouch--disabled"},
    events: {start: "touchstart", move: "touchmove", end: "touchend"}
  };
  return function () {
    if ("ontouchstart" in t.documentElement) {
      if (o.addCSS) {
        var e = t.styleSheets;
        (e.length ? e[0] : function () {
          var e = t.createElement("style");
          return e.appendChild(t.createTextNode("")), t.head.appendChild(e), e.sheet
        }()).insertRule([o.selectors.range, ":not(", o.selectors.disabled, ")"].join("") + " { user-select: none; -webkit-user-select: none; touch-action: manipulation; }", 0)
      }
      i(t.body, o.events.start, s), i(t.body, o.events.move, s), i(t.body, o.events.end, s)
    }
  }(), {
    set: function (e, t) {
      o[e] = t
    }
  }
}), function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Swiper = t()
}(this, function () {
  "use strict";

  function e(e, t) {
    var i = [], s = 0;
    if (e && !t && e instanceof n) return e;
    if (e) if ("string" == typeof e) {
      var o, a, r = e.trim();
      if (r.indexOf("<") >= 0 && r.indexOf(">") >= 0) {
        var l = "div";
        for (0 === r.indexOf("<li") && (l = "ul"), 0 === r.indexOf("<tr") && (l = "tbody"), 0 !== r.indexOf("<td") && 0 !== r.indexOf("<th") || (l = "tr"), 0 === r.indexOf("<tbody") && (l = "table"), 0 === r.indexOf("<option") && (l = "select"), (a = document.createElement(l)).innerHTML = r, s = 0; s < a.childNodes.length; s += 1) i.push(a.childNodes[s])
      } else for (o = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || document).querySelectorAll(e.trim()) : [document.getElementById(e.trim().split("#")[1])], s = 0; s < o.length; s += 1) o[s] && i.push(o[s])
    } else if (e.nodeType || e === window || e === document) i.push(e); else if (e.length > 0 && e[0].nodeType) for (s = 0; s < e.length; s += 1) i.push(e[s]);
    return new n(i)
  }

  function t(e) {
    for (var t = [], i = 0; i < e.length; i += 1) -1 === t.indexOf(e[i]) && t.push(e[i]);
    return t
  }

  var i = "undefined" == typeof window ? {
    navigator: {userAgent: ""},
    location: {},
    history: {},
    addEventListener: function () {
    },
    removeEventListener: function () {
    },
    getComputedStyle: function () {
      return {}
    },
    Image: function () {
    },
    Date: function () {
    }
  } : window, n = function (e) {
    for (var t = 0; t < e.length; t += 1) this[t] = e[t];
    return this.length = e.length, this
  };
  e.fn = n.prototype, e.Class = n, e.Dom7 = n, "resize scroll".split(" ");
  var s = {
    addClass: function (e) {
      if (void 0 === e) return this;
      for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var n = 0; n < this.length; n += 1) void 0 !== this[n].classList && this[n].classList.add(t[i]);
      return this
    }, removeClass: function (e) {
      for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var n = 0; n < this.length; n += 1) void 0 !== this[n].classList && this[n].classList.remove(t[i]);
      return this
    }, hasClass: function (e) {
      return !!this[0] && this[0].classList.contains(e)
    }, toggleClass: function (e) {
      for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var n = 0; n < this.length; n += 1) void 0 !== this[n].classList && this[n].classList.toggle(t[i]);
      return this
    }, attr: function (e, t) {
      var i = arguments;
      if (1 !== arguments.length || "string" != typeof e) {
        for (var n = 0; n < this.length; n += 1) if (2 === i.length) this[n].setAttribute(e, t); else for (var s in e) this[n][s] = e[s], this[n].setAttribute(s, e[s]);
        return this
      }
      if (this[0]) return this[0].getAttribute(e)
    }, removeAttr: function (e) {
      for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this
    }, data: function (e, t) {
      var i;
      if (void 0 !== t) {
        for (var n = 0; n < this.length; n += 1) (i = this[n]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t;
        return this
      }
      if (i = this[0]) {
        if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage) return i.dom7ElementDataStorage[e];
        var s = i.getAttribute("data-" + e);
        if (s) return s
      }
    }, transform: function (e) {
      for (var t = 0; t < this.length; t += 1) {
        var i = this[t].style;
        i.webkitTransform = e, i.transform = e
      }
      return this
    }, transition: function (e) {
      "string" != typeof e && (e += "ms");
      for (var t = 0; t < this.length; t += 1) {
        var i = this[t].style;
        i.webkitTransitionDuration = e, i.transitionDuration = e
      }
      return this
    }, on: function () {
      function t(t) {
        var i = t.target;
        if (i) {
          var n = t.target.dom7EventData || [];
          if (n.unshift(t), e(i).is(a)) r.apply(i, n); else for (var s = e(i).parents(), o = 0; o < s.length; o += 1) e(s[o]).is(a) && r.apply(s[o], n)
        }
      }

      function i(e) {
        var t = e && e.target ? e.target.dom7EventData || [] : [];
        t.unshift(e), r.apply(this, t)
      }

      for (var n = [], s = arguments.length; s--;) n[s] = arguments[s];
      var o = n[0], a = n[1], r = n[2], l = n[3];
      if ("function" == typeof n[1]) {
        var c;
        o = (c = n)[0], r = c[1], l = c[2], a = void 0
      }
      l || (l = !1);
      for (var u, d = o.split(" "), h = 0; h < this.length; h += 1) {
        var p = this[h];
        if (a) for (u = 0; u < d.length; u += 1) p.dom7LiveListeners || (p.dom7LiveListeners = []), p.dom7LiveListeners.push({
          type: o,
          listener: r,
          proxyListener: t
        }), p.addEventListener(d[u], t, l); else for (u = 0; u < d.length; u += 1) p.dom7Listeners || (p.dom7Listeners = []), p.dom7Listeners.push({
          type: o,
          listener: r,
          proxyListener: i
        }), p.addEventListener(d[u], i, l)
      }
      return this
    }, off: function () {
      for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
      var i = e[0], n = e[1], s = e[2], o = e[3];
      if ("function" == typeof e[1]) {
        var a;
        i = (a = e)[0], s = a[1], o = a[2], n = void 0
      }
      o || (o = !1);
      for (var r = i.split(" "), l = 0; l < r.length; l += 1) for (var c = 0; c < this.length; c += 1) {
        var u = this[c];
        if (n) {
          if (u.dom7LiveListeners) for (var d = 0; d < u.dom7LiveListeners.length; d += 1) s ? u.dom7LiveListeners[d].listener === s && u.removeEventListener(r[l], u.dom7LiveListeners[d].proxyListener, o) : u.dom7LiveListeners[d].type === r[l] && u.removeEventListener(r[l], u.dom7LiveListeners[d].proxyListener, o)
        } else if (u.dom7Listeners) for (var h = 0; h < u.dom7Listeners.length; h += 1) s ? u.dom7Listeners[h].listener === s && u.removeEventListener(r[l], u.dom7Listeners[h].proxyListener, o) : u.dom7Listeners[h].type === r[l] && u.removeEventListener(r[l], u.dom7Listeners[h].proxyListener, o)
      }
      return this
    }, trigger: function () {
      for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
      for (var i = e[0].split(" "), n = e[1], s = 0; s < i.length; s += 1) for (var o = 0; o < this.length; o += 1) {
        var a = void 0;
        try {
          a = new window.CustomEvent(i[s], {detail: n, bubbles: !0, cancelable: !0})
        } catch (e) {
          (a = document.createEvent("Event")).initEvent(i[s], !0, !0), a.detail = n
        }
        this[o].dom7EventData = e.filter(function (e, t) {
          return t > 0
        }), this[o].dispatchEvent(a), this[o].dom7EventData = [], delete this[o].dom7EventData
      }
      return this
    }, transitionEnd: function (e) {
      function t(o) {
        if (o.target === this) for (e.call(this, o), i = 0; i < n.length; i += 1) s.off(n[i], t)
      }

      var i, n = ["webkitTransitionEnd", "transitionend"], s = this;
      if (e) for (i = 0; i < n.length; i += 1) s.on(n[i], t);
      return this
    }, outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          var t = this.styles();
          return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
        }
        return this[0].offsetWidth
      }
      return null
    }, outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          var t = this.styles();
          return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
        }
        return this[0].offsetHeight
      }
      return null
    }, offset: function () {
      if (this.length > 0) {
        var e = this[0], t = e.getBoundingClientRect(), i = document.body, n = e.clientTop || i.clientTop || 0,
          s = e.clientLeft || i.clientLeft || 0, o = e === window ? window.scrollY : e.scrollTop,
          a = e === window ? window.scrollX : e.scrollLeft;
        return {top: t.top + o - n, left: t.left + a - s}
      }
      return null
    }, css: function (e, t) {
      var i;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (i = 0; i < this.length; i += 1) for (var n in e) this[i].style[n] = e[n];
          return this
        }
        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
        return this
      }
      return this
    }, each: function (e) {
      if (!e) return this;
      for (var t = 0; t < this.length; t += 1) if (!1 === e.call(this[t], t, this[t])) return this;
      return this
    }, html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
      for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this
    }, text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this
    }, is: function (t) {
      var i, s, o = this[0];
      if (!o || void 0 === t) return !1;
      if ("string" == typeof t) {
        if (o.matches) return o.matches(t);
        if (o.webkitMatchesSelector) return o.webkitMatchesSelector(t);
        if (o.msMatchesSelector) return o.msMatchesSelector(t);
        for (i = e(t), s = 0; s < i.length; s += 1) if (i[s] === o) return !0;
        return !1
      }
      if (t === document) return o === document;
      if (t === window) return o === window;
      if (t.nodeType || t instanceof n) {
        for (i = t.nodeType ? [t] : t, s = 0; s < i.length; s += 1) if (i[s] === o) return !0;
        return !1
      }
      return !1
    }, index: function () {
      var e, t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
        return e
      }
    }, eq: function (e) {
      if (void 0 === e) return this;
      var t, i = this.length;
      return e > i - 1 ? new n([]) : e < 0 ? (t = i + e, new n(t < 0 ? [] : [this[t]])) : new n([this[e]])
    }, append: function () {
      for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
      for (var i, s = 0; s < e.length; s += 1) {
        i = e[s];
        for (var o = 0; o < this.length; o += 1) if ("string" == typeof i) {
          var a = document.createElement("div");
          for (a.innerHTML = i; a.firstChild;) this[o].appendChild(a.firstChild)
        } else if (i instanceof n) for (var r = 0; r < i.length; r += 1) this[o].appendChild(i[r]); else this[o].appendChild(i)
      }
      return this
    }, prepend: function (e) {
      var t, i;
      for (t = 0; t < this.length; t += 1) if ("string" == typeof e) {
        var s = document.createElement("div");
        for (s.innerHTML = e, i = s.childNodes.length - 1; i >= 0; i -= 1) this[t].insertBefore(s.childNodes[i], this[t].childNodes[0])
      } else if (e instanceof n) for (i = 0; i < e.length; i += 1) this[t].insertBefore(e[i], this[t].childNodes[0]); else this[t].insertBefore(e, this[t].childNodes[0]);
      return this
    }, next: function (t) {
      return new n(this.length > 0 ? t ? this[0].nextElementSibling && e(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
    }, nextAll: function (t) {
      var i = [], s = this[0];
      if (!s) return new n([]);
      for (; s.nextElementSibling;) {
        var o = s.nextElementSibling;
        t ? e(o).is(t) && i.push(o) : i.push(o), s = o
      }
      return new n(i)
    }, prev: function (t) {
      if (this.length > 0) {
        var i = this[0];
        return new n(t ? i.previousElementSibling && e(i.previousElementSibling).is(t) ? [i.previousElementSibling] : [] : i.previousElementSibling ? [i.previousElementSibling] : [])
      }
      return new n([])
    }, prevAll: function (t) {
      var i = [], s = this[0];
      if (!s) return new n([]);
      for (; s.previousElementSibling;) {
        var o = s.previousElementSibling;
        t ? e(o).is(t) && i.push(o) : i.push(o), s = o
      }
      return new n(i)
    }, parent: function (i) {
      for (var n = [], s = 0; s < this.length; s += 1) null !== this[s].parentNode && (i ? e(this[s].parentNode).is(i) && n.push(this[s].parentNode) : n.push(this[s].parentNode));
      return e(t(n))
    }, parents: function (i) {
      for (var n = [], s = 0; s < this.length; s += 1) for (var o = this[s].parentNode; o;) i ? e(o).is(i) && n.push(o) : n.push(o), o = o.parentNode;
      return e(t(n))
    }, closest: function (e) {
      var t = this;
      return void 0 === e ? new n([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
    }, find: function (e) {
      for (var t = [], i = 0; i < this.length; i += 1) for (var s = this[i].querySelectorAll(e), o = 0; o < s.length; o += 1) t.push(s[o]);
      return new n(t)
    }, children: function (i) {
      for (var s = [], o = 0; o < this.length; o += 1) for (var a = this[o].childNodes, r = 0; r < a.length; r += 1) i ? 1 === a[r].nodeType && e(a[r]).is(i) && s.push(a[r]) : 1 === a[r].nodeType && s.push(a[r]);
      return new n(t(s))
    }, remove: function () {
      for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this
    }, add: function () {
      for (var t = [], i = arguments.length; i--;) t[i] = arguments[i];
      var n, s;
      for (n = 0; n < t.length; n += 1) {
        var o = e(t[n]);
        for (s = 0; s < o.length; s += 1) this[this.length] = o[s], this.length += 1
      }
      return this
    }, styles: function () {
      return this[0] ? window.getComputedStyle(this[0], null) : {}
    }
  };
  Object.keys(s).forEach(function (t) {
    e.fn[t] = s[t]
  });
  var o = {
    deleteProps: function (e) {
      var t = e;
      Object.keys(t).forEach(function (e) {
        try {
          t[e] = null
        } catch (e) {
        }
        try {
          delete t[e]
        } catch (e) {
        }
      })
    }, nextTick: function (e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t)
    }, now: function () {
      return Date.now()
    }, getTranslate: function (e, t) {
      void 0 === t && (t = "x");
      var n, s, o, a = i.getComputedStyle(e, null);
      return i.WebKitCSSMatrix ? ((s = a.transform || a.webkitTransform).split(",").length > 6 && (s = s.split(", ").map(function (e) {
        return e.replace(",", ".")
      }).join(", ")), o = new i.WebKitCSSMatrix("none" === s ? "" : s)) : n = (o = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (s = i.WebKitCSSMatrix ? o.m41 : 16 === n.length ? parseFloat(n[12]) : parseFloat(n[4])), "y" === t && (s = i.WebKitCSSMatrix ? o.m42 : 16 === n.length ? parseFloat(n[13]) : parseFloat(n[5])), s || 0
    }, parseUrlQuery: function (e) {
      var t, n, s, o, a = {}, r = e || i.location.href;
      if ("string" == typeof r && r.length) for (o = (n = (r = r.indexOf("?") > -1 ? r.replace(/\S*\?/, "") : "").split("&").filter(function (e) {
        return "" !== e
      })).length, t = 0; t < o; t += 1) s = n[t].replace(/#\S+/g, "").split("="), a[decodeURIComponent(s[0])] = void 0 === s[1] ? void 0 : decodeURIComponent(s[1]) || "";
      return a
    }, isObject: function (e) {
      return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
    }, extend: function () {
      for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
      for (var i = Object(e[0]), n = 1; n < e.length; n += 1) {
        var s = e[n];
        if (void 0 !== s && null !== s) for (var a = Object.keys(Object(s)), r = 0, l = a.length; r < l; r += 1) {
          var c = a[r], u = Object.getOwnPropertyDescriptor(s, c);
          void 0 !== u && u.enumerable && (o.isObject(i[c]) && o.isObject(s[c]) ? o.extend(i[c], s[c]) : !o.isObject(i[c]) && o.isObject(s[c]) ? (i[c] = {}, o.extend(i[c], s[c])) : i[c] = s[c])
        }
      }
      return i
    }
  }, a = "undefined" == typeof document ? {
    addEventListener: function () {
    }, removeEventListener: function () {
    }, activeElement: {
      blur: function () {
      }, nodeName: ""
    }, querySelector: function () {
      return {}
    }, querySelectorAll: function () {
      return []
    }, createElement: function () {
      return {
        style: {}, setAttribute: function () {
        }, getElementsByTagName: function () {
          return []
        }
      }
    }, location: {hash: ""}
  } : document, r = {
    touch: i.Modernizr && !0 === i.Modernizr.touch || !!("ontouchstart" in i || i.DocumentTouch && a instanceof i.DocumentTouch),
    transforms3d: i.Modernizr && !0 === i.Modernizr.csstransforms3d || function () {
      var e = a.createElement("div").style;
      return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
    }(),
    flexbox: function () {
      for (var e = a.createElement("div").style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i += 1) if (t[i] in e) return !0;
      return !1
    }(),
    observer: "MutationObserver" in i || "WebkitMutationObserver" in i,
    passiveListener: function () {
      var e = !1;
      try {
        var t = Object.defineProperty({}, "passive", {
          get: function () {
            e = !0
          }
        });
        i.addEventListener("testPassiveListener", null, t)
      } catch (e) {
      }
      return e
    }(),
    gestures: "ongesturestart" in i
  }, l = function (e) {
    void 0 === e && (e = {});
    var t = this;
    t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function (e) {
      t.on(e, t.params.on[e])
    })
  }, c = {components: {}};
  l.prototype.on = function (e, t) {
    var i = this;
    return "function" != typeof t ? i : (e.split(" ").forEach(function (e) {
      i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e].push(t)
    }), i)
  }, l.prototype.once = function (e, t) {
    function i() {
      for (var s = [], o = arguments.length; o--;) s[o] = arguments[o];
      t.apply(n, s), n.off(e, i)
    }

    var n = this;
    return "function" != typeof t ? n : n.on(e, i)
  }, l.prototype.off = function (e, t) {
    var i = this;
    return e.split(" ").forEach(function (e) {
      void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e].forEach(function (n, s) {
        n === t && i.eventsListeners[e].splice(s, 1)
      })
    }), i
  }, l.prototype.emit = function () {
    for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
    var i = this;
    if (!i.eventsListeners) return i;
    var n, s, o;
    return "string" == typeof e[0] || Array.isArray(e[0]) ? (n = e[0], s = e.slice(1, e.length), o = i) : (n = e[0].events, s = e[0].data, o = e[0].context || i), (Array.isArray(n) ? n : n.split(" ")).forEach(function (e) {
      if (i.eventsListeners[e]) {
        var t = [];
        i.eventsListeners[e].forEach(function (e) {
          t.push(e)
        }), t.forEach(function (e) {
          e.apply(o, s)
        })
      }
    }), i
  }, l.prototype.useModulesParams = function (e) {
    var t = this;
    t.modules && Object.keys(t.modules).forEach(function (i) {
      var n = t.modules[i];
      n.params && o.extend(e, n.params)
    })
  }, l.prototype.useModules = function (e) {
    void 0 === e && (e = {});
    var t = this;
    t.modules && Object.keys(t.modules).forEach(function (i) {
      var n = t.modules[i], s = e[i] || {};
      n.instance && Object.keys(n.instance).forEach(function (e) {
        var i = n.instance[e];
        t[e] = "function" == typeof i ? i.bind(t) : i
      }), n.on && t.on && Object.keys(n.on).forEach(function (e) {
        t.on(e, n.on[e])
      }), n.create && n.create.bind(t)(s)
    })
  }, c.components.set = function (e) {
    this.use && this.use(e)
  }, l.installModule = function (e) {
    for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1];
    var n = this;
    n.prototype.modules || (n.prototype.modules = {});
    var s = e.name || Object.keys(n.prototype.modules).length + "_" + o.now();
    return n.prototype.modules[s] = e, e.proto && Object.keys(e.proto).forEach(function (t) {
      n.prototype[t] = e.proto[t]
    }), e.static && Object.keys(e.static).forEach(function (t) {
      n[t] = e.static[t]
    }), e.install && e.install.apply(n, t), n
  }, l.use = function (e) {
    for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1];
    var n = this;
    return Array.isArray(e) ? (e.forEach(function (e) {
      return n.installModule(e)
    }), n) : n.installModule.apply(n, [e].concat(t))
  }, Object.defineProperties(l, c);
  var u = {
      updateSize: function () {
        var e, t, i = this.$el;
        e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth, t = void 0 !== this.params.height ? this.params.height : i[0].clientHeight, 0 === e && this.isHorizontal() || 0 === t && this.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), o.extend(this, {
          width: e,
          height: t,
          size: this.isHorizontal() ? e : t
        }))
      }, updateSlides: function () {
        var e = this.params, t = this.$wrapperEl, i = this.size, n = this.rtl, s = this.wrongRTL,
          a = t.children("." + this.params.slideClass),
          l = this.virtual && e.virtual.enabled ? this.virtual.slides.length : a.length, c = [], u = [], d = [],
          h = e.slidesOffsetBefore;
        "function" == typeof h && (h = e.slidesOffsetBefore.call(this));
        var p = e.slidesOffsetAfter;
        "function" == typeof p && (p = e.slidesOffsetAfter.call(this));
        var f = l, m = this.snapGrid.length, g = this.snapGrid.length, v = e.spaceBetween, y = -h, b = 0, x = 0;
        if (void 0 !== i) {
          "string" == typeof v && v.indexOf("%") >= 0 && (v = parseFloat(v.replace("%", "")) / 100 * i), this.virtualSize = -v, n ? a.css({
            marginLeft: "",
            marginTop: ""
          }) : a.css({marginRight: "", marginBottom: ""});
          var w;
          e.slidesPerColumn > 1 && (w = Math.floor(l / e.slidesPerColumn) === l / this.params.slidesPerColumn ? l : Math.ceil(l / e.slidesPerColumn) * e.slidesPerColumn, "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (w = Math.max(w, e.slidesPerView * e.slidesPerColumn)));
          for (var S, C = e.slidesPerColumn, T = w / C, E = T - (e.slidesPerColumn * T - l), k = 0; k < l; k += 1) {
            S = 0;
            var _ = a.eq(k);
            if (e.slidesPerColumn > 1) {
              var M = void 0, P = void 0, I = void 0;
              "column" === e.slidesPerColumnFill ? (I = k - (P = Math.floor(k / C)) * C, (P > E || P === E && I === C - 1) && (I += 1) >= C && (I = 0, P += 1), M = P + I * w / C, _.css({
                "-webkit-box-ordinal-group": M,
                "-moz-box-ordinal-group": M,
                "-ms-flex-order": M,
                "-webkit-order": M,
                order: M
              })) : P = k - (I = Math.floor(k / T)) * T, _.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== I && e.spaceBetween && e.spaceBetween + "px").attr("data-swiper-column", P).attr("data-swiper-row", I)
            }
            "none" !== _.css("display") && ("auto" === e.slidesPerView ? (S = this.isHorizontal() ? _.outerWidth(!0) : _.outerHeight(!0), e.roundLengths && (S = Math.floor(S))) : (S = (i - (e.slidesPerView - 1) * v) / e.slidesPerView, e.roundLengths && (S = Math.floor(S)), a[k] && (this.isHorizontal() ? a[k].style.width = S + "px" : a[k].style.height = S + "px")), a[k] && (a[k].swiperSlideSize = S), d.push(S), e.centeredSlides ? (y = y + S / 2 + b / 2 + v, 0 === b && 0 !== k && (y = y - i / 2 - v), 0 === k && (y = y - i / 2 - v), Math.abs(y) < .001 && (y = 0), x % e.slidesPerGroup == 0 && c.push(y), u.push(y)) : (x % e.slidesPerGroup == 0 && c.push(y), u.push(y), y = y + S + v), this.virtualSize += S + v, b = S, x += 1)
          }
          this.virtualSize = Math.max(this.virtualSize, i) + p;
          var L;
          if (n && s && ("slide" === e.effect || "coverflow" === e.effect) && t.css({width: this.virtualSize + e.spaceBetween + "px"}), r.flexbox && !e.setWrapperSize || (this.isHorizontal() ? t.css({width: this.virtualSize + e.spaceBetween + "px"}) : t.css({height: this.virtualSize + e.spaceBetween + "px"})), e.slidesPerColumn > 1 && (this.virtualSize = (S + e.spaceBetween) * w, this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween, this.isHorizontal() ? t.css({width: this.virtualSize + e.spaceBetween + "px"}) : t.css({height: this.virtualSize + e.spaceBetween + "px"}), e.centeredSlides)) {
            L = [];
            for (var z = 0; z < c.length; z += 1) c[z] < this.virtualSize + c[0] && L.push(c[z]);
            c = L
          }
          if (!e.centeredSlides) {
            L = [];
            for (var A = 0; A < c.length; A += 1) c[A] <= this.virtualSize - i && L.push(c[A]);
            c = L, Math.floor(this.virtualSize - i) - Math.floor(c[c.length - 1]) > 1 && c.push(this.virtualSize - i)
          }
          0 === c.length && (c = [0]), 0 !== e.spaceBetween && (this.isHorizontal() ? n ? a.css({marginLeft: v + "px"}) : a.css({marginRight: v + "px"}) : a.css({marginBottom: v + "px"})), o.extend(this, {
            slides: a,
            snapGrid: c,
            slidesGrid: u,
            slidesSizesGrid: d
          }), l !== f && this.emit("slidesLengthChange"), c.length !== m && this.emit("snapGridLengthChange"), u.length !== g && this.emit("slidesGridLengthChange"), (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset()
        }
      }, updateAutoHeight: function () {
        var e, t = [], i = 0;
        if ("auto" !== this.params.slidesPerView && this.params.slidesPerView > 1) for (e = 0; e < Math.ceil(this.params.slidesPerView); e += 1) {
          var n = this.activeIndex + e;
          if (n > this.slides.length) break;
          t.push(this.slides.eq(n)[0])
        } else t.push(this.slides.eq(this.activeIndex)[0]);
        for (e = 0; e < t.length; e += 1) if (void 0 !== t[e]) {
          var s = t[e].offsetHeight;
          i = s > i ? s : i
        }
        i && this.$wrapperEl.css("height", i + "px")
      }, updateSlidesOffset: function () {
        for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
      }, updateSlidesProgress: function (e) {
        void 0 === e && (e = this.translate || 0);
        var t = this.params, i = this.slides, n = this.rtl;
        if (0 !== i.length) {
          void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
          var s = -e;
          n && (s = e), i.removeClass(t.slideVisibleClass);
          for (var o = 0; o < i.length; o += 1) {
            var a = i[o],
              r = (s + (t.centeredSlides ? this.minTranslate() : 0) - a.swiperSlideOffset) / (a.swiperSlideSize + t.spaceBetween);
            if (t.watchSlidesVisibility) {
              var l = -(s - a.swiperSlideOffset), c = l + this.slidesSizesGrid[o];
              (l >= 0 && l < this.size || c > 0 && c <= this.size || l <= 0 && c >= this.size) && i.eq(o).addClass(t.slideVisibleClass)
            }
            a.progress = n ? -r : r
          }
        }
      }, updateProgress: function (e) {
        void 0 === e && (e = this.translate || 0);
        var t = this.params, i = this.maxTranslate() - this.minTranslate(), n = this.progress, s = this.isBeginning,
          a = this.isEnd, r = s, l = a;
        0 === i ? (n = 0, s = !0, a = !0) : (s = (n = (e - this.minTranslate()) / i) <= 0, a = n >= 1), o.extend(this, {
          progress: n,
          isBeginning: s,
          isEnd: a
        }), (t.watchSlidesProgress || t.watchSlidesVisibility) && this.updateSlidesProgress(e), s && !r && this.emit("reachBeginning toEdge"), a && !l && this.emit("reachEnd toEdge"), (r && !s || l && !a) && this.emit("fromEdge"), this.emit("progress", n)
      }, updateSlidesClasses: function () {
        var e = this.slides, t = this.params, i = this.$wrapperEl, n = this.activeIndex, s = this.realIndex,
          o = this.virtual && t.virtual.enabled;
        e.removeClass(t.slideActiveClass + " " + t.slideNextClass + " " + t.slidePrevClass + " " + t.slideDuplicateActiveClass + " " + t.slideDuplicateNextClass + " " + t.slideDuplicatePrevClass);
        var a;
        (a = o ? this.$wrapperEl.find("." + t.slideClass + '[data-swiper-slide-index="' + n + '"]') : e.eq(n)).addClass(t.slideActiveClass), t.loop && (a.hasClass(t.slideDuplicateClass) ? i.children("." + t.slideClass + ":not(." + t.slideDuplicateClass + ')[data-swiper-slide-index="' + s + '"]').addClass(t.slideDuplicateActiveClass) : i.children("." + t.slideClass + "." + t.slideDuplicateClass + '[data-swiper-slide-index="' + s + '"]').addClass(t.slideDuplicateActiveClass));
        var r = a.nextAll("." + t.slideClass).eq(0).addClass(t.slideNextClass);
        t.loop && 0 === r.length && (r = e.eq(0)).addClass(t.slideNextClass);
        var l = a.prevAll("." + t.slideClass).eq(0).addClass(t.slidePrevClass);
        t.loop && 0 === l.length && (l = e.eq(-1)).addClass(t.slidePrevClass), t.loop && (r.hasClass(t.slideDuplicateClass) ? i.children("." + t.slideClass + ":not(." + t.slideDuplicateClass + ')[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]').addClass(t.slideDuplicateNextClass) : i.children("." + t.slideClass + "." + t.slideDuplicateClass + '[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]').addClass(t.slideDuplicateNextClass), l.hasClass(t.slideDuplicateClass) ? i.children("." + t.slideClass + ":not(." + t.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(t.slideDuplicatePrevClass) : i.children("." + t.slideClass + "." + t.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(t.slideDuplicatePrevClass))
      }, updateActiveIndex: function (e) {
        var t, i = this.rtl ? this.translate : -this.translate, n = this.slidesGrid, s = this.snapGrid, a = this.params,
          r = this.activeIndex, l = this.realIndex, c = this.snapIndex, u = e;
        if (void 0 === u) {
          for (var d = 0; d < n.length; d += 1) void 0 !== n[d + 1] ? i >= n[d] && i < n[d + 1] - (n[d + 1] - n[d]) / 2 ? u = d : i >= n[d] && i < n[d + 1] && (u = d + 1) : i >= n[d] && (u = d);
          a.normalizeSlideIndex && (u < 0 || void 0 === u) && (u = 0)
        }
        if ((t = s.indexOf(i) >= 0 ? s.indexOf(i) : Math.floor(u / a.slidesPerGroup)) >= s.length && (t = s.length - 1), u !== r) {
          var h = parseInt(this.slides.eq(u).attr("data-swiper-slide-index") || u, 10);
          o.extend(this, {
            snapIndex: t,
            realIndex: h,
            previousIndex: r,
            activeIndex: u
          }), this.emit("activeIndexChange"), this.emit("snapIndexChange"), l !== h && this.emit("realIndexChange"), this.emit("slideChange")
        } else t !== c && (this.snapIndex = t, this.emit("snapIndexChange"))
      }, updateClickedSlide: function (t) {
        var i = this.params, n = e(t.target).closest("." + i.slideClass)[0], s = !1;
        if (n) for (var o = 0; o < this.slides.length; o += 1) this.slides[o] === n && (s = !0);
        if (!n || !s) return this.clickedSlide = void 0, void(this.clickedIndex = void 0);
        this.clickedSlide = n, this.virtual && this.params.virtual.enabled ? this.clickedIndex = parseInt(e(n).attr("data-swiper-slide-index"), 10) : this.clickedIndex = e(n).index(), i.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide()
      }
    }, d = {
      getTranslate: function (e) {
        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
        var t = this.params, i = this.rtl, n = this.translate, s = this.$wrapperEl;
        if (t.virtualTranslate) return i ? -n : n;
        var a = o.getTranslate(s[0], e);
        return i && (a = -a), a || 0
      }, setTranslate: function (e, t) {
        var i = this.rtl, n = this.params, s = this.$wrapperEl, o = this.progress, a = 0, l = 0;
        this.isHorizontal() ? a = i ? -e : e : l = e, n.roundLengths && (a = Math.floor(a), l = Math.floor(l)), n.virtualTranslate || (r.transforms3d ? s.transform("translate3d(" + a + "px, " + l + "px, 0px)") : s.transform("translate(" + a + "px, " + l + "px)")), this.translate = this.isHorizontal() ? a : l;
        var c = this.maxTranslate() - this.minTranslate();
        (0 === c ? 0 : (e - this.minTranslate()) / c) !== o && this.updateProgress(e), this.emit("setTranslate", this.translate, t)
      }, minTranslate: function () {
        return -this.snapGrid[0]
      }, maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1]
      }
    }, h = {
      isSafari: function () {
        var e = i.navigator.userAgent.toLowerCase();
        return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
      }(),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(i.navigator.userAgent),
      ie: i.navigator.pointerEnabled || i.navigator.msPointerEnabled,
      ieTouch: i.navigator.msPointerEnabled && i.navigator.msMaxTouchPoints > 1 || i.navigator.pointerEnabled && i.navigator.maxTouchPoints > 1,
      lteIE9: function () {
        var e = a.createElement("div");
        return e.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e", 1 === e.getElementsByTagName("i").length
      }()
    }, p = {
      slideTo: function (e, t, i, n) {
        void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
        var s = this, o = e;
        o < 0 && (o = 0);
        var a = s.params, r = s.snapGrid, l = s.slidesGrid, c = s.previousIndex, u = s.activeIndex, d = s.rtl,
          p = s.$wrapperEl, f = Math.floor(o / a.slidesPerGroup);
        f >= r.length && (f = r.length - 1), (u || a.initialSlide || 0) === (c || 0) && i && s.emit("beforeSlideChangeStart");
        var m = -r[f];
        if (s.updateProgress(m), a.normalizeSlideIndex) for (var g = 0; g < l.length; g += 1) -Math.floor(100 * m) >= Math.floor(100 * l[g]) && (o = g);
        return !(!s.allowSlideNext && m < s.translate && m < s.minTranslate() || !s.allowSlidePrev && m > s.translate && m > s.maxTranslate() && (u || 0) !== o || (d && -m === s.translate || !d && m === s.translate ? (s.updateActiveIndex(o), a.autoHeight && s.updateAutoHeight(), s.updateSlidesClasses(), "slide" !== a.effect && s.setTranslate(m), 1) : (0 === t || h.lteIE9 ? (s.setTransition(0), s.setTranslate(m), s.updateActiveIndex(o), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, n), s.transitionStart(i), s.transitionEnd(i)) : (s.setTransition(t), s.setTranslate(m), s.updateActiveIndex(o), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, n), s.transitionStart(i), s.animating || (s.animating = !0, p.transitionEnd(function () {
          s && !s.destroyed && s.transitionEnd(i)
        }))), 0)))
      }, slideNext: function (e, t, i) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        var n = this.params, s = this.animating;
        return n.loop ? !s && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, this.slideTo(this.activeIndex + n.slidesPerGroup, e, t, i)) : this.slideTo(this.activeIndex + n.slidesPerGroup, e, t, i)
      }, slidePrev: function (e, t, i) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        var n = this.params, s = this.animating;
        return n.loop ? !s && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, this.slideTo(this.activeIndex - 1, e, t, i)) : this.slideTo(this.activeIndex - 1, e, t, i)
      }, slideReset: function (e, t, i) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        return this.slideTo(this.activeIndex, e, t, i)
      }, slideToClickedSlide: function () {
        var t, i = this, n = i.params, s = i.$wrapperEl,
          a = "auto" === n.slidesPerView ? i.slidesPerViewDynamic() : n.slidesPerView, r = i.clickedIndex;
        if (n.loop) {
          if (i.animating) return;
          t = parseInt(e(i.clickedSlide).attr("data-swiper-slide-index"), 10), n.centeredSlides ? r < i.loopedSlides - a / 2 || r > i.slides.length - i.loopedSlides + a / 2 ? (i.loopFix(), r = s.children("." + n.slideClass + '[data-swiper-slide-index="' + t + '"]:not(.' + n.slideDuplicateClass + ")").eq(0).index(), o.nextTick(function () {
            i.slideTo(r)
          })) : i.slideTo(r) : r > i.slides.length - a ? (i.loopFix(), r = s.children("." + n.slideClass + '[data-swiper-slide-index="' + t + '"]:not(.' + n.slideDuplicateClass + ")").eq(0).index(), o.nextTick(function () {
            i.slideTo(r)
          })) : i.slideTo(r)
        } else i.slideTo(r)
      }
    }, f = {
      loopCreate: function () {
        var t = this, i = t.params, n = t.$wrapperEl;
        n.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
        var s = n.children("." + i.slideClass);
        if (i.loopFillGroupWithBlank) {
          var o = i.slidesPerGroup - s.length % i.slidesPerGroup;
          if (o !== i.slidesPerGroup) {
            for (var r = 0; r < o; r += 1) {
              var l = e(a.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
              n.append(l)
            }
            s = n.children("." + i.slideClass)
          }
        }
        "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = s.length), t.loopedSlides = parseInt(i.loopedSlides || i.slidesPerView, 10), t.loopedSlides += i.loopAdditionalSlides, t.loopedSlides > s.length && (t.loopedSlides = s.length);
        var c = [], u = [];
        s.each(function (i, n) {
          var o = e(n);
          i < t.loopedSlides && u.push(n), i < s.length && i >= s.length - t.loopedSlides && c.push(n), o.attr("data-swiper-slide-index", i)
        });
        for (var d = 0; d < u.length; d += 1) n.append(e(u[d].cloneNode(!0)).addClass(i.slideDuplicateClass));
        for (var h = c.length - 1; h >= 0; h -= 1) n.prepend(e(c[h].cloneNode(!0)).addClass(i.slideDuplicateClass))
      }, loopFix: function () {
        var e, t = this.params, i = this.activeIndex, n = this.slides, s = this.loopedSlides, o = this.allowSlidePrev,
          a = this.allowSlideNext;
        this.allowSlidePrev = !0, this.allowSlideNext = !0, i < s ? (e = n.length - 3 * s + i, e += s, this.slideTo(e, 0, !1, !0)) : ("auto" === t.slidesPerView && i >= 2 * s || i > n.length - 2 * t.slidesPerView) && (e = -n.length + i + s, e += s, this.slideTo(e, 0, !1, !0)), this.allowSlidePrev = o, this.allowSlideNext = a
      }, loopDestroy: function () {
        var e = this.$wrapperEl, t = this.params, i = this.slides;
        e.children("." + t.slideClass + "." + t.slideDuplicateClass).remove(), i.removeAttr("data-swiper-slide-index")
      }
    }, m = {
      setGrabCursor: function (e) {
        if (!r.touch && this.params.simulateTouch) {
          var t = this.el;
          t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab"
        }
      }, unsetGrabCursor: function () {
        r.touch || (this.el.style.cursor = "")
      }
    }, g = {
      appendSlide: function (e) {
        var t = this.$wrapperEl, i = this.params;
        if (i.loop && this.loopDestroy(), "object" == typeof e && "length" in e) for (var n = 0; n < e.length; n += 1) e[n] && t.append(e[n]); else t.append(e);
        i.loop && this.loopCreate(), i.observer && r.observer || this.update()
      }, prependSlide: function (e) {
        var t = this.params, i = this.$wrapperEl, n = this.activeIndex;
        t.loop && this.loopDestroy();
        var s = n + 1;
        if ("object" == typeof e && "length" in e) {
          for (var o = 0; o < e.length; o += 1) e[o] && i.prepend(e[o]);
          s = n + e.length
        } else i.prepend(e);
        t.loop && this.loopCreate(), t.observer && r.observer || this.update(), this.slideTo(s, 0, !1)
      }, removeSlide: function (e) {
        var t = this.params, i = this.$wrapperEl, n = this.activeIndex;
        t.loop && (this.loopDestroy(), this.slides = i.children("." + t.slideClass));
        var s, o = n;
        if ("object" == typeof e && "length" in e) {
          for (var a = 0; a < e.length; a += 1) s = e[a], this.slides[s] && this.slides.eq(s).remove(), s < o && (o -= 1);
          o = Math.max(o, 0)
        } else s = e, this.slides[s] && this.slides.eq(s).remove(), s < o && (o -= 1), o = Math.max(o, 0);
        t.loop && this.loopCreate(), t.observer && r.observer || this.update(), t.loop ? this.slideTo(o + this.loopedSlides, 0, !1) : this.slideTo(o, 0, !1)
      }, removeAllSlides: function () {
        for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
        this.removeSlide(e)
      }
    }, v = function () {
      var e = i.navigator.userAgent, t = {
          ios: !1,
          android: !1,
          androidChrome: !1,
          desktop: !1,
          windows: !1,
          iphone: !1,
          ipod: !1,
          ipad: !1,
          cordova: i.cordova || i.phonegap,
          phonegap: i.cordova || i.phonegap
        }, n = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/), s = e.match(/(Android);?[\s\/]+([\d.]+)?/),
        o = e.match(/(iPad).*OS\s([\d_]+)/), r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
        l = !o && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      if (n && (t.os = "windows", t.osVersion = n[2], t.windows = !0), s && !n && (t.os = "android", t.osVersion = s[2], t.android = !0, t.androidChrome = e.toLowerCase().indexOf("chrome") >= 0), (o || l || r) && (t.os = "ios", t.ios = !0), l && !r && (t.osVersion = l[2].replace(/_/g, "."), t.iphone = !0), o && (t.osVersion = o[2].replace(/_/g, "."), t.ipad = !0), r && (t.osVersion = r[3] ? r[3].replace(/_/g, ".") : null, t.iphone = !0), t.ios && t.osVersion && e.indexOf("Version/") >= 0 && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]), t.desktop = !(t.os || t.android || t.webView), t.webView = (l || o || r) && e.match(/.*AppleWebKit(?!.*Safari)/i), t.os && "ios" === t.os) {
        var c = t.osVersion.split("."), u = a.querySelector('meta[name="viewport"]');
        t.minimalUi = !t.webView && (r || l) && (1 * c[0] == 7 ? 1 * c[1] >= 1 : 1 * c[0] > 7) && u && u.getAttribute("content").indexOf("minimal-ui") >= 0
      }
      return t.pixelRatio = i.devicePixelRatio || 1, t
    }(), y = function () {
      var e = this.params, t = this.el, i = this.allowSlideNext, n = this.allowSlidePrev;
      if (!t || 0 !== t.offsetWidth) {
        if (e.breakpoints && this.setBreakpoint(), this.allowSlideNext = !0, this.allowSlidePrev = !0, this.updateSize(), this.updateSlides(), e.freeMode) {
          var s = Math.min(Math.max(this.translate, this.maxTranslate()), this.minTranslate());
          this.setTranslate(s), this.updateActiveIndex(), this.updateSlidesClasses(), e.autoHeight && this.updateAutoHeight()
        } else this.updateSlidesClasses(), ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0);
        this.allowSlidePrev = n, this.allowSlideNext = i
      }
    }, b = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "container",
      initialSlide: 0,
      speed: 300,
      iOSEdgeSwipeDetection: !1,
      iOSEdgeSwipeThreshold: 20,
      freeMode: !1,
      freeModeMomentum: !0,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: !0,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: !1,
      freeModeMinimumVelocity: .02,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: "column",
      slidesPerGroup: 1,
      centeredSlides: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: .5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !0,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: .85,
      watchSlidesProgress: !1,
      watchSlidesVisibility: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      passiveListeners: !0,
      containerModifierClass: "swiper-container-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0
    }, x = {
      update: u, translate: d, transition: {
        setTransition: function (e, t) {
          this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
        }, transitionStart: function (e) {
          void 0 === e && (e = !0);
          var t = this.activeIndex, i = this.params, n = this.previousIndex;
          i.autoHeight && this.updateAutoHeight(), this.emit("transitionStart"), e && t !== n && (this.emit("slideChangeTransitionStart"), t > n ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart"))
        }, transitionEnd: function (e) {
          void 0 === e && (e = !0);
          var t = this.activeIndex, i = this.previousIndex;
          this.animating = !1, this.setTransition(0), this.emit("transitionEnd"), e && t !== i && (this.emit("slideChangeTransitionEnd"), t > i ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd"))
        }
      }, slide: p, loop: f, grabCursor: m, manipulation: g, events: {
        attachEvents: function () {
          var t = this.params, i = this.touchEvents, n = this.el, s = this.wrapperEl;
          this.onTouchStart = function (t) {
            var i = this.touchEventsData, n = this.params, s = this.touches, r = t;
            if (r.originalEvent && (r = r.originalEvent), i.isTouchEvent = "touchstart" === r.type, (i.isTouchEvent || !("which" in r) || 3 !== r.which) && (!i.isTouched || !i.isMoved)) if (n.noSwiping && e(r.target).closest("." + n.noSwipingClass)[0]) this.allowClick = !0; else if (!n.swipeHandler || e(r).closest(n.swipeHandler)[0]) {
              s.currentX = "touchstart" === r.type ? r.targetTouches[0].pageX : r.pageX, s.currentY = "touchstart" === r.type ? r.targetTouches[0].pageY : r.pageY;
              var l = s.currentX, c = s.currentY;
              if (!(v.ios && n.iOSEdgeSwipeDetection && l <= n.iOSEdgeSwipeThreshold)) {
                if (o.extend(i, {
                  isTouched: !0,
                  isMoved: !1,
                  allowTouchCallbacks: !0,
                  isScrolling: void 0,
                  startMoving: void 0
                }), s.startX = l, s.startY = c, i.touchStartTime = o.now(), this.allowClick = !0, this.updateSize(), this.swipeDirection = void 0, n.threshold > 0 && (i.allowThresholdMove = !1), "touchstart" !== r.type) {
                  var u = !0;
                  e(r.target).is(i.formElements) && (u = !1), a.activeElement && e(a.activeElement).is(i.formElements) && a.activeElement.blur(), u && r.preventDefault()
                }
                this.emit("touchStart", r)
              }
            }
          }.bind(this), this.onTouchMove = function (t) {
            var i = this.touchEventsData, n = this.params, s = this.touches, r = this.rtl, l = t;
            if (l.originalEvent && (l = l.originalEvent), !i.isTouchEvent || "mousemove" !== l.type) {
              var c = "touchmove" === l.type ? l.targetTouches[0].pageX : l.pageX,
                u = "touchmove" === l.type ? l.targetTouches[0].pageY : l.pageY;
              if (l.preventedByNestedSwiper) return s.startX = c, void(s.startY = u);
              if (!this.allowTouchMove) return this.allowClick = !1, void(i.isTouched && (o.extend(s, {
                startX: c,
                startY: u,
                currentX: c,
                currentY: u
              }), i.touchStartTime = o.now()));
              if (i.isTouchEvent && n.touchReleaseOnEdges && !n.loop) if (this.isVertical()) {
                if (s.currentY < s.startY && this.translate <= this.maxTranslate() || s.currentY > s.startY && this.translate >= this.minTranslate()) return
              } else if (s.currentX < s.startX && this.translate <= this.maxTranslate() || s.currentX > s.startX && this.translate >= this.minTranslate()) return;
              if (i.isTouchEvent && a.activeElement && l.target === a.activeElement && e(l.target).is(i.formElements)) return i.isMoved = !0, void(this.allowClick = !1);
              if (i.allowTouchCallbacks && this.emit("touchMove", l), !(l.targetTouches && l.targetTouches.length > 1)) {
                if (s.currentX = "touchmove" === l.type ? l.targetTouches[0].pageX : l.pageX, s.currentY = "touchmove" === l.type ? l.targetTouches[0].pageY : l.pageY, void 0 === i.isScrolling) {
                  var d;
                  this.isHorizontal() && s.currentY === s.startY || this.isVertical() && s.currentX === s.startX ? i.isScrolling = !1 : (d = 180 * Math.atan2(Math.abs(s.currentY - s.startY), Math.abs(s.currentX - s.startX)) / Math.PI, i.isScrolling = this.isHorizontal() ? d > n.touchAngle : 90 - d > n.touchAngle)
                }
                if (i.isScrolling && this.emit("touchMoveOpposite", l), "undefined" == typeof startMoving && (s.currentX === s.startX && s.currentY === s.startY || (i.startMoving = !0)), i.isTouched) if (i.isScrolling) i.isTouched = !1; else if (i.startMoving) {
                  this.allowClick = !1, l.preventDefault(), n.touchMoveStopPropagation && !n.nested && l.stopPropagation(), i.isMoved || (n.loop && this.loopFix(), i.startTranslate = this.getTranslate(), this.setTransition(0), this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !n.grabCursor || !0 !== this.allowSlideNext && !0 !== this.allowSlidePrev || this.setGrabCursor(!0), this.emit("sliderFirstMove", l)), this.emit("sliderMove", l), i.isMoved = !0;
                  var h = this.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY;
                  s.diff = h, h *= n.touchRatio, r && (h = -h), this.swipeDirection = h > 0 ? "prev" : "next", i.currentTranslate = h + i.startTranslate;
                  var p = !0, f = n.resistanceRatio;
                  if (n.touchReleaseOnEdges && (f = 0), h > 0 && i.currentTranslate > this.minTranslate() ? (p = !1, n.resistance && (i.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + i.startTranslate + h, f))) : h < 0 && i.currentTranslate < this.maxTranslate() && (p = !1, n.resistance && (i.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - i.startTranslate - h, f))), p && (l.preventedByNestedSwiper = !0), !this.allowSlideNext && "next" === this.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !this.allowSlidePrev && "prev" === this.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), n.threshold > 0) {
                    if (!(Math.abs(h) > n.threshold || i.allowThresholdMove)) return void(i.currentTranslate = i.startTranslate);
                    if (!i.allowThresholdMove) return i.allowThresholdMove = !0, s.startX = s.currentX, s.startY = s.currentY, i.currentTranslate = i.startTranslate, void(s.diff = this.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY)
                  }
                  n.followFinger && ((n.freeMode || n.watchSlidesProgress || n.watchSlidesVisibility) && (this.updateActiveIndex(), this.updateSlidesClasses()), n.freeMode && (0 === i.velocities.length && i.velocities.push({
                    position: s[this.isHorizontal() ? "startX" : "startY"],
                    time: i.touchStartTime
                  }), i.velocities.push({
                    position: s[this.isHorizontal() ? "currentX" : "currentY"],
                    time: o.now()
                  })), this.updateProgress(i.currentTranslate), this.setTranslate(i.currentTranslate))
                }
              }
            }
          }.bind(this), this.onTouchEnd = function (e) {
            var t = this, i = t.touchEventsData, n = t.params, s = t.touches, a = t.rtl, r = t.$wrapperEl,
              l = t.slidesGrid, c = t.snapGrid, u = e;
            if (u.originalEvent && (u = u.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", u), i.allowTouchCallbacks = !1, i.isTouched) {
              n.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
              var d = o.now(), h = d - i.touchStartTime;
              if (t.allowClick && (t.updateClickedSlide(u), t.emit("tap", u), h < 300 && d - i.lastClickTime > 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), i.clickTimeout = o.nextTick(function () {
                t && !t.destroyed && t.emit("click", u)
              }, 300)), h < 300 && d - i.lastClickTime < 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), t.emit("doubleTap", u))), i.lastClickTime = o.now(), o.nextTick(function () {
                t.destroyed || (t.allowClick = !0)
              }), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === s.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, void(i.isMoved = !1);
              i.isTouched = !1, i.isMoved = !1;
              var p;
              if (p = n.followFinger ? a ? t.translate : -t.translate : -i.currentTranslate, n.freeMode) {
                if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                if (p > -t.maxTranslate()) return void(t.slides.length < c.length ? t.slideTo(c.length - 1) : t.slideTo(t.slides.length - 1));
                if (n.freeModeMomentum) {
                  if (i.velocities.length > 1) {
                    var f = i.velocities.pop(), m = i.velocities.pop(), g = f.position - m.position, v = f.time - m.time;
                    t.velocity = g / v, t.velocity /= 2, Math.abs(t.velocity) < n.freeModeMinimumVelocity && (t.velocity = 0), (v > 150 || o.now() - f.time > 300) && (t.velocity = 0)
                  } else t.velocity = 0;
                  t.velocity *= n.freeModeMomentumVelocityRatio, i.velocities.length = 0;
                  var y = 1e3 * n.freeModeMomentumRatio, b = t.velocity * y, x = t.translate + b;
                  a && (x = -x);
                  var w, S = !1, C = 20 * Math.abs(t.velocity) * n.freeModeMomentumBounceRatio;
                  if (x < t.maxTranslate()) n.freeModeMomentumBounce ? (x + t.maxTranslate() < -C && (x = t.maxTranslate() - C), w = t.maxTranslate(), S = !0, i.allowMomentumBounce = !0) : x = t.maxTranslate(); else if (x > t.minTranslate()) n.freeModeMomentumBounce ? (x - t.minTranslate() > C && (x = t.minTranslate() + C), w = t.minTranslate(), S = !0, i.allowMomentumBounce = !0) : x = t.minTranslate(); else if (n.freeModeSticky) {
                    for (var T, E = 0; E < c.length; E += 1) if (c[E] > -x) {
                      T = E;
                      break
                    }
                    x = Math.abs(c[T] - x) < Math.abs(c[T - 1] - x) || "next" === t.swipeDirection ? c[T] : c[T - 1], a || (x = -x)
                  }
                  if (0 !== t.velocity) y = a ? Math.abs((-x - t.translate) / t.velocity) : Math.abs((x - t.translate) / t.velocity); else if (n.freeModeSticky) return void t.slideReset();
                  n.freeModeMomentumBounce && S ? (t.updateProgress(w), t.setTransition(y), t.setTranslate(x), t.transitionStart(), t.animating = !0, r.transitionEnd(function () {
                    t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(n.speed), t.setTranslate(w), r.transitionEnd(function () {
                      t && !t.destroyed && t.transitionEnd()
                    }))
                  })) : t.velocity ? (t.updateProgress(x), t.setTransition(y), t.setTranslate(x), t.transitionStart(), t.animating || (t.animating = !0, r.transitionEnd(function () {
                    t && !t.destroyed && t.transitionEnd()
                  }))) : t.updateProgress(x), t.updateActiveIndex(), t.updateSlidesClasses()
                }
                (!n.freeModeMomentum || h >= n.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
              } else {
                for (var k = 0, _ = t.slidesSizesGrid[0], M = 0; M < l.length; M += n.slidesPerGroup) void 0 !== l[M + n.slidesPerGroup] ? p >= l[M] && p < l[M + n.slidesPerGroup] && (k = M, _ = l[M + n.slidesPerGroup] - l[M]) : p >= l[M] && (k = M, _ = l[l.length - 1] - l[l.length - 2]);
                var P = (p - l[k]) / _;
                if (h > n.longSwipesMs) {
                  if (!n.longSwipes) return void t.slideTo(t.activeIndex);
                  "next" === t.swipeDirection && (P >= n.longSwipesRatio ? t.slideTo(k + n.slidesPerGroup) : t.slideTo(k)), "prev" === t.swipeDirection && (P > 1 - n.longSwipesRatio ? t.slideTo(k + n.slidesPerGroup) : t.slideTo(k))
                } else {
                  if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
                  "next" === t.swipeDirection && t.slideTo(k + n.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(k)
                }
              }
            }
          }.bind(this), this.onClick = function (e) {
            this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
          }.bind(this);
          var l = "container" === t.touchEventsTarget ? n : s, c = !!t.nested;
          if (h.ie) l.addEventListener(i.start, this.onTouchStart, !1), (r.touch ? l : a).addEventListener(i.move, this.onTouchMove, c), (r.touch ? l : a).addEventListener(i.end, this.onTouchEnd, !1); else {
            if (r.touch) {
              var u = !("onTouchStart" !== i.start || !r.passiveListener || !t.passiveListeners) && {
                passive: !0,
                capture: !1
              };
              l.addEventListener(i.start, this.onTouchStart, u), l.addEventListener(i.move, this.onTouchMove, c), l.addEventListener(i.end, this.onTouchEnd, u)
            }
            (t.simulateTouch && !v.ios && !v.android || t.simulateTouch && !r.touch && v.ios) && (l.addEventListener("mousedown", this.onTouchStart, !1), a.addEventListener("mousemove", this.onTouchMove, c), a.addEventListener("mouseup", this.onTouchEnd, !1))
          }
          (t.preventClicks || t.preventClicksPropagation) && l.addEventListener("click", this.onClick, !0), this.on("resize observerUpdate", y)
        }, detachEvents: function () {
          var e = this.params, t = this.touchEvents, i = this.el, n = this.wrapperEl,
            s = "container" === e.touchEventsTarget ? i : n, o = !!e.nested;
          if (h.ie) s.removeEventListener(t.start, this.onTouchStart, !1), (r.touch ? s : a).removeEventListener(t.move, this.onTouchMove, o), (r.touch ? s : a).removeEventListener(t.end, this.onTouchEnd, !1); else {
            if (r.touch) {
              var l = !("onTouchStart" !== t.start || !r.passiveListener || !e.passiveListeners) && {
                passive: !0,
                capture: !1
              };
              s.removeEventListener(t.start, this.onTouchStart, l), s.removeEventListener(t.move, this.onTouchMove, o), s.removeEventListener(t.end, this.onTouchEnd, l)
            }
            (e.simulateTouch && !v.ios && !v.android || e.simulateTouch && !r.touch && v.ios) && (s.removeEventListener("mousedown", this.onTouchStart, !1), a.removeEventListener("mousemove", this.onTouchMove, o), a.removeEventListener("mouseup", this.onTouchEnd, !1))
          }
          (e.preventClicks || e.preventClicksPropagation) && s.removeEventListener("click", this.onClick, !0), this.off("resize observerUpdate", y)
        }
      }, breakpoints: {
        setBreakpoint: function () {
          var e = this.activeIndex, t = this.loopedSlides;
          void 0 === t && (t = 0);
          var i = this.params, n = i.breakpoints;
          if (n && (!n || 0 !== Object.keys(n).length)) {
            var s = this.getBreakpoint(n);
            if (s && this.currentBreakpoint !== s) {
              var a = s in n ? n[s] : this.originalParams, r = i.loop && a.slidesPerView !== i.slidesPerView;
              if (o.extend(this.params, a), o.extend(this, {
                allowTouchMove: this.params.allowTouchMove,
                allowSlideNext: this.params.allowSlideNext,
                allowSlidePrev: this.params.allowSlidePrev
              }), this.currentBreakpoint = s, r) {
                var l = e - t;
                this.loopDestroy(), this.loopCreate(), this.updateSlides(), this.slideTo(l + t, 0, !1)
              }
            }
          }
        }, getBreakpoint: function (e) {
          if (e) {
            var t = !1, n = [];
            Object.keys(e).forEach(function (e) {
              n.push(e)
            }), n.sort(function (e, t) {
              return parseInt(e, 10) > parseInt(t, 10)
            });
            for (var s = 0; s < n.length; s += 1) {
              var o = n[s];
              o >= i.innerWidth && !t && (t = o)
            }
            return t || "max"
          }
        }
      }, classes: {
        addClasses: function () {
          var e = this.classNames, t = this.params, n = this.rtl, s = this.$el, o = [];
          o.push(t.direction), t.freeMode && o.push("free-mode"), r.flexbox || o.push("no-flexbox"), t.autoHeight && o.push("autoheight"), n && o.push("rtl"), t.slidesPerColumn > 1 && o.push("multirow"), v.android && o.push("android"), v.ios && o.push("ios"), (i.navigator.pointerEnabled || i.navigator.msPointerEnabled) && o.push("wp8-" + t.direction), o.forEach(function (i) {
            e.push(t.containerModifierClass + i)
          }), s.addClass(e.join(" "))
        }, removeClasses: function () {
          var e = this.$el, t = this.classNames;
          e.removeClass(t.join(" "))
        }
      }, images: {
        loadImage: function (e, t, n, s, o, a) {
          function r() {
            a && a()
          }

          var l;
          e.complete && o ? r() : t ? ((l = new i.Image).onload = r, l.onerror = r, s && (l.sizes = s), n && (l.srcset = n), t && (l.src = t)) : r()
        }, preloadImages: function () {
          var e = this;
          e.imagesToLoad = e.$el.find("img");
          for (var t = 0; t < e.imagesToLoad.length; t += 1) {
            var i = e.imagesToLoad[t];
            e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, function () {
              void 0 !== e && null !== e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
            })
          }
        }
      }
    }, w = {}, S = function (t) {
      function n() {
        for (var s = [], a = arguments.length; a--;) s[a] = arguments[a];
        var l, c;
        if (1 === s.length && s[0].constructor && s[0].constructor === Object) c = s[0]; else {
          var u;
          l = (u = s)[0], c = u[1]
        }
        c || (c = {}), c = o.extend({}, c), l && !c.el && (c.el = l), t.call(this, c), Object.keys(x).forEach(function (e) {
          Object.keys(x[e]).forEach(function (t) {
            n.prototype[t] || (n.prototype[t] = x[e][t])
          })
        });
        var d = this;
        Object.keys(d.modules).forEach(function (e) {
          var t = d.modules[e];
          if (t.params) {
            var i = Object.keys(t.params)[0], n = t.params[i];
            if ("object" != typeof n) return;
            if (!(i in c && "enabled" in n)) return;
            !0 === c[i] && (c[i] = {enabled: !0}), "object" != typeof c[i] || "enabled" in c[i] || (c[i].enabled = !0), c[i] || (c[i] = {enabled: !1})
          }
        });
        var h = o.extend({}, b);
        d.useModulesParams(h), d.params = o.extend({}, h, w, c), d.originalParams = o.extend({}, d.params), d.passedParams = o.extend({}, c);
        var p = e(d.params.el);
        if (l = p[0]) {
          if (p.length > 1) {
            var f = [];
            return p.each(function (e, t) {
              var i = o.extend({}, c, {el: t});
              f.push(new n(i))
            }), f
          }
          l.swiper = d, p.data("swiper", d);
          var m = p.children("." + d.params.wrapperClass);
          return o.extend(d, {
            $el: p,
            el: l,
            $wrapperEl: m,
            wrapperEl: m[0],
            classNames: [],
            slides: e(),
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: function () {
              return "horizontal" === d.params.direction
            },
            isVertical: function () {
              return "vertical" === d.params.direction
            },
            rtl: "horizontal" === d.params.direction && ("rtl" === l.dir.toLowerCase() || "rtl" === p.css("direction")),
            wrongRTL: "-webkit-box" === m.css("display"),
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: d.params.allowSlideNext,
            allowSlidePrev: d.params.allowSlidePrev,
            touchEvents: function () {
              var e = ["touchstart", "touchmove", "touchend"], t = ["mousedown", "mousemove", "mouseup"];
              return i.navigator.pointerEnabled ? t = ["pointerdown", "pointermove", "pointerup"] : i.navigator.msPointerEnabled && (t = ["MSPointerDown", "MsPointerMove", "MsPointerUp"]), {
                start: r.touch || !d.params.simulateTouch ? e[0] : t[0],
                move: r.touch || !d.params.simulateTouch ? e[1] : t[1],
                end: r.touch || !d.params.simulateTouch ? e[2] : t[2]
              }
            }(),
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              formElements: "input, select, option, textarea, button, video",
              lastClickTime: o.now(),
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              isTouchEvent: void 0,
              startMoving: void 0
            },
            allowClick: !0,
            allowTouchMove: d.params.allowTouchMove,
            touches: {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0},
            imagesToLoad: [],
            imagesLoaded: 0
          }), d.useModules(), d.params.init && d.init(), d
        }
      }

      t && (n.__proto__ = t), (n.prototype = Object.create(t && t.prototype)).constructor = n;
      var s = {extendedDefaults: {}, defaults: {}, Class: {}, $: {}};
      return n.prototype.slidesPerViewDynamic = function () {
        var e = this.params, t = this.slides, i = this.slidesGrid, n = this.size, s = this.activeIndex, o = 1;
        if (e.centeredSlides) {
          for (var a, r = t[s].swiperSlideSize, l = s + 1; l < t.length; l += 1) t[l] && !a && (o += 1, (r += t[l].swiperSlideSize) > n && (a = !0));
          for (var c = s - 1; c >= 0; c -= 1) t[c] && !a && (o += 1, (r += t[c].swiperSlideSize) > n && (a = !0))
        } else for (var u = s + 1; u < t.length; u += 1) i[u] - i[s] < n && (o += 1);
        return o
      }, n.prototype.update = function () {
        function e() {
          i = Math.min(Math.max(t.translate, t.maxTranslate()), t.minTranslate()), t.setTranslate(i), t.updateActiveIndex(), t.updateSlidesClasses()
        }

        var t = this;
        if (t && !t.destroyed) {
          t.updateSize(), t.updateSlides(), t.updateProgress(), t.updateSlidesClasses();
          var i;
          t.params.freeMode ? (e(), t.params.autoHeight && t.updateAutoHeight()) : (("auto" === t.params.slidesPerView || t.params.slidesPerView > 1) && t.isEnd && !t.params.centeredSlides ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0)) || e(), t.emit("update")
        }
      }, n.prototype.init = function () {
        this.initialized || (this.emit("beforeInit"), this.params.breakpoints && this.setBreakpoint(), this.addClasses(), this.params.loop && this.loopCreate(), this.updateSize(), this.updateSlides(), this.params.grabCursor && this.setGrabCursor(), this.params.preloadImages && this.preloadImages(), this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit), this.attachEvents(), this.initialized = !0, this.emit("init"))
      }, n.prototype.destroy = function (e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        var i = this, n = i.params, s = i.$el, a = i.$wrapperEl, r = i.slides;
        i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), n.loop && i.loopDestroy(), t && (i.removeClasses(), s.removeAttr("style"), a.removeAttr("style"), r && r.length && r.removeClass([n.slideVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(function (e) {
          i.off(e)
        }), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), o.deleteProps(i)), i.destroyed = !0
      }, n.extendDefaults = function (e) {
        o.extend(w, e)
      }, s.extendedDefaults.get = function () {
        return w
      }, s.defaults.get = function () {
        return b
      }, s.Class.get = function () {
        return t
      }, s.$.get = function () {
        return e
      }, Object.defineProperties(n, s), n
    }(l), C = {name: "device", proto: {device: v}, static: {device: v}},
    T = {name: "support", proto: {support: r}, static: {support: r}},
    E = {name: "browser", proto: {browser: h}, static: {browser: h}}, k = {
      name: "resize", create: function () {
        var e = this;
        o.extend(e, {
          resize: {
            resizeHandler: function () {
              e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
            }, orientationChangeHandler: function () {
              e && !e.destroyed && e.initialized && e.emit("orientationchange")
            }
          }
        })
      }, on: {
        init: function () {
          i.addEventListener("resize", this.resize.resizeHandler), i.addEventListener("orientationchange", this.resize.orientationChangeHandler)
        }, destroy: function () {
          i.removeEventListener("resize", this.resize.resizeHandler), i.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
        }
      }
    }, _ = {
      func: i.MutationObserver || i.WebkitMutationObserver, attach: function (e, t) {
        void 0 === t && (t = {});
        var i = this, n = new (0, _.func)(function (e) {
          e.forEach(function (e) {
            i.emit("observerUpdate", e)
          })
        });
        n.observe(e, {
          attributes: void 0 === t.attributes || t.attributes,
          childList: void 0 === t.childList || t.childList,
          characterData: void 0 === t.characterData || t.characterData
        }), i.observer.observers.push(n)
      }, init: function () {
        if (r.observer && this.params.observer) {
          if (this.params.observeParents) for (var e = this.$el.parents(), t = 0; t < e.length; t += 1) this.observer.attach(e[t]);
          this.observer.attach(this.$el[0], {childList: !1}), this.observer.attach(this.$wrapperEl[0], {attributes: !1})
        }
      }, destroy: function () {
        this.observer.observers.forEach(function (e) {
          e.disconnect()
        }), this.observer.observers = []
      }
    }, M = {
      name: "observer", params: {observer: !1, observeParents: !1}, create: function () {
        o.extend(this, {
          observer: {
            init: _.init.bind(this),
            attach: _.attach.bind(this),
            destroy: _.destroy.bind(this),
            observers: []
          }
        })
      }, on: {
        init: function () {
          this.observer.init()
        }, destroy: function () {
          this.observer.destroy()
        }
      }
    }, P = {
      update: function (e) {
        function t() {
          i.updateSlides(), i.updateProgress(), i.updateSlidesClasses(), i.lazy && i.params.lazy.enabled && i.lazy.load()
        }

        var i = this, n = i.params, s = n.slidesPerView, a = n.slidesPerGroup, r = n.centeredSlides, l = i.virtual,
          c = l.from, u = l.to, d = l.slides, h = l.slidesGrid, p = l.renderSlide, f = l.offset;
        i.updateActiveIndex();
        var m, g = i.activeIndex || 0;
        m = i.rtl && i.isHorizontal() ? "right" : i.isHorizontal() ? "left" : "top";
        var v, y;
        r ? (v = Math.floor(s / 2) + a, y = Math.floor(s / 2) + a) : (v = s + (a - 1), y = a);
        var b = Math.max((g || 0) - y, 0), x = Math.min((g || 0) + v, d.length - 1),
          w = (i.slidesGrid[b] || 0) - (i.slidesGrid[0] || 0);
        if (o.extend(i.virtual, {
          from: b,
          to: x,
          offset: w,
          slidesGrid: i.slidesGrid
        }), c === b && u === x && !e) return i.slidesGrid !== h && w !== f && i.slides.css(m, w + "px"), void i.updateProgress();
        if (i.params.virtual.renderExternal) return i.params.virtual.renderExternal.call(i, {
          offset: w,
          from: b,
          to: x,
          slides: function () {
            for (var e = [], t = b; t <= x; t += 1) e.push(d[t]);
            return e
          }()
        }), void t();
        var S = [], C = [];
        if (e) i.$wrapperEl.find("." + i.params.slideClass).remove(); else for (var T = c; T <= u; T += 1) (T < b || T > x) && i.$wrapperEl.find("." + i.params.slideClass + '[data-swiper-slide-index="' + T + '"]').remove();
        for (var E = 0; E < d.length; E += 1) E >= b && E <= x && (void 0 === u || e ? C.push(E) : (E > u && C.push(E), E < c && S.push(E)));
        C.forEach(function (e) {
          i.$wrapperEl.append(p(d[e], e))
        }), S.sort(function (e, t) {
          return e < t
        }).forEach(function (e) {
          i.$wrapperEl.prepend(p(d[e], e))
        }), i.$wrapperEl.children(".swiper-slide").css(m, w + "px"), t()
      }, renderSlide: function (t, i) {
        var n = this.params.virtual;
        if (n.cache && this.virtual.cache[i]) return this.virtual.cache[i];
        var s = e(n.renderSlide ? n.renderSlide.call(this, t, i) : '<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + i + '">' + t + "</div>");
        return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", i), n.cache && (this.virtual.cache[i] = s), s
      }, appendSlide: function (e) {
        this.virtual.slides.push(e), this.virtual.update(!0)
      }, prependSlide: function (e) {
        if (this.virtual.slides.unshift(e), this.params.virtual.cache) {
          var t = this.virtual.cache, i = {};
          Object.keys(t).forEach(function (e) {
            i[e + 1] = t[e]
          }), this.virtual.cache = i
        }
        this.virtual.update(!0), this.slideNext(0)
      }
    }, I = {
      name: "virtual",
      params: {virtual: {enabled: !1, slides: [], cache: !0, renderSlide: null, renderExternal: null}},
      create: function () {
        o.extend(this, {
          virtual: {
            update: P.update.bind(this),
            appendSlide: P.appendSlide.bind(this),
            prependSlide: P.prependSlide.bind(this),
            renderSlide: P.renderSlide.bind(this),
            slides: this.params.virtual.slides,
            cache: {}
          }
        })
      },
      on: {
        beforeInit: function () {
          if (this.params.virtual.enabled) {
            this.classNames.push(this.params.containerModifierClass + "virtual");
            var e = {watchSlidesProgress: !0};
            o.extend(this.params, e), o.extend(this.originalParams, e), this.virtual.update()
          }
        }, setTranslate: function () {
          this.params.virtual.enabled && this.virtual.update()
        }
      }
    }, L = {
      handle: function (e) {
        var t = e;
        t.originalEvent && (t = t.originalEvent);
        var n = t.keyCode || t.charCode;
        if (!this.allowSlideNext && (this.isHorizontal() && 39 === n || this.isVertical() && 40 === n)) return !1;
        if (!this.allowSlidePrev && (this.isHorizontal() && 37 === n || this.isVertical() && 38 === n)) return !1;
        if (!(t.shiftKey || t.altKey || t.ctrlKey || t.metaKey || a.activeElement && a.activeElement.nodeName && ("input" === a.activeElement.nodeName.toLowerCase() || "textarea" === a.activeElement.nodeName.toLowerCase()))) {
          if (37 === n || 39 === n || 38 === n || 40 === n) {
            var s = !1;
            if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length) return;
            var o = i.pageXOffset, r = i.pageYOffset, l = i.innerWidth, c = i.innerHeight, u = this.$el.offset();
            this.rtl && (u.left -= this.$el[0].scrollLeft);
            for (var d = [[u.left, u.top], [u.left + this.width, u.top], [u.left, u.top + this.height], [u.left + this.width, u.top + this.height]], h = 0; h < d.length; h += 1) {
              var p = d[h];
              p[0] >= o && p[0] <= o + l && p[1] >= r && p[1] <= r + c && (s = !0)
            }
            if (!s) return
          }
          this.isHorizontal() ? (37 !== n && 39 !== n || (t.preventDefault ? t.preventDefault() : t.returnValue = !1), (39 === n && !this.rtl || 37 === n && this.rtl) && this.slideNext(), (37 === n && !this.rtl || 39 === n && this.rtl) && this.slidePrev()) : (38 !== n && 40 !== n || (t.preventDefault ? t.preventDefault() : t.returnValue = !1), 40 === n && this.slideNext(), 38 === n && this.slidePrev()), this.emit("keyPress", n)
        }
      }, enable: function () {
        this.keyboard.enabled || (e(a).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
      }, disable: function () {
        this.keyboard.enabled && (e(a).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
      }
    }, z = {
      name: "keyboard", params: {keyboard: {enabled: !1}}, create: function () {
        o.extend(this, {
          keyboard: {
            enabled: !1,
            enable: L.enable.bind(this),
            disable: L.disable.bind(this),
            handle: L.handle.bind(this)
          }
        })
      }, on: {
        init: function () {
          this.params.keyboard.enabled && this.keyboard.enable()
        }, destroy: function () {
          this.keyboard.enabled && this.keyboard.disable()
        }
      }
    }, A = {
      lastScrollTime: o.now(),
      event: i.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function () {
        var e = "onwheel" in a;
        if (!e) {
          var t = a.createElement("div");
          t.setAttribute("onwheel", "return;"), e = "function" == typeof t.onwheel
        }
        return !e && a.implementation && a.implementation.hasFeature && !0 !== a.implementation.hasFeature("", "") && (e = a.implementation.hasFeature("Events.wheel", "3.0")), e
      }() ? "wheel" : "mousewheel",
      normalize: function (e) {
        var t = 0, i = 0, n = 0, s = 0;
        return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), n = 10 * t, s = 10 * i, "deltaY" in e && (s = e.deltaY), "deltaX" in e && (n = e.deltaX), (n || s) && e.deltaMode && (1 === e.deltaMode ? (n *= 40, s *= 40) : (n *= 800, s *= 800)), n && !t && (t = n < 1 ? -1 : 1), s && !i && (i = s < 1 ? -1 : 1), {
          spinX: t,
          spinY: i,
          pixelX: n,
          pixelY: s
        }
      },
      handle: function (e) {
        var t = e, n = this, s = n.params.mousewheel;
        t.originalEvent && (t = t.originalEvent);
        var a = 0, r = n.rtl ? -1 : 1, l = A.normalize(t);
        if (s.forceToAxis) if (n.isHorizontal()) {
          if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY))) return !0;
          a = l.pixelX * r
        } else {
          if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX))) return !0;
          a = l.pixelY
        } else a = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * r : -l.pixelY;
        if (0 === a) return !0;
        if (s.invert && (a = -a), n.params.freeMode) {
          var c = n.getTranslate() + a * s.sensitivity, u = n.isBeginning, d = n.isEnd;
          if (c >= n.minTranslate() && (c = n.minTranslate()), c <= n.maxTranslate() && (c = n.maxTranslate()), n.setTransition(0), n.setTranslate(c), n.updateProgress(), n.updateActiveIndex(), n.updateSlidesClasses(), (!u && n.isBeginning || !d && n.isEnd) && n.updateSlidesClasses(), n.params.freeModeSticky && (clearTimeout(n.mousewheel.timeout), n.mousewheel.timeout = o.nextTick(function () {
            n.slideReset()
          }, 300)), n.emit("scroll", t), n.params.autoplay && n.params.autoplayDisableOnInteraction && n.stopAutoplay(), 0 === c || c === n.maxTranslate()) return !0
        } else {
          if (o.now() - n.mousewheel.lastScrollTime > 60) if (a < 0) if (n.isEnd && !n.params.loop || n.animating) {
            if (s.releaseOnEdges) return !0
          } else n.slideNext(), n.emit("scroll", t); else if (n.isBeginning && !n.params.loop || n.animating) {
            if (s.releaseOnEdges) return !0
          } else n.slidePrev(), n.emit("scroll", t);
          n.mousewheel.lastScrollTime = (new i.Date).getTime()
        }
        return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
      },
      enable: function () {
        if (!A.event) return !1;
        if (this.mousewheel.enabled) return !1;
        var t = this.$el;
        return "container" !== this.params.mousewheel.eventsTarged && (t = e(this.params.mousewheel.eventsTarged)), t.on(A.event, this.mousewheel.handle), this.mousewheel.enabled = !0, !0
      },
      disable: function () {
        if (!A.event) return !1;
        if (!this.mousewheel.enabled) return !1;
        var t = this.$el;
        return "container" !== this.params.mousewheel.eventsTarged && (t = e(this.params.mousewheel.eventsTarged)), t.off(A.event, this.mousewheel.handle), this.mousewheel.enabled = !1, !0
      }
    }, D = {
      name: "mousewheel",
      params: {
        mousewheel: {
          enabled: !1,
          releaseOnEdges: !1,
          invert: !1,
          forceToAxis: !1,
          sensitivity: 1,
          eventsTarged: "container"
        }
      },
      create: function () {
        o.extend(this, {
          mousewheel: {
            enabled: !1,
            enable: A.enable.bind(this),
            disable: A.disable.bind(this),
            handle: A.handle.bind(this),
            lastScrollTime: o.now()
          }
        })
      },
      on: {
        init: function () {
          this.params.mousewheel.enabled && this.mousewheel.enable()
        }, destroy: function () {
          this.mousewheel.enabled && this.mousewheel.disable()
        }
      }
    }, $ = {
      update: function () {
        var e = this.params.navigation;
        if (!this.params.loop) {
          var t = this.navigation, i = t.$nextEl, n = t.$prevEl;
          n && n.length > 0 && (this.isBeginning ? n.addClass(e.disabledClass) : n.removeClass(e.disabledClass)), i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass))
        }
      }, init: function () {
        var t = this, i = t.params.navigation;
        if (i.nextEl || i.prevEl) {
          var n, s;
          i.nextEl && (n = e(i.nextEl), t.params.uniqueNavElements && "string" == typeof i.nextEl && n.length > 1 && 1 === t.$el.find(i.nextEl).length && (n = t.$el.find(i.nextEl))), i.prevEl && (s = e(i.prevEl), t.params.uniqueNavElements && "string" == typeof i.prevEl && s.length > 1 && 1 === t.$el.find(i.prevEl).length && (s = t.$el.find(i.prevEl))), n && n.length > 0 && n.on("click", function (e) {
            e.preventDefault(), t.isEnd && !t.params.loop || t.slideNext()
          }), s && s.length > 0 && s.on("click", function (e) {
            e.preventDefault(), t.isBeginning && !t.params.loop || t.slidePrev()
          }), o.extend(t.navigation, {$nextEl: n, nextEl: n && n[0], $prevEl: s, prevEl: s && s[0]})
        }
      }, destroy: function () {
        var e = this.navigation, t = e.$nextEl, i = e.$prevEl;
        t && t.length && (t.off("click"), t.removeClass(this.params.navigation.disabledClass)), i && i.length && (i.off("click"), i.removeClass(this.params.navigation.disabledClass))
      }
    }, O = {
      name: "navigation",
      params: {
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden"
        }
      },
      create: function () {
        o.extend(this, {
          navigation: {
            init: $.init.bind(this),
            update: $.update.bind(this),
            destroy: $.destroy.bind(this)
          }
        })
      },
      on: {
        init: function () {
          this.navigation.init(), this.navigation.update()
        }, toEdge: function () {
          this.navigation.update()
        }, fromEdge: function () {
          this.navigation.update()
        }, destroy: function () {
          this.navigation.destroy()
        }, click: function (t) {
          var i = this.navigation, n = i.$nextEl, s = i.$prevEl;
          !this.params.navigation.hideOnClick || e(t.target).is(s) || e(t.target).is(n) || (n && n.toggleClass(this.params.navigation.hiddenClass), s && s.toggleClass(this.params.navigation.hiddenClass))
        }
      }
    }, j = {
      update: function () {
        var t = this.rtl, i = this.params.pagination;
        if (i.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
          var n, s = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
            o = this.pagination.$el,
            a = this.params.loop ? Math.ceil((s - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;
          if (this.params.loop ? ((n = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > s - 1 - 2 * this.loopedSlides && (n -= s - 2 * this.loopedSlides), n > a - 1 && (n -= a), n < 0 && "bullets" !== this.params.paginationType && (n = a + n)) : n = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0, "bullets" === i.type && this.pagination.bullets && this.pagination.bullets.length > 0) {
            var r = this.pagination.bullets;
            if (i.dynamicBullets && (this.pagination.bulletSize = r.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0), o.css(this.isHorizontal() ? "width" : "height", 5 * this.pagination.bulletSize + "px")), r.removeClass(i.bulletActiveClass + " " + i.bulletActiveClass + "-next " + i.bulletActiveClass + "-next-next " + i.bulletActiveClass + "-prev " + i.bulletActiveClass + "-prev-prev"), o.length > 1) r.each(function (t, s) {
              var o = e(s);
              o.index() === n && (o.addClass(i.bulletActiveClass), i.dynamicBullets && (o.prev().addClass(i.bulletActiveClass + "-prev").prev().addClass(i.bulletActiveClass + "-prev-prev"), o.next().addClass(i.bulletActiveClass + "-next").next().addClass(i.bulletActiveClass + "-next-next")))
            }); else {
              var l = r.eq(n);
              l.addClass(i.bulletActiveClass), i.dynamicBullets && (l.prev().addClass(i.bulletActiveClass + "-prev").prev().addClass(i.bulletActiveClass + "-prev-prev"), l.next().addClass(i.bulletActiveClass + "-next").next().addClass(i.bulletActiveClass + "-next-next"))
            }
            if (i.dynamicBullets) {
              var c = Math.min(r.length, 5),
                u = (this.pagination.bulletSize * c - this.pagination.bulletSize) / 2 - n * this.pagination.bulletSize,
                d = t ? "right" : "left";
              r.css(this.isHorizontal() ? d : "top", u + "px")
            }
          }
          if ("fraction" === i.type && (o.find("." + i.currentClass).text(n + 1), o.find("." + i.totalClass).text(a)), "progressbar" === i.type) {
            var h = (n + 1) / a, p = h, f = 1;
            this.isHorizontal() || (f = h, p = 1), o.find("." + i.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + p + ") scaleY(" + f + ")").transition(this.params.speed)
          }
          "custom" === i.type && i.renderCustom ? (o.html(i.renderCustom(this, n + 1, a)), this.emit("paginationRender", this, o[0])) : this.emit("paginationUpdate", this, o[0])
        }
      }, render: function () {
        var e = this.params.pagination;
        if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
          var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
            i = this.pagination.$el, n = "";
          if ("bullets" === e.type) {
            for (var s = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, o = 0; o < s; o += 1) e.renderBullet ? n += e.renderBullet.call(this, o, e.bulletClass) : n += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">";
            i.html(n), this.pagination.bullets = i.find("." + e.bulletClass)
          }
          "fraction" === e.type && (n = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>', i.html(n)), "progressbar" === e.type && (n = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>', i.html(n)), "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0])
        }
      }, init: function () {
        var t = this, i = t.params.pagination;
        if (i.el) {
          var n = e(i.el);
          0 !== n.length && (t.params.uniqueNavElements && "string" == typeof i.el && n.length > 1 && 1 === t.$el.find(i.el).length && (n = t.$el.find(i.el)), "bullets" === i.type && i.clickable && n.addClass(i.clickableClass), n.addClass(i.modifierClass + i.type), "bullets" === i.type && i.dynamicBullets && n.addClass("" + i.modifierClass + i.type + "-dynamic"), i.clickable && n.on("click", "." + i.bulletClass, function (i) {
            i.preventDefault();
            var n = e(this).index() * t.params.slidesPerGroup;
            t.params.loop && (n += t.loopedSlides), t.slideTo(n)
          }), o.extend(t.pagination, {$el: n, el: n[0]}))
        }
      }, destroy: function () {
        var e = this.params.pagination;
        if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
          var t = this.pagination.$el;
          t.removeClass(e.hiddenClass), t.removeClass(e.modifierClass + e.type), this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && t.off("click", "." + e.bulletClass)
        }
      }
    }, B = {
      name: "pagination",
      params: {
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          type: "bullets",
          dynamicBullets: !1,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
          modifierClass: "swiper-pagination-",
          currentClass: "swiper-pagination-current",
          totalClass: "swiper-pagination-total",
          hiddenClass: "swiper-pagination-hidden",
          progressbarFillClass: "swiper-pagination-progressbar-fill",
          clickableClass: "swiper-pagination-clickable"
        }
      },
      create: function () {
        o.extend(this, {
          pagination: {
            init: j.init.bind(this),
            render: j.render.bind(this),
            update: j.update.bind(this),
            destroy: j.destroy.bind(this)
          }
        })
      },
      on: {
        init: function () {
          this.pagination.init(), this.pagination.render(), this.pagination.update()
        }, activeIndexChange: function () {
          this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
        }, snapIndexChange: function () {
          this.params.loop || this.pagination.update()
        }, slidesLengthChange: function () {
          this.params.loop && (this.pagination.render(), this.pagination.update())
        }, snapGridLengthChange: function () {
          this.params.loop || (this.pagination.render(), this.pagination.update())
        }, destroy: function () {
          this.pagination.destroy()
        }, click: function (t) {
          this.params.pagination.el && this.params.pagination.hideOnClick && this.pagination.$el.length > 0 && !e(t.target).hasClass(this.params.pagination.bulletClass) && this.pagination.$el.toggleClass(this.params.pagination.hiddenClass)
        }
      }
    }, F = {
      setTranslate: function () {
        if (this.params.scrollbar.el && this.scrollbar.el) {
          var e = this.scrollbar, t = this.rtl, i = this.progress, n = e.dragSize, s = e.trackSize, o = e.$dragEl,
            a = e.$el, l = this.params.scrollbar, c = n, u = (s - n) * i;
          t && this.isHorizontal() ? (u = -u) > 0 ? (c = n - u, u = 0) : -u + n > s && (c = s + u) : u < 0 ? (c = n + u, u = 0) : u + n > s && (c = s - u), this.isHorizontal() ? (r.transforms3d ? o.transform("translate3d(" + u + "px, 0, 0)") : o.transform("translateX(" + u + "px)"), o[0].style.width = c + "px") : (r.transforms3d ? o.transform("translate3d(0px, " + u + "px, 0)") : o.transform("translateY(" + u + "px)"), o[0].style.height = c + "px"), l.hide && (clearTimeout(this.scrollbar.timeout), a[0].style.opacity = 1, this.scrollbar.timeout = setTimeout(function () {
            a[0].style.opacity = 0, a.transition(400)
          }, 1e3))
        }
      }, setTransition: function (e) {
        this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
      }, updateSize: function () {
        if (this.params.scrollbar.el && this.scrollbar.el) {
          var e = this.scrollbar, t = e.$dragEl, i = e.$el;
          t[0].style.width = "", t[0].style.height = "";
          var n, s = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, a = this.size / this.virtualSize,
            r = a * (s / this.size);
          n = "auto" === this.params.scrollbar.dragSize ? s * a : parseInt(this.params.scrollbar.dragSize, 10), this.isHorizontal() ? t[0].style.width = n + "px" : t[0].style.height = n + "px", i[0].style.display = a >= 1 ? "none" : "", this.params.scrollbarHide && (i[0].style.opacity = 0), o.extend(e, {
            trackSize: s,
            divider: a,
            moveDivider: r,
            dragSize: n
          })
        }
      }, setDragPosition: function (e) {
        var t = this.scrollbar, i = t.$el, n = t.dragSize, s = t.moveDivider,
          o = (this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - i.offset()[this.isHorizontal() ? "left" : "top"] - n / 2,
          a = -this.minTranslate() * s, r = -this.maxTranslate() * s;
        o < a ? o = a : o > r && (o = r), this.rtl && (o = r - o), o = -o / s, this.updateProgress(o), this.setTranslate(o), this.updateActiveIndex(), this.updateSlidesClasses()
      }, onDragStart: function (e) {
        var t = this.params.scrollbar, i = this.scrollbar, n = this.$wrapperEl, s = i.$el, o = i.$dragEl;
        this.scrollbar.isTouched = !0, e.preventDefault(), e.stopPropagation(), n.transition(100), o.transition(100), i.setDragPosition(e), clearTimeout(this.scrollbar.dragTimeout), s.transition(0), t.hide && s.css("opacity", 1), this.emit("scrollbarDragStart", e)
      }, onDragMove: function (e) {
        var t = this.scrollbar, i = this.$wrapperEl, n = t.$el, s = t.$dragEl;
        this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), n.transition(0), s.transition(0), this.emit("scrollbarDragMove", e))
      }, onDragEnd: function (e) {
        var t = this.params.scrollbar, i = this.scrollbar.$el;
        this.scrollbar.isTouched && (this.scrollbar.isTouched = !1, t.hide && (clearTimeout(this.scrollbar.dragTimeout), this.scrollbar.dragTimeout = o.nextTick(function () {
          i.css("opacity", 0), i.transition(400)
        }, 1e3)), this.emit("scrollbarDragEnd", e), t.snapOnRelease && this.slideReset())
      }, enableDraggable: function () {
        if (this.params.scrollbar.el) {
          var t = this.scrollbar.$el, i = r.touch ? t[0] : document;
          t.on(this.scrollbar.dragEvents.start, this.scrollbar.onDragStart), e(i).on(this.scrollbar.dragEvents.move, this.scrollbar.onDragMove), e(i).on(this.scrollbar.dragEvents.end, this.scrollbar.onDragEnd)
        }
      }, disableDraggable: function () {
        if (this.params.scrollbar.el) {
          var t = this.scrollbar.$el, i = r.touch ? t[0] : document;
          t.off(this.scrollbar.dragEvents.start), e(i).off(this.scrollbar.dragEvents.move), e(i).off(this.scrollbar.dragEvents.end)
        }
      }, init: function () {
        if (this.params.scrollbar.el) {
          var t = this.scrollbar, i = this.$el, n = this.touchEvents, s = this.params.scrollbar, a = e(s.el);
          this.params.uniqueNavElements && "string" == typeof s.el && a.length > 1 && 1 === i.find(s.el).length && (a = i.find(s.el));
          var l = a.find(".swiper-scrollbar-drag");
          0 === l.length && (l = e('<div class="swiper-scrollbar-drag"></div>'), a.append(l)), this.scrollbar.dragEvents = !1 !== this.params.simulateTouch || r.touch ? n : {
            start: "mousedown",
            move: "mousemove",
            end: "mouseup"
          }, o.extend(t, {$el: a, el: a[0], $dragEl: l, dragEl: l[0]}), s.draggable && t.enableDraggable()
        }
      }, destroy: function () {
        this.scrollbar.disableDraggable()
      }
    }, H = {
      name: "scrollbar",
      params: {scrollbar: {el: null, dragSize: "auto", hide: !1, draggable: !1, snapOnRelease: !0}},
      create: function () {
        o.extend(this, {
          scrollbar: {
            init: F.init.bind(this),
            destroy: F.destroy.bind(this),
            updateSize: F.updateSize.bind(this),
            setTranslate: F.setTranslate.bind(this),
            setTransition: F.setTransition.bind(this),
            enableDraggable: F.enableDraggable.bind(this),
            disableDraggable: F.disableDraggable.bind(this),
            setDragPosition: F.setDragPosition.bind(this),
            onDragStart: F.onDragStart.bind(this),
            onDragMove: F.onDragMove.bind(this),
            onDragEnd: F.onDragEnd.bind(this),
            isTouched: !1,
            timeout: null,
            dragTimeout: null
          }
        })
      },
      on: {
        init: function () {
          this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate()
        }, update: function () {
          this.scrollbar.updateSize()
        }, resize: function () {
          this.scrollbar.updateSize()
        }, observerUpdate: function () {
          this.scrollbar.updateSize()
        }, setTranslate: function () {
          this.scrollbar.setTranslate()
        }, setTransition: function (e) {
          this.scrollbar.setTransition(e)
        }, destroy: function () {
          this.scrollbar.destroy()
        }
      }
    }, N = {
      setTransform: function (t, i) {
        var n = this.rtl, s = e(t), o = n ? -1 : 1, a = s.attr("data-swiper-parallax") || "0",
          r = s.attr("data-swiper-parallax-x"), l = s.attr("data-swiper-parallax-y"),
          c = s.attr("data-swiper-parallax-scale"), u = s.attr("data-swiper-parallax-opacity");
        if (r || l ? (r = r || "0", l = l || "0") : this.isHorizontal() ? (r = a, l = "0") : (l = a, r = "0"), r = r.indexOf("%") >= 0 ? parseInt(r, 10) * i * o + "%" : r * i * o + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * i + "%" : l * i + "px", void 0 !== u && null !== u) {
          var d = u - (u - 1) * (1 - Math.abs(i));
          s[0].style.opacity = d
        }
        if (void 0 === c || null === c) s.transform("translate3d(" + r + ", " + l + ", 0px)"); else {
          var h = c - (c - 1) * (1 - Math.abs(i));
          s.transform("translate3d(" + r + ", " + l + ", 0px) scale(" + h + ")")
        }
      }, setTranslate: function () {
        var t = this, i = t.$el, n = t.slides, s = t.progress, o = t.snapGrid;
        i.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (e, i) {
          t.parallax.setTransform(i, s)
        }), n.each(function (i, n) {
          var a = n.progress;
          t.params.slidesPerGroup > 1 && "auto" !== t.params.slidesPerView && (a += Math.ceil(i / 2) - s * (o.length - 1)), a = Math.min(Math.max(a, -1), 1), e(n).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (e, i) {
            t.parallax.setTransform(i, a)
          })
        })
      }, setTransition: function (t) {
        void 0 === t && (t = this.params.speed), this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (i, n) {
          var s = e(n), o = parseInt(s.attr("data-swiper-parallax-duration"), 10) || t;
          0 === t && (o = 0), s.transition(o)
        })
      }
    }, R = {
      name: "parallax", params: {parallax: {enabled: !1}}, create: function () {
        o.extend(this, {
          parallax: {
            setTransform: N.setTransform.bind(this),
            setTranslate: N.setTranslate.bind(this),
            setTransition: N.setTransition.bind(this)
          }
        })
      }, on: {
        beforeInit: function () {
          this.params.watchSlidesProgress = !0
        }, init: function () {
          this.params.parallax && this.parallax.setTranslate()
        }, setTranslate: function () {
          this.params.parallax && this.parallax.setTranslate()
        }, setTransition: function (e) {
          this.params.parallax && this.parallax.setTransition(e)
        }
      }
    }, q = {
      getDistanceBetweenTouches: function (e) {
        if (e.targetTouches.length < 2) return 1;
        var t = e.targetTouches[0].pageX, i = e.targetTouches[0].pageY, n = e.targetTouches[1].pageX,
          s = e.targetTouches[1].pageY;
        return Math.sqrt(Math.pow(n - t, 2) + Math.pow(s - i, 2))
      }, onGestureStart: function (t) {
        var i = this.params.zoom, n = this.zoom, s = n.gesture;
        if (n.fakeGestureTouched = !1, n.fakeGestureMoved = !1, !r.gestures) {
          if ("touchstart" !== t.type || "touchstart" === t.type && t.targetTouches.length < 2) return;
          n.fakeGestureTouched = !0, s.scaleStart = q.getDistanceBetweenTouches(t)
        }
        s.$slideEl && s.$slideEl.length || (s.$slideEl = e(this), 0 === s.$slideEl.length && (s.$slideEl = this.slides.eq(this.activeIndex)), s.$imageEl = s.$slideEl.find("img, svg, canvas"), s.$imageWrapEl = s.$imageEl.parent("." + i.containerClass), s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, 0 !== s.$imageWrapEl.length) ? (s.$imageEl.transition(0), this.zoom.isScaling = !0) : s.$imageEl = void 0
      }, onGestureChange: function (e) {
        var t = this.params.zoom, i = this.zoom, n = i.gesture;
        if (!r.gestures) {
          if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
          i.fakeGestureMoved = !0, n.scaleMove = q.getDistanceBetweenTouches(e)
        }
        n.$imageEl && 0 !== n.$imageEl.length && (r.gestures ? this.zoom.scale = e.scale * i.currentScale : i.scale = n.scaleMove / n.scaleStart * i.currentScale, i.scale > n.maxRatio && (i.scale = n.maxRatio - 1 + Math.pow(i.scale - n.maxRatio + 1, .5)), i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), n.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"))
      }, onGestureEnd: function (e) {
        var t = this.params.zoom, i = this.zoom, n = i.gesture;
        if (!r.gestures) {
          if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
          if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !v.android) return;
          i.fakeGestureTouched = !1, i.fakeGestureMoved = !1
        }
        n.$imageEl && 0 !== n.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, n.maxRatio), t.minRatio), n.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (n.$slideEl = void 0))
      }, onTouchStart: function (e) {
        var t = this.zoom, i = t.gesture, n = t.image;
        i.$imageEl && 0 !== i.$imageEl.length && (n.isTouched || (v.android && e.preventDefault(), n.isTouched = !0, n.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, n.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
      }, onTouchMove: function (e) {
        var t = this.zoom, i = t.gesture, n = t.image, s = t.velocity;
        if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1, n.isTouched && i.$slideEl)) {
          n.isMoved || (n.width = i.$imageEl[0].offsetWidth, n.height = i.$imageEl[0].offsetHeight, n.startX = o.getTranslate(i.$imageWrapEl[0], "x") || 0, n.startY = o.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), this.rtl && (n.startX = -n.startX), this.rtl && (n.startY = -n.startY));
          var a = n.width * t.scale, r = n.height * t.scale;
          if (!(a < i.slideWidth && r < i.slideHeight)) {
            if (n.minX = Math.min(i.slideWidth / 2 - a / 2, 0), n.maxX = -n.minX, n.minY = Math.min(i.slideHeight / 2 - r / 2, 0), n.maxY = -n.minY, n.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, n.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !n.isMoved && !t.isScaling) {
              if (this.isHorizontal() && (Math.floor(n.minX) === Math.floor(n.startX) && n.touchesCurrent.x < n.touchesStart.x || Math.floor(n.maxX) === Math.floor(n.startX) && n.touchesCurrent.x > n.touchesStart.x)) return void(n.isTouched = !1);
              if (!this.isHorizontal() && (Math.floor(n.minY) === Math.floor(n.startY) && n.touchesCurrent.y < n.touchesStart.y || Math.floor(n.maxY) === Math.floor(n.startY) && n.touchesCurrent.y > n.touchesStart.y)) return void(n.isTouched = !1)
            }
            e.preventDefault(), e.stopPropagation(), n.isMoved = !0, n.currentX = n.touchesCurrent.x - n.touchesStart.x + n.startX, n.currentY = n.touchesCurrent.y - n.touchesStart.y + n.startY, n.currentX < n.minX && (n.currentX = n.minX + 1 - Math.pow(n.minX - n.currentX + 1, .8)), n.currentX > n.maxX && (n.currentX = n.maxX - 1 + Math.pow(n.currentX - n.maxX + 1, .8)), n.currentY < n.minY && (n.currentY = n.minY + 1 - Math.pow(n.minY - n.currentY + 1, .8)), n.currentY > n.maxY && (n.currentY = n.maxY - 1 + Math.pow(n.currentY - n.maxY + 1, .8)), s.prevPositionX || (s.prevPositionX = n.touchesCurrent.x), s.prevPositionY || (s.prevPositionY = n.touchesCurrent.y), s.prevTime || (s.prevTime = Date.now()), s.x = (n.touchesCurrent.x - s.prevPositionX) / (Date.now() - s.prevTime) / 2, s.y = (n.touchesCurrent.y - s.prevPositionY) / (Date.now() - s.prevTime) / 2, Math.abs(n.touchesCurrent.x - s.prevPositionX) < 2 && (s.x = 0), Math.abs(n.touchesCurrent.y - s.prevPositionY) < 2 && (s.y = 0), s.prevPositionX = n.touchesCurrent.x, s.prevPositionY = n.touchesCurrent.y, s.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + n.currentX + "px, " + n.currentY + "px,0)")
          }
        }
      }, onTouchEnd: function () {
        var e = this.zoom, t = e.gesture, i = e.image, n = e.velocity;
        if (t.$imageEl && 0 !== t.$imageEl.length) {
          if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void(i.isMoved = !1);
          i.isTouched = !1, i.isMoved = !1;
          var s = 300, o = 300, a = n.x * s, r = i.currentX + a, l = n.y * o, c = i.currentY + l;
          0 !== n.x && (s = Math.abs((r - i.currentX) / n.x)), 0 !== n.y && (o = Math.abs((c - i.currentY) / n.y));
          var u = Math.max(s, o);
          i.currentX = r, i.currentY = c;
          var d = i.width * e.scale, h = i.height * e.scale;
          i.minX = Math.min(t.slideWidth / 2 - d / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - h / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(u).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
        }
      }, onTransitionEnd: function () {
        var e = this.zoom, t = e.gesture;
        t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0, e.scale = 1, e.currentScale = 1)
      }, toggle: function (e) {
        var t = this.zoom;
        t.scale && 1 !== t.scale ? t.out() : t.in(e)
      }, in: function (t) {
        var i = this.zoom, n = this.params.zoom, s = i.gesture, o = i.image;
        if (s.$slideEl || (s.$slideEl = this.clickedSlide ? e(this.clickedSlide) : this.slides.eq(this.activeIndex), s.$imageEl = s.$slideEl.find("img, svg, canvas"), s.$imageWrapEl = s.$imageEl.parent("." + n.containerClass)), s.$imageEl && 0 !== s.$imageEl.length) {
          s.$slideEl.addClass("" + n.zoomedSlideClass);
          var a, r, l, c, u, d, h, p, f, m, g, v, y, b, x, w;
          void 0 === o.touchesStart.x && t ? (a = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX, r = "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY) : (a = o.touchesStart.x, r = o.touchesStart.y), i.scale = s.$imageWrapEl.attr("data-swiper-zoom") || n.maxRatio, i.currentScale = s.$imageWrapEl.attr("data-swiper-zoom") || n.maxRatio, t ? (x = s.$slideEl[0].offsetWidth, w = s.$slideEl[0].offsetHeight, l = s.$slideEl.offset().left + x / 2 - a, c = s.$slideEl.offset().top + w / 2 - r, h = s.$imageEl[0].offsetWidth, p = s.$imageEl[0].offsetHeight, f = h * i.scale, m = p * i.scale, y = -(g = Math.min(x / 2 - f / 2, 0)), b = -(v = Math.min(w / 2 - m / 2, 0)), u = l * i.scale, d = c * i.scale, u < g && (u = g), u > y && (u = y), d < v && (d = v), d > b && (d = b)) : (u = 0, d = 0), s.$imageWrapEl.transition(300).transform("translate3d(" + u + "px, " + d + "px,0)"), s.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + i.scale + ")")
        }
      }, out: function () {
        var t = this.zoom, i = this.params.zoom, n = t.gesture;
        n.$slideEl || (n.$slideEl = this.clickedSlide ? e(this.clickedSlide) : this.slides.eq(this.activeIndex), n.$imageEl = n.$slideEl.find("img, svg, canvas"), n.$imageWrapEl = n.$imageEl.parent("." + i.containerClass)), n.$imageEl && 0 !== n.$imageEl.length && (t.scale = 1, t.currentScale = 1, n.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), n.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), n.$slideEl.removeClass("" + i.zoomedSlideClass), n.$slideEl = void 0)
      }, enable: function () {
        var t = this, i = t.zoom;
        if (!i.enabled) {
          i.enabled = !0;
          var n = t.slides,
            s = !("touchstart" !== t.touchEvents.start || !r.passiveListener || !t.params.passiveListeners) && {
              passive: !0,
              capture: !1
            };
          r.gestures ? (n.on("gesturestart", i.onGestureStart, s), n.on("gesturechange", i.onGestureChange, s), n.on("gestureend", i.onGestureEnd, s)) : "touchstart" === t.touchEvents.start && (n.on(t.touchEvents.start, i.onGestureStart, s), n.on(t.touchEvents.move, i.onGestureChange, s), n.on(t.touchEvents.end, i.onGestureEnd, s)), t.slides.each(function (n, s) {
            var o = e(s);
            o.find("." + t.params.zoom.containerClass).length > 0 && o.on(t.touchEvents.move, i.onTouchMove)
          })
        }
      }, disable: function () {
        var t = this, i = t.zoom;
        if (i.enabled) {
          t.zoom.enabled = !1;
          var n = t.slides,
            s = !("touchstart" !== t.touchEvents.start || !r.passiveListener || !t.params.passiveListeners) && {
              passive: !0,
              capture: !1
            };
          r.gestures ? (n.off("gesturestart", i.onGestureStart, s), n.off("gesturechange", i.onGestureChange, s), n.off("gestureend", i.onGestureEnd, s)) : "touchstart" === t.touchEvents.start && (n.off(t.touchEvents.start, i.onGestureStart, s), n.off(t.touchEvents.move, i.onGestureChange, s), n.off(t.touchEvents.end, i.onGestureEnd, s)), t.slides.each(function (n, s) {
            var o = e(s);
            o.find("." + t.params.zoom.containerClass).length > 0 && o.off(t.touchEvents.move, i.onTouchMove)
          })
        }
      }
    }, W = {
      name: "zoom",
      params: {
        zoom: {
          enabled: !1,
          maxRatio: 3,
          minRatio: 1,
          toggle: !0,
          containerClass: "swiper-zoom-container",
          zoomedSlideClass: "swiper-slide-zoomed"
        }
      },
      create: function () {
        var e = this, t = {
          enabled: !1,
          scale: 1,
          currentScale: 1,
          isScaling: !1,
          gesture: {
            $slideEl: void 0,
            slideWidth: void 0,
            slideHeight: void 0,
            $imageEl: void 0,
            $imageWrapEl: void 0,
            maxRatio: 3
          },
          image: {
            isTouched: void 0,
            isMoved: void 0,
            currentX: void 0,
            currentY: void 0,
            minX: void 0,
            minY: void 0,
            maxX: void 0,
            maxY: void 0,
            width: void 0,
            height: void 0,
            startX: void 0,
            startY: void 0,
            touchesStart: {},
            touchesCurrent: {}
          },
          velocity: {x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0}
        };
        "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function (i) {
          t[i] = q[i].bind(e)
        }), o.extend(e, {zoom: t})
      },
      on: {
        init: function () {
          this.params.zoom.enabled && this.zoom.enable()
        }, destroy: function () {
          this.zoom.disable()
        }, touchStart: function (e) {
          this.zoom.enabled && this.zoom.onTouchStart(e)
        }, touchEnd: function (e) {
          this.zoom.enabled && this.zoom.onTouchEnd(e)
        }, doubleTap: function (e) {
          this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
        }, transitionEnd: function () {
          this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
        }
      }
    }, X = {
      loadInSlide: function (t, i) {
        void 0 === i && (i = !0);
        var n = this, s = n.params.lazy;
        if (void 0 !== t && 0 !== n.slides.length) {
          var o = n.virtual && n.params.virtual.enabled ? n.$wrapperEl.children("." + n.params.slideClass + '[data-swiper-slide-index="' + t + '"]') : n.slides.eq(t),
            a = o.find("." + s.elementClass + ":not(." + s.loadedClass + "):not(." + s.loadingClass + ")");
          !o.hasClass(s.elementClass) || o.hasClass(s.loadedClass) || o.hasClass(s.loadingClass) || (a = a.add(o[0])), 0 !== a.length && a.each(function (t, a) {
            var r = e(a);
            r.addClass(s.loadingClass);
            var l = r.attr("data-background"), c = r.attr("data-src"), u = r.attr("data-srcset"),
              d = r.attr("data-sizes");
            n.loadImage(r[0], c || l, u, d, !1, function () {
              if (void 0 !== n && null !== n && n && (!n || n.params) && !n.destroyed) {
                if (l ? (r.css("background-image", 'url("' + l + '")'), r.removeAttr("data-background")) : (u && (r.attr("srcset", u), r.removeAttr("data-srcset")), d && (r.attr("sizes", d), r.removeAttr("data-sizes")), c && (r.attr("src", c), r.removeAttr("data-src"))), r.addClass(s.loadedClass).removeClass(s.loadingClass), o.find("." + s.preloaderClass).remove(), n.params.loop && i) {
                  var e = o.attr("data-swiper-slide-index");
                  if (o.hasClass(n.params.slideDuplicateClass)) {
                    var t = n.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + n.params.slideDuplicateClass + ")");
                    n.lazy.loadInSlide(t.index(), !1)
                  } else {
                    var a = n.$wrapperEl.children("." + n.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                    n.lazy.loadInSlide(a.index(), !1)
                  }
                }
                n.emit("lazyImageReady", o[0], r[0])
              }
            }), n.emit("lazyImageLoad", o[0], r[0])
          })
        }
      }, load: function () {
        function t(e) {
          if (l) {
            if (s.children("." + o.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
          } else if (a[e]) return !0;
          return !1
        }

        function i(t) {
          return l ? e(t).attr("data-swiper-slide-index") : e(t).index()
        }

        var n = this, s = n.$wrapperEl, o = n.params, a = n.slides, r = n.activeIndex, l = n.virtual && o.virtual.enabled,
          c = o.lazy, u = o.slidesPerView;
        if ("auto" === u && (u = 0), n.lazy.initialImageLoaded || (n.lazy.initialImageLoaded = !0), n.params.watchSlidesVisibility) s.children("." + o.slideVisibleClass).each(function (t, i) {
          var s = l ? e(i).attr("data-swiper-slide-index") : e(i).index();
          n.lazy.loadInSlide(s)
        }); else if (u > 1) for (var d = r; d < r + u; d += 1) t(d) && n.lazy.loadInSlide(d); else n.lazy.loadInSlide(r);
        if (c.loadPrevNext) if (u > 1 || c.loadPrevNextAmount && c.loadPrevNextAmount > 1) {
          for (var h = c.loadPrevNextAmount, p = u, f = Math.min(r + p + Math.max(h, p), a.length), m = Math.max(r - Math.max(p, h), 0), g = r + u; g < f; g += 1) t(g) && n.lazy.loadInSlide(g);
          for (var v = m; v < r; v += 1) t(v) && n.lazy.loadInSlide(v)
        } else {
          var y = s.children("." + o.slideNextClass);
          y.length > 0 && n.lazy.loadInSlide(i(y));
          var b = s.children("." + o.slidePrevClass);
          b.length > 0 && n.lazy.loadInSlide(i(b))
        }
      }
    }, Y = {
      name: "lazy",
      params: {
        lazy: {
          enabled: !1,
          loadPrevNext: !1,
          loadPrevNextAmount: 1,
          loadOnTransitionStart: !1,
          elementClass: "swiper-lazy",
          loadingClass: "swiper-lazy-loading",
          loadedClass: "swiper-lazy-loaded",
          preloaderClass: "swiper-lazy-preloader"
        }
      },
      create: function () {
        o.extend(this, {lazy: {initialImageLoaded: !1, load: X.load.bind(this), loadInSlide: X.loadInSlide.bind(this)}})
      },
      on: {
        beforeInit: function () {
          this.params.preloadImages && (this.params.preloadImages = !1)
        }, init: function () {
          this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
        }, scroll: function () {
          this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
        }, resize: function () {
          this.params.lazy.enabled && this.lazy.load()
        }, scrollbarDragMove: function () {
          this.params.lazy.enabled && this.lazy.load()
        }, transitionStart: function () {
          this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load()
        }, transitionEnd: function () {
          this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
        }
      }
    }, V = {
      LinearSpline: function (e, t) {
        var i = function () {
          var e, t, i;
          return function (n, s) {
            for (t = -1, e = n.length; e - t > 1;) n[i = e + t >> 1] <= s ? t = i : e = i;
            return e
          }
        }();
        this.x = e, this.y = t, this.lastIndex = e.length - 1;
        var n, s;
        return this.interpolate = function (e) {
          return e ? (s = i(this.x, e), n = s - 1, (e - this.x[n]) * (this.y[s] - this.y[n]) / (this.x[s] - this.x[n]) + this.y[n]) : 0
        }, this
      }, getInterpolateFunction: function (e) {
        this.controller.spline || (this.controller.spline = this.params.loop ? new V.LinearSpline(this.slidesGrid, e.slidesGrid) : new V.LinearSpline(this.snapGrid, e.snapGrid))
      }, setTranslate: function (e, t) {
        function i(e) {
          var t = e.rtl && "horizontal" === e.params.direction ? -o.translate : o.translate;
          "slide" === o.params.controller.by && (o.controller.getInterpolateFunction(e), s = -o.controller.spline.interpolate(-t)), s && "container" !== o.params.controller.by || (n = (e.maxTranslate() - e.minTranslate()) / (o.maxTranslate() - o.minTranslate()), s = (t - o.minTranslate()) * n + e.minTranslate()), o.params.controller.inverse && (s = e.maxTranslate() - s), e.updateProgress(s), e.setTranslate(s, o), e.updateActiveIndex(), e.updateSlidesClasses()
        }

        var n, s, o = this, a = o.controller.control;
        if (Array.isArray(a)) for (var r = 0; r < a.length; r += 1) a[r] !== t && a[r] instanceof S && i(a[r]); else a instanceof S && t !== a && i(a)
      }, setTransition: function (e, t) {
        function i(t) {
          t.setTransition(e, s), 0 !== e && (t.transitionStart(), t.$wrapperEl.transitionEnd(function () {
            o && (t.params.loop && "slide" === s.params.controller.by && t.loopFix(), t.transitionEnd())
          }))
        }

        var n, s = this, o = s.controller.control;
        if (Array.isArray(o)) for (n = 0; n < o.length; n += 1) o[n] !== t && o[n] instanceof S && i(o[n]); else o instanceof S && t !== o && i(o)
      }
    }, G = {
      name: "controller", params: {controller: {control: void 0, inverse: !1, by: "slide"}}, create: function () {
        o.extend(this, {
          controller: {
            control: this.params.controller.control,
            getInterpolateFunction: V.getInterpolateFunction.bind(this),
            setTranslate: V.setTranslate.bind(this),
            setTransition: V.setTransition.bind(this)
          }
        })
      }, on: {
        update: function () {
          this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
        }, resize: function () {
          this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
        }, observerUpdate: function () {
          this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
        }, setTranslate: function (e, t) {
          this.controller.control && this.controller.setTranslate(e, t)
        }, setTransition: function (e, t) {
          this.controller.control && this.controller.setTransition(e, t)
        }
      }
    }, U = {
      makeElFocusable: function (e) {
        return e.attr("tabIndex", "0"), e
      }, addElRole: function (e, t) {
        return e.attr("role", t), e
      }, addElLabel: function (e, t) {
        return e.attr("aria-label", t), e
      }, disableEl: function (e) {
        return e.attr("aria-disabled", !0), e
      }, enableEl: function (e) {
        return e.attr("aria-disabled", !1), e
      }, onEnterKey: function (t) {
        var i = this.params.a11y;
        if (13 === t.keyCode) {
          var n = e(t.target);
          this.navigation && this.navigation.$nextEl && n.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(), this.isEnd ? this.a11y.notify(i.lastSlideMessage) : this.a11y.notify(i.nextSlideMessage)), this.navigation && this.navigation.$prevEl && n.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(), this.isBeginning ? this.a11y.notify(i.firstSlideMessage) : this.a11y.notify(i.prevSlideMessage)), this.pagination && n.is("." + this.params.pagination.bulletClass) && n[0].click()
        }
      }, notify: function (e) {
        var t = this.a11y.liveRegion;
        0 !== t.length && (t.html(""), t.html(e))
      }, updateNavigation: function () {
        if (!this.params.loop) {
          var e = this.navigation, t = e.$nextEl, i = e.$prevEl;
          i && i.length > 0 && (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)), t && t.length > 0 && (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t))
        }
      }, updatePagination: function () {
        var t = this, i = t.params.a11y;
        t.pagination && t.params.pagination.clickable && t.pagination.bullets && t.pagination.bullets.length && t.pagination.bullets.each(function (n, s) {
          var o = e(s);
          t.a11y.makeElFocusable(o), t.a11y.addElRole(o, "button"), t.a11y.addElLabel(o, i.paginationBulletMessage.replace(/{{index}}/, o.index() + 1))
        })
      }, init: function () {
        this.$el.append(this.a11y.liveRegion);
        var e, t, i = this.params.a11y;
        this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && (this.a11y.makeElFocusable(e), this.a11y.addElRole(e, "button"), this.a11y.addElLabel(e, i.nextSlideMessage), e.on("keydown", this.a11y.onEnterKey)), t && (this.a11y.makeElFocusable(t), this.a11y.addElRole(t, "button"), this.a11y.addElLabel(t, i.prevSlideMessage), t.on("keydown", this.a11y.onEnterKey)), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
      }, destroy: function () {
        this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove();
        var e, t;
        this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && e.off("keydown", this.a11y.onEnterKey), t && t.off("keydown", this.a11y.onEnterKey), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
      }
    }, Q = {
      name: "a11y",
      params: {
        a11y: {
          enabled: !1,
          notificationClass: "swiper-notification",
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}"
        }
      },
      create: function () {
        var t = this;
        o.extend(t, {a11y: {liveRegion: e('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')}}), Object.keys(U).forEach(function (e) {
          t.a11y[e] = U[e].bind(t)
        })
      },
      on: {
        init: function () {
          this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
        }, toEdge: function () {
          this.params.a11y.enabled && this.a11y.updateNavigation()
        }, fromEdge: function () {
          this.params.a11y.enabled && this.a11y.updateNavigation()
        }, paginationUpdate: function () {
          this.params.a11y.enabled && this.a11y.updatePagination()
        }, destroy: function () {
          this.params.a11y.enabled && this.a11y.destroy()
        }
      }
    }, K = {
      init: function () {
        if (this.params.history) {
          if (!i.history || !i.history.pushState) return this.params.history.enabled = !1, void(this.params.hashNavigation.enabled = !0);
          var e = this.history;
          e.initialized = !0, e.paths = K.getPathValues(), (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit), this.params.history.replaceState || i.addEventListener("popstate", this.history.setHistoryPopState))
        }
      }, destroy: function () {
        this.params.history.replaceState || i.removeEventListener("popstate", this.history.setHistoryPopState)
      }, setHistoryPopState: function () {
        this.history.paths = K.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
      }, getPathValues: function () {
        var e = i.location.pathname.slice(1).split("/"), t = e.length;
        return {key: e[t - 2], value: e[t - 1]}
      }, setHistory: function (e, t) {
        if (this.history.initialized && this.params.history.enabled) {
          var n = this.slides.eq(t), s = K.slugify(n.attr("data-history"));
          i.location.pathname.includes(e) || (s = e + "/" + s);
          var o = i.history.state;
          o && o.value === s || (this.params.history.replaceState ? i.history.replaceState({value: s}, null, s) : i.history.pushState({value: s}, null, s))
        }
      }, slugify: function (e) {
        return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
      }, scrollToSlide: function (e, t, i) {
        if (t) for (var n = 0, s = this.slides.length; n < s; n += 1) {
          var o = this.slides.eq(n);
          if (K.slugify(o.attr("data-history")) === t && !o.hasClass(this.params.slideDuplicateClass)) {
            var a = o.index();
            this.slideTo(a, e, i)
          }
        } else this.slideTo(0, e, i)
      }
    }, Z = {
      name: "history", params: {history: {enabled: !1, replaceState: !1, key: "slides"}}, create: function () {
        o.extend(this, {
          history: {
            init: K.init.bind(this),
            setHistory: K.setHistory.bind(this),
            setHistoryPopState: K.setHistoryPopState.bind(this),
            scrollToSlide: K.scrollToSlide.bind(this)
          }
        })
      }, on: {
        init: function () {
          this.params.history.enabled && this.history.init()
        }, destroy: function () {
          this.params.history.enabled && this.history.destroy()
        }, transitionEnd: function () {
          this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
        }
      }
    }, J = {
      onHashCange: function () {
        var e = a.location.hash.replace("#", "");
        e !== this.slides.eq(this.activeIndex).attr("data-hash") && this.slideTo(this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + e + '"]').index())
      }, setHash: function () {
        if (this.hashNavigation.initialized && this.params.hashNavigation.enabled) if (this.params.hashNavigation.replaceState && i.history && i.history.replaceState) i.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || ""); else {
          var e = this.slides.eq(this.activeIndex), t = e.attr("data-hash") || e.attr("data-history");
          a.location.hash = t || ""
        }
      }, init: function () {
        if (!(!this.params.hashNavigation.enabled || this.params.history && this.params.history.enabled)) {
          this.hashNavigation.initialized = !0;
          var t = a.location.hash.replace("#", "");
          if (t) for (var n = 0, s = this.slides.length; n < s; n += 1) {
            var o = this.slides.eq(n);
            if ((o.attr("data-hash") || o.attr("data-history")) === t && !o.hasClass(this.params.slideDuplicateClass)) {
              var r = o.index();
              this.slideTo(r, 0, this.params.runCallbacksOnInit, !0)
            }
          }
          this.params.hashNavigation.watchState && e(i).on("hashchange", this.hashNavigation.onHashCange)
        }
      }, destroy: function () {
        this.params.hashNavigation.watchState && e(i).off("hashchange", this.hashNavigation.onHashCange)
      }
    }, ee = {
      name: "hash-navigation",
      params: {hashNavigation: {enabled: !1, replaceState: !1, watchState: !1}},
      create: function () {
        o.extend(this, {
          hashNavigation: {
            initialized: !1,
            init: J.init.bind(this),
            destroy: J.destroy.bind(this),
            setHash: J.setHash.bind(this),
            onHashCange: J.onHashCange.bind(this)
          }
        })
      },
      on: {
        init: function () {
          this.params.hashNavigation.enabled && this.hashNavigation.init()
        }, destroy: function () {
          this.params.hashNavigation.enabled && this.hashNavigation.destroy()
        }, transitionEnd: function () {
          this.hashNavigation.initialized && this.hashNavigation.setHash()
        }
      }
    }, te = {
      run: function () {
        var e = this, t = e.slides.eq(e.activeIndex), i = e.params.autoplay.delay;
        t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), e.autoplay.timeout = o.nextTick(function () {
          e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"))
        }, i)
      }, start: function () {
        return void 0 === this.autoplay.timeout && !this.autoplay.running && (this.autoplay.running = !0, this.emit("autoplayStart"), this.autoplay.run(), !0)
      }, stop: function () {
        return !!this.autoplay.running && void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), this.autoplay.timeout = void 0), this.autoplay.running = !1, this.emit("autoplayStop"), !0)
      }, pause: function (e) {
        var t = this;
        t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 === e ? (t.autoplay.paused = !1, t.autoplay.run()) : t.$wrapperEl.transitionEnd(function () {
          t && !t.destroyed && (t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
        })))
      }
    }, ie = {
      name: "autoplay",
      params: {autoplay: {enabled: !1, delay: 3e3, disableOnInteraction: !0, stopOnLastSlide: !1}},
      create: function () {
        o.extend(this, {
          autoplay: {
            running: !1,
            paused: !1,
            run: te.run.bind(this),
            start: te.start.bind(this),
            stop: te.stop.bind(this),
            pause: te.pause.bind(this)
          }
        })
      },
      on: {
        init: function () {
          this.params.autoplay.enabled && this.autoplay.start()
        }, beforeTransitionStart: function (e, t) {
          this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
        }, sliderFirstMove: function () {
          this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
        }, destroy: function () {
          this.autoplay.running && this.autoplay.stop()
        }
      }
    }, ne = {
      setTranslate: function () {
        for (var e = this.slides, t = 0; t < e.length; t += 1) {
          var i = this.slides.eq(t), n = -i[0].swiperSlideOffset;
          this.params.virtualTranslate || (n -= this.translate);
          var s = 0;
          this.isHorizontal() || (s = n, n = 0);
          var o = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
          i.css({opacity: o}).transform("translate3d(" + n + "px, " + s + "px, 0px)")
        }
      }, setTransition: function (e) {
        var t = this, i = t.slides, n = t.$wrapperEl;
        if (i.transition(e), t.params.virtualTranslate && 0 !== e) {
          var s = !1;
          i.transitionEnd(function () {
            if (!s && t && !t.destroyed) {
              s = !0, t.animating = !1;
              for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) n.trigger(e[i])
            }
          })
        }
      }
    }, se = {
      name: "effect-fade", params: {fadeEffect: {crossFade: !1}}, create: function () {
        o.extend(this, {
          fadeEffect: {
            setTranslate: ne.setTranslate.bind(this),
            setTransition: ne.setTransition.bind(this)
          }
        })
      }, on: {
        beforeInit: function () {
          if ("fade" === this.params.effect) {
            this.classNames.push(this.params.containerModifierClass + "fade");
            var e = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !0
            };
            o.extend(this.params, e), o.extend(this.originalParams, e)
          }
        }, setTranslate: function () {
          "fade" === this.params.effect && this.fadeEffect.setTranslate()
        }, setTransition: function (e) {
          "fade" === this.params.effect && this.fadeEffect.setTransition(e)
        }
      }
    }, oe = {
      setTranslate: function () {
        var t, i = this.$el, n = this.$wrapperEl, s = this.slides, o = this.width, a = this.height, r = this.rtl,
          l = this.size, c = this.params.cubeEffect, u = this.isHorizontal(),
          d = this.virtual && this.params.virtual.enabled, p = 0;
        c.shadow && (u ? (0 === (t = n.find(".swiper-cube-shadow")).length && (t = e('<div class="swiper-cube-shadow"></div>'), n.append(t)), t.css({height: o + "px"})) : 0 === (t = i.find(".swiper-cube-shadow")).length && (t = e('<div class="swiper-cube-shadow"></div>'), i.append(t)));
        for (var f = 0; f < s.length; f += 1) {
          var m = s.eq(f), g = f;
          d && (g = parseInt(m.attr("data-swiper-slide-index"), 10));
          var v = 90 * g, y = Math.floor(v / 360);
          r && (v = -v, y = Math.floor(-v / 360));
          var b = Math.max(Math.min(m[0].progress, 1), -1), x = 0, w = 0, S = 0;
          g % 4 == 0 ? (x = 4 * -y * l, S = 0) : (g - 1) % 4 == 0 ? (x = 0, S = 4 * -y * l) : (g - 2) % 4 == 0 ? (x = l + 4 * y * l, S = l) : (g - 3) % 4 == 0 && (x = -l, S = 3 * l + 4 * l * y), r && (x = -x), u || (w = x, x = 0);
          var C = "rotateX(" + (u ? 0 : -v) + "deg) rotateY(" + (u ? v : 0) + "deg) translate3d(" + x + "px, " + w + "px, " + S + "px)";
          if (b <= 1 && b > -1 && (p = 90 * g + 90 * b, r && (p = 90 * -g - 90 * b)), m.transform(C), c.slideShadows) {
            var T = u ? m.find(".swiper-slide-shadow-left") : m.find(".swiper-slide-shadow-top"),
              E = u ? m.find(".swiper-slide-shadow-right") : m.find(".swiper-slide-shadow-bottom");
            0 === T.length && (T = e('<div class="swiper-slide-shadow-' + (u ? "left" : "top") + '"></div>'), m.append(T)), 0 === E.length && (E = e('<div class="swiper-slide-shadow-' + (u ? "right" : "bottom") + '"></div>'), m.append(E)), T.length && (T[0].style.opacity = Math.max(-b, 0)), E.length && (E[0].style.opacity = Math.max(b, 0))
          }
        }
        if (n.css({
          "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
          "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
          "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
          "transform-origin": "50% 50% -" + l / 2 + "px"
        }), c.shadow) if (u) t.transform("translate3d(0px, " + (o / 2 + c.shadowOffset) + "px, " + -o / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + c.shadowScale + ")"); else {
          var k = Math.abs(p) - 90 * Math.floor(Math.abs(p) / 90),
            _ = 1.5 - (Math.sin(2 * k * Math.PI / 360) / 2 + Math.cos(2 * k * Math.PI / 360) / 2), M = c.shadowScale,
            P = c.shadowScale / _, I = c.shadowOffset;
          t.transform("scale3d(" + M + ", 1, " + P + ") translate3d(0px, " + (a / 2 + I) + "px, " + -a / 2 / P + "px) rotateX(-90deg)")
        }
        var L = h.isSafari || h.isUiWebView ? -l / 2 : 0;
        n.transform("translate3d(0px,0," + L + "px) rotateX(" + (this.isHorizontal() ? 0 : p) + "deg) rotateY(" + (this.isHorizontal() ? -p : 0) + "deg)")
      }, setTransition: function (e) {
        var t = this.$el;
        this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
      }
    }, ae = {
      name: "effect-cube",
      params: {cubeEffect: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94}},
      create: function () {
        o.extend(this, {
          cubeEffect: {
            setTranslate: oe.setTranslate.bind(this),
            setTransition: oe.setTransition.bind(this)
          }
        })
      },
      on: {
        beforeInit: function () {
          if ("cube" === this.params.effect) {
            this.classNames.push(this.params.containerModifierClass + "cube"), this.classNames.push(this.params.containerModifierClass + "3d");
            var e = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              resistanceRatio: 0,
              spaceBetween: 0,
              centeredSlides: !1,
              virtualTranslate: !0
            };
            o.extend(this.params, e), o.extend(this.originalParams, e)
          }
        }, setTranslate: function () {
          "cube" === this.params.effect && this.cubeEffect.setTranslate()
        }, setTransition: function (e) {
          "cube" === this.params.effect && this.cubeEffect.setTransition(e)
        }
      }
    }, re = {
      setTranslate: function () {
        for (var t = this.slides, i = 0; i < t.length; i += 1) {
          var n = t.eq(i), s = n[0].progress;
          this.params.flipEffect.limitRotation && (s = Math.max(Math.min(n[0].progress, 1), -1));
          var o = -180 * s, a = 0, r = -n[0].swiperSlideOffset, l = 0;
          if (this.isHorizontal() ? this.rtl && (o = -o) : (l = r, r = 0, a = -o, o = 0), n[0].style.zIndex = -Math.abs(Math.round(s)) + t.length, this.params.flipEffect.slideShadows) {
            var c = this.isHorizontal() ? n.find(".swiper-slide-shadow-left") : n.find(".swiper-slide-shadow-top"),
              u = this.isHorizontal() ? n.find(".swiper-slide-shadow-right") : n.find(".swiper-slide-shadow-bottom");
            0 === c.length && (c = e('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'), n.append(c)), 0 === u.length && (u = e('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'), n.append(u)), c.length && (c[0].style.opacity = Math.max(-s, 0)), u.length && (u[0].style.opacity = Math.max(s, 0))
          }
          n.transform("translate3d(" + r + "px, " + l + "px, 0px) rotateX(" + a + "deg) rotateY(" + o + "deg)")
        }
      }, setTransition: function (e) {
        var t = this, i = t.slides, n = t.activeIndex, s = t.$wrapperEl;
        if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
          var o = !1;
          i.eq(n).transitionEnd(function () {
            if (!o && t && !t.destroyed) {
              o = !0, t.animating = !1;
              for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) s.trigger(e[i])
            }
          })
        }
      }
    }, le = {
      name: "effect-flip", params: {flipEffect: {slideShadows: !0, limitRotation: !0}}, create: function () {
        o.extend(this, {
          flipEffect: {
            setTranslate: re.setTranslate.bind(this),
            setTransition: re.setTransition.bind(this)
          }
        })
      }, on: {
        beforeInit: function () {
          if ("flip" === this.params.effect) {
            this.classNames.push(this.params.containerModifierClass + "flip"), this.classNames.push(this.params.containerModifierClass + "3d");
            var e = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !0
            };
            o.extend(this.params, e), o.extend(this.originalParams, e)
          }
        }, setTranslate: function () {
          "flip" === this.params.effect && this.flipEffect.setTranslate()
        }, setTransition: function (e) {
          "flip" === this.params.effect && this.flipEffect.setTransition(e)
        }
      }
    }, ce = {
      setTranslate: function () {
        for (var t = this.width, i = this.height, n = this.slides, s = this.$wrapperEl, o = this.slidesSizesGrid, a = this.params.coverflowEffect, r = this.isHorizontal(), l = this.translate, c = r ? t / 2 - l : i / 2 - l, u = r ? a.rotate : -a.rotate, d = a.depth, p = 0, f = n.length; p < f; p += 1) {
          var m = n.eq(p), g = o[p], v = (c - m[0].swiperSlideOffset - g / 2) / g * a.modifier, y = r ? u * v : 0,
            b = r ? 0 : u * v, x = -d * Math.abs(v), w = r ? 0 : a.stretch * v, S = r ? a.stretch * v : 0;
          Math.abs(S) < .001 && (S = 0), Math.abs(w) < .001 && (w = 0), Math.abs(x) < .001 && (x = 0), Math.abs(y) < .001 && (y = 0), Math.abs(b) < .001 && (b = 0);
          var C = "translate3d(" + S + "px," + w + "px," + x + "px)  rotateX(" + b + "deg) rotateY(" + y + "deg)";
          if (m.transform(C), m[0].style.zIndex = 1 - Math.abs(Math.round(v)), a.slideShadows) {
            var T = r ? m.find(".swiper-slide-shadow-left") : m.find(".swiper-slide-shadow-top"),
              E = r ? m.find(".swiper-slide-shadow-right") : m.find(".swiper-slide-shadow-bottom");
            0 === T.length && (T = e('<div class="swiper-slide-shadow-' + (r ? "left" : "top") + '"></div>'), m.append(T)), 0 === E.length && (E = e('<div class="swiper-slide-shadow-' + (r ? "right" : "bottom") + '"></div>'), m.append(E)), T.length && (T[0].style.opacity = v > 0 ? v : 0), E.length && (E[0].style.opacity = -v > 0 ? -v : 0)
          }
        }
        h.ie && (s[0].style.perspectiveOrigin = c + "px 50%")
      }, setTransition: function (e) {
        this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
      }
    }, ue = {
      name: "effect-coverflow",
      params: {coverflowEffect: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0}},
      create: function () {
        o.extend(this, {
          coverflowEffect: {
            setTranslate: ce.setTranslate.bind(this),
            setTransition: ce.setTransition.bind(this)
          }
        })
      },
      on: {
        beforeInit: function () {
          "coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"), this.classNames.push(this.params.containerModifierClass + "3d"), this.params.watchSlidesProgress = !0)
        }, setTranslate: function () {
          "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
        }, setTransition: function (e) {
          "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
        }
      }
    };
  return S.components = [C, T, E, k, M, I, z, D, O, B, H, R, W, Y, G, Q, Z, ee, ie, se, ae, le, ue], S
}), function (e, t, i, n) {
  "use strict";

  function s(e) {
    var t = i(e.currentTarget), n = e.data ? e.data.options : {}, s = t.attr("data-fancybox") || "", o = 0, a = [];
    e.isDefaultPrevented() || (e.preventDefault(), s ? (a = n.selector ? i(n.selector) : e.data ? e.data.items : [], a = a.length ? a.filter('[data-fancybox="' + s + '"]') : i('[data-fancybox="' + s + '"]'), (o = a.index(t)) < 0 && (o = 0)) : a = [t], i.fancybox.open(a, n, o))
  }

  if (i) {
    if (i.fn.fancybox) return void("console" in e && console.log("fancyBox already initialized"));
    var o = {
        loop: !1,
        margin: [44, 0],
        gutter: 50,
        keyboard: !0,
        arrows: !0,
        infobar: !0,
        toolbar: !0,
        buttons: ["slideShow", "fullScreen", "thumbs", "share", "close"],
        idleTime: 3,
        smallBtn: "auto",
        protect: !1,
        modal: !1,
        image: {preload: "auto"},
        ajax: {settings: {data: {fancybox: !0}}},
        iframe: {
          tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
          preload: !0,
          css: {},
          attr: {scrolling: "auto"}
        },
        defaultType: "image",
        animationEffect: "zoom",
        animationDuration: 500,
        zoomOpacity: "auto",
        transitionEffect: "fade",
        transitionDuration: 366,
        slideClass: "",
        baseClass: "",
        baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>',
        spinnerTpl: '<div class="fancybox-loading"></div>',
        errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>',
        btnTpl: {
          download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}"><svg viewBox="0 0 40 40"><path d="M20,23 L20,8 L20,23 L13,16 L20,23 L27,16 L20,23 M9,28 L31,28" /></svg></a>',
          close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30" /></svg></button>',
          smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>',
          arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 L10,20 L18,28 L10,20 L18,12 L10,20"></path></svg></button>',
          arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><svg viewBox="0 0 40 40"><path d="M30,20 L10,20 L30,20 L22,28 L30,20 L22,12 L30,20"></path></svg></button>'
        },
        parentEl: "body",
        autoFocus: !1,
        backFocus: !0,
        trapFocus: !0,
        fullScreen: {autoStart: !1},
        touch: {vertical: !0, momentum: !0},
        hash: null,
        media: {},
        slideShow: {autoStart: !1, speed: 4e3},
        thumbs: {autoStart: !1, hideOnClose: !0, parentEl: ".fancybox-container"},
        onInit: i.noop,
        beforeLoad: i.noop,
        afterLoad: i.noop,
        beforeShow: i.noop,
        afterShow: i.noop,
        beforeClose: i.noop,
        afterClose: i.noop,
        onActivate: i.noop,
        onDeactivate: i.noop,
        clickContent: function (e, t) {
          return "image" === e.type && "zoom"
        },
        clickSlide: "close",
        clickOutside: "close",
        dblclickContent: !1,
        dblclickSlide: !1,
        dblclickOutside: !1,
        mobile: {
          margin: 0, clickContent: function (e, t) {
            return "image" === e.type && "toggleControls"
          }, clickSlide: function (e, t) {
            return "image" === e.type ? "toggleControls" : "close"
          }, dblclickContent: function (e, t) {
            return "image" === e.type && "zoom"
          }, dblclickSlide: function (e, t) {
            return "image" === e.type && "zoom"
          }
        },
        lang: "en",
        i18n: {
          en: {
            CLOSE: "Close",
            NEXT: "Next",
            PREV: "Previous",
            ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
            PLAY_START: "Start slideshow",
            PLAY_STOP: "Pause slideshow",
            FULL_SCREEN: "Full screen",
            THUMBS: "Thumbnails",
            DOWNLOAD: "Download",
            SHARE: "Share"
          },
          de: {
            CLOSE: "Schliessen",
            NEXT: "Weiter",
            PREV: "Zurück",
            ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
            PLAY_START: "Diaschau starten",
            PLAY_STOP: "Diaschau beenden",
            FULL_SCREEN: "Vollbild",
            THUMBS: "Vorschaubilder",
            DOWNLOAD: "Herunterladen",
            SHARE: "Teilen"
          }
        }
      }, a = i(e), r = i(t), l = 0,
      c = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || function (t) {
        return e.setTimeout(t, 1e3 / 60)
      }, u = function () {
        var e, i = t.createElement("fakeelement"), s = {
          transition: "transitionend",
          OTransition: "oTransitionEnd",
          MozTransition: "transitionend",
          WebkitTransition: "webkitTransitionEnd"
        };
        for (e in s) if (i.style[e] !== n) return s[e]
      }(), d = function (e) {
        return e && e.length && e[0].offsetHeight
      }, h = function (e, n, s) {
        this.opts = i.extend(!0, {index: s}, o, n || {}), i.fancybox.isMobile && (this.opts = i.extend(!0, {}, this.opts, this.opts.mobile)), n && i.isArray(n.buttons) && (this.opts.buttons = n.buttons), this.id = this.opts.id || ++l, this.group = [], this.currIndex = parseInt(this.opts.index, 10) || 0, this.prevIndex = null, this.prevPos = null, this.currPos = 0, this.firstRun = null, this.createGroup(e), this.group.length && (this.$lastFocus = i(t.activeElement).blur(), this.slides = {}, this.init())
      };
    i.extend(h.prototype, {
      init: function () {
        var s, o, a, l = this, c = l.group[l.currIndex], u = c.opts, d = i.fancybox.scrollbarWidth;
        l.scrollTop = r.scrollTop(), l.scrollLeft = r.scrollLeft(), i.fancybox.getInstance() || (i("body").addClass("fancybox-active"), /iPad|iPhone|iPod/.test(navigator.userAgent) && !e.MSStream ? "image" !== c.type && i("body").css("top", -1 * i("body").scrollTop()).addClass("fancybox-iosfix") : !i.fancybox.isMobile && t.body.scrollHeight > e.innerHeight && (d === n && (s = i('<div style="width:50px;height:50px;overflow:scroll;" />').appendTo("body"), d = i.fancybox.scrollbarWidth = s[0].offsetWidth - s[0].clientWidth, s.remove()), i("head").append('<style id="fancybox-style-noscroll">.compensate-for-scrollbar { margin-right: ' + d + "px; }</style>"), i("body").addClass("compensate-for-scrollbar"))), a = "", i.each(u.buttons, function (e, t) {
          a += u.btnTpl[t] || ""
        }), o = i(l.translate(l, u.baseTpl.replace("{{buttons}}", a).replace("{{arrows}}", u.btnTpl.arrowLeft + u.btnTpl.arrowRight))).attr("id", "fancybox-container-" + l.id).addClass("fancybox-is-hidden").addClass(u.baseClass).data("FancyBox", l).appendTo(u.parentEl), l.$refs = {container: o}, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function (e) {
          l.$refs[e] = o.find(".fancybox-" + e)
        }), l.trigger("onInit"), l.activate(), l.jumpTo(l.currIndex)
      }, translate: function (e, t) {
        var i = e.opts.i18n[e.opts.lang];
        return t.replace(/\{\{(\w+)\}\}/g, function (e, t) {
          var s = i[t];
          return s === n ? e : s
        })
      }, createGroup: function (e) {
        var t = this, s = i.makeArray(e);
        i.each(s, function (e, s) {
          var o, a, r, l, c = {}, u = {};
          i.isPlainObject(s) ? (c = s, u = s.opts || s) : "object" === i.type(s) && i(s).length ? (o = i(s), u = o.data(), u = i.extend({}, u, u.options || {}), u.$orig = o, c.src = u.src || o.attr("href"), c.type || c.src || (c.type = "inline", c.src = s)) : c = {
            type: "html",
            src: s + ""
          }, c.opts = i.extend(!0, {}, t.opts, u), i.isArray(u.buttons) && (c.opts.buttons = u.buttons), a = c.type || c.opts.type, r = c.src || "", !a && r && (r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? a = "image" : r.match(/\.(pdf)((\?|#).*)?$/i) ? a = "pdf" : "#" === r.charAt(0) && (a = "inline")), a ? c.type = a : t.trigger("objectNeedsType", c), c.index = t.group.length, c.opts.$orig && !c.opts.$orig.length && delete c.opts.$orig, !c.opts.$thumb && c.opts.$orig && (c.opts.$thumb = c.opts.$orig.find("img:first")), c.opts.$thumb && !c.opts.$thumb.length && delete c.opts.$thumb, "function" === i.type(t.opts.caption) && (c.opts.caption = t.opts.caption.apply(s, [t, c])), c.opts.caption instanceof i || (c.opts.caption = c.opts.caption === n ? "" : c.opts.caption + ""), "ajax" === a && (l = r.split(/\s+/, 2)).length > 1 && (c.src = l.shift(), c.opts.filter = l.shift()), "auto" == c.opts.smallBtn && (i.inArray(a, ["html", "inline", "ajax"]) > -1 ? (c.opts.toolbar = !1, c.opts.smallBtn = !0) : c.opts.smallBtn = !1), "pdf" === a && (c.type = "iframe", c.opts.iframe.preload = !1), c.opts.modal && (c.opts = i.extend(!0, c.opts, {
            infobar: 0,
            toolbar: 0,
            smallBtn: 0,
            keyboard: 0,
            slideShow: 0,
            fullScreen: 0,
            thumbs: 0,
            touch: 0,
            clickContent: !1,
            clickSlide: !1,
            clickOutside: !1,
            dblclickContent: !1,
            dblclickSlide: !1,
            dblclickOutside: !1
          })), t.group.push(c)
        })
      }, addEvents: function () {
        var n = this;
        n.removeEvents(), n.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (e) {
          e.stopPropagation(), e.preventDefault(), n.close(e)
        }).on("click.fb-prev touchend.fb-prev", "[data-fancybox-prev]", function (e) {
          e.stopPropagation(), e.preventDefault(), n.previous()
        }).on("click.fb-next touchend.fb-next", "[data-fancybox-next]", function (e) {
          e.stopPropagation(), e.preventDefault(), n.next()
        }), a.on("orientationchange.fb resize.fb", function (e) {
          e && e.originalEvent && "resize" === e.originalEvent.type ? c(function () {
            n.update()
          }) : (n.$refs.stage.hide(), setTimeout(function () {
            n.$refs.stage.show(), n.update()
          }, 600))
        }), r.on("focusin.fb", function (e) {
          var s = i.fancybox ? i.fancybox.getInstance() : null;
          s.isClosing || !s.current || !s.current.opts.trapFocus || i(e.target).hasClass("fancybox-container") || i(e.target).is(t) || s && "fixed" !== i(e.target).css("position") && !s.$refs.container.has(e.target).length && (e.stopPropagation(), s.focus(), a.scrollTop(n.scrollTop).scrollLeft(n.scrollLeft))
        }), r.on("keydown.fb", function (e) {
          var t = n.current, s = e.keyCode || e.which;
          if (t && t.opts.keyboard && !i(e.target).is("input") && !i(e.target).is("textarea")) return 8 === s || 27 === s ? (e.preventDefault(), void n.close(e)) : 37 === s || 38 === s ? (e.preventDefault(), void n.previous()) : 39 === s || 40 === s ? (e.preventDefault(), void n.next()) : void n.trigger("afterKeydown", e, s)
        }), n.group[n.currIndex].opts.idleTime && (n.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function (e) {
          n.idleSecondsCounter = 0, n.isIdle && n.showControls(), n.isIdle = !1
        }), n.idleInterval = e.setInterval(function () {
          n.idleSecondsCounter++, n.idleSecondsCounter >= n.group[n.currIndex].opts.idleTime && (n.isIdle = !0, n.idleSecondsCounter = 0, n.hideControls())
        }, 1e3))
      }, removeEvents: function () {
        a.off("orientationchange.fb resize.fb"), r.off("focusin.fb keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), this.idleInterval && (e.clearInterval(this.idleInterval), this.idleInterval = null)
      }, previous: function (e) {
        return this.jumpTo(this.currPos - 1, e)
      }, next: function (e) {
        return this.jumpTo(this.currPos + 1, e)
      }, jumpTo: function (e, t, s) {
        var o, a, r, l, c, u, h, p = this, f = p.group.length;
        if (!(p.isSliding || p.isClosing || p.isAnimating && p.firstRun)) {
          if (e = parseInt(e, 10), !(a = p.current ? p.current.opts.loop : p.opts.loop) && (e < 0 || e >= f)) return !1;
          if (o = p.firstRun = null === p.firstRun, !(f < 2 && !o && p.isSliding)) {
            if (l = p.current, p.prevIndex = p.currIndex, p.prevPos = p.currPos, r = p.createSlide(e), f > 1 && ((a || r.index > 0) && p.createSlide(e - 1), (a || r.index < f - 1) && p.createSlide(e + 1)), p.current = r, p.currIndex = r.index, p.currPos = r.pos, p.trigger("beforeShow", o), p.updateControls(), u = i.fancybox.getTranslate(r.$slide), r.isMoved = (0 !== u.left || 0 !== u.top) && !r.$slide.hasClass("fancybox-animated"), r.forcedDuration = n, i.isNumeric(t) ? r.forcedDuration = t : t = r.opts[o ? "animationDuration" : "transitionDuration"], t = parseInt(t, 10), o) return r.opts.animationEffect && t && p.$refs.container.css("transition-duration", t + "ms"), p.$refs.container.removeClass("fancybox-is-hidden"), d(p.$refs.container), p.$refs.container.addClass("fancybox-is-open"), r.$slide.addClass("fancybox-slide--current"), p.loadSlide(r), void p.preload();
            i.each(p.slides, function (e, t) {
              i.fancybox.stop(t.$slide)
            }), r.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"), r.isMoved ? (c = Math.round(r.$slide.width()), i.each(p.slides, function (e, n) {
              var s = n.pos - r.pos;
              i.fancybox.animate(n.$slide, {top: 0, left: s * c + s * n.opts.gutter}, t, function () {
                n.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"), n.pos === p.currPos && (r.isMoved = !1, p.complete())
              })
            })) : p.$refs.stage.children().removeAttr("style"), r.isLoaded ? p.revealContent(r) : p.loadSlide(r), p.preload(), l.pos !== r.pos && (h = "fancybox-slide--" + (l.pos > r.pos ? "next" : "previous"), l.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"), l.isComplete = !1, t && (r.isMoved || r.opts.transitionEffect) && (r.isMoved ? l.$slide.addClass(h) : (h = "fancybox-animated " + h + " fancybox-fx-" + r.opts.transitionEffect, i.fancybox.animate(l.$slide, h, t, function () {
              l.$slide.removeClass(h).removeAttr("style")
            }))))
          }
        }
      }, createSlide: function (e) {
        var t, n;
        return n = e % this.group.length, n = n < 0 ? this.group.length + n : n, !this.slides[e] && this.group[n] && (t = i('<div class="fancybox-slide"></div>').appendTo(this.$refs.stage), this.slides[e] = i.extend(!0, {}, this.group[n], {
          pos: e,
          $slide: t,
          isLoaded: !1
        }), this.updateSlide(this.slides[e])), this.slides[e]
      }, scaleToActual: function (e, t, s) {
        var o, a, r, l, c, u = this, d = u.current, h = d.$content, p = parseInt(d.$slide.width(), 10),
          f = parseInt(d.$slide.height(), 10), m = d.width, g = d.height;
        "image" != d.type || d.hasError || !h || u.isAnimating || (i.fancybox.stop(h), u.isAnimating = !0, e = e === n ? .5 * p : e, t = t === n ? .5 * f : t, o = i.fancybox.getTranslate(h), l = m / o.width, c = g / o.height, a = .5 * p - .5 * m, r = .5 * f - .5 * g, m > p && ((a = o.left * l - (e * l - e)) > 0 && (a = 0), a < p - m && (a = p - m)), g > f && ((r = o.top * c - (t * c - t)) > 0 && (r = 0), r < f - g && (r = f - g)), u.updateCursor(m, g), i.fancybox.animate(h, {
          top: r,
          left: a,
          scaleX: l,
          scaleY: c
        }, s || 330, function () {
          u.isAnimating = !1
        }), u.SlideShow && u.SlideShow.isActive && u.SlideShow.stop())
      }, scaleToFit: function (e) {
        var t, n = this, s = n.current, o = s.$content;
        "image" != s.type || s.hasError || !o || n.isAnimating || (i.fancybox.stop(o), n.isAnimating = !0, t = n.getFitPos(s), n.updateCursor(t.width, t.height), i.fancybox.animate(o, {
          top: t.top,
          left: t.left,
          scaleX: t.width / o.width(),
          scaleY: t.height / o.height()
        }, e || 330, function () {
          n.isAnimating = !1
        }))
      }, getFitPos: function (e) {
        var t, n, s, o, a, r = e.$content, l = e.width, c = e.height, u = e.opts.margin;
        return !(!r || !r.length || !l && !c) && ("number" === i.type(u) && (u = [u, u]), 2 == u.length && (u = [u[0], u[1], u[0], u[1]]), t = parseInt(this.$refs.stage.width(), 10) - (u[1] + u[3]), n = parseInt(this.$refs.stage.height(), 10) - (u[0] + u[2]), s = Math.min(1, t / l, n / c), o = Math.floor(s * l), a = Math.floor(s * c), {
          top: Math.floor(.5 * (n - a)) + u[0],
          left: Math.floor(.5 * (t - o)) + u[3],
          width: o,
          height: a
        })
      }, update: function () {
        var e = this;
        i.each(e.slides, function (t, i) {
          e.updateSlide(i)
        })
      }, updateSlide: function (e) {
        var t = e.$content;
        t && (e.width || e.height) && (i.fancybox.stop(t), i.fancybox.setTranslate(t, this.getFitPos(e)), e.pos === this.currPos && this.updateCursor()), e.$slide.trigger("refresh"), this.trigger("onUpdate", e)
      }, updateCursor: function (e, t) {
        var i = this.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");
        this.current && !this.isClosing && (this.isZoomable() ? (i.addClass("fancybox-is-zoomable"), (e !== n && t !== n ? e < this.current.width && t < this.current.height : this.isScaledDown()) ? i.addClass("fancybox-can-zoomIn") : this.current.opts.touch ? i.addClass("fancybox-can-drag") : i.addClass("fancybox-can-zoomOut")) : this.current.opts.touch && i.addClass("fancybox-can-drag"))
      }, isZoomable: function () {
        var e, t = this.current;
        if (t && !this.isClosing) return !!("image" === t.type && t.isLoaded && !t.hasError && ("zoom" === t.opts.clickContent || i.isFunction(t.opts.clickContent) && "zoom" === t.opts.clickContent(t)) && (e = this.getFitPos(t), t.width > e.width || t.height > e.height))
      }, isScaledDown: function () {
        var e = this.current, t = e.$content, n = !1;
        return t && (n = i.fancybox.getTranslate(t), n = n.width < e.width || n.height < e.height), n
      }, canPan: function () {
        var e = this.current, t = e.$content, i = !1;
        return t && (i = this.getFitPos(e), i = Math.abs(t.width() - i.width) > 1 || Math.abs(t.height() - i.height) > 1), i
      }, loadSlide: function (e) {
        var t, n, s, o = this;
        if (!e.isLoading && !e.isLoaded) {
          switch (e.isLoading = !0, o.trigger("beforeLoad", e), t = e.type, (n = e.$slide).off("refresh").trigger("onReset").addClass("fancybox-slide--" + (t || "unknown")).addClass(e.opts.slideClass), t) {
            case"image":
              o.setImage(e);
              break;
            case"iframe":
              o.setIframe(e);
              break;
            case"html":
              o.setContent(e, e.src || e.content);
              break;
            case"inline":
              i(e.src).length ? o.setContent(e, i(e.src)) : o.setError(e);
              break;
            case"ajax":
              o.showLoading(e), s = i.ajax(i.extend({}, e.opts.ajax.settings, {
                url: e.src, success: function (t, i) {
                  "success" === i && o.setContent(e, t)
                }, error: function (t, i) {
                  t && "abort" !== i && o.setError(e)
                }
              })), n.one("onReset", function () {
                s.abort()
              });
              break;
            default:
              o.setError(e)
          }
          return !0
        }
      }, setImage: function (t) {
        var n, s, o, a, r = this, l = t.opts.srcset || t.opts.image.srcset;
        if (l) {
          o = e.devicePixelRatio || 1, a = e.innerWidth * o, (s = l.split(",").map(function (e) {
            var t = {};
            return e.trim().split(/\s+/).forEach(function (e, i) {
              var n = parseInt(e.substring(0, e.length - 1), 10);
              return 0 === i ? t.url = e : void(n && (t.value = n, t.postfix = e[e.length - 1]))
            }), t
          })).sort(function (e, t) {
            return e.value - t.value
          });
          for (var c = 0; c < s.length; c++) {
            var u = s[c];
            if ("w" === u.postfix && u.value >= a || "x" === u.postfix && u.value >= o) {
              n = u;
              break
            }
          }
          !n && s.length && (n = s[s.length - 1]), n && (t.src = n.url, t.width && t.height && "w" == n.postfix && (t.height = t.width / t.height * n.value, t.width = n.value))
        }
        t.$content = i('<div class="fancybox-image-wrap"></div>').addClass("fancybox-is-hidden").appendTo(t.$slide), !1 !== t.opts.preload && t.opts.width && t.opts.height && (t.opts.thumb || t.opts.$thumb) ? (t.width = t.opts.width, t.height = t.opts.height, t.$ghost = i("<img />").one("error", function () {
          i(this).remove(), t.$ghost = null, r.setBigImage(t)
        }).one("load", function () {
          r.afterLoad(t), r.setBigImage(t)
        }).addClass("fancybox-image").appendTo(t.$content).attr("src", t.opts.thumb || t.opts.$thumb.attr("src"))) : r.setBigImage(t)
      }, setBigImage: function (e) {
        var t = this, n = i("<img />");
        e.$image = n.one("error", function () {
          t.setError(e)
        }).one("load", function () {
          clearTimeout(e.timouts), e.timouts = null, t.isClosing || (e.width = this.naturalWidth, e.height = this.naturalHeight, e.opts.image.srcset && n.attr("sizes", "100vw").attr("srcset", e.opts.image.srcset), t.hideLoading(e), e.$ghost ? e.timouts = setTimeout(function () {
            e.timouts = null, e.$ghost.hide()
          }, Math.min(300, Math.max(1e3, e.height / 1600))) : t.afterLoad(e))
        }).addClass("fancybox-image").attr("src", e.src).appendTo(e.$content), (n[0].complete || "complete" == n[0].readyState) && n[0].naturalWidth && n[0].naturalHeight ? n.trigger("load") : n[0].error ? n.trigger("error") : e.timouts = setTimeout(function () {
          n[0].complete || e.hasError || t.showLoading(e)
        }, 100)
      }, setIframe: function (e) {
        var t, s = this, o = e.opts.iframe, a = e.$slide;
        e.$content = i('<div class="fancybox-content' + (o.preload ? " fancybox-is-hidden" : "") + '"></div>').css(o.css).appendTo(a), t = i(o.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(o.attr).appendTo(e.$content), o.preload ? (s.showLoading(e), t.on("load.fb error.fb", function (t) {
          this.isReady = 1, e.$slide.trigger("refresh"), s.afterLoad(e)
        }), a.on("refresh.fb", function () {
          var i, s, a = e.$content, r = o.css.width, l = o.css.height;
          if (1 === t[0].isReady) {
            try {
              s = t.contents().find("body")
            } catch (e) {
            }
            s && s.length && (r === n && (i = t[0].contentWindow.document.documentElement.scrollWidth, r = Math.ceil(s.outerWidth(!0) + (a.width() - i)), r += a.outerWidth() - a.innerWidth()), l === n && (l = Math.ceil(s.outerHeight(!0)), l += a.outerHeight() - a.innerHeight()), r && a.width(r), l && a.height(l)), a.removeClass("fancybox-is-hidden")
          }
        })) : this.afterLoad(e), t.attr("src", e.src), !0 === e.opts.smallBtn && e.$content.prepend(s.translate(e, e.opts.btnTpl.smallBtn)), a.one("onReset", function () {
          try {
            i(this).find("iframe").hide().attr("src", "//about:blank")
          } catch (e) {
          }
          i(this).empty(), e.isLoaded = !1
        })
      }, setContent: function (e, t) {
        this.isClosing || (this.hideLoading(e), e.$slide.empty(), function (e) {
          return e && e.hasOwnProperty && e instanceof i
        }(t) && t.parent().length ? (t.parent(".fancybox-slide--inline").trigger("onReset"), e.$placeholder = i("<div></div>").hide().insertAfter(t), t.css("display", "inline-block")) : e.hasError || ("string" === i.type(t) && 3 === (t = i("<div>").append(i.trim(t)).contents())[0].nodeType && (t = i("<div>").html(t)), e.opts.filter && (t = i("<div>").html(t).find(e.opts.filter))), e.$slide.one("onReset", function () {
          e.$placeholder && (e.$placeholder.after(t.hide()).remove(), e.$placeholder = null), e.$smallBtn && (e.$smallBtn.remove(), e.$smallBtn = null), e.hasError || (i(this).empty(), e.isLoaded = !1)
        }), e.$content = i(t).appendTo(e.$slide), this.afterLoad(e))
      }, setError: function (e) {
        e.hasError = !0, e.$slide.removeClass("fancybox-slide--" + e.type), this.setContent(e, this.translate(e, e.opts.errorTpl))
      }, showLoading: function (e) {
        (e = e || this.current) && !e.$spinner && (e.$spinner = i(this.opts.spinnerTpl).appendTo(e.$slide))
      }, hideLoading: function (e) {
        (e = e || this.current) && e.$spinner && (e.$spinner.remove(), delete e.$spinner)
      }, afterLoad: function (e) {
        this.isClosing || (e.isLoading = !1, e.isLoaded = !0, this.trigger("afterLoad", e), this.hideLoading(e), e.opts.smallBtn && !e.$smallBtn && (e.$smallBtn = i(this.translate(e, e.opts.btnTpl.smallBtn)).appendTo(e.$content.filter("div,form").first())), e.opts.protect && e.$content && !e.hasError && (e.$content.on("contextmenu.fb", function (e) {
          return 2 == e.button && e.preventDefault(), !0
        }), "image" === e.type && i('<div class="fancybox-spaceball"></div>').appendTo(e.$content)), this.revealContent(e))
      }, revealContent: function (e) {
        var t, s, o, a, r, l = this, c = e.$slide, u = !1;
        return t = e.opts[l.firstRun ? "animationEffect" : "transitionEffect"], o = e.opts[l.firstRun ? "animationDuration" : "transitionDuration"], o = parseInt(e.forcedDuration === n ? o : e.forcedDuration, 10), !e.isMoved && e.pos === l.currPos && o || (t = !1), "zoom" !== t || e.pos === l.currPos && o && "image" === e.type && !e.hasError && (u = l.getThumbPos(e)) || (t = "fade"), "zoom" === t ? (r = l.getFitPos(e), r.scaleX = r.width / u.width, r.scaleY = r.height / u.height, delete r.width, delete r.height, "auto" == (a = e.opts.zoomOpacity) && (a = Math.abs(e.width / e.height - u.width / u.height) > .1), a && (u.opacity = .1, r.opacity = 1), i.fancybox.setTranslate(e.$content.removeClass("fancybox-is-hidden"), u), d(e.$content), void i.fancybox.animate(e.$content, r, o, function () {
          l.complete()
        })) : (l.updateSlide(e), t ? (i.fancybox.stop(c), s = "fancybox-animated fancybox-slide--" + (e.pos >= l.prevPos ? "next" : "previous") + " fancybox-fx-" + t, c.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(s), e.$content.removeClass("fancybox-is-hidden"), d(c), void i.fancybox.animate(c, "fancybox-slide--current", o, function (t) {
          c.removeClass(s).removeAttr("style"), e.pos === l.currPos && l.complete()
        }, !0)) : (d(c), e.$content.removeClass("fancybox-is-hidden"), void(e.pos === l.currPos && l.complete())))
      }, getThumbPos: function (n) {
        var s, o = !1, a = n.opts.$thumb, r = a ? a.offset() : 0;
        return r && a[0].ownerDocument === t && function (t) {
          for (var n = t[0], s = n.getBoundingClientRect(), o = []; null !== n.parentElement;) "hidden" !== i(n.parentElement).css("overflow") && "auto" !== i(n.parentElement).css("overflow") || o.push(n.parentElement.getBoundingClientRect()), n = n.parentElement;
          return o.every(function (e) {
            var t = Math.min(s.right, e.right) - Math.max(s.left, e.left),
              i = Math.min(s.bottom, e.bottom) - Math.max(s.top, e.top);
            return t > 0 && i > 0
          }) && s.bottom > 0 && s.right > 0 && s.left < i(e).width() && s.top < i(e).height()
        }(a) && (s = this.$refs.stage.offset(), o = {
          top: r.top - s.top + parseFloat(a.css("border-top-width") || 0),
          left: r.left - s.left + parseFloat(a.css("border-left-width") || 0),
          width: a.width(),
          height: a.height(),
          scaleX: 1,
          scaleY: 1
        }), o
      }, complete: function () {
        var e = this, n = e.current, s = {};
        n.isMoved || !n.isLoaded || n.isComplete || (n.isComplete = !0, n.$slide.siblings().trigger("onReset"), d(n.$slide), n.$slide.addClass("fancybox-slide--complete"), i.each(e.slides, function (t, n) {
          n.pos >= e.currPos - 1 && n.pos <= e.currPos + 1 ? s[n.pos] = n : n && (i.fancybox.stop(n.$slide), n.$slide.off().remove())
        }), e.slides = s, e.updateCursor(), e.trigger("afterShow"), (i(t.activeElement).is("[disabled]") || n.opts.autoFocus && "image" != n.type && "iframe" !== n.type) && e.focus())
      }, preload: function () {
        var e, t;
        this.group.length < 2 || (e = this.slides[this.currPos + 1], t = this.slides[this.currPos - 1], e && "image" === e.type && this.loadSlide(e), t && "image" === t.type && this.loadSlide(t))
      }, focus: function () {
        var e, t = this.current;
        this.isClosing || (t && t.isComplete && ((e = t.$slide.find("input[autofocus]:enabled:visible:first")).length || (e = t.$slide.find("button,:input,[tabindex],a").filter(":enabled:visible:first"))), (e = e && e.length ? e : this.$refs.container).focus())
      }, activate: function () {
        var e = this;
        i(".fancybox-container").each(function () {
          var t = i(this).data("FancyBox");
          t && t.id !== e.id && !t.isClosing && (t.trigger("onDeactivate"), t.removeEvents(), t.isVisible = !1)
        }), e.isVisible = !0, (e.current || e.isIdle) && (e.update(), e.updateControls()), e.trigger("onActivate"), e.addEvents()
      }, close: function (e, t) {
        var n, s, o, a, r, l, d = this, h = d.current, p = function () {
          d.cleanUp(e)
        };
        return !(d.isClosing || (d.isClosing = !0, !1 === d.trigger("beforeClose", e) ? (d.isClosing = !1, c(function () {
          d.update()
        }), 1) : (d.removeEvents(), h.timouts && clearTimeout(h.timouts), o = h.$content, n = h.opts.animationEffect, s = i.isNumeric(t) ? t : n ? h.opts.animationDuration : 0, h.$slide.off(u).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), h.$slide.siblings().trigger("onReset").remove(), s && d.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"), d.hideLoading(h), d.hideControls(), d.updateCursor(), "zoom" !== n || !0 !== e && o && s && "image" === h.type && !h.hasError && (l = d.getThumbPos(h)) || (n = "fade"), "zoom" === n ? (i.fancybox.stop(o), r = i.fancybox.getTranslate(o), r.width = r.width * r.scaleX, r.height = r.height * r.scaleY, "auto" == (a = h.opts.zoomOpacity) && (a = Math.abs(h.width / h.height - l.width / l.height) > .1), a && (l.opacity = 0), r.scaleX = r.width / l.width, r.scaleY = r.height / l.height, r.width = l.width, r.height = l.height, i.fancybox.setTranslate(h.$content, r), i.fancybox.animate(h.$content, l, s, p), 0) : (n && s ? !0 === e ? setTimeout(p, s) : i.fancybox.animate(h.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + n, s, p) : p(), 0))))
      }, cleanUp: function (e) {
        var n, s, o = i("body");
        this.current.$slide.trigger("onReset"), this.$refs.container.empty().remove(), this.trigger("afterClose", e), this.$lastFocus && this.current.opts.backFocus && this.$lastFocus.focus(), this.current = null, (n = i.fancybox.getInstance()) ? n.activate() : (a.scrollTop(this.scrollTop).scrollLeft(this.scrollLeft), o.removeClass("fancybox-active compensate-for-scrollbar"), o.hasClass("fancybox-iosfix") && (s = parseInt(t.body.style.top, 10), o.removeClass("fancybox-iosfix").css("top", "").scrollTop(-1 * s)), i("#fancybox-style-noscroll").remove())
      }, trigger: function (e, t) {
        var n, s = Array.prototype.slice.call(arguments, 1), o = t && t.opts ? t : this.current;
        return o ? s.unshift(o) : o = this, s.unshift(this), i.isFunction(o.opts[e]) && (n = o.opts[e].apply(o, s)), !1 === n ? n : void("afterClose" !== e && this.$refs ? this.$refs.container.trigger(e + ".fb", s) : r.trigger(e + ".fb", s))
      }, updateControls: function (e) {
        var t = this.current, i = t.index, n = t.opts.caption, s = this.$refs.container, o = this.$refs.caption;
        t.$slide.trigger("refresh"), this.$caption = n && n.length ? o.html(n) : null, this.isHiddenControls || this.isIdle || this.showControls(), s.find("[data-fancybox-count]").html(this.group.length), s.find("[data-fancybox-index]").html(i + 1), s.find("[data-fancybox-prev]").prop("disabled", !t.opts.loop && i <= 0), s.find("[data-fancybox-next]").prop("disabled", !t.opts.loop && i >= this.group.length - 1), "image" === t.type ? s.find("[data-fancybox-download]").attr("href", t.opts.image.src || t.src) : s.find("[data-fancybox-download]").hide()
      }, hideControls: function () {
        this.isHiddenControls = !0, this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")
      }, showControls: function () {
        var e = this.current ? this.current.opts : this.opts, t = this.$refs.container;
        this.isHiddenControls = !1, this.idleSecondsCounter = 0, t.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && this.group.length > 1)).toggleClass("fancybox-show-nav", !!(e.arrows && this.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal), this.$caption ? t.addClass("fancybox-show-caption ") : t.removeClass("fancybox-show-caption")
      }, toggleControls: function () {
        this.isHiddenControls ? this.showControls() : this.hideControls()
      }
    }), i.fancybox = {
      version: "3.2.1",
      defaults: o,
      getInstance: function (e) {
        var t = i('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
          n = Array.prototype.slice.call(arguments, 1);
        return t instanceof h && ("string" === i.type(e) ? t[e].apply(t, n) : "function" === i.type(e) && e.apply(t, n), t)
      },
      open: function (e, t, i) {
        return new h(e, t, i)
      },
      close: function (e) {
        var t = this.getInstance();
        t && (t.close(), !0 === e && this.close())
      },
      destroy: function () {
        this.close(!0), r.off("click.fb-start")
      },
      isMobile: t.createTouch !== n && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
      use3d: function () {
        var i = t.createElement("div");
        return e.getComputedStyle && e.getComputedStyle(i).getPropertyValue("transform") && !(t.documentMode && t.documentMode < 11)
      }(),
      getTranslate: function (e) {
        var t;
        if (!e || !e.length) return !1;
        if ((t = e.eq(0).css("transform")) && -1 !== t.indexOf("matrix") ? (t = t.split("(")[1], t = t.split(")")[0], t = t.split(",")) : t = [], t.length) t = t.length > 10 ? [t[13], t[12], t[0], t[5]] : [t[5], t[4], t[0], t[3]], t = t.map(parseFloat); else {
          t = [0, 0, 1, 1];
          var i = /\.*translate\((.*)px,(.*)px\)/i.exec(e.eq(0).attr("style"));
          i && (t[0] = parseFloat(i[2]), t[1] = parseFloat(i[1]))
        }
        return {
          top: t[0],
          left: t[1],
          scaleX: t[2],
          scaleY: t[3],
          opacity: parseFloat(e.css("opacity")),
          width: e.width(),
          height: e.height()
        }
      },
      setTranslate: function (e, t) {
        var i = "", s = {};
        if (e && t) return t.left === n && t.top === n || (i = (t.left === n ? e.position().left : t.left) + "px, " + (t.top === n ? e.position().top : t.top) + "px", i = this.use3d ? "translate3d(" + i + ", 0px)" : "translate(" + i + ")"), t.scaleX !== n && t.scaleY !== n && (i = (i.length ? i + " " : "") + "scale(" + t.scaleX + ", " + t.scaleY + ")"), i.length && (s.transform = i), t.opacity !== n && (s.opacity = t.opacity), t.width !== n && (s.width = t.width), t.height !== n && (s.height = t.height), e.css(s)
      },
      animate: function (e, t, s, o, a) {
        i.isFunction(s) && (o = s, s = null), i.isPlainObject(t) || e.removeAttr("style"), e.on(u || "transitionend", function (s) {
          (!s || !s.originalEvent || e.is(s.originalEvent.target) && "z-index" != s.originalEvent.propertyName) && (i.fancybox.stop(e), i.isPlainObject(t) ? t.scaleX !== n && t.scaleY !== n && (e.css("transition-duration", "0ms"), t.width = Math.round(e.width() * t.scaleX), t.height = Math.round(e.height() * t.scaleY), t.scaleX = 1, t.scaleY = 1, i.fancybox.setTranslate(e, t)) : !0 !== a && e.removeClass(t), i.isFunction(o) && o(s))
        }), i.isNumeric(s) && e.css("transition-duration", s + "ms"), i.isPlainObject(t) ? i.fancybox.setTranslate(e, t) : e.addClass(t), t.scaleX && e.hasClass("fancybox-image-wrap") && e.parent().addClass("fancybox-is-scaling"), e.data("timer", setTimeout(function () {
          e.trigger("transitionend")
        }, s + 16))
      },
      stop: function (e) {
        clearTimeout(e.data("timer")), e.off(u || "transitionend"), e.hasClass("fancybox-image-wrap") && e.parent().removeClass("fancybox-is-scaling")
      }
    }, i.fn.fancybox = function (e) {
      var t;
      return e = e || {}, (t = e.selector || !1) ? i("body").off("click.fb-start", t).on("click.fb-start", t, {options: e}, s) : this.off("click.fb-start").on("click.fb-start", {
        items: this,
        options: e
      }, s), this
    }, r.on("click.fb-start", "[data-fancybox]", s)
  }
}(window, document, window.jQuery || jQuery), function (e) {
  "use strict";
  var t = function (t, i, n) {
    if (t) return n = n || "", "object" === e.type(n) && (n = e.param(n, !0)), e.each(i, function (e, i) {
      t = t.replace("$" + e, i || "")
    }), n.length && (t += (t.indexOf("?") > 0 ? "&" : "?") + n), t
  }, i = {
    youtube: {
      matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
      params: {autoplay: 1, autohide: 1, fs: 1, rel: 0, hd: 1, wmode: "transparent", enablejsapi: 1, html5: 1},
      paramPlace: 8,
      type: "iframe",
      url: "//www.youtube.com/embed/$4",
      thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
    },
    vimeo: {
      matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
      params: {autoplay: 1, hd: 1, show_title: 1, show_byline: 1, show_portrait: 0, fullscreen: 1, api: 1},
      paramPlace: 3,
      type: "iframe",
      url: "//player.vimeo.com/video/$2"
    },
    metacafe: {matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/, type: "iframe", url: "//www.metacafe.com/embed/$1/?ap=1"},
    dailymotion: {
      matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
      params: {additionalInfos: 0, autoStart: 1},
      type: "iframe",
      url: "//www.dailymotion.com/embed/video/$1"
    },
    vine: {matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/, type: "iframe", url: "//vine.co/v/$1/embed/simple"},
    instagram: {
      matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
      type: "image",
      url: "//$1/p/$2/media/?size=l"
    },
    gmap_place: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
      type: "iframe",
      url: function (e) {
        return "//maps.google." + e[2] + "/?ll=" + (e[9] ? e[9] + "&z=" + Math.floor(e[10]) + (e[12] ? e[12].replace(/^\//, "&") : "") : e[12]) + "&output=" + (e[12] && e[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
      }
    },
    gmap_search: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
      type: "iframe",
      url: function (e) {
        return "//maps.google." + e[2] + "/maps?q=" + e[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
      }
    }
  };
  e(document).on("objectNeedsType.fb", function (n, s, o) {
    var a, r, l, c, u, d, h = o.src || "", p = !1;
    a = e.extend(!0, {}, i, o.opts.media), e.each(a, function (i, n) {
      if (l = h.match(n.matcher)) {
        if (p = n.type, d = {}, n.paramPlace && l[n.paramPlace]) {
          "?" == (u = l[n.paramPlace])[0] && (u = u.substring(1)), u = u.split("&");
          for (var s = 0; s < u.length; ++s) {
            var a = u[s].split("=", 2);
            2 == a.length && (d[a[0]] = decodeURIComponent(a[1].replace(/\+/g, " ")))
          }
        }
        return c = e.extend(!0, {}, n.params, o.opts[i], d), h = "function" === e.type(n.url) ? n.url.call(this, l, c, o) : t(n.url, l, c), r = "function" === e.type(n.thumb) ? n.thumb.call(this, l, c, o) : t(n.thumb, l), "vimeo" === i && (h = h.replace("&%23", "#")), !1
      }
    }), p ? (o.src = h, o.type = p, o.opts.thumb || o.opts.$thumb && o.opts.$thumb.length || (o.opts.thumb = r), "iframe" === p && (e.extend(!0, o.opts, {
      iframe: {
        preload: !1,
        attr: {scrolling: "no"}
      }
    }), o.contentProvider = void 0, o.opts.slideClass += " fancybox-slide--video")) : h && (o.type = o.opts.defaultType)
  })
}(window.jQuery || jQuery), function (e, t, i) {
  "use strict";
  var n = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || function (t) {
      return e.setTimeout(t, 1e3 / 60)
    },
    s = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.oCancelAnimationFrame || function (t) {
      e.clearTimeout(t)
    }, o = function (t) {
      var i = [];
      t = (t = t.originalEvent || t || e.e).touches && t.touches.length ? t.touches : t.changedTouches && t.changedTouches.length ? t.changedTouches : [t];
      for (var n in t) t[n].pageX ? i.push({x: t[n].pageX, y: t[n].pageY}) : t[n].clientX && i.push({
        x: t[n].clientX,
        y: t[n].clientY
      });
      return i
    }, a = function (e, t, i) {
      return t && e ? "x" === i ? e.x - t.x : "y" === i ? e.y - t.y : Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)) : 0
    }, r = function (e) {
      if (e.is('a,area,button,[role="button"],input,label,select,summary,textarea') || i.isFunction(e.get(0).onclick) || e.data("selectable")) return !0;
      for (var t = 0, n = e[0].attributes, s = n.length; t < s; t++) if ("data-fancybox-" === n[t].nodeName.substr(0, 14)) return !0;
      return !1
    }, l = function (t) {
      var i = e.getComputedStyle(t)["overflow-y"], n = e.getComputedStyle(t)["overflow-x"],
        s = ("scroll" === i || "auto" === i) && t.scrollHeight > t.clientHeight,
        o = ("scroll" === n || "auto" === n) && t.scrollWidth > t.clientWidth;
      return s || o
    }, c = function (e) {
      for (var t = !1; !(t = l(e.get(0))) && ((e = e.parent()).length && !e.hasClass("fancybox-stage") && !e.is("body"));) ;
      return t
    }, u = function (e) {
      this.instance = e, this.$bg = e.$refs.bg, this.$stage = e.$refs.stage, this.$container = e.$refs.container, this.destroy(), this.$container.on("touchstart.fb.touch mousedown.fb.touch", i.proxy(this, "ontouchstart"))
    };
  u.prototype.destroy = function () {
    this.$container.off(".fb.touch")
  }, u.prototype.ontouchstart = function (n) {
    var s = i(n.target), l = this.instance, u = l.current, d = u.$content, h = "touchstart" == n.type;
    if (h && this.$container.off("mousedown.fb.touch"), !u || this.instance.isAnimating || this.instance.isClosing) return n.stopPropagation(), void n.preventDefault();
    if ((!n.originalEvent || 2 != n.originalEvent.button) && s.length && !r(s) && !r(s.parent()) && !(n.originalEvent.clientX > s[0].clientWidth + s.offset().left) && (this.startPoints = o(n), this.startPoints && !(this.startPoints.length > 1 && l.isSliding))) {
      if (this.$target = s, this.$content = d, this.canTap = !0, this.opts = u.opts.touch, i(t).off(".fb.touch"), i(t).on(h ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", i.proxy(this, "ontouchend")), i(t).on(h ? "touchmove.fb.touch" : "mousemove.fb.touch", i.proxy(this, "ontouchmove")), !this.opts && !l.canPan() || !s.is(this.$stage) && !this.$stage.find(s).length) return void(s.is("img") && n.preventDefault());
      n.stopPropagation(), i.fancybox.isMobile && (c(this.$target) || c(this.$target.parent())) || n.preventDefault(), this.canvasWidth = Math.round(u.$slide[0].clientWidth), this.canvasHeight = Math.round(u.$slide[0].clientHeight), this.startTime = (new Date).getTime(), this.distanceX = this.distanceY = this.distance = 0, this.isPanning = !1, this.isSwiping = !1, this.isZooming = !1, this.sliderStartPos = this.sliderLastPos || {
        top: 0,
        left: 0
      }, this.contentStartPos = i.fancybox.getTranslate(this.$content), this.contentLastPos = null, 1 !== this.startPoints.length || this.isZooming || (this.canTap = !l.isSliding, "image" === u.type && (this.contentStartPos.width > this.canvasWidth + 1 || this.contentStartPos.height > this.canvasHeight + 1) ? (i.fancybox.stop(this.$content), this.$content.css("transition-duration", "0ms"), this.isPanning = !0) : this.isSwiping = !0, this.$container.addClass("fancybox-controls--isGrabbing")), 2 !== this.startPoints.length || l.isAnimating || u.hasError || "image" !== u.type || !u.isLoaded && !u.$ghost || (this.isZooming = !0, this.isSwiping = !1, this.isPanning = !1, i.fancybox.stop(this.$content), this.$content.css("transition-duration", "0ms"), this.centerPointStartX = .5 * (this.startPoints[0].x + this.startPoints[1].x) - i(e).scrollLeft(), this.centerPointStartY = .5 * (this.startPoints[0].y + this.startPoints[1].y) - i(e).scrollTop(), this.percentageOfImageAtPinchPointX = (this.centerPointStartX - this.contentStartPos.left) / this.contentStartPos.width, this.percentageOfImageAtPinchPointY = (this.centerPointStartY - this.contentStartPos.top) / this.contentStartPos.height, this.startDistanceBetweenFingers = a(this.startPoints[0], this.startPoints[1]))
    }
  }, u.prototype.ontouchmove = function (e) {
    if (this.newPoints = o(e), i.fancybox.isMobile && (c(this.$target) || c(this.$target.parent()))) return e.stopPropagation(), void(this.canTap = !1);
    if ((this.opts || this.instance.canPan()) && this.newPoints && this.newPoints.length && (this.distanceX = a(this.newPoints[0], this.startPoints[0], "x"), this.distanceY = a(this.newPoints[0], this.startPoints[0], "y"), this.distance = a(this.newPoints[0], this.startPoints[0]), this.distance > 0)) {
      if (!this.$target.is(this.$stage) && !this.$stage.find(this.$target).length) return;
      e.stopPropagation(), e.preventDefault(), this.isSwiping ? this.onSwipe() : this.isPanning ? this.onPan() : this.isZooming && this.onZoom()
    }
  }, u.prototype.onSwipe = function () {
    var t, o = this, a = o.isSwiping, r = o.sliderStartPos.left || 0;
    !0 === a ? Math.abs(o.distance) > 10 && (o.canTap = !1, o.instance.group.length < 2 && o.opts.vertical ? o.isSwiping = "y" : o.instance.isSliding || !1 === o.opts.vertical || "auto" === o.opts.vertical && i(e).width() > 800 ? o.isSwiping = "x" : (t = Math.abs(180 * Math.atan2(o.distanceY, o.distanceX) / Math.PI), o.isSwiping = t > 45 && t < 135 ? "y" : "x"), o.instance.isSliding = o.isSwiping, o.startPoints = o.newPoints, i.each(o.instance.slides, function (e, t) {
      i.fancybox.stop(t.$slide), t.$slide.css("transition-duration", "0ms"), t.inTransition = !1, t.pos === o.instance.current.pos && (o.sliderStartPos.left = i.fancybox.getTranslate(t.$slide).left)
    }), o.instance.SlideShow && o.instance.SlideShow.isActive && o.instance.SlideShow.stop()) : ("x" == a && (o.distanceX > 0 && (o.instance.group.length < 2 || 0 === o.instance.current.index && !o.instance.current.opts.loop) ? r += Math.pow(o.distanceX, .8) : o.distanceX < 0 && (o.instance.group.length < 2 || o.instance.current.index === o.instance.group.length - 1 && !o.instance.current.opts.loop) ? r -= Math.pow(-o.distanceX, .8) : r += o.distanceX), o.sliderLastPos = {
      top: "x" == a ? 0 : o.sliderStartPos.top + o.distanceY,
      left: r
    }, o.requestId && (s(o.requestId), o.requestId = null), o.requestId = n(function () {
      o.sliderLastPos && (i.each(o.instance.slides, function (e, t) {
        var n = t.pos - o.instance.currPos;
        i.fancybox.setTranslate(t.$slide, {
          top: o.sliderLastPos.top,
          left: o.sliderLastPos.left + n * o.canvasWidth + n * t.opts.gutter
        })
      }), o.$container.addClass("fancybox-is-sliding"))
    }))
  }, u.prototype.onPan = function () {
    var e, t, o, a = this;
    a.canTap = !1, e = a.contentStartPos.width > a.canvasWidth ? a.contentStartPos.left + a.distanceX : a.contentStartPos.left, t = a.contentStartPos.top + a.distanceY, (o = a.limitMovement(e, t, a.contentStartPos.width, a.contentStartPos.height)).scaleX = a.contentStartPos.scaleX, o.scaleY = a.contentStartPos.scaleY, a.contentLastPos = o, a.requestId && (s(a.requestId), a.requestId = null), a.requestId = n(function () {
      i.fancybox.setTranslate(a.$content, a.contentLastPos)
    })
  }, u.prototype.limitMovement = function (e, t, i, n) {
    var s, o, a, r, l = this.canvasWidth, c = this.canvasHeight, u = this.contentStartPos.left,
      d = this.contentStartPos.top, h = this.distanceX, p = this.distanceY;
    return s = Math.max(0, .5 * l - .5 * i), o = Math.max(0, .5 * c - .5 * n), a = Math.min(l - i, .5 * l - .5 * i), r = Math.min(c - n, .5 * c - .5 * n), i > l && (h > 0 && e > s && (e = s - 1 + Math.pow(-s + u + h, .8) || 0), h < 0 && e < a && (e = a + 1 - Math.pow(a - u - h, .8) || 0)), n > c && (p > 0 && t > o && (t = o - 1 + Math.pow(-o + d + p, .8) || 0), p < 0 && t < r && (t = r + 1 - Math.pow(r - d - p, .8) || 0)), {
      top: t,
      left: e
    }
  }, u.prototype.limitPosition = function (e, t, i, n) {
    var s = this.canvasWidth, o = this.canvasHeight;
    return i > s ? (e = e > 0 ? 0 : e, e = e < s - i ? s - i : e) : e = Math.max(0, s / 2 - i / 2), n > o ? (t = t > 0 ? 0 : t, t = t < o - n ? o - n : t) : t = Math.max(0, o / 2 - n / 2), {
      top: t,
      left: e
    }
  }, u.prototype.onZoom = function () {
    var t = this, o = t.contentStartPos.width, r = t.contentStartPos.height, l = t.contentStartPos.left,
      c = t.contentStartPos.top, u = a(t.newPoints[0], t.newPoints[1]) / t.startDistanceBetweenFingers,
      d = Math.floor(o * u), h = Math.floor(r * u), p = (o - d) * t.percentageOfImageAtPinchPointX,
      f = (r - h) * t.percentageOfImageAtPinchPointY, m = (t.newPoints[0].x + t.newPoints[1].x) / 2 - i(e).scrollLeft(),
      g = (t.newPoints[0].y + t.newPoints[1].y) / 2 - i(e).scrollTop(), v = m - t.centerPointStartX, y = {
        top: c + (f + (g - t.centerPointStartY)),
        left: l + (p + v),
        scaleX: t.contentStartPos.scaleX * u,
        scaleY: t.contentStartPos.scaleY * u
      };
    t.canTap = !1, t.newWidth = d, t.newHeight = h, t.contentLastPos = y, t.requestId && (s(t.requestId), t.requestId = null), t.requestId = n(function () {
      i.fancybox.setTranslate(t.$content, t.contentLastPos)
    })
  }, u.prototype.ontouchend = function (e) {
    var n = Math.max((new Date).getTime() - this.startTime, 1), a = this.isSwiping, r = this.isPanning,
      l = this.isZooming;
    return this.endPoints = o(e), this.$container.removeClass("fancybox-controls--isGrabbing"), i(t).off(".fb.touch"), this.requestId && (s(this.requestId), this.requestId = null), this.isSwiping = !1, this.isPanning = !1, this.isZooming = !1, this.canTap ? this.onTap(e) : (this.speed = 366, this.velocityX = this.distanceX / n * .5, this.velocityY = this.distanceY / n * .5, this.speedX = Math.max(.5 * this.speed, Math.min(1.5 * this.speed, 1 / Math.abs(this.velocityX) * this.speed)), void(r ? this.endPanning() : l ? this.endZooming() : this.endSwiping(a)))
  }, u.prototype.endSwiping = function (e) {
    var t = !1;
    this.instance.isSliding = !1, this.sliderLastPos = null, "y" == e && Math.abs(this.distanceY) > 50 ? (i.fancybox.animate(this.instance.current.$slide, {
      top: this.sliderStartPos.top + this.distanceY + 150 * this.velocityY,
      opacity: 0
    }, 150), t = this.instance.close(!0, 300)) : "x" == e && this.distanceX > 50 && this.instance.group.length > 1 ? t = this.instance.previous(this.speedX) : "x" == e && this.distanceX < -50 && this.instance.group.length > 1 && (t = this.instance.next(this.speedX)), !1 !== t || "x" != e && "y" != e || this.instance.jumpTo(this.instance.current.index, 150), this.$container.removeClass("fancybox-is-sliding")
  }, u.prototype.endPanning = function () {
    var e, t, n;
    this.contentLastPos && (!1 === this.opts.momentum ? (e = this.contentLastPos.left, t = this.contentLastPos.top) : (e = this.contentLastPos.left + this.velocityX * this.speed, t = this.contentLastPos.top + this.velocityY * this.speed), n = this.limitPosition(e, t, this.contentStartPos.width, this.contentStartPos.height), n.width = this.contentStartPos.width, n.height = this.contentStartPos.height, i.fancybox.animate(this.$content, n, 330))
  }, u.prototype.endZooming = function () {
    var e, t, n, s, o = this.instance.current, a = this.newWidth, r = this.newHeight;
    this.contentLastPos && (e = this.contentLastPos.left, t = this.contentLastPos.top, s = {
      top: t,
      left: e,
      width: a,
      height: r,
      scaleX: 1,
      scaleY: 1
    }, i.fancybox.setTranslate(this.$content, s), a < this.canvasWidth && r < this.canvasHeight ? this.instance.scaleToFit(150) : a > o.width || r > o.height ? this.instance.scaleToActual(this.centerPointStartX, this.centerPointStartY, 150) : (n = this.limitPosition(e, t, a, r), i.fancybox.setTranslate(this.content, i.fancybox.getTranslate(this.$content)), i.fancybox.animate(this.$content, n, 150)))
  }, u.prototype.onTap = function (e) {
    var t, n = this, s = i(e.target), a = n.instance, r = a.current, l = e && o(e) || n.startPoints,
      c = l[0] ? l[0].x - n.$stage.offset().left : 0, u = l[0] ? l[0].y - n.$stage.offset().top : 0, d = function (t) {
        var s = r.opts[t];
        if (i.isFunction(s) && (s = s.apply(a, [r, e])), s) switch (s) {
          case"close":
            a.close(n.startEvent);
            break;
          case"toggleControls":
            a.toggleControls(!0);
            break;
          case"next":
            a.next();
            break;
          case"nextOrClose":
            a.group.length > 1 ? a.next() : a.close(n.startEvent);
            break;
          case"zoom":
            "image" == r.type && (r.isLoaded || r.$ghost) && (a.canPan() ? a.scaleToFit() : a.isScaledDown() ? a.scaleToActual(c, u) : a.group.length < 2 && a.close(n.startEvent))
        }
      };
    if (!(e.originalEvent && 2 == e.originalEvent.button || a.isSliding || c > s[0].clientWidth + s.offset().left)) {
      if (s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) t = "Outside"; else if (s.is(".fancybox-slide")) t = "Slide"; else {
        if (!a.current.$content || !a.current.$content.has(e.target).length) return;
        t = "Content"
      }
      if (n.tapped) {
        if (clearTimeout(n.tapped), n.tapped = null, Math.abs(c - n.tapX) > 50 || Math.abs(u - n.tapY) > 50 || a.isSliding) return this;
        d("dblclick" + t)
      } else n.tapX = c, n.tapY = u, r.opts["dblclick" + t] && r.opts["dblclick" + t] !== r.opts["click" + t] ? n.tapped = setTimeout(function () {
        n.tapped = null, d("click" + t)
      }, 300) : d("click" + t);
      return this
    }
  }, i(t).on("onActivate.fb", function (e, t) {
    t && !t.Guestures && (t.Guestures = new u(t))
  }), i(t).on("beforeClose.fb", function (e, t) {
    t && t.Guestures && t.Guestures.destroy()
  })
}(window, document, window.jQuery || jQuery), function (e, t) {
  "use strict";
  t.extend(!0, t.fancybox.defaults, {
    btnTpl: {slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg viewBox="0 0 40 40"><path d="M13,12 L27,20 L13,27 Z" /><path d="M15,10 v19 M23,10 v19" /></svg></button>'},
    slideShow: {autoStart: !1, speed: 3e3}
  });
  var i = function (e) {
    this.instance = e, this.init()
  };
  t.extend(i.prototype, {
    timer: null, isActive: !1, $button: null, init: function () {
      var e = this;
      e.$button = e.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
        e.toggle()
      }), (e.instance.group.length < 2 || !e.instance.group[e.instance.currIndex].opts.slideShow) && e.$button.hide()
    }, set: function (e) {
      var t = this;
      t.instance && t.instance.current && (!0 === e || t.instance.current.opts.loop || t.instance.currIndex < t.instance.group.length - 1) ? t.timer = setTimeout(function () {
        t.isActive && t.instance.jumpTo((t.instance.currIndex + 1) % t.instance.group.length)
      }, t.instance.current.opts.slideShow.speed) : (t.stop(), t.instance.idleSecondsCounter = 0, t.instance.showControls())
    }, clear: function () {
      clearTimeout(this.timer), this.timer = null
    }, start: function () {
      var e = this.instance.current;
      e && (this.isActive = !0, this.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), this.set(!0))
    }, stop: function () {
      var e = this.instance.current;
      this.clear(), this.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), this.isActive = !1
    }, toggle: function () {
      this.isActive ? this.stop() : this.start()
    }
  }), t(e).on({
    "onInit.fb": function (e, t) {
      t && !t.SlideShow && (t.SlideShow = new i(t))
    }, "beforeShow.fb": function (e, t, i, n) {
      var s = t && t.SlideShow;
      n ? s && i.opts.slideShow.autoStart && s.start() : s && s.isActive && s.clear()
    }, "afterShow.fb": function (e, t, i) {
      var n = t && t.SlideShow;
      n && n.isActive && n.set()
    }, "afterKeydown.fb": function (i, n, s, o, a) {
      var r = n && n.SlideShow;
      !r || !s.opts.slideShow || 80 !== a && 32 !== a || t(e.activeElement).is("button,a,input") || (o.preventDefault(), r.toggle())
    }, "beforeClose.fb onDeactivate.fb": function (e, t) {
      var i = t && t.SlideShow;
      i && i.stop()
    }
  }), t(e).on("visibilitychange", function () {
    var i = t.fancybox.getInstance(), n = i && i.SlideShow;
    n && n.isActive && (e.hidden ? n.clear() : n.set())
  })
}(document, window.jQuery || jQuery), function (e, t) {
  "use strict";
  var i = function () {
    var t, i, n,
      s = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]],
      o = {};
    for (i = 0; i < s.length; i++) if ((t = s[i]) && t[1] in e) {
      for (n = 0; n < t.length; n++) o[s[0][n]] = t[n];
      return o
    }
    return !1
  }();
  if (i) {
    var n = {
      request: function (t) {
        (t = t || e.documentElement)[i.requestFullscreen](t.ALLOW_KEYBOARD_INPUT)
      }, exit: function () {
        e[i.exitFullscreen]()
      }, toggle: function (t) {
        t = t || e.documentElement, this.isFullscreen() ? this.exit() : this.request(t)
      }, isFullscreen: function () {
        return Boolean(e[i.fullscreenElement])
      }, enabled: function () {
        return Boolean(e[i.fullscreenEnabled])
      }
    };
    t.extend(!0, t.fancybox.defaults, {
      btnTpl: {fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"><svg viewBox="0 0 40 40"><path d="M9,12 h22 v16 h-22 v-16 v16 h22 v-16 Z" /></svg></button>'},
      fullScreen: {autoStart: !1}
    }), t(e).on({
      "onInit.fb": function (e, t) {
        var i;
        t && t.group[t.currIndex].opts.fullScreen ? ((i = t.$refs.container).on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (e) {
          e.stopPropagation(), e.preventDefault(), n.toggle(i[0])
        }), t.opts.fullScreen && !0 === t.opts.fullScreen.autoStart && n.request(i[0]), t.FullScreen = n) : t && t.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
      }, "afterKeydown.fb": function (e, t, i, n, s) {
        t && t.FullScreen && 70 === s && (n.preventDefault(), t.FullScreen.toggle(t.$refs.container[0]))
      }, "beforeClose.fb": function (e) {
        e && e.FullScreen && n.exit()
      }
    }), t(e).on(i.fullscreenchange, function () {
      var e = n.isFullscreen(), i = t.fancybox.getInstance();
      i && (i.current && "image" === i.current.type && i.isAnimating && (i.current.$content.css("transition", "none"), i.isAnimating = !1, i.update(!0, !0, 0)), i.trigger("onFullscreenChange", e), i.$refs.container.toggleClass("fancybox-is-fullscreen", e))
    })
  } else t && t.fancybox && (t.fancybox.defaults.btnTpl.fullScreen = !1)
}(document, window.jQuery || jQuery), function (e, t) {
  "use strict";
  t.extend(!0, t.fancybox.defaults, {
    btnTpl: {thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg viewBox="0 0 120 120"><path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" /></svg></button>'},
    thumbs: {autoStart: !1, hideOnClose: !0, parentEl: ".fancybox-container"}
  });
  var i = function (e) {
    this.instance = e, this.init()
  };
  t.extend(i.prototype, {
    $button: null, $grid: null, $list: null, isVisible: !1, init: function () {
      var e = this, t = e.instance, i = t.group[0], n = t.group[1];
      e.opts = t.group[t.currIndex].opts.thumbs, e.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]"), e.opts && i && n && ("image" == i.type || i.opts.thumb || i.opts.$thumb) && ("image" == n.type || n.opts.thumb || n.opts.$thumb) ? (e.$button.show().on("click", function () {
        e.toggle()
      }), e.isActive = !0, !0 === e.opts.autoStart && e.show()) : (e.$button.hide(), e.isActive = !1)
    }, create: function () {
      var e, i, n = this.instance, s = this.opts.parentEl;
      this.$grid = t('<div class="fancybox-thumbs"></div>').appendTo(n.$refs.container.find(s).addBack().filter(s)), e = "<ul>", t.each(n.group, function (t, n) {
        (i = n.opts.thumb || (n.opts.$thumb ? n.opts.$thumb.attr("src") : null)) || "image" !== n.type || (i = n.src), i && i.length && (e += '<li data-index="' + t + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + i + '" /></li>')
      }), e += "</ul>", this.$list = t(e).appendTo(this.$grid).on("click", "li", function () {
        n.jumpTo(t(this).data("index"))
      }), this.$list.find("img").hide().one("load", function () {
        var e, i, n, s, o = t(this).parent().removeClass("fancybox-thumbs-loading"), a = o.outerWidth(),
          r = o.outerHeight();
        e = this.naturalWidth || this.width, s = (i = this.naturalHeight || this.height) / r, (n = e / a) >= 1 && s >= 1 && (n > s ? (e /= s, i = r) : (e = a, i /= n)), t(this).css({
          width: Math.floor(e),
          height: Math.floor(i),
          "margin-top": Math.min(0, Math.floor(.3 * r - .3 * i)),
          "margin-left": Math.min(0, Math.floor(.5 * a - .5 * e))
        }).show()
      }).each(function () {
        this.src = t(this).data("src")
      })
    }, focus: function (e) {
      var t, i, n = this.$list;
      this.instance.current && (t = n.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + this.instance.current.index + '"]').addClass("fancybox-thumbs-active"), (i = t.position()).top < 0 || i.top > n.height() - t.outerHeight() ? n.stop().animate({scrollTop: n.scrollTop() + i.top}, e) : (i.left < 0 || i.left > n.width() - t.outerWidth()) && n.stop().animate({scrollLeft: n.scrollLeft() + i.left}, e))
    }, update: function () {
      this.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), this.isVisible ? (this.$grid || this.create(), this.instance.trigger("onThumbsShow"), this.focus(0)) : this.$grid && this.instance.trigger("onThumbsHide"), this.instance.update()
    }, hide: function () {
      this.isVisible = !1, this.update()
    }, show: function () {
      this.isVisible = !0, this.update()
    }, toggle: function () {
      this.isVisible = !this.isVisible, this.update()
    }
  }), t(e).on({
    "onInit.fb": function (e, t) {
      t && !t.Thumbs && (t.Thumbs = new i(t))
    }, "beforeShow.fb": function (e, t, i, n) {
      var s = t && t.Thumbs;
      s && s.isVisible && s.focus(n ? 0 : 250)
    }, "afterKeydown.fb": function (e, t, i, n, s) {
      var o = t && t.Thumbs;
      o && o.isActive && 71 === s && (n.preventDefault(), o.toggle())
    }, "beforeClose.fb": function (e, t) {
      var i = t && t.Thumbs;
      i && i.isVisible && !1 !== i.opts.hideOnClose && i.$grid.hide()
    }
  })
}(document, window.jQuery), function (e, t) {
  "use strict";
  t.extend(!0, t.fancybox.defaults, {
    btnTpl: {share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg viewBox="0 0 40 40"><path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z"></svg></button>'},
    share: {tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a href="https://www.facebook.com/sharer/sharer.php?u={{src}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#3b5998"><path d="M27.6 3h-23.2c-.8 0-1.4.6-1.4 1.4v23.1c0 .9.6 1.5 1.4 1.5h12.5v-10.1h-3.4v-3.9h3.4v-2.9c0-3.4 2.1-5.2 5-5.2 1.4 0 2.7.1 3 .2v3.5h-2.1c-1.6 0-1.9.8-1.9 1.9v2.5h3.9l-.5 3.9h-3.4v10.1h6.6c.8 0 1.4-.6 1.4-1.4v-23.2c.1-.8-.5-1.4-1.3-1.4z"></path></svg><span>Facebook</span></a><a href="https://www.pinterest.com/pin/create/button/?url={{src}}&amp;description={{descr}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#c92228"><path d="M16 3c-7.2 0-13 5.8-13 13 0 5.5 3.4 10.2 8.3 12.1-.1-1-.2-2.6 0-3.7.2-1 1.5-6.5 1.5-6.5s-.4-.8-.4-1.9c0-1.8 1-3.2 2.4-3.2 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.8-1.1 4.3-.3 1.3.6 2.3 1.9 2.3 2.3 0 4.1-2.4 4.1-6 0-3.1-2.2-5.3-5.4-5.3-3.7 0-5.9 2.8-5.9 5.6 0 1.1.4 2.3 1 3 .1.1.1.2.1.4-.1.4-.3 1.3-.4 1.5-.1.2-.2.3-.4.2-1.6-.8-2.6-3.1-2.6-5 0-4.1 3-7.9 8.6-7.9 4.5 0 8 3.2 8 7.5 0 4.5-2.8 8.1-6.7 8.1-1.3 0-2.6-.7-3-1.5 0 0-.7 2.5-.8 3.1-.3 1.1-1.1 2.5-1.6 3.4 1.2.4 2.5.6 3.8.6 7.2 0 13-5.8 13-13 0-7.1-5.8-12.9-13-12.9z"></path></svg><span>Pinterest</span></a><a href="https://twitter.com/intent/tweet?url={{src}}&amp;text={{descr}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#1da1f2"><path d="M30 7.3c-1 .5-2.1.8-3.3.9 1.2-.7 2.1-1.8 2.5-3.2-1.1.7-2.3 1.1-3.6 1.4-1-1.1-2.5-1.8-4.2-1.8-3.2 0-5.7 2.6-5.7 5.7 0 .5.1.9.1 1.3-4.8-.2-9-2.5-11.8-6-.5.9-.8 1.9-.8 3 0 2 1 3.8 2.6 4.8-.9 0-1.8-.3-2.6-.7v.1c0 2.8 2 5.1 4.6 5.6-.5.1-1 .2-1.5.2-.4 0-.7 0-1.1-.1.7 2.3 2.9 3.9 5.4 4-2 1.5-4.4 2.5-7.1 2.5-.5 0-.9 0-1.4-.1 2.5 1.6 5.6 2.6 8.8 2.6 10.6 0 16.3-8.8 16.3-16.3v-.7c1.1-1 2-2 2.8-3.2z"></path></svg><span>Twitter</span></a></p></div>'}
  }), t(e).on("click", "[data-fancybox-share]", function () {
    var e, i = t.fancybox.getInstance();
    i && (e = i.current.opts.share.tpl.replace(/\{\{src\}\}/g, encodeURIComponent(!1 === i.current.opts.hash ? i.current.src : window.location)), i.$caption && (e = e.replace(/\{\{descr\}\}/g, encodeURIComponent(i.$caption.text()))), t.fancybox.open({
      src: i.translate(i, e),
      type: "html",
      opts: {autoFocus: !1, animationEffect: "fade"}
    }))
  })
}(document, window.jQuery || jQuery), function (e, t, i) {
  "use strict";

  function n() {
    var e = t.location.hash.substr(1), i = e.split("-"),
      n = i.length > 1 && /^\+?\d+$/.test(i[i.length - 1]) ? parseInt(i.pop(-1), 10) || 1 : 1, s = i.join("-");
    return n < 1 && (n = 1), {hash: e, index: n, gallery: s}
  }

  function s(e) {
    var t;
    "" !== e.gallery && ((t = i("[data-fancybox='" + i.escapeSelector(e.gallery) + "']").eq(e.index - 1)).length || (t = i("#" + i.escapeSelector(e.gallery))), t.length && (a = !1, t.trigger("click")))
  }

  function o(e) {
    var t;
    return !!e && ((t = e.current ? e.current.opts : e.opts).hash || (t.$orig ? t.$orig.data("fancybox") : ""))
  }

  i.escapeSelector || (i.escapeSelector = function (e) {
    return (e + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function (e, t) {
      return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
    })
  });
  var a = !0, r = null, l = null;
  i(function () {
    !1 !== i.fancybox.defaults.hash && (i(e).on({
      "onInit.fb": function (e, t) {
        var i, s;
        !1 !== t.group[t.currIndex].opts.hash && (i = n(), (s = o(t)) && i.gallery && s == i.gallery && (t.currIndex = i.index - 1))
      }, "beforeShow.fb": function (i, n, s) {
        var c;
        s && !1 !== s.opts.hash && (c = o(n)) && "" !== c && (t.location.hash.indexOf(c) < 0 && (n.opts.origHash = t.location.hash), r = c + (n.group.length > 1 ? "-" + (s.index + 1) : ""), "replaceState" in t.history ? (l && clearTimeout(l), l = setTimeout(function () {
          t.history[a ? "pushState" : "replaceState"]({}, e.title, t.location.pathname + t.location.search + "#" + r), l = null, a = !1
        }, 300)) : t.location.hash = r)
      }, "beforeClose.fb": function (n, s, a) {
        var c, u;
        l && clearTimeout(l), !1 !== a.opts.hash && (c = o(s), u = s && s.opts.origHash ? s.opts.origHash : "", c && "" !== c && ("replaceState" in history ? t.history.replaceState({}, e.title, t.location.pathname + t.location.search + u) : (t.location.hash = u, i(t).scrollTop(s.scrollTop).scrollLeft(s.scrollLeft))), r = null)
      }
    }), i(t).on("hashchange.fb", function () {
      var e = n();
      i.fancybox.getInstance() ? !r || r === e.gallery + "-" + e.index || 1 === e.index && r == e.gallery || (r = null, i.fancybox.close()) : "" !== e.gallery && s(e)
    }), setTimeout(function () {
      s(n())
    }, 50))
  })
}(document, window, window.jQuery || jQuery), function (e) {
  var t = new Swiper(".js-carousel_v1", {
    slidesPerView: 2,
    spaceBetween: 40,
    centeredSlides: !0,
    speed: 800,
    loop: !0,
    pagination: {el: ".js-carousel_v1 .pagination", type: "fraction"},
    navigation: {nextEl: ".js-carousel_v1 .prev", prevEl: ".js-carousel_v1 .next"}
  }), i = new Swiper(".js-carousel_v2-inner", {
    slidesPerView: 3,
    spaceBetween: 65,
    speed: 800,
    loop: !0,
    navigation: {nextEl: ".js-carousel_v2 .prev", prevEl: ".js-carousel_v2 .next"}
  });
  e(".js-grid").isotope({
    itemSelector: ".pgn-grid__item",
    layoutMode: "masonryHorizontal",
    masonryHorizontal: {rowHeight: 242},
    resizesContainer: !1
  });
  e(".js-grid .pgn-preloader").fadeOut(400), e(document).on("ready", function () {
    e(".pgn-preloader.page").fadeOut(400), e(".js-scrollbar-horizontal").mCustomScrollbar({
      axis: "x",
      scrollInertia: 150,
      mouseWheel: {enable: !1},
      alwaysShowScrollbar: 0,
      documentTouchScroll: !0,
      scrollButtons: {enable: !0}
    }), e(".js-scrollbar-vertical").mCustomScrollbar({
      axis: "y",
      scrollInertia: 150
    }), e(".js-scrollbar-vertical-outside").mCustomScrollbar({
      axis: "y",
      scrollInertia: 150,
      scrollbarPosition: "outside"
    }), e(".pgn-header__menu-invoker").on("click", function (t) {
      t.preventDefault();
      var i = e(this).attr("href");
      e(i).fadeIn(400)
    }), e(".pgn-header__menu-close").on("click", function (t) {
      t.preventDefault();
      var i = e(this).attr("href");
      e(i).fadeOut(400)
    }), e(".pgn-header-menu a").on("click", function (t) {
      t.preventDefault();
      var i = e(this), n = i.attr("href"), s = n ? e(n).offset().top : 0;
      e("html, body").stop().animate({scrollTop: s}, 800, function () {
        e(".pgn-header-menu a").removeClass("active"), i.addClass("active")
      })
    }), e(".js-tab-control").on("click", function (t) {
      t.preventDefault();
      var i = e(this).attr("href"), n = e(this).data("group");
      e('[data-group="' + n + '"]').removeClass("active"), e(this).addClass("active"), e('[href="' + i + '"]').addClass("active"), e(".js-tab").hide(), e(i).fadeIn(), e("#synopsisContent").mCustomScrollbar("scrollTo", "#synopsisContentWrap")
    })
  }), e(document).scroll(function () {
    !function (t) {
      var i = e(document).scrollTop(), n = e(".pgn-header").outerHeight();
      e(".pgn-header-menu a").each(function () {
        var t = e(this);
        e(t.attr("href")).offset().top - n <= i ? (e(".pgn-header-menu a").removeClass("active"), t.addClass("active")) : t.removeClass("active")
      })
    }();
    e(window).scrollTop() > 10 ? e("#header").addClass("pgn-is-scrolled") : e("#header").removeClass("pgn-is-scrolled")
  }), e(window).on("load", function () {
  }), e(window).on("resize", function () {
    var n = e(window).width();
    n >= 992 && (t.params.slidesPerView = 2, i.params.slidesPerView = 3), n > 567 && n < 992 && (t.params.slidesPerView = 2, i.params.slidesPerView = 2), n < 567 && (t.params.slidesPerView = 1, i.params.slidesPerView = 1), t.update(), i.update()
  }), e(window).trigger("resize")
}(jQuery);