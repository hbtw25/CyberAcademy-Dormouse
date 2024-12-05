const API_URL_PRODUCTS = "https://dummyjson.com/products";
const API_URL_GROUPS = "http://localhost:3000/groups"; // Backend endpoint

// Fetch Produk API
const loadProducts = async () => {
  const productList = document.getElementById("product-list");
  try {
    const response = await fetch(API_URL_PRODUCTS);
    const data = await response.json();
    const products = data.products.slice(0, 8); // Batasi 10 produk

    productList.innerHTML = products
      .map(
        (product) => `
      <div class="col-lg-3 col-md-4 col-sm-6">
        <div class="card shadow-sm h-100">
          <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.title}</h5>
            <p class="text-muted mb-2">${product.brand}</p>
            <p class="card-text small">${product.description.slice(0, 50)}...</p>
            <p class="fw-bold text-primary">$${product.price}</p>
            <button class="btn btn-sm btn-outline-primary mt-auto">Buy Now</button>
          </div>
        </div>
      </div>`
      )
      .join("");
  } catch (error) {
    console.error("Error fetching products:", error);
    productList.innerHTML = `<p class="text-danger text-center">Failed to load products.</p>`;
  }
};


const API_BASE = "http://localhost:3000/groups";

// DOM Elements
const groupSection = document.getElementById("group-section");
const createGroupForm = document.getElementById("create-group-form");
const groupNameInput = document.getElementById("group-name");
const groupsListSection = document.getElementById("groups-list-section");
const groupsList = document.getElementById("groups-list");
const editStudentsSection = document.getElementById("edit-students-section");
const studentsList = document.getElementById("students-list");
const backToGroupsButton = document.getElementById("back-to-groups");
const currentGroupSpan = document.getElementById("current-group");

let currentGroup = null;

// Fetch and display all groups
const fetchGroups = async () => {
  const response = await fetch(API_BASE);
  const groups = await response.json();

  groupsList.innerHTML = "";
  groups.forEach((group) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    const groupName = document.createElement("span");
    groupName.innerText = group.group_name;

    const btnContainer = document.createElement("div");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm ms-2";
    deleteBtn.innerText = "Delete Group";
    deleteBtn.onclick = () => deleteGroup(group.group_name);

    const manageBtn = document.createElement("button");
    manageBtn.className = "btn btn-info btn-sm";
    manageBtn.innerText = "Manage Students";
    manageBtn.onclick = () => manageGroup(group);

    btnContainer.appendChild(manageBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(groupName);
    li.appendChild(btnContainer);

    groupsList.appendChild(li);
  });
};

// Create a new group
createGroupForm.onsubmit = async (e) => {
  e.preventDefault();
  const groupName = groupNameInput.value;
  if (!groupName) return;

  await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ group_name: groupName }),
  });

  groupNameInput.value = "";
  fetchGroups();
};

// Delete a group
const deleteGroup = async (groupName) => {
  await fetch(`${API_BASE}/${groupName}`, { method: "DELETE" });
  fetchGroups();
};

// Manage group (show students)
const manageGroup = (group) => {
  currentGroup = group;
  currentGroupSpan.innerText = group.group_name;
  studentsList.innerHTML = "";

  for (let i = 1; i <= 4; i++) {
    const student = group[`student${i}`];
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    if (student) {
      const studentInfo = document.createElement("span");
      studentInfo.innerText = `${student.student_name} (ID: ${student.student_id}, Class: ${student.student_class})`;

      const btnContainer = document.createElement("div");
      const editBtn = document.createElement("button");
      editBtn.className = "btn btn-warning btn-sm";
      editBtn.innerText = "Edit";
      editBtn.onclick = () => editStudent(i);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-danger btn-sm ms-2";
      deleteBtn.innerText = "Delete";
      deleteBtn.onclick = () => deleteStudent(i);

      btnContainer.appendChild(editBtn);
      btnContainer.appendChild(deleteBtn);

      li.appendChild(studentInfo);
      li.appendChild(btnContainer);
    } else {
      const addBtn = document.createElement("button");
      addBtn.className = "btn btn-success btn-sm";
      addBtn.innerText = "Add Student";
      addBtn.onclick = () => addStudent(i);
      li.appendChild(addBtn);
    }

    studentsList.appendChild(li);
  }

  groupSection.classList.add("hidden");
  groupsListSection.classList.add("hidden");
  editStudentsSection.classList.remove("hidden");
};

// Add a student
const addStudent = async (studentIndex) => {
  const studentName = prompt("Enter student name:");
  const studentID = prompt("Enter student ID:");
  const studentClass = prompt("Enter student class:");

  if (!studentName || !studentID || !studentClass) return;

  currentGroup[`student${studentIndex}`] = {
    student_name: studentName,
    student_id: studentID,
    student_class: studentClass,
  };

  await updateGroup();
};

// Edit a student
const editStudent = async (studentIndex) => {
  const student = currentGroup[`student${studentIndex}`];
  const studentName = prompt("Edit student name:", student.student_name);
  const studentID = prompt("Edit student ID:", student.student_id);
  const studentClass = prompt("Edit student class:", student.student_class);

  if (!studentName || !studentID || !studentClass) return;

  currentGroup[`student${studentIndex}`] = {
    student_name: studentName,
    student_id: studentID,
    student_class: studentClass,
  };

  await updateGroup();
};

// Delete a student
const deleteStudent = async (studentIndex) => {
  currentGroup[`student${studentIndex}`] = null;
  await updateGroup();
};

// Update group on server
const updateGroup = async () => {
  await fetch(`${API_BASE}/${currentGroup.group_name}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(currentGroup),
  });

  manageGroup(currentGroup);
};

// Back to groups view
backToGroupsButton.onclick = () => {
  groupSection.classList.remove("hidden");
  groupsListSection.classList.remove("hidden");
  editStudentsSection.classList.add("hidden");
  fetchGroups();
};

// Initial fetch
fetchGroups();




// Load data on page load
loadProducts();

