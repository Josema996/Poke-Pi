import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";
import  css from "./Css/Search.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim()) { // Check if name is not empty or whitespace
      dispatch(getNamePokemons(name));
    }
  }
  
  return (
    
    <form onSubmit={handleSubmit}>
      <label for="pokemon-input" class="pokemon-label">Buscar Pokemon:</label>
      <br></br>
      <input
        type="text"
        placeholder="Por ejemplo: bulbasaur"
        value={name}
        onChange={handleInputChange}
        id="pokemon-input" class="pokemon-input"
      />
      <button type="submit" class="pokemon-search-btn">Buscar🔎</button>
    </form>
  );
}