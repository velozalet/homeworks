import Button from "./components/Button/Button";
// import Input from "./components/Input/Input";
import FormField from "./components/FormField/FormField";

function App() {
  return (
    <div>
      <Button disabled className="potato">
        Solid
      </Button>
      <Button
        disabled
        as="a"
        target="_blank"
        href="https://stackoverflow.com/questions/33949469/using-css-modules-how-do-i-define-more-than-one-style-name"
        variant="outline"
      >
        Outline
      </Button>

      <hr />
      {/* <Input required label="Enter username" />
      <Input type="number" label="Event date" /> */}

      {/*for input*/}
      <FormField label="Email" type="input" required placeholder="Enter email" />

      {/*for select*/}
      <FormField
        label="Country"
        type="select"
        required
        options={[
        { value: "", label: "Select a country" },
        { value: "us", label: "USA" },
        { value: "ca", label: "Canada" },
        ]}
      />
    </div>
  );
}

export default App;
