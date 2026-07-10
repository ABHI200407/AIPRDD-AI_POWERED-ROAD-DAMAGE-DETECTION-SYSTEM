import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ReportDamage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState({ lat: 17.40, lng: 78.47, address: '', area: 'Jubilee Hills' });
  const [details, setDetails] = useState({ type: 'Pothole', severity: 'med', traffic: 'Medium', description: '', tags: ['Dangerous'] });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  // Initialize Map in Step 1 (Location)
  useEffect(() => {
    if (step === 1 && !mapRef.current) {
      const map = L.map('loc-map').setView([location.lat, location.lng], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      
      const marker = L.marker([location.lat, location.lng], { draggable: true }).addTo(map);
      marker.on('dragend', async () => {
        const { lat, lng } = marker.getLatLng();
        setLocation(prev => ({ ...prev, lat, lng }));
        
        // Real Reverse Geocoding
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await res.json();
          if (data.address) {
            const road = data.address.road || data.address.suburb || 'Unnamed Road';
            const area = data.address.suburb || data.address.neighbourhood || 'Unknown Area';
            setLocation(prev => ({ ...prev, address: road, area: area }));
          }
        } catch (err) {
          console.error("Geocoding failed:", err);
        }
      });
      
      mapRef.current = map;
      markerRef.current = marker;
    }
  }, [step]);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      // Real AI Call
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const res = await axios.post('http://localhost:8000/api/analyze', formData);
        const { class: className, confidence } = res.data;
        
        setPhotos(prev => [...prev, {
          file,
          preview: URL.createObjectURL(file),
          aiScore: confidence.toFixed(2),
          aiClass: className
        }]);

        // Auto-set the damage type based on AI
        setDetails(prev => ({ ...prev, type: className }));
      } catch (err) {
        console.error("AI Analysis failed:", err);
        // Fallback for demo if needed, but we want it 'real'
      }
    }
  };

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = s;
      setStream(s);
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    canvas.toBlob(async blob => {
      const file = new File([blob], `capture_${Date.now()}.jpg`, { type: 'image/jpeg' });
      
      // Real AI Call for Camera
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const res = await axios.post('http://localhost:8000/api/analyze', formData);
        const { class: className, confidence } = res.data;
        
        setPhotos(prev => [...prev, {
          file,
          preview: URL.createObjectURL(file),
          aiScore: confidence.toFixed(2),
          aiClass: className
        }]);

        // Auto-set the damage type
        setDetails(prev => ({ ...prev, type: className }));
      } catch (err) {
         console.error("Camera AI Analysis failed:", err);
      }
    }, 'image/jpeg');
  };

  const submitReport = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      const reportData = {
        road_name: location.address || 'Unknown Road',
        area: location.area,
        city: 'Hyderabad',
        pincode: '500001',
        damage_type: details.type,
        severity_level: details.severity,
        traffic_density: details.traffic,
        description: details.description,
        location: { lat: location.lat, lng: location.lng }
      };

      formData.append('image', photos[0].file);
      formData.append('report_data', JSON.stringify(reportData));

      await axios.post('http://localhost:8000/api/reports', formData);
      setTimeout(() => setIsSuccess(true), 800); // Small delay for "Success" feel
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to submit report. Please check if your connection is stable and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="report-wrap" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>✅</div>
        <h1 style={{ fontFamily: 'Fraunces', color: 'var(--ocean)', marginBottom: '16px' }}>Report Submitted!</h1>
        <p style={{ color: "var(--muted)", marginBottom: '32px' }}>Thank you for doing your part. Our team will review the damage and update you shortly.</p>
        <button className="btn-primary" onClick={() => navigate('/my-reports')}>View My Reports</button>
      </div>
    );
  }

  return (
    <div className="report-wrap">
      {isSubmitting && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(26, 77, 110, 0.6)', 
          backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', 
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff'
        }}>
          <div className="ldot" style={{ width: '40px', height: '40px', marginBottom: '20px' }}></div>
          <h3 style={{ fontFamily: 'Fraunces' }}>Uploading Evidence...</h3>
          <p style={{ fontSize: '13px', opacity: 0.8 }}>Our AI is classifying the damage.</p>
        </div>
      )}

      <div className="sh">
        <h2>Report Road Damage</h2>
        <span className="badge">Step {step + 1} of 4</span>
      </div>

      <div className="stepper">
        {[1, 2, 3, 4].map((num, i) => (
          <div key={i} className={`step ${step === i ? 'active' : (step > i ? 'done' : '')}`}>
            <div className="step-circle">{num}</div>
            <div className="step-lbl">{['Photos', 'Location', 'Details', 'Review'][i]}</div>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="sp active">
          <div className="gcard">
            <div className="card-title" style={{fontWeight: 800, fontSize: '18px', color: 'var(--ocean)', marginBottom: '8px'}}>📸 Add Photos</div>
            <div className="card-sub" style={{fontSize: '13px', color: 'var(--muted)', marginBottom: '20px'}}>Upload images of the damage. AI will analyze the severity instantly.</div>
            
            <div className="upload-zone">
              <input type="file" onChange={handleFileUpload} multiple accept="image/*" />
              <div style={{ fontSize: '42px', marginBottom: '10px' }}>🖼️</div>
              <div style={{ fontWeight: 800, color: 'var(--ocean)' }}>Drag & drop or Click to upload</div>
            </div>

            <div className="divider-or" style={{margin: '24px 0', textAlign: 'center', position: 'relative'}}>
              <span style={{background: 'var(--white)', padding: '0 12px', fontSize: '11px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase'}}>or use camera</span>
            </div>

            {!stream ? (
              <button className="btn-outline" style={{width: '100%'}} onClick={startCamera}>📷 Open Camera</button>
            ) : (
              <div>
                <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: '12px', marginBottom: '12px' }} />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn-primary" style={{ flex: 1 }} onClick={takePhoto}>⚡ Capture</button>
                  <button className="btn-back" onClick={stopCamera}>✕ Close</button>
                </div>
              </div>
            )}

            <div className="prev-grid">
              {photos.map((p, i) => (
                <div key={i} className="prev-item" style={{position:'relative'}}>
                  <img src={p.preview} alt="Preview" />
                  <div className="ai-badge">AI: {(p.aiScore * 100).toFixed(0)}%</div>
                  <button 
                    onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                    style={{position:'absolute', top:5, right:5, background:'rgba(255,255,255,0.8)', border:'none', borderRadius:'50%', width:20, height:20, cursor:'pointer', fontSize:10, fontWeight:800}}
                  >✕</button>
                </div>
              ))}
            </div>
          </div>
          <div className="step-nav">
            <button className="btn-back" onClick={() => navigate('/')}>Cancel</button>
            <button className="btn-next" onClick={() => setStep(1)} disabled={photos.length === 0}>Next: Location →</button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="sp active">
          <div className="gcard">
            <div className="card-title" style={{fontWeight: 800, fontSize: '18px', color: 'var(--ocean)', marginBottom: '8px'}}>📍 Set Location</div>
            <div id="loc-map" style={{ marginBottom: '20px' }}></div>
            <div className="fg">
              <label>Road Name</label>
              <input className="fi" value={location.address} onChange={e => setLocation({...location, address: e.target.value})} placeholder="e.g. Jubilee Hills Rd 45" />
            </div>
            <div className="fg">
              <label>Area</label>
              <input className="fi" value={location.area} onChange={e => setLocation({...location, area: e.target.value})} placeholder="e.g. Jubilee Hills" />
            </div>
          </div>
          <div className="step-nav">
            <button className="btn-back" onClick={() => setStep(0)}>← Back</button>
            <button className="btn-next" onClick={() => setStep(2)}>Next: Details →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="sp active">
          <div className="gcard">
            <div className="card-title" style={{fontWeight: 800, fontSize: '18px', color: 'var(--ocean)', marginBottom: '8px'}}>📝 Damage Details</div>
            <div className="fg">
              <label>Damage Type</label>
              <select className="fs" value={details.type} onChange={e => setDetails({...details, type: e.target.value})}>
                <option>Pothole</option>
                <option>Crack / Fissure</option>
                <option>Surface Damage</option>
                <option>Road Collapse</option>
              </select>
            </div>
            <div className="fg">
              <label>Severity Level</label>
              <div className="sev-pills">
                {['low', 'med', 'high'].map(s => (
                  <div key={s} className={`sev-pill ${details.severity === s ? 'pk-'+s : ''}`} onClick={() => setDetails({...details, severity: s})}>
                    <div style={{fontSize: '20px'}}>{s === 'low' ? '😐' : (s === 'med' ? '😟' : '😱')}</div>
                    <div className="st">{s.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="fg">
              <label>Description</label>
              <textarea className="ft" rows="3" value={details.description} onChange={e => setDetails({...details, description: e.target.value})} placeholder="Describe the damage..." />
            </div>
          </div>
          <div className="step-nav">
            <button className="btn-back" onClick={() => setStep(1)}>← Back</button>
            <button className="btn-next" onClick={() => setStep(3)}>Review Submission →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="sp active">
          <div className="gcard">
            <div className="card-title" style={{fontWeight: 800, fontSize: '18px', color: 'var(--ocean)', marginBottom: '8px'}}>✅ Final Review</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <div style={{fontSize: '11px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase'}}>Location</div>
                <div style={{fontSize: '14px', fontWeight: 700, color: 'var(--ocean)'}}>{location.address || 'Selected Point'}</div>
                <div style={{fontSize: '12px', color: 'var(--muted)'}}>{location.area}</div>
              </div>
              <div>
                <div style={{fontSize: '11px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase'}}>Type & Severity</div>
                <div style={{fontSize: '14px', fontWeight: 700, color: 'var(--ocean)'}}>{details.type}</div>
                <div className={`pill sc-${details.severity}`} style={{marginTop: '4px'}}>{details.severity}</div>
              </div>
            </div>
            {photos.length > 0 && (
               <div style={{marginTop: '20px'}}>
                  <div style={{fontSize: '11px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px'}}>Evidence</div>
                  <img src={photos[0].preview} style={{width: '100%', borderRadius: '12px', height: '140px', objectFit: 'cover'}} alt="Evidence" />
               </div>
            )}
          </div>
          <div className="step-nav">
            <button className="btn-back" onClick={() => setStep(2)}>← Edit</button>
            <button className="btn-next" style={{background: 'var(--sage)'}} onClick={submitReport} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : '🚀 Submit Report'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDamage;
