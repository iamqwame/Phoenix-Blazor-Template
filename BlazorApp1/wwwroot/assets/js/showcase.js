(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
        factory();
})((function () {
    'use strict';

    function _assertThisInitialized(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }

    function _inheritsLoose(t, e) {
        t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;
    }
    /*!
     * GSAP 3.12.5
     * https://gsap.com
     *
     * @license Copyright 2008-2024, GreenSock. All rights reserved.
     * Subject to the terms at https://gsap.com/standard-license or for
     * Club GSAP members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
     */
    var _suppressOverwrites$1, _reverting$1, _context$2, _globalTimeline, _win$3, _coreInitted$2, _doc$3, _coreReady, _lastRenderedFrame, _quickTween, _tickerActive, _config = {
        autoSleep: 120,
        force3D: "auto",
        nullTargetWarn: 1,
        units: {
            lineHeight: ""
        }
    },
        _defaults$1 = {
            duration: .5,
            overwrite: !1,
            delay: 0
        },
        _bigNum$1 = 1e8,
        _tinyNum = 1 / _bigNum$1,
        _2PI = 2 * Math.PI,
        _HALF_PI = _2PI / 4,
        _gsID = 0,
        _sqrt = Math.sqrt,
        _cos = Math.cos,
        _sin = Math.sin,
        _isString$1 = function (t) {
            return "string" == typeof t
        },
        _isFunction$1 = function (t) {
            return "function" == typeof t
        },
        _isNumber$1 = function (t) {
            return "number" == typeof t
        },
        _isUndefined = function (t) {
            return void 0 === t
        },
        _isObject$1 = function (t) {
            return "object" == typeof t
        },
        _isNotFalse = function (t) {
            return !1 !== t
        },
        _windowExists$2 = function () {
            return "undefined" != typeof window
        },
        _isFuncOrString = function (t) {
            return _isFunction$1(t) || _isString$1(t)
        },
        _isTypedArray = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function () { },
        _isArray = Array.isArray,
        _strictNumExp = /(?:-?\.?\d|\.)+/gi,
        _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
        _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
        _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
        _relExp = /[+-]=-?[.\d]+/,
        _delimitedValueExp = /[^,'"\[\]\s]+/gi,
        _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
        _globals = {},
        _installScope = {},
        _install = function (t) {
            return (_installScope = _merge(t, _globals)) && gsap$2
        },
        _missingPlugin = function (t, e) {
            return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()")
        },
        _warn = function (t, e) {
            return !e && console.warn(t)
        },
        _addGlobal = function (t, e) {
            return t && (_globals[t] = e) && _installScope && (_installScope[t] = e) || _globals
        },
        _emptyFunc = function () {
            return 0
        },
        _startAtRevertConfig = {
            suppressEvents: !0,
            isStart: !0,
            kill: !1
        },
        _revertConfigNoKill = {
            suppressEvents: !0,
            kill: !1
        },
        _revertConfig = {
            suppressEvents: !0
        },
        _reservedProps = {},
        _lazyTweens = [],
        _lazyLookup = {},
        _plugins = {},
        _effects = {},
        _nextGCFrame = 30,
        _harnessPlugins = [],
        _callbackNames = "",
        _harness = function (t) {
            var e, i, r = t[0];
            if (_isObject$1(r) || _isFunction$1(r) || (t = [t]), !(e = (r._gsap || {}).harness)) {
                for (i = _harnessPlugins.length; i-- && !_harnessPlugins[i].targetTest(r););
                e = _harnessPlugins[i];
            }
            for (i = t.length; i--;) t[i] && (t[i]._gsap || (t[i]._gsap = new GSCache(t[i], e))) || t.splice(i, 1);
            return t
        },
        _getCache = function (t) {
            return t._gsap || _harness(toArray(t))[0]._gsap
        },
        _getProperty = function (t, e, i) {
            return (i = t[e]) && _isFunction$1(i) ? t[e]() : _isUndefined(i) && t.getAttribute && t.getAttribute(e) || i
        },
        _forEachName = function (t, e) {
            return (t = t.split(",")).forEach(e) || t
        },
        _round$1 = function (t) {
            return Math.round(1e5 * t) / 1e5 || 0
        },
        _roundPrecise = function (t) {
            return Math.round(1e7 * t) / 1e7 || 0
        },
        _parseRelative = function (t, e) {
            var i = e.charAt(0),
                r = parseFloat(e.substr(2));
            return t = parseFloat(t), "+" === i ? t + r : "-" === i ? t - r : "*" === i ? t * r : t / r
        },
        _arrayContainsAny = function (t, e) {
            for (var i = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < i;);
            return r < i
        },
        _lazyRender = function () {
            var t, e, i = _lazyTweens.length,
                r = _lazyTweens.slice(0);
            for (_lazyLookup = {}, _lazyTweens.length = 0, t = 0; t < i; t++)(e = r[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
        },
        _lazySafeRender = function (t, e, i, r) {
            _lazyTweens.length && !_reverting$1 && _lazyRender(), t.render(e, i, r || _reverting$1 && e < 0 && (t._initted || t._startAt)), _lazyTweens.length && !_reverting$1 && _lazyRender();
        },
        _numericIfPossible = function (t) {
            var e = parseFloat(t);
            return (e || 0 === e) && (t + "").match(_delimitedValueExp).length < 2 ? e : _isString$1(t) ? t.trim() : t
        },
        _passThrough$1 = function (t) {
            return t
        },
        _setDefaults$1 = function (t, e) {
            for (var i in e) i in t || (t[i] = e[i]);
            return t
        },
        _setKeyframeDefaults = function (t) {
            return function (e, i) {
                for (var r in i) r in e || "duration" === r && t || "ease" === r || (e[r] = i[r]);
            }
        },
        _merge = function (t, e) {
            for (var i in e) t[i] = e[i];
            return t
        },
        _mergeDeep = function t(e, i) {
            for (var r in i) "__proto__" !== r && "constructor" !== r && "prototype" !== r && (e[r] = _isObject$1(i[r]) ? t(e[r] || (e[r] = {}), i[r]) : i[r]);
            return e
        },
        _copyExcluding = function (t, e) {
            var i, r = {};
            for (i in t) i in e || (r[i] = t[i]);
            return r
        },
        _inheritDefaults = function (t) {
            var e = t.parent || _globalTimeline,
                i = t.keyframes ? _setKeyframeDefaults(_isArray(t.keyframes)) : _setDefaults$1;
            if (_isNotFalse(t.inherit))
                for (; e;) i(t, e.vars.defaults), e = e.parent || e._dp;
            return t
        },
        _arraysMatch = function (t, e) {
            for (var i = t.length, r = i === e.length; r && i-- && t[i] === e[i];);
            return i < 0
        },
        _addLinkedListItem = function (t, e, i, r, n) {
            void 0 === i && (i = "_first"), void 0 === r && (r = "_last");
            var a, s = t[r];
            if (n)
                for (a = e[n]; s && s[n] > a;) s = s._prev;
            return s ? (e._next = s._next, s._next = e) : (e._next = t[i], t[i] = e), e._next ? e._next._prev = e : t[r] = e, e._prev = s, e.parent = e._dp = t, e
        },
        _removeLinkedListItem = function (t, e, i, r) {
            void 0 === i && (i = "_first"), void 0 === r && (r = "_last");
            var n = e._prev,
                a = e._next;
            n ? n._next = a : t[i] === e && (t[i] = a), a ? a._prev = n : t[r] === e && (t[r] = n), e._next = e._prev = e.parent = null;
        },
        _removeFromParent = function (t, e) {
            t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
        },
        _uncache = function (t, e) {
            if (t && (!e || e._end > t._dur || e._start < 0))
                for (var i = t; i;) i._dirty = 1, i = i.parent;
            return t
        },
        _recacheAncestors = function (t) {
            for (var e = t.parent; e && e.parent;) e._dirty = 1, e.totalDuration(), e = e.parent;
            return t
        },
        _rewindStartAt = function (t, e, i, r) {
            return t._startAt && (_reverting$1 ? t._startAt.revert(_revertConfigNoKill) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, r))
        },
        _hasNoPausedAncestors = function t(e) {
            return !e || e._ts && t(e.parent)
        },
        _elapsedCycleDuration = function (t) {
            return t._repeat ? _animationCycle(t._tTime, t = t.duration() + t._rDelay) * t : 0
        },
        _animationCycle = function (t, e) {
            var i = Math.floor(t /= e);
            return t && i === t ? i - 1 : i
        },
        _parentToChildTotalTime = function (t, e) {
            return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
        },
        _setEnd = function (t) {
            return t._end = _roundPrecise(t._start + (t._tDur / Math.abs(t._ts || t._rts || _tinyNum) || 0))
        },
        _alignPlayhead = function (t, e) {
            var i = t._dp;
            return i && i.smoothChildTiming && t._ts && (t._start = _roundPrecise(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), _setEnd(t), i._dirty || _uncache(i, t)), t
        },
        _postAddChecks = function (t, e) {
            var i;
            if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = _parentToChildTotalTime(t.rawTime(), e), (!e._dur || _clamp$1(0, e.totalDuration(), i) - e._tTime > _tinyNum) && e.render(i, !0)), _uncache(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
                if (t._dur < t.duration())
                    for (i = t; i._dp;) i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
                t._zTime = -_tinyNum;
            }
        },
        _addToTimeline = function (t, e, i, r) {
            return e.parent && _removeFromParent(e), e._start = _roundPrecise((_isNumber$1(i) ? i : i || t !== _globalTimeline ? _parsePosition$1(t, i, e) : t._time) + e._delay), e._end = _roundPrecise(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), _addLinkedListItem(t, e, "_first", "_last", t._sort ? "_start" : 0), _isFromOrFromStart(e) || (t._recent = e), r || _postAddChecks(t, e), t._ts < 0 && _alignPlayhead(t, t._tTime), t
        },
        _scrollTrigger = function (t, e) {
            return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", e)) && _globals.ScrollTrigger.create(e, t)
        },
        _attemptInitTween = function (t, e, i, r, n) {
            return _initTween(t, e, n), t._initted ? !i && t._pt && !_reverting$1 && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && _lastRenderedFrame !== _ticker.frame ? (_lazyTweens.push(t), t._lazy = [n, r], 1) : void 0 : 1
        },
        _parentPlayheadIsBeforeStart = function t(e) {
            var i = e.parent;
            return i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || t(i))
        },
        _isFromOrFromStart = function (t) {
            var e = t.data;
            return "isFromStart" === e || "isStart" === e
        },
        _renderZeroDurationTween = function (t, e, i, r) {
            var n, a, s, o = t.ratio,
                _ = e < 0 || !e && (!t._start && _parentPlayheadIsBeforeStart(t) && (t._initted || !_isFromOrFromStart(t)) || (t._ts < 0 || t._dp._ts < 0) && !_isFromOrFromStart(t)) ? 0 : 1,
                u = t._rDelay,
                l = 0;
            if (u && t._repeat && (l = _clamp$1(0, t._tDur, e), a = _animationCycle(l, u), t._yoyo && 1 & a && (_ = 1 - _), a !== _animationCycle(t._tTime, u) && (o = 1 - _, t.vars.repeatRefresh && t._initted && t.invalidate())), _ !== o || _reverting$1 || r || t._zTime === _tinyNum || !e && t._zTime) {
                if (!t._initted && _attemptInitTween(t, e, r, i, l)) return;
                for (s = t._zTime, t._zTime = e || (i ? _tinyNum : 0), i || (i = e && !s), t.ratio = _, t._from && (_ = 1 - _), t._time = 0, t._tTime = l, n = t._pt; n;) n.r(_, n.d), n = n._next;
                e < 0 && _rewindStartAt(t, e, i, !0), t._onUpdate && !i && _callback$1(t, "onUpdate"), l && t._repeat && !i && t.parent && _callback$1(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === _ && (_ && _removeFromParent(t, 1), i || _reverting$1 || (_callback$1(t, _ ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
            } else t._zTime || (t._zTime = e);
        },
        _findNextPauseTween = function (t, e, i) {
            var r;
            if (i > e)
                for (r = t._first; r && r._start <= i;) {
                    if ("isPause" === r.data && r._start > e) return r;
                    r = r._next;
                } else
                for (r = t._last; r && r._start >= i;) {
                    if ("isPause" === r.data && r._start < e) return r;
                    r = r._prev;
                }
        },
        _setDuration = function (t, e, i, r) {
            var n = t._repeat,
                a = _roundPrecise(e) || 0,
                s = t._tTime / t._tDur;
            return s && !r && (t._time *= a / t._dur), t._dur = a, t._tDur = n ? n < 0 ? 1e10 : _roundPrecise(a * (n + 1) + t._rDelay * n) : a, s > 0 && !r && _alignPlayhead(t, t._tTime = t._tDur * s), t.parent && _setEnd(t), i || _uncache(t.parent, t), t
        },
        _onUpdateTotalDuration = function (t) {
            return t instanceof Timeline ? _uncache(t) : _setDuration(t, t._dur)
        },
        _zeroPosition = {
            _start: 0,
            endTime: _emptyFunc,
            totalDuration: _emptyFunc
        },
        _parsePosition$1 = function t(e, i, r) {
            var n, a, s, o = e.labels,
                _ = e._recent || _zeroPosition,
                u = e.duration() >= _bigNum$1 ? _.endTime(!1) : e._dur;
            return _isString$1(i) && (isNaN(i) || i in o) ? (a = i.charAt(0), s = "%" === i.substr(-1), n = i.indexOf("="), "<" === a || ">" === a ? (n >= 0 && (i = i.replace(/=/, "")), ("<" === a ? _._start : _.endTime(_._repeat >= 0)) + (parseFloat(i.substr(1)) || 0) * (s ? (n < 0 ? _ : r).totalDuration() / 100 : 1)) : n < 0 ? (i in o || (o[i] = u), o[i]) : (a = parseFloat(i.charAt(n - 1) + i.substr(n + 1)), s && r && (a = a / 100 * (_isArray(r) ? r[0] : r).totalDuration()), n > 1 ? t(e, i.substr(0, n - 1), r) + a : u + a)) : null == i ? u : +i
        },
        _createTweenType = function (t, e, i) {
            var r, n, a = _isNumber$1(e[1]),
                s = (a ? 2 : 1) + (t < 2 ? 0 : 1),
                o = e[s];
            if (a && (o.duration = e[1]), o.parent = i, t) {
                for (r = o, n = i; n && !("immediateRender" in r);) r = n.vars.defaults || {}, n = _isNotFalse(n.vars.inherit) && n.parent;
                o.immediateRender = _isNotFalse(r.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = e[s - 1];
            }
            return new Tween(e[0], o, e[s + 1])
        },
        _conditionalReturn = function (t, e) {
            return t || 0 === t ? e(t) : e
        },
        _clamp$1 = function (t, e, i) {
            return i < t ? t : i > e ? e : i
        },
        getUnit = function (t, e) {
            return _isString$1(t) && (e = _unitExp.exec(t)) ? e[1] : ""
        },
        clamp = function (t, e, i) {
            return _conditionalReturn(i, (function (i) {
                return _clamp$1(t, e, i)
            }))
        },
        _slice = [].slice,
        _isArrayLike = function (t, e) {
            return t && _isObject$1(t) && "length" in t && (!e && !t.length || t.length - 1 in t && _isObject$1(t[0])) && !t.nodeType && t !== _win$3
        },
        _flatten = function (t, e, i) {
            return void 0 === i && (i = []), t.forEach((function (t) {
                var r;
                return _isString$1(t) && !e || _isArrayLike(t, 1) ? (r = i).push.apply(r, toArray(t)) : i.push(t)
            })) || i
        },
        toArray = function (t, e, i) {
            return _context$2 && !e && _context$2.selector ? _context$2.selector(t) : !_isString$1(t) || i || !_coreInitted$2 && _wake() ? _isArray(t) ? _flatten(t, i) : _isArrayLike(t) ? _slice.call(t, 0) : t ? [t] : [] : _slice.call((e || _doc$3).querySelectorAll(t), 0)
        },
        selector = function (t) {
            return t = toArray(t)[0] || _warn("Invalid scope") || {},
                function (e) {
                    var i = t.current || t.nativeElement || t;
                    return toArray(e, i.querySelectorAll ? i : i === t ? _warn("Invalid scope") || _doc$3.createElement("div") : t)
                }
        },
        shuffle = function (t) {
            return t.sort((function () {
                return .5 - Math.random()
            }))
        },
        distribute = function (t) {
            if (_isFunction$1(t)) return t;
            var e = _isObject$1(t) ? t : {
                each: t
            },
                i = _parseEase(e.ease),
                r = e.from || 0,
                n = parseFloat(e.base) || 0,
                a = {},
                s = r > 0 && r < 1,
                o = isNaN(r) || s,
                _ = e.axis,
                u = r,
                l = r;
            return _isString$1(r) ? u = l = {
                center: .5,
                edges: .5,
                end: 1
            }[r] || 0 : !s && o && (u = r[0], l = r[1]),
                function (t, s, c) {
                    var h, p, d, f, m, g, v, T, y, w = (c || e).length,
                        b = a[w];
                    if (!b) {
                        if (!(y = "auto" === e.grid ? 0 : (e.grid || [1, _bigNum$1])[1])) {
                            for (v = -_bigNum$1; v < (v = c[y++].getBoundingClientRect().left) && y < w;);
                            y < w && y--;
                        }
                        for (b = a[w] = [], h = o ? Math.min(y, w) * u - .5 : r % y, p = y === _bigNum$1 ? 0 : o ? w * l / y - .5 : r / y | 0, v = 0, T = _bigNum$1, g = 0; g < w; g++) d = g % y - h, f = p - (g / y | 0), b[g] = m = _ ? Math.abs("y" === _ ? f : d) : _sqrt(d * d + f * f), m > v && (v = m), m < T && (T = m);
                        "random" === r && shuffle(b), b.max = v - T, b.min = T, b.v = w = (parseFloat(e.amount) || parseFloat(e.each) * (y > w ? w - 1 : _ ? "y" === _ ? w / y : y : Math.max(y, w / y)) || 0) * ("edges" === r ? -1 : 1), b.b = w < 0 ? n - w : n, b.u = getUnit(e.amount || e.each) || 0, i = i && w < 0 ? _invertEase(i) : i;
                    }
                    return w = (b[t] - b.min) / b.max || 0, _roundPrecise(b.b + (i ? i(w) : w) * b.v) + b.u
                }
        },
        _roundModifier = function (t) {
            var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
            return function (i) {
                var r = _roundPrecise(Math.round(parseFloat(i) / t) * t * e);
                return (r - r % 1) / e + (_isNumber$1(i) ? 0 : getUnit(i))
            }
        },
        snap = function (t, e) {
            var i, r, n = _isArray(t);
            return !n && _isObject$1(t) && (i = n = t.radius || _bigNum$1, t.values ? (t = toArray(t.values), (r = !_isNumber$1(t[0])) && (i *= i)) : t = _roundModifier(t.increment)), _conditionalReturn(e, n ? _isFunction$1(t) ? function (e) {
                return r = t(e), Math.abs(r - e) <= i ? r : e
            } : function (e) {
                for (var n, a, s = parseFloat(r ? e.x : e), o = parseFloat(r ? e.y : 0), _ = _bigNum$1, u = 0, l = t.length; l--;)(n = r ? (n = t[l].x - s) * n + (a = t[l].y - o) * a : Math.abs(t[l] - s)) < _ && (_ = n, u = l);
                return u = !i || _ <= i ? t[u] : e, r || u === e || _isNumber$1(e) ? u : u + getUnit(e)
            } : _roundModifier(t))
        },
        random = function (t, e, i, r) {
            return _conditionalReturn(_isArray(t) ? !e : !0 === i ? !!(i = 0) : !r, (function () {
                return _isArray(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + .99 * i)) / i) * i * r) / r
            }))
        },
        pipe = function () {
            for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
            return function (t) {
                return e.reduce((function (t, e) {
                    return e(t)
                }), t)
            }
        },
        unitize = function (t, e) {
            return function (i) {
                return t(parseFloat(i)) + (e || getUnit(i))
            }
        },
        normalize = function (t, e, i) {
            return mapRange(t, e, 0, 1, i)
        },
        _wrapArray = function (t, e, i) {
            return _conditionalReturn(i, (function (i) {
                return t[~~e(i)]
            }))
        },
        wrap = function t(e, i, r) {
            var n = i - e;
            return _isArray(e) ? _wrapArray(e, t(0, e.length), i) : _conditionalReturn(r, (function (t) {
                return (n + (t - e) % n) % n + e
            }))
        },
        wrapYoyo = function t(e, i, r) {
            var n = i - e,
                a = 2 * n;
            return _isArray(e) ? _wrapArray(e, t(0, e.length - 1), i) : _conditionalReturn(r, (function (t) {
                return e + ((t = (a + (t - e) % a) % a || 0) > n ? a - t : t)
            }))
        },
        _replaceRandom = function (t) {
            for (var e, i, r, n, a = 0, s = ""; ~(e = t.indexOf("random(", a));) r = t.indexOf(")", e), n = "[" === t.charAt(e + 7), i = t.substr(e + 7, r - e - 7).match(n ? _delimitedValueExp : _strictNumExp), s += t.substr(a, e - a) + random(n ? i : +i[0], n ? 0 : +i[1], +i[2] || 1e-5), a = r + 1;
            return s + t.substr(a, t.length - a)
        },
        mapRange = function (t, e, i, r, n) {
            var a = e - t,
                s = r - i;
            return _conditionalReturn(n, (function (e) {
                return i + ((e - t) / a * s || 0)
            }))
        },
        interpolate = function t(e, i, r, n) {
            var a = isNaN(e + i) ? 0 : function (t) {
                return (1 - t) * e + t * i
            };
            if (!a) {
                var s, o, _, u, l, c = _isString$1(e),
                    h = {};
                if (!0 === r && (n = 1) && (r = null), c) e = {
                    p: e
                }, i = {
                    p: i
                };
                else if (_isArray(e) && !_isArray(i)) {
                    for (_ = [], u = e.length, l = u - 2, o = 1; o < u; o++) _.push(t(e[o - 1], e[o]));
                    u--, a = function (t) {
                        t *= u;
                        var e = Math.min(l, ~~t);
                        return _[e](t - e)
                    }, r = i;
                } else n || (e = _merge(_isArray(e) ? [] : {}, e));
                if (!_) {
                    for (s in i) _addPropTween.call(h, e, s, "get", i[s]);
                    a = function (t) {
                        return _renderPropTweens(t, h) || (c ? e.p : e)
                    };
                }
            }
            return _conditionalReturn(r, a)
        },
        _getLabelInDirection = function (t, e, i) {
            var r, n, a, s = t.labels,
                o = _bigNum$1;
            for (r in s) (n = s[r] - e) < 0 == !!i && n && o > (n = Math.abs(n)) && (a = r, o = n);
            return a
        },
        _callback$1 = function (t, e, i) {
            var r, n, a, s = t.vars,
                o = s[e],
                _ = _context$2,
                u = t._ctx;
            if (o) return r = s[e + "Params"], n = s.callbackScope || t, i && _lazyTweens.length && _lazyRender(), u && (_context$2 = u), a = r ? o.apply(n, r) : o.call(n), _context$2 = _, a
        },
        _interrupt = function (t) {
            return _removeFromParent(t), t.scrollTrigger && t.scrollTrigger.kill(!!_reverting$1), t.progress() < 1 && _callback$1(t, "onInterrupt"), t
        },
        _registerPluginQueue = [],
        _createPlugin = function (t) {
            if (t)
                if (t = !t.name && t.default || t, _windowExists$2() || t.headless) {
                    var e = t.name,
                        i = _isFunction$1(t),
                        r = e && !i && t.init ? function () {
                            this._props = [];
                        } : t,
                        n = {
                            init: _emptyFunc,
                            render: _renderPropTweens,
                            add: _addPropTween,
                            kill: _killPropTweensOf,
                            modifier: _addPluginModifier,
                            rawVars: 0
                        },
                        a = {
                            targetTest: 0,
                            get: 0,
                            getSetter: _getSetter,
                            aliases: {},
                            register: 0
                        };
                    if (_wake(), t !== r) {
                        if (_plugins[e]) return;
                        _setDefaults$1(r, _setDefaults$1(_copyExcluding(t, n), a)), _merge(r.prototype, _merge(n, _copyExcluding(t, a))), _plugins[r.prop = e] = r, t.targetTest && (_harnessPlugins.push(r), _reservedProps[e] = 1), e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
                    }
                    _addGlobal(e, r), t.register && t.register(gsap$2, r, PropTween);
                } else _registerPluginQueue.push(t);
        },
        _255 = 255,
        _colorLookup = {
            aqua: [0, _255, _255],
            lime: [0, _255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, _255],
            navy: [0, 0, 128],
            white: [_255, _255, _255],
            olive: [128, 128, 0],
            yellow: [_255, _255, 0],
            orange: [_255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [_255, 0, 0],
            pink: [_255, 192, 203],
            cyan: [0, _255, _255],
            transparent: [_255, _255, _255, 0]
        },
        _hue = function (t, e, i) {
            return (6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1 ? e + (i - e) * t * 6 : t < .5 ? i : 3 * t < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * _255 + .5 | 0
        },
        splitColor = function (t, e, i) {
            var r, n, a, s, o, _, u, l, c, h, p = t ? _isNumber$1(t) ? [t >> 16, t >> 8 & _255, t & _255] : 0 : _colorLookup.black;
            if (!p) {
                if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), _colorLookup[t]) p = _colorLookup[t];
                else if ("#" === t.charAt(0)) {
                    if (t.length < 6 && (r = t.charAt(1), n = t.charAt(2), a = t.charAt(3), t = "#" + r + r + n + n + a + a + (5 === t.length ? t.charAt(4) + t.charAt(4) : "")), 9 === t.length) return [(p = parseInt(t.substr(1, 6), 16)) >> 16, p >> 8 & _255, p & _255, parseInt(t.substr(7), 16) / 255];
                    p = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & _255, t & _255];
                } else if ("hsl" === t.substr(0, 3))
                    if (p = h = t.match(_strictNumExp), e) {
                        if (~t.indexOf("=")) return p = t.match(_numExp), i && p.length < 4 && (p[3] = 1), p
                    } else s = +p[0] % 360 / 360, o = +p[1] / 100, r = 2 * (_ = +p[2] / 100) - (n = _ <= .5 ? _ * (o + 1) : _ + o - _ * o), p.length > 3 && (p[3] *= 1), p[0] = _hue(s + 1 / 3, r, n), p[1] = _hue(s, r, n), p[2] = _hue(s - 1 / 3, r, n);
                else p = t.match(_strictNumExp) || _colorLookup.transparent;
                p = p.map(Number);
            }
            return e && !h && (r = p[0] / _255, n = p[1] / _255, a = p[2] / _255, _ = ((u = Math.max(r, n, a)) + (l = Math.min(r, n, a))) / 2, u === l ? s = o = 0 : (c = u - l, o = _ > .5 ? c / (2 - u - l) : c / (u + l), s = u === r ? (n - a) / c + (n < a ? 6 : 0) : u === n ? (a - r) / c + 2 : (r - n) / c + 4, s *= 60), p[0] = ~~(s + .5), p[1] = ~~(100 * o + .5), p[2] = ~~(100 * _ + .5)), i && p.length < 4 && (p[3] = 1), p
        },
        _colorOrderData = function (t) {
            var e = [],
                i = [],
                r = -1;
            return t.split(_colorExp).forEach((function (t) {
                var n = t.match(_numWithUnitExp) || [];
                e.push.apply(e, n), i.push(r += n.length + 1);
            })), e.c = i, e
        },
        _formatColors = function (t, e, i) {
            var r, n, a, s, o = "",
                _ = (t + o).match(_colorExp),
                u = e ? "hsla(" : "rgba(",
                l = 0;
            if (!_) return t;
            if (_ = _.map((function (t) {
                return (t = splitColor(t, e, 1)) && u + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")"
            })), i && (a = _colorOrderData(t), (r = i.c).join(o) !== a.c.join(o)))
                for (s = (n = t.replace(_colorExp, "1").split(_numWithUnitExp)).length - 1; l < s; l++) o += n[l] + (~r.indexOf(l) ? _.shift() || u + "0,0,0,0)" : (a.length ? a : _.length ? _ : i).shift());
            if (!n)
                for (s = (n = t.split(_colorExp)).length - 1; l < s; l++) o += n[l] + _[l];
            return o + n[s]
        },
        _colorExp = function () {
            var t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
            for (t in _colorLookup) e += "|" + t + "\\b";
            return new RegExp(e + ")", "gi")
        }(),
        _hslExp = /hsl[a]?\(/,
        _colorStringFilter = function (t) {
            var e, i = t.join(" ");
            if (_colorExp.lastIndex = 0, _colorExp.test(i)) return e = _hslExp.test(i), t[1] = _formatColors(t[1], e), t[0] = _formatColors(t[0], e, _colorOrderData(t[1])), !0
        },
        _ticker = function () {
            var t, e, i, r, n, a, s = Date.now,
                o = 500,
                _ = 33,
                u = s(),
                l = u,
                c = 1e3 / 240,
                h = c,
                p = [],
                d = function i(d) {
                    var f, m, g, v, T = s() - l,
                        y = !0 === d;
                    if ((T > o || T < 0) && (u += T - _), ((f = (g = (l += T) - u) - h) > 0 || y) && (v = ++r.frame, n = g - 1e3 * r.time, r.time = g /= 1e3, h += f + (f >= c ? 4 : c - f), m = 1), y || (t = e(i)), m)
                        for (a = 0; a < p.length; a++) p[a](g, n, v, d);
                };
            return r = {
                time: 0,
                frame: 0,
                tick: function () {
                    d(!0);
                },
                deltaRatio: function (t) {
                    return n / (1e3 / (t || 60))
                },
                wake: function () {
                    _coreReady && (!_coreInitted$2 && _windowExists$2() && (_win$3 = _coreInitted$2 = window, _doc$3 = _win$3.document || {}, _globals.gsap = gsap$2, (_win$3.gsapVersions || (_win$3.gsapVersions = [])).push(gsap$2.version), _install(_installScope || _win$3.GreenSockGlobals || !_win$3.gsap && _win$3 || {}), _registerPluginQueue.forEach(_createPlugin)), i = "undefined" != typeof requestAnimationFrame && requestAnimationFrame, t && r.sleep(), e = i || function (t) {
                        return setTimeout(t, h - 1e3 * r.time + 1 | 0)
                    }, _tickerActive = 1, d(2));
                },
                sleep: function () {
                    (i ? cancelAnimationFrame : clearTimeout)(t), _tickerActive = 0, e = _emptyFunc;
                },
                lagSmoothing: function (t, e) {
                    o = t || 1 / 0, _ = Math.min(e || 33, o);
                },
                fps: function (t) {
                    c = 1e3 / (t || 240), h = 1e3 * r.time + c;
                },
                add: function (t, e, i) {
                    var n = e ? function (e, i, a, s) {
                        t(e, i, a, s), r.remove(n);
                    } : t;
                    return r.remove(t), p[i ? "unshift" : "push"](n), _wake(), n
                },
                remove: function (t, e) {
                    ~(e = p.indexOf(t)) && p.splice(e, 1) && a >= e && a--;
                },
                _listeners: p
            }
        }(),
        _wake = function () {
            return !_tickerActive && _ticker.wake()
        },
        _easeMap = {},
        _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
        _quotesExp = /["']/g,
        _parseObjectInString = function (t) {
            for (var e, i, r, n = {}, a = t.substr(1, t.length - 3).split(":"), s = a[0], o = 1, _ = a.length; o < _; o++) i = a[o], e = o !== _ - 1 ? i.lastIndexOf(",") : i.length, r = i.substr(0, e), n[s] = isNaN(r) ? r.replace(_quotesExp, "").trim() : +r, s = i.substr(e + 1).trim();
            return n
        },
        _valueInParentheses = function (t) {
            var e = t.indexOf("(") + 1,
                i = t.indexOf(")"),
                r = t.indexOf("(", e);
            return t.substring(e, ~r && r < i ? t.indexOf(")", i + 1) : i)
        },
        _configEaseFromString = function (t) {
            var e = (t + "").split("("),
                i = _easeMap[e[0]];
            return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [_parseObjectInString(e[1])] : _valueInParentheses(t).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(t) ? _easeMap._CE("", t) : i
        },
        _invertEase = function (t) {
            return function (e) {
                return 1 - t(1 - e)
            }
        },
        _propagateYoyoEase = function t(e, i) {
            for (var r, n = e._first; n;) n instanceof Timeline ? t(n, i) : !n.vars.yoyoEase || n._yoyo && n._repeat || n._yoyo === i || (n.timeline ? t(n.timeline, i) : (r = n._ease, n._ease = n._yEase, n._yEase = r, n._yoyo = i)), n = n._next;
        },
        _parseEase = function (t, e) {
            return t && (_isFunction$1(t) ? t : _easeMap[t] || _configEaseFromString(t)) || e
        },
        _insertEase = function (t, e, i, r) {
            void 0 === i && (i = function (t) {
                return 1 - e(1 - t)
            }), void 0 === r && (r = function (t) {
                return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2
            });
            var n, a = {
                easeIn: e,
                easeOut: i,
                easeInOut: r
            };
            return _forEachName(t, (function (t) {
                for (var e in _easeMap[t] = _globals[t] = a, _easeMap[n = t.toLowerCase()] = i, a) _easeMap[n + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = _easeMap[t + "." + e] = a[e];
            })), a
        },
        _easeInOutFromOut = function (t) {
            return function (e) {
                return e < .5 ? (1 - t(1 - 2 * e)) / 2 : .5 + t(2 * (e - .5)) / 2
            }
        },
        _configElastic = function t(e, i, r) {
            var n = i >= 1 ? i : 1,
                a = (r || (e ? .3 : .45)) / (i < 1 ? i : 1),
                s = a / _2PI * (Math.asin(1 / n) || 0),
                o = function (t) {
                    return 1 === t ? 1 : n * Math.pow(2, -10 * t) * _sin((t - s) * a) + 1
                },
                _ = "out" === e ? o : "in" === e ? function (t) {
                    return 1 - o(1 - t)
                } : _easeInOutFromOut(o);
            return a = _2PI / a, _.config = function (i, r) {
                return t(e, i, r)
            }, _
        },
        _configBack = function t(e, i) {
            void 0 === i && (i = 1.70158);
            var r = function (t) {
                return t ? --t * t * ((i + 1) * t + i) + 1 : 0
            },
                n = "out" === e ? r : "in" === e ? function (t) {
                    return 1 - r(1 - t)
                } : _easeInOutFromOut(r);
            return n.config = function (i) {
                return t(e, i)
            }, n
        };
    _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", (function (t, e) {
        var i = e < 5 ? e + 1 : e;
        _insertEase(t + ",Power" + (i - 1), e ? function (t) {
            return Math.pow(t, i)
        } : function (t) {
            return t
        }, (function (t) {
            return 1 - Math.pow(1 - t, i)
        }), (function (t) {
            return t < .5 ? Math.pow(2 * t, i) / 2 : 1 - Math.pow(2 * (1 - t), i) / 2
        }));
    })), _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn, _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic()),
        function (t, e) {
            var i = 1 / e,
                r = function (r) {
                    return r < i ? t * r * r : r < .7272727272727273 ? t * Math.pow(r - 1.5 / e, 2) + .75 : r < .9090909090909092 ? t * (r -= 2.25 / e) * r + .9375 : t * Math.pow(r - 2.625 / e, 2) + .984375
                };
            _insertEase("Bounce", (function (t) {
                return 1 - r(1 - t)
            }), r);
        }(7.5625, 2.75), _insertEase("Expo", (function (t) {
            return t ? Math.pow(2, 10 * (t - 1)) : 0
        })), _insertEase("Circ", (function (t) {
            return -(_sqrt(1 - t * t) - 1)
        })), _insertEase("Sine", (function (t) {
            return 1 === t ? 1 : 1 - _cos(t * _HALF_PI)
        })), _insertEase("Back", _configBack("in"), _configBack("out"), _configBack()), _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
            config: function (t, e) {
                void 0 === t && (t = 1);
                var i = 1 / t,
                    r = t + (e ? 0 : 1),
                    n = e ? 1 : 0,
                    a = 1 - _tinyNum;
                return function (t) {
                    return ((r * _clamp$1(0, a, t) | 0) + n) * i
                }
            }
        }, _defaults$1.ease = _easeMap["quad.out"], _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function (t) {
            return _callbackNames += t + "," + t + "Params,"
        }));
    var GSCache = function (t, e) {
        this.id = _gsID++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : _getProperty, this.set = e ? e.getSetter : _getSetter;
    };
    var Animation = function () {
        function t(t) {
            this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, _setDuration(this, +t.duration, 1, 1), this.data = t.data, _context$2 && (this._ctx = _context$2, _context$2.data.push(this)), _tickerActive || _ticker.wake();
        }
        var e = t.prototype;
        return e.delay = function (t) {
            return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), this._delay = t, this) : this._delay
        }, e.duration = function (t) {
            return arguments.length ? this.totalDuration(this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur
        }, e.totalDuration = function (t) {
            return arguments.length ? (this._dirty = 0, _setDuration(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
        }, e.totalTime = function (t, e) {
            if (_wake(), !arguments.length) return this._tTime;
            var i = this._dp;
            if (i && i.smoothChildTiming && this._ts) {
                for (_alignPlayhead(this, t), !i._dp || i.parent || _postAddChecks(i, this); i && i.parent;) i.parent._time !== i._start + (i._ts >= 0 ? i._tTime / i._ts : (i.totalDuration() - i._tTime) / -i._ts) && i.totalTime(i._tTime, !0), i = i.parent;
                !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && t < this._tDur || this._ts < 0 && t > 0 || !this._tDur && !t) && _addToTimeline(this._dp, this, this._start - this._delay);
            }
            return (this._tTime !== t || !this._dur && !e || this._initted && Math.abs(this._zTime) === _tinyNum || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t), _lazySafeRender(this, t, e)), this
        }, e.time = function (t, e) {
            return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), e) : this._time
        }, e.totalProgress = function (t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() > 0 ? 1 : 0
        }, e.progress = function (t, e) {
            return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + _elapsedCycleDuration(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0
        }, e.iteration = function (t, e) {
            var i = this.duration() + this._rDelay;
            return arguments.length ? this.totalTime(this._time + (t - 1) * i, e) : this._repeat ? _animationCycle(this._tTime, i) + 1 : 1
        }, e.timeScale = function (t, e) {
            if (!arguments.length) return this._rts === -_tinyNum ? 0 : this._rts;
            if (this._rts === t) return this;
            var i = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
            return this._rts = +t || 0, this._ts = this._ps || t === -_tinyNum ? 0 : this._rts, this.totalTime(_clamp$1(-Math.abs(this._delay), this._tDur, i), !1 !== e), _setEnd(this), _recacheAncestors(this)
        }, e.paused = function (t) {
            return arguments.length ? (this._ps !== t && (this._ps = t, t ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (_wake(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum)))), this) : this._ps
        }, e.startTime = function (t) {
            if (arguments.length) {
                this._start = t;
                var e = this.parent || this._dp;
                return e && (e._sort || !this.parent) && _addToTimeline(e, this, t - this._delay), this
            }
            return this._start
        }, e.endTime = function (t) {
            return this._start + (_isNotFalse(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
        }, e.rawTime = function (t) {
            var e = this.parent || this._dp;
            return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? _parentToChildTotalTime(e.rawTime(t), this) : this._tTime : this._tTime
        }, e.revert = function (t) {
            void 0 === t && (t = _revertConfig);
            var e = _reverting$1;
            return _reverting$1 = t, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(t), this.totalTime(-.01, t.suppressEvents)), "nested" !== this.data && !1 !== t.kill && this.kill(), _reverting$1 = e, this
        }, e.globalTime = function (t) {
            for (var e = this, i = arguments.length ? t : e.rawTime(); e;) i = e._start + i / (Math.abs(e._ts) || 1), e = e._dp;
            return !this.parent && this._sat ? this._sat.globalTime(t) : i
        }, e.repeat = function (t) {
            return arguments.length ? (this._repeat = t === 1 / 0 ? -2 : t, _onUpdateTotalDuration(this)) : -2 === this._repeat ? 1 / 0 : this._repeat
        }, e.repeatDelay = function (t) {
            if (arguments.length) {
                var e = this._time;
                return this._rDelay = t, _onUpdateTotalDuration(this), e ? this.time(e) : this
            }
            return this._rDelay
        }, e.yoyo = function (t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, e.seek = function (t, e) {
            return this.totalTime(_parsePosition$1(this, t), _isNotFalse(e))
        }, e.restart = function (t, e) {
            return this.play().totalTime(t ? -this._delay : 0, _isNotFalse(e))
        }, e.play = function (t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
        }, e.reverse = function (t, e) {
            return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        }, e.pause = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!0)
        }, e.resume = function () {
            return this.paused(!1)
        }, e.reversed = function (t) {
            return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -_tinyNum : 0)), this) : this._rts < 0
        }, e.invalidate = function () {
            return this._initted = this._act = 0, this._zTime = -_tinyNum, this
        }, e.isActive = function () {
            var t, e = this.parent || this._dp,
                i = this._start;
            return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= i && t < this.endTime(!0) - _tinyNum))
        }, e.eventCallback = function (t, e, i) {
            var r = this.vars;
            return arguments.length > 1 ? (e ? (r[t] = e, i && (r[t + "Params"] = i), "onUpdate" === t && (this._onUpdate = e)) : delete r[t], this) : r[t]
        }, e.then = function (t) {
            var e = this;
            return new Promise((function (i) {
                var r = _isFunction$1(t) ? t : _passThrough$1,
                    n = function () {
                        var t = e.then;
                        e.then = null, _isFunction$1(r) && (r = r(e)) && (r.then || r === e) && (e.then = t), i(r), e.then = t;
                    };
                e._initted && 1 === e.totalProgress() && e._ts >= 0 || !e._tTime && e._ts < 0 ? n() : e._prom = n;
            }))
        }, e.kill = function () {
            _interrupt(this);
        }, t
    }();
    _setDefaults$1(Animation.prototype, {
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
        _zTime: -_tinyNum,
        _prom: 0,
        _ps: !1,
        _rts: 1
    });
    var Timeline = function (t) {
        function e(e, i) {
            var r;
            return void 0 === e && (e = {}), (r = t.call(this, e) || this).labels = {}, r.smoothChildTiming = !!e.smoothChildTiming, r.autoRemoveChildren = !!e.autoRemoveChildren, r._sort = _isNotFalse(e.sortChildren), _globalTimeline && _addToTimeline(e.parent || _globalTimeline, _assertThisInitialized(r), i), e.reversed && r.reverse(), e.paused && r.paused(!0), e.scrollTrigger && _scrollTrigger(_assertThisInitialized(r), e.scrollTrigger), r
        }
        _inheritsLoose(e, t);
        var i = e.prototype;
        return i.to = function (t, e, i) {
            return _createTweenType(0, arguments, this), this
        }, i.from = function (t, e, i) {
            return _createTweenType(1, arguments, this), this
        }, i.fromTo = function (t, e, i, r) {
            return _createTweenType(2, arguments, this), this
        }, i.set = function (t, e, i) {
            return e.duration = 0, e.parent = this, _inheritDefaults(e).repeatDelay || (e.repeat = 0), e.immediateRender = !!e.immediateRender, new Tween(t, e, _parsePosition$1(this, i), 1), this
        }, i.call = function (t, e, i) {
            return _addToTimeline(this, Tween.delayedCall(0, t, e), i)
        }, i.staggerTo = function (t, e, i, r, n, a, s) {
            return i.duration = e, i.stagger = i.stagger || r, i.onComplete = a, i.onCompleteParams = s, i.parent = this, new Tween(t, i, _parsePosition$1(this, n)), this
        }, i.staggerFrom = function (t, e, i, r, n, a, s) {
            return i.runBackwards = 1, _inheritDefaults(i).immediateRender = _isNotFalse(i.immediateRender), this.staggerTo(t, e, i, r, n, a, s)
        }, i.staggerFromTo = function (t, e, i, r, n, a, s, o) {
            return r.startAt = i, _inheritDefaults(r).immediateRender = _isNotFalse(r.immediateRender), this.staggerTo(t, e, r, n, a, s, o)
        }, i.render = function (t, e, i) {
            var r, n, a, s, o, _, u, l, c, h, p, d, f = this._time,
                m = this._dirty ? this.totalDuration() : this._tDur,
                g = this._dur,
                v = t <= 0 ? 0 : _roundPrecise(t),
                T = this._zTime < 0 != t < 0 && (this._initted || !g);
            if (this !== _globalTimeline && v > m && t >= 0 && (v = m), v !== this._tTime || i || T) {
                if (f !== this._time && g && (v += this._time - f, t += this._time - f), r = v, c = this._start, _ = !(l = this._ts), T && (g || (f = this._zTime), (t || !e) && (this._zTime = t)), this._repeat) {
                    if (p = this._yoyo, o = g + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * o + t, e, i);
                    if (r = _roundPrecise(v % o), v === m ? (s = this._repeat, r = g) : ((s = ~~(v / o)) && s === v / o && (r = g, s--), r > g && (r = g)), h = _animationCycle(this._tTime, o), !f && this._tTime && h !== s && this._tTime - h * o - this._dur <= 0 && (h = s), p && 1 & s && (r = g - r, d = 1), s !== h && !this._lock) {
                        var y = p && 1 & h,
                            w = y === (p && 1 & s);
                        if (s < h && (y = !y), f = y ? 0 : v % g ? g : v, this._lock = 1, this.render(f || (d ? 0 : _roundPrecise(s * o)), e, !g)._lock = 0, this._tTime = v, !e && this.parent && _callback$1(this, "onRepeat"), this.vars.repeatRefresh && !d && (this.invalidate()._lock = 1), f && f !== this._time || _ !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
                        if (g = this._dur, m = this._tDur, w && (this._lock = 2, f = y ? g : -1e-4, this.render(f, !0), this.vars.repeatRefresh && !d && this.invalidate()), this._lock = 0, !this._ts && !_) return this;
                        _propagateYoyoEase(this, d);
                    }
                }
                if (this._hasPause && !this._forcing && this._lock < 2 && (u = _findNextPauseTween(this, _roundPrecise(f), _roundPrecise(r))) && (v -= r - (r = u._start)), this._tTime = v, this._time = r, this._act = !l, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = t, f = 0), !f && r && !e && !s && (_callback$1(this, "onStart"), this._tTime !== v)) return this;
                if (r >= f && t >= 0)
                    for (n = this._first; n;) {
                        if (a = n._next, (n._act || r >= n._start) && n._ts && u !== n) {
                            if (n.parent !== this) return this.render(t, e, i);
                            if (n.render(n._ts > 0 ? (r - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (r - n._start) * n._ts, e, i), r !== this._time || !this._ts && !_) {
                                u = 0, a && (v += this._zTime = -_tinyNum);
                                break
                            }
                        }
                        n = a;
                    } else {
                    n = this._last;
                    for (var b = t < 0 ? t : r; n;) {
                        if (a = n._prev, (n._act || b <= n._end) && n._ts && u !== n) {
                            if (n.parent !== this) return this.render(t, e, i);
                            if (n.render(n._ts > 0 ? (b - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (b - n._start) * n._ts, e, i || _reverting$1 && (n._initted || n._startAt)), r !== this._time || !this._ts && !_) {
                                u = 0, a && (v += this._zTime = b ? -_tinyNum : _tinyNum);
                                break
                            }
                        }
                        n = a;
                    }
                }
                if (u && !e && (this.pause(), u.render(r >= f ? 0 : -_tinyNum)._zTime = r >= f ? 1 : -1, this._ts)) return this._start = c, _setEnd(this), this.render(t, e, i);
                this._onUpdate && !e && _callback$1(this, "onUpdate", !0), (v === m && this._tTime >= this.totalDuration() || !v && f) && (c !== this._start && Math.abs(l) === Math.abs(this._ts) || this._lock || ((t || !g) && (v === m && this._ts > 0 || !v && this._ts < 0) && _removeFromParent(this, 1), e || t < 0 && !f || !v && !f && m || (_callback$1(this, v === m && t >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(v < m && this.timeScale() > 0) && this._prom())));
            }
            return this
        }, i.add = function (t, e) {
            var i = this;
            if (_isNumber$1(e) || (e = _parsePosition$1(this, e, t)), !(t instanceof Animation)) {
                if (_isArray(t)) return t.forEach((function (t) {
                    return i.add(t, e)
                })), this;
                if (_isString$1(t)) return this.addLabel(t, e);
                if (!_isFunction$1(t)) return this;
                t = Tween.delayedCall(0, t);
            }
            return this !== t ? _addToTimeline(this, t, e) : this
        }, i.getChildren = function (t, e, i, r) {
            void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === i && (i = !0), void 0 === r && (r = -_bigNum$1);
            for (var n = [], a = this._first; a;) a._start >= r && (a instanceof Tween ? e && n.push(a) : (i && n.push(a), t && n.push.apply(n, a.getChildren(!0, e, i)))), a = a._next;
            return n
        }, i.getById = function (t) {
            for (var e = this.getChildren(1, 1, 1), i = e.length; i--;)
                if (e[i].vars.id === t) return e[i]
        }, i.remove = function (t) {
            return _isString$1(t) ? this.removeLabel(t) : _isFunction$1(t) ? this.killTweensOf(t) : (_removeLinkedListItem(this, t), t === this._recent && (this._recent = this._last), _uncache(this))
        }, i.totalTime = function (e, i) {
            return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? e / this._ts : (this.totalDuration() - e) / -this._ts))), t.prototype.totalTime.call(this, e, i), this._forcing = 0, this) : this._tTime
        }, i.addLabel = function (t, e) {
            return this.labels[t] = _parsePosition$1(this, e), this
        }, i.removeLabel = function (t) {
            return delete this.labels[t], this
        }, i.addPause = function (t, e, i) {
            var r = Tween.delayedCall(0, e || _emptyFunc, i);
            return r.data = "isPause", this._hasPause = 1, _addToTimeline(this, r, _parsePosition$1(this, t))
        }, i.removePause = function (t) {
            var e = this._first;
            for (t = _parsePosition$1(this, t); e;) e._start === t && "isPause" === e.data && _removeFromParent(e), e = e._next;
        }, i.killTweensOf = function (t, e, i) {
            for (var r = this.getTweensOf(t, i), n = r.length; n--;) _overwritingTween !== r[n] && r[n].kill(t, e);
            return this
        }, i.getTweensOf = function (t, e) {
            for (var i, r = [], n = toArray(t), a = this._first, s = _isNumber$1(e); a;) a instanceof Tween ? _arrayContainsAny(a._targets, n) && (s ? (!_overwritingTween || a._initted && a._ts) && a.globalTime(0) <= e && a.globalTime(a.totalDuration()) > e : !e || a.isActive()) && r.push(a) : (i = a.getTweensOf(n, e)).length && r.push.apply(r, i), a = a._next;
            return r
        }, i.tweenTo = function (t, e) {
            e = e || {};
            var i, r = this,
                n = _parsePosition$1(r, t),
                a = e,
                s = a.startAt,
                o = a.onStart,
                _ = a.onStartParams,
                u = a.immediateRender,
                l = Tween.to(r, _setDefaults$1({
                    ease: e.ease || "none",
                    lazy: !1,
                    immediateRender: !1,
                    time: n,
                    overwrite: "auto",
                    duration: e.duration || Math.abs((n - (s && "time" in s ? s.time : r._time)) / r.timeScale()) || _tinyNum,
                    onStart: function () {
                        if (r.pause(), !i) {
                            var t = e.duration || Math.abs((n - (s && "time" in s ? s.time : r._time)) / r.timeScale());
                            l._dur !== t && _setDuration(l, t, 0, 1).render(l._time, !0, !0), i = 1;
                        }
                        o && o.apply(l, _ || []);
                    }
                }, e));
            return u ? l.render(0) : l
        }, i.tweenFromTo = function (t, e, i) {
            return this.tweenTo(e, _setDefaults$1({
                startAt: {
                    time: _parsePosition$1(this, t)
                }
            }, i))
        }, i.recent = function () {
            return this._recent
        }, i.nextLabel = function (t) {
            return void 0 === t && (t = this._time), _getLabelInDirection(this, _parsePosition$1(this, t))
        }, i.previousLabel = function (t) {
            return void 0 === t && (t = this._time), _getLabelInDirection(this, _parsePosition$1(this, t), 1)
        }, i.currentLabel = function (t) {
            return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + _tinyNum)
        }, i.shiftChildren = function (t, e, i) {
            void 0 === i && (i = 0);
            for (var r, n = this._first, a = this.labels; n;) n._start >= i && (n._start += t, n._end += t), n = n._next;
            if (e)
                for (r in a) a[r] >= i && (a[r] += t);
            return _uncache(this)
        }, i.invalidate = function (e) {
            var i = this._first;
            for (this._lock = 0; i;) i.invalidate(e), i = i._next;
            return t.prototype.invalidate.call(this, e)
        }, i.clear = function (t) {
            void 0 === t && (t = !0);
            for (var e, i = this._first; i;) e = i._next, this.remove(i), i = e;
            return this._dp && (this._time = this._tTime = this._pTime = 0), t && (this.labels = {}), _uncache(this)
        }, i.totalDuration = function (t) {
            var e, i, r, n = 0,
                a = this,
                s = a._last,
                o = _bigNum$1;
            if (arguments.length) return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -t : t));
            if (a._dirty) {
                for (r = a.parent; s;) e = s._prev, s._dirty && s.totalDuration(), (i = s._start) > o && a._sort && s._ts && !a._lock ? (a._lock = 1, _addToTimeline(a, s, i - s._delay, 1)._lock = 0) : o = i, i < 0 && s._ts && (n -= i, (!r && !a._dp || r && r.smoothChildTiming) && (a._start += i / a._ts, a._time -= i, a._tTime -= i), a.shiftChildren(-i, !1, -Infinity), o = 0), s._end > n && s._ts && (n = s._end), s = e;
                _setDuration(a, a === _globalTimeline && a._time > n ? a._time : n, 1, 1), a._dirty = 0;
            }
            return a._tDur
        }, e.updateRoot = function (t) {
            if (_globalTimeline._ts && (_lazySafeRender(_globalTimeline, _parentToChildTotalTime(t, _globalTimeline)), _lastRenderedFrame = _ticker.frame), _ticker.frame >= _nextGCFrame) {
                _nextGCFrame += _config.autoSleep || 120;
                var e = _globalTimeline._first;
                if ((!e || !e._ts) && _config.autoSleep && _ticker._listeners.length < 2) {
                    for (; e && !e._ts;) e = e._next;
                    e || _ticker.sleep();
                }
            }
        }, e
    }(Animation);
    _setDefaults$1(Timeline.prototype, {
        _lock: 0,
        _hasPause: 0,
        _forcing: 0
    });
    var _overwritingTween, _forceAllPropTweens, _addComplexStringPropTween = function (t, e, i, r, n, a, s) {
        var o, _, u, l, c, h, p, d, f = new PropTween(this._pt, t, e, 0, 1, _renderComplexString, null, n),
            m = 0,
            g = 0;
        for (f.b = i, f.e = r, i += "", (p = ~(r += "").indexOf("random(")) && (r = _replaceRandom(r)), a && (a(d = [i, r], t, e), i = d[0], r = d[1]), _ = i.match(_complexStringNumExp) || []; o = _complexStringNumExp.exec(r);) l = o[0], c = r.substring(m, o.index), u ? u = (u + 1) % 5 : "rgba(" === c.substr(-5) && (u = 1), l !== _[g++] && (h = parseFloat(_[g - 1]) || 0, f._pt = {
            _next: f._pt,
            p: c || 1 === g ? c : ",",
            s: h,
            c: "=" === l.charAt(1) ? _parseRelative(h, l) - h : parseFloat(l) - h,
            m: u && u < 4 ? Math.round : 0
        }, m = _complexStringNumExp.lastIndex);
        return f.c = m < r.length ? r.substring(m, r.length) : "", f.fp = s, (_relExp.test(r) || p) && (f.e = 0), this._pt = f, f
    },
        _addPropTween = function (t, e, i, r, n, a, s, o, _, u) {
            _isFunction$1(r) && (r = r(n || 0, t, a));
            var l, c = t[e],
                h = "get" !== i ? i : _isFunction$1(c) ? _ ? t[e.indexOf("set") || !_isFunction$1(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](_) : t[e]() : c,
                p = _isFunction$1(c) ? _ ? _setterFuncWithParam : _setterFunc : _setterPlain;
            if (_isString$1(r) && (~r.indexOf("random(") && (r = _replaceRandom(r)), "=" === r.charAt(1) && ((l = _parseRelative(h, r) + (getUnit(h) || 0)) || 0 === l) && (r = l)), !u || h !== r || _forceAllPropTweens) return isNaN(h * r) || "" === r ? (!c && !(e in t) && _missingPlugin(e, r), _addComplexStringPropTween.call(this, t, e, h, r, p, o || _config.stringFilter, _)) : (l = new PropTween(this._pt, t, e, +h || 0, r - (h || 0), "boolean" == typeof c ? _renderBoolean : _renderPlain, 0, p), _ && (l.fp = _), s && l.modifier(s, this, t), this._pt = l)
        },
        _processVars = function (t, e, i, r, n) {
            if (_isFunction$1(t) && (t = _parseFuncOrString(t, n, e, i, r)), !_isObject$1(t) || t.style && t.nodeType || _isArray(t) || _isTypedArray(t)) return _isString$1(t) ? _parseFuncOrString(t, n, e, i, r) : t;
            var a, s = {};
            for (a in t) s[a] = _parseFuncOrString(t[a], n, e, i, r);
            return s
        },
        _checkPlugin = function (t, e, i, r, n, a) {
            var s, o, _, u;
            if (_plugins[t] && !1 !== (s = new _plugins[t]).init(n, s.rawVars ? e[t] : _processVars(e[t], r, n, a, i), i, r, a) && (i._pt = o = new PropTween(i._pt, n, t, 0, 1, s.render, s, 0, s.priority), i !== _quickTween))
                for (_ = i._ptLookup[i._targets.indexOf(n)], u = s._props.length; u--;) _[s._props[u]] = o;
            return s
        },
        _initTween = function t(e, i, r) {
            var n, a, s, o, _, u, l, c, h, p, d, f, m, g = e.vars,
                v = g.ease,
                T = g.startAt,
                y = g.immediateRender,
                w = g.lazy,
                b = g.onUpdate,
                x = g.runBackwards,
                P = g.yoyoEase,
                k = g.keyframes,
                E = g.autoRevert,
                A = e._dur,
                M = e._startAt,
                S = e._targets,
                C = e.parent,
                D = C && "nested" === C.data ? C.vars.targets : S,
                F = "auto" === e._overwrite && !_suppressOverwrites$1,
                N = e.timeline;
            if (N && (!k || !v) && (v = "none"), e._ease = _parseEase(v, _defaults$1.ease), e._yEase = P ? _invertEase(_parseEase(!0 === P ? v : P, _defaults$1.ease)) : 0, P && e._yoyo && !e._repeat && (P = e._yEase, e._yEase = e._ease, e._ease = P), e._from = !N && !!g.runBackwards, !N || k && !g.stagger) {
                if (f = (c = S[0] ? _getCache(S[0]).harness : 0) && g[c.prop], n = _copyExcluding(g, _reservedProps), M && (M._zTime < 0 && M.progress(1), i < 0 && x && y && !E ? M.render(-1, !0) : M.revert(x && A ? _revertConfigNoKill : _startAtRevertConfig), M._lazy = 0), T) {
                    if (_removeFromParent(e._startAt = Tween.set(S, _setDefaults$1({
                        data: "isStart",
                        overwrite: !1,
                        parent: C,
                        immediateRender: !0,
                        lazy: !M && _isNotFalse(w),
                        startAt: null,
                        delay: 0,
                        onUpdate: b && function () {
                            return _callback$1(e, "onUpdate")
                        },
                        stagger: 0
                    }, T))), e._startAt._dp = 0, e._startAt._sat = e, i < 0 && (_reverting$1 || !y && !E) && e._startAt.revert(_revertConfigNoKill), y && A && i <= 0 && r <= 0) return void (i && (e._zTime = i))
                } else if (x && A && !M)
                    if (i && (y = !1), s = _setDefaults$1({
                        overwrite: !1,
                        data: "isFromStart",
                        lazy: y && !M && _isNotFalse(w),
                        immediateRender: y,
                        stagger: 0,
                        parent: C
                    }, n), f && (s[c.prop] = f), _removeFromParent(e._startAt = Tween.set(S, s)), e._startAt._dp = 0, e._startAt._sat = e, i < 0 && (_reverting$1 ? e._startAt.revert(_revertConfigNoKill) : e._startAt.render(-1, !0)), e._zTime = i, y) {
                        if (!i) return
                    } else t(e._startAt, _tinyNum, _tinyNum);
                for (e._pt = e._ptCache = 0, w = A && _isNotFalse(w) || w && !A, a = 0; a < S.length; a++) {
                    if (l = (_ = S[a])._gsap || _harness(S)[a]._gsap, e._ptLookup[a] = p = {}, _lazyLookup[l.id] && _lazyTweens.length && _lazyRender(), d = D === S ? a : D.indexOf(_), c && !1 !== (h = new c).init(_, f || n, e, d, D) && (e._pt = o = new PropTween(e._pt, _, h.name, 0, 1, h.render, h, 0, h.priority), h._props.forEach((function (t) {
                        p[t] = o;
                    })), h.priority && (u = 1)), !c || f)
                        for (s in n) _plugins[s] && (h = _checkPlugin(s, n, e, d, _, D)) ? h.priority && (u = 1) : p[s] = o = _addPropTween.call(e, _, s, "get", n[s], d, D, 0, g.stringFilter);
                    e._op && e._op[a] && e.kill(_, e._op[a]), F && e._pt && (_overwritingTween = e, _globalTimeline.killTweensOf(_, p, e.globalTime(i)), m = !e.parent, _overwritingTween = 0), e._pt && w && (_lazyLookup[l.id] = 1);
                }
                u && _sortPropTweensByPriority(e), e._onInit && e._onInit(e);
            }
            e._onUpdate = b, e._initted = (!e._op || e._pt) && !m, k && i <= 0 && N.render(_bigNum$1, !0, !0);
        },
        _updatePropTweens = function (t, e, i, r, n, a, s, o) {
            var _, u, l, c, h = (t._pt && t._ptCache || (t._ptCache = {}))[e];
            if (!h)
                for (h = t._ptCache[e] = [], l = t._ptLookup, c = t._targets.length; c--;) {
                    if ((_ = l[c][e]) && _.d && _.d._pt)
                        for (_ = _.d._pt; _ && _.p !== e && _.fp !== e;) _ = _._next;
                    if (!_) return _forceAllPropTweens = 1, t.vars[e] = "+=0", _initTween(t, s), _forceAllPropTweens = 0, o ? _warn(e + " not eligible for reset") : 1;
                    h.push(_);
                }
            for (c = h.length; c--;)(_ = (u = h[c])._pt || u).s = !r && 0 !== r || n ? _.s + (r || 0) + a * _.c : r, _.c = i - _.s, u.e && (u.e = _round$1(i) + getUnit(u.e)), u.b && (u.b = _.s + getUnit(u.b));
        },
        _addAliasesToVars = function (t, e) {
            var i, r, n, a, s = t[0] ? _getCache(t[0]).harness : 0,
                o = s && s.aliases;
            if (!o) return e;
            for (r in i = _merge({}, e), o)
                if (r in i)
                    for (n = (a = o[r].split(",")).length; n--;) i[a[n]] = i[r];
            return i
        },
        _parseKeyframe = function (t, e, i, r) {
            var n, a, s = e.ease || r || "power1.inOut";
            if (_isArray(e)) a = i[t] || (i[t] = []), e.forEach((function (t, i) {
                return a.push({
                    t: i / (e.length - 1) * 100,
                    v: t,
                    e: s
                })
            }));
            else
                for (n in e) a = i[n] || (i[n] = []), "ease" === n || a.push({
                    t: parseFloat(t),
                    v: e[n],
                    e: s
                });
        },
        _parseFuncOrString = function (t, e, i, r, n) {
            return _isFunction$1(t) ? t.call(e, i, r, n) : _isString$1(t) && ~t.indexOf("random(") ? _replaceRandom(t) : t
        },
        _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
        _staggerPropsToSkip = {};
    _forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", (function (t) {
        return _staggerPropsToSkip[t] = 1
    }));
    var Tween = function (t) {
        function e(e, i, r, n) {
            var a;
            "number" == typeof i && (r.duration = i, i = r, r = null);
            var s, o, _, u, l, c, h, p, d = (a = t.call(this, n ? i : _inheritDefaults(i)) || this).vars,
                f = d.duration,
                m = d.delay,
                g = d.immediateRender,
                v = d.stagger,
                T = d.overwrite,
                y = d.keyframes,
                w = d.defaults,
                b = d.scrollTrigger,
                x = d.yoyoEase,
                P = i.parent || _globalTimeline,
                k = (_isArray(e) || _isTypedArray(e) ? _isNumber$1(e[0]) : "length" in i) ? [e] : toArray(e);
            if (a._targets = k.length ? _harness(k) : _warn("GSAP target " + e + " not found. https://gsap.com", !_config.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = T, y || v || _isFuncOrString(f) || _isFuncOrString(m)) {
                if (i = a.vars, (s = a.timeline = new Timeline({
                    data: "nested",
                    defaults: w || {},
                    targets: P && "nested" === P.data ? P.vars.targets : k
                })).kill(), s.parent = s._dp = _assertThisInitialized(a), s._start = 0, v || _isFuncOrString(f) || _isFuncOrString(m)) {
                    if (u = k.length, h = v && distribute(v), _isObject$1(v))
                        for (l in v) ~_staggerTweenProps.indexOf(l) && (p || (p = {}), p[l] = v[l]);
                    for (o = 0; o < u; o++)(_ = _copyExcluding(i, _staggerPropsToSkip)).stagger = 0, x && (_.yoyoEase = x), p && _merge(_, p), c = k[o], _.duration = +_parseFuncOrString(f, _assertThisInitialized(a), o, c, k), _.delay = (+_parseFuncOrString(m, _assertThisInitialized(a), o, c, k) || 0) - a._delay, !v && 1 === u && _.delay && (a._delay = m = _.delay, a._start += m, _.delay = 0), s.to(c, _, h ? h(o, c, k) : 0), s._ease = _easeMap.none;
                    s.duration() ? f = m = 0 : a.timeline = 0;
                } else if (y) {
                    _inheritDefaults(_setDefaults$1(s.vars.defaults, {
                        ease: "none"
                    })), s._ease = _parseEase(y.ease || i.ease || "none");
                    var E, A, M, S = 0;
                    if (_isArray(y)) y.forEach((function (t) {
                        return s.to(k, t, ">")
                    })), s.duration();
                    else {
                        for (l in _ = {}, y) "ease" === l || "easeEach" === l || _parseKeyframe(l, y[l], _, y.easeEach);
                        for (l in _)
                            for (E = _[l].sort((function (t, e) {
                                return t.t - e.t
                            })), S = 0, o = 0; o < E.length; o++)(M = {
                                ease: (A = E[o]).e,
                                duration: (A.t - (o ? E[o - 1].t : 0)) / 100 * f
                            })[l] = A.v, s.to(k, M, S), S += M.duration;
                        s.duration() < f && s.to({}, {
                            duration: f - s.duration()
                        });
                    }
                }
                f || a.duration(f = s.duration());
            } else a.timeline = 0;
            return !0 !== T || _suppressOverwrites$1 || (_overwritingTween = _assertThisInitialized(a), _globalTimeline.killTweensOf(k), _overwritingTween = 0), _addToTimeline(P, _assertThisInitialized(a), r), i.reversed && a.reverse(), i.paused && a.paused(!0), (g || !f && !y && a._start === _roundPrecise(P._time) && _isNotFalse(g) && _hasNoPausedAncestors(_assertThisInitialized(a)) && "nested" !== P.data) && (a._tTime = -_tinyNum, a.render(Math.max(0, -m) || 0)), b && _scrollTrigger(_assertThisInitialized(a), b), a
        }
        _inheritsLoose(e, t);
        var i = e.prototype;
        return i.render = function (t, e, i) {
            var r, n, a, s, o, _, u, l, c, h = this._time,
                p = this._tDur,
                d = this._dur,
                f = t < 0,
                m = t > p - _tinyNum && !f ? p : t < _tinyNum ? 0 : t;
            if (d) {
                if (m !== this._tTime || !t || i || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== f) {
                    if (r = m, l = this.timeline, this._repeat) {
                        if (s = d + this._rDelay, this._repeat < -1 && f) return this.totalTime(100 * s + t, e, i);
                        if (r = _roundPrecise(m % s), m === p ? (a = this._repeat, r = d) : ((a = ~~(m / s)) && a === _roundPrecise(m / s) && (r = d, a--), r > d && (r = d)), (_ = this._yoyo && 1 & a) && (c = this._yEase, r = d - r), o = _animationCycle(this._tTime, s), r === h && !i && this._initted && a === o) return this._tTime = m, this;
                        a !== o && (l && this._yEase && _propagateYoyoEase(l, _), this.vars.repeatRefresh && !_ && !this._lock && this._time !== s && this._initted && (this._lock = i = 1, this.render(_roundPrecise(s * a), !0).invalidate()._lock = 0));
                    }
                    if (!this._initted) {
                        if (_attemptInitTween(this, f ? t : r, i, e, m)) return this._tTime = 0, this;
                        if (!(h === this._time || i && this.vars.repeatRefresh && a !== o)) return this;
                        if (d !== this._dur) return this.render(t, e, i)
                    }
                    if (this._tTime = m, this._time = r, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = u = (c || this._ease)(r / d), this._from && (this.ratio = u = 1 - u), r && !h && !e && !a && (_callback$1(this, "onStart"), this._tTime !== m)) return this;
                    for (n = this._pt; n;) n.r(u, n.d), n = n._next;
                    l && l.render(t < 0 ? t : l._dur * l._ease(r / this._dur), e, i) || this._startAt && (this._zTime = t), this._onUpdate && !e && (f && _rewindStartAt(this, t, e, i), _callback$1(this, "onUpdate")), this._repeat && a !== o && this.vars.onRepeat && !e && this.parent && _callback$1(this, "onRepeat"), m !== this._tDur && m || this._tTime !== m || (f && !this._onUpdate && _rewindStartAt(this, t, !0, !0), (t || !d) && (m === this._tDur && this._ts > 0 || !m && this._ts < 0) && _removeFromParent(this, 1), e || f && !h || !(m || h || _) || (_callback$1(this, m === p ? "onComplete" : "onReverseComplete", !0), this._prom && !(m < p && this.timeScale() > 0) && this._prom()));
                }
            } else _renderZeroDurationTween(this, t, e, i);
            return this
        }, i.targets = function () {
            return this._targets
        }, i.invalidate = function (e) {
            return (!e || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(e), t.prototype.invalidate.call(this, e)
        }, i.resetTo = function (t, e, i, r, n) {
            _tickerActive || _ticker.wake(), this._ts || this.play();
            var a, s = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
            return this._initted || _initTween(this, s), a = this._ease(s / this._dur), _updatePropTweens(this, t, e, i, r, a, s, n) ? this.resetTo(t, e, i, r, 1) : (_alignPlayhead(this, 0), this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0))
        }, i.kill = function (t, e) {
            if (void 0 === e && (e = "all"), !(t || e && "all" !== e)) return this._lazy = this._pt = 0, this.parent ? _interrupt(this) : this;
            if (this.timeline) {
                var i = this.timeline.totalDuration();
                return this.timeline.killTweensOf(t, e, _overwritingTween && !0 !== _overwritingTween.vars.overwrite)._first || _interrupt(this), this.parent && i !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / i, 0, 1), this
            }
            var r, n, a, s, o, _, u, l = this._targets,
                c = t ? toArray(t) : l,
                h = this._ptLookup,
                p = this._pt;
            if ((!e || "all" === e) && _arraysMatch(l, c)) return "all" === e && (this._pt = 0), _interrupt(this);
            for (r = this._op = this._op || [], "all" !== e && (_isString$1(e) && (o = {}, _forEachName(e, (function (t) {
                return o[t] = 1
            })), e = o), e = _addAliasesToVars(l, e)), u = l.length; u--;)
                if (~c.indexOf(l[u]))
                    for (o in n = h[u], "all" === e ? (r[u] = e, s = n, a = {}) : (a = r[u] = r[u] || {}, s = e), s) (_ = n && n[o]) && ("kill" in _.d && !0 !== _.d.kill(o) || _removeLinkedListItem(this, _, "_pt"), delete n[o]), "all" !== a && (a[o] = 1);
            return this._initted && !this._pt && p && _interrupt(this), this
        }, e.to = function (t, i) {
            return new e(t, i, arguments[2])
        }, e.from = function (t, e) {
            return _createTweenType(1, arguments)
        }, e.delayedCall = function (t, i, r, n) {
            return new e(i, 0, {
                immediateRender: !1,
                lazy: !1,
                overwrite: !1,
                delay: t,
                onComplete: i,
                onReverseComplete: i,
                onCompleteParams: r,
                onReverseCompleteParams: r,
                callbackScope: n
            })
        }, e.fromTo = function (t, e, i) {
            return _createTweenType(2, arguments)
        }, e.set = function (t, i) {
            return i.duration = 0, i.repeatDelay || (i.repeat = 0), new e(t, i)
        }, e.killTweensOf = function (t, e, i) {
            return _globalTimeline.killTweensOf(t, e, i)
        }, e
    }(Animation);
    _setDefaults$1(Tween.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0
    }), _forEachName("staggerTo,staggerFrom,staggerFromTo", (function (t) {
        Tween[t] = function () {
            var e = new Timeline,
                i = _slice.call(arguments, 0);
            return i.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, i)
        };
    }));
    var _setterPlain = function (t, e, i) {
        return t[e] = i
    },
        _setterFunc = function (t, e, i) {
            return t[e](i)
        },
        _setterFuncWithParam = function (t, e, i, r) {
            return t[e](r.fp, i)
        },
        _setterAttribute = function (t, e, i) {
            return t.setAttribute(e, i)
        },
        _getSetter = function (t, e) {
            return _isFunction$1(t[e]) ? _setterFunc : _isUndefined(t[e]) && t.setAttribute ? _setterAttribute : _setterPlain
        },
        _renderPlain = function (t, e) {
            return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e)
        },
        _renderBoolean = function (t, e) {
            return e.set(e.t, e.p, !!(e.s + e.c * t), e)
        },
        _renderComplexString = function (t, e) {
            var i = e._pt,
                r = "";
            if (!t && e.b) r = e.b;
            else if (1 === t && e.e) r = e.e;
            else {
                for (; i;) r = i.p + (i.m ? i.m(i.s + i.c * t) : Math.round(1e4 * (i.s + i.c * t)) / 1e4) + r, i = i._next;
                r += e.c;
            }
            e.set(e.t, e.p, r, e);
        },
        _renderPropTweens = function (t, e) {
            for (var i = e._pt; i;) i.r(t, i.d), i = i._next;
        },
        _addPluginModifier = function (t, e, i, r) {
            for (var n, a = this._pt; a;) n = a._next, a.p === r && a.modifier(t, e, i), a = n;
        },
        _killPropTweensOf = function (t) {
            for (var e, i, r = this._pt; r;) i = r._next, r.p === t && !r.op || r.op === t ? _removeLinkedListItem(this, r, "_pt") : r.dep || (e = 1), r = i;
            return !e
        },
        _setterWithModifier = function (t, e, i, r) {
            r.mSet(t, e, r.m.call(r.tween, i, r.mt), r);
        },
        _sortPropTweensByPriority = function (t) {
            for (var e, i, r, n, a = t._pt; a;) {
                for (e = a._next, i = r; i && i.pr > a.pr;) i = i._next;
                (a._prev = i ? i._prev : n) ? a._prev._next = a : r = a, (a._next = i) ? i._prev = a : n = a, a = e;
            }
            t._pt = r;
        };
    var PropTween = function () {
        function t(t, e, i, r, n, a, s, o, _) {
            this.t = e, this.s = r, this.c = n, this.p = i, this.r = a || _renderPlain, this.d = s || this, this.set = o || _setterPlain, this.pr = _ || 0, this._next = t, t && (t._prev = this);
        }
        return t.prototype.modifier = function (t, e, i) {
            this.mSet = this.mSet || this.set, this.set = _setterWithModifier, this.m = t, this.mt = i, this.tween = e;
        }, t
    }();
    _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function (t) {
        return _reservedProps[t] = 1
    })), _globals.TweenMax = _globals.TweenLite = Tween, _globals.TimelineLite = _globals.TimelineMax = Timeline, _globalTimeline = new Timeline({
        sortChildren: !1,
        defaults: _defaults$1,
        autoRemoveChildren: !0,
        id: "root",
        smoothChildTiming: !0
    }), _config.stringFilter = _colorStringFilter;
    var _media = [],
        _listeners$1 = {},
        _emptyArray$1 = [],
        _lastMediaTime = 0,
        _contextID = 0,
        _dispatch$1 = function (t) {
            return (_listeners$1[t] || _emptyArray$1).map((function (t) {
                return t()
            }))
        },
        _onMediaChange = function () {
            var t = Date.now(),
                e = [];
            t - _lastMediaTime > 2 && (_dispatch$1("matchMediaInit"), _media.forEach((function (t) {
                var i, r, n, a, s = t.queries,
                    o = t.conditions;
                for (r in s) (i = _win$3.matchMedia(s[r]).matches) && (n = 1), i !== o[r] && (o[r] = i, a = 1);
                a && (t.revert(), n && e.push(t));
            })), _dispatch$1("matchMediaRevert"), e.forEach((function (t) {
                return t.onMatch(t, (function (e) {
                    return t.add(null, e)
                }))
            })), _lastMediaTime = t, _dispatch$1("matchMedia"));
        },
        Context = function () {
            function t(t, e) {
                this.selector = e && selector(e), this.data = [], this._r = [], this.isReverted = !1, this.id = _contextID++, t && this.add(t);
            }
            var e = t.prototype;
            return e.add = function (t, e, i) {
                _isFunction$1(t) && (i = e, e = t, t = _isFunction$1);
                var r = this,
                    n = function () {
                        var t, n = _context$2,
                            a = r.selector;
                        return n && n !== r && n.data.push(r), i && (r.selector = selector(i)), _context$2 = r, t = e.apply(r, arguments), _isFunction$1(t) && r._r.push(t), _context$2 = n, r.selector = a, r.isReverted = !1, t
                    };
                return r.last = n, t === _isFunction$1 ? n(r, (function (t) {
                    return r.add(null, t)
                })) : t ? r[t] = n : n
            }, e.ignore = function (t) {
                var e = _context$2;
                _context$2 = null, t(this), _context$2 = e;
            }, e.getTweens = function () {
                var e = [];
                return this.data.forEach((function (i) {
                    return i instanceof t ? e.push.apply(e, i.getTweens()) : i instanceof Tween && !(i.parent && "nested" === i.parent.data) && e.push(i)
                })), e
            }, e.clear = function () {
                this._r.length = this.data.length = 0;
            }, e.kill = function (t, e) {
                var i = this;
                if (t ? function () {
                    for (var e, r = i.getTweens(), n = i.data.length; n--;) "isFlip" === (e = i.data[n]).data && (e.revert(), e.getChildren(!0, !0, !1).forEach((function (t) {
                        return r.splice(r.indexOf(t), 1)
                    })));
                    for (r.map((function (t) {
                        return {
                            g: t._dur || t._delay || t._sat && !t._sat.vars.immediateRender ? t.globalTime(0) : -1 / 0,
                            t: t
                        }
                    })).sort((function (t, e) {
                        return e.g - t.g || -1 / 0
                    })).forEach((function (e) {
                        return e.t.revert(t)
                    })), n = i.data.length; n--;)(e = i.data[n]) instanceof Timeline ? "nested" !== e.data && (e.scrollTrigger && e.scrollTrigger.revert(), e.kill()) : !(e instanceof Tween) && e.revert && e.revert(t);
                    i._r.forEach((function (e) {
                        return e(t, i)
                    })), i.isReverted = !0;
                }() : this.data.forEach((function (t) {
                    return t.kill && t.kill()
                })), this.clear(), e)
                    for (var r = _media.length; r--;) _media[r].id === this.id && _media.splice(r, 1);
            }, e.revert = function (t) {
                this.kill(t || {});
            }, t
        }(),
        MatchMedia = function () {
            function t(t) {
                this.contexts = [], this.scope = t, _context$2 && _context$2.data.push(this);
            }
            var e = t.prototype;
            return e.add = function (t, e, i) {
                _isObject$1(t) || (t = {
                    matches: t
                });
                var r, n, a, s = new Context(0, i || this.scope),
                    o = s.conditions = {};
                for (n in _context$2 && !s.selector && (s.selector = _context$2.selector), this.contexts.push(s), e = s.add("onMatch", e), s.queries = t, t) "all" === n ? a = 1 : (r = _win$3.matchMedia(t[n])) && (_media.indexOf(s) < 0 && _media.push(s), (o[n] = r.matches) && (a = 1), r.addListener ? r.addListener(_onMediaChange) : r.addEventListener("change", _onMediaChange));
                return a && e(s, (function (t) {
                    return s.add(null, t)
                })), this
            }, e.revert = function (t) {
                this.kill(t || {});
            }, e.kill = function (t) {
                this.contexts.forEach((function (e) {
                    return e.kill(t, !0)
                }));
            }, t
        }(),
        _gsap = {
            registerPlugin: function () {
                for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
                e.forEach((function (t) {
                    return _createPlugin(t)
                }));
            },
            timeline: function (t) {
                return new Timeline(t)
            },
            getTweensOf: function (t, e) {
                return _globalTimeline.getTweensOf(t, e)
            },
            getProperty: function (t, e, i, r) {
                _isString$1(t) && (t = toArray(t)[0]);
                var n = _getCache(t || {}).get,
                    a = i ? _passThrough$1 : _numericIfPossible;
                return "native" === i && (i = ""), t ? e ? a((_plugins[e] && _plugins[e].get || n)(t, e, i, r)) : function (e, i, r) {
                    return a((_plugins[e] && _plugins[e].get || n)(t, e, i, r))
                } : t
            },
            quickSetter: function (t, e, i) {
                if ((t = toArray(t)).length > 1) {
                    var r = t.map((function (t) {
                        return gsap$2.quickSetter(t, e, i)
                    })),
                        n = r.length;
                    return function (t) {
                        for (var e = n; e--;) r[e](t);
                    }
                }
                t = t[0] || {};
                var a = _plugins[e],
                    s = _getCache(t),
                    o = s.harness && (s.harness.aliases || {})[e] || e,
                    _ = a ? function (e) {
                        var r = new a;
                        _quickTween._pt = 0, r.init(t, i ? e + i : e, _quickTween, 0, [t]), r.render(1, r), _quickTween._pt && _renderPropTweens(1, _quickTween);
                    } : s.set(t, o);
                return a ? _ : function (e) {
                    return _(t, o, i ? e + i : e, s, 1)
                }
            },
            quickTo: function (t, e, i) {
                var r, n = gsap$2.to(t, _merge(((r = {})[e] = "+=0.1", r.paused = !0, r), i || {})),
                    a = function (t, i, r) {
                        return n.resetTo(e, t, i, r)
                    };
                return a.tween = n, a
            },
            isTweening: function (t) {
                return _globalTimeline.getTweensOf(t, !0).length > 0
            },
            defaults: function (t) {
                return t && t.ease && (t.ease = _parseEase(t.ease, _defaults$1.ease)), _mergeDeep(_defaults$1, t || {})
            },
            config: function (t) {
                return _mergeDeep(_config, t || {})
            },
            registerEffect: function (t) {
                var e = t.name,
                    i = t.effect,
                    r = t.plugins,
                    n = t.defaults,
                    a = t.extendTimeline;
                (r || "").split(",").forEach((function (t) {
                    return t && !_plugins[t] && !_globals[t] && _warn(e + " effect requires " + t + " plugin.")
                })), _effects[e] = function (t, e, r) {
                    return i(toArray(t), _setDefaults$1(e || {}, n), r)
                }, a && (Timeline.prototype[e] = function (t, i, r) {
                    return this.add(_effects[e](t, _isObject$1(i) ? i : (r = i) && {}, this), r)
                });
            },
            registerEase: function (t, e) {
                _easeMap[t] = _parseEase(e);
            },
            parseEase: function (t, e) {
                return arguments.length ? _parseEase(t, e) : _easeMap
            },
            getById: function (t) {
                return _globalTimeline.getById(t)
            },
            exportRoot: function (t, e) {
                void 0 === t && (t = {});
                var i, r, n = new Timeline(t);
                for (n.smoothChildTiming = _isNotFalse(t.smoothChildTiming), _globalTimeline.remove(n), n._dp = 0, n._time = n._tTime = _globalTimeline._time, i = _globalTimeline._first; i;) r = i._next, !e && !i._dur && i instanceof Tween && i.vars.onComplete === i._targets[0] || _addToTimeline(n, i, i._start - i._delay), i = r;
                return _addToTimeline(_globalTimeline, n, 0), n
            },
            context: function (t, e) {
                return t ? new Context(t, e) : _context$2
            },
            matchMedia: function (t) {
                return new MatchMedia(t)
            },
            matchMediaRefresh: function () {
                return _media.forEach((function (t) {
                    var e, i, r = t.conditions;
                    for (i in r) r[i] && (r[i] = !1, e = 1);
                    e && t.revert();
                })) || _onMediaChange()
            },
            addEventListener: function (t, e) {
                var i = _listeners$1[t] || (_listeners$1[t] = []);
                ~i.indexOf(e) || i.push(e);
            },
            removeEventListener: function (t, e) {
                var i = _listeners$1[t],
                    r = i && i.indexOf(e);
                r >= 0 && i.splice(r, 1);
            },
            utils: {
                wrap: wrap,
                wrapYoyo: wrapYoyo,
                distribute: distribute,
                random: random,
                snap: snap,
                normalize: normalize,
                getUnit: getUnit,
                clamp: clamp,
                splitColor: splitColor,
                toArray: toArray,
                selector: selector,
                mapRange: mapRange,
                pipe: pipe,
                unitize: unitize,
                interpolate: interpolate,
                shuffle: shuffle
            },
            install: _install,
            effects: _effects,
            ticker: _ticker,
            updateRoot: Timeline.updateRoot,
            plugins: _plugins,
            globalTimeline: _globalTimeline,
            core: {
                PropTween: PropTween,
                globals: _addGlobal,
                Tween: Tween,
                Timeline: Timeline,
                Animation: Animation,
                getCache: _getCache,
                _removeLinkedListItem: _removeLinkedListItem,
                reverting: function () {
                    return _reverting$1
                },
                context: function (t) {
                    return t && _context$2 && (_context$2.data.push(t), t._ctx = _context$2), _context$2
                },
                suppressOverwrites: function (t) {
                    return _suppressOverwrites$1 = t
                }
            }
        };
    _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", (function (t) {
        return _gsap[t] = Tween[t]
    })), _ticker.add(Timeline.updateRoot), _quickTween = _gsap.to({}, {
        duration: 0
    });
    var _getPluginPropTween = function (t, e) {
        for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e;) i = i._next;
        return i
    },
        _addModifiers = function (t, e) {
            var i, r, n, a = t._targets;
            for (i in e)
                for (r = a.length; r--;)(n = t._ptLookup[r][i]) && (n = n.d) && (n._pt && (n = _getPluginPropTween(n, i)), n && n.modifier && n.modifier(e[i], t, a[r], i));
        },
        _buildModifierPlugin = function (t, e) {
            return {
                name: t,
                rawVars: 1,
                init: function (t, i, r) {
                    r._onInit = function (t) {
                        var r, n;
                        if (_isString$1(i) && (r = {}, _forEachName(i, (function (t) {
                            return r[t] = 1
                        })), i = r), e) {
                            for (n in r = {}, i) r[n] = e(i[n]);
                            i = r;
                        }
                        _addModifiers(t, i);
                    };
                }
            }
        };
    var gsap$2 = _gsap.registerPlugin({
        name: "attr",
        init: function (t, e, i, r, n) {
            var a, s, o;
            for (a in this.tween = i, e) o = t.getAttribute(a) || "", (s = this.add(t, "setAttribute", (o || 0) + "", e[a], r, n, 0, 0, a)).op = a, s.b = o, this._props.push(a);
        },
        render: function (t, e) {
            for (var i = e._pt; i;) _reverting$1 ? i.set(i.t, i.p, i.b, i) : i.r(t, i.d), i = i._next;
        }
    }, {
        name: "endArray",
        init: function (t, e) {
            for (var i = e.length; i--;) this.add(t, i, t[i] || 0, e[i], 0, 0, 0, 0, 0, 1);
        }
    }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
    Tween.version = Timeline.version = gsap$2.version = "3.12.5", _coreReady = 1, _windowExists$2() && _wake();
    _easeMap.Power0;
    _easeMap.Power1;
    _easeMap.Power2;
    _easeMap.Power3;
    _easeMap.Power4;
    _easeMap.Linear;
    _easeMap.Quad;
    _easeMap.Cubic;
    _easeMap.Quart;
    _easeMap.Quint;
    _easeMap.Strong;
    _easeMap.Elastic;
    _easeMap.Back;
    _easeMap.SteppedEase;
    _easeMap.Bounce;
    _easeMap.Sine;
    _easeMap.Expo;
    _easeMap.Circ;

    /*!
     * CSSPlugin 3.12.5
     * https://gsap.com
     *
     * Copyright 2008-2024, GreenSock. All rights reserved.
     * Subject to the terms at https://gsap.com/standard-license or for
     * Club GSAP members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
     */
    var _win$2, _doc$2, _docElement, _pluginInitted, _tempDiv, _recentSetterPlugin, _reverting, _supports3D, _windowExists$1 = function () {
        return "undefined" != typeof window
    },
        _transformProps = {},
        _RAD2DEG = 180 / Math.PI,
        _DEG2RAD = Math.PI / 180,
        _atan2 = Math.atan2,
        _bigNum = 1e8,
        _capsExp$1 = /([A-Z])/g,
        _horizontalExp = /(left|right|width|margin|padding|x)/i,
        _complexExp = /[\s,\(]\S/,
        _propertyAliases = {
            autoAlpha: "opacity,visibility",
            scale: "scaleX,scaleY",
            alpha: "opacity"
        },
        _renderCSSProp = function (t, e) {
            return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
        },
        _renderPropWithEnd = function (t, e) {
            return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
        },
        _renderCSSPropWithBeginning = function (t, e) {
            return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e)
        },
        _renderRoundedCSSProp = function (t, e) {
            var r = e.s + e.c * t;
            e.set(e.t, e.p, ~~(r + (r < 0 ? -.5 : .5)) + e.u, e);
        },
        _renderNonTweeningValue = function (t, e) {
            return e.set(e.t, e.p, t ? e.e : e.b, e)
        },
        _renderNonTweeningValueOnlyAtEnd = function (t, e) {
            return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
        },
        _setterCSSStyle = function (t, e, r) {
            return t.style[e] = r
        },
        _setterCSSProp = function (t, e, r) {
            return t.style.setProperty(e, r)
        },
        _setterTransform = function (t, e, r) {
            return t._gsap[e] = r
        },
        _setterScale = function (t, e, r) {
            return t._gsap.scaleX = t._gsap.scaleY = r
        },
        _setterScaleWithRender = function (t, e, r, n, o) {
            var i = t._gsap;
            i.scaleX = i.scaleY = r, i.renderTransform(o, i);
        },
        _setterTransformWithRender = function (t, e, r, n, o) {
            var i = t._gsap;
            i[e] = r, i.renderTransform(o, i);
        },
        _transformProp$1 = "transform",
        _transformOriginProp = _transformProp$1 + "Origin",
        _saveStyle = function t(e, r) {
            var n = this,
                o = this.target,
                i = o.style,
                s = o._gsap;
            if (e in _transformProps && i) {
                if (this.tfm = this.tfm || {}, "transform" === e) return _propertyAliases.transform.split(",").forEach((function (e) {
                    return t.call(n, e, r)
                }));
                if (~(e = _propertyAliases[e] || e).indexOf(",") ? e.split(",").forEach((function (t) {
                    return n.tfm[t] = _get(o, t)
                })) : this.tfm[e] = s.x ? s[e] : _get(o, e), e === _transformOriginProp && (this.tfm.zOrigin = s.zOrigin), this.props.indexOf(_transformProp$1) >= 0) return;
                s.svg && (this.svgo = o.getAttribute("data-svg-origin"), this.props.push(_transformOriginProp, r, "")), e = _transformProp$1;
            } (i || r) && this.props.push(e, r, i[e]);
        },
        _removeIndependentTransforms = function (t) {
            t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
        },
        _revertStyle = function () {
            var t, e, r = this.props,
                n = this.target,
                o = n.style,
                i = n._gsap;
            for (t = 0; t < r.length; t += 3) r[t + 1] ? n[r[t]] = r[t + 2] : r[t + 2] ? o[r[t]] = r[t + 2] : o.removeProperty("--" === r[t].substr(0, 2) ? r[t] : r[t].replace(_capsExp$1, "-$1").toLowerCase());
            if (this.tfm) {
                for (e in this.tfm) i[e] = this.tfm[e];
                i.svg && (i.renderTransform(), n.setAttribute("data-svg-origin", this.svgo || "")), (t = _reverting()) && t.isStart || o[_transformProp$1] || (_removeIndependentTransforms(o), i.zOrigin && o[_transformOriginProp] && (o[_transformOriginProp] += " " + i.zOrigin + "px", i.zOrigin = 0, i.renderTransform()), i.uncache = 1);
            }
        },
        _getStyleSaver = function (t, e) {
            var r = {
                target: t,
                props: [],
                revert: _revertStyle,
                save: _saveStyle
            };
            return t._gsap || gsap$2.core.getCache(t), e && e.split(",").forEach((function (t) {
                return r.save(t)
            })), r
        },
        _createElement = function (t, e) {
            var r = _doc$2.createElementNS ? _doc$2.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : _doc$2.createElement(t);
            return r && r.style ? r : _doc$2.createElement(t)
        },
        _getComputedProperty = function t(e, r, n) {
            var o = getComputedStyle(e);
            return o[r] || o.getPropertyValue(r.replace(_capsExp$1, "-$1").toLowerCase()) || o.getPropertyValue(r) || !n && t(e, _checkPropPrefix(r) || r, 1) || ""
        },
        _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
        _checkPropPrefix = function (t, e, r) {
            var n = (e || _tempDiv).style,
                o = 5;
            if (t in n && !r) return t;
            for (t = t.charAt(0).toUpperCase() + t.substr(1); o-- && !(_prefixes[o] + t in n););
            return o < 0 ? null : (3 === o ? "ms" : o >= 0 ? _prefixes[o] : "") + t
        },
        _initCore$1 = function () {
            _windowExists$1() && window.document && (_win$2 = window, _doc$2 = _win$2.document, _docElement = _doc$2.documentElement, _tempDiv = _createElement("div") || {
                style: {}
            }, _createElement("div"), _transformProp$1 = _checkPropPrefix(_transformProp$1), _transformOriginProp = _transformProp$1 + "Origin", _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", _supports3D = !!_checkPropPrefix("perspective"), _reverting = gsap$2.core.reverting, _pluginInitted = 1);
        },
        _getBBoxHack = function t(e) {
            var r, n = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                o = this.parentNode,
                i = this.nextSibling,
                s = this.style.cssText;
            if (_docElement.appendChild(n), n.appendChild(this), this.style.display = "block", e) try {
                r = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = t;
            } catch (t) { } else this._gsapBBox && (r = this._gsapBBox());
            return o && (i ? o.insertBefore(this, i) : o.appendChild(this)), _docElement.removeChild(n), this.style.cssText = s, r
        },
        _getAttributeFallbacks = function (t, e) {
            for (var r = e.length; r--;)
                if (t.hasAttribute(e[r])) return t.getAttribute(e[r])
        },
        _getBBox = function (t) {
            var e;
            try {
                e = t.getBBox();
            } catch (r) {
                e = _getBBoxHack.call(t, !0);
            }
            return e && (e.width || e.height) || t.getBBox === _getBBoxHack || (e = _getBBoxHack.call(t, !0)), !e || e.width || e.x || e.y ? e : {
                x: +_getAttributeFallbacks(t, ["x", "cx", "x1"]) || 0,
                y: +_getAttributeFallbacks(t, ["y", "cy", "y1"]) || 0,
                width: 0,
                height: 0
            }
        },
        _isSVG = function (t) {
            return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !_getBBox(t))
        },
        _removeProperty = function (t, e) {
            if (e) {
                var r, n = t.style;
                e in _transformProps && e !== _transformOriginProp && (e = _transformProp$1), n.removeProperty ? ("ms" !== (r = e.substr(0, 2)) && "webkit" !== e.substr(0, 6) || (e = "-" + e), n.removeProperty("--" === r ? e : e.replace(_capsExp$1, "-$1").toLowerCase())) : n.removeAttribute(e);
            }
        },
        _addNonTweeningPT = function (t, e, r, n, o, i) {
            var s = new PropTween(t._pt, e, r, 0, 1, i ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
            return t._pt = s, s.b = n, s.e = o, t._props.push(r), s
        },
        _nonConvertibleUnits = {
            deg: 1,
            rad: 1,
            turn: 1
        },
        _nonStandardLayouts = {
            grid: 1,
            flex: 1
        },
        _convertToUnit = function t(e, r, n, o) {
            var i, s, a, _, p = parseFloat(n) || 0,
                l = (n + "").trim().substr((p + "").length) || "px",
                f = _tempDiv.style,
                g = _horizontalExp.test(r),
                c = "svg" === e.tagName.toLowerCase(),
                d = (c ? "client" : "offset") + (g ? "Width" : "Height"),
                u = 100,
                h = "px" === o,
                m = "%" === o;
            if (o === l || !p || _nonConvertibleUnits[o] || _nonConvertibleUnits[l]) return p;
            if ("px" !== l && !h && (p = t(e, r, n, "px")), _ = e.getCTM && _isSVG(e), (m || "%" === l) && (_transformProps[r] || ~r.indexOf("adius"))) return i = _ ? e.getBBox()[g ? "width" : "height"] : e[d], _round$1(m ? p / i * u : p / 100 * i);
            if (f[g ? "width" : "height"] = u + (h ? l : o), s = ~r.indexOf("adius") || "em" === o && e.appendChild && !c ? e : e.parentNode, _ && (s = (e.ownerSVGElement || {}).parentNode), s && s !== _doc$2 && s.appendChild || (s = _doc$2.body), (a = s._gsap) && m && a.width && g && a.time === _ticker.time && !a.uncache) return _round$1(p / a.width * u);
            if (!m || "height" !== r && "width" !== r) (m || "%" === l) && !_nonStandardLayouts[_getComputedProperty(s, "display")] && (f.position = _getComputedProperty(e, "position")), s === e && (f.position = "static"), s.appendChild(_tempDiv), i = _tempDiv[d], s.removeChild(_tempDiv), f.position = "absolute";
            else {
                var P = e.style[r];
                e.style[r] = u + o, i = e[d], P ? e.style[r] = P : _removeProperty(e, r);
            }
            return g && m && ((a = _getCache(s)).time = _ticker.time, a.width = s[d]), _round$1(h ? i * p / u : i && p ? u / i * p : 0)
        },
        _get = function (t, e, r, n) {
            var o;
            return _pluginInitted || _initCore$1(), e in _propertyAliases && "transform" !== e && ~(e = _propertyAliases[e]).indexOf(",") && (e = e.split(",")[0]), _transformProps[e] && "transform" !== e ? (o = _parseTransform(t, n), o = "transformOrigin" !== e ? o[e] : o.svg ? o.origin : _firstTwoOnly(_getComputedProperty(t, _transformOriginProp)) + " " + o.zOrigin + "px") : (!(o = t.style[e]) || "auto" === o || n || ~(o + "").indexOf("calc(")) && (o = _specialProps[e] && _specialProps[e](t, e, r) || _getComputedProperty(t, e) || _getProperty(t, e) || ("opacity" === e ? 1 : 0)), r && !~(o + "").trim().indexOf(" ") ? _convertToUnit(t, e, o, r) + r : o
        },
        _tweenComplexCSSString = function (t, e, r, n) {
            if (!r || "none" === r) {
                var o = _checkPropPrefix(e, t, 1),
                    i = o && _getComputedProperty(t, o, 1);
                i && i !== r ? (e = o, r = i) : "borderColor" === e && (r = _getComputedProperty(t, "borderTopColor"));
            }
            var s, a, _, p, l, f, g, c, d, u, h, m = new PropTween(this._pt, t.style, e, 0, 1, _renderComplexString),
                P = 0,
                y = 0;
            if (m.b = r, m.e = n, r += "", "auto" === (n += "") && (f = t.style[e], t.style[e] = n, n = _getComputedProperty(t, e) || n, f ? t.style[e] = f : _removeProperty(t, e)), _colorStringFilter(s = [r, n]), n = s[1], _ = (r = s[0]).match(_numWithUnitExp) || [], (n.match(_numWithUnitExp) || []).length) {
                for (; a = _numWithUnitExp.exec(n);) g = a[0], d = n.substring(P, a.index), l ? l = (l + 1) % 5 : "rgba(" !== d.substr(-5) && "hsla(" !== d.substr(-5) || (l = 1), g !== (f = _[y++] || "") && (p = parseFloat(f) || 0, h = f.substr((p + "").length), "=" === g.charAt(1) && (g = _parseRelative(p, g) + h), c = parseFloat(g), u = g.substr((c + "").length), P = _numWithUnitExp.lastIndex - u.length, u || (u = u || _config.units[e] || h, P === n.length && (n += u, m.e += u)), h !== u && (p = _convertToUnit(t, e, f, u) || 0), m._pt = {
                    _next: m._pt,
                    p: d || 1 === y ? d : ",",
                    s: p,
                    c: c - p,
                    m: l && l < 4 || "zIndex" === e ? Math.round : 0
                });
                m.c = P < n.length ? n.substring(P, n.length) : "";
            } else m.r = "display" === e && "none" === n ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
            return _relExp.test(n) && (m.e = 0), this._pt = m, m
        },
        _keywordToPercent = {
            top: "0%",
            bottom: "100%",
            left: "0%",
            right: "100%",
            center: "50%"
        },
        _convertKeywordsToPercentages = function (t) {
            var e = t.split(" "),
                r = e[0],
                n = e[1] || "50%";
            return "top" !== r && "bottom" !== r && "left" !== n && "right" !== n || (t = r, r = n, n = t), e[0] = _keywordToPercent[r] || r, e[1] = _keywordToPercent[n] || n, e.join(" ")
        },
        _renderClearProps = function (t, e) {
            if (e.tween && e.tween._time === e.tween._dur) {
                var r, n, o, i = e.t,
                    s = i.style,
                    a = e.u,
                    _ = i._gsap;
                if ("all" === a || !0 === a) s.cssText = "", n = 1;
                else
                    for (o = (a = a.split(",")).length; --o > -1;) r = a[o], _transformProps[r] && (n = 1, r = "transformOrigin" === r ? _transformOriginProp : _transformProp$1), _removeProperty(i, r);
                n && (_removeProperty(i, _transformProp$1), _ && (_.svg && i.removeAttribute("transform"), _parseTransform(i, 1), _.uncache = 1, _removeIndependentTransforms(s)));
            }
        },
        _specialProps = {
            clearProps: function (t, e, r, n, o) {
                if ("isFromStart" !== o.data) {
                    var i = t._pt = new PropTween(t._pt, e, r, 0, 0, _renderClearProps);
                    return i.u = n, i.pr = -10, i.tween = o, t._props.push(r), 1
                }
            }
        },
        _identity2DMatrix = [1, 0, 0, 1, 0, 0],
        _rotationalProperties = {},
        _isNullTransform = function (t) {
            return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t
        },
        _getComputedTransformMatrixAsArray = function (t) {
            var e = _getComputedProperty(t, _transformProp$1);
            return _isNullTransform(e) ? _identity2DMatrix : e.substr(7).match(_numExp).map(_round$1)
        },
        _getMatrix = function (t, e) {
            var r, n, o, i, s = t._gsap || _getCache(t),
                a = t.style,
                _ = _getComputedTransformMatrixAsArray(t);
            return s.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (_ = [(o = t.transform.baseVal.consolidate().matrix).a, o.b, o.c, o.d, o.e, o.f]).join(",") ? _identity2DMatrix : _ : (_ !== _identity2DMatrix || t.offsetParent || t === _docElement || s.svg || (o = a.display, a.display = "block", (r = t.parentNode) && t.offsetParent || (i = 1, n = t.nextElementSibling, _docElement.appendChild(t)), _ = _getComputedTransformMatrixAsArray(t), o ? a.display = o : _removeProperty(t, "display"), i && (n ? r.insertBefore(t, n) : r ? r.appendChild(t) : _docElement.removeChild(t))), e && _.length > 6 ? [_[0], _[1], _[4], _[5], _[12], _[13]] : _)
        },
        _applySVGOrigin = function (t, e, r, n, o, i) {
            var s, a, _, p = t._gsap,
                l = o || _getMatrix(t, !0),
                f = p.xOrigin || 0,
                g = p.yOrigin || 0,
                c = p.xOffset || 0,
                d = p.yOffset || 0,
                u = l[0],
                h = l[1],
                m = l[2],
                P = l[3],
                y = l[4],
                x = l[5],
                v = e.split(" "),
                w = parseFloat(v[0]) || 0,
                T = parseFloat(v[1]) || 0;
            r ? l !== _identity2DMatrix && (a = u * P - h * m) && (_ = w * (-h / a) + T * (u / a) - (u * x - h * y) / a, w = w * (P / a) + T * (-m / a) + (m * x - P * y) / a, T = _) : (w = (s = _getBBox(t)).x + (~v[0].indexOf("%") ? w / 100 * s.width : w), T = s.y + (~(v[1] || v[0]).indexOf("%") ? T / 100 * s.height : T)), n || !1 !== n && p.smooth ? (y = w - f, x = T - g, p.xOffset = c + (y * u + x * m) - y, p.yOffset = d + (y * h + x * P) - x) : p.xOffset = p.yOffset = 0, p.xOrigin = w, p.yOrigin = T, p.smooth = !!n, p.origin = e, p.originIsAbsolute = !!r, t.style[_transformOriginProp] = "0px 0px", i && (_addNonTweeningPT(i, p, "xOrigin", f, w), _addNonTweeningPT(i, p, "yOrigin", g, T), _addNonTweeningPT(i, p, "xOffset", c, p.xOffset), _addNonTweeningPT(i, p, "yOffset", d, p.yOffset)), t.setAttribute("data-svg-origin", w + " " + T);
        },
        _parseTransform = function (t, e) {
            var r = t._gsap || new GSCache(t);
            if ("x" in r && !e && !r.uncache) return r;
            var n, o, i, s, a, _, p, l, f, g, c, d, u, h, m, P, y, x, v, w, T, S, O, b, C, E, D, A, M, B, k, z, N = t.style,
                R = r.scaleX < 0,
                G = "px",
                U = "deg",
                F = getComputedStyle(t),
                V = _getComputedProperty(t, _transformOriginProp) || "0";
            return n = o = i = _ = p = l = f = g = c = 0, s = a = 1, r.svg = !(!t.getCTM || !_isSVG(t)), F.translate && ("none" === F.translate && "none" === F.scale && "none" === F.rotate || (N[_transformProp$1] = ("none" !== F.translate ? "translate3d(" + (F.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + ("none" !== F.rotate ? "rotate(" + F.rotate + ") " : "") + ("none" !== F.scale ? "scale(" + F.scale.split(" ").join(",") + ") " : "") + ("none" !== F[_transformProp$1] ? F[_transformProp$1] : "")), N.scale = N.rotate = N.translate = "none"), h = _getMatrix(t, r.svg), r.svg && (r.uncache ? (C = t.getBBox(), V = r.xOrigin - C.x + "px " + (r.yOrigin - C.y) + "px", b = "") : b = !e && t.getAttribute("data-svg-origin"), _applySVGOrigin(t, b || V, !!b || r.originIsAbsolute, !1 !== r.smooth, h)), d = r.xOrigin || 0, u = r.yOrigin || 0, h !== _identity2DMatrix && (x = h[0], v = h[1], w = h[2], T = h[3], n = S = h[4], o = O = h[5], 6 === h.length ? (s = Math.sqrt(x * x + v * v), a = Math.sqrt(T * T + w * w), _ = x || v ? _atan2(v, x) * _RAD2DEG : 0, (f = w || T ? _atan2(w, T) * _RAD2DEG + _ : 0) && (a *= Math.abs(Math.cos(f * _DEG2RAD))), r.svg && (n -= d - (d * x + u * w), o -= u - (d * v + u * T))) : (z = h[6], B = h[7], D = h[8], A = h[9], M = h[10], k = h[11], n = h[12], o = h[13], i = h[14], p = (m = _atan2(z, M)) * _RAD2DEG, m && (b = S * (P = Math.cos(-m)) + D * (y = Math.sin(-m)), C = O * P + A * y, E = z * P + M * y, D = S * -y + D * P, A = O * -y + A * P, M = z * -y + M * P, k = B * -y + k * P, S = b, O = C, z = E), l = (m = _atan2(-w, M)) * _RAD2DEG, m && (P = Math.cos(-m), k = T * (y = Math.sin(-m)) + k * P, x = b = x * P - D * y, v = C = v * P - A * y, w = E = w * P - M * y), _ = (m = _atan2(v, x)) * _RAD2DEG, m && (b = x * (P = Math.cos(m)) + v * (y = Math.sin(m)), C = S * P + O * y, v = v * P - x * y, O = O * P - S * y, x = b, S = C), p && Math.abs(p) + Math.abs(_) > 359.9 && (p = _ = 0, l = 180 - l), s = _round$1(Math.sqrt(x * x + v * v + w * w)), a = _round$1(Math.sqrt(O * O + z * z)), m = _atan2(S, O), f = Math.abs(m) > 2e-4 ? m * _RAD2DEG : 0, c = k ? 1 / (k < 0 ? -k : k) : 0), r.svg && (b = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(t, _transformProp$1)), b && t.setAttribute("transform", b))), Math.abs(f) > 90 && Math.abs(f) < 270 && (R ? (s *= -1, f += _ <= 0 ? 180 : -180, _ += _ <= 0 ? 180 : -180) : (a *= -1, f += f <= 0 ? 180 : -180)), e = e || r.uncache, r.x = n - ((r.xPercent = n && (!e && r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + G, r.y = o - ((r.yPercent = o && (!e && r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-o) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + G, r.z = i + G, r.scaleX = _round$1(s), r.scaleY = _round$1(a), r.rotation = _round$1(_) + U, r.rotationX = _round$1(p) + U, r.rotationY = _round$1(l) + U, r.skewX = f + U, r.skewY = g + U, r.transformPerspective = c + G, (r.zOrigin = parseFloat(V.split(" ")[2]) || !e && r.zOrigin || 0) && (N[_transformOriginProp] = _firstTwoOnly(V)), r.xOffset = r.yOffset = 0, r.force3D = _config.force3D, r.renderTransform = r.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms, r.uncache = 0, r
        },
        _firstTwoOnly = function (t) {
            return (t = t.split(" "))[0] + " " + t[1]
        },
        _addPxTranslate = function (t, e, r) {
            var n = getUnit(e);
            return _round$1(parseFloat(e) + parseFloat(_convertToUnit(t, "x", r + "px", n))) + n
        },
        _renderNon3DTransforms = function (t, e) {
            e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, _renderCSSTransforms(t, e);
        },
        _zeroDeg = "0deg",
        _zeroPx = "0px",
        _endParenthesis = ") ",
        _renderCSSTransforms = function (t, e) {
            var r = e || this,
                n = r.xPercent,
                o = r.yPercent,
                i = r.x,
                s = r.y,
                a = r.z,
                _ = r.rotation,
                p = r.rotationY,
                l = r.rotationX,
                f = r.skewX,
                g = r.skewY,
                c = r.scaleX,
                d = r.scaleY,
                u = r.transformPerspective,
                h = r.force3D,
                m = r.target,
                P = r.zOrigin,
                y = "",
                x = "auto" === h && t && 1 !== t || !0 === h;
            if (P && (l !== _zeroDeg || p !== _zeroDeg)) {
                var v, w = parseFloat(p) * _DEG2RAD,
                    T = Math.sin(w),
                    S = Math.cos(w);
                w = parseFloat(l) * _DEG2RAD, v = Math.cos(w), i = _addPxTranslate(m, i, T * v * -P), s = _addPxTranslate(m, s, -Math.sin(w) * -P), a = _addPxTranslate(m, a, S * v * -P + P);
            }
            u !== _zeroPx && (y += "perspective(" + u + _endParenthesis), (n || o) && (y += "translate(" + n + "%, " + o + "%) "), (x || i !== _zeroPx || s !== _zeroPx || a !== _zeroPx) && (y += a !== _zeroPx || x ? "translate3d(" + i + ", " + s + ", " + a + ") " : "translate(" + i + ", " + s + _endParenthesis), _ !== _zeroDeg && (y += "rotate(" + _ + _endParenthesis), p !== _zeroDeg && (y += "rotateY(" + p + _endParenthesis), l !== _zeroDeg && (y += "rotateX(" + l + _endParenthesis), f === _zeroDeg && g === _zeroDeg || (y += "skew(" + f + ", " + g + _endParenthesis), 1 === c && 1 === d || (y += "scale(" + c + ", " + d + _endParenthesis), m.style[_transformProp$1] = y || "translate(0, 0)";
        },
        _renderSVGTransforms = function (t, e) {
            var r, n, o, i, s, a = e || this,
                _ = a.xPercent,
                p = a.yPercent,
                l = a.x,
                f = a.y,
                g = a.rotation,
                c = a.skewX,
                d = a.skewY,
                u = a.scaleX,
                h = a.scaleY,
                m = a.target,
                P = a.xOrigin,
                y = a.yOrigin,
                x = a.xOffset,
                v = a.yOffset,
                w = a.forceCSS,
                T = parseFloat(l),
                S = parseFloat(f);
            g = parseFloat(g), c = parseFloat(c), (d = parseFloat(d)) && (c += d = parseFloat(d), g += d), g || c ? (g *= _DEG2RAD, c *= _DEG2RAD, r = Math.cos(g) * u, n = Math.sin(g) * u, o = Math.sin(g - c) * -h, i = Math.cos(g - c) * h, c && (d *= _DEG2RAD, s = Math.tan(c - d), o *= s = Math.sqrt(1 + s * s), i *= s, d && (s = Math.tan(d), r *= s = Math.sqrt(1 + s * s), n *= s)), r = _round$1(r), n = _round$1(n), o = _round$1(o), i = _round$1(i)) : (r = u, i = h, n = o = 0), (T && !~(l + "").indexOf("px") || S && !~(f + "").indexOf("px")) && (T = _convertToUnit(m, "x", l, "px"), S = _convertToUnit(m, "y", f, "px")), (P || y || x || v) && (T = _round$1(T + P - (P * r + y * o) + x), S = _round$1(S + y - (P * n + y * i) + v)), (_ || p) && (s = m.getBBox(), T = _round$1(T + _ / 100 * s.width), S = _round$1(S + p / 100 * s.height)), s = "matrix(" + r + "," + n + "," + o + "," + i + "," + T + "," + S + ")", m.setAttribute("transform", s), w && (m.style[_transformProp$1] = s);
        },
        _addRotationalPropTween = function (t, e, r, n, o) {
            var i, s, a = 360,
                _ = _isString$1(o),
                p = parseFloat(o) * (_ && ~o.indexOf("rad") ? _RAD2DEG : 1) - n,
                l = n + p + "deg";
            return _ && ("short" === (i = o.split("_")[1]) && (p %= a) !== p % 180 && (p += p < 0 ? a : -360), "cw" === i && p < 0 ? p = (p + a * _bigNum) % a - ~~(p / a) * a : "ccw" === i && p > 0 && (p = (p - a * _bigNum) % a - ~~(p / a) * a)), t._pt = s = new PropTween(t._pt, e, r, n, p, _renderPropWithEnd), s.e = l, s.u = "deg", t._props.push(r), s
        },
        _assign = function (t, e) {
            for (var r in e) t[r] = e[r];
            return t
        },
        _addRawTransformPTs = function (t, e, r) {
            var n, o, i, s, a, _, p, l = _assign({}, r._gsap),
                f = r.style;
            for (o in l.svg ? (i = r.getAttribute("transform"), r.setAttribute("transform", ""), f[_transformProp$1] = e, n = _parseTransform(r, 1), _removeProperty(r, _transformProp$1), r.setAttribute("transform", i)) : (i = getComputedStyle(r)[_transformProp$1], f[_transformProp$1] = e, n = _parseTransform(r, 1), f[_transformProp$1] = i), _transformProps) (i = l[o]) !== (s = n[o]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(o) < 0 && (a = getUnit(i) !== (p = getUnit(s)) ? _convertToUnit(r, o, i, p) : parseFloat(i), _ = parseFloat(s), t._pt = new PropTween(t._pt, n, o, a, _ - a, _renderCSSProp), t._pt.u = p || 0, t._props.push(o));
            _assign(n, l);
        };
    _forEachName("padding,margin,Width,Radius", (function (t, e) {
        var r = "Top",
            n = "Right",
            o = "Bottom",
            i = "Left",
            s = (e < 3 ? [r, n, o, i] : [r + i, r + n, o + n, o + i]).map((function (r) {
                return e < 2 ? t + r : "border" + r + t
            }));
        _specialProps[e > 1 ? "border" + t : t] = function (t, e, r, n, o) {
            var i, a;
            if (arguments.length < 4) return i = s.map((function (e) {
                return _get(t, e, r)
            })), 5 === (a = i.join(" ")).split(i[0]).length ? i[0] : a;
            i = (n + "").split(" "), a = {}, s.forEach((function (t, e) {
                return a[t] = i[e] = i[e] || i[(e - 1) / 2 | 0]
            })), t.init(e, a, o);
        };
    }));
    var CSSPlugin = {
        name: "css",
        register: _initCore$1,
        targetTest: function (t) {
            return t.style && t.nodeType
        },
        init: function (t, e, r, n, o) {
            var i, s, a, _, p, l, f, g, c, d, u, h, m, P, y, x, v = this._props,
                w = t.style,
                T = r.vars.startAt;
            for (f in _pluginInitted || _initCore$1(), this.styles = this.styles || _getStyleSaver(t), x = this.styles.props, this.tween = r, e)
                if ("autoRound" !== f && (s = e[f], !_plugins[f] || !_checkPlugin(f, e, r, n, t, o)))
                    if (p = typeof s, l = _specialProps[f], "function" === p && (p = typeof (s = s.call(r, n, t, o))), "string" === p && ~s.indexOf("random(") && (s = _replaceRandom(s)), l) l(this, t, f, s, r) && (y = 1);
                    else if ("--" === f.substr(0, 2)) i = (getComputedStyle(t).getPropertyValue(f) + "").trim(), s += "", _colorExp.lastIndex = 0, _colorExp.test(i) || (g = getUnit(i), c = getUnit(s)), c ? g !== c && (i = _convertToUnit(t, f, i, c) + c) : g && (s += g), this.add(w, "setProperty", i, s, n, o, 0, 0, f), v.push(f), x.push(f, 0, w[f]);
                    else if ("undefined" !== p) {
                        if (T && f in T ? (i = "function" == typeof T[f] ? T[f].call(r, n, t, o) : T[f], _isString$1(i) && ~i.indexOf("random(") && (i = _replaceRandom(i)), getUnit(i + "") || "auto" === i || (i += _config.units[f] || getUnit(_get(t, f)) || ""), "=" === (i + "").charAt(1) && (i = _get(t, f))) : i = _get(t, f), _ = parseFloat(i), (d = "string" === p && "=" === s.charAt(1) && s.substr(0, 2)) && (s = s.substr(2)), a = parseFloat(s), f in _propertyAliases && ("autoAlpha" === f && (1 === _ && "hidden" === _get(t, "visibility") && a && (_ = 0), x.push("visibility", 0, w.visibility), _addNonTweeningPT(this, w, "visibility", _ ? "inherit" : "hidden", a ? "inherit" : "hidden", !a)), "scale" !== f && "transform" !== f && ~(f = _propertyAliases[f]).indexOf(",") && (f = f.split(",")[0])), u = f in _transformProps)
                            if (this.styles.save(f), h || ((m = t._gsap).renderTransform && !e.parseTransform || _parseTransform(t, e.parseTransform), P = !1 !== e.smoothOrigin && m.smooth, (h = this._pt = new PropTween(this._pt, w, _transformProp$1, 0, 1, m.renderTransform, m, 0, -1)).dep = 1), "scale" === f) this._pt = new PropTween(this._pt, m, "scaleY", m.scaleY, (d ? _parseRelative(m.scaleY, d + a) : a) - m.scaleY || 0, _renderCSSProp), this._pt.u = 0, v.push("scaleY", f), f += "X";
                            else {
                                if ("transformOrigin" === f) {
                                    x.push(_transformOriginProp, 0, w[_transformOriginProp]), s = _convertKeywordsToPercentages(s), m.svg ? _applySVGOrigin(t, s, 0, P, 0, this) : ((c = parseFloat(s.split(" ")[2]) || 0) !== m.zOrigin && _addNonTweeningPT(this, m, "zOrigin", m.zOrigin, c), _addNonTweeningPT(this, w, f, _firstTwoOnly(i), _firstTwoOnly(s)));
                                    continue
                                }
                                if ("svgOrigin" === f) {
                                    _applySVGOrigin(t, s, 1, P, 0, this);
                                    continue
                                }
                                if (f in _rotationalProperties) {
                                    _addRotationalPropTween(this, m, f, _, d ? _parseRelative(_, d + s) : s);
                                    continue
                                }
                                if ("smoothOrigin" === f) {
                                    _addNonTweeningPT(this, m, "smooth", m.smooth, s);
                                    continue
                                }
                                if ("force3D" === f) {
                                    m[f] = s;
                                    continue
                                }
                                if ("transform" === f) {
                                    _addRawTransformPTs(this, s, t);
                                    continue
                                }
                            }
                        else f in w || (f = _checkPropPrefix(f) || f);
                        if (u || (a || 0 === a) && (_ || 0 === _) && !_complexExp.test(s) && f in w) a || (a = 0), (g = (i + "").substr((_ + "").length)) !== (c = getUnit(s) || (f in _config.units ? _config.units[f] : g)) && (_ = _convertToUnit(t, f, i, c)), this._pt = new PropTween(this._pt, u ? m : w, f, _, (d ? _parseRelative(_, d + a) : a) - _, u || "px" !== c && "zIndex" !== f || !1 === e.autoRound ? _renderCSSProp : _renderRoundedCSSProp), this._pt.u = c || 0, g !== c && "%" !== c && (this._pt.b = i, this._pt.r = _renderCSSPropWithBeginning);
                        else if (f in w) _tweenComplexCSSString.call(this, t, f, i, d ? d + s : s);
                        else if (f in t) this.add(t, f, i || t[f], d ? d + s : s, n, o);
                        else if ("parseTransform" !== f) {
                            _missingPlugin(f, s);
                            continue
                        }
                        u || (f in w ? x.push(f, 0, w[f]) : x.push(f, 1, i || t[f])), v.push(f);
                    }
            y && _sortPropTweensByPriority(this);
        },
        render: function (t, e) {
            if (e.tween._time || !_reverting())
                for (var r = e._pt; r;) r.r(t, r.d), r = r._next;
            else e.styles.revert();
        },
        get: _get,
        aliases: _propertyAliases,
        getSetter: function (t, e, r) {
            var n = _propertyAliases[e];
            return n && n.indexOf(",") < 0 && (e = n), e in _transformProps && e !== _transformOriginProp && (t._gsap.x || _get(t, "x")) ? r && _recentSetterPlugin === r ? "scale" === e ? _setterScale : _setterTransform : (_recentSetterPlugin = r || {}) && ("scale" === e ? _setterScaleWithRender : _setterTransformWithRender) : t.style && !_isUndefined(t.style[e]) ? _setterCSSStyle : ~e.indexOf("-") ? _setterCSSProp : _getSetter(t, e)
        },
        core: {
            _removeProperty: _removeProperty,
            _getMatrix: _getMatrix
        }
    };
    gsap$2.utils.checkPrefix = _checkPropPrefix, gsap$2.core.getStyleSaver = _getStyleSaver,
        function (t, e, r, n) {
            var o = _forEachName(t + "," + e + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", (function (t) {
                _transformProps[t] = 1;
            }));
            _forEachName(e, (function (t) {
                _config.units[t] = "deg", _rotationalProperties[t] = 1;
            })), _propertyAliases[o[13]] = t + "," + e, _forEachName("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", (function (t) {
                var e = t.split(":");
                _propertyAliases[e[1]] = o[e[0]];
            }));
        }("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY"), _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function (t) {
            _config.units[t] = "px";
        })), gsap$2.registerPlugin(CSSPlugin);

    var gsapWithCSS = gsap$2.registerPlugin(CSSPlugin) || gsap$2;
    gsapWithCSS.core.Tween;

    function _defineProperties(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
    }

    function _createClass(e, t, r) {
        return t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), e
    }
    /*!
     * Observer 3.12.5
     * https://gsap.com
     *
     * @license Copyright 2008-2024, GreenSock. All rights reserved.
     * Subject to the terms at https://gsap.com/standard-license or for
     * Club GSAP members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
     */
    var gsap$1, _coreInitted$1, _win$1, _doc$1, _docEl$1, _body$1, _isTouch, _pointerType, ScrollTrigger$1, _root$1, _normalizer$1, _eventTypes, _context$1, _getGSAP$1 = function () {
        return gsap$1 || "undefined" != typeof window && (gsap$1 = window.gsap) && gsap$1.registerPlugin && gsap$1
    },
        _startup$1 = 1,
        _observers = [],
        _scrollers = [],
        _proxies = [],
        _getTime$1 = Date.now,
        _bridge = function (e, t) {
            return t
        },
        _integrate = function () {
            var e = ScrollTrigger$1.core,
                t = e.bridge || {},
                r = e._scrollers,
                n = e._proxies;
            r.push.apply(r, _scrollers), n.push.apply(n, _proxies), _scrollers = r, _proxies = n, _bridge = function (e, r) {
                return t[e](r)
            };
        },
        _getProxyProp = function (e, t) {
            return ~_proxies.indexOf(e) && _proxies[_proxies.indexOf(e) + 1][t]
        },
        _isViewport$1 = function (e) {
            return !!~_root$1.indexOf(e)
        },
        _addListener$1 = function (e, t, r, n, o) {
            return e.addEventListener(t, r, {
                passive: !1 !== n,
                capture: !!o
            })
        },
        _removeListener$1 = function (e, t, r, n) {
            return e.removeEventListener(t, r, !!n)
        },
        _scrollLeft = "scrollLeft",
        _scrollTop = "scrollTop",
        _onScroll$1 = function () {
            return _normalizer$1 && _normalizer$1.isPressed || _scrollers.cache++
        },
        _scrollCacheFunc = function (e, t) {
            var r = function r(n) {
                if (n || 0 === n) {
                    _startup$1 && (_win$1.history.scrollRestoration = "manual");
                    var o = _normalizer$1 && _normalizer$1.isPressed;
                    n = r.v = Math.round(n) || (_normalizer$1 && _normalizer$1.iOS ? 1 : 0), e(n), r.cacheID = _scrollers.cache, o && _bridge("ss", n);
                } else (t || _scrollers.cache !== r.cacheID || _bridge("ref")) && (r.cacheID = _scrollers.cache, r.v = e());
                return r.v + r.offset
            };
            return r.offset = 0, e && r
        },
        _horizontal = {
            s: _scrollLeft,
            p: "left",
            p2: "Left",
            os: "right",
            os2: "Right",
            d: "width",
            d2: "Width",
            a: "x",
            sc: _scrollCacheFunc((function (e) {
                return arguments.length ? _win$1.scrollTo(e, _vertical.sc()) : _win$1.pageXOffset || _doc$1[_scrollLeft] || _docEl$1[_scrollLeft] || _body$1[_scrollLeft] || 0
            }))
        },
        _vertical = {
            s: _scrollTop,
            p: "top",
            p2: "Top",
            os: "bottom",
            os2: "Bottom",
            d: "height",
            d2: "Height",
            a: "y",
            op: _horizontal,
            sc: _scrollCacheFunc((function (e) {
                return arguments.length ? _win$1.scrollTo(_horizontal.sc(), e) : _win$1.pageYOffset || _doc$1[_scrollTop] || _docEl$1[_scrollTop] || _body$1[_scrollTop] || 0
            }))
        },
        _getTarget = function (e, t) {
            return (t && t._ctx && t._ctx.selector || gsap$1.utils.toArray)(e)[0] || ("string" == typeof e && !1 !== gsap$1.config().nullTargetWarn ? console.warn("Element not found:", e) : null)
        },
        _getScrollFunc = function (e, t) {
            var r = t.s,
                n = t.sc;
            _isViewport$1(e) && (e = _doc$1.scrollingElement || _docEl$1);
            var o = _scrollers.indexOf(e),
                i = n === _vertical.sc ? 1 : 2;
            !~o && (o = _scrollers.push(e) - 1), _scrollers[o + i] || _addListener$1(e, "scroll", _onScroll$1);
            var s = _scrollers[o + i],
                l = s || (_scrollers[o + i] = _scrollCacheFunc(_getProxyProp(e, r), !0) || (_isViewport$1(e) ? n : _scrollCacheFunc((function (t) {
                    return arguments.length ? e[r] = t : e[r]
                }))));
            return l.target = e, s || (l.smooth = "smooth" === gsap$1.getProperty(e, "scrollBehavior")), l
        },
        _getVelocityProp = function (e, t, r) {
            var n = e,
                o = e,
                i = _getTime$1(),
                s = i,
                l = t || 50,
                a = Math.max(500, 3 * l),
                c = function (e, t) {
                    var a = _getTime$1();
                    t || a - i > l ? (o = n, n = e, s = i, i = a) : r ? n += e : n = o + (e - o) / (a - s) * (i - s);
                };
            return {
                update: c,
                reset: function () {
                    o = n = r ? 0 : n, s = i = 0;
                },
                getVelocity: function (e) {
                    var t = s,
                        l = o,
                        _ = _getTime$1();
                    return (e || 0 === e) && e !== n && c(e), i === s || _ - s > a ? 0 : (n + (r ? l : -l)) / ((r ? _ : i) - t) * 1e3
                }
            }
        },
        _getEvent = function (e, t) {
            return t && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e
        },
        _getAbsoluteMax = function (e) {
            var t = Math.max.apply(Math, e),
                r = Math.min.apply(Math, e);
            return Math.abs(t) >= Math.abs(r) ? t : r
        },
        _setScrollTrigger = function () {
            (ScrollTrigger$1 = gsap$1.core.globals().ScrollTrigger) && ScrollTrigger$1.core && _integrate();
        },
        _initCore = function (e) {
            return gsap$1 = e || _getGSAP$1(), !_coreInitted$1 && gsap$1 && "undefined" != typeof document && document.body && (_win$1 = window, _doc$1 = document, _docEl$1 = _doc$1.documentElement, _body$1 = _doc$1.body, _root$1 = [_win$1, _doc$1, _docEl$1, _body$1], gsap$1.utils.clamp, _context$1 = gsap$1.core.context || function () { }, _pointerType = "onpointerenter" in _body$1 ? "pointer" : "mouse", _isTouch = Observer.isTouch = _win$1.matchMedia && _win$1.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _win$1 || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, _eventTypes = Observer.eventTypes = ("ontouchstart" in _docEl$1 ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in _docEl$1 ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout((function () {
                return _startup$1 = 0
            }), 500), _setScrollTrigger(), _coreInitted$1 = 1), _coreInitted$1
        };
    _horizontal.op = _vertical, _scrollers.cache = 0;
    var Observer = function () {
        function e(e) {
            this.init(e);
        }
        return e.prototype.init = function (e) {
            _coreInitted$1 || _initCore(gsap$1) || console.warn("Please gsap.registerPlugin(Observer)"), ScrollTrigger$1 || _setScrollTrigger();
            var t = e.tolerance,
                r = e.dragMinimum,
                n = e.type,
                o = e.target,
                i = e.lineHeight,
                s = e.debounce,
                l = e.preventDefault,
                a = e.onStop,
                c = e.onStopDelay,
                _ = e.ignore,
                u = e.wheelSpeed,
                d = e.event,
                g = e.onDragStart,
                p = e.onDragEnd,
                v = e.onDrag,
                f = e.onPress,
                h = e.onRelease,
                y = e.onRight,
                m = e.onLeft,
                b = e.onUp,
                T = e.onDown,
                x = e.onChangeX,
                w = e.onChangeY,
                L = e.onChange,
                P = e.onToggleX,
                E = e.onToggleY,
                M = e.onHover,
                O = e.onHoverEnd,
                S = e.onMove,
                Y = e.ignoreCheck,
                X = e.isNormalizer,
                D = e.onGestureStart,
                C = e.onGestureEnd,
                z = e.onWheel,
                k = e.onEnable,
                A = e.onDisable,
                V = e.onClick,
                F = e.scrollSpeed,
                G = e.capture,
                I = e.allowClicks,
                H = e.lockAxis,
                R = e.onLockAxis;
            this.target = o = _getTarget(o) || _docEl$1, this.vars = e, _ && (_ = gsap$1.utils.toArray(_)), t = t || 1e-9, r = r || 0, u = u || 1, F = F || 1, n = n || "wheel,touch,pointer", s = !1 !== s, i || (i = parseFloat(_win$1.getComputedStyle(_body$1).lineHeight) || 22);
            var B, N, W, q, j, U, J, K = this,
                Q = 0,
                Z = 0,
                $ = e.passive || !l,
                ee = _getScrollFunc(o, _horizontal),
                te = _getScrollFunc(o, _vertical),
                re = ee(),
                ne = te(),
                oe = ~n.indexOf("touch") && !~n.indexOf("pointer") && "pointerdown" === _eventTypes[0],
                ie = _isViewport$1(o),
                se = o.ownerDocument || _doc$1,
                le = [0, 0, 0],
                ae = [0, 0, 0],
                ce = 0,
                _e = function () {
                    return ce = _getTime$1()
                },
                ue = function (e, t) {
                    return (K.event = e) && _ && ~_.indexOf(e.target) || t && oe && "touch" !== e.pointerType || Y && Y(e, t)
                },
                de = function () {
                    var e = K.deltaX = _getAbsoluteMax(le),
                        r = K.deltaY = _getAbsoluteMax(ae),
                        n = Math.abs(e) >= t,
                        o = Math.abs(r) >= t;
                    L && (n || o) && L(K, e, r, le, ae), n && (y && K.deltaX > 0 && y(K), m && K.deltaX < 0 && m(K), x && x(K), P && K.deltaX < 0 != Q < 0 && P(K), Q = K.deltaX, le[0] = le[1] = le[2] = 0), o && (T && K.deltaY > 0 && T(K), b && K.deltaY < 0 && b(K), w && w(K), E && K.deltaY < 0 != Z < 0 && E(K), Z = K.deltaY, ae[0] = ae[1] = ae[2] = 0), (q || W) && (S && S(K), W && (v(K), W = !1), q = !1), U && !(U = !1) && R && R(K), j && (z(K), j = !1), B = 0;
                },
                ge = function (e, t, r) {
                    le[r] += e, ae[r] += t, K._vx.update(e), K._vy.update(t), s ? B || (B = requestAnimationFrame(de)) : de();
                },
                pe = function (e, t) {
                    H && !J && (K.axis = J = Math.abs(e) > Math.abs(t) ? "x" : "y", U = !0), "y" !== J && (le[2] += e, K._vx.update(e, !0)), "x" !== J && (ae[2] += t, K._vy.update(t, !0)), s ? B || (B = requestAnimationFrame(de)) : de();
                },
                ve = function (e) {
                    if (!ue(e, 1)) {
                        var t = (e = _getEvent(e, l)).clientX,
                            n = e.clientY,
                            o = t - K.x,
                            i = n - K.y,
                            s = K.isDragging;
                        K.x = t, K.y = n, (s || Math.abs(K.startX - t) >= r || Math.abs(K.startY - n) >= r) && (v && (W = !0), s || (K.isDragging = !0), pe(o, i), s || g && g(K));
                    }
                },
                fe = K.onPress = function (e) {
                    ue(e, 1) || e && e.button || (K.axis = J = null, N.pause(), K.isPressed = !0, e = _getEvent(e), Q = Z = 0, K.startX = K.x = e.clientX, K.startY = K.y = e.clientY, K._vx.reset(), K._vy.reset(), _addListener$1(X ? o : se, _eventTypes[1], ve, $, !0), K.deltaX = K.deltaY = 0, f && f(K));
                },
                he = K.onRelease = function (e) {
                    if (!ue(e, 1)) {
                        _removeListener$1(X ? o : se, _eventTypes[1], ve, !0);
                        var t = !isNaN(K.y - K.startY),
                            r = K.isDragging,
                            n = r && (Math.abs(K.x - K.startX) > 3 || Math.abs(K.y - K.startY) > 3),
                            i = _getEvent(e);
                        !n && t && (K._vx.reset(), K._vy.reset(), l && I && gsap$1.delayedCall(.08, (function () {
                            if (_getTime$1() - ce > 300 && !e.defaultPrevented)
                                if (e.target.click) e.target.click();
                                else if (se.createEvent) {
                                    var t = se.createEvent("MouseEvents");
                                    t.initMouseEvent("click", !0, !0, _win$1, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), e.target.dispatchEvent(t);
                                }
                        }))), K.isDragging = K.isGesturing = K.isPressed = !1, a && r && !X && N.restart(!0), p && r && p(K), h && h(K, n);
                    }
                },
                ye = function (e) {
                    return e.touches && e.touches.length > 1 && (K.isGesturing = !0) && D(e, K.isDragging)
                },
                me = function () {
                    return (K.isGesturing = !1) || C(K)
                },
                be = function (e) {
                    if (!ue(e)) {
                        var t = ee(),
                            r = te();
                        ge((t - re) * F, (r - ne) * F, 1), re = t, ne = r, a && N.restart(!0);
                    }
                },
                Te = function (e) {
                    if (!ue(e)) {
                        e = _getEvent(e, l), z && (j = !0);
                        var t = (1 === e.deltaMode ? i : 2 === e.deltaMode ? _win$1.innerHeight : 1) * u;
                        ge(e.deltaX * t, e.deltaY * t, 0), a && !X && N.restart(!0);
                    }
                },
                xe = function (e) {
                    if (!ue(e)) {
                        var t = e.clientX,
                            r = e.clientY,
                            n = t - K.x,
                            o = r - K.y;
                        K.x = t, K.y = r, q = !0, a && N.restart(!0), (n || o) && pe(n, o);
                    }
                },
                we = function (e) {
                    K.event = e, M(K);
                },
                Le = function (e) {
                    K.event = e, O(K);
                },
                Pe = function (e) {
                    return ue(e) || _getEvent(e, l) && V(K)
                };
            N = K._dc = gsap$1.delayedCall(c || .25, (function () {
                K._vx.reset(), K._vy.reset(), N.pause(), a && a(K);
            })).pause(), K.deltaX = K.deltaY = 0, K._vx = _getVelocityProp(0, 50, !0), K._vy = _getVelocityProp(0, 50, !0), K.scrollX = ee, K.scrollY = te, K.isDragging = K.isGesturing = K.isPressed = !1, _context$1(this), K.enable = function (e) {
                return K.isEnabled || (_addListener$1(ie ? se : o, "scroll", _onScroll$1), n.indexOf("scroll") >= 0 && _addListener$1(ie ? se : o, "scroll", be, $, G), n.indexOf("wheel") >= 0 && _addListener$1(o, "wheel", Te, $, G), (n.indexOf("touch") >= 0 && _isTouch || n.indexOf("pointer") >= 0) && (_addListener$1(o, _eventTypes[0], fe, $, G), _addListener$1(se, _eventTypes[2], he), _addListener$1(se, _eventTypes[3], he), I && _addListener$1(o, "click", _e, !0, !0), V && _addListener$1(o, "click", Pe), D && _addListener$1(se, "gesturestart", ye), C && _addListener$1(se, "gestureend", me), M && _addListener$1(o, _pointerType + "enter", we), O && _addListener$1(o, _pointerType + "leave", Le), S && _addListener$1(o, _pointerType + "move", xe)), K.isEnabled = !0, e && e.type && fe(e), k && k(K)), K
            }, K.disable = function () {
                K.isEnabled && (_observers.filter((function (e) {
                    return e !== K && _isViewport$1(e.target)
                })).length || _removeListener$1(ie ? se : o, "scroll", _onScroll$1), K.isPressed && (K._vx.reset(), K._vy.reset(), _removeListener$1(X ? o : se, _eventTypes[1], ve, !0)), _removeListener$1(ie ? se : o, "scroll", be, G), _removeListener$1(o, "wheel", Te, G), _removeListener$1(o, _eventTypes[0], fe, G), _removeListener$1(se, _eventTypes[2], he), _removeListener$1(se, _eventTypes[3], he), _removeListener$1(o, "click", _e, !0), _removeListener$1(o, "click", Pe), _removeListener$1(se, "gesturestart", ye), _removeListener$1(se, "gestureend", me), _removeListener$1(o, _pointerType + "enter", we), _removeListener$1(o, _pointerType + "leave", Le), _removeListener$1(o, _pointerType + "move", xe), K.isEnabled = K.isPressed = K.isDragging = !1, A && A(K));
            }, K.kill = K.revert = function () {
                K.disable();
                var e = _observers.indexOf(K);
                e >= 0 && _observers.splice(e, 1), _normalizer$1 === K && (_normalizer$1 = 0);
            }, _observers.push(K), X && _isViewport$1(o) && (_normalizer$1 = K), K.enable(d);
        }, _createClass(e, [{
            key: "velocityX",
            get: function () {
                return this._vx.getVelocity()
            }
        }, {
            key: "velocityY",
            get: function () {
                return this._vy.getVelocity()
            }
        }]), e
    }();
    Observer.version = "3.12.5", Observer.create = function (e) {
        return new Observer(e)
    }, Observer.register = _initCore, Observer.getAll = function () {
        return _observers.slice()
    }, Observer.getById = function (e) {
        return _observers.filter((function (t) {
            return t.vars.id === e
        }))[0]
    }, _getGSAP$1() && gsap$1.registerPlugin(Observer);

    /*!
     * ScrollTrigger 3.12.5
     * https://gsap.com
     *
     * @license Copyright 2008-2024, GreenSock. All rights reserved.
     * Subject to the terms at https://gsap.com/standard-license or for
     * Club GSAP members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
     */
    var gsap, _coreInitted, _win, _doc, _docEl, _body, _root, _resizeDelay, _toArray, _clamp, _time2, _syncInterval, _refreshing, _pointerIsDown, _transformProp, _i, _prevWidth, _prevHeight, _autoRefresh, _sort, _suppressOverwrites, _ignoreResize, _normalizer, _ignoreMobileResize, _baseScreenHeight, _baseScreenWidth, _fixIOSBug, _context, _scrollRestoration, _div100vh, _100vh, _isReverted, _clampingMax, _limitCallbacks, _rafID, _refreshingAll, _queueRefreshID, _primary, _startup = 1,
        _getTime = Date.now,
        _time1 = _getTime(),
        _lastScrollTime = 0,
        _enabled = 0,
        _parseClamp = function (e, r, t) {
            var i = _isString(e) && ("clamp(" === e.substr(0, 6) || e.indexOf("max") > -1);
            return t["_" + r + "Clamp"] = i, i ? e.substr(6, e.length - 7) : e
        },
        _keepClamp = function (e, r) {
            return !r || _isString(e) && "clamp(" === e.substr(0, 6) ? e : "clamp(" + e + ")"
        },
        _rafBugFix = function e() {
            return _enabled && requestAnimationFrame(e)
        },
        _pointerDownHandler = function () {
            return _pointerIsDown = 1
        },
        _pointerUpHandler = function () {
            return _pointerIsDown = 0
        },
        _passThrough = function (e) {
            return e
        },
        _round = function (e) {
            return Math.round(1e5 * e) / 1e5 || 0
        },
        _windowExists = function () {
            return "undefined" != typeof window
        },
        _getGSAP = function () {
            return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap
        },
        _isViewport = function (e) {
            return !!~_root.indexOf(e)
        },
        _getViewportDimension = function (e) {
            return ("Height" === e ? _100vh : _win["inner" + e]) || _docEl["client" + e] || _body["client" + e]
        },
        _getBoundsFunc = function (e) {
            return _getProxyProp(e, "getBoundingClientRect") || (_isViewport(e) ? function () {
                return _winOffsets.width = _win.innerWidth, _winOffsets.height = _100vh, _winOffsets
            } : function () {
                return _getBounds(e)
            })
        },
        _getSizeFunc = function (e, r, t) {
            var i = t.d,
                n = t.d2,
                o = t.a;
            return (o = _getProxyProp(e, "getBoundingClientRect")) ? function () {
                return o()[i]
            } : function () {
                return (r ? _getViewportDimension(n) : e["client" + n]) || 0
            }
        },
        _getOffsetsFunc = function (e, r) {
            return !r || ~_proxies.indexOf(e) ? _getBoundsFunc(e) : function () {
                return _winOffsets
            }
        },
        _maxScroll = function (e, r) {
            var t = r.s,
                i = r.d2,
                n = r.d,
                o = r.a;
            return Math.max(0, (t = "scroll" + i) && (o = _getProxyProp(e, t)) ? o() - _getBoundsFunc(e)()[n] : _isViewport(e) ? (_docEl[t] || _body[t]) - _getViewportDimension(i) : e[t] - e["offset" + i])
        },
        _iterateAutoRefresh = function (e, r) {
            for (var t = 0; t < _autoRefresh.length; t += 3)(!r || ~r.indexOf(_autoRefresh[t + 1])) && e(_autoRefresh[t], _autoRefresh[t + 1], _autoRefresh[t + 2]);
        },
        _isString = function (e) {
            return "string" == typeof e
        },
        _isFunction = function (e) {
            return "function" == typeof e
        },
        _isNumber = function (e) {
            return "number" == typeof e
        },
        _isObject = function (e) {
            return "object" == typeof e
        },
        _endAnimation = function (e, r, t) {
            return e && e.progress(r ? 0 : 1) && t && e.pause()
        },
        _callback = function (e, r) {
            if (e.enabled) {
                var t = e._ctx ? e._ctx.add((function () {
                    return r(e)
                })) : r(e);
                t && t.totalTime && (e.callbackAnimation = t);
            }
        },
        _abs = Math.abs,
        _left = "left",
        _top = "top",
        _right = "right",
        _bottom = "bottom",
        _width = "width",
        _height = "height",
        _Right = "Right",
        _Left = "Left",
        _Top = "Top",
        _Bottom = "Bottom",
        _padding = "padding",
        _margin = "margin",
        _Width = "Width",
        _Height = "Height",
        _px = "px",
        _getComputedStyle = function (e) {
            return _win.getComputedStyle(e)
        },
        _makePositionable = function (e) {
            var r = _getComputedStyle(e).position;
            e.style.position = "absolute" === r || "fixed" === r ? r : "relative";
        },
        _setDefaults = function (e, r) {
            for (var t in r) t in e || (e[t] = r[t]);
            return e
        },
        _getBounds = function (e, r) {
            var t = r && "matrix(1, 0, 0, 1, 0, 0)" !== _getComputedStyle(e)[_transformProp] && gsap.to(e, {
                x: 0,
                y: 0,
                xPercent: 0,
                yPercent: 0,
                rotation: 0,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                skewX: 0,
                skewY: 0
            }).progress(1),
                i = e.getBoundingClientRect();
            return t && t.progress(0).kill(), i
        },
        _getSize = function (e, r) {
            var t = r.d2;
            return e["offset" + t] || e["client" + t] || 0
        },
        _getLabelRatioArray = function (e) {
            var r, t = [],
                i = e.labels,
                n = e.duration();
            for (r in i) t.push(i[r] / n);
            return t
        },
        _getClosestLabel = function (e) {
            return function (r) {
                return gsap.utils.snap(_getLabelRatioArray(e), r)
            }
        },
        _snapDirectional = function (e) {
            var r = gsap.utils.snap(e),
                t = Array.isArray(e) && e.slice(0).sort((function (e, r) {
                    return e - r
                }));
            return t ? function (e, i, n) {
                var o;
                if (void 0 === n && (n = .001), !i) return r(e);
                if (i > 0) {
                    for (e -= n, o = 0; o < t.length; o++)
                        if (t[o] >= e) return t[o];
                    return t[o - 1]
                }
                for (o = t.length, e += n; o--;)
                    if (t[o] <= e) return t[o];
                return t[0]
            } : function (t, i, n) {
                void 0 === n && (n = .001);
                var o = r(t);
                return !i || Math.abs(o - t) < n || o - t < 0 == i < 0 ? o : r(i < 0 ? t - e : t + e)
            }
        },
        _getLabelAtDirection = function (e) {
            return function (r, t) {
                return _snapDirectional(_getLabelRatioArray(e))(r, t.direction)
            }
        },
        _multiListener = function (e, r, t, i) {
            return t.split(",").forEach((function (t) {
                return e(r, t, i)
            }))
        },
        _addListener = function (e, r, t, i, n) {
            return e.addEventListener(r, t, {
                passive: !i,
                capture: !!n
            })
        },
        _removeListener = function (e, r, t, i) {
            return e.removeEventListener(r, t, !!i)
        },
        _wheelListener = function (e, r, t) {
            (t = t && t.wheelHandler) && (e(r, "wheel", t), e(r, "touchmove", t));
        },
        _markerDefaults = {
            startColor: "green",
            endColor: "red",
            indent: 0,
            fontSize: "16px",
            fontWeight: "normal"
        },
        _defaults = {
            toggleActions: "play",
            anticipatePin: 0
        },
        _keywords = {
            top: 0,
            left: 0,
            center: .5,
            bottom: 1,
            right: 1
        },
        _offsetToPx = function (e, r) {
            if (_isString(e)) {
                var t = e.indexOf("="),
                    i = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
                ~t && (e.indexOf("%") > t && (i *= r / 100), e = e.substr(0, t - 1)), e = i + (e in _keywords ? _keywords[e] * r : ~e.indexOf("%") ? parseFloat(e) * r / 100 : parseFloat(e) || 0);
            }
            return e
        },
        _createMarker = function (e, r, t, i, n, o, s, a) {
            var l = n.startColor,
                _ = n.endColor,
                c = n.fontSize,
                u = n.indent,
                p = n.fontWeight,
                g = _doc.createElement("div"),
                d = _isViewport(t) || "fixed" === _getProxyProp(t, "pinType"),
                f = -1 !== e.indexOf("scroller"),
                h = d ? _body : t,
                m = -1 !== e.indexOf("start"),
                v = m ? l : _,
                y = "border-color:" + v + ";font-size:" + c + ";color:" + v + ";font-weight:" + p + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
            return y += "position:" + ((f || a) && d ? "fixed;" : "absolute;"), (f || a || !d) && (y += (i === _vertical ? _right : _bottom) + ":" + (o + parseFloat(u)) + "px;"), s && (y += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), g._isStart = m, g.setAttribute("class", "gsap-marker-" + e + (r ? " marker-" + r : "")), g.style.cssText = y, g.innerText = r || 0 === r ? e + "-" + r : e, h.children[0] ? h.insertBefore(g, h.children[0]) : h.appendChild(g), g._offset = g["offset" + i.op.d2], _positionMarker(g, 0, i, m), g
        },
        _positionMarker = function (e, r, t, i) {
            var n = {
                display: "block"
            },
                o = t[i ? "os2" : "p2"],
                s = t[i ? "p2" : "os2"];
            e._isFlipped = i, n[t.a + "Percent"] = i ? -100 : 0, n[t.a] = i ? "1px" : 0, n["border" + o + _Width] = 1, n["border" + s + _Width] = 0, n[t.p] = r + "px", gsap.set(e, n);
        },
        _triggers = [],
        _ids = {},
        _sync = function () {
            return _getTime() - _lastScrollTime > 34 && (_rafID || (_rafID = requestAnimationFrame(_updateAll)))
        },
        _onScroll = function () {
            (!_normalizer || !_normalizer.isPressed || _normalizer.startX > _body.clientWidth) && (_scrollers.cache++, _normalizer ? _rafID || (_rafID = requestAnimationFrame(_updateAll)) : _updateAll(), _lastScrollTime || _dispatch("scrollStart"), _lastScrollTime = _getTime());
        },
        _setBaseDimensions = function () {
            _baseScreenWidth = _win.innerWidth, _baseScreenHeight = _win.innerHeight;
        },
        _onResize = function () {
            _scrollers.cache++, !_refreshing && !_ignoreResize && !_doc.fullscreenElement && !_doc.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win.innerWidth || Math.abs(_win.innerHeight - _baseScreenHeight) > .25 * _win.innerHeight) && _resizeDelay.restart(!0);
        },
        _listeners = {},
        _emptyArray = [],
        _softRefresh = function e() {
            return _removeListener(ScrollTrigger, "scrollEnd", e) || _refreshAll(!0)
        },
        _dispatch = function (e) {
            return _listeners[e] && _listeners[e].map((function (e) {
                return e()
            })) || _emptyArray
        },
        _savedStyles = [],
        _revertRecorded = function (e) {
            for (var r = 0; r < _savedStyles.length; r += 5)(!e || _savedStyles[r + 4] && _savedStyles[r + 4].query === e) && (_savedStyles[r].style.cssText = _savedStyles[r + 1], _savedStyles[r].getBBox && _savedStyles[r].setAttribute("transform", _savedStyles[r + 2] || ""), _savedStyles[r + 3].uncache = 1);
        },
        _revertAll = function (e, r) {
            var t;
            for (_i = 0; _i < _triggers.length; _i++) !(t = _triggers[_i]) || r && t._ctx !== r || (e ? t.kill(1) : t.revert(!0, !0));
            _isReverted = !0, r && _revertRecorded(r), r || _dispatch("revert");
        },
        _clearScrollMemory = function (e, r) {
            _scrollers.cache++, (r || !_refreshingAll) && _scrollers.forEach((function (e) {
                return _isFunction(e) && e.cacheID++ && (e.rec = 0)
            })), _isString(e) && (_win.history.scrollRestoration = _scrollRestoration = e);
        },
        _refreshID = 0,
        _queueRefreshAll = function () {
            if (_queueRefreshID !== _refreshID) {
                var e = _queueRefreshID = _refreshID;
                requestAnimationFrame((function () {
                    return e === _refreshID && _refreshAll(!0)
                }));
            }
        },
        _refresh100vh = function () {
            _body.appendChild(_div100vh), _100vh = !_normalizer && _div100vh.offsetHeight || _win.innerHeight, _body.removeChild(_div100vh);
        },
        _hideAllMarkers = function (e) {
            return _toArray(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach((function (r) {
                return r.style.display = e ? "none" : "block"
            }))
        },
        _refreshAll = function (e, r) {
            if (!_lastScrollTime || e || _isReverted) {
                _refresh100vh(), _refreshingAll = ScrollTrigger.isRefreshing = !0, _scrollers.forEach((function (e) {
                    return _isFunction(e) && ++e.cacheID && (e.rec = e())
                }));
                var t = _dispatch("refreshInit");
                _sort && ScrollTrigger.sort(), r || _revertAll(), _scrollers.forEach((function (e) {
                    _isFunction(e) && (e.smooth && (e.target.style.scrollBehavior = "auto"), e(0));
                })), _triggers.slice(0).forEach((function (e) {
                    return e.refresh()
                })), _isReverted = !1, _triggers.forEach((function (e) {
                    if (e._subPinOffset && e.pin) {
                        var r = e.vars.horizontal ? "offsetWidth" : "offsetHeight",
                            t = e.pin[r];
                        e.revert(!0, 1), e.adjustPinSpacing(e.pin[r] - t), e.refresh();
                    }
                })), _clampingMax = 1, _hideAllMarkers(!0), _triggers.forEach((function (e) {
                    var r = _maxScroll(e.scroller, e._dir),
                        t = "max" === e.vars.end || e._endClamp && e.end > r,
                        i = e._startClamp && e.start >= r;
                    (t || i) && e.setPositions(i ? r - 1 : e.start, t ? Math.max(i ? r : e.start + 1, r) : e.end, !0);
                })), _hideAllMarkers(!1), _clampingMax = 0, t.forEach((function (e) {
                    return e && e.render && e.render(-1)
                })), _scrollers.forEach((function (e) {
                    _isFunction(e) && (e.smooth && requestAnimationFrame((function () {
                        return e.target.style.scrollBehavior = "smooth"
                    })), e.rec && e(e.rec));
                })), _clearScrollMemory(_scrollRestoration, 1), _resizeDelay.pause(), _refreshID++, _refreshingAll = 2, _updateAll(2), _triggers.forEach((function (e) {
                    return _isFunction(e.vars.onRefresh) && e.vars.onRefresh(e)
                })), _refreshingAll = ScrollTrigger.isRefreshing = !1, _dispatch("refresh");
            } else _addListener(ScrollTrigger, "scrollEnd", _softRefresh);
        },
        _lastScroll = 0,
        _direction = 1,
        _updateAll = function (e) {
            if (2 === e || !_refreshingAll && !_isReverted) {
                ScrollTrigger.isUpdating = !0, _primary && _primary.update(0);
                var r = _triggers.length,
                    t = _getTime(),
                    i = t - _time1 >= 50,
                    n = r && _triggers[0].scroll();
                if (_direction = _lastScroll > n ? -1 : 1, _refreshingAll || (_lastScroll = n), i && (_lastScrollTime && !_pointerIsDown && t - _lastScrollTime > 200 && (_lastScrollTime = 0, _dispatch("scrollEnd")), _time2 = _time1, _time1 = t), _direction < 0) {
                    for (_i = r; _i-- > 0;) _triggers[_i] && _triggers[_i].update(0, i);
                    _direction = 1;
                } else
                    for (_i = 0; _i < r; _i++) _triggers[_i] && _triggers[_i].update(0, i);
                ScrollTrigger.isUpdating = !1;
            }
            _rafID = 0;
        },
        _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
        _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]),
        _swapPinOut = function (e, r, t) {
            _setState(t);
            var i = e._gsap;
            if (i.spacerIsNative) _setState(i.spacerState);
            else if (e._gsap.swappedIn) {
                var n = r.parentNode;
                n && (n.insertBefore(e, r), n.removeChild(r));
            }
            e._gsap.swappedIn = !1;
        },
        _swapPinIn = function (e, r, t, i) {
            if (!e._gsap.swappedIn) {
                for (var n, o = _propNamesToCopy.length, s = r.style, a = e.style; o--;) s[n = _propNamesToCopy[o]] = t[n];
                s.position = "absolute" === t.position ? "absolute" : "relative", "inline" === t.display && (s.display = "inline-block"), a[_bottom] = a[_right] = "auto", s.flexBasis = t.flexBasis || "auto", s.overflow = "visible", s.boxSizing = "border-box", s[_width] = _getSize(e, _horizontal) + _px, s[_height] = _getSize(e, _vertical) + _px, s[_padding] = a[_margin] = a[_top] = a[_left] = "0", _setState(i), a[_width] = a["max" + _Width] = t[_width], a[_height] = a["max" + _Height] = t[_height], a[_padding] = t[_padding], e.parentNode !== r && (e.parentNode.insertBefore(r, e), r.appendChild(e)), e._gsap.swappedIn = !0;
            }
        },
        _capsExp = /([A-Z])/g,
        _setState = function (e) {
            if (e) {
                var r, t, i = e.t.style,
                    n = e.length,
                    o = 0;
                for ((e.t._gsap || gsap.core.getCache(e.t)).uncache = 1; o < n; o += 2) t = e[o + 1], r = e[o], t ? i[r] = t : i[r] && i.removeProperty(r.replace(_capsExp, "-$1").toLowerCase());
            }
        },
        _getState = function (e) {
            for (var r = _stateProps.length, t = e.style, i = [], n = 0; n < r; n++) i.push(_stateProps[n], t[_stateProps[n]]);
            return i.t = e, i
        },
        _copyState = function (e, r, t) {
            for (var i, n = [], o = e.length, s = t ? 8 : 0; s < o; s += 2) i = e[s], n.push(i, i in r ? r[i] : e[s + 1]);
            return n.t = e.t, n
        },
        _winOffsets = {
            left: 0,
            top: 0
        },
        _parsePosition = function (e, r, t, i, n, o, s, a, l, _, c, u, p, g) {
            _isFunction(e) && (e = e(a)), _isString(e) && "max" === e.substr(0, 3) && (e = u + ("=" === e.charAt(4) ? _offsetToPx("0" + e.substr(3), t) : 0));
            var d, f, h, m = p ? p.time() : 0;
            if (p && p.seek(0), isNaN(e) || (e = +e), _isNumber(e)) p && (e = gsap.utils.mapRange(p.scrollTrigger.start, p.scrollTrigger.end, 0, u, e)), s && _positionMarker(s, t, i, !0);
            else {
                _isFunction(r) && (r = r(a));
                var v, y, S, b, w = (e || "0").split(" ");
                h = _getTarget(r, a) || _body, (v = _getBounds(h) || {}) && (v.left || v.top) || "none" !== _getComputedStyle(h).display || (b = h.style.display, h.style.display = "block", v = _getBounds(h), b ? h.style.display = b : h.style.removeProperty("display")), y = _offsetToPx(w[0], v[i.d]), S = _offsetToPx(w[1] || "0", t), e = v[i.p] - l[i.p] - _ + y + n - S, s && _positionMarker(s, S, i, t - S < 20 || s._isStart && S > 20), t -= t - S;
            }
            if (g && (a[g] = e || -.001, e < 0 && (e = 0)), o) {
                var x = e + t,
                    T = o._isStart;
                d = "scroll" + i.d2, _positionMarker(o, x, i, T && x > 20 || !T && (c ? Math.max(_body[d], _docEl[d]) : o.parentNode[d]) <= x + 1), c && (l = _getBounds(s), c && (o.style[i.op.p] = l[i.op.p] - i.op.m - o._offset + _px));
            }
            return p && h && (d = _getBounds(h), p.seek(u), f = _getBounds(h), p._caScrollDist = d[i.p] - f[i.p], e = e / p._caScrollDist * u), p && p.seek(m), p ? e : Math.round(e)
        },
        _prefixExp = /(webkit|moz|length|cssText|inset)/i,
        _reparent = function (e, r, t, i) {
            if (e.parentNode !== r) {
                var n, o, s = e.style;
                if (r === _body) {
                    for (n in e._stOrig = s.cssText, o = _getComputedStyle(e)) + n || _prefixExp.test(n) || !o[n] || "string" != typeof s[n] || "0" === n || (s[n] = o[n]);
                    s.top = t, s.left = i;
                } else s.cssText = e._stOrig;
                gsap.core.getCache(e).uncache = 1, r.appendChild(e);
            }
        },
        _interruptionTracker = function (e, r, t) {
            var i = r,
                n = i;
            return function (r) {
                var o = Math.round(e());
                return o !== i && o !== n && Math.abs(o - i) > 3 && Math.abs(o - n) > 3 && (r = o, t && t()), n = i, i = r, r
            }
        },
        _shiftMarker = function (e, r, t) {
            var i = {};
            i[r.p] = "+=" + t, gsap.set(e, i);
        },
        _getTweenCreator = function (e, r) {
            var t = _getScrollFunc(e, r),
                i = "_scroll" + r.p2,
                n = function r(n, o, s, a, l) {
                    var _ = r.tween,
                        c = o.onComplete,
                        u = {};
                    s = s || t();
                    var p = _interruptionTracker(t, s, (function () {
                        _.kill(), r.tween = 0;
                    }));
                    return l = a && l || 0, a = a || n - s, _ && _.kill(), o[i] = n, o.inherit = !1, o.modifiers = u, u[i] = function () {
                        return p(s + a * _.ratio + l * _.ratio * _.ratio)
                    }, o.onUpdate = function () {
                        _scrollers.cache++, r.tween && _updateAll();
                    }, o.onComplete = function () {
                        r.tween = 0, c && c.call(_);
                    }, _ = r.tween = gsap.to(e, o)
                };
            return e[i] = t, t.wheelHandler = function () {
                return n.tween && n.tween.kill() && (n.tween = 0)
            }, _addListener(e, "wheel", t.wheelHandler), ScrollTrigger.isTouch && _addListener(e, "touchmove", t.wheelHandler), n
        };
    var ScrollTrigger = function () {
        function e(r, t) {
            _coreInitted || e.register(gsap) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), _context(this), this.init(r, t);
        }
        return e.prototype.init = function (r, t) {
            if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), _enabled) {
                var i, n, o, s, a, l, _, c, u, p, g, d, f, h, m, v, y, S, b, w, x, T, A, k, P, C, R, O, z, E, I, L, M, D, B, F, N, H, W, V = r = _setDefaults(_isString(r) || _isNumber(r) || r.nodeType ? {
                    trigger: r
                } : r, _defaults),
                    q = V.onUpdate,
                    U = V.toggleClass,
                    j = V.id,
                    Y = V.onToggle,
                    X = V.onRefresh,
                    G = V.scrub,
                    K = V.trigger,
                    Z = V.pin,
                    $ = V.pinSpacing,
                    J = V.invalidateOnRefresh,
                    Q = V.anticipatePin,
                    ee = V.onScrubComplete,
                    re = V.onSnapComplete,
                    te = V.once,
                    ie = V.snap,
                    ne = V.pinReparent,
                    oe = V.pinSpacer,
                    se = V.containerAnimation,
                    ae = V.fastScrollEnd,
                    le = V.preventOverlaps,
                    _e = r.horizontal || r.containerAnimation && !1 !== r.horizontal ? _horizontal : _vertical,
                    ce = !G && 0 !== G,
                    ue = _getTarget(r.scroller || _win),
                    pe = gsap.core.getCache(ue),
                    ge = _isViewport(ue),
                    de = "fixed" === ("pinType" in r ? r.pinType : _getProxyProp(ue, "pinType") || ge && "fixed"),
                    fe = [r.onEnter, r.onLeave, r.onEnterBack, r.onLeaveBack],
                    he = ce && r.toggleActions.split(" "),
                    me = "markers" in r ? r.markers : _defaults.markers,
                    ve = ge ? 0 : parseFloat(_getComputedStyle(ue)["border" + _e.p2 + _Width]) || 0,
                    ye = this,
                    Se = r.onRefreshInit && function () {
                        return r.onRefreshInit(ye)
                    },
                    be = _getSizeFunc(ue, ge, _e),
                    we = _getOffsetsFunc(ue, ge),
                    xe = 0,
                    Te = 0,
                    Ae = 0,
                    ke = _getScrollFunc(ue, _e);
                if (ye._startClamp = ye._endClamp = !1, ye._dir = _e, Q *= 45, ye.scroller = ue, ye.scroll = se ? se.time.bind(se) : ke, s = ke(), ye.vars = r, t = t || r.animation, "refreshPriority" in r && (_sort = 1, -9999 === r.refreshPriority && (_primary = ye)), pe.tweenScroll = pe.tweenScroll || {
                    top: _getTweenCreator(ue, _vertical),
                    left: _getTweenCreator(ue, _horizontal)
                }, ye.tweenTo = i = pe.tweenScroll[_e.p], ye.scrubDuration = function (e) {
                    (M = _isNumber(e) && e) ? L ? L.duration(e) : L = gsap.to(t, {
                        ease: "expo",
                        totalProgress: "+=0",
                        inherit: !1,
                        duration: M,
                        paused: !0,
                        onComplete: function () {
                            return ee && ee(ye)
                        }
                    }) : (L && L.progress(1).kill(), L = 0);
                }, t && (t.vars.lazy = !1, t._initted && !ye.isReverted || !1 !== t.vars.immediateRender && !1 !== r.immediateRender && t.duration() && t.render(0, !0, !0), ye.animation = t.pause(), t.scrollTrigger = ye, ye.scrubDuration(G), E = 0, j || (j = t.vars.id)), ie && (_isObject(ie) && !ie.push || (ie = {
                    snapTo: ie
                }), "scrollBehavior" in _body.style && gsap.set(ge ? [_body, _docEl] : ue, {
                    scrollBehavior: "auto"
                }), _scrollers.forEach((function (e) {
                    return _isFunction(e) && e.target === (ge ? _doc.scrollingElement || _docEl : ue) && (e.smooth = !1)
                })), o = _isFunction(ie.snapTo) ? ie.snapTo : "labels" === ie.snapTo ? _getClosestLabel(t) : "labelsDirectional" === ie.snapTo ? _getLabelAtDirection(t) : !1 !== ie.directional ? function (e, r) {
                    return _snapDirectional(ie.snapTo)(e, _getTime() - Te < 500 ? 0 : r.direction)
                } : gsap.utils.snap(ie.snapTo), D = ie.duration || {
                    min: .1,
                    max: 2
                }, D = _isObject(D) ? _clamp(D.min, D.max) : _clamp(D, D), B = gsap.delayedCall(ie.delay || M / 2 || .1, (function () {
                    var e = ke(),
                        r = _getTime() - Te < 500,
                        n = i.tween;
                    if (!(r || Math.abs(ye.getVelocity()) < 10) || n || _pointerIsDown || xe === e) ye.isActive && xe !== e && B.restart(!0);
                    else {
                        var s, a, c = (e - l) / h,
                            u = t && !ce ? t.totalProgress() : c,
                            p = r ? 0 : (u - I) / (_getTime() - _time2) * 1e3 || 0,
                            g = gsap.utils.clamp(-c, 1 - c, _abs(p / 2) * p / .185),
                            d = c + (!1 === ie.inertia ? 0 : g),
                            f = ie,
                            m = f.onStart,
                            v = f.onInterrupt,
                            y = f.onComplete;
                        if (s = o(d, ye), _isNumber(s) || (s = d), a = Math.round(l + s * h), e <= _ && e >= l && a !== e) {
                            if (n && !n._initted && n.data <= _abs(a - e)) return;
                            !1 === ie.inertia && (g = s - c), i(a, {
                                duration: D(_abs(.185 * Math.max(_abs(d - u), _abs(s - u)) / p / .05 || 0)),
                                ease: ie.ease || "power3",
                                data: _abs(a - e),
                                onInterrupt: function () {
                                    return B.restart(!0) && v && v(ye)
                                },
                                onComplete: function () {
                                    ye.update(), xe = ke(), t && (L ? L.resetTo("totalProgress", s, t._tTime / t._tDur) : t.progress(s)), E = I = t && !ce ? t.totalProgress() : ye.progress, re && re(ye), y && y(ye);
                                }
                            }, e, g * h, a - e - g * h), m && m(ye, i.tween);
                        }
                    }
                })).pause()), j && (_ids[j] = ye), (W = (K = ye.trigger = _getTarget(K || !0 !== Z && Z)) && K._gsap && K._gsap.stRevert) && (W = W(ye)), Z = !0 === Z ? K : _getTarget(Z), _isString(U) && (U = {
                    targets: K,
                    className: U
                }), Z && (!1 === $ || $ === _margin || ($ = !(!$ && Z.parentNode && Z.parentNode.style && "flex" === _getComputedStyle(Z.parentNode).display) && _padding), ye.pin = Z, (n = gsap.core.getCache(Z)).spacer ? m = n.pinState : (oe && ((oe = _getTarget(oe)) && !oe.nodeType && (oe = oe.current || oe.nativeElement), n.spacerIsNative = !!oe, oe && (n.spacerState = _getState(oe))), n.spacer = S = oe || _doc.createElement("div"), S.classList.add("pin-spacer"), j && S.classList.add("pin-spacer-" + j), n.pinState = m = _getState(Z)), !1 !== r.force3D && gsap.set(Z, {
                    force3D: !0
                }), ye.spacer = S = n.spacer, z = _getComputedStyle(Z), k = z[$ + _e.os2], w = gsap.getProperty(Z), x = gsap.quickSetter(Z, _e.a, _px), _swapPinIn(Z, S, z), y = _getState(Z)), me) {
                    d = _isObject(me) ? _setDefaults(me, _markerDefaults) : _markerDefaults, p = _createMarker("scroller-start", j, ue, _e, d, 0), g = _createMarker("scroller-end", j, ue, _e, d, 0, p), b = p["offset" + _e.op.d2];
                    var Pe = _getTarget(_getProxyProp(ue, "content") || ue);
                    c = this.markerStart = _createMarker("start", j, Pe, _e, d, b, 0, se), u = this.markerEnd = _createMarker("end", j, Pe, _e, d, b, 0, se), se && (H = gsap.quickSetter([c, u], _e.a, _px)), de || _proxies.length && !0 === _getProxyProp(ue, "fixedMarkers") || (_makePositionable(ge ? _body : ue), gsap.set([p, g], {
                        force3D: !0
                    }), C = gsap.quickSetter(p, _e.a, _px), O = gsap.quickSetter(g, _e.a, _px));
                }
                if (se) {
                    var Ce = se.vars.onUpdate,
                        Re = se.vars.onUpdateParams;
                    se.eventCallback("onUpdate", (function () {
                        ye.update(0, 0, 1), Ce && Ce.apply(se, Re || []);
                    }));
                }
                if (ye.previous = function () {
                    return _triggers[_triggers.indexOf(ye) - 1]
                }, ye.next = function () {
                    return _triggers[_triggers.indexOf(ye) + 1]
                }, ye.revert = function (e, r) {
                    if (!r) return ye.kill(!0);
                    var i = !1 !== e || !ye.enabled,
                        n = _refreshing;
                    i !== ye.isReverted && (i && (F = Math.max(ke(), ye.scroll.rec || 0), Ae = ye.progress, N = t && t.progress()), c && [c, u, p, g].forEach((function (e) {
                        return e.style.display = i ? "none" : "block"
                    })), i && (_refreshing = ye, ye.update(i)), !Z || ne && ye.isActive || (i ? _swapPinOut(Z, S, m) : _swapPinIn(Z, S, _getComputedStyle(Z), P)), i || ye.update(i), _refreshing = n, ye.isReverted = i);
                }, ye.refresh = function (n, o, d, b) {
                    if (!_refreshing && ye.enabled || o)
                        if (Z && n && _lastScrollTime) _addListener(e, "scrollEnd", _softRefresh);
                        else {
                            !_refreshingAll && Se && Se(ye), _refreshing = ye, i.tween && !d && (i.tween.kill(), i.tween = 0), L && L.pause(), J && t && t.revert({
                                kill: !1
                            }).invalidate(), ye.isReverted || ye.revert(!0, !0), ye._subPinOffset = !1;
                            var x, k, C, O, z, E, I, M, D, H, W, V, q, U = be(),
                                j = we(),
                                Y = se ? se.duration() : _maxScroll(ue, _e),
                                G = h <= .01,
                                Q = 0,
                                ee = b || 0,
                                re = _isObject(d) ? d.end : r.end,
                                te = r.endTrigger || K,
                                ie = _isObject(d) ? d.start : r.start || (0 !== r.start && K ? Z ? "0 0" : "0 100%" : 0),
                                oe = ye.pinnedContainer = r.pinnedContainer && _getTarget(r.pinnedContainer, ye),
                                ae = K && Math.max(0, _triggers.indexOf(ye)) || 0,
                                le = ae;
                            for (me && _isObject(d) && (V = gsap.getProperty(p, _e.p), q = gsap.getProperty(g, _e.p)); le--;)(E = _triggers[le]).end || E.refresh(0, 1) || (_refreshing = ye), !(I = E.pin) || I !== K && I !== Z && I !== oe || E.isReverted || (H || (H = []), H.unshift(E), E.revert(!0, !0)), E !== _triggers[le] && (ae--, le--);
                            for (_isFunction(ie) && (ie = ie(ye)), ie = _parseClamp(ie, "start", ye), l = _parsePosition(ie, K, U, _e, ke(), c, p, ye, j, ve, de, Y, se, ye._startClamp && "_startClamp") || (Z ? -.001 : 0), _isFunction(re) && (re = re(ye)), _isString(re) && !re.indexOf("+=") && (~re.indexOf(" ") ? re = (_isString(ie) ? ie.split(" ")[0] : "") + re : (Q = _offsetToPx(re.substr(2), U), re = _isString(ie) ? ie : (se ? gsap.utils.mapRange(0, se.duration(), se.scrollTrigger.start, se.scrollTrigger.end, l) : l) + Q, te = K)), re = _parseClamp(re, "end", ye), _ = Math.max(l, _parsePosition(re || (te ? "100% 0" : Y), te, U, _e, ke() + Q, u, g, ye, j, ve, de, Y, se, ye._endClamp && "_endClamp")) || -.001, Q = 0, le = ae; le--;)(I = (E = _triggers[le]).pin) && E.start - E._pinPush <= l && !se && E.end > 0 && (x = E.end - (ye._startClamp ? Math.max(0, E.start) : E.start), (I === K && E.start - E._pinPush < l || I === oe) && isNaN(ie) && (Q += x * (1 - E.progress)), I === Z && (ee += x));
                            if (l += Q, _ += Q, ye._startClamp && (ye._startClamp += Q), ye._endClamp && !_refreshingAll && (ye._endClamp = _ || -.001, _ = Math.min(_, _maxScroll(ue, _e))), h = _ - l || (l -= .01) && .001, G && (Ae = gsap.utils.clamp(0, 1, gsap.utils.normalize(l, _, F))), ye._pinPush = ee, c && Q && ((x = {})[_e.a] = "+=" + Q, oe && (x[_e.p] = "-=" + ke()), gsap.set([c, u], x)), !Z || _clampingMax && ye.end >= _maxScroll(ue, _e)) {
                                if (K && ke() && !se)
                                    for (k = K.parentNode; k && k !== _body;) k._pinOffset && (l -= k._pinOffset, _ -= k._pinOffset), k = k.parentNode;
                            } else x = _getComputedStyle(Z), O = _e === _vertical, C = ke(), T = parseFloat(w(_e.a)) + ee, !Y && _ > 1 && (W = {
                                style: W = (ge ? _doc.scrollingElement || _docEl : ue).style,
                                value: W["overflow" + _e.a.toUpperCase()]
                            }, ge && "scroll" !== _getComputedStyle(_body)["overflow" + _e.a.toUpperCase()] && (W.style["overflow" + _e.a.toUpperCase()] = "scroll")), _swapPinIn(Z, S, x), y = _getState(Z), k = _getBounds(Z, !0), M = de && _getScrollFunc(ue, O ? _horizontal : _vertical)(), $ ? ((P = [$ + _e.os2, h + ee + _px]).t = S, (le = $ === _padding ? _getSize(Z, _e) + h + ee : 0) && (P.push(_e.d, le + _px), "auto" !== S.style.flexBasis && (S.style.flexBasis = le + _px)), _setState(P), oe && _triggers.forEach((function (e) {
                                e.pin === oe && !1 !== e.vars.pinSpacing && (e._subPinOffset = !0);
                            })), de && ke(F)) : (le = _getSize(Z, _e)) && "auto" !== S.style.flexBasis && (S.style.flexBasis = le + _px), de && ((z = {
                                top: k.top + (O ? C - l : M) + _px,
                                left: k.left + (O ? M : C - l) + _px,
                                boxSizing: "border-box",
                                position: "fixed"
                            })[_width] = z["max" + _Width] = Math.ceil(k.width) + _px, z[_height] = z["max" + _Height] = Math.ceil(k.height) + _px, z[_margin] = z[_margin + _Top] = z[_margin + _Right] = z[_margin + _Bottom] = z[_margin + _Left] = "0", z[_padding] = x[_padding], z[_padding + _Top] = x[_padding + _Top], z[_padding + _Right] = x[_padding + _Right], z[_padding + _Bottom] = x[_padding + _Bottom], z[_padding + _Left] = x[_padding + _Left], v = _copyState(m, z, ne), _refreshingAll && ke(0)), t ? (D = t._initted, _suppressOverwrites(1), t.render(t.duration(), !0, !0), A = w(_e.a) - T + h + ee, R = Math.abs(h - A) > 1, de && R && v.splice(v.length - 2, 2), t.render(0, !0, !0), D || t.invalidate(!0), t.parent || t.totalTime(t.totalTime()), _suppressOverwrites(0)) : A = h, W && (W.value ? W.style["overflow" + _e.a.toUpperCase()] = W.value : W.style.removeProperty("overflow-" + _e.a));
                            H && H.forEach((function (e) {
                                return e.revert(!1, !0)
                            })), ye.start = l, ye.end = _, s = a = _refreshingAll ? F : ke(), se || _refreshingAll || (s < F && ke(F), ye.scroll.rec = 0), ye.revert(!1, !0), Te = _getTime(), B && (xe = -1, B.restart(!0)), _refreshing = 0, t && ce && (t._initted || N) && t.progress() !== N && t.progress(N || 0, !0).render(t.time(), !0, !0), (G || Ae !== ye.progress || se || J) && (t && !ce && t.totalProgress(se && l < -.001 && !Ae ? gsap.utils.normalize(l, _, 0) : Ae, !0), ye.progress = G || (s - l) / h === Ae ? 0 : Ae), Z && $ && (S._pinOffset = Math.round(ye.progress * A)), L && L.invalidate(), isNaN(V) || (V -= gsap.getProperty(p, _e.p), q -= gsap.getProperty(g, _e.p), _shiftMarker(p, _e, V), _shiftMarker(c, _e, V - (b || 0)), _shiftMarker(g, _e, q), _shiftMarker(u, _e, q - (b || 0))), G && !_refreshingAll && ye.update(), !X || _refreshingAll || f || (f = !0, X(ye), f = !1);
                        }
                }, ye.getVelocity = function () {
                    return (ke() - a) / (_getTime() - _time2) * 1e3 || 0
                }, ye.endAnimation = function () {
                    _endAnimation(ye.callbackAnimation), t && (L ? L.progress(1) : t.paused() ? ce || _endAnimation(t, ye.direction < 0, 1) : _endAnimation(t, t.reversed()));
                }, ye.labelToScroll = function (e) {
                    return t && t.labels && (l || ye.refresh() || l) + t.labels[e] / t.duration() * h || 0
                }, ye.getTrailing = function (e) {
                    var r = _triggers.indexOf(ye),
                        t = ye.direction > 0 ? _triggers.slice(0, r).reverse() : _triggers.slice(r + 1);
                    return (_isString(e) ? t.filter((function (r) {
                        return r.vars.preventOverlaps === e
                    })) : t).filter((function (e) {
                        return ye.direction > 0 ? e.end <= l : e.start >= _
                    }))
                }, ye.update = function (e, r, n) {
                    if (!se || n || e) {
                        var o, c, u, g, d, f, m, b = !0 === _refreshingAll ? F : ye.scroll(),
                            w = e ? 0 : (b - l) / h,
                            P = w < 0 ? 0 : w > 1 ? 1 : w || 0,
                            z = ye.progress;
                        if (r && (a = s, s = se ? ke() : b, ie && (I = E, E = t && !ce ? t.totalProgress() : P)), Q && Z && !_refreshing && !_startup && _lastScrollTime && (!P && l < b + (b - a) / (_getTime() - _time2) * Q ? P = 1e-4 : 1 === P && _ > b + (b - a) / (_getTime() - _time2) * Q && (P = .9999)), P !== z && ye.enabled) {
                            if (g = (d = (o = ye.isActive = !!P && P < 1) !== (!!z && z < 1)) || !!P != !!z, ye.direction = P > z ? 1 : -1, ye.progress = P, g && !_refreshing && (c = P && !z ? 0 : 1 === P ? 1 : 1 === z ? 2 : 3, ce && (u = !d && "none" !== he[c + 1] && he[c + 1] || he[c], m = t && ("complete" === u || "reset" === u || u in t))), le && (d || m) && (m || G || !t) && (_isFunction(le) ? le(ye) : ye.getTrailing(le).forEach((function (e) {
                                return e.endAnimation()
                            }))), ce || (!L || _refreshing || _startup ? t && t.totalProgress(P, !(!_refreshing || !Te && !e)) : (L._dp._time - L._start !== L._time && L.render(L._dp._time - L._start), L.resetTo ? L.resetTo("totalProgress", P, t._tTime / t._tDur) : (L.vars.totalProgress = P, L.invalidate().restart()))), Z)
                                if (e && $ && (S.style[$ + _e.os2] = k), de) {
                                    if (g) {
                                        if (f = !e && P > z && _ + 1 > b && b + 1 >= _maxScroll(ue, _e), ne)
                                            if (e || !o && !f) _reparent(Z, S);
                                            else {
                                                var M = _getBounds(Z, !0),
                                                    D = b - l;
                                                _reparent(Z, _body, M.top + (_e === _vertical ? D : 0) + _px, M.left + (_e === _vertical ? 0 : D) + _px);
                                            } _setState(o || f ? v : y), R && P < 1 && o || x(T + (1 !== P || f ? 0 : A));
                                    }
                                } else x(_round(T + A * P));
                            ie && !i.tween && !_refreshing && !_startup && B.restart(!0), U && (d || te && P && (P < 1 || !_limitCallbacks)) && _toArray(U.targets).forEach((function (e) {
                                return e.classList[o || te ? "add" : "remove"](U.className)
                            })), q && !ce && !e && q(ye), g && !_refreshing ? (ce && (m && ("complete" === u ? t.pause().totalProgress(1) : "reset" === u ? t.restart(!0).pause() : "restart" === u ? t.restart(!0) : t[u]()), q && q(ye)), !d && _limitCallbacks || (Y && d && _callback(ye, Y), fe[c] && _callback(ye, fe[c]), te && (1 === P ? ye.kill(!1, 1) : fe[c] = 0), d || fe[c = 1 === P ? 1 : 3] && _callback(ye, fe[c])), ae && !o && Math.abs(ye.getVelocity()) > (_isNumber(ae) ? ae : 2500) && (_endAnimation(ye.callbackAnimation), L ? L.progress(1) : _endAnimation(t, "reverse" === u ? 1 : !P, 1))) : ce && q && !_refreshing && q(ye);
                        }
                        if (O) {
                            var N = se ? b / se.duration() * (se._caScrollDist || 0) : b;
                            C(N + (p._isFlipped ? 1 : 0)), O(N);
                        }
                        H && H(-b / se.duration() * (se._caScrollDist || 0));
                    }
                }, ye.enable = function (r, t) {
                    ye.enabled || (ye.enabled = !0, _addListener(ue, "resize", _onResize), ge || _addListener(ue, "scroll", _onScroll), Se && _addListener(e, "refreshInit", Se), !1 !== r && (ye.progress = Ae = 0, s = a = xe = ke()), !1 !== t && ye.refresh());
                }, ye.getTween = function (e) {
                    return e && i ? i.tween : L
                }, ye.setPositions = function (e, r, t, i) {
                    if (se) {
                        var n = se.scrollTrigger,
                            o = se.duration(),
                            s = n.end - n.start;
                        e = n.start + s * e / o, r = n.start + s * r / o;
                    }
                    ye.refresh(!1, !1, {
                        start: _keepClamp(e, t && !!ye._startClamp),
                        end: _keepClamp(r, t && !!ye._endClamp)
                    }, i), ye.update();
                }, ye.adjustPinSpacing = function (e) {
                    if (P && e) {
                        var r = P.indexOf(_e.d) + 1;
                        P[r] = parseFloat(P[r]) + e + _px, P[1] = parseFloat(P[1]) + e + _px, _setState(P);
                    }
                }, ye.disable = function (r, t) {
                    if (ye.enabled && (!1 !== r && ye.revert(!0, !0), ye.enabled = ye.isActive = !1, t || L && L.pause(), F = 0, n && (n.uncache = 1), Se && _removeListener(e, "refreshInit", Se), B && (B.pause(), i.tween && i.tween.kill() && (i.tween = 0)), !ge)) {
                        for (var o = _triggers.length; o--;)
                            if (_triggers[o].scroller === ue && _triggers[o] !== ye) return;
                        _removeListener(ue, "resize", _onResize), ge || _removeListener(ue, "scroll", _onScroll);
                    }
                }, ye.kill = function (e, i) {
                    ye.disable(e, i), L && !i && L.kill(), j && delete _ids[j];
                    var o = _triggers.indexOf(ye);
                    o >= 0 && _triggers.splice(o, 1), o === _i && _direction > 0 && _i--, o = 0, _triggers.forEach((function (e) {
                        return e.scroller === ye.scroller && (o = 1)
                    })), o || _refreshingAll || (ye.scroll.rec = 0), t && (t.scrollTrigger = null, e && t.revert({
                        kill: !1
                    }), i || t.kill()), c && [c, u, p, g].forEach((function (e) {
                        return e.parentNode && e.parentNode.removeChild(e)
                    })), _primary === ye && (_primary = 0), Z && (n && (n.uncache = 1), o = 0, _triggers.forEach((function (e) {
                        return e.pin === Z && o++
                    })), o || (n.spacer = 0)), r.onKill && r.onKill(ye);
                }, _triggers.push(ye), ye.enable(!1, !1), W && W(ye), t && t.add && !h) {
                    var Oe = ye.update;
                    ye.update = function () {
                        ye.update = Oe, l || _ || ye.refresh();
                    }, gsap.delayedCall(.01, ye.update), h = .01, l = _ = 0;
                } else ye.refresh();
                Z && _queueRefreshAll();
            } else this.update = this.refresh = this.kill = _passThrough;
        }, e.register = function (r) {
            return _coreInitted || (gsap = r || _getGSAP(), _windowExists() && window.document && e.enable(), _coreInitted = _enabled), _coreInitted
        }, e.defaults = function (e) {
            if (e)
                for (var r in e) _defaults[r] = e[r];
            return _defaults
        }, e.disable = function (e, r) {
            _enabled = 0, _triggers.forEach((function (t) {
                return t[r ? "kill" : "disable"](e)
            })), _removeListener(_win, "wheel", _onScroll), _removeListener(_doc, "scroll", _onScroll), clearInterval(_syncInterval), _removeListener(_doc, "touchcancel", _passThrough), _removeListener(_body, "touchstart", _passThrough), _multiListener(_removeListener, _doc, "pointerdown,touchstart,mousedown", _pointerDownHandler), _multiListener(_removeListener, _doc, "pointerup,touchend,mouseup", _pointerUpHandler), _resizeDelay.kill(), _iterateAutoRefresh(_removeListener);
            for (var t = 0; t < _scrollers.length; t += 3) _wheelListener(_removeListener, _scrollers[t], _scrollers[t + 1]), _wheelListener(_removeListener, _scrollers[t], _scrollers[t + 2]);
        }, e.enable = function () {
            if (_win = window, _doc = document, _docEl = _doc.documentElement, _body = _doc.body, gsap && (_toArray = gsap.utils.toArray, _clamp = gsap.utils.clamp, _context = gsap.core.context || _passThrough, _suppressOverwrites = gsap.core.suppressOverwrites || _passThrough, _scrollRestoration = _win.history.scrollRestoration || "auto", _lastScroll = _win.pageYOffset, gsap.core.globals("ScrollTrigger", e), _body)) {
                _enabled = 1, (_div100vh = document.createElement("div")).style.height = "100vh", _div100vh.style.position = "absolute", _refresh100vh(), _rafBugFix(), Observer.register(gsap), e.isTouch = Observer.isTouch, _fixIOSBug = Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), _ignoreMobileResize = 1 === Observer.isTouch, _addListener(_win, "wheel", _onScroll), _root = [_win, _doc, _docEl, _body], gsap.matchMedia ? (e.matchMedia = function (e) {
                    var r, t = gsap.matchMedia();
                    for (r in e) t.add(r, e[r]);
                    return t
                }, gsap.addEventListener("matchMediaInit", (function () {
                    return _revertAll()
                })), gsap.addEventListener("matchMediaRevert", (function () {
                    return _revertRecorded()
                })), gsap.addEventListener("matchMedia", (function () {
                    _refreshAll(0, 1), _dispatch("matchMedia");
                })), gsap.matchMedia("(orientation: portrait)", (function () {
                    return _setBaseDimensions(), _setBaseDimensions
                }))) : console.warn("Requires GSAP 3.11.0 or later"), _setBaseDimensions(), _addListener(_doc, "scroll", _onScroll);
                var r, t, i = _body.style,
                    n = i.borderTopStyle,
                    o = gsap.core.Animation.prototype;
                for (o.revert || Object.defineProperty(o, "revert", {
                    value: function () {
                        return this.time(-.01, !0)
                    }
                }), i.borderTopStyle = "solid", r = _getBounds(_body), _vertical.m = Math.round(r.top + _vertical.sc()) || 0, _horizontal.m = Math.round(r.left + _horizontal.sc()) || 0, n ? i.borderTopStyle = n : i.removeProperty("border-top-style"), _syncInterval = setInterval(_sync, 250), gsap.delayedCall(.5, (function () {
                    return _startup = 0
                })), _addListener(_doc, "touchcancel", _passThrough), _addListener(_body, "touchstart", _passThrough), _multiListener(_addListener, _doc, "pointerdown,touchstart,mousedown", _pointerDownHandler), _multiListener(_addListener, _doc, "pointerup,touchend,mouseup", _pointerUpHandler), _transformProp = gsap.utils.checkPrefix("transform"), _stateProps.push(_transformProp), _coreInitted = _getTime(), _resizeDelay = gsap.delayedCall(.2, _refreshAll).pause(), _autoRefresh = [_doc, "visibilitychange", function () {
                    var e = _win.innerWidth,
                        r = _win.innerHeight;
                    _doc.hidden ? (_prevWidth = e, _prevHeight = r) : _prevWidth === e && _prevHeight === r || _onResize();
                }, _doc, "DOMContentLoaded", _refreshAll, _win, "load", _refreshAll, _win, "resize", _onResize], _iterateAutoRefresh(_addListener), _triggers.forEach((function (e) {
                    return e.enable(0, 1)
                })), t = 0; t < _scrollers.length; t += 3) _wheelListener(_removeListener, _scrollers[t], _scrollers[t + 1]), _wheelListener(_removeListener, _scrollers[t], _scrollers[t + 2]);
            }
        }, e.config = function (r) {
            "limitCallbacks" in r && (_limitCallbacks = !!r.limitCallbacks);
            var t = r.syncInterval;
            t && clearInterval(_syncInterval) || (_syncInterval = t) && setInterval(_sync, t), "ignoreMobileResize" in r && (_ignoreMobileResize = 1 === e.isTouch && r.ignoreMobileResize), "autoRefreshEvents" in r && (_iterateAutoRefresh(_removeListener) || _iterateAutoRefresh(_addListener, r.autoRefreshEvents || "none"), _ignoreResize = -1 === (r.autoRefreshEvents + "").indexOf("resize"));
        }, e.scrollerProxy = function (e, r) {
            var t = _getTarget(e),
                i = _scrollers.indexOf(t),
                n = _isViewport(t);
            ~i && _scrollers.splice(i, n ? 6 : 2), r && (n ? _proxies.unshift(_win, r, _body, r, _docEl, r) : _proxies.unshift(t, r));
        }, e.clearMatchMedia = function (e) {
            _triggers.forEach((function (r) {
                return r._ctx && r._ctx.query === e && r._ctx.kill(!0, !0)
            }));
        }, e.isInViewport = function (e, r, t) {
            var i = (_isString(e) ? _getTarget(e) : e).getBoundingClientRect(),
                n = i[t ? _width : _height] * r || 0;
            return t ? i.right - n > 0 && i.left + n < _win.innerWidth : i.bottom - n > 0 && i.top + n < _win.innerHeight
        }, e.positionInViewport = function (e, r, t) {
            _isString(e) && (e = _getTarget(e));
            var i = e.getBoundingClientRect(),
                n = i[t ? _width : _height],
                o = null == r ? n / 2 : r in _keywords ? _keywords[r] * n : ~r.indexOf("%") ? parseFloat(r) * n / 100 : parseFloat(r) || 0;
            return t ? (i.left + o) / _win.innerWidth : (i.top + o) / _win.innerHeight
        }, e.killAll = function (e) {
            if (_triggers.slice(0).forEach((function (e) {
                return "ScrollSmoother" !== e.vars.id && e.kill()
            })), !0 !== e) {
                var r = _listeners.killAll || [];
                _listeners = {}, r.forEach((function (e) {
                    return e()
                }));
            }
        }, e
    }();
    ScrollTrigger.version = "3.12.5", ScrollTrigger.saveStyles = function (e) {
        return e ? _toArray(e).forEach((function (e) {
            if (e && e.style) {
                var r = _savedStyles.indexOf(e);
                r >= 0 && _savedStyles.splice(r, 5), _savedStyles.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), gsap.core.getCache(e), _context());
            }
        })) : _savedStyles
    }, ScrollTrigger.revert = function (e, r) {
        return _revertAll(!e, r)
    }, ScrollTrigger.create = function (e, r) {
        return new ScrollTrigger(e, r)
    }, ScrollTrigger.refresh = function (e) {
        return e ? _onResize() : (_coreInitted || ScrollTrigger.register()) && _refreshAll(!0)
    }, ScrollTrigger.update = function (e) {
        return ++_scrollers.cache && _updateAll(!0 === e ? 2 : 0)
    }, ScrollTrigger.clearScrollMemory = _clearScrollMemory, ScrollTrigger.maxScroll = function (e, r) {
        return _maxScroll(e, r ? _horizontal : _vertical)
    }, ScrollTrigger.getScrollFunc = function (e, r) {
        return _getScrollFunc(_getTarget(e), r ? _horizontal : _vertical)
    }, ScrollTrigger.getById = function (e) {
        return _ids[e]
    }, ScrollTrigger.getAll = function () {
        return _triggers.filter((function (e) {
            return "ScrollSmoother" !== e.vars.id
        }))
    }, ScrollTrigger.isScrolling = function () {
        return !!_lastScrollTime
    }, ScrollTrigger.snapDirectional = _snapDirectional, ScrollTrigger.addEventListener = function (e, r) {
        var t = _listeners[e] || (_listeners[e] = []);
        ~t.indexOf(r) || t.push(r);
    }, ScrollTrigger.removeEventListener = function (e, r) {
        var t = _listeners[e],
            i = t && t.indexOf(r);
        i >= 0 && t.splice(i, 1);
    }, ScrollTrigger.batch = function (e, r) {
        var t, i = [],
            n = {},
            o = r.interval || .016,
            s = r.batchMax || 1e9,
            a = function (e, r) {
                var t = [],
                    i = [],
                    n = gsap.delayedCall(o, (function () {
                        r(t, i), t = [], i = [];
                    })).pause();
                return function (e) {
                    t.length || n.restart(!0), t.push(e.trigger), i.push(e), s <= t.length && n.progress(1);
                }
            };
        for (t in r) n[t] = "on" === t.substr(0, 2) && _isFunction(r[t]) && "onRefreshInit" !== t ? a(0, r[t]) : r[t];
        return _isFunction(s) && (s = s(), _addListener(ScrollTrigger, "refresh", (function () {
            return s = r.batchMax()
        }))), _toArray(e).forEach((function (e) {
            var r = {};
            for (t in n) r[t] = n[t];
            r.trigger = e, i.push(ScrollTrigger.create(r));
        })), i
    };
    var _inputIsFocused, _clampScrollAndGetDurationMultiplier = function (e, r, t, i) {
        return r > i ? e(i) : r < 0 && e(0), t > i ? (i - r) / (t - r) : t < 0 ? r / (r - t) : 1
    },
        _allowNativePanning = function e(r, t) {
            !0 === t ? r.style.removeProperty("touch-action") : r.style.touchAction = !0 === t ? "auto" : t ? "pan-" + t + (Observer.isTouch ? " pinch-zoom" : "") : "none", r === _docEl && e(_body, t);
        },
        _overflow = {
            auto: 1,
            scroll: 1
        },
        _nestedScroll = function (e) {
            var r, t = e.event,
                i = e.target,
                n = e.axis,
                o = (t.changedTouches ? t.changedTouches[0] : t).target,
                s = o._gsap || gsap.core.getCache(o),
                a = _getTime();
            if (!s._isScrollT || a - s._isScrollT > 2e3) {
                for (; o && o !== _body && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !_overflow[(r = _getComputedStyle(o)).overflowY] && !_overflow[r.overflowX]);) o = o.parentNode;
                s._isScroll = o && o !== i && !_isViewport(o) && (_overflow[(r = _getComputedStyle(o)).overflowY] || _overflow[r.overflowX]), s._isScrollT = a;
            } (s._isScroll || "x" === n) && (t.stopPropagation(), t._gsapAllow = !0);
        },
        _inputObserver = function (e, r, t, i) {
            return Observer.create({
                target: e,
                capture: !0,
                debounce: !1,
                lockAxis: !0,
                type: r,
                onWheel: i = i && _nestedScroll,
                onPress: i,
                onDrag: i,
                onScroll: i,
                onEnable: function () {
                    return t && _addListener(_doc, Observer.eventTypes[0], _captureInputs, !1, !0)
                },
                onDisable: function () {
                    return _removeListener(_doc, Observer.eventTypes[0], _captureInputs, !0)
                }
            })
        },
        _inputExp = /(input|label|select|textarea)/i,
        _captureInputs = function (e) {
            var r = _inputExp.test(e.target.tagName);
            (r || _inputIsFocused) && (e._gsapAllow = !0, _inputIsFocused = r);
        },
        _getScrollNormalizer = function (e) {
            _isObject(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
            var r, t, i, n, o, s, a, l, _ = e,
                c = _.normalizeScrollX,
                u = _.momentum,
                p = _.allowNestedScroll,
                g = _.onRelease,
                d = _getTarget(e.target) || _docEl,
                f = gsap.core.globals().ScrollSmoother,
                h = f && f.get(),
                m = _fixIOSBug && (e.content && _getTarget(e.content) || h && !1 !== e.content && !h.smooth() && h.content()),
                v = _getScrollFunc(d, _vertical),
                y = _getScrollFunc(d, _horizontal),
                S = 1,
                b = (Observer.isTouch && _win.visualViewport ? _win.visualViewport.scale * _win.visualViewport.width : _win.outerWidth) / _win.innerWidth,
                w = 0,
                x = _isFunction(u) ? function () {
                    return u(r)
                } : function () {
                    return u || 2.8
                },
                T = _inputObserver(d, e.type, !0, p),
                A = function () {
                    return n = !1
                },
                k = _passThrough,
                P = _passThrough,
                C = function () {
                    t = _maxScroll(d, _vertical), P = _clamp(_fixIOSBug ? 1 : 0, t), c && (k = _clamp(0, _maxScroll(d, _horizontal))), i = _refreshID;
                },
                R = function () {
                    m._gsap.y = _round(parseFloat(m._gsap.y) + v.offset) + "px", m.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(m._gsap.y) + ", 0, 1)", v.offset = v.cacheID = 0;
                },
                O = function () {
                    C(), o.isActive() && o.vars.scrollY > t && (v() > t ? o.progress(1) && v(t) : o.resetTo("scrollY", t));
                };
            return m && gsap.set(m, {
                y: "+=0"
            }), e.ignoreCheck = function (e) {
                return _fixIOSBug && "touchmove" === e.type && function () {
                    if (n) {
                        requestAnimationFrame(A);
                        var e = _round(r.deltaY / 2),
                            t = P(v.v - e);
                        if (m && t !== v.v + v.offset) {
                            v.offset = t - v.v;
                            var i = _round((parseFloat(m && m._gsap.y) || 0) - v.offset);
                            m.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + i + ", 0, 1)", m._gsap.y = i + "px", v.cacheID = _scrollers.cache, _updateAll();
                        }
                        return !0
                    }
                    v.offset && R(), n = !0;
                }() || S > 1.05 && "touchstart" !== e.type || r.isGesturing || e.touches && e.touches.length > 1
            }, e.onPress = function () {
                n = !1;
                var e = S;
                S = _round((_win.visualViewport && _win.visualViewport.scale || 1) / b), o.pause(), e !== S && _allowNativePanning(d, S > 1.01 || !c && "x"), s = y(), a = v(), C(), i = _refreshID;
            }, e.onRelease = e.onGestureStart = function (e, r) {
                if (v.offset && R(), r) {
                    _scrollers.cache++;
                    var i, n, s = x();
                    c && (n = (i = y()) + .05 * s * -e.velocityX / .227, s *= _clampScrollAndGetDurationMultiplier(y, i, n, _maxScroll(d, _horizontal)), o.vars.scrollX = k(n)), n = (i = v()) + .05 * s * -e.velocityY / .227, s *= _clampScrollAndGetDurationMultiplier(v, i, n, _maxScroll(d, _vertical)), o.vars.scrollY = P(n), o.invalidate().duration(s).play(.01), (_fixIOSBug && o.vars.scrollY >= t || i >= t - 1) && gsap.to({}, {
                        onUpdate: O,
                        duration: s
                    });
                } else l.restart(!0);
                g && g(e);
            }, e.onWheel = function () {
                o._ts && o.pause(), _getTime() - w > 1e3 && (i = 0, w = _getTime());
            }, e.onChange = function (e, r, t, n, o) {
                if (_refreshID !== i && C(), r && c && y(k(n[2] === r ? s + (e.startX - e.x) : y() + r - n[1])), t) {
                    v.offset && R();
                    var l = o[2] === t,
                        _ = l ? a + e.startY - e.y : v() + t - o[1],
                        u = P(_);
                    l && _ !== u && (a += u - _), v(u);
                } (t || r) && _updateAll();
            }, e.onEnable = function () {
                _allowNativePanning(d, !c && "x"), ScrollTrigger.addEventListener("refresh", O), _addListener(_win, "resize", O), v.smooth && (v.target.style.scrollBehavior = "auto", v.smooth = y.smooth = !1), T.enable();
            }, e.onDisable = function () {
                _allowNativePanning(d, !0), _removeListener(_win, "resize", O), ScrollTrigger.removeEventListener("refresh", O), T.kill();
            }, e.lockAxis = !1 !== e.lockAxis, (r = new Observer(e)).iOS = _fixIOSBug, _fixIOSBug && !v() && v(1), _fixIOSBug && gsap.ticker.add(_passThrough), l = r._dc, o = gsap.to(r, {
                ease: "power4",
                paused: !0,
                inherit: !1,
                scrollX: c ? "+=0.1" : "+=0",
                scrollY: "+=0.1",
                modifiers: {
                    scrollY: _interruptionTracker(v, v(), (function () {
                        return o.pause()
                    }))
                },
                onUpdate: _updateAll,
                onComplete: l.vars.onComplete
            }), r
        };
    ScrollTrigger.sort = function (e) {
        return _triggers.sort(e || function (e, r) {
            return -1e6 * (e.vars.refreshPriority || 0) + e.start - (r.start + -1e6 * (r.vars.refreshPriority || 0))
        })
    }, ScrollTrigger.observe = function (e) {
        return new Observer(e)
    }, ScrollTrigger.normalizeScroll = function (e) {
        if (void 0 === e) return _normalizer;
        if (!0 === e && _normalizer) return _normalizer.enable();
        if (!1 === e) return _normalizer && _normalizer.kill(), void (_normalizer = e);
        var r = e instanceof Observer ? e : _getScrollNormalizer(e);
        return _normalizer && _normalizer.target === r.target && _normalizer.kill(), _isViewport(r.target) && (_normalizer = r), r
    }, ScrollTrigger.core = {
        _getVelocityProp: _getVelocityProp,
        _inputObserver: _inputObserver,
        _scrollers: _scrollers,
        _proxies: _proxies,
        bridge: {
            ss: function () {
                _lastScrollTime || _dispatch("scrollStart"), _lastScrollTime = _getTime();
            },
            ref: function () {
                return _refreshing
            }
        }
    }, _getGSAP() && gsap.registerPlugin(ScrollTrigger);

    gsapWithCSS.registerPlugin(ScrollTrigger);
    const {
        merge: merge
    } = window._, showcaseParallaxInit = () => {
        const {
            getData: r
        } = window.phoenix.utils, e = document.querySelectorAll("[data-gsap]"), o = document.querySelectorAll("[data-gsap-parallax]");
        o && Array.from(o).forEach((e => {
            const o = r(e, "gsap-parallax"),
                t = merge({
                    ease: "none",
                    scrollTrigger: {
                        trigger: e,
                        scrub: !0,
                        start: "top bottom",
                        toggleActions: "play none none reverse"
                    }
                }, o);
            gsapWithCSS.to(e, t);
        })), e && Array.from(e).forEach((e => {
            const o = r(e, "gsap");
            gsapWithCSS.to(e, {
                y: o,
                ease: "none",
                scrollTrigger: {
                    trigger: ".gsap",
                    scrub: !0,
                    start: "+=450 bottom",
                    toggleActions: "play none none reverse"
                }
            });
        })), gsapWithCSS.to(".feature-figma-img", {
            y: "-50%",
            scrollTrigger: {
                trigger: ".feature-figma-img",
                toggleActions: "play none none reverse",
                scrub: !0,
                start: "top bottom"
            }
        }), gsapWithCSS.to(".bg-gradient-figma", {
            y: "-90%",
            scrollTrigger: {
                trigger: ".bg-gradient-figma",
                toggleActions: "play none none reverse",
                scrub: !0,
                start: "top bottom",
                end: "top -20%"
            }
        });
    };

    const {
        docReady: docReady
    } = window.phoenix.utils;
    docReady(showcaseParallaxInit);

}));
//# sourceMappingURL=showcase.js.map