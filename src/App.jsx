import { useEffect, useState } from "react";
import { generateToken, messagingPromise } from "./Notification/firebase";
import { onMessage } from "firebase/messaging";
// react-toastify imports
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const technologies = [
    {
      name: "React",
      purpose: "Build reusable UI components.",
      example: "Components, props, and state",
    },
    {
      name: "Firebase Messaging",
      purpose: "Receive browser push notifications.",
      example: "onMessage()",
    },
    {
      name: "React Toastify",
      purpose: "Show in-app notification messages.",
      example: "toast()",
    },
    {
      name: "Bootstrap",
      purpose: "Build responsive layouts quickly.",
      example: "Cards, grids, and buttons",
    },
  ];

  const [page, setPage] = useState("overview");
  const [count, setCount] = useState(0);

  const sendDemoNotification = () => {
    const nextCount = count + 1;
    setCount(nextCount);

    toast.success(`Push notification demo #${nextCount}!`, {
      position: "top-right",
      autoClose: 4000,
    });
  };

  // useEffect(() => {
  //   generateToken();
  //   onMessage(messagingPromise, (payload) => {
  //     console.log("Message received. ", payload);
  //   });
  // }, []);

  useEffect(() => {
    let unsubscribe;

    const setupMessaging = async () => {
      await generateToken();

      const messaging = await messagingPromise;
      if (!messaging) return;

      unsubscribe = onMessage(messaging, (payload) => {
        console.log("Message received:", payload);

        const title = payload.notification?.title || "Notification";
        const body = payload.notification?.body || "";

        toast(
          <div>
            <strong>{title}</strong>
            <div>{body}</div>

            {payload.notification?.image && (
              <img
                src={payload.notification.image}
                alt={title}
                style={{
                  width: "100%",
                  marginTop: "8px",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>,
        );
      });
    };

    setupMessaging();

    return () => {
      unsubscribe?.();
    };
  }, []);

  return (
    <main>
      <div className="App">
        <ToastContainer position="top-right" autoClose={5000} />
        <div className="bg-light min-vh-100">
          <nav className="navbar navbar-dark bg-dark">
            <div className="container">
              <span className="navbar-brand fw-bold">
                Firebase Learning Dashboard
              </span>
              <span className="text-white-50 small">Firebase + Bootstrap</span>
            </div>
          </nav>

          <main className="container py-4">
            <div className="bg-white rounded shadow-sm p-4 mb-4">
              <h1 className="h3 fw-bold">Welcome to your dashboard!</h1>
              <p className="text-secondary mb-3">
                Learn how each technology works in your React project.
              </p>

              <button
                className="btn btn-primary"
                onClick={() => setPage("form")}
              >
                Try the form demo
              </button>
            </div>

            <div className="d-flex flex-wrap gap-2 mb-4">
              {["overview", "technologies", "form"].map((tab) => (
                <button
                  key={tab}
                  className={`btn ${
                    page === tab ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setPage(tab)}
                >
                  {tab === "form"
                    ? "Form Demo"
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {page === "overview" && (
              <>
                <div className="row g-3 mb-4">
                  {[
                    ["Frontend", "React"],
                    ["Notifications", "Firebase FCM"],
                    ["Styling", "Bootstrap"],
                  ].map(([label, value]) => (
                    <div className="col-12 col-md-4" key={label}>
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                          <p className="text-secondary mb-1">{label}</p>
                          <h2 className="h5 fw-bold">{value}</h2>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h2 className="h5 fw-bold">Push notification flow</h2>
                    <ol className="mb-0">
                      <li className="mb-2">
                        Request browser notification permission.
                      </li>
                      <li className="mb-2">
                        Register the Firebase service worker.
                      </li>
                      <li className="mb-2">
                        Receive messages from Firebase Cloud Messaging.
                      </li>
                      <li>
                        Display a toast in the foreground or a system
                        notification in the background.
                      </li>
                    </ol>
                  </div>
                </div>
              </>
            )}

            {page === "technologies" && (
              <div className="row g-3">
                {technologies.map((tech) => (
                  <div className="col-12 col-md-6 col-lg-4" key={tech.name}>
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <h2 className="h5 fw-bold">{tech.name}</h2>
                        <p className="text-secondary">{tech.purpose}</p>
                        <div className="bg-light rounded p-2">
                          <small className="text-secondary">
                            Example: {tech.example}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {page === "form" && (
              <div className="min-vh-100 bg-light">
                <nav className="navbar navbar-dark bg-dark">
                  <div className="container">
                    <span className="navbar-brand fw-bold">
                      Firebase Push Notification Demo
                    </span>
                  </div>
                </nav>

                <main className="container py-5">
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body p-4 p-md-5 text-center">
                          <div className="display-4 mb-3">🔔</div>

                          <h1 className="h3 fw-bold">Push Notification Demo</h1>

                          <p className="text-secondary mt-3">
                            Click the button below to trigger a demo
                            notification.
                          </p>

                          <button
                            type="button"
                            className="btn btn-primary btn-lg mt-3"
                            onClick={sendDemoNotification}
                          >
                            Send Demo Notification
                          </button>

                          <div className="alert alert-light border mt-4 mb-0">
                            <div className="fw-semibold">
                              Notifications triggered
                            </div>
                            <div className="fs-4">{count}</div>
                          </div>

                          <p className="small text-secondary mt-3 mb-0">
                            This demo displays an in-app toast. It does not send
                            a real Firebase push message.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            )}
          </main>
        </div>
      </div>
    </main>
  );
};

export default App;
