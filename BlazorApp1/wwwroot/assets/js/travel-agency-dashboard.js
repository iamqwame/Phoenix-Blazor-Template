(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
        factory();
})((function () {
    'use strict';

    const {
        merge: merge
    } = window._;
    const echartSetOption = (e, t, o, r) => {
        const {
            breakpoints: a,
            resize: n
        } = window.phoenix.utils, s = t => {
            Object.keys(t).forEach((o => {
                window.innerWidth > a[o] && e.setOption(t[o]);
            }));
        }, i = document.body;
        e.setOption(merge(o(), t));
        const c = document.querySelector(".navbar-vertical-toggle");
        c && c.addEventListener("navbar.vertical.toggle", (() => {
            e.resize(), r && s(r);
        })), n((() => {
            e.resize(), r && s(r);
        })), r && s(r), i.addEventListener("clickControl", (({
            detail: {
                control: a
            }
        }) => {
            "phoenixTheme" === a && e.setOption(window._.merge(o(), t)), r && s(r);
        }));
    };
    const echartTabs = document.querySelectorAll("[data-tab-has-echarts]");
    echartTabs && echartTabs.forEach((e => {
        e.addEventListener("shown.bs.tab", (e => {
            const t = e.target,
                {
                    hash: o
                } = t,
                r = o || t.dataset.bsTarget,
                a = document.getElementById(r.substring(1))?.querySelector("[data-echart-tab]");
            a && window.echarts.init(a).resize();
        }));
    }));
    const tooltipFormatter = (e, t = "MMM DD") => {
        let o = "";
        return e.forEach((e => {
            o += `<div class='ms-1'>\n        <h6 class="text-body-tertiary"><span class="fas fa-circle me-1 fs-10" style="color:${e.borderColor ? e.borderColor : e.color}"></span>\n          ${e.seriesName} : ${"object" == typeof e.value ? e.value[1] : e.value}\n        </h6>\n      </div>`;
        })), `<div>\n            <p class='mb-2 text-body-tertiary'>\n              ${window.dayjs(e[0].axisValue).isValid() ? window.dayjs(e[0].axisValue).format(t) : e[0].axisValue}\n            </p>\n            ${o}\n          </div>`
    };
    const handleTooltipPosition = ([e, , t, , o]) => {
        if (window.innerWidth <= 540) {
            const r = t.offsetHeight,
                a = {
                    top: e[1] - r - 20
                };
            return a[e[0] < o.viewSize[0] / 2 ? "left" : "right"] = 5, a
        }
        return null
    };

    const bookingValueChartInit = () => {
        const {
            getColor: o,
            getData: t,
            getDates: e
        } = window.phoenix.utils, a = document.querySelector(".echart-booking-value");
        if (a) {
            const i = t(a, "echarts"),
                r = window.echarts.init(a);
            echartSetOption(r, i, (() => ({
                tooltip: {
                    trigger: "axis",
                    padding: 10,
                    backgroundColor: o("body-highlight-bg"),
                    borderColor: o("border-color"),
                    textStyle: {
                        color: o("light-text-emphasis")
                    },
                    borderWidth: 1,
                    transitionDuration: 0,
                    axisPointer: {
                        type: "none"
                    },
                    formatter: o => (o => {
                        const t = window.dayjs(o[0].axisValue),
                            e = window.dayjs(o[0].axisValue).subtract(1, "month"),
                            a = o.map(((o, a) => ({
                                value: o.value,
                                date: a > 0 ? e : t,
                                color: o.color
                            })));
                        let i = "";
                        return a.forEach(((o, t) => {
                            i += `<h6 class="fs-9 ${t > 0 && "mb-0"}"><span class="fas fa-circle me-2" style="color:${o.color}"></span>\n      ${o.date.format("MMM DD")} : <span class="fw-normal">${o.value}</span>\n    </h6>`;
                        })), `<div class='ms-1'>\n              ${i}\n            </div>`
                    })(o),
                    extraCssText: "z-index: 1000"
                },
                xAxis: [{
                    type: "category",
                    data: e(new Date("11/1/2023"), new Date("11/7/2023"), 864e5),
                    show: !0,
                    boundaryGap: !1,
                    axisLine: {
                        show: !0,
                        lineStyle: {
                            color: o("secondary-bg")
                        }
                    },
                    axisTick: {
                        show: !1
                    },
                    axisLabel: {
                        formatter: o => window.dayjs(o).format("DD MMM"),
                        showMinLabel: !0,
                        showMaxLabel: !1,
                        color: o("secondary-color"),
                        align: "left",
                        interval: 5,
                        fontFamily: "Nunito Sans",
                        fontWeight: 600,
                        fontSize: 12.8
                    }
                }],
                yAxis: {
                    show: !1,
                    type: "value",
                    boundaryGap: !1
                },
                series: [{
                    type: "line",
                    data: [150, 100, 300, 200, 250, 180, 250],
                    showSymbol: !1,
                    symbol: "circle",
                    lineStyle: {
                        width: 2,
                        color: o("warning")
                    },
                    emphasis: {
                        lineStyle: {
                            color: o("warning")
                        }
                    },
                    itemStyle: {
                        color: o("warning")
                    },
                    zlevel: 1
                }],
                grid: {
                    left: 5,
                    right: 5,
                    top: 5,
                    bottom: 0
                }
            })));
        }
    };

    const {
        echarts: echarts$2
    } = window, bookingsChartInit = () => {
        const {
            getColor: t,
            getData: o,
            getPastDates: e,
            getItemFromStore: i,
            rgbaColor: r
        } = window.phoenix.utils, a = document.querySelector(".echart-bookings"), n = [
            [3500, 2500, 2600, 3400, 2300, 3200, 2800, 2800],
            [2736, 3874, 4192, 1948, 3567, 4821, 2315, 3986],
            [2789, 3895, 2147, 4658, 1723, 3210, 4386, 1974]
        ], l = [
            [-1500, -2700, -1100, -1400, -1600, -1400, -1100, -2700],
            [-3874, -2631, -4422, -1765, -3198, -4910, -2087, -4675],
            [-2789, -3895, -2147, -4658, -1723, -3210, -4386, -1974]
        ];
        if (a) {
            const s = o(a, "echarts"),
                c = echarts$2.init(a);
            echartSetOption(c, s, (() => ({
                color: t("body-highlight-bg"),
                legend: {
                    data: ["Fulfilled", "Cancelled"],
                    itemWidth: 16,
                    itemHeight: 16,
                    icon: "circle",
                    itemGap: 32,
                    left: 0,
                    inactiveColor: t("quaternary-color"),
                    textStyle: {
                        color: t("secondary-color"),
                        fontWeight: 600,
                        fontFamily: "Nunito Sans"
                    }
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "none"
                    },
                    padding: [7, 10],
                    backgroundColor: t("body-highlight-bg"),
                    borderColor: t("border-color"),
                    textStyle: {
                        color: t("light-text-emphasis")
                    },
                    borderWidth: 1,
                    transitionDuration: 0,
                    position: (...t) => handleTooltipPosition(t),
                    formatter: t => tooltipFormatter(t),
                    extraCssText: "z-index: 1000"
                },
                xAxis: {
                    type: "category",
                    axisLabel: {
                        color: t("secondary-text-emphasis"),
                        formatter: t => window.dayjs(t).format("MMM DD"),
                        fontFamily: "Nunito Sans",
                        fontWeight: 600,
                        fontSize: 12.8
                    },
                    data: e(8),
                    axisLine: {
                        lineStyle: {
                            color: t("border-color-translucent")
                        }
                    },
                    axisTick: !1
                },
                yAxis: {
                    axisLabel: {
                        color: t("body-color"),
                        formatter: t => `${Math.abs(Math.round(t / 1e3))}K`,
                        fontWeight: 700,
                        fontFamily: "Nunito Sans"
                    },
                    splitLine: {
                        interval: 10,
                        lineStyle: {
                            color: t("border-color-translucent")
                        }
                    }
                },
                series: [{
                    name: "Fulfilled",
                    type: "bar",
                    stack: "one",
                    data: n[0],
                    barWidth: "27%",
                    itemStyle: {
                        borderRadius: [4, 4, 0, 0],
                        color: "dark" === i("phoenixTheme") ? t("info") : t("info-light")
                    }
                }, {
                    name: "Cancelled",
                    type: "bar",
                    stack: "one",
                    barWidth: "27%",
                    data: l[0],
                    itemStyle: {
                        borderRadius: [0, 0, 4, 4],
                        color: "dark" === i("phoenixTheme") ? r(t("info"), .5) : t("info-lighter")
                    }
                }],
                grid: {
                    left: 0,
                    right: 8,
                    top: 52,
                    bottom: 0,
                    containLabel: !0
                }
            })));
            const d = document.querySelector("[data-booking-options]");
            d && d.addEventListener("change", (t => {
                const {
                    value: o
                } = t.currentTarget, e = n[o], i = l[o];
                c.setOption({
                    series: [{
                        data: e
                    }, {
                        data: i
                    }]
                });
            }));
        }
    };

    const cancelBookingChartInit = () => {
        const {
            getColor: t,
            getData: o,
            getDates: e,
            getItemFromStore: i
        } = window.phoenix.utils, r = document.querySelector(".chart-cancel-booking");
        if (r) {
            const a = o(r, "echarts"),
                n = window.echarts.init(r);
            echartSetOption(n, a, (() => ({
                color: t("primary"),
                tooltip: {
                    trigger: "item",
                    padding: [7, 10],
                    backgroundColor: t("body-highlight-bg"),
                    borderColor: t("border-color"),
                    textStyle: {
                        color: t("light-text-emphasis")
                    },
                    position: (...t) => handleTooltipPosition(t),
                    borderWidth: 1,
                    transitionDuration: 0,
                    formatter: t => `<strong>${window.dayjs(t.name).format("DD MMM")}:</strong> ${t.value}`,
                    extraCssText: "z-index: 1000"
                },
                xAxis: {
                    type: "category",
                    data: e(new Date("11/1/2023"), new Date("11/6/2023"), 864e5)
                },
                yAxis: {
                    show: !1
                },
                series: [{
                    type: "bar",
                    barWidth: 3,
                    data: [120, 150, 100, 120, 110, 160],
                    symbol: "none",
                    itemStyle: {
                        borderRadius: [.5, .5, 0, 0],
                        colos: "dark" === i("phoenixTheme") ? t("info") : t("info-light")
                    }
                }],
                grid: {
                    right: 5,
                    left: 0,
                    bottom: 0,
                    top: 0
                }
            })));
        }
    };

    const {
        echarts: echarts$1
    } = window, commissionChartInit = () => {
        const {
            getData: o,
            getColor: t
        } = window.phoenix.utils, i = document.querySelector(".echart-commission");
        if (i) {
            const e = o(i, "options"),
                r = echarts$1.init(i);
            echartSetOption(r, e, (() => ({
                tooltip: {
                    trigger: "item",
                    padding: [7, 10],
                    backgroundColor: t("body-highlight-bg"),
                    borderColor: t("border-color"),
                    textStyle: {
                        color: t("light-text-emphasis")
                    },
                    borderWidth: 1,
                    position: (...o) => handleTooltipPosition(o),
                    transitionDuration: 0,
                    formatter: o => `<strong>${o.seriesName}:</strong> ${o.value}%`,
                    extraCssText: "z-index: 1000"
                },
                series: [{
                    type: "gauge",
                    name: "Commission",
                    startAngle: 90,
                    endAngle: -270,
                    radius: "90%",
                    pointer: {
                        show: !1
                    },
                    progress: {
                        show: !0,
                        overlap: !1,
                        roundCap: !0,
                        clip: !1,
                        itemStyle: {
                            color: t("primary")
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            width: 3,
                            color: [
                                [1, t("secondary-bg")]
                            ]
                        }
                    },
                    splitLine: {
                        show: !1
                    },
                    axisTick: {
                        show: !1
                    },
                    axisLabel: {
                        show: !1
                    },
                    data: [{
                        value: 70
                    }],
                    detail: {
                        show: !1
                    }
                }]
            })));
        }
    };

    const countryWiseVisitorsChartInit = () => {
        const {
            getColor: t,
            getData: e,
            getRandomNumber: i,
            getItemFromStore: o
        } = window.phoenix.utils, r = document.querySelector(".echart-country-wise-visitors"), s = [127, 156, 183, 110, 195, 129, 176, 147, 163, 199, 158, 115, 191, 105, 143, 179, 120, 168, 137, 185, 154, 122, 197, 112, 144, 170, 193, 118, 166, 151, 187, 134, 162, 107, 192, 152, 114, 198], a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38], n = t => `\n    <div>\n        <h6 class="fs-9 text-700 mb-0"><span class="fas fa-circle me-1 text-primary-light"></span>\n          Users : <span class="fw-normal">${t[0].value}</span>\n        </h6>\n    </div>\n    `;
        if (r) {
            const l = e(r, "echarts"),
                h = window.echarts.init(r);
            echartSetOption(h, l, (() => ({
                tooltip: {
                    trigger: "axis",
                    padding: [7, 10],
                    axisPointer: {
                        type: "none"
                    },
                    backgroundColor: t("body-highlight-bg"),
                    borderColor: t("border-color"),
                    textStyle: {
                        color: t("light-text-emphasis")
                    },
                    borderWidth: 1,
                    transitionDuration: 0,
                    position: (t, e, i, o, r) => handleTooltipPosition(t),
                    formatter: n,
                    extraCssText: "z-index: 1000"
                },
                xAxis: {
                    type: "category",
                    axisLabel: {
                        show: !1
                    },
                    axisTick: {
                        show: !1
                    },
                    axisLine: {
                        show: !1
                    },
                    boundaryGap: [.2, .2],
                    data: a
                },
                yAxis: {
                    type: "value",
                    scale: !0,
                    boundaryGap: !1,
                    axisLabel: {
                        show: !1
                    },
                    splitLine: {
                        show: !1
                    },
                    min: 100,
                    max: 200
                },
                series: [{
                    type: "bar",
                    barMaxWidth: 8,
                    barGap: 5,
                    data: s,
                    itemStyle: {
                        color: "dark" === o("phoenixTheme") ? t("primary") : t("primary-light"),
                        borderRadius: [2, 2, 0, 0]
                    }
                }],
                grid: {
                    right: 0,
                    left: 0,
                    bottom: 0,
                    top: 0
                }
            })));
            const p = document.querySelector(".real-time-user");
            setInterval((() => {
                const t = i(130, 200);
                s.shift(), s.push(t), a.shift(), a.push(i(37, 100)), p.innerHTML = t, h.setOption({
                    xAxis: {
                        data: a
                    },
                    series: [{
                        data: s
                    }]
                });
            }), 2e3);
        }
    };

    const financialActivitiesChartInit = () => {
        const {
            getColor: e,
            getData: t,
            getItemFromStore: i
        } = window.phoenix.utils, o = document.querySelector(".echart-financial-Activities"), a = [
            [35e4, 39e4, 410700, 45e4, 39e4, 410700],
            [245e3, 31e4, 42e4, 48e4, 53e4, 58e4],
            [278450, 513220, 359890, 444567, 201345, 589e3]
        ], r = [
            [-81e4, -64e4, -63e4, -59e4, -62e4, -78e4],
            [-482310, -726590, -589120, -674832, -811245, -455678],
            [-432567, -688921, -517389, -759234, -601876, -485112]
        ], s = [
            [-45e4, -25e4, -2e5, -12e4, -23e4, -27e4],
            [-243567, -156789, -398234, -120456, -321890, -465678],
            [-235678, -142345, -398765, -287456, -173890, -451234]
        ];
        if (o) {
            const n = t(o, "options"),
                l = window.echarts.init(o),
                c = document.querySelector(`#${n.optionOne}`),
                d = document.querySelector(`#${n.optionTwo}`),
                h = document.querySelector(`#${n.optionThree}`);
            echartSetOption(l, n, (() => ({
                color: [e("primary"), e("tertiary-bg")],
                tooltip: {
                    trigger: "axis",
                    padding: [7, 10],
                    backgroundColor: e("body-highlight-bg"),
                    borderColor: e("border-color"),
                    textStyle: {
                        color: e("light-text-emphasis")
                    },
                    borderWidth: 1,
                    transitionDuration: 0,
                    axisPointer: {
                        type: "none"
                    },
                    position: (...e) => handleTooltipPosition(e),
                    formatter: e => tooltipFormatter(e),
                    extraCssText: "z-index: 1000"
                },
                legend: {
                    data: ["Profit", "Revenue", "Expanses"],
                    show: !1
                },
                xAxis: {
                    axisLabel: {
                        show: !0,
                        margin: 12,
                        color: e("secondary-text-emphasis"),
                        formatter: e => `${Math.abs(Math.round(e / 1e3 * 10) / 10)}k`,
                        fontFamily: "Nunito Sans",
                        fontWeight: 700
                    },
                    splitLine: {
                        lineStyle: {
                            color: e("border-color-translucent")
                        }
                    }
                },
                yAxis: {
                    axisTick: {
                        show: !1
                    },
                    data: ["NOV-DEC", "SEP-OCT", "JUL-AUG", "MAY-JUN", "MAR-APR", "JAN-FEB"],
                    axisLabel: {
                        color: e("secondary-text-emphasis"),
                        margin: 8,
                        fontFamily: "Nunito Sans",
                        fontWeight: 700
                    },
                    axisLine: {
                        lineStyle: {
                            color: e("border-color-translucent")
                        }
                    }
                },
                series: [{
                    name: "Profit",
                    stack: "Total",
                    type: "bar",
                    barWidth: 8,
                    roundCap: !0,
                    emphasis: {
                        focus: "series"
                    },
                    itemStyle: {
                        borderRadius: [0, 4, 4, 0],
                        color: "dark" === i("phoenixTheme") ? e("primary") : e("primary-light")
                    },
                    data: a[0]
                }, {
                    name: "Revenue",
                    type: "bar",
                    barWidth: 8,
                    barGap: "100%",
                    stack: "Total",
                    emphasis: {
                        focus: "series"
                    },
                    itemStyle: {
                        borderRadius: [4, 0, 0, 4],
                        color: "dark" === i("phoenixTheme") ? e("success") : e("success-light")
                    },
                    data: r[0]
                }, {
                    name: "Expanses",
                    type: "bar",
                    barWidth: 8,
                    emphasis: {
                        focus: "series"
                    },
                    itemStyle: {
                        borderRadius: [4, 0, 0, 4],
                        color: "dark" === i("phoenixTheme") ? e("info") : e("info-light")
                    },
                    data: s[0]
                }],
                grid: {
                    right: 20,
                    left: 3,
                    bottom: 0,
                    top: 16,
                    containLabel: !0
                },
                animation: !1
            })), {
                xs: {
                    yAxis: {
                        axisLabel: {
                            show: !1
                        }
                    },
                    grid: {
                        left: 15
                    }
                },
                sm: {
                    yAxis: {
                        axisLabel: {
                            margin: 32,
                            show: !0
                        }
                    },
                    grid: {
                        left: 3
                    }
                },
                xl: {
                    yAxis: {
                        axisLabel: {
                            show: !1
                        }
                    },
                    grid: {
                        left: 15
                    }
                },
                xxl: {
                    yAxis: {
                        axisLabel: {
                            show: !0
                        }
                    },
                    grid: {
                        left: 3
                    }
                }
            }), c.addEventListener("click", (() => {
                c.classList.toggle("opacity-50"), l.dispatchAction({
                    type: "legendToggleSelect",
                    name: "Profit"
                });
            })), d.addEventListener("click", (() => {
                d.classList.toggle("opacity-50"), l.dispatchAction({
                    type: "legendToggleSelect",
                    name: "Revenue"
                });
            })), h.addEventListener("click", (() => {
                h.classList.toggle("opacity-50"), l.dispatchAction({
                    type: "legendToggleSelect",
                    name: "Expanses"
                });
            }));
            const p = document.querySelector("[data-activities-options]");
            p && p.addEventListener("change", (e => {
                const {
                    value: t
                } = e.currentTarget, i = a[t], o = r[t], n = s[t];
                l.setOption({
                    series: [{
                        data: i
                    }, {
                        data: o
                    }, {
                        data: n
                    }]
                });
            }));
        }
    };

    const {
        echarts: echarts
    } = window, grossProfitInit = () => {
        const {
            getColor: e,
            getData: l,
            rgbaColor: r,
            getItemFromStore: a
        } = window.phoenix.utils, o = document.querySelector(".echart-gross-profit"), t = [{
            name: "Flight",
            value: 30,
            itemStyle: {
                color: "dark" === a("phoenixTheme") ? e("primary") : e("primary-light")
            },
            children: [{
                name: "1st class",
                value: 5,
                itemStyle: {
                    color: "dark" === a("phoenixTheme") ? r(e("primary"), .8) : r(e("primary-light"), .7)
                },
                children: [{
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: e("primary-dark")
                    }
                }]
            }, {
                name: "Business",
                value: 15,
                itemStyle: {
                    color: "dark" === a("phoenixTheme") ? r(e("primary"), .7) : r(e("primary-light"), .5)
                },
                children: [{
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("primary-dark"), .9)
                    }
                }, {
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("primary-dark"), .8)
                    }
                }, {
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("primary-dark"), .7)
                    }
                }]
            }, {
                name: "Economy",
                value: 10,
                itemStyle: {
                    color: "dark" === a("phoenixTheme") ? r(e("primary"), .6) : r(e("primary-light"), .3)
                },
                children: [{
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("primary-dark"), .6)
                    }
                }, {
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("primary-dark"), .5)
                    }
                }]
            }]
        }, {
            name: "Package",
            value: 50,
            itemStyle: {
                color: "dark" === a("phoenixTheme") ? e("info") : e("info-light")
            },
            children: [{
                name: "Flight + Hotel",
                value: 5,
                itemStyle: {
                    color: "dark" === a("phoenixTheme") ? r(e("info"), .4) : r(e("info-light"), .3)
                },
                children: [{
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("info-dark"), .2)
                    }
                }]
            }, {
                name: "Flight + Event",
                value: 20,
                itemStyle: {
                    color: "dark" === a("phoenixTheme") ? r(e("info"), .5) : r(e("info-light"), .4)
                },
                children: [{
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("info-dark"), .3)
                    }
                }, {
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("info-dark"), .4)
                    }
                }, {
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("info-dark"), .5)
                    }
                }, {
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("info-dark"), .6)
                    }
                }]
            }, {
                name: "Flight + Hotel + Event",
                value: 10,
                itemStyle: {
                    color: "dark" === a("phoenixTheme") ? r(e("info"), .6) : r(e("info-light"), .55)
                },
                children: [{
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("info-dark"), .66)
                    }
                }, {
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("info-dark"), .7)
                    }
                }]
            }, {
                name: "Hotel + Event",
                value: 5,
                itemStyle: {
                    color: "dark" === a("phoenixTheme") ? r(e("info"), .7) : r(e("info-light"), .75)
                },
                children: [{
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("info-dark"), .8)
                    }
                }]
            }, {
                name: "Custom",
                value: 10,
                itemStyle: {
                    color: "dark" === a("phoenixTheme") ? r(e("info"), .8) : r(e("info-light"), .9)
                },
                children: [{
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("info-dark"), .9)
                    }
                }, {
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: e("info-dark")
                    }
                }]
            }]
        }, {
            name: "Hotel",
            value: 25,
            itemStyle: {
                color: "dark" === a("phoenixTheme") ? e("success") : e("success-light")
            },
            children: [{
                name: "Rooms",
                value: 10,
                itemStyle: {
                    color: "dark" === a("phoenixTheme") ? r(e("success"), .8) : r(e("success-light"), .9)
                },
                children: [{
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: e("success-dark")
                    }
                }, {
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("success-dark"), .88)
                    }
                }]
            }, {
                name: "Resorts",
                value: 15,
                itemStyle: {
                    color: "dark" === a("phoenixTheme") ? r(e("success"), .7) : r(e("success-light"), .5)
                },
                children: [{
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("success-dark"), .77)
                    }
                }, {
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("success-dark"), .66)
                    }
                }, {
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("success-dark"), .55)
                    }
                }]
            }]
        }, {
            name: "Trip",
            value: 15,
            itemStyle: {
                color: "dark" === a("phoenixTheme") ? e("warning") : e("warning-light")
            },
            children: [{
                name: "Nature",
                value: 5,
                itemStyle: {
                    color: "dark" === a("phoenixTheme") ? r(e("warning"), .8) : r(e("warning-light"), .8)
                },
                children: [{
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: e("warning-dark")
                    }
                }]
            }, {
                name: "Events",
                value: 10,
                itemStyle: {
                    color: "dark" === a("phoenixTheme") ? r(e("warning"), .7) : r(e("warning-light"), .5)
                },
                children: [{
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("warning-dark"), .7)
                    }
                }, {
                    name: "label-3",
                    value: 5,
                    itemStyle: {
                        color: r(e("warning-dark"), .5)
                    }
                }]
            }]
        }], i = [e("primary-light"), e("info-light"), e("success-light"), e("warning-light")];
        if (o) {
            const r = l(o, "echarts"),
                a = echarts.init(o);
            echartSetOption(a, r, (() => ({
                color: i,
                tooltip: {
                    trigger: "item",
                    padding: [7, 10],
                    backgroundColor: e("body-highlight-bg"),
                    borderColor: e("border-color"),
                    textStyle: {
                        color: e("light-text-emphasis")
                    },
                    borderWidth: 1,
                    transitionDuration: 0,
                    extraCssText: "z-index: 1000"
                },
                series: [{
                    type: "sunburst",
                    center: ["50%", "50%"],
                    data: t,
                    sort: (e, l) => 1 === e.depth ? l.getValue() - e.getValue() : e.dataIndex - l.dataIndex,
                    label: {
                        show: !1
                    },
                    levels: [{}, {
                        r0: 0,
                        r: 53,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: e("body-bg")
                        },
                        label: {
                            show: !1
                        },
                        blur: {
                            itemStyle: {
                                borderWidth: 6.5
                            }
                        }
                    }, {
                        r0: 65,
                        r: 110,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: e("body-bg")
                        },
                        label: {
                            show: !1
                        }
                    }, {
                        r0: 120,
                        r: 125,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: e("body-bg")
                        },
                        label: {
                            show: !1
                        }
                    }]
                }]
            })));
        }
    };

    const holidaysNextMonthChartInit = () => {
        const {
            getColor: t,
            getData: e,
            getItemFromStore: o,
            rgbaColor: r
        } = window.phoenix.utils, a = document.querySelector(".echart-holidays-next-month"), {
            echarts: i
        } = window, n = [84, 572, 193, 427, 649, 318, 765, 112, 490, 231, 674, 815, 447, 56, 903, 178, 629, 394, 742, 295, 518, 67, 936, 129, 681, 862, 410, 553, 268, 719, 42, 589, 334, 786, 155, 607, 878, 525, 449, 206, 659, 99, 472, 724, 261, 834, 389, 613, 157, 702, 451, 82, 545, 293, 736, 870, 104, 681, 321, 574, 136, 689, 840, 470, 127, 598, 354, 807, 215, 767, 498, 51, 904, 176, 629, 389, 731, 268, 611, 155, 702, 453, 82, 537, 294, 747, 881, 109, 662, 405, 858, 515, 47, 936, 189, 641, 312, 764, 236, 579, 135, 688, 429, 71, 624, 370, 822, 173, 725, 476, 29, 880, 125, 677, 338, 791, 216, 568, 115, 666, 409, 861, 502, 44, 907, 160, 612, 374, 826, 279, 731, 182, 735, 478, 27, 879, 120, 672, 335, 788, 227, 580, 123, 676, 421, 74, 627, 381, 834, 185, 738, 489, 32, 885, 128, 681, 342, 794, 245, 598, 137, 690, 433, 76, 629, 380, 832, 194, 747, 498, 41, 894, 142, 695, 346, 799, 250, 603, 108, 661, 414, 867, 508, 59, 912, 165, 616, 369, 821, 282, 735, 179, 732, 474, 26, 879, 124, 676, 329, 782, 233, 586, 118, 671, 414, 867, 299, 651, 156, 708, 453, 100, 553, 304, 757, 901, 145, 697, 448, 96, 549, 300, 753, 896, 149, 701, 452, 105, 558, 309, 762, 907, 161, 713, 464, 73, 526, 277, 730, 875, 122, 575, 326, 779, 924, 171, 724, 475, 28, 831, 184, 737, 882, 129, 582, 333, 786, 930, 176, 729, 480, 35, 838, 191, 744, 889, 136, 589, 340, 793, 936, 183, 736, 487, 42, 845, 198, 751, 896, 143, 596, 347, 800, 945, 190, 743, 498, 49, 852, 205, 758, 903, 150, 603, 354, 807, 952, 197, 750, 505, 56, 859, 212, 765, 910, 157, 610, 361, 814, 959, 204, 757, 512, 63, 866, 219, 772, 917, 164, 617, 368, 821, 966, 211, 764, 519, 70, 873, 226, 779, 924, 171, 724, 475, 28, 831, 184, 737, 882, 129, 582, 333, 786, 930, 176, 729, 480, 35, 838, 191, 744, 889, 136, 589, 340, 793, 936, 183, 736, 487, 42, 845, 198, 751, 896, 143, 596, 347, 800, 945, 190, 743, 498, 49, 852, 205, 758, 903, 150, 603, 354, 807, 952, 197, 750, 505, 56, 859, 212, 765, 910, 157, 610, 361, 814, 959, 204, 757, 512, 63, 866, 219, 772, 917, 164, 617, 368, 821, 966, 211, 764, 519, 70, 873, 226, 779, 924, 171, 724, 475, 28, 831, 184, 737, 882, 129, 582, 333, 786, 930, 176, 729, 480, 35, 838, 191, 744, 889, 136, 589, 340, 793, 936, 183, 736, 487, 42, 845, 198, 751, 896, 143, 596, 347, 800, 945, 190, 743, 498, 49, 852, 205, 758, 903, 150, 603, 354, 807, 952, 197, 750, 505, 56, 859, 212, 765, 910, 157, 610, 361, 814, 959, 204, 757, 512, 63, 866, 219, 772, 917, 164, 617, 368, 821, 966, 211, 764, 519, 70, 873, 226, 779, 924, 171, 724, 475, 28, 831];

        function l(t) {
            const e = +i.time.parse(`${t}-01-01`),
                o = +i.time.parse(+t + 1 + "-01-01"),
                r = [];
            let a = 0;
            for (let t = e; t < o; t += 864e5) r.push([i.time.format(t, "{yyyy}-{MM}-{dd}", !1), n[a]]), a += 1;
            return r
        }
        if (a) {
            const i = e(a, "echarts"),
                n = window.echarts.init(a);
            echartSetOption(n, i, (() => ({
                tooltip: {
                    trigger: "item",
                    axisPointer: {
                        type: "none"
                    },
                    padding: [7, 10],
                    backgroundColor: t("body-highlight-bg"),
                    borderColor: t("border-color"),
                    textStyle: {
                        color: t("light-text-emphasis")
                    },
                    borderWidth: 1,
                    transitionDuration: 0,
                    extraCssText: "z-index: 1000"
                },
                visualMap: {
                    min: 0,
                    max: 1e3,
                    calculable: !0,
                    show: !1,
                    color: [t("warning"), "dark" === o("phoenixTheme") ? r(t("warning"), .5) : t("warning-light"), "dark" === o("phoenixTheme") ? r(t("warning"), .75) : t("warning-light")]
                },
                calendar: {
                    orient: "vertical",
                    range: "2017-03",
                    width: "99%",
                    height: "85.5%",
                    left: "2",
                    right: "auto",
                    top: 42,
                    yearLabel: {
                        show: !1
                    },
                    monthLabel: {
                        show: !1
                    },
                    dayLabel: {
                        firstDay: 0,
                        nameMap: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
                        margin: 24,
                        color: t("secondary-text-emphasis"),
                        fontFamily: "Nunito Sans",
                        fontWeight: 700
                    },
                    splitLine: {
                        show: !1
                    },
                    itemStyle: {
                        color: t("dark-text-emphasis"),
                        borderColor: t("border-color")
                    }
                },
                series: {
                    type: "scatter",
                    coordinateSystem: "calendar",
                    symbolSize: t => t[1] / 35,
                    data: l("2017"),
                    itemStyle: {
                        color: t("warning"),
                        opacity: .8
                    }
                }
            })), {
                xl: {
                    calendar: {
                        height: "83%"
                    }
                },
                xxl: {
                    calendar: {
                        height: "85.5%"
                    }
                }
            });
        }
    };

    const {
        docReady: docReady
    } = window.phoenix.utils;
    docReady(bookingValueChartInit), docReady(commissionChartInit), docReady(cancelBookingChartInit), docReady(countryWiseVisitorsChartInit), docReady(financialActivitiesChartInit), docReady(holidaysNextMonthChartInit), docReady(bookingsChartInit), docReady(grossProfitInit);

}));
//# sourceMappingURL=travel-agency-dashboard.js.map