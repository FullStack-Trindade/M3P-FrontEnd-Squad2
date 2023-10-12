import InputComponent from "../components/Input/Input.component";

export default function Layout() {
  return (
    <div>Layout is render 
      <InputComponent type="text" id="ss" mask="999.999.999-99" label="cpf"></InputComponent>
    </div>
  )
}
