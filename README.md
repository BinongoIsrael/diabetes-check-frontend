# 🩺 Diabetes Risk Assessment (Frontend)

A **Web-based Diabetes Risk Assessment** app that uses **Fuzzy Logic (Mamdani Inference System)** to determine diabetes risk levels based on physiological and lifestyle factors.  
Built with **React + TypeScript + Vite** and styled using **TailwindCSS** and **shadcn/ui**.  

This project is a **laboratory exercise** for the *Intelligent Systems* course, demonstrating the practical use of fuzzy logic in health risk evaluation.

---

## 🚀 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | [React](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Language** | TypeScript |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Routing** | [React Router DOM](https://reactrouter.com/) |
| **Backend API** | [FastAPI](https://fastapi.tiangolo.com/) (Python) |
| **Deployment (API)** | [Render.com](https://render.com/) |

---

## 🧠 System Overview

This project implements a **Fuzzy Expert System** based on **Mamdani-type inference** to assess diabetes risk.

### 🔍 Input Variables
- **Fasting Blood Sugar (FBS)** – mg/dL  
- **Body Mass Index (BMI)** – kg/m²  
- **Age** – in years  
- **Physical Activity** – number of days per week

### ⚙️ Output
- **Diabetes Risk Level**:  
  - 🟢 Low Risk  
  - 🟡 Moderate Risk  
  - 🔴 High Risk  

The fuzzy inference computation and defuzzification are performed server-side via the FastAPI backend.

---

## 🌐 Backend API

This frontend communicates with the deployed backend hosted on **Render**:

```

[https://diabetescheck-api.onrender.com/](https://diabetescheck-api.onrender.com/)

```

### API Endpoint
```

POST /assess

````

#### Example request:
```json
{
  "fbs": 100,
  "bmi": 25,
  "age": 45,
  "physical_activity": 30
}
````

#### Example response:

```json
{
  "crispValue": 50,
  "classification": "Moderate"
}
```
---

## 📊 Membership Function Graphs

This API also includes endpoints to **visualize fuzzy membership functions** used in the risk assessment model.

### 🖼️ Example Endpoints

| Variable              | Endpoint         | Description                                        |
| --------------------- | ---------------- | -------------------------------------------------- |
| **All Variables**     | `/plot/all`      | Displays all membership functions in one figure    |
| **FBS**               | `/plot/fbs`      | Fasting Blood Sugar membership sets                |
| **BMI**               | `/plot/bmi`      | Body Mass Index membership sets                    |
| **Age**               | `/plot/age`      | Age-based fuzzy categories                         |
| **Physical Activity** | `/plot/physical` | Weekly physical activity intensity                 |
| **Risk (Output)**     | `/plot/risk`     | Fuzzy risk output categories (Low, Moderate, High) |

### 🧠 Example Usage

Once your backend is running (e.g., `uvicorn main:app --reload`), open any of these in your browser:

```
http://localhost:8000/plot/all
http://localhost:8000/plot/fbs
http://localhost:8000/plot/bmi
http://localhost:8000/plot/age
http://localhost:8000/plot/physical
http://localhost:8000/plot/risk
```

Each endpoint will render a **PNG image** generated dynamically using `matplotlib`, showing how fuzzy membership degrees change across value ranges.

---



## 🛠️ Local Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Binongo/DiabetesCheck-API.git
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Access locally**

   ```
   http://localhost:5173
   ```

---

## 🧪 Example Workflow

1. The user inputs:

   * FBS: 100 mg/dL
   * BMI: 24 kg/m²
   * Age: 60
   * Physical Activity: 2 days/week

2. The app sends these values to the backend API for fuzzy evaluation.

3. The backend applies Mamdani inference with predefined membership functions and rules.

4. The result is defuzzified and returned as a crisp value with a classification (Low / Moderate / High).

5. The frontend displays the result with a visually distinct card component and theming.

---

## 🧩 Folder Structure

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │    ├── ui/   
│   ├── lib/
│   ├── index.css
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 📘 Learning Objective

This project demonstrates:

* How **Fuzzy Logic** can handle uncertainty and partial truth in decision-making.
* How **frontend–backend communication** works in modern web applications.
* Integration of **AI reasoning systems** (Fuzzy Expert Systems) with **React-based interfaces**.

---

## 🧑‍💻 Author

**Israel Binongo**
Intelligent Systems Laboratory — 2025
📍 Visayas State University (VSU)

---

