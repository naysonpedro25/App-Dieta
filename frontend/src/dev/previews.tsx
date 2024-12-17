import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import Home from "../pages/Home.tsx";
import Register from "../pages/Register.tsx";
import { Header } from "../components/Header.tsx";
import Login from "../pages/Login.tsx";
import Presentation from "../pages/Presentation.tsx";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/Home">
        <Home />
      </ComponentPreview>
      <ComponentPreview path="/Register">
        <Register />
      </ComponentPreview>
      <ComponentPreview path="/Header">
        <Header />
      </ComponentPreview>
      <ComponentPreview path="/Login">
        <Login />
      </ComponentPreview>
      <ComponentPreview path="/Presentation">
        <Presentation />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
