import { useState } from "react";
import Input from "./shared/Input";

export default function TotalCharges() {
  const [mcFloor, setMcFloor] = useState("");

  return (
    <section>
      <Input
        id="mc-floor"
        onChange={(event) => setMcFloor(event.target.value)}
        label="$ MC Floor"
        value={mcFloor}
      />
    </section>
  );
}
