// src/pages/Students.js

import React, { useEffect, useState } from "react";

function Students() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    npm: "",
    nama: "",
    kelas: "",
    password: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch existing students data from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  // Function to add or update a student
  const handleAddOrUpdateStudent = async (e) => {
    e.preventDefault();

    try {
      if (editingIndex !== null) {
        // Update existing student
        const studentId = students[editingIndex]._id;
        const response = await fetch(
          `http://localhost:3000/api/users/${studentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudent),
          }
        );

        if (!response.ok) throw new Error("Failed to update student");
        const updatedStudent = await response.json();
        const updatedStudents = [...students];
        updatedStudents[editingIndex] = updatedStudent; // Update student in state
        setStudents(updatedStudents);
        setEditingIndex(null); // Clear editing index
      } else {
        // Add new student
        const response = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStudent),
        });

        if (!response.ok) throw new Error("Failed to add student");
        const addedStudent = await response.json();
        setStudents([...students, addedStudent]); // Add new student to state
      }
    } catch (error) {
      console.error("Error processing student:", error);
    } finally {
      // Reset form
      setNewStudent({ npm: "", nama: "", kelas: "", password: "" });
    }
  };

  // Function to handle editing a student
  const handleEdit = (index) => {
    setNewStudent(students[index]); // Set the selected student to the form
    setEditingIndex(index); // Mark the index as editing
  };

  // Function to handle deleting a student
  const handleDelete = async (index) => {
    const studentId = students[index]._id;
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${studentId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) throw new Error("Failed to delete student");
        const updatedStudents = students.filter((_, i) => i !== index);
        setStudents(updatedStudents); // Remove the deleted student from the state
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Students Page</h2>
      <form onSubmit={handleAddOrUpdateStudent} className="mb-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <input
            type="text"
            placeholder="NPM"
            value={newStudent.npm}
            onChange={(e) =>
              setNewStudent({ ...newStudent, npm: e.target.value })
            }
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Nama"
            value={newStudent.nama}
            onChange={(e) =>
              setNewStudent({ ...newStudent, nama: e.target.value })
            }
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Kelas"
            value={newStudent.kelas}
            onChange={(e) =>
              setNewStudent({ ...newStudent, kelas: e.target.value })
            }
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={newStudent.password}
            onChange={(e) =>
              setNewStudent({ ...newStudent, password: e.target.value })
            }
            required
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          {editingIndex !== null ? "Update Student" : "Add Student"}
        </button>
      </form>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b text-left">NPM</th>
            <th className="py-2 px-4 border-b text-left">Nama</th>
            <th className="py-2 px-4 border-b text-left">Kelas</th>
            <th className="py-2 px-4 border-b text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{student.npm}</td>
              <td className="py-2 px-4 border-b">{student.nama}</td>
              <td className="py-2 px-4 border-b">{student.kelas}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
