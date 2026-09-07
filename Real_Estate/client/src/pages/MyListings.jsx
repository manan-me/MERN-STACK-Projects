import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function MyListings() {
  const { currentUser } = useSelector((state) => state.user);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/listings/user");
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Unable to load listings");
        }

        setListings(result.listings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [currentUser._id]);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">My Listings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage the properties you have posted.</p>
        </div>
        <Link to="/create-listing" className="bg-slate-800 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-slate-700">
          Create listing
        </Link>
      </div>

      {loading && <p className="text-slate-500">Loading listings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && listings.length === 0 && (
        <section className="border border-dashed border-slate-300 rounded-xl p-10 text-center">
          <h2 className="text-lg font-medium text-slate-700">No listings yet</h2>
          <p className="text-sm text-slate-500 mt-2 mb-5">Create your first property listing to see it here.</p>
          <Link to="/create-listing" className="text-sm text-slate-800 font-semibold hover:underline">
            Create a listing
          </Link>
        </section>
      )}

      {!loading && !error && listings.length > 0 && (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <article key={listing._id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <img src={listing.imageUrls[0]} alt={listing.name} className="h-52 w-full object-cover" />
              <div className="p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">{listing.type}</p>
                <h2 className="mt-1 truncate text-lg font-semibold text-slate-800">{listing.name}</h2>
                <p className="mt-1 truncate text-sm text-slate-500">{listing.address}</p>
                <p className="mt-4 font-semibold text-slate-800">${listing.regularPrice.toLocaleString()}</p>
                <p className="mt-1 text-xs text-slate-500">{listing.noOfBedrooms} beds · {listing.bathrooms} baths</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default MyListings;