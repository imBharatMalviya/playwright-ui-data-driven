# Playwright Test Automation

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

---

## 📦 Installation

Install the project dependencies using:

```bash
npm install -D @playwright/test@latest
npx playwright install --with-deps
npm install
```

---

## 🚀 Running Tests

To run all Playwright tests:

```bash
npx playwright test
```

---


## 🧪 Data-Driven Test Execution

This project follows a **data-driven approach**, where test input data is provided through a CSV file.

- Each test row in the CSV represents a separate test case.
- The tests are dynamically generated based on the contents of the CSV.

### 🔄 Handling Missing Data with `default.json`

If any column value in the CSV is missing or empty, a default value will be automatically filled from the `default.json` file.

This ensures:
- Test consistency even when data is incomplete.
- Reduced chance of test failure due to missing fields.

---

### ✅ Example Workflow

1. Add your test data to `testdata.csv`.
2. Define fallback/default values in `default.json`.
3. Run tests as usual:

```bash
npx playwright test
```

Or, run only selected tests:

```bash
TEST_IDS=L001,L002 npx playwright test
```