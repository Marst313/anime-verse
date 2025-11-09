### 🤖 **`PROMPTS.md`**

````markdown
# 🤖 PROMPTS.md — AI Usage Documentation

This file documents all AI-assisted interactions and how AI contributed to the project.

## 🧠 Tool Used

- **ChatGPT (GPT-5)** by OpenAI

---

## 🗂️ Context & Prompts Used

### 1️⃣ Project Setup & Tech Stack

**Prompt:**

> "Help me set up a React + TypeScript project using Vite, Redux Toolkit, and TanStack Query."

**Usage:**
AI provided guidance for initializing the project and choosing compatible library versions.

---

### 2️⃣ Search Page Logic

**Prompt:**

> "How can I implement debounced search in React with cancelable requests using Jikan API?"

**Usage:**
AI assisted in writing the debounce pattern and explaining cleanup logic to prevent API spam.

---

### 3️⃣ Dynamic Query Params

**Prompt:**

> "I want to set search params dynamically, but skip `s` if no query is entered."

**Resulting Code:**

```ts
const params: Record<string, string> = { page: String(page) }
if (searchQuery) params.s = searchQuery
setSearchParams(params)
```
````
