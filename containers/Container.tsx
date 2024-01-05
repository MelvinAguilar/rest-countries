type ContainerProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
};

export const Container = <T extends React.ElementType = "div">({
  as,
  className = "",
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerProps<T>> &
  ContainerProps<T>) => {
  let Component = as ?? "div";

  return (
    <Component
      className={`w-full mx-auto max-w-[84rem] px-3 md:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Component>
  );
};
