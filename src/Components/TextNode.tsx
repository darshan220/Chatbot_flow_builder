import { Handle, Position } from "reactflow";
import Message from "../assets/message.png";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TextNode = ({ data, selected }: any) => {
  return (
    <div
      className={`w-40 shadow-md rounded-md bg-white ${
        selected ? "border-1 border-sky-600 " : ""
      }`}
    >
      <div>
        <div className="flex justify-between items-center max-h-max px-2 py-1 text-left text-black text-xs font-bold rounded-t-md bg-teal-300">
          <div className="flex gap-1">
            <img
              className="object-contain"
              src={Message}
              alt="message"
              width={10}
              height={10}
            />
            <span className="text-xs">Send Message</span>
          </div>
          <div className="flex items-center">
            <div className="w-[15px] h-[15px] bg-white right-[6px] absolute rounded-full" />
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="text-green-500 text-4xl w-[10px] h-[10px] z-10"
            />
          </div>
        </div>
        <div className="px-3 py-2 ">
          <div className="text-xs font-normal text-black">
            {data.label ?? "Text Node"}
          </div>
        </div>
      </div>
      <Handle
        id="a"
        type="target"
        position={Position.Left}
        className="w-1 rounded-full bg-slate-500"
      />
      <Handle
        id="b"
        type="source"
        position={Position.Right}
        className="w-1 rounded-full bg-slate-500"
      />
    </div>
  );
};

export default TextNode;
