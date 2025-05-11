import getComponent from "../js/components.js";

const mainContainer = document.getElementById("main");

async function readJson() {
  const data = await fetch("./json/privacy_policy_es.json")
    .then((res) => res.json())
    .catch(() => {
      console.log("Error cargando política de privacidad");
    });
  console.log(data);

  return data;
}

async function buildContentView() {
  const data = await readJson().then((res) => res["data"]);

  const contentNodes = data.map((item) => {
    return getComponent(item);
  });

  return contentNodes;
}

async function showPrivacyPolicy() {
  const nodes = await buildContentView();

  if (Array.isArray(nodes)) {
    nodes.forEach((item) => {
      mainContainer.appendChild(item);
    });
  }
}

showPrivacyPolicy();
