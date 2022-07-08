import { defineConfig } from 'cypress';

export default defineConfig({
    projectId: 'v1mac8',
    e2e: {
        baseUrl: 'http://localhost:3000',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },

    component: {
        devServer: {
            framework: 'create-react-app',
            bundler: 'webpack',
        },
    },
});
