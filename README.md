# Playwright Test Suite - E-Commerce Application

Comprehensive end-to-end and API test suite for the e-commerce application using Playwright with Page Object Model pattern and custom Monocart reporting.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Viewing Test Results](#viewing-test-results)
- [CI/CD Integration](#cicd-integration)
- [Test Configuration](#test-configuration)

## ✨ Features

- **UI Tests**: End-to-end tests for e-commerce website
  - User authentication (multiple user types)
  - Product inventory management
  - Shopping cart functionality
  - Checkout process
  
- **API Tests**: RESTful API testing
  - Booking CRUD operations
  - Authentication endpoints
  - Response validation
  
- **Reporting**: Custom HTML reports using Monocart Reporter
- **CI/CD**: Automated workflows for push and pull requests
- **Parallel Execution**: Tests run in parallel for faster feedback

## 🔧 Prerequisites

- **Node.js**: 18.x or 20.x
- **npm**: 10.x or higher
- **Git**: For version control

## 📦 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd playwright-ui
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Playwright Browsers
```bash
npx playwright install --with-deps
```

## 📁 Project Structure

```
playwright-ui/
├── .github/
│   └── workflows/
│       ├── ui-push.yml              # Push - UI Tests
│       ├── api-push.yml             # Push - API Tests
│       ├── ui-pr.yml                # PR - UI Tests
│       └── api-pr.yml               # PR - API Tests
├── page.object.model/
│   ├── checkout-page.pom.ts         # Checkout page object
│   ├── login-page.pom.ts            # Login page object
│   ├── products-page.pom.ts         # Products page object
│   └── fixtures.ts                  # Test fixtures
├── test-data/
│   ├── users.ts                     # Test user credentials
│   └── bookings.json                # Test booking data
├── tests/
│   ├── ui/
│   │   └── ui-e2e.spec.ts           # UI end-to-end tests
│   └── api/
│       ├── api-e2e.spec.ts          # API CRUD tests
│       ├── auth.spec.ts             # Authentication tests
│       ├── booking-crud.spec.ts     # Booking operations
│       └── response-validation.spec.ts
├── playwright.config.ts             # Playwright configuration
├── package.json                     # Project dependencies
└── README.md                        # This file
```

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run UI Tests Only
```bash
npx playwright test tests/ui --project="UI Tests"
```

### Run API Tests Only
```bash
npx playwright test tests/api --project="API Tests"
```

### Run Specific Test File
```bash
npx playwright test tests/ui/ui-e2e.spec.ts
```

### Run Tests in Headed Mode (UI Tests)
```bash
npm run test:headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Tests in Interactive UI Mode
```bash
npm run test:ui
```

### Run Tests with Specific Configuration
```bash
# Run with specific browser
npx playwright test --project=chromium

# Run with specific number of workers
npx playwright test --workers=2

# Run with retry disabled
npx playwright test --retries=0
```

## 📊 Viewing Test Results

### HTML Report (Monocart)
After tests complete, view the custom HTML report:
```bash
npm run test:report
```

This opens the Monocart interactive report with:
- Test execution timeline
- Performance metrics
- Detailed test logs
- Screenshots and attachments
- Coverage information (if enabled)

### JUnit Report
Test results are saved as JUnit XML at:
```
test-results/junit.xml
```

### Command Output
For quick result viewing in terminal:
```bash
# Show test summary
npx playwright test --reporter=list

# Detailed output
npx playwright test --reporter=verbose
```

## 🚀 CI/CD Integration

Workflows are automatically triggered based on changes:

### Push Workflows
- **Push - UI Tests** (`ui-push.yml`)
  - Triggers on push to main/develop
  - Monitors: `tests/ui/`, `page.object.model/`
  - Runs UI tests across Node 18.x and 20.x

- **Push - API Tests** (`api-push.yml`)
  - Triggers on push to main/develop
  - Monitors: `tests/api/`, `test-data/`
  - Runs API tests across Node 18.x and 20.x

### Pull Request Workflows
- **PR - UI Tests** (`ui-pr.yml`)
  - Triggers on PR to main/develop
  - Validates UI changes
  - Posts test results as PR comment

- **PR - API Tests** (`api-pr.yml`)
  - Triggers on PR to main/develop
  - Validates API changes
  - Posts test results as PR comment

### GitHub Actions Features
- Automatic artifact upload (30-day retention)
- Test result publishing to PR
- Parallel execution across multiple Node versions
- Built-in test status checks

## ⚙️ Test Configuration

### Browser & Test Options

Configure in `playwright.config.ts`:

#### UI Tests
- **Base URL**: `https://www.saucedemo.com`
- **Browser**: Chromium (headless)
- **Timeout**: 60 seconds
- **Expect Timeout**: 10 seconds

#### API Tests
- **Base URL**: `https://restful-booker.herokuapp.com`
- **Timeout**: 60 seconds

### Custom Reporter Options

The Monocart reporter is configured with:
- Detailed test reports
- Interactive HTML output
- Test timeline and performance graphs
- JUnit XML export for CI integration

## 🔑 Test Data

### User Credentials (UI Tests)
Located in `test-data/users.ts`:
- Standard user
- Locked out user
- Problem user
- Performance glitch user
- Error user

### API Test Data
Located in `test-data/bookings.json`:
- Authentication credentials
- Sample booking data

## 📝 Running Tests Locally vs CI

### Local Development
```bash
# Install dependencies
npm install

# Run tests
npm test

# View reports
npm run test:report
```

### CI Environment
- Tests run automatically on push/PR
- Artifacts are uploaded for 30 days
- Results posted as PR comments
- Matrix testing on Node 18.x and 20.x

## 🐛 Troubleshooting

### Tests Fail in CI but Pass Locally
1. Ensure Node version matches (18.x or 20.x)
2. Check `npm ci` doesn't show lock file errors
3. Verify base URLs in config match test environment

### Browser Installation Issues
```bash
npx playwright install --with-deps
```

### Missing Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
Ensure no other services are running on required ports for API tests.

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Monocart Reporter](https://github.com/cenfun/monocart-reporter)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests locally: `npm test`
4. Push and create a pull request
5. GitHub Actions will validate your changes

---

**Last Updated**: December 2025
