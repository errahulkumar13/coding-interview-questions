type UserStatus = "Active" | "Inactive" | "Pending";

type User = {
  id: number;
  name: string;
  role: string;
  email: string;
  status: UserStatus;
};

const users: User[] = [
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

function getRequiredElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Required element is missing: ${selector}`);
  }

  return element;
}

const table = getRequiredElement<HTMLTableElement>("#users-table");
const searchInput = getRequiredElement<HTMLInputElement>("#search-input");
const emptyState = getRequiredElement<HTMLParagraphElement>("#empty-state");

function formatHeader(key: keyof User): string {
  return String(key).replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function createCell(tagName: "th" | "td", text: string | number, className = ""): HTMLTableCellElement {
  const cell = document.createElement(tagName);
  cell.textContent = String(text);

  if (className) {
    cell.className = className;
  }

  return cell;
}

function renderTable(data: User[]): void {
  table.replaceChildren();

  if (data.length === 0) {
    emptyState.hidden = false;
    table.hidden = true;
    return;
  }

  emptyState.hidden = true;
  table.hidden = false;

  const headers = Object.keys(data[0]) as Array<keyof User>;
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
        cell.dataset.status = String(value).toLowerCase();
      }

      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
}

function filterUsers(searchTerm: string): User[] {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (!normalizedSearch) {
    return users;
  }

  return users.filter((user) =>
    Object.values(user).some((value) => String(value).toLowerCase().includes(normalizedSearch)),
  );
}

searchInput.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  renderTable(filterUsers(target.value));
});

renderTable(users);
