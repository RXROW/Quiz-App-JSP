import React, { useEffect, useState } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { privateInstance } from "../../../services/apis/apisConfig";
import { GROUP, STUDENT } from "../../../services/apis/apisUrls";
import Modalrr from "./mode";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [students, setStudents] = useState([]);

  // Fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await privateInstance.get(GROUP.GET_ALL);
        setGroups(response.data?.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await privateInstance.get(
          STUDENT.GET_ALL_WITHOUT_GROUP
        );
        setStudents(response.data?.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    if (isModalOpen) fetchStudents();
  }, [isModalOpen]);

  const handleAddGroup = async () => {
    try {
      const res = await privateInstance.post(GROUP.CREATE_GROUP, {
        name: newGroupName,
        students: selectedStudents,
      });

      console.log("Group created:", res.data);
      setIsModalOpen(false);
      setNewGroupName("");
      setSelectedStudents([]);

      // Refresh groups after adding
      const refreshed = await privateInstance.get(GROUP.GET_ALL);
      setGroups(refreshed.data?.data);
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6 relative">
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-4 flex items-center gap-1 text-black bg-white px-4 py-1 rounded-full border border-black"
        >
          <PlusCircle size={18} />
          Add Group
        </button>

        <h2 className="text-xl font-semibold mb-6">Groups list</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg p-4 flex justify-between items-center shadow-sm"
            >
              <div>
                <p className="font-medium">Group: {group.name}</p>
                <p className="text-sm text-gray-600">
                  No. of students: {group.students?.length || 0}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="text-gray-600 hover:text-blue-600">
                  <Pencil size={18} />
                </button>
                <button className="text-gray-600 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Add Group */}
        <Modalrr
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddGroup}
          title="Create Group"
        >
          <div className="flex flex-col gap-4">
            <div className="flex overflow-hidden rounded-md border border-gray-300 w-full">
              <span className="bg-[#FFEBDD] px-4 py-2 text-sm text-black whitespace-nowrap">
                Group Name
              </span>
              <input
                type="text"
                className="flex-1 px-4 py-2 text-sm outline-none"
                placeholder=""
              />
            </div>
            <div className="flex overflow-hidden rounded-md border border-gray-300 w-full h-10">
              <span className="bg-[#FFEBDD] px-4 py-2 text-sm text-black whitespace-nowrap">
                List Students
              </span>
              <select
                multiple
                value={selectedStudents}
                onChange={(e) =>
                  setSelectedStudents(
                    Array.from(e.target.selectedOptions, (opt) => opt.value)
                  )
                }
                className="flex-1 px-4 py-2 text-sm outline-none h-full"
              >
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Modalrr>
      </div>
    </div>
  );
};

export default Groups;
