import { ExcelComponent } from "../../core/ExcelComponent.js";
import { $ } from "../../core/dom.js";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  init() {
    // Добавляем DOM элементы к компоненту Formula
    super.init();

    this.$formula = this.$root.find('#formula')

    this.$on("table:select", (text) => {
      this.$formula.text(text);
    });

    this.$on("table:input", (text) => {
      this.$formula.text(text);
    })
  }

  onInput(event) {
    this.$emit("formula:input", $(event.target).text());
  }

  onKeydown(event) {
    const keys = ["Enter", "Tab"];
    const { key } = event;
    if (keys.includes(key)) {
      event.preventDefault();
      this.$emit("formula:done");
    }
  }
}
