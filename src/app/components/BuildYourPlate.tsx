import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Food {
  id: string;
  name: string;
  emoji: string;
  category:
    | "Fruits"
    | "Vegetables"
    | "Cereals"
    | "Nuts"
    | "Dairy Products"
    | "Grains"
    | "Meat"
    | "Seafood";
  calories: number;
  protein: number;
  sugar: number;
  fiber: number;
}

interface PlateItem extends Food {
  quantity: number;
}

const foods: Food[] = [
  { id: "1", name: "Apple", emoji: "🍎", category: "Fruits", calories: 52, protein: 0.3, sugar: 10, fiber: 2.4 },
  { id: "2", name: "Banana", emoji: "🍌", category: "Fruits", calories: 89, protein: 1.1, sugar: 12, fiber: 2.6 },
  { id: "3", name: "Orange", emoji: "🍊", category: "Fruits", calories: 47, protein: 0.9, sugar: 9, fiber: 2.4 },
  { id: "4", name: "Mango", emoji: "🥭", category: "Fruits", calories: 60, protein: 0.8, sugar: 13, fiber: 1.6 },
  { id: "5", name: "Grapes", emoji: "🍇", category: "Fruits", calories: 69, protein: 0.7, sugar: 16, fiber: 0.9 },
  { id: "6", name: "Watermelon", emoji: "🍉", category: "Fruits", calories: 30, protein: 0.6, sugar: 6, fiber: 0.4 },
  { id: "7", name: "Pineapple", emoji: "🍍", category: "Fruits", calories: 50, protein: 0.5, sugar: 10, fiber: 1.4 },
  { id: "8", name: "Papaya", emoji: "🟠", category: "Fruits", calories: 43, protein: 0.5, sugar: 8, fiber: 1.7 },
  { id: "9", name: "Guava", emoji: "🍈", category: "Fruits", calories: 68, protein: 2.6, sugar: 9, fiber: 5.4 },
  { id: "10", name: "Strawberry", emoji: "🍓", category: "Fruits", calories: 32, protein: 0.7, sugar: 4.9, fiber: 2 },

  { id: "11", name: "Carrot", emoji: "🥕", category: "Vegetables", calories: 41, protein: 0.9, sugar: 4.7, fiber: 2.8 },
  { id: "12", name: "Broccoli", emoji: "🥦", category: "Vegetables", calories: 34, protein: 2.8, sugar: 1.7, fiber: 2.6 },
  { id: "13", name: "Spinach", emoji: "🥬", category: "Vegetables", calories: 23, protein: 2.9, sugar: 0.4, fiber: 2.2 },
  { id: "14", name: "Tomato", emoji: "🍅", category: "Vegetables", calories: 18, protein: 0.9, sugar: 2.6, fiber: 1.2 },
  { id: "15", name: "Potato", emoji: "🥔", category: "Vegetables", calories: 77, protein: 2, sugar: 0.8, fiber: 2.2 },
  { id: "16", name: "Onion", emoji: "🧅", category: "Vegetables", calories: 40, protein: 1.1, sugar: 4.2, fiber: 1.7 },
  { id: "17", name: "Cucumber", emoji: "🥒", category: "Vegetables", calories: 15, protein: 0.7, sugar: 1.7, fiber: 0.5 },
  { id: "18", name: "Brinjal", emoji: "🍆", category: "Vegetables", calories: 25, protein: 1, sugar: 3.5, fiber: 3 },

  { id: "19", name: "Cornflakes", emoji: "🥣", category: "Cereals", calories: 357, protein: 8, sugar: 8, fiber: 3 },
  { id: "20", name: "Wheat Flakes", emoji: "🌾", category: "Cereals", calories: 340, protein: 10, sugar: 5, fiber: 11 },
  { id: "21", name: "Muesli", emoji: "🥣", category: "Cereals", calories: 380, protein: 9, sugar: 12, fiber: 7 },
  { id: "22", name: "Ragi Flakes", emoji: "🌾", category: "Cereals", calories: 328, protein: 7.3, sugar: 1.6, fiber: 11.5 },
  { id: "23", name: "Poha", emoji: "🍚", category: "Cereals", calories: 110, protein: 2.3, sugar: 0.5, fiber: 1 },
  { id: "24", name: "Upma", emoji: "🥣", category: "Cereals", calories: 180, protein: 4, sugar: 1.5, fiber: 2 },

  { id: "25", name: "Almonds", emoji: "🥜", category: "Nuts", calories: 579, protein: 21, sugar: 4.4, fiber: 12.5 },
  { id: "26", name: "Cashews", emoji: "🥜", category: "Nuts", calories: 553, protein: 18, sugar: 5.9, fiber: 3.3 },
  { id: "27", name: "Walnuts", emoji: "🌰", category: "Nuts", calories: 654, protein: 15, sugar: 2.6, fiber: 6.7 },
  { id: "28", name: "Peanuts", emoji: "🥜", category: "Nuts", calories: 567, protein: 26, sugar: 4.7, fiber: 8.5 },
  { id: "29", name: "Pistachios", emoji: "🥜", category: "Nuts", calories: 562, protein: 20, sugar: 7.7, fiber: 10.3 },
  { id: "30", name: "Dates", emoji: "🌰", category: "Nuts", calories: 282, protein: 2.5, sugar: 63, fiber: 8 },

  { id: "31", name: "Milk", emoji: "🥛", category: "Dairy Products", calories: 61, protein: 3.2, sugar: 5, fiber: 0 },
  { id: "32", name: "Curd", emoji: "🥣", category: "Dairy Products", calories: 98, protein: 11, sugar: 3.4, fiber: 0 },
  { id: "33", name: "Paneer", emoji: "🧀", category: "Dairy Products", calories: 265, protein: 18, sugar: 1.2, fiber: 0 },
  { id: "34", name: "Cheese", emoji: "🧀", category: "Dairy Products", calories: 402, protein: 25, sugar: 1.3, fiber: 0 },
  { id: "35", name: "Butter", emoji: "🧈", category: "Dairy Products", calories: 717, protein: 0.9, sugar: 0.1, fiber: 0 },
  { id: "36", name: "Yogurt", emoji: "🥛", category: "Dairy Products", calories: 59, protein: 10, sugar: 3.3, fiber: 0 },

  { id: "37", name: "Rice", emoji: "🍚", category: "Grains", calories: 130, protein: 2.7, sugar: 0.1, fiber: 0.4 },
  { id: "38", name: "Wheat Roti", emoji: "🫓", category: "Grains", calories: 120, protein: 3.5, sugar: 0.5, fiber: 3 },
  { id: "39", name: "Oats", emoji: "🌾", category: "Grains", calories: 150, protein: 5, sugar: 1, fiber: 4 },
  { id: "40", name: "Quinoa", emoji: "🌾", category: "Grains", calories: 120, protein: 4.4, sugar: 0.9, fiber: 2.8 },
  { id: "41", name: "Brown Rice", emoji: "🍚", category: "Grains", calories: 111, protein: 2.6, sugar: 0.3, fiber: 1.8 },
  { id: "42", name: "Millets", emoji: "🌾", category: "Grains", calories: 119, protein: 3.5, sugar: 0.1, fiber: 1.3 },

  { id: "43", name: "Chicken", emoji: "🍗", category: "Meat", calories: 165, protein: 31, sugar: 0, fiber: 0 },
  { id: "44", name: "Egg", emoji: "🥚", category: "Meat", calories: 78, protein: 6, sugar: 0.6, fiber: 0 },
  { id: "45", name: "Mutton", emoji: "🥩", category: "Meat", calories: 294, protein: 25, sugar: 0, fiber: 0 },
  { id: "46", name: "Beef", emoji: "🥩", category: "Meat", calories: 250, protein: 26, sugar: 0, fiber: 0 },
  { id: "47", name: "Turkey", emoji: "🍖", category: "Meat", calories: 189, protein: 29, sugar: 0, fiber: 0 },
  { id: "48", name: "Duck", emoji: "🍖", category: "Meat", calories: 337, protein: 19, sugar: 0, fiber: 0 },

  { id: "49", name: "Fish", emoji: "🐟", category: "Seafood", calories: 206, protein: 22, sugar: 0, fiber: 0 },
  { id: "50", name: "Prawns", emoji: "🦐", category: "Seafood", calories: 99, protein: 24, sugar: 0, fiber: 0 },
  { id: "51", name: "Crab", emoji: "🦀", category: "Seafood", calories: 97, protein: 19, sugar: 0, fiber: 0 },
  { id: "52", name: "Salmon", emoji: "🐟", category: "Seafood", calories: 208, protein: 20, sugar: 0, fiber: 0 },
  { id: "53", name: "Tuna", emoji: "🐟", category: "Seafood", calories: 132, protein: 28, sugar: 0, fiber: 0 },
  { id: "54", name: "Sardines", emoji: "🐟", category: "Seafood", calories: 208, protein: 25, sugar: 0, fiber: 0 },
];

export function BuildYourPlate() {
  const [plate, setPlate] = useState<PlateItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Fruits",
    "Vegetables",
    "Cereals",
    "Nuts",
    "Dairy Products",
    "Grains",
    "Meat",
    "Seafood",
  ];

  const categoryFoods =
    selectedCategory === "All"
      ? foods
      : foods.filter((food) => food.category === selectedCategory);

  const filteredFoods =
    searchTerm.trim() === ""
      ? categoryFoods.slice(0, 6)
      : categoryFoods.filter((food) =>
          food.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const addToPlate = (food: Food) => {
    const existingItem = plate.find((item) => item.id === food.id);

    if (existingItem) {
      setPlate(
        plate.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setPlate([...plate, { ...food, quantity: 1 }]);
    }
  };

  const removeFromPlate = (id: string) => {
    setPlate(plate.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id: string) => {
    setPlate(
      plate.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setPlate(
      plate
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalCalories = plate.reduce(
    (sum, item) => sum + item.calories * item.quantity,
    0
  );
  const totalProtein = plate.reduce(
    (sum, item) => sum + item.protein * item.quantity,
    0
  );
  const totalSugar = plate.reduce(
    (sum, item) => sum + item.sugar * item.quantity,
    0
  );
  const totalFiber = plate.reduce(
    (sum, item) => sum + item.fiber * item.quantity,
    0
  );

  let score = 100;
  const warnings: string[] = [];

  if (plate.length === 0) {
    score = 0;
    warnings.push("Add foods to your plate");
  } else {
    if (totalProtein < 15) {
      score -= 20;
      warnings.push("Low protein ⚠️");
    }

    if (totalSugar > 30) {
      score -= 20;
      warnings.push("Too much sugar ⚠️");
    }

    if (totalFiber < 5) {
      score -= 15;
      warnings.push("Low fiber ❌");
    }

    if (totalCalories > 800) {
      score -= 10;
      warnings.push("High calories ⚠️");
    }

    if (warnings.length === 0) {
      warnings.push("Balanced meal ✅");
    }
  }

  score = Math.max(score, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-4">
            🍽️ Build Your Plate
          </h1>
          <p className="text-gray-600 text-lg">
            Search food items, add them to your plate, and check your nutrition score.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-5">
              Search & Add Foods
            </h2>

            <input
              type="text"
              placeholder="Search food items... example: apple, carrot, rice"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-5 px-5 py-3 rounded-2xl border border-green-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex gap-3 overflow-x-auto pb-4 mb-5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full whitespace-nowrap transition ${
                    selectedCategory === category
                      ? "bg-green-700 text-white"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {filteredFoods.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                No food item found.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredFoods.map((food) => (
                  <motion.div
                    key={food.id}
                    whileHover={{ scale: 1.04 }}
                    className="bg-gradient-to-br from-green-50 to-orange-50 rounded-2xl p-5 border border-green-100 shadow-sm"
                  >
                    <div className="text-4xl mb-3">{food.emoji}</div>

                    <h3 className="text-lg font-semibold text-gray-800">
                      {food.name}
                    </h3>

                    <p className="text-sm text-gray-500 mb-3">
                      {food.category}
                    </p>

                    <div className="text-sm text-gray-600 space-y-1 mb-4">
                      <p>Calories: {food.calories}</p>
                      <p>Protein: {food.protein}g</p>
                      <p>Sugar: {food.sugar}g</p>
                      <p>Fiber: {food.fiber}g</p>
                    </div>

                    <button
                      onClick={() => addToPlate(food)}
                      className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-xl transition"
                    >
                      Add to Plate
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 h-fit sticky top-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-5">
              Your Plate
            </h2>

            {plate.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-5xl mb-3">🍽️</div>
                Add foods to see nutrition details.
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                <AnimatePresence>
                  {plate.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      className="flex items-center justify-between bg-green-50 p-3 rounded-xl"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.emoji} {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          -
                        </button>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-7 h-7 rounded-full bg-green-200 hover:bg-green-300"
                        >
                          +
                        </button>

                        <button
                          onClick={() => removeFromPlate(item.id)}
                          className="w-7 h-7 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                        >
                          ×
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            <div className="border-t pt-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Total Nutrients
              </h3>

              <div className="space-y-2 text-gray-700">
                <p>Calories: {totalCalories.toFixed(0)} kcal</p>
                <p>Protein: {totalProtein.toFixed(1)} g</p>
                <p>Sugar: {totalSugar.toFixed(1)} g</p>
                <p>Fiber: {totalFiber.toFixed(1)} g</p>
              </div>
            </div>

            <div className="mt-6 bg-orange-50 rounded-2xl p-5">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                Meal Score
              </h3>

              <div className="text-5xl font-bold text-orange-600 mb-3">
                {score}/100
              </div>

              <div className="space-y-2">
                {warnings.map((warning, index) => (
                  <p key={index} className="text-sm text-gray-700">
                    {warning}
                  </p>
                ))}
              </div>
            </div>

            {plate.length > 0 && (
              <button
                onClick={() => setPlate([])}
                className="w-full mt-5 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-xl transition"
              >
                Clear Plate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}