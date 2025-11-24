# DevJobs - Página de Empleos

Página web estática para búsqueda de empleos en el sector tecnológico con filtros avanzados y paginación.

## 🚀 Características

- ✨ Diseño moderno y responsivo con modo oscuro
- 🔍 Búsqueda en tiempo real
- 🎯 Filtros por tecnología, ubicación, tipo de contrato y experiencia
- 📄 Paginación funcional (5 trabajos por página)
- 📦 Arquitectura modular con ES6 modules
- 🎨 Estilizado con Tailwind CSS

## 📁 Estructura del Proyecto

```
├── modules/
│   ├── config.js          # Configuración de Tailwind
│   ├── jobService.js      # Fetch y renderizado de trabajos
│   ├── filters.js         # Lógica de filtros
│   ├── search.js          # Búsqueda principal
│   ├── applyButton.js     # Botones de aplicar
│   └── pagination.js      # Sistema de paginación
├── main.js                # Punto de entrada
├── data.json              # Datos de trabajos
├── index.html             # Página principal
└── search results.html    # Página de resultados
```

## 🛠️ Tecnologías

- HTML5
- CSS3 / Tailwind CSS
- JavaScript (ES6 Modules)
- JSON

## 🌐 Demo en Vivo

[Ver sitio en Netlify](TU-URL-DE-NETLIFY-AQUI)

## 💻 Desarrollo Local

1. Clona el repositorio:
```bash
git clone https://github.com/TU-USUARIO/TU-REPO.git
cd TU-REPO
```

2. Inicia un servidor local:
```bash
python3 -m http.server 8000
```

3. Abre en tu navegador:
```
http://localhost:8000
```

## 📝 Agregar Nuevos Trabajos

Edita el archivo `data.json` y agrega un nuevo objeto:

```json
{
  "id": 13,
  "title": "Nuevo Trabajo",
  "company": "Empresa",
  "location": "Ubicación",
  "description": "Descripción del trabajo...",
  "technologies": ["Tech1", "Tech2"],
  "contract": "Tiempo completo",
  "experience": "Mid-level"
}
```

## 🚀 Despliegue

Este proyecto está configurado para desplegarse automáticamente en Netlify cuando se hace push a la rama `main`.

## 📄 Licencia

Este proyecto es de código abierto con fines educativos.
