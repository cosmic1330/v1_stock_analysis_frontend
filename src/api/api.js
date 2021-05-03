import { base, cors } from "./https";

// ------------------------------------------server--------------------------------------------------
// 取得最後交易日
export const Get_Last_Date = () => base({ method: "get", url: "/Date/getLastDate" });

// 取得符合本益比的股票
export const Get_Per_Stock = () => base({ method: "get", url: "/BWI/getCommon" });

// 取得法人買超的股票
export const Get_Corporations_Stock = () => base({ method: "get", url: "/Corporations/getCorporationsBuyTreeDays" });

// 取得所有股票代號
export const Get_All_Stock_Code = () => base({ method: "get", url: "/BWI/getAllStockCode" });

// 取得yahoo股價
export const Get_Yahoo_Price = code =>
    base({ method: "get", url: "/Single/curlSingleStockYahooPrice/" + code, options: { params: { type: "json" } } });

// 儲存股價到DB
export const Save_Price_to_DB = data => base({ method: "post", url: "/Single/saveYahooPrice", data: data });

// 儲存最新交易日到DB
export const Save_Trading_Date_to_DB = () => base({ method: "get", url: "/Date/save" });

// 儲存最新本益比
export const Save_PER_to_DB = () => base({ method: "get", url: "/BWI/getNewBWI" });

// 儲存三大法人買賣超
export const Save_Corporation_to_DB = () => base({ method: "get", url: "/Corporations/getNewCorporations" });

// 儲存MACD
export const Save_MACD_to_DB = () => base({ method: "get", url: "/MACD/forLoopMACD" });

// 儲存KD
export const Save_KD_to_DB = () => base({ method: "get", url: "/KD/forLoopKD" });

// 儲存MA
export const Save_MA_to_DB = () => base({ method: "get", url: "/MA/forLoopMA" });

// 儲存RSI
export const Save_RSI_to_DB = () => base({ method: "get", url: "/RSI/forLoopRSI" });

// 檢查日期是否相符
export const Check_Stock_With_Date = (code, date) =>
    base({ method: "get", url: `/Single/checkSingleStockInDBOfDate`, options: { params: { code: code, date: date } } });

// 取得股票技術資料
export const Get_Stock_from_DB = () => base({ method: "get", url: "/Single/getWithinConditionsStock" });

// 取得一個月的股票資料
export const Get_One_Month_Of_Stock = code => base({ method: "get", url: "/Single/getOneMonthOfStock/" + code });

// 取得所有股票平均交易量
export const Get_Volume_Avg_Of_Stock = () => base({ method: "get", url: "/Single/getAllStockVolumeAvg/" });

// 取得EPS挑選出的股票
export const Get_Eps_Of_Stock = () => base({ method: "get", url: "/eps/getEpsData" });
// -------------------------------------------cors--------------------------------------------------

// 取得yahoo股價
export const CORS_Yahoo_Price = () =>
    cors({
        method: "get",
        url:
            "https://tw.quote.finance.yahoo.net/quote/q?type=ta&perd=d&mkt=10&sym=2308&v=1&callback=jQuery111306382856220483186_1591513211276&_=1591513211278",
    });
