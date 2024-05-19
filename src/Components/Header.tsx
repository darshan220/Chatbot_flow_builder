import React from "react";

const Header = ({
  onSave,
  onRestore,
  handleCancelFlow,
}: {
  onSave: () => void;
  onRestore: () => void;
  handleCancelFlow: () => void;
}) => {
  return (
    <div className="flex w-full justify-between bg-slate-300 h-14">
      <div className="flex w-full justify-center items-center">
        <button
          onClick={handleCancelFlow}
          className="w-[150px] mt-2 bg-red-200 rounded-lg h-[40px] float-none border-2 border-red-200 font-[600]"
        >
          Cancel Save Flow
        </button>
      </div>
      <div className="w-full flex justify-end pr-4 gap-5">
        <button
          onClick={onSave}
          className="w-[150px] mt-2 bg-white rounded h-[40px] float-none border-2 border-sky-600 text-sky-800 font-[600]"
        >
          Save
        </button>
        <button
          onClick={onRestore}
          className="w-[150px] mt-2 bg-white rounded h-[40px] float-none border-2 border-sky-600 text-sky-800 font-[600]"
        >
          Restore
        </button>
      </div>
    </div>
  );
};

export default Header;
