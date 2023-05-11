import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { PRICE, PrismaClient } from "@prisma/client";

export interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const prismaClient = new PrismaClient();

const fetchRestaurantsByCity = (searchParams: SearchParams) => {
  const where = {
    ...(searchParams.city && {
      location: {
        name: {
          equals: searchParams.city.toLowerCase(),
        },
      },
    }),
    ...(searchParams.cuisine && {
      cuisine: {
        name: {
          equals: searchParams.cuisine.toLowerCase(),
        },
      },
    }),
    ...(searchParams.price && {
      price: {
        equals: searchParams.price,
      },
    }),
  };

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true,
  };

  return prismaClient.restaurant.findMany({
    where,
    select,
  });
};

const fetchLocations = async () => {
  return prismaClient.location.findMany();
};

const fetchCuisines = async () => {
  return prismaClient.cuisine.findMany();
};

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const restaurants = await fetchRestaurantsByCity(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <p>Sorry, we found no restaurant in this area</p>
          )}
        </div>
      </div>
    </>
  );
}
