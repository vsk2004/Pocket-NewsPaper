import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(
       `${process.env.REACT_APP_API_URL}/api/notes/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        logout();
        props.showAlert(
          "Session expired. Please login again.",
          "warning"
        );
        navigate("/login");
        return;
      }

      const data = await response.json();
      setNotes(data);
    } catch (error) {
     
      props.showAlert("Failed to fetch notes", "danger");
    }
  };

  const handleSave = async () => {
    if (note.trim() === "") {
      props.showAlert("Please write something!", "warning");
      return;
    }

    try {
      const response = await fetch(
       `${process.env.REACT_APP_API_URL}/api/notes/add`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            content: note,
          }),
        }
      );

      if (response.status === 401 || response.status === 403) {
        logout();
        props.showAlert(
          "Session expired. Please login again.",
          "warning"
        );
        navigate("/login");
        return;
      }

      if (response.ok) {
        props.showAlert("Note saved successfully!", "success");
        setNote("");
        fetchNotes();
      } else {
        props.showAlert("Failed to save note!", "danger");
      }
    } catch (error) {
      props.showAlert("Server error!", "danger");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/notes/delete/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        logout();

        props.showAlert(
          "Session expired. Please login again.",
          "warning"
        );

        navigate("/login");

        return;
      }

      if (response.ok) {
        props.showAlert("Note deleted successfully!", "success");
        fetchNotes();
      } else {
        props.showAlert("Failed to delete note!", "danger");
      }
    } catch (error) {
     
      props.showAlert("Server error!", "danger");
    }
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="container-fluid py-4"
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
      }}
    >
      <div className="container">

        <div
          className="shadow rounded-4 p-4 text-white mb-4"
          style={{
            marginTop: "70px",
            background:
              "linear-gradient(135deg,#0d6efd,#4f8ef7)",
          }}
        >
          <h2 className="fw-bold mb-2">
            📝 My Notes
          </h2>

          <p className="mb-0 opacity-75">
            Save important points while reading articles and access them anytime.
          </p>
        </div>


        <div className="card border-0 shadow rounded-4 mb-4">

          <div className="card-body p-4">

            <h4 className="fw-bold mb-3">
              ✍️ Create New Note
            </h4>

            <textarea
              className="form-control border-0 shadow-sm"
              rows="8"
              placeholder="Write your important points here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{
                resize: "none",
                backgroundColor: "#fafafa",
                borderRadius: "15px",
              }}
            />

            <div className="mt-4">

              <button
                className="btn btn-primary px-4 py-2 rounded-pill"
                onClick={handleSave}
              >
                <i className="bi bi-save me-2"></i>
                Save Note
              </button>

            </div>

          </div>

        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">

          <h3 className="fw-bold">
            📌 Saved Notes
          </h3>

          <span className="badge bg-primary rounded-pill fs-6 px-3 py-2">
            {notes.length} Notes
          </span>

        </div>

        {notes.length === 0 ? (

          <div className="card border-0 shadow rounded-4">

            <div className="card-body text-center py-5">

              <i
                className="bi bi-journal-text"
                style={{
                  fontSize: "60px",
                  color: "#0d6efd",
                }}
              ></i>

              <h4 className="mt-3 fw-bold">
                No Notes Yet
              </h4>

              <p className="text-muted">
                Start saving important points from your news articles.
              </p>

            </div>

          </div>

        ) : (

          notes.map((item) => (

            <div
              key={item.id}
              className="card border-0 shadow-sm rounded-4 mb-3"
              style={{
                transition: ".3s",
              }}
            >

              <div className="card-body d-flex justify-content-between align-items-center">

                <div className="d-flex">

                  <div className="me-3">

                    <i
                      className="bi bi-pin-angle-fill"
                      style={{
                        color: "#0d6efd",
                        fontSize: "22px",
                      }}
                    ></i>

                  </div>

                  <div>

                    <p
                      className="mb-0"
                      style={{
                        whiteSpace: "pre-wrap",
                        fontSize: "16px",
                      }}
                    >
                      {item.content}
                    </p>

                  </div>

                </div>

                <button
                  className="btn btn-outline-danger rounded-circle"
                  onClick={() => handleDelete(item.id)}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>

              </div>

            </div>

          ))

        )}

      </div>
    </div>
  );
}

export default Notes;