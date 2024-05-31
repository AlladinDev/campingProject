import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Replace this URL with the API endpoint you are using to fetch photos
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/gallery/getallphotos');
        setPhotos(response.data.photos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 bg-[#FEFAF6] py-8 min-h-[90vh]">
      <h3 className="text-3xl font-bold mb-6 text-center">Some Adorable Memories</h3>
      <div className="grid grid-cols-1   justify-center sm:grid-cols-2 md:grid-cols-3  gap-6">
        {photos.map((item,key) => (
          <div key={key} className="bg-white  border-2 border-black rounded-lg shadow-lg overflow-hidden">
            <img src={item.photo} alt={item.title} className="w-full h-48 object-cover" />
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;

