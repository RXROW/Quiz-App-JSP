import { useEffect, useState } from "react";
import { CheckCircle, Loader, XCircle } from "lucide-react";

interface StudentModalProps {
  student: any;
  onClose: () => void;
  openModal: boolean;
}

export default function StudentModalDetails({
  student,
  onClose,
  openModal,
}: StudentModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (openModal) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [openModal]);

  if (!openModal) return null;

  return (
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20  bg-opacity-40 overflow-auto">
      

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-[600px] mx-auto">
        {/* Header */}
        <div className="flex justify-between border-b items-center">
          <h5 className="font-bold text-xl leading-6 p-5">Student Details</h5>
          <button
            type="button"
            className="text-2xl font-extrabold border-l py-5 w-[80px]"
            onClick={onClose}
          >
            ✗
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader className="animate-spin" color="#C5D86D" size={100} />
            </div>
          ) : (
            <>
              <div className="flex gap-4">
                <div className="w-full relative">
                  <div className="w-full bg-transparent text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[8.2rem] py-2">
                    {student?.first_name}
                  </div>
                  <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                    First Name:
                  </label>
                </div>
                <div className="w-full relative">
                  <div className="w-full bg-transparent text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[8.2rem] py-2">
                    {student?.last_name}
                  </div>
                  <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                    Last Name:
                  </label>
                </div>
              </div>

              <div className="relative w-full">
                <div className="w-full bg-transparent text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[6rem] py-2">
                  {student?.email}
                </div>
                <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                  Email:
                </label>
              </div>

              <div className="relative w-full">
                {/* <div className="w-full bg-transparent text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[6rem] py-2">
                  {student?.group?.name} || "No Group"
                </div> */}
                  <div className="w-full bg-transparent text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[6rem] py-2">
  {student?.group?.name ? student.group.name : "No Group"}
</div>

                <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                  Group:
                </label>
              </div>

              <div className="relative w-full flex items-center">
                  <div
  className={`w-full text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[6rem] py-2 flex justify-between items-center ${
    student.status === 'active' ? 'bg-green-100' : 'bg-transparent'
  }`}
>

                  <span>{student.status || "N/A"}</span>
                  {student.status === "active" ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <XCircle className="text-red-500" />
                  )}
                </div>
                <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                  Status:
                </label>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
