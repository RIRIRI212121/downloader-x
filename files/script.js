/* ============================================
   つい保存ナビ - 画面の動きをまとめたファイル
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- トップページの検索機能 ---------- */
  var searchInput = document.querySelector("#search-input");
  var cards = document.querySelectorAll(".article-card");
  var noResult = document.querySelector(".no-result");

  function runSearch() {
    if (!searchInput) return;
    var keyword = searchInput.value.trim().toLowerCase();
    var visibleCount = 0;

    cards.forEach(function (card) {
      var text = card.textContent.toLowerCase();
      var hit = text.indexOf(keyword) !== -1;
      card.style.display = hit ? "" : "none";
      if (hit) visibleCount++;
    });

    if (noResult) {
      noResult.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", runSearch);
    var searchForm = document.querySelector(".search-box");
    if (searchForm) {
      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        runSearch();
      });
    }
  }

  /* ---------- 記事ページ:目次をクリックしたら移動 + 今読んでいる場所をハイライト ---------- */
  var tocLinks = document.querySelectorAll(".toc-nav a");
  var headings = document.querySelectorAll(".article-body [id]");

  if (tocLinks.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            tocLinks.forEach(function (link) {
              link.classList.remove("active");
              if (link.getAttribute("href") === "#" + entry.target.id) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    headings.forEach(function (h) {
      observer.observe(h);
    });
  }

  /* ---------- 目次の「閉じる/開く」ボタン ---------- */
  var tocBlock = document.querySelector("#toc-block");
  var tocToggle = document.querySelector(".toc-toggle");
  if (tocBlock && tocToggle) {
    tocToggle.addEventListener("click", function () {
      var collapsed = tocBlock.classList.toggle("collapsed");
      tocToggle.textContent = collapsed ? "開く" : "閉じる";
      tocToggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
    });
  }

  /* ---------- コメントフォームの送信(簡易版:画面上にお礼を表示するだけ) ---------- */
  var commentForm = document.querySelector(".comment-form");
  if (commentForm) {
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var thanks = document.querySelector(".comment-thanks");
      if (thanks) {
        thanks.style.display = "block";
      }
      commentForm.reset();
    });
  }
});
