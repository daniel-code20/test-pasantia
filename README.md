# Prueba Técnica para Pasantía en Desarrollo con React.js

## Descripción
Este proyecto es una aplicación desarrollada en React.js con Vite que gestiona tarjetas con temporizadores. Utiliza **React Query** para obtener datos desde una API simulada con `setTimeout`. Cada tarjeta tiene un temporizador que cambia de color según su tiempo restante y se elimina al llegar a cero.

## Características Principales
- **Carga de Datos:**
  - Obtiene una lista de tarjetas desde una API simulada.
  - Cada tarjeta contiene un título, una descripción y un temporizador en segundos.
- **Gestíon de Temporizadores:**
  - Cada tarjeta inicia su temporizador al montarse.
  - Cambia el fondo según el tiempo restante:
    - **Gris:** Más del 50% de su tiempo total.
    - **Amarillo:** Al llegar al 50%.
    - **Rojo:** Al llegar al 20%.
  - Se elimina automáticamente al llegar a 0.
- **Interactividad Adicional:**
  - Botón para eliminar manualmente una tarjeta.
  - Botón para reiniciar la lista de tarjetas y volver a hacer fetch.
- **Optimizado con React Query** para obtener y gestionar datos de manera eficiente.
- **Responsive Design** utilizando Tailwind CSS.

## Tecnologías Utilizadas
- [React.js](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)

## Instalación y Ejecución
1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```
2. Instala las dependencias:
   ```sh
   npm install  # o yarn install
   ```
3. Inicia el servidor de desarrollo:
   ```sh
   npm run dev  # o yarn dev
   ```
4. Abre en tu navegador:
   ```sh
   http://localhost:5173
   ```

## Despliegue
Este proyecto está desplegado en **Vercel**. Puedes acceder en el siguiente enlace:
👉 [Demo en Vercel](https://test-pasantia.vercel.app/)

## Estructura del Proyecto
```
/tareas-temporizador
├── src
│   ├── components  # Componentes reutilizables
│   ├── api        # Simulación de API con setTimeout
│   ├── App.tsx    # Componente principal
│   ├── main.tsx   # Punto de entrada
├── public         # Archivos estáticos
├── package.json   # Dependencias y scripts
└── README.md      # Documentación
```

## Autor
Desarrollado por Daniel Tejada😁(https://github.com/daniel-code20).

---
### 👏 Si te gustó el proyecto, dale una estrella en GitHub.

