import React, { useState } from "react";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `/api/v1/${searchTerm}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <Content data={data} isLoading={isLoading} />
    </div>
  );
};

export default App;
