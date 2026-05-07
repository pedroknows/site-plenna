# Site Plenna Tecnologia

Site institucional estático da **Plenna Tecnologia Ltda** — desenvolvido em HTML, CSS e JavaScript puro, sem frameworks ou dependências de build.

## Estrutura do projeto

```
site-plenna/
├── index.html              # Página principal
├── empresa.html            # Página institucional
├── servicos/
│   ├── totvs.html
│   ├── desenvolvimento.html
│   ├── infraestrutura.html
│   ├── powerbi.html
│   └── helpdesk.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/                 # Fotos e imagens dos serviços
├── assets/                 # Logo SVG, favicon e tokens de design
└── public/
    └── favicon.ico
```

## Como rodar localmente

O site é estático — não precisa de Node, npm ou qualquer instalação. Mas **não abra o `index.html` diretamente pelo explorador de arquivos** (protocolo `file://`), pois alguns recursos como fontes e SVGs podem não carregar corretamente.

Use um servidor local. Há duas formas simples:

---

### Opção 1 — VS Code com Live Server (recomendado)

1. Instale a extensão **Live Server** no VS Code  
   (ID: `ritwickdey.LiveServer`)
2. Abra a pasta `site-plenna` no VS Code
3. Clique com o botão direito no `index.html` e selecione **"Open with Live Server"**
4. O site abre automaticamente em `http://127.0.0.1:5500`

---

### Opção 2 — Python (sem instalar nada extra)

Se você tem Python instalado, rode no terminal dentro da pasta do projeto:

```bash
# Python 3
python -m http.server 8000
```

Depois acesse: [http://localhost:8000](http://localhost:8000)

---

### Opção 3 — Node.js com serve

```bash
npx serve .
```

Depois acesse o endereço exibido no terminal (geralmente `http://localhost:3000`).

---

## Páginas disponíveis

| Página | URL local |
|---|---|
| Home | `http://localhost:8000/index.html` |
| Quem somos | `http://localhost:8000/empresa.html` |
| TOTVS | `http://localhost:8000/servicos/totvs.html` |
| Desenvolvimento Web | `http://localhost:8000/servicos/desenvolvimento.html` |
| Infraestrutura de Redes | `http://localhost:8000/servicos/infraestrutura.html` |
| Power BI & Analytics | `http://localhost:8000/servicos/powerbi.html` |
| Helpdesk & Suporte | `http://localhost:8000/servicos/helpdesk.html` |

## Tecnologias

- HTML5 semântico
- CSS3 com custom properties (variáveis)
- JavaScript ES6+ vanilla (sem frameworks)
- Fontes: Inter via Google Fonts
- Formulário de contato: FormSubmit.co
