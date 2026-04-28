import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

interface CategorySectionProps {
  name: string;
  image: string;
  index: number;
}

export function CategorySection({ name, image, index }: CategorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden snap-start"
      style={{ opacity }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${image})`,
            filter: "brightness(0.6)"
          }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative h-full flex items-center justify-center">
        <motion.div
          className="text-center cursor-pointer group px-8"
          initial={{ y: 100, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.4, 0.25, 1]
          }}
        >
          <motion.h2
            className="text-7xl md:text-9xl tracking-widest uppercase select-none text-white"
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 900,
              letterSpacing: "0.1em",
              textShadow: "0 10px 40px rgba(0, 0, 0, 0.9), 0 5px 20px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.2)",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.1)"
            }}
            whileHover={{
              scale: 1.1,
              color: "#ffb094",
              textShadow: "0 25px 70px rgba(255, 176, 148, 0.8), 0 10px 40px rgba(255, 176, 148, 0.6), 0 0 150px rgba(255, 176, 148, 0.9)",
              letterSpacing: "0.15em",
              WebkitTextStroke: "1px rgba(255, 176, 148, 0.3)"
            }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.4, 0.25, 1]
            }}
          >
            {name}
          </motion.h2>

          <motion.div
            className="mt-8 h-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent mx-auto"
            initial={{ width: 0, opacity: 0 }}
            whileHover={{ width: "300px", opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
