import React, { useState, useEffect } from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

/* -------------------------------------------------------
    ADD STUDENT MODAL  (Frontend Only — No Backend Call)
--------------------------------------------------------- */
const AddStudentModal = ({ onClose, onSubmit }) => {
  const [guardianName, setGuardianName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [grade, setGrade] = useState("");
  const [childNames, setChildNames] = useState([""]);

  const handleChildNameChange = (index, value) => {
    const updated = [...childNames];
    updated[index] = value;
    setChildNames(updated);
  };

  const addChildField = () => {
    if (childNames.length < 4) setChildNames([...childNames, ""]);
  };

  const handleSubmit = () => {
    const validChildren = childNames.filter((c) => c.trim() !== "");

    onSubmit({
      guardianName,
      vehicleNumber,
      grade,
      children: validChildren
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card w-full max-w-lg rounded-xl p-6 shadow-xl border border-border">
        <h2 className="text-xl font-semibold mb-4">Add New Student</h2>

        <div className="space-y-3">
          <Input
            placeholder="Guardian Name"
            value={guardianName}
            onChange={(e) => setGuardianName(e.target.value)}
          />

          <Input
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />

          <Input
            placeholder="Grade (Example: 5th Grade)"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />

          <div>
            <label className="block text-sm mb-1">Children</label>

            {childNames.map((child, index) => (
              <Input
                key={index}
                placeholder={`Child ${index + 1} Name`}
                value={child}
                onChange={(e) => handleChildNameChange(index, e.target.value)}
                className="mb-2"
              />
            ))}

            {childNames.length < 4 && (
              <Button variant="outline" size="sm" onClick={addChildField}>
                + Add Another Child
              </Button>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="default" onClick={handleSubmit}>Add Student</Button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------
    MAIN COMPONENT
--------------------------------------------------------- */
const StudentManagementTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [students, setStudents] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  /* ------------------------------------------
      LOAD STUDENTS FROM BACKEND (existing users)
  -------------------------------------------- */
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/students");
      const users = await res.json();

      const formatted = [];

      users.forEach((user) => {
        const children = [
          user.child1_name,
          user.child2_name,
          user.child3_name,
          user.child4_name
        ].filter(Boolean);

        children.forEach((child, index) => {
          formatted.push({
            id: `${user.user_id}-${index + 1}`,
            name: child,
            grade: user.grade || "N/A",
            guardianName: user.full_name,
            guardianPhoto:
              user.guardian_photo ||
              "/public/assets/images/icons8-administrator-male-80.png",
            guardianPhotoAlt: user.full_name,
            vehicle_number: user.vehicle_number,
            status: "Active",
            enrollmentDate: user.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : "—"
          });
        });
      });

      setStudents(formatted);
    } catch (err) {
      console.error("Failed to load students:", err);
    }
  };

  /* ---------------------------------------------------
      ⭐ ADD STUDENT LOCALLY — FRONTEND ONLY
  ------------------------------------------------------ */
  const handleAddStudent = (data) => {
    const { guardianName, vehicleNumber, grade, children } = data;

    const newEntries = children.map((childName, index) => ({
      id: `${Date.now()}-${index}`,
      name: childName,
      grade: grade || "N/A",
      guardianName,
      guardianPhoto: "/public/assets/images/icons8-administrator-male-80.png",
      guardianPhotoAlt: guardianName,
      vehicle_number: vehicleNumber,
      status: "Active",
      enrollmentDate: new Date().toLocaleDateString()
    }));

    setStudents((prev) => [...prev, ...newEntries]);
  };

  /* ------------------------------------------
      FILTER LOGIC
  -------------------------------------------- */
  const gradeOptions = [
    { value: 'all', label: 'All Grades' },
    { value: '3rd', label: '3rd Grade' },
    { value: '4th', label: '4th Grade' },
    { value: '5th', label: '5th Grade' },
    { value: '6th', label: '6th Grade' }
  ];

  const filteredStudents = students.filter((student) => {
    const s = searchQuery.toLowerCase();
    const matchesSearch =
      student.name.toLowerCase().includes(s) ||
      student.guardianName.toLowerCase().includes(s) ||
      student.vehicle_number.toLowerCase().includes(s);

    const matchesGrade =
      selectedGrade === "all" || student.grade.includes(selectedGrade);

    return matchesSearch && matchesGrade;
  });

  /* ------------------------------------------
      RENDER
  -------------------------------------------- */
  return (
    <div className="space-y-6">
      {/* Search + Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search by student name, guardian, or vehicle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select
            options={gradeOptions}
            value={selectedGrade}
            onChange={setSelectedGrade}
            className="w-40"
          />

          <Button variant="outline" iconName="Upload">Import</Button>
          <Button variant="outline" iconName="Download">Export</Button>

          <Button
            variant="default"
            iconName="Plus"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Student
          </Button>
        </div>
      </div>

      {/* STUDENTS TABLE */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Student</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Guardian</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Vehicle</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Enrolled</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{student.name}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={student.guardianPhoto}
                        alt={student.guardianPhotoAlt}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span>{student.guardianName}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-mono">{student.vehicle_number}</td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-success/10 text-success text-xs">
                      Active
                    </span>
                  </td>

                  <td className="px-6 py-4 text-muted-foreground text-sm">
                    {student.enrollmentDate}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" iconName="Edit" />
                      <Button variant="ghost" size="sm" iconName="Trash2" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {filteredStudents.length} of {students.length} students</span>
      </div>

      {/* ADD STUDENT MODAL */}
      {isAddModalOpen && (
        <AddStudentModal
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddStudent}
        />
      )}
    </div>
  );
};

export default StudentManagementTab;
