// 1. 定義產品資料 (Data)
const products = [
  {
    id: "p01",
    title: "經典手沖咖啡",
    category: "飲品",
    price: 120,
    description: "精選阿拉比卡豆，呈現多層次果香與醇厚口感，適合慵懶的下午茶時光。",
    imgUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80"
  },
  {
    id: "p02",
    title: "法式檸檬塔",
    category: "甜點",
    price: 150,
    description: "酸甜適中的檸檬內餡搭上酥脆塔皮，帶來清爽不膩口的絕佳風味。",
    imgUrl: "https://images.unsplash.com/photo-1519869325930-281384150729?w=600&q=80"
  },
  {
    id: "p03",
    title: "焦糖瑪奇朵",
    category: "飲品",
    price: 140,
    description: "濃縮咖啡結合香濃牛奶與絲滑焦糖醬，層次分明，甜而不膩。",
    imgUrl: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&q=80"
  }
];

// 取得 DOM 元素
const listElement = document.querySelector('#productList');
const detailElement = document.querySelector('#productDetail');

// 2. 渲染產品列表的函式 (View)
function renderList() {
  let template = '';
  products.forEach((item) => {
    // 透過 data-id 將產品的唯一識別碼綁定在 HTML 上
    template += `
      <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-id="${item.id}">
        <div>
          <h5 class="mb-1">${item.title}</h5>
          <small class="text-muted">${item.category}</small>
        </div>
        <span class="badge bg-primary rounded-pill">NT$ ${item.price}</span>
      </a>
    `;
  });
  listElement.innerHTML = template;
}

// 3. 渲染單一產品詳細資訊的函式
function renderDetail(productId) {
  // 利用陣列的 find 方法找出符合 ID 的那筆資料
  const product = products.find(item => item.id === productId);
  
  // 防呆：如果沒找到資料就中斷
  if (!product) return;

  // 組合詳細資訊的 HTML 模板
  const detailTemplate = `
    <img src="${product.imgUrl}" class="card-img-top product-img" alt="${product.title}">
    <div class="card-body">
      <span class="badge bg-secondary mb-2">${product.category}</span>
      <h3 class="card-title">${product.title}</h3>
      <h4 class="text-danger mb-3">NT$ ${product.price}</h4>
      <p class="card-text">${product.description}</p>
    </div>
  `;
  
  detailElement.innerHTML = detailTemplate;
}

// 4. 綁定點擊事件 (使用事件委派 Event Delegation)
listElement.addEventListener('click', function(e) {
  e.preventDefault(); // 避免 <a> 標籤預設的跳轉行為
  
  // 尋找點擊目標最近的 <a> 標籤
  const targetLink = e.target.closest('a');
  
  // 確保有點擊到項目，且該項目有 data-id 屬性
  if (targetLink && targetLink.dataset.id) {
    const clickedId = targetLink.dataset.id;
    renderDetail(clickedId); // 觸發渲染詳細資訊
  }
});

// 初始化：網頁載入時先印出列表
renderList();