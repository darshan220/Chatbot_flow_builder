import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Message from "../assets/message.png";

const RightSideBar = ({
  selectNode,
  setSelectedNode,
  nodeText,
  setNodeText,
}: any) => {
  // handle input change
  const handleInputChange = (event: any) => {
    setNodeText(event.target.value);
  };

  // handle drag start
  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  
  return (
    <aside>
      {selectNode ? (
        <>
          <div>
            <div className="text-message">
              <div>
                <span>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="w-[15px] h-[15px] cursor-pointer"
                    onClick={() => setSelectedNode([])}
                  />
                </span>
              </div>
              <div className="w-full flex justify-center">Message</div>
            </div>
            <div className="text-message flex-col">
              <div className="py-4 text-gray-500">
                <span>Text</span>
              </div>
              <div className="w-full flex justify-center">
                <textarea
                  value={nodeText}
                  onChange={handleInputChange}
                  rows={4}
                  cols={50}
                  className="border border-customGray"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <div
            className="cursor-pointer bg-white p-10 border-2 border-sky-600 text-sky-800 font-[500] w-[150px] mt-4 ml-6 rounded h-[40px] flex hover:bg-blue-400 hover:text-white transition-colors duration-200"
            onDragStart={(event) => onDragStart(event, "textnode")}
            draggable
          >
            <span>
              <img
                className="object-contain absolute top-[85px] ml-4 blue-filter"
                src={Message}
                alt="message"
                width={25}
                height={25}
              />
            </span>
            Message
          </div>
        </div>
      )}
    </aside>
  );
};

export default RightSideBar;
