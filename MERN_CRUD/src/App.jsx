import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import User from "./components/users";
import CreateUser from "./components/create";
import UpdateUser from "./components/update";
import 'bootstrap/dist/css/bootstrap.min.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<User />} />
      <Route path="/create" element={<CreateUser />} />
      <Route path="/update/:id" element={<UpdateUser />} />
    </>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
