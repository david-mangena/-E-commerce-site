<<<<<<< HEAD
# -E-commerce-site
Test Scope UI Tests Authentication (multiple user types) Inventory management Shopping cart functionality Checkout process
=======
# Playwright UI Test Suite

End-to-end tests for e-commerce website using Playwright and Page Object Model pattern.

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Git installed

### Installation

```bash
git clone <your-repo-url>
cd playwright-ui
npm install
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npm test fixture.spec.ts
```

### Run in UI mode
```bash
npm run test:ui
```

### View test report
```bash
npm run test:report
```

## Project Structure

```
playwright-ui/
├── page.object.model/
│   ├── fixtures.ts
│   ├── login-page.pom.ts
│   ├── products-page.pom.ts
│   └── checkout-page.pom.ts
├── test-data/
│   └── users.ts
├── tests/
│   └── fixture.spec.ts
├── playwright.config.ts
└── README.md
```

## Test Data

Test users are configured in `test-data/users.ts` with the following roles:
- standard_user
- locked_out_user
- problem_user
- performance_glitch_user
- error_user
- visual_user

## CI/CD

Tests run automatically on push via GitHub Actions (see `.github/workflows/playwright.yml`)
>>>>>>> 6e2643a (feat: implement E-commerce test cases and checkout page object model)
