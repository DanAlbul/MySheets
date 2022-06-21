import "../src/scss/index.scss";

import { Excel } from "../src/components/excel/Excel.js";
import { Header } from "../src/components/header/Header.js";
import { Toolbar } from "../src/components/toolbar/Toolbar.js";
import { Formula } from "../src/components/formula/Formula.js";
import { Table } from "../src/components/table/Table.js";

const excel = new Excel("#app", {
   components: [Header, Toolbar, Formula, Table],
});

excel.render();
