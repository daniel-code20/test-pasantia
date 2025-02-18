export const fetchTasks = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: "Tarea 1", description: "Completar el informe semanal", lifetime: 10 },
          { id: 2, title: "Tarea 2", description: "Revisar los pull requests", lifetime: 15 },
          { id: 3, title: "Tarea 3", description: "Actualizar la documentación", lifetime: 20 },
          { id: 4, title: "Tarea 4", description: "Optimizar el rendimiento del código", lifetime: 12 },
          { id: 5, title: "Tarea 5", description: "Diseñar la nueva interfaz de usuario", lifetime: 18 }
        ]);
      }, 2000); 
    });
  };
  