import { useState } from "react";
import { useSelector } from "react-redux";

function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    parking: false,
    furnished: false,
    offer: false,
    type: "",
    noOfBedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountedPrice: 0,
    imageUrls: [],
  });


  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (id === "sale" || id === "rent") {
      setSelectedType(id);
      setFormData((prev) => ({ ...prev, type: id }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const uploadOneImage = async (file) => {
    const data = new FormData();
    data.append("image", file);
    const res = await fetch("/api/listings/upload-image", {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    return result.url;
  };

  const handleImagesUpload = async () => {
    if (files.length === 0) {
      setUploadError("Please select images first");
      return;
    }
    if (files.length + formData.imageUrls.length > 6) {
      setUploadError("Maximum 6 images allowed");
      return;
    }
    setUploading(true);
    setUploadError(null);
    try {
      const urls = await Promise.all(
        Array.from(files).map((file) => uploadOneImage(file))
      );
      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...urls],
      }));
    } catch (err) {
      setUploadError("Image upload failed. " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.type) { setError("Please select Sale or Rent"); return; }
    if (formData.imageUrls.length === 0) { setError("Please upload at least one image"); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/listings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.message); return; }
      console.log("Listing created:", data);
      

      setFormData({ name: "",
    description: "",
    address: "",
    parking: false,
    furnished: false,
    offer: false,
    type: "",
    noOfBedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountedPrice: 0,
    imageUrls: [],
  })
    } catch (err) {
      setError("Something went wrong. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Create a Listing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-8">

        <div className="flex flex-col gap-4 flex-1">
          <input onChange={handleChange} value={formData.name} type="text" id="name" placeholder="Name" maxLength="62" minLength="10" required className="border border-slate-200 p-3 rounded-lg text-sm outline-none focus:border-slate-400 transition" />
          <textarea onChange={handleChange} value={formData.description} id="description" placeholder="Description" required rows={4} className="border border-slate-200 p-3 rounded-lg text-sm outline-none focus:border-slate-400 transition resize-none" />
          <input onChange={handleChange} value={formData.address} type="text" id="address" placeholder="Address" required className="border border-slate-200 p-3 rounded-lg text-sm outline-none focus:border-slate-400 transition" />

          <div className="flex flex-wrap gap-4">
            {/* Sale & Rent */}
            {[{ id: "sale", label: "Sell" }, { id: "rent", label: "Rent" }].map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <input onChange={handleChange} checked={selectedType === item.id} type="checkbox" id={item.id} className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}

            {[
              { id: "parking", label: "Parking spot" },
              { id: "furnished", label: "Furnished" },
              { id: "offer", label: "Offer" },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <input onChange={handleChange} checked={formData[item.id]} type="checkbox" id={item.id} className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input onChange={handleChange} value={formData.noOfBedrooms} type="number" id="noOfBedrooms" min={1} max={10} required className="border border-slate-200 p-3 rounded-lg text-sm w-16 outline-none" />
              <p className="text-sm font-medium">Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input onChange={handleChange} value={formData.bathrooms} type="number" id="bathrooms" min={1} max={10} required className="border border-slate-200 p-3 rounded-lg text-sm w-16 outline-none" />
              <p className="text-sm font-medium">Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input onChange={handleChange} value={formData.regularPrice} type="number" id="regularPrice" min={1} required className="border border-slate-200 p-3 rounded-lg text-sm w-24 outline-none" />
              <div>
                <p className="text-sm font-medium">Regular price</p>
                <p className="text-xs text-slate-400">($ / month)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input onChange={handleChange} value={formData.discountedPrice} type="number" id="discountedPrice" min={1} className="border border-slate-200 p-3 rounded-lg text-sm w-24 outline-none" />
              <div>
                <p className="text-sm font-medium">Discounted price</p>
                <p className="text-xs text-slate-400">($ / month)</p>
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-4 flex-1">
          <p className="text-sm font-semibold">
            Images: <span className="text-slate-400 font-normal">The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-3">
            <input onChange={(e) => setFiles(e.target.files)} type="file" id="imageUrls" accept="image/*" multiple className="border border-slate-200 p-3 rounded-lg text-sm text-slate-400 w-full" />
            <button onClick={handleImagesUpload} type="button" disabled={uploading} className="border border-green-600 text-green-600 px-4 py-3 rounded-lg text-sm font-semibold hover:bg-green-50 transition uppercase whitespace-nowrap disabled:opacity-60">
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {uploadError && <p className="text-red-400 text-xs">{uploadError}</p>}

          {formData.imageUrls.map((url, index) => (
            <div key={url} className="flex items-center justify-between border border-slate-200 p-2 rounded-lg">
              <img src={url} alt="listing" className="w-16 h-16 object-cover rounded-lg" />
              <button type="button" onClick={() => handleRemoveImage(index)} className="text-red-400 text-sm hover:underline">Remove</button>
            </div>
          ))}

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-slate-700 text-white p-3 rounded-lg text-sm font-semibold hover:bg-slate-600 transition uppercase disabled:opacity-70">
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default CreateListing;