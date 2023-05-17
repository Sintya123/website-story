const Dashboard = {
  async init() {
    await this._initialData();
  },

  async _initialData() {
    const fetchRecords = await fetch('/data/DATA.json');
    const responseRecords = await fetchRecords.json();
    this._userlistStory = responseRecords.results.listStory;
    this._populatelistStoryRecordToTable(this._userlistStory);
    this._populatelistStoryDataToCard(this._userlistStory);
  },

  _populatelistStoryDataToCard(listStory = null) {
    if (!(typeof listStory === 'object')) {
      throw new Error(
        `Parameter transactionsHistory should be an object. The value is ${listStory}`,
      );
    }

    if (!Array.isArray(listStory)) {
      throw new Error(
        `Parameter transactionsHistory should be an array. The value is ${listStory}`,
      );
    }

    let usermasuk = 0;
    let userkeluar = 0;

    listStory.forEach((item) => {
      if (item.type === 'usermasuk') {
        usermasuk += item.name;
      } else if (item.type === 'userkeluar') {
        userkeluar += item.name;
      }
    });

    document.querySelector('#pengguna').innerText =listStory.length;
    document.querySelector('#usermasuk').innerText = usermasuk;
    document.querySelector('#userkeluar').innerText = userkeluar;
  },

  _populatelistStoryRecordToTable(listStory = null) {
    if (!(typeof istStory=== 'object')) {
      throw new Error(
        `Parameter listStory should be an object. The value is ${listStory}`,
      );
    }

    if (!Array.isArray(listStory)) {
      throw new Error(
        `Parameter listStoryshould be an array. The value is ${listStory}`,
      );
    }

    const recordBodyTable = document.querySelector('#recordsTable tbody');

    recordBodyTable.innerHTML = '';
    if (listStory.length <= 0) {
      recordBodyTable.innerHTML = this._templateEmptyBodyTable();
      return;
    }

    listStory.forEach((item, idx) => {
      recordBodyTable.innerHTML += this._templateBodyTable(idx, listStory[idx]);
    });
  },

  _templateBodyTable(index, listStoryRecord) {
    return `
      <tr>
        <th class="text-center">${parseInt(index, 10) + 1}</th>
        <td>${listStoryRecord.id === 'income' ? 'Pemasukan' : 'Pengeluaran'}</td>
        <td>${listStoryRecord.name}</td>
        <td>${listStoryRecord.description}</td>
        <td>${listStoryRecord.createdAt}</td>
        <td>
          <div class="d-flex justify-content-center align-items-center gap-2">
            <a class="btn btn-sm btn-primary" href="#">
              <i class="bi bi-eye-fill me-1"></i>Show
            </a>
            <a class="btn btn-sm btn-warning" href="#">
              <i class="bi bi-pen-fill me-1"></i>Edit
            </a>
            <a class="btn btn-sm btn-danger" href="#">
              <i class="bi bi-trash3-fill me-1"></i>Delete
            </a>
          </div>
        </td>
      </tr>
    `;
  },

  _templateEmptyBodyTable() {
    const recordHeadTable = document.querySelector('#recordsTable thead');

    return `
      <tr>
        <td colspan="${recordHeadTable.querySelectorAll('td,th').length}">
          <div class="text-center">Tidak ada catatan transaksi</div>
        </td>
      </tr>
    `;
  },
};

export default Dashboard;
