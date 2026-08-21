import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './StoreCard.css';

const defaultData = {
  storeName: 'Mi Tienda',
  tagline: 'Tu destino de compras favorito',
  url: 'https://mitienda.com',
  phone: '+1 (555) 123-4567',
  address: 'Calle Principal 123, Ciudad',
  logoEmoji: '🛍️',
  primaryColor: '#6366f1',
  secondaryColor: '#818cf8',
};

export default function StoreCard() {
  const [data, setData] = useState(defaultData);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(defaultData);
  const cardRef = useRef(null);

  const handleEdit = () => {
    setDraft({ ...data });
    setEditing(true);
  };

  const handleSave = () => {
    setData({ ...draft });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-wrapper">
      <h1 className="page-title">Tarjeta de Tienda con QR</h1>

      <div className="card-preview" ref={cardRef}>
        <div
          className="store-card"
          style={{
            '--primary': data.primaryColor,
            '--secondary': data.secondaryColor,
          }}
        >
          <div className="card-header">
            <div className="logo-circle">{data.logoEmoji}</div>
            <div className="store-info">
              <h2 className="store-name">{data.storeName}</h2>
              <p className="store-tagline">{data.tagline}</p>
            </div>
          </div>

          <div className="card-divider" />

          <div className="card-body">
            <div className="contact-info">
              {data.phone && (
                <div className="contact-row">
                  <span className="icon">📞</span>
                  <span>{data.phone}</span>
                </div>
              )}
              {data.address && (
                <div className="contact-row">
                  <span className="icon">📍</span>
                  <span>{data.address}</span>
                </div>
              )}
              {data.url && (
                <div className="contact-row">
                  <span className="icon">🌐</span>
                  <span>{data.url}</span>
                </div>
              )}
            </div>

            <div className="qr-section">
              <div className="qr-wrapper">
                <QRCodeSVG
                  value={data.url || 'https://mitienda.com'}
                  size={120}
                  bgColor="#ffffff"
                  fgColor={data.primaryColor}
                  level="H"
                  includeMargin={false}
                />
              </div>
              <p className="qr-label">Escanea para visitar</p>
            </div>
          </div>

          <div className="card-footer">
            <div className="footer-bar" />
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-secondary" onClick={handleEdit}>
          ✏️ Editar
        </button>
        <button className="btn btn-primary" onClick={handlePrint}>
          🖨️ Imprimir / Guardar PDF
        </button>
      </div>

      {editing && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Editar Tarjeta</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Nombre de la tienda</label>
                <input
                  value={draft.storeName}
                  onChange={(e) => setDraft({ ...draft, storeName: e.target.value })}
                  placeholder="Nombre de tu tienda"
                />
              </div>

              <div className="form-group">
                <label>Eslogan / Descripción</label>
                <input
                  value={draft.tagline}
                  onChange={(e) => setDraft({ ...draft, tagline: e.target.value })}
                  placeholder="Descripción corta"
                />
              </div>

              <div className="form-group">
                <label>URL (se usará en el QR)</label>
                <input
                  value={draft.url}
                  onChange={(e) => setDraft({ ...draft, url: e.target.value })}
                  placeholder="https://tutienda.com"
                />
              </div>

              <div className="form-group">
                <label>Teléfono</label>
                <input
                  value={draft.phone}
                  onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="form-group">
                <label>Dirección</label>
                <input
                  value={draft.address}
                  onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                  placeholder="Calle, Ciudad"
                />
              </div>

              <div className="form-group">
                <label>Emoji / Ícono</label>
                <input
                  value={draft.logoEmoji}
                  onChange={(e) => setDraft({ ...draft, logoEmoji: e.target.value })}
                  placeholder="🛍️"
                />
              </div>

              <div className="form-group">
                <label>Color primario</label>
                <div className="color-input-row">
                  <input
                    type="color"
                    value={draft.primaryColor}
                    onChange={(e) => setDraft({ ...draft, primaryColor: e.target.value })}
                  />
                  <span>{draft.primaryColor}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Color secundario</label>
                <div className="color-input-row">
                  <input
                    type="color"
                    value={draft.secondaryColor}
                    onChange={(e) => setDraft({ ...draft, secondaryColor: e.target.value })}
                  />
                  <span>{draft.secondaryColor}</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={handleCancel}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
