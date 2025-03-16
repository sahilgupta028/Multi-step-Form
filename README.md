# Multi-Step Form

A **multi-step form** built using **Next.js** and **TypeScript**, featuring validation, local storage persistence, and responsive design.

---

## Features

1. **Step-wise Form Flow**:
   - Step 1: Collect basic details (Name, Date of Birth, Gender)
   - Step 2: Collect contact information (Email, Phone, Address)
   - Step 3: Display summary and allow final confirmation

2. **Validation**:
   - Ensures required fields are filled
   - Validates email format
   - Highlights errors with user-friendly messages

3. **Dynamic Navigation**:
   - Next and Back buttons to navigate steps
   - Users can go back and edit previous steps

4. **Responsiveness**:
   - Fully responsive design that adapts to different screen sizes

## Technologies Used
  - Next.js for frontend framework
  - TypeScript for type safety
  - Tailwind CSS for styling

---

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-repo/multi-step-form.git
cd multi-step-formnpm run dev
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

---

## Scalability & Production-Grade Enhancements

1. **Moving to a Global State Management System**:

  - Using Redux Toolkit or Zustand for better scalability if more complex form flows are added.
  - Enables form data persistence across pages.

2. **API Integration for Backend Storage**:

   - Instead of using localStorage, integrate with a backend API (e.g., Firebase, Express.js, or GraphQL) to store form responses securely.
   - Allows multi-user support and centralized data management.

3. **Form Schema Validation with Zod**:

  - Using Zod with React Hook Form for cleaner validation logic.
  - Provides better performance compared to manual validation.

4. **Multi-Language Support**:

   - Implement i18n (Internationalization) for multilingual support.

5. **Unit & Integration Testing**:

   - Add Jest & React Testing Library to ensure form reliability in production
   - Write tests for navigation, validation, and submission flow.
