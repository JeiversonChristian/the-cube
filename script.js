// Obtém o canvas HTML
const canvas = document.getElementById("renderCanvas");

// Cria o engine do Babylon.js
// "true" deixa o gráfico mais suave
const engine = new BABYLON.Engine(canvas, true);

// Função para criar a cena
function createScene() {
    // Cria a cena
    const scene = new BABYLON.Scene(engine);

    // Define a cor de fundo da cena (branco nesse caso)
    scene.clearColor = new BABYLON.Color3(0,0,0);

    // Cria a câmera
    // "camera1": Nome ou ID da câmera
    // 0 (alpha): Ângulo em radianos em torno do eixo Y (a rotação horizontal). 
    // 0 (beta): Ângulo em radianos em torno do eixo X (a rotação vertical).
    // 10 (radius): Raio da órbita da câmera em relação ao alvo -> distância da câmera?
    // BABYLON.Vector3.Zero(): Ponto no espaço para onde a câmera está olhando
    const camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    // distância que a câmera começa em cada eixo
    camera.setPosition(new BABYLON.Vector3(5, 5, 5));
    // interação do usuário com a câmera
    camera.attachControl(canvas, true);

    // Adiciona luz 1
    const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light1.intensity = 1;

     // Adiciona luz 2
     const light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, -1, 0), scene);
     light2.intensity = 1;

    // Cria a geometria do cubo
    const box = BABYLON.MeshBuilder.CreateBox("box", {size: 2}, scene);

    // Cria o material do cubo e define a cor
    const material = new BABYLON.StandardMaterial("material1", scene);
    material.diffuseColor = new BABYLON.Color3(0, 0.5, 0.75);
    box.material = material;

    // Adiciona a GUI - (Graphical User Interface)
    // Permite adicionar elementos GUI, como o texto a seguir
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // Cria o texto
    const text = new BABYLON.GUI.TextBlock();
    text.text = "mexa o cubo com o mouse 🐁";
    text.color = "white";
    text.fontSize = 24;
    text.top = "40%";
    advancedTexture.addControl(text);

    return scene;
};

// Constante que recebe a função para criar a cena
const scene = createScene();

// Função de renderização
engine.runRenderLoop(function () {
    scene.render();
});

// Adiciona um listener para redimensionar a tela quando a janela é redimensionada
window.addEventListener("resize", function () {
    engine.resize();
});
