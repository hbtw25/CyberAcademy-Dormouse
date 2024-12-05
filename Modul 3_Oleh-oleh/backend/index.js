const express = require("express"); // Panggil library express
const cors = require("cors"); // Tambahkan cors untuk menangani CORS

const app = express();
const PORT = 3000; // Gunakan port 3000

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
let groups = [
  {
    group_name: "dormouse",
    student1: { student_name: "hbtw", student_id: "103032430021", student_class: "it-48-02" },
    student2: { student_name: "saha", student_id: "103032430022", student_class: "if-48-01" },
    student3: { student_name: "weh", student_id: "103032430023", student_class: "tf-48-01" },
    student4: { student_name: "ah", student_id: "103032430025", student_class: "si-48-01" },
  },
];

// Routes

// Get all groups
app.get("/groups", (req, res) => {
  res.json(groups); // Tampilkan seluruh grup
});

// Get a specific group by name
app.get("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const group = groups.find((g) => g.group_name === groupName);
  if (!group) return res.status(404).json({ error: "Group not found" });
  res.json(group);
});

// Add a new group or add members to an existing group
app.post("/groups", (req, res) => {
  const { group_name, student1, student2, student3, student4 } = req.body;

  if (!group_name) {
    return res.status(400).json({ error: "Group name is required" });
  }

  // Check if the group already exists
  const group = groups.find((g) => g.group_name === group_name);
  if (group) {
    // Add new members to the existing group
    if (student1) group.student1 = student1;
    if (student2) group.student2 = student2;
    if (student3) group.student3 = student3;
    if (student4) group.student4 = student4;

    return res.status(200).json(group);
  }

  // If the group doesn't exist, create a new one
  const newGroup = { group_name, student1, student2, student3, student4 };
  groups.push(newGroup);
  res.status(201).json(newGroup);
});

// Update a group by name
app.put("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const { group_name, student1, student2, student3, student4 } = req.body;

  const group = groups.find((g) => g.group_name === groupName); 
  if (!group) return res.status(404).json({ error: "Group not found" });

  if (group_name) group.group_name = group_name;
  if (student1) group.student1 = student1;
  if (student2) group.student2 = student2;
  if (student3) group.student3 = student3;
  if (student4) group.student4 = student4;

  res.json(group);
});

// Delete a group by name
app.delete("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const groupIndex = groups.findIndex((g) => g.group_name === groupName);

  if (groupIndex === -1) {
    return res.status(404).json({ error: "Group not found" });
  }

  groups.splice(groupIndex, 1);

  res.status(200).json({
    message: `The Group "${groupName}" has been deleted successfully.`,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
