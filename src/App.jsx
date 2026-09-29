import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Practice from "./pages/Practice";
import Result from "./pages/Result";

import SubjectPractice from "./pages/SubjectPractice";
import PracticalPractice from "./pages/PracticalPractice";
import Navbar from "./components/Navbar";
import Notes from "./pages/Notes";
import SubjectNotes from "./pages/SubjectNotes";
import PracticeSets from "./pages/PracticeSets";
import Coding from "./pages/Coding";
import FloatingActions from "./components/FloatingActions";
import LoadToTop from "./components/LoadToTop";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <LoadToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coding" element={<Coding />} />
        <Route path="/practice-sets" element={<PracticeSets />} />
        <Route path="/notes" element={<Notes />} />
        {/* Existing MCQ Practice */}
        <Route path="/practice/:slug" element={<Practice />} />
        <Route path="/result" element={<Result />} />
        {/* Practice Mode Selection */}
        <Route path="/subject/:slug" element={<SubjectPractice />} />
        {/* Practical Practice */}
        <Route path="/practical/:slug" element={<PracticalPractice />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:subjectSlug" element={<SubjectNotes />} />
        <Route
          path="/notes/:subjectSlug/:topicSlug"
          element={<SubjectNotes />}
        />
      </Routes>
        <FloatingActions />
    </BrowserRouter>
  );
}

export default App;
