import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Food {
  id: string;
  name: string;
  emoji: string;
  category: string;
  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    vitamins: string;
  };
}

interface PlateItem extends Food {
  servings: number;
}

const defaultFoodDatabase: Food[] = [
  // Fruits
  { id: "apple", name: "Apple", emoji: "🍎", category: "Fruits", nutrients: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, sugar: 10, vitamins: "Vitamin C" } },
  { id: "banana", name: "Banana", emoji: "🍌", category: "Fruits", nutrients: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, sugar: 12, vitamins: "Vitamin B6" } },
  { id: "orange", name: "Orange", emoji: "🍊", category: "Fruits", nutrients: { calories: 47, protein: 0.9, carbs: 12, fat: 0.3, fiber: 2.4, sugar: 9, vitamins: "Vitamin C" } },
  { id: "mango", name: "Mango", emoji: "🥭", category: "Fruits", nutrients: { calories: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6, sugar: 13, vitamins: "Vitamin A, C" } },
  { id: "strawberry", name: "Strawberry", emoji: "🍓", category: "Fruits", nutrients: { calories: 32, protein: 0.8, carbs: 8, fat: 0.3, fiber: 2, sugar: 5, vitamins: "Vitamin C" } },
  
  // Vegetables
  { id: "broccoli", name: "Broccoli", emoji: "🥦", category: "Vegetables", nutrients: { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.4, sugar: 1.4, vitamins: "Vitamin K, C" } },
  { id: "carrot", name: "Carrot", emoji: "🥕", category: "Vegetables", nutrients: { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, sugar: 4.7, vitamins: "Vitamin A" } },
  { id: "spinach", name: "Spinach", emoji: "🥬", category: "Vegetables", nutrients: { calories: 23, protein: 2.9, carbs: 4, fat: 0.4, fiber: 2.2, sugar: 0.4, vitamins: "Iron, Calcium" } },
  { id: "tomato", name: "Tomato", emoji: "🍅", category: "Vegetables", nutrients: { calories: 18, protein: 0.9, carbs: 4, fat: 0.2, fiber: 1.2, sugar: 2.6, vitamins: "Lycopene" } },
  { id: "lettuce", name: "Lettuce", emoji: "🥬", category: "Vegetables", nutrients: { calories: 15, protein: 1.2, carbs: 3, fat: 0.2, fiber: 1.2, sugar: 0.6, vitamins: "Vitamin K" } },

  // Grains/Cereals
  { id: "rice", name: "Brown Rice", emoji: "🍚", category: "Grains", nutrients: { calories: 111, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8, sugar: 0.3, vitamins: "B Vitamins" } },
  { id: "oats", name: "Oatmeal", emoji: "🌾", category: "Grains", nutrients: { calories: 150, protein: 5, carbs: 27, fat: 3, fiber: 4, sugar: 1, vitamins: "Fiber, Manganese" } },
  { id: "bread", name: "Whole Wheat Bread", emoji: "🍞", category: "Grains", nutrients: { calories: 80, protein: 4, carbs: 14, fat: 1, fiber: 2, sugar: 0.5, vitamins: "B Vitamins" } },
  { id: "pasta", name: "Pasta", emoji: "🍝", category: "Grains", nutrients: { calories: 131, protein: 5, carbs: 25, fat: 1, fiber: 1.8, sugar: 0.5, vitamins: "B Vitamins" } },

  // Proteins
  { id: "chicken", name: "Chicken Breast", emoji: "🍗", category: "Meat", nutrients: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0, vitamins: "B Vitamins" } },
  { id: "beef", name: "Beef", emoji: "🥩", category: "Meat", nutrients: { calories: 250, protein: 26, carbs: 0, fat: 15, fiber: 0, sugar: 0, vitamins: "Iron, Zinc" } },
  { id: "salmon", name: "Salmon", emoji: "🐟", category: "Seafood", nutrients: { calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, sugar: 0, vitamins: "Omega-3" } },
  { id: "egg", name: "Egg", emoji: "🥚", category: "Dairy", nutrients: { calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, sugar: 1.1, vitamins: "Choline" } },
  { id: "tofu", name: "Tofu", emoji: "📦", category: "Other", nutrients: { calories: 76, protein: 8, carbs: 2, fat: 4.8, fiber: 1.2, sugar: 0.3, vitamins: "Iron, Calcium" } },

  // Nuts & Seeds
  { id: "almonds", name: "Almonds", emoji: "🥜", category: "Nuts", nutrients: { calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 12.5, sugar: 4.4, vitamins: "Vitamin E" } },
  { id: "peanuts", name: "Peanuts", emoji: "🥜", category: "Nuts", nutrients: { calories: 567, protein: 26, carbs: 16, fat: 49, fiber: 8.5, sugar: 3, vitamins: "Niacin" } },

  // Dairy
  { id: "milk", name: "Milk", emoji: "🥛", category: "Dairy", nutrients: { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, fiber: 0, sugar: 4.8, vitamins: "Calcium" } },
  { id: "yogurt", name: "Yogurt", emoji: "🥛", category: "Dairy", nutrients: { calories: 59, protein: 10, carbs: 3.3, fat: 0.4, fiber: 0, sugar: 3.3, vitamins: "Probiotics" } },
];

export function BuildYourPlate() {
  const [plate, setPlate] = useState<PlateItem[]>([]);
  const [draggedFood, setDraggedFood] = useState<Food | null>(null);
  const [customFoods, setCustomFoods] = useState<Food[]>([]);
  const [showAddFood, setShowAddFood] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    emoji: "🍴",
    category: "Other",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
  });

  const allFoods = [...defaultFoodDatabase, ...customFoods];

  const handleAddFood = () => {
    if (!formData.name.trim()) {
      alert("Please enter a food name");
      return;
    }

    const newFood: Food = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      emoji: formData.emoji,
      category: formData.category,
      nutrients: {
        calories: formData.calories,
        protein: formData.protein,
        carbs: formData.carbs,
        fat: formData.fat,
        fiber: formData.fiber,
        sugar: formData.sugar,
        vitamins: "User Input",
      },
    };

    setCustomFoods([...customFoods, newFood]);
    setFormData({
      name: "",
      emoji: "🍴",
      category: "Other",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
    });
    setShowAddFood(false);
  };

  const removeCustomFood = (foodId: string) => {
    setCustomFoods(customFoods.filter((f) => f.id !== foodId));
  }

  const addToPlate = (food: Food) => {
    const existing = plate.find((item) => item.id === food.id);
    if (existing) {
      setPlate(
        plate.map((item) =>
          item.id === food.id ? { ...item, servings: item.servings + 1 } : item
        )
      );
    } else {
      setPlate([...plate, { ...food, servings: 1 }]);
    }
  };

  const removeFromPlate = (foodId: string) => {
    setPlate(plate.filter((item) => item.id !== foodId));
  };

  const updateServings = (foodId: string, servings: number) => {
    if (servings <= 0) {
      removeFromPlate(foodId);
    } else {
      setPlate(
        plate.map((item) =>
          item.id === foodId ? { ...item, servings } : item
        )
      );
    }
  };

  // Calculate totals
  const totals = plate.reduce(
    (acc, item) => ({
      calories: acc.calories + item.nutrients.calories * item.servings,
      protein: acc.protein + item.nutrients.protein * item.servings,
      carbs: acc.carbs + item.nutrients.carbs * item.servings,
      fat: acc.fat + item.nutrients.fat * item.servings,
      fiber: acc.fiber + item.nutrients.fiber * item.servings,
      sugar: acc.sugar + item.nutrients.sugar * item.servings,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
  );

  // Calculate warnings and score
  const warnings: string[] = [];
  let score = 100;

  if (plate.length === 0) {
    warnings.push("Add some foods to your plate!");
  } else {
    if (totals.protein < 15) {
      warnings.push("⚠️ Low protein - consider adding meat, eggs, or legumes");
      score -= 15;
    }
    if (totals.sugar > 30) {
      warnings.push("⚠️ High sugar - reduce fruits or sugary items");
      score -= 10;
    }
    if (totals.fiber < 5) {
      warnings.push("⚠️ Low fiber - add vegetables or whole grains");
      score -= 10;
    }
    if (totals.fat > 50) {
      warnings.push("⚠️ High fat - balance with leaner options");
      score -= 10;
    }
    if (totals.carbs < 30) {
      warnings.push("⚠️ Low carbs - add grains or starchy vegetables");
      score -= 10;
    }
    
    // Bonus: Balanced meal
    if (plate.length >= 3 && totals.protein >= 15 && totals.fiber >= 5) {
      score += 20;
    }
  }

  score = Math.max(0, Math.min(100, score));

  const getMealGrade = (score: number) => {
    if (score >= 85) return "🌟 Excellent";
    if (score >= 70) return "👍 Good";
    if (score >= 50) return "😐 Fair";
    return "⚠️ Needs Work";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-white py-20 px-4">
      <div className="fixed top-8 left-8 z-40">
        <a href="/" className="text-3xl tracking-widest text-slate-700 font-light hover:text-green-600 transition">
          NUTRI<span className="text-green-600 font-normal">CARD</span>
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mt-12"
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-slate-800 mb-4">
            🍽️ Build Your Plate
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Drag and drop foods to create your ideal meal. Watch your nutrition come together!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Food Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-green-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-slate-800">Available Foods</h2>
                <motion.button
                  onClick={() => setShowAddFood(!showAddFood)}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-semibold transition"
                >
                  + Add Food
                </motion.button>
              </div>

              {/* Add Custom Food Form */}
              <AnimatePresence>
                {showAddFood && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-200"
                  >
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Add Your Food</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Food Name</label>
                        <input
                          type="text"
                          placeholder="e.g., Grilled Chicken Breast"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-green-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Emoji</label>
                        <input
                          type="text"
                          placeholder="🍗"
                          maxLength={2}
                          value={formData.emoji}
                          onChange={(e) => setFormData({ ...formData, emoji: e.target.value || "🍴" })}
                          className="w-full px-4 py-2 rounded-lg border border-green-200 bg-white text-slate-800 text-2xl text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-green-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option>Other</option>
                          <option>Fruits</option>
                          <option>Vegetables</option>
                          <option>Grains</option>
                          <option>Meat</option>
                          <option>Seafood</option>
                          <option>Dairy</option>
                          <option>Nuts</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Calories</label>
                        <input
                          type="number"
                          min="0"
                          value={formData.calories}
                          onChange={(e) => setFormData({ ...formData, calories: Number(e.target.value) })}
                          className="w-full px-4 py-2 rounded-lg border border-green-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Protein (g)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.protein}
                          onChange={(e) => setFormData({ ...formData, protein: Number(e.target.value) })}
                          className="w-full px-4 py-2 rounded-lg border border-green-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Carbs (g)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.carbs}
                          onChange={(e) => setFormData({ ...formData, carbs: Number(e.target.value) })}
                          className="w-full px-4 py-2 rounded-lg border border-green-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Fat (g)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.fat}
                          onChange={(e) => setFormData({ ...formData, fat: Number(e.target.value) })}
                          className="w-full px-4 py-2 rounded-lg border border-green-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Fiber (g)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.fiber}
                          onChange={(e) => setFormData({ ...formData, fiber: Number(e.target.value) })}
                          className="w-full px-4 py-2 rounded-lg border border-green-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Sugar (g)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.sugar}
                          onChange={(e) => setFormData({ ...formData, sugar: Number(e.target.value) })}
                          className="w-full px-4 py-2 rounded-lg border border-green-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <motion.button
                        onClick={handleAddFood}
                        whileHover={{ scale: 1.02 }}
                        className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
                      >
                        Save Food
                      </motion.button>
                      <motion.button
                        onClick={() => setShowAddFood(false)}
                        whileHover={{ scale: 1.02 }}
                        className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Display Custom Foods Section */}
              {customFoods.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">
                    Your Custom Foods
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                    {customFoods.map((food) => (
                      <motion.div
                        key={food.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group"
                      >
                        <div
                          draggable
                          onDragStart={() => setDraggedFood(food)}
                          onClick={() => addToPlate(food)}
                          className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl cursor-move hover:shadow-lg transition border border-blue-300 text-center hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200"
                        >
                          <div className="text-3xl mb-2">{food.emoji}</div>
                          <p className="text-sm font-medium text-slate-700">{food.name}</p>
                          <p className="text-xs text-slate-500 mt-1">{food.nutrients.calories}cal</p>
                        </div>
                        <button
                          onClick={() => removeCustomFood(food.id)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transition"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="space-y-6">
                {["Fruits", "Vegetables", "Grains", "Meat", "Seafood", "Dairy", "Nuts", "Other"].map((category) => {
                  const categoryFoods = allFoods.filter((f) => f.category === category);
                  if (categoryFoods.length === 0) return null;

                  return (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">
                        {category}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {categoryFoods.map((food) => (
                          <motion.div
                            key={food.id}
                            draggable
                            onDragStart={() => setDraggedFood(food)}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => addToPlate(food)}
                            className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl cursor-move hover:shadow-lg transition border border-green-200 text-center hover:bg-gradient-to-br hover:from-green-100 hover:to-emerald-100"
                          >
                            <div className="text-3xl mb-2">{food.emoji}</div>
                            <p className="text-sm font-medium text-slate-700">{food.name}</p>
                            <p className="text-xs text-slate-500 mt-1">{food.nutrients.calories}cal</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Plate & Nutrition */}
          <div className="space-y-6">
            {/* Plate */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-green-100 min-h-96">
              <h2 className="text-2xl font-light text-slate-800 mb-4">Your Plate</h2>

              <motion.div
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => draggedFood && addToPlate(draggedFood)}
                className="border-2 border-dashed border-green-300 rounded-2xl p-6 text-center min-h-64 flex flex-col items-center justify-center bg-green-50/50 hover:bg-green-50 transition"
              >
                {plate.length === 0 ? (
                  <div className="text-center">
                    <div className="text-4xl mb-2">🍽️</div>
                    <p className="text-slate-500 font-light">Drag foods here or click to add</p>
                  </div>
                ) : (
                  <div className="w-full space-y-2">
                    <AnimatePresence>
                      {plate.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center justify-between bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{item.emoji}</span>
                            <span className="text-sm font-medium text-slate-700">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateServings(item.id, item.servings - 1)}
                              className="text-slate-600 hover:text-slate-800 font-bold text-lg"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-slate-700">{item.servings}</span>
                            <button
                              onClick={() => updateServings(item.id, item.servings + 1)}
                              className="text-slate-600 hover:text-slate-800 font-bold text-lg"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromPlate(item.id)}
                              className="ml-2 text-red-500 hover:text-red-700 text-sm font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>

              {plate.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setPlate([])}
                  className="w-full mt-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium transition"
                >
                  Clear Plate
                </motion.button>
              )}
            </div>

            {/* Nutrition & Score */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-green-100">
              <h2 className="text-2xl font-light text-slate-800 mb-4">Meal Score</h2>

              <motion.div
                className="text-center mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
              >
                <div className="text-6xl font-bold text-green-600 mb-2">{Math.round(score)}</div>
                <div className="text-xl text-slate-600">{getMealGrade(score)}</div>
              </motion.div>

              {/* Nutrition Facts */}
              <div className="space-y-2 text-sm mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-600">Calories</span>
                  <span className="font-semibold text-slate-800">{Math.round(totals.calories)} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Protein</span>
                  <span className="font-semibold text-slate-800">{Math.round(totals.protein * 10) / 10}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Carbs</span>
                  <span className="font-semibold text-slate-800">{Math.round(totals.carbs * 10) / 10}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Fat</span>
                  <span className="font-semibold text-slate-800">{Math.round(totals.fat * 10) / 10}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Fiber</span>
                  <span className="font-semibold text-slate-800">{Math.round(totals.fiber * 10) / 10}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Sugar</span>
                  <span className="font-semibold text-slate-800">{Math.round(totals.sugar * 10) / 10}g</span>
                </div>
              </div>

              {/* Warnings */}
              <div className="space-y-2">
                {warnings.map((warning, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-slate-600 flex items-start gap-2"
                  >
                    <span className="mt-0.5">→</span>
                    <span>{warning}</span>
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
