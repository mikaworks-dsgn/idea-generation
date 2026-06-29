import { useState, useEffect } from "react";
import "./App.css";

const initialNodes = []; //マインドマップのノードのリストを作る

const initialEdges = []; //マインドマップのエッジのリストを作る

import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const steps = [
  {
    key: "target",
    title: "誰のために考えますか？",
    placeholder: "例: 大学生",
  },
  {
    key: "persona",
    title: "具体的な人物像を教えてください",
    placeholder: "例: 通学に2時間かかる大学2年生",
  },
  {
    key: "problem",
    title: "どんな課題がありますか？",
    placeholder: "例: 勉強時間が確保できない",
  },
  {
    key: "cause",
    title: "なぜその課題が起きていますか？",
    placeholder: "例: 移動時間が長い",
  },
  {
    key: "idea",
    title: "解決アイデアは？",
    placeholder: "例: 音声学習アプリ",
  },
  {
    key: "solution",
    title: "具体的なサービス案は？",
    placeholder: "例: AIが要約を読み上げるアプリ",
  },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const [mode, setMode] = useState(null); //見ている画面を入れる場所を作る

  const [manufacturer, setManufacturer] = useState(""); //メーカー名を入れる箱を作る

  const [category, setCategory] = useState(""); //カテゴリーを入れる箱を作る

  const [price, setPrice] = useState(""); //価格を入れる箱を作る

  const [salesPlaces, setSalesPlaces] = useState([]); //販売場所のリストを作る

  const [selectedProduct, setSelectedProduct] = useState(null); 

  const [selectedTextures, setSelectedTextures] = useState([]); //質感のリストを作る

  const [brandMood, setBrandMood] =
    useState(""); //メーカー・ブランドの雰囲気を入れる箱を作る

  const [usageScene, setUsageScene] =
    useState(""); //使用場面を入れる箱を作る

  const [purchaseScene, setPurchaseScene] =
    useState(""); //購入場面を入れる箱を作る

  const [productImage, setProductImage] =
    useState(""); //商品のイメージを入れる箱を作る

  const [weakPoint, setWeakPoint] =
    useState(""); //弱みを入れる箱を作る

  const [strengths, setStrengths] =
    useState([
      {
        strength: "",
        competitor: "",
      },
    ]);

  const [mindMapNodes, setMindMapNodes] =
    useState([]); //を入れる箱を作る

  const [newNode, setNewNode] =
    useState("");
  
  const [swotData, setSwotData] =
  useState({});



  const [nodes, setNodes] =
    useState(initialNodes);

  const [edges, setEdges] =
    useState(initialEdges);
  
  

  const [newNodeLabel, setNewNodeLabel] =
    useState("");

  const [searchWord, setSearchWord] =
    useState("");

  const filteredNodes = nodes.filter(
    (node) =>
      node.data.label.includes(searchWord)
  );

  const [selectedNodeId, setSelectedNodeId] =
    useState("1");

  const selectedNode = nodes.find(
    (node) => node.id === selectedNodeId
  );

  const [selectedColors, setSelectedColors] =
    useState([]);

  const [selectedShapes, setSelectedShapes] =
    useState([]);

  const [showTexture, setShowTexture] =
    useState(false);

  const [showColor, setShowColor] =
    useState(false);

  const [showShape, setShowShape] =
    useState(false);

  const [problems, setProblems] =
    useState("");

  const [improvements, setImprovements] =
    useState("");

  const [products, setProducts] = useState(() => {
    const saved =
      localStorage.getItem("products");

    return saved ? JSON.parse(saved) : [];
  });
  const [newProduct, setNewProduct] = useState("");

  const [mindMapData, setMindMapData] = useState({});

  const saveMindMap = (
  product,
  newNodes,
  newEdges
) => {

  

  console.log("保存した", product);

  setNodes(newNodes);
  setEdges(newEdges);

  setMindMapData((prev) => ({
    ...prev,
    [product]: {
      nodes: newNodes,
      edges: newEdges,
    },
  }));
};

  const onNodesChange = (changes) => {
  setNodes((nds) => applyNodeChanges(changes, nds));
};

  const [editingProduct, setEditingProduct] = useState(null);
  const [editName, setEditName] = useState("");

  const [c4cData, setC4cData] = useState({
  value: [],
  cost: [],
  convenience: [],
  communication: []
});

  const [valueList, setValueList] = useState([""]);
  const [costList, setCostList] = useState([""]);
  const [convenienceList, setConvenienceList] = useState([""]);
  const [communicationList, setCommunicationList] = useState([""]);


  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }, [products]);

  useEffect(() => {
  localStorage.setItem("mindmap_nodes", JSON.stringify(nodes));
  localStorage.setItem("mindmap_edges", JSON.stringify(edges));
}, [nodes, edges]);

  

  const [aidmaData, setAidmaData] = useState({});

  useEffect(() => {
  const savedAidma =
    localStorage.getItem("aidmaData");

  if (savedAidma) {
    setAidmaData(JSON.parse(savedAidma));
  }
}, []);

  useEffect(() => {
  const savedMindMap =
    localStorage.getItem("mindMapData");

  if (savedMindMap) {
    setMindMapData(JSON.parse(savedMindMap));
  }
}, []);

  useEffect(() => {
  localStorage.setItem(
    "mindMapData",
    JSON.stringify(mindMapData)
  );
}, [mindMapData]);

  useEffect(() => {
  localStorage.setItem(
    "aidmaData",
    JSON.stringify(aidmaData)
  );
}, [aidmaData]);

  

  const genderOptions = [
    "男性",
    "女性",
    "すべての性別の人",
  ];

  const ageOptions = [
    "未就学児",
    "小学生",
    "中学生",
    "高校生",
    "大学生",
    "10代未満",
    "10代",
    "20代",
    "30代",
    "40代",
    "50代",
    "60代",
    "70代",
    "80代",
    "90代以上",
  ];

  const salesPlaceOptions = [
    "コンビニ",
    "スーパー",
    "ドラッグストア",
    "自動販売機",
    "ECサイト",
    "百貨店",
    "専門店",
    "学校",
    "駅",
    "空港",
  ];

  const textureOptions = [
    "さらさら",
    "ぴかぴか",
    "きらきら",
    "ふわふわ",
    "つやつや",
    "テカテカ",
  ];

  const colorOptions = [
    "赤",
    "青",
    "黄色",
    "オレンジ",
    "緑",
    "ピンク",
    "白",
    "黒",
    "透明",
    "虹色",
  ];

  const shapeOptions = [
    "四角",
    "丸",
    "かたい",
    "やわらかい",
    "細長い",
    "大きい",
    "小さい",
    "薄い",
    "厚い",
  ];

  const [data, setData] = useState({
    genders: [],
    ages: [],
    persona: "",
    problem: "",
    cause: "",
    idea: "",
    solution: "",
  });

  const handleChange = (value) => {
    setData({
      ...data,
      [steps[currentStep].key]: value,
    });
  };

  const next = () => {

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (!selectedProduct) {
    return (
      <div className="container">
        <h1>アイデア管理</h1>
        <p>登録商品数：{products.length}件</p>

        <input
          type="text"
          placeholder="商品名を入力"
          value={newProduct}
          onChange={(e) =>
            setNewProduct(e.target.value)
          }
        />

        <button
          onClick={() => {
            if (!newProduct.trim()) return;

            setProducts([
              ...products,
              newProduct,
            ]);

            setNewProduct("");
          }}
        >
          追加
        </button>

        <hr />

        {products.map((product) => (
          <div
            key={product}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            {editingProduct === product ? (
              <input
                value={editName}
                onChange={(e) =>
                  setEditName(e.target.value)
                }
                style={{ flex: 1 }}
              />
            ) : (
              <button
                style={{ flex: 1 }}
                onClick={() =>
                  setSelectedProduct(product)
                }
              >
                {product}
              </button>
            )}


            {editingProduct === product ? (
              <button
                onClick={() => {
                  setProducts(
                    products.map((p) =>
                      p === product ? editName : p
                    )
                  );

                  setEditingProduct(null);
                }}
              >
                保存
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditingProduct(product);
                  setEditName(product);
                }}
              >
                編集
              </button>
            )}

            <button
              onClick={() => {
                if (
                  window.confirm(
                    `${product} を削除しますか？`
                  )
                ) {
                  setProducts(
                    products.filter(
                      (p) => p !== product
                    )
                  );
                }
              }}
            >
              削除
            </button>
          </div>
        ))}
      </div>
    );
  }

  if (!mode) {
    return (
      <div className="container">

        <button
          onClick={() => setSelectedProduct(null)}
        >
          ← 商品一覧へ戻る
        </button>

        <h1>{selectedProduct}</h1>

        <div className="menu-grid">

          <button onClick={() => setMode("basicInfo")}>
            <div>商品の基本情報</div>

            <small>
              メーカー：
              {manufacturer || "未入力"}
            </small>

            <br />

            <small>
              カテゴリー：
              {category || "未入力"}
            </small>

            <br />

            <small>
              価格：
              {price || "未入力"}
            </small>

            <br />

            <small>
              販売場所：
              {salesPlaces.length > 0
                ? salesPlaces.join("、")
                : "未入力"}
            </small>

            <br />

            

            <small>
            一般的なイメージ：
            {productImage || "未入力"}
          </small>

            <br />

            <small>
              aa：
              {category || "未入力"}
            </small>

            <br />
            
            
            <small>
              使用場面：
              {usageScene || "未入力"} {/*商品ごとのホーム画面への表示*/}
            </small>

            <br />

            <small>
              購入場面：
              {purchaseScene || "未入力"}{/*商品ごとのホーム画面への表示*/}
            </small>

            <br />

          </button>

          <button onClick={() => setMode("simple")}>
            簡易版
          </button>

          <button onClick={() => setMode("detail")}>
            <div>競合商品</div>{/*2の題名*/}

            <small>
              あああああ（2）：
              {brandMood || "未入力"}{/*商品ごとのホーム画面への表示*/}
            </small>

            <br />

          <small>
            ううううう（2）：
            {weakPoint || "未入力"}{/*商品ごとのホーム画面への表示*/}
          </small>

          <br />

          <small>
            よいところとそのよいところにおける競合商品：{/*商品ごとのホーム画面への表示*/}
          </small>

          {
            strengths
              .filter(
                (item) => item.strength !== ""
              )
              .map((item, index) => (
                <div key={index}>
                  ⭐ {item.strength}
                  {" ｜ "}
                  競合：{item.competitor}
                </div>
              ))
          }

          <br />

          <small>
            競合商品：{/*商品ごとのホーム画面への表示*/}
            {
              strengths
                .filter(
                  (item) => item.competitor !== ""
                )
                .map(
                  (item) => item.competitor
                )
                .join("、")
              || "未入力"
            }
          </small>


          </button>



          
          <button
  onClick={() => {

    console.log("マインドマップボタン押された");


    const savedMindMap = JSON.parse(
  localStorage.getItem("mindMapData") || "{}"
);

  


  if (savedMindMap[selectedProduct]) {
  setNodes(savedMindMap[selectedProduct].nodes);
  setEdges(savedMindMap[selectedProduct].edges);
} else {

  const rootId = Date.now().toString();

  setNodes([
    {
      id: rootId,
      position: { x: 250, y: 100 },

      sourcePosition: "right",
      targetPosition: "left",

      data: {
        label: selectedProduct,
        memo: "",
        color: "#ffffff",
        collapsed: false,
      },
    },
  ]);

  setEdges([]);

  setSelectedNodeId(rootId);

}

setMode("mindmap");

  }}
>
  マインドマップ
</button>


          <button onClick={() => setMode("integration")}>
            <div>まとめる</div>

            <small>
              質感：
              {selectedTextures.length > 0
                ? selectedTextures.join("、")
                : "未選択"}
            </small>

            <br />

            <small>
              色：
              {selectedColors.length > 0
                ? selectedColors.join("、")
                : "未選択"}
            </small>

            <br />

            <small>
              形：
              {selectedShapes.length > 0
                ? selectedShapes.join("、")
                : "未選択"}
            </small>

            <br />

          <small>
            問題点：
            {problems || "未入力"}
          </small>

          <br />

          <small>
            改善点：
            {improvements || "未入力"}
          </small>

          </button>

          

          <button onClick={() => setMode("swot")}>
            SWOT分析
          </button>

          <button onClick={() => setMode("aidma")}>
            AIDMAモデル
          </button>

          <button onClick={() => setMode("c4c")}>
            顧客の4C分析
          </button>


        </div>
      </div>
    );
  }

  const back = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (mode === "basicInfo") {
    return (
      <div className="container">
        <h1>商品の基本情報</h1>

        <button
          onClick={() => setMode(null)}
        >
          ← 戻る
        </button>

        <h2>メーカー</h2>

        <input
          type="text"
          value={manufacturer}
          onChange={(e) =>
            setManufacturer(e.target.value)
          }
          placeholder="例：ロッテ"
        />

        <h2>カテゴリー</h2>

        <input
          type="text"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          placeholder="例：アイス"
        />

        

        <h2>価格</h2>

        <input
          type="text"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          placeholder="例：180円"
        />

        <h2>販売場所</h2>

        {salesPlaceOptions.map((place) => (
          <label
            key={place}
            style={{
              display: "block",
              marginBottom: "8px",
            }}
          >
            <input
              type="checkbox"
              checked={salesPlaces.includes(place)}
              onChange={() => {
                const exists =
                  salesPlaces.includes(place);

                setSalesPlaces(
                  exists
                    ? salesPlaces.filter(
                      (p) => p !== place
                    )
                    : [
                      ...salesPlaces,
                      place,
                    ]
                );
              }}
            />

            {place}
          </label>
        ))}

        <h2>
          商品の一般的なイメージ
        </h2>

        <textarea
          value={productImage}
          onChange={(e) =>
            setProductImage(
              e.target.value
            )
          }
        />

        <h2>使用場面</h2>
        
        {/*入力欄を作る*/}
        <textarea
          value={usageScene} 
          onChange={(e) =>
            setUsageScene(e.target.value)
          }
        />
        <h2>買う場面</h2>
        
        {/*入力欄を作る*/}
        <textarea
          value={purchaseScene}
          onChange={(e) =>
            setPurchaseScene(e.target.value)
          }
        />

      </div>
    );
  }

        

  if (mode === "detail") {
    return (
      <div className="container">
        <h1>競合商品</h1>{/*3の題名*/}

        <button
          onClick={() => setMode(null)}
        >
          ← 戻る
        </button>

        {/*入力欄を作る*/}
        <h2>
          あああああ（3）
        </h2>

        <textarea
          value={brandMood}
          onChange={(e) =>
            setBrandMood(e.target.value)
          }
        />

        {/*入力欄を作る*/}
        <h2>
          いいいいい（3）
        </h2>

        <textarea
          value={productImage}
          onChange={(e) =>
            setProductImage(
              e.target.value
            )
          }
        />

        
        {/*入力欄を作る*/}
        <h2>よいところとそのよいところにおける競合商品</h2>

        {strengths.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              placeholder="よいところ"
              value={item.strength}
              onChange={(e) => {
                const updated = [...strengths];

                updated[index].strength =
                  e.target.value;

                setStrengths(updated);

                if (
                  index ===
                  strengths.length - 1 &&
                  e.target.value !== ""
                ) {
                  setStrengths([
                    ...updated,
                    {
                      strength: "",
                      competitor: "",
                    },
                  ]);
                }
              }}
            />

            {/*入力欄を作る*/}
            <input
              type="text"
              placeholder="競合商品"
              value={item.competitor}
              onChange={(e) => {
                const updated = [...strengths];

                updated[index].competitor =
                  e.target.value;

                setStrengths(updated);
              }}
            />
          </div>
        ))}

        {/*入力欄を作る*/}
        <h2>ううううう（3）</h2>

        <textarea
          value={weakPoint}
          onChange={(e) =>
            setWeakPoint(e.target.value)
          }
        />
      </div>
    );
  }

//modeがmindmap のときはマインドマップ画面を表示する
  if (mode === "mindmap") {

    const childCount = (nodeId) => {
      return edges.filter(
        (edge) => edge.source === nodeId
      ).length;
    };

    const coloredNodes = nodes.map(
  (node) => ({
    ...node,

    data: {
      ...node.data,
      label:
        childCount(node.id) > 0
          ? `${
              node.data.collapsed
                ? "▶"
                : "▼"
            } ${node.data.label} (${childCount(node.id)})`
          : node.data.label,
    },

    style: {
      border: `${node.id === selectedNodeId
          ? "4px dashed"
          : "4px solid"
        } ${node.data.color || "#000000"
        }`,
      borderRadius: "12px",
      background: "#ffffff",
    },
  })
);

    const visibleNodes = coloredNodes.filter(
  (node) => {
    const parentEdge = edges.find(
      (edge) => edge.target === node.id
    );

    if (!parentEdge) return true;

    const parentNode = nodes.find(
      (n) => n.id === parentEdge.source
    );

    return !parentNode?.data?.collapsed;
  }
);

    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <button
          onClick={() => setMode(null)}
          style={{
            position: "absolute",
            zIndex: 10,
            top: "10px",
            left: "10px",
          }}
        >
          ← 戻る
        </button>

        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "10px",
            zIndex: 10,
            background: "white",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <input
            type="text"
            value={newNodeLabel}
            placeholder="キーワード"
            onChange={(e) =>
              setNewNodeLabel(e.target.value)
            }
          />

          <input
            type="text"
            value={searchWord}
            placeholder="検索"
            onChange={(e) =>
              setSearchWord(e.target.value)
            }
          />

          <div>
            {searchWord &&
              filteredNodes.map((node) => (
                <div
                  key={node.id}
                  style={{
                    cursor: "pointer",
                    padding: "4px",
                    borderBottom:
                      "1px solid #ddd",
                  }}
                  onClick={() => {
                    setSelectedNodeId(node.id);
                  }}
                >
                  {node.data.label}
                </div>
              ))}
          </div>

          <button
            onClick={() => {
              if (!newNodeLabel.trim()) return;

              const newId = Date.now().toString();

              const parentNode = nodes.find(
                (node) => node.id === selectedNodeId
              );

              console.log("parentNode =", parentNode);

              if (!parentNode) {
  alert("親ノードが見つかりません");
  return;
}

              const childCount = edges.filter(
                (edge) => edge.source === selectedNodeId
              ).length;

              


              const newNodes = [
  ...nodes,
  {
    id: newId,
    position: {
      x: parentNode.position.x + 250,
      y: parentNode.position.y + childCount * 120,
    },
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: newNodeLabel,
      memo: "",
      color: "#ffffff",
      collapsed: false,
    },
  },
];

const newEdges = [
  ...edges,
  {
    id: `e-1-${newId}`,
    source: selectedNodeId,
    target: newId,
  },
];

saveMindMap(selectedProduct, newNodes, newEdges);






              setNewNodeLabel("");
            }}


          >

            <div>
              選択中ID: {selectedNodeId}
            </div>
            追加
          </button>

          <div style={{ marginTop: "10px" }}>
            <div>
              選択中:
              {selectedNode?.data.label}
            </div>

            <button
              onClick={() => {
                setNodes(
                  nodes.map((node) =>
                    node.id === selectedNodeId
                      ? {
                        ...node,
                        data: {
                          ...node.data,
                          collapsed:
                            !node.data.collapsed,
                        },
                      }
                      : node
                  )
                );
              }}
            >
              {selectedNode?.data.collapsed
                ? "展開"
                : "折りたたむ"}
            </button>

             <button
              onClick={() => {
               if (!selectedNodeId) return;

                const idsToDelete = [selectedNodeId];

                let changed = true;

               while (changed) {
                  changed = false;

                 edges.forEach((edge) => {
                   if (
                     idsToDelete.includes(edge.source) &&
                     !idsToDelete.includes(edge.target)
                   ) {
                     idsToDelete.push(edge.target);
                     changed = true;
                   }
                  });
               }

               setNodes(
                 nodes.filter(
                    (node) =>
                     !idsToDelete.includes(node.id)
                 )
               );

               setEdges(
                 edges.filter(
                   (edge) =>
                     !idsToDelete.includes(edge.source) &&
                     !idsToDelete.includes(edge.target)
                 )
               );

               setSelectedNodeId(null);
             }}
            >
             削除
            </button>

            {/*マインドマップのメモ欄の幅？*/}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "8px",
              }}
            >
              {[
                "#ff4d4f",
                "#faad14",
                "#52c41a",
                "#1677ff",
                "#722ed1",
                "#000000",
                "#ffffff",
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setNodes(
                      nodes.map((node) =>
                        node.id === selectedNodeId
                          ? {
                            ...node,
                            data: {
                              ...node.data,
                              color,
                            },
                          }
                          : node
                      )
                    );
                  }}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    border: "1px solid #ccc",
                    background: color,
                  }}
                />
              ))}
              </div>

              <textarea
                value={selectedNode?.data.memo || ""}
                placeholder="メモを書く"
                rows={4}
                onChange={(e) => {
                  setNodes(
                    nodes.map((node) =>
                      node.id === selectedNodeId
                        ? {
                          ...node,
                          data: {
                            ...node.data,
                            memo: e.target.value,
                          },
                        }
                        : node
                    )
                  );
                }}
              />
            </div>

          </div>

          


          <ReactFlow
            nodes={visibleNodes}
            edges={edges}
            fitView
            nodesDraggable={true}
            onNodesChange={onNodesChange}
            onNodeClick={(event, node) => {
              setSelectedNodeId(node.id);
            }}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        );
}

  if (mode === "integration") {
    return (
        <div className="container">
          <h1>まとめる</h1>

          <button
            onClick={() => setMode(null)}
          >
            ← 戻る
          </button>

          <h2>商品の特徴は？</h2>

          <button
            className="category-card"
            onClick={() =>
              setShowTexture(!showTexture)
            }
          >
            質感
          </button>

          {showTexture &&
            textureOptions.map((texture) => (
              <label
                key={texture}
                style={{
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedTextures.includes(texture)}
                  onChange={() => {
                    const exists =
                      selectedTextures.includes(texture);

                    setSelectedTextures(
                      exists
                        ? selectedTextures.filter(
                          (t) => t !== texture
                        )
                        : [
                          ...selectedTextures,
                          texture,
                        ]
                    );
                  }}
                />

                {texture}
              </label>
            ))}

          <button
            className="category-card"
            onClick={() =>
              setShowColor(!showColor)
            }
          >
            色
          </button>

          {showColor &&
            colorOptions.map((color) => (
              <label
                key={color}
                style={{
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => {
                    const exists =
                      selectedColors.includes(color);

                    setSelectedColors(
                      exists
                        ? selectedColors.filter(
                          (c) => c !== color
                        )
                        : [
                          ...selectedColors,
                          color,
                        ]
                    );
                  }}
                />

                {color}
              </label>
            ))}

          <button
            className="category-card"
            onClick={() =>
              setShowShape(!showShape)
            }
          >
            形
          </button>

          {showShape &&
            shapeOptions.map((shape) => (
              <label
                key={shape}
                style={{
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedShapes.includes(shape)}
                  onChange={() => {
                    const exists =
                      selectedShapes.includes(shape);

                    setSelectedShapes(
                      exists
                        ? selectedShapes.filter(
                          (s) => s !== shape
                        )
                        : [
                          ...selectedShapes,
                          shape,
                        ]
                    );
                  }}
                />

                {shape}
              </label>
            ))}

          <h2>問題点は？</h2>

          <textarea
            value={problems}
            onChange={(e) =>
              setProblems(e.target.value)
            }
            placeholder="商品の問題点を書いてください"
            rows={5}
          />

          <h2>もっとよくできるところは？</h2>

          <textarea
            value={improvements}
            onChange={(e) =>
              setImprovements(e.target.value)
            }
            placeholder="改善できそうな点を書いてください"
            rows={5}
          />

        </div>
        );
  }

//SWOTの入力データを更新するための共通関数
  const updateSwot = (key, valueKey, value) => {
  setSwotData({
    ...swotData,
    [selectedProduct]: {
      ...swotData[selectedProduct],
      [valueKey]: value,
    },
  });
};
//modeがswotのときはSWOT分析の画面を表示する
  if (mode === "swot") {
  return (
    <div style={{ padding: "20px" }}>

      <button
        onClick={() => setMode(null)}
      >
        ← 戻る
      </button>

      <h2>
        {selectedProduct}
        のSWOT分析
      </h2>

 
  
  <table
  border="1"
  style={{
    borderCollapse: "collapse",
    width: "100%",
    textAlign: "center",
  }}
>

  <tbody>

    <tr>
      <td></td>
      <td>プラス要因</td>
      <td>マイナス要因</td>
    </tr>

    <tr>
      <td>
        内部（現在）
      </td>
      <td className="swot-box">
        <div>Strength（強み）</div>

         <textarea
    value={
      swotData[selectedProduct]
        ?.strength || ""
    }
    onChange={(e) =>
      setSwotData({
        ...swotData,
        [selectedProduct]: {
          ...swotData[selectedProduct],
          strength: e.target.value,
        },
      })
    }
  />     
  </td>
        
      

      <td className="swot-box">
        <div>Weaknesses（弱み）</div>

         <textarea
    value={
      swotData[selectedProduct]
        ?.weaknesses || ""
    }
    onChange={(e) =>
      setSwotData({
        ...swotData,
        [selectedProduct]: {
          ...swotData[selectedProduct],
          weaknesses: e.target.value,
        },
      })
    }
  />
      </td>
    </tr>

    <tr>
      <td>
        外部（3年先まで）
      </td>

      <td className="swot-box">
        <div>Opportunities（機会）</div>

         <textarea
    value={
      swotData[selectedProduct]
        ?.opportunities || ""
    }
    onChange={(e) =>
      setSwotData({
        ...swotData,
        [selectedProduct]: {
          ...swotData[selectedProduct],
          opportunities: e.target.value,
        },
      })
    }
  />
      </td>

      <td className="swot-box"> {/*表の1ますを作る*/}
        <div>Threats（脅威）</div> {/*Threatsという箱を作る*/ }

         <textarea
    value={
      swotData[selectedProduct]
        ?.threats || ""
    }
    onChange={(e) =>
      setSwotData({
        ...swotData,
        [selectedProduct]: {
          ...swotData[selectedProduct],
          threats: e.target.value,
        },
      })
    }
  />
      </td>
    </tr>

  </tbody>

</table>
  
  
</div>
  );
}

//modeがaidmaのときはAIDMA分析画面を表示する
  if (mode === "aidma") {

    const aidmaRows = [
  ["A", "認知", "知らない", "認知度向上", "「こんな商品があるんだ！」"],
  ["A", "認知", "認知しているが想起できない", "さらに知名度アップ" , "「こんな商品があるんだ！」"],
  ["I", "興味", "興味がない", "商品に対する評価育成", "「面白そう！なんか使えそう！」"],
  ["D", "欲求", "欲しいとは思っていない", "ニーズ喚起", "「欲しい！」"],
  ["M", "動機", "欲しいと思っても買おうと思わない", "購入意図形成", "「買いたい！」"],
  ["A", "行動", "買おうか買うまいか迷っている", "購入意図喚起", "「買おう！」"],
  ];

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <button
        onClick={() => setMode(null)}
      >
        ← 戻る
      </button>

      <h2>
        {selectedProduct}
        のAIDMA分析
      </h2>

      <table
        border="1"
        style={{
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>AIDMA</th>
            <th>顧客の態度</th>
            <th>顧客の意欲の把握</th>
            <th>プロモーション目標</th>
            <th>現状</th>
            <th>改善点</th>
          </tr>
        </thead>

        <tbody>
  {aidmaRows.map(
    (
      [stage, attitude, insight, goal, problems],
      index
    ) => (
      <tr key={index}>
        <td>{stage}</td>
        <td>{attitude}</td>
        <td>{insight}</td>
        <td>{goal}
          <br />
          {problems}
        </td>

        <td>
  <textarea
    value={
      aidmaData[selectedProduct]?.[
        index
      ]?.current || ""
    }
    placeholder="現状"
    onChange={(e) => {
      setAidmaData({
        ...aidmaData,
        [selectedProduct]: {
          ...aidmaData[selectedProduct],
          [index]: {
            ...aidmaData[selectedProduct]?.[
              index
            ],
            current: e.target.value,
          },
        },
      });
    }}
  />
</td>

<td>
  <textarea
    value={
      aidmaData[selectedProduct]?.[
        index
      ]?.improvement || ""
    }
    placeholder="改善点"
    onChange={(e) => {
      setAidmaData({
        ...aidmaData,
        [selectedProduct]: {
          ...aidmaData[selectedProduct],
          [index]: {
            ...aidmaData[selectedProduct]?.[
              index
            ],
            improvement:
              e.target.value,
          },
        },
      });
    }}
  />
</td>
      </tr>
    )
  )}
</tbody>
      </table>
    </div>
  );
}




if (mode === "c4c") {
  return (
    <div>

      <button
  onClick={() => setMode(null)}
>
  ← 戻る
</button>

      <h2>{selectedProduct}の4C分析</h2>

      <table border="1">
        <tbody>

          <tr>
            <td>
              <div>顧客にとっての価値</div>
              Customer Value
            </td>
            <td>
              <div>
            {valueList.map((item, index) => (
             <div key={index} style={{ display: "flex", gap: "10px" }}>
      
                <input
                 value={item}
                 onChange={(e) => {
                    const newList = [...valueList];
                    newList[index] = e.target.value;
                   setValueList(newList);
                 }}
             />

      <button
        onClick={() => {

          if (valueList.length === 1)
            return;

          const newList =
            valueList.filter((_, i) => i !== index);

          setValueList(newList);
        }}
      >
        ×
      </button>

    </div>
  ))}
</div>

      <button
        onClick={() => {
          setValueList([...valueList, ""]);
       }}
      >
       ＋追加
      </button>

            </td>
          </tr>

          <tr>
            <td>
              <div>顧客の負担</div>
              Cost to the Customer
            </td>
            <td>
               <div>
            {costList.map((item, index) => (
             <div key={index} style={{ display: "flex", gap: "10px" }}>
      
                <input
                 value={item}
                 onChange={(e) => {
                    const newList = [...costList];
                    newList[index] = e.target.value;
                   setCostList(newList);
                 }}
             />

      <button
        onClick={() => {

          if (costList.length === 1)
            return;

          const newList =
            costList.filter((_, i) => i !== index);

          setCostList(newList);
        }}
      >
        ×
      </button>

    </div>
  ))}
</div>

      <button
        onClick={() => {
          setCostList([...costList, ""]);
       }}
      >
       ＋追加
      </button>
            </td>
          </tr>

          <tr>
            <td>
              <div>入手の容易性</div>
              Convenience
            </td>
            <td>
               <div>
            {convenienceList.map((item, index) => (
             <div key={index} style={{ display: "flex", gap: "10px" }}>
      
                <input
                 value={item}
                 onChange={(e) => {
                    const newList = [...convenienceList];
                    newList[index] = e.target.value;
                   setConvenienceList(newList);
                 }}
             />

      <button
        onClick={() => {

          if (convenienceList.length === 1)
            return;

          const newList =
            convenienceList.filter((_, i) => i !== index);

          setConvenienceList(newList);
        }}
      >
        ×
      </button>

    </div>
  ))}
</div>

      <button
        onClick={() => {
          setConvenienceList([...convenienceList, ""]);
       }}
      >
       ＋追加
      </button>
            </td>
          </tr>

          <tr>
            <td>
              <div>コミュニケーション</div>
              Communication
              </td>
            <td>
               <div>
            {communicationList.map((item, index) => (
             <div key={index} style={{ display: "flex", gap: "10px" }}>
      
                <input
                 value={item}
                 onChange={(e) => {
                    const newList = [...communicationList];
                    newList[index] = e.target.value;
                   setCommunicationList(newList);
                 }}
             />

      <button
        onClick={() => {

          if (communicationList.length === 1)
            return;

          const newList =
            communicationList.filter((_, i) => i !== index);

          setCommunicationList(newList);
        }}
      >
        ×
      </button>

    </div>
  ))}
</div>

      <button
        onClick={() => {
          setCommunicationList([...communicationList, ""]);
       }}
      >
       ＋追加
      </button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}


        if (currentStep === steps.length) {
    return (
        <div className="container">
          <h1>デザイン思考まとめ</h1>

          <div className="summary-card">
            <h3>対象ユーザー</h3>
            <p>
              性別：
              {data.genders.join("、")}
            </p>

            <p>
              年代：
              {data.ages.join("、")}
            </p>

            <h3>ペルソナ</h3>
            <p>{data.persona}</p>

            <h3>課題</h3>
            <p>{data.problem}</p>

            <h3>原因</h3>
            <p>{data.cause}</p>

            <h3>アイデア</h3>
            <p>{data.idea}</p>

            <h3>サービス案</h3>
            <p>{data.solution}</p>
          </div>

          <button onClick={() => setCurrentStep(0)}>
            編集する
          </button>
        </div>
        );
  }

        return (
        <div className="container">

          <button
            className="home-button"
            onClick={() => {
              setMode(null);
              setCurrentStep(0);
            }}
          >
            ← ホームへ戻る
          </button>

          <h1>デザインを考える</h1>

          <div className="step">
            Step {currentStep + 1} / {steps.length}
          </div>

          <h2>{steps[currentStep].title}</h2>

          {currentStep === 0 ? (
            <>
              <h3>性別</h3>

              {genderOptions.map((gender) => (
                <label
                  key={gender}
                  style={{
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={data.genders.includes(gender)}
                    onChange={() => {
                      const exists =
                        data.genders.includes(gender);

                      setData({
                        ...data,
                        genders: exists
                          ? data.genders.filter(
                            (g) => g !== gender
                          )
                          : [...data.genders, gender],
                      });
                    }}
                  />
                  {gender}
                </label>
              ))}

              <h3 style={{ marginTop: "20px" }}>
                年代
              </h3>

              {ageOptions.map((age) => (
                <label
                  key={age}
                  style={{
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={data.ages.includes(age)}
                    onChange={() => {
                      const exists =
                        data.ages.includes(age);

                      setData({
                        ...data,
                        ages: exists
                          ? data.ages.filter(
                            (a) => a !== age
                          )
                          : [...data.ages, age],
                      });
                    }}
                  />
                  {age}
                </label>
              ))}
            </>
          ) : (
            <textarea
              value={data[steps[currentStep].key]}
              placeholder={
                steps[currentStep].placeholder
              }
              onChange={(e) =>
                handleChange(e.target.value)
              }
            />
          )}

          <div className="buttons">
            {currentStep > 0 && (
              <button onClick={back}>
                前へ
              </button>
            )}

            <button onClick={next}>
              {currentStep === steps.length - 1
                ? "まとめを見る"
                : "次へ"}
            </button>
          </div>
        </div>
        );
}