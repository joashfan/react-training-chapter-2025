// 1. 產品資料
const products = [
  {
    category: "甜甜圈",
    content: "尺寸：14x14cm",
    description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
    id: "-L9tH8jxVb2Ka_DYPwng",
    is_enabled: 1,
    origin_price: 150,
    price: 99,
    title: "草莓莓果夾心圈",
    unit: "元",
    num: 10,
    imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8",
    imagesUrl: [
      "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a",
      "https://images.unsplash.com/photo-1559656914-a30970c1affd"
    ]
  },
  {
    category: "蛋糕",
    content: "尺寸：6寸",
    description: "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
    id: "-McJ-VvcwfN1_Ye_NtVA",
    is_enabled: 1,
    origin_price: 1000,
    price: 900,
    title: "蜂蜜檸檬蛋糕",
    unit: "個",
    num: 1,
    imageUrl: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
    imagesUrl: [
      "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80"
    ]
  },
  {
    category: "蛋糕",
    content: "尺寸：6寸",
    description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
    id: "-McJ-VyqaFlLzUMmpPpm",
    is_enabled: 1,
    origin_price: 700,
    price: 600,
    title: "暗黑千層",
    unit: "個",
    num: 15,
    imageUrl: "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
    imagesUrl: [
      "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
      "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
    ]
  }
];

// 2. 取得 DOM 元素
const productList = document.getElementById('productList');
const productDetail = document.getElementById('productDetail');

// 3. 渲染左側產品列表
function renderList() {
  let listHTML = '';
  products.forEach((item) => {
    // 判斷是否啟用來決定顯示的文字與顏色
    const enabledText = item.is_enabled ? '<span class="text-success">啟用</span>' : '<span>未啟用</span>';
    
    // 將產品 id 綁在按鈕的 data-id 屬性上
    listHTML += `
      <tr>
        <td>${item.title}</td>
        <td>${item.origin_price}</td>
        <td>${item.price}</td>
        <td>${enabledText}</td>
        <td>
          <button type="button" class="btn btn-primary view-detail-btn" data-id="${item.id}">
            查看細節
          </button>
        </td>
      </tr>
    `;
  });
  productList.innerHTML = listHTML;
}

// 4. 渲染右側單一產品細節
function renderDetail(id) {
  // 找出符合點擊 ID 的該筆產品資料
  const product = products.find(item => item.id === id);
  
  if (!product) return;

  // 處理多張副圖的 HTML (如果有 imagesUrl 的話)
  let imagesHTML = '';
  if (product.imagesUrl) {
    product.imagesUrl.forEach((img, index) => {
      imagesHTML += `<img src="${img}" class="img-thumbnail m-2" alt="圖片 ${index + 1}">`;
    });
  }

  // 組裝完整的詳細資訊卡片 HTML
  const detailHTML = `
    <div class="card mb-3">
      <img src="${product.imageUrl}" class="card-img-top primary-image" alt="主圖">
      <div class="card-body">
        <h5 class="card-title">
          ${product.title}
          <span class="badge bg-primary ms-2">${product.category}</span>
        </h5>
        <p class="card-text">商品描述：${product.description}</p>
        <p class="card-text">商品內容：${product.content}</p>
        <div class="d-flex">
          <p class="card-text text-secondary me-2">
            <del>${product.origin_price}</del>
          </p>
          元 / ${product.price} 元
        </div>
        <h5 class="mt-3">更多圖片：</h5>
        <div class="d-flex flex-wrap">
          ${imagesHTML}
        </div>
      </div>
    </div>
  `;
  
  productDetail.innerHTML = detailHTML;
}

// 5. 綁定點擊事件 (使用事件委派)
productList.addEventListener('click', function(e) {
  // 檢查點擊到的元素是否包含 'view-detail-btn' 這個 class
  if (e.target.classList.contains('view-detail-btn')) {
    // 取得按鈕上的 data-id 值
    const productId = e.target.getAttribute('data-id');
    // 呼叫渲染詳細資訊的函式
    renderDetail(productId);
  }
});

// 初始化：網頁載入時先印出左側列表
renderList();