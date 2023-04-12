// ------- Ao iniciar dar load em css e carregar configurações...
document.head.innerHTML += '<link id="windowCoverStyles" rel="stylesheet" href="windowCover/style.css">'; // Lazy...?
this.enabled = false;
window.addEventListener("load", function(event) { load(); });

// ------- Evento 'constructor'.
function load() {
    if(!this.enabled) return;
    this.body = document.body;
    this.body.style.margin = 0;
    this.prefix = 'windowcover-';

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add(this.prefix + 'TextArea');
    this.body.appendChild(this.textarea);

    this.bgHolder = document.createElement('div');
    this.bgHolder.classList.add(this.prefix + 'fakeTextarea');
    this.body.appendChild(this.bgHolder);

    this.textareaBG = document.createElement('div');
    this.textareaBG.classList.add(this.prefix + 'awesomeImgHolder');
    this.bgHolder.appendChild(this.textareaBG);

    new ResizeObserver(textareaSize).observe(this.textarea);
    this.textarea.disabled = 'true';

    if(localStorage.getItem('textareaHeight')) this.textarea.style.height = localStorage.getItem('textareaHeight') + 'px';
    else this.textarea.style.height = '100%';

    if(localStorage.getItem('textareaWidth')) this.textarea.style.width = localStorage.getItem('textareaWidth') + 'px';
    else this.textarea.style.width = '20px';

    createUI();
}
function textareaSize() {
    localStorage.setItem('textareaWidth', textarea.offsetWidth);
    localStorage.setItem('textareaHeight', textarea.offsetHeight);
    bgHolder.style.height = textarea.offsetHeight + 'px';
    bgHolder.style.width = textarea.offsetWidth + 'px';
}

// ------- Carregar todas configurações como criação de layout.
function createUI(){
    // Cria elementos da UI.
    this.uiHolder = document.createElement('div');
    this.uiHolder.classList.add(this.prefix + 'UIHolder');
    this.body.appendChild(this.uiHolder);

    this.windowElement = document.createElement('div');
    this.windowElement.classList.add(this.prefix + 'Window');
    this.uiHolder.appendChild(this.windowElement);

    this.ui = document.createElement('div');
    this.ui.classList.add(this.prefix + 'UI');
    this.uiHolder.appendChild(this.ui);

    var changePos = createIcon('window.png');
    changePos.classList.add('select');
    var reset = createIcon('reset.png');
    reset.classList.add('select');
    var close = createIcon('close.png');
    close.classList.add('select');
    this.closedWindow = false;

    var sec = createSec();
    var path = createInput('Image Path', sec);
    var susSec = createSec(null, true);
    var sec = createSec(susSec);
    sec.id = this.prefix + 'SizeInputs';
    var inputW = createInput('Width', sec);
    var inputH = createInput('Height', sec);
    var sec = createSec(susSec);
    sec.id = this.prefix + 'SizeButtons';
    var focusW = createButton('focus width', sec);
    var focusH = createButton('focus height', sec);
    var resetSize = createButton('reset size', sec);
    var sec = createSec();
    sec.id = this.prefix + 'PosInputs';
    var x = createInput('X', sec);
    var y = createInput('Y', sec);
    var repeatBg = createButton('repeat background', sec);
    repeatBg.classList.add(this.prefix + 'MinBtn');


    // Carrega todos os dados do localStorage.
    if(localStorage.getItem('prefPos') == 'goUp') uiHolder.style.top = '10px';
    else uiHolder.style.bottom = '10px';

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
    textareaBG.style.backgroundImage = "url(windowCover/img/" + path.value + ")";
    if(localStorage.getItem('size') == 'focusW' || !localStorage.getItem('size')){
        textareaBG.style.backgroundSize = "100vw auto"; modInput(inputW, '100vw', true); modInput(inputH, 'auto', true);
    } else if(localStorage.getItem('size') == 'focusH'){
        textareaBG.style.backgroundSize = "auto 100vh"; modInput(inputW, 'auto', true); modInput(inputH, '100vh', true);
    } else if(localStorage.getItem('size') == 'custom'){
        inputW.value = localStorage.getItem('width');
        inputH.value = localStorage.getItem('height');
        textareaBG.style.backgroundSize = inputW.value + ' ' + inputH.value;
    }
    checkData('x', x);
    textareaBG.style.backgroundPositionX = x.value;
    checkData('y', y);
    textareaBG.style.backgroundPositionY = y.value;


    // Define todos os eventos de interação.
    changePos.addEventListener("click", function(e) {
        if(!uiHolder.style.top){
            uiHolder.style.top = '10px';
            uiHolder.style.bottom = null;
            localStorage.setItem('prefPos', 'goUp');
        } else {
            uiHolder.style.bottom = '10px';
            uiHolder.style.top = null;
            localStorage.setItem('prefPos', 'goDown');
        }
    });
    reset.addEventListener("click", function(e) {
        textareaBG.style.backgroundSize = "100vw auto"; modInput(inputW, '100vw', true); modInput(inputH, 'auto', true);
        x.value = '';
        y.value = '';
        textareaBG.style.backgroundPositionX = x.value;
        textareaBG.style.backgroundPositionY = y.value;
        backgroundRepeat = true;
        bgRepeat(repeatBg);
        path.value = 'image-teste1.jpg';
        textareaBG.style.backgroundImage = "url(windowCover/img/" + path.value + ")";

        localStorage.setItem('x', x.value);
        localStorage.setItem('y', y.value);
        localStorage.setItem('size', 'focusW');
        localStorage.setItem('bgRepeat', backgroundRepeat);
        localStorage.setItem('bgImage', path.value);
    });
    close.addEventListener("click", function(e) {
        closedWindow = !closedWindow;
        closeWindow();
    });
    
    path.addEventListener("change", function() {
        textareaBG.style.backgroundImage = "url(windowCover/img/" + this.value + ")";
        localStorage.setItem('bgImage', this.value);
    });
    
    focusW.addEventListener("click", function() {
        textareaBG.style.backgroundSize = "100vw auto";
        modInput(inputW, '100vw', true);
        modInput(inputH, 'auto', true);
        localStorage.setItem('size', 'focusW');
    });
    focusH.addEventListener("click", function() {
        textareaBG.style.backgroundSize = "auto 100vh";
        modInput(inputW, 'auto', true);
        modInput(inputH, '100vh', true);
        localStorage.setItem('size', 'focusH');
    });
    resetSize.addEventListener("click", function() {
        textareaBG.style.backgroundSize = "100vw auto";
        modInput(inputW, '100%');
        modInput(inputH, '100%');
        localStorage.setItem('size', 'custom');
        localStorage.setItem('width', inputW.value);
        localStorage.setItem('height', inputH.value);
    });
    
    inputW.addEventListener("input", function() {
        textareaBG.style.backgroundSize = this.value + ' ' + inputH.value;
        localStorage.setItem('width', this.value);
    });
    inputH.addEventListener("input", function() {
        textareaBG.style.backgroundSize = inputW.value + ' ' + this.value;
        localStorage.setItem('height', this.value);
    });

    x.addEventListener("input", function() {
        textareaBG.style.backgroundPositionX = this.value;
        localStorage.setItem('x', this.value);
    });
    y.addEventListener("input", function() {
        textareaBG.style.backgroundPositionY = this.value;
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
    iconHolder.classList.add(this.prefix + 'Icon');
    this.windowElement.appendChild(iconHolder);

    var icon = document.createElement('img');
    icon.setAttribute('src', 'windowCover/icons/' + text);
    iconHolder.appendChild(icon);
    return(iconHolder);
}

function createSec(parent, sus = false){
    var sec = document.createElement('div');
    sec.classList.add(this.prefix + 'Section');
    if(!parent)
    this.ui.appendChild(sec);        
    else parent.appendChild(sec);

    if(sus) sec.classList.add(this.prefix + 'SusSec');
    return(sec);
}

function createButton(text = 'null', parent){
    var button = document.createElement('button');
    button.classList.add(this.prefix + 'Button');
    button.innerHTML = text;
    parent.appendChild(button);
    return(button);
}

function createInput(text = 'null', parent){
    var div = document.createElement('div');
    div.classList.add(this.prefix + 'Input');

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
        button.classList.add(this.prefix + 'True');
        textareaBG.style.backgroundRepeat = 'repeat';
    } else if(!this.backgroundRepeat){
        button.classList.remove(this.prefix + 'True');
        textareaBG.style.backgroundRepeat = 'no-repeat';
    }
}

function modInput(input, value, disable = false){
    input.value = value;
    input.disabled = disable;
}
