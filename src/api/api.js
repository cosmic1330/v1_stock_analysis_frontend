import { base, cors } from './https';

// ------------------------------------------server--------------------------------------------------
// 取得最後交易日
export const Get_Last_Date = () =>
  base({ method: 'get', url: '/date/getLastDate' });

// 取得符合本益比的股票
export const Get_Per_Stock = () =>
  base({ method: 'get', url: '/bwi/getCommon' });

// 取得法人買超的股票
export const Get_Corporations_Stock = () =>
  base({ method: 'get', url: '/corporations/getCorporationsBuyTreeDays' });

// -------------------------------------------cors--------------------------------------------------
// 取得yahoo股價
export const CORS_Yahoo_Price = () =>
  cors({
    method: 'get',
    url:
      'https://tw.quote.finance.yahoo.net/quote/q?type=ta&perd=d&mkt=10&sym=2308&v=1&callback=jQuery111306382856220483186_1591513211276&_=1591513211278',
  });
