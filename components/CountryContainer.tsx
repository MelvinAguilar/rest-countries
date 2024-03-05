"use client";

import CountryCard from "@/components/CountryCard";
import { CountryCardProps } from "@/types/common";
import { AnimatePresence, motion } from "framer-motion";

interface AnimatedDivProps {
  children: React.ReactNode;
  key?: string;
  className?: string;
}

const AnimatedDiv: React.FC<AnimatedDivProps> = ({
  children,
  key,
  className = "",
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.6, type: "spring" }}
      key={key}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface CountryContainerProps {
  results: {
    countries: CountryCardProps[];
  };
}

const CountryContainer = ({ results }: CountryContainerProps) => {
  return (
    <div
      id="results"
      className="grid grid-rows-[min-content] gap-8 py-[3rem] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {results.countries.length > 0 ? (
          results.countries.map((country: CountryCardProps) => (
            <AnimatedDiv key={country.name}>
              <CountryCard
                key={country.name}
                name={country.name}
                flag={country.flags.png}
                population={country.population}
                region={country.region}
                capital={country.capital}
              />
            </AnimatedDiv>
          ))
        ) : (
          <AnimatedDiv
            key="no-results"
            className="col-span-full flex w-full items-center justify-center py-4 "
          >
            <p className="text-2xl font-bold">No results found</p>
          </AnimatedDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountryContainer;
