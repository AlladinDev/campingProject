import React, { useEffect, useState } from 'react';
import api from './baseApi';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Replace this URL with the API endpoint you are using to fetch photos
    const fetchPhotos = async () => {
      try {
        const response = await api.get('/api/gallery/getallphotos');
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
    <div className=" bg-[#FEFAF6]   p-3 min-h-[90vh]">
      <h3 className="text-3xl font-bold mb-6 text-center">Some Adorable Memories</h3>
      <div className="flex  justify-center flex-wrap gap-9 items-center">
        {photos.map((item,key) => (
          <div key={key} className="w-full min-[640px]:max-w-[16rem] border-2 border-black bg-green-800 rounded-lg shadow-lg overflow-hidden">
            <img src={item.photo} alt={item.title} className="w-full h-52 object-cover" />
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;

