import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/fee-assessment-categories").then((response) => {
      setCategories(response?.data);
    });
  }, []);

  return (
    <div className="text-center text-4xl">
      <h1>halo</h1>
      {categories.length > 0 && categories.map((c) => <p>{c.name}</p>)}
    </div>
  );
}

export default App;
