// ===== i18n Module =====

const LANG_STORAGE_KEY = 'mnurl_language';
const SUPPORTED_LANGS = ['en', 'zh-CN', 'zh-HK'];
let currentLang = 'en';

// ===== Translation Dictionary =====
const messages = {
  en: {
    title: 'Short URL',
    subtitle: 'Short URL Generator',
    btn_history: 'History',
    btn_settings: 'Settings',
    api_key_label: 'API Key',
    api_key_placeholder: 'Enter your mnurl.com API Key',
    btn_show_hide: 'Show/Hide',
    api_key_hint: 'Get your API Key from {link}',
    btn_save: 'Save',
    setup_title: 'API Key Required',
    setup_desc: 'Please configure your mnurl.com API Key to start generating short URLs.',
    btn_go_settings: 'Go to Settings',
    current_page: 'Current Page',
    loading: 'Loading...',
    btn_generate: 'Generate Short URL',
    btn_regenerate: 'Regenerate',
    generating: 'Generating...',
    short_url_label: 'Short URL',
    btn_copy: 'Copy',
    copied: 'Copied!',
    history_label: 'History',
    btn_refresh: 'Refresh',
    history_loading: 'Loading history...',
    history_empty: 'No short URLs created yet.',
    clicks: '{count} clicks',
    prev: 'Prev',
    next: 'Next',
    footer_powered: 'Powered by {link}',
    welcome: 'Welcome, {name}',
    user_default: 'User',
    url_error: 'Unable to get current page URL',
    url_internal: 'Cannot shorten browser internal pages',
    err_invalid_key: 'Please enter a valid API Key.',
    err_key_saved: 'API Key saved successfully!',
    err_generate_fail: 'Failed to generate short URL. Please try again.',
    err_auth: 'Authentication failed. Please check your API Key in Settings.',
    err_rate_limit: 'Rate limit reached. Please try again later.',
    err_request: 'Request failed (HTTP {status}){detail}',
    err_link_id: 'Failed to get link_id from create response.',
    err_slug: 'Failed to get url slug from link detail.',
    err_history: 'Failed to load history.',
    language_label: 'Language',
    btn_copy_title: 'Copy to clipboard',
    btn_open_title: 'Open',
    btn_back: 'Back',
    plan_free: 'Free',
    plan_plus: 'Plus',
    plan_pro: 'Pro',
    plan_expires: 'Expires: {date}',
    links_limit_label: 'Shortened: {used} / {limit}',
    links_limit_unlimited: 'Shortened: {used} / Unlimited',
    err_links_limit: 'Link limit reached. Please upgrade your plan.',
    btn_upgrade: 'Upgrade',
    btn_renew: 'Renew',
    btn_subscribe: 'Subscribe',
  },

  'zh-CN': {
    title: '短链接',
    subtitle: '短链接生成器',
    btn_history: '历史记录',
    btn_settings: '设置',
    api_key_label: 'API 密钥',
    api_key_placeholder: '输入你的 mnurl.com API 密钥',
    btn_show_hide: '显示/隐藏',
    api_key_hint: '从以下网址获取你的 API 密钥 {link}',
    btn_save: '保存',
    setup_title: '需要 API 密钥',
    setup_desc: '请配置你的 mnurl.com API 密钥以开始生成短链接。',
    btn_go_settings: '前往设置',
    current_page: '当前页面',
    loading: '加载中...',
    btn_generate: '生成短链接',
    btn_regenerate: '重新生成',
    generating: '正在生成...',
    short_url_label: '短链接',
    btn_copy: '复制',
    copied: '已复制！',
    history_label: '历史记录',
    btn_refresh: '刷新',
    history_loading: '加载历史记录...',
    history_empty: '暂无已创建的短链接',
    clicks: '{count} 次点击',
    prev: '上一页',
    next: '下一页',
    footer_powered: '由 {link} 提供支持',
    welcome: '欢迎，{name}',
    user_default: '用户',
    url_error: '无法获取当前页面 URL',
    url_internal: '无法缩短浏览器内部页面',
    err_invalid_key: '请输入有效的 API 密钥',
    err_key_saved: 'API 密钥保存成功！',
    err_generate_fail: '生成短链接失败，请重试',
    err_auth: '身份验证失败，请在设置中检查 API 密钥',
    err_rate_limit: '请求频率超限，请稍后重试',
    err_request: '请求失败（HTTP {status}）：{detail}',
    err_link_id: '创建响应中获取 link_id 失败',
    err_slug: '获取链接详情中的 url slug 失败',
    err_history: '加载历史记录失败',
    language_label: '语言',
    btn_copy_title: '复制到剪贴板',
    btn_open_title: '打开',
    btn_back: '返回',
    plan_free: '免费版',
    plan_plus: '高级版',
    plan_pro: '专业版',
    plan_expires: '到期时间：{date}',
    links_limit_label: '已缩短：{used} / {limit}',
    links_limit_unlimited: '已缩短：{used} / 无限制',
    err_links_limit: '链接数量已达上限，请升级会员。',
    btn_upgrade: '升级',
    btn_renew: '续费',
    btn_subscribe: '开通会员',
  },

  'zh-HK': {
    title: '短網址',
    subtitle: '短網址產生器',
    btn_history: '歷史記錄',
    btn_settings: '設定',
    api_key_label: 'API 密鑰',
    api_key_placeholder: '輸入你的 mnurl.com API 密鑰',
    btn_show_hide: '顯示/隱藏',
    api_key_hint: '從以下網址取得你的 API 密鑰 {link}',
    btn_save: '儲存',
    setup_title: '需要 API 密鑰',
    setup_desc: '請設定你的 mnurl.com API 密鑰以開始產生短網址。',
    btn_go_settings: '前往設定',
    current_page: '目前頁面',
    loading: '載入中...',
    btn_generate: '產生短網址',
    btn_regenerate: '重新產生',
    generating: '正在產生...',
    short_url_label: '短網址',
    btn_copy: '複製',
    copied: '已複製！',
    history_label: '歷史記錄',
    btn_refresh: '重新整理',
    history_loading: '載入歷史記錄...',
    history_empty: '尚未建立任何短網址',
    clicks: '{count} 次點擊',
    prev: '上一頁',
    next: '下一頁',
    footer_powered: '由 {link} 提供支援',
    welcome: '歡迎，{name}',
    user_default: '用戶',
    url_error: '無法取得目前頁面網址',
    url_internal: '無法縮短瀏覽器內部頁面',
    err_invalid_key: '請輸入有效的 API 密鑰',
    err_key_saved: 'API 密鑰儲存成功！',
    err_generate_fail: '產生短網址失敗，請重試',
    err_auth: '身份驗證失敗，請在設定中檢查 API 密鑰',
    err_rate_limit: '請求頻率超出限制，請稍後重試',
    err_request: '請求失敗（HTTP {status}）：{detail}',
    err_link_id: '從建立回應中取得 link_id 失敗',
    err_slug: '從連結詳情取得 url slug 失敗',
    err_history: '載入歷史記錄失敗',
    language_label: '語言',
    btn_copy_title: '複製到剪貼簿',
    btn_open_title: '開啟',
    btn_back: '返回',
    plan_free: '免費版',
    plan_plus: '高級版',
    plan_pro: '專業版',
    plan_expires: '到期時間：{date}',
    links_limit_label: '已縮短：{used} / {limit}',
    links_limit_unlimited: '已縮短：{used} / 無限制',
    err_links_limit: '連結數量已達上限，請升級會員。',
    btn_upgrade: '升級',
    btn_renew: '續費',
    btn_subscribe: '開通會員',
  },
};

// ===== Translation Function =====
// Usage: t('welcome', { name: 'John' }) → "Welcome, John"
function t(key, params = {}) {
  const dict = messages[currentLang] || messages['en'];
  let text = dict[key] || messages['en'][key] || key;

  // Replace placeholders like {name}, {count}, {status}, {detail}, {link}
  for (const [k, v] of Object.entries(params)) {
    text = text.replace(new RegExp('\\{' + k + '\\}', 'g'), v);
  }

  return text;
}

// ===== Language Detection =====
function detectLanguage() {
  const lang = navigator.language || navigator.userLanguage || 'en';

  // zh-CN, zh-SG, zh (without region) → zh-CN
  if (lang === 'zh-CN' || lang === 'zh-SG' || lang === 'zh') {
    return 'zh-CN';
  }
  // zh-HK, zh-TW, zh-Hant → zh-HK
  if (lang === 'zh-HK' || lang === 'zh-TW' || lang === 'zh-Hant' || lang.startsWith('zh-Hant')) {
    return 'zh-HK';
  }
  // Any other zh- variant → zh-CN
  if (lang.startsWith('zh')) {
    return 'zh-CN';
  }

  return 'en';
}

// ===== Initialize Language =====
async function initLanguage() {
  return new Promise((resolve) => {
    chrome.storage.local.get(LANG_STORAGE_KEY, (result) => {
      const saved = result[LANG_STORAGE_KEY];
      if (saved && SUPPORTED_LANGS.includes(saved)) {
        currentLang = saved;
      } else {
        currentLang = detectLanguage();
      }
      resolve(currentLang);
    });
  });
}

// ===== Set Language =====
async function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  currentLang = lang;
  return new Promise((resolve) => {
    chrome.storage.local.set({ [LANG_STORAGE_KEY]: lang }, resolve);
  });
}

// ===== Apply Translations to DOM =====
function applyTranslations() {
  // Update html lang attribute
  document.documentElement.lang = currentLang;

  // Translate data-i18n elements (textContent)
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      // Special handling for elements containing links
      if (key === 'footer_powered' || key === 'api_key_hint') {
        const link = el.querySelector('a');
        if (link) {
          const linkHtml = link.outerHTML;
          const translated = t(key, { link: linkHtml });
          el.innerHTML = translated;
        }
      } else {
        el.textContent = t(key);
      }
    }
  });

  // Translate data-i18n-placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      el.placeholder = t(key);
    }
  });

  // Translate data-i18n-title attributes
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      el.title = t(key);
    }
  });

  // Update language selector active state
  document.querySelectorAll('.lang-option').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}
