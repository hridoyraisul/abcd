const apiPlugin = {
    install(app) {
        app.config.globalProperties.$apiBaseURL = "http://localhost:8000/api/";
    }
}

export default apiPlugin;