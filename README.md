# AXK Health Web App

AXK Health is a blockchain-powered health insurance platform that tokenizes user premiums, offering growth on their insurance investments while rewarding users for staying healthy. This repository is for the **AXK Health Web App**, which provides a clean interface for managing health plans, tokens, claims, and beneficiaries.

## Project Overview

The **AXK Health Web App** is built using [Next.js](https://nextjs.org) with TypeScript. This app serves individuals, businesses, and governments, providing features such as tokenized premium tracking, smart contract-based claims, and beneficiary management.

---

## Tech Stack

- **Frontend**: Next.js (React, TypeScript)
- **Blockchain**: Smart contracts for claims and token management (will integrate via REST)
- **Styling**: Tailwind CSS
- **APIs**: Backend services (will integrate via REST)

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v16.x or higher recommended)
- A package manager (npm, yarn, pnpm, or bun)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AXKLEDGER/axk-insurance-web-app.git
   cd axk-insurance-web-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Running the Development Server

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Access the app by visiting [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To create a production build:

```bash
npm run build
```

This command generates an optimized production build in the `.next` folder.

---

## Contributing

### Workflow Overview

We’re keeping it simple but organized! Here's the step-by-step process for contributing to this project. If you're working on a new feature or fixing a bug, this is the flow you should follow:

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/AXKLEDGER/axk-insurance-web-app.git
cd axk-insurance-web-app
```

### 2. Create a New Branch

Create a new branch for your feature, bug fix, or enhancement. The branch should be named according to what you're working on. Use the following naming conventions:

- **Features**: `feature/short-description`
- **Bug fixes**: `fix/short-description`
- **Improvements**: `improve/short-description`

Example for adding a new feature:

```bash
git checkout -b feature/user-dashboard
```

### 3. Work on Your Changes

Make your changes locally. Be sure to test everything! If you’re adding or modifying components, make sure everything is properly styled and functioning as expected.

Use `npm run dev` to test your changes in the development environment.

### 4. Stage, Commit, and Push

Once you're happy with your changes, stage and commit them:

```bash
git add .
git commit -m "Add user dashboard with token tracking"
```

Push your changes to the remote repository:

```bash
git push origin feature/user-dashboard
```

### 5. Open a Pull Request (PR)

Once your feature branch has been pushed, go to GitHub and open a new Pull Request (PR):

- Base branch: `main`
- Compare branch: `your-feature-branch` (e.g., `feature/user-dashboard`)

In the PR description, clearly explain what your changes do, why they’re necessary, and link to any relevant issues or tasks (if applicable).

### 6. Code Review and Merging

After you open the PR, the team will review your code. Be open to feedback and make any necessary changes. Once approved, the branch will be merged into `main`.

### Branch Naming Conventions

- **Features**: `feature/short-description` (e.g., `feature/add-login`)
- **Bug Fixes**: `fix/short-description` (e.g., `fix/navbar-link-bug`)
- **Improvements**: `improve/short-description` (e.g., `improve-loading-speed`)

### Merging Strategy

We generally use the **Squash and Merge** method for PRs. This keeps the commit history clean, and it’s easy to roll back if needed. Make sure your feature branch is up to date with `main` before submitting the PR.

### Code Style

1. **TypeScript Best Practices**: Always prefer typing your variables, functions, and components. If in doubt, ask or use a general type like `string | number`.
2. **Naming**: Keep your variable, function, and component names descriptive. This helps other team members quickly understand your code.

3. **Component Structure**: Stick to functional components. If a component is becoming too large, break it down into smaller, reusable components.

---

## Environment Variables

You'll need to set up some environment variables for blockchain integration and other app services. The convention to doing this is to create a `.env.local` file in the root of the project:

```bash
NEXT_PUBLIC_API_URL=<backend-url>
NEXT_PUBLIC_CHAIN_ID=<blockchain-id>
NEXT_PUBLIC_AXK_TOKEN_CONTRACT=<contract-address>
```

Ensure you have all the necessary API keys and credentials before running the app locally.

---

## Testing

Testing is key to maintaining quality. Before submitting a PR, ensure you've tested all features thoroughly in your local environment.

- Run the app in dev mode: `npm run dev`
- Test any blockchain interactions like token payments or claims management.
- Cross-check different user roles: Individual, Business (Pro Accounts), and Government (B2G).

---

## Key Pages

Here are some important pages and their functions:

1. **Homepage**: Overview of AXK Health.
2. **Plan Overview Page**: View details of health plans.
3. **AXK Token Management Page**: Manage and track AXK Tokens.
4. **Rewards Dashboard**: Track rewards for staying healthy.
5. **Claims Management Page**: Manage health insurance claims via smart contracts.
6. **Beneficiaries Management**: Add, edit, and customize beneficiary coverage.
7. **Login/Signup Page**: User authentication.
8. **Account Settings Page**: Update user or company account details.

---

## Additional Resources

For more about the tech stack:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://reactjs.org/)
- [Blockchain and Smart Contracts](https://ethereum.org/en/smart-contracts/)
- [Vercel Documentation](https://vercel.com/docs)

---

## License

This project is licensed under the MIT License.

---

## Questions?

If you have any questions or need help with the repo, feel free to reach out on the Whatsapp group or open an issue on GitHub.
