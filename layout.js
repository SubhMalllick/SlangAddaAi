/* layout.js - shared UI interactions for SlangAdda
   Include with <script src="/path/to/layout.js" defer></script>
*/

(function () {
  /* ---------- Helpers ---------- */
  function qs(sel, ctx=document){ return ctx.querySelector(sel) }
  function qsa(sel, ctx=document){ return Array.from(ctx.querySelectorAll(sel)) }

  /* ---------- Custom Cursor ---------- */
  function initCursor() {
    const cursor = qs('.cursor');
    const follower = qs('.cursor-follower');
    if (!cursor || !follower) return;

    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      // slight delay follower
      clearTimeout(follower._t);
      follower._t = setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
      }, 50);
    });

    // enlarge on interactive elements
    const interactive = 'a,button,.btn,.chip,.nav-link,input,textarea,select';
    qsa(interactive).forEach(el=>{
      el.addEventListener('mouseenter', ()=> {
        cursor.style.transform = 'translate(-50%,-50%) scale(0.65)';
        follower.style.transform = 'translate(-50%,-50%) scale(1.25)';
      });
      el.addEventListener('mouseleave', ()=> {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        follower.style.transform = 'translate(-50%,-50%) scale(1)';
      });
    });
  }

  /* ---------- Header scroll ---------- */
  function initHeaderScroll() {
    const header = qs('.header');
    if (!header) return;
    function onScroll(){
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  /* ---------- Notifications (slide-in) ---------- */
  function showNotification(text, opts={duration:2800}) {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.bottom = '24px';
    wrapper.style.right = '24px';
    wrapper.style.background = 'linear-gradient(135deg,#06b6d4,#6366f1,#ec4899)';
    wrapper.style.color = 'white';
    wrapper.style.padding = '0.9rem 1.2rem';
    wrapper.style.borderRadius = '12px';
    wrapper.style.boxShadow = '0 20px 40px rgba(15,23,42,0.45)';
    wrapper.style.zIndex = 99999;
    wrapper.style.maxWidth = '360px';
    wrapper.style.fontSize = '0.95rem';
    wrapper.style.animation = 'slideIn .32s ease forwards';
    wrapper.style.lineHeight = '1.3';
    wrapper.innerHTML = `<div style="display:flex;gap:.6rem;align-items:center;margin-bottom:.3rem;"><i class="fas fa-robot"></i><strong>SlangAdda AI</strong></div><div>${text}</div>`;
    document.body.appendChild(wrapper);
    setTimeout(()=> wrapper.remove(), opts.duration || 2800);
  }

  /* expose global notification */
  window.showNotification = showNotification;

  /* ---------- Chat widget ---------- */
  function initChat() {
    const toggle = qs('#chatToggle') || qs('.chat-btn');
    const windowEl = qs('#chatWindow') || qs('.chat-window');
    const messages = qs('#chatMessages') || qs('.chat-messages');
    const input = qs('#chatInput') || qs('.chat-input');

    if (!toggle || !windowEl || !messages || !input) return;

    function toggleChat() {
      windowEl.classList.toggle('active');
    }

    function addMessage(text, cls) {
      const div = document.createElement('div');
      div.className = 'message ' + cls;
      div.textContent = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function generateAIResponse(query){
      const canned = [
        `Nice! I can help explain "${query}". Click any slang card for deeper context.`,
        `Tip: use filters to see office-safe or family-safe usage for "${query}".`,
        `Want pronunciation audio? We can add that to the audio library soon.`,
        `If you share a screenshot or exact sentence, I can give a usage suggestion.`
      ];
      const r = canned[Math.floor(Math.random() * canned.length)];
      setTimeout(()=> addMessage(r, 'ai'), 700);
    }

    toggle.addEventListener('click', toggleChat);
    // delegated close button support
    qsa('.chat-close').forEach(b => b.addEventListener('click', toggleChat));

    input.addEventListener('keypress', function(e){
      if (e.key === 'Enter') {
        const txt = input.value.trim();
        if (!txt) return;
        addMessage(txt, 'user');
        input.value = '';
        generateAIResponse(txt);
      }
    });

    // expose minimal api for other scripts
    window.addMessageToChat = addMessage;
    window.toggleSlangChat = toggleChat;
  }

  /* ---------- FAQ toggles ---------- */
  function initFAQ(){
    qsa('.faq-question').forEach(q=>{
      q.addEventListener('click', ()=>{
        const item = q.parentElement;
        item.classList.toggle('active');
      });
    });
  }

  /* ---------- Small utilities & init ---------- */
  function initLinkHoverBindings(){
    // keep cursor hover behavior in case DOM changes later
    const interactive = 'a,button,.btn,.chip,.nav-link,input,textarea,select';
    const bind = () => {
      qsa(interactive).forEach(el=>{
        el.addEventListener('mouseenter', ()=> {
          const cursor = qs('.cursor'), follower = qs('.cursor-follower');
          if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(0.65)';
          if (follower) follower.style.transform = 'translate(-50%,-50%) scale(1.25)';
        });
        el.addEventListener('mouseleave', ()=> {
          const cursor = qs('.cursor'), follower = qs('.cursor-follower');
          if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
          if (follower) follower.style.transform = 'translate(-50%,-50%) scale(1)';
        });
      });
    };
    // run now, and again after slight delay (for SPA-ish or late-loaded content)
    bind();
    setTimeout(bind, 700);
  }

  /* ---------- Initialization ---------- */
  function initSharedUI(){
    initCursor();
    initHeaderScroll();
    initChat();
    initFAQ();
    initLinkHoverBindings();
    // helpful global functions
    window.showNotification = window.showNotification || showNotification;
  }

  // auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSharedUI);
  } else {
    initSharedUI();
  }

  // export util for other page-level scripts
  window.SlangAdda = window.SlangAdda || {};
  window.SlangAdda.notify = showNotification;
  window.SlangAdda.init = initSharedUI;

})();
