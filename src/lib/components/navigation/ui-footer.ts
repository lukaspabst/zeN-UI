import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-footer')
export class ZenFooter extends LitElement {
    @property({ type: String }) logoText = 'ZEN';
    @property({ type: String }) copyright = '';
    @property({ type: String }) variant: 'simple' | 'detailed' = 'detailed';

    static styles = css`
    :host {
      display: block;
    }

    .footer {
      background: linear-gradient(180deg, transparent, rgba(102, 126, 234, 0.05));
      border-top: 1px solid var(--zen-glass-border);
      padding: 60px 40px 40px;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Detailed variant */
    .footer-top {
      display: grid;
      grid-template-columns: 2fr repeat(3, 1fr);
      gap: 60px;
      margin-bottom: 48px;
    }

    @media (max-width: 768px) {
      .footer-top {
        grid-template-columns: 1fr;
        gap: 40px;
      }
    }

    .footer-brand {
      max-width: 300px;
    }

    .footer-logo {
      font-size: 1.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--zen-primary), #f093fb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 16px;
    }

    .footer-description {
      color: var(--zen-text-2);
      font-size: 0.9375rem;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .social-links {
      display: flex;
      gap: 12px;
    }

    .social-link {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--zen-glass-bg);
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-md);
      color: var(--zen-text-2);
      text-decoration: none;
      transition: all 0.2s;
      font-size: 1.1rem;
    }

    .social-link:hover {
      background: var(--zen-primary);
      border-color: var(--zen-primary);
      color: white;
      transform: translateY(-3px);
    }

    .footer-column h4 {
      color: var(--zen-text-1);
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0 0 20px 0;
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .footer-link {
      color: var(--zen-text-2);
      text-decoration: none;
      font-size: 0.9375rem;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .footer-link:hover {
      color: var(--zen-primary);
      transform: translateX(4px);
    }

    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 32px;
      border-top: 1px solid var(--zen-glass-border);
      flex-wrap: wrap;
      gap: 16px;
    }

    .copyright {
      color: var(--zen-text-2);
      font-size: 0.875rem;
    }

    .footer-bottom-links {
      display: flex;
      gap: 24px;
    }

    .footer-bottom-link {
      color: var(--zen-text-2);
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.2s;
    }

    .footer-bottom-link:hover {
      color: var(--zen-text-1);
    }

    /* Simple variant */
    :host([variant="simple"]) .footer {
      padding: 32px 40px;
    }

    :host([variant="simple"]) .footer-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 24px;
    }

    :host([variant="simple"]) .footer-top,
    :host([variant="simple"]) .footer-bottom {
      display: contents;
      border: none;
      padding: 0;
      margin: 0;
    }

    /* Newsletter */
    .newsletter {
      margin-top: 24px;
    }

    .newsletter-title {
      color: var(--zen-text-1);
      font-size: 0.9375rem;
      font-weight: 500;
      margin-bottom: 12px;
    }

    .newsletter-form {
      display: flex;
      gap: 8px;
    }

    .newsletter-input {
      flex: 1;
      padding: 12px 16px;
      background: var(--zen-glass-bg);
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-md);
      color: var(--zen-text-1);
      font-family: inherit;
      font-size: 0.9375rem;
    }

    .newsletter-input::placeholder {
      color: var(--zen-text-2);
    }

    .newsletter-button {
      padding: 12px 20px;
      background: var(--zen-primary);
      border: none;
      border-radius: var(--zen-radius-md);
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .newsletter-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
  `;

    render() {
        const year = new Date().getFullYear();
        const copyrightText = this.copyright || `© ${year} ${this.logoText}. All rights reserved.`;

        if (this.variant === 'simple') {
            return html`
        <footer class="footer">
          <div class="footer-content">
            <div class="footer-logo">${this.logoText}</div>
            <span class="copyright">${copyrightText}</span>
            <div class="social-links">
              <a href="#" class="social-link">𝕏</a>
              <a href="#" class="social-link">📘</a>
              <a href="#" class="social-link">📸</a>
              <a href="#" class="social-link">💼</a>
            </div>
          </div>
        </footer>
      `;
        }

        return html`
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-top">
            <div class="footer-brand">
              <div class="footer-logo">${this.logoText}</div>
              <p class="footer-description">
                Building beautiful, modern interfaces with premium components and stunning visual effects.
              </p>
              <div class="social-links">
                <a href="#" class="social-link">𝕏</a>
                <a href="#" class="social-link">📘</a>
                <a href="#" class="social-link">📸</a>
                <a href="#" class="social-link">💼</a>
              </div>
              
              <div class="newsletter">
                <div class="newsletter-title">Subscribe to our newsletter</div>
                <div class="newsletter-form">
                  <input type="email" class="newsletter-input" placeholder="Enter your email">
                  <button class="newsletter-button">Subscribe</button>
                </div>
              </div>
            </div>
            
            <div class="footer-column">
              <h4>Product</h4>
              <div class="footer-links">
                <a href="#" class="footer-link">Features</a>
                <a href="#" class="footer-link">Pricing</a>
                <a href="#" class="footer-link">Changelog</a>
                <a href="#" class="footer-link">Roadmap</a>
              </div>
            </div>
            
            <div class="footer-column">
              <h4>Resources</h4>
              <div class="footer-links">
                <a href="#" class="footer-link">Documentation</a>
                <a href="#" class="footer-link">Tutorials</a>
                <a href="#" class="footer-link">Blog</a>
                <a href="#" class="footer-link">Support</a>
              </div>
            </div>
            
            <div class="footer-column">
              <h4>Company</h4>
              <div class="footer-links">
                <a href="#" class="footer-link">About</a>
                <a href="#" class="footer-link">Careers</a>
                <a href="#" class="footer-link">Press</a>
                <a href="#" class="footer-link">Contact</a>
              </div>
            </div>
          </div>
          
          <div class="footer-bottom">
            <span class="copyright">${copyrightText}</span>
            <div class="footer-bottom-links">
              <a href="#" class="footer-bottom-link">Privacy Policy</a>
              <a href="#" class="footer-bottom-link">Terms of Service</a>
              <a href="#" class="footer-bottom-link">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    `;
    }
}
