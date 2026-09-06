function CreateListing() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Create Listing</h1>
      <form className="flex flex-col sm:flex-row gap-8">

        <div className="flex flex-col gap-4 flex-1">
          <input type="text" id="name" placeholder="Name" maxLength="62" minLength="10" required className="border border-slate-200 p-3 rounded-lg text-sm outline-none focus:border-slate-400 transition" />
          <textarea id="description" placeholder="Description" required rows={4} className="border border-slate-200 p-3 rounded-lg text-sm outline-none focus:border-slate-400 transition resize-none" />
          <input type="text" id="address" placeholder="Address" required className="border border-slate-200 p-3 rounded-lg text-sm outline-none focus:border-slate-400 transition" />

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="sale" className="w-4 h-4 accent-slate-700" />
              <span className="text-sm">Sale</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="rent" className="w-4 h-4 accent-slate-700" />
              <span className="text-sm">Rent</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="parking" className="w-4 h-4 accent-slate-700" />
              <span className="text-sm">Parking Spot</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="furnished" className="w-4 h-4 accent-slate-700" />
              <span className="text-sm">Furnished</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="offer" className="w-4 h-4 accent-slate-700" />
              <span className="text-sm">Offer</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs text-slate-500">Beds</label>
              <input type="number" id="bedrooms" min={1} max={10} required className="border border-slate-200 p-3 rounded-lg text-sm outline-none focus:border-slate-400 transition" />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs text-slate-500">Baths</label>
              <input type="number" id="bathrooms" min={1} max={10} required className="border border-slate-200 p-3 rounded-lg text-sm outline-none focus:border-slate-400 transition" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500">Regular Price ($/month)</label>
            <input type="number" id="regularPrice" min={1} required className="border border-slate-200 p-3 rounded-lg text-sm outline-none focus:border-slate-400 transition" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500">Discounted Price ($/month)</label>
            <input type="number" id="discountedPrice" min={1} className="border border-slate-200 p-3 rounded-lg text-sm outline-none focus:border-slate-400 transition" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate-500">Images <span className="text-slate-400">(max 6, first is cover)</span></label>
            <div className="flex gap-3">
              <input type="file" id="imageUrls" accept="image/*" multiple className="border border-slate-200 p-3 rounded-lg text-sm text-slate-400 w-full" />
              <button type="button" className="border border-slate-400 text-slate-600 px-4 rounded-lg text-sm hover:bg-slate-100 transition whitespace-nowrap">
                Upload
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-slate-700 text-white p-3 rounded-lg text-sm font-medium hover:bg-slate-600 transition">
            Create Listing
          </button>

        </div>
      </form>
    </div>
  );
}

export default CreateListing;