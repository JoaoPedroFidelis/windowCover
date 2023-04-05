# <font color='#ab1e4e'>Implementação:</font>
Para adicionar a extensão a sua página utilize do código abaixo em seu HTML.
```html
    <script src="davinci/script.js"></script>
    <!-- Tudo será criado automaticamente ao adicionar o código. -->
```
Ao colocar está linha ao HTML todos os elementos e funções serão automaticamente colocados e configurados.

<br><br>

# <font color='#ab1e4e'>Adicionar suas imagens:</font>
Para adicionar suas próprias imagens ao sistema apenas vá ao diretório '<font color='#2d83e9'>davinci/img/</font>' e adicione sua imagem, logo em seguida vá ao <font color='#2d83e9'>input</font> do lado de '<font color='#2d83e9'>Image Path</font>' e coloque apenas o nome da imagem e sua extensão sem colocar o caminho relativo a ela, exemplos:
<style>
    input{
        border: none; padding: 10px; border-radius: 5px; margin-bottom: 5px;
        background-color: #0000006e; color: white; font-family: monospace;
    }
</style>
<input value='minhaImagem.png'><br>
<input value='é-sobre.png'><br>
<input value='fundo.jpg'><br>

<br>

# <font color='#ab1e4e'>Customização:</font>
Caso queira aumentar a opacidade do <font color='#2d83e9'>textarea</font> vá ao javascript e na linha 15 descomente a função de opacidade.
## Antes:
```js
    // opacity(50); // Tire o comentario a esquerda para definir uma opacidade.
```
## Depois:
```js
    opacity(50);
```