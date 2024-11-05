interface ProductSizesProps {
  size: string;
}

export function ProductSize({ size }: ProductSizesProps) {
  return (
    <div className={"inline-flex items-center gap-4"}>
      <div
        className={
          "size-8 w-fit rounded-sm border-1 border-secondary px-3 py-1"
        }
      >
        <span className={"text-[14px] font-medium uppercase text-secondary"}>
          {size}
        </span>
      </div>
    </div>
  );
}
