// 交叉點
export const segmentsIntr = (a, b, c, d) => {
    /** 1 解线性方程组, 求线段交点. **/
    // 如果分母为0 则平行或共线, 不相交
    var denominator = (b.y - a.y) * (d.x - c.x) - (a.x - b.x) * (c.y - d.y);
    if (denominator == 0) {
        return false;
    }
    // 线段所在直线的交点坐标 (x , y)
    var x =
        ((b.x - a.x) * (d.x - c.x) * (c.y - a.y) + (b.y - a.y) * (d.x - c.x) * a.x - (d.y - c.y) * (b.x - a.x) * c.x) /
        denominator;
    var y =
        -((b.y - a.y) * (d.y - c.y) * (c.x - a.x) + (b.x - a.x) * (d.y - c.y) * a.y - (d.x - c.x) * (b.y - a.y) * c.y) /
        denominator;
    /** 2 判断交点是否在两条线段上 **/
    if (
        // 交点在线段1上
        (x - a.x) * (x - b.x) <= 0 &&
        (y - a.y) * (y - b.y) <= 0 &&
        // 且交点也在线段2上
        (x - c.x) * (x - d.x) <= 0 &&
        (y - c.y) * (y - d.y) <= 0
    ) {
        // 返回交点p
        return {
            x: x,
            y: y,
        };
    }
    //否则不相交
    return false;
};

// 取得三關價
export const customsPrices = (data, type) => {
    let response = null;
    switch (type) {
        case "UP":
            response =
                parseInt(data["low_price"]) +
                (parseInt(data["hight_price"]) - parseInt(data["low_price"])) * 1.382;
            break;
        case "Mid":
            response = (parseInt(data["hight_price"]) + parseInt(data["low_price"])) * 0.5;
            break;
        case "Down":
            response =
                parseInt(data["hight_price"]) -
                (parseInt(data["hight_price"]) - parseInt(data["low_price"])) * 1.382;
            break;
        default:
            break;
    }
    return Math.round(response * 100) / 100;
}

// 明日三關價操作
export const customsPricesOperating = (todayCustoms,yesterdayPirce,yesterdayCustoms) => {
    console.log(todayCustoms,yesterdayPirce, yesterdayCustoms);};
//     （一）開盤即過上關時：
//         （1）關盤即過上關：
//             屬超強趨勢，此時必然亦超越昨高-全力作多。
//             （如此時實際波幅已大，不妨等拉回尋支撐順勢買進）
//         （2）若盤中跌到中關止跌，則中關視為第二買點，但此時多單應謹慎.
//         （3）盤中若跌破中關，則為轉盤，多單宜觀望。
//     （二）開盤價在上關與前一交易日高點之間時：
//          （1）開盤開在上關與昨高間，屬強勢開盤，僅開過昨高，
//             雖以多單為主，但未突破上開前，可小試短空。
//         （2）若過上關可追多，停損設在上關或昨高之下。
//         （3）若盤中跌破昨高多單宜保守，可待價位跌到中關再次買進，設停損於中關之下。
//         （4）盤中跌破中關，則有轉盤意味，多單宜觀望。
//     （三）：開盤開在昨高和中關間：盤堅格局，可多空雙向略為偏多。
//     （四）：開盤開在昨低與中關間：盤軟格局，多空雙向略為偏空。
//     （五）：開盤開在昨低與下關間：弱勢格局，空單為主，
//             多單在近下關時可小試，停損設於下關之下。
//     （六）：開盤開在下關之下，極弱勢開盤可全力放空。
//             陸、盤中買賣策略
//     （一）盤中買點：
//         （1）盤中攻過上關回檔至上關不破。
//         （2）上關一中關之間來回振盪。
//         在盤中回檔至中關止跌時，或攻破上關拉回不破時，皆可買進。
//         （3）中關-下關之間來回振盪。盤中回檔至下關止跌時可買進。
//     （二）賣點：
//         （1）在上關-中關之間振盪。
//         （2）攻過上關後又跌破可賣出。
//         （3）跌破中關且站不回。
//         （4）在中關-下關之間振盪，攻過中關後又跌破時可賣出。
//         （5）跌破下關又站不回。
//     柒、收盤研判
//         （一）收在上關之上：收盤強勢空單回補，多單可留，明日高點可期。
//         （二）收在上關與中關間：收盤偏強，空單不宜留，多單留倉與否，視成本價做考量。
//         （三）收在中關與下關間：收盤偏弱，多單宜平倉離場。空單視成本而考量留倉與否。
//         （四）收在下關之下：收盤弱勢，多單平倉，空單可留。明日仍有低點 。
