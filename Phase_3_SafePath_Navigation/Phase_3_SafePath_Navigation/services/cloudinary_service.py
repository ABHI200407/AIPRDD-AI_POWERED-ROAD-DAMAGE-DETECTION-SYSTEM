import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()

# Configure Cloudinary
# Use CLOUDINARY_URL environment variable or manual config
if os.getenv("CLOUDINARY_URL"):
    # This automatically configures from the URL: cloudinary://<api_key>:<api_secret>@<cloud_name>
    pass
else:
    cloudinary.config(
        cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
        api_key=os.getenv("CLOUDINARY_API_KEY"),
        api_secret=os.getenv("CLOUDINARY_API_SECRET"),
        secure=True
    )

def upload_image(image_bytes, folder="road_damage_reports"):
    """
    Uploads image bytes to Cloudinary and returns the secure URL.
    """
    try:
        response = cloudinary.uploader.upload(
            image_bytes,
            folder=folder,
            resource_type="image"
        )
        return response.get("secure_url")
    except Exception as e:
        print(f"Cloudinary upload error: {e}")
        return None
