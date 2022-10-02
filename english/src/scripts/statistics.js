import { cards } from "./cards";
import { main } from '../../src/index.js';
export function generateStatistics() {
    const statistics = document.createElement('div');
    statistics.classList.add('stat');
    const statContainer = document.createElement('div');
    statContainer.classList.add('container');
    main.append(statistics);
    statistics.append(statContainer);


    const statButtons = document.createElement('div');
    statButtons.classList.add('stat-buttons');
    statContainer.append(statButtons);
    const repeatDiff = document.createElement('button');
    repeatDiff.classList.add('stat-repeat', 'btn', 'btn-info');
    repeatDiff.textContent = 'Repeat difficult words';
    const statReset = document.createElement('button');
    statReset.classList.add('stat-reset', 'btn', 'btn-info');
    statReset.textContent = 'Reset';
    statButtons.append(repeatDiff);
    statButtons.append(statReset);
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-success');
    statContainer.append(table);
    const tableHead = document.createElement('thead');
    table.append(tableHead);
    tableHead.innerHTML = ` <tr>
              <th scope="col">Word</th>
              <th scope="col">Clicked</th>
              <th scope="col">Translation</th>
              <th scope="col">Correct</th>
              <th scope="col">Wrong</th>
              <th scope="col">%</th>

          </tr>`;
    const tableBody = document.createElement('tbody');
    table.append(tableBody);
    generateStatisticsRow(cards, tableBody)
  }


  export function generateStatisticsRow() {
      let statArr = JSON.parse(localStorage.getItem('statistics'));

    for (const arr of statArr) {
       const row = document.createElement('tr');
      let cell = document.createElement('td');
      cell.textContent = arr.word;
      row.appendChild(cell);
      cell = document.createElement('td');
      cell.textContent = arr.clicked;
      row.appendChild(cell);
      cell = document.createElement('td');
      cell.textContent = arr.translation;
      row.appendChild(cell);
      cell = document.createElement('td');
      cell.textContent = arr.correct;
      row.appendChild(cell);
      cell = document.createElement('td');
      cell.textContent =arr.wrong;
      row.appendChild(cell);
      cell = document.createElement('td');
      cell.textContent = isNaN(100*arr.correct/(arr.wrong+arr.correct)) ? '-' : 100*arr.correct/(arr.wrong+arr.correct)
      row.appendChild(cell);
   const tableBody = document.querySelector('tbody');
      tableBody.appendChild(row)
    }

  }



