# Brand Guidelines — Plenna Tecnologia v1.0

> Last updated: 2026-05-06
> Status: Active

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | #00AEEF |
| Dark Background | #0A1628 |
| Primary Font | Inter |
| Border Radius | 4px |
| Voice | Técnico, Direto, Confiável |

---

## 1. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Plenna Blue | #00AEEF | rgb(0,174,239) | CTAs, links, ícones, destaques |
| Plenna Blue Dark | #0090CC | rgb(0,144,204) | Hover states, ênfase |

### Dark / Background

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Navy | #0A1628 | rgb(10,22,40) | Hero, header, seções dark |
| Navy Mid | #0D1F3C | rgb(13,31,60) | Cards e fundos dark intermediários |

### Neutral Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Background | #FFFFFF | rgb(255,255,255) | Fundo padrão das seções |
| Background Gray | #F7F8FA | rgb(247,248,250) | Seções alternadas (serviços, etc.) |
| Text Primary | #1A1A2E | rgb(26,26,46) | Títulos e corpo principal |
| Text Light | #4A5568 | rgb(74,85,104) | Legendas, texto secundário |
| Border | #E2E8F0 | rgb(226,232,240) | Divisores, bordas de cards |
| White | #FFFFFF | rgb(255,255,255) | Textos sobre fundo dark |

### Cores Proibidas

| Evitar | Motivo |
|--------|--------|
| Gradientes roxo/rosa/blob | Não é o estilo da marca |
| Neons ou paletas vibrantes demais | Conflita com o posicionamento técnico |
| Qualquer cor não listada acima | Manter coesão visual |

---

## 2. Typography

### Font Stack

```css
--font-heading: 'Inter', 'Segoe UI', system-ui, sans-serif;
--font-body: 'Inter', 'Segoe UI', system-ui, sans-serif;
```

### Type Scale

| Element | Desktop | Mobile | Weight | Line Height |
|---------|---------|--------|--------|-------------|
| H1 | clamp(2rem, 4vw, 3.25rem) | 2rem | 700 | 1.15 |
| H2 | clamp(1.6rem, 3vw, 2.4rem) | 1.6rem | 700 | 1.2 |
| H3 | 1.25rem | 1.125rem | 600 | 1.3 |
| Body | 1rem | 1rem | 400 | 1.6 |
| Small / Caption | 0.875rem | 0.875rem | 400 | 1.5 |
| Section Label | 0.75rem | 0.75rem | 700 | — |

### Section Label

Usado para identificar seções ("SERVIÇOS", "SOBRE NÓS"). Sempre em uppercase, letter-spacing 0.1em, cor `--blue`.

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 3. Logo

### Arquivos disponíveis

| Arquivo | Uso |
|---------|-----|
| `assets/plenna-logo.png` | Header (sempre sobre fundo dark com `mix-blend-mode: lighten`) |
| `assets/plenna-favicon.png` | Favicon, ícone de aba |

### Regras de uso

- Altura mínima digital: 40px
- Espaço mínimo ao redor: metade da altura do logo
- Sempre sobre fundo escuro no header (navy `#0A1628`)
- Não rotacionar, distorcer, recolorir ou aplicar sombra
- Não usar sobre fundos brancos sem versão alternativa aprovada

---

## 4. Voice & Tone

### Brand Personality

| Trait | Como somos | Como não somos |
|-------|-----------|----------------|
| **Técnico** | Especialistas que falam a língua do cliente | Jargões incompreensíveis ou genéricos demais |
| **Direto** | Objetivo, sem enrolação | Prolixo, cheio de bullet points óbvios |
| **Confiável** | Cases reais, experiência, clareza | Promessas vagas, superlativos |
| **Próximo** | Tom profissional mas sem distância | Formal demais, corporativo e frio |

### Tom por contexto

| Contexto | Tom | Exemplo |
|----------|-----|---------|
| Hero / Home | Impactante, orientado a benefício | "Do ERP ao BI, a tecnologia que faz sua empresa crescer." |
| Página de Serviço | Técnico, descritivo, direto | "Implementamos o TOTVS Protheus com foco em adoção e performance." |
| CTA | Ativo, convidativo | "Fale com um especialista" / "Solicite uma proposta" |
| Rodapé / Contato | Cordial, profissional | "Estamos prontos para atender sua empresa." |

### Prohibited Terms

| Evitar | Preferir |
|--------|----------|
| Soluções inovadoras | Soluções específicas para [contexto] |
| Transformação digital | Modernização de processos |
| Ecossistema | Sistema / plataforma |
| Alavancar | Usar / expandir |
| Robusto | Estável / escalável |

---

## 5. Imagery Guidelines

### Estilo fotográfico

- Ambientes corporativos reais: salas de reunião, servidores, equipes de TI
- Iluminação profissional, clean — sem estilo "startup colorida"
- Sujeitos: profissionais de TI, executivos, equipes em ação
- Paleta fria com azuis e cinzas predominantes
- Sem banco de imagens genérico (pessoas posando e sorrindo forçado)

### Ilustrações / Ícones

- Estilo: outline, peso de linha uniforme (~1.5–2px)
- Cor: `--blue #00AEEF` ou `--text #1A1A2E`
- Corner radius: 4px (consistente com `--radius`)
- Sem gradientes ou sombras pesadas em ícones

### Base Prompt Template

Sempre use como prefixo ao gerar imagens para o site:

```
Corporate IT environment, professional photography, cool color palette dominated by deep navy blues (#0A1628) and sky blue accents (#00AEEF), clean office or data center setting, soft directional lighting, no harsh shadows, realistic and authentic atmosphere, 16:9 ratio, high resolution, no stock photo clichés
```

### Style Keywords

| Category | Keywords |
|----------|----------|
| **Lighting** | soft directional lighting, professional, no harsh shadows |
| **Mood** | professional, technical, trustworthy, corporate |
| **Composition** | clean, focused, negative space for text |
| **Treatment** | cool-toned, realistic, high resolution |
| **Aesthetic** | corporate IT, modern, authentic |

### Visual Mood Descriptors

- Professional and technical
- Cool navy and blue tones
- Clean and uncluttered
- Authentic corporate environment
- No stock photo clichés

### Visual Don'ts

| Avoid | Reason |
|-------|--------|
| Colorful backgrounds | Conflicts with brand palette |
| Generic stock smiling people | Not authentic |
| Purple/pink tones | Outside brand palette |
| Cartoon or illustration style | Brand uses photography |
| Busy or cluttered compositions | Conflicts with clean aesthetic |

### Example Prompts

**Hero Banner:**
```
Corporate IT professionals working in a modern office, deep navy background, subtle blue accent lighting, clean composition with negative space on left for text overlay, photorealistic, no text, 16:9
```

**Social Media:**
```
IT specialist at workstation with multiple monitors showing dashboards, cool blue-toned office environment, professional, clean, photorealistic
```

### Prompts por contexto

**Hero Banner:**
```
Corporate IT professionals working in a modern office, deep navy background, subtle blue accent lighting, clean composition with negative space on left for text overlay, photorealistic, no text, 16:9
```

**TOTVS / ERP:**
```
Business team analyzing ERP dashboards on large monitors, cool-toned office environment, professional attire, screens showing charts and data, navy and blue tones, clean and focused composition
```

**Infraestrutura:**
```
Modern server room with organized rack servers, cool blue LED lighting, deep dark background, crisp technical environment, no people, ultra-clean cables, photorealistic
```

**Power BI:**
```
Executive reviewing data dashboards on multiple screens, minimalist office, blue and white tones, soft natural light, charts and graphs visible on screens, professional atmosphere
```

**Helpdesk:**
```
IT support technician at workstation with headset, organized desk setup, monitors with ticketing system, professional corporate environment, warm but focused atmosphere
```

---

## 6. Design Components

### Botões

| Tipo | Background | Texto | Border Radius |
|------|-----------|-------|---------------|
| Primary | #00AEEF | #FFFFFF | 4px |
| Outline | transparent + border #00AEEF | #00AEEF | 4px |
| White (sobre dark) | #FFFFFF | #00AEEF | 4px |

Hover: `translateY(-2px)` + escurecer background para `--blue-dark`

### Espaçamento

| Token | Valor | Uso típico |
|-------|-------|-----------|
| xs | 4px | Gap interno em badges |
| sm | 8px | Padding interno pequeno |
| md | 16px | Gap padrão |
| lg | 24px | Padding de container |
| xl | 32px | Espaçamento entre elementos |
| 2xl | 48px | Margin de seção |
| 3xl | 80–100px | Padding de seção (desktop) |

### Border Radius

| Elemento | Radius |
|----------|--------|
| Botões | 4px |
| Cards | 4px |
| Inputs | 4px |
| Badges / Tags | 4px |
| Nunca usar | >8px (exceto círculos) |

### Sombras

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow` | `0 2px 12px rgba(0,0,0,.08)` | Cards padrão |
| `--shadow-hover` | `0 8px 28px rgba(0,174,239,.15)` | Cards em hover |

---

## 7. Animações e Interações

| Efeito | Implementação | Onde usar |
|--------|--------------|-----------|
| Fade-in ao scroll | `IntersectionObserver` + classe `visible` | Seções, cards |
| Hover card | `translateY(-4px)` + `--shadow-hover` | Cards de serviço |
| Hover botão | `translateY(-2px)` + `background: --blue-dark` | Todos os CTAs |
| Marquee de logos | CSS `@keyframes scroll` + clone JS | Seção de parceiros |
| Contadores | `IntersectionObserver` + incremento JS | Seção de números |
| Transição padrão | `200ms ease` | Todos os elementos interativos |

### Proibido

- Animações que giram, pulsam ou piscam elementos de conteúdo
- `@keyframes` em textos de título
- Parallax pesado
- Skeleton loaders (site estático, não necessário)

---

## Changelog

| Versão | Data | Alterações |
|--------|------|-----------|
| 1.0 | 2026-05-06 | Criação inicial baseada no CSS do site e preferências do usuário |
