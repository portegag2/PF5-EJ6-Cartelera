  export async function getConfig() {
    try {
      console.log("getConfig, previo")
      const response = await fetch('./assets/componentes/api-thmdb/apiDataConexion.json');
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const config = await response.json();
      return config.API_KEY;
    } catch (error) {
        console.error("Error al cargar config.json:", error);
        throw error;
    }

  }

  //export let API_KEY = getConfig();
