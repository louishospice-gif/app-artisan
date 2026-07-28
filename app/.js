'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState({
    client_name: '',
    items: [{ description: '', quantity: 1, unit_price: 0, vat_rate: 20 }]
  });

  const updateItem = (index, field, value) => {
    const newItems = [...quote.items];
    newItems[index][field] = field === 'description' ? value : Number(value);
    setQuote({ ...quote, items: newItems });
  };

  const addItem = () => {
    setQuote({
      ...quote,
      items: [...quote.items, { description: '', quantity: 1, unit_price: 0, vat_rate: 20 }]
    });
  };

  const removeItem = (index) => {
    setQuote({ ...quote, items: quote.items.filter((_, i) => i !== index) });
  };

  const totalHT = quote.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  const totalVAT = quote.items.reduce((sum, item) => sum + (item.quantity * item.unit_price * (item.vat_rate / 100)), 0);
  const totalTTC = totalHT + totalVAT;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', margin: '0' }}>🛠️ App Devis Artisan</h1>
        <p style={{ color: '#666', fontSize: '14px' }}>Saisie rapide de devis et factures</p>
      </header>

      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Client :</label>
        <input
          type="text"
          placeholder="Nom du client"
          value={quote.client_name}
          onChange={(e) => setQuote({ ...quote, client_name: e.target.value })}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Prestations</h3>
        {quote.items.map((item, index) => (
          <div key={index} style={{ display: 'flex', gap: '5px', marginBottom: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateItem(index, 'description', e.target.value)}
              style={{ flex: 2, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="number"
              placeholder="Qté"
              value={item.quantity}
              onChange={(e) => updateItem(index, 'quantity', e.target.value)}
              style={{ width: '50px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="number"
              placeholder="Prix HT"
              value={item.unit_price}
              onChange={(e) => updateItem(index, 'unit_price', e.target.value)}
              style={{ width: '70px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button
              onClick={() => removeItem(index)}
              style={{ background: 'red', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={addItem}
          style={{ background: '#0070f3', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
        >
          + Ajouter une ligne
        </button>
      </div>

      <div style={{ borderTop: '2px solid #333', paddingTop: '15px', textAlign: 'right' }}>
        <p style={{ margin: '5px 0' }}>Total HT : <strong>{totalHT.toFixed(2)} €</strong></p>
        <p style={{ margin: '5px 0' }}>TVA (20%) : <strong>{totalVAT.toFixed(2)} €</strong></p>
        <h2 style={{ margin: '10px 0', color: '#0070f3' }}>Total TTC : {totalTTC.toFixed(2)} €</h2>
      </div>
    </div>
  );
}
