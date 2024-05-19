import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import TextNode from "./Components/TextNode";
import Header from "./Components/Header";
import RightSideBar from "./Components/RightSideBar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const flowKey: string = "demo-flow";

//initial nodes
const initialNodes = [
  {
    id: "1",
    type: "textnode",
    data: { label: "Write a message" },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

function App() {
  const reactFlowWrapper: any = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectNode, setSelectedNode] = useState<any>([]);
  const [nodeText, setNodeText] = useState("");
  const { setViewport } = useReactFlow();
  const getLocalValue = localStorage.getItem(flowKey);

  const nodeTypes = useMemo(
    () => ({
      textnode: TextNode,
    }),
    []
  );

  useEffect(() => {
    if (selectNode.length) {
      //Adding user type label in nodes
      //When user type any text inside textarea it will automatically change in nodes
      setNodes((nds) =>
        nds.map((item) => {
          if (item.id === selectNode[0]?.id) {
            item.data = {
              ...item.data,
              label: nodeText,  //Custom text
            };
          }
          return item;
        })
      );
    } else {
      setNodeText("");
    }
  }, [nodeText, selectNode, setNodes]);

  //Connecting edges
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  //Drag and drop event
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  //Drop event for new node from right side bar
  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  //On node click event
  const onNodeClick = useCallback((_: any, node: any) => {
    setSelectedNode([node]);
    setNodeText(node.data.label);
    setNodes((nodes) =>
      nodes.map((n) => ({
        ...n,
        selected: n.id === node.id,
      }))
    );
  }, []);

  //This function will return true if all nodes and edges are connected
  const handleConnectedNode = useCallback(() => {
    let unConnectedNode = nodes.filter(
      (node) =>
        !edges.find(
          (edge) => edge.source === node.id || edge.target === node.id
        )
    );

    return unConnectedNode.length > 0;
  }, [nodes, edges]);

  const onSave = () => {
    //This condition will check if any node has an empty target handle 
    if (reactFlowInstance) {
      if (nodes.length > 1 && handleConnectedNode()) {
        alert(
          "Error: More than one node has an empty target handle or there are unconnected nodes."
        );
      } else {
        const flow = reactFlowInstance.toObject();
        localStorage.setItem(flowKey, JSON.stringify(flow));
        alert("Save successful!");
      }
    }
  };

  //Restoring saved flow
  const onRestore = () => {
    const restoreFlow = async () => {
      const flow = JSON.parse(String(getLocalValue));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  };

  //To clear saved or un-saved flow
  const handleCancelFlow = () => {
    localStorage.clear(); 
    setNodes(initialNodes) //Clearing saved node and revert to initial state
    setEdges([])
  }

  return (
    <>
      <Header onSave={onSave} onRestore={onRestore} handleCancelFlow={handleCancelFlow}/>
      <div className="flex">
        <div
          className="flex flex-row w-full h-calc-100vh-minus-56"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            fitView
          >
            <Background color="#fff" />
            <Controls />
          </ReactFlow>
        </div>
        <div className="rightsidebar">
          <RightSideBar
            nodeText={nodeText}
            setNodeText={setNodeText}
            selectNode={selectNode[0]}
            setSelectedNode={setSelectedNode}
          />
        </div>
      </div>
    </>
  );
}

export default App;
