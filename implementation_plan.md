# Arquitectura y Diseño: Kamilah Perfect Nails

Este documento servirá como tu "Mapa de Ruta" y es excelente para mostrarlo en tu portafolio, ya que demuestra que sabes planificar software antes de tirar código.

## 1. Arquitectura y Stack Tecnológico

El sistema seguirá una **Arquitectura Cliente-Servidor (API REST)**.

*   **Frontend (La Interfaz):** `React` + `Vite` (Súper rápido).
*   **Estilos y UI:** `Tailwind CSS` + Componentes de `Shadcn UI` (Para que luzca premium, moderno y muy limpio).
*   **Backend (La Lógica):** `Python` + `FastAPI`.
*   **Base de Datos:** `PostgreSQL` (Relacional, perfecta para manejar las finanzas y la agenda).
*   **ORM (Manejo de BD):** `SQLAlchemy` (Para interactuar con la BD desde Python sin escribir SQL puro).

## 2. Estrategia de Despliegue (Hosting 100% Gratuito)

Para que puedas mostrar este proyecto en tu CV sin gastar un centavo, usaremos servicios con "Free Tiers" (capas gratuitas) muy generosos:

1.  **Frontend:** **Vercel** o **Netlify**. Son los reyes para alojar React gratis. Se conectan a tu GitHub y cada vez que subes un cambio, se actualiza la página automáticamente.
2.  **Backend (API):** **Render** o **Railway**. Te permiten subir tu aplicación de FastAPI gratis. *Nota: En los planes gratis, si no se usa por 15 minutos, el servidor "se duerme" y el primer clic de un usuario tardará unos 50 segundos en despertar.*
3.  **Base de Datos (PostgreSQL):** **Supabase** (Es un servicio increíble que te da una base de datos PostgreSQL gratis en la nube) o el mismo **Render**.

## 3. Diseño de Interfaz (UI/UX Aesthetics)

El sistema no puede verse como una tabla de Excel aburrida. Tiene que vender "Belleza y Elegancia".

*   **Paleta de Colores Sugerida:** Tonos pastel modernos (Nude, Rosa viejo, Beige) contrastados con blancos puros o un "Dark Mode" elegante con acentos dorados o fucsias.
*   **Estilo Visual:** *Glassmorphism* (efectos de cristal empañado para los menús), bordes redondeados, sombras suaves.
*   **Tipografía:** Fuentes limpias de Google Fonts como *Inter*, *Outfit* o *Poppins*.

## 4. Estructura del Repositorio (GitHub)

Tendremos un modelo de "Monorepo" (dos carpetas en un solo repositorio) o dos repositorios separados. Yo sugiero un Monorepo para facilitar tu trabajo:

```text
kamilah-perfect-nails/
│
├── backend/            # Todo lo de FastAPI y Python
│   ├── main.py
│   ├── models/         # Tus tablas de base de datos
│   ├── routers/        # Las rutas de la API (ej: /clientes)
│   └── requirements.txt
│
├── frontend/           # Todo lo de React
│   ├── src/
│   │   ├── components/ # Botones, tarjetas, menú
│   │   ├── pages/      # Agenda, Dashboard, Clientes
│   │   └── App.jsx
│   └── package.json
│
└── README.md           # CRÍTICO para tu CV: Explicar qué es el proyecto
```

## 5. Próximos Pasos (Hoja de Ruta)

### FASE 1: Configuración Inicial (Donde estamos)
- [ ] Instalar herramientas locales (Node, Python).
- [ ] Inicializar el repositorio en Git y subirlo a GitHub.
- [ ] Crear la estructura base de carpetas (Frontend y Backend).

### FASE 2: El Cerebro (Backend MVP)
- [ ] Conectar FastAPI con una base de datos local o de prueba.
- [ ] Crear los modelos (tablas) en SQLAlchemy usando la estructura que acordamos.
- [ ] Crear los CRUD básicos (Crear cliente, Ver servicios).

### FASE 3: La Cara (Frontend MVP)
- [ ] Instalar React y configurar Tailwind.
- [ ] Diseñar el Layout principal (Menú lateral y cabecera).
- [ ] Consumir la API para mostrar los clientes y servicios.
