import getCurrentUser from "@/actions/getCurrentUser";
import getFavoriteListings from "@/actions/getFavoriteListings";
import EmptyState from "@/components/EmptyState";
import { FC } from "react";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <div className="bg-[#f5f5f5] dark:bg-black/95">
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </div>
  );
};

export default FavoritesPage;
