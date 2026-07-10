import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const CommunityMap = () => {
  const mapRef = useRef(null);
  const [filter, setFilter] = useState('all');
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/reports');
        const data = res.data;
        setReports(data);
      } catch (err) {
        console.error("Failed to fetch reports for map:", err);
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      const cmap = L.map('community-map').setView([17.4, 78.47], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(cmap);
      mapRef.current = cmap;
    }

    // Clear existing markers (except tile layer)
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        mapRef.current.removeLayer(layer);
      }
    });

    // Add real markers
    reports.forEach(r => {
      if (filter !== 'all' && r.severity_level !== filter) return;
      
      const color = r.severity_level === 'high' ? '#c93a3a' : (r.severity_level === 'med' ? '#c07a18' : '#259055');
      
      const marker = L.circleMarker([r.location.lat, r.location.lng], {
        radius: 8,
        fillColor: color,
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(mapRef.current);

      marker.bindPopup(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 5px;">
          <strong style="color: var(--ocean);">${r.damage_type}</strong><br/>
          <span style="font-size: 11px; color: #666;">${r.road_name}</span><br/>
          <div style="margin-top: 8px; border-radius: 6px; overflow: hidden; height: 80px; width: 120px; background: #eee;">
             <img src="http://localhost:8000${r.image_url}" style="width:100%; height:100%; object-fit:cover;" />
          </div>
          <div style="margin-top: 5px; font-size: 10px; font-weight: 800; color: ${color}; text-transform: uppercase;">
            ${r.severity_level} Severity
          </div>
        </div>
      `);
    });
  }, [reports, filter]);

  return (
    <div className="mapview-wrap">
      <div className="sh"><h2>Community Damage Map</h2><span className="badge">Live · Hyderabad</span></div>
      <div className="map-filters">
        <select className="fs" style={{ padding: '8px 12px', minWidth: '140px' }} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Severity</option>
          <option value="high">🔴 High</option>
          <option value="med">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
      </div>
      <div id="community-map" style={{ height: '500px', margin: '20px 0' }}></div>
      <div className="map-legend">
        <div className="leg-item"><span className="leg-dot" style={{ background: '#259055' }}></span>Low (AI &lt; 0.3)</div>
        <div className="leg-item"><span className="leg-dot" style={{ background: '#c07a18' }}></span>Medium (0.3–0.7)</div>
        <div className="leg-item"><span className="leg-dot" style={{ background: '#c93a3a' }}></span>High (&gt; 0.7)</div>
      </div>
    </div>
  );
};

export default CommunityMap;
