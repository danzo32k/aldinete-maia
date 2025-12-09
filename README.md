# Álbum Interativo • SteLisboa

Um álbum digital romântico, interativo e responsivo, com galeria, declarações com efeito typewriter, contador de relacionamento, surpresas (confetes e corações), música, linha do tempo, planos futuros, mural de mensagens em corações, mini-jogo e uma seção secreta.

## Como usar

1. Abra o arquivo `index.html` em um navegador moderno (Chrome, Edge, Firefox, Safari). Basta clicar duas vezes no arquivo ou abrir pelo menu do navegador.
2. Role a página para explorar as seções. Use o menu do rodapé para navegar rapidamente.
3. Clique nos botões de **Surpresa**, **Confetes** e **Corações** para efeitos especiais.
4. Na galeria, clique em uma miniatura para abrir em tela maior e use as setas do modal.
5. No mini-jogo, encontre o coração certo para revelar a mensagem secreta e desbloquear a **Seção Secreta**.

## 🆕 Novas Funcionalidades

### 🎨 **Visuais e UX**
- **Animações fade-in**: Seções aparecem suavemente ao rolar
- **Tema escuro/claro**: Toggle no canto superior direito
- **Mais corações flutuantes**: Corações extras animados
- **Loading states**: Indicadores visuais durante carregamento
- **Zoom na galeria**: Hover com efeito de zoom nas fotos

### 📱 **Funcionalidades**
- **Upload de fotos**: Arraste ou clique para adicionar novas fotos
- **Editor de mensagens**: Personalize declarações em tempo real
- **Contador regressivo**: Para o aniversário (02/12/2027)
- **Playlist musical**: Player com controles de play/pause e volume
- **Lazy loading**: Carregamento otimizado de imagens

### 🎮 **Jogos e Interatividade**
- **Quebra-cabeça**: Montagem com foto do casal
- **Jogo da memória**: Emojis românticos para encontrar pares
- **Quiz dinâmico**: Perguntas mais genéricas e românticas

### 💾 **Técnico**
- **PWA Support**: Instale como app no celular
- **SEO otimizado**: Meta tags para compartilhamento
- **Performance**: Lazy loading e otimizações
- **Offline**: Funciona sem internet (PWA)

## Personalização

- Nome e capa: altere no topo do `index.html` os textos e a imagem principal em `assets/images/img1.jpeg`.
- Data de início do namoro: edite em `js/app.js` a constante `START_DATE_STR` (formato `AAAA-MM-DD`). O rótulo de data é atualizado automaticamente.
- Mensagens de amor: edite o array `DECLARATIONS` em `js/app.js`.
- Legendas da galeria: edite o array `GALLERY_CAPTIONS` em `js/app.js`.
- Fotos da galeria: substitua as imagens em `assets/images/img*.jpeg` e atualize a quantidade conforme desejar (lembre-se de ajustar as miniaturas no `index.html`).
- Música: troque `assets/music/romantic.mp3` pela sua faixa favorita (o autoplay permanece desativado). Use o botão **Ligar/Desligar**.
- Sons de clique: troque `assets/sounds/click.mp3` se desejar outro efeito.
- Linha do tempo: edite os itens na seção `#historia` em `index.html` (título, descrição e imagem).
- Planos futuros: edite a seção `#planos` em `index.html`.
- Mural de mensagens: use o formulário para adicionar mensagens, que surgem como corações flutuantes.

## Estrutura

```
album-stelisboa/
├─ index.html
├─ README.md
├─ css/
│  └─ style.css
├─ js/
│  └─ app.js
└─ assets/
   ├─ images/
   │  ├─ main.jpg
   │  ├─ gallery1.jpg .. gallery6.jpg
   │  ├─ story1.jpg .. story3.jpg
   ├─ music/
   │  └─ romantic.mp3
   └─ sounds/
      └─ click.mp3
```

Substitua as imagens e áudios pelos seus arquivos reais. Os arquivos de exemplo estão como placeholders.

## Acessibilidade e performance

- O modal da galeria é acessível por teclado (Esc fecha, setas navegam).
- O layout é responsivo, com tipografia amigável e botões grandes.
- Efeitos visuais são leves e executados com CSS/Canvas.

## Licença

Uso pessoal e romântico ❤
