"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { toast } from "@/components/Toast";
import ListingCard from "@/components/listings/ListingCard";
import { SafeListing, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast({
            title: "Deleted",
            message: "Listing has been deleted",
            type: "success",
          });
          router.refresh();
        })
        .catch((error) => {
          toast({
            title: "Oops",
            message: error?.response?.data?.error,
            type: "error",
          });
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listings) => {
          return (
            <ListingCard
              key={listings.id}
              data={listings}
              actionId={listings.id}
              onAction={onCancel}
              disabled={deletingId === listings.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
