## LES TESTS FRONT AVEC PLAYWRIGHT

### Playwright est une librarie de tests end to end https://playwright.dev/docs/intro

### Les commandes importantes

#### à installer sur la machine afin d'utiliser Playwright
npm init playwright@latest -- --quiet --browser=chromium --browser=firefox --browser=webkit
sudo npx playwright install-deps

#### record un comportement utilisateur afin de générer du code de test
playwright codegen localhost:3000 (ou npm run test-record)

#### executer les tests : npm run test

#### executer un test précis avec le navigateur d'afficher
npx playwright test tests/*/*.test.ts --headed