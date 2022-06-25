import { ExcelComponent } from "../../core/ExcelComponent.js";
import { $ } from "../../core/dom.js";
import { createTable } from "./table.template.js";
import { resizeHandler } from "./table.resize.js";
import { isCell, matrix, nextSelector, shouldResize } from "./table.functions";
import { TableSelection } from "../table/TableSelection.js";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();


    const $cell = this.$root.find('[data-id="0:0"]');

    // Sending default cell data to formula after initialization
    this.$emit("table:select", $cell.$el.innerHTML); 
    this.selection.select($cell);

    this.$on("formula:input", (text) => {
      this.selection.current.text(text);
    });

    this.$on("formula:done", () => {
      this.selection.current.focus();
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }

      const text = event.target.textContent.trim();
      this.$emit("table:select", text);
    }
  }

  onKeydown(event) {
    const keys = [
      "Enter",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "ArrowUp",
    ];

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next);

      this.$emit("table:select", $next.$el.innerHTML);
    }
  }

  onInput(event) {
    if (isCell(event)) {
      //const text = event.target.textContent.trim();
      this.$emit("table:input", $(event.target).text());
    }
  }
}
