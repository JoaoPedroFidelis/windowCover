// ------- Ao iniciar dar load em css e carregar configurações...
document.head.innerHTML += '<link rel="stylesheet" href="davinci/style.css">';
window.addEventListener("load", function(event) { load(); });

// ------- Evento 'constructor'.
function load() {
    this.body = document.body;
    this.body.style.margin = 0;

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('daVinciTextArea');
    this.body.appendChild(this.textarea);
    new ResizeObserver(textareaSize).observe(this.textarea);
    this.textarea.disabled = 'true';
    // opacity(50); // Tire o comentario a esquerda para definir uma opacidade. (Ex: 50, 20, 90)

    if(localStorage.getItem('textareaWidth')) this.textarea.style.width = localStorage.getItem('textareaWidth') + 'px';
    else this.textarea.style.width = '20px';

    createUI();
}
function textareaSize() { localStorage.setItem('textareaWidth', textarea.offsetWidth); }
function opacity(num) { this.textarea.style.opacity = num + '%'; }

// ------- Carregar todas configurações como criação de layout.
function createUI(){
    // Cria elementos da UI.
    this.uiHolder = document.createElement('div');
    this.uiHolder.classList.add('daVinciUIHolder');
    this.body.appendChild(this.uiHolder);

    this.windowElement = document.createElement('div');
    this.windowElement.classList.add('daVinciWindow');
    this.uiHolder.appendChild(this.windowElement);

    this.ui = document.createElement('div');
    this.ui.classList.add('daVinciUI');
    this.uiHolder.appendChild(this.ui);

    createIcon('pallete.png');
    var close = createIcon('close.png');
    this.closedWindow = false;

    var sec = createSec();
    var path = createInput('Image Path', sec);
    var susSec = createSec(null, true);
    var sec = createSec(susSec);
    sec.id = 'daVinciSizeInputs';
    var inputW = createInput('Width', sec);
    var inputH = createInput('Height', sec);
    var sec = createSec(susSec);
    sec.id = 'daVinciSizeButtons';
    var focusW = createButton('focus width', sec);
    var focusH = createButton('focus height', sec);
    var resetSize = createButton('reset size', sec);
    var sec = createSec();
    sec.id = 'daVinciPosInputs';
    var x = createInput('X', sec);
    var y = createInput('Y', sec);
    var repeatBg = createButton('repeat background', sec);
    repeatBg.classList.add('daVinciMinBtn');


    // Carrega todos os dados do localStorage.
    if(localStorage.getItem('closed') === 'true') {
        this.closedWindow = true;
        closeWindow();
    }
    if(localStorage.getItem('bgRepeat')) {
        this.backgroundRepeat = localStorage.getItem('bgRepeat');
        this.backgroundRepeat = (this.backgroundRepeat === 'true');
    } else this.backgroundRepeat = true;
    bgRepeat(repeatBg);
    checkData('bgImage', path, 'image-teste1.jpg');
    textarea.style.backgroundImage = "url(daVinci/img/" + path.value + ")";
    if(localStorage.getItem('size') == 'focusW' || !localStorage.getItem('size')){
        textarea.style.backgroundSize = "100vw auto"; modInput(inputW, '100vw', true); modInput(inputH, 'auto', true);
    } else if(localStorage.getItem('size') == 'focusH'){
        textarea.style.backgroundSize = "auto 100vh"; modInput(inputW, 'auto', true); modInput(inputH, '100vh', true);
    } else if(localStorage.getItem('size') == 'custom'){
        inputW.value = localStorage.getItem('width');
        inputH.value = localStorage.getItem('height');
        textarea.style.backgroundSize = inputW.value + ' ' + inputH.value;
    }
    checkData('x', x);
    textarea.style.backgroundPositionX = x.value;
    checkData('y', y);
    textarea.style.backgroundPositionY = y.value;
    
    
    // Define todos os eventos de interação.
    close.addEventListener("click", function(e) {
        closedWindow = !closedWindow;
        closeWindow();
    });
    
    path.addEventListener("change", function() {
        textarea.style.backgroundImage = "url(daVinci/img/" + this.value + ")";
        localStorage.setItem('bgImage', this.value);
    });
    
    focusW.addEventListener("click", function() {
        textarea.style.backgroundSize = "100vw auto";
        modInput(inputW, '100vw', true);
        modInput(inputH, 'auto', true);
        localStorage.setItem('size', 'focusW');
    });
    focusH.addEventListener("click", function() {
        textarea.style.backgroundSize = "auto 100vh";
        modInput(inputW, 'auto', true);
        modInput(inputH, '100vh', true);
        localStorage.setItem('size', 'focusH');
    });
    resetSize.addEventListener("click", function() {
        textarea.style.backgroundSize = "100vw auto";
        modInput(inputW, '100%');
        modInput(inputH, '100%');
        localStorage.setItem('size', 'custom');
        localStorage.setItem('width', inputW.value);
        localStorage.setItem('height', inputH.value);
    });
    
    inputW.addEventListener("input", function() {
        textarea.style.backgroundSize = this.value + ' ' + inputH.value;
        localStorage.setItem('width', this.value);
    });
    inputH.addEventListener("input", function() {
        textarea.style.backgroundSize = inputW.value + ' ' + this.value;
        localStorage.setItem('height', this.value);
    });

    x.addEventListener("input", function() {
        textarea.style.backgroundPositionX = this.value;
        localStorage.setItem('x', this.value);
    });
    y.addEventListener("input", function() {
        textarea.style.backgroundPositionY = this.value;
        localStorage.setItem('y', this.value);
    });

    repeatBg.addEventListener("click", function(e) {
        backgroundRepeat = !backgroundRepeat;
        bgRepeat(this);
        localStorage.setItem('bgRepeat', backgroundRepeat);
    });
}


// ------- Funções de criação de layout.
function createIcon(text){
    var iconHolder = document.createElement('button');
    iconHolder.classList.add('daVinciIcon');
    this.windowElement.appendChild(iconHolder);

    var icon = document.createElement('img');
    icon.setAttribute('src', 'davinci/icons/' + text);
    iconHolder.appendChild(icon);
    return(iconHolder);
}

function createSec(parent, sus = false){
    var sec = document.createElement('div');
    sec.classList.add('daVinciSection');
    if(!parent)
    this.ui.appendChild(sec);        
    else parent.appendChild(sec);

    if(sus) sec.classList.add('daVinciSusSec');
    return(sec);
}

function createButton(text = 'null', parent){
    var button = document.createElement('button');
    button.classList.add('daVinciButton');
    button.innerHTML = text;
    parent.appendChild(button);
    return(button);
}

function createInput(text = 'null', parent){
    var div = document.createElement('div');
    div.classList.add('daVinciInput');

    var label = document.createElement('label');
    label.innerText = text;
    div.appendChild(label);

    var input = document.createElement('input');
    div.appendChild(input);

    parent.appendChild(div);
    return(input);
}


// ------- Funções extras.
function checkData(data, obj, defaulthValue = null){
    if(!localStorage.getItem(data)) obj.value = defaulthValue;
    else obj.value = localStorage.getItem(data);
}

function closeWindow(){
    var ui = this.ui;
    if(this.closedWindow){
        ui.style.display = 'none';
        this.uiHolder.classList.add('closed');
        this.uiHolder.classList.remove('opened');
    } else {
        ui.style.display = 'flex';
        this.uiHolder.classList.add('opened');
        this.uiHolder.classList.remove('closed');
    }
    localStorage.setItem('closed', this.closedWindow);
}

function bgRepeat(button){
    if(this.backgroundRepeat){
        button.classList.add('daVinciTrue');
        textarea.style.backgroundRepeat = 'repeat';
    } else if(!this.backgroundRepeat){
        button.classList.remove('daVinciTrue');
        textarea.style.backgroundRepeat = 'no-repeat';
    }
}

function modInput(input, value, disable = false){
    input.value = value;
    input.disabled = disable;
}

// Projeto finalizado em 30/03/2023.
