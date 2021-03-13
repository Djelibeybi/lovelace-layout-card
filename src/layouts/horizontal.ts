import { css, html, LitElement, property } from "lit-element";
import {
  CardConfigGroup,
  LovelaceCard,
  MasonryViewConfig,
  ViewConfig,
} from "../types";
import { ResizeObserver } from "resize-observer/lib/ResizeObserver";
import { BaseColumnLayout } from "./base-column-layout";

class HorizontalLayout extends BaseColumnLayout {
  async _placeColumnCards(cols: Array<Node>, cards: CardConfigGroup[]) {
    let i = 0;
    for (const c of cards) {
      i += 1;
      if (c.config.layout?.column) i = c.config.layout.column;
      const col = cols[(i - 1) % cols.length];
      col.appendChild(this.getCardElement(c));
      if (this.isBreak(c.card)) {
        i = 0;
        if (!this.lovelace?.editMode) {
          col.removeChild(c.card);
        }
      }
    }
  }
}

customElements.define("horizontal-layout", HorizontalLayout);
