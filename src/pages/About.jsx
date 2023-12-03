import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const About = () => {
  const { dark } = useTheme();
  // Your personal information
  const authorName = "Abu hasan abir ";
  const university = "Tampere university of applied science";
  const phone = "0468823044";

  // Work details
  const workingHours = "96"; // In hours
  const challengingFeature =
    "Enable a visually pleasing drag-and-drop experience for the challengingFeature using a React DnD library. Manage the feature order with state, updating it during DnD events. Utilize the localStorage API for persistent storage, employing setItem and getItem to save and retrieve the order across component lifecycle.";
  return (
    <div className="w-10/12 mt-10 grid m-auto p-6 mb-10 overflow-scroll">
      <div className="flex flex-col items-center justify-center">
        {/* <h1 className="text-3xl font-bold">About</h1> */}
        <img
          src="https://avatars.githubusercontent.com/u/75256709?v=4"
          alt="profile"
          className="w-32 h-32 rounded-full mt-4"
        />
        <h1 className="text-xl font-semibold mt-4">{authorName}</h1>
        <h1 className="text-lg font-semibold mt-2">{university}</h1>
        {/* Contact information */}
        <div className="flex flex-row items-center justify-center gap-4 mt-4">
          <p>
            Phone: <span>{phone}</span>
          </p>
        </div>

        {/* Work details */}
        <div className="mt-4">
          <p className="text-sm">
            <span className="text-lg font-semibold">Working Hours Spent:</span> {workingHours} hours
          </p>
          <p className="text-sm">
           <span className="text-lg font-semibold"> Most Difficult Feature:</span> {challengingFeature}
          </p>
        

        {/* Instructions for running the application */}
        <div className="mt-4 ">
          <h2 className="text-2xl font-bold">To run the application:</h2>
          <ol className="list-decimal pl-6">
            <li>Open terminal</li>
            <li>
              Run the following command to install dependencies:
              <pre className={`inline-block rounded-md mt-2 ml-1 px-1 ${dark ? "bg-slate-300/90": "bg-slate-100"}`}>
                <kbd className="text-red-600">npm install</kbd>
              </pre>
            </li>
            <li>
              Start the application:
              <pre className={`inline-block rounded-md mt-2 ml-1 px-1 ${dark ? "bg-slate-300/90": "bg-slate-100"}`}>
                <kbd className="text-red-600">npm start</kbd>
              </pre>
            </li>
            <li>Open another terminal</li>
            <li>
              Start the server:
              <pre className={`inline-block  p-1 rounded-md mt-2`}>
                npm run server
              </pre>
            </li>
            <li>
              All set! Go to{" "}
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                localhost:3000
              </a>{" "}
              in your web browser.
            </li>
          </ol>
        </div>
      </div>
      </div>
    </div>
  );
};

export default About;
