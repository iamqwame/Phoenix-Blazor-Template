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

    const completedTaskChartInit = () => {
        const {
            getColor: o,
            getData: t,
            getDates: e
        } = window.phoenix.utils, a = document.querySelector(".echart-completed-task-chart"), i = e(new Date("5/1/2022"), new Date("5/30/2022"), 864e5), n = [50, 115, 180, 180, 180, 150, 120, 120, 120, 120, 120, 240, 240, 240, 240, 270, 300, 330, 360, 390, 340, 290, 310, 330, 350, 320, 290, 330, 370, 350], s = [130, 130, 130, 90, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 110, 170, 230, 230, 230, 270, 310, 270, 230, 260, 290, 320, 280, 280, 280], r = o => {
            const t = window.dayjs(o[0].axisValue),
                e = window.dayjs(o[0].axisValue).subtract(1, "month"),
                a = o.map(((o, a) => ({
                    value: o.value,
                    date: a > 0 ? e : t,
                    color: o.color
                })));
            let i = "";
            return a.forEach(((o, t) => {
                i += `<h6 class="fs-9 text-body-tertiary ${t > 0 && "mb-0"}"><span class="fas fa-circle me-2" style="color:${o.color}"></span>\n      ${o.date.format("MMM DD")} : ${o.value}\n    </h6>`;
            })), `<div class='ms-1'>\n              ${i}\n            </div>`
        };
        if (a) {
            const e = t(a, "echarts"),
                l = window.echarts.init(a);
            echartSetOption(l, e, (() => ({
                color: [o("primary"), o("info")],
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
                    formatter: r,
                    extraCssText: "z-index: 1000"
                },
                xAxis: [{
                    type: "category",
                    data: i,
                    axisLabel: {
                        formatter: o => window.dayjs(o).format("DD MMM"),
                        interval: 13,
                        showMinLabel: !0,
                        showMaxLabel: !1,
                        color: o("secondary-color"),
                        align: "left",
                        fontFamily: "Nunito Sans",
                        fontWeight: 600,
                        fontSize: 12.8
                    },
                    axisLine: {
                        show: !0,
                        lineStyle: {
                            color: o("secondary-bg")
                        }
                    },
                    axisTick: {
                        show: !1
                    },
                    splitLine: {
                        show: !0,
                        interval: 0,
                        lineStyle: {
                            color: o("secondary-bg")
                        }
                    },
                    boundaryGap: !1
                }, {
                    type: "category",
                    position: "bottom",
                    data: i,
                    axisLabel: {
                        formatter: o => window.dayjs(o).format("DD MMM"),
                        interval: 130,
                        showMaxLabel: !0,
                        showMinLabel: !1,
                        color: o("secondary-color"),
                        align: "right",
                        fontFamily: "Nunito Sans",
                        fontWeight: 600,
                        fontSize: 12.8
                    },
                    axisLine: {
                        show: !1
                    },
                    axisTick: {
                        show: !1
                    },
                    splitLine: {
                        show: !1
                    },
                    boundaryGap: !1
                }],
                yAxis: {
                    position: "right",
                    axisPointer: {
                        type: "none"
                    },
                    axisTick: "none",
                    splitLine: {
                        show: !1
                    },
                    axisLine: {
                        show: !1
                    },
                    axisLabel: {
                        show: !1
                    }
                },
                series: [{
                    name: "d",
                    type: "line",
                    data: n,
                    showSymbol: !1,
                    symbol: "circle"
                }, {
                    name: "e",
                    type: "line",
                    data: s,
                    lineStyle: {
                        type: "dashed",
                        width: 1,
                        color: o("info")
                    },
                    showSymbol: !1,
                    symbol: "circle"
                }],
                grid: {
                    right: 2,
                    left: 5,
                    bottom: "20px",
                    top: "2%",
                    containLabel: !1
                },
                animation: !1
            })));
        }
    };

    const {
        echarts: echarts
    } = window, topCouponsChartInit = () => {
        const {
            getData: t,
            getColor: e
        } = window.phoenix.utils, o = document.querySelector(".echart-top-coupons");
        if (o) {
            const r = t(o, "options"),
                i = echarts.init(o);
            echartSetOption(i, r, (() => ({
                color: [e("primary"), e("primary-lighter"), e("info-dark")],
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
                    position(t, e, o, r, i) {
                        const n = {
                            top: t[1] - 35
                        };
                        return window.innerWidth > 540 ? t[0] <= i.viewSize[0] / 2 ? n.left = t[0] + 20 : n.left = t[0] - i.contentSize[0] - 20 : n[t[0] < i.viewSize[0] / 2 ? "left" : "right"] = 0, n
                    },
                    formatter: t => `<strong>${t.data.name}:</strong> ${t.percent}%`,
                    extraCssText: "z-index: 1000"
                },
                legend: {
                    show: !1
                },
                series: [{
                    name: "72%",
                    type: "pie",
                    radius: ["100%", "87%"],
                    avoidLabelOverlap: !1,
                    emphasis: {
                        scale: !1,
                        itemStyle: {
                            color: "inherit"
                        }
                    },
                    itemStyle: {
                        borderWidth: 2,
                        borderColor: e("body-bg")
                    },
                    label: {
                        show: !0,
                        position: "center",
                        formatter: "{a}",
                        fontSize: 23,
                        color: e("light-text-emphasis")
                    },
                    data: [{
                        value: 72e5,
                        name: "Percentage discount"
                    }, {
                        value: 18e5,
                        name: "Fixed card discount"
                    }, {
                        value: 1e6,
                        name: "Fixed product discount"
                    }]
                }],
                grid: {
                    containLabel: !0
                }
            })));
        }
    };

    const {
        docReady: docReady
    } = window.phoenix.utils;
    docReady(completedTaskChartInit), docReady(topCouponsChartInit);

}));
//# sourceMappingURL=project-details.js.map