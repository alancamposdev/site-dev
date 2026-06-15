const template = () => `
    <footer class="footer">
      <div class="footer__container">          
        <div class="footer__copy">
          <p>
            Desenvolvido por
            <strong class="footer__copy-name">Alan Campos</strong>
            com
            <span class="footer__copy-stack"> HTML · CSS · JS </span>
            e muito café
            <span class="footer__copy-coffee" title="e muito café" aria-hidden="true">
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                role="img"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.4"
                >
                  <path d="M3 8h12v5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
                  <path d="M15 10h1a3 3 0 0 0 0-3h-1" />
                  <path
                    class="steam-path"
                    d="M8.5 3.5c0 .8-.8 1.5-.5 2.5.4 1.4 2 1.2 2 2.5"
                    stroke-opacity="0.9"
                  />
                  <path
                    class="steam-path steam-path--mid"
                    d="M10.5 3c0 .7-.6 1.3-.4 2 0 .8.9 1.2.9 2"
                    stroke-opacity="0.7"
                  />
                  <path
                    class="steam-path stan-path--slow"
                    d="M12.5 3.5c0 .6-.5 1.1-.3 1.8.2.9 1 1 1 1.8"
                    stroke-opacity="0.6"
                  />
                </g>
              </svg>
            </span>
            &mdash; &copy; ${new Date().getFullYear()}
          </p>
          <code class="footer__url">// Full-stack Dev</code>
        </div>
      </div>
    </footer>
  `

class Footer extends HTMLElement {
  connectedCallback() {
    this.outerHTML = template();
  }
}

customElements.define('ac-footer', Footer);
