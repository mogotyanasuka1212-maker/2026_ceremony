// --- 1. ハンバーガーメニューの動き ---

// HTMLにある「三本線ボタン」と「メニュー」を探して、変数（箱）に入れる
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

// ボタンがクリックされた時の動きを登録
hamburgerBtn.addEventListener('click', () => {
    // メニューに 'open' というクラスをつけたり外したりする
    // (CSSで 'open' がつくと画面に出てくるように設定しています)
    navMenu.classList.toggle('open');
});

// メニュー内のリンクをクリックしたら、メニューを閉じる
// (閉じておかないと、画面がメニューで隠れたままになってしまうため)
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});


// --- 2. カウントダウンタイマーの動き ---

// カウントダウンを表示する場所を探す
const countdownElement = document.getElementById('countdown');

// 目標の日時を設定（令和8年1月11日 11:10）
const targetDate = new Date('2026-01-11T11:10:00');

function updateCountdown() {
    // 今の時間
    const now = new Date();
    
    // 目標までの残り時間（ミリ秒）を計算
    const diff = targetDate - now;

    // もし時間が過ぎていたら
    if (diff < 0) {
        countdownElement.textContent = "開催しました！";
        return;
    }

    // 残りの「日」「時間」「分」「秒」を計算する
    // Math.floor は「切り捨て」という意味です
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 画面の文字を書き換える
    countdownElement.textContent = `${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;
}

// 1秒ごとに updateCountdown を実行して時間を更新する
setInterval(updateCountdown, 1000);

// 画面が開いた瞬間にも一度実行しておく
updateCountdown();

// --- 3. 現在のページをハイライトする（確実版） ---

// すべてのメニューリンクを取得
const menuLinks = document.querySelectorAll('#nav-menu a');

// 今のページのURL（全体）を取得
const currentUrl = window.location.href;

menuLinks.forEach(link => {
    // リンク先のファイル名（例：access.html）を取得
    const linkHref = link.getAttribute('href');

    // 条件チェック
    // 1. 今のURLの中に、リンク先のファイル名が含まれているか？ (例: .../access.html に access.html がある)
    // 2. または、トップページ（URLが / で終わる）で、かつリンクが index.html か？
    if (currentUrl.indexOf(linkHref) !== -1 || (currentUrl.endsWith('/') && linkHref === 'index.html')) {
        link.classList.add('active');
    }
});