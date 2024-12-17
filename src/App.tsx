import './App.css'
import { Tasks } from "@/components/tasks/tasks.tsx";
import { Routes, Route } from "react-router";
import { TasksEditPage } from "@/components/tasks/tasks-edit-page.tsx";

function App() {
  return (
    <main className="p-4">
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/tasks/edit/:id" element={<TasksEditPage />} />
      </Routes>
    </main>
  )
}

export default App
