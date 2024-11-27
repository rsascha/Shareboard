import { useState } from "react";
import { DisplayChildren } from "./DisplayChildren";

export function AddOrEditUser({
  actionTitle = "add a title",
  user = { id: undefined, name: "", email: "" },
  onSubmit,
  onCancel,
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || "");

  function handleOnSubmit(e) {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ ...user, name, email });
    }
    setName(user.name);
    setEmail(user.email || "");
  }

  function handleCancelButtonClick() {
    if (onCancel) {
      onCancel();
    }
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label>Neuer Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Neue E-Mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">{actionTitle}</button>
      <DisplayChildren condition={onCancel}>
        <button onClick={handleCancelButtonClick}>Abbrechen</button>
      </DisplayChildren>
    </form>
  );
}
