import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AddOrEditUser } from "../components/AddOrEditUser";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Settings() {
  const { shareboardId, ownerKey } = useParams(); // Hole shareboardId und ownerKey aus der URL
  const [boardData, setBoardData] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const { state } = useLocation();
  console.log("state: ", state);
  console.log(state.result.owner.rights);

  useEffect(() => {
    console.log("useEffect", shareboardId, ownerKey);
    const fetchBoardSettings = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/api/settings/${shareboardId}/${ownerKey}`
        );

        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Board-Daten.");
        }

        const data = await response.json();
        setBoardData(data);
      } catch (error) {
        console.log(error.message); // Fehler wird nur in der Konsole geloggt, nicht auf der Seite angezeigt
      }
    };

    fetchBoardSettings();
  }, [shareboardId, ownerKey]); // nur neu laden, wenn sich shareboardId oder ownerKey ändern

  const handleEditUser = (user) => {
    setEditUserId(user.id);
  };

  const handleSaveUser = async (updatedUser) => {
    setEditUserId(null); // Bearbeitungsmodus beenden
    try {
      const response = await fetch(
        `${backendUrl}/api/settings/${shareboardId}/${ownerKey}/users/${editUserId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBoardData((prevData) => ({
          ...prevData,
          users: prevData.users.map((user) =>
            user.id === editUserId
              ? { ...user, ...data } // Vorhandene Daten mit neuen Daten kombinieren
              : user
          ),
        }));
      } else {
        console.log("Fehler beim Speichern der Änderungen.");
      }
    } catch (error) {
      console.log("Fehler beim Speichern der Änderungen:", error.message);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const response = await fetch(
        `${backendUrl}/api/settings/${shareboardId}/${ownerKey}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBoardData((prevData) => {
          return { ...prevData, users: data.users };
        }); // Board-Daten neu laden
      } else {
        console.log("Fehler beim Hinzufügen des Benutzers.");
      }
    } catch (error) {
      console.log("Fehler beim Hinzufügen des Benutzers:", error.message);
    }
  };

  if (!boardData) {
    return <div>Loading...</div>;
  }
  console.log(boardData.users);
  console.log("Empfangene Daten in Settings:", boardData);

  return (
    <div>
      <h1>Boardname: {boardData.boardName}</h1>
      <p>Boardowner: {boardData.ownerName}</p>
      <p>Your personal Owner Key: {boardData.ownerKey}</p>
      <h2>Benutzer Hinzufügen</h2>
      <AddOrEditUser
        actionTitle="Benutzer hinzufügen"
        onSubmit={handleAddUser}
      />
      <h2>Benutzer des Boards</h2>
      <ul>
        {boardData.users
          .filter((user) => user.rights === false)
          .map((user) => (
            <li key={user.id}>
              {user.name} {user.email ? `(${user.email})` : "(Keine E-Mail)"}
              <br />
              Schlüssel: {user.shareboardKey}
              {/* Bearbeitungsformular nur anzeigen, wenn der Benutzer bearbeitet wird */}
              {editUserId === user.id ? (
                <AddOrEditUser
                  user={user}
                  actionTitle="Speichern"
                  onSubmit={handleSaveUser}
                  onCancel={() => setEditUserId(null)}
                />
              ) : (
                <button onClick={() => handleEditUser(user)}>Bearbeiten</button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
