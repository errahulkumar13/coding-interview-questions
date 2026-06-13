const users = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Frontend Developer",
    email: "aarav.sharma@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Maya Iyer",
    role: "Backend Developer",
    email: "maya.iyer@example.com",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Kabir Mehta",
    role: "Full Stack Developer",
    email: "kabir.mehta@example.com",
    status: "Active",
  },
  {
    id: 4,
    name: "Nisha Rao",
    role: "QA Engineer",
    email: "nisha.rao@example.com",
    status: "Pending",
  },
];

const table = document.querySelector("#users-table");
const searchInput = document.querySelector("#search-input");
const emptyState = document.querySelector("#empty-state");

function formatHeader(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function createCell(tagName, text, className) {
  const cell = document.createElement(tagName);
  cell.textContent = text;

  if (className) {
    cell.className = className;
  }

  return cell;
}

function renderTable(data) {
  table.replaceChildren();

  if (data.length === 0) {
    emptyState.hidden = false;
    table.hidden = true;
    return;
  }

  emptyState.hidden = true;
  table.hidden = false;

  const headers = Object.keys(data[0]);
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  headers.forEach((header) => {
    headerRow.appendChild(createCell("th", formatHeader(header)));
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  data.forEach((user) => {
    const row = document.createElement("tr");

    headers.forEach((header) => {
      const value = user[header];
      const isStatusCell = header === "status";
      const cell = createCell("td", value, isStatusCell ? "status-cell" : "");

      if (isStatusCell) {
        const normalizedStatus = String(value).toLowerCase();
        cell.dataset.status = normalizedStatus;
      }

      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
}

function filterUsers(searchTerm) {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (!normalizedSearch) {
    return users;
  }

  return users.filter((user) =>
    Object.values(user).some((value) => String(value).toLowerCase().includes(normalizedSearch)),
  );
}

searchInput.addEventListener("input", (event) => {
  renderTable(filterUsers(event.target.value));
});

renderTable(users);
