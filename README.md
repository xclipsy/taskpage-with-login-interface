# RiwiFlow

## Brief description
A task management single-page application with a Kanban board for admins and coders. It includes login, route-based navigation, task creation, editing, and status flow across Todo, In Progress, In Review, and Done.

## Technologies Used
* **HTML5:** Page structure and layout.
* **CSS3:** App styling, responsive board layout, and visual states.
* **JavaScript:** Routing, authentication logic, UI interaction, and API communication.
* **json-server:** Local mock API for users and tasks.

## Project Structure
* `index.html`: Main entry page.
* `src/main.js`: Core application logic and initialization.
* `src/router.js`: Route handling and navigation.
* `src/counter.js`: Helper logic for UI interaction.
* `src/style.css`: Global styles and board design.
* `src/pages/login.html`: Login view markup.
* `src/pages/board.html`: Kanban board and task views.
* `db.json`: Mock data source for users and tasks.

## Features
* Login by user role (`admin` or `coder`).
* Admin can create, edit, and assign tasks.
* Coder can view tasks and update assigned ones.
* Kanban board with task statuses.
* SPA navigation without full page reloads.

## Installation and Usage
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-repo/admin-tasks_SPA.git
   ```
2. Navigate to the project folder:
   ```bash
   cd admin-tasks_SPA
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the mock backend:
   ```bash
   npm run backend
   ```
   or, if no script is defined:
   ```bash
   npx json-server --watch db.json --port 3000
   ```
5. Start the frontend server:
   ```bash
   npm run dev
   ```
6. Open the app in your browser at the address shown by the dev server.

## Author
**Lus Guerrero**

**Angel Gomez**

### 4. Open in browser:
Navigate to [http://localhost:5173](http://localhost:5173) in your web browser.

---

## 👥 Mock Credentials / Credenciales de Prueba

- **Admin User**:
  - **Email**: `admin@riwiflow.com`
  - **Password**: `admin123`
- **Coder User**:
  - **Email**: `coder@riwiflow.com`
  - **Password**: `coder123`

