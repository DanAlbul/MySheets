import { DomListener } from "./DomListener.js";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";

    this.prepare();
  }

  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return "";
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
