const money = value => value.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});
const ordersKey = "naloges-purchases";
const orders = () => JSON.parse(localStorage.getItem(ordersKey) || "[]");
const cpfMask = input => {
  input.addEventListener("input", event => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 11);
    event.target.value = digits.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  });
};
const gate = document.querySelector("#adminGate");
const dashboard = document.querySelector("#adminDashboard");
const renderDashboard = () => {
  const purchases = orders();
  document.querySelector("#pageOrders").textContent = purchases.length;
  document.querySelector("#pageRevenue").textContent = money(purchases.reduce((sum, order) => sum + order.total, 0));
  document.querySelector("#pageOrdersList").innerHTML = purchases.length ? purchases.slice(0, 12).map(order => `<article class="admin-order-page"><div><strong>${order.buyer?.name || "Cliente identificado"}</strong><span>${order.buyer?.email || "Contato não informado"}</span><small>#${order.id} · ${order.date}</small><small>${order.items.map(item => `${item.quantity}× ${item.name}`).join(" · ")}</small></div><strong>${money(order.total)}</strong></article>`).join("") : `<p class="admin-empty">Nenhum pedido concluído ainda.</p>`;
};
cpfMask(document.querySelector("#pageAdminCpf"));
document.querySelector("#adminPageLogin").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.querySelector("#pageAdminName").value.trim();
  const form = event.currentTarget;
  const error = document.querySelector("#adminPageError");
  if (!form.checkValidity() || name.toLowerCase() !== "natalia" && name.toLowerCase() !== "natália") {
    error.textContent = "Use o nome Natália e preencha CPF e senha com pelo menos 6 caracteres.";
    return;
  }
  sessionStorage.setItem("naloges-admin-session", "natalia");
  gate.hidden = true;
  dashboard.hidden = false;
  renderDashboard();
});
document.querySelector("#adminLogout").addEventListener("click", () => {
  sessionStorage.removeItem("naloges-admin-session");
  dashboard.hidden = true;
  gate.hidden = false;
});
document.querySelector("#pageClearOrders").addEventListener("click", () => {
  localStorage.removeItem(ordersKey);
  renderDashboard();
});
if (sessionStorage.getItem("naloges-admin-session") === "natalia") {
  gate.hidden = true;
  dashboard.hidden = false;
  renderDashboard();
}
