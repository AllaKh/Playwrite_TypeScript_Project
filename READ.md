# QA Automation Engineer – Home Assignment

## Overview

This project demonstrates an automated and manual test suite for the demo application  
[https://automationintesting.online](https://automationintesting.online)

It includes:
- Manual test cases (API & UI) written in **Gherkin format**
- Automated API & UI tests using **Playwright** with **TypeScript**
- Structured Page Object Model for maintainability
- Clear assertions and error handling
- Coverage matrix and bug reports

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- npm

### Install Dependencies

nmp install

### Run All Tests

npx playwright test

### Run Only API Tests

npx playwright test tests/ui

### Run Only API Tests

npx playwright test tests/api

### Admin Portal Credentials

Username: admin
Password: password

### Project Highlights
Modular code using Page Object Model (POM)

Data-driven test support possible via fixtures

Coverage matrix and strategy included

Found and documented functional bugs

### Included Manual Files
File	Description
manual/api-tests.feature	Manual API tests in Gherkin format
manual/ui-tests.feature  	Manual UI tests in Gherkin format
manual/bugs.md          	Bug descriptions with repro steps
manual/coverage-matrix.md	Test coverage matrix and strategy