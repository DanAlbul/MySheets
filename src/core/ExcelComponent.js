import { DomListener } from "./DomListener.js";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.unsubs = [];

    this.prepare();
  }

  // Настраиваем компонент до inii
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return "";
  }

  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubs.push(unsub);
  }
  // Инициализируем компонент, добавляем DOM слушаетелей
  init() {
    this.initDOMListeners();
  }

  // Удаляем компонент, чистим слушателей
  // Отписываем слушателей от событий
  destroy() {
    this.removeDOMListeners();
    this.unsubs.forEach((unsub) => unsub());
  }
}
