import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateRehome() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
      imageUrls: [],
      name: '',
      description: '',
      species: '',
      breed: '',
      color: '',
      vaccination: false,
      age: 1,
      gender: 'Male',
      size: 'Small',
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchRehome = async () => {
        const rehomeId = params.rehomeId;
        const res = await fetch(`/api/rehome/get/${rehomeId}`);
        const data = await res.json();
        if (data.success === false){
          console.log(data.message);
          return
        }
        setFormData(data);
      }

      fetchRehome();
    }, []);

    const handleImageSubmit = (e) => {
      if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
        setUploading(true);
        setImageUploadError(false);
        const promises = [];
  
        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
        }
        Promise.all(promises)
          .then((urls) => {
            setFormData({
              ...formData,
              imageUrls: formData.imageUrls.concat(urls),
            });
            setImageUploadError(false);
            setUploading(false);
          })
          .catch((err) => {
            setImageUploadError('Image upload failed (2 mb max per image)');
            setUploading(false);
          });
      } else {
        setImageUploadError('You can only upload 6 images per rehome');
        setUploading(false);
      }
    };
  
    const storeImage = async (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
  
    const handleRemoveImage = (index) => {
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
      });
    };

    const handleChange = (e) => {
      if (e.target.id === 'sale' || e.target.id === 'rent') {
        setFormData({
          ...formData,
          type: e.target.id,
        });
      }
  
      if (
        e.target.id === 'parking' ||
        e.target.id === 'furnished' ||
        e.target.id === 'offer'
      ) {
        setFormData({
          ...formData,
          [e.target.id]: e.target.checked,
        });
      }
  
      if (
        e.target.type === 'number' ||
        e.target.type === 'text' ||
        e.target.type === 'textarea'
      ) {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (formData.imageUrls.length < 1)
          return setError('You must upload at least one image');
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/rehome/update/${params.rehomeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
          }),
        });
        const data = await res.json();
        setLoading(false);
        if (data.success === false) {
          setError(data.message);
        }
        navigate(`/rehome/${data._id}`);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Update Animal Rehome List
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Specie : Dog, Cat, Others'
            className='border p-3 rounded-lg'
            id='species'
            required
            onChange={handleChange}
            value={formData.species}
          />
          <input
            type='text'
            placeholder='Breed'
            className='border p-3 rounded-lg'
            id='breed'
            required
            onChange={handleChange}
            value={formData.breed}
          />
          <input
            type='text'
            placeholder='Color'
            className='border p-3 rounded-lg'
            id='color'
            required
            onChange={handleChange}
            value={formData.color}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input 
              type='checkbox' 
              id='vaccination' 
              className='w-10' 
              />
              <span>Vaccinated</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-2'>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
            <label htmlFor='age'>Age:</label>
              <input
                type='number'
                id='age'
                min='1'
                max='150'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.age}
              />
            </div>
          </div>
            
            <div className='flex items-center gap-2'>
              <label htmlFor='gender'>Gender:</label>
              <select
                id='gender'
                className='p-3 border border-gray-300 rounded-lg'
                required
                onChange={handleChange}
                value={formData.gender}
              >
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Unknown'>Unknown</option>
              </select>
            </div>

            <div className='flex items-center gap-2'>
              <label htmlFor='size'>Size:</label>
              <select
                id='size'
                className='p-3 border border-gray-300 rounded-lg'
                required
                onChange={handleChange}
                value={formData.size}
              >
                <option value='Small'>Small</option>
                <option value='Medium'>Medium</option>
                <option value='Large'>Large</option>
                <option value='Extra Large'>Extra Large</option>
                <option value='Unknown'>Unknown</option>
              </select>
            </div>
            </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='rehome image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className='p-3 bg-red-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Creating...' : 'Update Rehome List'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}