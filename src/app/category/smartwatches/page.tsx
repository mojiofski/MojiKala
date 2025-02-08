import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StarRating";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export interface ISmartWatch {
  id: string;
  name: string;
  category: "smartwatch";
  price: number;
  colors: string[];
  description: string;
  brand: string;
  images: string[];
  stock: number;
  rating: number;
  specs: {
    display: string;
    batteryLife: string;
    waterResistance: string;
    connectivity: string[];
    os: string;
    healthTracking: string[];
  };
  features: string[];
  reviews: {
    user: string;
    rating: number;
    comment: string;
  }[];
}


// تابع برای دریافت فقط محصولات دسته "laptop"
async function getSmartWatches(): Promise<ISmartWatch[]> {
  try {
    const q = query(
      collection(db, "products"),
      where("category", "==", "smart watch")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ISmartWatch[];
  } catch (error) {
    console.error("❌ خطا در دریافت لپ‌تاپ‌ها:", error);
    return [];
  }
}

export default async function SmartWatch() {
  const smartWatches = await getSmartWatches();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 border-b-2 border-b-red-300 text-gray-500 pb-3">
        Smart Watches
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {smartWatches.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transform transition hover:scale-105 min-h-[400px] flex flex-col"
          >
            <Link href={`/category/smartwatches/${item.name}`}>
              <div className="w-full h-52 relative">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  sizes="100%"
                  priority
                  className="object-contain p-4"
                />
              </div>
            </Link>

            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
              <div className="text-xl">
                <StarRating rating={item.rating} />
              </div>
              <p className="text-sm text-gray-500 mt-1 flex-grow">
                {item.description}
              </p>
            </div>

            <div className="flex justify-between p-4 items-center">
              <p className="text-xl font-bold text-gray-600 mt-2 cursor-default">
                ${item.price.toFixed(2)}
              </p>
              <button className="px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-900 transition">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
