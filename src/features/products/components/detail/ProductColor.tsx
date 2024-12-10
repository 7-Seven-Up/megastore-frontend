interface ProductColorProps {
  color: string;
}

export function ProductColor({ color }: ProductColorProps) {
  return (
    <div className={"inline-flex items-center gap-4"}>
      <div
        className={
          "flex size-8 items-center rounded-sm border-1 border-secondary"
        }
        style={{
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
}
