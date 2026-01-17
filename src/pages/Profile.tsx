import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useNavigate } from 'react-router-dom';

type FavoriteCareer = Database['public']['Tables']['favorite_careers']['Row'];
type Career = Database['public']['Tables']['careers']['Row'];

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<FavoriteCareer[]>([]);
  const [myListings, setMyListings] = useState<Career[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getProfileData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth'); // Assuming you have an auth route
        return;
      }

      setUserEmail(user.email || '');

      // Fetch Favorites
      const { data: favs } = await supabase
        .from('favorite_careers')
        .select('*')
        .eq('user_id', user.id);
      
      if (favs) setFavorites(favs);

      // Fetch My Listings
      const { data: listings } = await supabase
        .from('careers')
        .select('*')
        .eq('user_id', user.id);
      
      if (listings) setMyListings(listings);
      
      setLoading(false);
    };

    getProfileData();
  }, [navigate]);

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-navy">User Profile</h1>
      <div className="mb-8 p-4 bg-cream rounded-lg border border-border">
        <p className="text-lg">Logged in as: <span className="font-semibold">{userEmail}</span></p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Saved Properties Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-navy">Saved Properties</h2>
          {favorites.length === 0 ? (
            <p className="text-muted-foreground">No saved properties yet.</p>
          ) : (
            <div className="space-y-4">
              {favorites.map(fav => (
                <div key={fav.id} className="border border-border p-4 rounded-lg shadow-soft bg-card">
                  <h3 className="font-bold text-lg">{fav.career_title}</h3>
                  <p className="text-sm text-muted-foreground">{fav.career_category}</p>
                  <p className="text-sm mt-2 font-medium text-primary">{fav.career_salary}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Listings Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-navy">My Listings</h2>
          {myListings.length === 0 ? (
            <p className="text-muted-foreground">You haven't listed any properties.</p>
          ) : (
            <div className="space-y-4">
              {myListings.map(career => (
                <div key={career.id} className="border border-border p-4 rounded-lg shadow-soft bg-card">
                  <h3 className="font-bold text-lg">{career.title}</h3>
                  <p className="text-sm text-muted-foreground">{career.category}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm font-medium">{career.salary_range}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${career.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {career.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;