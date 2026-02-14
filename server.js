import jsonServer from "json-server";
import auth from "json-server-auth";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const server = jsonServer.create();
const middlewares = jsonServer.defaults(); // 包含 Logger, Static, CORS 等功能

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- [核心設定：資料庫路徑] ---
const isProd = process.env.NODE_ENV === "production";
const dbDirectory = isProd ? "/data" : __dirname;
const dbPath = path.join(dbDirectory, "db.json");

// 自動初始化結構
if (!fs.existsSync(dbPath)) {
  console.log("⚠️ 偵測到環境中無資料庫檔案，正在初始化基本結構...");
  const initialData = {
    users: [],
    posts: [],
  };
  // 將結構轉為 JSON 字串並寫入檔案，格式化縮進為 2 格
  fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
}

// --- [核心設定：路由與權限] ---
// 初始化資料庫路由，並將資料庫實例綁定到 server 上
const router = jsonServer.router(dbPath);
server.db = router.db;

// 依序設定 預設中間件 => json-server-auth => 掛載資料路由
server.use(middlewares);

// 手動修正 CORS
server.use((req, res, next) => {
  // 動態檢查：如果是正式網域 OR 任何 localhost 開頭的網域，都給予通行
  if (
    origin === "https://tanukili.github.io" ||
    (origin && origin.startsWith("http://localhost"))
  ) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  // 處理瀏覽器的預檢請求 (Preflight)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

server.use(jsonServer.bodyParser);
server.use(auth);
server.use(router);

// --- [啟動伺服器] ---
// 優先讀取 Zeabur 給予的 Port，若無則預設 3000 (本地開發用)
const port = process.env.PORT || 3000;

// Error Handling 避免伺服器崩潰
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});

// 監聽 '0.0.0.0'
server.listen(port, "0.0.0.0", () => {
  console.log(`🚀 步道系統後端啟動成功！`);
  console.log(`📡 目前 Port：${port}`);
  console.log(`📂 目前資料庫檔案位置：${dbPath}`);
});
