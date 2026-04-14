// ==UserScript==
// @name         MissAV
// @namespace    gmspider
// @version      2024.12.04
// @description  MissAV Fixed Version
// @match        https://missav.*/*
// @grant        unsafeWindow
// ==/UserScript==

(function () {
    const GmSpider = (function () {
        const defaultFilter = [{key: "filter", name: "过滤", value: [{n: "所有", v: ""}, {n: "单人", v: "&filters=individual"}, {n: "多人", v: "&filters=multiple"}, {n: "中字", v: "&filters=chinese-subtitle"}]}, {key: "sort", name: "排序", value: [{n: "发行日期", v: "&sort=released_at"}, {n: "收藏数", v: "&sort=saved"}, {n: "总浏览", v: "&sort=views"}]}];
        function pageList(res) {
            $(".gap-5 .thumbnail").each(function () {
                res.list.push({
                    vod_id: $(this).find(".text-secondary").attr("href").split('/').pop(),
                    vod_name: $(this).find(".text-secondary").text().trim(),
                    vod_pic: $(this).find("img").data("src"),
                    vod_remarks: $(this).find(".left-1").text().trim()
                });
            });
            return res;
        }
        return {
            homeContent: function () {
                return { class: [{type_id: "new", type_name: "最新"}, {type_id: "chinese-subtitle", type_name: "中文字幕"}], list: [] };
            },
            categoryContent: function (tid, pg) {
                return pageList({ list: [], limit: 12, page: pg });
            },
            detailContent: function (ids) {
                const vod = {
                    vod_id: ids[0],
                    vod_name: ids[0].toUpperCase(),
                    vod_pic: $("head link[as=image]").attr("href"),
                    vod_play_from: "MissAV",
                    vod_play_url: "播放$" + window.location.href
                };
                return { list: [vod] };
            },
            searchContent: function (key) {
                return pageList({ list: [] });
            }
        };
    })();

    if (typeof GmSpiderInject !== 'undefined') {
        let args = JSON.parse(GmSpiderInject.GetSpiderArgs());
        let res = GmSpider[args.shift()](...args);
        GmSpiderInject.SetSpiderResult(JSON.stringify(res));
    }
})();
