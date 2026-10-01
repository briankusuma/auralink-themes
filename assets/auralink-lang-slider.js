/**
 * AuraLink Language Slider Web Component (Figma Node 2655:276 / 2899:1097)
 */
if (!customElements.get('auralink-lang-slider')) {
  customElements.define(
    'auralink-lang-slider',
    class AuraLinkLangSlider extends HTMLElement {
      connectedCallback() {
        this.form = this.querySelector('form');
        this.input = this.querySelector('input[name="locale_code"]');
        this.buttons = this.querySelectorAll('.auralink-lang-btn');

        this.buttons.forEach((btn) => {
          btn.addEventListener('click', this.handleLangClick.bind(this));
        });
      }

      handleLangClick(event) {
        event.preventDefault();
        const button = event.currentTarget;
        const targetLocale = button.dataset.locale;

        if (!targetLocale) return;

        // Visual state update
        this.buttons.forEach((btn) => {
          btn.classList.remove('auralink-lang-btn--active');
          btn.setAttribute('aria-checked', 'false');
        });

        button.classList.add('auralink-lang-btn--active');
        button.setAttribute('aria-checked', 'true');

        if (this.input) {
          this.input.value = targetLocale;
        }

        // Submit Shopify native localization form
        if (this.form) {
          this.form.submit();
        }
      }
    }
  );
}
