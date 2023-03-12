! function(e, a) {
    "object" == typeof exports && "object" == typeof module ? module.exports = a() : "function" == typeof define && define.amd ? define([], a) : "object" == typeof exports ? exports.DxfParser = a() : e.DxfParser = a()
}("undefined" != typeof self ? self : this, function() {
    return function(e) {
        var a = {};

        function t(r) {
            if (a[r]) return a[r].exports;
            var n = a[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(n.exports, n, n.exports, t), n.l = !0, n.exports
        }
        return t.m = e, t.c = a, t.d = function(e, a, r) {
            t.o(e, a) || Object.defineProperty(e, a, {
                enumerable: !0,
                get: r
            })
        }, t.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, t.t = function(e, a) {
            if (1 & a && (e = t(e)), 8 & a) return e;
            if (4 & a && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (t.r(r), Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & a && "string" != typeof e)
                for (var n in e) t.d(r, n, function(a) {
                    return e[a]
                }.bind(null, n));
            return r
        }, t.n = function(e) {
            var a = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return t.d(a, "a", a), a
        }, t.o = function(e, a) {
            return Object.prototype.hasOwnProperty.call(e, a)
        }, t.p = "", t(t.s = 1)
    }([function(e, a, t) {
        var r, n;
        ! function(o, c) {
            "use strict";
            void 0 === (n = "function" == typeof(r = function() {
                var e = function() {},
                    a = "undefined",
                    t = ["trace", "debug", "info", "warn", "error"];

                function r(e, a) {
                    var t = e[a];
                    if ("function" == typeof t.bind) return t.bind(e);
                    try {
                        return Function.prototype.bind.call(t, e)
                    } catch (a) {
                        return function() {
                            return Function.prototype.apply.apply(t, [e, arguments])
                        }
                    }
                }

                function n(a, r) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        this[o] = n < a ? e : this.methodFactory(o, a, r)
                    }
                    this.log = this.debug
                }

                function o(t, o, c) {
                    return function(t) {
                        "debug" === t && (t = "log");
                        return typeof console !== a && (void 0 !== console[t] ? r(console, t) : void 0 !== console.log ? r(console, "log") : e)
                    }(t) || function(e, t, r) {
                        return function() {
                            typeof console !== a && (n.call(this, t, r), this[e].apply(this, arguments))
                        }
                    }.apply(this, arguments)
                }

                function c(e, r, c) {
                    var i, u = this,
                        s = "loglevel";

                    function l() {
                        var e;
                        if (typeof window !== a) {
                            try {
                                e = window.localStorage[s]
                            } catch (e) {}
                            if (typeof e === a) try {
                                var t = window.document.cookie,
                                    r = t.indexOf(encodeURIComponent(s) + "="); - 1 !== r && (e = /^([^;]+)/.exec(t.slice(r))[1])
                            } catch (e) {}
                            return void 0 === u.levels[e] && (e = void 0), e
                        }
                    }
                    e && (s += ":" + e), u.name = e, u.levels = {
                        TRACE: 0,
                        DEBUG: 1,
                        INFO: 2,
                        WARN: 3,
                        ERROR: 4,
                        SILENT: 5
                    }, u.methodFactory = c || o, u.getLevel = function() {
                        return i
                    }, u.setLevel = function(r, o) {
                        if ("string" == typeof r && void 0 !== u.levels[r.toUpperCase()] && (r = u.levels[r.toUpperCase()]), !("number" == typeof r && r >= 0 && r <= u.levels.SILENT)) throw "log.setLevel() called with invalid level: " + r;
                        if (i = r, !1 !== o && function(e) {
                                var r = (t[e] || "silent").toUpperCase();
                                if (typeof window === a) return;
                                try {
                                    return void(window.localStorage[s] = r)
                                } catch (e) {}
                                try {
                                    window.document.cookie = encodeURIComponent(s) + "=" + r + ";"
                                } catch (e) {}
                            }(r), n.call(u, r, e), typeof console === a && r < u.levels.SILENT) return "No console available for logging"
                    }, u.setDefaultLevel = function(e) {
                        l() || u.setLevel(e, !1)
                    }, u.enableAll = function(e) {
                        u.setLevel(u.levels.TRACE, e)
                    }, u.disableAll = function(e) {
                        u.setLevel(u.levels.SILENT, e)
                    };
                    var v = l();
                    null == v && (v = null == r ? "WARN" : r), u.setLevel(v, !1)
                }
                var i = new c,
                    u = {};
                i.getLogger = function(e) {
                    if ("string" != typeof e || "" === e) throw new TypeError("You must supply a name when creating a logger.");
                    var a = u[e];
                    return a || (a = u[e] = new c(e, i.getLevel(), i.methodFactory)), a
                };
                var s = typeof window !== a ? window.log : void 0;
                return i.noConflict = function() {
                    return typeof window !== a && window.log === i && (window.log = s), i
                }, i.getLoggers = function() {
                    return u
                }, i
            }) ? r.call(a, t, a, e) : r) || (e.exports = n)
        }()
    }, function(e, a, t) {
        "use strict";

        function r(e) {
            this._pointer = 0, this._data = e, this._eof = !1
        }

        function n(e, a) {
            return e <= 9 ? a : e >= 10 && e <= 59 ? parseFloat(a) : e >= 60 && e <= 99 ? parseInt(a) : e >= 100 && e <= 109 ? a : e >= 110 && e <= 149 ? parseFloat(a) : e >= 160 && e <= 179 ? parseInt(a) : e >= 210 && e <= 239 ? parseFloat(a) : e >= 270 && e <= 289 ? parseInt(a) : e >= 290 && e <= 299 ? function(e) {
                if ("0" === e) return !1;
                if ("1" === e) return !0;
                throw TypeError("String '" + e + "' cannot be cast to Boolean type")
            }(a) : e >= 300 && e <= 369 ? a : e >= 370 && e <= 389 ? parseInt(a) : e >= 390 && e <= 399 ? a : e >= 400 && e <= 409 ? parseInt(a) : e >= 410 && e <= 419 ? a : e >= 420 && e <= 429 ? parseInt(a) : e >= 430 && e <= 439 ? a : e >= 440 && e <= 459 ? parseInt(a) : e >= 460 && e <= 469 ? parseFloat(a) : e >= 470 && e <= 481 ? a : 999 === e ? a : e >= 1e3 && e <= 1009 ? a : e >= 1010 && e <= 1059 ? parseFloat(a) : e >= 1060 && e <= 1071 ? parseInt(a) : (console.log("WARNING: Group code does not have a defined type: %j", {
                code: e,
                value: a
            }), a)
        }
        t.r(a), r.prototype.next = function() {
            var e;
            if (!this.hasNext()) throw this._eof ? new Error("Cannot call 'next' after EOF group has been read") : new Error("Unexpected end of input: EOF group not read before end of file. Ended on code " + this._data[this._pointer]);
            return e = {
                code: parseInt(this._data[this._pointer])
            }, this._pointer++, e.value = n(e.code, this._data[this._pointer].trim()), this._pointer++, 0 === e.code && "EOF" === e.value && (this._eof = !0), this.lastReadGroup = e, e
        }, r.prototype.peek = function() {
            if (!this.hasNext()) throw this._eof ? new Error("Cannot call 'next' after EOF group has been read") : new Error("Unexpected end of input: EOF group not read before end of file. Ended on code " + this._data[this._pointer]);
            var e = {
                code: parseInt(this._data[this._pointer])
            };
            return e.value = n(e.code, this._data[this._pointer + 1].trim()), e
        }, r.prototype.rewind = function(e) {
            e = e || 1, this._pointer = this._pointer - 2 * e
        }, r.prototype.hasNext = function() {
            return !this._eof && !(this._pointer > this._data.length - 2)
        }, r.prototype.isEOF = function() {
            return this._eof
        };
        var o = [0, 16711680, 16776960, 65280, 65535, 255, 16711935, 16777215, 8421504, 12632256, 16711680, 16744319, 13369344, 13395558, 10027008, 10046540, 8323072, 8339263, 4980736, 4990502, 16727808, 16752511, 13382400, 13401958, 10036736, 10051404, 8331008, 8343359, 4985600, 4992806, 16744192, 16760703, 13395456, 13408614, 10046464, 10056268, 8339200, 8347455, 4990464, 4995366, 16760576, 16768895, 13408512, 13415014, 10056192, 10061132, 8347392, 8351551, 4995328, 4997670, 16776960, 16777087, 13421568, 13421670, 10000384, 10000460, 8355584, 8355647, 5000192, 5000230, 12582656, 14679935, 10079232, 11717734, 7510016, 8755276, 6258432, 7307071, 3755008, 4344870, 8388352, 12582783, 6736896, 10079334, 5019648, 7510092, 4161280, 6258495, 2509824, 3755046, 4194048, 10485631, 3394560, 8375398, 2529280, 6264908, 2064128, 5209919, 1264640, 3099686, 65280, 8388479, 52224, 6736998, 38912, 5019724, 32512, 4161343, 19456, 2509862, 65343, 8388511, 52275, 6737023, 38950, 5019743, 32543, 4161359, 19475, 2509871, 65407, 8388543, 52326, 6737049, 38988, 5019762, 32575, 4161375, 19494, 2509881, 65471, 8388575, 52377, 6737074, 39026, 5019781, 32607, 4161391, 19513, 2509890, 65535, 8388607, 52428, 6737100, 39064, 5019800, 32639, 4161407, 19532, 2509900, 49151, 8380415, 39372, 6730444, 29336, 5014936, 24447, 4157311, 14668, 2507340, 32767, 8372223, 26316, 6724044, 19608, 5010072, 16255, 4153215, 9804, 2505036, 16383, 8364031, 13260, 6717388, 9880, 5005208, 8063, 4149119, 4940, 2502476, 255, 8355839, 204, 6710988, 152, 5000344, 127, 4145023, 76, 2500172, 4129023, 10452991, 3342540, 8349388, 2490520, 6245528, 2031743, 5193599, 1245260, 3089996, 8323327, 12550143, 6684876, 10053324, 4980888, 7490712, 4128895, 6242175, 2490444, 3745356, 12517631, 14647295, 10027212, 11691724, 7471256, 8735896, 6226047, 7290751, 3735628, 4335180, 16711935, 16744447, 13369548, 13395660, 9961624, 9981080, 8323199, 8339327, 4980812, 4990540, 16711871, 16744415, 13369497, 13395634, 9961586, 9981061, 8323167, 8339311, 4980793, 4990530, 16711807, 16744383, 13369446, 13395609, 9961548, 9981042, 8323135, 8339295, 4980774, 4990521, 16711743, 16744351, 13369395, 13395583, 9961510, 9981023, 8323103, 8339279, 4980755, 4990511, 3355443, 5987163, 8684676, 11382189, 14079702, 16777215];

        function c(e) {
            var a = {};
            e.rewind();
            var t = e.next(),
                r = t.code;
            if (a.x = t.value, r += 10, (t = e.next()).code != r) throw new Error("Expected code for point value to be " + r + " but got " + t.code + ".");
            return a.y = t.value, r += 10, (t = e.next()).code != r ? (e.rewind(), a) : (a.z = t.value, a)
        }

        function i(e, a) {
            switch (a.code) {
                case 0:
                    e.type = a.value;
                    break;
                case 5:
                    e.handle = a.value;
                    break;
                case 6:
                    e.lineType = a.value;
                    break;
                case 8:
                    e.layer = a.value;
                    break;
                case 48:
                    e.lineTypeScale = a.value;
                    break;
                case 60:
                    e.visible = 0 === a.value;
                    break;
                case 62:
                    e.colorIndex = a.value, e.color = (t = Math.abs(a.value), o[t]);
                    break;
                case 67:
                    e.inPaperSpace = 0 !== a.value;
                    break;
                case 100:
                    break;
                case 330:
                    e.ownerHandle = a.value;
                    break;
                case 347:
                    e.materialObjectHandle = a.value;
                    break;
                case 370:
                    e.lineweight = a.value;
                    break;
                case 420:
                    e.color = a.value;
                    break;
                case 1e3:
                    e.extendedData = e.extendedData || {}, e.extendedData.customStrings = e.extendedData.customStrings || [], e.extendedData.customStrings.push(a.value);
                    break;
                case 1001:
                    e.extendedData = e.extendedData || {}, e.extendedData.applicationName = a.value;
                    break;
                default:
                    return !1
            }
            var t;
            return !0
        }

        function u() {}

        function s(e, a) {
            var t, r = [],
                n = !1,
                o = !1;
            for (t = 0; t <= 4; t++) {
                for (var c = {};
                    "EOF" !== a && 0 !== a.code && !o;) {
                    switch (a.code) {
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                            if (n) {
                                o = !0;
                                continue
                            }
                            c.x = a.value, n = !0;
                            break;
                        case 20:
                        case 21:
                        case 22:
                        case 23:
                            c.y = a.value;
                            break;
                        case 30:
                        case 31:
                        case 32:
                        case 33:
                            c.z = a.value;
                            break;
                        default:
                            return r
                    }
                    a = e.next()
                }
                r.push(c), n = !1, o = !1
            }
            return e.rewind(), r
        }

        function l() {}

        function v() {}

        function d() {}

        function b() {}

        function p() {}

        function f() {}

        function k() {}

        function y() {}

        function x(e, a) {
            if (!e || e <= 0) throw Error("n must be greater than 0 verticies");
            var t, r = [],
                n = !1,
                o = !1,
                c = a.lastReadGroup;
            for (t = 0; t < e; t++) {
                for (var i = {};
                    "EOF" !== c && 0 !== c.code && !o;) {
                    switch (c.code) {
                        case 10:
                            if (n) {
                                o = !0;
                                continue
                            }
                            i.x = c.value, n = !0;
                            break;
                        case 20:
                            i.y = c.value;
                            break;
                        case 30:
                            i.z = c.value;
                            break;
                        case 91:
                            break;
                        case 40:
                            i.startWidth = c.value;
                            break;
                        case 41:
                            i.endWidth = c.value;
                            break;
                        case 42:
                            0 != c.value && (i.bulge = c.value);
                            break;
                        default:
                            return n && r.push(i), r
                    }
                    c = a.next()
                }
                r.push(i), n = !1, o = !1
            }
            return a.rewind(), r
        }

        function h() {}

        function g() {}

        function E() {}

        function w() {}

        function m(e, a) {
            var t = {
                type: a.value
            };
            for (a = e.next();
                "EOF" != a && 0 != a.code;) i(t, a), a = e.next();
            return t
        }

        function P() {}

        function F() {}

        function O() {}
        u.ForEntityName = "3DFACE", u.prototype.parseEntity = function(e, a) {
            var t = {
                type: a.value,
                vertices: []
            };
            for (a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 70:
                        t.shape = 1 == (1 & a.value), t.hasContinuousLinetypePattern = 128 == (128 & a.value);
                        break;
                    case 10:
                        t.vertices = s(e, a), a = e.lastReadGroup;
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t
        }, l.ForEntityName = "ARC", l.prototype.parseEntity = function(e, a) {
            var t;
            for (t = {
                    type: a.value
                }, a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 10:
                        t.center = c(e);
                        break;
                    case 40:
                        t.radius = a.value;
                        break;
                    case 50:
                        t.startAngle = Math.PI / 180 * a.value;
                        break;
                    case 51:
                        t.endAngle = Math.PI / 180 * a.value, t.angleLength = t.endAngle - t.startAngle;
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t
        }, v.ForEntityName = "ATTDEF", v.prototype.parseEntity = function(e, a) {
            var t = {
                type: a.value,
                scale: 1,
                textStyle: "STANDARD"
            };
            for (a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 1:
                        t.text = a.value;
                        break;
                    case 2:
                        t.tag = a.value;
                        break;
                    case 3:
                        t.prompt = a.value;
                        break;
                    case 7:
                        t.textStyle = a.value;
                        break;
                    case 10:
                        t.startPoint = c(e);
                        break;
                    case 11:
                        t.endPoint = c(e);
                        break;
                    case 39:
                        t.thickness = a.value;
                        break;
                    case 40:
                        t.textHeight = a.value;
                        break;
                    case 41:
                        t.scale = a.value;
                        break;
                    case 50:
                        t.rotation = a.value;
                        break;
                    case 51:
                        t.obliqueAngle = a.value;
                        break;
                    case 70:
                        t.invisible = !!(1 & a.value), t.constant = !!(2 & a.value), t.verificationRequired = !!(4 & a.value), t.preset = !!(8 & a.value);
                        break;
                    case 71:
                        t.backwards = !!(2 & a.value), t.mirrored = !!(4 & a.value);
                        break;
                    case 72:
                        t.horizontalJustification = a.value;
                        break;
                    case 73:
                        t.fieldLength = a.value;
                        break;
                    case 74:
                        t.verticalJustification = a.value;
                        break;
                    case 100:
                        break;
                    case 210:
                        t.extrusionDirectionX = a.value;
                        break;
                    case 220:
                        t.extrusionDirectionY = a.value;
                        break;
                    case 230:
                        t.extrusionDirectionZ = a.value;
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t
        }, d.ForEntityName = "CIRCLE", d.prototype.parseEntity = function(e, a) {
            var t, r;
            for (t = {
                    type: a.value
                }, a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 10:
                        t.center = c(e);
                        break;
                    case 40:
                        t.radius = a.value;
                        break;
                    case 50:
                        t.startAngle = Math.PI / 180 * a.value;
                        break;
                    case 51:
                        (r = Math.PI / 180 * a.value) < t.startAngle ? t.angleLength = r + 2 * Math.PI - t.startAngle : t.angleLength = r - t.startAngle, t.endAngle = r;
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t
        }, b.ForEntityName = "DIMENSION", b.prototype.parseEntity = function(e, a) {
            var t;
            for (t = {
                    type: a.value
                }, a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 2:
                        t.block = a.value;
                        break;
                    case 10:
                        t.anchorPoint = c(e);
                        break;
                    case 11:
                        t.middleOfText = c(e);
                        break;
                    case 12:
                        t.insertionPoint = c(e);
                        break;
                    case 13:
                        t.linearOrAngularPoint1 = c(e);
                        break;
                    case 14:
                        t.linearOrAngularPoint2 = c(e);
                        break;
                    case 15:
                        t.diameterOrRadiusPoint = c(e);
                        break;
                    case 16:
                        t.arcPoint = c(e);
                        break;
                    case 70:
                        t.dimensionType = a.value;
                        break;
                    case 71:
                        t.attachmentPoint = a.value;
                        break;
                    case 42:
                        t.actualMeasurement = a.value;
                        break;
                    case 1:
                        t.text = a.value;
                        break;
                    case 50:
                        t.angle = a.value;
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t
        }, p.ForEntityName = "ELLIPSE", p.prototype.parseEntity = function(e, a) {
            var t;
            for (t = {
                    type: a.value
                }, a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 10:
                        t.center = c(e);
                        break;
                    case 11:
                        t.majorAxisEndPoint = c(e);
                        break;
                    case 40:
                        t.axisRatio = a.value;
                        break;
                    case 41:
                        t.startAngle = a.value;
                        break;
                    case 42:
                        t.endAngle = a.value;
                        break;
                    case 2:
                        t.name = a.value;
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t
        }, f.ForEntityName = "INSERT", f.prototype.parseEntity = function(e, a) {
            var t;
            for (t = {
                    type: a.value
                }, a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 2:
                        t.name = a.value;
                        break;
                    case 41:
                        t.xScale = a.value;
                        break;
                    case 42:
                        t.yScale = a.value;
                        break;
                    case 43:
                        t.zScale = a.value;
                        break;
                    case 10:
                        t.position = c(e);
                        break;
                    case 50:
                        t.rotation = a.value;
                        break;
                    case 70:
                        t.columnCount = a.value;
                        break;
                    case 71:
                        t.rowCount = a.value;
                        break;
                    case 44:
                        t.columnSpacing = a.value;
                        break;
                    case 45:
                        t.rowSpacing = a.value;
                        break;
                    case 210:
                        t.extrusionDirection = c(e);
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t
        }, k.ForEntityName = "LINE", k.prototype.parseEntity = function(e, a) {
            var t = {
                type: a.value,
                vertices: []
            };
            for (a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 10:
                        t.vertices.unshift(c(e));
                        break;
                    case 11:
                        t.vertices.push(c(e));
                        break;
                    case 210:
                        t.extrusionDirection = c(e);
                        break;
                    case 100:
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t
        }, y.ForEntityName = "LWPOLYLINE", y.prototype.parseEntity = function(e, a) {
            var t = {
                    type: a.value,
                    vertices: []
                },
                r = 0;
            for (a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 38:
                        t.elevation = a.value;
                        break;
                    case 39:
                        t.depth = a.value;
                        break;
                    case 70:
                        t.shape = 1 == (1 & a.value), t.hasContinuousLinetypePattern = 128 == (128 & a.value);
                        break;
                    case 90:
                        r = a.value;
                        break;
                    case 10:
                        t.vertices = x(r, e);
                        break;
                    case 43:
                        0 !== a.value && (t.width = a.value);
                        break;
                    case 210:
                        t.extrusionDirectionX = a.value;
                        break;
                    case 220:
                        t.extrusionDirectionY = a.value;
                        break;
                    case 230:
                        t.extrusionDirectionZ = a.value;
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t
        }, h.ForEntityName = "MTEXT", h.prototype.parseEntity = function(e, a) {
            var t = {
                type: a.value
            };
            for (a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 3:
                    case 1:
                        t.text ? t.text += a.value : t.text = a.value;
                        break;
                    case 10:
                        t.position = c(e);
                        break;
                    case 40:
                        t.height = a.value;
                        break;
                    case 41:
                        t.width = a.value;
                        break;
                    case 50:
                        t.rotation = a.value;
                        break;
                    case 71:
                        t.attachmentPoint = a.value;
                        break;
                    case 72:
                        t.drawingDirection = a.value;
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t
        }, g.ForEntityName = "POINT", g.prototype.parseEntity = function(e, a) {
            var t;
            for (t = {
                    type: a.value
                }, a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 10:
                        t.position = c(e);
                        break;
                    case 39:
                        t.thickness = a.value;
                        break;
                    case 210:
                        t.extrusionDirection = c(e);
                        break;
                    case 100:
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t
        }, E.ForEntityName = "VERTEX", E.prototype.parseEntity = function(e, a) {
            var t = {
                type: a.value
            };
            for (a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 10:
                        t.x = a.value;
                        break;
                    case 20:
                        t.y = a.value;
                        break;
                    case 30:
                        t.z = a.value;
                        break;
                    case 40:
                    case 41:
                    case 42:
                        0 != a.value && (t.bulge = a.value);
                        break;
                    case 70:
                        t.curveFittingVertex = 0 != (1 & a.value), t.curveFitTangent = 0 != (2 & a.value), t.splineVertex = 0 != (8 & a.value), t.splineControlPoint = 0 != (16 & a.value), t.threeDPolylineVertex = 0 != (32 & a.value), t.threeDPolylineMesh = 0 != (64 & a.value), t.polyfaceMeshVertex = 0 != (128 & a.value);
                        break;
                    case 50:
                    case 71:
                        t.faceA = a.value;
                        break;
                    case 72:
                        t.faceB = a.value;
                        break;
                    case 73:
                        t.faceC = a.value;
                        break;
                    case 74:
                        t.faceD = a.value;
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t
        }, w.ForEntityName = "POLYLINE", w.prototype.parseEntity = function(e, a) {
            var t = {
                type: a.value,
                vertices: []
            };
            for (a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 10:
                    case 20:
                    case 30:
                    case 39:
                        t.thickness = a.value;
                        break;
                    case 40:
                    case 41:
                        break;
                    case 70:
                        t.shape = 0 != (1 & a.value), t.includesCurveFitVertices = 0 != (2 & a.value), t.includesSplineFitVertices = 0 != (4 & a.value), t.is3dPolyline = 0 != (8 & a.value), t.is3dPolygonMesh = 0 != (16 & a.value), t.is3dPolygonMeshClosed = 0 != (32 & a.value), t.isPolyfaceMesh = 0 != (64 & a.value), t.hasContinuousLinetypePattern = 0 != (128 & a.value);
                        break;
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                        break;
                    case 210:
                        t.extrusionDirection = c(e);
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t.vertices = function(e, a) {
                var t = new E,
                    r = [];
                for (; !e.isEOF();)
                    if (0 === a.code)
                        if ("VERTEX" === a.value) r.push(t.parseEntity(e, a)), a = e.lastReadGroup;
                        else if ("SEQEND" === a.value) {
                    m(e, a);
                    break
                }
                return r
            }(e, a), t
        }, P.ForEntityName = "SOLID", P.prototype.parseEntity = function(e, a) {
            var t;
            for ((t = {
                    type: a.value
                }).points = [], a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 10:
                        t.points[0] = c(e);
                        break;
                    case 11:
                        t.points[1] = c(e);
                        break;
                    case 12:
                        t.points[2] = c(e);
                        break;
                    case 13:
                        t.points[3] = c(e);
                        break;
                    case 210:
                        t.extrusionDirection = c(e);
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t
        }, F.ForEntityName = "SPLINE", F.prototype.parseEntity = function(e, a) {
            var t;
            for (t = {
                    type: a.value
                }, a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 10:
                        t.controlPoints || (t.controlPoints = []), t.controlPoints.push(c(e));
                        break;
                    case 11:
                        t.fitPoints || (t.fitPoints = []), t.fitPoints.push(c(e));
                        break;
                    case 12:
                        t.startTangent = c(e);
                        break;
                    case 13:
                        t.endTangent = c(e);
                        break;
                    case 40:
                        t.knotValues || (t.knotValues = []), t.knotValues.push(a.value);
                        break;
                    case 70:
                        0 != (1 & a.value) && (t.closed = !0), 0 != (2 & a.value) && (t.periodic = !0), 0 != (4 & a.value) && (t.rational = !0), 0 != (8 & a.value) && (t.planar = !0), 0 != (16 & a.value) && (t.planar = !0, t.linear = !0);
                        break;
                    case 71:
                        t.degreeOfSplineCurve = a.value;
                        break;
                    case 72:
                        t.numberOfKnots = a.value;
                        break;
                    case 73:
                        t.numberOfControlPoints = a.value;
                        break;
                    case 74:
                        t.numberOfFitPoints = a.value;
                        break;
                    case 210:
                        t.normalVector = c(e);
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t
        }, O.ForEntityName = "TEXT", O.prototype.parseEntity = function(e, a) {
            var t;
            for (t = {
                    type: a.value
                }, a = e.next();
                "EOF" !== a && 0 !== a.code;) {
                switch (a.code) {
                    case 10:
                        t.startPoint = c(e);
                        break;
                    case 11:
                        t.endPoint = c(e);
                        break;
                    case 40:
                        t.textHeight = a.value;
                        break;
                    case 41:
                        t.xScale = a.value;
                        break;
                    case 50:
                        t.rotation = a.value;
                        break;
                    case 1:
                        t.text = a.value;
                        break;
                    case 72:
                        t.halign = a.value;
                        break;
                    case 73:
                        t.valign = a.value;
                        break;
                    default:
                        i(t, a)
                }
                a = e.next()
            }
            return t
        };
        var N = t(0);

        function T() {
            var e;
            this._entityHandlers = {}, (e = this).registerEntityHandler(u), e.registerEntityHandler(l), e.registerEntityHandler(v), e.registerEntityHandler(d), e.registerEntityHandler(b), e.registerEntityHandler(p), e.registerEntityHandler(f), e.registerEntityHandler(k), e.registerEntityHandler(y), e.registerEntityHandler(h), e.registerEntityHandler(g), e.registerEntityHandler(w), e.registerEntityHandler(P), e.registerEntityHandler(F), e.registerEntityHandler(O)
        }

        function S(e) {
            N.debug("unhandled group " + L(e))
        }

        function L(e) {
            return e.code + ":" + e.value
        }
        N.setLevel("error"), T.prototype.parse = function(e, a) {
            throw new Error("read() not implemented. Use readSync()")
        }, T.prototype.registerEntityHandler = function(e) {
            var a = new e;
            this._entityHandlers[e.ForEntityName] = a
        }, T.prototype.parseSync = function(e) {
            return "string" == typeof e ? this._parse(e) : (console.error("Cannot read dxf source of type `" + typeof e), null)
        }, T.prototype.parseStream = function(e, a) {
            var t = "",
                r = this;
            e.on("data", function(e) {
                t += e
            }), e.on("end", function() {
                try {
                    var e = r._parse(t)
                } catch (e) {
                    return a(e)
                }
                a(null, e)
            }), e.on("error", function(e) {
                a(e)
            })
        }, T.prototype._parse = function(e) {
            var a, t, n = {},
                c = 0,
                i = e.split(/\r\n|\r|\n/g);
            if (!(a = new r(i)).hasNext()) throw Error("Empty file");
            var u = this,
                s = function(e, a) {
                    return t.code === e && t.value === a
                },
                l = function() {
                    var e = null,
                        r = null,
                        n = {};
                    for (t = a.next();;) {
                        if (s(0, "ENDSEC")) {
                            e && (n[e] = r);
                            break
                        }
                        9 === t.code ? (e && (n[e] = r), e = t.value) : 10 === t.code ? r = {
                            x: t.value
                        } : 20 === t.code ? r.y = t.value : 30 === t.code ? r.z = t.value : r = t.value, t = a.next()
                    }
                    return t = a.next(), n
                },
                v = function() {
                    var e, r = {};
                    for (t = a.next();
                        "EOF" !== t.value && !s(0, "ENDSEC");) s(0, "BLOCK") ? (N.debug("block {"), e = d(), N.debug("}"), x(e), e.name ? r[e.name] = e : N.error('block with handle "' + e.handle + '" is missing a name.')) : (S(t), t = a.next());
                    return r
                },
                d = function() {
                    var e = {};
                    for (t = a.next();
                        "EOF" !== t.value;) {
                        switch (t.code) {
                            case 1:
                                e.xrefPath = t.value, t = a.next();
                                break;
                            case 2:
                                e.name = t.value, t = a.next();
                                break;
                            case 3:
                                e.name2 = t.value, t = a.next();
                                break;
                            case 5:
                                e.handle = t.value, t = a.next();
                                break;
                            case 8:
                                e.layer = t.value, t = a.next();
                                break;
                            case 10:
                                e.position = y(), t = a.next();
                                break;
                            case 67:
                                e.paperSpace = !(!t.value || 1 != t.value), t = a.next();
                                break;
                            case 70:
                                0 != t.value && (e.type = t.value), t = a.next();
                                break;
                            case 100:
                                t = a.next();
                                break;
                            case 330:
                                e.ownerHandle = t.value, t = a.next();
                                break;
                            case 0:
                                if ("ENDBLK" == t.value) break;
                                e.entities = k(!0);
                                break;
                            default:
                                S(t), t = a.next()
                        }
                        if (s(0, "ENDBLK")) {
                            t = a.next();
                            break
                        }
                    }
                    return e
                },
                b = function() {
                    var e = {};
                    for (t = a.next();
                        "EOF" !== t.value && !s(0, "ENDSEC");) {
                        s(0, "TABLE") ? (t = a.next(), f[t.value] ? (N.debug(t.value + " Table {"), e[f[t.value].tableName] = p(), N.debug("}")) : N.debug("Unhandled Table " + t.value)) : t = a.next()
                    }
                    return t = a.next(), e
                };
            var p = function() {
                    var e, r = f[t.value],
                        n = {},
                        o = 0;
                    for (t = a.next(); !s(0, "ENDTAB");) switch (t.code) {
                        case 5:
                            n.handle = t.value, t = a.next();
                            break;
                        case 330:
                            n.ownerHandle = t.value, t = a.next();
                            break;
                        case 100:
                            "AcDbSymbolTable" === t.value ? t = a.next() : (S(t), t = a.next());
                            break;
                        case 70:
                            o = t.value, t = a.next();
                            break;
                        case 0:
                            t.value === r.dxfSymbolName ? n[r.tableRecordsProperty] = r.parseTableRecords() : (S(t), t = a.next());
                            break;
                        default:
                            S(t), t = a.next()
                    }
                    var c = n[r.tableRecordsProperty];
                    return c && (c.constructor === Array ? e = c.length : "object" == typeof c && (e = Object.keys(c).length), o !== e && N.warn("Parsed " + e + " " + r.dxfSymbolName + "'s but expected " + o)), t = a.next(), n
                },
                f = {
                    VPORT: {
                        tableRecordsProperty: "viewPorts",
                        tableName: "viewPort",
                        dxfSymbolName: "VPORT",
                        parseTableRecords: function() {
                            var e = [],
                                r = {};
                            for (N.debug("ViewPort {"), t = a.next(); !s(0, "ENDTAB");) switch (t.code) {
                                case 2:
                                    r.name = t.value, t = a.next();
                                    break;
                                case 10:
                                    r.lowerLeftCorner = y(), t = a.next();
                                    break;
                                case 11:
                                    r.upperRightCorner = y(), t = a.next();
                                    break;
                                case 12:
                                    r.center = y(), t = a.next();
                                    break;
                                case 13:
                                    r.snapBasePoint = y(), t = a.next();
                                    break;
                                case 14:
                                    r.snapSpacing = y(), t = a.next();
                                    break;
                                case 15:
                                    r.gridSpacing = y(), t = a.next();
                                    break;
                                case 16:
                                    r.viewDirectionFromTarget = y(), t = a.next();
                                    break;
                                case 17:
                                    r.viewTarget = y(), t = a.next();
                                    break;
                                case 42:
                                    r.lensLength = t.value, t = a.next();
                                    break;
                                case 43:
                                    r.frontClippingPlane = t.value, t = a.next();
                                    break;
                                case 44:
                                    r.backClippingPlane = t.value, t = a.next();
                                    break;
                                case 45:
                                    r.viewHeight = t.value, t = a.next();
                                    break;
                                case 50:
                                    r.snapRotationAngle = t.value, t = a.next();
                                    break;
                                case 51:
                                    r.viewTwistAngle = t.value, t = a.next();
                                    break;
                                case 79:
                                    r.orthographicType = t.value, t = a.next();
                                    break;
                                case 110:
                                    r.ucsOrigin = y(), t = a.next();
                                    break;
                                case 111:
                                    r.ucsXAxis = y(), t = a.next();
                                    break;
                                case 112:
                                    r.ucsYAxis = y(), t = a.next();
                                    break;
                                case 110:
                                    r.ucsOrigin = y(), t = a.next();
                                    break;
                                case 281:
                                    r.renderMode = t.value, t = a.next();
                                    break;
                                case 281:
                                    r.defaultLightingType = t.value, t = a.next();
                                    break;
                                case 292:
                                    r.defaultLightingOn = t.value, t = a.next();
                                    break;
                                case 330:
                                    r.ownerHandle = t.value, t = a.next();
                                    break;
                                case 63:
                                case 421:
                                case 431:
                                    r.ambientColor = t.value, t = a.next();
                                    break;
                                case 0:
                                    "VPORT" === t.value && (N.debug("}"), e.push(r), N.debug("ViewPort {"), r = {}, t = a.next());
                                    break;
                                default:
                                    S(t), t = a.next()
                            }
                            return N.debug("}"), e.push(r), e
                        }
                    },
                    LTYPE: {
                        tableRecordsProperty: "lineTypes",
                        tableName: "lineType",
                        dxfSymbolName: "LTYPE",
                        parseTableRecords: function() {
                            var e, r, n = {},
                                o = {};
                            for (N.debug("LType {"), t = a.next(); !s(0, "ENDTAB");) switch (t.code) {
                                case 2:
                                    o.name = t.value, e = t.value, t = a.next();
                                    break;
                                case 3:
                                    o.description = t.value, t = a.next();
                                    break;
                                case 73:
                                    (r = t.value) > 0 && (o.pattern = []), t = a.next();
                                    break;
                                case 40:
                                    o.patternLength = t.value, t = a.next();
                                    break;
                                case 49:
                                    o.pattern.push(t.value), t = a.next();
                                    break;
                                case 0:
                                    N.debug("}"), r > 0 && r !== o.pattern.length && N.warn("lengths do not match on LTYPE pattern"), n[e] = o, o = {}, N.debug("LType {"), t = a.next();
                                    break;
                                default:
                                    t = a.next()
                            }
                            return N.debug("}"), n[e] = o, n
                        }
                    },
                    LAYER: {
                        tableRecordsProperty: "layers",
                        tableName: "layer",
                        dxfSymbolName: "LAYER",
                        parseTableRecords: function() {
                            var e, r, n = {},
                                c = {};
                            for (N.debug("Layer {"), t = a.next(); !s(0, "ENDTAB");) switch (t.code) {
                                case 2:
                                    c.name = t.value, e = t.value, t = a.next();
                                    break;
                                case 62:
                                    c.visible = t.value >= 0, c.colorIndex = Math.abs(t.value), c.color = (r = c.colorIndex, o[r]), t = a.next();
                                    break;
                                case 70:
                                    c.frozen = 0 != (1 & t.value) || 0 != (2 & t.value), t = a.next();
                                    break;
                                case 0:
                                    "LAYER" === t.value && (N.debug("}"), n[e] = c, N.debug("Layer {"), c = {}, e = void 0, t = a.next());
                                    break;
                                default:
                                    S(t), t = a.next()
                            }
                            return N.debug("}"), n[e] = c, n
                        }
                    }
                },
                k = function(e) {
                    var r = [],
                        n = e ? "ENDBLK" : "ENDSEC";
                    for (e || (t = a.next());;)
                        if (0 === t.code) {
                            if (t.value === n) break;
                            var o, c = u._entityHandlers[t.value];
                            if (null == c) {
                                N.warn("Unhandled entity " + t.value), t = a.next();
                                continue
                            }
                            N.debug(t.value + " {"), o = c.parseEntity(a, t), t = a.lastReadGroup, N.debug("}"), x(o), r.push(o)
                        } else t = a.next();
                    return "ENDSEC" == n && (t = a.next()), r
                },
                y = function() {
                    var e = {},
                        r = t.code;
                    if (e.x = t.value, r += 10, (t = a.next()).code != r) throw new Error("Expected code for point value to be " + r + " but got " + t.code + ".");
                    return e.y = t.value, r += 10, (t = a.next()).code != r ? (a.rewind(), e) : (e.z = t.value, e)
                },
                x = function(e) {
                    if (!e) throw new TypeError("entity cannot be undefined or null");
                    e.handle || (e.handle = c++)
                };
            return function() {
                for (t = a.next(); !a.isEOF();)
                    if (0 === t.code && "SECTION" === t.value) {
                        if (2 !== (t = a.next()).code) {
                            console.error("Unexpected code %s after 0:SECTION", L(t)), t = a.next();
                            continue
                        }
                        "HEADER" === t.value ? (N.debug("> HEADER"), n.header = l(), N.debug("<")) : "BLOCKS" === t.value ? (N.debug("> BLOCKS"), n.blocks = v(), N.debug("<")) : "ENTITIES" === t.value ? (N.debug("> ENTITIES"), n.entities = k(!1), N.debug("<")) : "TABLES" === t.value ? (N.debug("> TABLES"), n.tables = b(), N.debug("<")) : "EOF" === t.value ? N.debug("EOF") : N.warn("Skipping section '%s'", t.value)
                    } else t = a.next()
            }(), n
        };
        a.default = T
    }]).default
});