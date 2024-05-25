# Absinthe Points Task

## Overview

The **Absinthe Points Task** project provides an efficient and user-friendly platform for registering API keys and distributing points to addresses giving projects the ultimate flexibility to issue points for off-chain actions. This document details the setup process, key functionalities, and the technologies utilized in the development of the application.

## Scope of Work

- **Registering an API Key**: Allows users to register and receive an API key for authenticated access.
- **Distributing Points**: Provides utilities for inserting points into specified addresses using the registered API key.
- **NPM Library**: Here is the [link to the deployed NPM library](https://www.npmjs.com/package/@waliba/absinthe-points-sdk) for easy integration and usage.

### Getting Started

#### Prerequisites

Ensure that Node.js and Yarn are installed on your system. These are essential for setting up and running the project locally.

#### Clone the Repository

```bash
git clone https://github.com/williamslsy/absinthe-points.git
cd absinthe-points
```

#### Install Dependencies and Run the Development Server

```bash
npm install && npm dev
or
yarn && yarn dev
```

After running the above commands, the application should be up and running on your local development server.

### Functionalities

#### Registering an API Key

To register for an API key, run the following command:

```bash
npx @waliba/absinthe-points-sdk register
```

For a detailed walkthrough on using the SDK, refer to the [SDK Documentation](https://github.com/williamslsy/absinthe-points-client/blob/main/README.md).

#### Distributing Points

**Application flow**
To distribute points to an address:

- Navigate to the Distribution Component in the application.
- Fill in your API key, the event name, address and the number of points.
- Submit the form to process the distribution.

### Tools and Technologies Used

- **Shadcn-UI**: Utilized for building consistent and efficient UI components.
- **TypeScript**: Employed throughout the project to enhance code quality and reliability.
- **TailwindCSS**: Used for responsive design and custom styling with an atomic CSS approach.
- **Next.js**: Chosen for its efficient data fetching capabilities, and SEO-friendly static site generation.
- **React Hooks and Custom Hooks**: For state management and enhanced code modularity.
- **Toast Notifications**: Implemented for real-time user feedback on actions.
- **Context API**: Utilized for centralized state management, improving predictability and efficiency.
- **Next.js API Routes**: Used for handling backend requests within the Next.js framework.
- **Prisma ORM**: Applied for database management to simplify data operations.
- **Vercel PostgreSQL**: Used for the database hosting, providing a scalable and managed database solution.

#### User Experience and Error Handling

- **Error Handling**: Comprehensive error handling strategies are implemented to catch and respond to issues during API calls and user interactions.
- **User Feedback**: Toast notifications are used extensively to provide immediate feedback on errors and successful actions, ensuring a smooth user experience.

### Areas for Improvement

**Bulk Distribution via CSV Upload**

One significant area for future enhancement is the implementation of a feature to allow the bulk distribution of points through the upload of a CSV file of addresses.

##### I'm eager to receive feedback on this project. Please leave comments on areas for improvement. Thank you.
