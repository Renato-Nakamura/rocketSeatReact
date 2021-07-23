import { Button, ButtonChildren, ButtonEdit } from "./components/Button";



function App() {
  return (
    <div>
      <Button/>
      <Button/>
      <ButtonEdit texto ={'olha, propriedades'}/>
      <ButtonChildren>Children</ButtonChildren>
    </div>
  );
}

export default App;
