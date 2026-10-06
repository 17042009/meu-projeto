const products = [
  {id:1,name:"Jaqueta Offset",gender:"feminino",category:"roupas",label:"NOVO",price:489,rating:4.9,reviews:28,review:"O corte deixa qualquer look mais interessante.",reviewer:"Camila R.", image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"Óculos Vector",gender:"unissex",category:"acessorios",label:"DROP 04",price:219,rating:4.8,reviews:19,review:"Leve, estiloso e chegou muito bem embalado.",reviewer:"Rafa M.", image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"Calça Assembly",gender:"masculino",category:"roupas",label:"ESSENCIAL",price:329,rating:4.7,reviews:16,review:"O tecido tem um caimento incrível.",reviewer:"Lia P.", image:"https://images.unsplash.com/photo-1506629905607-d9c297d3a9a2?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Bolsa Transit",gender:"feminino",category:"acessorios",label:"LIMITADA",price:389,rating:4.9,reviews:22,review:"Cabe tudo e ainda transforma o visual.",reviewer:"Nina S.", image:"https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=700&q=80"},
  {id:5,name:"Camiseta Signal",gender:"masculino",category:"roupas",label:"NOVO",price:159,rating:4.8,reviews:31,review:"Básica só no nome. A modelagem é perfeita.",reviewer:"João V.", image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"},
  {id:6,name:"Tênis Relay",gender:"unissex",category:"acessorios",label:"DROP 04",price:529,rating:4.6,reviews:14,review:"Confortável para andar o dia inteiro.",reviewer:"Bia T.", image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"},
  {id:7,name:"Saia Kinetic",gender:"feminino",category:"roupas",label:"SELEÇÃO",price:279,rating:4.8,reviews:12,review:"A peça mais elogiada do meu armário.",reviewer:"Malu C.", image:"https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=700&q=80"},
  {id:8,name:"Moletom Frame",gender:"masculino",category:"roupas",label:"ESSENCIAL",price:299,rating:4.9,reviews:25,review:"Quente na medida e muito bonito.",reviewer:"Duda A.", image:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=80"},
  {id:9,name:"Regata Orbit",gender:"feminino",category:"roupas",label:"R$ 99",price:99,rating:4.7,reviews:9,review:"Fresca e combina com tudo.",reviewer:"Ana L.", image:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80"},
  {id:10,name:"Camisa Metro",gender:"masculino",category:"roupas",label:"R$ 189",price:189,rating:4.8,reviews:11,review:"Veste bem e o tecido é muito confortável.",reviewer:"Pedro G.", image:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80"},
  {id:11,name:"Carteira Mini",gender:"feminino",category:"acessorios",label:"R$ 89",price:89,rating:4.8,reviews:7,review:"Compacta, bonita e cabe na bolsa.",reviewer:"Bia N.", image:"https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=80"},
  {id:12,name:"Bermuda Loop",gender:"masculino",category:"roupas",label:"R$ 149",price:149,rating:4.6,reviews:8,review:"Leve para o verão e com ótimo caimento.",reviewer:"Lucas F.", image:"https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=700&q=80"},
  {id:13,name:"Polo District",gender:"masculino",category:"roupas",label:"R$ 179",price:179,rating:4.8,reviews:13,review:"A gola mantém a forma e o tecido não esquenta.",reviewer:"Marcos D.", image:"https://images.unsplash.com/photo-1625910513413-5fc45c7f6f5d?auto=format&fit=crop&w=700&q=80"},
  {id:14,name:"Jaqueta Route",gender:"masculino",category:"roupas",label:"R$ 349",price:349,rating:4.9,reviews:17,review:"Estruturada sem ser pesada. Virou minha favorita.",reviewer:"Henrique M.", image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80"},
  {id:15,name:"Calça Cargo Line",gender:"masculino",category:"roupas",label:"R$ 239",price:239,rating:4.7,reviews:10,review:"Os bolsos são práticos e a modelagem veste muito bem.",reviewer:"Caio R.", image:"https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=700&q=80"},
  {id:16,name:"Camiseta Base",gender:"masculino",category:"roupas",label:"R$ 119",price:119,rating:4.8,reviews:21,review:"Malha macia e caimento certo para usar todo dia.",reviewer:"André S.", image:"https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=700&q=80"}
];
let activeFilter = "todos";
let query = "";
let cart = [];
let saved = JSON.parse(localStorage.getItem("naloges-saved") || "[]");
let checkoutShipping = null;
let selectedPayment = "card";
const pixKey = "48815282890";
const lookSelection = {top:5, bottom:3, accessory:2};
let purchases = JSON.parse(localStorage.getItem("naloges-purchases") || "[]");
let isLoggedIn = false;
let isAdminLoggedIn = false;
let adminName = "Natália";
const money = value => value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const grid = document.querySelector("#productGrid");
const toast = document.querySelector("#toast");

function renderProducts() {
  const visible = products.filter(product => {
    const matchesGender = (activeFilter === "feminino" || activeFilter === "masculino")
      ? product.gender === activeFilter || product.gender === "unissex"
      : false;
    return (activeFilter === "todos" || product.category === activeFilter || matchesGender) && product.name.toLowerCase().includes(query.toLowerCase());
  });
  grid.innerHTML = visible.length ? visible.map(product => `
    <article class="product-card" id="product-${product.id}">
      <div class="product-image"><button class="heart ${saved.includes(product.id) ? "saved" : ""}" data-favorite="${product.id}" aria-label="${saved.includes(product.id) ? "Remover" : "Adicionar"} ${product.name} da lista comprar depois"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H6"></path><circle cx="10" cy="20" r="1.2"></circle><circle cx="18" cy="20" r="1.2"></circle></svg></button><button class="quick-add" data-add="${product.id}" aria-label="Adicionar ${product.name} ao carrinho"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H6"></path><circle cx="10" cy="20" r="1.2"></circle><circle cx="18" cy="20" r="1.2"></circle></svg><span>Adicionar</span></button><img src="${product.image}" alt="${product.name}" loading="lazy"><span class="product-tag">${product.label}</span></div>
      <div class="product-info"><div><div class="product-name">${product.name}</div><div class="product-category">${product.gender === "feminino" ? "Feminino" : product.gender === "masculino" ? "Masculino" : "Unissex"} · ${product.category === "roupas" ? "Roupa" : "Acessório"}</div><div class="product-rating" aria-label="${product.rating} de 5 estrelas"><span>★★★★★</span> ${product.rating.toFixed(1)} <small>(${product.reviews})</small></div></div><div class="product-price">${money(product.price)}</div></div>
      <blockquote class="product-review">“${product.review}” <cite>— ${product.reviewer}</cite></blockquote>
      <button class="add-button" data-add="${product.id}">Adicionar à bag +</button>
    </article>`).join("") : `<div class="no-results"><p>Nenhuma peça encontrou esse caminho.</p><button class="text-link" id="clearSearch">Limpar busca ↗</button></div>`;
}

function showToast(message) {
  toast.textContent = message; toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function updateCart() {
  const count = cart.reduce((total,item) => total + item.quantity, 0);
  document.querySelector("#cartCount").textContent = count;
  document.querySelector("#drawerCount").textContent = `(${count})`;
  const cartSubtotal = cart.reduce((total,item) => total + item.price * item.quantity, 0);
  const cartDiscount = cartSubtotal * 0.03;
  document.querySelector("#cartSubtotal").textContent = money(cartSubtotal);
  document.querySelector("#cartDiscount").textContent = `− ${money(cartDiscount)}`;
  document.querySelector("#cartTotal").textContent = money(cartSubtotal - cartDiscount);
  const items = document.querySelector("#cartItems");
  items.innerHTML = cart.length ? cart.map(item => `
    <div class="cart-line"><img src="${item.image}" alt=""><div><h3>${item.name}</h3><p>${money(item.price)}</p><div class="quantity"><button data-decrease="${item.id}" aria-label="Diminuir quantidade">−</button><span>${item.quantity}</span><button data-increase="${item.id}" aria-label="Aumentar quantidade">+</button></div></div><button class="remove-item" data-remove="${item.id}">Remover</button></div>`).join("") : `<div class="empty-cart"><span>✳</span><p>Sua seleção ainda está vazia.</p><a href="#catalogo" id="continueShopping">Descobrir peças ↗</a></div>`;
  document.querySelectorAll("#continueShopping").forEach(link => link.addEventListener("click", closeCart));
}

function updateSaved() {
  localStorage.setItem("naloges-saved", JSON.stringify(saved));
  document.querySelector("#savedCount").textContent = saved.length;
  document.querySelector("#savedDrawerCount").textContent = `(${saved.length})`;
  const items = document.querySelector("#savedItems");
  items.innerHTML = saved.length ? saved.map(id => {
    const product = products.find(item => item.id === id);
    return `<div class="saved-line"><img src="${product.image}" alt="${product.name}"><div><h3>${product.name}</h3><p>${money(product.price)}</p><button class="saved-add" data-saved-add="${product.id}">Colocar na bag +</button></div><button class="remove-item" data-saved-remove="${product.id}">Remover</button></div>`;
  }).join("") : `<div class="empty-cart"><span>♡</span><p>Você ainda não salvou nenhuma peça.</p><a href="#catalogo" id="savedContinue">Explorar a seleção ↗</a></div>`;
  document.querySelectorAll("#savedContinue").forEach(link => link.addEventListener("click", closeSaved));
  const savedTotal = saved.reduce((total, id) => {
    const product = products.find(item => item.id === id);
    return total + (product ? product.price : 0);
  }, 0);
  const savedDiscount = savedTotal * 0.03;
  document.querySelector("#savedProductsTotal").textContent = money(savedTotal);
  document.querySelector("#savedGrandTotal").textContent = money(savedTotal - savedDiscount);
  document.querySelector("#savedDiscount").textContent = `− ${money(savedDiscount)}`;
}

function openCart() { document.querySelector("#cartDrawer").classList.add("open"); document.querySelector("#cartDrawer").setAttribute("aria-hidden","false"); }
function closeCart() { document.querySelector("#cartDrawer").classList.remove("open"); document.querySelector("#cartDrawer").setAttribute("aria-hidden","true"); }
function openLogin() { document.querySelector("#loginModal").classList.add("open"); document.querySelector("#loginModal").setAttribute("aria-hidden","false"); document.querySelector("#emailInput").focus(); }
function closeLogin() { document.querySelector("#loginModal").classList.remove("open"); document.querySelector("#loginModal").setAttribute("aria-hidden","true"); }
function openSaved() { document.querySelector("#savedDrawer").classList.add("open"); document.querySelector("#savedDrawer").setAttribute("aria-hidden","false"); }
function closeSaved() { document.querySelector("#savedDrawer").classList.remove("open"); document.querySelector("#savedDrawer").setAttribute("aria-hidden","true"); }
function openPurchases() { renderPurchases(); document.querySelector("#purchasesModal").classList.add("open"); document.querySelector("#purchasesModal").setAttribute("aria-hidden","false"); }
function closePurchases() { document.querySelector("#purchasesModal").classList.remove("open"); document.querySelector("#purchasesModal").setAttribute("aria-hidden","true"); }
function openCheckout() {
  const subtotal = cart.reduce((total,item) => total + item.price * item.quantity, 0);
  const discount = subtotal * 0.03;
  checkoutShipping = null;
  selectedPayment = "card";
  document.querySelector('input[name="paymentMethod"][value="card"]').checked = true;
  document.querySelectorAll(".payment-option").forEach(option => option.classList.toggle("selected", option.querySelector("input").checked));
  document.querySelector("#cardFields").hidden = false;
  document.querySelector("#pixFields").hidden = true;
  document.querySelector("#pixQrCode").src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(pixKey)}`;
  document.querySelector("#checkoutSubtotal").textContent = money(subtotal);
  document.querySelector("#checkoutDiscount").textContent = `− ${money(discount)}`;
  document.querySelector("#checkoutShipping").textContent = "A calcular";
  document.querySelector("#checkoutTotal").textContent = money(subtotal - discount);
  document.querySelector("#checkoutModal").classList.add("open");
  document.querySelector("#checkoutModal").setAttribute("aria-hidden","false");
  document.querySelector("#checkoutCepInput").focus();
}
function closeCheckout() { document.querySelector("#checkoutModal").classList.remove("open"); document.querySelector("#checkoutModal").setAttribute("aria-hidden","true"); }
function openAdminLogin() { document.querySelector("#adminLoginModal").classList.add("open"); document.querySelector("#adminLoginModal").setAttribute("aria-hidden","false"); document.querySelector("#adminNameInput").focus(); }
function closeAdminLogin() { document.querySelector("#adminLoginModal").classList.remove("open"); document.querySelector("#adminLoginModal").setAttribute("aria-hidden","true"); }
function openAdmin() {
  renderAdmin();
  document.querySelector("#adminModal").classList.add("open");
  document.querySelector("#adminModal").setAttribute("aria-hidden","false");
}
function closeAdmin() { document.querySelector("#adminModal").classList.remove("open"); document.querySelector("#adminModal").setAttribute("aria-hidden","true"); }
function renderAdmin() {
  const revenue = purchases.reduce((total, order) => total + order.total, 0);
  document.querySelector("#adminOrders").textContent = purchases.length;
  document.querySelector("#adminRevenue").textContent = money(revenue);
  document.querySelector("#adminProducts").textContent = products.length;
  document.querySelector("#adminOrdersList").innerHTML = purchases.length ? purchases.slice(0, 5).map(order => `<div class="admin-order"><div><strong>${order.buyer?.name || order.buyer?.email || "Cliente identificado"}</strong><span>${order.buyer?.email || "Contato não informado"} · #${order.id}</span><small>${order.date}</small></div><strong>${money(order.total)}</strong></div>`).join("") : `<p class="admin-empty">Nenhum pedido concluído ainda.</p>`;
}
function renderPurchases() {
  const history = document.querySelector("#purchaseHistory");
  history.innerHTML = purchases.length ? purchases.map(order => `
    <article class="purchase-order">
      <div class="purchase-order-top"><strong>Pedido #${order.id}</strong><span>${order.date}</span></div>
      <div class="purchase-status">${order.status}</div>
      <div class="purchase-products">${order.items.map(item => `<span>${item.quantity}× ${item.name}</span>`).join("")}</div>
      <div class="purchase-details"><span>Entrega: ${order.cep}</span><span>Pagamento: ${order.payment}</span><span>Rastreio: ${order.tracking}</span></div>
      <div class="purchase-order-total"><span>Total pago</span><strong>${money(order.total)}</strong></div>
      <button class="buy-again" data-buy-again="${order.id}">Comprar novamente ↗</button>
    </article>`).join("") : `<div class="empty-purchases"><span>✳</span><p>Você ainda não concluiu nenhuma compra.</p><small>Quando finalizar um pedido, ele aparecerá aqui.</small></div>`;
}
function completePurchase() {
  const subtotal = cart.reduce((total,item) => total + item.price * item.quantity, 0);
  const total = subtotal - subtotal * 0.03;
  purchases.unshift({
    id: String(Date.now()).slice(-6),
    date: new Date().toLocaleDateString("pt-BR"),
    status: "Pedido confirmado",
    cep: document.querySelector("#checkoutCepInput").value || "CEP informado no checkout",
    payment: selectedPayment === "pix" ? "PIX (copia e cola)" : selectedPayment === "boleto" ? "Boleto bancário" : "Cartão de crédito",
    buyer: {
      name: document.querySelector("#emailInput").value.split("@")[0] || "Cliente",
      email: document.querySelector("#emailInput").value
    },
    tracking: `NAL${String(Date.now()).slice(-8)}`,
    total,
    items: cart.map(item => ({name:item.name, quantity:item.quantity}))
  });
  localStorage.setItem("naloges-purchases", JSON.stringify(purchases));
  cart = [];
  updateCart();
  closeCart();
  showToast("Compra concluída e salva em Minhas compras.");
}

grid.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  const favoriteButton = event.target.closest("[data-favorite]");
  const addId = addButton && addButton.dataset.add;
  if (addId) {
    const product = products.find(item => item.id === Number(addId));
    const existing = cart.find(item => item.id === product.id);
    existing ? existing.quantity++ : cart.push({...product,quantity:1});
    updateCart(); showToast(`${product.name} entrou na sua bag.`);
  }
  if (favoriteButton) {
    const id = Number(favoriteButton.dataset.favorite);
    saved = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
    updateSaved(); renderProducts();
    showToast(saved.includes(id) ? "Salvo em Comprar depois." : "Removido da sua lista.");
  }
  if (event.target.id === "clearSearch") { query = ""; document.querySelector("#searchInput").value = ""; renderProducts(); }
});
document.querySelector("#searchInput").addEventListener("input", event => { query = event.target.value; renderProducts(); });
document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => { document.querySelector(".filter.active").classList.remove("active"); button.classList.add("active"); activeFilter = button.dataset.filter; renderProducts(); }));
document.querySelectorAll(".gender-category").forEach(button => button.addEventListener("click", () => {
  const filter = document.querySelector(`.filter[data-filter="${button.dataset.gender}"]`);
  document.querySelector(".filter.active").classList.remove("active");
  filter.classList.add("active");
  activeFilter = button.dataset.gender;
  renderProducts();
  document.querySelector("#catalogo").scrollIntoView({behavior:"smooth"});
}));
document.querySelectorAll(".look-figure").forEach(button => button.addEventListener("click", () => {
  const filter = document.querySelector(`.filter[data-filter="${button.dataset.gender}"]`);
  document.querySelector(".filter.active").classList.remove("active");
  filter.classList.add("active");
  activeFilter = button.dataset.gender;
  renderProducts();
  document.querySelector("#catalogo").scrollIntoView({behavior:"smooth"});
}));
function updateLookPreview() {
  const pieces = Object.values(lookSelection).map(id => products.find(product => product.id === id)).filter(Boolean);
  document.querySelector("#lookSelected").textContent = pieces.map(piece => piece.name).join(" + ");
  document.querySelectorAll(".look-figure").forEach(figure => figure.classList.toggle("look-dressed", figure.dataset.gender === document.querySelector("#lookGender").value));
}
document.querySelectorAll(".look-choice").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(`[data-piece-type="${button.dataset.pieceType}"]`).forEach(option => option.classList.remove("active"));
  button.classList.add("active");
  lookSelection[button.dataset.pieceType] = Number(button.dataset.pieceId);
  updateLookPreview();
}));
document.querySelector("#lookGender").addEventListener("change", updateLookPreview);
document.querySelector("#addLookToCart").addEventListener("click", () => {
  Object.values(lookSelection).forEach(id => {
    const product = products.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);
    existing ? existing.quantity++ : cart.push({...product, quantity:1});
  });
  updateCart();
  openCart();
  showToast("Seu look foi adicionado à bag.");
});
function openLookBuilder() {
  const lookSection = document.querySelector("#monte-seu-look");
  lookSection.hidden = false;
  closePurchases();
  lookSection.scrollIntoView({behavior:"smooth"});
}
document.querySelector("#purchasesLookButton").addEventListener("click", openLookBuilder);
document.querySelector("#lookBack").addEventListener("click", () => {
  document.querySelector("#monte-seu-look").hidden = true;
  window.scrollTo({top:0, behavior:"smooth"});
});
document.querySelector("#cartToggle").addEventListener("click", openCart);
document.querySelector("#drawerClose").addEventListener("click", closeCart);
document.querySelector("#drawerCloseButton").addEventListener("click", closeCart);
document.querySelector("#savedToggle").addEventListener("click", openSaved);
document.querySelector("#savedClose").addEventListener("click", closeSaved);
document.querySelector("#savedCloseButton").addEventListener("click", closeSaved);
document.querySelector("#savedItems").addEventListener("click", event => {
  const addId = Number(event.target.dataset.savedAdd);
  const removeId = Number(event.target.dataset.savedRemove);
  if (addId) {
    const product = products.find(item => item.id === addId);
    const existing = cart.find(item => item.id === addId);
    existing ? existing.quantity++ : cart.push({...product, quantity:1});
    updateCart(); closeSaved(); openCart(); showToast(`${product.name} entrou na sua bag.`);
  }
  if (removeId) { saved = saved.filter(id => id !== removeId); updateSaved(); renderProducts(); }
});
function addSavedToCart() {
  if (!saved.length) {
    showToast("Salve uma peça antes de adicionar à bag.");
    return false;
  }
  saved.forEach(id => {
    const product = products.find(item => item.id === id);
    if (!product) return;
    const existing = cart.find(item => item.id === id);
    existing ? existing.quantity++ : cart.push({...product, quantity:1});
  });
  updateCart();
  showToast(`${saved.length} item(ns) adicionados à sua bag.`);
  return true;
}
document.querySelector("#addAllSaved").addEventListener("click", () => {
  if (addSavedToCart()) { closeSaved(); openCart(); }
});
document.querySelector("#savedCheckout").addEventListener("click", () => {
  if (!saved.length && !cart.length) {
    showToast("Salve ou adicione uma peça antes de comprar.");
    return;
  }
  if (saved.length) addSavedToCart();
  closeSaved();
  if (!isLoggedIn) openLogin();
  else openCart();
});
document.querySelector("#checkoutCepInput").addEventListener("input", event => {
  const digits = event.target.value.replace(/\D/g, "").slice(0, 8);
  event.target.value = digits.replace(/^(\d{5})(\d)/, "$1-$2");
});
document.querySelector("#calculateCheckoutShipping").addEventListener("click", () => {
  const cep = document.querySelector("#checkoutCepInput").value.replace(/\D/g, "");
  if (cep.length !== 8) {
    showToast("Digite um CEP válido com 8 números.");
    return;
  }
  checkoutShipping = Number(cep.slice(-2)) % 2 === 0 ? 19.90 : 24.90;
  const subtotal = cart.reduce((total,item) => total + item.price * item.quantity, 0);
  const discount = subtotal * 0.03;
  document.querySelector("#checkoutShipping").textContent = money(checkoutShipping);
  document.querySelector("#checkoutTotal").textContent = money(subtotal - discount + checkoutShipping);
  showToast("Frete estimado atualizado.");
});
document.querySelector("#checkoutClose").addEventListener("click", closeCheckout);
document.querySelector("#checkoutCloseButton").addEventListener("click", closeCheckout);
document.querySelectorAll('input[name="paymentMethod"]').forEach(input => input.addEventListener("change", event => {
  selectedPayment = event.target.value;
  document.querySelectorAll(".payment-option").forEach(option => option.classList.toggle("selected", option.querySelector("input").checked));
  document.querySelector("#cardFields").hidden = selectedPayment !== "card";
  document.querySelector("#pixFields").hidden = selectedPayment !== "pix";
  document.querySelector("#paymentHint").textContent = selectedPayment === "pix" ? "Um QR Code demonstrativo será exibido após confirmar." : selectedPayment === "boleto" ? "O boleto demonstrativo ficará disponível após confirmar." : "Os dados são demonstrativos e não serão cobrados.";
}));
document.querySelector("#cardNumber").addEventListener("input", event => {
  const digits = event.target.value.replace(/\D/g, "").slice(0, 16);
  event.target.value = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
});
document.querySelector("#cardExpiry").addEventListener("input", event => {
  const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
  event.target.value = digits.replace(/^(\d{2})(\d)/, "$1/$2");
});
document.querySelector("#copyPixCode").addEventListener("click", async () => {
  const code = document.querySelector("#pixCode").value;
  try {
    await navigator.clipboard.writeText(code);
    showToast("Código PIX copiado.");
  } catch {
    document.querySelector("#pixCode").select();
    showToast("Selecione e copie o código PIX.");
  }
});
document.querySelector("#confirmPurchase").addEventListener("click", () => {
  if (checkoutShipping === null) { showToast("Calcule o frete pelo CEP antes de confirmar."); return; }
  if (selectedPayment === "card" && (!document.querySelector("#cardName").value.trim() || document.querySelector("#cardNumber").value.replace(/\D/g, "").length < 16 || document.querySelector("#cardExpiry").value.length < 5 || document.querySelector("#cardCvv").value.length < 3)) {
    showToast("Preencha os dados do cartão."); return;
  }
  completePurchase();
  closeCheckout();
});
document.querySelector("#adminLoginClose").addEventListener("click", closeAdminLogin);
document.querySelector("#adminLoginCloseButton").addEventListener("click", closeAdminLogin);
document.querySelector("#adminCpfInput").addEventListener("input", event => {
  const digits = event.target.value.replace(/\D/g, "").slice(0, 11);
  event.target.value = digits.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
});
document.querySelector("#adminLoginForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const error = document.querySelector("#adminFormError");
  if (!form.checkValidity()) { error.textContent = "Preencha seu nome, CPF e uma senha com pelo menos 6 caracteres."; return; }
  adminName = document.querySelector("#adminNameInput").value.trim() || "Natália";
  isAdminLoggedIn = true;
  document.querySelector("#adminTitle").innerHTML = `Olá, ${adminName}.<br /><em>Sua loja.</em>`;
  document.querySelector(".admin-identity strong").textContent = adminName;
  closeAdminLogin();
  openAdmin();
});
document.querySelector("#adminClose").addEventListener("click", closeAdmin);
document.querySelector("#adminCloseButton").addEventListener("click", closeAdmin);
document.querySelector("#adminCatalogAction").addEventListener("click", () => { closeAdmin(); document.querySelector("#catalogo").scrollIntoView({behavior:"smooth"}); });
document.querySelector("#adminLookAction").addEventListener("click", () => { closeAdmin(); openLookBuilder(); });
document.querySelector("#adminClearOrders").addEventListener("click", () => {
  purchases = [];
  localStorage.removeItem("naloges-purchases");
  renderAdmin();
  showToast("Histórico demonstrativo limpo.");
});
document.querySelector("#cartItems").addEventListener("click", event => {
  const id = Number(event.target.dataset.increase || event.target.dataset.decrease || event.target.dataset.remove);
  const item = cart.find(product => product.id === id);
  if (!item) return;
  if (event.target.dataset.increase) item.quantity++;
  if (event.target.dataset.decrease) item.quantity--;
  if (event.target.dataset.remove || item.quantity <= 0) cart = cart.filter(product => product.id !== id);
  updateCart();
});
document.querySelector("#checkoutButton").addEventListener("click", () => {
  if (!cart.length) return showToast("Adicione uma peça antes de finalizar.");
  if (!isLoggedIn) { closeCart(); openLogin(); return; }
  closeCart();
  openCheckout();
});
document.querySelector("#accountToggle").addEventListener("click", () => isLoggedIn ? openPurchases() : openLogin());
document.querySelector("#loginClose").addEventListener("click", closeLogin);
document.querySelector("#loginCloseButton").addEventListener("click", closeLogin);
document.querySelector("#cpfInput").addEventListener("input", event => {
  const digits = event.target.value.replace(/\D/g, "").slice(0, 11);
  event.target.value = digits.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
});
document.querySelector("#loginForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const error = document.querySelector("#formError");
  if (!form.checkValidity()) { error.textContent = "Preencha e-mail, CPF e uma senha com pelo menos 6 caracteres."; return; }
  isLoggedIn = true;
  document.querySelector("#accountToggle").textContent = "Minha conta";
  closeLogin();
  showToast("Acesso criado. Sua bag está pronta.");
});
document.querySelector("#purchasesClose").addEventListener("click", closePurchases);
document.querySelector("#purchasesCloseButton").addEventListener("click", closePurchases);
document.querySelector("#purchaseHistory").addEventListener("click", event => {
  const orderId = event.target.dataset.buyAgain;
  if (!orderId) return;
  const order = purchases.find(item => item.id === orderId);
  if (!order) return;
  order.items.forEach(orderItem => {
    const product = products.find(item => item.name === orderItem.name);
    if (!product) return;
    const existing = cart.find(item => item.id === product.id);
    existing ? existing.quantity += orderItem.quantity : cart.push({...product, quantity:orderItem.quantity});
  });
  updateCart();
  closePurchases();
  openCart();
  showToast("Os itens do pedido foram adicionados à sua bag.");
});
document.querySelector("#searchToggle").addEventListener("click", () => { document.querySelector("#searchInput").focus(); document.querySelector("#catalogo").scrollIntoView({behavior:"smooth"}); });
updateSaved();
renderProducts();
updateLookPreview();
