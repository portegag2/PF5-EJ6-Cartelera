

  export async function getConfig() {
    await fetch('config.json')
        .then(response => response.json())
        .then(config => {
        const API_KEY = config.API_KEY;
        console.log("API_KEY:", API_KEY);
        return config.API_KEY

    })
    .catch(error => console.error("Error al cargar config.json:", error));
  }

  //export let API_KEY = getConfig();
