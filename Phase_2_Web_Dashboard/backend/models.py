from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from database import Base

# SQLAlchemy Model
class RoadDamageDB(Base):
    __tablename__ = "reports"
    id = Column(Integer, primary_key=True, index=True)
    road_name = Column(String)
    area = Column(String)
    city = Column(String)
    pincode = Column(String)
    landmark = Column(String, nullable=True)
    damage_type = Column(String)
    severity_level = Column(String)
    severity_score = Column(Float)
    traffic_density = Column(String)
    report_date = Column(DateTime, default=datetime.utcnow)
    description = Column(String, nullable=True)
    tags = Column(JSON, default=[])
    location = Column(JSON) # Store as dict/JSON
    status = Column(String, default="under-review")
    image_url = Column(String, nullable=True)
    user_id = Column(String, default="anonymous_citizen")
    assigned_to = Column(String, nullable=True)
    assigned_date = Column(DateTime, nullable=True)
    resolved_image_url = Column(String, nullable=True)

# Pydantic Models for API
class RoadDamageReport(BaseModel):
    id: Optional[int] = None
    road_name: str
    area: str
    city: str
    pincode: str
    landmark: Optional[str] = None
    damage_type: str
    severity_level: str
    severity_score: float
    traffic_density: str
    report_date: datetime = Field(default_factory=datetime.utcnow)
    description: Optional[str] = None
    tags: List[str] = []
    location: dict
    status: str = "under-review"
    image_url: Optional[str] = None
    user_id: Optional[str] = "anonymous_citizen"
    assigned_to: Optional[str] = None
    assigned_date: Optional[datetime] = None
    resolved_image_url: Optional[str] = None

    class Config:
        from_attributes = True

class DashboardStats(BaseModel):
    total_reports: int
    potholes_fixed: int
    active_citizens: int
    ai_accuracy: float = 94.5
