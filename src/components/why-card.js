/**
 * WhyCard — displays a cause → mechanism → effect reasoning card.
 * Listens for 'why-card' events bubbling up from view-chat.
 */
class WhyCardDisplay extends HTMLElement {
  constructor() {
    super();
    this._cards = [];
  }

  connectedCallback() {
    this._handler = (e) => this._addCard(e.detail);
    document.addEventListener("why-card", this._handler);
    this._render();
  }

  disconnectedCallback() {
    document.removeEventListener("why-card", this._handler);
  }

  _addCard(card) {
    this._cards.push(card);
    this._render();
  }

  _render() {
    this.innerHTML = this._cards
      .map(
        (card) => `
      <div class="why-card">
        <h3>Why?</h3>
        <p><b>Cause:</b> ${card.cause}</p>
        <p><b>Mechanism:</b> ${card.mechanism}</p>
        <p><b>Effect:</b> ${card.effect}</p>
      </div>`
      )
      .join("");
  }
}

customElements.define("why-card-display", WhyCardDisplay);
