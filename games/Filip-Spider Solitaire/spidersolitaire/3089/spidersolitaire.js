!function i(s, o, c) {
    function u(t, e) {
        if (!o[t]) {
            if (!s[t]) {
                var n = "function" == typeof require && require;
                if (!e && n)
                    return n(t, !0);
                if (d)
                    return d(t, !0);
                var a = new Error("Cannot find module '" + t + "'");
                throw a.code = "MODULE_NOT_FOUND",
                a
            }
            var r = o[t] = {
                exports: {}
            };
            s[t][0].call(r.exports, function(e) {
                return u(s[t][1][e] || e)
            }, r, r.exports, i, s, o, c)
        }
        return o[t].exports
    }
    for (var d = "function" == typeof require && require, e = 0; e < c.length; e++)
        u(c[e]);
    return u
}({
    1: [function(e, t, n) {
        "use strict";
        var i = e("./helper-functions").captainsLog
          , o = function(t, e, n, a, r) {
            "undefined" != typeof APP_MODE && APP_MODE && (t = "https://cardgames.io" + t),
            n = n || function() {
                i.debug("Successfully posted to this url: " + t + " with this data : " + JSON.stringify(e))
            }
            ,
            a = a || function(e) {
                console.log("ERROR for urL " + t),
                i.error("ERROR: " + JSON.stringify(e))
            }
            ,
            $.ajax({
                type: "POST",
                url: t,
                headers: r || {},
                data: JSON.stringify(e),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: n,
                error: a
            })
        }
          , s = function(e, t, n) {
            if ("undefined" != typeof APP_MODE && APP_MODE && (e = "https://cardgames.io" + e),
            !t)
                throw new TypeError("Success handler missing");
            return n = n || function(e) {
                i.error(JSON.stringify(e))
            }
            ,
            $.ajax({
                type: "GET",
                url: e,
                success: t,
                error: n
            })
        }
          , a = {
            avatars: {
                getStats: function(e, t) {
                    return s("/api/avatars/", e, t)
                },
                getLatest: function(e, t) {
                    return s("/api/avatars/latest", e, t)
                },
                saveFace: function(e, t, n) {
                    var a = {
                        code: e,
                        userAgent: navigator.userAgent
                    };
                    o("/api/avatars/", a, t, n)
                }
            },
            adfree: {
                getCode: function(e, t, n) {
                    return s("/api/adfree/" + e, t, n)
                },
                activateCode: function(e, t, n) {
                    return o("/api/adfree/" + e + "/activate", {
                        code: e
                    }, t, n)
                }
            },
            gdpr: {
                accept: function(e, t, n, a) {
                    return o("/api/gdpr/accept", {
                        allowPersonalizedAds: e,
                        userAgent: t
                    }, n, a)
                }
            },
            country: {
                get: function(e, t) {
                    return s("http://cardgames.io/lambda/country/", e, t)
                }
            },
            errors: {
                getLatest: function(e, t) {
                    return s("/api/errors/latest", e, t)
                },
                getByName: function(e, t, n) {
                    return s("/api/errors/" + e, t, n)
                },
                log: function(e, t, n, a, r, i) {
                    void 0 === i && (i = 0);
                    var s = {
                        name: e,
                        slug: t,
                        errorMessage: n,
                        url: "https://cardgames.io/spidersolitaire/",
                        userAgent: navigator.userAgent,
                        maxMailCount: i
                    };
                    o("/api/errors", s, a, r)
                }
            },
            badDomain: function() {
                $.ajax({
                    url: "https://cardgames.io/api/errors/baddomain/?domain=" + location.hostname + "&href=" + encodeURIComponent("https://cardgames.io/spidersolitaire/"),
                    dataType: "jsonp",
                    jsonpCallback: "nothing"
                })
            },
            events: {
                post: function(e, t, n) {
                    o("/api/events/", e, t, n)
                }
            },
            numberedGames: {
                win: function(e, t, n, a, r) {
                    return n = n.replace(/ /g, "-"),
                    o("http://cardgames.io/spidersolitaire/api/" + t + "/" + n + "/numberedgames/" + e + "/win", a, r)
                },
                postSaveResult: function(e, t, n, a, r, i) {
                    return a = a.replace(/ /g, "-"),
                    o("http://cardgames.io/spidersolitaire/api/" + n + "/" + a + "/numberedgames/" + t + "/saveresult", e, r, i)
                },
                start: function(e, t, n, a, r) {
                    return n = n.replace(/ /g, "-"),
                    o("http://cardgames.io/spidersolitaire/api/" + t + "/" + n + "/numberedgames/" + e + "/start", a, r)
                },
                getGame: function(e, t, n, a, r) {
                    return n = n.replace(/ /g, "-"),
                    s("http://cardgames.io/spidersolitaire/api/" + t + "/" + n + "/numberedgames/3842/?domain=" + encodeURIComponent("https://cardgames.io/spidersolitaire/"), a, r)
                },
                getStats: function(e, t, n, a) {
                    return t = t.replace(/ /g, "-"),
                    s("http://cardgames.io/spidersolitaire/api/" + e + "/" + t + "//numberedgames/stats", n, a)
                }
            },
            visitors: {
                post: function(e, t, n) {
                    return o("/api/visitors", e, t, n)
                }
            },
            badWords: {
                get: function(e, t) {
                    return s("/api/badwords", e, t)
                }
            }
        };
        t.exports = a
    }
    , {
        "./helper-functions": 6
    }],
    2: [function(e, t, n) {
        "use strict";
        var a = function() {
            function e(e, t) {
                if (this.playable = !1,
                this.shortName = e + t,
                this.suit = e,
                this.rank = t,
                "bj" == e)
                    return this.longName = "black joker",
                    void (this.shortName = "BJ");
                if ("rj" == e)
                    return this.longName = "red joker",
                    void (this.shortName = "RJ");
                this.red = "h" == e || "d" == e,
                this.black = "s" == e || "c" == e;
                var n = {
                    h: "heart",
                    s: "spade",
                    d: "diamond",
                    c: "club"
                }
                  , a = {
                    11: "jack",
                    12: "queen",
                    13: "king",
                    1: "ace",
                    14: "ace"
                };
                this.suitName = n[this.suit],
                a[t] ? (this.longName = a[t] + " of " + n[e] + "s",
                this[a[t]] = !0) : this.longName = t + " of " + n[e] + "s",
                this.shortName = this.suit.toUpperCase() + this.rank,
                this.isSpade = "s" === e,
                this.isHeart = "h" === e,
                this.isDiamond = "d" === e,
                this.isClub = "c" === e,
                this.isJack = 11 === t,
                this.isQueen = 12 === t,
                this.isKing = 13 === t,
                this.isAce = 1 === t || 14 === t
            }
            var t = e.prototype;
            return t.toString = function() {
                return this.shortName
            }
            ,
            t.rankName = function() {
                return [null, null, "a two", "a three", "a four", "a five", "a six", "a seven", "an eight", "a nine", "a ten", "a jack", "a queen", "a king", "an ace"][this.rank]
            }
            ,
            t.shortRankName = function() {
                return [null, null, "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace"][this.rank]
            }
            ,
            t.symbol = function() {
                return {
                    h: "♥︎",
                    s: "♠︎",
                    d: "♦︎",
                    c: "♣︎"
                }[this.suit] + ({
                    1: "A",
                    11: "J",
                    12: "Q",
                    13: "K",
                    14: "A"
                }[this.rank] || this.rank)
            }
            ,
            e
        }();
        t.exports = a
    }
    , {}],
    3: [function(e, t, n) {
        "use strict";
        t.exports = {
            HEARTS: "h",
            SPADES: "s",
            DIAMONDS: "d",
            CLUBS: "c",
            JACK: 11,
            QUEEN: 12,
            KING: 13,
            ACE_LOW: 1,
            ACE_HIGH: 14
        }
    }
    , {}],
    4: [function(e, t, n) {
        "use strict";
        var a, c = e("./util"), r = e("./helper-functions"), o = r.captainsLog, u = r._setTimeout, i = r._setInterval, d = (r.ArrayUtils,
        c.settings), l = e("./gamecontrol"), h = e("./temp-storage"), s = {
            h: "&hearts;",
            s: "&spades;",
            d: "&diams;",
            c: "&clubs;"
        };
        function m() {
            a && (window.requestAnimationFrame(m),
            $.fx.tick())
        }
        window.requestAnimationFrame && (c.qs.gid ? o.debug("Multiplayer game, not using requestAnimationFrame") : ($.fx.timer = function(e) {
            e() && jQuery.timers.push(e) && !a && (a = !0,
            m())
        }
        ,
        $.fx.stop = function() {
            a = !1
        }
        ));
        var f = navigator.userAgent.match(/Android (4|5|6|7|8|9)/) && navigator.userAgent.match(/ SM-|samsung/g);
        c.qs.android && (f = !0),
        f && (s = {
            h: "&#x2661;",
            s: "&#x2664;",
            d: "&#x2662;",
            c: "&#x2667;"
        });
        var p, g = (p = 1,
        {
            get: function() {
                return p
            },
            set: function(e) {
                "string" == typeof e && (e = {
                    verySlow: .5,
                    slow: .8,
                    normal: 1,
                    fast: 1.5,
                    veryFast: 2.2
                }[e]),
                p = e,
                $.fx.speeds._default = v(400),
                $.fx.speeds.fast = v(200),
                $.fx.speeds.slow = v(600),
                1 != p && (w("animate", 1),
                w("fadeOut", 0),
                w("fadeIn", 0),
                u.speed = p,
                i.speed = p)
            },
            toString: function() {
                return "SPEED: " + p
            },
            ms: v
        });
        function v(e) {
            return e / p
        }
        function w(e, n) {
            var a = $.fn[e];
            $.fn[e] = function() {
                var e = Array.prototype.slice.call(arguments)
                  , t = e[n];
                return "number" == typeof t ? e[n] = v(t) : t && t.duration && (t.duration = v(t.duration)),
                a.apply(this, e)
            }
        }
        function b(e) {
            $("#" + e + " div").addClass("sad")
        }
        function y(e) {
            $("#" + e + " div").removeClass("sad")
        }
        d.speed && "normal" !== d.speed && g.set(d.speed),
        c.cake("scroll") && (window.scroll(0, parseInt(c.cake("scroll"))),
        c.deleteCake("scroll")),
        document.referrer && document.referrer.length && (document.referrer.match(/^https:\/\/cardgames\.io\//) || document.referrer.match(/127\.0\.0\.1/) || c.trackEvent("Referral", document.referrer));
        var C, k, S, T = (C = "",
        k = {},
        S = 0,
        $(document).on("keypress", function(e) {
            var t = (new Date).getTime();
            2e3 < t - S && (C = ""),
            S = t;
            var n = String.fromCharCode(e.which);
            for (var a in C += n,
            k) {
                if (a == C)
                    return k[a](),
                    void (C = "");
                if (a.substr(0, C.length) == C)
                    return
            }
            for (var r in k)
                if (r.substr(0, 1) == n)
                    return void (C = n);
            C = ""
        }),
        function(e, t) {
            k[e] = t
        }
        );
        function A(e) {
            void 0 === e && (e = "");
            var n = e.split(",")
              , t = o.messages.filter(function(t) {
                return n.some(function(e) {
                    return -1 !== t.toLowerCase().indexOf(e.trim().toLowerCase())
                })
            });
            0 === t.length ? $("#matrix textarea").val("Sorry, no log lines found for term: " + e) : $("#matrix textarea").val(t.join("\n"))
        }
        window.players && window.players.top && "2" === window.players.top.code && $("body").addClass("default-top-player"),
        T("matrix", function() {
            $("body").toggleClass("matrix");
            var e = $("#matrix textarea");
            $("body").hasClass("matrix") && (A(),
            e.scrollTop(e[0].scrollHeight),
            setTimeout(function() {
                $("#matrix input").val("").focus()
            }, 200))
        }),
        $("#matrix-log-filter").on("input", function(e) {
            var t = $("#matrix-log-filter").val().trim().toLowerCase()
              , n = $("#matrix textarea");
            t.match(/^(:q|quit|exit|matrix)$/) ? $("body").removeClass("matrix") : t.match(/fuck/) ? n.val("We're not that kind of site!") : "help" === t ? n.val("What do you need help with?") : "who are you" === t ? n.val("My name is Skynet.") : "skynet" === t ? n.val("Welcome to Cyberdyne systems.") : "shutdown" === t ? n.val("Shutting site down in 5 seconds...") : "cheat" === t ? n.val("Nice try!") : A(t.trim())
        }),
        c.browser.supportsSvg || function(e) {
            if (e) {
                var t = "../";
                return "/" === document.location.pathname && (t = ""),
                $("#firefox-Logo").attr("src", t + "shared/images/Icon_Mozilla.png"),
                $("#Chrome-Logo").attr("src", t + "shared/images/Icon_Chrome.png"),
                $("#oldbrowser").show()
            }
            $("#oldbrowser").hide()
        }(!0),
        void 0 !== n && (t.exports = {
            loadPlayerFace: function(e, t, n) {
                var a = c.getFaceUrl(e, !1)
                  , r = c.getFaceUrl(e, !0)
                  , i = c.getHairClass(e);
                c.createFaceStyleElement(t.substr(1), a, r);
                var s = $(t + " .face-small")
                  , o = s.get(0).className.match(/hair-\w+/);
                o && (o = o[0],
                s.data("original-hair") || s.data("original-hair", o),
                s.removeClass(o)),
                s.addClass(i),
                s.data("current-hair", i),
                $(t + " small").text(n),
                $(t + " .face-small").css("margin", "auto"),
                $(t).css("margin-left", "-" + $(t).width() / 2 + "px")
            },
            addCheat: T,
            makePlayersSad: function(e) {
                for (var t = ["top-player", "bottom-player", "left-player", "right-player"], n = 0; n < t.length; n++)
                    -1 == e.indexOf(t[n]) ? b(t[n]) : y(t[n])
            },
            makePlayerSad: b,
            makePlayerHappy: y,
            makeAllPlayersHappy: function() {
                $(".avatar div").removeClass("sad")
            },
            SPEED: g,
            HTML_CARD_SUITS: s
        })
    }
    , {
        "./gamecontrol": 5,
        "./helper-functions": 6,
        "./temp-storage": 13,
        "./util": 14
    }],
    5: [function(e, t, n) {
        "use strict";
        var a = "notstarted"
          , r = null;
        t.exports = {
            isGameNotStarted: function() {
                return "notstarted" === a
            },
            isGameStarted: function() {
                return "started" === a
            },
            isGameFinished: function() {
                return "finished" === a
            },
            isStuck: function() {
                return "stuck" === a
            },
            startGame: function() {
                a = "started"
            },
            finishGame: function() {
                a = "finished"
            },
            stuck: function() {
                a = "stuck"
            },
            resetGameStatus: function() {
                a = "notstarted"
            },
            addRestartHandler: function(e) {
                r = e
            },
            canRestart: function() {
                return null !== r
            },
            restart: function() {
                if (null === r)
                    throw new Error('No restart handler has been registered. Check "canRestart()" before calling this function');
                r()
            }
        }
    }
    , {}],
    6: [function(e, t, n) {
        "use strict";
        var s = {
            x: -1,
            m: Math.pow(2, 32),
            a: 1664525,
            b: 1013904223,
            init: function(e) {
                void 0 === e && (e = -1),
                this.x = -1 == e ? Math.floor(Math.random() * this.m) : e
            },
            next: function() {
                return -1 == this.x && this.init(),
                this.x = (this.a * this.x + this.b) % this.m,
                this.x / (this.m - 1)
            }
        }
          , a = {
            shuffle: function(e, t) {
                void 0 === t && (t = -1);
                var n = e.length;
                if (0 !== n)
                    for (s.init(t); --n; ) {
                        var a = Math.floor(s.next() * (n + 1))
                          , r = e[n]
                          , i = e[a];
                        e[n] = i,
                        e[a] = r
                    }
            },
            remove: function(e, t) {
                var n = e.indexOf(t);
                return -1 !== n && (e.splice(n, 1),
                !0)
            },
            random: function(e) {
                return e[Math.floor(Math.random() * e.length)]
            }
        };
        var r = {
            info: function(e) {
                this.messages.push("INFO: " + e),
                this.level.match(/info|verbose|debug/) && (console.info ? console.info(e) : console.log("INFO: " + e))
            },
            messages: [],
            error: function(e) {
                this.messages.push("ERROR: " + e),
                console.error ? console.error(e) : console.log("ERROR: " + e)
            },
            debug: function(e) {
                this.messages.push("DEBUG: " + e),
                "debug" == this.level && (console.debug ? console.debug(e) : console.log("DEBUG: " + e))
            },
            warn: function(e) {
                this.messages.push("WARN: " + e),
                this.level.match(/info|verbose|warn|debug/) && (console.warn ? console.warn(e) : console.log("WARN: " + e))
            },
            toString: function() {
                return "gott log "
            },
            level: "info"
        };
        function i(e, t) {
            return 1 !== i.speed && (t = Math.floor(t / i.speed)),
            setTimeout(e, t)
        }
        function o(e, t) {
            return 1 !== o.speed && (t = Math.floor(t / o.speed)),
            setInterval(e, t)
        }
        o.speed = i.speed = 1,
        void 0 !== n && (t.exports = {
            captainsLog: r,
            dataBind: function(e, s) {
                return e.replace(/@(\w+(\.\w+)*)/g, function(e, t) {
                    for (var n, a = t.split("."), r = s, i = 0; i < a.length; i++) {
                        if (n = a[i],
                        void 0 === r)
                            return "<undefined>";
                        if (null === r || null === r[n])
                            return "<null>";
                        if (void 0 === r[n])
                            return "<undefined>";
                        r = r[n]
                    }
                    return "" + r
                })
            },
            _setTimeout: i,
            _setInterval: o,
            randomInt: function(e, t) {
                return Math.floor(Math.random() * (t - e + 1)) + e
            },
            ArrayUtils: a,
            addDelaysToFunctions: function(e, t) {
                function n(e, t, n) {
                    var a = e[t];
                    if (!a)
                        throw new Error("Unrecognized func name: " + t);
                    e[t] = function() {
                        var e = this
                          , t = arguments;
                        i(function() {
                            a.apply(e, t)
                        }, n)
                    }
                }
                for (var a in t) {
                    n(e, a, t[a])
                }
            },
            cson: function(e) {
                return "undefined" == typeof JSON ? "JSON Not Available" : JSON.stringify(function e(t) {
                    var n = Object.prototype.toString;
                    if ("undefined" == typeof JSON)
                        return "JSON Not Available";
                    if (null == t)
                        return t;
                    if (t.name || t.shortName)
                        return t.name || t.shortName;
                    if ("[object Array]" == n.call(t)) {
                        for (var a = [], r = 0; r < t.length; r++)
                            a.push(e(t[r]));
                        return a
                    }
                    if ("[object Object]" != n.call(t))
                        return t;
                    var i = {};
                    for (var s in t)
                        i[s] = e(t[s]);
                    return i
                }(e), null, 2).replace(/\s*"([HSDC]\d\d?)"\s*(\]|,)/gm, "$1$2").replace(/"([HSDC]\d\d?)"/gm, "$1")
            },
            combinations: function(e, r) {
                return function e(t, n, a) {
                    if (0 !== t.length || 0 !== n.length)
                        return 0 === n.length ? r ? t.length >= r && a.push(t) : a.push(t) : (e(t.concat(n[0]), n.slice(1, n.length), a),
                        e(t, n.slice(1, n.length), a)),
                        a
                }([], e, [])
            }
        })
    }
    , {}],
    7: [function(e, t, n) {
        "use strict";
        t.exports = {
            slug: slug,
            category: category,
            siteVersion: siteVersion,
            showAds: showAds,
            customChannelId: customChannelId,
            defaultSettings: defaultSettings,
            defaultSiteSettings: defaultSiteSettings,
            players: players
        }
    }
    , {}],
    8: [function(e, t, n) {
        "use strict";
        function i(e, t) {
            e.prototype = Object.create(t.prototype),
            (e.prototype.constructor = e).__proto__ = t
        }
        var a = function() {
            function e(e, t, n) {
                this.cards = [],
                this.element = this.createElement(),
                $(this.element).addClass(n).addClass("cell").appendTo("#play-page"),
                this.moveTo(e, t)
            }
            var t = e.prototype;
            return t.moveTo = function(e, t) {
                e = Math.round(e),
                t = Math.round(t),
                this.pos = {
                    top: e,
                    left: t
                },
                $(this.element).css({
                    top: e,
                    left: t
                })
            }
            ,
            t.toString = function() {
                return this.id
            }
            ,
            t.clear = function() {
                var e = this.cards
                  , t = Array.isArray(e)
                  , n = 0;
                for (e = t ? e : e[Symbol.iterator](); ; ) {
                    var a;
                    if (t) {
                        if (n >= e.length)
                            break;
                        a = e[n++]
                    } else {
                        if ((n = e.next()).done)
                            break;
                        a = n.value
                    }
                    a.container = null
                }
                this.cards.splice(0, this.cards.length)
            }
            ,
            t.isEmpty = function() {
                return 0 === this.cards.length
            }
            ,
            t.createElement = function() {
                return document.createElement("div")
            }
            ,
            t.canDropCards = function() {
                return !1
            }
            ,
            t.canDragCard = function(e) {
                return e == this.topCard()
            }
            ,
            t.canFlipCard = function(e) {
                return e == this.topCard() && !e.faceUp
            }
            ,
            t.getClickCards = function(e){
                return this.cards.slice(this.cards.indexOf(e))
            }
            ,
            t.getDragCards = function(e) {
                return this.cards.slice(this.cards.indexOf(e))
            }
            ,
            t.remove = function(e) {
                var t = this.cards.indexOf(e);
                0 <= t && this.cards.splice(t, 1)
            }
            ,
            t.addCards = function(e) {
                var t = e
                  , n = Array.isArray(t)
                  , a = 0;
                for (t = n ? t : t[Symbol.iterator](); ; ) {
                    var r;
                    if (n) {
                        if (a >= t.length)
                            break;
                        r = t[a++]
                    } else {
                        if ((a = t.next()).done)
                            break;
                        r = a.value
                    }
                    var i = r;
                    i.container && i.container.remove(i),
                    this.cards.push(i),
                    i.container = this
                }
            }
            ,
            t.last = function() {
                return 0 === this.cards.length ? null : this.cards[this.cards.length - 1]
            }
            ,
            t.calculatePositions = function(e) {
                for (var t = this.pos, n = t.top, a = t.left, r = 0; r < this.cards.length; r++) {
                    var i = this.cards[r];
                    i.top = n,
                    i.left = a,
                    this.alwaysFaceUp ? i.faceUp = !0 : this.alwaysFaceDown && (i.faceUp = !1),
                    (r + 1) % e.condenseCount == 0 && (a += e.condenseSpace,
                    n -= e.condenseSpace)
                }
            }
            ,
            t.getDropTarget = function() {
                return 0 === this.cards.length ? this.element : this.topCard().guiCard
            }
            ,
            t.topCard = function() {
                return 0 === this.cards.length ? null : this.cards[this.cards.length - 1]
            }
            ,
            e
        }()
          , r = function(r) {
            function e(e, t, n) {
                var a;
                return (a = r.call(this, e, t, "tableau") || this).acceptAnyStartCard = !!n,
                a
            }
            i(e, r);
            var t = e.prototype;
            return t.canDropCards = function(e) {
                if (0 === this.cards.length)
                    return !!this.acceptAnyStartCard || 13 == e[0].rank;
                if (this.topCard().faceUp) {
                    var t = e[0]
                      , n = this.topCard();
                    return t.rank === n.rank - 1 && (t.red && n.black || t.black && n.red)
                }
                return !1
            }
            ,
            t.isFullyOrdered = function() {
                return 0 === this.cards.length || this.isOrderedFromCard(this.cards[0])
            }
            ,
            t.isOrderedFromCard = function(e) {
                var t = this.cards.indexOf(e);
                if (-1 === t)
                    throw alert(this.cards.toString()),
                    "Card " + e + " did not belong to Tableau";
                if (!e.faceUp)
                    return !1;
                for (var n = t + 1; n < this.cards.length; n++) {
                    var a = this.cards[n]
                      , r = this.cards[n - 1];
                    if (a.red && r.red || a.black && r.black)
                        return !1;
                    if (a.rank !== r.rank - 1)
                        return !1
                }
                return !0
            }
            ,
            t.canDragCard = function(e) {
                return this.isOrderedFromCard(e)
            }
            ,
            t.calculatePositions = function(e) {
                for (var t = 0; t < this.cards.length; t++) {
                    var n = this.cards[t];
                    n.left = this.pos.left,
                    n.top = this.pos.top + t * e.tableauCardMarginTop
                }
            }
            ,
            e
        }(a)
          , s = function(r) {
            function e(e, t, n) {
                var a;
                return (a = r.call(this, e, t, "foundation") || this).suit = n,
                $(a.element).addClass("vtext").addClass(a.suit),
                a
            }
            return i(e, r),
            e.prototype.canDropCards = function(e) {
                return 1 === e.length && (e[0].suit === this.suit && (0 === this.cards.length ? 1 === e[0].rank : e[0].rank === this.topCard().rank + 1))
            }
            ,
            e
        }(a)
          , o = function(a) {
            function e(e, t) {
                var n;
                return (n = a.call(this, e, t, "stock") || this).isStock = !0,
                n
            }
            i(e, a);
            var t = e.prototype;
            return t.canDragCards = function() {
                return !1
            }
            ,
            t.createElement = function() {
                var e = document.createElement("div");
                return $(e).addClass("vtext").html("<div><p>RESET</p></div>"),
                e
            }
            ,
            e
        }(a)
          , c = function(a) {
            function e(e, t) {
                var n;
                return (n = a.call(this, e, t, "waste") || this).isWaste = !0,
                n
            }
            return i(e, a),
            e.prototype.calculatePositions = function(e) {
                for (var t = this.pos, n = t.top, a = t.left, r = 0; r < this.cards.length; r++) {
                    var i = this.cards[r];
                    i.top = n,
                    i.left = a,
                    (r + 1) % e.condenseCount == 0 && (a += e.condenseSpace,
                    n -= e.condenseSpace)
                }
                var s = Math.ceil(.28 * e.cardSize.width);
                3 === this.shownCards && (2 === this.cards.length ? this.cards[this.cards.length - 1].left += 20 : 2 < this.cards.length && (this.cards[this.cards.length - 2].left += s,
                this.cards[this.cards.length - 1].left += 2 * s))
            }
            ,
            e
        }(a);
        t.exports = {
            Container: a,
            Tableau: r,
            Foundation: s,
            Stock: o,
            Waste: c
        }
    }
    , {}],
    9: [function(e, t, n) {
        "use strict";
        var i = e("../util")
          , s = e("../statistics")
          , a = e("./solitairecard")
          , r = e("../game").HTML_CARD_SUITS
          , o = e("../gamecontrol")
          , E = e("./zindex")
          , c = e("../api")
          , u = e("../constants")
          , d = u.KING
          , l = u.ACE_LOW
          , h = u.HEARTS
          , m = u.CLUBS
          , f = u.DIAMONDS
          , p = u.SPADES
          , g = e("../helper-functions")
          , v = g._setInterval
          , N = g._setTimeout
          , w = g.captainsLog
          , b = function() {
            function e(e) {
                var t = this;
                this.slug = e,
                this.undoStack = [],
                this.containers = [],
                this.deckCount = 1,
                this.MAX_MOBILE_BOARD_HEIGHT = 689,
                this.MAX_CARD_SIZE = {
                    width: 69,
                    height: 94
                },
                this.CARD_SIZE_RATIO = this.MAX_CARD_SIZE.height / this.MAX_CARD_SIZE.width,
                i.settings.addListener("simpleDeck", function() {
                    t.setCssCards()
                }),
                o.addRestartHandler(function() {
                    return t.startNewGameWithoutReload()
                }),
                v(function() {
                    return t.updateTime()
                }, 1e3),
                this.config = {
                    tableSize: {
                        width: 700,
                        height: 400
                    },
                    cardSize: null,
                    widestStackCount: 7,
                    condenseCount: 4,
                    condenseSpace: 1,
                    maxSpaceBetween: 16,
                    cardMarginTopPercent: .26
                },
                this.timing = {
                    animationSpeed: 250,
                    flipSpeed: 100
                }
            }
            var t = e.prototype;
            return t.resetGameIfKeyChangesBeforeGameStart = function(e) {
                var t = this;
                i.settings.addListener(e, function() {
                    o.isGameNotStarted() && t.startNumberedGame(t.gameNumber)
                })
            }
            ,
            t.start = function() {
                this.gameNumber = this.getNewGameNumber(),
                this.calculateCardSize(this.config.widestStackCount),
                this.calculatePositions(),
                this.createDeck(),
                this.setupTable(),
                this.startTime = (new Date).getTime(),
                this.setupResizeHandler(),
                this.setupRestartHandler(),
                this.setupNumberedGames(),
                this.setupLoserScreenButtons(),
                this.saveRecords && this.updateGameResultInfo(),
                this.moves = 0,
                this.undos = 0,
                this.startGameRender ? this.startGameRender() : this.render(!0)
            }
            ,
            t.message = function(e) {
                $("#messageBox p").html(e)
            }
            ,
            t.percentOfCardHeight = function(e) {
                var t = this.config.cardSize ? this.config.cardSize.height : this.MAX_CARD_SIZE.height;
                return Math.round(e * t)
            }
            ,
            t.stackWidth = function(e) {
                return e * this.config.paddedWidth - this.config.spaceBetween
            }
            ,
            t.calculateCardSize = function(e) {
                var t = $("#play-page").width()
                  , n = this.config;
                if (n.tableSize.width = t,
                n.tableSize.height = $("#play-page").height(),
                e * (this.MAX_CARD_SIZE.width + n.maxSpaceBetween) <= t)
                    return n.cardSize = {
                        width: this.MAX_CARD_SIZE.width,
                        height: this.MAX_CARD_SIZE.height
                    },
                    n.spaceBetween = n.maxSpaceBetween,
                    n.paddedWidth = n.cardSize.width + n.spaceBetween,
                    void (n.tableauCardMarginTop = this.percentOfCardHeight(n.cardMarginTopPercent));
                var a = t - e * this.MAX_CARD_SIZE.width;
                if (0 < a && 6 <= a / (e + 1))
                    return n.cardSize = {
                        width: this.MAX_CARD_SIZE.width,
                        height: this.MAX_CARD_SIZE.height
                    },
                    n.spaceBetween = Math.floor(a / e),
                    n.paddedWidth = n.cardSize.width + n.spaceBetween,
                    void (n.tableauCardMarginTop = this.percentOfCardHeight(n.cardMarginTopPercent));
                n.condenseCount = 6;
                var r = t < 400 ? 3 : 6;
                8 < e && (r -= 2);
                var i = t - (e + 1) * r;
                n.cardSize = {
                    width: Math.floor(i / e)
                },
                n.cardSize.height = Math.ceil(n.cardSize.width * this.CARD_SIZE_RATIO),
                n.spaceBetween = r,
                n.paddedWidth = n.cardSize.width + n.spaceBetween,
                n.tableauCardMarginTop = this.percentOfCardHeight(n.cardMarginTopPercent)
            }
            ,
            t.calculatePositions = function() {
                throw new Error("Subclasses must override the calculatePositions function")
            }
            ,
            t.updatePositions = function() {
                throw new Error("Subclasses must override the updatePositions function")
            }
            ,
            t.updateListOfContainers = function(e, t, n) {
                var a = e
                  , r = Array.isArray(a)
                  , i = 0;
                for (a = r ? a : a[Symbol.iterator](); ; ) {
                    var s;
                    if (r) {
                        if (i >= a.length)
                            break;
                        s = a[i++]
                    } else {
                        if ((i = a.next()).done)
                            break;
                        s = i.value
                    }
                    s.moveTo(t, n),
                    n += this.config.paddedWidth
                }
            }
            ,
            t.updateCellAndCardSizes = function() {
                var e = this.config.cardSize
                  , t = e.width
                  , n = e.height;
                $(".cell").css({
                    width: t - 1,
                    height: n - 1
                }),
                $(".card, .faceup, .facedown").css({
                    width: t,
                    height: n,
                    backgroundSize: t + "px " + n + "px"
                })
            }
            ,
            t.resize = function() {
                var e = this;
                this.calculateCardSize(this.config.widestStackCount),
                this.calculatePositions(),
                this.updatePositions(),
                this.calculateAndSetNewTableHeight(),
                this.render(!0, function() {
                    return e.rendering = !1
                })
            }
            ,
            t.getNewGameNumber = function() {
                return i.qs.nr ? parseInt(qs.nr) : Math.floor(5e4 * Math.random()) + 1
            }
            ,
            t.startNumberedGame = function(e) {
                i.removeConfetti(),
                $(".blink").removeClass("blink"),
                $(".card").remove(),
                $("#time").text("00:00"),
                $(".hide-win").show(),
                window.pauseTime = 0,
                this.gameNumber = e,
                this.clearTable(),
                this.createDeck(),
                this.setupTable(),
                o.resetGameStatus(),
                this.saveRecords && this.updateGameResultInfo(),
                this.startTime = (new Date).getTime(),
                this.endTime = null,
                this.lastMoveTime = null,
                this.statsSaved = !1,
                this.moves = 0,
                this.undos = 0,
                this.startGameRender ? this.startGameRender() : this.render(!0)
            }
            ,
            t.startNewGameWithoutReload = function() {
                $("#win-screen").hide(),
                $("#undo").show(),
                this.startNumberedGame(this.getNewGameNumber())
            }
            ,
            t.setupNumberedGames = function() {
                var r = this;
                $("#game-nr a").click(function(e) {
                    i.removeConfetti(),
                    $(".dialog").hide();
                    var t = $("#game-nr-options").width()
                      , n = ($("#play-page").width() - t) / 2;
                    if ($("#start-game-nr").val(r.gameNumber),
                    $("#start-numbered-game").removeAttr("disabled"),
                    $("#game-nr-options").css("z-index", E.value + 100).css("left", n + "px").show(),
                    $("#win-screen").hide(),
                    r.isMobileVersion()) {
                        var a = (innerHeight - $("#game-nr-options").height()) / 3;
                        $("#game-nr-options").css("top", a).css("z-index", 5e4)
                    }
                    e.preventDefault()
                }),
                $("#start-game-nr").on("focus", function() {
                    N(function() {
                        return $("#start-game-nr").select()
                    }, 0)
                }),
                $("#start-numbered-game").click(function(e) {
                    e.preventDefault();
                    var t = $("#start-game-nr").val();
                    t.match(/^\s*\d{1,5}\s*$/) ? ($("#game-nr-options").hide(),
                    t = parseInt(t),
                    i.trackEvent("StartNumberedGame", t.toString(), t),
                    $("#undo").show(),
                    r.startNumberedGame(t)) : alert("Invalid game nr. Must be between 1 and " + 5e4)
                }),
                $("#start-game-nr").bind("input", function() {
                    function e() {
                        $("#start-numbered-game").attr("disabled", "disabled"),
                        $("#start-game-nr").css("color", "red")
                    }
                    var t = $("#start-game-nr").val();
                    if (t.match(/^\s*\d{1,5}\s*$/)) {
                        var n = parseInt(t);
                        n < 1 || 5e4 < n ? e() : ($("#start-numbered-game").removeAttr("disabled"),
                        $("#start-game-nr").css("color", "black"))
                    } else
                        e()
                }),
                $("#cancel-new-numbered-game").click(function(e) {
                    e.preventDefault(),
                    $("#game-nr-options").hide()
                })
            }
            ,
            t.createDeck = function() {
                this.randomSeed = this.gameNumber,
                this.deck = [];
                for (var e = 0; e < this.deckCount; e++)
                    for (var t = l; t <= d; t++)
                        this.deck.push(new a(h,t)),
                        this.deck.push(new a(p,t)),
                        this.deck.push(new a(f,t)),
                        this.deck.push(new a(m,t));
                this.shuffle(),
                this.createDeckElements()
            }
            ,
            t.getRandomNumberGenerator = function(e) {
                return function() {
                    return (e = (9301 * e + 49297) % 233280) / 233280
                }
            }
            ,
            t.shuffle = function() {
                var e = this.getRandomNumberGenerator(this.gameNumber)
                  , t = this.deck.length;
                if (0 !== t)
                    for (; --t; ) {
                        var n = Math.floor(e() * (t + 1))
                          , a = this.deck[t]
                          , r = this.deck[n];
                        this.deck[t] = r,
                        this.deck[n] = a
                    }
            }
            ,
            t.loadState = function(e) {
                var a = this
                  , t = this.containers
                  , n = Array.isArray(t)
                  , r = 0;
                for (t = n ? t : t[Symbol.iterator](); ; ) {
                    var i;
                    if (n) {
                        if (r >= t.length)
                            break;
                        i = t[r++]
                    } else {
                        if ((r = t.next()).done)
                            break;
                        i = r.value
                    }
                    i.clear()
                }
                var s = this.containers
                  , o = Array.isArray(s)
                  , c = 0;
                for (s = o ? s : s[Symbol.iterator](); ; ) {
                    var u;
                    if (o) {
                        if (c >= s.length)
                            break;
                        u = s[c++]
                    } else {
                        if ((c = s.next()).done)
                            break;
                        u = c.value
                    }
                    var d = u
                      , l = e[d.id];
                    if (l) {
                        var h = function() {
                            if (f) {
                                if (p >= m.length)
                                    return "break";
                                g = m[p++]
                            } else {
                                if ((p = m.next()).done)
                                    return "break";
                                g = p.value
                            }
                            var t = g
                              , e = !t.match(/_/)
                              , n = a.deck.find(function(e) {
                                return e.toString() === t.replace(/_/g, "") && !e.container
                            });
                            n.faceUp = e,
                            d.addCards([n])
                        }
                          , m = l.split(";")
                          , f = Array.isArray(m)
                          , p = 0;
                        for (m = f ? m : m[Symbol.iterator](); ; ) {
                            var g;
                            if ("break" === h())
                                break
                        }
                    }
                }
                this.moves = e.moves,
                this.render(!0)
            }
            ,
            t.getElapsedTime = function() {
                var e = this.endTime || (new Date).getTime();
                return window.pauseTime = window.pauseTime || 0,
                Math.round((e - this.startTime - window.pauseTime) / 1e3)
            }
            ,
            t.doMove = function() {
                this.moves++,
                this.lastMoveTime = (new Date).getTime(),
                o.isGameStarted() || (s.startGame([{
                    id: this.getVariantName()
                }]),
                this.loseNumberedGame(this.gameNumber),
                i.trackEvent("StartGame", this.getVariantName()),
                o.startGame())
            }
            ,
            t.undoMove = function() {
                this.moves++,
                this.undos++
            }
            ,
            t.moveCards = function(e, t, n, a) {
                var r = this.pushUndoState(!0);
                if (e = e.slice(0),
                a && e.reverse(),
                n) {
                    var i = e
                      , s = Array.isArray(i)
                      , o = 0;
                    for (i = s ? i : i[Symbol.iterator](); ; ) {
                        var c;
                        if (s) {
                            if (o >= i.length)
                                break;
                            c = i[o++]
                        } else {
                            if ((o = i.next()).done)
                                break;
                            c = o.value
                        }
                        var u = c;
                        u.faceUp = !u.faceUp
                    }
                }
                this.doMove(r),
                t.addCards(e),
                this.render()
            }
            ,
            t.undo = function() {
                if (!this.rendering) {
                    var e = this.undoStack.pop();
                    if (e) {
                        e.isMove && this.undoMove(e);
                        var t = this.containers
                          , n = Array.isArray(t)
                          , a = 0;
                        for (t = n ? t : t[Symbol.iterator](); ; ) {
                            var r;
                            if (n) {
                                if (a >= t.length)
                                    break;
                                r = t[a++]
                            } else {
                                if ((a = t.next()).done)
                                    break;
                                r = a.value
                            }
                            var i = r;
                            i.cards.splice(0, i.cards.length),
                            i.addCards(e[i.id].map(function(e) {
                                var t = e.card;
                                return t.faceUp = e.faceUp,
                                t
                            }))
                        }
                        this.render()
                    }
                }
            }
            ,
            t.restart = function() {
                i.removeConfetti(),
                $("#win-screen, #loser-screen").hide(),
                this.startNumberedGame(this.gameNumber)
            }
            ,
            t.afterRender = function() {
                this.isFinished() ? (this.autoFinishStarted = !1,
                o.finishGame(),
                this.win()) : this.isAlmostFinished() && i.settings.autoComplete && (this.autoFinishStarted = !0,
                this.autoFinish())
            }
            ,
            t.isStarted = function() {
                return 0 < this.undoStack.length
            }
            ,
            t.setupTable = function() {
                throw new Error("Subclasses must override setupTable")
            }
            ,
            t.autoFinish = function() {
                throw new Error("Base Solitaire class does not know how to auto finish the game. Override this in your real game")
            }
            ,
            t.isAlmostFinished = function() {
                return !1
            }
            ,
            t.isFinished = function() {
                return !1
            }
            ,
            t.createDeckElements = function() {
                var e = $("#play-page")
                  , t = this.config
                  , n = this.deck
                  , a = Array.isArray(n)
                  , r = 0;
                for (n = a ? n : n[Symbol.iterator](); ; ) {
                    var i;
                    if (a) {
                        if (r >= n.length)
                            break;
                        i = n[r++]
                    } else {
                        if ((r = n.next()).done)
                            break;
                        i = r.value
                    }
                    var s = i
                      , o = $("<div>").addClass("card").css({
                        top: 300,
                        left: 300
                    });
                    o.css({
                        width: t.cardSize.width,
                        height: t.cardSize.height
                    });
                    var c = $("<div>").addClass("faceup")
                      , u = $("<div>").addClass("facedown");
                    o.addClass(s.shortName.toLowerCase()),
                    $(o).append(c),
                    $(o).append(u),
                    e.append(o[0]),
                    s.guiCard = o[0],
                    (o[0].card = s).moveToFront(),
                    s.showCard()
                }
                this.setCssCards(),
                this.bindCardEventHandlers()
            }
            ,
            t.setCssCards = function() {
                $("#csscards").remove();
                var e, t = this.getSpriteCardsFilename(), n = Math.ceil(window.devicePixelRatio || 1);
                n = Math.min(3, n),
                i.qs.cards && (n = i.qs.cards),
                1.5 == window.devicePixelRatio && (n = 3),
                e = i.settings.simpleDeck ? (n = Math.min(2, n),
                $("#board").addClass("simpledeck"),
                "solitairecards-" + n + "x.css") : ($("#board").removeClass("simpledeck"),
                t + "-" + n + "x.css"),
                $("<link>", {
                    rel: "stylesheet",
                    id: "csscards",
                    href: "https://cardgames.io/shared/images/cards/" + e
                }).appendTo("head")
            }
            ,
            t.getSpriteCardsFilename = function() {
                return "normalcards"
            }
            ,
            t.bindCardEventHandlers = function() {
                var t = this;
                "Firefox" === i.parseUserAgent().browser ? $(document).keydown(function(e) {
                    return t.keyDown(e)
                }) : $(document).keypress(function(e) {
                    return t.keyPress(e)
                }),
                $(".card").unbind("click"),
                $(".card").dblclick(function(e) {
                    return t.doubleClick(e.currentTarget.card)
                }),
                $("#undo").unbind("click"),
                $("#undo").click(function() {
                    return t.undo()
                }),
                this.bindTouchEventHandlers(),
                this.bindMouseEventHandlers(),
                this.bindRightClickMouseHandler()
            }
            ,
            t.bindRightClickMouseHandler = function() {
                $(".card").bind("contextmenu", function(e) {
                    if (i.settings.simpleDeck)
                        return !1;
                    if (!this.card.faceUp)
                        return !1;
                    $(".marker").remove();
                    var t = this.card.suit
                      , n = $("<div>", {
                        "class": "marker"
                    }).html(r[t]).appendTo(this);
                    return "h" != t && "d" != t || $(n).css("color", "red"),
                    N(function() {
                        $(n).fadeOut(function() {
                            $(n).remove()
                        })
                    }, 2e3),
                    !1
                })
            }
            ,
            t.bindMouseEventHandlers = function() {
                var t = this;
                $(".card").mousedown(function(e) {
                    return t.mouseDown(e.currentTarget.card, e.pageX, e.pageY)
                }),
                $(".card").mouseenter(function(e) {
                    return t.mouseEnter(e.currentTarget.card)
                }),
                $(".card").mouseleave(function(e) {
                    return t.mouseLeave(e.currentTarget.card)
                }),
                $(".card").click(function(e) {
                    return t.click(e.currentTarget.card)
                }),
                $(document).mouseup(function(e) {
                    return t.mouseUp(e.pageX, e.pageY)
                }),
                $(document).mousemove(function(e) {
                    return t.mouseMove(e.pageX, e.pageY)
                })
            }
            ,
            t.bindTouchEventHandlers = function() {
                var t = this;
                $(".card").on("touchstart", function(e) {
                    return t.touchStart(e.currentTarget.card, e.originalEvent)
                }),
                $(".card").on("touchend", function(e) {
                    return t.touchEnd(e.originalEvent)
                }),
                $(".card").on("touchmove", function(e) {
                    return t.touchMove(e.originalEvent)
                })
            }
            ,
            t.mouseDown = function(e, t, n) {
                var a = this;
                if (!this.rendering && !this.movingCards)
                    if (e.faceUp) {
                        if (e.container.canDragCard(e)) {
                            this.movingCards = e.container.getDragCards(e);
                            for (var r = this.movingCards.length - 1; 0 <= r; r--)
                                $(this.movingCards[r].guiCard).css("z-index", E.value + r + 1);
                            return E.value += this.movingCards.length + 1,
                            this.pos = {
                                x: t,
                                y: n
                            },
                            this.startMovePos = {
                                x: t,
                                y: n
                            },
                            this.targets = this.containers.filter(function(e) {
                                return e.canDropCards(a.movingCards)
                            }),
                            !1
                        }
                        this.movingCards = null
                    } else
                        this.click(e)
            }
            ,
            t.touchStart = function(e, t) {
                return t.preventDefault(),
                t.stopPropagation(),
                this.mouseDown(e, t.touches[0].pageX, t.touches[0].pageY),
                !1
            }
            ,
            t.touchMove = function(e) {
                e.preventDefault(),
                this.mouseMove(e.touches[0].pageX, e.touches[0].pageY)
            }
            ,
            t.touchEnd = function(e) {
                e.preventDefault(),
                e.changedTouches && 0 < e.changedTouches.length ? this.mouseUp(e.changedTouches[0].pageX, e.changedTouches[0].pageY, e) : this.mouseUp(e.pageX, e.pageY, e)
            }
            ,
            t.keyPress = function(e) {
                26 == e.which && (e.preventDefault(),
                this.undo())
            }
            ,
            t.keyDown = function(e) {
                90 === e.which && e.ctrlKey && (e.preventDefault(),
                this.undo())
            }
            ,
            t.click = function() {
            }
            ,
            t.mouseEnter = function() {}
            ,
            t.mouseLeave = function() {}
            ,
            t.pushUndoState = function(e) {
                var t = {
                    isMove: e
                }
                  , n = this.containers
                  , a = Array.isArray(n)
                  , r = 0;
                for (n = a ? n : n[Symbol.iterator](); ; ) {
                    var i;
                    if (a) {
                        if (r >= n.length)
                            break;
                        i = n[r++]
                    } else {
                        if ((r = n.next()).done)
                            break;
                        i = r.value
                    }
                    var s = i;
                    t[s.id] = s.cards.map(function(e) {
                        return {
                            faceUp: e.faceUp,
                            card: e
                        }
                    })
                }
                return this.undoStack.push(t),
                t
            }
            ,
            t.mouseMove = function(e, t) {
                if (this.movingCards) {
                    var n = e - this.pos.x
                      , a = t - this.pos.y;
                    this.pos = {
                        x: e,
                        y: t
                    };
                    var r = this.movingCards
                      , i = Array.isArray(r)
                      , s = 0;
                    for (r = i ? r : r[Symbol.iterator](); ; ) {
                        var o;
                        if (i) {
                            if (s >= r.length)
                                break;
                            o = r[s++]
                        } else {
                            if ((s = r.next()).done)
                                break;
                            o = s.value
                        }
                        $(o.guiCard).css({
                            top: "+=" + a,
                            left: "+=" + n
                        })
                    }
                    var c = this.getHitTarget();
                    c ? this.handleHoverTarget(c) : this.lastTargetEl && ($(this.lastTargetEl).removeClass("glow"),
                    this.lastTargetEl = null)
                }
            }
            ,
            t.handleHoverTarget = function(e) {
                var t = e.getDropTarget();
                t != this.lastTargetEl && ($(t).addClass("glow"),
                $(this.lastTargetEl).removeClass("glow"),
                this.lastTargetEl = t)
            }
            ,
            t.getHitTarget = function() {
                if (!this.targets || !this.movingCards)
                    return null;
                for (var e = this.movingCards[0].cssTop(), t = this.movingCards[0].cssLeft(), n = this.config.cardSize.width, a = this.config.cardSize.height, r = [], i = 0; i < this.targets.length; i++) {
                    var s = this.targets[i]
                      , o = s.getDropTarget()
                      , c = parseInt($(o).css("top"))
                      , u = parseInt($(o).css("left"));
                    s.area = null;
                    var d = Math.abs(c - e)
                      , l = Math.abs(u - t);
                    if (d < a && l < n) {
                        var h = a - d
                          , m = n - l;
                        s.area = h * m,
                        r.push(s)
                    }
                }
                return r.sort(function(e, t) {
                    return t.area - e.area
                }),
                0 < r.length ? r[0] : null
            }
            ,
            t.mouseUp = function(e, t) {
                if (!this.rendering) {
                    var n = this.startMovePos && (e !== this.startMovePos.x || t !== this.startMovePos.y);
                    if (delete this.startMovePos,
                    this.lastTargetEl && ($(this.lastTargetEl).removeClass("glow"),
                    this.lastTargetEl = null),
                    this.targets && this.movingCards) {
                        var a = this.getHitTarget(e, t);
                        a ? this.dropOnTarget(this.movingCards, a) : n && this.render()
                    } else
                        this.movingCards && n && this.render();
                    this.movingCards = null,
                    this.targets = null
                }
            }
            ,
            t.dropOnTarget = function(e, t) {
                this.moveCards(e, t)
            }
            ,
            t.doubleClick = function(t) {
                if (this.foundations && t.faceUp && t.container.topCard() === t) {
                    var e = this.foundations.find(function(e) {
                        return e.canDropCards([t])
                    });
                    e && e != t.container && this.moveCards([t], e)
                }
            }
            ,
            t.getMinTableHeight = function() {
                return 600
            }
            ,
            t.calculateAndSetNewTableHeight = function() {
                var e = this.getMinTableHeight();
                if (null !== e || APP_MODE) {
                    if (!this.initialHeightSet && !APP_MODE)
                        return $("#play-page").css("height", e),
                        void (this.initialHeightSet = !0);
                    var t, n = $("#play-page").height();
                    t = this.isMobileVersion() ? 10 + parseInt($("#undo").css("bottom")) + $("#undo").height() : 10 + parseInt($("#game-nr").css("bottom")) + $("#game-nr").height();
                    var a = 0
                      , r = this.deck
                      , i = Array.isArray(r)
                      , s = 0;
                    for (r = i ? r : r[Symbol.iterator](); ; ) {
                        var o;
                        if (i) {
                            if (s >= r.length)
                                break;
                            o = r[s++]
                        } else {
                            if ((s = r.next()).done)
                                break;
                            o = s.value
                        }
                        var c = o;
                        a = Math.max(c.top + this.config.cardSize.height, a)
                    }
                    var u = a + t;
                    u !== n && (APP_MODE ? u > $("#board").height() ? $("#play-page").attr("style", "height: " + u + "px !important") : $("#play-page").attr("style", "") : $("#play-page").css({
                        height: Math.max(u, e)
                    }))
                }
            }
            ,
            t.setCardCursors = function() {
                var e = this.deck
                  , t = Array.isArray(e)
                  , n = 0;
                for (e = t ? e : e[Symbol.iterator](); ; ) {
                    var a;
                    if (t) {
                        if (n >= e.length)
                            break;
                        a = e[n++]
                    } else {
                        if ((n = e.next()).done)
                            break;
                        a = n.value
                    }
                    var r = a;
                    r.container || console.log("CARD " + r + " without container"),
                    r.container.canDragCard(r) || r.container.canFlipCard(r) ? $(r.guiCard).css("cursor", "pointer") : $(r.guiCard).css("cursor", "auto")
                }
            }
            ,
            t.render = function(e, t) {
                if (!this.renderDisabled) {
                    this.beforeRender && this.beforeRender(e),
                    this.rendering = !0;
                    var n = this.containers
                      , a = Array.isArray(n)
                      , r = 0;
                    for (n = a ? n : n[Symbol.iterator](); ; ) {
                        var i;
                        if (a) {
                            if (r >= n.length)
                                break;
                            i = n[r++]
                        } else {
                            if ((r = n.next()).done)
                                break;
                            i = r.value
                        }
                        i.calculatePositions(this.config)
                    }
                    this.setCardCursors(),
                    $("#moves").html(this.moves + " Moves");
                    for (var s = 0; s < this.deck.length; s++) {
                        var o = this.deck[s]
                          , c = o.cssLeft()
                          , u = o.cssTop();
                        c == o.left && u == o.top || (o.moved = !0),
                        (o.guiCard.faceUp && !o.faceUp || !o.guiCard.faceUp && o.faceUp) && (o.flipped = !0)
                    }
                    var d = []
                      , l = this.containers
                      , h = Array.isArray(l)
                      , m = 0;
                    for (l = h ? l : l[Symbol.iterator](); ; ) {
                        var f;
                        if (h) {
                            if (m >= l.length)
                                break;
                            f = l[m++]
                        } else {
                            if ((m = l.next()).done)
                                break;
                            f = m.value
                        }
                        var p = f
                          , g = p.cards
                          , v = Array.isArray(g)
                          , w = 0;
                        for (g = v ? g : g[Symbol.iterator](); ; ) {
                            var b;
                            if (v) {
                                if (w >= g.length)
                                    break;
                                b = g[w++]
                            } else {
                                if ((w = g.next()).done)
                                    break;
                                b = w.value
                            }
                            var y = b;
                            y.moved ? ($(y.guiCard).css("z-index", E.next()),
                            d.push(p),
                            e ? ($(y.guiCard).css({
                                top: y.top,
                                left: y.left
                            }),
                            y.showOrHideCard()) : ($(y.guiCard).animate({
                                top: y.top,
                                left: y.left,
                                queue: !1
                            }, this.timing.animationSpeed),
                            M(y, this.timing.animationSpeed / 2)),
                            y.moved = !1,
                            y.flipped = !1) : y.flipped && (this.renderFlip(y),
                            y.flipped = !1,
                            d.push(p))
                        }
                    }
                    for (var C = 0, k = d; C < k.length; C++) {
                        for (var S = k[C], T = S.cards.length - 1; 0 <= T; T--) {
                            var A = S.cards[T]
                              , x = E.value + T + 2;
                            $(A.guiCard).css("z-index", x)
                        }
                        this.processDirtyContainer && this.processDirtyContainer(S),
                        E.value += S.cards.length + 3
                    }
                    this.calculateAndSetNewTableHeight();
                    var D = this;
                    t = t || function() {
                        D.rendering = !1,
                        D.afterRender()
                    }
                    ,
                    e ? t() : N(t, this.timing.animationSpeed)
                }
                function M(e, t) {
                    N(function() {
                        return e.showOrHideCard()
                    }, t)
                }
            }
            ,
            t.renderFlip = function(e) {
                var t = e.left
                  , n = Math.floor(.1 * this.config.cardSize.width);
                $(e.guiCard).animate({
                    left: t + n
                }, this.timing.flipSpeed, function() {
                    e.showOrHideCard()
                }).animate({
                    left: t
                }, this.timing.flipSpeed)
            }
            ,
            t.isMobileVersion = function() {
                return i.isMobileLookActive()
            }
            ,
            t.getWinScreenTop = function() {
                return this.isMobileVersion() ? Math.ceil(1.5 * this.config.cardSize.height) : 130
            }
            ,
            t.win = function() {
                this.endTime = (new Date).getTime(),
                $(".hide-win").fadeOut(),
                i.showConfetti();
                var e = this.checkForRecord();
                if (i.qs.fakerecord) {
                    var t = "Congratulations, you won game #" + this.gameNumber + " in fewer moves than anyone has before. You used " + this.moves + " moves, the old record was 51 moves!";
                    $("#win-record").text(t).show(),
                    e = !0
                }
                $("#win-screen").css("top", this.getWinScreenTop(e)).fadeIn("fast"),
                $("#win-screen h1").addClass("blink"),
                this.winNumberedGame(this.gameNumber),
                this.saveStats()
            }
            ,
            t.checkForRecord = function() {
                if ($("#win-record").hide(),
                !this.saveRecords)
                    return !1;
                this.saveResults(0, this.moves);
                var e = this.currentRecord;
                if (e) {
                    var t = "";
                    return null === e.result ? (t = "Congratulations, you are the first person to win game #" + this.gameNumber + "!",
                    i.trackEvent("NewRecord", "WinFirstEver", this.gameNumber)) : 0 < e.result ? (t = "Congratulations, you are the first person to win game #" + this.gameNumber + "! The old record was " + e.result + " cards left, using " + e.moves + " moves.",
                    i.trackEvent("NewRecord", "WinFirstAfterLosses", this.gameNumber)) : e.moves > this.moves ? (t = "Congratulations, you won game #" + this.gameNumber + " in fewer moves than anyone has before. You used " + this.moves + " moves, the old record was " + e.moves + " moves!",
                    i.trackEvent("NewRecord", "WinFewerMoves", this.gameNumber)) : e.moves === this.moves && (t = "Congratulations, you won game #" + this.gameNumber + " in " + this.moves + " moves. That is equal to the current record!"),
                    !!t && (this.handleRecord(),
                    $("#win-record").text(t).show(),
                    !0)
                }
                return !1
            }
            ,
            t.handleRecord = function() {}
            ,
            t.clickOnSloppyMove = function(e, t) {
                var n = 2e6;
                if (this.startMovePos && this.movingCards) {
                    var a = this.movingCards[0];
                    if ((n = Math.sqrt(Math.pow(e - this.startMovePos.x, 2) + Math.pow(t - this.startMovePos.y, 2))) < 10)
                        return 0 < n && $(a.guiCard).css({
                            top: a.top,
                            left: a.left
                        }),
                        this.movingCards = null,
                        this.click(a),
                        !0
                }
                return !1
            }
            ,
            t.updateLoserScreen = function(e) {
                var t = this.currentRecord;
                if (t && t.moves == this.moves && t.result == e ? $("#record").text("You had " + e + " cards left, and used " + this.moves + " moves, which is equal to the best result we've seen for game #" + this.gameNumber + "!") : $("#record").text("You had " + e + " cards left, and used " + this.moves + " moves"),
                t)
                    if (null === t.result)
                        this.saveResults(e, this.moves),
                        i.trackEvent("NewRecord", "LoseFirst", this.gameNumber);
                    else if (t.result > e || t.result == e && t.moves > this.moves) {
                        $("#loser-screen").addClass("record-broken");
                        var n = "But you did set a new record for game #" + this.gameNumber + ". You have " + e + " cards left and used " + this.moves + " moves. The old record was " + t.result + " cards left using " + t.moves + " moves. Congratulations on that!";
                        $("#record").text(n),
                        this.saveResults(e, this.moves),
                        t.result > e ? i.trackEvent("NewRecord", "LoseFewerCards", this.gameNumber) : i.trackEvent("NewRecord", "LoseFewerMoves", this.gameNumber)
                    }
                $("#undo").hide(),
                $("#loser-screen").css("z-index", E.value + 550).show()
            }
            ,
            t.saveStats = function() {
                if (this.statsSaved)
                    w.debug("Stats already saved, not saving");
                else {
                    this.statsSaved = !0;
                    var e = this.lastMoveTime - this.startTime - window.pauseTime
                      , t = 0
                      , n = 0
                      , a = 0
                      , r = this.currentRecord;
                    r && (null === r.result || 0 < r.result ? t = 1 : r.moves > this.moves && (n = 1),
                    r.moves == this.moves && (a = 1));
                    var i = {
                        id: this.getVariantName(),
                        stats: {
                            result: "win",
                            score: this.score || 0,
                            moveCount: this.moves,
                            maximumMoveCount: this.moves,
                            minimumMoveCount: this.moves,
                            timeSpent: e,
                            maximumTime: e,
                            minimumTime: e,
                            undoCount: this.undos,
                            maximumUndoCount: this.undos,
                            minimumUndoCount: this.undos,
                            firstToWinCount: t,
                            brokenRecordCount: n,
                            tiedCurrentRecordCount: a
                        }
                    };
                    this.addExtraDataToStats && this.addExtraDataToStats(i),
                    s.finishGame([i], e)
                }
            }
            ,
            t.saveResults = function(e, t) {
                w.debug("Sending results to server"),
                c.numberedGames.postSaveResult({
                    result: e,
                    moves: t
                }, this.gameNumber, this.slug, this.getVariantName(), function(e) {
                    e.isRecord ? w.info("NEW RECORD: " + JSON.stringify(e)) : w.debug("NOT A RECORD THIS TIME: " + JSON.stringify(e))
                })
            }
            ,
            t.keepPlayingLostGame = function() {
                $("#loser-screen").hide(),
                $("#undo").show(),
                this.rendering = !1,
                this.playLostGame = !0
            }
            ,
            t.updateGameResultInfo = function() {
                var n = this;
                5e4 < this.gameNumber ? i.trackEvent("BadGameNumber", window.location.href, 0, "", "", 1) : c.numberedGames.getGame(this.gameNumber, this.slug, this.getVariantName(), function(e) {
                    var t;
                    t = null === e.bestResult ? "This game has never been won before." : 0 < e.bestResult ? "Best result for this game is " + e.bestResult + " cards left in " + e.minMovesForBestResult + " moves." : "Best result for this game is winning in " + e.minMovesForBestResult + " moves.",
                    $(".current-record").text(t),
                    n.currentRecord = {
                        result: e.bestResult,
                        moves: e.minMovesForBestResult
                    }
                }, function(e) {
                    w.debug("fetching record error", e),
                    $(".current-record").text("We can not find the record for this game. Are you sure you're connected to the internet?")
                })
            }
            ,
            t.winNumberedGame = function(e) {
                var t = this.getVariantName();
                i.trackEvent("Win", t);
                var n = (new Date).getTime();
                c.numberedGames.win(e, this.slug, this.getVariantName(), function(e) {
                    var t = (new Date).getTime() - n;
                    w.debug("Finished posting to numberedGames.win, took " + t + "ms")
                })
            }
            ,
            t.loseNumberedGame = function(e) {
                var n = (new Date).getTime();
                c.numberedGames.start(e, this.slug, this.getVariantName(), function(e) {
                    var t = (new Date).getTime() - n;
                    w.debug("Finished posting to numberedGames.start, took " + t + "ms")
                })
            }
            ,
            t.setupRestartHandler = function() {
                var t = this;
                $('a[href="#restart"]').click(function(e) {
                    return e.preventDefault(),
                    confirm("Do you want to restart the current game? This will undo all your moves.") && (t.restart(),
                    i.mobileMenu.isOpen() && i.mobileMenu.close()),
                    !1
                })
            }
            ,
            t.setupResizeHandler = function() {
                var e = this;
                $(window).on("resize", function() {
                    return e.resize()
                })
            }
            ,
            t.setupLoserScreenButtons = function() {
                var e = this;
                $("#start-game-after-losing").click(i.reloadPage),
                $("#let-me-keep-playing").click(function() {
                    return e.keepPlayingLostGame()
                })
            }
            ,
            t.updateTime = function() {
                if (window.paused)
                    return !1;
                function e(e) {
                    return e < 10 ? "0" + e : e.toString()
                }
                var t = this.getElapsedTime()
                  , n = parseInt(t / 3600);
                t -= 3600 * n;
                var a = parseInt(t / 60)
                  , r = t -= 60 * a
                  , i = e(a) + ":" + e(r);
                0 < n && (i = e(n) + ":" + i),
                $("#time").html(i)
            }
            ,
            e
        }();
        t.exports = b
    }
    , {
        "../api": 1,
        "../constants": 3,
        "../game": 4,
        "../gamecontrol": 5,
        "../helper-functions": 6,
        "../statistics": 12,
        "../util": 14,
        "./solitairecard": 10,
        "./zindex": 11
    }],
    10: [function(e, t, n) {
        "use strict";
        var a = e("../cardgames/card")
          , r = e("./zindex")
          , i = function(e) {
            function t() {
                return e.apply(this, arguments) || this
            }
            !function(e, t) {
                e.prototype = Object.create(t.prototype),
                (e.prototype.constructor = e).__proto__ = t
            }(t, e);
            var n = t.prototype;
            return n.showCard = function() {
                $(this.guiCard).addClass("up"),
                this.guiCard.faceUp = !0
            }
            ,
            n.showOrHideCard = function() {
                this.faceUp ? this.showCard() : this.hideCard()
            }
            ,
            n.cssLeft = function() {
                return parseInt($(this.guiCard).css("left"))
            }
            ,
            n.cssTop = function() {
                return parseInt($(this.guiCard).css("top"))
            }
            ,
            n.moveToFront = function() {
                this.guiCard.style.zIndex = r.next()
            }
            ,
            n.hideCard = function() {
                $(this.guiCard).removeClass("up"),
                this.guiCard.faceUp = !1
            }
            ,
            t
        }(a);
        t.exports = i
    }
    , {
        "../cardgames/card": 2,
        "./zindex": 11
    }],
    11: [function(e, t, n) {
        "use strict";
        t.exports = {
            value: 1,
            next: function() {
                return this.value++,
                this.value
            }
        }
    }
    , {}],
    12: [function(e, t, n) {
        "use strict";
        var a, r = e("./util"), i = r.logError, s = r.qs, o = (r.cake,
        e("../shared/helper-functions").captainsLog), d = e("./page").slug, l = !!s.gid;
        try {
            a = window.localStorage
        } catch (e) {
            a = null
        }
        var h = null
          , m = null;
        var c = (window.slug || "unknown") + ".stats";
        function u() {
            var e = a.getItem(c);
            if (e) {
                var t = JSON.parse(e);
                if (t && t.players && t.startTime)
                    return t;
                a.removeItem(c);
                try {
                    i("Stats for " + c + " was malformed, removed it. First 50 chars of the data were: " + (e + "").substr(0, 50))
                } catch (e) {}
            }
            var n = {
                version: 4,
                startTime: (new Date).getTime(),
                gameCount: 0,
                abandonedGameCount: 0,
                finishedGameCount: 0,
                playersInGameCount: {},
                totalGameTime: 0,
                averageGameTime: null,
                maxGameTime: null,
                minGameTime: null,
                players: {}
            };
            return f(n),
            n
        }
        function f(e) {
            try {
                a.setItem(c, JSON.stringify(e))
            } catch (e) {
                o.error("localStorage is full")
            }
        }
        function p(e) {
            var t = u();
            e(t),
            f(t)
        }
        function g(e) {
            var t = {
                gameCount: 0,
                abandonedGameCount: 0,
                finishedGameCount: 0,
                winCount: 0,
                loseCount: 0,
                drawCount: 0,
                winPercentage: 0,
                totalGameTime: 0
            };
            return (e = e || {
                score: !0,
                tournaments: !0,
                streaks: !0,
                wonGameTime: !0
            }).wonGameTime && (t.minWonGameTime = null,
            t.maxWonGameTime = null,
            t.avgWonGameTime = null,
            t.totalWonGameTime = 0),
            e.score && (t.totalScore = 0,
            t.maxScore = null,
            t.minScore = null,
            t.avgScore = null),
            e.streaks && (t.winningStreak = 0,
            t.losingStreak = 0,
            t.maxWinningStreak = 0,
            t.maxLosingStreak = 0),
            e.tournaments && (t.finishedTournamentCount = 0,
            t.winTournamentCount = 0,
            t.loseTournamentCount = 0,
            t.totalTournamentScore = 0,
            t.avgTournamentScore = 0,
            t.tournamentWinPercentage = 0,
            t.tournamentWinningStreak = 0,
            t.tournamentLosingStreak = 0,
            t.tournamentMaxWinningStreak = 0,
            t.tournamentMaxLosingStreak = 0),
            t
        }
        var v = {
            get: u,
            enabled: !0,
            multiplayer: !1,
            clear: function() {
                this.enabled && a.removeItem(c)
            },
            emptyPlayer: g,
            minimumVersion: function(e) {
                if (this.enabled) {
                    var t = this.get();
                    t && t.version < e && this.clear()
                }
            },
            startGame: function(i, s) {
                this.enabled && (this.options = s || {
                    tournaments: !0,
                    streaks: !0,
                    score: !0,
                    wonGameTime: !0
                },
                this.currentPlayers = i,
                h = (new Date).getTime(),
                m = null,
                p(function(e) {
                    e.playersInGameCount[i.length] = (e.playersInGameCount[i.length] || 0) + 1,
                    e.gameCount++,
                    e.abandonedGameCount++;
                    for (var t = 0; t < i.length; t++) {
                        var n = i[t];
                        if (!n.id)
                            throw new Error("Missing id on player in statistics!");
                        var a = n.id;
                        if (l) {
                            if ("bottom-player" !== a)
                                continue;
                            a = "multi-player"
                        }
                        e.players[a] || (e.players[a] = g(s));
                        var r = e.players[a];
                        r.gameCount++,
                        r.abandonedGameCount++
                    }
                }))
            },
            cancelGame: function() {
                if (this.enabled && this.currentPlayers) {
                    var r = this.currentPlayers;
                    m = h = null;
                    var i = this.options;
                    p(function(e) {
                        e.playersInGameCount[r.length] = (e.playersInGameCount[r.length] || 0) - 1,
                        e.gameCount--,
                        e.abandonedGameCount--;
                        for (var t = 0; t < r.length; t++) {
                            var n = r[t];
                            if ("multi-player" !== n.id) {
                                e.players[n.id] || (e.players[n.id] = g(i));
                                var a = e.players[n.id];
                                a.gameCount--,
                                a.abandonedGameCount--
                            }
                        }
                    })
                }
            },
            finishGame: function(o, c, e) {
                if (this.enabled) {
                    var u = []
                      , d = this.options;
                    if (p(function(e) {
                        c || (m = (new Date).getTime(),
                        c = m - h,
                        "number" == typeof pauseTime && (c -= pauseTime)),
                        e.finishedGameCount++,
                        e.abandonedGameCount = Math.max(e.abandonedGameCount - 1, 0),
                        e.totalGameTime += c,
                        e.averageGameTime = e.totalGameTime / e.finishedGameCount,
                        e.maxGameTime = null === e.maxGameTime ? c : Math.max(c, e.maxGameTime),
                        e.minGameTime = null === e.minGameTime ? c : Math.min(c, e.minGameTime);
                        for (var t = 0; t < o.length; t++) {
                            var n = o[t]
                              , a = n.id;
                            if (l) {
                                if ("bottom-player" !== a)
                                    continue;
                                a = "multi-player"
                            }
                            var r = e.players[a];
                            for (var i in r || (e.players[a] = g(d),
                            (r = e.players[a]).abandonedGameCount++,
                            r.gameCount++),
                            n.stats = n.stats || {},
                            n.stats.score |= 0,
                            r.abandonedGameCount = Math.max(r.abandonedGameCount - 1, 0),
                            r.finishedGameCount++,
                            r.totalScore += n.stats.score,
                            r.minScore = null === r.minScore ? n.stats.score : Math.min(r.minScore, n.stats.score),
                            r.maxScore = null === r.maxScore ? n.stats.score : Math.max(r.maxScore, n.stats.score),
                            r.avgScore = r.totalScore / r.finishedGameCount,
                            r.totalGameTime += c,
                            "win" == n.stats.result ? (r.winCount++,
                            r.winningStreak++,
                            r.losingStreak = 0,
                            r.maxWinningStreak = Math.max(r.maxWinningStreak, r.winningStreak),
                            null === r.minWonGameTime ? r.minWonGameTime = c : c < r.minWonGameTime && (u.push({
                                oldTime: r.minWonGameTime,
                                newTime: c,
                                name: n.name
                            }),
                            r.minWonGameTime = c),
                            r.minWonGameTime = null === r.minWonGameTime ? c : Math.min(r.minWonGameTime, c),
                            r.maxWonGameTime = null === r.maxWonGameTime ? c : Math.max(r.maxWonGameTime, c),
                            r.totalWonGameTime += c,
                            r.avgWonGameTime = r.totalWonGameTime / r.winCount) : "lose" == n.stats.result ? (r.loseCount++,
                            r.winningStreak = 0,
                            r.losingStreak++,
                            r.maxLosingStreak = Math.max(r.maxLosingStreak, r.losingStreak)) : "draw" == n.stats.result && (r.drawCount++,
                            r.winningStreak = 0,
                            r.losingStreak = 0),
                            r.winPercentage = r.winCount / r.finishedGameCount,
                            n.stats.tournamentResult && (r.finishedTournamentCount++,
                            r.totalTournamentScore += n.stats.tournamentScore,
                            r.avgTournamentScore = r.totalTournamentScore / r.finishedTournamentCount,
                            "win" == n.stats.tournamentResult ? (r.winTournamentCount++,
                            r.tournamentWinningStreak++,
                            r.tournamentLosingStreak = 0,
                            r.tournamentMaxWinningStreak = Math.max(r.tournamentMaxWinningStreak, r.tournamentWinningStreak)) : "lose" == n.stats.tournamentResult && (r.loseTournamentCount++,
                            r.tournamentLosingStreak++,
                            r.tournamentWinningStreak = 0,
                            r.tournamentMaxLosingStreak = Math.max(r.tournamentMaxLosingStreak, r.tournamentLosingStreak)),
                            r.tournamentWinPercentage = r.winTournamentCount / r.finishedTournamentCount),
                            n.stats)
                                if (!i.match(/^(score|result|tournamentResult|tournamentScore)$/)) {
                                    var s = n.stats[i];
                                    "number" == typeof s && (i.match(/maximum/) ? (void 0 === r[i] || s > r[i]) && (r[i] = s) : i.match(/minimum/) ? (void 0 === r[i] || s < r[i]) && (r[i] = s) : (r[i] |= 0,
                                    r[i] += n.stats[i]))
                                }
                        }
                    }),
                    e)
                        for (var t = 0; t < u.length; t++)
                            e(u[t])
                }
            },
            startMultiplayerChallengeGame: function(t) {
                p(function(e) {
                    e.activeMultiplayerGame = {
                        name: t.name,
                        face: t.face
                    }
                })
            },
            finishMultiplayerChallengeGame: function(s, o, c, u) {
                void 0 === o && (o = !1),
                void 0 === c && (c = !1),
                void 0 === u && (u = !0),
                p(function(e) {
                    var t = s.find(function(e) {
                        return "bottom-player" !== e.id
                    });
                    e.multiplayer || (e.multiplayer = []);
                    var n = e.multiplayer.find(function(e) {
                        return e.name === t.name && e.face === t.face
                    });
                    if (n) {
                        if ("win"in n && !("games"in n)) {
                            var a = function(e) {
                                return "ginrummy" === e || "ginrummy/" === e
                            };
                            n = {
                                name: t.name,
                                face: t.face,
                                games: {
                                    won: a(d) ? 0 : n.lose,
                                    lost: a(d) ? 0 : n.win,
                                    draw: a(d) ? 0 : n.draw
                                },
                                hands: {
                                    won: a(d) ? n.lose : 0,
                                    lost: a(d) ? n.win : 0,
                                    draw: a(d) ? n.draw : 0
                                }
                            };
                            var r = e.multiplayer.findIndex(function(e) {
                                return e.name === t.name && e.face === t.face
                            });
                            e.multiplayer[r] = n
                        }
                    } else
                        n = {
                            name: t.name,
                            face: t.face,
                            games: {
                                won: 0,
                                lost: 0,
                                draw: 0
                            },
                            hands: {
                                won: 0,
                                lost: 0,
                                draw: 0
                            }
                        },
                        e.multiplayer.push(n);
                    function i(e, t, n, a) {
                        "win" === t.stats[a] ? e[n].won++ : "lose" === t.stats[a] ? e[n].lost++ : e[n].draw++
                    }
                    o ? (c && i(n, t, "games", "tournamentResult"),
                    u && i(n, t, "hands", "result")) : i(n, t, "games", "result"),
                    delete e.activeMultiplayerGame
                })
            },
            checkAbandonedMultiplayerGame: function() {
                this.registeredUnload || (this.registeredUnload = !0,
                window.addEventListener("beforeunload", function() {
                    v.checkAbandonedMultiplayerGame()
                }));
                var e = u();
                if (e.activeMultiplayerGame) {
                    var t = e.activeMultiplayerGame
                      , n = t.name
                      , a = t.face;
                    e.multiplayer || (e.multiplayer = []);
                    var r = e.multiplayer.find(function(e) {
                        return e.name === n && e.face === a
                    });
                    r ? r.lose++ : (r = {
                        name: n,
                        face: a,
                        win: 0,
                        lose: 1,
                        draw: 0
                    },
                    e.multiplayer.push(r)),
                    delete e.activeMultiplayerGame,
                    f(e)
                }
            },
            isGameActive: function() {
                return null !== h && null === m
            },
            saveRaw: function(e) {
                p(e)
            }
        };
        try {
            localStorage.setItem("test", "test"),
            localStorage.removeItem("test"),
            JSON.parse('{"test":"test"}'),
            JSON.stringify({
                "test": "test"
            }),
            v.supported = !0
        } catch (e) {
            v.supported = !1
        }
        if (!v.supported)
            for (var w in v)
                "supported" != w && (v[w] = function() {}
                );
        t.exports = v
    }
    , {
        "../shared/helper-functions": 6,
        "./page": 7,
        "./util": 14
    }],
    13: [function(e, t, n) {
        "use strict";
        var a = e("./util")
          , r = a.cake
          , i = a.deleteCake
          , s = function() {
            function e(e) {
                this.slug = e,
                this.sessionStorageAvailable = !0;
                try {
                    sessionStorage.test = 1,
                    delete sessionStorage.test
                } catch (e) {
                    this.sessionStorageAvailable = !1
                }
            }
            var t = e.prototype;
            return t.useCookies = function(e) {
                return ("undefined" == typeof window || !window.APP_MODE || !window.Android) && (!this.sessionStorageAvailable || "scores" === e || "autodeal" === e || "lastdealerindex" === e)
            }
            ,
            t.set = function(e, t) {
                this.useCookies(e) ? r(this.slug + "." + e, JSON.stringify(t)) : sessionStorage.setItem(this.slug + "." + e, JSON.stringify(t))
            }
            ,
            t.get = function(e, t) {
                var n;
                return null !== (n = this.useCookies(e) ? r(this.slug + "." + e) : sessionStorage.getItem(this.slug + "." + e)) ? JSON.parse(n) : t
            }
            ,
            t.remove = function(e) {
                this.useCookies(e) ? i(this.slug + "." + e) : sessionStorage.removeItem(this.slug + "." + e)
            }
            ,
            e
        }();
        t.exports = s
    }
    , {
        "./util": 14
    }],
    14: [function(e, t, n) {
        "use strict";
        var r = e("./helper-functions").ArrayUtils
          , a = 730
          , o = window.setTimeout
          , i = e("./helper-functions")
          , m = i.captainsLog
          , s = i._setTimeout
          , f = e("./api")
          , c = e("./gamecontrol");
        function u() {
            return window.matchMedia ? matchMedia("(max-width: " + a + "px)").matches : $(window).width() <= a
        }
        "dev.cardgames.io" == document.location.hostname && (m.level = "debug"),
        window.console && window.console.log || (window.console = {
            log: function() {},
            debug: function() {},
            info: function() {},
            warn: function() {},
            error: function() {}
        });
        var h = "gdprconsent";
        function p(e, t, n, a) {
            if (void 0 === t) {
                if (document.cookie && navigator.cookieEnabled) {
                    for (var r = document.cookie.split(";"), i = {}, s = 0; s < r.length; s++) {
                        var o = r[s].replace(/^\s*|\s*$/g, "").split("=");
                        i[o[0]] = decodeURIComponent(o[1])
                    }
                    return i[e] || null
                }
                return g(e)
            }
            if (null === p(h) && e !== h && !APP_MODE)
                return g(e, t),
                void console.log("Consent has not been given to set cookies, using dough for " + e + "=" + t + " ...");
            navigator.cookieEnabled || (m.debug("Cookies are disabled in this browser, setting up temporary value " + e + "=" + t + " ..."),
            g(e, t));
            var c = e + "=" + encodeURIComponent(t);
            if (n) {
                var u = new Date;
                u.setTime(u.getTime() + 24 * n * 60 * 60 * 1e3),
                c += "; expires=" + u.toUTCString()
            }
            a && (c += "; path=" + a),
            v(e),
            document.cookie = c;
            try {
                var d = p(e);
                if (d != t) {
                    if (!t && !d)
                        return;
                    if (!navigator.cookieEnabled)
                        return;
                    var l = navigator.userAgent.match(/Firefox/);
                    w("CAKEFAIL", "Name=" + e + ", set " + t + ", got " + d + ", cookies=" + navigator.cookieEnabled + ", firefox=" + l + ", cookie=" + document.cookie, 0, "", "", 1)
                }
            } catch (e) {}
        }
        function g(e, t) {
            try {
                var n = {};
                try {
                    n = JSON.parse(window.name)
                } catch (e) {
                    n = {}
                }
                if ("object" == typeof n && null !== n || (n = {}),
                void 0 === t)
                    return void 0 !== n[e] ? n[e] : null;
                n[e] = t,
                window.name = JSON.stringify(n)
            } catch (e) {
                try {
                    f.errors.log("DoughError", slug, e.message + " , window.name=" + window.name, null, null, 5)
                } catch (e) {}
                return null
            }
        }
        function v(e) {
            var t = e + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            document.cookie = t,
            document.cookie = t + " path=/";
            try {
                var n = JSON.parse(window.name);
                n && "object" == typeof n && void 0 !== n[e] && (delete n[e],
                window.name = JSON.stringify(n))
            } catch (e) {}
        }
        try {
            v("site.multiplayerPhrases")
        } catch (e) {}
        function w(e, t, n, a, r, i) {
            if ("FinishGame" == e && c.finishGame(),
            category = category || "",
            t = t || "",
            n = n || 0,
            a = a || "",
            r = r || "",
            "Error" === (e = e || "") && "" === a && "undefined" != typeof window && (a = window.siteVersion || ""),
            APP_MODE) {
                var s = navigator.userAgent || "";
                r = s.match(/iPhone/i) ? "APP-iPhone" : s.match(/iPad/i) ? "APP-iPad" : s.match(/android/i) ? "APP-Android" : "APP-Unknown - " + s
            }
            i = i || w.PROBABILITY,
            m.debug("TrackEvent: action=" + e + ", label=" + t + ", value=" + n + ", variable1=" + a + ", variable2=" + r + ", probability=" + i),
            APP_MODE && (i = 1),
            Math.random() <= i && f.events.post({
                category: category,
                action: e,
                label: t,
                value: n,
                variable1: a,
                variable2: r,
                probability: i
            })
        }
        function d(e, t, n, a, r) {
            w(e, t, n, a, r, 1)
        }
        w.PROBABILITY = .01;
        var l, b, y = {}, C = document, k = "loc", S = "hos", T = Math, A = {};
        function x(i, s, e) {
            void 0 === e && (e = !0),
            this.meta = {
                prefix: i,
                defaults: s,
                listeners: {}
            },
            i += ".";
            var o = this;
            e && (A[i] = this);
            try {
                this.meta.cookies = function() {
                    if (!document.cookie)
                        return {};
                    for (var e = {}, t = function(e) {
                        return decodeURIComponent(e).replace(/^\s*|\s*$/g, "")
                    }, n = document.cookie.split(";"), a = 0; a < n.length; a++) {
                        var r = n[a].split("=");
                        e[t(r[0])] = t(r[1])
                    }
                    return e
                }()
            } catch (e) {
                alert("EXCEPTION WHEN PARSING COOKIES" + e)
            }
            function t(e) {
                for (var t in e)
                    if (t.substr(0, i.length) == i) {
                        var n = e[t]
                          , a = t.substr(i.length)
                          , r = s[a];
                        if (void 0 === r)
                            continue;
                        if (void 0 !== r.defaultValue && (r = r.defaultValue),
                        "number" == typeof r)
                            o[a] = parseFloat(n);
                        else if ("boolean" == typeof r)
                            if ("true" == n)
                                o[a] = !0;
                            else {
                                if ("false" != n)
                                    continue;
                                o[a] = !1
                            }
                        else
                            o[a] = "object" == typeof r ? JSON.parse(n) : n
                    }
            }
            try {
                window.localStorage && t(localStorage)
            } catch (e) {}
            for (var n in t(this.meta.cookies),
            s)
                this.meta.listeners[n] = [],
                void 0 === this[n] && (s[n] && void 0 !== s[n].defaultValue ? this[n] = s[n].defaultValue : this[n] = JSON.parse(JSON.stringify(s[n])))
        }
        $(window).on("beforeunload", function() {
            for (var e in A) {
                var t = A[e];
                for (var n in t)
                    if (void 0 !== t[n] && "function" != typeof t[n]) {
                        var a = e + n
                          , r = t[n];
                        "object" != typeof r && ("boolean" != typeof r && "number" != typeof r || (r = r.toString()),
                        localStorage.getItem(a) && r != localStorage.getItem(a) && t.set(n, t[n]))
                    }
            }
        }),
        x.prototype.addListener = function(e, t) {
            this.meta.listeners[e] || (this.meta.listeners[e] = []),
            this.meta.listeners[e].push(t)
        }
        ,
        x.prototype.set = function(r, i) {
            if (APP_MODE || null !== p(h)) {
                if (void 0 === this[r] || "function" == typeof this[r])
                    throw "Invalid key: " + r;
                if (typeof i != typeof this[r])
                    throw "Unexpected type for " + r + ", expected " + typeof this[r] + ", got " + typeof i;
                var e, t;
                if (this[r] = i,
                void 0 !== this.meta.defaults[r].defaultValue) {
                    var n = this.meta.defaults[r];
                    e = n.defaultValue,
                    t = n.allowedValues,
                    n.minValue,
                    n.maxValue
                } else
                    e = this.meta.defaults[r];
                var s = this.meta
                  , a = this.meta.prefix + "." + r;
                if (i == e) {
                    this.meta.cookies[a] && (document.cookie = escape(a) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/");
                    try {
                        localStorage.removeItem(a)
                    } catch (e) {}
                    u()
                } else {
                    if (t) {
                        for (var o = !1, c = 0; c < t.length; c++)
                            if (i == t[c]) {
                                o = !0;
                                break
                            }
                        if (!o)
                            throw "Bad value for " + r + ": " + i + ". Allowed values are: " + t
                    }
                    u();
                    try {
                        "object" == typeof i && (i = JSON.stringify(i)),
                        localStorage.setItem(a, i)
                    } catch (e) {
                        document.cookie = escape(a) + "=" + escape(i) + "; expires=Tue, 19 Jan 2030 03:14:07 GMT; path=/"
                    }
                }
            } else
                console.log("GDPR consent has not been given, ignoring " + r + "=" + i);
            function u() {
                var e = s.listeners[r]
                  , t = Array.isArray(e)
                  , n = 0;
                for (e = t ? e : e[Symbol.iterator](); ; ) {
                    var a;
                    if (t) {
                        if (n >= e.length)
                            break;
                        a = e[n++]
                    } else {
                        if ((n = e.next()).done)
                            break;
                        a = n.value
                    }
                    a({
                        key: r,
                        value: i
                    })
                }
                "string" == typeof i || "number" == typeof i ? $('.option-row input[name="' + r + '"][value="' + i + '"]').prop("checked", !0) : "boolean" == typeof i && $('.option-row input[name="' + r + '"][type="checkbox"]').prop("checked", i)
            }
        }
        ;
        try {
            l = new x(slug,defaultSettings)
        } catch (e) {
            alert("ERROR when loading settings for " + slug + ", err: " + e)
        }
        try {
            b = new x("site",window.defaultSiteSettings || {})
        } catch (e) {
            alert("ERROR when loading site-settings for " + slug + ", err: " + e)
        }
        if (window.siteSettings = b,
        window.players) {
            for (var D in players) {
                players[D].name !== players[D].defaultName && $("." + D + "-player-name").text(players[D].name);
                var M = players[D].code + ""
                  , E = M.match(/^\d+$/) ? M : M.charAt(2);
                $(".face-" + D + "-player.face-small").addClass("hair-" + E),
                $("#challenge-yourself .face-bottom-player").addClass("hair-" + E)
            }
            $("#temphidenames").remove()
        }
        $(".show-after-names").removeClass("show-after-names");
        var N = {};
        if (!function() {
            var e = document.location.search.replace(/\?/, "");
            if (e)
                for (var t = e.split("&"), n = 0; n < t.length; n++) {
                    var a = t[n].split("=")
                      , r = a[0]
                      , i = a[1];
                    r = s(window.settings || {}, r),
                    r = s(b, r),
                    i = c(i),
                    N[r] = i,
                    o(window.settings || {}, r, i),
                    o(b, r, i)
                }
            function s(e, t) {
                for (var n in e)
                    if (n.toLowerCase() == t.toLowerCase())
                        return n;
                return t
            }
            function o(e, t, n) {
                var a = e[t];
                if (void 0 !== a)
                    if ("boolean" != typeof a || "number" != typeof n) {
                        if (typeof a != typeof n)
                            throw "Incompatible types for " + t + ": " + typeof a + " and " + typeof n;
                        e[t] = n
                    } else
                        e[t] = !!n
            }
            function c(e) {
                if (void 0 === e)
                    return !0;
                if (e.match(/^\d+$/))
                    return parseInt(e);
                if ("true" == e)
                    return !0;
                if ("false" == e)
                    return !1;
                if (e.match(/,/)) {
                    for (var t = (e = e.replace(/,$/, "")).split(","), n = 0; n < t.length; n++)
                        t[n] = c(t[n]);
                    return t
                }
                return e
            }
        }(),
        "debug" === N.log && (m.level = "debug"),
        (location.hostname || "").match(/translat/) || N.translatecheck ? ($("#play-page").remove(),
        f.badDomain(),
        $("#board").append($("<div>", {
            id: "translate-proxy"
        }).html('We do not support playing the game on translation websites. You can read the translated rules below, but if you want to play the game please <a target="_top" href="https://cardgames.io/' + slug + "/?fromproxy=" + location.hostname + '">CLICK HERE</a> to open the real CardGames.io website.'))) : location.hostname && "cardgames.io" !== location.hostname && "dev.cardgames.io" !== location.hostname && "development.cardgames.io" !== location.hostname && !window.APP_MODE && (f.badDomain(),
        location.href = "https://cardgames.io"),
        N.fromproxy) {
            d("ProxyRedirect", "Game: " + category + ", Proxy: " + N.fromproxy);
            try {
                window.history.pushState("", document.title, location.pathname)
            } catch (e) {}
        }
        try {
            var P = !1;
            k += "ation",
            S += "tname",
            P = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
        } catch (e) {}
        function G(e, t) {
            return e.charAt(e.length - t)
        }
        var R = {
            canSetCookies: function() {
                var e = "test";
                return p(e, "value", 2, "/"),
                "value" == p(e) && (v(e),
                !0)
            },
            supportsSvg: P
        };
        if ("cribage" != window.slug)
            var O = C[k][S];
        var I = 5e3;
        o(function e() {
            if (c.isGameStarted()) {
                if (!R.canSetCookies())
                    return;
                m.debug("Logged visit");
                var t = p("cid") || function() {
                    for (var e = "", t = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", n = 0; n < 10; n++)
                        e += t.charAt(Math.floor(Math.random() * t.length));
                    return e
                }();
                p("cid", t, 365, "/");
                var n = "undefined" == typeof google && 0 === document.getElementsByTagName("iframe").length
                  , a = (navigator.userAgent || "").replace(/"/g, '\\"');
                f.visitors.post({
                    id: t,
                    userAgent: a,
                    adblock: n
                })
            } else
                o(e, I)
        }, I),
        APP_MODE && o(function() {
            var e = new Date;
            e.setUTCHours(0, 0, 0, 0);
            var t = e.getTime().toString();
            p("appversion") === t ? m.debug("Not logging version, already done it today") : (w("AppOpen", window.siteVersion + "" || "Unknown"),
            p("appversion", t, 1, "/"))
        }, 1e4);
        var _ = document.location.hash.match(/#logerrors=(\w+)/);
        if (_)
            !function() {
                try {
                    var e = document.location;
                    window.history && window.history.replaceState ? history.replaceState("", document.title, e.pathname + e.search) : document.location.hash = ""
                } catch (e) {}
            }(),
            p("logerrors", _[1], 1, "/");
        else if (!APP_MODE && ("." != G(O, 3) || "o" != G(O, 1)) && "9" != G(O, 12)) {
            O.replace(/^\w+/, "") != "#r!ud!s#i&".replace(/#/g, ".").replace("$", "e").replace(/!/g, "a").replace(/&/g, "s") && (T.random = function() {
                return 1.5
            }
            // ,
            // T.round = function() {
            //     return .22
            // }
            )
        }
        function H(e, t, n, a, r, i, s) {
            if (void 0 === s && (s = 0),
            "RummyError" !== i)
                try {
                    var o = "";
                    t && (o += t),
                    n && a && (o += "(" + n + "," + a + ") "),
                    o += e,
                    r && r.stack && (o += "\r\n\r\n" + r.stack),
                    m.error(o);
                    var c = location.pathname.split("/")[1] || ""
                      , u = JSON.parse(localStorage.errors || "[]");
                    10 <= u.length && u.shift(),
                    w("Error", o + "|| UserAgent: " + navigator.userAgent.replace(/Mozilla\/5\.0/, ""), n || 0);
                    var d = c + " " + new Date + ":\r\n\r\n " + (r && r.stack ? r.stack : e)
                      , l = d.split(/\r?\n/);
                    l = l.filter(function(e) {
                        return !e.match(/jquery-/)
                    });
                    for (var h = 0; h < l.length; h++)
                        l[h] = l[h].replace(/https?:\/\/(dev\.)?cardgames\.io(:\d+)?\/\w+/, "");
                    if (d = l.join("\r\n"),
                    u.push(d),
                    localStorage.setItem("errors", JSON.stringify(u)),
                    !i && !(i = p("logerrors")))
                        return;
                    m.debug("Sending error to server:\n " + o),
                    f.errors.log(i, c, o, null, null, s)
                } catch (e) {
                    m.error("Error in error handling: " + e)
                }
        }
        function U() {
            L.close()
        }
        window.logError = H,
        window.onerror || (window.onerror = H);
        var L = {
            open: function() {
                J(),
                $("#game-link-wrapper").addClass("has-transitions").get(0).scrollTop = 0,
                $("body").addClass("menu-open"),
                APP_MODE || $("#wrapper").css("height", $("#game-link-wrapper").height()),
                s(function() {
                    return $("#wrapper").on("click", U)
                }, 100),
                $("#mobile-menu").css("z-index", 9999999999)
            },
            close: function() {
                L.isOpen() && ($("body").removeClass("menu-open"),
                APP_MODE || $("#wrapper").css("height", "auto"),
                s(function() {
                    return $("#game-link-wrapper").removeClass("has-transitions")
                }, 300),
                window.scrollTo(0, 0),
                $("#wrapper").off("click", U))
            },
            toggle: function(e) {
                "touchstart" === e.type && (this.cancelClicks = !0),
                "click" === e.type && this.cancelClicks || (e.preventDefault(),
                L.isOpen() ? L.close() : L.open())
            },
            isOpen: function() {
                return $("body").hasClass("menu-open")
            }
        };
        function F() {
            window.scrollY ? p("scroll", scrollY) : void 0 === window.scrollY && window.pageYOffset && p("scroll", window.pageYOffset),
            p("reload", "1"),
            document.location.href = document.location.href.replace(/#.*/, "")
        }
        function z(e) {
            var t = $(this).find("input");
            if ($(this).hasClass("non-removable"))
                return e.preventDefault(),
                void e.stopPropagation();
            "A" === e.target.tagName && (e.preventDefault(),
            t.prop("checked", !t.prop("checked")));
            var n = t.attr("value");
            if (t.prop("checked")) {
                var a = $("<a/>", {
                    href: "/" + n.toLowerCase().replace(/\s*/g, "") + "/"
                }).html(n);
                $("#customizable-links").prepend(a),
                30 < $("#promo-mini").height() && (a.remove(),
                t.prop("checked", !1),
                alert("There is not enough space for this link. Please remove some other games first by unchecking them."))
            } else {
                var r = function(e) {
                    for (var t = $("#customizable-links a"), n = 0; n < t.length; n++)
                        if ($(t[n]).text() === e)
                            return t[n];
                    return null
                }(n);
                $(r).remove()
            }
            !function() {
                var e = [];
                $("#customizable-links a").each(function() {
                    e.push($(this).text())
                }),
                b.set("gameLinks", e.toString())
            }()
        }
        function B() {
            L.isCustomizing = !1,
            $("#game-link-wrapper").removeClass("customize-open"),
            $('#promo-links input[type="checkbox"]').remove(),
            $(".game-links a").each(function() {
                var e = $(this).text();
                $(this).text(e.replace(/^\s*|\s*$/g, "")),
                $(this).css("text-align", ""),
                $(this).off("click", z)
            }),
            $("#customize-menu").text("Customize..."),
            $("#close-menu").off("click", B)
        }
        function W(e, t) {
            var n = document.createElement("script");
            n.async = !0,
            n.src = e,
            n.onload = t;
            var a = document.getElementsByTagName("script")[0];
            return a.parentNode.insertBefore(n, a),
            n
        }
        $(function() {
            if ($("#mobile-menu").on("click touchstart", function(e) {
                if ($("body").hasClass("options-open"))
                    $("body").removeClass("options-open"),
                    e.preventDefault();
                else if ($("html").hasClass("appmode") && $("body").hasClass("rules-open"))
                    $("body").removeClass("rules-open"),
                    e.preventDefault();
                else if ($("html").hasClass("appmode") && $("body").hasClass("subview-open")) {
                    $("body").removeClass("subview-open statistics-subview-open avatars-subview-open");
                    var t = $("#title h1").data("real-title");
                    t && $("#title h1").text(t),
                    e.preventDefault()
                } else
                    L.toggle(e)
            }),
            $('a[href="#more-games"]').on("click", function(e) {
                J(),
                e.preventDefault(),
                L.open()
            }),
            $("#close-menu").on("click touchstart", function(e) {
                e.preventDefault(),
                L.close()
            }),
            APP_MODE)
                $('input[type="text"]').on("blur", function() {
                    0 !== document.documentElement.scrollTop && (document.documentElement.scrollTop = 0),
                    0 !== document.body.scrollTop && (document.body.scrollTop = 0)
                });
            else {
                $("#app-prompt a").on("click", function(e) {
                    var t = navigator.userAgent.match(/iPhone/i) ? "iPhoneAppLinkClick" : "AndroidAppLinkClick";
                    "no-thanks" === e.target.id ? (w(t, "No Thanks", 0, "", "", 1),
                    e.preventDefault()) : w(t, "Get App", 0, "", "", 1),
                    $("#app-prompt").slideUp()
                }),
                $("#fruit-monster-island a").on("click", function(e) {
                    var t, n = navigator.userAgent.match(/Android/i) ? "AndroidFruitPrompt" : "iOSFruitPrompt";
                    "no-fruit" === e.target.id ? (t = 0,
                    e.preventDefault()) : t = 1,
                    d(n, "", t),
                    $("#fruit-monster-island").slideUp()
                });
                var e = p(h);
                if (null !== e) {
                    var t = parseInt(e.split("_")[0]);
                    if (t && t + 31536e6 > (new Date).getTime()) {
                        o(function() {
                            return V.initialize()
                        }, 2e3),
                        $("html").addClass("gdpr-accepted");
                        var n = p(h).split("_")[2];
                        return -1 !== NON_GDPR_COUNTRES.indexOf(n) && $("html").addClass("non-gdpr-country"),
                        void (null === p("app_prompt") || APP_MODE ? function() {
                            p("androidprompt") && p("app_prompt", (new Date).getTime(), 4, "/");
                            try {
                                var e = navigator.userAgent
                                  , t = e.match(/Android (\d+)/i)
                                  , n = e.match(/iPhone OS (\d+)/)
                                  , a = e.match(/\biPad\b.* OS (\d+)/i)
                                  , r = t || n || a
                                  , i = "itms-apps://itunes.apple.com/app/apple-store/id1496007149";
                                if (null === p("app_prompt") && r) {
                                    var s = parseInt(r[1]);
                                    p("app_prompt", (new Date).getTime(), 4, "/"),
                                    a ? 12 <= s ? ($("#get-app, #app-icon").attr("href", i),
                                    w("iPadAppPrompt", s.toString(), 0, "", "", 1),
                                    $("#app-prompt").slideDown()) : w("iPadOldVersion", s.toString(), 0, "", "", 1) : n ? 12 <= s ? ($("#get-app, #app-icon").attr("href", i),
                                    w("iPhoneAppPrompt", s.toString(), 0, "", "", 1),
                                    $("#app-prompt").slideDown()) : w("iPhoneOldVersion", s.toString(), 0, "", "", 1) : t && (5 <= s ? ($("#get-app, #app-icon").attr("href", "market://details?id=io.cardgames.app"),
                                    w("AndroidAppPrompt", s.toString(), 0, "", "", 1),
                                    $("#app-prompt").slideDown()) : w("AndroidOldVersion", s.toString(), 0, "", "", 1))
                                }
                            } catch (e) {
                                w("AppPromptError", e.toString().substr(0, 200))
                            }
                        }() : function() {
                            try {
                                var e = navigator.userAgent
                                  , t = e.match(/Android (\d+)/i)
                                  , n = e.match(/iPhone OS (\d+)/)
                                  , a = e.match(/\biPad\b.* OS (\d+)/i)
                                  , r = t || n || a
                                  , i = parseInt(p("app_prompt"));
                                if ((new Date).getTime() - i < 18e4)
                                    return;
                                if (location.search.match(/gid=/))
                                    return;
                                if (null === p("fruit_prompt") && r) {
                                    var s = parseInt(r[1]);
                                    p("fruit_prompt", (new Date).getTime(), 30, "/"),
                                    a || n ? 10 <= s && ($("#get-fruit-monster-island").attr("href", "itms-apps://itunes.apple.com/app/apple-store/id1564432703?pt=118730957&ct=cardgames.io&mt=8"),
                                    $("#fruit-monster-island img").attr("src", "/shared/images/fruit-monster-island.png"),
                                    o(function() {
                                        return $("#fruit-monster-island").slideDown()
                                    }, 500)) : t && 7 <= s && ($("#get-fruit-monster-island").attr("href", "market://details?id=is.raudas.fruitmonsterisland"),
                                    $("#fruit-monster-island img").attr("src", "/shared/images/fruit-monster-island.png"),
                                    o(function() {
                                        return $("#fruit-monster-island").slideDown()
                                    }, 500))
                                }
                            } catch (e) {
                                d("FruitPromptError", e.toString().substr(0, 200))
                            }
                        }())
                    }
                    v(h),
                    b.set("acceptCookiesId", 0)
                }
                $.getJSON("http://cardgames.io/lambda/country").done(function(e) {
                    window.country = e.country,
                    -1 !== NON_GDPR_COUNTRES.indexOf(e.country) || !0 === navigator.standalone ? (p(h, (new Date).getTime() + "_true_" + e.country, 365, "/"),
                    o(function() {
                        return V.initialize()
                    }, 2e3),
                    $("html").addClass("gdpr-accepted").addClass("non-gdpr-country")) : o(function() {
                        return a(e.country)
                    }, 4e3)
                }).fail(function() {
                    return a("Unknown")
                })
            }
            function a(a) {
                $("#gdpr-notice").fadeIn(),
                $("#gdpr-agree").on("click", function(e) {
                    var t = $("#personalized-ads").is(":checked")
                      , n = (new Date).getTime();
                    p(h, n + "_" + t + "_" + a, 365, "/"),
                    e.preventDefault(),
                    $("#gdpr-notice").fadeOut(),
                    V.initialize(),
                    $("html").addClass("gdpr-accepted"),
                    d("GdprAccept", "", t ? 1 : 0),
                    f.gdpr.accept(t, navigator.userAgent, function(e) {
                        b.set("acceptCookiesId", e.acceptId)
                    }, function(e) {
                        m.error("Failed to save id of consent")
                    })
                })
            }
        }),
        window.NON_GDPR_COUNTRES = ["US", "CA", "AU"],
        !0 === navigator.standalone && $(document).on("click", "a", function(e) {
            var t = e.target.href;
            if (t && !t.match(/#/) && !t.match(/javascript:/)) {
                var n = location.protocol + "//" + location.host + "/";
                t.substr(0, n.length) === n && (e.preventDefault(),
                location.href = t)
            }
        }),
        $("#random-game").on("click", function() {
            var n = $('.game-links a[href^="/"]').toArray();
            r.shuffle(n);
            var a = 8;
            $("body").addClass("random-selection-process"),
            function e() {
                var t = n.pop();
                $(".random-highlight").removeClass("random-highlight"),
                $(t).addClass("random-highlight"),
                0 == --a ? ($(t).addClass("random-select"),
                o(function() {
                    return location.href = t.href
                }, 1e3)) : o(e, 450)
            }()
        }),
        window.facebookBorder = function(e) {
            devicePixelRatio;
            var t = Math.ceil(1200 / 630 * 800);
            $("#promo-links").remove(),
            $("#promo-mini").css("visibility", "hidden").css("height", "10px"),
            $("<div>").css({
                border: "solid 1px red",
                width: t,
                height: 800,
                position: "absolute",
                top: e || 0,
                left: Math.ceil(($(window).width() - t) / 2) - 1
            }).appendTo("body"),
            $(".underboard-message").css("visibility", "hidden"),
            $(".don-draper").remove(),
            $("#board-and-header").css("float", "none").css("margin", "auto")
        }
        ,
        $('a[href="#customize-menu"]').on("click", function(e) {
            if (e.preventDefault(),
            L.isCustomizing)
                confirm("Do you want to reset all the game links to their original state?") && (b.set("gameLinks", ""),
                F());
            else {
                L.isCustomizing = !0,
                $("#close-menu").on("click", B),
                $("#customize-menu").text("Reset links..."),
                $("#game-link-wrapper").addClass("customize-open");
                var n = {};
                $("#promo-mini a").each(function() {
                    n[$(this).text()] = this
                }),
                $(".game-links a").each(function() {
                    var e = $(this).text()
                      , t = $("<input/>", {
                        type: "checkbox",
                        value: e
                    });
                    e in n && t.attr("checked", "checked"),
                    $(this).hasClass("non-removable") && t.attr("disabled", "disabled"),
                    $(this).html(t.wrap("<div/>").parent().html() + " " + e).css("text-align", "left"),
                    $(this).on("click", z)
                })
            }
        }),
        $(".default-game-link").is(":visible") || $(".default-game-link").remove();
        var V = {
            type: showAds,
            adsAreReady: !1,
            initialize: function() {
                var e = this;
                if (!APP_MODE) {
                    var t = p("gdprconsent")
                      , n = !1;
                    if (t)
                        n = "true" === t.split("_")[1];
                    else
                        w("NoGdprCookie", navigator.userAgent + "\n" + document.cookie + "\n" + navigator.cookieEnabled);
                    var a = c(navigator.doNotTrack) || c(window.doNotTrack) || c(navigator.msDoNotTrack);
                    m.debug("ADS: Do not track is set: " + a),
                    this.requestPersonalized = n && !a,
                    "undefined" != typeof adsbygoogle && (adsbygoogle.requestNonPersonalizedAds = this.requestPersonalized ? 0 : 1,
                    m.debug("ADS: Set .requestNonPersonalizedAds to " + adsbygoogle.requestNonPersonalizedAds));
                    var r = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                      , i = "dev.cardgames.io" === location.hostname;
                    if ("none" !== this.type)
                        if (u() || b.alwaysUseInterstitialAds) {
                            0 === this.lastAdShown && (this.lastAdShown = (new Date).getTime() - 12e4),
                            $("ins.adslot_1, ins.adslot_2").remove(),
                            window.adsbygoogle = [];
                            var s = document.createElement("script");
                            s.async = !0,
                            s.src = r,
                            s.setAttribute("data-ad-client", "ca-pub-9002823967926225"),
                            s.setAttribute("data-ad-channel", window.customChannelId),
                            i && !N.realads && s.setAttribute("data-adbreak-test", "on"),
                            s.onload = function() {
                                m.debug("ADS: loaded script"),
                                adConfig({
                                    preloadAdBreaks: "on",
                                    sound: "off",
                                    onReady: function() {
                                        return e.adReady()
                                    }
                                })
                            }
                            ;
                            var o = document.getElementsByTagName("script")[0];
                            o.parentNode.insertBefore(s, o),
                            $("#draper-left, #draper-right").css("visibility", "hidden")
                        } else if ("adsense" === this.type) {
                            if (i && !N.ads)
                                return;
                            $(window).width() < 1354 && ($("ins.adslot_1").remove(),
                            adsbygoogle.pop()),
                            W(r)
                        }
                }
                function c(e) {
                    return "1" == e || !0 === e || "yes" == e
                }
            },
            trigger: function(e) {
                var t = this;
                if (APP_MODE) {
                    if (this.lastTrigger && (new Date).getTime() - this.lastTrigger < 300)
                        return void w("DoubleAdTrigger", "", 0, "", "", 1);
                    if (this.lastTrigger = (new Date).getTime(),
                    window.adCallback = function() {
                        console.log("APP: Got callback from native app"),
                        delete window.adCallback,
                        e()
                    }
                    ,
                    "undefined" != typeof Android)
                        console.log("APP: Sending ad message to Android..."),
                        window.Android.triggerAds();
                    else
                        try {
                            console.log("APP: Sending ad message to Swift..."),
                            window.webkit.messageHandlers.triggerAds.postMessage("TIME FOR SOME ADS")
                        } catch (e) {
                            if (!location.search.match(/appmode/))
                                throw e;
                            console.log("ARE IN SIMULATED APP MODE ON BROWSER, CALLING window.adCallback()"),
                            window.adCallback()
                        }
                } else {
                    if ("none" === this.type)
                        return m.debug("ADS: No ad triggered. Type=" + this.type),
                        void e();
                    if (!this.adsAreReady)
                        return m.debug("ADS: Ads API has not finished loading yet"),
                        void e();
                    var n = (new Date).getTime() - this.lastAdShown;
                    if (n < 24e4 && "immediate" !== N.ads)
                        return m.debug("ADS: Only " + n / 1e3 + " seconds since last ad was shown, not showing ad yet!"),
                        void e();
                    m.debug("ADS: Calling adBreak"),
                    this._callback === e && d("AdBreakSameCallback"),
                    this._callback = e,
                    this.testId && (d("AdBreakDoubleTrigger"),
                    clearTimeout(this.testId)),
                    this.testId = o(function() {
                        Array.prototype.slice.call(document.getElementsByTagName("iframe")).some(function(e) {
                            return $(e).is(":visible")
                        }) || d("AdBreakNoVisibleIframe", "Current time " + (new Date).toString() + "\n" + t.bf + "\n" + t.af + "\n" + t.abf)
                    }, 5e3),
                    adBreak({
                        type: "next",
                        name: "mobile-ads",
                        beforeAd: function() {
                            return t.beforeAd()
                        },
                        afterAd: function() {
                            return t.afterAd()
                        },
                        adBreakDone: function(e) {
                            return t.adBreakDone(e)
                        }
                    })
                }
            },
            get lastAdShown() {
                return parseInt(p("lastadshown")) || 0
            },
            set lastAdShown(e) {
                p("lastadshown", e, null, "/")
            },
            adReady: function() {
                m.debug("ADS: AdReady"),
                this.adsAreReady = !0
            },
            beforeAd: function() {
                m.debug("ADS: beforeAd called"),
                this.bf = "Before " + (new Date).toString()
            },
            afterAd: function() {
                m.debug("ADS: afterAd called"),
                this.af = "After " + (new Date).toString()
            },
            adBreakDone: function(e) {
                this.abf = "AdBreakDone: " + (new Date).toString(),
                m.debug("ADS: AdBreakDone: " + JSON.stringify(e, null, 2)),
                clearTimeout(this.testId),
                delete this.testId;
                var t = (new Date).getTime()
                  , n = this.lastAdShown;
                "viewed" === e.breakStatus && (this.lastAdShown = t,
                0 < n && d("AdIntervalManual", Math.round((t - n) / 1e3).toString()));
                var a = this._callback;
                delete this._callback,
                d("AdBreakDone", e.breakStatus),
                a && a()
            }
        };
        function J() {
            window.confettiEffect && (confettiEffect.stop(),
            $(".confetti-container").remove(),
            $("body").removeClass("confetti"),
            delete window.confettiEffect)
        }
        t.exports = {
            qs: N,
            cake: p,
            preloadBackgroundImage: function(e) {
                var t = $("<div/>");
                t.css("background-image", "url(" + e + ")").css("width", "1px").appendTo("body"),
                o(function() {
                    return t.remove()
                }, 50)
            },
            preloadBackgroundImageClass: function(e) {
                var t = $("<div/>");
                t.addClass(e).appendTo("body"),
                o(function() {
                    return t.remove()
                }, 50)
            },
            isEmojiValid: function(e) {
                return !0
            },
            ads: V,
            parseUserAgent: function(e) {
                e = e || navigator.userAgent;
                for (var t = {
                    browser: "Unknown",
                    os: "Unknown",
                    version: 0
                }, n = ["Windows", "Macintosh", "Android", "Linux", "iPhone", "iPad"], a = ["Opera", "Chrome", "Firefox", "Mobile Safari", "Safari", "MSIE"], r = 0; r < n.length; r++) {
                    if (new RegExp("\\b" + n[r] + "\\b","i").exec(e)) {
                        t.os = n[r];
                        break
                    }
                }
                for (var i = 0; i < a.length; i++) {
                    var s = new RegExp("\\b(" + a[i] + ")(?:/| )(\\d+)","i").exec(e);
                    if (s) {
                        t.browser = a[i],
                        "MSIE" == t.browser && (t.browser = "Internet Explorer");
                        var o = /\bVersion\/(\d+)\b/i.exec(e);
                        t.version = o ? parseInt(o[1]) : parseInt(s[2]);
                        break
                    }
                }
                return t
            },
            valentines: function(e) {
                try {
                    if (!($("#top-player").is(":visible") && $("#left-player").is(":visible") && $("#right-player").is(":visible")))
                        return;
                    if ("Bill" !== players.top.name || "Lisa" !== players.right.name)
                        return;
                    $("html").hasClass("valentines") && ($(".bubble p span").css("font-size", "12px"),
                    o(function() {
                        $("#top-player-bubble p span").text("Happy Valentine's day Lisa! ❤️️️️️️️❤️"),
                        $("#top-player-bubble").fadeIn()
                    }, 1500),
                    o(function() {
                        $("#right-player-bubble p span").text("😍️️").css("font-size", "40px"),
                        $("#right-player-bubble").fadeIn()
                    }, 3500),
                    o(function() {
                        $("#left-player-bubble p span").text("Enough already, let's play " + e + "!"),
                        $("#left-player-bubble").fadeIn()
                    }, 5500),
                    o(function() {
                        $(".bubble").hide(),
                        $(".bubble p span").css("font-size", "")
                    }, 9e3))
                } catch (e) {
                    w("ValentinesError", e.toString(), 0, "", "", 1)
                }
            },
            getFaceUrl: function(e, t) {
                if (e.toString().match(/^\d\d?$/))
                    return t ? "../shared/images/svg/face-" + e + "-sad.svg" : "/shared/images/svg/face-" + e + ".svg";
                var n = "https://cardgames.io/lambda/faces/" + e;
                return t && (n += "/sad"),
                n
            },
            getHairClass: function(e) {
                return e.length <= 2 ? "hair-" + e : "hair-" + e.charAt(2)
            },
            siteSettings: b,
            settings: l,
            browser: R,
            preloadImage: function(e) {
                if (!y[e]) {
                    var t = new Image;
                    t.src = e,
                    t.onload = function() {}
                    ,
                    t.onerror = function() {}
                    ,
                    y[e] = t
                }
            },
            trackEvent: w,
            forceTrackEvent: d,
            reloadPage: F,
            deleteCake: v,
            showConfetti: function() {
                b.confetti && W("/shared/effects/" + siteVersion + "/confetti.min.js", function() {
                    var e = $("<div>", {
                        "class": "confetti-container"
                    }).appendTo("html")
                      , t = u() || navigator.userAgent.match(/iPhone/);
                    window.confettiEffect = new Confetti(e.get(0),t ? 250 : 800),
                    confettiEffect.start(),
                    $("body").addClass("confetti"),
                    $(".confetti-container").on("click", J)
                })
            },
            removeConfetti: J,
            logError: H,
            mobileMenu: L,
            isMobileLookActive: u,
            GDPR_CONSENT_COOKIE: h,
            isDev: function() {
                return window.location.href.includes("dev.cardgames.io")
            }
        }
    }
    , {
        "./api": 1,
        "./gamecontrol": 5,
        "./helper-functions": 6
    }],
    15: [function(e, t, n) {
        "use strict";
        function r(e, t) {
            e.prototype = Object.create(t.prototype),
            (e.prototype.constructor = e).__proto__ = t
        }
        var a = e("../shared/solitaires/solitaire-game")
          , s = e("../shared/solitaires/solitairecard")
          , i = e("../shared/api")
          , o = e("../shared/solitaires/containers")
          , c = o.Tableau
          , u = o.Foundation
          , d = o.Stock
          , l = e("../shared/util").settings
          , h = e("../shared/gamecontrol")
          , m = e("../shared/statistics")
          , f = e("../shared/util")
          , p = e("../shared/helper-functions").captainsLog
          , g = "s"
          , v = function(t) {
            function e() {
                var e;
                return (e = t.call(this, "spidersolitaire") || this).deckCount = 2,
                e.saveRecords = !0,
                e.suitCount = l.suits,
                e.score = 500,
                e.moves = 0,
                e.clearTable(),
                e.TABLEAU_COUNT = 10,
                e.config.widestStackCount = e.TABLEAU_COUNT,
                e.resetGameIfKeyChangesBeforeGameStart("suits"),
                e
            }
            r(e, t);
            var n = e.prototype;
            return n.clearTable = function() {
                $(".cell").remove(),
                this.tableau = [],
                this.foundations = [],
                this.containers = [],
                this.undoStack = [],
                this.stock = null,
                this.score = 500,
                this.suitCount = l.suits,
                this.updateScore()
            }
            ,
            n.calculatePositions = function() {
                var e = this.config;
                e.stockPos = {
                    left: Math.round((e.tableSize.width - this.stackWidth(this.TABLEAU_COUNT)) / 2),
                    top: 30
                },
                e.tableauPos = {
                    left: e.stockPos.left,
                    top: e.stockPos.top + Math.round(1.9 * e.cardSize.height)
                },
                e.foundationPos = {
                    left: e.tableauPos.left + 2 * e.paddedWidth,
                    top: e.stockPos.top
                },
                this.isMobileVersion() && window.matchMedia && matchMedia("(orientation: landscape)").matches && (e.tableauPos.top = e.stockPos.top + Math.round(1.2 * e.cardSize.height)),
                e.faceDownCardMarginTop = this.percentOfCardHeight(.11),
                e.faceUpCardMarginTop = this.percentOfCardHeight(.26)
            }
            ,
            n.updatePositions = function() {
                var e = this.config;
                this.updateListOfContainers(this.tableau, e.tableauPos.top, e.tableauPos.left),
                this.updateListOfContainers(this.foundations, e.foundationPos.top, e.foundationPos.left),
                this.stock.moveTo(e.stockPos.top, e.stockPos.left),
                this.updateCellAndCardSizes(),
                this.updateMessageBoxPosition()
            }
            ,
            n.updateMessageBoxPosition = function() {
                var e = this.config;
                this.isMobileVersion() ? $("#messageBox").css("top", e.foundationPos.top + e.cardSize.height).css("height", this.percentOfCardHeight(.8)) : $("#messageBox").css("top", 116).css("height", 30)
            }
            ,
            n.setupTable = function() {
                this.setupStock(),
                this.setupTableau(),
                this.setupFoundations(),
                this.updateCellAndCardSizes(),
                this.updateMessageBoxPosition(),
                $(".game-nr").text("#" + this.gameNumber)
            }
            ,
            n.createDeck = function() {
                this.deck = [];
                var e = "h"
                  , t = g
                  , n = "d"
                  , a = "c";
                1 === this.suitCount ? a = n = t = e = g : 2 === this.suitCount && (n = "h",
                a = g);
                for (var r = 0; r < this.deckCount; r++)
                    for (var i = 1; i <= 13; i++)
                        this.deck.push(new s(e,i)),
                        this.deck.push(new s(t,i)),
                        this.deck.push(new s(n,i)),
                        this.deck.push(new s(a,i));
                this.shuffle(),
                this.createDeckElements()
            }
            ,
            n.getSpriteCardsFilename = function() {
                return "normalcards-65px"
            }
            ,
            n.setupTableau = function() {
                for (var e = this.config, t = 0; t < this.TABLEAU_COUNT; t++) {
                    var n = new b(e.tableauPos.top,e.tableauPos.left + t * e.paddedWidth);
                    $(n.element).addClass("hide-win"),
                    this.tableau.push(n),
                    this.containers.push(n),
                    n.id = "T" + t
                }
                for (var a = 0; a < 54; a++) {
                    var r = this.stock.cards.pop();
                    r.faceUp = !1,
                    this.tableau[a % this.TABLEAU_COUNT].addCards([r])
                }
                var i = this.tableau
                  , s = Array.isArray(i)
                  , o = 0;
                for (i = s ? i : i[Symbol.iterator](); ; ) {
                    var c;
                    if (s) {
                        if (o >= i.length)
                            break;
                        c = i[o++]
                    } else {
                        if ((o = i.next()).done)
                            break;
                        c = o.value
                    }
                    c.last().faceUp = !0
                }
            }
            ,
            n.checkForRecord = function() {
                var e = -this.score;
                this.saveResults(0, e);
                var t = this.currentRecord;
                if (t) {
                    var n = "";
                    return null === t.result ? (n = "Congratulations, you are the first person to win game #" + this.gameNumber + "!",
                    f.trackEvent("NewRecord", "WinFirstEver", this.gameNumber)) : t.moves > e ? (n = "Congratulations, you won game #" + this.gameNumber + " with a higher score than anyone has before. Your score was " + this.score + ", the old record score was " + -t.moves + "!",
                    f.trackEvent("NewRecord", "WinFewerMoves", this.gameNumber)) : t.moves === e && (n = "Congratulations, you won game #" + this.gameNumber + " with a score of " + this.score + ". That is equal to the current record!"),
                    n ? (this.handleRecord(),
                    $("#win-record").text(n).show(),
                    !0) : ($("#win-record").hide(),
                    !1)
                }
                return !1
            }
            ,
            n.saveStats = function() {
                if (this.statsSaved)
                    p.debug("Stats already saved, not saving");
                else {
                    this.statsSaved = !0;
                    var e = this.lastMoveTime - this.startTime - window.pauseTime
                      , t = 0
                      , n = 0
                      , a = 0
                      , r = this.currentRecord;
                    r && (null === r.result || 0 < r.result ? t = 1 : r.moves > -this.score && (n = 1),
                    r.moves == -this.score && (a = 1));
                    var i = {
                        id: this.getVariantName(),
                        stats: {
                            result: "win",
                            score: this.score || 0,
                            moveCount: this.moves,
                            maximumMoveCount: this.moves,
                            minimumMoveCount: this.moves,
                            timeSpent: e,
                            maximumTime: e,
                            minimumTime: e,
                            undoCount: this.undos,
                            maximumUndoCount: this.undos,
                            minimumUndoCount: this.undos,
                            firstToWinCount: t,
                            brokenRecordCount: n,
                            tiedCurrentRecordCount: a
                        }
                    };
                    m.finishGame([i], e)
                }
            }
            ,
            n.setupFoundations = function() {
                var e = this.config
                  , t = ["h", g, "d", "c"];
                2 === this.suitCount ? t = ["h", g] : 1 === this.suitCount && (t = [g]);
                for (var n = 0; n < 4 * this.deckCount; n++) {
                    var a = new y(e.foundationPos.top,e.foundationPos.left + n * e.paddedWidth,t[n % t.length]);
                    this.foundations.push(a),
                    this.containers.push(a),
                    a.id = "F" + n
                }
            }
            ,
            n.updateGameResultInfo = function() {
                var n = this;
                i.numberedGames.getGame(this.gameNumber, this.slug, this.getVariantName(), function(e) {
                    var t;
                    t = null === e.bestResult ? "This game has never been won before." : "Best result for this game is winning with " + -e.minMovesForBestResult + " points.",
                    $(".current-record").text(t),
                    n.currentRecord = {
                        result: e.bestResult,
                        moves: e.minMovesForBestResult
                    }
                }, function(e) {
                    p.debug("fetching record error", e),
                    $(".current-record").text("We can not find the record for this game. Are you sure you're connected to the internet?")
                })
            }
            ,
            n.afterRender = function() {
                var n = this;
                try {
                    if (0 < this.stock.cards.length)
                        for (var e = 0, t = 0; t < this.stock.cards.length; t++) {
                            var a = this.stock.cards[t]
                              , r = parseInt($(a.guiCard).css("z-index"));
                            r <= e ? $(a.guiCard).css("z-index", ++e) : e = r
                        }
                } catch (e) {}
                if (this.isFinished())
                    h.finishGame(),
                    this.win();
                else {
                    var i = this.tableau.filter(function(e) {
                        return e.hasFullRun()
                    })[0];
                    if (i) {
                        var s = i.cards.splice(i.cards.length - 13, 13)
                          , o = this.foundations.filter(function(e) {
                            return e.isEmpty() && e.suit === s[0].suit
                        })[0];
                        s.reverse();
                        this.rendering = !0,
                        function e() {
                            if (0 === s.length)
                                n.calculateAndSetNewTableHeight(),
                                n.setCardCursors(),
                                n.rendering = !1,
                                n.score += 100,
                                n.updateScore(),
                                n.undoStack[n.undoStack.length - 1].isFullRun = !0,
                                n.afterRender();
                            else {
                                var t = s.splice(0, 1)[0];
                                o.addCards([t]),
                                n.render(!1, e)
                            }
                        }()
                    } else
                        this.play()
                }
            }
            ,
            n.setupStock = function() {
                this.stock = new w(this.config.stockPos.top,this.config.stockPos.left),
                this.stock.id = "S",
                this.containers.push(this.stock),
                this.stock.addCards(this.deck)
            }
            ,
            n.touchStart = function(e, t) {
                t.preventDefault(),
                e === this.stock.topCard() || e.container.canFlipCard(e) ? this.click(e) : this.mouseDown(e, t.touches[0].pageX, t.touches[0].pageY)
            }
            ,
            n.play = function() {
                this.rendering = !1
            }
            ,
            n.doMove = function() {
                this.score--,
                this.moves++,
                this.lastMoveTime = (new Date).getTime(),
                h.isGameStarted() || (m.startGame([{
                    id: this.getVariantName()
                }]),
                this.loseNumberedGame(this.gameNumber),
                f.trackEvent("StartGame", this.getVariantName()),
                h.startGame()),
                this.updateScore()
            }
            ,
            n.updateScore = function() {
                $("#score").text("Score: " + this.score)
            }
            ,
            n.undoMove = function(e) {
                this.score++,
                this.moves++,
                this.undos++,
                e.isFullRun && (this.score -= 100),
                this.updateScore()
            }
            ,
            n.mouseEnter = function(e) {
                e === this.stock.topCard() && this.tableau.some(function(e) {
                    return e.isEmpty()
                }) && this.message("There must be at least one card in each place before you can get cards from the stock!"),
                e.container.id.match(/T/) && e.container.isOrdered(e) && !e.container.isInSuit(e) && this.message("You can only move multiple cards if they're ordered AND all in the same suit!")
            }
            ,
            n.mouseLeave = function() {
                this.message("")
            }
            ,
            n.getMinTableHeight = function() {
                var e = this.config;
                if (this.isMobileVersion()) {
                    var t = e.tableauPos.top + 2.4 * e.cardSize.height + $("#undo").height()
                      , n = window.innerHeight - $("#header").height();
                    return Math.min(Math.ceil(Math.max(t, n)), this.MAX_MOBILE_BOARD_HEIGHT)
                }
                return 600
            }
            ,
            n.click = function(e) {
                var a = this;
                if (!this.rendering) {
                    if (e === this.stock.topCard()) {
                        if (this.tableau.some(function(e) {
                            return e.isEmpty()
                        }))
                            return;
                        var r = 0;
                        this.rendering = !0,
                        this.pushUndoState(!0),
                        function e() {
                            var t = a.tableau[r];
                            if (t) {
                                r++;
                                var n = a.stock.topCard();
                                n.faceUp = !0,
                                t.addCards([n]),
                                a.render(!1, e)
                            } else
                                a.calculateAndSetNewTableHeight(),
                                a.setCardCursors(),
                                a.afterRender()
                        }(),
                        this.doMove()
                        return;
                    }
                    e.container.canFlipCard(e) && (this.pushUndoState(),
                    e.faceUp = !e.faceUp,
                    this.render())
                }
                // Code to add one click functionality
                if (e.faceUp && !this.clickCards && !this.movingCards) {
                    if (e.container.canDragCard(e)) {
                        this.clickCards = e.container.getClickCards(e);
                        this.activeCard = e.guiCard;
                        var t = this.activeCard;
                        $(t).addClass("glow")
                    }
                } else if (e.faceUp && this.clickCards && !this.movingCards){
                    if (e.container.canDropCards(this.clickCards)){
                        this.moveCards(this.clickCards, e.container);
                    }
                    this.clickCards = null;
                    var t = this.activeCard;
                    $(t).removeClass("glow");
                    this.activeCard = null;
                }
            }
            ,
            n.isFinished = function() {
                return this.tableau.every(function(e) {
                    return e.isEmpty()
                }) && this.stock.isEmpty()
            }
            ,
            n.getVariantName = function() {
                return this.suitCount + " suits"
            }
            ,
            n.almostFinished = function() {
                this.pushUndoState(!0);
                var e = {
                    T0: "S13;S12;S11;S10;S9;S8;S7;S6;S5;S4;S3;S2;H1",
                    T1: "S13;S12;S11;S10;S9;S8;S7;S6;S5;S4;S3;S2;H1",
                    T2: "C13;C12;C11;C10;C9;C8;C7;C6;C5;C4;C3;C2;D1",
                    T3: "C13;C12;C11;C10;C9;C8;C7;C6;C5;C4;C3;C2;D1",
                    T4: "H13;H12;H11;H10;H9;H8;H7;H6;H5;H4;H3;H2;S1",
                    T5: "H13;H12;H11;H10;H9;H8;H7;H6;H5;H4;H3;H2;S1",
                    T6: "D13;D12;D11;D10;D9;D8;D7;D6;D5;D4;D3;D2;C1",
                    T7: "D13;D12;D11;D10;D9;D8;D7;D6;D5;D4;D3;D2;C1",
                    moves: 6
                };
                if (this.suitCount < 4)
                    for (var t in e) {
                        var n = e[t];
                        "string" == typeof n && (1 === this.suitCount ? e[t] = n.replace(/C|H|D/g, "S") : e[t] = n.replace(/C/g, "S").replace(/D/g, "H"))
                    }
                this.timing.animationSpeed = 50,
                this.loadState(e)
            }
            ,
            e
        }(a)
          , w = function(n) {
            function e(e, t) {
                return n.call(this, e, t) || this
            }
            r(e, n);
            var t = e.prototype;
            return t.canFlipCard = function() {
                return !1
            }
            ,
            t.createElement = function() {
                return document.createElement("div")
            }
            ,
            e
        }(d)
          , b = function(n) {
            function e(e, t) {
                return n.call(this, e, t, !1) || this
            }
            r(e, n);
            var t = e.prototype;
            return t.canDropCards = function(e) {
                if (this.isEmpty())
                    return !0;
                if (this.topCard().faceUp) {
                    var t = e[0]
                      , n = this.topCard();
                    return t.rank === n.rank - 1
                }
                return !1
            }
            ,
            t.isOrdered = function(e) {
                var t = this.cards.indexOf(e);
                if (-1 === t || !e.faceUp)
                    return !1;
                for (var n = t + 1; n < this.cards.length; n++) {
                    var a = this.cards[n]
                      , r = this.cards[n - 1];
                    if (a.rank !== r.rank - 1)
                        return !1
                }
                return !0
            }
            ,
            t.isInSuit = function(e) {
                var t = this.cards.indexOf(e);
                if (-1 === t || !e.faceUp)
                    return !1;
                for (var n = t + 1; n < this.cards.length; n++) {
                    if (this.cards[n].suit !== e.suit)
                        return !1
                }
                return !0
            }
            ,
            t.canDragCard = function(e) {
                return this.isInSuit(e) && this.isOrdered(e)
            }
            ,
            t.hasFullRun = function() {
                if (this.cards.length < 13)
                    return !1;
                for (var e = this.topCard().suit, t = 1; t <= 13; t++) {
                    var n = this.cards[this.cards.length - t];
                    if (!n.faceUp || n.rank !== t || n.suit !== e)
                        return !1
                }
                return !0
            }
            ,
            t.calculatePositions = function(e) {
                for (var t = this.pos.top, n = 0; n < this.cards.length; n++) {
                    var a = this.cards[n];
                    a.left = this.pos.left,
                    a.top = t,
                    a.faceUp ? t += e.faceUpCardMarginTop : t += e.faceDownCardMarginTop
                }
            }
            ,
            e
        }(c)
          , y = function(a) {
            function e(e, t, n) {
                return a.call(this, e, t, n) || this
            }
            r(e, a);
            var t = e.prototype;
            return t.canDropCards = function() {
                return !1
            }
            ,
            t.canDragCard = function() {
                return !1
            }
            ,
            e
        }(u);
        $(document).ready(function() {
            window.spider = new v,
            spider.start(),
            l.showSpiders ? $(".spider").css("display", "inline-block") : ($(".spider").hide(),
            $("#large-spider").remove())
        })
    }
    , {
        "../shared/api": 1,
        "../shared/gamecontrol": 5,
        "../shared/helper-functions": 6,
        "../shared/solitaires/containers": 8,
        "../shared/solitaires/solitaire-game": 9,
        "../shared/solitaires/solitairecard": 10,
        "../shared/statistics": 12,
        "../shared/util": 14
    }]
}, {}, [15]);
