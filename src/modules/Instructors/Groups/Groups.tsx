import React, { useEffect, useState } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { privateInstance } from "../../../services/apis/apisConfig";
import { GROUP, STUDENT } from "../../../services/apis/apisUrls";
import ModalGroup from "./ModalGroup";
import { Group, Student } from "../../../interfaces/authInterfaces";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import Pagination from "../../Shared/Pagination/Pagination";

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<Group | null>(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(groups.length / itemsPerPage);

  const paginatedGroups = groups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await privateInstance.get(GROUP.GET_ALL);
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await privateInstance.get(STUDENT.GET_ALL);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    if (isModalOpen) fetchStudents();
  }, [isModalOpen]);

  // add
  const openAddModal = () => {
    setEditingGroup(null);
    setNewGroupName("");
    setSelectedStudents([]);
    setIsModalOpen(true);
  };

  //edit
  const handleEditGroup = (group: Group) => {
    setEditingGroup(group);
    setNewGroupName(group.name);
    setSelectedStudents(group.students);
    setIsModalOpen(true);
  };

  // new group
  const handleAddGroup = async () => {
    try {
      await privateInstance.post(GROUP.CREATE_GROUP, {
        name: newGroupName,
        students: selectedStudents,
      });
      setIsModalOpen(false);
      refreshGroups();
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  // update
  const handleUpdateGroup = async () => {
    if (!editingGroup) return;

    try {
      await privateInstance.put(GROUP.UPDATE_GROUP(editingGroup._id), {
        name: newGroupName,
        students: selectedStudents,
      });
      setIsModalOpen(false);
      setEditingGroup(null);
      refreshGroups();
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  const refreshGroups = async () => {
    try {
      const refreshed = await privateInstance.get(GROUP.GET_ALL);
      setGroups(refreshed.data);
      setNewGroupName("");
      setSelectedStudents([]);
    } catch (error) {
      console.error("Error refreshing groups:", error);
    }
  };

  const handleDeleteGroup = async () => {
    if (!groupToDelete) return;

    try {
      await privateInstance.delete(GROUP.DELETE_GROUP(groupToDelete._id));
      setIsDeleteModalOpen(false);
      setGroupToDelete(null);
      refreshGroups();
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };
  const confirmDeleteGroup = (group: Group) => {
    setGroupToDelete(group);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6 relative">
        <button
          onClick={openAddModal}
          className="absolute top-4 right-4 flex items-center gap-1 text-black bg-white px-4 py-1 rounded-full border border-black"
        >
          <PlusCircle size={18} />
          Add Group
        </button>

        <h2 className="text-xl font-semibold mb-6">Groups list</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedGroups.map((group, index) => (
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
                <button
                  className="text-gray-600 hover:text-blue-600"
                  onClick={() => handleEditGroup(group)}
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="text-gray-600 hover:text-red-600"
                  onClick={() => confirmDeleteGroup(group)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <ModalGroup
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingGroup(null);
            setNewGroupName("");
            setSelectedStudents([]);
          }}
          onSubmit={editingGroup ? handleUpdateGroup : handleAddGroup}
          title={editingGroup ? "Update Group" : "Create Group"}
        >
          <div className="flex flex-col gap-4">
            <div className="flex overflow-hidden rounded-md border border-gray-300 w-full">
              <span className="bg-[#FFEBDD] px-4 py-2 text-sm text-black whitespace-nowrap">
                Group Name
              </span>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="flex-1 px-4 py-2 text-sm outline-none"
                placeholder=""
              />
            </div>
            <div className="flex overflow-hidden rounded-md border border-gray-300 w-full h-30">
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
                {students
                  .filter(
                    (student) =>
                      !student.group ||
                      (editingGroup &&
                        editingGroup.students?.some(
                          (s) => s._id === student._id
                        ))
                  )
                  .map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.first_name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </ModalGroup>
      </div>

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteGroup}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setGroupToDelete(null);
        }}
        title="Delete Group"
        message={`Are you sure you want to delete the group "${groupToDelete?.name}"? This action cannot be undone.`}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Groups;
