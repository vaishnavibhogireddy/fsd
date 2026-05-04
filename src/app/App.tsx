import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CategorySection } from "./components/CategorySection";
import { BuildYourPlate } from "./components/BuildYourPlate";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [currentPage, setCurrentPage] = useState<"home" | "buildplate">("home");

  const fullText = "Know Your Food, Know Your Health";

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowIntro(false);
        }, 2000);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  const categories = [
    {
      name: "Fruits",
      image:
        "https://images.unsplash.com/photo-1743636521309-41ab36eb89e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      name: "Vegetables",
      image:
        "https://images.unsplash.com/photo-1722810767143-40a6a7a74b13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      name: "Cereals",
      image:
        "https://images.unsplash.com/photo-1522449590709-afb70ef46ca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      name: "Nuts",
      image:
        "https://images.unsplash.com/photo-1772985434452-e9adcaa033c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      name: "Meat",
      image:
        "https://images.unsplash.com/photo-1772285466459-072608a170ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      name: "Seafood",
      image:
        "https://images.unsplash.com/photo-1691658410974-165b3efeda2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      name: "Grains",
      image:
        "https://images.unsplash.com/photo-1722882270052-e132567e9f70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      name: "Dairy Products",
      image:
        "https://images.unsplash.com/photo-1707037489765-1a12e1f90164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      name: "Other Food Items",
      image:
        "https://images.unsplash.com/photo-1636044997342-3eec12c46d85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
  ];

  const fileMap: Record<string, string> = {
    Fruits: "/fruits.html",
    Vegetables: "/vegetables.html",
    Cereals: "/cerals.html",
    Nuts: "/nuts.html",
    Meat: "/meat.html",
    Seafood: "/seafood.html",
    Grains: "/grains.html",
    "Dairy Products": "/dairy.html",
    "Other Food Items": "/others.html",
  };

  if (currentPage === "buildplate") {
    return (
      <div>
        <button
          onClick={() => setCurrentPage("home")}
          className="fixed top-6 left-6 z-50 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg"
        >
          ← Back Home
        </button>

        <BuildYourPlate />
      </div>
    );
  }

  if (showIntro) {
    return (
      <motion.div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center px-8">
          <h1 className="text-5xl md:text-7xl text-white tracking-wide">
            {typedText}
          </h1>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-black scroll-smooth">
      <div className="fixed top-8 left-8 z-40 flex items-center gap-6">
        <h1 className="text-3xl tracking-widest text-white/90">
          NUTRI<span className="text-green-400">CARD</span>
        </h1>

        <motion.button
          onClick={() => setCurrentPage("buildplate")}
          whileHover={{ scale: 1.05 }}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-semibold transition shadow-lg"
        >
          🍽️ Build Plate
        </motion.button>
      </div>

      {categories.map((category, index) => (
        <a
          href={fileMap[category.name]}
          key={category.name}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CategorySection
            name={category.name}
            image={category.image}
            index={index}
          />
        </a>
      ))}
    </div>
  );
}