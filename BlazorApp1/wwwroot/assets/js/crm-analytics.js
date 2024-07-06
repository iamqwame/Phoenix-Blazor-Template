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

    const emailCampaignReportsChartInit = () => {
        const {
            getColor: t,
            getData: e,
            toggleColor: r
        } = window.phoenix.utils, a = document.querySelector(".echart-email-campaign-report"), o = t => {
            const e = t[1],
                r = `<div class='ms-1'>\n          <h6 class="text-body-tertiary"><span class="fas fa-circle me-1 fs-10" style="color:${e.borderColor ? e.borderColor : e.color}"></span>\n            ${e.axisValue} : ${"object" == typeof e.value ? e.value[1] : e.value}\n          </h6>\n        </div>`;
            return `<div>\n              <p class='mb-2 text-body-tertiary'>\n                ${e.seriesName}\n              </p>\n              ${r}\n            </div>`
        }, i = [0, 1466, 966, 0];
        if (a) {
            const l = e(a, "echarts"),
                s = window.echarts.init(a);
            echartSetOption(s, l, (() => ({
                color: [t("primary"), t("tertiary-bg")],
                tooltip: {
                    trigger: "axis",
                    padding: [7, 10],
                    backgroundColor: t("body-highlight-bg"),
                    borderColor: t("border-color"),
                    textStyle: {
                        color: t("light-text-emphasis")
                    },
                    borderWidth: 1,
                    transitionDuration: 0,
                    axisPointer: {
                        type: "none"
                    },
                    formatter: o,
                    extraCssText: "z-index: 1000"
                },
                xAxis: {
                    type: "category",
                    data: ["Total Emails", "Sent", "Bounce", "Delivered"],
                    splitLine: {
                        show: !1
                    },
                    axisLabel: {
                        color: t("body-color"),
                        fontFamily: "Nunito Sans",
                        fontWeight: 400,
                        fontSize: 12.8,
                        margin: 24,
                        rotate: 30
                    },
                    axisLine: {
                        show: !0,
                        lineStyle: {
                            color: t("tertiary-bg")
                        }
                    },
                    axisTick: !1
                },
                yAxis: {
                    type: "value",
                    splitLine: {
                        lineStyle: {
                            color: t("secondary-bg")
                        }
                    },
                    axisLabel: {
                        color: t("body-color"),
                        fontFamily: "Nunito Sans",
                        fontWeight: 700,
                        fontSize: 12.8,
                        margin: 24
                    },
                    interval: 500
                },
                series: [{
                    name: "Placeholder",
                    type: "bar",
                    barWidth: "64px",
                    stack: "Total",
                    label: {
                        show: !1
                    },
                    itemStyle: {
                        borderColor: "transparent",
                        color: "transparent"
                    },
                    emphasis: {
                        itemStyle: {
                            borderColor: "transparent",
                            color: "transparent"
                        }
                    },
                    data: i
                }, {
                    name: "Email Campaign",
                    type: "bar",
                    stack: "Total",
                    itemStyle: {
                        color: r(t("primary-lighter"), t("primary-darker"))
                    },
                    data: [{
                        value: 2832,
                        itemStyle: {
                            color: r(t("primary-light"), t("primary-dark"))
                        }
                    }, 1366, 500, 966],
                    label: {
                        show: !0,
                        position: "inside",
                        color: t("dark"),
                        fontWeight: "normal",
                        fontSize: "12.8px",
                        formatter: t => `${t.value.toLocaleString()}`
                    }
                }],
                grid: {
                    right: "0",
                    left: 6,
                    bottom: 10,
                    top: "5%",
                    containLabel: !0
                },
                animation: !1
            })), {
                xs: {
                    series: [{
                        barWidth: "48px"
                    }],
                    xAxis: {
                        axisLabel: {
                            show: !0,
                            formatter: t => `${t.slice(0, 5)}...`
                        }
                    }
                },
                sm: {
                    series: [{
                        barWidth: "64px"
                    }],
                    xAxis: {
                        axisLabel: {
                            show: !0,
                            formatter: t => `${t.slice(0, 11)}`,
                            rotate: 0
                        }
                    }
                },
                md: {
                    series: [{
                        barWidth: "56px"
                    }],
                    xAxis: {
                        axisLabel: {
                            show: !1
                        }
                    }
                },
                lg: {
                    series: [{
                        barWidth: "64px"
                    }],
                    xAxis: {
                        axisLabel: {
                            show: !0,
                            formatter: t => `${t.slice(0, 11)}`
                        }
                    }
                }
            });
        }
    };

    const socialMarketingRadarChartInit = () => {
        const {
            getColor: e,
            getData: a,
            rgbaColor: r,
            toggleColor: t
        } = window.phoenix.utils, o = document.querySelector(".echart-social-marketing-radar");
        if (o) {
            const i = a(o, "echarts"),
                l = echarts.init(o);
            echartSetOption(l, i, (() => ({
                color: [e("primary-light"), e("warning-light")],
                tooltip: {
                    trigger: "item",
                    padding: [7, 10],
                    backgroundColor: e("body-highlight-bg"),
                    borderColor: e("border-color"),
                    textStyle: {
                        color: e("body-color"),
                        fontSize: 12.8,
                        fontFamily: "Nunito Sans"
                    },
                    borderWidth: 1,
                    transitionDuration: 0,
                    extraCssText: "z-index: 1000"
                },
                radar: {
                    splitNumber: 5,
                    axisNameGap: 10,
                    radius: "87%",
                    splitLine: {
                        lineStyle: {
                            color: e("secondary-bg")
                        }
                    },
                    splitArea: {
                        show: !0,
                        areaStyle: {
                            shadowBlur: .5,
                            color: [t(e("body-highlight-bg"), e("body-highlight-bg")), t(e("body-bg"), e("secondary-bg"))]
                        }
                    },
                    axisLine: {
                        show: !0,
                        lineStyle: {
                            color: e("secondary-bg")
                        }
                    },
                    name: {
                        textStyle: {
                            color: e("tertiary-color"),
                            fontWeight: 800,
                            fontSize: 10.2
                        }
                    },
                    indicator: [{
                        name: "SAT",
                        max: 5e3
                    }, {
                        name: "FRI",
                        max: 5e3
                    }, {
                        name: "THU",
                        max: 5e3
                    }, {
                        name: "WED",
                        max: 5e3
                    }, {
                        name: "TUE",
                        max: 5e3
                    }, {
                        name: "MON",
                        max: 5e3
                    }, {
                        name: "SUN",
                        max: 5e3
                    }]
                },
                series: [{
                    name: "Budget vs spending",
                    type: "radar",
                    symbol: "emptyCircle",
                    symbolSize: 6,
                    data: [{
                        value: [2100, 2300, 1600, 3700, 3e3, 2500, 2500],
                        name: "Offline Marketing",
                        itemStyle: {
                            color: e("primary-light")
                        },
                        areaStyle: {
                            color: r(e("primary-light"), .3)
                        }
                    }, {
                        value: [3e3, 1600, 3700, 500, 3700, 3e3, 3200],
                        name: "Online Marketing",
                        areaStyle: {
                            color: r(e("warning-light"), .3)
                        },
                        itemStyle: {
                            color: e("warning-light")
                        }
                    }]
                }],
                grid: {
                    top: 10,
                    left: 0
                }
            })), {
                md: {
                    radar: {
                        radius: "74%"
                    }
                },
                xl: {
                    radar: {
                        radius: "85%"
                    }
                }
            });
        }
    };

    const salesTrendsChartInit = () => {
        const {
            getColor: t,
            getData: e,
            getPastDates: o,
            rgbaColor: i,
            toggleColor: r
        } = window.phoenix.utils, a = document.querySelector(".echart-sales-trends"), l = (t, e = "MMM DD") => {
            let o = "";
            return t.forEach((t => {
                o += `<div class='ms-1'>\n          <h6 class="text-body-tertiary"><span class="fas fa-circle me-1 fs-10" style="color:${t.color}"></span>\n            ${t.seriesName} : ${"object" == typeof t.value ? t.value[1] : t.value}\n          </h6>\n        </div>`;
            })), `<div>\n              <p class='mb-2 text-body-tertiary'>\n                ${window.dayjs(t[0].axisValue).isValid() ? window.dayjs(t[0].axisValue).format("DD MMM, YYYY") : t[0].axisValue}\n              </p>\n              ${o}\n            </div>`
        }, s = o(7), n = [2e3, 5700, 3700, 5500, 8e3, 4e3, 5500], d = [10500, 9e3, 7e3, 9e3, 10400, 7500, 9300];
        if (a) {
            const o = e(a, "echarts"),
                c = window.echarts.init(a);
            echartSetOption(c, o, (() => ({
                color: [t("primary-lighter"), t("info-light")],
                tooltip: {
                    trigger: "axis",
                    padding: [7, 10],
                    backgroundColor: t("body-highlight-bg"),
                    borderColor: t("border-color"),
                    textStyle: {
                        color: t("light-text-emphasis")
                    },
                    borderWidth: 1,
                    transitionDuration: 0,
                    axisPointer: {
                        type: "none"
                    },
                    formatter: l,
                    extraCssText: "z-index: 1000"
                },
                xAxis: {
                    type: "category",
                    data: s,
                    axisLabel: {
                        color: t("body-color"),
                        formatter: t => window.dayjs(t).format("ddd"),
                        fontFamily: "Nunito Sans",
                        fontWeight: 400,
                        fontSize: 12.8,
                        margin: 16
                    },
                    axisLine: {
                        lineStyle: {
                            color: t("secondary-bg")
                        }
                    },
                    axisTick: !1
                },
                yAxis: {
                    type: "value",
                    splitLine: {
                        lineStyle: {
                            color: t("secondary-bg")
                        }
                    },
                    axisLabel: {
                        color: t("body-color"),
                        fontFamily: "Nunito Sans",
                        fontWeight: 700,
                        fontSize: 12.8,
                        margin: 24,
                        formatter: t => t / 1e3 + "k"
                    }
                },
                series: [{
                    name: "Revenue",
                    type: "bar",
                    barWidth: "16px",
                    label: {
                        show: !1
                    },
                    itemStyle: {
                        color: r(t("primary-lighter"), t("primary")),
                        borderRadius: [4, 4, 0, 0]
                    },
                    data: d
                }, {
                    name: "Profit",
                    type: "line",
                    symbol: "circle",
                    symbolSize: 11,
                    itemStyle: {
                        color: t("info-light"),
                        borderColor: r(t("white"), t("light-text-emphasis")),
                        borderWidth: 2
                    },
                    areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: i(t("info-light"), .2)
                            }, {
                                offset: 1,
                                color: i(t("info-light"), .2)
                            }]
                        }
                    },
                    data: n
                }],
                grid: {
                    right: "0",
                    left: "0",
                    bottom: 0,
                    top: 10,
                    containLabel: !0
                },
                animation: !1
            })));
        }
    };

    const callCampaignChartInit = () => {
        const {
            getColor: o,
            getData: a,
            getPastDates: t,
            rgbaColor: e
        } = window.phoenix.utils, i = document.querySelector(".echart-call-campaign"), r = o => {
            let a = "";
            return o.forEach((o => {
                a += `<div class='ms-1'>\n          <h6 class="text-body-tertiary"><span class="fas fa-circle me-1 fs-10" style="color:${o.color}"></span>\n            ${o.seriesName} : ${"object" == typeof o.value ? o.value[1] : o.value}\n          </h6>\n        </div>`;
            })), `<div>\n              <p class='mb-2 text-body-tertiary'>\n                ${window.dayjs(o[0].axisValue).isValid() ? window.dayjs(o[0].axisValue).format("DD MMM, YYYY") : o[0].axisValue}\n              </p>\n              ${a}\n            </div>`
        }, l = t(7), n = [8e3, 7700, 5900, 10100, 5100, 6e3, 4300];
        if (i) {
            const t = a(i, "echarts"),
                s = window.echarts.init(i);
            echartSetOption(s, t, (() => ({
                color: [o("primary-lighter"), o("info-light")],
                tooltip: {
                    trigger: "axis",
                    padding: [7, 10],
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
                    formatter: r,
                    extraCssText: "z-index: 1000"
                },
                xAxis: [{
                    type: "category",
                    data: l,
                    boundaryGap: !1,
                    splitLine: {
                        show: !0,
                        lineStyle: {
                            color: o("secondary-bg")
                        }
                    },
                    axisLabel: {
                        color: o("body-color"),
                        showMaxLabel: !1,
                        showMinLabel: !0,
                        align: "left",
                        formatter: o => window.dayjs(o).format("ddd"),
                        fontFamily: "Nunito Sans",
                        fontWeight: 400,
                        fontSize: 12.8,
                        margin: 16
                    },
                    axisLine: {
                        lineStyle: {
                            color: o("secondary-bg")
                        }
                    },
                    axisTick: !1
                }, {
                    type: "category",
                    data: l,
                    boundaryGap: !1,
                    splitLine: {
                        show: !0,
                        lineStyle: {
                            color: o("secondary-bg")
                        }
                    },
                    axisLabel: {
                        color: o("body-color"),
                        interval: 130,
                        showMaxLabel: !0,
                        showMinLabel: !1,
                        align: "right",
                        formatter: o => window.dayjs(o).format("ddd"),
                        fontFamily: "Nunito Sans",
                        fontWeight: 400,
                        fontSize: 12.8,
                        margin: 16
                    },
                    position: "bottom",
                    axisLine: {
                        lineStyle: {
                            color: o("secondary-bg")
                        }
                    },
                    axisTick: !1
                }],
                yAxis: {
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            color: o("secondary-bg")
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: o("secondary-bg")
                        }
                    },
                    axisLabel: {
                        color: o("body-color"),
                        fontFamily: "Nunito Sans",
                        fontWeight: 700,
                        fontSize: 12.8,
                        margin: 16,
                        formatter: o => o / 1e3 + "k"
                    }
                },
                series: [{
                    name: "Campaign",
                    type: "line",
                    smooth: .4,
                    symbolSize: 11,
                    itemStyle: {
                        color: o("body-highlight-bg"),
                        borderColor: o("primary"),
                        borderWidth: 2
                    },
                    lineStyle: {
                        color: o("primary")
                    },
                    symbol: "circle",
                    areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: e(o("primary-light"), .2)
                            }, {
                                offset: 1,
                                color: e(o("primary-light"), .2)
                            }]
                        }
                    },
                    data: n
                }],
                grid: {
                    right: "8",
                    left: 6,
                    bottom: "-10",
                    top: 10,
                    containLabel: !0
                },
                animation: !1
            })), {
                xs: {
                    xAxis: [{}, {
                        axisLabel: {
                            showMaxLabel: !1
                        }
                    }]
                },
                sm: {
                    xAxis: [{}, {
                        axisLabel: {
                            showMaxLabel: !0
                        }
                    }]
                }
            });
        }
    };

    const {
        docReady: docReady
    } = window.phoenix.utils;
    docReady(emailCampaignReportsChartInit), docReady(socialMarketingRadarChartInit), docReady(salesTrendsChartInit), docReady(callCampaignChartInit);

}));
//# sourceMappingURL=crm-analytics.js.map