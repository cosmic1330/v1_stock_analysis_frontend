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

// 檢查
export const Check_Stock_With_Date = (code,date) => base({method: "get", url: `/Single/checkSingleStockInDBOfDate`, options: { params: { code: code, date: date } }})

// -------------------------------------------cors--------------------------------------------------

// 取得yahoo股價
export const CORS_Yahoo_Price = () =>
    cors({
        method: "get",
        url:
            "https://tw.quote.finance.yahoo.net/quote/q?type=ta&perd=d&mkt=10&sym=2308&v=1&callback=jQuery111306382856220483186_1591513211276&_=1591513211278",
    });
