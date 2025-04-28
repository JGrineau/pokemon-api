import React, { useState } from 'react';
import './compare.css';

const Compare = () => {
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');
  const [result, setResult] = useState(null);
  const [allPokemon, setAllPokemon] = useState([]);

  React.useEffect(() => {
    // Fetch all Pokémon names for dropdowns
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(data => setAllPokemon(data.results));
  }, []);

  const handleCompare = async () => {
    if (!pokemon1 || !pokemon2 || pokemon1 === pokemon2) return;
    const [data1, data2] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1}`).then(res => res.json()),
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2}`).then(res => res.json())
    ]);
    // Simple comparison: higher total base stats wins. Type effectiveness can be added for more detail.
    const totalStats1 = data1.stats.reduce((sum, s) => sum + s.base_stat, 0);
    const totalStats2 = data2.stats.reduce((sum, s) => sum + s.base_stat, 0);
    let winner = null;
    if (totalStats1 > totalStats2) winner = data1.name;
    else if (totalStats2 > totalStats1) winner = data2.name;
    else winner = 'Tie';
    setResult({ data1, data2, totalStats1, totalStats2, winner });
  };

  return (
    <div className="compare-container">
      <h2>Compare Pokémon</h2>
      <div className="compare-selectors">
        <select value={pokemon1} onChange={e => setPokemon1(e.target.value)}>
          <option value="">Select Pokémon 1</option>
          {allPokemon.map(p => (
            <option key={p.name} value={p.name}>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</option>
          ))}
        </select>
        <span style={{ margin: '0 1rem' }}>vs</span>
        <select value={pokemon2} onChange={e => setPokemon2(e.target.value)}>
          <option value="">Select Pokémon 2</option>
          {allPokemon.map(p => (
            <option key={p.name} value={p.name}>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</option>
          ))}
        </select>
        <button onClick={handleCompare} disabled={!pokemon1 || !pokemon2 || pokemon1===pokemon2} style={{marginLeft:'1rem'}}>Compare</button>
      </div>
      {result && (
        <div className="compare-result">
          <h3>Result</h3>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <div>
              <img src={result.data1.sprites.front_default} alt={result.data1.name} />
              <p>{result.data1.name.charAt(0).toUpperCase() + result.data1.name.slice(1)}</p>
              <p>Total Stats: {result.totalStats1}</p>
              <p>Types: {result.data1.types.map(t => t.type.name).join(', ')}</p>
            </div>
            <div>
              <img src={result.data2.sprites.front_default} alt={result.data2.name} />
              <p>{result.data2.name.charAt(0).toUpperCase() + result.data2.name.slice(1)}</p>
              <p>Total Stats: {result.totalStats2}</p>
              <p>Types: {result.data2.types.map(t => t.type.name).join(', ')}</p>
            </div>
          </div>
          <h4 style={{marginTop:'1rem'}}>Winner: {result.winner === 'Tie' ? 'It’s a tie!' : result.winner.charAt(0).toUpperCase() + result.winner.slice(1)}</h4>
        </div>
      )}
    </div>
  );
};

export default Compare;
