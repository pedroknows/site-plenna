# Rastreamento de conversao

O site possui uma camada de eventos em `js/main.js`.

Ela envia eventos para:

- `window.dataLayer`, pronto para Google Tag Manager.
- `gtag('event', ...)`, caso GA4 seja instalado direto no site.

Nenhum dado pessoal do formulario e enviado nos eventos. O envio captura apenas contexto de conversao, pagina e area de interesse.

## Como testar

Abra qualquer pagina com:

```text
?debugTracking
```

Exemplo:

```text
index.html?debugTracking
```

Os eventos aparecem no console do navegador com o prefixo:

```text
[Plenna tracking]
```

Tambem e possivel ativar o debug persistente:

```js
localStorage.setItem('plennaTrackingDebug', 'true')
```

## Eventos

| Evento | Quando dispara | Campos principais |
| --- | --- | --- |
| `pln_page_view` | Carregamento da pagina | `page_path`, `page_title` |
| `pln_cta_click` | Clique em CTA com `data-form-service` | `service`, `cta_text`, `section`, `target` |
| `pln_whatsapp_click` | Clique em links `wa.me` | `cta_text`, `section`, `link_url` |
| `pln_email_click` | Clique em email | `cta_text`, `section`, `link_url` |
| `pln_phone_click` | Clique em telefone | `cta_text`, `section`, `link_url` |
| `pln_form_submit` | Envio do formulario de contato | `form_name`, `service`, `section` |
| `pln_service_select` | Selecao de servico na home | `service`, `source`, `section` |
| `pln_diagnostic_select` | Selecao no diagnostico | `diagnostic`, `source`, `section` |

## Campos adicionados ao formulario

Antes do envio, o formulario adiciona campos ocultos para ajudar na leitura do lead:

- `pagina_origem`
- `titulo_pagina`
- `referrer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

## Proximo passo no GTM/GA4

Crie triggers de evento personalizado para:

- `pln_form_submit`
- `pln_whatsapp_click`
- `pln_cta_click`

Marque `pln_form_submit` e `pln_whatsapp_click` como conversoes no GA4.
