import { useState, useEffect } from "react";
import "./App.css";

const initialNodes = [
  {
    id: "1",
    position: {
      x: 250,
      y: 100,
    },
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: "クーリッシュ",
      memo: "",
      color: "#ffffff",
      collapsed: false,
    },
  },
];

const initialEdges = [];

import {
  ReactFlow,
  Background,
  Controls,
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

  const [mode, setMode] = useState(null);

  const [manufacturer, setManufacturer] = useState("");

  const [category, setCategory] = useState("");

  const [price, setPrice] = useState("");

  const [salesPlaces, setSalesPlaces] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedTextures, setSelectedTextures] = useState([]);

  const [brandMood, setBrandMood] =
    useState("");

  const [usageScene, setUsageScene] =
    useState("");

  const [purchaseScene, setPurchaseScene] =
    useState("");

  const [productImage, setProductImage] =
    useState("");

  const [weakPoint, setWeakPoint] =
    useState("");

  const [strengths, setStrengths] =
    useState([
      {
        strength: "",
        competitor: "",
      },
    ]);

  const [mindMapNodes, setMindMapNodes] =
    useState([]);

  const [newNode, setNewNode] =
    useState("");



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

  const [editingProduct, setEditingProduct] = useState(null);
  const [editName, setEditName] = useState("");


  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }, [products]);

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
              販売場所：
              {salesPlaces.length > 0
                ? salesPlaces.join("、")
                : "未入力"}
            </small>
          </button>

          <button onClick={() => setMode("simple")}>
            簡易版
          </button>

          <button onClick={() => setMode("detail")}>
            <div>詳しく考える</div>

            <small>
              ブランド：
              {brandMood || "未入力"}
            </small>

            <br />

            <small>
              使用場面：
              {usageScene || "未入力"}
            </small>

            <br />

            <small>
              購入場面：
              {purchaseScene || "未入力"}
            </small>
          </button>

          <br />

          <small>
            一般的なイメージ：
            {productImage || "未入力"}
          </small>

          <br />

          <small>
            微妙なところ：
            {weakPoint || "未入力"}
          </small>

          <br />

          <small>
            よいところ：
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
            競合商品：
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

          <button onClick={() => setMode("mindmap")}>
            マインドマップ
          </button>

          <button onClick={() => setMode("integration")}>
            <div>統合思考</div>

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
          </button>

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

          <button onClick={() => setMode("conversion")}>
            転換思考
          </button>

          <button onClick={() => setMode("innovation")}>
            破壊的イノベーション
          </button>

          <button onClick={() => setMode("competitor")}>
            競合商品
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
      </div>
    );
  }

  if (mode === "detail") {
    return (
      <div className="container">
        <h1>詳しく考える</h1>

        <button
          onClick={() => setMode(null)}
        >
          ← 戻る
        </button>

        <h2>
          メーカー・ブランドの雰囲気
        </h2>

        <textarea
          value={brandMood}
          onChange={(e) =>
            setBrandMood(e.target.value)
          }
        />

        <h2>使用場面</h2>

        <textarea
          value={usageScene}
          onChange={(e) =>
            setUsageScene(e.target.value)
          }
        />

        <h2>買う場面</h2>

        <textarea
          value={purchaseScene}
          onChange={(e) =>
            setPurchaseScene(e.target.value)
          }
        />

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

        <h2>よいところ</h2>

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

        <h2>微妙なところ</h2>

        <textarea
          value={weakPoint}
          onChange={(e) =>
            setWeakPoint(e.target.value)
          }
        />
      </div>
    );
  }

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

              const childCount = edges.filter(
                (edge) => edge.source === selectedNodeId
              ).length;

              setNodes([
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
              ]);

              setEdges([
                ...edges,
                {
                  id: `e-1-${newId}`,
                  source: selectedNodeId,
                  target: newId,
                },
              ]);

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

               setNodes(
                 nodes.filter(
                    (node) => node.id !== selectedNodeId
                 )
               );

               setEdges(
                 edges.filter(
                   (edge) =>
                      edge.source !== selectedNodeId &&
                      edge.target !== selectedNodeId
                 )
                );

                setSelectedNodeId(null);
             }}
            >
              削除
            </button>

            <div
              style={{
                display: "flex",
                gap: "8px",
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
          <h1>統合思考</h1>

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

          <h1>Design Thinking Wizard</h1>

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