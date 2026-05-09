// ===== i18n Module =====

const LANG_STORAGE_KEY = 'mnurl_language';
const SUPPORTED_LANGS = ['en', 'zh-CN', 'zh-HK', 'ja', 'ko', 'de'];
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
    url_label: 'URL',
    url_placeholder: 'Enter URL or use current page',
    btn_reset_url: 'Reset to current page',
    err_invalid_url: 'Please enter a valid URL (http:// or https://)',
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
    err_network: 'No network connection. Please check your internet.',
    toast_generated: 'Short URL generated successfully!',
    toast_deleted: 'Link deleted successfully!',
    history_search_placeholder: 'Search links...',
    btn_delete_title: 'Delete',
    confirm_delete: 'Are you sure you want to delete this short link?',
    err_delete_fail: 'Failed to delete link. Please try again.',
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
    url_label: '网址',
    url_placeholder: '输入网址或使用当前页面',
    btn_reset_url: '恢复为当前页面',
    err_invalid_url: '请输入有效的网址（http:// 或 https://）',
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
    err_network: '网络连接失败，请检查网络设置。',
    toast_generated: '短链接生成成功！',
    toast_deleted: '链接已删除！',
    history_search_placeholder: '搜索链接...',
    btn_delete_title: '删除',
    confirm_delete: '确定要删除这个短链接吗？',
    err_delete_fail: '删除链接失败，请重试。',
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
    url_label: '網址',
    url_placeholder: '輸入網址或使用目前頁面',
    btn_reset_url: '恢復為目前頁面',
    err_invalid_url: '請輸入有效的網址（http:// 或 https://）',
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
    err_network: '網絡連接失敗，請檢查網絡設定。',
    toast_generated: '短網址產生成功！',
    toast_deleted: '連結已刪除！',
    history_search_placeholder: '搜尋連結...',
    btn_delete_title: '刪除',
    confirm_delete: '確定要刪除這個短網址嗎？',
    err_delete_fail: '刪除連結失敗，請重試。',
  },

  ja: {
    title: '短縮URL',
    subtitle: '短縮URLジェネレーター',
    btn_history: '履歴',
    btn_settings: '設定',
    api_key_label: 'APIキー',
    api_key_placeholder: 'mnurl.com APIキーを入力',
    btn_show_hide: '表示/非表示',
    api_key_hint: '{link} からAPIキーを取得',
    btn_save: '保存',
    setup_title: 'APIキーが必要です',
    setup_desc: 'mnurl.comのAPIキーを設定して短縮URLの生成を開始してください。',
    btn_go_settings: '設定へ移動',
    current_page: '現在のページ',
    loading: '読み込み中...',
    url_label: 'URL',
    url_placeholder: 'URLを入力または現在のページを使用',
    btn_reset_url: '現在のページに戻す',
    err_invalid_url: '有効なURLを入力してください（http:// または https://）',
    btn_generate: '短縮URLを生成',
    btn_regenerate: '再生成',
    generating: '生成中...',
    short_url_label: '短縮URL',
    btn_copy: 'コピー',
    copied: 'コピーしました！',
    history_label: '履歴',
    btn_refresh: '更新',
    history_loading: '履歴を読み込み中...',
    history_empty: 'まだ短縮URLが作成されていません。',
    clicks: '{count} クリック',
    prev: '前へ',
    next: '次へ',
    footer_powered: '{link} 提供',
    welcome: 'ようこそ、{name}',
    user_default: 'ユーザー',
    url_error: '現在のページURLを取得できません',
    url_internal: 'ブラウザ内部ページは短縮できません',
    err_invalid_key: '有効なAPIキーを入力してください。',
    err_key_saved: 'APIキーを保存しました！',
    err_generate_fail: '短縮URLの生成に失敗しました。もう一度お試しください。',
    err_auth: '認証に失敗しました。設定でAPIキーを確認してください。',
    err_rate_limit: 'レート制限に達しました。しばらくしてからお試しください。',
    err_request: 'リクエスト失敗（HTTP {status}）{detail}',
    err_link_id: '作成レスポンスからlink_idを取得できませんでした。',
    err_slug: 'リンク詳細からURLスラッグを取得できませんでした。',
    err_history: '履歴の読み込みに失敗しました。',
    language_label: '言語',
    btn_copy_title: 'クリップボードにコピー',
    btn_open_title: '開く',
    btn_back: '戻る',
    plan_free: '無料',
    plan_plus: 'プラス',
    plan_pro: 'プロ',
    plan_expires: '有効期限：{date}',
    links_limit_label: '短縮済み：{used} / {limit}',
    links_limit_unlimited: '短縮済み：{used} / 無制限',
    err_links_limit: 'リンク数の上限に達しました。プランをアップグレードしてください。',
    btn_upgrade: 'アップグレード',
    btn_renew: '更新',
    btn_subscribe: '登録',
    err_network: 'ネットワーク接続がありません。インターネット接続を確認してください。',
    toast_generated: '短縮URLが正常に生成されました！',
    toast_deleted: 'リンクが削除されました！',
    history_search_placeholder: 'リンクを検索...',
    btn_delete_title: '削除',
    confirm_delete: 'この短縮URLを削除してもよろしいですか？',
    err_delete_fail: 'リンクの削除に失敗しました。もう一度お試しください。',
  },

  ko: {
    title: '단축 URL',
    subtitle: '단축 URL 생성기',
    btn_history: '기록',
    btn_settings: '설정',
    api_key_label: 'API 키',
    api_key_placeholder: 'mnurl.com API 키를 입력하세요',
    btn_show_hide: '표시/숨기기',
    api_key_hint: '{link}에서 API 키를 받으세요',
    btn_save: '저장',
    setup_title: 'API 키가 필요합니다',
    setup_desc: '단축 URL 생성을 시작하려면 mnurl.com API 키를 설정하세요.',
    btn_go_settings: '설정으로 이동',
    current_page: '현재 페이지',
    loading: '로딩 중...',
    url_label: 'URL',
    url_placeholder: 'URL을 입력하거나 현재 페이지 사용',
    btn_reset_url: '현재 페이지로 초기화',
    err_invalid_url: '유효한 URL을 입력하세요 (http:// 또는 https://)',
    btn_generate: '단축 URL 생성',
    btn_regenerate: '재생성',
    generating: '생성 중...',
    short_url_label: '단축 URL',
    btn_copy: '복사',
    copied: '복사됨!',
    history_label: '기록',
    btn_refresh: '새로고침',
    history_loading: '기록 로딩 중...',
    history_empty: '아직 생성된 단축 URL이 없습니다.',
    clicks: '{count}회 클릭',
    prev: '이전',
    next: '다음',
    footer_powered: '{link} 제공',
    welcome: '환영합니다, {name}',
    user_default: '사용자',
    url_error: '현재 페이지 URL을 가져올 수 없습니다',
    url_internal: '브라우저 내부 페이지는 단축할 수 없습니다',
    err_invalid_key: '유효한 API 키를 입력하세요.',
    err_key_saved: 'API 키가 저장되었습니다!',
    err_generate_fail: '단축 URL 생성에 실패했습니다. 다시 시도하세요.',
    err_auth: '인증에 실패했습니다. 설정에서 API 키를 확인하세요.',
    err_rate_limit: '요청 한도에 도달했습니다. 잠시 후 다시 시도하세요.',
    err_request: '요청 실패 (HTTP {status}){detail}',
    err_link_id: '생성 응답에서 link_id를 가져오지 못했습니다.',
    err_slug: '링크 상세에서 URL 슬러그를 가져오지 못했습니다.',
    err_history: '기록을 불러오지 못했습니다.',
    language_label: '언어',
    btn_copy_title: '클립보드에 복사',
    btn_open_title: '열기',
    btn_back: '뒤로',
    plan_free: '무료',
    plan_plus: '플러스',
    plan_pro: '프로',
    plan_expires: '만료일: {date}',
    links_limit_label: '단축 완료: {used} / {limit}',
    links_limit_unlimited: '단축 완료: {used} / 무제한',
    err_links_limit: '링크 한도에 도달했습니다. 플랜을 업그레이드하세요.',
    btn_upgrade: '업그레이드',
    btn_renew: '갱신',
    btn_subscribe: '구독',
    err_network: '네트워크 연결이 없습니다. 인터넷 연결을 확인하세요.',
    toast_generated: '단축 URL이 생성되었습니다!',
    toast_deleted: '링크가 삭제되었습니다!',
    history_search_placeholder: '링크 검색...',
    btn_delete_title: '삭제',
    confirm_delete: '이 단축 URL을 삭제하시겠습니까?',
    err_delete_fail: '링크 삭제에 실패했습니다. 다시 시도하세요.',
  },

  de: {
    title: 'Kurz-URL',
    subtitle: 'Kurz-URL-Generator',
    btn_history: 'Verlauf',
    btn_settings: 'Einstellungen',
    api_key_label: 'API-Schlüssel',
    api_key_placeholder: 'mnurl.com API-Schlüssel eingeben',
    btn_show_hide: 'Anzeigen/Ausblenden',
    api_key_hint: 'API-Schlüssel von {link} erhalten',
    btn_save: 'Speichern',
    setup_title: 'API-Schlüssel erforderlich',
    setup_desc: 'Bitte konfigurieren Sie Ihren mnurl.com API-Schlüssel, um Kurz-URLs zu erstellen.',
    btn_go_settings: 'Zu Einstellungen',
    current_page: 'Aktuelle Seite',
    loading: 'Laden...',
    url_label: 'URL',
    url_placeholder: 'URL eingeben oder aktuelle Seite verwenden',
    btn_reset_url: 'Auf aktuelle Seite zurücksetzen',
    err_invalid_url: 'Bitte geben Sie eine gültige URL ein (http:// oder https://)',
    btn_generate: 'Kurz-URL erstellen',
    btn_regenerate: 'Neu erstellen',
    generating: 'Wird erstellt...',
    short_url_label: 'Kurz-URL',
    btn_copy: 'Kopieren',
    copied: 'Kopiert!',
    history_label: 'Verlauf',
    btn_refresh: 'Aktualisieren',
    history_loading: 'Verlauf wird geladen...',
    history_empty: 'Noch keine Kurz-URLs erstellt.',
    clicks: '{count} Klicks',
    prev: 'Zurück',
    next: 'Weiter',
    footer_powered: 'Bereitgestellt von {link}',
    welcome: 'Willkommen, {name}',
    user_default: 'Benutzer',
    url_error: 'Aktuelle Seiten-URL konnte nicht abgerufen werden',
    url_internal: 'Browser-interne Seiten können nicht gekürzt werden',
    err_invalid_key: 'Bitte geben Sie einen gültigen API-Schlüssel ein.',
    err_key_saved: 'API-Schlüssel erfolgreich gespeichert!',
    err_generate_fail: 'Kurz-URL konnte nicht erstellt werden. Bitte versuchen Sie es erneut.',
    err_auth: 'Authentifizierung fehlgeschlagen. Bitte überprüfen Sie Ihren API-Schlüssel in den Einstellungen.',
    err_rate_limit: 'Ratenlimit erreicht. Bitte versuchen Sie es später erneut.',
    err_request: 'Anfrage fehlgeschlagen (HTTP {status}){detail}',
    err_link_id: 'link_id konnte nicht aus der Erstellungsantwort abgerufen werden.',
    err_slug: 'URL-Slug konnte nicht aus den Linkdetails abgerufen werden.',
    err_history: 'Verlauf konnte nicht geladen werden.',
    language_label: 'Sprache',
    btn_copy_title: 'In Zwischenablage kopieren',
    btn_open_title: 'Öffnen',
    btn_back: 'Zurück',
    plan_free: 'Kostenlos',
    plan_plus: 'Plus',
    plan_pro: 'Pro',
    plan_expires: 'Läuft ab: {date}',
    links_limit_label: 'Gekürzt: {used} / {limit}',
    links_limit_unlimited: 'Gekürzt: {used} / Unbegrenzt',
    err_links_limit: 'Link-Limit erreicht. Bitte upgraden Sie Ihren Plan.',
    btn_upgrade: 'Upgrade',
    btn_renew: 'Erneuern',
    btn_subscribe: 'Abonnieren',
    err_network: 'Keine Netzwerkverbindung. Bitte überprüfen Sie Ihre Internetverbindung.',
    toast_generated: 'Kurz-URL erfolgreich erstellt!',
    toast_deleted: 'Link erfolgreich gelöscht!',
    history_search_placeholder: 'Links suchen...',
    btn_delete_title: 'Löschen',
    confirm_delete: 'Möchten Sie diesen Kurzlink wirklich löschen?',
    err_delete_fail: 'Link konnte nicht gelöscht werden. Bitte versuchen Sie es erneut.',
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
  // Japanese
  if (lang === 'ja' || lang.startsWith('ja-')) {
    return 'ja';
  }
  // Korean
  if (lang === 'ko' || lang.startsWith('ko-')) {
    return 'ko';
  }
  // German
  if (lang === 'de' || lang.startsWith('de-')) {
    return 'de';
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
