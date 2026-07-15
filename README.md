# 📰 Pocket Newspaper

Pocket Newspaper is a full-stack news application that provides users with the latest news updates through a modern and responsive interface. The application allows users to browse category-wise news, save articles, create personal notes, and securely authenticate using JWT-based authentication.

---

## 🚀 Features

- 📰 Latest news fetched through REST APIs
- 📂 Browse news by category
- 🔍 Search news articles
- 🔖 Save favorite articles
- 📝 Create and manage personal notes
- 🔐 User Authentication (Signup/Login)
- 🔑 JWT-based Authorization
- 📱 Responsive user interface
- ⚡ Fast and seamless user experience
- 🗄️ MySQL database integration
- ⏰ Automated news updates using Spring Scheduler

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Bootstrap
- CSS
- JavaScript

### Backend
- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- REST APIs

### Database
- MySQL

### Tools
- Maven
- Git
- GitHub
- Postman

---

## 📁 Project Structure

```text
Pocket-NewsPaper/
│
├── Pocket-NewsPaper Backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── Pocket-NewsPaper Frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/vsk2004/Pocket-NewsPaper.git
```

---

### Backend Setup

```bash
cd "Pocket-NewsPaper Backend"
```

Configure your MySQL database inside:

```
src/main/resources/application.properties
```

Run the backend:

```bash
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

### Frontend Setup

```bash
cd "Pocket-NewsPaper Frontend"
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 📌 API Features

- User Registration
- User Login
- JWT Authentication
- Fetch Latest News
- Category-wise News
- Save Articles
- Notes Management

---

## 🔒 Security

- JWT Authentication
- Password Encryption
- Protected API Endpoints
- Spring Security Configuration

---

## 🎯 Future Enhancements

- Personalized News Recommendations
- Dark Mode
- Push Notifications
- Advanced Search Filters
- User Profile Management
- Cloud Deployment

---

## 👨‍💻 Developed By

**Shiva Kumar**

B.Tech Computer Science Engineering

Java Full Stack Developer

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.