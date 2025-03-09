$(document).ready(function () {
  $("html, body").css({
    overflowX: "hidden",
    margin: "0",
    padding: "0",
  });
  $("body").css({
    overflow: "auto",
    fontFamily: "Poppins, sans-serif",
    "box-sizing": "border-box",
  });
  const mainContainer = $("<div>").addClass("main-container");
  $("body").append(mainContainer);
  const initialContentContainer = $("<div>")
    .attr("id", "initialContentContainer")
    .addClass("content-container");
  const logo = $("<img>")
    .attr("src", "/assets/img/synthaflow-logo-violet.svg")
    .addClass("logo");
  const title = $("<h1>")
    .text("Meet our style suggestions tailored to you.")
    .addClass("title");
  const description = $("<p>")
    .text(
      "Synthaflow, your personal style access, helps you express your style in the best way possible with AI-powered suggestions."
    )
    .addClass("description");
  const button = $("<button>")
    .attr("id", "productListButton")
    .text("✨ List Products")
    .addClass("button");
  initialContentContainer.append(logo, title, description, button);
  mainContainer.append(initialContentContainer);
  const lottieContainer = $("<div>")
    .attr("id", "lottie-container")
    .addClass("lottie-container")
    .hide();
  $("body").append(lottieContainer);
  const animation = lottie.loadAnimation({
    container: document.getElementById("lottie-container"),
    renderer: "svg",
    loop: true,
    autoplay: false,
    path: "/assets/json/spinner.json",
    width: 50,
    height: 50,
  });
  $("#productListButton").click(function () {
    mainContainer.css("filter", "blur(5px)");
    lottieContainer.show();
    animation.play();
    setTimeout(function () {
      animation.stop();
      lottieContainer.hide();
      mainContainer.css("filter", "none");
      mainContainer.css({
        display: "block",
        "align-items": "flex-start",
        padding: "20px",
      });
      loadProducts();
    }, 2500);
  });
  $("<style>")
    .prop("type", "text/css")
    .html(
      `
    * { box-sizing: border-box; }
    html, body { overflow-x: hidden; margin: 0; padding: 0; }
    .main-container { position: relative; width: 100%; min-height: 100vh; display: flex; justify-content: center; align-items: center; background-image: url('/assets/img/background.svg'); background-repeat: repeat; background-size: auto; font-family: Poppins, sans-serif; opacity: 0.9; margin-bottom: 20px; overflow-y: auto; }
    .content-container { text-align: center; width: 100%; padding: 0 10px; }
    .logo { width: 200px; margin-bottom: 20px; }
    .title { color: #634bf9; font-weight: 800; font-size: 24px; margin-bottom: 30px; text-align: center; }
    .description { font-size: 16px; color: #777; margin-bottom: 30px; padding: 0 20px; line-height: 1.6; text-align: center; }
    .button { padding: 15px 30px; font-size: 18px; background-color: #634bf9; color: white; border: none; border-radius: 8px; cursor: pointer; margin-top: 30px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); transition: background-color 0.3s ease; }
    .button:hover { background-color: #523bc2; }
    .lottie-container { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.2); z-index: 1000; }
    .product-list-container { text-align: center; width: 100%; max-width: 1200px; margin: 20px auto; }
    #productGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 20px; width: 100%; margin: 0 auto; }
    @media (max-width: 1200px) { #productGrid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 1024px) { #productGrid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) { #productGrid { grid-template-columns: 1fr; padding: 10px; } }
    .productCard { border: 1px solid #ddd; padding: 15px; text-align: center; border-radius: 8px; background: #f1f1f1; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 100%; max-width: 300px; margin: 20px auto; }
    .productImage { max-width: 100%; height: auto; margin-bottom: 10px; transition: opacity 0.6s ease-in-out; }
    .productColors { margin-top: 10px; display: flex; align-items: center; justify-content: center; gap: 10px; }
    .productColors span { font-weight: bold; }
    .productColors button { width: 25px; height: 25px; border-radius: 50%; border: none; cursor: pointer; margin-bottom: 20px; transition: transform 0.3s ease, border 0.3s ease; }
    .productColors button:hover, .productColors button:focus { transform: scale(1.1); border: 2px solid #634bf9; outline: none; }
    .productDetails button { padding: 8px 12px; background-color: #634bf9; color: white; border: none; border-radius: 5px; cursor: pointer; }
    #productDetailsPopup { display: block; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #f1f1f1; padding: 30px; border-radius: 12px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); z-index: 1001; width: 600px; max-width: 90%; max-height: 90%; overflow-y: auto; text-align: center; }
    @media (max-width: 768px) { #productDetailsPopup { width: 90%; max-width: 400px; padding: 20px; } }
    #productDetailsPopup h3 { font-size: 24px; margin-bottom: 20px; color: #333; }
    #productDetailsPopup img { max-width: 100%; height: auto; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
    #productDetailsPopup p { font-size: 16px; color: #555; line-height: 1.6; margin-bottom: 20px; }
    #productDetailsPopup span { font-size: 18px; font-weight: bold; color: #634bf9; display: block; margin-bottom: 20px; }
    #productDetailsPopup a { font-family: Poppins, sans-serif; background-color: #333; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; margin-right: 10px; font-size: 16px; }
    #productDetailsPopup button { padding: 12px 20px; background-color: #634bf9; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; transition: background-color 0.3s ease; }
    #productDetailsPopup button:hover { background-color: #523bc2; }
    `
    )
    .appendTo("head");
  function loadProducts() {
    $.getJSON("/assets/json/products.json", function (data) {
      const products = data.products;
      $("#initialContentContainer").hide();
      let productListContainer = $("#productListContainer");
      if (!productListContainer.length) {
        productListContainer = $("<div>")
          .attr("id", "productListContainer")
          .addClass("product-list-container")
          .append($("<h1>").text("Product List"))
          .append(
            $("<p>").text("Check out our products specially selected for you.")
          );
        const productGrid = $("<div>").attr("id", "productGrid");
        productListContainer.append(productGrid);
        mainContainer.append(productListContainer);
      }
      $("#productGrid").empty();
      products.forEach(function (product) {
        const card = $("<div>").addClass("productCard");
        const firstColor = Object.keys(product.images)[0];
        card.append(
          $("<img>")
            .attr("src", product.images[firstColor])
            .addClass("productImage")
        );
        card.append($("<h3>").text(product.name));
        const colorButtons = $("<div>")
          .addClass("productColors")
          .append($("<span>").text("Color : "));
        Object.keys(product.images).forEach(function (colorName) {
          const colorButton = $("<button>")
            .css("background-color", colorName)
            .click(function () {
              const productImage = card.find(".productImage");
              const newImageSrc = product.images[colorName];
              productImage.css("opacity", 0);
              setTimeout(function () {
                productImage.attr("src", newImageSrc).css("opacity", 1);
              }, 300);
              product.selectedColor = colorName;
            });
          colorButtons.append(colorButton);
        });
        card.append(colorButtons);
        const detailsButton = $("<button>")
          .text("View Details")
          .click(function () {
            showProductDetails(product);
          });
        card.append(
          $("<div>").addClass("productDetails").append(detailsButton)
        );
        $("#productGrid").append(card);
      });
      $("#productListContainer").fadeIn();
    });
  }
  function showProductDetails(product) {
    const productDetailsPopup = $("<div>")
      .attr("id", "productDetailsPopup")
      .appendTo("body");
    $("#productDetailsPopup").empty().append($("<h3>").text(product.name));
    let imageSrc = product.images[Object.keys(product.images)[0]];
    if (product.selectedColor) {
      imageSrc = product.images[product.selectedColor];
    }
    const productImage = $("<img>").attr("src", imageSrc);
    $("#productDetailsPopup").append(productImage);
    $("#productDetailsPopup").append($("<p>").text(product.details));
    const price = $("<span>").text(`Price: $${product.price}`);
    $("#productDetailsPopup").append(price);
    const purchaseLink = $("<a>")
      .attr("href", product.link || "#")
      .attr("target", "_blank")
      .text("Buy Now");
    $("#productDetailsPopup").append(purchaseLink);
    const closeButton = $("<button>")
      .text("Close")
      .click(function () {
        $("#productDetailsPopup").remove();
      });
    $("#productDetailsPopup").append(closeButton);
  }
});
