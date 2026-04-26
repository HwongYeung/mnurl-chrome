// ===== Constants =====
const API_BASE = 'https://mnurl.com/api/links';
const API_USER = 'https://mnurl.com/api/user';
const STORAGE_KEY = 'mnurl_api_key';

// ===== DOM Elements =====
// Views
const $mainView       = document.getElementById('mainView');
const $settingsView   = document.getElementById('settingsView');
const $historyView    = document.getElementById('historyView');
const $setupPrompt    = document.getElementById('setupPrompt');
const $normalContent  = document.getElementById('normalContent');

// Header
const $btnSettings    = document.getElementById('btnSettings');
const $btnHistory     = document.getElementById('btnHistory');

// Settings
const $apiKeyInput    = document.getElementById('apiKeyInput');
const $btnToggleKey   = document.getElementById('btnToggleKey');
const $iconEye        = document.getElementById('iconEye');
const $iconEyeOff     = document.getElementById('iconEyeOff');
const $btnSaveKey     = document.getElementById('btnSaveKey');
const $settingsMsg    = document.getElementById('settingsMsg');
const $btnGoSettings  = document.getElementById('btnGoSettings');
const $userCard       = document.getElementById('userCard');
const $userAvatar     = document.getElementById('userAvatar');
const $userName       = document.getElementById('userName');
const $userEmail      = document.getElementById('userEmail');
const $userPlanBadge  = document.getElementById('userPlanBadge');
const $headerSubtitle = document.getElementById('headerSubtitle');

// History
const $btnRefresh       = document.getElementById('btnRefresh');
const $historyLoading   = document.getElementById('historyLoading');
const $historyEmpty     = document.getElementById('historyEmpty');
const $historyError     = document.getElementById('historyError');
const $historyErrorMsg  = document.getElementById('historyErrorMsg');
const $historyList      = document.getElementById('historyList');

// Main
const $currentUrl     = document.getElementById('currentUrl');
const $btnGenerate    = document.getElementById('btnGenerate');
const $loading        = document.getElementById('loading');
const $resultSection  = document.getElementById('resultSection');
const $shortUrlInput  = document.getElementById('shortUrlInput');
const $btnCopy        = document.getElementById('btnCopy');
const $iconCopy       = document.getElementById('iconCopy');
const $iconCheck      = document.getElementById('iconCheck');
const $copyText       = document.getElementById('copyText');
const $errorSection   = document.getElementById('errorSection');
const $errorMsg       = document.getElementById('errorMsg');

// ===== State =====
let currentTabUrl  = '';
let apiToken       = '';
let copyTimeout    = null;
let currentView    = 'main'; // 'main' | 'settings' | 'history'

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', init);

async function init() {
  // Load saved API key
  apiToken = await loadApiKey();

  // Get current tab URL
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url) {
      currentTabUrl = tab.url;
      $currentUrl.textContent = currentTabUrl;
      $currentUrl.title = currentTabUrl;
    } else {
      currentTabUrl = '';
      $currentUrl.textContent = 'Unable to get current page URL';
      $btnGenerate.disabled = true;
    }
  } catch (err) {
    $currentUrl.textContent = 'Unable to get current page URL';
    $btnGenerate.disabled = true;
  }

  // Disable for browser internal pages
  if (currentTabUrl && (
    currentTabUrl.startsWith('chrome://') ||
    currentTabUrl.startsWith('chrome-extension://') ||
    currentTabUrl.startsWith('about:') ||
    currentTabUrl.startsWith('edge://')
  )) {
    $currentUrl.textContent = 'Cannot shorten browser internal pages';
    $btnGenerate.disabled = true;
  }

  // Show appropriate view
  updateView();

  // Load user info if API key is set
  if (apiToken) {
    loadUserInfo();
  }

  // Bind events
  $btnSettings.addEventListener('click', () => switchView(currentView === 'settings' ? 'main' : 'settings'));
  $btnHistory.addEventListener('click', () => switchView(currentView === 'history' ? 'main' : 'history'));
  $btnGoSettings.addEventListener('click', () => switchView('settings'));
  $btnSaveKey.addEventListener('click', handleSaveKey);
  $btnToggleKey.addEventListener('click', toggleKeyVisibility);
  $btnGenerate.addEventListener('click', handleGenerate);
  $btnCopy.addEventListener('click', handleCopy);
  $btnRefresh.addEventListener('click', () => loadHistory(1));
}

// ===== Storage =====
async function loadApiKey() {
  return new Promise((resolve) => {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
      resolve(result[STORAGE_KEY] || '');
    });
  });
}

async function saveApiKey(key) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: key }, resolve);
  });
}

// ===== View Management =====
function switchView(view) {
  currentView = view;
  hideSettingsMsg();
  updateView();

  if (view === 'history' && apiToken) {
    loadHistory();
  }
  if (view === 'settings') {
    $apiKeyInput.value = apiToken;
    setTimeout(() => $apiKeyInput.focus(), 50);
  }
}

function updateView() {
  // Hide all views
  $mainView.classList.add('hidden');
  $settingsView.classList.add('hidden');
  $historyView.classList.add('hidden');
  $btnSettings.classList.remove('active');
  $btnHistory.classList.remove('active');

  if (currentView === 'settings') {
    $settingsView.classList.remove('hidden');
    $btnSettings.classList.add('active');
    $apiKeyInput.value = apiToken;
  } else if (currentView === 'history') {
    $historyView.classList.remove('hidden');
    $btnHistory.classList.add('active');
  } else {
    // main
    $mainView.classList.remove('hidden');
    if (apiToken) {
      $setupPrompt.classList.add('hidden');
      $normalContent.classList.remove('hidden');
    } else {
      $setupPrompt.classList.remove('hidden');
      $normalContent.classList.add('hidden');
    }
  }
}

// ===== Settings: Save Key =====
async function handleSaveKey() {
  const key = $apiKeyInput.value.trim();

  if (!key) {
    showSettingsMsg('Please enter a valid API Key.', 'error');
    return;
  }

  apiToken = key;
  await saveApiKey(key);
  showSettingsMsg('API Key saved successfully!', 'success');

  // Reload user info with new key
  loadUserInfo();

  // Auto switch back to main view after a short delay
  setTimeout(() => {
    switchView('main');
  }, 1000);
}

// ===== Settings: Toggle Visibility =====
function toggleKeyVisibility() {
  const isPassword = $apiKeyInput.type === 'password';
  $apiKeyInput.type = isPassword ? 'text' : 'password';
  $iconEye.classList.toggle('hidden', isPassword);
  $iconEyeOff.classList.toggle('hidden', !isPassword);
}

// ===== Settings Message =====
function showSettingsMsg(msg, type) {
  $settingsMsg.textContent = msg;
  $settingsMsg.className = `settings-msg ${type}`;
  $settingsMsg.classList.remove('hidden');
}

function hideSettingsMsg() {
  $settingsMsg.classList.add('hidden');
  $settingsMsg.textContent = '';
}

// ===== Generate Short URL =====
async function handleGenerate() {
  if (!currentTabUrl || !apiToken) return;

  // UI: loading state
  hideError();
  hideResult();
  $btnGenerate.classList.add('hidden');
  $loading.classList.remove('hidden');

  try {
    const shortUrl = await createShortUrl(currentTabUrl);
    showResult(shortUrl);
  } catch (err) {
    showError(err.message || 'Failed to generate short URL. Please try again.');
    $btnGenerate.classList.remove('hidden');
  } finally {
    $loading.classList.add('hidden');
  }
}

// ===== API: Create Short URL =====
async function createShortUrl(url) {
  // Step 1: Create link and get link_id
  const linkId = await apiCreateLink(url);

  // Step 2: Query link detail to get the actual short URL slug
  const slug = await apiGetLinkSlug(linkId);

  return `https://mnurl.com/${slug}`;
}

// POST /api/links — create a new short link, return link_id
async function apiCreateLink(url) {
  const formData = new FormData();
  formData.append('location_url', url);

  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    handleApiError(response.status, await safeJson(response));
  }

  const data = await response.json();
  const linkData = data.data || data;
  const linkId = linkData.link_id || linkData.id;

  if (!linkId) {
    throw new Error('Failed to get link_id from create response.');
  }

  return linkId;
}

// GET /api/links/{link_id} — query link detail
async function apiGetLinkDetail(linkId) {
  const response = await fetch(`${API_BASE}/${linkId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) return null; // link deleted or not found
    handleApiError(response.status, await safeJson(response));
  }

  const data = await response.json();
  return data.data || data;
}

// GET /api/links/{link_id} — query link detail, return the url slug
async function apiGetLinkSlug(linkId) {
  const linkData = await apiGetLinkDetail(linkId);
  const slug = linkData?.url;

  if (!slug) {
    throw new Error('Failed to get url slug from link detail.');
  }

  return slug;
}

// Common error handler
function handleApiError(status, errorData) {
  if (status === 401 || status === 403) {
    throw new Error('Authentication failed. Please check your API Key in Settings.');
  } else if (status === 429) {
    throw new Error('Rate limit reached. Please try again later.');
  } else {
    const detail = errorData?.message || errorData?.error || '';
    throw new Error(`Request failed (HTTP ${status})${detail ? ': ' + detail : ''}`);
  }
}

// Safely parse JSON without throwing
async function safeJson(response) {
  try {
    return await response.json();
  } catch (_) {
    return null;
  }
}

// ===== User Info =====
async function loadUserInfo() {
  try {
    const user = await apiFetchUser();
    renderUserInfo(user);
  } catch (_) {
    // Silently fail — user card just stays hidden
    $userCard.classList.add('hidden');
    $headerSubtitle.textContent = 'Short URL Generator';
  }
}

async function apiFetchUser() {
  const response = await fetch(API_USER, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  const data = await response.json();
  return data.data || data;
}

function renderUserInfo(user) {
  const name = user.billing?.name || user.name || '';
  const email = user.email || '';
  const planId = user.billing?.plan_id || '';

  if (!name && !email) {
    $userCard.classList.add('hidden');
    return;
  }

  // Avatar: first letter of name
  const initial = (name || email).charAt(0).toUpperCase();
  $userAvatar.textContent = initial;

  // Name & email
  $userName.textContent = name || 'User';
  $userName.title = name || '';
  $userEmail.textContent = email;
  $userEmail.title = email;

  // Plan badge
  const planLabel = formatPlanName(planId);
  $userPlanBadge.textContent = planLabel;

  // Header subtitle: show welcome
  if (name) {
    $headerSubtitle.textContent = `Welcome, ${name}`;
  }

  $userCard.classList.remove('hidden');
}

function formatPlanName(planId) {
  if (!planId) return 'Free';
  // Capitalize and clean up plan_id string
  return planId
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ===== History =====
let historyPage = 1;
let historyTotalPages = 1;

async function loadHistory(page = 1) {
  // UI: loading
  $historyList.innerHTML = '';
  $historyEmpty.classList.add('hidden');
  $historyError.classList.add('hidden');
  $historyLoading.classList.remove('hidden');
  $btnRefresh.classList.add('spinning');
  hidePagination();

  try {
    const result = await apiFetchLinks(page);
    const allLinks = result.data || [];

    // Filter: only type === 'link'
    const links = allLinks.filter((item) => item.type === 'link');

    // Save pagination state (ensure integers)
    historyPage = parseInt(result.meta?.page, 10) || page;
    historyTotalPages = parseInt(result.meta?.total_pages, 10) || 1;

    $historyLoading.classList.add('hidden');
    $btnRefresh.classList.remove('spinning');

    if (links.length === 0 && historyPage === 1) {
      $historyEmpty.classList.remove('hidden');
      return;
    }

    renderHistoryList(links);
    renderPagination();
  } catch (err) {
    $historyLoading.classList.add('hidden');
    $btnRefresh.classList.remove('spinning');
    $historyErrorMsg.textContent = err.message || 'Failed to load history.';
    $historyError.classList.remove('hidden');
  }
}

// GET /api/links/ — fetch paginated link list
async function apiFetchLinks(page = 1) {
  const url = `${API_BASE}/?page=${page}&results_per_page=25`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
    },
  });

  if (!response.ok) {
    handleApiError(response.status, await safeJson(response));
  }

  return await response.json();
}

function renderHistoryList(links) {
  $historyList.innerHTML = '';

  links.forEach((link) => {
    const shortUrl = `https://mnurl.com/${link.url}`;
    const item = document.createElement('div');
    item.className = 'history-item';

    // Format date
    let dateStr = '';
    if (link.datetime) {
      const d = new Date(link.datetime + ' UTC');
      dateStr = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    }

    item.innerHTML = `
      <div class="history-item-top">
        <div class="history-short-url" title="${shortUrl}">${shortUrl}</div>
        <div class="history-item-actions">
          <button class="btn-history-copy" data-url="${shortUrl}" title="Copy">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
          <button class="btn-history-open" data-url="${shortUrl}" title="Open">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="15,3 21,3 21,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="history-location-url" title="${escapeHtml(link.location_url || '')}">${escapeHtml(link.location_url || '')}</div>
      <div class="history-meta">
        <span class="history-meta-item">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/></svg>
          ${link.clicks ?? 0} clicks
        </span>
        ${dateStr ? `<span class="history-meta-item">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          ${dateStr}
        </span>` : ''}
      </div>
    `;

    $historyList.appendChild(item);
  });

  // Bind copy & open events via delegation
  $historyList.querySelectorAll('.btn-history-copy').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const url = btn.dataset.url;
      copyToClipboard(url, btn);
    });
  });

  $historyList.querySelectorAll('.btn-history-open').forEach((btn) => {
    btn.addEventListener('click', () => {
      chrome.tabs.create({ url: btn.dataset.url });
    });
  });
}

// ===== Pagination =====
function renderPagination() {
  // Remove old pagination if any
  const oldPager = document.getElementById('historyPagination');
  if (oldPager) oldPager.remove();

  if (historyTotalPages <= 1) return;

  const pager = document.createElement('div');
  pager.id = 'historyPagination';
  pager.className = 'history-pagination';

  const btnPrev = document.createElement('button');
  btnPrev.className = 'btn-page';
  btnPrev.textContent = 'Prev';
  btnPrev.disabled = historyPage <= 1;
  btnPrev.addEventListener('click', () => loadHistory(historyPage - 1));

  const pageInfo = document.createElement('span');
  pageInfo.className = 'page-info';
  pageInfo.textContent = `${historyPage} / ${historyTotalPages}`;

  const btnNext = document.createElement('button');
  btnNext.className = 'btn-page';
  btnNext.textContent = 'Next';
  btnNext.disabled = historyPage >= historyTotalPages;
  btnNext.addEventListener('click', () => loadHistory(historyPage + 1));

  pager.appendChild(btnPrev);
  pager.appendChild(pageInfo);
  pager.appendChild(btnNext);

  $historyList.parentNode.appendChild(pager);
}

function hidePagination() {
  const oldPager = document.getElementById('historyPagination');
  if (oldPager) oldPager.remove();
}

async function copyToClipboard(text, btnEl) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (_) {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  // Visual feedback
  btnEl.classList.add('copied');
  const originalHTML = btnEl.innerHTML;
  btnEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  setTimeout(() => {
    btnEl.classList.remove('copied');
    btnEl.innerHTML = originalHTML;
  }, 1500);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== Copy to Clipboard (main result) =====
async function handleCopy() {
  const url = $shortUrlInput.value;
  if (!url) return;

  try {
    await navigator.clipboard.writeText(url);
    showCopiedState();
  } catch (_) {
    $shortUrlInput.select();
    document.execCommand('copy');
    showCopiedState();
  }
}

function showCopiedState() {
  $btnCopy.classList.add('copied');
  $iconCopy.classList.add('hidden');
  $iconCheck.classList.remove('hidden');
  $copyText.textContent = 'Copied!';

  if (copyTimeout) clearTimeout(copyTimeout);
  copyTimeout = setTimeout(() => {
    $btnCopy.classList.remove('copied');
    $iconCopy.classList.remove('hidden');
    $iconCheck.classList.add('hidden');
    $copyText.textContent = 'Copy';
  }, 2000);
}

// ===== UI Helpers =====
function showResult(shortUrl) {
  $shortUrlInput.value = shortUrl;
  $resultSection.classList.remove('hidden');
  $btnGenerate.classList.remove('hidden');
  $btnGenerate.querySelector('span').textContent = 'Regenerate';
  setTimeout(() => $shortUrlInput.select(), 50);
}

function hideResult() {
  $resultSection.classList.add('hidden');
  $shortUrlInput.value = '';
}

function showError(msg) {
  $errorMsg.textContent = msg;
  $errorSection.classList.remove('hidden');
}

function hideError() {
  $errorSection.classList.add('hidden');
  $errorMsg.textContent = '';
}
