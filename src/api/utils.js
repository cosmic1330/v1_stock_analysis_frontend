import { Message } from 'element-ui';
import router from '../router';

// 錯誤訊息提示
export const tip = msg => {
  Message.error(msg);
};

// 跳轉回首頁 ( 攜帶棉欠路由  登入後跳轉回原本頁面 )
export const toLogin = () => {
  router.replace({
    name: 'Check',
    query: {
      redirect: router.currentRoute.fullPath,
    },
  });
};

// 跳轉道403 page
export const to403Page = () => {
  router.replace({
    name: '403',
  });
};
